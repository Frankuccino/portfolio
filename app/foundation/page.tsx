import Link from "next/link";
import type { Metadata } from "next";
import { canonical } from "../lib/siteUrl";
import ReadingPlanLayout from "../components/ReadingPlanLayout";
import TrackClose from "../components/TrackClose";
import {
  readingBookCount,
  readingConsolidationHours,
  readingCoreHours,
  readingPapersCount,
  readingPapersHours,
  readingTotalCommitmentHours,
  readingTotalHours,
} from "../data/readingPlan";

export const metadata: Metadata = {
  title: "Foundation · Frank Angelo Malubag",
  description: `Two tracks: ${readingBookCount} books in seven stages plus a domain elective, and ${readingPapersCount} research papers as the primary sources behind the LLM stages.`,
  alternates: { canonical: canonical("/foundation") },
};

/**
 * The reading hub.
 *
 * It deliberately carries no content of its own: the two tracks have different
 * shapes and different lengths, and a summary here would be a third thing to
 * keep in step. It names the tracks, gives each one's real cost, and links.
 */
export default function ReadingPage() {
  return (
    <main className="px-4 sm:px-6 pt-28 pb-24 min-h-screen">
      <div className="mx-auto max-w-6xl">
        <ReadingPlanLayout rail={false}>
          <Link
            href="/#about"
            className="text-xs text-slate-400 hover:text-slate-300 transition-colors"
          >
            ← Back to home
          </Link>

          <header className="mt-6 mb-10 space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
              {"//"} Foundation
            </p>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight font-display text-slate-100 leading-tight">
              The books and the papers behind them.
            </h1>
            <p className="max-w-2xl text-sm md:text-base text-slate-400 leading-relaxed">
              The foundation is the long half of the plan, and it runs on two
              tracks. The books are read in order; the papers are the primary
              sources that derive them, read beside the stage they belong to.
            </p>
          </header>

          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/books"
              className="group flex flex-col p-5 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md hover:border-[#3e6274]/50 transition-colors"
            >
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#5f93a8]">
                Books
              </p>
              <h2 className="mt-2 text-lg font-semibold text-slate-100">
                The reading plan
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">
                {readingBookCount} books across seven stages and a domain elective,
                ordered by what compounds. Per-book chapter focus, the hands-on
                work, and the closed-book stress test.
              </p>
              <p className="mt-3 text-[11px] tabular-nums text-slate-400">
                ~{readingTotalHours} h reading + ~{readingConsolidationHours} h
                consolidation = ~{readingTotalCommitmentHours} h · core path ~
                {readingCoreHours} h
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-400 group-hover:text-white transition-colors">
                Open the plan
                <span className="text-slate-400 group-hover:text-[#5f93a8] transition-colors">
                  →
                </span>
              </span>
            </Link>

            <Link
              href="/papers"
              className="group flex flex-col p-5 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md hover:border-[#3e6274]/50 transition-colors"
            >
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#5f93a8]">
                Papers
              </p>
              <h2 className="mt-2 text-lg font-semibold text-slate-100">
                The primary sources
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">
                {readingPapersCount} research papers behind the LLM stages, in
                four reading stages: the problem each answered, the move it made,
                and what it changes for the work.
              </p>
              <p className="mt-3 text-[11px] tabular-nums text-slate-400">
                ~{readingPapersHours} h · counted separately from the book total
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-400 group-hover:text-white transition-colors">
                Open the papers
                <span className="text-slate-400 group-hover:text-[#5f93a8] transition-colors">
                  →
                </span>
              </span>
            </Link>

          </div>

          <TrackClose
            note="Both tracks serve the same plan: the certificates are the credential layer on top, and the blog is where the reading turns into build notes."
            links={[
              { label: "Certificates", href: "/#certificates" },
              { label: "The plan", href: "/plan" },
              { label: "Blog", href: "/blog" },
            ]}
          />
        </ReadingPlanLayout>
      </div>
    </main>
  );
}
