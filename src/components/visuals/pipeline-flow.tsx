"use client";

import { Fragment } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/lib/use-in-view";

export type PipelineNode = {
  label: string;
  sublabel?: string;
  accent?: boolean;
  branch?: boolean; // renders as a smaller side node (e.g. "Human Review")
};

export function PipelineFlow({
  nodes,
  size = "sm",
}: {
  nodes: PipelineNode[];
  size?: "sm" | "lg";
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  const main = nodes.filter((n) => !n.branch);
  const branch = nodes.find((n) => n.branch);

  return (
    <div ref={ref} className="rounded-md border border-border bg-bg/50 p-4" aria-hidden>
      <div className="flex flex-col items-stretch gap-1.5 sm:flex-row sm:items-center sm:gap-0">
        {main.map((node, i) => (
          <Fragment key={node.label}>
            <Node node={node} size={size} delay={i} show={inView} />
            {i < main.length - 1 && <Connector show={inView} delay={i} />}
          </Fragment>
        ))}
      </div>

      {branch && (
        <div className="mt-3 flex items-center gap-2 pl-1">
          <span className="text-muted">↳</span>
          <Node node={branch} size="sm" delay={main.length} show={inView} />
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
}: {
  node: PipelineNode;
  size: "sm" | "lg";
  delay: number;
  show: boolean;
}) {
  return (
    <div
      className={cn(
        "shrink-0 rounded border px-2.5 py-1.5 text-center font-mono transition-all duration-500 sm:flex-1",
        size === "lg" ? "text-xs" : "text-[11px]",
        node.accent ? "border-accent/40 text-accent" : "border-border text-text",
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

function Connector({ show, delay }: { show: boolean; delay: number }) {
  return (
    <div
      className={cn(
        "mx-auto h-3 w-px shrink-0 bg-border transition-opacity duration-500 sm:mx-1 sm:h-px sm:w-3 sm:flex-none",
        show ? "opacity-100" : "opacity-0"
      )}
      style={{ transitionDelay: show ? `${delay * 90 + 40}ms` : "0ms" }}
    />
  );
}
