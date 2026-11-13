"use client";

import { useState } from "react";
import { readingTiers, daysToFinish } from "../data/readingPlan";
import BookMapModal from "./BookMapModal";

const pad = (n: number) => String(n).padStart(2, "0");

export default function ReadingPlanExplorer() {
  const [selected, setSelected] = useState<number | null>(null);

  // Flattened so prev/next walk the whole plan, not just the open tier.
  const all = readingTiers.flatMap((tier) => tier.books);
  const index = selected === null ? -1 : all.findIndex((book) => book.order === selected);
  const book = index >= 0 ? all[index] : null;
  const tier = book
    ? readingTiers.find((entry) => entry.books.some((b) => b.order === book.order))
    : null;

  return (
    <>
      {readingTiers.map((entry) => (
        <section key={entry.id} id={entry.id} className="mb-12">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-slate-800/60 pb-3 mb-5">
            <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">
              {entry.label}
            </h2>
            <span className="text-[11px] text-slate-500 tabular-nums">
              {entry.pages.toLocaleString()} pp · ~{entry.hours} h
            </span>
            <span className="text-[11px] text-slate-500">{entry.note}</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {entry.books.map((item) => (
              <button
                key={item.order}
                type="button"
                onClick={() => setSelected(item.order)}
                className="group text-left p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md hover:border-[#3e6274]/50 transition-colors cursor-pointer"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[10px] font-mono tabular-nums text-slate-600">
                    {pad(item.order)}
                  </span>
                  <span className="text-[11px] text-slate-500 tabular-nums">
                    ~{item.hours} h
                  </span>
                </div>

                <h3 className="mt-1.5 text-sm font-semibold leading-snug text-slate-100">
                  {item.title}
                </h3>
                <p className="mt-0.5 text-[11px] text-slate-500">
                  {item.author} · {item.pages.toLocaleString()} pp
                </p>
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
        </section>
      ))}

      <BookMapModal
        book={book}
        tierLabel={tier?.label ?? ""}
        onClose={() => setSelected(null)}
        onPrev={() => setSelected(all[index - 1].order)}
        onNext={() => setSelected(all[index + 1].order)}
        hasPrev={index > 0}
        hasNext={index < all.length - 1}
      />
    </>
  );
}
