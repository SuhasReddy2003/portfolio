"use client";

import { AppWindow, Server, Database, Sparkles, Cloud } from "lucide-react";
import { cn } from "@/lib/utils";

const stages = [
  {
    label: "Product",
    icon: AppWindow,
    blurb: "Interfaces users interact with",
    items: ["React", "Next.js", "TypeScript"],
  },
  {
    label: "Application",
    icon: Server,
    blurb: "APIs, business logic, and services",
    items: ["Node.js", "Django", "REST APIs"],
  },
  {
    label: "Data",
    icon: Database,
    blurb: "Persistence, retrieval, and state",
    items: ["PostgreSQL", "Supabase", "MongoDB"],
  },
  {
    label: "AI",
    icon: Sparkles,
    blurb: "Systems that reason over data",
    items: ["RAG", "NLP", "Embeddings"],
    accent: true,
  },
  {
    label: "Infrastructure",
    icon: Cloud,
    blurb: "Deployment and reliability",
    items: ["Docker", "CI/CD", "Vercel"],
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
          {stages.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <div key={stage.label} className="group flex flex-1 items-stretch">
                <div
                  className={cn(
                    "flex-1 border border-border p-5 transition-colors group-hover:border-text/30",
                    i > 0 && "sm:border-l-0",
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
                  <h3 className="mt-3 font-mono text-xs uppercase tracking-wide text-text">
                    {stage.label}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">{stage.blurb}</p>
                  <p className="mt-3 text-xs text-text/70">{stage.items.join(" · ")}</p>
                </div>
                {i < stages.length - 1 && (
                  <div
                    aria-hidden
                    className="hidden w-5 shrink-0 items-center justify-center sm:flex"
                  >
                    <span className="text-muted transition-colors group-hover:text-accent">→</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
