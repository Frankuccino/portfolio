import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { roadmapSteps } from "../../data/roadmap";
import { canonical } from "../../lib/siteUrl";
import { ogImage } from "../../lib/ogImage";
import TrackClose from "../../components/TrackClose";

export function generateStaticParams() {
  return roadmapSteps.map((step) => ({ slug: step.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const step = roadmapSteps.find((item) => item.id === slug);
  if (!step) return {};
  const url = canonical(`/plan/${step.id}`);
  return {
    title: `${step.title} · The Plan`,
    description: step.summary,
    alternates: { canonical: url },
    openGraph: {
      title: step.title,
      description: step.summary,
      url,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: step.title,
      description: step.summary,
      images: [ogImage.url],
    },
  };
}

const hostOf = (url: string) => {
  try {
    return new URL(url).host.replace("www.", "");
  } catch {
    return url;
  }
};

/** "1 module" / "10 modules", or a label the data overrides, like "courses". */
const plural = (count: number, label: string) =>
  count === 1 ? label.replace(/s$/, "") : label;

export default async function RoadmapStepPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const step = roadmapSteps.find((item) => item.id === slug);
  if (!step) notFound();

  return (
    <main className="px-4 sm:px-6 pt-28 pb-24 min-h-screen">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/plan"
          className="text-xs text-slate-400 hover:text-slate-300 transition-colors"
        >
          ← Back to the plan
        </Link>

        <header className="mt-6 mb-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
              {"//"} The Plan · {step.finished ? "Finished" : step.order}
            </p>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight font-display text-slate-100 leading-tight">
            {step.title}
          </h1>
          <p className="text-[11px] text-slate-400 font-mono">
            {step.issuer} · {step.credentialType} · {step.commitment}
            {step.completed ? ` · Completed ${step.completed}` : ""}
            {step.url ? (
              <>
                {" · "}
                <a
                  href={step.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5f93a8] hover:text-slate-300 transition-colors"
                >
                  {hostOf(step.url)} ↗
                </a>
              </>
            ) : null}
          </p>
          {step.credentialId ? (
            <p className="text-[11px] text-slate-400 font-mono">
              Credential ID · <span className="tabular-nums">{step.credentialId}</span>
            </p>
          ) : null}
          <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl">
            {step.summary}
          </p>
          <ul className="space-y-1 pt-1">
            {step.outcomes.map((outcome) => (
              <li key={outcome} className="text-xs text-slate-400 flex gap-2">
                <span className="text-[#5f93a8] shrink-0">▸</span>
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </header>

        {/* Each course gets its own page, because the modules under it are the
            part that links out to the work reinforcing them. */}
        {step.courses && step.courses.length > 0 ? (
          <section className="mb-12 space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">
              {"//"} {step.coursesLabel ?? "Courses"}
            </h2>
            <div className="space-y-2">
              {step.courses.map((course) => (
                <Link
                  key={course.slug}
                  href={`/plan/${step.id}/${course.slug}`}
                  className="group block p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md hover:border-[#3e6274]/50 transition-colors"
                >
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-semibold text-slate-100 group-hover:text-white transition-colors">
                      {course.title}
                    </span>
                    <span className="shrink-0 text-[11px] text-slate-400 tabular-nums">
                      {course.modules && course.modules.length > 0
                        ? `${course.modules.length} ${plural(course.modules.length, course.moduleLabel ?? "modules")}`
                        : course.hours
                          ? `${course.hours} hours`
                          : ""}
                    </span>
                  </span>
                  {course.summary ? (
                    <span className="mt-1 block text-xs text-slate-400 leading-relaxed">
                      {course.summary}
                    </span>
                  ) : null}
                  <span className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-400 group-hover:text-white transition-colors">
                    {course.modules && course.modules.length > 0
                      ? (course.moduleLabel ?? "modules")[0].toUpperCase() +
                        (course.moduleLabel ?? "modules").slice(1)
                      : "Overview"}
                    <span className="text-slate-400 group-hover:text-[#5f93a8] transition-colors">
                      →
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {/* How the credential is actually assessed. The syllabus above is what
            was learned; this is what had to be passed. */}
        {step.process && step.process.length > 0 ? (
          <section className="mb-12 space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">
              {"//"} Certification Process
            </h2>
            <div className="space-y-2">
              {step.process.map((stage) => (
                <div
                  key={stage.name}
                  className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60"
                >
                  <p className="text-sm font-semibold text-slate-100">
                    {stage.name}
                  </p>
                  <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                    {stage.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <TrackClose
          note="The credential is the proof point; the capability behind it is what these pages point at. The reading order is the depth underneath, and the certificates already earned are the evidence that the path is being walked."
          links={[
            { label: "The full plan", href: "/plan" },
            { label: "The reading plan", href: "/books" },
            { label: "Certificates", href: "/#certificates" },
            { label: "Get in touch", href: "/#contact" },
          ]}
        />
      </div>
    </main>
  );
}
