"use client";

import { useRef, useState } from "react";

interface PromptBlockProps {
  label: string;
  content: string;
}

export function PromptBlock({ label, content }: PromptBlockProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!preRef.current) return;
    navigator.clipboard.writeText(preRef.current.textContent || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-xl border border-slate-800/60 bg-black/40 overflow-hidden flex flex-col">
      {/* z-10 is load-bearing: the content div below is position:relative and
          would otherwise paint over this absolutely positioned button, so a
          real mouse click lands on the label <p> instead of the button. */}
      <div className="absolute top-0 right-0 p-3 z-10">
        <button
          type="button"
          onClick={handleCopy}
          aria-label={`Copy ${label}`}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-widest transition-colors cursor-pointer ${
            copied
              ? "bg-emerald-400/15 border border-emerald-400/40 text-emerald-300"
              : "bg-slate-900/80 border border-slate-700/60 text-slate-400 hover:text-white hover:border-slate-500/60"
          }`}
        >
          {copied ? (
            <>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <div className="px-5 py-4">
        <p className="pr-24 text-xs font-mono uppercase tracking-widest text-[#5f93a8] mb-3">
          {label}
        </p>
        <pre
          ref={preRef}
          className="text-xs text-slate-300 whitespace-pre-wrap font-mono leading-relaxed overflow-x-auto"
        >
          {content}
        </pre>
      </div>
    </div>
  );
}
