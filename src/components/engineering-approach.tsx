"use client";

import { useEffect, useRef, useState } from "react";
import { AppWindow, Server, Database, Sparkles, Cloud } from "lucide-react";
import { cn } from "@/lib/utils";

const stages = [
  {
    label: "Product",
    icon: AppWindow,
    blurb: "Interfaces users interact with",
    items: ["React", "Next.js", "TypeScript"],
    snippet: "function App({ user }) {\n  return (\n    <Dashboard session={user} />\n  );\n}",
  },
  {
    label: "Application",
    icon: Server,
    blurb: "APIs, business logic, and services",
    items: ["Node.js", "Django", "REST APIs"],
    snippet:
      "app.post('/api/resolve', async (req, res) => {\n  const ticket = await resolve(req.body)\n  res.json(ticket)\n})",
  },
  {
    label: "Data",
    icon: Database,
    blurb: "Persistence, retrieval, and state",
    items: ["PostgreSQL", "Supabase", "MongoDB"],
    snippet: "SELECT id, content\nFROM knowledge_base\nORDER BY embedding <-> query\nLIMIT 5;",
  },
  {
    label: "AI",
    icon: Sparkles,
    blurb: "Systems that reason over data",
    items: ["RAG", "NLP", "Embeddings"],
    snippet:
      "const context = await search(query)\nconst res = await llm.complete({\n  prompt: query,\n  context,\n})",
  },
  {
    label: "Infrastructure",
    icon: Cloud,
    blurb: "Deployment and reliability",
    items: ["Docker", "CI/CD", "Vercel"],
    snippet: "git push origin main\n# CI runs tests\n# Vercel builds image\n# live in ~40s",
  },
];

export function EngineeringApproach() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isTerminal = activeIndex !== null;

  return (
    <section
      id="about"
      className="border-b border-border transition-colors duration-500"
      style={{ backgroundColor: isTerminal ? "#050505" : "var(--bg)" }}
    >
      <div className="container-page py-20 sm:py-24">
        <h2
          className={cn(
            "text-2xl font-medium tracking-tight transition-colors duration-500 sm:text-3xl",
            isTerminal ? "text-green-400" : "text-text"
          )}
        >
          How I Build
        </h2>
        <p
          className={cn(
            "mt-2 transition-colors duration-500",
            isTerminal ? "text-green-400/40" : "text-muted"
          )}
        >
          The layers I think in, from what a user touches down to what keeps it running.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row">
          {stages.map((stage, i) => (
            <Stage
              key={stage.label}
              stage={stage}
              isFirst={i === 0}
              isLast={i === stages.length - 1}
              isActive={activeIndex === i}
              isDimmed={isTerminal && activeIndex !== i}
              onActivate={() => setActiveIndex(i)}
              onDeactivate={() => setActiveIndex((cur) => (cur === i ? null : cur))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Stage({
  stage,
  isFirst,
  isLast,
  isActive,
  isDimmed,
  onActivate,
  onDeactivate,
}: {
  stage: (typeof stages)[number];
  isFirst: boolean;
  isLast: boolean;
  isActive: boolean;
  isDimmed: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  const Icon = stage.icon;
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);

    if (!isActive) {
      setTyped("");
      setDone(false);
      return;
    }

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setTyped(stage.snippet);
      setDone(true);
      return;
    }

    let i = 0;
    const typeNext = () => {
      i += 1;
      setTyped(stage.snippet.slice(0, i));
      if (i >= stage.snippet.length) {
        setDone(true);
        return;
      }
      const prevChar = stage.snippet[i - 1];
      // Irregular, human/streaming-like cadence: brief pause after
      // newlines and punctuation, small jitter everywhere else.
      const base = prevChar === "\n" ? 140 : /[,;(){}]/.test(prevChar) ? 60 : 14 + Math.random() * 24;
      timer.current = setTimeout(typeNext, base);
    };
    timer.current = setTimeout(typeNext, 80);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [isActive, stage.snippet]);

  return (
    <div
      className="group flex flex-1 items-stretch"
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
    >
      <div
        className={cn(
          "relative flex-1 overflow-hidden border p-5 transition-all duration-300",
          !isFirst && "sm:border-l-0",
          isActive
            ? "z-10 scale-[1.03] border-green-500/60 shadow-[0_0_30px_-4px_rgba(74,222,128,0.35)]"
            : "border-border",
          isDimmed && "opacity-30 saturate-50"
        )}
      >
        {isActive && (
          <div aria-hidden className="terminal-scanlines pointer-events-none absolute inset-0" />
        )}

        <Icon
          size={16}
          className={cn(
            "relative transition-colors duration-300",
            isActive ? "text-green-400" : "text-muted group-hover:text-text"
          )}
        />
        <h3
          className={cn(
            "relative mt-3 font-mono text-xs uppercase tracking-wide transition-colors duration-300",
            isActive ? "text-green-400" : "text-text"
          )}
        >
          {stage.label}
        </h3>
        <p
          className={cn(
            "relative mt-1.5 text-xs leading-relaxed transition-colors duration-300",
            isActive ? "text-green-400/50" : "text-muted"
          )}
        >
          {stage.blurb}
        </p>
        <p
          className={cn(
            "relative mt-3 text-xs transition-colors duration-300",
            isActive ? "text-green-400/70" : "text-text/70"
          )}
        >
          {stage.items.join(" · ")}
        </p>

        <div
          className={cn(
            "relative mt-3 min-h-[5.5rem] border-t pt-2 transition-colors duration-300",
            isActive ? "border-green-500/30" : "border-border"
          )}
        >
          {isActive && (
            <p className="whitespace-pre-wrap break-words font-mono text-[10px] leading-relaxed text-green-400">
              <span className="text-green-400/40">{"> "}</span>
              {typed}
              {!done && <span aria-hidden className="terminal-cursor text-green-400">▍</span>}
            </p>
          )}
        </div>
      </div>
      {!isLast && (
        <div aria-hidden className="hidden w-5 shrink-0 items-center justify-center sm:flex">
          <span
            className={cn(
              "transition-colors duration-300",
              isActive || isDimmed ? "text-green-500/20" : "text-muted group-hover:text-accent"
            )}
          >
            →
          </span>
        </div>
      )}
    </div>
  );
}
