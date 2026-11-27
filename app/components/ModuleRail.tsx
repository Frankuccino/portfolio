"use client";

import { useEffect, useRef, useState } from "react";
import type { ReadingRailSection } from "./ReadingPlanLayout";

const PROBE_RATIO = 0.35;

function isTypingTarget(target: EventTarget | null): boolean {
  const element = target as HTMLElement | null;
  if (!element || typeof element.tagName !== "string") return false;
  const tag = element.tagName.toLowerCase();
  return tag === "input" || tag === "textarea" || element.isContentEditable;
}

/**
 * The module table of contents. It renders the same nested index at three
 * breakpoints, keeps a live scroll position, and supports quick keyword
 * filtering. The article keeps its own centred measure; this rail sits in the
 * gutter outside it.
 */
export default function ModuleRail({
  sections,
}: {
  sections: ReadingRailSection[];
}) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const [activeAnchor, setActiveAnchor] = useState(sections[0]?.id ?? "");
  const [pinned, setPinned] = useState(false);
  const [progress, setProgress] = useState(0);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setActiveId(sections[0]?.id ?? "");
    setActiveAnchor(sections[0]?.id ?? "");
    setProgress(0);
  }, [sections]);

  useEffect(() => {
    const anchors = sections.flatMap((entry) => [
      entry.id,
      ...(entry.ids ?? []),
      ...(entry.children ?? []).map((child) => child.id),
    ]);
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
      setActiveAnchor(currentAnchor);
      const section = sections.find(
        (entry) =>
          entry.id === currentAnchor ||
          entry.ids?.includes(currentAnchor) ||
          entry.children?.some((child) => child.id === currentAnchor),
      );
      setActiveId(section?.id ?? sections[0]?.id ?? "");

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
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

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const quickFilter =
        (!isTypingTarget(event.target) && event.key === "/") ||
        ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k");
      if (!quickFilter) return;
      event.preventDefault();
      inputRef.current?.focus();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const normalizedQuery = query.trim().toLowerCase();
  const filtered: ReadingRailSection[] = [];
  if (normalizedQuery) {
    for (const entry of sections) {
      const childMatches = (entry.children ?? []).filter((child) =>
        child.label.toLowerCase().includes(normalizedQuery),
      );
      const matches =
        entry.label.toLowerCase().includes(normalizedQuery) ||
        entry.keywords?.some((word) =>
          word.toLowerCase().includes(normalizedQuery),
        );
      if (!matches && childMatches.length === 0) continue;
      filtered.push({
        ...entry,
        children: childMatches.length ? childMatches : entry.children,
      });
    }
  } else {
    filtered.push(...sections);
  }

  const activeIndex = Math.max(
    0,
    sections.findIndex((entry) => entry.id === activeId),
  );
  const active = sections[activeIndex];

  const railList = (compact: boolean) => (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
          {"//"} On this page
        </p>
        <span className="text-[10px] font-mono tabular-nums text-slate-400">
          {activeIndex + 1} / {sections.length}
        </span>
      </div>

      <div className="mt-2 h-0.5 w-full overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full bg-[#5f93a8] transition-[width] duration-150"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>

      <div className="relative mt-2">
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Filter sections  /"
          aria-label="Filter sections"
          className="w-full rounded-md border border-slate-800 bg-slate-950/70 px-2 py-1 text-[10px] text-slate-200 placeholder:text-slate-600 focus:border-[#3e6274] focus:outline-none"
        />
      </div>

      {active ? (
        <p className="mt-2 truncate text-[10px] font-mono uppercase tracking-wider text-[#5f93a8]">
          {query
            ? `${filtered.length} matched`
            : active.keywords?.length
              ? active.keywords.join(" · ")
              : active.meta}
        </p>
      ) : null}

      <ol className="mt-2 space-y-0.5">
        {filtered.map((entry) => {
          const isActive = entry.id === activeId;
          const showChildren = normalizedQuery ? true : isActive;
          return (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                onClick={() => {
                  setActiveId(entry.id);
                  setActiveAnchor(entry.id);
                  setQuery("");
                }}
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
              {showChildren && entry.children?.length ? (
                <ol className="ml-6 mt-0.5 space-y-0.5 border-l border-slate-800/70 pl-2">
                  {entry.children.map((child) => (
                    <li key={child.id}>
                      <a
                        href={`#${child.id}`}
                        onClick={() => {
                          setActiveId(entry.id);
                          setActiveAnchor(child.id);
                          setQuery("");
                        }}
                        className={`block truncate rounded px-1.5 py-0.5 text-[10px] transition-colors ${
                          activeAnchor === child.id
                            ? "text-[#8fb0c2]"
                            : "text-slate-500 hover:text-slate-300"
                        }`}
                      >
                        {child.label}
                      </a>
                    </li>
                  ))}
                </ol>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );

  return (
    <>
      <div className="pointer-events-none absolute inset-0 hidden min-[1800px]:block">
        <div className="relative mx-auto h-full max-w-6xl">
          <aside className="pointer-events-auto absolute left-full top-0 ml-8 h-full w-56">
            <div className="sticky top-24 space-y-3">{railList(false)}</div>
          </aside>
        </div>
      </div>

      <div className="group fixed right-0 top-28 z-40 hidden items-start md:flex min-[1800px]:!hidden">
        <div
          style={
            pinned
              ? { opacity: 1, pointerEvents: "auto", transform: "translateX(0)" }
              : undefined
          }
          className="pointer-events-none max-h-[70vh] w-56 translate-x-2 overflow-y-auto rounded-l-lg border border-r-0 border-slate-800/80 bg-[#0e0d16]/95 p-2.5 opacity-0 shadow-xl backdrop-blur-md transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-x-0 group-focus-within:opacity-100"
        >
          {railList(true)}
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
