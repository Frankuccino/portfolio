"use client";

import Link from "next/link";
import { useHighlight } from "./Highlight";

export type HighlightOption = { id: string; label: string };

/**
 * The spotlight control, hosted on the pages that own the items.
 *
 * The coverage gauge on `/foundation` arrives here with `?highlight=<id>`, and
 * this is the other half of that link: it says what is lit, offers the same
 * choices in page, and clears the spotlight again. Before it existed the only
 * way to change or drop a highlight was the browser back button, and the only
 * way back to the hub was a link at the very top of the page, which the
 * highlight's own scroll had already carried off screen.
 *
 * Two layouts, because the rail is a wide screen aid. `stack` is the side rail
 * on `/books` and `/papers`, where it sits beside the reading column; `row` is
 * the same control under the header below the wide breakpoint, where the rail
 * is hidden and nothing else would reach it. Only one is in the layout at a
 * time, so a screen reader meets one set of buttons.
 *
 * Both layouts use the rail's own row style rather than pills. The first
 * version of the stack was pill buttons with uppercase mono labels, and in a
 * 232px column the long category names wrapped to three lines, so the rows came
 * out at different heights inside a border each: noisy, and the all caps read
 * as shouting. Plain text rows wrap quietly, keep one rhythm, and match the
 * "On this page" list they sit above.
 *
 * `All` is the clear control and reads as pressed when nothing is lit, so the
 * control has a visible resting state rather than an empty one. Clicking the
 * active choice clears as well, which is the cheaper gesture once a spotlight
 * is on.
 *
 * The back link appears only while a highlight is active: with nothing lit
 * there is no spotlight to come back from, and the page's own top link already
 * covers the plain case.
 */
export default function HighlightBar({
  options,
  backHref = "/foundation",
  backLabel = "Foundation",
  layout = "row",
}: {
  options: HighlightOption[];
  backHref?: string;
  backLabel?: string;
  layout?: "row" | "stack";
}) {
  const { id, set } = useHighlight();
  const active = options.find((option) => option.id === id);
  const stack = layout === "stack";

  const row = (option: HighlightOption) => {
    const isActive = id === option.id;
    return (
      <button
        key={option.id}
        type="button"
        onClick={() => set(isActive ? "" : option.id)}
        aria-pressed={isActive}
        title={isActive ? "Clear the spotlight" : `Spotlight ${option.label}`}
        className={`rounded-lg px-2 py-1.5 text-left text-[11px] leading-snug transition-colors ${
          isActive
            ? "bg-[#3e6274]/15 text-slate-100"
            : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-300"
        }`}
      >
        {option.label}
      </button>
    );
  };

  if (stack) {
    return (
      <div>
        {id ? (
          <Link
            href={backHref}
            className="mb-2 block text-[11px] font-mono text-slate-400 hover:text-slate-200 transition-colors"
          >
            ← {backLabel}
          </Link>
        ) : null}

        <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
          {"//"} Spotlight
        </p>

        <div className="mt-1.5 flex flex-col gap-0.5">
          {row({ id: "", label: "All" })}
          {options.map((option) => row(option))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {id ? (
        <Link
          href={backHref}
          className="text-[11px] font-mono text-slate-400 hover:text-slate-200 transition-colors"
        >
          ← {backLabel}
        </Link>
      ) : null}

      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
        {active ? `Spotlighting ${active.label}` : "Spotlight"}
      </span>

      {row({ id: "", label: "All" })}
      {options.map((option) => row(option))}
    </div>
  );
}
