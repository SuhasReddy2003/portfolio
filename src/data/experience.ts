export type ExperienceEntry = {
  company: string;
  role: string;
  location: string;
  dates?: string;
  bullets: string[];
};

export const experience: ExperienceEntry[] = [
  {
    company: "SIEPL Innovations Pvt Ltd",
    role: "AI/ML Developer",
    location: "Remote",
    dates: "Dec 2024 — Jul 2026",
    bullets: [
      "Developed an AI chatbot using Python, React, and MongoDB, supporting 500+ students and increasing engagement by 40%",
      "Integrated multilingual NLP, expanding access to 3+ regional languages and reducing support dependency",
      "Optimized the backend with asynchronous processing and load balancing, achieving 99.5% uptime and 35% lower latency across 200+ use cases",
    ],
  },
  {
    company: "PAMP Technologies",
    role: "Java Developer Intern",
    location: "",
    dates: "Aug 2023 — Oct 2023",
    bullets: [
      "Designed and implemented APIs in Java for frontend and backend systems, reducing API response time by 25%",
      "Created and executed 150+ unit tests, achieving 98% code coverage",
      "Identified and fixed bugs using debugging tools, minimizing downtime",
    ],
  },
  {
    company: "Yantra, VIT Vellore",
    role: "Hackathon Coordinator",
    location: "",
    dates: "2024",
    bullets: [
      "Spearheaded hackathons and coordinated sessions with guest lecturers, engaging 800+ students across Web Development, Biotech, and AI",
    ],
  },
  {
    company: "Project Stepone",
    role: "COVID-19 Data Analyst (Volunteer)",
    location: "",
    bullets: [
      "Compiled and analyzed reports on COVID-19 cases in Bangalore using Excel and PowerPoint, disseminated by management to hospitals to support 50,000+ patients in receiving timely care",
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
    degree: "M.S. Computer Science (Artificial Intelligence)",
    dates: "2026 — 2028 (Expected)",
  },
  {
    school: "VIT Vellore",
    degree: "B.Tech CSE, Specialization in IoT",
    dates: "2021 — 2025",
    detail: "CGPA 8.7 / 10",
  },
];