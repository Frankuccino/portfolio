import Link from "next/link";
import {
  bookCoverage,
  foundationItemCount,
  foundationTierSplit,
  paperCoverage,
  relevanceTiers,
  writingComposition,
  type FoundationBar,
  type RelevanceTier,
} from "../data/foundationCoverage";

/** Tiers read loudest to quietest, so the label carries the judgement. */
const tierChip: Record<RelevanceTier, string> = {
  core: "text-[#8fc3d6]",
  supporting: "text-slate-400",
  adjacent: "text-slate-500",
};

const tierName = (id: RelevanceTier) =>
  relevanceTiers.find((tier) => tier.id === id)?.label ?? id;

function CoverageRow({ row }: { row: FoundationBar }) {
  return (
    <Link href={row.href} className="group block">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
        <p className="text-xs text-slate-300 group-hover:text-slate-100 transition-colors">
          {row.label}
        </p>
        <p className="text-[11px] font-mono text-slate-400 tabular-nums">
          {row.percent}%{" "}
          <span className="text-slate-600">
            · {row.count} {row.count === 1 ? "item" : "items"}
          </span>
        </p>
      </div>
      <div className="mt-1 flex items-center gap-3">
        <div className="h-1.5 flex-1 rounded-full bg-slate-800/80">
          <div
            className="h-1.5 rounded-full bg-[#5f93a8]"
            style={{ width: `${row.share}%` }}
          />
        </div>
        <span
          className={`shrink-0 text-[10px] font-mono uppercase tracking-widest ${tierChip[row.tier]}`}
        >
          {tierName(row.tier)}
        </span>
      </div>
    </Link>
  );
}

/**
 * The foundation's counterpart to the plan page's Coverage section, on a
 * different measure.
 *
 * Hours were the first attempt here and were the wrong question: they say how
 * long something takes, not whether it matters. So each part carries a relevance
 * tier to AI engineering, declared from its own objective, and the percentage is
 * the share of its track's items. Every row navigates to the page that holds
 * those items and spotlights them there.
 */
export default function FoundationCoverage() {
  return (
    <section className="mb-12 space-y-3">
      <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">
        {"//"} Foundation coverage
      </h2>
      <p className="max-w-2xl text-sm md:text-base text-slate-400 leading-relaxed">
        How directly each part of the foundation serves AI engineering, and how
        much of it there is. The tier is read off each part&apos;s own objective;
        the percentage is the share of that track&apos;s items.
      </p>

      <div className="pt-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
          <p className="text-sm font-semibold text-slate-100">
            Relevance across {foundationItemCount} items
          </p>
          <p className="text-[11px] font-mono text-slate-400 tabular-nums">100%</p>
        </div>
        <div
          aria-hidden="true"
          className="mt-2 flex h-2.5 overflow-hidden rounded-full bg-slate-800/80"
        >
          {foundationTierSplit.map((tier, index) => (
            <div
              key={tier.id}
              className={["bg-[#5f93a8]", "bg-slate-500", "bg-slate-700"][index]}
              style={{ width: `${tier.share}%` }}
            />
          ))}
        </div>
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          {foundationTierSplit.map((tier, index) => (
            <li
              key={tier.id}
              className="flex items-center gap-1.5 text-[11px] text-slate-400"
            >
              <span
                className={`h-2 w-2 rounded-full ${["bg-[#5f93a8]", "bg-slate-500", "bg-slate-700"][index]}`}
              />
              {tier.label} {tier.percent}%
              <span className="font-mono text-slate-600">· {tier.count}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4 pt-1">
        <div>
          <p className="text-sm font-semibold text-slate-100">Books</p>
          <p className="mt-1 text-xs text-slate-400">
            Share of the reading by stage. Each row opens the stage and spotlights
            its books.
          </p>
          <div className="mt-2 space-y-2">
            {bookCoverage.map((row) => (
              <CoverageRow key={row.id} row={row} />
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-100">Papers</p>
          <p className="mt-1 text-xs text-slate-400">
            Share of the papers by category. Each row opens the page and spotlights
            that category.
          </p>
          <div className="mt-2 space-y-2">
            {paperCoverage.map((row) => (
              <CoverageRow key={row.id} row={row} />
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-100">Writing</p>
          <p className="mt-1 text-xs text-slate-400">
            Adjacent by nature: it makes the work legible to others rather than
            being part of the work. Counted, because the track itemises rather than
            sizes itself.
          </p>
          <Link
            href="/research-writing"
            className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-400 hover:text-white transition-colors"
          >
            Open the writing track
            <span className="text-slate-400 hover:text-[#5f93a8] transition-colors">→</span>
          </Link>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            {writingComposition.map((item) => (
              <li key={item.id} className="text-[11px] text-slate-400">
                {item.label}
                <span className="ml-1.5 font-mono text-slate-500">{item.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="max-w-2xl text-sm md:text-base text-slate-400 leading-relaxed">
        These measure what the foundation covers and how directly, not how well any
        of it has been read.
      </p>
    </section>
  );
}
