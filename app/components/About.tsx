export default function About() {
  return (
    <section
      id="about"
      className="h-screen w-full flex flex-col justify-center px-8 md:px-20 bg-slate-950 text-white relative"
    >
      <div className="max-w-4xl space-y-6">
        <h2 className="text-xs font-mono uppercase tracking-widest text-slate-500">
          // 01. About Me
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

        {/* In Development Tooltip Component */}
        <div className="pt-4">
          <div className="relative group/tooltip inline-flex">
            <button
              disabled
              className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 opacity-60 cursor-not-allowed text-sm font-medium flex items-center gap-2 select-none transition-all"
            >
              <span>View Full System Specs</span>
              <span className="text-slate-600">↗</span>
            </button>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tooltip:flex flex-col items-center z-30 pointer-events-none">
              <div className="bg-slate-900 border border-slate-700 text-slate-200 text-xs font-medium px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap">
                In Development • Available Soon
              </div>
              <div className="w-2 h-2 bg-slate-900 border-r border-b border-slate-700 rotate-45 -mt-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
