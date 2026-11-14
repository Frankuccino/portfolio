import Link from "next/link";
import type { Metadata } from "next";
import { canonical } from "../lib/siteUrl";
import ReadingPlanExplorer from "../components/ReadingPlanExplorer";
import ReadingRationale from "../components/ReadingRationale";
import {
  readingBookCount,
  readingCoreHours,
  readingConsolidationHours,
  readingTotalCommitmentHours,
  readingTotalHours,
  stressTestProtocol,
  stageStressTests,
} from "../data/readingPlan";

export const metadata: Metadata = {
  title: "Reading Plan — Frank Angelo Malubag",
  description:
    "The priority order for my reading: four stages, seventeen books — the AI engineering stack and the forward-deployed foundations. Open any book for its chapter focus, hands-on work, and the closed-book stress test.",
  alternates: { canonical: canonical("/reading") },
};

export default function ReadingPage() {
  return (
    <main className="px-4 sm:px-6 pt-28 pb-24 min-h-screen">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/#about"
          className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          ← Back to home
        </Link>

        <header className="mt-6 mb-10 space-y-3">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-500">
            {"//"} Reading Plan
          </p>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-100 leading-tight">
            The order, the focus, and the practice.
          </h1>
          <p className="max-w-2xl text-sm md:text-base text-slate-400 leading-relaxed">
            Seventeen books across the AI engineering stack and the forward-deployed
            foundations, ordered by what compounds. Open any book for the chapters
            that earn their pages, what to build while reading, and the closed-book
            questions that prove it landed.
          </p>
          <p className="text-[11px] text-slate-500 tabular-nums">
            {readingBookCount} books · ~{readingTotalHours} h reading + ~
            {readingConsolidationHours} h consolidation = ~
            {readingTotalCommitmentHours} h total · core path ~{readingCoreHours} h
          </p>
        </header>

        <ReadingRationale />

        <ReadingPlanExplorer />

        {/* Stress-test protocol */}
        <section id="stress-test" className="border-t border-slate-800/60 pt-8 space-y-6">
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-slate-500">
              {"//"} Knowledge stress test
            </h2>
            <p className="max-w-2xl text-sm md:text-base text-slate-400 leading-relaxed">
              Reading is not learning. The test is whether you can reproduce
              the idea with the book closed.
            </p>
          </div>

          <ol className="space-y-3">
            {stressTestProtocol.map((step, index) => (
              <li key={step.title} className="flex gap-3">
                <span className="shrink-0 w-6 h-6 rounded-md border border-[#3e6274]/40 bg-[#3e6274]/25 text-[11px] font-mono text-slate-100 flex items-center justify-center">
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm text-slate-200 leading-snug">{step.title}</p>
                  <p className="text-xs text-slate-400 leading-relaxed mt-0.5">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md">
            <h3 className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-3">
              Stage stress tests
            </h3>
            <ul className="space-y-2.5">
              {stageStressTests.map((item) => (
                <li key={item.stage} className="flex gap-2.5">
                  <span className="shrink-0 text-[11px] font-mono text-slate-300 w-14">
                    {item.stage}
                  </span>
                  <span className="text-xs text-slate-400 leading-relaxed">
                    {item.body}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
