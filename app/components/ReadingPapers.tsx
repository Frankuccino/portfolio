import {
  readingPapers,
  readingStages,
} from "../data/readingPlan";

/**
 * Resolve a typed stage reference to the stage's own title and a link to it.
 *
 * The link targets `/books#<id>` rather than a bare `#<id>`: the papers live on
 * their own page, so a same-page fragment would be a dead anchor. The target
 * stage sections carry `scroll-mt-28`, which clears the fixed nav.
 */
function resolveStage(ref: { kind: "stage"; id: string }) {
  const stage = readingStages.find((entry) => entry.id === ref.id);
  return stage
    ? { title: stage.label, anchor: `/books#${stage.id}` }
    : null;
}

/**
 * The primary sources behind the LLM stages, as a list.
 *
 * Deliberately not a stage and not a book: a paper has no cover, no page count,
 * no chapter map and no consolidation budget, so it carries its own shape. Each
 * page that hosts it supplies the heading; this component owns the list.
 */
export default function ReadingPapers() {
  return (
    <section className="mb-16">
      <p className="mb-6 max-w-3xl text-xs leading-relaxed text-slate-400">
        The books summarise; these are the derivations. Each is read twice, once
        for the idea and once for the method. They sit alongside the sequence
        rather than after it, because the claim they check is usually met two
        stages in.
      </p>

      <ol className="border-l-2 border-[#3e6274]/40 pl-3 sm:pl-4 space-y-5">
        {readingPapers.map((paper, index) => {
          const stage = resolveStage(paper.pairsWith);
          return (
            <li key={paper.id}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-[10px] font-mono tabular-nums text-slate-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-sm font-semibold text-slate-100">
                  {paper.title}
                </h3>
                <span className="text-[11px] text-slate-400">
                  {paper.authors} · {paper.year} · ~{paper.hours} h
                </span>
                <span className="ml-auto flex items-center gap-2 text-[11px] font-mono">
                  <a
                    href={`https://arxiv.org/abs/${paper.arxiv}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-[#5f93a8] transition-colors"
                  >
                    arXiv:{paper.arxiv}
                  </a>
                  <a
                    href={`https://arxiv.org/pdf/${paper.arxiv}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-[#5f93a8] transition-colors"
                  >
                    PDF
                  </a>
                </span>
              </div>

              <div className="mt-2 grid gap-3 sm:grid-cols-3">
                {(
                  [
                    ["Problem", paper.problem],
                    ["The move", paper.move],
                    ["For your work", paper.forYourWork],
                  ] as const
                ).map(([label, body]) => (
                  <div key={label}>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-[#5f93a8]">
                      {label}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">
                      {body}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-2 text-[11px] text-slate-500">
                {stage ? (
                  <>
                    Pairs with{" "}
                    <a
                      href={stage.anchor}
                      className="text-slate-400 hover:text-[#5f93a8] transition-colors"
                    >
                      {stage.title}
                    </a>
                  </>
                ) : (
                  `Pairs with ${paper.pairsWith.id}`
                )}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
