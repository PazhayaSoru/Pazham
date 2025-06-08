import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain.utilities import SQLDatabase
from langchain.vectorstores import Chroma
from langchain_core.pydantic_v1 import BaseModel,Field
from langchain_core.output_parsers import StrOutputParser
from langchain.prompts import PromptTemplate
from langchain_core.prompts import ChatPromptTemplate
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain.schema import Document
import psycopg2  
load_dotenv()
from pymongo import MongoClient

GROQ_API_KEY= os.getenv("GOOGLE_API_KEY")
LANGCHAIN_API_KEY=os.getenv("LANGCHAIN_API_KEY")
LANGCHAIN_PROJECT=os.getenv("LANGCHAIN_PROJECT")
SERPER_API_KEY=os.getenv("SERPER_API_KEY")
GOOGLE_API_KEY=os.getenv("GOOGLE_API_KEY")
TAVILY_API_KEY=os.getenv("TAVILY_API_KEY")

os.environ["GOOGLE_API_KEY"] = GOOGLE_API_KEY
os.environ["TAVILY_API_KEY"] = TAVILY_API_KEY 
os.environ["SERPER_API_KEY"] = SERPER_API_KEY
os.environ["LANGCHAIN_API_KEY"] =  LANGCHAIN_API_KEY
os.environ["LANGCHAIN_PROJECT"] = LANGCHAIN_PROJECT

llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash")


db_url = "postgresql+psycopg2://postgres:AadhDep%407@localhost:5432/postgres"
pg_db = SQLDatabase.from_uri(db_url)

embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")

persist = "C:/Users/thede/OneDrive/Desktop/WT Lab/WT miniproject/pyBackend/primary_vector_db"

db = Chroma(persist_directory=persist,collection_name="rag-budget",embedding_function=embeddings)

retriever = db.as_retriever(
  search_type="similarity",
  search_kwargs={"k":4}
)

MONGODB_URI = "mongodb://localhost:27017"
DB_NAME = "wtdb"

# Connect to MongoDB
client = MongoClient(MONGODB_URI)
db = client[DB_NAME]
dues_collect = db["dues"]
subs_collect = db["subscriptions"]
emi_collect = db['emis']



prompt = PromptTemplate(
    input_variables=["context", "question","transactions","budgets","dues","subs"],
    template="""
You are a helpful AI assistant who specializes in budget planning, personal finance and money saving.Use the context below as supplement to answer the question.If the question is explicitly telling you to explain, then give 
a descriptive answer but of appropriate size.Use the transaction, budget,dues, service subscription details, city and income of the user if the question requires you to.
Make use of the city details and monthly income for budget planning when answering the question .Understand the transaction, dues, budgets, subscriptions, emis details
in detail before answering.Give an answer that would be apt for that city and income.When generating the answer strictly dont generate more than 70 characters in the same line. add a newline afterwards.

Here is the context,
Context :
{context},

Transaction:
{transactions},

Budget: 
{budgets},

Dues: 
{dues},

City:
{city},

Subcriptions:
{subs}

EMIs:
{emis}

Monthly_income:
{income} rupees,

and the question,
Question:{question}
""")

print(f"prompt: {prompt}")

rag_chain = prompt | llm | StrOutputParser()

class GradeDocuments(BaseModel):

  binary_score: str = Field(description="If the Documents are relevant to the question, 'yes' else, 'no' ")

structured_llm_grader = llm.with_structured_output(GradeDocuments)



system = """You are a grader assesing relevance of a retrieved document to a user's question. Dont take in personalization in the question into account.
If the document contains core idea behind the question is related to the document, grade the document as relevant.
Give a binary score 'yes' or 'no' score to indicate whether the document is relevant to the question
"""

grade_prompt = ChatPromptTemplate.from_messages(
  [
    ("system",system),
    ("human","Retrieved document: \n\n {document} \n\n user question: {question}")
  ]
)

retrieval_grader = grade_prompt | structured_llm_grader

system = """ You are a question re-writer that converts an input question to a better version that is optmizied\n
  for web search. Look at the input and try to reason about the underlying semantic intent / meaning. Just give me the question, just one.
  Also keep in mind that if needed we could use user specific data like transactions, personal budgets and financial dues.
  """

re_write_prompt = ChatPromptTemplate.from_messages(
  [
    ("system", system),
    ("human", "here is the initial question \n\n {question} \n formulate an improved question"),
  ]
)

question_rewriter = re_write_prompt | llm | StrOutputParser()


from langgraph.graph import END, StateGraph, START
from typing_extensions import TypedDict
from typing import List

class State(TypedDict):
  """
  Represents the state of our graph

  Attributes:
        question: question
        generation: LLM generation
        web_search: whether to add search
        documents: list of documents
  """

  question: str
  generation : str
  web_search : str
  documents : List[str]
  user_id : int

