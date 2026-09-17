import { Github, Linkedin, Mail } from "lucide-react";

const GITHUB_URL = "https://github.com/SuhasReddy2003";
const LINKEDIN_URL = "https://www.linkedin.com/in/YOUR-LINKEDIN-HANDLE";
const EMAIL = "YOUR_EMAIL@example.com";

export function Contact() {
  return (
    <section id="contact">
      <div className="container-page py-24 text-center sm:py-32">
        <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">
          Have a problem worth building?
        </h2>
        <p className="mt-3 text-muted">
          I&apos;m open to software engineering, AI/ML, and technical internship opportunities.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-1.5 text-text transition-opacity hover:opacity-70"
          >
            <Mail size={15} />
            Email Me →
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-text transition-opacity hover:opacity-70"
          >
            <Linkedin size={15} />
            LinkedIn →
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-text transition-opacity hover:opacity-70"
          >
            <Github size={15} />
            GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}
