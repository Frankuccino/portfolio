"use client";

import { useState } from "react";
import SectionHeading from "./SectionHeading";

const EMAIL = "frankamalubag@gmail.com";

const channels = [
  {
    label: "LinkedIn",
    value: "in/frank-angelo-malubag",
    href: "https://www.linkedin.com/in/frank-angelo-malubag/",
    note: "Network & opportunities",
  },
  {
    label: "GitHub",
    value: "@Frankuccino",
    href: "https://github.com/Frankuccino",
    note: "Code & open source",
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // A refused clipboard should not break the page — the address is right
      // there to select and copy by hand.
      setCopied(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative px-4 sm:px-6 py-24 min-h-screen flex items-center overflow-hidden bg-slate-950/40"
    >
      {/* Soft glow anchoring the section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[42rem] rounded-full bg-[#3e6274]/10 blur-[120px]"
      />

      <div className="relative z-10 mx-auto max-w-3xl w-full">
        <SectionHeading
          index="06."
          title="Contact"
          description="Open to backend, AI engineering, and full-stack roles — with an emphasis on applied AI and distributed systems."
        />

        {/* The letter: one sheet with ruled rows, not three panels. */}
        <div className="rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md divide-y divide-slate-800/70">
          <div className="p-5 sm:p-6">
            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
              Write to
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="text-lg sm:text-2xl font-semibold text-white hover:text-[#9cc4d2] transition-colors break-all"
              >
                {EMAIL}
              </a>
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
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">
              Fastest way to reach me
            </p>
          </div>

          {channels.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-baseline gap-3 sm:gap-5 px-5 sm:px-6 py-4 hover:bg-slate-900/40 transition-colors"
            >
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 w-20 shrink-0">
                {channel.label}
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-sm font-medium text-slate-100 group-hover:text-white transition-colors break-all">
                  {channel.value}
                </span>
                <span className="block text-[11px] text-slate-400 mt-0.5">
                  {channel.note}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="text-slate-500 group-hover:text-slate-200 group-hover:translate-x-0.5 transition-all"
              >
                ↗
              </span>
            </a>
          ))}

          <div className="px-5 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-xs text-slate-400 leading-relaxed">
              Based in Dumaguete City, Philippines — working remotely across
              time zones. Currently deepening expertise in distributed systems
              and applied AI engineering.
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-md bg-[#3e6274]/30 border border-[#3e6274]/60 text-white hover:bg-[#3e6274]/45 transition-colors shrink-0"
            >
              Email me
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
