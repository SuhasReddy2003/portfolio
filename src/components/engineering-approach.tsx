const stages = [
  { label: "Product", items: ["React", "Next.js"] },
  { label: "Application", items: ["Node.js", "REST APIs", "Django"] },
  { label: "Data", items: ["PostgreSQL", "Supabase", "MongoDB"] },
  { label: "AI", items: ["OpenAI API", "RAG", "NLP"], accent: true },
  { label: "Infrastructure", items: ["Vercel", "Docker", "CI/CD"] },
];

export function EngineeringApproach() {
  return (
    <section id="about" className="border-b border-border">
      <div className="container-page py-20 sm:py-24">
        <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">How I Build</h2>
        <p className="mt-2 text-muted">End-to-end, from the product layer down to infrastructure.</p>

        <div className="mt-10 flex flex-col divide-y divide-border border border-border sm:flex-row sm:divide-x sm:divide-y-0">
          {stages.map((stage) => (
            <div key={stage.label} className="flex-1 p-5">
              <h3
                className={
                  stage.accent
                    ? "font-mono text-xs uppercase tracking-wide text-accent"
                    : "font-mono text-xs uppercase tracking-wide text-muted"
                }
              >
                {stage.label}
              </h3>
              <ul className="mt-3 flex flex-col gap-1.5">
                {stage.items.map((item) => (
                  <li key={item} className="text-sm text-text/90">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
