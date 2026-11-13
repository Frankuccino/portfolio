"use client";

import { useState } from "react";

export default function PromptBlock({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    // The Clipboard API needs a focused document; fall back to a hidden textarea.
    let copiedOk = false;
    try {
      window.focus();
      await navigator.clipboard.writeText(prompt);
      copiedOk = true;
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = prompt;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      copiedOk = document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setCopied(copiedOk);
    if (copiedOk) window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-slate-800/60 bg-slate-950/50 p-3">
      <p className="text-xs leading-relaxed whitespace-pre-wrap text-slate-400">
        {prompt}
      </p>
      <button
        type="button"
        onClick={copy}
        className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
      >
        {copied ? "Copied to clipboard" : "Copy prompt"}
        <span className="text-slate-500">{copied ? "✓" : "⧉"}</span>
      </button>
    </div>
  );
}
