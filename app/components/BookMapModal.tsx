"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import {
  daysToFinish,
  LLM_REINFORCEMENT_HOURS,
  RECALL_MINUTES_PER_FOCUS_CHAPTER,
  STAGE_CAPSTONE_HOURS,
  type ReadingBook,
} from "../data/readingPlan";
import PromptBlock from "./PromptBlock";

const priorityStyles: Record<string, string> = {
  focus: "text-slate-100 border-[#3e6274]/70 bg-[#3e6274]/25",
  skim: "text-slate-400 border-slate-700/60 bg-slate-800/30",
  reference: "text-slate-600 border-slate-800/60 bg-transparent",
};

const pad = (n: number) => String(n).padStart(2, "0");

type Props = {
  book: ReadingBook | null;
  stageLabel: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
};

export default function BookMapModal({
  book,
  stageLabel,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: Props) {
  // Escape closes; left/right move between books. Body scroll is locked while open.
  useEffect(() => {
    if (!book) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft" && hasPrev) onPrev();
      if (event.key === "ArrowRight" && hasNext) onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [book, hasPrev, hasNext, onClose, onPrev, onNext]);

  if (!book) return null;

  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#0e0d16]/85 backdrop-blur-xs animate-in fade-in duration-200"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${book.title} — reading map`}
        className="relative w-full max-w-2xl flex flex-col max-h-[88vh] rounded-2xl shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200 border overflow-hidden"
        style={{
          backgroundColor: "rgba(14, 13, 22, 0.95)",
          borderColor: "rgba(62, 98, 116, 0.3)",
          boxShadow:
            "0 0 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(62, 98, 116, 0.2)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[#3e6274]/20 bg-[#0e0d16]/50 shrink-0">
          <div className="flex items-center gap-2.5 truncate mr-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#3e6274] shrink-0" />
            <span className="text-[11px] font-mono tabular-nums text-slate-500 shrink-0">
              {pad(book.order)}
            </span>
            <span className="text-xs sm:text-sm font-medium tracking-wide text-slate-200 truncate">
              {book.title}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="text-slate-400 hover:text-slate-100 p-1.5 rounded-full transition-colors cursor-pointer shrink-0"
            style={{ backgroundColor: "rgba(62, 98, 116, 0.15)" }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div
          className="overflow-y-auto px-4 sm:px-6 py-5 space-y-5 [--scrollbar-width:thin] [scrollbar-color:rgba(100,116,139,0.4)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-600/40 [&::-webkit-scrollbar-thumb]:rounded-full"
        >
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-500">
              {stageLabel}
            </span>
            <span className="text-[11px] text-slate-400">
              {book.kind === "report" ? "Report" : "Book"}
              {book.track ? ` · ${book.track}` : ""} · {book.author}
            </span>
            <span className="ml-auto text-[11px] text-slate-500 tabular-nums">
              {book.pages.toLocaleString()} pp · ~{book.hours} h
            </span>
          </div>

          <p className="text-sm text-slate-400 leading-relaxed">{book.why}</p>

          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
              Timing
            </h4>
            <div className="mt-2 rounded-lg border border-slate-800/60 bg-slate-950/50 p-3 space-y-1.5">
              <div className="flex items-baseline justify-between gap-3 text-xs">
                <span className="text-slate-500">Reading</span>
                <span className="tabular-nums text-slate-300">
                  ~{book.hours} h at {book.dailyCommitment} min/day
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-3 text-xs">
                <span className="text-slate-500">Finish in</span>
                <span className="tabular-nums text-slate-300">
                  {daysToFinish(book)} days
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-3 text-xs">
                <span className="text-slate-500">Consolidation</span>
                <span className="tabular-nums text-slate-300">
                  ~{book.consolidationHours} h
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-3 border-t border-slate-800/60 pt-1.5 text-xs">
                <span className="text-slate-400">Total commitment</span>
                <span className="tabular-nums text-slate-200">
                  ~{(book.hours + book.consolidationHours).toFixed(1)} h
                </span>
              </div>
            </div>
            <ul className="mt-2 space-y-1">
              <li className="flex gap-2 text-[11px] text-slate-400">
                <span className="text-[#3e6274] shrink-0">▸</span>
                <span>
                  Recall protocol: {RECALL_MINUTES_PER_FOCUS_CHAPTER} min ×{" "}
                  {book.focus.filter((item) => item.priority === "focus").length} focus
                  chapters ={" "}
                  {(
                    (book.focus.filter((item) => item.priority === "focus").length *
                      RECALL_MINUTES_PER_FOCUS_CHAPTER) /
                    60
                  ).toFixed(1)}{" "}
                  h
                </span>
              </li>
              <li className="flex gap-2 text-[11px] text-slate-400">
                <span className="text-[#3e6274] shrink-0">▸</span>
                <span>LLM reinforcement: {LLM_REINFORCEMENT_HOURS} h</span>
              </li>
              <li className="flex gap-2 text-[11px] text-slate-400">
                <span className="text-[#3e6274] shrink-0">▸</span>
                <span>Stage capstone: {STAGE_CAPSTONE_HOURS} h</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
              Focus chapters
            </h4>
            <ul className="mt-2 space-y-2.5">
              {book.focus.map((item) => (
                <li key={item.chapter} className="flex items-start gap-2.5">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-mono leading-relaxed text-slate-300">
                      {item.chapter}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-400">
                      {item.why}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded border ${priorityStyles[item.priority]}`}
                  >
                    {item.priority}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                Hands-on
              </h4>
              <ul className="mt-2 space-y-1.5">
                {book.handsOn.map((item) => (
                  <li key={item} className="flex gap-2 text-xs text-slate-400">
                    <span className="text-[#3e6274] shrink-0">▸</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                Stress test
              </h4>
              <ul className="mt-2 space-y-1.5">
                {book.stressTest.map((item) => (
                  <li key={item} className="flex gap-2 text-xs text-slate-400">
                    <span className="text-slate-600 shrink-0">?</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
              Reinforcement prompt
            </h4>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
              Paste this into an LLM along with the notes you just took. It will
              question you, explain the gaps, and re-ask in different words.
            </p>
            <div className="mt-2">
              <PromptBlock prompt={book.reinforcementPrompt} />
            </div>
          </div>
        </div>

        {/* Footer navigation */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-t border-[#3e6274]/20 bg-[#0e0d16] shrink-0">
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            className="text-xs font-medium px-3 py-1.5 rounded-md border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors disabled:opacity-30 disabled:hover:border-slate-800 disabled:hover:text-slate-300 cursor-pointer disabled:cursor-default"
          >
            ← Prev book
          </button>
          <span className="text-[11px] text-slate-500 tabular-nums hidden sm:inline">
            {pad(book.order)} / 09
          </span>
          <button
            onClick={onNext}
            disabled={!hasNext}
            className="text-xs font-medium px-3 py-1.5 rounded-md border border-[#3e6274]/50 text-slate-200 hover:bg-[#3e6274]/20 transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-200 cursor-pointer disabled:cursor-default"
          >
            Next book →
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
