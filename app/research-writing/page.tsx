import Link from "next/link";
import type { Metadata } from "next";
import { canonical } from "../lib/siteUrl";
import ReadingPlanLayout from "../components/ReadingPlanLayout";
import ResearchWriting from "../components/ResearchWriting";
import TrackClose from "../components/TrackClose";
import {
  researchBooks,
  latexObjectives,
  researchPhases,
} from "../data/researchWriting";

export const metadata: Metadata = {
  title: "Research Writing · Frank Angelo Malubag",
  description: `A track for writing research: ${researchBooks.length} books on research argument and mathematical writing, ${latexObjectives.length} LaTeX objectives learned by doing, and ${researchPhases.length} phases that end with something written rather than something read.`,
  alternates: { canonical: canonical("/research-writing") },
};

export default function ResearchWritingPage() {
  return (
    <main className="px-4 sm:px-6 pt-28 pb-24 min-h-screen">
      <div className="mx-auto max-w-6xl">
        {/* The same layout as the book plan and the papers, so the three
            tracks read as one document at three levels. */}
        <ReadingPlanLayout rail={false}>
          <Link
            href="/foundation"
            className="text-xs text-slate-400 hover:text-slate-300 transition-colors"
          >
            ← Back to the foundation
          </Link>

          <header className="mt-6 mb-10 space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
              {"//"} Foundation · Research Writing
            </p>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight font-display text-slate-100 leading-tight">
              Writing that survives a reviewer.
            </h1>
            <p className="max-w-2xl text-sm md:text-base text-slate-400 leading-relaxed">
              The argument is the hard part, and LaTeX is a weekend. This track is
              ordered accordingly: two books on research and mathematical writing,
              LaTeX learned by producing a real document, the free resources worth
              reading, and five phases that end with something written rather than
              something read.
            </p>
            <p className="text-[11px] text-slate-400 tabular-nums">
              {researchBooks.length} books · {latexObjectives.length} LaTeX
              objectives · {researchPhases.length} phases · every link checked
            </p>
          </header>

          <ResearchWriting />

          <TrackClose
            note="The books are the argument; these are the derivations. Write early in the track rather than after it, because the phases are built so that the writing is the practice. The certificates are the credential layer on top, and the blog is where the reading turns into build notes."
            links={[
              { label: "The book plan", href: "/books" },
              { label: "The papers", href: "/papers" },
              { label: "The foundation hub", href: "/foundation" },
              { label: "Certificates", href: "/#certificates" },
            ]}
          />
        </ReadingPlanLayout>
      </div>
    </main>
  );
}
