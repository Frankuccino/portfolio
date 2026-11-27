import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { roadmapSteps } from "../../../../data/roadmap";
import { canonical } from "../../../../lib/siteUrl";
import { ogImage } from "../../../../lib/ogImage";
import { Markdown, noteChapters } from "../../../../lib/markdown";
import {
  buildUnits,
  collectCodeSnippets,
  parseQuizQuestions,
  type CodeSnippet,
  type QuizQuestion,
} from "../../../../lib/moduleContent";
import MockExam from "../../../../components/MockExam";

type AggregateLock = {
  id: string;
  moduleTitle: string;
  moduleSlug: string;
  title: string;
  lines: string[];
};

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
  const url = canonical(`/plan/${step.id}/${course.slug}/cheat-sheet`);
  return {
    title: `Exam kit · ${course.title}`,
    description: "Master rules, code snippets and aggregated practice questions across the course.",
    alternates: { canonical: url },
    openGraph: {
      title: `Exam kit · ${course.title}`,
      description: "Master rules, code snippets and aggregated practice questions across the course.",
      url,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `Exam kit · ${course.title}`,
      description: "Master rules, code snippets and aggregated practice questions across the course.",
      images: [ogImage.url],
    },
  };
}

export default async function CourseCheatSheetPage({
  params,
}: {
  params: Promise<{ slug: string; course: string }>;
}) {
  const { slug, course: courseSlug } = await params;
  const step = roadmapSteps.find((item) => item.id === slug);
  const course = step?.courses?.find((item) => item.slug === courseSlug);
  if (!step || !course) notFound();

  const basePath = `/plan/${step.id}/${course.slug}`;
  const modules = course.modules ?? [];
  const locks: AggregateLock[] = [];
  const snippets: CodeSnippet[] = [];
  const questions: QuizQuestion[] = [];

  modules.forEach((mod) => {
    const hasChapters = noteChapters(mod.notes).length > 0;
    const units = buildUnits(mod.notes ?? [], hasChapters);
    (mod.mentalLocks ?? []).forEach((lock, index) => {
      locks.push({
        id: `${mod.slug}-lock-${index}`,
        moduleTitle: mod.title,
        moduleSlug: mod.slug,
        title: lock.title,
        lines: lock.lines,
      });
    });
    snippets.push(...collectCodeSnippets(units, mod.title));
    questions.push(...parseQuizQuestions(units, mod.title));
  });

  return (
    <main className="relative px-4 sm:px-6 pt-28 pb-24 min-h-screen">
      <article className="mx-auto max-w-6xl">
        <Link href={basePath} className="text-xs text-slate-400 hover:text-slate-300">
          ← Back to {course.title}
        </Link>

        <header className="mt-6 mb-10 space-y-3">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
            {"//"} The Plan · Exam kit
          </p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight font-display text-slate-100">
            Course-wide cheat sheet
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            {locks.length} master rules, {snippets.length} code cookbook sections and {questions.length} practice questions pulled from the module notes.
          </p>
        </header>

        <section id="master-rules" className="scroll-mt-28">
          <h2 className="text-lg font-semibold text-slate-100">Master rules</h2>
          <div className="mt-4 space-y-4">
            {locks.map((lock, index) => (
              <div key={lock.id} className="rounded-lg border border-slate-800/70 bg-slate-950/40 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-100">
                    <span className="mr-2 font-mono text-[10px] text-[#7fb0c2]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {lock.title}
                  </p>
                  <Link
                    href={`${basePath}/${lock.moduleSlug}`}
                    className="shrink-0 text-[10px] font-mono text-slate-500 hover:text-[#7fb0c2]"
                  >
                    {lock.moduleTitle.slice(0, 26)}
                  </Link>
                </div>
                <ul className="mt-2 space-y-1">
                  {lock.lines.map((line) => (
                    <li key={line} className="flex gap-2 text-sm text-slate-400">
                      <span className="text-[#7fb0c2]">/</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="snippets" className="scroll-mt-28 mt-14">
          <h2 className="text-lg font-semibold text-slate-100">AI data engineering snippets</h2>
          <div className="mt-4 space-y-6">
            {snippets.map((snippet) => (
              <div key={snippet.id}>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-slate-200">{snippet.label}</h3>
                  <span className="text-[10px] font-mono text-slate-500">{snippet.module}</span>
                </div>
                <div className="mt-2 rounded-lg border border-slate-800/70 bg-slate-950/40 p-4">
                  <Markdown content={snippet.body} collapsibleTables />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="mock-exam" className="scroll-mt-28 mt-14">
          <h2 className="text-lg font-semibold text-slate-100">Randomized mock exam</h2>
          <p className="mt-1 text-xs text-slate-500">Answers stay hidden until you reveal them.</p>
          <div className="mt-4">
            <MockExam questions={questions} />
          </div>
        </section>
      </article>
    </main>
  );
}
