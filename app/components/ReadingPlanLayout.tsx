"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { readingStages } from "../data/readingPlan";
import HighlightBar, { type HighlightOption } from "./HighlightBar";

const pad = (n: number) => String(n).padStart(2, "0");

/** Stage labels carry a "Stage N: " prefix for the section heading; the rail
 *  wants the shorter form. */
const shortLabel = (label: string) => label.replace(/^Stage \d+: /, "");

/** Where the "current" stage is probed: a line this far down the viewport. */
const PROBE_RATIO = 0.35;

/**
 * One row of the side rail. Pages whose sections are not the book stages pass
 * their own list, so the rail describes the page it is on rather than a fixed
 * set of anchors.
 */
export type ReadingRailSection = {
  id: string;
  label: string;
  /** The chip at the left of the row: 01, 02, and so on, or E. */
  chip: string;
  /** The line under "// On this page", naming where the reader is. */
  meta: string;
  /** Additional anchors that resolve to this row, used when chapters are grouped into sub-modules. */
  ids?: string[];
};

const plural = (count: number, noun: string) =>
  `${count} ${count === 1 ? noun : `${noun}s`}`;

/** The book plan's own rail, derived so it cannot drift from the stages. */
const bookRail: ReadingRailSection[] = readingStages.map((entry, index) => ({
  id: entry.id,
  label: shortLabel(entry.label),
  chip: entry.parallel ? "E" : pad(index + 1),
  meta: entry.parallel
    ? `Elective · ${plural(entry.books.length, "book")}`
    : `Stage ${index + 1} of ${readingStages.length} · ${plural(entry.books.length, "book")}`,
}));

/**
 * The layout owns the scroll-spy and the side rail; the explorer consumes the
 * active section through this context so the highlight and the rail can never
 * disagree about which block is on screen.
 */
const ActiveStageContext = createContext<string>(readingStages[0]?.id ?? "");

export const useActiveStage = () => useContext(ActiveStageContext);

export { pad, shortLabel };

/**
 * `header` is the block's own heading, rendered full width above the grid. The
 * rail must start level with the first band, not beside the heading — a rail
 * that begins at the heading spills down over the bands it is meant to index.
 */
export default function ReadingPlanLayout({
  header,
  children,
  rail = true,
  spotlight,
}: {
  header?: ReactNode;
  children: ReactNode;
  /**
   * The rail indexes the page's own sections. `true` uses the book stages, which
   * is right where those sections exist (`/books` and the home summary); a page
   * with different sections passes its own list; `false` drops the rail, which
   * lets the column take the wrapper's full measure the way `/blog` and `/plan`
   * do.
   */
  rail?: boolean | ReadingRailSection[];
  /**
   * The spotlight choices, rendered as a stack at the top of the rail. Its ids
   * are the highlight ids, which are not always the section ids: on `/papers`
   * the rail lists reading stages while the spotlight selects categories. Pages
   * without a spotlight pass nothing and the rail is unchanged.
   */
  spotlight?: HighlightOption[];
}) {
  const sections: ReadingRailSection[] = useMemo(
    () => (Array.isArray(rail) ? rail : rail ? bookRail : []),
    [rail],
  );
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    // Measure the section offsets once, then read only `scrollY` in the scroll
    // handler. Reading `getBoundingClientRect()` for every section on every
    // scroll event is what produced the forced synchronous layouts: each read
    // can flush pending style and layout work before it returns.
    let tops: number[] = sections.map(() => Infinity);

    const measure = () => {
      tops = sections.map((entry) => {
        const el = document.getElementById(entry.id);
        return el ? el.getBoundingClientRect().top + window.scrollY : Infinity;
      });
    };

    const locate = () => {
      const probe = window.scrollY + window.innerHeight * PROBE_RATIO;
      let current = sections[0]?.id ?? "";
      for (let i = 0; i < tops.length; i += 1) {
        if (tops[i] <= probe) current = sections[i].id;
      }
      setActiveId(current);
    };

    const onResize = () => {
      measure();
      locate();
    };

    measure();
    locate();

    // Section heights move when the covers finish loading, so re-measure when a
    // section resizes rather than trusting the mount-time offsets.
    const observer = new ResizeObserver(onResize);
    sections.forEach((entry) => {
      const el = document.getElementById(entry.id);
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", locate, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", locate);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, [sections]);

  const activeIndex = Math.max(
    0,
    sections.findIndex((entry) => entry.id === activeId),
  );
  const active = sections[activeIndex];

  return (
    <ActiveStageContext.Provider value={activeId}>
      {header}

      {/* One centred block: the reading column on the left, the rail on the
          right. Every prose block and every card shares the column's left
          edge, so nothing steps in or out. Without the rail the column takes
          the wrapper's full measure, the way /blog and /plan do. */}
      {sections.length > 0 ? (
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_232px] lg:gap-10">
          <div className="min-w-0">{children}</div>

          {/* The rail: the block in view is named once, above the list it
              belongs to. The objective, the page and hour cost, and the reading
              note stay in the stage block itself, because repeating them here
              put the same sentences in the page twice. */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-5">
              {/* The spotlight sits above the table of contents because it is
                  the control the reader arrived to use: the gauge links in with
                  `?highlight=<id>`, and this is where the choices and the way
                  back live on the wide measure. */}
              {spotlight && spotlight.length > 0 ? (
                <div className="pb-4 border-b border-slate-800/60">
                  <HighlightBar options={spotlight} layout="stack" />
                </div>
              ) : null}

              <div className="flex items-baseline justify-between">
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                  {"// On this page"}
                </p>
                <span className="text-[10px] font-mono tabular-nums text-slate-400">
                  {activeIndex + 1} / {sections.length}
                </span>
              </div>
              {active ? (
                <p className="mt-1.5 text-[10px] font-mono uppercase tracking-widest text-[#5f93a8]">
                  {active.meta}
                </p>
              ) : null}

              <ol className="space-y-0.5">
                {sections.map((entry) => {
                  const isActive = entry.id === activeId;
                  return (
                    <li key={entry.id}>
                      <a
                        href={`#${entry.id}`}
                        onClick={() => setActiveId(entry.id)}
                        className={`flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-[11px] transition-colors ${
                          isActive
                            ? "bg-[#3e6274]/15 text-slate-100"
                            : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-300"
                        }`}
                      >
                        <span
                          className={`w-6 shrink-0 font-mono tabular-nums text-[10px] ${
                            isActive ? "text-[#8fb0c2]" : "text-slate-400"
                          }`}
                        >
                          {entry.chip}
                        </span>
                        <span className="min-w-0 truncate">
                          {entry.label}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </div>
          </aside>
        </div>
      ) : (
        children
      )}
    </ActiveStageContext.Provider>
  );
}
