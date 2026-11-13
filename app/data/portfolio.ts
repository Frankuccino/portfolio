import type { IconName } from "tech-stack-icons";

export type SkillGroup = {
  title: string;
  note: string;
  icon: IconName;
  /** What this group means in practice — shown instead of the one-line note */
  summary: string;
  /** Featured groups render as large panels above the supporting grid */
  featured?: boolean;
  items: string[];
};

export type Project = {
  id: string;
  title: string;
  role: string;
  year: string;
  stack: string[];
  summary: string;
  highlights: string[];
  links: { label: string; href: string }[];
  featured?: boolean;
};

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  completed: string;
  hours: number;
  credentialId?: string;
  image?: string;
};

export const skillGroups: SkillGroup[] = [
  {
    title: "AI Engineering",
    note: "LLM systems, end to end.",
    icon: "openai",
    featured: true,
    summary:
      "The applied layer. I design the architecture around a foundation model — context, guardrails, routing, caching — and build the retrieval, evaluation, and monitoring that let an LLM feature survive production. Model output is treated as untrusted input throughout.",
    items: [
      "LLM Application Development",
      "Prompt Engineering",
      "Embeddings",
      "Semantic Search",
      "RAG",
      "LLM Evaluation",
      "LLMOps",
    ],
  },
  {
    title: "LLM Tools & Agents",
    note: "Making models useful.",
    icon: "langchain",
    featured: true,
    summary:
      "The interface layer. I wire models into working software: tool calling with strict schemas, agent loops, orchestration, and the vector stores and protocols that connect them to the rest of the system.",
    items: [
      "OpenAI API",
      "Anthropic API",
      "Hugging Face",
      "LangChain",
      "LangGraph",
      "Pinecone",
      "ChromaDB",
      "Vector Search",
      "AI Agents",
      "ReAct",
      "Tool Calling",
      "MCP",
    ],
  },
  {
    title: "Languages",
    note: "First tools I reach for.",
    icon: "typescript",
    summary:
      "TypeScript and Go for systems work, Rust where performance and safety are the budget, Python for data and ML. I pick the language that fits the problem rather than the one I know best.",
    items: ["JavaScript", "TypeScript", "Go", "Rust", "Python", "SQL"],
  },
  {
    title: "Frontend",
    note: "Interfaces that hold up.",
    icon: "react",
    summary:
      "React with TypeScript, styled with Tailwind. I build interfaces that stay maintainable as the product grows — clear component boundaries, state colocated with its consumer, and accessibility treated as a default.",
    items: ["React", "Next.js", "HTML", "CSS", "TailwindCSS"],
  },
  {
    title: "Backend",
    note: "APIs and data layers.",
    icon: "expressjs",
    summary:
      "RESTful APIs and data layers in Node, Express, and Go, with PostgreSQL as the default store. I design for the query patterns first, then the schema around them.",
    items: [
      "RESTful APIs",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "MongoDB",
      "SQLx",
      "Actix Web",
    ],
  },
  {
    title: "Architecture & Cloud",
    note: "Systems that ship and scale.",
    icon: "cloudflare",
    summary:
      "Microservices and event-driven systems, containerized and deployed on AWS, Cloudflare, and K3s. Terraform and GitHub Actions keep the path from commit to production short.",
    items: [
      "Microservices",
      "Event-Driven Architecture",
      "Pub/Sub",
      "RabbitMQ Fanout",
      "MVC",
      "Docker",
      "Docker Compose",
      "Terraform",
      "AWS",
      "Cloudflare R2",
      "K3s",
      "GitHub Actions",
    ],
  },
  {
    title: "ML & Data",
    note: "Modeling and analysis.",
    icon: "pytorch",
    summary:
      "NumPy, Pandas, and PyTorch for analysis and modeling. Enough to read a paper, reproduce a result, and know when a model is the right tool — and when it is not.",
    items: ["NumPy", "Pandas", "PyTorch"],
  },
  {
    title: "Engineering Practices",
    note: "How I work.",
    icon: "git",
    summary:
      "Design principles, testing, CI/CD, security hardening, and observability. The habits that keep a codebase changeable after the first release, not just on the day it ships.",
    items: [
      "Software Design Principles",
      "Testing",
      "CI/CD",
      "Security Hardening",
      "Observability",
      "Git",
      "Agile",
    ],
  },
];

