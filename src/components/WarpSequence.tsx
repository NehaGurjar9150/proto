import { useEffect, useMemo, useRef, useState } from "react";

type Line = {
  kind: "user" | "bot" | "system" | "error";
  text: string;
};

const HELP = `available commands:
  help              — show this help
  projects          — jump to projects section
  skills            — jump to skills section
  about             — jump to about section
  contact           — jump to contact section
  resume            — download Neha's resume
  linkedin          — open LinkedIn profile
  clear             — clear the terminal
or just ask anything about Neha (e.g. "what tools does she use?")`;

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  const y = el.getBoundingClientRect().top + window.scrollY - 60;
  window.scrollTo({ top: y, behavior: "smooth" });
  return true;
}

async function askNeha(history: Line[], prompt: string): Promise<string> {
  const messages = history
    .filter((l) => l.kind === "user" || l.kind === "bot")
    .slice(-8)
    .map((l) => ({
      role: l.kind === "user" ? "user" : "assistant",
      content: l.text,
    }));

  try {
    // Use the Supabase edge function URL - Groq API is called server-side
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 
      "https://ddehjkocxllhagbpqajr.functions.supabase.co/ask-neha";
    
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages, prompt }),
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`);
    }

    const data = await response.json();
    if (data?.error) throw new Error(data.error);
    return data?.reply ?? "(no reply)";
  } catch (error) {
    const msg = error instanceof Error ? error.message : "request failed";
    console.error("askNeha error:", msg);
    throw new Error(msg);
  }
}

export function WarpSequence() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  const startedRef = useRef(false);

  const [lines, setLines] = useState<Line[]>([
    { kind: "system", text: "ask-neha terminal v1.0 — type 'help' to begin." },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const historyRef = useRef<string[]>([]);
  const historyIdxRef = useRef<number>(-1);
  const draftRef = useRef<string>("");

  const streaks = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        id: i,
        angle: Math.random() * 360,
        delay: Math.random() * 2.2,
        duration: 1.2 + Math.random() * 1.6,
        length: 80 + Math.random() * 220,
      })),
    []
  );

  const shooters = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        top: Math.random() * 70,
        left: Math.random() * 70,
        delay: i * 0.35 + Math.random() * 0.6,
        duration: 1.4 + Math.random() * 1.4,
      })),
    []
  );

  const columns = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: (i / 28) * 100,
        delay: Math.random() * 2.5,
        duration: 2.4 + Math.random() * 2.5,
        chars: Array.from({ length: 18 }, () =>
          Math.random() > 0.5
            ? Math.round(Math.random())
            : ["{", "}", "<", ">", "/", "·"][Math.floor(Math.random() * 6)]
        ),
      })),
    []
  );

  // Activate when scrolled into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          entry.intersectionRatio > 0.4 &&
          !startedRef.current
        ) {
          startedRef.current = true;
          setActive(true);
        }
      },
      { threshold: [0, 0.4, 0.8] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    const t1 = setTimeout(() => setPhase(1), 2400);
    const t2 = setTimeout(() => setPhase(2), 4800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [active]);

  // Focus input when terminal phase reached
  useEffect(() => {
    if (phase === 2) inputRef.current?.focus();
  }, [phase]);

  // Autoscroll terminal output
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [lines, busy]);

  const append = (l: Line) => setLines((prev) => [...prev, l]);

  async function handleCommand(raw: string) {
    const cmd = raw.trim();
    if (!cmd) return;

    // push to history (skip consecutive duplicates)
    const h = historyRef.current;
    if (h[h.length - 1] !== cmd) h.push(cmd);
    historyIdxRef.current = h.length;
    draftRef.current = "";

    append({ kind: "user", text: cmd });
    const lower = cmd.toLowerCase();


    // Built-in commands
    if (lower === "clear" || lower === "cls") {
      setLines([]);
      return;
    }
    if (lower === "help" || lower === "?") {
      append({ kind: "system", text: HELP });
      return;
    }
    if (/^(projects?|show projects?|view projects?)$/.test(lower)) {
      append({ kind: "system", text: "→ navigating to projects…" });
      scrollToId("projects");
      return;
    }
    if (lower === "skills") {
      append({ kind: "system", text: "→ navigating to skills…" });
      scrollToId("skills");
      return;
    }
    if (lower === "about") {
      append({ kind: "system", text: "→ navigating to about…" });
      scrollToId("about");
      return;
    }
    if (
      lower === "contact" ||
      lower === "go to contact" ||
      lower === "go to contact page"
    ) {
      append({ kind: "system", text: "→ navigating to contact…" });
      scrollToId("contact");
      return;
    }
    if (lower === "resume" || lower === "download resume") {
      append({ kind: "system", text: "↓ downloading resume…" });
      const a = document.createElement("a");
      a.href = "/Neha_Gurjar_Resume.pdf";
      a.download = "Neha_Gurjar_Resume.pdf";
      a.click();
      return;
    }
    if (
      lower === "linkedin" ||
      lower.includes("show me your linkedin") ||
      lower.includes("linkedin profile")
    ) {
      append({
        kind: "system",
        text: "↗ opening linkedin.com/in/neha-gurjar-134a33222",
      });
      window.open(
        "https://in.linkedin.com/in/neha-gurjar-134a33222",
        "_blank",
        "noreferrer"
      );
      return;
    }

    // Soft intent matching for navigation in natural language
    if (/show.*project|see.*project|projects?\b/.test(lower)) {
      append({ kind: "system", text: "→ navigating to projects…" });
      scrollToId("projects");
      return;
    }

    // Fallback → AI
    setBusy(true);
    try {
      const reply = await askNeha(lines, cmd);
      append({ kind: "bot", text: reply });
    } catch (e: any) {
      append({
        kind: "error",
        text: `error: ${e?.message ?? "request failed"}`,
      });
    } finally {
      setBusy(false);
    }
  }

  const phaseLabel =
    phase === 0
      ? "INITIATING WARP"
      : phase === 1
      ? "ENTERING THE VOID"
      : "SIGNAL ACQUIRED";

  return (
    <section
      ref={sectionRef}
      aria-label="Warp sequence"
      className="relative min-h-screen w-full overflow-hidden bg-black"
    >
      {/* PHASE 0 — WARP STREAKS */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: phase === 0 ? 1 : 0, perspective: "600px" }}
      >
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 flex items-center justify-center">
          {streaks.map((s) => (
            <span
              key={s.id}
              className="absolute left-1/2 top-1/2 origin-left"
              style={{
                width: `${s.length}px`,
                height: "1.5px",
                background:
                  "linear-gradient(90deg, transparent, rgba(180,220,255,0.95), transparent)",
                transform: `rotate(${s.angle}deg) translateX(0px) scaleX(0.1)`,
                animation: `warp-line ${s.duration}s ${s.delay}s linear infinite`,
                opacity: 0,
                ["--rot" as any]: `${s.angle}deg`,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_60%,#000_85%)]" />
      </div>

      {/* PHASE 1 — VOID + SHOOTING STARS */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ opacity: phase === 1 ? 1 : 0 }}
      >
        <div className="absolute inset-0 bg-black" />
        {shooters.map((s) => (
          <span
            key={s.id}
            className="absolute h-px w-32"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              background:
                "linear-gradient(90deg, transparent, #ffffff, rgba(140,200,255,0.6), transparent)",
              animation: `shooting-star ${s.duration}s ease-out ${s.delay}s infinite`,
              filter: "drop-shadow(0 0 6px rgba(160,210,255,0.9))",
            }}
          />
        ))}
        {Array.from({ length: 60 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: "1.5px",
              height: "1.5px",
              animationDelay: `${Math.random() * 3}s`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      {/* PHASE 2 — INTERACTIVE TERMINAL CHATBOT */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: phase === 2 ? 1 : 0, pointerEvents: phase === 2 ? "auto" : "none" }}
      >
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 overflow-hidden opacity-60">
          {columns.map((c) => (
            <div
              key={c.id}
              className="absolute top-0 font-mono text-[11px] leading-tight text-cyan/60"
              style={{
                left: `${c.left}%`,
                animation: `data-rain ${c.duration}s linear ${c.delay}s infinite`,
                textShadow: "0 0 8px rgba(120,200,255,0.5)",
              }}
            >
              {c.chars.map((ch, i) => (
                <div key={i} style={{ opacity: 1 - i * 0.05 }}>
                  {ch}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="relative h-full flex items-center justify-center px-4 py-20">
          <div className="w-full max-w-2xl rounded-lg border border-cyan/30 bg-black/85 backdrop-blur-md shadow-[0_0_60px_rgba(80,160,220,0.25)]">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-cyan/20">
              <span className="h-2 w-2 rounded-full bg-destructive/80" />
              <span className="h-2 w-2 rounded-full bg-gold/80" />
              <span className="h-2 w-2 rounded-full bg-cyan/80" />
              <span className="ml-3 font-mono text-[10px] tracking-widest text-muted-foreground">
                ask-neha ~ $
              </span>
            </div>

            <div
              ref={scrollRef}
              className="p-4 md:p-5 font-mono text-xs md:text-sm h-[55vh] max-h-120 overflow-y-auto space-y-1.5 leading-relaxed"
              onClick={() => inputRef.current?.focus()}
            >
              {lines.map((l, i) => {
                if (l.kind === "user") {
                  return (
                    <div key={i} className="text-cyan">
                      <span className="text-muted-foreground">$</span> {l.text}
                    </div>
                  );
                }
                if (l.kind === "bot") {
                  return (
                    <div key={i} className="text-foreground/85 whitespace-pre-wrap">
                      <span className="text-magenta">▸</span> {l.text}
                    </div>
                  );
                }
                if (l.kind === "error") {
                  return (
                    <div key={i} className="text-destructive whitespace-pre-wrap">
                      {l.text}
                    </div>
                  );
                }
                return (
                  <div key={i} className="text-muted-foreground whitespace-pre-wrap">
                    {l.text}
                  </div>
                );
              })}

              {busy && (
                <div className="text-foreground/60">
                  <span className="text-magenta">▸</span> thinking
                  <span className="inline-block w-2 h-3.5 bg-cyan/70 ml-1 align-middle" style={{ animation: "terminal-blink 1s steps(1) infinite" }} />
                </div>
              )}

              {/* Inline input prompt */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (busy) return;
                  const v = input;
                  setInput("");
                  void handleCommand(v);
                }}
                className="flex items-center gap-2 pt-1"
              >
                <span className="text-cyan">$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    // user is editing → reset history cursor and remember draft
                    historyIdxRef.current = historyRef.current.length;
                    draftRef.current = e.target.value;
                  }}
                  onKeyDown={(e) => {
                    const h = historyRef.current;
                    if (e.key === "ArrowUp") {
                      if (h.length === 0) return;
                      e.preventDefault();
                      if (historyIdxRef.current === h.length) {
                        draftRef.current = input;
                      }
                      const next = Math.max(0, historyIdxRef.current - 1);
                      historyIdxRef.current = next;
                      setInput(h[next] ?? "");
                    } else if (e.key === "ArrowDown") {
                      if (h.length === 0) return;
                      e.preventDefault();
                      const next = Math.min(h.length, historyIdxRef.current + 1);
                      historyIdxRef.current = next;
                      setInput(next === h.length ? draftRef.current : h[next]);
                    }
                  }}
                  spellCheck={false}
                  autoComplete="off"
                  disabled={busy}
                  className="flex-1 bg-transparent border-none outline-none font-mono text-xs md:text-sm text-foreground caret-cyan"
                  placeholder={busy ? "" : "type a command or ask anything…"}
                />
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* PHASE LABEL */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center pointer-events-none">
        <p className="font-mono text-[10px] tracking-[0.4em] text-cyan/80 uppercase">
          {phaseLabel}
        </p>
        <div className="mt-2 h-px w-40 mx-auto bg-linear-to-r from-transparent via-cyan/60 to-transparent" />
      </div>

      {/* SCROLL HINT (only during animation phases) */}
      {phase < 2 && (
        <button
          onClick={() => setPhase(2)}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-widest text-muted-foreground hover:text-cyan transition-colors uppercase"
        >
          ↓ skip transmission
        </button>
      )}

      <style>{`
        @keyframes warp-line {
          0% { transform: rotate(var(--rot, 0deg)) translateX(0px) scaleX(0.15); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: rotate(var(--rot, 0deg)) translateX(110vmax) scaleX(1.6); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
