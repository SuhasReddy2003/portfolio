"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Language = { code: string; label: string; alt: string };

const LANGUAGES: Language[] = [
  { code: "en", label: "English", alt: "English" },
  { code: "kn", label: "ಕನ್ನಡ", alt: "Kannada" },
  { code: "te", label: "తెలుగు", alt: "Telugu" },
  { code: "hi", label: "हिन्दी", alt: "Hindi" },
];

const STAGES = ["Language Detection", "NLP / Retrieval", "AI Response"] as const;

export function MdxblocksPipeline() {
  const [selected, setSelected] = useState<string | null>(null);
  const [step, setStep] = useState(-1);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const active = timers.current;
    return () => active.forEach(clearTimeout);
  }, []);

  function selectLanguage(code: string) {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setSelected(code);
    setStep(-1);

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setStep(STAGES.length);
      return;
    }

    STAGES.forEach((_, i) => {
      const t = setTimeout(() => setStep(i), (i + 1) * 350);
      timers.current.push(t);
    });
    const finalT = setTimeout(() => setStep(STAGES.length), (STAGES.length + 1) * 350);
    timers.current.push(finalT);
  }

  const selectedLabel = LANGUAGES.find((l) => l.code === selected);

  return (
    <div className="rounded-md border border-border bg-bg/50 p-4">
      <div className="flex flex-wrap gap-1.5">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            type="button"
            aria-label={`Send a ${lang.alt ?? lang.label} request`}
            onClick={() => selectLanguage(lang.code)}
            className={cn(
              "rounded border px-2.5 py-1 font-mono text-[11px] transition-colors",
              selected === lang.code
                ? "border-accent/60 text-accent"
                : "border-border text-muted hover:border-text/40 hover:text-text"
            )}
          >
            {lang.label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-col items-stretch gap-1.5 sm:flex-row sm:items-center sm:gap-0">
        <Node
          label={selectedLabel ? `${selectedLabel.label} request` : "Select a language"}
          active={selected !== null}
        />
        <Connector active={step >= 0} />
        {STAGES.map((stage, i) => (
          <div key={stage} className="contents">
            <Node label={stage} active={step >= i} accent={stage === "AI Response"} />
            {i < STAGES.length - 1 && <Connector active={step > i} />}
          </div>
        ))}
        <Connector active={step >= STAGES.length} />
        <Node label="Student / Parent / Teacher" active={step >= STAGES.length} />
      </div>
    </div>
  );
}

function Node({ label, active, accent }: { label: string; active: boolean; accent?: boolean }) {
  return (
    <div
      className={cn(
        "shrink-0 rounded border px-2.5 py-1.5 text-center font-mono text-[11px] transition-all duration-300 sm:flex-1",
        accent && active ? "border-accent/60 text-accent" : "border-border text-text",
        active ? "opacity-100" : "opacity-40"
      )}
    >
      {label}
    </div>
  );
}

function Connector({ active }: { active: boolean }) {
  return (
    <div
      className={cn(
        "mx-auto h-3 w-px shrink-0 transition-colors duration-300 sm:mx-1 sm:h-px sm:w-3 sm:flex-none",
        active ? "bg-accent/50" : "bg-border"
      )}
    />
  );
}
