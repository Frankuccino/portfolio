import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { roadmapSteps } from "../../../../data/roadmap";
import { canonical } from "../../../../lib/siteUrl";
import { ogImage } from "../../../../lib/ogImage";
import TrackClose from "../../../../components/TrackClose";
import RoadmapFigure from "../../../../components/RoadmapFigure";
import { PageMetrics } from "../../../../components/PageMetrics";
import ModuleRail from "../../../../components/ModuleRail";
import type { ReadingRailSection } from "../../../../components/ReadingPlanLayout";
import { Markdown, noteChapters } from "../../../../lib/markdown";

export function generateStaticParams() {
  return roadmapSteps.flatMap((step) =>
    (step.courses ?? []).flatMap((course) =>
      (course.modules ?? []).map((entry) => ({
        slug: step.id,
        course: course.slug,
        module: entry.slug,
      })),
    ),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; course: string; module: string }>;
}): Promise<Metadata> {
  const { slug, course: courseSlug, module: moduleSlug } = await params;
  const step = roadmapSteps.find((item) => item.id === slug);
  const course = step?.courses?.find((item) => item.slug === courseSlug);
  const mod = (course?.modules ?? []).find((item) => item.slug === moduleSlug);
  if (!step || !course || !mod) return {};
  const url = canonical(`/plan/${step.id}/${course.slug}/${mod.slug}`);
  return {
    title: `${mod.title} · ${course.title}`,
    description: mod.summary,
    alternates: { canonical: url },
    openGraph: {
      title: mod.title,
      description: mod.summary,
      url,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: mod.title,
      description: mod.summary,
      images: [ogImage.url],
    },
  };
}

const shortChapter = (label: string) => label.replace(/^\d+\s*\/\s*/, "");
const sectionCount = (count: number) => `${count} note${count === 1 ? "" : "s"}`;

