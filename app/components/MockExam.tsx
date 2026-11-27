"use client";

import { useMemo, useState } from "react";
import QuizQuestion from "./QuizQuestion";
import type { QuizQuestion as QuizQuestionType } from "../lib/moduleContent";

export default function MockExam({
  questions,
}: {
  questions: QuizQuestionType[];
}) {
  const [order, setOrder] = useState<string[]>(() => questions.map((item) => item.id));

  const ordered = useMemo(
    () =>
      order
        .map((id) => questions.find((item) => item.id === id))
        .filter((item): item is QuizQuestionType => Boolean(item)),
    [order, questions],
  );

  function shuffle() {
    const next = [...questions];
    for (let index = next.length - 1; index > 0; index -= 1) {
      const target = Math.floor(Math.random() * (index + 1));
      [next[index], next[target]] = [next[target], next[index]];
    }
    setOrder(next.map((item) => item.id));
  }

  return (
    <div>
      <button
        type="button"
        onClick={shuffle}
        className="rounded-md border border-[#3e6274]/60 px-3 py-1.5 text-xs font-medium text-[#7fb0c2] transition-colors hover:border-[#5f93a8] hover:text-white"
      >
        Shuffle questions
      </button>
      <div className="mt-5 space-y-3">
        {ordered.map((question) => (
          <QuizQuestion key={question.id} question={question} />
        ))}
      </div>
    </div>
  );
}
