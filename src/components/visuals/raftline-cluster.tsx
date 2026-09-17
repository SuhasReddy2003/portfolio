"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const roles: Record<string, string> = {
  leader: "Leader — commits entries and replicates them to followers",
  follower: "Follower — receives replicated entries, times out into an election",
  replication: "Replication — leader streams log entries to each follower",
};

export function RaftlineCluster() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="rounded-md border border-border bg-bg/50 p-4">
      <div className="flex flex-col items-center gap-6 sm:gap-8">
        <NodeBadge
          role="leader"
          label="Leader"
          active={active}
          onHover={setActive}
        />

        <div className="flex w-full items-start justify-center gap-4 sm:gap-10">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <Line active={active === "replication" || active === "leader"} />
              <NodeBadge
                role="follower"
                label="Follower"
                active={active}
                onHover={setActive}
                small
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 min-h-[1.25rem] text-center text-[11px] text-muted">
        {active ? roles[active] : "Hover a node to see its role"}
      </div>
    </div>
  );
}

function NodeBadge({
  role,
  label,
  active,
  onHover,
  small,
}: {
  role: string;
  label: string;
  active: string | null;
  onHover: (r: string | null) => void;
  small?: boolean;
}) {
  const isActive = active === role;
  return (
    <button
      type="button"
      onMouseEnter={() => onHover(role)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(role)}
      onBlur={() => onHover(null)}
      className={cn(
        "rounded border px-3 py-1.5 font-mono text-[11px] transition-colors",
        small ? "px-2.5" : "",
        isActive ? "border-accent/50 text-accent" : "border-border text-text hover:border-text/40"
      )}
    >
      {label}
    </button>
  );
}

function Line({ active }: { active: boolean }) {
  return (
    <div
      className={cn(
        "h-6 w-px transition-colors sm:h-8",
        active ? "bg-accent/40" : "bg-border"
      )}
      aria-hidden
    />
  );
}
