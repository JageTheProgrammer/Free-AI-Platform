import { NextRequest, NextResponse } from "next/server";
import ratelimit from "@/lib/ratelimit";

export const runtime = "nodejs";

const GROQ_API_URL = "https://api.groq.com/openai/v1";
const DEFAULT_MODEL = "qwen/qwen3.6-27b";
const MAX_MESSAGES = 50;
const MAX_MESSAGE_LENGTH = 8192;

// Validate that a message has the expected shape and is not too long
function validateMessages(messages: unknown): true | string {
  if (!Array.isArray(messages) || messages.length === 0) {
    return "Messages are required";
  }
  if (messages.length > MAX_MESSAGES) {
    return `Too many messages. Maximum is ${MAX_MESSAGES}`;
  }
  for (const msg of messages as Array<unknown>) {
    if (typeof msg !== "object" || msg === null) continue;
    const m = msg as Record<string, unknown>;
    if (!m.role || typeof m.role !== "string") return "Invalid message format: missing role";
    if (!m.content || typeof m.content !== "string") return "Invalid message format: missing content";
    if (m.content.length > MAX_MESSAGE_LENGTH) return `Message too long. Maximum is ${MAX_MESSAGE_LENGTH} characters`;
  }
  return true;
}

// Map Groq provider errors to generic user-facing messages
function mapGroqError(status: number): string {
  switch (status) {
    case 401:
      return "Invalid API key. Please check your key and try again.";
    case 429:
      return "API rate limit exceeded. Please try again later.";
    default:
      return "AI service temporarily unavailable. Please try again later.";
  }
}

interface ChatBody {
  messages: unknown;
  apiKey: unknown;
}

export async function POST(req: NextRequest) {
  // Rate limiting — 30 requests per minute per IP for chat
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const limiterKey = `chat_${ip}`;
  const { success } = await ratelimit.limit(limiterKey);
  if (!success) {
    return NextResponse.json({ error: "Rate limit exceeded. Please try again later." }, { status: 429 });
  }

  let body: ChatBody;
  try {
    body = (await req.json()) as ChatBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const messagesArray = Array.isArray(body.messages) ? body.messages : null;
  const apiKey = typeof body.apiKey === "string" ? body.apiKey : "";

  if (!apiKey) {
    return NextResponse.json({ error: "API key is required." }, { status: 401 });
  }

  // Validate API key format (Groq keys start with gsk_)
  if (!/^[A-Za-z0-9_-]{20,}$/.test(apiKey)) {
    return NextResponse.json({ error: "Invalid API key format." }, { status: 401 });
  }

  // Validate messages
  const validation = validateMessages(messagesArray);
  if (validation !== true) {
    return NextResponse.json({ error: validation }, { status: 400 });
  }

  // Truncate user input to prevent prompt injection / abuse
  const sanitizedMessages = (messagesArray as Array<{ role: string; content: string }>).map((msg) => ({
    role: msg.role,
    content: msg.content.slice(0, MAX_MESSAGE_LENGTH),
  }));

  try {
    const groqResponse = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        messages: sanitizedMessages,
        stream: true,
        max_tokens: 4096,
        temperature: 0.7,
      }),
    });

    if (!groqResponse.ok) {
      // Do NOT forward raw Groq error — sanitize and map to user-friendly message
      await groqResponse.text(); // consume body to free connection
      return NextResponse.json(
        { error: mapGroqError(groqResponse.status) },
        { status: groqResponse.status }
      );
    }

    if (!groqResponse.body) {
      return NextResponse.json({ error: "Groq returned no response body." }, { status: 502 });
    }

    return new NextResponse(groqResponse.body, {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error instanceof Error ? error.message : "unknown");

    // Do not leak internal error details to the client
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
