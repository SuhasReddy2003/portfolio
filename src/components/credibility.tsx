const items = [
  "M.S. Computer Science @ USC",
  "B.Tech Computer Science @ VIT",
  "AI/ML Developer",
  "Software Engineering",
];

export function Credibility() {
  return (
    <div className="border-b border-border">
      <div className="container-page flex flex-wrap gap-x-10 gap-y-3 py-6 text-sm text-muted">
        {items.map((item, i) => (
          <span key={item} className={i === 0 ? "" : "border-l border-border pl-8"}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}