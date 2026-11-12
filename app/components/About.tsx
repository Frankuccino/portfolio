import Image from "next/image";
import Link from "next/link";
import VirtualLibrary from "./VirtualLibrary";

const NVIDIA_PASS_WIDTH = 1000;
const NVIDIA_PASS_HEIGHT = 661;

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen w-full flex items-center px-8 md:px-20 py-24 bg-slate-950 text-white relative overflow-hidden"
    >
      <div className="mx-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
        {/* Left — the library */}
        <div className="lg:col-span-3 order-2 lg:order-1">
          <VirtualLibrary />

          <div className="mt-6 max-w-md border-l-2 border-[#3e6274]/40 pl-4">
            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
              {"// Continuous Learning"}
            </p>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              I invest heavily in myself. This is my current library —{" "}
              <span className="text-slate-400">
                the books I have read, reread, and keep within arm&apos;s reach.
              </span>
            </p>
          </div>
        </div>

        {/* Right — about text and the developer pass */}
        <div className="lg:col-span-2 order-1 lg:order-2 lg:text-right space-y-5">
          <h2 className="text-xs font-mono uppercase tracking-widest text-slate-500">
            {"// 01. About Me"}
          </h2>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-100 leading-tight">
            Self-taught, high-stake software engineering.
          </h1>
          <p className="text-sm md:text-base text-slate-400 leading-relaxed">
            I specialize in systems architecture, distributed backends, and
            building resilient tooling with technologies like Rust, Go, and
            modern cloud stacks. I approach engineering with a focus on deep
            conceptual clarity, production readiness, and high-performance
            patterns.
          </p>
          <p className="text-sm md:text-base text-slate-400 leading-relaxed">
            My current focus is applied AI engineering: LLM application
            development, prompt engineering, embeddings, semantic search, RAG,
            and tool-calling agents. I hold the DataCamp{" "}
            <span className="text-slate-200 font-medium">
              AI Engineer for Developers Associate
            </span>{" "}
            certification and build production-style agent systems where the
            model&apos;s output is treated as untrusted input.
          </p>

          {/* NVIDIA Developer Pass — the pass is the card, the redirect is a
              separate button rather than the whole card being a link */}
          <div className="space-y-3">
            <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 backdrop-blur-md p-3 text-left">
              <div className="rounded-lg overflow-hidden border border-slate-800 bg-slate-950/60">
                <Image
                  src="/badges/nvidia-developer-pass-3.png"
                  alt="NVIDIA Developer Program pass made out to Frank Angelo Malubag, member since 03/26"
                  width={NVIDIA_PASS_WIDTH}
                  height={NVIDIA_PASS_HEIGHT}
                  sizes="(min-width: 1024px) 408px, 92vw"
                  className="block w-full h-auto"
                />
              </div>
              <div className="mt-3 px-1">
                <p className="text-sm font-medium text-slate-100 leading-snug">
                  NVIDIA Developer Program
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Developer Pass · Member since 03/26
                </p>
              </div>
            </div>

            <a
              href="https://developer.nvidia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-sm font-medium select-none transition-all hover:border-[#3e6274]/50 hover:text-white"
            >
              <span>Visit developer.nvidia.com</span>
              <span className="text-slate-500">↗</span>
            </a>
          </div>

          <div className="pt-1 lg:pt-3">
            <Link
              href="/#skills"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-sm font-medium select-none transition-all hover:border-[#3e6274]/50 hover:text-white"
            >
              <span>View Technical Stack</span>
              <span className="text-slate-500">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
