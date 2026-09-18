"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Stage = { key: string; label: string; explain: string; accent?: boolean };

const STAGES: Stage[] = [
  { key: "question", label: "User Question", explain: "A customer submits a support ticket in natural language." },
  { key: "embedding", label: "Embedding", explain: "The question is converted into a vector representation." },
  { key: "search", label: "Vector Search", explain: "Retrieves semantically similar knowledge using pgvector." },
  { key: "knowledge", label: "Relevant Knowledge", explain: "The closest-matching chunks from the knowledge base." },
  { key: "llm", label: "LLM", explain: "Generates a grounded response from the retrieved context.", accent: true },
  { key: "response", label: "Suggested Response", explain: "Auto-sent for high-confidence matches — 70%+ of routine queries." },
  { key: "review", label: "Human Review", explain: "An agent queue handles anything outside the confidence range." },
];

const KNOWLEDGE_CARDS = [
  { title: "Refund Policy", similarity: 0.82 },
  { title: "Payment FAQ", similarity: 0.64 },
  { title: "Cancellation Policy", similarity: 0.41 },
];

const SAMPLE_QUESTION = "\u201cHow do I get a refund on my last order?\u201d";
const SAMPLE_RESPONSE =
  "\u201cYour refund has been initiated and should reflect in your original payment method within 3\u20135 business days.\u201d";

type Decision = "Accept" | "Edit" | "Reject" | null;

export function ResolveAIRag() {
  const [step, setStep] = useState(-1); // -1 = idle, 0..6 = active stage index
  const [running, setRunning] = useState(false);
  const [decision, setDecision] = useState<Decision>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const active = timers.current;
    return () => active.forEach(clearTimeout);
  }, []);

  function runRequest() {
    if (running) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setDecision(null);
    setRunning(true);
    setStep(0);

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setStep(STAGES.length - 1);
      setRunning(false);
      return;
    }

    STAGES.forEach((_, i) => {
      if (i === 0) return;
      const t = setTimeout(() => setStep(i), i * 320);
      timers.current.push(t);
    });
    const finish = setTimeout(() => setRunning(false), (STAGES.length - 1) * 320 + 100);
    timers.current.push(finish);
  }

  function reset() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setRunning(false);
    setStep(-1);
    setDecision(null);
  }

  const reachedReview = step >= 6;
  const reachedKnowledge = step >= 3;
  const reachedResponse = step >= 5;

  return (
    <div className="rounded-md border border-border bg-bg/50 p-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] text-muted">
          {SAMPLE_QUESTION}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={runRequest}
            disabled={running}
            className="rounded border border-border px-2.5 py-1 font-mono text-[11px] text-text transition-colors hover:border-text/40 disabled:opacity-40"
          >
            Run request
          </button>
          {step >= 0 && (
            <button
              type="button"
              onClick={reset}
              className="rounded border border-border px-2.5 py-1 font-mono text-[11px] text-muted transition-colors hover:border-text/40"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-col items-stretch gap-1.5 sm:flex-row sm:items-center sm:gap-0">
        {STAGES.map((stage, i) => (
          <div key={stage.key} className="flex flex-1 items-center gap-0 sm:flex-col">
            <div
              tabIndex={0}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              className={cn(
                "flex-1 rounded border px-2.5 py-1.5 text-center font-mono text-xs transition-all duration-300 sm:flex-none sm:w-full",
                stage.accent ? "text-accent" : "text-text",
                step === i
                  ? stage.accent
                    ? "border-accent/70 bg-accent/[0.08]"
                    : "border-text/60 bg-text/[0.04]"
                  : step > i
                    ? "border-accent/30"
                    : "border-border opacity-50"
              )}
            >
              {stage.label}
            </div>
            {i < STAGES.length - 1 && (
              <div
                aria-hidden
                className={cn(
                  "mx-auto h-3 w-px shrink-0 transition-colors duration-300 sm:mx-0 sm:my-1 sm:h-3 sm:w-px",
                  step > i ? "bg-accent/50" : "bg-border"
                )}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-3 min-h-[1.1rem] border-t border-border pt-2 text-[11px] text-muted">
        {hovered !== null ? STAGES[hovered].explain : "Hover a stage, or click Run request to see it live"}
      </div>

      {reachedKnowledge && (
        <div className="mt-4 flex flex-wrap gap-2">
          {KNOWLEDGE_CARDS.map((card) => (
            <div
              key={card.title}
              className="animate-[fade-up_0.4s_ease-out] rounded border border-border px-2.5 py-1.5 font-mono text-[10px] text-muted"
            >
              {card.title}
              <span className="ml-1.5 text-text/40">sim {card.similarity.toFixed(2)}</span>
            </div>
          ))}
        </div>
      )}

      {reachedResponse && (
        <div className="mt-4 animate-[fade-up_0.4s_ease-out] rounded border border-border p-3">
          <div className="font-mono text-[10px] text-muted">Suggested response</div>
          <p className="mt-1.5 text-xs leading-relaxed text-text/90">{SAMPLE_RESPONSE}</p>
        </div>
      )}

      {reachedReview && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] text-muted">Human review</span>
          {(["Accept", "Edit", "Reject"] as const).map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => setDecision(label)}
              className={cn(
                "rounded border px-2.5 py-1 font-mono text-[10px] transition-colors",
                decision === label
                  ? "border-accent/60 text-accent"
                  : "border-border text-muted hover:border-text/40 hover:text-text"
              )}
            >
              {label}
            </button>
          ))}
          {decision && (
            <span className="font-mono text-[10px] text-muted">
              {decision === "Accept" && "\u2014 sent as-is"}
              {decision === "Edit" && "\u2014 opened for agent edit"}
              {decision === "Reject" && "\u2014 routed back to knowledge base"}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
