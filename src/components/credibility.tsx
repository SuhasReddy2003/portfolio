const items = [
  "M.S. Computer Science @ USC",
  "B.Tech Computer Science @ VIT",
  "AI/ML Developer",
  "Software Engineering",
];

export function Credibility() {
  return (
    <div className="border-b border-border">
      <div className="container-page flex flex-wrap gap-x-6 gap-y-2 py-5 text-sm text-muted">
        {items.map((item, i) => (
          <span
            key={item}
            className={i === 0 ? "" : "border-l border-border pl-6"}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
