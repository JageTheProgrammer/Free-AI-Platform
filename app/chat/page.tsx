/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useLang } from "@/i18n/useTranslations";

type Role = "user" | "assistant";

interface Message {
  role: Role;
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showApiInput, setShowApiInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [showApiNotice, setShowApiNotice] = useState(false);
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 200) + "px";
    }
  }, [input]);

  // Load API key from localStorage
  useEffect(() => {
    const stored = typeof window !== "undefined" && localStorage.getItem("groq_api_key");
    if (stored) setApiKey(stored);
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    if (!apiKey) {
      setShowApiInput(true);
      setShowApiNotice(true);
      setTimeout(() => setShowApiNotice(false), 3000);
      return;
    }

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          apiKey,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();

        let errorMessage = `Server error: ${res.status}`;

        try {
          const err = JSON.parse(errText);

          if (typeof err.error === "string") {
            errorMessage = err.error;
          } else if (err.error?.message) {
            errorMessage = err.error.message;
          } else if (err.message) {
            errorMessage = err.message;
          } else {
            errorMessage = JSON.stringify(err);
          }
        } catch {
          if (errText) {
            errorMessage = errText;
          }
        }

        throw new Error(errorMessage);
      }

      // Stream the response
      const reader = res.body?.getReader();
      if (!reader) throw new Error("No stream");

      const decoder = new TextDecoder();
      let assistantMsg = "";
      let buffer = "";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "" },
      ]);

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");

        // Keep the last incomplete line in the buffer
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();

          if (!trimmed.startsWith("data:")) {
            continue;
          }

          const data = trimmed.slice(5).trim();

          if (data === "[DONE]") {
            continue;
          }

          try {
            const parsed = JSON.parse(data);

            const delta =
              parsed.choices?.[0]?.delta?.content ?? "";

            if (delta) {
              assistantMsg += delta;

              setMessages((prev) => {
                const updated = [...prev];

                if (updated.length > 0) {
                  updated[updated.length - 1] = {
                    ...updated[updated.length - 1],
                    content: assistantMsg,
                  };
                }

                return updated;
              });
            }
          } catch (error) {
            console.error("Failed to parse SSE:", data, error);
          }
        }
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Error: ${message}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem("groq_api_key", apiKey.trim());
      setShowApiInput(false);
    }
  };

  // Split content into code blocks and plain text, then render inline markdown
  function splitByCodeBlocks(text: string) {
    const parts: Array<{ type: "code"; lang?: string; content: string } | { type: "text"; content: string }> = [];
    const regex = /```(\w*)\n?([\s\S]*?)```|`([^`]+)`/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      // Text before this code block
      if (match.index > lastIndex) {
        parts.push({ type: "text", content: text.slice(lastIndex, match.index) });
      }

      if (match[1] || (match[2] !== undefined && match[0].startsWith("```"))) {
        // Fenced code block
        const lang = match[1] || "";
        parts.push({ type: "code", lang: lang || undefined, content: match[2] || "" });
      } else {
        // Inline code
        parts.push({ type: "code", lang: undefined, content: match[3]! });
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push({ type: "text", content: text.slice(lastIndex) });
    }

    return parts.length === 0 ? [{ type: "text" as const, content: text }] : parts;
  }

  // Split text into inline tokens (bold, italic, strikethrough, code) for rendering
  function splitInlineTokens(text: string) {
    // Match **bold**, *italic*, ~~strikethrough~~, `inline code` and raw text segments
    const regex = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(~~(.+?)~~)|(`([^`]+)`)/g;
    let lastIndex = 0;
    let match;
    const tokens: Array<
      | { type: "bold"; content: string }
      | { type: "italic"; content: string }
      | { type: "strikethrough"; content: string }
      | { type: "code"; content: string }
      | { type: "text"; content: string }
    > = [];

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        tokens.push({ type: "text", content: text.slice(lastIndex, match.index) });
      }
      if (match[1] && match[2] !== undefined) {
        tokens.push({ type: "bold", content: match[2]! });
      } else if (match[3] && match[4] !== undefined) {
        tokens.push({ type: "italic", content: match[4]! });
      } else if (match[5] && match[6] !== undefined) {
        tokens.push({ type: "strikethrough", content: match[6]! });
      } else if (match[7]) {
        tokens.push({ type: "code", content: match[7]! });
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      tokens.push({ type: "text", content: text.slice(lastIndex) });
    }

    return tokens.length === 0 ? [{ type: "text" as const, content: text }] : tokens;
  }

  function renderAssistantMessage(content: string) {
    const parts = splitByCodeBlocks(content);

    return parts.map((part, pi) => {
      if (part.type === "code") {
        // Fenced code block with language tag
        if (part.lang) {
          return (
            <div key={pi} className="my-3 overflow-x-auto rounded-xl border border-slate-200 bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-700 px-4 py-1.5 text-xs text-slate-400">
                <span>{part.lang}</span>
              </div>
              <pre className="m-0 overflow-x-auto p-3 text-xs leading-relaxed text-slate-200">
                <code className="break-all whitespace-pre-wrap">{part.content}</code>
              </pre>
            </div>
          );
        }

        // Inline code (no language) — render as inline element, returned from inside text processing
        return null;
      }

      // Plain text: split by lines first for paragraphs
      return part.content.split("\n").map((line, li) => {
        // Empty line → paragraph break
        if (line.trim() === "") return <br key={li} />;

        // Split the line into inline tokens (**bold**, *italic*, ~~strike~~, `code`)
        const tokens = splitInlineTokens(line);

        return (
          <span key={li} className="inline break-words" style={{ overflowWrap: "anywhere", wordBreak: "break-word" }}>
            {tokens.map((token, ti) => {
              switch (token.type) {
                case "bold":
                  return (
                    <strong key={ti} className="font-bold text-slate-900">
                      {token.content}
                    </strong>
                  );
                case "italic":
                  return (
                    <em key={ti}>{token.content}</em>
                  );
                case "strikethrough":
                  return (
                    <s key={ti}>{token.content}</s>
                  );
                case "code":
                  return (
                    <code
                      key={ti}
                      className="rounded-md bg-slate-100 px-1.5 py-0.5 text-xs font-mono text-violet-700"
                    >
                      {token.content}
                    </code>
                  );
                default:
                  return <span key={ti}>{token.content}</span>;
              }
            })}
          </span>
        );
      });
    });
  }

  return (
    <div className="flex h-screen flex-col bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200/60 bg-white/80 px-6 py-3 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-gray-100 shadow-lg shadow-blue-500/25 transition-all hover:scale-105"
          >
            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </Link>
          <div>
            <span className="bg-gradient-to-r font-bold from-blue-600 to-blue-300 bg-clip-text text-transparent">
              {t("nav.logo")}
            </span>
            <p className="text-xs text-slate-400">Powered by Groq</p>
          </div>
        </div>

        {apiKey ? (
          <button
            onClick={() => setShowApiInput(true)}
            className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:border-slate-300 hover:bg-white hover:text-slate-800"
          >
            <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3 3V9" />
            </svg>
            API Key Set
          </button>
        ) : (
          <button
            onClick={() => setShowApiInput(true)}
            className="rounded-full bg-gradient-to-r from-blue-600 to-gray-200 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:shadow-xl hover:shadow-blue-500/30 hover:brightness-110 active:scale-[0.98]"
          >
            Set API Key
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        {messages.length === 0 ? (
          // Welcome screen
          <div className="flex h-full items-center justify-center px-4">
            <div className="text-center max-w-lg">
              {/* Icon */}
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-gray-100 shadow-xl shadow-blue-500/30">
                <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">How can I help you today?</h2>
              <p className="mt-3 text-base leading-7 text-slate-500">
                Ask me anything — writing, coding, analysis, brainstorming. Just add your Groq API key to get started.
              </p>

              {/* Suggestion pills */}
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {[
                  "Explain quantum computing simply",
                  "Write a Python function for sorting",
                  "Help me brainstorm project ideas",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setInput(suggestion)}
                    className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-700"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              {!apiKey && (
                <p className="mt-6 text-sm text-slate-400">
                  Get your API key from{" "}
                  <a
                    href="https://console.groq.com/keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline decoration-blue-300 underline-offset-2 hover:decoration-blue-500"
                  >
                    console.groq.com
                  </a>
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-4 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] overflow-hidden rounded-2xl px-5 py-3.5 ${msg.role === "user"
                    ? "bg-gradient-to-r from-blue-600 to-blue-300 text-white shadow-lg shadow-blue-500/20"
                    : "rounded-2xl border border-slate-200 bg-white px-5 py-3.5 shadow-sm"
                    }`}
                >
                  {msg.role === "assistant" ? (
                    // Assistant message: render markdown-like formatting
                    <div className="text-sm leading-7 text-slate-700 prose prose-sm max-w-none">
                      {renderAssistantMessage(msg.content)}
                    </div>
                  ) : (
                    <p className="text-sm leading-7 whitespace-pre-wrap">{msg.content}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl border border-slate-200 bg-white px-5 py-3.5 shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.3s]" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-violet-500 [animation-delay:-0.15s]" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="border-t border-slate-200/60 bg-white/80 px-4 py-4 backdrop-blur-md sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="relative flex items-end gap-2 rounded-full border border-slate-200 bg-white p-2 shadow-lg shadow-slate-200/50 transition-all focus-within:border-blue-300 focus-within:shadow-blue-500/15">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message Free AI..."
              rows={1}
              disabled={isLoading}
              className="flex-1 resize-none bg-transparent px-4 py-2 text-base leading-6 text-slate-900 placeholder:text-slate-400 outline-none disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-gray-400 text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.95]"
            >
              <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.478 2.405a.5.5 0 0 0 .926-.06l7.11 23.241a.5.5 0 0 0 .926.06L20.522 5.865a.5.5 0 0 0-.547-.617L3.478 2.405zM12 6L7 14h3l-1 6 6-8h-3l2-6z" />
              </svg>
            </button>
          </div>
          <p className="mt-2 text-center text-xs text-slate-400">
            Free AI can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>

      {/* API key required notification */}
      {showApiNotice && (
        <div className="fixed bottom-24 left-1/2 z-[110] -translate-x-1/2 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/95 px-5 py-3 text-sm font-medium text-amber-800 shadow-xl backdrop-blur-sm">
            <svg className="h-4 w-4 shrink-0 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 9v4m0 4h.01M10.29 3.86l-8.18 14.18A2 2 0 0 0 3.82 21h16.36a2 2 0 0 0 1.71-3.96L13.71 3.86a2 2 0 0 0-3.42 0z" />
            </svg>
            Please set your Groq API key first
          </div>
        </div>
      )}

      {/* API Key modal */}
      {showApiInput && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-semibold text-slate-900">Groq API Key</h3>
            <p className="mt-1 text-sm text-slate-500">
              Enter your Groq API key to enable AI chat. Your key is stored locally in your browser.
            </p>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="gsk_..."
              className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-3 text-base font-mono outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              onKeyDown={(e) => e.key === "Enter" && saveApiKey()}
            />
            <div className="mt-4 flex items-center justify-between gap-3">
              <a
                href="https://console.groq.com/keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 underline decoration-blue-300 underline-offset-2 hover:decoration-blue-500"
              >
                Get a key →
              </a>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowApiInput(false)}
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={saveApiKey}
                  disabled={!apiKey.trim()}
                  className="rounded-full bg-gradient-to-r from-blue-600 to-gray-200 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg disabled:opacity-40"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
