"use client";

import { useState } from "react";

const ALL = "all";

/**
 * The certificate ledger's issuer filter.
 *
 * The plates are server-rendered with a `data-issuer`, so this island only
 * toggles the `hidden` attribute on the rows already in the document and
 * updates the count.
 */
export default function IssuerFilter({
  issuers,
  total,
}: {
  issuers: string[];
  total: number;
}) {
  const [active, setActive] = useState<string>(ALL);

  const apply = (issuer: string) => {
    setActive(issuer);

    document
      .querySelectorAll<HTMLElement>("#certificates [data-issuer]")
      .forEach((plate) => {
        plate.hidden = issuer !== ALL && plate.dataset.issuer !== issuer;
      });

    const visible = document.querySelectorAll(
      "#certificates [data-issuer]:not([hidden])",
    ).length;
    const count = document.getElementById("plate-count");
    if (count) count.textContent = `${visible} of ${total} plates`;
  };

  const button = (id: string, label: string) => (
    <button
      key={id}
      type="button"
      onClick={() => apply(id)}
      aria-pressed={active === id}
      className={`text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
        active === id
          ? "bg-[#3e6274]/25 border-[#3e6274]/50 text-slate-100"
          : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-300"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-wrap items-center gap-1.5 mb-6">
      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mr-1">
        Issuer
      </span>
      {button(ALL, "All")}
      {issuers.map((issuer) => button(issuer, issuer))}
      <span
        id="plate-count"
        className="ml-auto text-[11px] font-mono tabular-nums text-slate-400"
      >
        {total} of {total} plates
      </span>
    </div>
  );
}
