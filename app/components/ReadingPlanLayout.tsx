"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { readingStages } from "../data/readingPlan";

const pad = (n: number) => String(n).padStart(2, "0");

/** Stage labels carry a "Stage N: " prefix for the section heading; the rail
 *  wants the shorter form. */
const shortLabel = (label: string) => label.replace(/^Stage \d+: /, "");

/** Where the "current" stage is probed: a line this far down the viewport. */
const PROBE_RATIO = 0.35;

/**
 * The layout owns the scroll-spy and the side rail; the explorer consumes the
 * active stage through this context so the highlight and the rail can never
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
}: {
  header?: ReactNode;
  children: ReactNode;
  /**
   * The rail indexes the book-plan stages, so it only belongs where those
   * sections exist: `/books` and the home summary. On the hub and the papers
   * page it would list eight anchors that are not on the page.
   */
  rail?: boolean;
}) {
  const [activeId, setActiveId] = useState<string>(readingStages[0]?.id ?? "");

  useEffect(() => {
    // Measure the section offsets once, then read only `scrollY` in the scroll
    // handler. Reading `getBoundingClientRect()` for every section on every
    // scroll event is what produced the forced synchronous layouts: each read
    // can flush pending style and layout work before it returns.
    let tops: number[] = readingStages.map(() => Infinity);

    const measure = () => {
      tops = readingStages.map((entry) => {
        const el = document.getElementById(entry.id);
        return el ? el.getBoundingClientRect().top + window.scrollY : Infinity;
      });
    };

    const locate = () => {
      const probe = window.scrollY + window.innerHeight * PROBE_RATIO;
      let current = readingStages[0]?.id ?? "";
      for (let i = 0; i < tops.length; i += 1) {
        if (tops[i] <= probe) current = readingStages[i].id;
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
    readingStages.forEach((entry) => {
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
  }, []);

  const activeIndex = Math.max(
    0,
    readingStages.findIndex((entry) => entry.id === activeId),
  );
  const active = readingStages[activeIndex];

  return (
    <ActiveStageContext.Provider value={activeId}>
      {header}

      {/* One centred block: the reading column on the left, the rail on the
          right. Every prose block and every card shares the column's left
          edge, so nothing steps in or out. Without the rail the column takes
          the wrapper's full measure, the way /blog and /plan do. */}
      {rail ? (
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_232px] lg:gap-10">
          <div className="min-w-0">{children}</div>

          {/* The rail: the block in view is named once, above the list it
              belongs to. The objective, the page and hour cost, and the reading
              note stay in the stage block itself, because repeating them here
              put the same sentences in the page twice. */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-5">
              <div className="flex items-baseline justify-between">
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                  {"// On this page"}
                </p>
                <span className="text-[10px] font-mono tabular-nums text-slate-400">
                  {activeIndex + 1} / {readingStages.length}
                </span>
              </div>
              <p className="mt-1.5 text-[10px] font-mono uppercase tracking-widest text-[#5f93a8]">
                {active.parallel
                  ? `Elective · ${active.books.length} ${active.books.length === 1 ? "book" : "books"}`
                  : `Stage ${activeIndex + 1} of ${readingStages.length} · ${active.books.length} ${active.books.length === 1 ? "book" : "books"}`}
              </p>

              <ol className="space-y-0.5">
                {readingStages.map((entry, i) => {
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
                          {entry.parallel ? "E" : pad(i + 1)}
                        </span>
                        <span className="min-w-0 truncate">
                          {shortLabel(entry.label)}
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
