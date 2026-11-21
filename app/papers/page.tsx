import Link from "next/link";
import type { Metadata } from "next";
import { canonical } from "../lib/siteUrl";
import ReadingPapers from "../components/ReadingPapers";
import ReadingPlanLayout from "../components/ReadingPlanLayout";
import TrackClose from "../components/TrackClose";
import { readingPapersCount, readingPapersHours } from "../data/readingPlan";

export const metadata: Metadata = {
  title: "Research Papers · Frank Angelo Malubag",
  description: `Fifteen primary sources behind the LLM stages, in four reading stages: the problem each answered, the move it made, and what it changes for the work, with a plain-terms pass and a glossary.`,
  alternates: { canonical: canonical("/papers") },
};

export default function ReadingPapersPage() {
  return (
    <main className="px-4 sm:px-6 pt-28 pb-24 min-h-screen">
      <div className="mx-auto max-w-6xl">
        {/* The same layout as the book plan, so the two pages read as one
            document at two levels rather than as unrelated surfaces. */}
        <ReadingPlanLayout rail={false}>
          <Link
            href="/reading"
            className="text-xs text-slate-400 hover:text-slate-300 transition-colors"
          >
            ← Back to reading
          </Link>

          <header className="mt-6 mb-10 space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
              {"//"} Reading Plan · Research Papers
            </p>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight font-display text-slate-100 leading-tight">
              The derivations behind the stack.
            </h1>
            <p className="max-w-2xl text-sm md:text-base text-slate-400 leading-relaxed">
              Fifteen papers in four stages, because the order is the argument:
              each answers a question the previous one left open. Read beside the
              stage they belong to, not after the whole plan. A plain-terms pass
              and a glossary sit below the detail.
            </p>
            <p className="text-[11px] text-slate-400 tabular-nums">
              {readingPapersCount} papers · ~{readingPapersHours} h · counted
              separately from the book total
            </p>
          </header>

          <ReadingPapers />

          <TrackClose
            note="The books are the argument; these are the derivations. Read a paper when the stage it belongs to makes the claim checkable, rather than saving the whole set for the end. The certificates are the credential layer on top, and the blog is where the reading turns into build notes."
            links={[
              { label: "The book plan", href: "/books" },
              { label: "The reading hub", href: "/reading" },
              { label: "Certificates", href: "/#certificates" },
              { label: "Blog", href: "/blog" },
            ]}
          />
        </ReadingPlanLayout>
      </div>
    </main>
  );
}
