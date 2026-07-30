import StackIcon from "tech-stack-icons";

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
];

export default function Hero() {
  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col justify-between">
      <div className="absolute top-16 md:top-24 right-8 md:right-20 z-20 hidden lg:flex flex-col items-end text-right max-w-sm">
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md shadow-2xl space-y-3">
          <div className="flex items-center justify-end gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Current Focus
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          </div>
          <p className="text-sm text-slate-300 leading-relaxed font-normal">
            Obsessed with{" "}
            <span className="text-white font-medium">systems architecture</span>
            , distributed storage, and high-concurrency patterns in{" "}
            <span className="text-white font-medium">Rust</span>.
          </p>
          <div className="pt-1 flex items-center justify-end gap-1.5 text-xs text-slate-500 font-mono">
            <span>AI-native awareness</span>
            <span>•</span>
            <span>Production scale</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-20 left-8 md:left-20 right-8 md:right-20 z-10 flex flex-col items-start text-left select-none max-w-6xl">
        {/* Name - Scaled Larger */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none pb-4 drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)]"
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
        <p className="text-2xl md:text-3xl font-medium tracking-wide text-slate-300 pb-5">
          /Frankuccino <span className="text-slate-600 mx-2">•</span> Software
          Engineer | AI Engineer
        </p>

        {/* Short Description - Scaled Larger */}
        <p className="text-base md:text-lg text-slate-400 max-w-2xl pb-8 leading-relaxed">
          Building end-to-end fullstack systems and scalable applications with a
          focus on modern backend architecture, cloud tooling, and
          high-performance engineering.
        </p>

        {/* Optional: Static Tech Badges instead of Marquee for a cleaner editorial look */}
        <div className="flex flex-wrap items-center gap-2.5 pb-8">
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
        <div className="w-full flex items-center justify-between border-t border-slate-800/80 pt-6">
          {/* Lower Left: Email & LinkedIn */}
          <div className="flex items-center gap-4 text-base md:text-lg tracking-wide">
            <a
              href="mailto:frankamalubag@gmail.com"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              frankamalubag@gmail.com
            </a>
            <span className="text-slate-700">•</span>
            <a
              href="https://www.linkedin.com/in/frank-angelo-malubag/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              LinkedIn
            </a>
          </div>

          {/* Lower Right: Resume Link */}
          <div className="relative group/tooltip inline-flex">
            {/* Disabled Resume Button */}
            <button
              disabled
              className="text-base md:text-lg font-semibold text-slate-400 opacity-60 cursor-not-allowed flex items-center gap-2 select-none"
            >
              <span>Resume</span>
              <span className="text-slate-600">↗</span>
            </button>

            {/* Tooltip Popup */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tooltip:flex flex-col items-center z-30 pointer-events-none">
              <div className="bg-slate-900 border border-slate-700 text-slate-200 text-xs font-medium px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap">
                In Development • Available Soon
              </div>
              <div className="w-2 h-2 bg-slate-900 border-r border-b border-slate-700 rotate-45 -mt-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
