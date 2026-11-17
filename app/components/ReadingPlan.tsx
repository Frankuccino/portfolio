"use client";

import Link from "next/link";
import {
  readingBookCount,
  readingCoreHours,
  readingTotalHours,
  readingStages,
} from "../data/readingPlan";
import ReadingPlanLayout, { useActiveStage } from "./ReadingPlanLayout";

/**
 * The bands must be a child of the layout, not its sibling: the active stage
 * comes from a context the layout provides, and a hook called in this component
 * would read the default value instead of the scroll-spy's current one.
 */
function ReadingOrderHeader() {
  return (
    <div className="mt-14 border-t border-slate-800/60 pt-8 mb-5">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400">
          {"// Reading Order"}
        </h3>
        <span className="text-[11px] text-slate-400 tabular-nums">
          {readingBookCount} books · ~{readingTotalHours} h · core ~{readingCoreHours} h
        </span>
      </div>

      <p className="mt-2 max-w-2xl text-sm text-slate-400 leading-relaxed">
        Priority order for the AI engineering stack — six stages and a domain
        elective. Stages 1, 2, 3, 4 and 6 are read cover to cover; Stage 5 is a
        reference shelf, and the elective is opened when a fraud or risk problem
        appears.
      </p>

      <Link
        href="/reading"
        className="inline-flex items-center gap-2 text-[11px] font-medium text-slate-400 hover:text-white transition-colors"
      >
        <span>Chapter focus, hands-on work, and the stress-test protocol</span>
        <span className="text-slate-400">↗</span>
      </Link>
    </div>
  );
}

/** The bands are a separate component so they render inside the layout's
 *  provider and can read the active stage from context. */
function ReadingPlanBands() {
  const activeId = useActiveStage();

  return (
    <div className="space-y-3">
      {/* One full-width band per stage, books in a responsive grid. Stages
          hold between one and ten books; packing those into equal columns
          either strands a short card beside empty space or squeezes a long one
          into a skinny tower. A band sizes to its own content, so nothing is
          stretched and nothing is cramped. */}
        {readingStages.map((stage) => {
          const isActive = stage.id === activeId;
          return (
            <section
              key={stage.id}
              id={stage.id}
              className={`scroll-mt-28 rounded-xl border p-4 backdrop-blur-md transition-colors ${
                isActive
                  ? "border-[#3e6274]/60 bg-[#3e6274]/[0.07]"
                  : "border-slate-800/60 bg-slate-900/40"
              }`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <h4 className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
                  {stage.label}
                </h4>
                <span className="text-[11px] tabular-nums text-slate-400">
                  {stage.pages.toLocaleString()} pp · ~{stage.hours} h · {stage.note}
                </span>
              </div>
              <p className="mt-1 text-[11px] leading-snug text-slate-400">
                {stage.objective}
              </p>

              <ul className="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {stage.books.map((book) => (
                  <li key={book.order} className="flex items-baseline gap-2.5">
                    <span className="w-4 shrink-0 text-[10px] font-mono tabular-nums text-slate-600">
                      {String(book.order).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] leading-snug text-slate-200">{book.title}</p>
                      <p className="text-[10px] text-slate-400">{book.author}</p>
                    </div>
                    <span className="shrink-0 text-[10px] tabular-nums text-slate-400">
                      ~{book.hours} h
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
    </div>
  );
}

export default function ReadingPlan() {
  return (
    <ReadingPlanLayout header={<ReadingOrderHeader />}>
      <ReadingPlanBands />
    </ReadingPlanLayout>
  );
}
