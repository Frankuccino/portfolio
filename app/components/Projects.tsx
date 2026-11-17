"use client";

import { useState } from "react";
import SectionHeading from "./SectionHeading";
import { projects, type Project, type ProjectDomain } from "../data/portfolio";

const DOMAINS: { id: ProjectDomain | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI" },
  { id: "backend", label: "Backend" },
  { id: "systems", label: "Systems" },
  { id: "web", label: "Web" },
];

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

function CaseFile({
  project,
  index,
  open,
  onToggle,
}: {
  project: Project;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <article className="border-b border-slate-800/70 last:border-b-0">
      {/* The file's face. Always shows enough to judge the project; the
          evidence behind it opens on demand. */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`case-${project.id}`}
        className="group w-full text-left flex items-baseline gap-3 sm:gap-4 px-2 sm:px-3 py-4 cursor-pointer"
      >
        <span className="text-[11px] font-mono tabular-nums text-slate-500 shrink-0 w-6">
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
          className="shrink-0 text-slate-500 group-hover:text-slate-200 transition-colors text-lg leading-none"
        >
          {open ? "−" : "+"}
        </span>
      </button>

      {/* The evidence: what it is built from, and what it proved. */}
      {open ? (
        <div
          id={`case-${project.id}`}
          className="px-2 sm:px-3 pb-5 sm:pl-12 space-y-3"
        >
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1.5">
              Stack
            </p>
            <StackChips items={project.stack} />
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1.5">
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
      ) : null}
    </article>
  );
}

export default function Projects() {
  const [domain, setDomain] = useState<ProjectDomain | "all">("all");
  const [openId, setOpenId] = useState<string | null>(
    // The featured file starts open: it is the one a visitor should read first.
    projects.find((project) => project.featured)?.id ?? null,
  );

  const visible =
    domain === "all" ? projects : projects.filter((p) => p.domain === domain);

  return (
    <section id="projects" className="px-4 sm:px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="03."
          title="Projects"
          description="Production-style systems I have designed, built, and shipped — from AI-assisted tooling to municipal-scale internal software. Open a case file for its stack and evidence."
        />

        {/* The index: filter the files by the kind of system they are. */}
        <div className="flex flex-wrap items-center gap-1.5 mb-6">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mr-1">
            Filter
          </span>
          {DOMAINS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setDomain(item.id)}
              aria-pressed={domain === item.id}
              className={`text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
                domain === item.id
                  ? "bg-[#3e6274]/25 border-[#3e6274]/50 text-slate-100"
                  : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-300"
              }`}
            >
              {item.label}
            </button>
          ))}
          <span className="ml-auto text-[11px] font-mono tabular-nums text-slate-500">
            {visible.length} of {projects.length} files
          </span>
        </div>

        {/* Case files, ruled rather than carded. */}
        <div className="border-t border-slate-800/70">
          {visible.map((project) => (
            <CaseFile
              key={project.id}
              project={project}
              index={projects.indexOf(project)}
              open={openId === project.id}
              onToggle={() =>
                setOpenId((current) =>
                  current === project.id ? null : project.id,
                )
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
