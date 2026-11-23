import Link from "next/link";
import type { Metadata } from "next";
import { canonical } from "../lib/siteUrl";
import { lookingFor, roadmapSteps } from "../data/roadmap";
import { takeawayStepId } from "../data/takeaways";
import TrackClose from "../components/TrackClose";

const hostOf = (url: string) => {
  try {
    return new URL(url).host.replace("www.", "");
  } catch {
    return url;
  }
};

export const metadata: Metadata = {
  title: "The Plan · Frank Angelo Malubag",
  description:
    "Where I'm headed: AI & ML breadth with Microsoft, then the operations layer with the Duke University MLOps and LLMOps specializations, LangChain Academy with an evaluation methodology alongside it, and Stanford CS221. Building the depth to lead in AI engineering.",
  alternates: { canonical: canonical("/plan") },
};

export default function PlanPage() {
  return (
    <main className="px-4 sm:px-6 pt-28 pb-24 min-h-screen">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="text-xs text-slate-400 hover:text-slate-300 transition-colors"
        >
          ← Back to home
        </Link>

        <header className="mt-6 mb-12 space-y-3">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
            {"//"} The Plan
          </p>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight font-display text-slate-100 leading-tight">
            Where I&apos;m headed.
          </h1>
          <p className="max-w-2xl text-sm md:text-base text-slate-400 leading-relaxed">
            Certifications are a means, not an end. I&apos;m building the depth to lead
            in AI engineering, the kind that lets me design production systems and set
            technical direction, not just implement against an API. Seven steps: one
            already finished, then six, the breadth, the operations, the tooling, the
            evaluation methodology that sits alongside it, and the mathematics that
            makes it durable.
          </p>
        </header>

        {/* Roadmap */}
        <div className="relative mb-12">
          <div className="absolute left-[7px] top-3 bottom-3 w-px bg-slate-800" />
          <div className="space-y-3">
            {roadmapSteps.map((step) => (
              <div key={step.id} className="relative pl-6">
                <div className="absolute left-0 top-5 w-[15px] h-[15px] rounded-full border-2 border-[#3e6274] bg-[#0e0d16]" />
                <div className="group relative rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md hover:border-[#3e6274]/50 transition-colors p-5">
                  {/* The card is one link, laid over the content, so the
                      condensation badge can be a second destination without a
                      nested anchor. The issuer's own page still lives on the
                      step page. */}
                  <Link
                    href={`/plan/${step.id}`}
                    aria-label={`Read more about ${step.title}`}
                    className="absolute inset-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5f93a8]"
                  />
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      {step.finished ? (
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-md bg-emerald-400/15 border border-emerald-400/40 text-emerald-300">
                          Finished
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-md bg-[#3e6274]/25 border border-[#3e6274]/40 text-slate-100">
                          {step.order}
                        </span>
                      )}
                      <span className="text-[11px] text-slate-400">
                        {step.issuer}
                        {step.url ? ` · ${hostOf(step.url)}` : ""}
                      </span>
                    </div>
                    {step.id === takeawayStepId ? (
                      <Link
                        href={`/plan/${step.id}/takeaways?from=plan`}
                        className="relative z-10 inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-md bg-[#3e6274]/25 border border-[#3e6274]/40 text-slate-100 hover:bg-[#3e6274]/40 hover:text-white transition-colors"
                      >
                        Condensed Key Takeaways
                        <span className="text-[#5f93a8]">→</span>
                      </Link>
                    ) : null}
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
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-400 group-hover:text-white transition-colors">
                    {step.courses && step.courses.length > 0
                      ? "Module breakdown"
                      : "Read the resource"}
                    <span className="text-slate-400 group-hover:text-[#5f93a8] transition-colors">
                      →
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why this order */}
        <section className="mb-12 space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">
            {"//"} Why this order
          </h2>
          <div className="space-y-3">
            <p className="text-sm md:text-base text-slate-400 leading-relaxed">
              The DataCamp associate sits first because it is already finished: ten
              courses in the applied layer, completed in November 2026. The plan that
              follows is the depth underneath it. The Microsoft certificate comes next
              because it is the breadth: AI &amp; ML infrastructure, data pipelines,
              the core algorithms across supervised, unsupervised, reinforcement and
              deep learning, and the Azure ML lifecycle. The theory those algorithms
              rest on is not a second enrollment: it is the reading, Stage 1 statistics
              and then the Stage 2 core, which is why the plan goes straight from the
              breadth to the operations.
            </p>
            <p className="text-sm md:text-base text-slate-400 leading-relaxed">
              The Duke MLOps specialization is the operations layer, and it comes
              second on purpose: Python and automation for MLOps, the DevOps and
              DataOps practices behind a production pipeline, the Amazon SageMaker and
              Azure ML platforms, and MLflow with Hugging Face for tracking, model
              management and deployment. A pipeline only means something once there is
              a model worth putting through it, and the Microsoft certificate is that
              model.
            </p>
            <p className="text-sm md:text-base text-slate-400 leading-relaxed">
              The Duke LLMOps specialization follows it, and it is the same
              operations layer pointed at language models: deploying, managing and
              optimizing large language models across Azure, AWS, Databricks, local
              infrastructure and open source, through more than twenty hands-on
              projects. MLOps teaches the pipeline, LLMOps teaches what that pipeline
              carries once the model is a language model, and the two run
              consecutively rather than as alternatives.
            </p>
            <p className="text-sm md:text-base text-slate-400 leading-relaxed">
              LangChain Academy is the orchestration tooling that ties models into
              working software, and CS221 supplies the mathematics underneath all of it.
              Breadth, then operations, then the tooling and the theory, because the
              tooling is specific and will age, while the breadth and the mathematics
              compound.
            </p>
          </div>
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
            { label: "The reading plan", href: "/books" },
            { label: "Certificates", href: "/#certificates" },
            { label: "Blog", href: "/blog" },
            { label: "Get in touch", href: "/#contact" },
          ]}
        />
      </div>
    </main>
  );
}
