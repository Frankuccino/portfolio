import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { roadmapSteps } from "../../../data/roadmap";
import { canonical } from "../../../lib/siteUrl";
import { ogImage } from "../../../lib/ogImage";
import TrackClose from "../../../components/TrackClose";
import RoadmapFigure from "../../../components/RoadmapFigure";

export function generateStaticParams() {
  return roadmapSteps.flatMap((step) =>
    (step.courses ?? []).map((course) => ({
      slug: step.id,
      course: course.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; course: string }>;
}): Promise<Metadata> {
  const { slug, course: courseSlug } = await params;
  const step = roadmapSteps.find((item) => item.id === slug);
  const course = step?.courses?.find((item) => item.slug === courseSlug);
  if (!step || !course) return {};
  const url = canonical(`/next/${step.id}/${course.slug}`);
  const description = course.summary ?? step.summary;
  return {
    title: `${course.title} · ${step.title}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: course.title,
      description,
      url,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: course.title,
      description,
      images: [ogImage.url],
    },
  };
}

export default async function RoadmapCoursePage({
  params,
}: {
  params: Promise<{ slug: string; course: string }>;
}) {
  const { slug, course: courseSlug } = await params;
  const step = roadmapSteps.find((item) => item.id === slug);
  const course = step?.courses?.find((item) => item.slug === courseSlug);
  if (!step || !course) notFound();

  return (
    <main className="px-4 sm:px-6 pt-28 pb-24 min-h-screen">
      <div className="mx-auto max-w-3xl">
        <Link
          href={`/next/${step.id}`}
          className="text-xs text-slate-400 hover:text-slate-300 transition-colors"
        >
          ← Back to {step.title}
        </Link>

        <header className="mt-6 mb-6 space-y-3">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
            {"//"} What&apos;s Next · {step.order} · {step.title}
          </p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight font-display text-slate-100 leading-tight">
            {course.title}
          </h1>
          {course.summary ? (
            <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl">
              {course.summary}
            </p>
          ) : null}
        </header>

        {course.image ? <RoadmapFigure image={course.image} /> : null}

        {/* The course page carries the picture; each module links to the page
            that explains what every part of it is for. */}
        <section className="mt-10 mb-12 space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">
            {"//"} Modules
          </h2>
          <div className="space-y-2">
            {course.modules.map((module) => {
              const count = module.breakdown.reduce(
                (total, group) => total + group.items.length,
                0,
              );
              return (
                <Link
                  key={module.slug}
                  href={`/next/${step.id}/${course.slug}/${module.slug}`}
                  className="group block p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md hover:border-[#3e6274]/50 transition-colors"
                >
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-semibold text-slate-100 group-hover:text-white transition-colors">
                      {module.title}
                    </span>
                    <span className="shrink-0 text-[11px] text-slate-400 tabular-nums">
                      {count} components
                    </span>
                  </span>
                  <span className="mt-1 block text-xs text-slate-400 leading-relaxed">
                    {module.summary}
                  </span>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-400 group-hover:text-white transition-colors">
                    Full breakdown
                    <span className="text-slate-400 group-hover:text-[#5f93a8] transition-colors">
                      →
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <TrackClose
          note="The diagram above is the environment the course's modules are read against. Each module page explains what every component in it is for, which is the part the picture alone cannot say."
          links={[
            { label: "The certificate", href: `/next/${step.id}` },
            { label: "The full plan", href: "/next" },
            { label: "The reading plan", href: "/reading" },
            { label: "Get in touch", href: "/#contact" },
          ]}
        />
      </div>
    </main>
  );
}
