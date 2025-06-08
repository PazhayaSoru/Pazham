# 💰 Personal Finance Assistant

A full-stack web application designed to help users **track expenses**, **manage dues**, **set financial goals**, and receive **intelligent budgeting advice** via an Agentic AI-powered chatbot. Built with **Express.js**, **React**, **MongoDB**, **PostgreSQL**, **FastAPI**, and **LangGraph**, this app provides both practical financial management tools and conversational insights.

---

## 🚀 Features

- ✅ **Expense Tracking**  
  Add, edit, categorize, and monitor expenses with real-time feedback.

- 💸 **Dues Management**  
  Track recurring payments and upcoming dues with alerts and status filters.

- 🎯 **Financial Goal Setting**  
  Set and track goals for savings, investments, and more.

- 🧠 **Agentic-RAG Chatbot (LangGraph)**  
  Personalized financial advice powered by Retrieval-Augmented Generation (RAG) and multi-agent decision flows.

---

## 🧠 Agentic Chatbot Architecture

> Implemented using **LangGraph**, the chatbot leverages a series of intelligent agents to provide tailored budgeting tips.

**Agents Involved:**
- `Analyzer`: Interprets the user’s financial behavior.
- `Planner`: Suggests improvements or budgeting strategies.
- `Advisor`: Responds to the user with actionable, context-aware guidance.

Example Interaction:
> *"How can I save more this month?"* → *"Cut back ₹2,500 from dining out to stay within your target savings."*

---

## 🛠 Tech Stack

| Layer       | Technology                              |
|------------|------------------------------------------|
| Frontend   | React.js                                 |
| Backend    | Express.js (REST), FastAPI (LangGraph)   |
| Database   | MongoDB (Dues, Subscriptions), PostgreSQL (Users, Goals) |
| AI/LLM     | LangGraph + RAG (LLM-powered chatbot)    |
| APIs       | REST + GraphQL (dual support)            |

---

## 🗂 Project Structure

