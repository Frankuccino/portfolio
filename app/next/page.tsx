import Link from "next/link";
import type { Metadata } from "next";
import { canonical } from "../lib/siteUrl";
import { lookingFor, roadmapSteps } from "../data/roadmap";
import TrackClose from "../components/TrackClose";

const hostOf = (url: string) => {
  try {
    return new URL(url).host.replace("www.", "");
  } catch {
    return url;
  }
};

export const metadata: Metadata = {
  title: "What's Next — Frank Angelo Malubag",
  description:
    "Where I'm headed: the Microsoft AI & ML Engineering Professional Certificate first, then LangChain Academy, then Stanford CS221 — building the depth to lead in AI engineering.",
  alternates: { canonical: canonical("/next") },
};

export default function NextPage() {
  return (
    <main className="px-4 sm:px-6 pt-28 pb-24 min-h-screen">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="text-xs text-slate-400 hover:text-slate-300 transition-colors"
        >
          ← Back to home
        </Link>

        <header className="mt-6 mb-12 space-y-3">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
            {"//"} What&apos;s Next
          </p>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight font-display text-slate-100 leading-tight">
            Where I&apos;m headed.
          </h1>
          <p className="max-w-2xl text-sm md:text-base text-slate-400 leading-relaxed">
            Certifications are a means, not an end. I&apos;m building the depth to lead
            in AI engineering — the kind that lets me design production systems and set
            technical direction, not just implement against an API. Three steps, in
            this order.
          </p>
        </header>

        {/* Roadmap */}
        <div className="relative mb-12">
          <div className="absolute left-[7px] top-3 bottom-3 w-px bg-slate-800" />
          <div className="space-y-3">
            {roadmapSteps.map((step) => (
              <div key={step.id} className="relative pl-6">
                <div className="absolute left-0 top-5 w-[15px] h-[15px] rounded-full border-2 border-[#3e6274] bg-[#0e0d16]" />
                <article className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-md bg-[#3e6274]/25 border border-[#3e6274]/40 text-slate-100">
                      {step.order}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {step.issuer}
                      {step.url ? (
                        <>
                          {" · "}
                          <a
                            href={step.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#5f93a8] hover:text-slate-300 transition-colors"
                          >
                            {hostOf(step.url)} ↗
                          </a>
                        </>
                      ) : null}
                    </span>
                  </div>
                  <h2 className="text-lg md:text-xl font-semibold text-white leading-snug">
                    {step.title}
                  </h2>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {step.credentialType} · {step.commitment}
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed mt-3">
                    {step.summary}
                  </p>
                  <ul className="mt-3 space-y-1">
                    {step.outcomes.map((outcome) => (
                      <li key={outcome} className="text-xs text-slate-400 flex gap-2">
                        <span className="text-[#5f93a8] shrink-0">▸</span>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Why this order */}
        <section className="mb-12 space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">
            {"//"} Why this order
          </h2>
          <p className="text-sm md:text-base text-slate-400 leading-relaxed">
            The Microsoft certificate comes first because it is the breadth: AI &amp;
            ML infrastructure, data pipelines, algorithms, and the ML lifecycle. The
            LangChain Academy then builds the applied layer on that foundation —
            agents across the full lifecycle, from build through deploy and monitor.
            CS221 supplies the mathematical foundations that make all of it durable.
            Breadth first, then the tool layer, then the mathematics — because the
            applied layer is tool-specific and will age, while the breadth and the
            mathematics compound.
          </p>
        </section>

        {/* What I'm looking for */}
        <section className="mb-12 space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">
            {"//"} What I&apos;m looking for
          </h2>
          <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md">
            <ul className="space-y-2">
              {lookingFor.map((item) => (
                <li key={item} className="text-sm text-slate-300 flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Closing — where the plan sits, not just what it is */}
        <TrackClose
          note="The credentials are proof points; the goal is the capability behind them, and the ability to help a team build AI systems that hold up in production. The reading order is the depth underneath, and the blog is where that depth shows up as work."
          links={[
            { label: "The reading plan", href: "/reading" },
            { label: "Certificates", href: "/#certificates" },
            { label: "Blog", href: "/blog" },
            { label: "Get in touch", href: "/#contact" },
          ]}
        />
      </div>
    </main>
  );
}
