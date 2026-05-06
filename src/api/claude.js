import { CONTENT_LIBRARY } from "../data/library";

const API_URL = "https://api.anthropic.com/v1/messages";
const MODEL   = "claude-sonnet-4-20250514";

async function callClaude(system, userMessage, maxTokens = 2048) {
  const apiKey = process.env.REACT_APP_ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("REACT_APP_ANTHROPIC_API_KEY is not set in .env");

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      system,
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error ${res.status}`);
  }

  const data = await res.json();
  if (!data.content?.[0]?.text) throw new Error("Unexpected API response shape");
  return data.content[0].text;
}

function extractJson(text, type = "array") {
  const pattern = type === "array" ? /\[[\s\S]*?\]/ : /\{[\s\S]*?\}/;
  const match = text.match(pattern);
  if (!match) throw new Error(`No JSON ${type} found in response`);
  try { return JSON.parse(match[0]); }
  catch { throw new Error("Failed to parse JSON from AI response"); }
}

/**
 * Extract all questions from an RFP document.
 * Returns an array of { id, question, category, complexity, estimatedMinutes }
 */
export async function extractQuestions(rfpText) {
  const system = `You are an expert enterprise RFP analyst with 15 years of experience. 
Extract every distinct question or requirement from the RFP document provided.
Return ONLY a valid JSON array with no markdown, no preamble, no backticks.
Each item must have exactly these fields:
{
  "id": "Q001",
  "question": "The full verbatim question text",
  "category": "Technical",
  "complexity": "Medium",
  "estimatedMinutes": 15
}
Rules:
- category MUST be exactly one of: Technical, Security, Pricing, Legal, Company
- complexity MUST be exactly one of: Low, Medium, High
- estimatedMinutes: integer. Low=5-10, Medium=15-25, High=30-60
- id: zero-padded 3-digit number (Q001, Q002, etc.)
- Combine multi-part questions into a single entry if they are clearly one question
- Do not invent questions; extract only what is explicitly asked`;

  const raw = await callClaude(system, rfpText, 4096);
  return extractJson(raw, "array");
}

/**
 * Generate a draft response for a single question using the content library.
 * Returns { draft, confidence, isGap, sourceId, sourceTitle }
 */
export async function generateDraft(question, category) {
  const libraryEntries = CONTENT_LIBRARY
    .filter(e => e.category === category)
    .map(e => `[${e.id}] ${e.topic}:\n${e.answer}`)
    .join("\n\n---\n\n");

  const allEntries = CONTENT_LIBRARY
    .filter(e => e.category !== category)
    .slice(0, 6)
    .map(e => `[${e.id}] (${e.category}) ${e.topic}: ${e.answer.slice(0, 120)}…`)
    .join("\n");

  const system = `You are a senior bid writer for a world-class enterprise B2B SaaS company (a response management platform similar to Loopio). Your job is to write precise, professional, and confident responses to enterprise RFP questions.

You have access to a content library of approved answers. Use these as your primary knowledge source. Write in first person plural ("We provide…", "Our platform…"). Be specific and credible; avoid vague marketing language.

Return ONLY a single JSON object with no markdown, no backticks, no preamble:
{
  "draft": "2-5 sentence professional response",
  "confidence": 82,
  "isGap": false,
  "sourceId": "L007",
  "sourceTitle": "SOC 2 Type II Certification"
}

Rules:
- confidence: integer 0-100. >75 = strong library match. 50-75 = partial match. <50 = gap.
- isGap: true if confidence < 50 (the library does not adequately cover this question)
- sourceId: the library entry ID you relied on most, or "NONE" if gap
- sourceTitle: the topic name of that library entry, or "No library match" if gap
- draft: if isGap=true, write an honest placeholder noting this needs SME input. If isGap=false, write a confident, complete response.`;

  const userMsg = `QUESTION: ${question}

RELEVANT LIBRARY ENTRIES (${category}):
${libraryEntries}

OTHER AVAILABLE ENTRIES (other categories, for context):
${allEntries}`;

  const raw = await callClaude(system, userMsg, 1024);
  return extractJson(raw, "object");
}

/**
 * Batch generate drafts for all pending questions.
 * Calls onProgress(questionId, result) after each one.
 */
export async function generateAllDrafts(questions, onProgress, signal) {
  const pending = questions.filter(q => q.status === "pending" || q.status === "rejected");
  for (const q of pending) {
    if (signal?.aborted) break;
    onProgress(q.id, { status: "generating" });
    try {
      const result = await generateDraft(q.question, q.category);
      onProgress(q.id, { ...result, status: "drafted" });
    } catch (e) {
      onProgress(q.id, { status: "error", errorMsg: e.message });
    }
  }
}
