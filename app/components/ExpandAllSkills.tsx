"use client";

import { useEffect, useState } from "react";

/**
 * The one interactive control in the skills sheet.
 *
 * The rows are native `<details>` elements rendered by the server, so expanding
 * them needs no JavaScript. This island only exists for expand/collapse-all,
 * and it works on the rows already in the document rather than re-rendering
 * them, so the sheet itself stays a server component.
 */
export default function ExpandAllSkills() {
  const [allOpen, setAllOpen] = useState(true);

  useEffect(() => {
    const sheet = document.getElementById("skills");
    if (!sheet) return;

    // Keep the label honest when a row is opened or closed by hand.
    const sync = () => {
      const rows = sheet.querySelectorAll("details");
      setAllOpen(rows.length > 0 && Array.from(rows).every((row) => row.open));
    };
    const observer = new MutationObserver(sync);
    observer.observe(sheet, { attributes: true, subtree: true, attributeFilter: ["open"] });
    sync();
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const rows = Array.from(
      document.querySelectorAll<HTMLElement>("#skills details"),
    ) as HTMLDetailsElement[];
    const next = !rows.every((row) => row.open);
    rows.forEach((row) => {
      row.open = next;
    });
    setAllOpen(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-expanded={allOpen}
      className="text-[11px] font-mono uppercase tracking-wider text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
    >
      {allOpen ? "Collapse all" : "Expand all"}
    </button>
  );
}
