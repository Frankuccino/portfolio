"use client";

import { useState } from "react";

const EMAIL = "frank@fuiss.com";

/**
 * The copy button, as its own island.
 *
 * It is the only part of the contact sheet that needs JavaScript, so it is the
 * only part that ships as a client component. The surrounding sheet is a
 * server component, which keeps its markup out of the hydration pass.
 */
export default function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // A refused clipboard should not break the page: the address is right
      // there to select and copy by hand.
      setCopied(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={copyEmail}
        className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1.5 rounded-md border border-slate-700 text-slate-300 hover:text-white hover:border-[#3e6274]/60 transition-colors cursor-pointer"
      >
        {copied ? "Copied ✓" : "Copy"}
      </button>
      <span role="status" className="sr-only">
        {copied ? "Email address copied" : ""}
      </span>
    </>
  );
}