export default async function RoadmapModulePage({
  params,
}: {
  params: Promise<{ slug: string; course: string; module: string }>;
}) {
  const { slug, course: courseSlug, module: moduleSlug } = await params;
  const step = roadmapSteps.find((item) => item.id === slug);
  const course = step?.courses?.find((item) => item.slug === courseSlug);
  const mod = (course?.modules ?? []).find((item) => item.slug === moduleSlug);
  if (!step || !course || !mod) notFound();

  const chapters = noteChapters(mod.notes);
  const groups = mod.breakdown ?? [];
  const mustMasterSkills = mod.mustMasterSkills ?? [];
  const mentalLocks = mod.mentalLocks ?? [];
  const conceptCount = groups.reduce((total, group) => total + group.items.length, 0);
  const chapterSections: ReadingRailSection[] = chapters.map((chapter, index) => ({
    id: chapter.id,
    label: shortChapter(chapter.label),
    chip: String(index + 1).padStart(2, "0"),
    meta: sectionCount(chapter.count),
  }));
  const submoduleSections: ReadingRailSection[] = (mod.submodules ?? []).flatMap(
    (group, index) => {
      const selected = chapters.slice(
        Math.max(0, group.start - 1),
        Math.min(chapters.length, group.end),
      );
      if (selected.length === 0) return [];
      return [
        {
          id: selected[0].id,
          label: group.label,
          chip: String(index + 1).padStart(2, "0"),
          meta: sectionCount(
            selected.reduce((total, chapter) => total + chapter.count, 0),
          ),
          ids: selected.map((chapter) => chapter.id),
        },
      ];
    },
  );
  const rail: ReadingRailSection[] = chapters.length
    ? [
        {
          id: "concept-map",
          label: "Concept map",
          chip: "00",
          meta: `${conceptCount} concepts · ${groups.length} categories`,
        },
        ...(mod.submodules?.length ? submoduleSections : chapterSections),
      ]
    : [];

  return (
    <main className="relative px-4 sm:px-6 pt-28 pb-24 min-h-screen">
      <article className="mx-auto max-w-6xl">
          <Link
            href={`/plan/${step.id}/${course.slug}`}
            className="text-xs text-slate-400 hover:text-slate-300 transition-colors"
          >
            ← Back to {course.title}
          </Link>

          <header className="mt-6 mb-6 space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
              {"//"} The Plan · {step.order} · {course.title}
            </p>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight font-display text-slate-100 leading-tight">
              {mod.title}
            </h1>
            {mod.completed ? (
              <p className="text-[11px] text-slate-400 font-mono">
                Completed {mod.completed}
                {mod.hours
                  ? ` · ${mod.hours} ${mod.hours === 1 ? "hr" : "hrs"}`
                  : ""}
              </p>
            ) : null}
            <p className="text-sm md:text-base text-slate-400 leading-relaxed">
              {mod.summary}
            </p>
          </header>

          {mustMasterSkills.length > 0 ? (
            <section className="mt-8 mb-10 border-y border-slate-800/70 py-5">
              <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">
                {"//"} Must master skills
              </h2>
              <p className="text-[11px] text-slate-500 mt-1 mb-4">
                What you should be able to do, not just remember.
              </p>
              <ol className="space-y-3">
                {mustMasterSkills.map((item, index) => (
                  <li key={item.skill} className="grid grid-cols-[2rem_1fr] gap-3">
                    <span className="font-mono text-[11px] text-[#7fb0c2] pt-0.5">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-100">
                        {item.skill}
                      </p>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {item.outcome}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              {mentalLocks.length > 0 ? (
                <div className="mt-6 border-t border-slate-800/70 pt-5">
                  <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">
                    {"//"} Mental locks
                  </h2>
                  <p className="text-[11px] text-slate-500 mt-1 mb-4">
                    Rules to keep in working memory while you apply this module.
                  </p>
                  <ol className="space-y-4">
                    {mentalLocks.map((lock, index) => (
                      <li key={lock.title} className="grid grid-cols-[2rem_1fr] gap-3">
                        <span className="font-mono text-[11px] text-[#7fb0c2] pt-0.5">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-slate-100">
                            {lock.title}
                          </p>
                          <ul className="mt-2 space-y-1.5">
                            {lock.lines.map((line) => (
                              <li
                                key={line}
                                className="flex gap-2 text-sm text-slate-400 leading-relaxed"
                              >
                                <span className="text-[#7fb0c2]">/</span>
                                <span>{line}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              ) : null}
            </section>
          ) : null}

          <div id="concept-map" className="scroll-mt-28">
            <PageMetrics mod={mod} />

            {/* The picture the breakdown refers to, so the page stands alone. */}
            {mod.image ? (
              <div className="my-6">
                <RoadmapFigure image={mod.image} />
              </div>
            ) : null}

            {/* The breakdown, set like an article's lists: a heading per group
                from the diagram, then its components and what each is for. */}
            {groups.length > 0 ? (
              <section className="mt-8 mb-12">
                {groups.map((group) => (
                  <div key={group.group} className="mt-6 first:mt-0">
                    <h2 className="text-xl font-semibold text-slate-100 mb-2">
                      {group.group}
                    </h2>
                    <ul className="list-disc list-inside space-y-2 my-3 text-sm text-slate-300 leading-relaxed marker:text-[#5f93a8]">
                      {group.items.map((item) => (
                        <li key={item.name}>
                          <strong className="text-slate-100 font-semibold">
                            {item.name}
                          </strong>
                          : {item.role}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            ) : null}
          </div>

          {/* Below the wide breakpoint the rail is hidden, so the same chapter
              list stays available as a compact row under the concept map. */}
          {rail.length > 0 ? (
            <nav
              aria-label="Page chapters"
              className="md:hidden mb-8 flex gap-2 overflow-x-auto pb-1"
            >
              {rail.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="shrink-0 rounded-md border border-slate-800/70 px-2 py-1 text-[11px] text-slate-400 hover:border-[#3e6274]/60 hover:text-slate-200 transition-colors"
                >
                  <span className="mr-1 font-mono text-[10px] text-[#7fb0c2]">
                    {section.chip}
                  </span>
                  {section.label}
                </a>
              ))}
            </nav>
          ) : null}

          {/* The module's own material below the breakdown. Level-2 headings
              are chapter dividers; the rail above indexes exactly those. */}
          {mod.notes && mod.notes.length > 0 ? (
            <section className="mt-10 mb-12">
              <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">
                {"//"} Module notes
              </h2>
              <Markdown
                content={mod.notes.join("\n\n")}
                headingAnchors
                chapterDividers
              />
            </section>
          ) : null}

          <TrackClose
            note={
              mod.image
                ? "This is the breakdown of the diagram above: what each component is, and why it sits where it does in the pipeline. The course page carries the picture; the certificate page carries the plan it belongs to."
                : "The concepts above are the ones this module turns on, and the notes below explain each in turn. The course page carries the whole track, and the certificate page carries the plan it belongs to."
            }
            links={[
              { label: "The course", href: `/plan/${step.id}/${course.slug}` },
              { label: "The certificate", href: `/plan/${step.id}` },
              { label: "The full plan", href: "/plan" },
              { label: "Get in touch", href: "/#contact" },
            ]}
          />
        </article>
        {rail.length > 0 ? <ModuleRail sections={rail} /> : null}
    </main>
  );
}
