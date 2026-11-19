"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { readingStages, daysToFinish, type ReadingBook } from "../data/readingPlan";
import { coverUrl, googleBooksCoverUrl } from "../lib/covers";
import BookMapModal from "./BookMapModal";
import BookCoverPreview, { type CoverPreviewState } from "./BookCoverPreview";
import { pad, shortLabel, useActiveStage } from "./ReadingPlanLayout";

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
  "very-high": "text-[#5f93a8] border-[#3e6274]/50 bg-[#3e6274]/15",
  high: "text-slate-400 border-slate-700/70 bg-slate-800/30",
  medium: "text-slate-400 border-slate-800/60 bg-transparent",
};

/**
 * Mobile-only cover thumb.
 *
 * The hover preview is a pointer affordance, so on a phone the card carries its
 * own art instead of hiding the cover behind a gesture the reader does not
 * have. Hidden from `sm` up, where the preview works.
 */
function BookCoverThumb({ book }: { book: ReadingBook }) {
  // Computed once: a book's cover sources do not change over its lifetime.
  // `M` art, not `S`: the thumb is ~80 CSS px wide but 160 device px on a
  // retina phone, so the small size would render soft.
  const [src] = useState<string | null>(() =>
    book.coverId
      ? coverUrl(book.coverId, "M")
      : book.googleBooksId
        ? googleBooksCoverUrl(book.googleBooksId)
        : null,
  );
  const [failed, setFailed] = useState(false);

  return (
    <div
      aria-hidden="true"
      className="sm:hidden mr-3 w-28 shrink-0 self-stretch rounded-md overflow-hidden border border-[#3e6274]/30 bg-[#3e6274]/15"
    >
      {src && !failed ? (
        // Third-party hotlink, so a plain <img> rather than next/image's proxy.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
          className="block h-full w-full object-cover"
        />
      ) : null}
    </div>
  );
}

