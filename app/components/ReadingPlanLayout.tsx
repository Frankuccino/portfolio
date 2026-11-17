"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { readingStages } from "../data/readingPlan";

const pad = (n: number) => String(n).padStart(2, "0");

/** Stage labels carry a "Stage N — " prefix for the section heading; the rail
 *  wants the shorter form. */
const shortLabel = (label: string) => label.replace(/^Stage \d+ — /, "");

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
}: {
  header?: ReactNode;
  children: ReactNode;
}) {
  const [activeId, setActiveId] = useState<string>(readingStages[0]?.id ?? "");

  useEffect(() => {
    const locate = () => {
      const probe = window.innerHeight * PROBE_RATIO;
      let current = readingStages[0]?.id ?? "";
      for (const entry of readingStages) {
        const el = document.getElementById(entry.id);
        if (el && el.getBoundingClientRect().top <= probe) current = entry.id;
      }
      setActiveId(current);
    };
    locate();
    window.addEventListener("scroll", locate, { passive: true });
    window.addEventListener("resize", locate);
    return () => {
      window.removeEventListener("scroll", locate);
      window.removeEventListener("resize", locate);
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
          edge, so nothing steps in or out. */}
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_232px] lg:gap-10">
        <div className="min-w-0">{children}</div>

        {/* The side note: it follows the reader down the page and always names
            the block currently on screen. */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-5">
            <div className="flex items-baseline justify-between">
              <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                {"// On this page"}
              </p>
              <span className="text-[10px] font-mono tabular-nums text-slate-600">
                {activeIndex + 1} / {readingStages.length}
              </span>
            </div>

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
                          isActive ? "text-[#8fb0c2]" : "text-slate-600"
                        }`}
                      >
                        {entry.parallel ? "E" : pad(i + 1)}
                      </span>
                      <span className="min-w-0 truncate">{shortLabel(entry.label)}</span>
                    </a>
                  </li>
                );
              })}
            </ol>

            <div className="border-t border-slate-800/60 pt-4">
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#5f93a8]">
                {active.parallel
                  ? `Elective · ${active.books.length} book`
                  : `Stage ${activeIndex + 1} · ${active.books.length} books`}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-slate-300">
                {active.objective}
              </p>
              <p className="mt-2 text-[11px] tabular-nums text-slate-400">
                {active.pages.toLocaleString()} pp · ~{active.hours} h
              </p>
              <p className="mt-1 text-[11px] leading-snug text-slate-400">{active.note}</p>
            </div>
          </div>
        </aside>
      </div>
    </ActiveStageContext.Provider>
  );
}
