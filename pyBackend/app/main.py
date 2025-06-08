from fastapi import FastAPI,WebSocketDisconnect,WebSocket
from .agent import graph
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],            # Frontend origins allowed
    allow_credentials=True,
    allow_methods=["*"],              # Allow all HTTP methods
    allow_headers=["*"],              # Allow all headers
)

@app.get("/")
def home():
  return {"hi da":"hi da"}

class InputMessage(BaseModel):
  message : str
  user_id : int


@app.post("/chat")
async def chat(input : InputMessage):
  response = await graph.ainvoke({"question":input.message,"user_id":input.user_id})
  return response['generation']
