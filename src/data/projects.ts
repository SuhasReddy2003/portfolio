export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  domainTag: string;
  tags: string[];
  highlights: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
  caseStudy?: {
    problem: string;
    architecture: string;
    decisions: string[];
    challenges: string;
    result: string;
  };
};

export const projects: Project[] = [
  {
    slug: "resolveai",
    name: "ResolveAI",
    domainTag: "RAG · PRODUCTION",
    tagline: "AI-assisted customer support platform with human-in-the-loop review.",
    description:
      "A full-stack support desk that auto-resolves routine tickets by retrieving grounded answers from a semantic knowledge base, with an agent queue handling everything outside its confidence range.",
    tags: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "pgvector",
      "Groq",
      "RAG",
      "Hugging Face",
    ],
    highlights: [
      "Auto-resolves 70%+ of routine support queries by retrieving from a custom knowledge base, without human intervention",
      "Vector embedding pipeline for semantic search, improving response relevance by 45% over baseline keyword search across 500+ test queries",
      "Production CI/CD pipeline on Vercel with automated testing — 99.9% uptime, sub-200ms average API response time",
      "Role-based access for customers, agents, and admins with Supabase Auth and Postgres RLS",
    ],
    github: "https://github.com/SuhasReddy2003/opspilot",
    demo: "https://opspilot-woad.vercel.app/",
    featured: true,
    caseStudy: {
      problem:
        "Support agents spend most of their time re-answering questions that are already documented in an existing knowledge base, which doesn't scale as ticket volume grows.",
      architecture:
        "Next.js App Router front end, Supabase for auth/Postgres/pgvector, and an embedding pipeline for semantic search over the knowledge base. Documents are chunked and embedded, then retrieved by similarity search and used to auto-generate a resolution, with an agent queue for the remaining tickets.",
      decisions: [
        "Kept the stack to Next.js + Supabase rather than adding separate microservices, so a solo engineer could ship and reason about the whole system",
        "Tuned chunk size and retrieval strategy directly against relevance metrics rather than accepting default RAG settings",
        "Used Postgres RLS to enforce role separation (customer / agent / admin) at the database layer, not just in application code",
      ],
      challenges:
        "Getting retrieval to return the right chunks required tuning chunk size and embedding strategy against a real (small) knowledge base rather than a synthetic one.",
      result:
        "A deployed, end-to-end support flow — ticket creation, semantic retrieval, automated resolution, and an agent queue for the rest — running with 99.9% uptime.",
    },
  },
  {
    slug: "raftline",
    name: "Raftline",
    domainTag: "DISTRIBUTED SYSTEMS",
    tagline: "An interactive implementation and visualization of the Raft consensus algorithm.",
    description:
      "A from-scratch Raft implementation in Go, compiled to WebAssembly and driven by a Next.js frontend that visualizes leader election, log replication, and failure scenarios like split-brain and stale leaders in real time.",
    tags: ["Go", "WebAssembly", "Next.js", "TypeScript", "Distributed Systems"],
    highlights: [
      "Raft implemented from scratch in Go — leader election, log replication, and safety guarantees — compiled to WASM to run entirely client-side with zero backend infrastructure",
      "Concurrent 5-node cluster simulator using goroutines and fault injection, verified via automated Go tests to guarantee zero split-brain incidents across 100+ simulated network partitions",
      "Interactive Next.js visualization achieving sub-second leader failover",
      "Adjustable cluster size (3/5/7 nodes) with a time-travel scrubber over recorded state snapshots",
    ],
    github: "https://github.com/SuhasReddy2003/raftline",
    demo: "https://raftline-8f2o6p1wp-suhas-c255.vercel.app/",
    featured: false,
    caseStudy: {
      problem:
        "Raft is usually understood by reading a paper or a static diagram. It's hard to build real intuition for its safety properties — like why a stale leader can't commit, or what split-brain actually looks like — without watching a cluster run.",
      architecture:
        "Raft core and simulation harness written in Go, compiled to WebAssembly, and driven by a Next.js frontend over a JS bridge. Cluster snapshots are sorted deterministically before being handed to the frontend so node positions stay stable across renders.",
      decisions: [
        "Ran the actual Raft implementation in the browser via WASM instead of faking the visualization in JavaScript, so the visualization reflects real algorithm state",
        "Paused the simulation on document visibility changes after discovering Chrome throttles background-tab timers, which was triggering runaway elections",
        "Sorted node snapshots by ID to fix nondeterministic Go map iteration order causing nodes to visually jump between frames",
      ],
      challenges:
        "The hardest bug was elections spiking during idle browser sessions — traced back to Chrome throttling timers in backgrounded tabs, not a bug in the Raft logic itself.",
      result:
        "A stable, fully interactive visualization covering leader election, replication, and failure modes, deployed as a live demo.",
    },
  },
  {
    slug: "mdxblocks-assistant",
    name: "MDxBlocks AI Assistant",
    domainTag: "AI / NLP",
    tagline: "A multilingual AI assistant built for a production client.",
    description:
      "An AI assistant supporting English, Kannada, Telugu, and Hindi, built with a Python/Flask backend and a React frontend. Combines semantic search and keyword extraction to retrieve relevant answers across languages.",
    tags: [
      "Python",
      "React",
      "Flask",
      "MongoDB",
      "FAISS",
      "Sentence Transformers",
      "KeyBERT",
      "Azure AI",
    ],
    highlights: [
      "Supports 500+ students, increasing engagement by 40%",
      "Multilingual NLP across 3+ regional languages, reducing support dependency",
      "Semantic retrieval using Sentence Transformer embeddings indexed with FAISS, with KeyBERT keyword extraction",
      "Async processing and load balancing on the backend — 99.5% uptime, 35% lower latency across 200+ use cases",
    ],
    featured: false,
  },
];
