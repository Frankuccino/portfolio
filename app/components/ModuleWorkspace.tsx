"use client";

import { useState, type ReactNode } from "react";
import ModuleRail from "./ModuleRail";
import type { ReadingRailSection } from "./ReadingPlanLayout";

export type ModuleTab = {
  id: string;
  label: string;
  content: ReactNode;
};

export default function ModuleWorkspace({
  header,
  tabs,
  tocByTab,
}: {
  header: ReactNode;
  tabs: ModuleTab[];
  tocByTab: Record<string, ReadingRailSection[]>;
}) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? "");
  const active = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  return (
    <>
      <article className="mx-auto max-w-6xl">
        {header}

        <div
          role="tablist"
          aria-label="Module views"
          className="mt-6 flex gap-1 overflow-x-auto border border-slate-800/70 rounded-lg bg-slate-950/40 p-1"
        >
          {tabs.map((tab) => {
            const isActive = tab.id === active?.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`relative z-10 shrink-0 rounded-md px-3 py-2 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-[#3e6274]/25 text-slate-100"
                    : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-200"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          id={`panel-${active?.id ?? ""}`}
          role="tabpanel"
          aria-label={active?.label}
          className="mt-8"
        >
          {active?.content}
        </div>
      </article>

      <ModuleRail sections={tocByTab[active?.id ?? ""] ?? []} />
    </>
  );
}
