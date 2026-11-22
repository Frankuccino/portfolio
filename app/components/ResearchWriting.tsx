import {
  researchBooks,
  latexObjectives,
  latexResources,
  researchResources,
  researchPhases,
  researchPrinciples,
  researchReadingOrder,
} from "../data/researchWriting";

/** Section marker, in the same mono eyebrow language as the reading pages. */
function Section({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-base font-semibold text-slate-100">
        <span className="font-mono text-[11px] text-[#5f93a8]">{index}</span>
        {"  "}
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

/** An unchecked objective, drawn as a box rather than a glyph. */
function Objective({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
      <span
        aria-hidden
        className="mt-0.5 w-3 h-3 shrink-0 rounded-[2px] border border-slate-500"
      />
      <span>{children}</span>
    </li>
  );
}

export default function ResearchWriting() {
  return (
    <div className="space-y-12">
      <Section index="01" title="The two books">
        <div className="grid gap-4 lg:grid-cols-2">
          {researchBooks.map((book) => (
            <div
              key={book.id}
              className="p-5 rounded-xl border border-slate-800/60 bg-slate-900/40"
            >
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                  {book.priority}
                </p>
                <p className="text-[11px] text-slate-400 text-right">
                  {book.publisher}
                </p>
              </div>
              <h3 className="mt-2 text-base font-semibold text-slate-100">
                {book.title}
              </h3>
              <p className="mt-1 text-xs text-slate-400">{book.author}</p>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                {book.focus}
              </p>
              <ul className="mt-3 space-y-1.5">
                {book.topics.map((topic) => (
                  <li key={topic} className="text-xs text-slate-400 flex gap-2">
                    <span className="text-[#5f93a8] shrink-0">▸</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section index="02" title="LaTeX, learned practically">
        <p className="max-w-3xl text-sm text-slate-400 leading-relaxed">
          LaTeX is picked up over a weekend by writing a paper, not by studying
          it for weeks. These are the objectives, and the two resources that
          cover them.
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {latexObjectives.map((objective) => (
            <Objective key={objective}>{objective}</Objective>
          ))}
        </ul>
        <ul className="mt-4 space-y-2">
          {latexResources.map((resource) => (
            <li key={resource.title} className="text-xs text-slate-400">
              <a
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-200 underline decoration-[#3e6274]/60 underline-offset-2 hover:text-white"
              >
                {resource.title}
              </a>
              <span className="text-slate-400"> · {resource.author} · </span>
              <span className="text-slate-400">{resource.purpose}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section index="03" title="Free resources">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-slate-300 border border-slate-800 rounded-lg border-collapse">
            <thead>
              <tr className="bg-slate-900/70">
                <th className="px-3 py-2 text-left font-semibold text-slate-100 border-b border-slate-800">
                  Resource
                </th>
                <th className="px-3 py-2 text-left font-semibold text-slate-100 border-b border-slate-800">
                  Author
                </th>
                <th className="px-3 py-2 text-left font-semibold text-slate-100 border-b border-slate-800">
                  Purpose
                </th>
              </tr>
            </thead>
            <tbody>
              {researchResources.map((resource) => (
                <tr key={resource.title} className="odd:bg-slate-950/40">
                  <td className="px-3 py-2 border-b border-slate-800/60 align-top">
                    <a
                      href={resource.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-100 underline decoration-[#3e6274]/60 underline-offset-2 hover:text-white"
                    >
                      {resource.title}
                    </a>
                  </td>
                  <td className="px-3 py-2 border-b border-slate-800/60 align-top text-slate-400">
                    {resource.author}
                  </td>
                  <td className="px-3 py-2 border-b border-slate-800/60 align-top text-slate-400">
                    {resource.purpose}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section index="04" title="The roadmap">
        <p className="max-w-3xl text-sm text-slate-400 leading-relaxed">
          Reading is not the deliverable. Each phase ends with something written
          or something checked, so the track cannot be finished passively.
        </p>
        <div className="mt-4 space-y-4">
          {researchPhases.map((phase) => (
            <div
              key={phase.id}
              className="p-4 rounded-xl border border-slate-800/60 bg-slate-900/40"
            >
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#5f93a8]">
                {phase.title}
              </p>
              <p className="mt-1.5 text-sm text-slate-300 leading-relaxed">
                {phase.goal}
              </p>
              <ul className="mt-2.5 space-y-1.5">
                {phase.items.map((item) => (
                  <Objective key={item}>{item}</Objective>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section index="05" title="What actually matters">
        <p className="max-w-3xl text-sm text-slate-400 leading-relaxed">
          The distinction the track is built on: the tool is cheap, the argument
          is not.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-xs text-slate-300 border border-slate-800 rounded-lg border-collapse">
            <thead>
              <tr className="bg-slate-900/70">
                <th className="px-3 py-2 text-left font-semibold text-slate-100 border-b border-slate-800">
                  Skill
                </th>
                <th className="px-3 py-2 text-left font-semibold text-slate-100 border-b border-slate-800">
                  What actually matters
                </th>
              </tr>
            </thead>
            <tbody>
              {researchPrinciples.map((principle) => (
                <tr key={principle.skill} className="odd:bg-slate-950/40">
                  <td className="px-3 py-2 border-b border-slate-800/60 align-top text-slate-200">
                    {principle.skill}
                  </td>
                  <td className="px-3 py-2 border-b border-slate-800/60 align-top text-slate-400">
                    {principle.matters}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section index="06" title="The reading order">
        <ol className="list-decimal list-inside space-y-1.5 text-sm text-slate-300 marker:text-[#5f93a8]">
          {researchReadingOrder.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </Section>
    </div>
  );
}
