"use client";

import { useEffect, useRef, useState } from "react";
import { readingStages, daysToFinish, type ReadingBook } from "../data/readingPlan";
import { coverUrl } from "../lib/covers";
import BookMapModal from "./BookMapModal";
import BookCoverPreview, { type CoverPreviewState } from "./BookCoverPreview";

const pad = (n: number) => String(n).padStart(2, "0");

/** How long the pointer must rest on a card before the cover opens. */
const OPEN_DELAY_MS = 90;
/** Grace period before the cover closes, so crossing a grid gap does not flicker. */
const CLOSE_GRACE_MS = 160;

/**
 * Priority is the one field that should be legible at a glance, so it carries
 * the accent; lower priorities recede. Books without a priority stay unmarked
 * rather than being guessed at.
 */
const priorityStyles: Record<string, string> = {
  "very-high": "text-[#3e6274] border-[#3e6274]/50 bg-[#3e6274]/15",
  high: "text-slate-400 border-slate-700/70 bg-slate-800/30",
  medium: "text-slate-500 border-slate-800/60 bg-transparent",
};

export default function ReadingPlanExplorer() {
  const [selected, setSelected] = useState<number | null>(null);
  const [preview, setPreview] = useState<CoverPreviewState | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Warm the cover cache after mount so the first hover is not a blank panel.
  useEffect(() => {
    const ids = readingStages
      .flatMap((stage) => stage.books)
      .map((book) => book.coverId)
      .filter((id): id is number => Boolean(id));
    const timer = setTimeout(() => {
      ids.forEach((id) => {
        const img = new Image();
        img.src = coverUrl(id);
      });
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(
    () => () => {
      if (openTimer.current) clearTimeout(openTimer.current);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  const closeNow = () => {
    if (openTimer.current) {
      clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setPreview(null);
  };

  const handleEnter = (book: ReadingBook, element: HTMLButtonElement) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    if (openTimer.current) clearTimeout(openTimer.current);
    // The rect is read when the timer fires, not on entry: the page may still be
    // smooth-scrolling, and a rect captured now would place the panel wrongly.
    openTimer.current = setTimeout(() => {
      setPreview({ book, rect: element.getBoundingClientRect() });
    }, OPEN_DELAY_MS);
  };

  const handleLeave = () => {
    if (openTimer.current) {
      clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setPreview(null), CLOSE_GRACE_MS);
  };

  // Flattened so prev/next walk the whole plan, not just the open stage.
  const all = readingStages.flatMap((stage) => stage.books);
  const index = selected === null ? -1 : all.findIndex((book) => book.order === selected);
  const book = index >= 0 ? all[index] : null;
  const stage = book
    ? readingStages.find((entry) => entry.books.some((b) => b.order === book.order))
    : null;

  return (
    <>
      {readingStages.map((entry, stageIndex) => (
        <section key={entry.id} id={entry.id} className="mb-12">
          {/* The index chip is what makes one stage visually distinct from the
              next; the rule beneath is the shared baseline. */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-[#3e6274]/30 pb-2.5 mb-3">
            <span className="text-[10px] font-mono tabular-nums px-1.5 py-0.5 rounded border border-[#3e6274]/40 bg-[#3e6274]/15 text-slate-200">
              {pad(stageIndex + 1)}
            </span>
            <h2 className="text-sm font-semibold tracking-wide text-slate-100">
              {entry.label}
            </h2>
            <span className="text-[11px] text-slate-500 tabular-nums">
              {entry.pages.toLocaleString()} pp · ~{entry.hours} h
            </span>
            <span className="text-[11px] text-slate-500">{entry.note}</span>
          </div>
          <p className="mb-5 max-w-3xl text-xs leading-relaxed text-slate-400">
            {entry.objective}
          </p>

          {/* The accent rule binds every card in the grid to its stage. */}
          <div className="border-l-2 border-[#3e6274]/40 pl-3 sm:pl-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {entry.books.map((item) => (
              <button
                key={item.order}
                type="button"
                onClick={() => setSelected(item.order)}
                onMouseEnter={(event) => handleEnter(item, event.currentTarget)}
                onMouseLeave={handleLeave}
                className="group text-left p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md hover:border-[#3e6274]/50 transition-colors cursor-pointer flex flex-col items-start"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono tabular-nums text-slate-600">
                    {pad(item.order)}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {item.kind === "report" && (
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 border border-slate-800/70 rounded px-1.5 py-0.5">
                        Report
                      </span>
                    )}
                    {item.priority && (
                      <span
                        className={`text-[10px] font-mono uppercase tracking-widest border rounded px-1.5 py-0.5 ${priorityStyles[item.priority] ?? priorityStyles.medium}`}
                      >
                        {item.priority}
                      </span>
                    )}
                    <span className="text-[11px] text-slate-500 tabular-nums">
                      ~{item.hours} h
                    </span>
                  </div>
                </div>

                {/* Fixed title height so every body starts at the same Y. */}
                <h3 className="mt-1.5 min-h-[2.5rem] text-sm font-semibold leading-snug text-slate-100">
                  {item.title}
                </h3>
                <p className="mt-0.5 text-[11px] text-slate-500">
                  {item.author} · {item.pages.toLocaleString()} pp
                </p>
                {item.track && (
                  <p className="mt-1 text-[10px] font-mono uppercase tracking-widest text-[#3e6274]">
                    {item.track}
                  </p>
                )}
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  {item.tagline}
                </p>
                <p className="mt-2 text-[11px] tabular-nums text-slate-500">
                  {item.dailyCommitment} min/day · {daysToFinish(item)} days
                </p>

                <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-400 group-hover:text-white transition-colors">
                  View map
                  <span className="text-slate-500 group-hover:text-[#3e6274] transition-colors">
                    →
                  </span>
                </span>
              </button>
            ))}
          </div>
          </div>
        </section>
      ))}

      <BookCoverPreview preview={preview} onClose={closeNow} />

      <BookMapModal
        book={book}
        stageLabel={stage?.label ?? ""}
        total={all.length}
        onClose={() => setSelected(null)}
        onPrev={() => setSelected(all[index - 1].order)}
        onNext={() => setSelected(all[index + 1].order)}
        hasPrev={index > 0}
        hasNext={index < all.length - 1}
      />
    </>
  );
}
