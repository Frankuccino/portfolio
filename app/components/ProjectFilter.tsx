"use client";

import { useState } from "react";
import type { ProjectDomain } from "../data/portfolio";

const DOMAINS: { id: ProjectDomain | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI" },
  { id: "backend", label: "Backend" },
  { id: "systems", label: "Systems" },
  { id: "web", label: "Web" },
];

/**
 * The projects filter.
 *
 * The case files are server-rendered `<details>` rows carrying a `data-domain`,
 * so this island only toggles the `hidden` attribute on the rows already in the
 * document and updates the count. It renders no section markup of its own.
 */
export default function ProjectFilter({ total }: { total: number }) {
  const [active, setActive] = useState<ProjectDomain | "all">("all");

  const apply = (id: ProjectDomain | "all") => {
    setActive(id);

    const rows = document.querySelectorAll<HTMLElement>("#projects [data-domain]");
    rows.forEach((row) => {
      row.hidden = id !== "all" && row.dataset.domain !== id;
    });

    const visible = document.querySelectorAll(
      "#projects [data-domain]:not([hidden])",
    ).length;
    const count = document.getElementById("project-count");
    if (count) count.textContent = `${visible} of ${total} files`;
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5 mb-6">
      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mr-1">
        Filter
      </span>
      {DOMAINS.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => apply(item.id)}
          aria-pressed={active === item.id}
          className={`text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
            active === item.id
              ? "bg-[#3e6274]/25 border-[#3e6274]/50 text-slate-100"
              : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-300"
          }`}
        >
          {item.label}
        </button>
      ))}
      <span
        id="project-count"
        className="ml-auto text-[11px] font-mono tabular-nums text-slate-400"
      >
        {total} of {total} files
      </span>
    </div>
  );
}
