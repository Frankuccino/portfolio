import {
  readingGuardrails,
  readingMechanisms,
  readingMethod,
  readingMisuse,
  readingRationale,
  readingSessionRule,
} from "../data/readingPlan";

export default function ReadingRationale() {
  return (
    <>
      {/* Why these books */}
      <section className="mb-12">
        <h2 className="text-xs font-mono uppercase tracking-widest text-slate-500">
          {"//"} Why these books
        </h2>
        <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-400 leading-relaxed">
          The certificates answer:{" "}
          <span className="text-slate-200">
            Have you been exposed to this?
          </span>{" "}
          The books answer:{" "}
          <span className="text-slate-200">
            Can you operate when nobody has given you the steps?
          </span>
        </p>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {readingRationale.map((item) => (
            <div
              key={item.title}
              className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md"
            >
              <h3 className="text-sm font-semibold leading-snug text-slate-100 min-h-[2.5rem]">
                {item.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-3 max-w-2xl text-xs leading-relaxed text-slate-400">
          {readingMisuse}
        </p>
      </section>

      {/* How to read them */}
      <section className="mb-12">
        <h2 className="text-xs font-mono uppercase tracking-widest text-slate-500">
          {"//"} How to read them
        </h2>
        <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-400 leading-relaxed">
          The protocol is built on the learning-science literature — retrieval
          practice, spacing, interleaving, consolidation — not on reading harder.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {readingMethod.map((item) => (
            <div
              key={item.step}
              className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md"
            >
              <span className="text-[10px] font-mono tabular-nums text-[#3e6274]">
                {item.step}
              </span>
              <h3 className="mt-1 text-sm font-semibold text-slate-100">
                {item.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-3 p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md">
          <h3 className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
            The standard
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-300">
            {readingSessionRule}
          </p>
          <ul className="mt-3 space-y-1.5">
            {readingGuardrails.map((rule) => (
              <li key={rule} className="flex gap-2 text-xs text-slate-400">
                <span className="text-[#3e6274]">—</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {readingMechanisms.map((item) => (
            <div
              key={item.title}
              className="p-3 rounded-lg border border-slate-800/60 bg-slate-950/40"
            >
              <h4 className="text-[11px] font-semibold text-slate-200">
                {item.title}
              </h4>
              <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
