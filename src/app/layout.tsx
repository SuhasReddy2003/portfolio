import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const SITE_URL = "https://suhasreddy.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Suhas Reddy — Software Engineer & AI/ML Developer",
  description:
    "Portfolio of Suhas Reddy, a Software Engineer and AI/ML Developer building full-stack and RAG-based systems with Next.js, TypeScript, Python, and PostgreSQL.",
  openGraph: {
    title: "Suhas Reddy — Software Engineer & AI/ML Developer",
    description:
      "Full-stack and AI/ML projects — RAG pipelines, distributed systems, and production web platforms.",
    url: SITE_URL,
    siteName: "Suhas Reddy",
    type: "website",
  },
};

// Prevents a flash of the wrong theme on first paint by applying the
// stored/system preference before React hydrates.
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme = stored === "light" || stored === "dark"
      ? stored
      : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
