import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { roadmapSteps } from "../../../../data/roadmap";
import { canonical } from "../../../../lib/siteUrl";
import { ogImage } from "../../../../lib/ogImage";
import TrackClose from "../../../../components/TrackClose";
import RoadmapFigure from "../../../../components/RoadmapFigure";
import { Markdown } from "../../../../lib/markdown";

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

  return (
    <main className="px-4 sm:px-6 pt-28 pb-24 min-h-screen">
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

        {/* The picture the breakdown refers to, so the page stands alone. */}
        {mod.image ? (
          <div className="my-6">
            <RoadmapFigure image={mod.image} />
          </div>
        ) : null}

        {/* The breakdown, set like an article's lists: a heading per group from
            the diagram, then the components in it and what each is for. */}
        {mod.breakdown && mod.breakdown.length > 0 ? (
          <section className="mt-8 mb-12">
            {mod.breakdown.map((group) => (
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

        {/* The module's own material, condensed, below the breakdown: what the
            module means rather than what it contains. */}
        {mod.notes && mod.notes.length > 0 ? (
          <section className="mt-10 mb-12">
            <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">
              {"//"} Module notes
            </h2>
            <Markdown content={mod.notes.join("\n\n")} />
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
    </main>
  );
}
