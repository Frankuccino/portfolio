import {
  readingPapers,
  readingStages,
  paperCategory,
  paperStages,
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
 * The primary sources behind the LLM stages, in reading order.
 *
 * Deliberately not a stage and not a book: a paper has no cover, no page count,
 * no chapter map and no consolidation budget, so it carries its own shape. The
 * four stages are the order, the category on each entry is the domain it belongs
 * to, and the book stage it sits beside is a separate link. Each page that hosts
 * it supplies the heading; this component owns the list.
 */
export default function ReadingPapers() {
  return (
    <section className="mb-16">
      <p className="mb-8 max-w-3xl text-xs leading-relaxed text-slate-400">
        The books summarise; these are the derivations. Four stages, read in order,
        because each answers a question the previous one left open. Each paper is
        read twice, once for the idea and once for the method, and the label on it
        names the domain it belongs to.
      </p>

      <div className="space-y-12">
        {paperStages.map((stage, stageIndex) => {
          const papers = readingPapers.filter(
            (paper) => paper.stage === stage.id,
          );
          if (papers.length === 0) return null;

          return (
            <div key={stage.id}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-slate-800/70 pb-2">
                <span className="text-[10px] font-mono tabular-nums text-slate-500">
                  {String(stageIndex + 1).padStart(2, "0")}
                </span>
                <h2 className="text-base font-semibold text-slate-100">
                  {stage.label}
                </h2>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#5f93a8]">
                  {papers.length} {papers.length === 1 ? "paper" : "papers"}
                </span>
              </div>
              <p className="mt-2 mb-5 max-w-3xl text-xs leading-relaxed text-slate-400">
                {stage.note}
              </p>

              <ol className="border-l-2 border-[#3e6274]/40 pl-3 sm:pl-4 space-y-5">
                {papers.map((paper) => {
                  const index = readingPapers.indexOf(paper);
                  const bookStage = resolveStage(paper.pairsWith);
                  const category = paperCategory(paper.category);

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
                        {category ? (
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#5f93a8]">
                            {category.label}
                          </span>
                        ) : null}
                        <span className="ml-auto flex items-center gap-2 text-[11px] font-mono">
                          {paper.arxiv ? (
                            <>
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
                            </>
                          ) : paper.source ? (
                            <a
                              href={paper.source.href}
                              target="_blank"
                              rel="noreferrer"
                              className="text-slate-400 hover:text-[#5f93a8] transition-colors"
                            >
                              {paper.source.label}
                            </a>
                          ) : null}
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
                        {bookStage ? (
                          <>
                            Pairs with{" "}
                            <a
                              href={bookStage.anchor}
                              className="text-slate-400 hover:text-[#5f93a8] transition-colors"
                            >
                              {bookStage.title}
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
            </div>
          );
        })}
      </div>

      {/* The same fifteen again, one sentence each: a first read for anyone who
          wants the shape of the field before the derivations above. */}
      <div className="mt-14 border-t border-slate-800/70 pt-8">
        <h2 className="text-base font-semibold text-slate-100">In plain terms</h2>
        <p className="mt-1 mb-6 max-w-3xl text-xs leading-relaxed text-slate-400">
          A first read of each paper, before the detail above. One sentence each,
          in the same order.
        </p>

        <div className="space-y-7">
          {paperStages.map((stage, stageIndex) => {
            const papers = readingPapers.filter(
              (paper) => paper.stage === stage.id,
            );
            return (
              <div key={stage.id}>
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                  {String(stageIndex + 1).padStart(2, "0")} {stage.label}
                </p>
                <ul className="mt-2 space-y-2">
                  {papers.map((paper) => (
                    <li
                      key={paper.id}
                      className="text-xs leading-relaxed text-slate-400"
                    >
                      <span className="font-medium text-slate-200">
                        {paper.title}
                      </span>
                      <span className="text-slate-600"> · </span>
                      {paper.plain}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
