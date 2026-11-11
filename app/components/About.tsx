import Link from "next/link";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen w-full flex flex-col justify-center px-8 md:px-20 py-24 bg-slate-950 text-white relative"
    >
      <div className="max-w-4xl space-y-6">
        <h2 className="text-xs font-mono uppercase tracking-widest text-slate-500">
          {"// 01. About Me"}
        </h2>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-100">
          Self-taught, high-stake software engineering.
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed font-normal">
          I specialize in systems architecture, distributed backends, and
          building resilient tooling with technologies like Rust, Go, and modern
          cloud stacks. I approach engineering with a focus on deep conceptual
          clarity, production readiness, and high-performance patterns.
        </p>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed font-normal">
          My current focus is applied AI engineering: LLM application
          development, prompt engineering, embeddings, semantic search, RAG, and
          tool-calling agents. I hold the DataCamp{" "}
          <span className="text-slate-200 font-medium">
            AI Engineer for Developers Associate
          </span>{" "}
          certification and build production-style agent systems where the
          model&apos;s output is treated as untrusted input.
        </p>

        <div className="pt-4">
          <Link
            href="/#skills"
            className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-sm font-medium flex items-center gap-2 select-none transition-all hover:border-[#3e6274]/50 hover:text-white w-fit"
          >
            <span>View Technical Stack</span>
            <span className="text-slate-500">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
