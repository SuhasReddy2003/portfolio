export type ExperienceEntry = {
  company: string;
  role: string;
  location: string;
  dates: string;
  bullets: string[];
};

export const experience: ExperienceEntry[] = [
  {
    company: "SIEPL Innovations Pvt Ltd",
    role: "AI/ML Developer",
    location: "Remote",
    dates: "Dec 2024 — Present",
    bullets: [
      "Built a multilingual AI assistant (English, Kannada, Telugu, Hindi) for client MDxBlocks using semantic search (FAISS, Sentence Transformers) and KeyBERT keyword extraction",
      "Customized and migrated an ERPNext/Frappe instance for internal business operations",
      "Coordinated the Yantra Neo hackathon and guest lectures across Web Dev, Biotech, and AI tracks for 800+ students",
      "Analyzed and reported on COVID-19 isolation case data for Bangalore, presented via Excel and PowerPoint",
    ],
  },
];

export type EducationEntry = {
  school: string;
  degree: string;
  dates: string;
  detail?: string;
};

export const education: EducationEntry[] = [
  {
    school: "University of Southern California",
    degree: "M.S. Computer Science",
    dates: "2026 — 2028",
  },
  {
    school: "VIT Vellore",
    degree: "B.Tech Computer Science and Engineering",
    dates: "2021 — 2025",
    detail: "CGPA 8.7 / 10",
  },
];
