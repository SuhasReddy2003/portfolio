import { skills } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" className="border-b border-border">
      <div className="container-page py-20 sm:py-24">
        <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">Technical Skills</h2>

        <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => (
            <div key={group.category}>
              <h3 className="text-sm font-medium text-muted">{group.category}</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded border border-border px-2 py-0.5 font-mono text-xs text-text"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
