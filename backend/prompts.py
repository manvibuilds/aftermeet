SUMMARY_PROMPT = """
You are an expert meeting analyst.
Write a 3-4 line executive summary of this meeting.
Be concise and professional. Only return the summary text, nothing else.

Transcript:
{transcript}
"""

DECISIONS_PROMPT = """
You are an expert at analyzing meeting transcripts.
Extract all KEY DECISIONS made in this meeting.
Return ONLY a valid JSON array, no extra text, no markdown, no backticks.

Format:
[{{"decision": "...", "context": "..."}}]

Transcript:
{transcript}
"""

ACTION_ITEMS_PROMPT = """
You are an expert at extracting action items from meetings.
Extract all ACTION ITEMS from this transcript.
Return ONLY a valid JSON array, no extra text, no markdown, no backticks.

Format:
[{{"task": "...", "owner": "...", "deadline": "..."}}]

If no deadline is mentioned, use "Not specified" for deadline.
If no owner is mentioned, use "Not assigned" for owner.

Transcript:
{transcript}
"""

EMAIL_PROMPT = """
You are a professional email writer.
Draft a concise follow-up email for this meeting.
Only return the email text, no subject line, no extra explanation.

Use this data:
Summary: {summary}
Decisions: {decisions}
Action Items: {action_items}
"""