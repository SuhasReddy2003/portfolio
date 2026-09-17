import { skills } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" className="border-b border-border">
      <div className="container-page py-20 sm:py-24">
        <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">Technical Skills</h2>
        <p className="mt-2 text-muted">The stack behind the projects above.</p>

        <div className="mt-10 flex flex-col divide-y divide-border border-t border-border">
          {skills.map((group) => (
            <div
              key={group.category}
              className="flex flex-col gap-2 py-4 sm:flex-row sm:items-baseline sm:gap-8"
            >
              <h3 className="w-44 shrink-0 text-sm text-muted">{group.category}</h3>
              <p className="text-sm leading-relaxed text-text/90">{group.items.join(" · ")}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
