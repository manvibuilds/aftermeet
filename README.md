AI Meeting Assistant — Complete Architecture Plan
What We're Building
User pastes a meeting transcript → AI pipeline extracts action items, key decisions, owners, and drafts a follow-up email → everything displayed in a clean UI → can export as PDF or copy email.

Why This Project

Uses LangGraph (multi-agent) — step up from simple LangChain
Solves a real business problem every startup has
Directly relevant to Entelligence.AI (they analyze engineering team work)
Shows you can build agentic pipelines, not just chatbots
Deployable in 1-2 weeks


Complete Flow
User pastes transcript
        ↓
FastAPI receives it
        ↓
LangGraph Pipeline starts
        ↓
┌─────────────────────────────────┐
│ Node 1: Extract Decisions       │
│ → What was decided in meeting   │
├─────────────────────────────────┤
│ Node 2: Extract Action Items    │
│ → Who needs to do what by when  │
├─────────────────────────────────┤
│ Node 3: Identify Owners         │
│ → Assign each action to a person│
├─────────────────────────────────┤
│ Node 4: Draft Follow-up Email   │
│ → Professional email with summary│
└─────────────────────────────────┘
        ↓
Structured JSON returned
        ↓
React Frontend displays everything

Tech Stack
Backend:

Python + FastAPI
LangGraph — multi-step agent pipeline
LangChain Google GenAI — Gemini API as LLM
Pydantic — data validation
python-dotenv — env management
Deployed on Render

Frontend:

React + Vite
Tailwind CSS
Deployed on Vercel

No database needed — results are generated on the fly, not stored

File Structure
ai-meeting-assistant/
├── backend/
│   ├── main.py          ← FastAPI server
│   ├── graph.py         ← LangGraph pipeline (brain)
│   ├── prompts.py       ← All 4 prompts
│   ├── .env             ← API keys
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.jsx      ← Main UI
│   │   ├── components/
│   │   │   ├── TranscriptInput.jsx  ← Paste area
│   │   │   ├── ResultCard.jsx       ← Show results
│   │   │   ├── ActionItems.jsx      ← Action items list
│   │   │   ├── EmailDraft.jsx       ← Email with copy button
│   │   │   └── LoadingState.jsx     ← Spinner
│   └── package.json
└── README.md

Backend — How Each File Works
prompts.py
Four separate prompts, one for each agent node:
pythonDECISIONS_PROMPT = """
You are an expert at analyzing meeting transcripts.
Extract all KEY DECISIONS made in this meeting.
Return as a JSON list: [{"decision": "...", "context": "..."}]
Transcript: {transcript}
"""

ACTION_ITEMS_PROMPT = """
Extract all ACTION ITEMS from this transcript.
Each action item should have: task, owner (person responsible), deadline (if mentioned).
Return as JSON: [{"task": "...", "owner": "...", "deadline": "..."}]
Transcript: {transcript}
"""

SUMMARY_PROMPT = """
Write a 3-4 line executive summary of this meeting.
Be concise and professional.
Transcript: {transcript}
"""

EMAIL_PROMPT = """
Draft a professional follow-up email for this meeting.
Include: summary, decisions made, action items with owners.
Use this data:
Summary: {summary}
Decisions: {decisions}
Action Items: {action_items}
"""

graph.py — The Brain
This is the LangGraph multi-agent pipeline:
python# State object passed between all nodes
class MeetingState(TypedDict):
    transcript: str
    summary: str
    decisions: list
    action_items: list
    email_draft: str

# Each node is one AI call
def extract_summary(state): ...
def extract_decisions(state): ...
def extract_action_items(state): ...
def draft_email(state): ...

# Graph connects nodes in sequence
graph = StateGraph(MeetingState)
graph.add_node("summary", extract_summary)
graph.add_node("decisions", extract_decisions)
graph.add_node("action_items", extract_action_items)
graph.add_node("email", draft_email)

# Flow: summary → decisions → action_items → email
graph.add_edge("summary", "decisions")
graph.add_edge("decisions", "action_items")
graph.add_edge("action_items", "email")

main.py — FastAPI Server
python@app.post("/analyze")
async def analyze_transcript(request: TranscriptRequest):
    result = graph.invoke({"transcript": request.transcript})
    return {
        "summary": result["summary"],
        "decisions": result["decisions"],
        "action_items": result["action_items"],
        "email_draft": result["email_draft"]
    }

Frontend — What User Sees
Layout — Two column:
Left side:                Right side:
┌─────────────────┐      ┌─────────────────────┐
│ Paste your      │      │ 📋 Summary          │
│ meeting         │      │ ─────────────────── │
│ transcript      │      │ ✅ Action Items     │
│ here...         │      │ • Task / Owner      │
│                 │      │ ─────────────────── │
│ [Analyze]       │      │ 🎯 Decisions        │
└─────────────────┘      │ ─────────────────── │
                         │ 📧 Email Draft      │
                         │ [Copy] button       │
                         └─────────────────────┘

API Contract
Request:
jsonPOST /analyze
{
  "transcript": "John: We need to launch by Friday..."
}
Response:
json{
  "summary": "Team discussed product launch timeline...",
  "decisions": [
    {"decision": "Launch on Friday", "context": "Agreed by all"}
  ],
  "action_items": [
    {"task": "Fix login bug", "owner": "John", "deadline": "Thursday"}
  ],
  "email_draft": "Hi team, following up on today's meeting..."
}

Deployment

Backend → Render (same as DSA Debugger)
Frontend → Vercel (same as DSA Debugger)
Environment variables:

GEMINI_API_KEY
GEMINI_MODEL=gemini-2.0-flash




Build Order

Set up repo + folders
Write prompts.py
Write graph.py — build and test pipeline
Write main.py — expose as API
Test backend locally with Postman
Build React frontend
Deploy both
Write README with architecture diagram


What Makes This Impressive

LangGraph — not just one LLM call, a proper stateful pipeline
Structured JSON output — parsed and rendered cleanly
Four specialized agents — each expert at one thing
Real problem — every startup uses this daily
Fully deployed — live link you can share
