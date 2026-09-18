"use client";

import { Fragment, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/lib/use-in-view";

export type PipelineNode = {
  label: string;
  sublabel?: string;
  accent?: boolean;
  branch?: boolean; // renders as a smaller side node (e.g. "Human Review")
  explain?: string; // shown in the caption row when this node is hovered/focused
  mockButtons?: string[]; // e.g. ["Accept", "Edit", "Reject"] — visual only, not wired up
};

export function PipelineFlow({
  nodes,
  size = "sm",
  sequence = false,
}: {
  nodes: PipelineNode[];
  size?: "sm" | "lg";
  sequence?: boolean; // slow, looping "data flowing through the system" highlight
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const main = nodes.filter((n) => !n.branch);
  const branch = nodes.find((n) => n.branch);
  const hasExplanations = nodes.some((n) => n.explain);
  const stepCount = main.length + (branch ? 1 : 0);

  useEffect(() => {
    if (!sequence || !inView) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const interval = setInterval(() => {
      setActiveStep((s) => (s + 1) % stepCount);
    }, 550);
    return () => clearInterval(interval);
  }, [sequence, inView, stepCount]);

  const sequenceActive = sequence && inView && hovered === null;

  return (
    <div ref={ref} className="rounded-md border border-border bg-bg/50 p-4">
      <div className="flex flex-col items-stretch gap-1.5 sm:flex-row sm:items-center sm:gap-0">
        {main.map((node, i) => (
          <Fragment key={node.label}>
            <Node
              node={node}
              size={size}
              delay={i}
              show={inView}
              onHover={hasExplanations ? setHovered : undefined}
              active={hovered === node.label}
              flowing={sequenceActive && activeStep === i}
            />
            {i < main.length - 1 && (
              <Connector
                show={inView}
                delay={i}
                active={sequenceActive && activeStep === i}
              />
            )}
          </Fragment>
        ))}
      </div>

      {branch && (
        <div className="mt-3 flex flex-col items-start gap-2 pl-1 sm:flex-row sm:items-center">
          <span className="text-muted">↳</span>
          <Node
            node={branch}
            size="sm"
            delay={main.length}
            show={inView}
            onHover={hasExplanations ? setHovered : undefined}
            active={hovered === branch.label}
            flowing={sequenceActive && activeStep === main.length}
          />
          {branch.mockButtons && (
            <div className="flex gap-1.5">
              {branch.mockButtons.map((label) => (
                <span
                  key={label}
                  className="rounded border border-border px-2 py-1 font-mono text-[10px] text-muted"
                >
                  {label}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {hasExplanations && (
        <div className="mt-3 min-h-[1rem] border-t border-border pt-2 text-[11px] text-muted">
          {hovered ? nodes.find((n) => n.label === hovered)?.explain : "Hover a stage to see what it does"}
        </div>
      )}
    </div>
  );
}

function Node({
  node,
  size,
  delay,
  show,
  onHover,
  active,
  flowing,
}: {
  node: PipelineNode;
  size: "sm" | "lg";
  delay: number;
  show: boolean;
  onHover?: (label: string | null) => void;
  active: boolean;
  flowing?: boolean;
}) {
  const interactive = Boolean(onHover && node.explain);
  return (
    <div
      tabIndex={interactive ? 0 : undefined}
      onMouseEnter={() => onHover?.(node.label)}
      onMouseLeave={() => onHover?.(null)}
      onFocus={() => onHover?.(node.label)}
      onBlur={() => onHover?.(null)}
      className={cn(
        "shrink-0 rounded border px-2.5 py-1.5 text-center font-mono transition-all duration-500 sm:flex-1",
        size === "lg" ? "text-xs" : "text-[11px]",
        node.accent ? "border-accent/40 text-accent" : "border-border text-text",
        interactive && "cursor-default hover:border-text/40",
        active && !node.accent && "border-text/50",
        active && node.accent && "border-accent/70",
        flowing && "border-accent/60 bg-accent/[0.06]",
        show ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
      )}
      style={{ transitionDelay: show ? `${delay * 90}ms` : "0ms" }}
    >
      {node.label}
      {node.sublabel && (
        <div className="mt-0.5 text-[10px] font-normal text-muted">{node.sublabel}</div>
      )}
    </div>
  );
}

function Connector({
  show,
  delay,
  active,
}: {
  show: boolean;
  delay: number;
  active: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto h-3 w-px shrink-0 transition-colors duration-300 sm:mx-1 sm:h-px sm:w-3 sm:flex-none",
        active ? "bg-accent/60" : "bg-border",
        show ? "opacity-100" : "opacity-0"
      )}
      style={{ transitionDelay: show ? `${delay * 90 + 40}ms` : "0ms" }}
    />
  );
}
