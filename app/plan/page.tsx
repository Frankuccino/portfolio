import Link from "next/link";
import type { Metadata } from "next";
import { canonical } from "../lib/siteUrl";
import { lookingFor, roadmapSteps } from "../data/roadmap";
import { takeawayStepId } from "../data/takeaways";
import TrackClose from "../components/TrackClose";
import Coverage from "../components/Coverage";

const hostOf = (url: string) => {
  try {
    return new URL(url).host.replace("www.", "");
  } catch {
    return url;
  }
};

/**
 * Why each step sits where it does, keyed by step id so the list follows
 * `roadmapSteps` order and a step with no entry is skipped rather than rendered
 * as a heading with nothing under it. Each one answers the two questions the
 * section is really asking: what does this cover that nothing before it does,
 * and why here.
 */
const orderReasons: Record<string, string> = {
  "datacamp-ai-engineer-developers":
    "First because it is already finished, and because it is the applied layer everything else builds on: the API, embeddings and vector search, orchestration, and the engineering discipline around the model. The rest of the plan is the depth underneath it.",
  "ibm-ai-native-data-engineering":
    "Second, and first among the unfinished work: the data platform layer everything above and below stands on. It asks for SQL, Python and pipelines rather than machine learning breadth, so it can be started now, and every later step runs models over data this certificate teaches you to engineer.",
  "microsoft-ai-ml-engineering":
    "Third: the breadth the applied layer stands on, the data and model lifecycle, the core algorithms and the Azure ML lifecycle. It follows the data platform layer, which carries no machine learning prerequisite, and it precedes the operations pair, which has nothing to operate without it.",
  "duke-mlops-specialization":
    "The general operations layer, and the part nothing else in the plan covers: DevOps and DataOps practice, CI/CD for models, MLflow tracking, model registry and deployment. The Microsoft capstone is the model that makes a pipeline worth building.",
  "duke-llmops-specialization":
    "The same operations layer pointed at language models. It comes after MLOps because two of its courses assume that pipeline vocabulary and none of MLOps assumes this one, so the general layer is read first.",
  "langchain-academy":
    "The orchestration tooling that ties models into working software. Its Test and Monitor tracks assume the operations vocabulary from the two Duke specializations before it, which is why it sits after them.",
  "ai-evals-faq":
    "Not a step in the sequence. It is the methodology the tooling is operated with, so it is read alongside the Test track rather than saved for the end of the syllabus.",
  "security-engineering-agentic-ai":
    "Fourth, and still small enough to close in two focused days. Placed here rather than beside the long operations blocks so a short course is finished before 145 hours of MLOps begins, instead of being carried open alongside it.",
  "stanford-cs221":
    "The mathematics underneath all of it. Last because it compounds the slowest and is the least urgent, not because it matters least.",
};

export const metadata: Metadata = {
  title: "The Plan · Frank Angelo Malubag",
  description:
    "Where I'm headed: the data platform layer with the IBM AI-Native Data Engineering Professional Certificate first, because it carries no machine learning prerequisite, then AI & ML breadth with Microsoft, the Packt Security Engineering for Agentic AI Systems course, the operations layer with the Duke University MLOps and LLMOps specializations, LangChain Academy with an evaluation methodology alongside it, and Stanford CS221. Building the depth to lead in AI engineering.",
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
            technical direction, not just implement against an API. Nine steps: one
            already finished, then eight. The data platform layer goes first, because
            it needs no machine learning prerequisites and everything after it runs
            models over what it builds; then the breadth, the short security course,
            the operations, the tooling, the evaluation methodology, and the
            mathematics that makes it durable.
          </p>
        </header>

        <Coverage />

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
                    {step.moduleProgress ? (
                      <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-1 rounded-md bg-amber-400/15 border border-amber-400/40 text-amber-300">
                        {step.moduleProgress}
                      </span>
                    ) : null}
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

        {/* The page opens by saying credentials are a means. This says why they
            exist in the shape they do, which is the part no certificate covers. */}
        <section className="mb-12 ml-6 rounded-xl border border-slate-800/60 bg-slate-900/40 p-5">
          <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">
            {"//"} What these are for
          </h2>
          <p className="mt-3 text-sm md:text-base text-slate-400 leading-relaxed">
            Every credential above is built the same way. A provider finds a role
            title that appears in enough job postings to sell seats, then assembles
            courses to match the keywords in those postings, so the syllabus maps a
            job description rather than a discipline. That is why two MLOps
            specializations from different universities cover the same ground, and
            why a certificate can be genuinely useful while still proving nothing
            about judgement. They pass the filter. The portfolio, and the eval set,
            are what answer the next question.
          </p>
        </section>

        {/* Why this order. One block per step, because the question is always two
            questions: what does this cover that nothing before it does, and why
            does it sit here. Prose paragraphs buried both. */}
        <section className="mb-12 space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">
            {"//"} Why this order
          </h2>
          <p className="max-w-2xl text-sm md:text-base text-slate-400 leading-relaxed">
            The order is dependency, not importance. Each step supplies something
            the next one assumes, so the sequence runs from the applied layer to
            the operations, then to the tooling, and finally to the mathematics
            underneath. Nothing here is ranked by difficulty.
          </p>
          <div className="space-y-4 pt-1">
            {roadmapSteps.map((step) => {
              const reason = orderReasons[step.id];
              if (!reason) return null;
              return (
                <div key={step.id}>
                  <p className="flex flex-wrap items-baseline gap-x-3 text-sm font-semibold text-slate-100">
                    {step.title}
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                      {step.finished ? "Finished" : step.order}
                    </span>
                  </p>
                  <p className="mt-1 text-xs md:text-sm text-slate-400 leading-relaxed">
                    {reason}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="max-w-2xl text-sm md:text-base text-slate-400 leading-relaxed">
            What the set leaves out: pre-training and large-scale training, which
            the reading covers at a design level, and product management, which is
            learned by deciding rather than certified.
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
