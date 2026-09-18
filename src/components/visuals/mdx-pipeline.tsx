"use client";

import { cn } from "@/lib/utils";
import { useInView } from "@/lib/use-in-view";

const languages = ["English", "Kannada", "Telugu", "Hindi"];
const stages = ["Language Detection", "NLP / Retrieval", "AI Response"];
const recipients = ["Student", "Parent", "Teacher"];

export function MdxPipeline() {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);

  return (
    <div ref={ref} className="rounded-md border border-border bg-bg/50 p-4">
      <div className="flex flex-col items-center gap-2">
        <Row items={languages} show={inView} delay={0} />
        <Connector show={inView} delay={4} />

        {stages.map((label, i) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <Chip
              label={label}
              accent={label === "AI Response"}
              show={inView}
              delay={5 + i}
            />
            <Connector show={inView} delay={5 + i + 1} />
          </div>
        ))}

        <Row items={recipients} show={inView} delay={9} />
      </div>
    </div>
  );
}

function Row({ items, show, delay }: { items: string[]; show: boolean; delay: number }) {
  return (
    <div className="flex flex-wrap justify-center gap-1.5">
      {items.map((item, i) => (
        <Chip key={item} label={item} show={show} delay={delay + i} small />
      ))}
    </div>
  );
}

function Chip({
  label,
  accent,
  small,
  show,
  delay,
}: {
  label: string;
  accent?: boolean;
  small?: boolean;
  show: boolean;
  delay: number;
}) {
  return (
    <span
      className={cn(
        "rounded border px-2.5 py-1 font-mono transition-all duration-500",
        small ? "text-[10px]" : "text-[11px]",
        accent ? "border-accent/40 text-accent" : "border-border text-text",
        show ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
      )}
      style={{ transitionDelay: show ? `${delay * 70}ms` : "0ms" }}
    >
      {label}
    </span>
  );
}

function Connector({ show, delay }: { show: boolean; delay: number }) {
  return (
    <div
      className={cn("h-3 w-px bg-border transition-opacity duration-500", show ? "opacity-100" : "opacity-0")}
      style={{ transitionDelay: show ? `${delay * 70}ms` : "0ms" }}
      aria-hidden
    />
  );
}
