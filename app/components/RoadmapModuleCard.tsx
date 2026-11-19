import Link from "next/link";
import type { RoadmapModule } from "../data/roadmap";
import RoadmapFigure from "./RoadmapFigure";

/**
 * A module as the course page lists it: its hook, its diagram, and a link to
 * the page that breaks the diagram down.
 *
 * The diagram sits inside the card rather than above the list, so the card is
 * the module: what it covers and the picture of it travel together.
 */
export default function RoadmapModuleCard({
  module,
  href,
}: {
  module: RoadmapModule;
  href: string;
}) {
  const count = module.breakdown.reduce(
    (total, group) => total + group.items.length,
    0,
  );

  return (
    <Link
      href={href}
      className="group block p-4 sm:p-5 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md hover:border-[#3e6274]/50 transition-colors"
    >
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:items-center md:gap-6">
        <div>
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
        </div>
        {module.image ? <RoadmapFigure image={module.image} /> : null}
      </div>
    </Link>
  );
}
