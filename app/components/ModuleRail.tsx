"use client";

import { useEffect, useState } from "react";
import type { ReadingRailSection } from "./ReadingPlanLayout";

/** How far down the viewport the "current" section is probed. */
const PROBE_RATIO = 0.35;

/**
 * Two presentations of one index. At very wide widths the rail sits outside
 * the centred article in the page gutter. Between the medium and wide
 * breakpoints the article takes the full measure, so the same index floats at
 * the upper right, above the text. Below medium the page carries an inline
 * chapter row instead.
 */
export default function ModuleRail({
  sections,
}: {
  sections: ReadingRailSection[];
}) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const anchors = sections.flatMap((entry) => entry.ids ?? [entry.id]);
    let tops: number[] = anchors.map(() => Infinity);

    const measure = () => {
      tops = anchors.map((id) => {
        const el = document.getElementById(id);
        return el ? el.getBoundingClientRect().top + window.scrollY : Infinity;
      });
    };

    const locate = () => {
      const probe = window.scrollY + window.innerHeight * PROBE_RATIO;
      let currentAnchor = anchors[0] ?? "";
      for (let i = 0; i < tops.length; i += 1) {
        if (tops[i] <= probe) currentAnchor = anchors[i];
      }
      const section = sections.find(
        (entry) => entry.id === currentAnchor || entry.ids?.includes(currentAnchor),
      );
      setActiveId(section?.id ?? sections[0]?.id ?? "");
    };

    const onResize = () => {
      measure();
      locate();
    };

    measure();
    locate();

    const observer = new ResizeObserver(onResize);
    anchors.forEach((id) => {
      const el = document.getElementById(id);
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

  const railList = (compact: boolean) => (
    <ol className="space-y-0.5">
      {sections.map((entry) => {
        const isActive = entry.id === activeId;
        return (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              onClick={() => setActiveId(entry.id)}
              className={`flex items-center rounded-md transition-colors ${
                compact ? "gap-2 px-1.5 py-1 text-[10px]" : "gap-2.5 px-2 py-1.5 text-[11px]"
              } ${
                isActive
                  ? "bg-[#3e6274]/15 text-slate-100"
                  : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-300"
              }`}
            >
              <span
                className={`shrink-0 font-mono tabular-nums text-[10px] ${
                  compact ? "w-5" : "w-6"
                } ${isActive ? "text-[#8fb0c2]" : "text-slate-400"}`}
              >
                {entry.chip}
              </span>
              <span className="min-w-0 truncate">{entry.label}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );

  return (
    <>
      {/* Wide: an outboard rail beside the centred article. */}
      <div className="pointer-events-none absolute inset-0 hidden min-[1800px]:block">
        <div className="relative mx-auto h-full max-w-6xl">
          <aside className="pointer-events-auto absolute left-full top-0 ml-8 h-full w-56">
            <div className="sticky top-24 space-y-5">
              <div className="flex items-baseline justify-between">
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                  {"//"} On this page
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
              {railList(false)}
            </div>
          </aside>
        </div>
      </div>

      {/* Medium: a slim edge flag expands into the same index on hover, focus
          or click. Clicking pins it open for touch screens. */}
      <div className="group fixed right-0 top-28 z-40 hidden items-start md:flex min-[1800px]:!hidden">
        <div
          style={
            pinned
              ? { opacity: 1, pointerEvents: "auto", transform: "translateX(0)" }
              : undefined
          }
          className="pointer-events-none w-52 translate-x-2 rounded-l-lg border border-r-0 border-slate-800/80 bg-[#0e0d16]/95 p-2.5 opacity-0 shadow-xl backdrop-blur-md transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-x-0 group-focus-within:opacity-100"
        >
          <div className="flex items-baseline justify-between">
            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
              {"//"} On this page
            </p>
            <span className="text-[10px] font-mono tabular-nums text-slate-400">
              {activeIndex + 1} / {sections.length}
            </span>
          </div>
          {active ? (
            <p className="mt-1 truncate text-[10px] font-mono uppercase tracking-wider text-[#5f93a8]">
              {active.meta}
            </p>
          ) : null}
          <div className="mt-2">{railList(true)}</div>
        </div>

        <button
          type="button"
          aria-expanded={pinned}
          aria-label="Show page navigation"
          onClick={() => setPinned((value) => !value)}
          className="flex h-36 w-7 shrink-0 items-center justify-center rounded-l-lg border border-r-0 border-slate-800/80 bg-[#0e0d16]/95 shadow-lg backdrop-blur-md transition-colors hover:border-[#3e6274]/60 focus:outline-none focus-visible:border-[#5f93a8]"
        >
          <span
            className="whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-slate-400 group-hover:text-[#8fb0c2]"
            style={{ writingMode: "vertical-rl" }}
          >
            {`On this page · ${activeIndex + 1}/${sections.length}`}
          </span>
        </button>
      </div>
    </>
  );
}