export default function ReadingPlanExplorer() {
  const [selected, setSelected] = useState<number | null>(null);
  const [preview, setPreview] = useState<CoverPreviewState | null>(null);
  // The layout owns the scroll-spy; consuming it here keeps the rail and this
  // highlight from ever disagreeing about which stage is on screen.
  const activeId = useActiveStage();
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Warm the cover cache after mount so the first hover is not a blank panel.
  useEffect(() => {
    const books = readingStages.flatMap((stage) => stage.books);
    const timer = setTimeout(() => {
      books.forEach((book) => {
        const url = book.coverId
          ? coverUrl(book.coverId)
          : book.googleBooksId
            ? googleBooksCoverUrl(book.googleBooksId)
            : null;
        if (!url) return;
        const img = new Image();
        img.src = url;
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

  /**
   * Closing has to be referentially stable: the preview panel re-measures its
   * anchor on every scroll frame and subscribes to `onClose`, so an inline
   * function would tear down and rebuild that subscription on each render.
   */
  const closeNow = useCallback(() => {
    if (openTimer.current) {
      clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setPreview(null);
  }, []);

  const handleEnter = (book: ReadingBook, element: HTMLButtonElement) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    if (openTimer.current) clearTimeout(openTimer.current);
    // The anchor element is kept, not its rect: the panel re-measures it as the
    // page scrolls, so the cover tracks its card instead of closing on scroll.
    openTimer.current = setTimeout(() => {
      setPreview({ book, anchor: element });
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
      {/* Jump nav for the narrow viewport, where the rail has no room. The
          right edge is masked so the row announces that it scrolls — without
          the fade, a 1160px row in a 366px window looks like it is cut off
          rather than scrollable. */}
      <div className="lg:hidden mb-10 -mx-1 overflow-x-auto [mask-image:linear-gradient(to_right,#000_0,#000_calc(100%-2.5rem),transparent_100%)]">
        <ol className="flex gap-1.5 px-1 py-1 pr-10">
          {readingStages.map((entry, i) => {
            const isActive = entry.id === activeId;
            return (
              <li key={entry.id} className="shrink-0">
                <a
                  href={`#${entry.id}`}
                  className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] transition-colors ${
                    isActive
                      ? "border-[#3e6274]/60 bg-[#3e6274]/15 text-slate-100"
                      : "border-slate-800/70 text-slate-400 hover:text-slate-300"
                  }`}
                >
                  <span className="font-mono tabular-nums text-[10px]">
                    {entry.parallel ? "E" : pad(i + 1)}
                  </span>
                  {shortLabel(entry.label)}
                </a>
              </li>
            );
          })}
        </ol>
      </div>

      {readingStages.map((entry, stageIndex) => {
        const isActive = entry.id === activeId;
        return (
          <section key={entry.id} id={entry.id} className="mb-16 scroll-mt-28">
            {/* The index chip is what makes one stage visually distinct from the
                next; the rule beneath is the shared baseline. The active stage is
                filled rather than outlined and its header carries a wash. The
                padding is inset only — a negative margin here would push the
                header past the column's edge, which is what made the page read
                as jagged. */}
            <div
              className={`flex flex-wrap items-center gap-x-3 gap-y-1 rounded-md border-b px-2 pb-2.5 mb-4 transition-colors ${
                isActive
                  ? "border-[#3e6274]/60 bg-[#3e6274]/10"
                  : "border-[#3e6274]/30"
              }`}
            >
              <span
                className={`text-[10px] font-mono tabular-nums px-1.5 py-0.5 rounded border transition-colors ${
                  isActive
                    ? "border-[#3e6274] bg-[#3e6274] text-white"
                    : "border-[#3e6274]/40 bg-[#3e6274]/15 text-slate-200"
                }`}
              >
                {/* A parallel elective is not part of the numbered sequence. */}
                {entry.parallel ? "E" : pad(stageIndex + 1)}
              </span>
              <h2
                className={`text-sm font-semibold tracking-wide transition-colors ${
                  isActive ? "text-white" : "text-slate-100"
                }`}
              >
                {entry.label}
              </h2>
              <span className="text-[11px] text-slate-400 tabular-nums">
                {entry.pages.toLocaleString()} pp · ~{entry.hours} h
              </span>
              <span className="text-[11px] text-slate-400">{entry.note}</span>
            </div>
            <p className="mb-6 max-w-3xl text-xs leading-relaxed text-slate-400">
              {entry.objective}
            </p>

            {/* The accent rule binds every card in the grid to its stage, and
                brightens while that stage is the one on screen. */}
            <div
              className={`border-l-2 pl-3 sm:pl-4 transition-colors ${
                isActive ? "border-[#3e6274]" : "border-[#3e6274]/40"
              }`}
            >
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {entry.books.map((item) => (
                  <button
                    key={item.order}
                    type="button"
                    onClick={() => setSelected(item.order)}
                    onMouseEnter={(event) => handleEnter(item, event.currentTarget)}
                    onMouseLeave={handleLeave}
                    className="group text-left p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md hover:border-[#3e6274]/50 transition-colors cursor-pointer flex flex-row items-start"
                  >
                    <BookCoverThumb book={item} />
                    <div className="min-w-0 flex-1 flex flex-col">
                      <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-mono tabular-nums text-slate-600">
                            {pad(item.order)}
                          </span>
                          <div className="flex items-center gap-1.5">
                            {item.kind === "report" && (
                              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 border border-slate-800/70 rounded px-1.5 py-0.5">
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
                            <span className="text-[11px] text-slate-400 tabular-nums">
                              ~{item.hours} h
                            </span>
                          </div>
                        </div>

                        {/* Fixed title height so every body starts at the same Y. */}
                        <h3 className="mt-1.5 min-h-[2.5rem] text-sm font-semibold leading-snug text-slate-100">
                          {item.title}
                        </h3>
                        <p className="mt-0.5 text-[11px] text-slate-400">
                          {item.author} · {item.pages.toLocaleString()} pp
                        </p>
                      {item.track && (
                        <p className="mt-1 text-[10px] font-mono uppercase tracking-widest text-[#5f93a8]">
                          {item.track}
                        </p>
                      )}

                      <p className="mt-2 text-xs leading-relaxed text-slate-400">
                        {item.tagline}
                      </p>
                      {/* The footer is pushed to the card's bottom edge so the pace
                          line and the action align across a row even when the
                          taglines wrap to different lengths. */}
                      <div className="mt-auto pt-2">
                        <p className="text-[11px] tabular-nums text-slate-400">
                          {item.dailyCommitment} min/day · {daysToFinish(item)} days
                        </p>
                        <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-400 group-hover:text-white transition-colors">
                          View map
                          <span className="text-slate-400 group-hover:text-[#5f93a8] transition-colors">
                            →
                          </span>
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        );
      })}

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
