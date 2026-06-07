"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Loader2, Sparkles, RotateCcw } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "How do I sell my scrap?",
  "Which cities do you serve?",
  "What scrap do you buy?",
  "Are you available on Sunday?",
];

const WELCOME: Message = {
  role: "assistant",
  content: "👋 Hi! I'm **SCRAP AI**, your SCRAPYARD assistant - available **24/7**!\n\nI can help you with scrap pickup booking, today's rates, service areas, and anything else. How can I help you?",
};

function renderText(text: string) {
  // Bold **text**
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>
      : <span key={i}>{part}</span>
  );
}

export function AIChatWidget() {
  const [open, setOpen]         = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [unread, setUnread]     = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const send = async (text?: string) => {
    const userText = (text ?? input).trim();
    if (!userText || loading) return;

    const userMsg: Message = { role: "user", content: userText };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res  = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });
      const data = await res.json();
      const aiMsg: Message = { role: "assistant", content: data.reply ?? "Sorry, something went wrong." };
      setMessages((prev) => [...prev, aiMsg]);
      if (!open) setUnread((n) => n + 1);
    } catch {
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: "Sorry, I couldn't connect. Please try again or call **+91 8505863220**.",
      }]);
    }
    setLoading(false);
  };

  const reset = () => setMessages([WELCOME]);

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2">
        <AnimatePresence>
          {!open && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="glass-card rounded-2xl px-3 py-2 text-xs text-silver border border-dark-border pointer-events-none"
            >
              Ask me about scrap rates 💬
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setOpen((v) => !v)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
          style={{ background: "linear-gradient(135deg, #2CEB88, #1db870)" }}
          aria-label="Open AI Chat"
        >
          <AnimatePresence mode="wait">
            {open
              ? <motion.div key="x" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}><X className="w-6 h-6 text-background" /></motion.div>
              : <motion.div key="bot" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Sparkles className="w-6 h-6 text-background" /></motion.div>
            }
          </AnimatePresence>
          {unread > 0 && !open && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
              {unread}
            </span>
          )}
        </motion.button>
      </div>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed bottom-24 left-6 z-40 w-[340px] sm:w-[380px] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: "#0d1825", border: "1px solid rgba(44,235,136,0.15)", maxHeight: "520px" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
              style={{ background: "linear-gradient(135deg, rgba(44,235,136,0.12), rgba(0,60,158,0.12))", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="w-9 h-9 rounded-xl bg-accent-glow/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-accent-glow" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>SCRAP AI</p>
                <p className="text-xs text-accent-glow flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-glow animate-pulse inline-block" />
                  Online · Powered by Gemini
                </p>
              </div>
              <button onClick={reset} title="Clear chat"
                className="p-1.5 text-text-muted hover:text-white rounded-lg hover:bg-white/5 transition-all">
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setOpen(false)}
                className="p-1.5 text-text-muted hover:text-white rounded-lg hover:bg-white/5 transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ minHeight: 0 }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    msg.role === "user" ? "bg-accent-glow/20" : "bg-white/8"
                  }`}>
                    {msg.role === "user"
                      ? <User className="w-3.5 h-3.5 text-accent-glow" />
                      : <Bot className="w-3.5 h-3.5 text-text-muted" />}
                  </div>
                  <div className={`max-w-[78%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                    msg.role === "user"
                      ? "bg-accent-glow/15 text-white rounded-tr-sm"
                      : "bg-white/6 text-silver rounded-tl-sm"
                  }`}>
                    {msg.content.split("\n").map((line, j) => (
                      <p key={j} className={j > 0 ? "mt-1" : ""}>{renderText(line)}</p>
                    ))}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-xl bg-white/8 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3.5 h-3.5 text-text-muted" />
                  </div>
                  <div className="px-3 py-2.5 rounded-2xl rounded-tl-sm bg-white/6 flex items-center gap-1.5">
                    {[0, 1, 2].map((d) => (
                      <motion.span key={d} className="w-1.5 h-1.5 rounded-full bg-text-muted"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions (only at start) */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5 flex-shrink-0">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => send(s)}
                    className="text-xs px-2.5 py-1.5 rounded-xl border border-accent-glow/25 text-accent-glow hover:bg-accent-glow/10 transition-all">
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-3 pb-3 pt-2 flex-shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
                  placeholder="Ask about scrap rates, pickup…"
                  className="flex-1 bg-transparent text-xs text-white placeholder-text-muted outline-none"
                  disabled={loading}
                />
                <button
                  onClick={() => send()}
                  disabled={!input.trim() || loading}
                  className="w-7 h-7 rounded-lg bg-accent-glow flex items-center justify-center disabled:opacity-40 transition-all hover:bg-accent-glow/80 flex-shrink-0"
                >
                  {loading
                    ? <Loader2 className="w-3.5 h-3.5 text-background animate-spin" />
                    : <Send className="w-3.5 h-3.5 text-background" />}
                </button>
              </div>
              <p className="text-center text-xs text-text-muted mt-1.5 opacity-50">Powered by Google Gemini</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
