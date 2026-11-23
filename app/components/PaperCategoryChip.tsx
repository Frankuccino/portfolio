"use client";

import { useHighlight } from "./Highlight";

/**
 * The category label on a paper, doubled as the in-page spotlight control.
 *
 * The label is a property of the paper; clicking it spotlights every paper that
 * shares the category and dims the rest, which is the same thing the coverage
 * gauge's rows do from outside the page. Clicking the active one clears it.
 */
export default function PaperCategoryChip({
  id,
  label,
}: {
  id: string;
  label: string;
}) {
  const { id: active, set } = useHighlight();
  const isActive = active === id;

  return (
    <button
      type="button"
      onClick={() => set(isActive ? "" : id)}
      aria-pressed={isActive}
      title={isActive ? "Clear the spotlight" : `Spotlight ${label}`}
      className={`text-[10px] font-mono uppercase tracking-widest transition-colors ${
        isActive ? "text-[#8fc3d6]" : "text-[#5f93a8] hover:text-[#8fc3d6]"
      }`}
    >
      {label}
    </button>
  );
}
