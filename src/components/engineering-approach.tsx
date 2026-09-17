const principles = [
  {
    title: "Build end-to-end",
    body: "From frontend and APIs to databases and deployment.",
  },
  {
    title: "Design for real users",
    body: "Prioritize usability, reliability, and measurable outcomes.",
  },
  {
    title: "Use AI where it adds value",
    body: "Build practical AI systems rather than adding AI as decoration.",
  },
  {
    title: "Measure what matters",
    body: "Latency, reliability, and retrieval quality — not just whether it runs.",
  },
];

export function EngineeringApproach() {
  return (
    <section id="about" className="border-b border-border">
      <div className="container-page py-20 sm:py-24">
        <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">How I Build</h2>

        <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
          {principles.map((p) => (
            <div key={p.title} className="border-l-2 border-border pl-4">
              <h3 className="font-medium">{p.title}</h3>
              <p className="mt-1 text-sm text-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
