"use client";

import { useState } from "react";
import TechIcon from "./TechIcon";
import SectionHeading from "./SectionHeading";
import { skillGroups, type SkillGroup } from "../data/portfolio";

const pad = (n: number) => String(n).padStart(2, "0");

function SpecRow({
  group,
  index,
  open,
  onToggle,
}: {
  group: SkillGroup;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      id={group.id}
      className="border-b border-slate-800/70 last:border-b-0 scroll-mt-28"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`spec-${group.title}`}
        className="group w-full text-left flex items-baseline gap-3 sm:gap-5 px-2 sm:px-3 py-4 cursor-pointer"
      >
        <span className="text-[11px] font-mono tabular-nums text-slate-400 shrink-0 w-6">
          {pad(index + 1)}
        </span>
        <span className="shrink-0 flex items-center gap-2 sm:w-44">
          <TechIcon name={group.icon} className="w-4 h-4" />
          <span className="text-sm font-semibold text-slate-100 group-hover:text-white transition-colors">
            {group.title}
          </span>
        </span>
        <span className="flex-1 min-w-0 text-xs sm:text-sm text-slate-400 leading-relaxed">
          {group.summary}
        </span>
        <span className="hidden sm:block text-[10px] font-mono uppercase tracking-widest text-[#5f93a8] shrink-0 w-28 text-right">
          {group.featured ? "Primary focus" : ""}
        </span>
        <span
          aria-hidden="true"
          className="shrink-0 text-slate-400 group-hover:text-slate-200 transition-colors text-lg leading-none"
        >
          {open ? "−" : "+"}
        </span>
      </button>

      {open ? (
        <div
          id={`spec-${group.title}`}
          className="px-2 sm:px-3 pb-5 sm:pl-16"
        >
          <div className="flex flex-wrap gap-1.5">
            {group.items.map((item) => (
              <span
                key={item}
                className="text-[11px] px-2 py-1 rounded-md bg-slate-950/60 border border-slate-800/60 text-slate-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function Skills() {
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    // The primary-focus groups start open; the supporting ones stay closed.
    Object.fromEntries(
      skillGroups.map((group) => [group.title, Boolean(group.featured)]),
    ),
  );
  const allOpen = skillGroups.every((group) => open[group.title]);

  return (
    <section id="skills" className="px-4 sm:px-6 py-24 md:py-32 bg-slate-950/40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="02."
          title="Skills"
          description="Applied AI engineering first, then the engineering foundation that ships it. Each group says what I can actually do with it: open a row for the tools."
        />

        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
            {skillGroups.length} groups
          </span>
          <button
            type="button"
            onClick={() =>
              setOpen(
                allOpen
                  ? {}
                  : Object.fromEntries(
                      skillGroups.map((group) => [group.title, true]),
                    ),
              )
            }
            className="text-[11px] font-mono uppercase tracking-wider text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            {allOpen ? "Collapse all" : "Expand all"}
          </button>
        </div>

        {/* The spec sheet: ruled rows, not cards. */}
        <div className="border-t border-slate-800/70">
          {skillGroups.map((group, index) => (
            <SpecRow
              key={group.title}
              group={group}
              index={index}
              open={Boolean(open[group.title])}
              onToggle={() =>
                setOpen((current) => ({
                  ...current,
                  [group.title]: !current[group.title],
                }))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
