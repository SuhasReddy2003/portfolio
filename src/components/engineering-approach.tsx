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
    accent: true,
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
  return (
    <section id="about" className="border-b border-border">
      <div className="container-page py-20 sm:py-24">
        <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">How I Build</h2>
        <p className="mt-2 text-muted">
          The layers I think in, from what a user touches down to what keeps it running.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row">
          {stages.map((stage, i) => (
            <Stage key={stage.label} stage={stage} isFirst={i === 0} isLast={i === stages.length - 1} />
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
}: {
  stage: (typeof stages)[number];
  isFirst: boolean;
  isLast: boolean;
}) {
  const Icon = stage.icon;
  const [hovered, setHovered] = useState(false);
  const [typed, setTyped] = useState("");
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (timer.current) clearInterval(timer.current);

    if (!hovered) {
      setTyped("");
      return;
    }

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setTyped(stage.snippet);
      return;
    }

    let i = 0;
    timer.current = setInterval(() => {
      i += 1;
      setTyped(stage.snippet.slice(0, i));
      if (i >= stage.snippet.length && timer.current) {
        clearInterval(timer.current);
      }
    }, 18);

    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [hovered, stage.snippet]);

  return (
    <div
      className="group flex flex-1 items-stretch"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div
        className={cn(
          "flex-1 border border-border p-5 transition-colors group-hover:border-text/30",
          !isFirst && "sm:border-l-0",
          stage.accent && "group-hover:border-accent/40"
        )}
      >
        <Icon
          size={16}
          className={cn(
            "transition-colors",
            stage.accent ? "text-accent" : "text-muted group-hover:text-text"
          )}
        />
        <h3 className="mt-3 font-mono text-xs uppercase tracking-wide text-text">{stage.label}</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-muted">{stage.blurb}</p>
        <p className="mt-3 text-xs text-text/70">{stage.items.join(" · ")}</p>

        <div className="mt-3 min-h-[5.5rem] border-t border-border pt-2">
          <p className="whitespace-pre-wrap break-words font-mono text-[10px] leading-relaxed text-green-500 dark:text-green-400">
            {typed}
            {hovered && typed.length < stage.snippet.length && (
              <span aria-hidden className="animate-pulse">
                ▍
              </span>
            )}
          </p>
        </div>
      </div>
      {!isLast && (
        <div aria-hidden className="hidden w-5 shrink-0 items-center justify-center sm:flex">
          <span className="text-muted transition-colors group-hover:text-accent">→</span>
        </div>
      )}
    </div>
  );
}
