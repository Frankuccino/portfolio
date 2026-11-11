import Link from "next/link";
import StackIcon from "tech-stack-icons";
import HeroFocusDeck from "./HeroFocusDeck";
import ResumeModal from "./ResumeModal";

type TechItem =
  | { divider: true }
  | { divider?: false; name: string; label: string };

const techStack: TechItem[] = [
  { name: "react", label: "React" },
  { name: "nextjs", label: "Next.js" },
  { name: "typescript", label: "TypeScript" },
  { name: "rust", label: "Rust" },
  { name: "go", label: "Go" },
  { name: "python", label: "Python" },
  { name: "docker", label: "Docker" },
  { name: "kubernetes", label: "Kubernetes" },
  { name: "terraform", label: "Terraform" },
  { name: "aws", label: "AWS" },
  { name: "cloudflare", label: "Cloudflare" },
  { name: "openai", label: "OpenAI" },
  { name: "langchain", label: "LangChain" },
  { name: "pytorch", label: "PyTorch" },
];

const focusCards = [
  {
    id: "ai-focus",
    category: "AI Focus",
    dotColor: "bg-blue-400",
    href: "/#certificates",
    cta: "View certificates",
    description: (
      <>
        Building neural networks from scratch with{" "}
        <span className="text-white font-medium">Karpathy&apos;s Zero to Hero</span>{" "}
        & studying{" "}
        <span className="text-white font-medium">
          Chip Huyen&apos;s AI Engineering
        </span>{" "}
        blueprint. DataCamp-certified{" "}
        <span className="text-white font-medium">AI Engineer Associate</span>.
      </>
    ),
  },
  {
    id: "engineering-foundation",
    category: "Engineering",
    dotColor: "bg-emerald-400",
    href: "/#projects",
    cta: "View projects",
    description: (
      <>
        Self-taught engineer forged through rigorous books, hands-on
        architecture, and open knowledge share.{" "}
        <span className="text-white font-medium">
          NVIDIA 6G Developer Member
        </span>
        .
      </>
    ),
  },
];

export default function Hero() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col">
      <div className="absolute top-16 md:top-24 right-8 md:right-20 z-20 hidden lg:flex flex-col items-end text-right max-w-sm">
        <HeroFocusDeck cards={focusCards} />
      </div>
      <div className="relative z-10 flex-1 w-full max-w-8xl mx-auto flex flex-col justify-end items-start text-left select-none px-8 md:px-20 pt-28 pb-16 md:pb-20">
        {/* Name - Scaled Larger */}
        <h1
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none pb-3 drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)]"
          style={{
            background:
              "linear-gradient(135deg, #f8fafc 0%, #94a3b8 35%, #ffffff 50%, #475569 65%, #cbd5e1 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Frank Angelo A. Malubag
        </h1>

        {/* Title - Scaled Larger */}
        <p className="text-xl sm:text-2xl md:text-3xl font-medium tracking-wide text-slate-300 pb-4">
          /Frankuccino <span className="text-slate-600 mx-2">•</span> Software
          Engineer | AI Engineer
        </p>

        {/* Short Description - Scaled Larger */}
        <p className="text-sm sm:text-base md:text-lg text-slate-400 max-w-2xl pb-4 leading-relaxed">
          Building end-to-end fullstack systems and scalable applications across
          modern backend architecture, cloud tooling, and applied AI
          engineering.
        </p>

        {/* Certification Badge */}
        <div className="pb-6">
          <Link
            href="/#certificates"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#3e6274]/15 border border-[#3e6274]/40 text-xs md:text-sm text-slate-200 hover:bg-[#3e6274]/25 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
            DataCamp AI Engineer for Developers Associate · Nov 2026
          </Link>
        </div>

        {/* Optional: Static Tech Badges instead of Marquee for a cleaner editorial look */}
        <div className="flex flex-wrap items-center gap-2.5 pb-6">
          {techStack.map((tech, idx) => {
            if ("divider" in tech && tech.divider) return null;
            if (!("name" in tech)) return null;
            return (
              <div
                key={idx}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-900/80 border border-slate-800 text-xs md:text-sm font-medium text-slate-300 backdrop-blur-sm"
              >
                <StackIcon name={tech.name} className="w-4 h-4" />
                <span>{tech.label}</span>
              </div>
            );
          })}
        </div>

        {/* Bottom Bar: Email & LinkedIn on Left, Resume on Right */}
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-800/80 pt-4">
          {/* Lower Left: Email & LinkedIn & GitHub */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm sm:text-base md:text-lg tracking-wide text-slate-300">
            <a
              href="mailto:frankamalubag@gmail.com"
              className="hover:text-white transition-colors font-medium break-all"
            >
              frankamalubag@gmail.com
            </a>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <a
              href="https://www.linkedin.com/in/frank-angelo-malubag/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors font-medium"
            >
              LinkedIn
            </a>
            <span className="text-slate-700">•</span>
            <a
              href="https://github.com/Frankuccino"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors font-medium"
            >
              GitHub
            </a>
          </div>

          {/* Lower Right: Resume Link */}
          <div className="relative group/tooltip inline-flex">
            <ResumeModal />
            {/* Tooltip Popup */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tooltip:flex flex-col items-center z-30 pointer-events-none">
              <div className="bg-slate-900 border border-slate-700 text-slate-200 text-xs font-medium px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap">
                Click to View • Available!
              </div>
              <div className="w-2 h-2 bg-slate-900 border-r border-b border-slate-700 rotate-45 -mt-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
