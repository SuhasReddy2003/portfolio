"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type NodeRole = "leader" | "follower" | "candidate" | "timeout";
type Status = "idle" | "electing" | "replicating";

const NODE_COUNT = 4;
const MAX_LOG = 5;

export function RaftlineCluster() {
  const [roles, setRoles] = useState<NodeRole[]>(["leader", "follower", "follower", "follower"]);
  const [term, setTerm] = useState(1);
  const [commitIndex, setCommitIndex] = useState(0);
  const [synced, setSynced] = useState([true, true, true, true]);
  const [status, setStatus] = useState<Status>("idle");
  const [electionPhase, setElectionPhase] = useState<"timeout" | "voting" | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const activeTimers = timers.current;
    return () => activeTimers.forEach(clearTimeout);
  }, []);

  function schedule(fn: () => void, delay: number) {
    timers.current.push(setTimeout(fn, delay));
  }

  const leaderIndex = roles.indexOf("leader");

  function runElection() {
    if (status !== "idle") return;
    setStatus("electing");

    const current = leaderIndex;
    const next = (current + 1) % NODE_COUNT;

    // Step 1: the current leader goes offline.
    schedule(() => {
      setRoles((r) => r.map((role, i) => (i === current ? "timeout" : role)));
      setElectionPhase("timeout");
    }, 0);

    // Step 2: the next node in the ring detects the timeout and campaigns.
    schedule(() => {
      setRoles((r) => r.map((role, i) => (i === next ? "candidate" : role)));
      setElectionPhase("voting");
    }, 700);

    // Step 3: the candidate wins the majority and becomes leader. Every
    // other node — including the one that just timed out — settles as
    // a follower of the *new* leader.
    schedule(() => {
      setRoles((r) => r.map((_, i) => (i === next ? "leader" : "follower")));
      setTerm((t) => t + 1);
      setStatus("idle");
      setElectionPhase(null);
    }, 1500);
  }

  function runReplication() {
    if (status !== "idle" || commitIndex >= MAX_LOG) return;
    setStatus("replicating");

    const followers = Array.from({ length: NODE_COUNT }, (_, i) => i).filter(
      (i) => i !== leaderIndex
    );
    setSynced((s) => s.map((v, i) => (i === leaderIndex ? v : false)));

    schedule(() => setCommitIndex((c) => c + 1), 150);
    followers.forEach((idx, pos) => {
      schedule(() => {
        setSynced((s) => s.map((v, i) => (i === idx ? true : v)));
      }, 500 + pos * 350);
    });
    schedule(
      () => setStatus("idle"),
      500 + followers.length * 350 + 150
    );
  }

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

      <div className="relative mt-5">
        {/* Underline that slides to whichever physical node currently holds
            the leader role — the one honest indicator of "who's in charge"
            that doesn't depend on relabeling nodes. */}
        <div className="absolute -top-1 left-0 h-px w-full bg-border" aria-hidden />
        <div
          className="absolute -top-1 h-px bg-accent transition-all duration-500"
          style={{ width: `${100 / NODE_COUNT}%`, left: `${(leaderIndex * 100) / NODE_COUNT}%` }}
          aria-hidden
        />

        <div className="grid grid-cols-2 gap-3 pt-4 sm:grid-cols-4">
          {roles.map((role, i) => (
            <ClusterNode
              key={i}
              index={i}
              role={role}
              log={synced[i] ? commitIndex : Math.max(commitIndex - 1, 0)}
              hovered={hovered === i}
              onHover={setHovered}
            />
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-6 text-[11px] text-muted">
        <span>Term {term}</span>
        <span>Commit Index {commitIndex}</span>
      </div>

      <div className="mt-1.5 min-h-[1rem] text-center text-[10px] text-muted">
        {electionPhase === "timeout" && "Leader unreachable — followers detecting timeout"}
        {electionPhase === "voting" && "Candidate requesting votes from peers"}
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
  index,
  role,
  log,
  hovered,
  onHover,
}: {
  index: number;
  role: NodeRole;
  log: number;
  hovered: boolean;
  onHover: (i: number | null) => void;
}) {
  const roleLabel =
    role === "leader"
      ? "LEADER"
      : role === "candidate"
        ? "CANDIDATE"
        : role === "timeout"
          ? "TIMEOUT"
          : "FOLLOWER";

  return (
    <div className="flex flex-col items-center gap-1.5">
      <button
        type="button"
        onMouseEnter={() => onHover(index)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(index)}
        onBlur={() => onHover(null)}
        className={cn(
          "w-full rounded border px-3 py-1.5 text-center text-[11px] transition-colors",
          (role === "leader" || role === "candidate") && "border-accent/50 text-accent",
          role === "timeout" && "border-border text-muted opacity-50",
          role === "follower" && "border-border text-text",
          hovered && "border-text/60"
        )}
      >
        <div className="text-muted">Node {index + 1}</div>
        <div className="mt-0.5">{roleLabel}</div>
      </button>
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