export const projects: Project[] = [
  {
    id: "northstar",
    title: "Northstar",
    role: "Software Engineer",
    year: "2026 — Present",
    stack: [
      "TypeScript",
      "React",
      "TanStack Query",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "OpenAI SDK (Groq)",
      "SSE",
      "Vitest",
      "Supertest",
    ],
    summary:
      "AI-assisted Kanban task board. A ReAct-style agent loop with OpenAI SDK tool calling runs natural-language board operations, streaming live agent activity to the frontend over Server-Sent Events.",
    highlights: [
      "Server-authoritative Kanban state machine treats AI tool calls as untrusted input — WIP limits and legal transitions are enforced server-side.",
      "96-test Vitest + Supertest suite covering the AI chat flow with a deterministic stub provider.",
    ],
    links: [{ label: "Repository", href: "https://github.com/Frankuccino/northstar" }],
    featured: true,
  },
  {
    id: "video-streaming",
    title: "Video Streaming Microservices",
    role: "Software Engineer",
    year: "2026",
    stack: [
      "Node.js",
      "RabbitMQ",
      "Docker",
      "Docker Compose",
      "Terraform",
      "AWS (EC2, ECR)",
      "K3s",
    ],
    summary:
      "Decomposed a monolithic video service into four independently deployable microservices, replacing point-to-point HTTP calls with a RabbitMQ fanout exchange so downstream consumers process events concurrently.",
    highlights: [
      "Two downstream consumers process fanout events without modifying the publisher.",
      "Provisioned AWS infrastructure via Terraform and configured a self-managed K3s cluster.",
    ],
    links: [
      {
        label: "Repository",
        href: "https://github.com/Frankuccino/video-streaming-microservices",
      },
    ],
  },
  {
    id: "hrms",
    title: "HR Management System",
    role: "Lead Software Engineer",
    year: "2023",
    stack: ["Node.js", "Express.js", "MongoDB", "Passport.js", "MVC", "Render"],
    summary:
      "Actively used 42-endpoint system for about five municipal admin staff managing roughly 100 employee records. Stepped up as team lead of three and drove the project from design through rollout.",
    highlights: [
      "Server-enforced Passport.js authentication eliminated client-side-only route protection.",
      "MVC backend with EJS server-side templating; architecture presented to three industry panelists.",
    ],
    links: [{ label: "Live Demo", href: "https://hrms-au39.onrender.com" }],
  },
  {
    id: "sionna-receiver",
    title: "Sionna Neural Receiver",
    role: "AI / ML Engineer",
    year: "2026",
    stack: ["PyTorch", "Python", "NVIDIA Sionna", "6G RAN"],
    summary:
      "PyTorch 6G receiver prototype built as a member of the NVIDIA 6G Developer Program, applying neural receiver architectures to the Aerial CUDA-Accelerated RAN framework.",
    highlights: [
      "NVIDIA 6G Developer Program member since March 2026.",
      "Prototype targets learned channel estimation and signal detection for 6G physical-layer workloads.",
    ],
    links: [],
  },
  {
    id: "coinopulence",
    title: "CoinOpulence",
    role: "Developer",
    year: "2023",
    stack: ["HTML", "CSS", "JavaScript", "Chart.js", "Axios"],
    summary:
      "Dynamic cryptocurrency price tracker with interactive historical charts, pulling real-time data from public APIs.",
    highlights: [
      "Built with Axios and DOM manipulation; Chart.js powers the historical market visualizations.",
    ],
    links: [{ label: "Live Demo", href: "https://coinopulence.netlify.app" }],
  },
];

// Total coursework for the AI Engineer for Developers Associate certification:
// the preparation track, its exercises, and both certification exams.
export const totalCourseworkHours = 63;

export type FeaturedCertificate = {
  id: string;
  badge: string;
  title: string;
  issuer: string;
  completed: string;
  description: string;
  images: { src: string; label: string; width: number; height: number }[];
  stats: { label: string; value: string; mono?: boolean }[];
};

