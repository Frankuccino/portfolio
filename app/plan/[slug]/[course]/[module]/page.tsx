import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { roadmapSteps } from "../../../../data/roadmap";
import { canonical } from "../../../../lib/siteUrl";
import { ogImage } from "../../../../lib/ogImage";
import TrackClose from "../../../../components/TrackClose";
import RoadmapFigure from "../../../../components/RoadmapFigure";
import { PageMetrics } from "../../../../components/PageMetrics";
import ModuleWorkspace, { type ModuleTab } from "../../../../components/ModuleWorkspace";
import ModuleStepper, { type ModuleStep } from "../../../../components/ModuleStepper";
import QuizQuestion from "../../../../components/QuizQuestion";
import type { ReadingRailSection } from "../../../../components/ReadingPlanLayout";
import { Markdown, headingSlug, noteChapters } from "../../../../lib/markdown";
import {
  buildUnits,
  collectCodeSnippets,
  parseQuizQuestions,
  splitNote,
  type TopicUnit,
} from "../../../../lib/moduleContent";

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

const LAYER_COLORS = ["#3e6274", "#4f7d92", "#5f93a8", "#7fb0c2", "#a8d0de"];

function isQuizUnit(unit: TopicUnit): boolean {
  return /quiz/i.test(unit.label) || /^Question\s+\d+:/m.test(unit.body);
}

function isAnswerUnit(unit: TopicUnit): boolean {
  return /answer key|answer & explanation|answer and explanation/i.test(unit.label);
}

function isCodeUnit(unit: TopicUnit): boolean {
  return unit.body.includes("```") && !/quiz|answer key/i.test(unit.label);
}

function isTakeaway(unit: TopicUnit): boolean {
  return (
    /three-bullet takeaway/i.test(unit.label) ||
    /^#{2,4}\s+Three-bullet takeaway/im.test(unit.body)
  );
}

function takeawaySource(unit: TopicUnit, topicLabel = ""): string {
  if (/^three-bullet takeaway$/i.test(unit.label.trim())) {
    return topicLabel.replace(/^Sub-module\s+\d+:\s*/i, "").trim() || "module review";
  }
  return unit.label
    .replace(/^Derived notes:\s*/i, "")
    .replace(/^Three-bullet takeaway:\s*/i, "")
    .trim() || "module review";
}

const ACRONYMS = new Set([
  "AI", "RAG", "LLM", "SQL", "PII", "PHI", "SLA", "JSON", "OCR", "ACL", "BI", "ETL", "ELT", "JSONL", "ID", "API", "KPI",
]);

function displaySource(source: string, unit: TopicUnit, modSlug: string, topicLabel = ""): string {
  if (
    /^three-bullet takeaway$/i.test(unit.label.trim()) &&
    /golden recall/i.test(topicLabel) &&
    modSlug.startsWith("llms-for-data-engineers")
  ) {
    return "Prompting & Context";
  }
  return source
    .split(/\s+/)
    .map((word) => {
      const parts = word.match(/^([^\p{L}\p{N}]*)([\p{L}\p{N}&/+\-]+)([^\p{L}\p{N}]*)$/u);
      if (!parts) return word;
      const [, prefix, core, suffix] = parts;
      if (ACRONYMS.has(core.toUpperCase())) return `${prefix}${core.toUpperCase()}${suffix}`;
      return `${prefix}${core.charAt(0).toUpperCase()}${core.slice(1).toLowerCase()}${suffix}`;
    })
    .filter(Boolean)
    .join(" ");
}

