"use client";

import { useState } from "react";

export default function CodeCopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy code"
      className="relative z-50 rounded border border-slate-700 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 transition-colors hover:border-[#3e6274] hover:text-slate-200 focus:outline-none focus-visible:border-[#5f93a8]"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
