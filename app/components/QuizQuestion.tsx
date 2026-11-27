"use client";

import { useState } from "react";
import type { QuizQuestion } from "../lib/moduleContent";

export default function QuizQuestion({ question }: { question: QuizQuestion }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div
      id={question.id}
      className="scroll-mt-28 rounded-lg border border-slate-800/80 bg-slate-950/40 p-4"
    >
      <div className="flex items-center justify-between gap-3 text-[10px] font-mono uppercase tracking-widest text-slate-500">
        <span>{question.source}</span>
        <span className="text-[#7fb0c2]">Question {question.number}</span>
      </div>
      <div className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-200">
        {question.question}
      </div>
      <button
        type="button"
        onClick={() => setRevealed((value) => !value)}
        aria-expanded={revealed}
        className="relative z-10 mt-4 rounded-md border border-[#3e6274]/60 px-3 py-1.5 text-[11px] font-medium text-[#7fb0c2] transition-colors hover:border-[#5f93a8] hover:text-white focus:outline-none focus-visible:border-[#5f93a8]"
      >
        {revealed ? "Hide answer & explanation" : "Reveal answer & explanation"}
      </button>
      {revealed ? (
        <div className="mt-3 border-t border-slate-800/70 pt-3 text-sm leading-relaxed text-slate-300">
          <span className="mr-2 font-mono text-[10px] uppercase tracking-widest text-[#7fb0c2]">
            Answer
          </span>
          {question.answer}
        </div>
      ) : null}
    </div>
  );
}