function takeawayBody(unit: TopicUnit, compact: boolean): string {
  const { body } = splitNote(unit);
  const section = body.match(
    /(?:^|\n)#{3,4}\s+Three-bullet takeaway[^\n]*\n([\s\S]*?)(?=\n#{3,4}\s|\n##\s|$)/i,
  );
  const text = (section ? section[1] : body)
    .replace(/^####\s+Three-bullet takeaway\s*/i, "")
    .trim();
  if (!compact) return text;
  return text.split(/\n\s*\n/)[0].trim();
}

function isDecisionTable(unit: TopicUnit): boolean {
  if (/glossary|quiz|assessment|exhibit|checklist|terms|derived notes/i.test(unit.label)) {
    return false;
  }
  return (
    unit.body.includes("|") &&
    /decision|versus|trade-off|comparison|matrix|scoreboard|scorecard|readiness|dashboard|assistant|retrieval strategy|indexing side|features and embeddings|skew|ownership|monitoring signals|sensitive data|leakage|architecture/i.test(
      unit.label,
    )
  );
}

function decisionFamily(label: string): string {
  if (/value against readiness/i.test(label)) return "decision";
  if (/dashboard|assistant/i.test(label)) return "workload";
  if (/analytics-ready/i.test(label)) return "readiness";
  if (/chunk/i.test(label)) return "chunking";
  if (/failure|diagnos/i.test(label)) return "failure";
  if (/evaluation|scoreboard|scorecard|monitoring signals/i.test(label)) return "evaluation";
  if (/fine-tun|adaptation|rag (versus|versus)|rag versus/i.test(label)) return "adaptation";
  if (/retrieval|indexing side|keyword search|similarity/i.test(label)) return "retrieval";
  if (/feature|embedding|skew/i.test(label)) return "features";
  if (/ownership|governance|sensitive data|leakage|explain/i.test(label)) return "governance";
  if (/decision option|architecture/i.test(label)) return "decision";
  return label;
}

function decisionRank(label: string): number {
  if (/decision options/i.test(label)) return 0;
  if (/matrix|scorecard/i.test(label)) return 1;
  if (/versus|comparison|trade-off/i.test(label)) return 2;
  if (/readiness|dashboard|assistant/i.test(label)) return 3;
  return 4;
}

function NoteBlock({ unit }: { unit: TopicUnit }) {
  const { label, body } = splitNote(unit);
  const gate = /gate/i.test(label);
  return (
    <div id={unit.id} className="scroll-mt-28 rounded-lg border border-slate-800/60 bg-slate-950/30 p-4">
      <div className="flex items-center gap-2">
        {gate ? (
          <span className="rounded border border-purple-500/30 bg-purple-500/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-purple-300">
            Gate
          </span>
        ) : null}
        <h3 className="text-sm font-semibold text-slate-100">{label}</h3>
      </div>
      <div className="mt-2">
        <Markdown content={body} collapsibleTables />
      </div>
    </div>
  );
}

function TakeawayBlock({ unit, source, compact = false }: { unit: TopicUnit; source: string; compact?: boolean }) {
  const text = takeawayBody(unit, compact);
  return (
    <div
      id={unit.id}
      className="scroll-mt-28 rounded-lg border border-slate-800/60 bg-slate-950/30 p-4"
    >
      <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
        From: {source}
      </p>
      <div className="mt-3">
        <Markdown content={text} collapsibleTables />
      </div>
    </div>
  );
}

function CollapsedNote({ unit }: { unit: TopicUnit }) {
  const { label, body } = splitNote(unit);
  return (
    <details id={unit.id} className="scroll-mt-28 rounded-lg border border-slate-800/60 bg-slate-950/30 px-4 py-3">
      <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
        {label}
      </summary>
      <div className="mt-3">
        <Markdown content={body} collapsibleTables />
      </div>
    </details>
  );
}

function toc(
  id: string,
  label: string,
  chip: string,
  children: { id: string; label: string }[],
  keywords?: string[],
): ReadingRailSection {
  return {
    id,
    label,
    chip,
    meta: `${children.length} section${children.length === 1 ? "" : "s"}`,
    keywords,
    children,
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

  const coursePath = `/plan/${step.id}/${course.slug}`;
  const moduleSteps: ModuleStep[] = (course.modules ?? []).map((entry, index) => ({
    slug: entry.slug,
    title: entry.title,
    number: index + 1,
  }));
  const currentIndex = Math.max(
    0,
    moduleSteps.findIndex((entry) => entry.slug === moduleSlug),
  );

  const chapters = noteChapters(mod.notes);
  const hasChapters = chapters.length > 0;
  const groups = mod.breakdown ?? [];
  const mustMasterSkills = mod.mustMasterSkills ?? [];
  const mentalLocks = mod.mentalLocks ?? [];
  const layers = mod.layers ?? [];
  const units = buildUnits(mod.notes ?? [], hasChapters);
  const topics = mod.topics?.length
    ? mod.topics
    : units.map((unit, index) => ({ label: unit.label, units: [index] }));
  const topicByIndex = new Map<number, string>();
  topics.forEach((topic) => {
    topic.units.forEach((index) => topicByIndex.set(index, topic.label));
  });

  const goldenTopic = topics.find((topic) => /golden recall/i.test(topic.label));
  const goldenUnits = new Set(goldenTopic?.units ?? []);
  const caseUnits = new Set(
    topics
      .filter((topic) => /case study/i.test(topic.label))
      .flatMap((topic) => topic.units),
  );

  const topicLayers: Record<string, { label: string; color: string }> = {};
  topics.forEach((topic) => {
    const layerIndex = layers.findIndex((layer) => {
      const offset = hasChapters ? 0 : -1;
      const covered = new Set<number>();
      for (let position = layer.start + offset; position <= layer.end + offset; position += 1) {
        covered.add(position);
      }
      return topic.units.some((unit) => covered.has(unit));
    });
    if (layerIndex >= 0) {
      topicLayers[headingSlug(topic.label)] = {
        label: layers[layerIndex].label,
        color: LAYER_COLORS[layerIndex % LAYER_COLORS.length],
      };
    }
  });

  const topicKeywords: Record<string, string[]> = {};
  topics.forEach((topic) => {
    const seen = new Set<string>();
    topicKeywords[headingSlug(topic.label)] = topic.units
      .map((index) => units[index]?.label ?? "")
      .filter((label) => {
        if (!label || seen.has(label)) return false;
        seen.add(label);
        return true;
      })
      .slice(0, 4);
  });

  const category = (unit: TopicUnit, index: number): "cheat" | "notes" | "case" | "quiz" => {
    if (isQuizUnit(unit) || isAnswerUnit(unit)) return "quiz";
    if (isCodeUnit(unit) && !goldenUnits.has(index)) return "case";
    if (caseUnits.has(index)) return "case";
    if (goldenUnits.has(index)) return "cheat";
    return "notes";
  };

  const indexes = (list: "all" | "cheat" | "notes" | "case" | "quiz") =>
    units
      .map((unit, index) => ({ unit, index }))
      .filter(({ unit, index }) => list === "all" || category(unit, index) === list)
      .map(({ index }) => index);

  const explicitTakeawayIndexes = indexes("all").filter((index) => isTakeaway(units[index]));
  const hasExplicitTakeaways = explicitTakeawayIndexes.length > 0;
  const takeawayIndexes = hasExplicitTakeaways
    ? explicitTakeawayIndexes
    : indexes("all").slice(0, 3);
  const cheatDecisionCandidates = indexes("cheat").filter((index) => isDecisionTable(units[index]));
  const decisionCandidates = cheatDecisionCandidates.length
    ? cheatDecisionCandidates
    : indexes("all").filter((index) => !caseUnits.has(index) && isDecisionTable(units[index]));
  const decisionByFamily = new Map<string, number>();
  decisionCandidates.forEach((index) => {
    const label = units[index].label;
    const family = decisionFamily(label);
    const current = decisionByFamily.get(family);
    if (current === undefined || decisionRank(label) < decisionRank(units[current].label)) {
      decisionByFamily.set(family, index);
    }
  });
  const decisionIndexes = [...decisionByFamily.values()].sort((a, b) => a - b).slice(0, 5);
  const recallIndexes = indexes("cheat").filter(
    (index) => !takeawayIndexes.includes(index) && !decisionIndexes.includes(index),
  );
  const codeIndexes = indexes("case").filter((index) => isCodeUnit(units[index]));
  const caseTopicIndexes = indexes("all").filter((index) => caseUnits.has(index));
  const quizQuestions = parseQuizQuestions(units, mod.title);
  const quizIndexes = indexes("quiz");

  const conceptIndex = (
    <details id="concept-index" className="scroll-mt-28 rounded-lg border border-slate-800/70 bg-slate-950/40 p-4">
      <summary className="cursor-pointer text-sm font-semibold text-slate-200">
        Concept index ({groups.reduce((total, group) => total + group.items.length, 0)})
      </summary>
      <div className="mt-4">
        <PageMetrics mod={mod} />
        {layers.length > 0 ? (
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
            {layers.map((layer, index) => (
              <div key={layer.label} className="flex items-center gap-2">
                <span className="font-mono text-[10px]" style={{ color: LAYER_COLORS[index % LAYER_COLORS.length] }}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-xs text-slate-300">{layer.label}</span>
                <span className="text-[10px] text-slate-500">
                  {layer.end - layer.start + 1} {hasChapters ? "subtopics" : "sections"}
                </span>
              </div>
            ))}
          </div>
        ) : null}
        {mod.image ? (
          <div className="my-6">
            <RoadmapFigure image={mod.image} />
          </div>
        ) : null}
        {groups.map((group) => (
          <div key={group.group} className="mt-6 first:mt-0">
            <h3 className="text-sm font-semibold text-slate-100">{group.group}</h3>
            <ul className="mt-2 list-disc list-inside space-y-1.5 text-sm text-slate-400 marker:text-[#5f93a8]">
              {group.items.map((item) => (
                <li key={item.name}>
                  <strong className="font-semibold text-slate-200">{item.name}</strong>: {item.role}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </details>
  );

  const topicSection = (topicLabel: string, topicIndexes: number[], expandCount = 2) => {
    const topicId = headingSlug(topicLabel);
    const layer = topicLayers[topicId];
    return (
      <section id={topicId} key={topicId} className="scroll-mt-28 mt-12 first:mt-0">
        <div className="border-t border-slate-800/80 pt-5">
          {layer ? (
            <p className="mb-1.5 font-mono text-[10px] uppercase tracking-widest" style={{ color: layer.color }}>
              {layer.label}
            </p>
          ) : null}
          <h2 className="text-lg md:text-xl font-semibold text-slate-100 tracking-tight">{topicLabel}</h2>
          {topicKeywords[topicId]?.length ? (
            <p className="mt-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-500">
              Keywords: {topicKeywords[topicId].join(" · ")}
            </p>
          ) : null}
          <div className="mt-5 space-y-3">
            {topicIndexes.map((index, position) =>
              position < expandCount ? (
                <NoteBlock key={units[index].id} unit={units[index]} />
              ) : (
                <CollapsedNote key={units[index].id} unit={units[index]} />
              ),
            )}
          </div>
        </div>
      </section>
    );
  };

  const deepContent = (
    <div>
      {conceptIndex}
      <div className="mt-10">
        {topics
          .filter(
            (topic) =>
              !goldenUnits.has(topic.units[0] ?? -1) && !caseUnits.has(topic.units[0] ?? -1),
          )
          .map((topic) => {
            const selected = topic.units.filter(
              (index) => category(units[index], index) === "notes",
            );
            return selected.length ? topicSection(topic.label, selected) : null;
          })}
      </div>
    </div>
  );

  const cheatContent = (
    <div className="space-y-10">
      {takeawayIndexes.length ? (
        <section id="cheat-takeaway" className="scroll-mt-28">
          <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">
            {"//"} 3-bullet executive takeaway
          </h2>
          <div className="mt-4 space-y-3">
            {takeawayIndexes.map((index) => (
              <TakeawayBlock key={units[index].id} unit={units[index]} source={displaySource(takeawaySource(units[index], topicByIndex.get(index)), units[index], mod.slug, topicByIndex.get(index))} compact={!hasExplicitTakeaways} />
            ))}
          </div>
        </section>
      ) : null}

      {mustMasterSkills.length ? (
        <section id="cheat-skills" className="scroll-mt-28">
          <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">
            {"//"} Must master skills
          </h2>
          <ol className="mt-4 space-y-3">
            {mustMasterSkills.map((item, index) => (
              <li key={item.skill} id={`skill-${index}`} className="scroll-mt-28 grid grid-cols-[2rem_1fr] gap-3">
                <span className="font-mono text-[11px] text-[#7fb0c2]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-100">{item.skill}</p>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.outcome}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {mentalLocks.length ? (
        <section id="cheat-locks" className="scroll-mt-28">
          <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">
            {"//"} Mental locks
          </h2>
          <ol className="mt-4 space-y-3">
            {mentalLocks.map((lock, index) => (
              <li key={lock.title} id={`lock-${index}`} className="scroll-mt-28 grid grid-cols-[2rem_1fr] gap-3">
                <span className="font-mono text-[11px] text-[#7fb0c2]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-100">{lock.title}</p>
                  <ul className="mt-1 space-y-1">
                    {lock.lines.map((line, lineIndex) => (
                      <li key={`${line}-${lineIndex}`} className="flex gap-2 text-sm text-slate-400">
                        <span className="text-[#7fb0c2]">/</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {decisionIndexes.length ? (
        <section id="cheat-decisions" className="scroll-mt-28">
          <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">
            {"//"} Decision and trade-off tables
          </h2>
          <div className="mt-4 space-y-3">
            {decisionIndexes.map((index, position) =>
              position < 3 ? (
                <NoteBlock key={units[index].id} unit={units[index]} />
              ) : (
                <CollapsedNote key={units[index].id} unit={units[index]} />
              ),
            )}
          </div>
        </section>
      ) : null}

      {recallIndexes.length ? (
        <section id="cheat-recall" className="scroll-mt-28">
          <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">
            {"//"} Reference notes ({recallIndexes.length})
          </h2>
          <div className="mt-4 space-y-3">
            {recallIndexes.map((index) => (
              <CollapsedNote key={units[index].id} unit={units[index]} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );

  const exhibitIndexes = indexes("all").filter((index) =>
    /exhibit|metric|diagnostics/i.test(units[index].label),
  );
  const caseContent = (
    <div>
      <aside className="sticky top-24 z-10 mb-8 rounded-lg border border-[#3e6274]/40 bg-[#0e0d16]/95 p-4 backdrop-blur-md">
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#7fb0c2]">
          {"//"} Pinned exhibits
        </p>
        <ul className="mt-2 space-y-1.5">
          {exhibitIndexes.length ? (
            exhibitIndexes.map((index) => (
              <li key={units[index].id}>
                <a href={`#${units[index].id}`} className="text-xs text-slate-300 hover:text-white">
                  {splitNote(units[index]).label}
                </a>
              </li>
            ))
          ) : (
            <li className="text-xs text-slate-500">No exhibit notes in this module</li>
          )}
        </ul>
      </aside>

      <section id="case-topics" className="scroll-mt-28">
        <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">
          {"//"} Case study
        </h2>
        <div className="mt-4 space-y-3">
          {caseTopicIndexes.map((index) => (
            <NoteBlock key={units[index].id} unit={units[index]} />
          ))}
        </div>
      </section>

      <section id="case-code" className="scroll-mt-28 mt-12">
        <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">
          {"//"} Lab code cookbook
        </h2>
        <div className="mt-4 space-y-3">
          {codeIndexes.map((index) => (
            <NoteBlock key={units[index].id} unit={units[index]} />
          ))}
        </div>
      </section>
    </div>
  );

  const quizContent = (
    <div className="space-y-8">
      <section className="rounded-lg border border-slate-800/70 bg-slate-950/30 p-4">
        <p className="text-xs text-slate-400">
          {quizQuestions.length} questions loaded. Answers stay hidden until you reveal them.
        </p>
      </section>
      {Array.from(new Set(quizQuestions.map((question) => question.source))).map((source) => (
        <section key={source} id={headingSlug(source)} className="scroll-mt-28">
          <h2 className="text-sm font-semibold text-slate-100">{source}</h2>
          <div className="mt-3 space-y-3">
            {quizQuestions
              .filter((question) => question.source === source)
              .map((question) => (
                <QuizQuestion key={question.id} question={question} />
              ))}
          </div>
        </section>
      ))}
      {quizIndexes.length ? (
        <details className="rounded-lg border border-slate-800/70 bg-slate-950/30 p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300">
            Source quiz text
          </summary>
          <div className="mt-4 space-y-3">
            {quizIndexes.map((index) => (
              <CollapsedNote key={units[index].id} unit={units[index]} />
            ))}
          </div>
        </details>
      ) : null}
    </div>
  );

  const footer = (
    <div className="mt-12">
      <ModuleStepper modules={moduleSteps} currentIndex={currentIndex} basePath={coursePath} variant="bottom" />
      <TrackClose
        note="Use the four views deliberately: scan the cheat sheet, read the deep notes, open the code and exhibits when implementing, then test yourself with hidden answers."
        links={[
          { label: "The course", href: coursePath },
          { label: "Exam kit", href: `${coursePath}/cheat-sheet` },
          { label: "The certificate", href: `/plan/${step.id}` },
          { label: "Get in touch", href: "/#contact" },
        ]}
      />
    </div>
  );

  const withFooter = (content: ReactNode) => (
    <>
      {content}
      {footer}
    </>
  );

  const tabs: ModuleTab[] = [
    { id: "cheat", label: "Cheat Sheet", content: withFooter(cheatContent) },
    { id: "notes", label: "Deep Notes", content: withFooter(deepContent) },
    { id: "case", label: "Case & Code", content: withFooter(caseContent) },
    { id: "quiz", label: "Active Recall", content: withFooter(quizContent) },
  ];

  const cheatToc: ReadingRailSection[] = [
    ...(takeawayIndexes.length
      ? [toc("cheat-takeaway", "Executive takeaway", "01", takeawayIndexes.map((index) => ({ id: units[index].id, label: displaySource(takeawaySource(units[index], topicByIndex.get(index)), units[index], mod.slug, topicByIndex.get(index)) })))]
      : []),
    ...(mustMasterSkills.length
      ? [toc("cheat-skills", "Must master skills", "02", mustMasterSkills.map((item, index) => ({ id: `skill-${index}`, label: item.skill })))]
      : []),
    ...(mentalLocks.length
      ? [toc("cheat-locks", "Mental locks", "03", mentalLocks.map((lock, index) => ({ id: `lock-${index}`, label: lock.title })))]
      : []),
    ...(decisionIndexes.length
      ? [toc("cheat-decisions", "Decision tables", "04", decisionIndexes.map((index) => ({ id: units[index].id, label: splitNote(units[index]).label })))]
      : []),
    ...(recallIndexes.length
      ? [toc("cheat-recall", "Reference notes", "05", recallIndexes.map((index) => ({ id: units[index].id, label: splitNote(units[index]).label })))]
      : []),
  ].map((section, index) => ({ ...section, chip: String(index + 1).padStart(2, "0") }));

  const tocByTab: Record<string, ReadingRailSection[]> = {
    cheat: cheatToc,
    notes: [
      {
        id: "concept-index",
        label: "Concept index",
        chip: "00",
        meta: `${groups.length} categories`,
      },
      ...topics
        .filter((topic) => {
          const first = topic.units[0] ?? -1;
          return !goldenUnits.has(first) && !caseUnits.has(first);
        })
        .map((topic, index) =>
          toc(
            headingSlug(topic.label),
            topic.label,
            String(index + 1).padStart(2, "0"),
            topic.units
              .filter((unitIndex) => category(units[unitIndex], unitIndex) === "notes")
              .map((unitIndex) => ({ id: units[unitIndex].id, label: splitNote(units[unitIndex]).label })),
            topicKeywords[headingSlug(topic.label)],
          ),
        ),
    ],
    case: [
      toc("case-topics", "Case study", "01", caseTopicIndexes.map((index) => ({ id: units[index].id, label: splitNote(units[index]).label }))),
      toc("case-code", "Lab code cookbook", "02", codeIndexes.map((index) => ({ id: units[index].id, label: splitNote(units[index]).label }))),
    ],
    quiz: Array.from(new Set(quizQuestions.map((question) => question.source))).map((source, index) =>
      toc(
        headingSlug(source),
        source,
        String(index + 1).padStart(2, "0"),
        quizQuestions
          .filter((question) => question.source === source)
          .map((question) => ({ id: question.id, label: `Question ${question.number}` })),
      ),
    ),
  };

  const header = (
    <>
      <Link
        href={coursePath}
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
        {mod.studyStatus === "in-progress" ? (
          <p className="text-[11px] text-slate-400 font-mono">
            Notes in progress · Module {String(currentIndex + 1).padStart(2, "0")} of {String(moduleSteps.length).padStart(2, "0")}
            {mod.hours ? ` · ${mod.hours} ${mod.hours === 1 ? "hr" : "hrs"}` : ""}
          </p>
        ) : mod.completed || mod.studyStatus === "done" || ((mod.notes?.length ?? 0) > 0 && (mod.breakdown?.length ?? 0) > 0) ? (
          <p className="text-[11px] text-slate-400 font-mono">
            Completed Module {String(currentIndex + 1).padStart(2, "0")} of {String(moduleSteps.length).padStart(2, "0")}
            {mod.hours ? ` · ${mod.hours} ${mod.hours === 1 ? "hr" : "hrs"}` : ""}
          </p>
        ) : null}
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">{mod.summary}</p>
      </header>

      <ModuleStepper modules={moduleSteps} currentIndex={currentIndex} basePath={coursePath} variant="top" />
    </>
  );

  return (
    <main className="relative px-4 sm:px-6 pt-28 pb-24 min-h-screen">
      <ModuleWorkspace header={header} tabs={tabs} tocByTab={tocByTab} />
    </main>
  );
}
