from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from graph import build_graph

app = FastAPI()

# Allow React frontend to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# What the request body should look like
class TranscriptRequest(BaseModel):
    transcript: str

# Build the pipeline once when server starts
pipeline = build_graph()

@app.get("/")
def root():
    return {"status": "AfterMeet backend is running"}

@app.post("/analyze")
async def analyze_transcript(request: TranscriptRequest):
    result = pipeline.invoke({"transcript": request.transcript})
    return {
        "summary": result["summary"],
        "decisions": result["decisions"],
        "action_items": result["action_items"],
        "email_draft": result["email_draft"]
    }