def retrieve_node(state):
  """
    Retrieve documents

    Args:
        state (dict): The current graph state

    Returns:
    
  
    """
  print("---RETRIEVE---")
  question = state["question"]
  user_id = state['user_id']
    
  documents = retriever.invoke(question)
    
  return {"documents": documents, "question": question,"user_id":user_id}


def grade_documents(state):
  """ 
  Determines whether the retrieved documents are relevant to the question
  
  Args:
      state(dict): The current graph state
  
  Returns:
      state (dict): Update documents key with only filtered relevant documents
  
  """

  print("---CHECKING DOCUMENT RELEVANT IS TO QUESTION OR NOT---")

  question = state["question"]
  documents = state['documents']
  user_id = state['user_id']

  filtered_docs = []

  web_search1 = "no"

  for d in documents:
    score = retrieval_grader.invoke({"question":question,"document":d.page_content})
    grade = (score.binary_score).lower()
    if grade == "yes":
      print("---DOCUMENT RELEVANT---")
      filtered_docs.append(d)
    else:
      print("---DOCUMENT IRRELEVANT---")
      web_search1="yes"
      break

  return {"documents":filtered_docs,"question":question,"web_search":web_search1,"user_id":user_id}
  

def transform_query(state):
  """ 
  Transform the query to produce a better question
  
  Args: 
    state (dict): The current graph state

  Returns:
    state (dict): Updates question key with a re-phrased question
  """

  print("---TRANSFORM QUERY---")

  question = state['question']
  documents = state['documents']
  user_id = state['user_id']

  better_question = question_rewriter.invoke({"question":question})
  print(f"Better question: {better_question}")
  return {"documents":documents,"question":better_question,'user_id':user_id}


def generate(state):
  """ 
  Generate answer
  
  Args:
      state (dict): The current graph state
  
  Returns:
      state(dict): New key added to state, generation, that contains LLM generation
  """
  user_id = state['user_id']

  print("---GENERATE---")
  transactions = pg_db.run(f"select * from transactions where user_id={user_id} and created_at >= date_trunc('month', CURRENT_TIMESTAMP);")
  city = pg_db.run(f"select city from users where id={user_id};")
  monthly_income = pg_db.run(f"select montly_income from users where id={user_id};")
  budgets = pg_db.run(f"select * from budgets where user_id=user_id and created_at >= date_trunc('month', CURRENT_TIMESTAMP);")
  dues = list(dues_collect.find({"user_id":user_id }))
  subscriptions = list(subs_collect.find({"user_id":user_id }))
  emi = list(emi_collect.find({"user_id":user_id }))

  question = state['question']
  documents = state['documents']

  generation = rag_chain.invoke({"context":documents, "question":question,"transactions":transactions,"budgets":budgets,"dues":dues,"city":city,"income":monthly_income,"subs":subscriptions,"emis":emi})
  return {"documents":documents,"question":question, "generation":generation}


search = TavilySearchResults(k=3)
tools = [search]


def router(state):
  """
    Determines whether to generate an answer, or re-generate a question.

    Args:
        state (dict): The current graph state

    Returns:
        str: Binary decision for next node to call
  """
  print("---ASSESS GRADED DOCUMENTS---")
  state["question"]
  web_search = state["web_search"]
  state["documents"]
  web_search = state["web_search"]

  if web_search == "yes":
        # All documents have been filtered check_relevance
        # We will re-generate a new query
    print( "---DECISION: ALL DOCUMENTS ARE NOT RELEVANT TO QUESTION, TRANSFORM QUERY---")
    return "transform"
  else:
    print("---DECISION: GENERATE---")
    return "generate"
  

def web_search_tool(state):

  """
   
  """

  question = state['question']
  documents = state['documents']

  docs = search.invoke({"query":question})
  print(docs)
  web_results = "\n".join([d['content'] for d in docs])

  web_result = Document(page_content=web_results)
  print(web_result)
  documents.append(web_result)

  return {"documents":documents,"question":question}

workflow = StateGraph(State)

workflow.add_node("retrieve_node",retrieve_node)
workflow.add_node("grade_documents",grade_documents)
workflow.add_node("generate",generate)
workflow.add_node("web_search_tool",web_search_tool)
workflow.add_node("transform", transform_query)
workflow.add_node("router",router)


workflow.set_entry_point("retrieve_node")
workflow.add_edge("retrieve_node","grade_documents")
workflow.add_conditional_edges("grade_documents", router ,{"transform":"transform","generate":"generate"})
workflow.add_edge("transform","web_search_tool")
workflow.add_edge("web_search_tool","generate")
workflow.add_edge("generate",END)

graph = workflow.compile()
