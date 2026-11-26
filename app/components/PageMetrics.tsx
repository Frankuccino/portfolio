import type { RoadmapModule } from "../data/roadmap";

/**
 * Every figure is counted from the module record the page is already
 * rendering, so the strip cannot drift from the content beneath it.
 */
export function PageMetrics({ mod }: { mod: RoadmapModule }) {
  const groups = mod.breakdown ?? [];
  const noteSectionCount = (mod.notes ?? []).reduce(
    (total, note) =>
      total +
      note.split("\n").filter((line) => /^###\s/.test(line)).length,
    0,
  );
  const metrics = [
    {
      label: "concepts",
      value: groups.reduce((n, group) => n + group.items.length, 0),
    },
    { label: "categories", value: groups.length },
    ...(mod.image ? [{ label: "figures", value: 1 }] : []),
    { label: "note sections", value: noteSectionCount },
  ];

  return (
    <section
      className="mb-8 py-3 border-y border-slate-800/60"
      aria-label="Page metrics"
    >
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
          {"//"} Page map
        </span>
        {metrics.map((metric) => (
          <span key={metric.label} className="text-xs text-slate-400">
            <span className="mr-1 text-sm font-semibold text-[#5f93a8] tabular-nums">
              {metric.value}
            </span>
            {metric.label}
          </span>
        ))}
      </div>
      <p className="mt-2 text-[10px] text-slate-500">
        Counted from this page&apos;s groups and notes.
      </p>
    </section>
  );
}
