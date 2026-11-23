import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { canonical } from "../../../lib/siteUrl";
import { ogImage } from "../../../lib/ogImage";
import Takeaways from "../../../components/Takeaways";
import TakeawayBackLink from "../../../components/TakeawayBackLink";
import TrackClose from "../../../components/TrackClose";
import { roadmapSteps } from "../../../data/roadmap";
import {
  takeawaySourceCourses,
  takeawaySourceNotes,
  takeawayStats,
  takeawayStepId,
} from "../../../data/takeaways";

export function generateStaticParams() {
  return roadmapSteps
    .filter((step) => step.id === takeawayStepId)
    .map((step) => ({ slug: step.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const step = roadmapSteps.find((item) => item.id === slug);
  if (!step || step.id !== takeawayStepId) return {};
  const url = canonical(`/plan/${step.id}/takeaways`);
  return {
    title: `Condensed Key Takeaways · ${step.title}`,
    description: `The AI engineering field condensed into one document: ${takeawayStats.concepts} concepts from the ten DataCamp courses, grouped by the family each belongs to.`,
    alternates: { canonical: url },
    openGraph: {
      title: `Condensed Key Takeaways · ${step.title}`,
      description: `AI engineering condensed: ${takeawayStats.concepts} concepts from ten courses, grouped by family.`,
      url,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `Condensed Key Takeaways · ${step.title}`,
      description: `AI engineering condensed: ${takeawayStats.concepts} concepts from ten courses, grouped by family.`,
      images: [ogImage.url],
    },
  };
}

/**
 * The condensation of one step's notes. It lives under the step rather than at
 * a top-level route because it belongs to that credential: the same document
 * under any other step would be a claim the notes do not support.
 */
export default async function StepTakeawaysPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const step = roadmapSteps.find((item) => item.id === slug);
  if (!step || step.id !== takeawayStepId) notFound();

  return (
    <main className="px-4 sm:px-6 pt-28 pb-24 min-h-screen">
      <div className="mx-auto max-w-6xl">
        <TakeawayBackLink
          fallback={{ label: step.title, href: `/plan/${step.id}` }}
        />

        <header className="mt-6 mb-12 space-y-3">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
            {"//"} The Plan · {step.title} · Condensed
          </p>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight font-display text-slate-100 leading-tight">
            The field, in one document.
          </h1>
          <p className="max-w-2xl text-sm md:text-base text-slate-400 leading-relaxed">
            Ten DataCamp courses and {takeawaySourceNotes} notes, condensed into
            one document. Every entry is one sentence, and each is grouped under
            the family it belongs to rather than the course it came from, because
            the course order is how you learnt it and the families are how you
            will use it.
          </p>
          <p className="max-w-2xl text-sm md:text-base text-slate-400 leading-relaxed">
            Entries marked <span className="text-[#5f93a8]">+</span> are beyond the
            ten courses: the standard vocabulary the notes point at but never
            name. A map with a hole in it misleads more than a shorter one, so
            they are included and marked. Everything else is condensed from the
            module notes behind the AI Engineer for Developers Associate.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1 pt-1 text-[11px] font-mono text-slate-500">
            <span>{takeawayStats.sections} sections</span>
            <span>{takeawayStats.families} families</span>
            <span>{takeawayStats.concepts} concepts</span>
            <span>{takeawayStats.extended} beyond the track</span>
            <span>{takeawaySourceCourses.length} courses</span>
          </div>
        </header>

        <Takeaways />

        <TrackClose
          note="This is the condensation, not the material. The course-by-course notes, including the diagrams, sit one level up on the track page. The reading plan is the depth underneath, and the blog is where the same ideas show up as work."
          links={[
            { label: "The DataCamp track", href: `/plan/${step.id}` },
            { label: "The full plan", href: "/plan" },
            { label: "The reading plan", href: "/books" },
            { label: "Blog", href: "/blog" },
          ]}
        />
      </div>
    </main>
  );
}
