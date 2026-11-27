import Link from "next/link";
import type { RoadmapModule } from "../data/roadmap";
import RoadmapFigure from "./RoadmapFigure";

/**
 * One row per module on the course page. Every card uses the same surfaces:
 * number on the left, meta on the right, and one status row that separates
 * issuer completion from portfolio study progress.
 */
export default function RoadmapModuleCard({
  module,
  href,
  number,
}: {
  module: RoadmapModule;
  href: string;
  number: number;
}) {
  const conceptCount = module.breakdown?.reduce(
    (total, group) => total + group.items.length,
    0,
  );
  const hasBreakdown = Boolean(module.breakdown);
  const hasNotes = Boolean(module.notes);
  const notesDone =
    module.studyStatus === "done" || (hasNotes && hasBreakdown);
  const notesProgress =
    module.studyStatus === "in-progress" || (hasNotes && !notesDone);

  const meta = [
    module.hours
      ? `${module.hours} ${module.hours === 1 ? "hr" : "hrs"}`
      : null,
    hasBreakdown
      ? `${conceptCount} concepts`
      : hasNotes
        ? "notes only"
        : "not written",
  ]
    .filter(Boolean)
    .join(" · ");

  const action = hasBreakdown
    ? "Full breakdown"
    : hasNotes
      ? "Full notes"
      : "Open module";

  return (
    <Link
      href={href}
      className="group flex gap-3 p-4 sm:p-5 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md hover:border-[#3e6274]/50 transition-colors"
    >
      <span className="shrink-0 w-10 border-r border-slate-800/60 pr-3">
        <span className="block text-[9px] font-mono uppercase tracking-widest text-slate-500">
          Module
        </span>
        <span className="mt-0.5 block text-lg font-semibold tabular-nums text-slate-300 group-hover:text-white transition-colors">
          {String(number).padStart(2, "0")}
        </span>
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-baseline justify-between gap-3">
          <span className="text-sm font-semibold text-slate-100 group-hover:text-white transition-colors">
            {module.title}
          </span>
          <span className="shrink-0 text-[11px] text-slate-400 tabular-nums">
            {meta}
          </span>
        </span>

        <span className="mt-1 block text-xs text-slate-400 leading-relaxed">
          {module.summary}
        </span>

        <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
          {module.completed ? (
            <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-slate-300">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-slate-400"
              />
              Issuer complete
            </span>
          ) : null}
          {notesDone ? (
            <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-[#7fb0c2]">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[#7fb0c2]"
              />
              Notes complete
            </span>
          ) : notesProgress ? (
            <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-slate-500"
              />
              Notes in progress
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-slate-700"
              />
              Not written yet
            </span>
          )}
          <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-400 group-hover:text-white transition-colors">
            {action}
            <span className="text-slate-400 group-hover:text-[#5f93a8] transition-colors">
              →
            </span>
          </span>
        </span>

        {module.image ? (
          <span className="mt-4 block">
            <RoadmapFigure image={module.image} />
          </span>
        ) : null}
      </span>
    </Link>
  );
}
