# AfterMeet AI

AI-powered meeting assistant that transforms raw meeting transcripts into structured insights.

## What it does

Paste any meeting transcript and AfterMeet will automatically extract:
- **Summary** — 3-4 line executive overview
- **Action Items** — tasks with owners and deadlines
- **Decisions Made** — key decisions with context
- **Email Draft** — ready-to-send follow-up email

## Tech Stack

**Backend**
- Python + FastAPI
- LangGraph — multi-agent pipeline
- LangChain + Groq (llama-3.3-70b) — LLM
- Deployed on Render

**Frontend**
- React + Vite
- Tailwind CSS
- Deployed on Vercel

## Architecture

User pastes transcript → FastAPI receives it → LangGraph runs 4 agent nodes in sequence → structured JSON returned → React displays results

### The 4 LangGraph nodes
1. **Extract Summary** — generates executive overview
2. **Extract Decisions** — pulls key decisions with context
3. **Extract Action Items** — finds tasks, owners, deadlines
4. **Draft Email** — writes professional follow-up email

## Local Setup

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables
Create a `.env` file in the `backend` folder:
