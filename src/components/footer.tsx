export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} Suhas Reddy</p>
        <p>Built with Next.js &amp; Tailwind CSS</p>
      </div>
    </footer>
  );
}
