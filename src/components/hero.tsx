import { ArrowRight, FileText, Github, Linkedin, Mail } from "lucide-react";

const RESUME_URL = "/resume.pdf";
const GITHUB_URL = "https://github.com/SuhasReddy2003";
const LINKEDIN_URL = "https://www.linkedin.com/in/YOUR-LINKEDIN-HANDLE";
const EMAIL = "YOUR_EMAIL@example.com";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border">
      <GridBackdrop />
      <div className="container-page relative flex flex-col gap-8 py-24 sm:py-32">
        <div className="max-w-2xl animate-[fade-up_0.5s_ease-out]">
          <h1 className="text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl">
            Software Engineer building intelligent systems.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            I build full-stack software and AI/ML systems — from retrieval pipelines
            and consensus algorithms to production web platforms — with a focus on
            practical engineering over demos.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-1.5 rounded-md bg-text px-4 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
            >
              View Projects
              <ArrowRight size={14} />
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2.5 text-sm font-medium text-text transition-colors hover:bg-surface"
            >
              View Resume
              <FileText size={14} />
            </a>
          </div>

          <div className="mt-8 flex items-center gap-4 text-muted">
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-colors hover:text-text">
              <Github size={18} />
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-text">
              <Linkedin size={18} />
            </a>
            <a href={`mailto:${EMAIL}`} aria-label="Email" className="transition-colors hover:text-text">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function GridBackdrop() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_60%_50%_at_30%_0%,black,transparent)]"
    >
      <defs>
        <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path
            d="M 48 0 L 0 0 0 48"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}
