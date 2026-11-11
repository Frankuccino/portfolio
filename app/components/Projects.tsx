import SectionHeading from "./SectionHeading";
import { projects } from "../data/portfolio";

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

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <article
      className={`p-5 rounded-xl bg-slate-900/40 border backdrop-blur-md flex flex-col gap-3 transition-colors ${
        project.featured
          ? "border-[#3e6274]/50 sm:col-span-2"
          : "border-slate-800/60"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base md:text-lg font-semibold text-slate-100">
            {project.title}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {project.role} · {project.year}
          </p>
        </div>
        {project.featured ? (
          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-md bg-[#3e6274]/20 border border-[#3e6274]/40 text-slate-200">
            Featured
          </span>
        ) : null}
      </div>

      <StackChips items={project.stack} />

      <p className="text-sm text-slate-400 leading-relaxed">{project.summary}</p>

      <ul className="space-y-1.5">
        {project.highlights.map((highlight) => (
          <li
            key={highlight}
            className="text-xs text-slate-400 leading-relaxed flex gap-2"
          >
            <span className="text-[#3e6274] shrink-0">▸</span>
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      {project.links.length > 0 ? (
        <div className="flex flex-wrap gap-3 mt-auto pt-1">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-slate-300 hover:text-white transition-colors"
            >
              {link.label} <span className="text-slate-500">↗</span>
            </a>
          ))}
        </div>
      ) : null}
    </article>
  );
}

export default function Projects() {
  const [featured, ...rest] = projects;

  return (
    <section id="projects" className="px-4 sm:px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="03."
          title="Projects"
          description="Production-style systems I have designed, built, and shipped — from AI-assisted tooling to municipal-scale internal software."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {featured ? <ProjectCard project={featured} /> : null}
          {rest.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
