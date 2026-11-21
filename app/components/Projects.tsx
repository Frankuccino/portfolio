import SectionHeading from "./SectionHeading";
import ProjectFilter from "./ProjectFilter";
import { projects } from "../data/portfolio";

const pad = (n: number) => String(n).padStart(2, "0");

function StackChips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span
          key={item}
          className="text-[11px] px-2 py-0.5 rounded-md bg-slate-950/70 border border-slate-800/70 text-slate-400"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

/**
 * The projects ledger.
 *
 * A server component. The case files are native `<details>` elements sharing a
 * `name`, which gives the one-at-a-time behaviour for free, and the filter is a
 * small island that toggles a class on the rows already in the document.
 */
export default function Projects() {
  return (
    <section id="projects" className="px-4 sm:px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="03."
          title="Projects"
          description="Production-style systems I have designed, built, and shipped, from AI-assisted tooling to municipal-scale internal software. Open a case file for its stack and evidence."
        />

        <ProjectFilter total={projects.length} />

        {/* Case files, ruled rather than carded. */}
        <div className="border-t border-slate-800/70">
          {projects.map((project, index) => (
            <details
              key={project.id}
              id={project.id}
              name="case-files"
              open={project.featured}
              data-domain={project.domain}
              className="group border-b border-slate-800/70 last:border-b-0 scroll-mt-28"
            >
              <summary className="flex items-baseline gap-3 sm:gap-4 px-2 sm:px-3 py-4 cursor-pointer">
                <span className="text-[11px] font-mono tabular-nums text-slate-400 shrink-0 w-6">
                  {pad(index + 1)}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                    <span className="text-base md:text-lg font-semibold text-slate-100 group-hover:text-white transition-colors">
                      {project.title}
                    </span>
                    {project.featured ? (
                      <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded border border-[#3e6274]/50 bg-[#3e6274]/15 text-slate-200">
                        Featured
                      </span>
                    ) : null}
                  </span>
                  <span className="block text-xs text-slate-400 mt-0.5 font-mono">
                    {project.role} · {project.year}
                  </span>
                  <span className="block text-sm text-slate-400 leading-relaxed mt-2 max-w-3xl">
                    {project.summary}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="row-marker shrink-0 text-slate-400 group-hover:text-slate-200 transition-colors text-lg leading-none"
                />
              </summary>

              {/* The evidence: what it is built from, and what it proved. */}
              <div className="px-2 sm:px-3 pb-5 sm:pl-12 space-y-3">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1.5">
                    Stack
                  </p>
                  <StackChips items={project.stack} />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1.5">
                    Evidence
                  </p>
                  <ul className="space-y-1.5">
                    {project.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="text-xs text-slate-400 leading-relaxed flex gap-2"
                      >
                        <span className="text-[#5f93a8] shrink-0">▸</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {project.links.length > 0 ? (
                  <div className="flex flex-wrap gap-4">
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-slate-300 hover:text-white transition-colors"
                      >
                        {link.label} <span className="text-slate-400">↗</span>
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
