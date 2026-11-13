import Link from "next/link";
import {
  readingBookCount,
  readingCoreHours,
  readingTotalHours,
  readingTiers,
} from "../data/readingPlan";

export default function ReadingPlan() {
  return (
    <div className="mt-14 border-t border-slate-800/60 pt-8">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500">
          {"// Reading Order"}
        </h3>
        <span className="text-[11px] text-slate-500 tabular-nums">
          {readingBookCount} books · ~{readingTotalHours} h · core ~{readingCoreHours} h
        </span>
      </div>

      <p className="mt-2 max-w-2xl text-sm text-slate-400 leading-relaxed">
        Priority order for the AI engineering stack. Tier 1 and Tier 2 are read cover to
        cover; Tier 3 is a reference shelf, opened when a problem demands it.
      </p>

      <Link
        href="/reading"
        className="inline-flex items-center gap-2 text-[11px] font-medium text-slate-400 hover:text-white transition-colors"
      >
        <span>Chapter focus, hands-on work, and the stress-test protocol</span>
        <span className="text-slate-500">↗</span>
      </Link>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {readingTiers.map((tier) => (
          <div
            key={tier.id}
            className="rounded-xl border border-slate-800/60 bg-slate-900/40 backdrop-blur-md p-4"
          >
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
              {tier.label}
            </h4>
            <p className="mt-1 text-[11px] leading-snug text-slate-500">
              {tier.pages.toLocaleString()} pp · ~{tier.hours} h · {tier.note}
            </p>

            <ul className="mt-3 space-y-2.5">
              {tier.books.map((book) => (
                <li key={book.order} className="flex items-baseline gap-2.5">
                  <span className="w-4 shrink-0 text-[10px] font-mono tabular-nums text-slate-600">
                    {String(book.order).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] leading-snug text-slate-200">{book.title}</p>
                    <p className="text-[10px] text-slate-500">{book.author}</p>
                  </div>
                  <span className="shrink-0 text-[10px] tabular-nums text-slate-500">
                    ~{book.hours} h
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
