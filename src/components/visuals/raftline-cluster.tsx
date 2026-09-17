"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type NodeRole = "leader" | "follower" | "candidate" | "timeout";
type Status = "idle" | "electing" | "replicating";

const MAX_LOG = 5;

export function RaftlineCluster() {
  const [leaderIndex, setLeaderIndex] = useState(0);
  const [roles, setRoles] = useState<NodeRole[]>(["leader", "follower", "follower"]);
  const [term, setTerm] = useState(1);
  const [commitIndex, setCommitIndex] = useState(0);
  const [followerSynced, setFollowerSynced] = useState([true, true]);
  const [status, setStatus] = useState<Status>("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const activeTimers = timers.current;
    return () => activeTimers.forEach(clearTimeout);
  }, []);

  function schedule(fn: () => void, delay: number) {
    timers.current.push(setTimeout(fn, delay));
  }

  function runElection() {
    if (status !== "idle") return;
    setStatus("electing");

    const current = leaderIndex;
    const next = (current + 1) % 3;

    schedule(() => {
      setRoles((r) => r.map((role, i) => (i === current ? "timeout" : role)));
    }, 0);

    schedule(() => {
      setRoles((r) => r.map((role, i) => (i === next ? "candidate" : role)));
    }, 500);

    schedule(() => {
      setLeaderIndex(next);
      setRoles((r) => r.map((_, i) => (i === next ? "leader" : "follower")));
      setTerm((t) => t + 1);
      setStatus("idle");
    }, 1000);
  }

  function runReplication() {
    if (status !== "idle" || commitIndex >= MAX_LOG) return;
    setStatus("replicating");
    setFollowerSynced([false, false]);

    schedule(() => setCommitIndex((c) => c + 1), 150);
    schedule(() => setFollowerSynced([true, false]), 550);
    schedule(() => {
      setFollowerSynced([true, true]);
      setStatus("idle");
    }, 950);
  }

  const followerIdx = [0, 1, 2].filter((i) => i !== leaderIndex);

  return (
    <div className="rounded-md border border-border bg-bg/50 p-4 font-mono">
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-text">RAFTLINE</span>
        <span className="flex items-center gap-1.5 text-muted">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              status === "idle" ? "bg-accent" : "bg-accent animate-pulse"
            )}
          />
          {status === "idle" ? "RUNNING" : status.toUpperCase()}
        </span>
      </div>

      <div className="mt-5 flex flex-col items-center gap-4">
        <ClusterNode role={roles[leaderIndex]} label="Node 1" log={commitIndex} />

        <div className="flex w-full items-start justify-center gap-6 sm:gap-12">
          {followerIdx.map((i, pos) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  "h-6 w-px sm:h-8",
                  followerSynced[pos] ? "bg-border" : "bg-accent/40"
                )}
              />
              <ClusterNode
                role={roles[i]}
                label={`Node ${pos + 2}`}
                log={followerSynced[pos] ? commitIndex : Math.max(commitIndex - 1, 0)}
                small
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-6 text-[11px] text-muted">
        <span>Term {term}</span>
        <span>Commit Index {commitIndex}</span>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        <button
          type="button"
          onClick={runElection}
          disabled={status !== "idle"}
          className="rounded border border-border px-3 py-1.5 text-[11px] text-text transition-colors hover:border-text/40 disabled:opacity-40"
        >
          Election
        </button>
        <button
          type="button"
          onClick={runReplication}
          disabled={status !== "idle" || commitIndex >= MAX_LOG}
          className="rounded border border-border px-3 py-1.5 text-[11px] text-text transition-colors hover:border-text/40 disabled:opacity-40"
        >
          Replication
        </button>
      </div>
    </div>
  );
}

function ClusterNode({
  role,
  label,
  log,
  small,
}: {
  role: NodeRole;
  label: string;
  log: number;
  small?: boolean;
}) {
  const roleLabel =
    role === "leader" ? "LEADER" : role === "candidate" ? "CANDIDATE" : role === "timeout" ? "TIMEOUT" : "FOLLOWER";

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={cn(
          "rounded border px-3 py-1.5 text-center transition-colors",
          small ? "text-[10px]" : "text-[11px]",
          role === "leader" && "border-accent/50 text-accent",
          role === "candidate" && "border-accent/50 text-accent",
          role === "timeout" && "border-border text-muted opacity-50",
          role === "follower" && "border-border text-text"
        )}
      >
        <div className="text-muted">{label}</div>
        <div className="mt-0.5">{roleLabel}</div>
      </div>
      <div className="flex gap-0.5" aria-hidden>
        {Array.from({ length: MAX_LOG }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 w-1.5 rounded-[1px] transition-colors",
              i < log ? "bg-accent/60" : "bg-border"
            )}
          />
        ))}
      </div>
    </div>
  );
}
