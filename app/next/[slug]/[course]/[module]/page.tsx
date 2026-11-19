import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { roadmapSteps } from "../../../../data/roadmap";
import { canonical } from "../../../../lib/siteUrl";
import { ogImage } from "../../../../lib/ogImage";
import TrackClose from "../../../../components/TrackClose";
import RoadmapFigure from "../../../../components/RoadmapFigure";

export function generateStaticParams() {
  return roadmapSteps.flatMap((step) =>
    (step.courses ?? []).flatMap((course) =>
      course.modules.map((entry) => ({
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
  const mod = course?.modules.find((item) => item.slug === moduleSlug);
  if (!step || !course || !mod) return {};
  const url = canonical(`/next/${step.id}/${course.slug}/${mod.slug}`);
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
  const mod = course?.modules.find((item) => item.slug === moduleSlug);
  if (!step || !course || !mod) notFound();

  return (
    <main className="px-4 sm:px-6 pt-28 pb-24 min-h-screen">
      <div className="mx-auto max-w-3xl">
        <Link
          href={`/next/${step.id}/${course.slug}`}
          className="text-xs text-slate-400 hover:text-slate-300 transition-colors"
        >
          ← Back to {course.title}
        </Link>

        <header className="mt-6 mb-6 space-y-3">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
            {"//"} What&apos;s Next · {step.order} · {course.title}
          </p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight font-display text-slate-100 leading-tight">
            {mod.title}
          </h1>
          <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl">
            {mod.summary}
          </p>
        </header>

        {/* The picture the breakdown refers to, so the page stands alone. */}
        {course.image ? <RoadmapFigure image={course.image} /> : null}

        {/* The breakdown: every component the diagram lists, and what it is
            actually for. Grouped the way the diagram groups them. */}
        <section className="mt-10 mb-12 space-y-8">
          {mod.breakdown.map((group) => (
            <div key={group.group} className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-widest text-[#5f93a8]">
                {group.group}
              </h2>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/60"
                  >
                    <p className="text-sm font-semibold text-slate-100">
                      {item.name}
                    </p>
                    <p className="mt-1 text-sm text-slate-400 leading-relaxed">
                      {item.role}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <TrackClose
          note="This is the breakdown of the diagram above: what each component is, and why it sits where it does in the pipeline. The course page carries the picture; the certificate page carries the plan it belongs to."
          links={[
            { label: "The course", href: `/next/${step.id}/${course.slug}` },
            { label: "The certificate", href: `/next/${step.id}` },
            { label: "The full plan", href: "/next" },
            { label: "Get in touch", href: "/#contact" },
          ]}
        />
      </div>
    </main>
  );
}
