import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { roadmapSteps } from "../../data/roadmap";
import { resolveReinforcements } from "../../lib/reinforcements";
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
  const url = canonical(`/next/${step.id}`);
  return {
    title: `${step.title} · What's Next`,
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
      <div className="mx-auto max-w-3xl">
        <Link
          href="/next"
          className="text-xs text-slate-400 hover:text-slate-300 transition-colors"
        >
          ← Back to the plan
        </Link>

        <header className="mt-6 mb-10 space-y-3">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
            {"//"} What&apos;s Next · {step.order}
          </p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight font-display text-slate-100 leading-tight">
            {step.title}
          </h1>
          <p className="text-[11px] text-slate-400 font-mono">
            {step.issuer} · {step.credentialType} · {step.commitment}
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

        {/* The syllabus: each module links to the work on this site that already
            covers its ground, which is the part a certificate alone cannot show. */}
        {step.courses && step.courses.length > 0 ? (
          <section className="mb-12 space-y-6">
            <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">
              {"//"} Courses
            </h2>
            {step.courses.map((course) => (
              <div key={course.title} className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-100">
                  {course.title}
                </h3>
                {course.modules.map((module) => (
                  <div
                    key={module.title}
                    className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md"
                  >
                    <p className="text-[10px] font-mono uppercase tracking-widest text-[#5f93a8]">
                      {module.title}
                    </p>
                    <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                      {module.summary}
                    </p>
                    {/* Resolved from ids, so a renamed stage or post updates
                        these links instead of breaking them. */}
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                      {resolveReinforcements(module.reinforces).map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="text-[11px] font-medium text-slate-300 hover:text-white transition-colors"
                        >
                          <span className="text-slate-500">{item.kindLabel} · </span>
                          {item.label}{" "}
                          <span className="text-slate-400 transition-colors">→</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </section>
        ) : null}

        <TrackClose
          note="The credential is the proof point; the capability behind it is what this page points at. The reading order is the depth underneath, and the certificates already earned are the evidence that the path is being walked."
          links={[
            { label: "The full plan", href: "/next" },
            { label: "The reading plan", href: "/reading" },
            { label: "Certificates", href: "/#certificates" },
            { label: "Get in touch", href: "/#contact" },
          ]}
        />
      </div>
    </main>
  );
}
