import os
import json
from dotenv import load_dotenv
from typing import TypedDict
from langgraph.graph import StateGraph, END
from langchain_google_genai import ChatGoogleGenerativeAI
from prompts import SUMMARY_PROMPT, DECISIONS_PROMPT, ACTION_ITEMS_PROMPT, EMAIL_PROMPT

load_dotenv()

# ─── LLM setup ───────────────────────────────────────────
llm = ChatGoogleGenerativeAI(
    model=os.getenv("GEMINI_MODEL", "gemini-2.0-flash"),
    google_api_key=os.getenv("GEMINI_API_KEY")
)

# ─── State (the shared whiteboard) ───────────────────────
class MeetingState(TypedDict):
    transcript: str
    summary: str
    decisions: list
    action_items: list
    email_draft: str

# ─── Node 1: Summary ─────────────────────────────────────
def extract_summary(state: MeetingState) -> MeetingState:
    prompt = SUMMARY_PROMPT.format(transcript=state["transcript"])
    response = llm.invoke(prompt)
    state["summary"] = response.content.strip()
    return state

# ─── Node 2: Decisions ───────────────────────────────────
def extract_decisions(state: MeetingState) -> MeetingState:
    prompt = DECISIONS_PROMPT.format(transcript=state["transcript"])
    response = llm.invoke(prompt)
    raw = response.content.strip()
    try:
        state["decisions"] = json.loads(raw)
    except json.JSONDecodeError:
        state["decisions"] = [{"decision": raw, "context": ""}]
    return state

# ─── Node 3: Action Items ─────────────────────────────────
def extract_action_items(state: MeetingState) -> MeetingState:
    prompt = ACTION_ITEMS_PROMPT.format(transcript=state["transcript"])
    response = llm.invoke(prompt)
    raw = response.content.strip()
    try:
        state["action_items"] = json.loads(raw)
    except json.JSONDecodeError:
        state["action_items"] = [{"task": raw, "owner": "Not assigned", "deadline": "Not specified"}]
    return state

# ─── Node 4: Email ───────────────────────────────────────
def draft_email(state: MeetingState) -> MeetingState:
    prompt = EMAIL_PROMPT.format(
        summary=state["summary"],
        decisions=json.dumps(state["decisions"]),
        action_items=json.dumps(state["action_items"])
    )
    response = llm.invoke(prompt)
    state["email_draft"] = response.content.strip()
    return state

# ─── Build the graph ─────────────────────────────────────
def build_graph():
    graph = StateGraph(MeetingState)

    graph.add_node("summary", extract_summary)
    graph.add_node("decisions", extract_decisions)
    graph.add_node("action_items", extract_action_items)
    graph.add_node("email", draft_email)

    graph.set_entry_point("summary")
    graph.add_edge("summary", "decisions")
    graph.add_edge("decisions", "action_items")
    graph.add_edge("action_items", "email")
    graph.add_edge("email", END)

    return graph.compile()