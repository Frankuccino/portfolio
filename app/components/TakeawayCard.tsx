import Link from "next/link";
import { takeawaySections, takeawayStats } from "../data/takeaways";

/**
 * The highlighted card on the DataCamp track page, pointing at the
 * condensation of that track's own notes.
 *
 * The right-hand column is a preview of the document's own shape rather than
 * decoration: the nine sections, in order, so a reader can see the map before
 * they commit to the page. It is derived from the same data the page renders.
 *
 * It carries no page measure of its own: the step page supplies the gutter and
 * the `max-w-6xl` column, so the card lines up with the course list under it.
 */
export default function TakeawayCard({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="group mb-12 block rounded-2xl border border-[#3e6274]/60 bg-gradient-to-br from-[#3e6274]/25 via-slate-900/60 to-slate-900/20 p-5 md:p-7 backdrop-blur-md shadow-[0_0_80px_-30px_rgba(62,98,116,0.55)] hover:border-[#5f93a8]/70 transition-colors"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-[#5f93a8]">
            {"//"} Condensed Key Takeaways
          </p>
          <h2 className="mt-3 text-2xl md:text-4xl font-black tracking-tight font-display text-slate-100">
            The field, condensed into one document.
          </h2>
          <p className="mt-3 max-w-xl text-sm text-slate-400 leading-relaxed">
            Ten DataCamp courses and 253 notes, grouped by the family each
            concept belongs to: extractive and abstractive summarization, the
            controls on a model, the four problems inside RAG, chains versus
            agents, and the operations layer that keeps it all up.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[11px] font-mono text-slate-500">
            <span>{takeawayStats.sections} sections</span>
            <span>{takeawayStats.families} families</span>
            <span>{takeawayStats.concepts} concepts</span>
            <span>{takeawayStats.extended} beyond the track</span>
          </div>
          <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
            Read the document
            <span className="text-slate-400 group-hover:text-[#5f93a8] transition-colors">
              →
            </span>
          </span>
        </div>

        <div className="rounded-xl border border-slate-800/80 bg-[#0e0d16]/60 p-4">
          <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
            {"//"} Inside
          </p>
          <ol className="mt-3 space-y-2">
            {takeawaySections.map((section, index) => (
              <li
                key={section.id}
                className="flex items-baseline gap-3 text-xs text-slate-400"
              >
                <span className="shrink-0 font-mono text-[10px] text-slate-500 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="group-hover:text-slate-200 transition-colors">
                  {section.title}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Link>
  );
}