export const featuredCertificates: FeaturedCertificate[] = [
  {
    id: "aied-associate",
    badge: "Associate Certification",
    title: "AI Engineer for Developers Associate",
    issuer: "DataCamp",
    completed: "Nov 2026",
    description:
      "Covers LLM application development, prompt engineering, RAG, and vector databases — the applied end of the AI engineering workflow.",
    images: [
      {
        src: "/certificates/aied-associate.jpg",
        label: "Credential",
        width: 1400,
        height: 806,
      },
      {
        src: "/certificates/aied-track.jpg",
        label: "Track Certificate",
        width: 1400,
        height: 806,
      },
    ],
    stats: [
      { label: "Total Coursework", value: `~${totalCourseworkHours} hrs` },
      { label: "Credential ID", value: "AIEDA0015784021049", mono: true },
    ],
  },
  {
    id: "kodego-fullstack",
    badge: "Foundational Bootcamp",
    title: "Full Stack Web Development Bootcamp",
    issuer: "KodeGo",
    completed: "Aug 14, 2023",
    description:
      "A 4-month intensive on full-stack development with Node.js and MongoDB — where I designed, built, and delivered an HR management system to a municipality.",
    images: [
      {
        src: "/certificates/kodego.jpg",
        label: "Certificate",
        width: 1280,
        height: 720,
      },
    ],
    stats: [
      { label: "Bootcamp Length", value: "4 months" },
      { label: "Credential ID", value: "KG-01302023-002#", mono: true },
    ],
  },
];

export const certificates: Certificate[] = [
  {
    id: "openai-api",
    title: "Working with the OpenAI API",
    issuer: "DataCamp",
    completed: "Nov 03, 2026",
    hours: 3,
    image: "/certificates/openai-api.jpg",
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering with the OpenAI API",
    issuer: "DataCamp",
    completed: "Nov 04, 2026",
    hours: 4,
    image: "/certificates/prompt-engineering.jpg",
  },
  {
    id: "hugging-face",
    title: "Working with Hugging Face",
    issuer: "DataCamp",
    completed: "Nov 04, 2026",
    hours: 2,
    image: "/certificates/hugging-face.jpg",
  },
  {
    id: "llmops",
    title: "LLMOps Concepts",
    issuer: "DataCamp",
    completed: "Nov 05, 2026",
    hours: 1,
    image: "/certificates/llmops.jpg",
  },
  {
    id: "embeddings",
    title: "Introduction to Embeddings with the OpenAI API",
    issuer: "DataCamp",
    completed: "Nov 06, 2026",
    hours: 3,
    image: "/certificates/embeddings.jpg",
  },
  {
    id: "pinecone",
    title: "Building AI Applications with Pinecone",
    issuer: "DataCamp",
    completed: "Nov 07, 2026",
    hours: 3,
    image: "/certificates/pinecone.jpg",
  },
  {
    id: "langchain",
    title: "Developing LLM Applications with LangChain",
    issuer: "DataCamp",
    completed: "Nov 07, 2026",
    hours: 3,
    image: "/certificates/langchain.jpg",
  },
  {
    id: "responses-api",
    title: "Working with the OpenAI Responses API",
    issuer: "DataCamp",
    completed: "Nov 07, 2026",
    hours: 3,
    image: "/certificates/responses-api.jpg",
  },
  {
    id: "mcp",
    title: "Introduction to Model Context Protocol (MCP)",
    issuer: "DataCamp",
    completed: "Nov 08, 2026",
    hours: 3,
    image: "/certificates/mcp.jpg",
  },
  {
    id: "se-python",
    title: "Software Engineering Principles in Python",
    issuer: "DataCamp",
    completed: "Nov 08, 2026",
    hours: 4,
    image: "/certificates/se-python.jpg",
  },
];

export const achievements: Certificate[] = [
  {
    id: "nvidia-6g",
    title: "NVIDIA 6G Developer Program",
    issuer: "NVIDIA",
    completed: "Mar 2026 — Present",
    hours: 0,
  },
];

export type Badge = {
  id: string;
  title: string;
  issuer: string;
  completed: string;
  image: string;
  width: number;
  height: number;
  url?: string;
};

export const badges: Badge[] = [
  {
    id: "chainguard-ai-ml-guardian",
    title: "AI/ML Guardian",
    issuer: "Chainguard",
    completed: "Mar 24, 2026",
    image: "/badges/chainguard-ai-ml-guardian.png",
    width: 800,
    height: 800,
    url: "https://www.credly.com/badges/11c412d1-3a90-49ba-9641-bf310c1ce1dc",
  },
  {
    id: "nvidia-developer-pass",
    title: "NVIDIA Developer Program Pass",
    issuer: "NVIDIA",
    completed: "Member since 03/26",
    image: "/badges/nvidia-developer-pass-3.png",
    width: 1000,
    height: 661,
  },
];
