import type { IconName } from "tech-stack-icons";

export type SkillGroup = {
  title: string;
  note: string;
  icon: IconName;
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
  featured?: boolean;
  image?: string;
  images?: { src: string; label: string }[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    note: "First tools I reach for.",
    icon: "typescript",
    items: ["JavaScript", "TypeScript", "Go", "Rust", "Python", "SQL"],
  },
  {
    title: "Frontend",
    note: "Interfaces that hold up.",
    icon: "react",
    items: ["React", "Next.js", "HTML", "CSS", "TailwindCSS"],
  },
  {
    title: "Backend",
    note: "APIs and data layers.",
    icon: "expressjs",
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
    title: "AI Engineering",
    note: "LLM systems, end to end.",
    icon: "openai",
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
    title: "Architecture & Cloud",
    note: "Systems that ship and scale.",
    icon: "cloudflare",
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
    items: ["NumPy", "Pandas", "PyTorch"],
  },
  {
    title: "Engineering Practices",
    note: "How I work.",
    icon: "git",
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

export const featuredCertification: Certificate & { image: string } = {
  id: "aied-associate",
  title: "AI Engineer for Developers Associate",
  issuer: "DataCamp",
  completed: "Nov 2026",
  hours: 29,
  credentialId: "AIEDA0015784021049",
  featured: true,
  image: "/certificates/aied-associate.jpg",
  images: [
    { src: "/certificates/aied-associate.jpg", label: "Credential" },
    { src: "/certificates/aied-track.jpg", label: "Track Certificate" },
  ],
};

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
  {
    id: "kodego",
    title: "Full Stack Web Development Bootcamp",
    issuer: "KodeGo",
    completed: "Aug 2023",
    hours: 0,
  },
];

// Total coursework for the AI Engineer for Developers Associate certification:
// the preparation track, its exercises, and both certification exams.
export const totalCourseworkHours = 63;
