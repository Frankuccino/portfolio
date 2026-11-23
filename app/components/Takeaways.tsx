import { takeawaySections } from "../data/takeaways";

/**
 * The document body. Three levels on purpose: the section is a block of the
 * field, the family is the mental model, and the concept is one sentence. A
 * flat list of terms is what makes a reference page feel thin, and the family
 * is the part that carries the understanding.
 */
export default function Takeaways() {
  return (
    <div className="space-y-14">
      {takeawaySections.map((section, index) => (
        <section key={section.id} id={section.id} className="scroll-mt-28">
          <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">
            {"//"} {String(index + 1).padStart(2, "0")} · {section.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-300 leading-relaxed">
            {section.statement}
          </p>
          <p className="mt-2 text-[11px] font-mono text-slate-500">
            Condensed from: {section.source}
          </p>

          <div className="mt-6 space-y-8">
            {section.families.map((family) => (
              <div key={family.id}>
                <h3 className="border-b border-slate-800/70 pb-2 text-sm font-semibold text-white">
                  {family.title}
                </h3>
                <dl className="mt-3 space-y-2.5">
                  {family.concepts.map((concept) => (
                    <div
                      key={concept.term}
                      className="grid gap-1 sm:grid-cols-[200px_1fr] sm:gap-4"
                    >
                      <dt className="text-xs font-medium text-slate-100 sm:pt-px">
                        {concept.term}
                        {concept.extended ? (
                          <span
                            className="ml-1 text-[#5f93a8]"
                            title="Beyond the ten DataCamp courses"
                          >
                            +
                          </span>
                        ) : null}
                      </dt>
                      <dd className="text-xs text-slate-400 leading-relaxed">
                        {concept.detail}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
