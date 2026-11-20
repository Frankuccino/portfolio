import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { roadmapSteps } from "../../../data/roadmap";
import { canonical } from "../../../lib/siteUrl";
import { ogImage } from "../../../lib/ogImage";
import TrackClose from "../../../components/TrackClose";
import RoadmapModuleCard from "../../../components/RoadmapModuleCard";

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
      <div className="mx-auto max-w-6xl">
        <Link
          href={`/next/${step.id}`}
          className="text-xs text-slate-400 hover:text-slate-300 transition-colors"
        >
          ← Back to {step.title}
        </Link>

        <header className="mt-6 mb-8 space-y-3">
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

        {/* Each module is a card carrying its own diagram, so the picture and
            the hook for it stay together. */}
        <section className="mb-12 space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">
            {"//"}{" "}
            {(course.moduleLabel ?? "modules")[0].toUpperCase() +
              (course.moduleLabel ?? "modules").slice(1)}
          </h2>
          <div className="space-y-3">
            {course.modules.map((module) => (
              <RoadmapModuleCard
                key={module.slug}
                module={module}
                href={`/next/${step.id}/${course.slug}/${module.slug}`}
              />
            ))}
          </div>
        </section>

        <TrackClose
          note="Each module above carries the diagram of the environment it describes, and links to the page that explains what every component in it is for. The certificate page carries the plan they belong to."
          links={[
            { label: "The certificate", href: `/next/${step.id}` },
            { label: "The full plan", href: "/next" },
            { label: "The reading plan", href: "/books" },
            { label: "Get in touch", href: "/#contact" },
          ]}
        />
      </div>
    </main>
  );
}
