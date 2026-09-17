"use client";

import { useState } from "react";
import { ArrowUpRight, ChevronDown, Github } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

export function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col border border-border bg-surface p-6 transition-colors hover:border-text/30 sm:p-7",
        project.featured && "sm:col-span-2"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-medium tracking-tight">{project.name}</h3>
        <div className="flex shrink-0 items-center gap-3 text-muted">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.name} on GitHub`}
              className="transition-colors hover:text-text"
            >
              <Github size={16} />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.name} live demo`}
              className="transition-colors hover:text-text"
            >
              <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      </div>

      <p className="mt-2 text-sm text-muted">{project.tagline}</p>
      <p className="mt-4 text-sm leading-relaxed text-text/90">{project.description}</p>

      <ul className="mt-4 flex flex-col gap-1.5">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-2 text-sm text-muted">
            <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" />
            {h}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded border border-border px-2 py-0.5 font-mono text-xs text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="text-text transition-opacity hover:opacity-70"
          >
            GitHub →
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="text-text transition-opacity hover:opacity-70"
          >
            Live Demo →
          </a>
        )}
        {project.caseStudy && (
          <button
            onClick={() => setOpen((v) => !v)}
            className="ml-auto inline-flex items-center gap-1 text-muted transition-colors hover:text-text"
          >
            Case study
            <ChevronDown
              size={14}
              className={cn("transition-transform", open && "rotate-180")}
            />
          </button>
        )}
      </div>

      {project.caseStudy && open && (
        <div className="mt-5 grid gap-4 border-t border-border pt-5 sm:grid-cols-2">
          <CaseStudyBlock title="Problem" text={project.caseStudy.problem} />
          <CaseStudyBlock title="Architecture" text={project.caseStudy.architecture} />
          <div>
            <h4 className="text-sm font-medium text-text">
              Technical decisions
            </h4>
            <ul className="mt-2 flex flex-col gap-1.5">
              {project.caseStudy.decisions.map((d) => (
                <li key={d} className="flex gap-2 text-sm text-text/90">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <CaseStudyBlock title="Challenges" text={project.caseStudy.challenges} />
          <CaseStudyBlock title="Result" text={project.caseStudy.result} />
        </div>
      )}
    </div>
  );
}

function CaseStudyBlock({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h4 className="text-sm font-medium text-text">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-text/90">{text}</p>
    </div>
  );
}
