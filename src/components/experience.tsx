import { education, experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="border-b border-border">
      <div className="container-page grid gap-16 py-20 sm:py-24 lg:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">Experience</h2>

          <ol className="mt-10 flex flex-col gap-10">
            {experience.map((entry) => (
              <li key={entry.company} className="relative pl-6">
                <span
                  aria-hidden
                  className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-accent"
                />
                <span
                  aria-hidden
                  className="absolute left-[3px] top-4 h-[calc(100%-1rem)] w-px bg-border"
                />
                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-medium">{entry.role} — {entry.company}</h3>
                {entry.dates && <span className="text-sm text-muted">{entry.dates}</span>}
                </div>
                {entry.location && <p className="text-sm text-muted">{entry.location}</p>}
                <ul className="mt-3 flex flex-col gap-1.5">
                  {entry.bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-sm leading-relaxed text-text/90">
                      <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" />
                      {b}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">Education</h2>
          <ul className="mt-10 flex flex-col gap-6">
            {education.map((entry) => (
              <li key={entry.school}>
                <h3 className="font-medium">{entry.school}</h3>
                <p className="text-sm text-muted">{entry.degree}</p>
                <p className="text-sm text-muted">
                  {entry.dates}
                  {entry.detail ? ` · ${entry.detail}` : ""}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
