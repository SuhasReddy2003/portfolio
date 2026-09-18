"use client";

import { useState } from "react";
import { Github, Linkedin, Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { useActiveSection } from "@/lib/use-active-section";
import { cn } from "@/lib/utils";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

const GITHUB_URL = "https://github.com/SuhasReddy2003";
const LINKEDIN_URL = "https://www.linkedin.com/in/suhas-reddy-05643b247/";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(links.map((l) => l.href.slice(1)));

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/85 backdrop-blur">
      <nav className="container-page flex h-16 items-center justify-between">
        <a href="#top" className="text-sm font-medium tracking-tight">
          Suhas Reddy
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-6 text-sm text-muted">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    "transition-colors hover:text-text",
                    active === link.href.slice(1) && "text-text"
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-muted transition-colors hover:text-text"
            >
              <Github size={17} />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-muted transition-colors hover:text-text"
            >
              <Linkedin size={17} />
            </a>
            <ThemeToggle />
          </div>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-8 w-8 items-center justify-center text-text"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border md:hidden">
          <ul className="container-page flex flex-col gap-1 py-3 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-muted transition-colors hover:text-text"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="flex gap-4 pt-2">
              <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="text-muted">
                <Github size={17} />
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="text-muted">
                <Linkedin size={17} />
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
