"use client";

import { useState } from "react";

/**
 * The document switcher for a featured credential.
 *
 * Every document is already in the server-rendered markup, stacked in the same
 * frame. This island only toggles the `hidden` attribute, so switching documents
 * needs no re-render and no client copy of the card.
 */
export default function DocSwitcher({
  id,
  docs,
}: {
  id: string;
  docs: { src: string; shortLabel?: string; label: string }[];
}) {
  const [active, setActive] = useState(0);

  const select = (index: number) => {
    setActive(index);
    const frame = document.getElementById(id);
    frame?.querySelectorAll<HTMLElement>("[data-doc]").forEach((doc, i) => {
      doc.hidden = i !== index;
    });
  };

  return (
    <div className="flex flex-wrap gap-1.5">
      {docs.map((doc, index) => (
        <button
          key={doc.src}
          type="button"
          onClick={() => select(index)}
          aria-pressed={active === index}
          title={doc.label}
          className={`text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded-md border transition-colors cursor-pointer ${
            active === index
              ? "bg-[#3e6274]/25 border-[#3e6274]/50 text-slate-100"
              : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-300"
          }`}
        >
          {doc.shortLabel ?? doc.label}
        </button>
      ))}
    </div>
  );
}
