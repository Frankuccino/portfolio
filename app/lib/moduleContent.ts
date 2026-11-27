import { headingSlug } from "./markdown";

export type TopicUnit = { id: string; label: string; body: string };
export type QuizQuestion = {
  id: string;
  module: string;
  source: string;
  number: number;
  question: string;
  answer: string;
};
export type CodeSnippet = {
  id: string;
  module: string;
  label: string;
  body: string;
};

function noteHeading(note: string): string {
  const line = note
    .split("\n")
    .find((part) => /^#{2,3}\s+/.test(part));
  return line?.replace(/^#{2,3}\s+/, "").trim() ?? "";
}

export function buildUnits(notes: string[], hasChapters: boolean): TopicUnit[] {
  return notes.map((note, index) => {
    const lines = note.split("\n");
    if (hasChapters) {
      const marker = lines.findIndex((line) => /^##\s+/.test(line));
      const fallback = noteHeading(note);
      const label = (marker >= 0
        ? lines[marker].replace(/^##\s+/, "")
        : fallback || `Section ${index + 1}`
      )
        .replace(/^\d+\s*\/\s*/, "")
        .trim();
      const bodyLines = marker >= 0
        ? [...lines.slice(0, marker), ...lines.slice(marker + 1)]
        : lines;
      const body = bodyLines.join("\n").replace(/^###\s+/gm, "#### ");
      return {
        id: `${headingSlug(label)}-${index}`,
        label,
        body: `### ${label}\n\n${body}`,
      };
    }
    const label = noteHeading(note) || `Section ${index + 1}`;
    return { id: `${headingSlug(label)}-${index}`, label, body: note };
  });
}

/** Split a unit into its visible heading and the remaining markdown body. */
export function splitNote(unit: TopicUnit): { label: string; body: string } {
  const lines = unit.body.split("\n");
  const headingIndex = lines.findIndex((line) => /^#{2,4}\s+/.test(line));
  if (headingIndex < 0) return { label: unit.label, body: unit.body };
  const label = lines[headingIndex].replace(/^#{2,4}\s+/, "").trim();
  const body = [
    ...lines.slice(0, headingIndex),
    ...lines.slice(headingIndex + 1),
  ]
    .join("\n")
    .trim();
  return { label, body };
}

function isQuizUnit(unit: TopicUnit): boolean {
  return /quiz/i.test(unit.label) || /^Question\s+\d+:/m.test(unit.body);
}

function isAnswerUnit(unit: TopicUnit): boolean {
  return /answer key|answer & explanation|answer and explanation/i.test(unit.label);
}

function parseAnswerMap(answerText: string): Map<number, string> {
  const answers = new Map<number, string>();
  const detailed = /Question\s+(\d+):\s*([\s\S]*?)(?=\nQuestion\s+\d+:|$)/g;
  let match: RegExpExecArray | null;
  while ((match = detailed.exec(answerText)) !== null) {
    answers.set(Number(match[1]), match[2].trim().replace(/^B\s*[—.-]\s*/i, ""));
  }
  if (answers.size === 0) {
    const compact = answerText.match(/Answer key:\s*([0-9,\sA-D]+)/i);
    const pairs = compact?.[1].matchAll(/(\d+)\s*([A-D])\b/g) ?? [];
    for (const pair of pairs) {
      answers.set(Number(pair[1]), `Option ${pair[2]}.`);
    }
  }
  return answers;
}

export function parseQuizQuestions(
  units: TopicUnit[],
  moduleTitle: string,
): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  units.forEach((unit, index) => {
    if (!isQuizUnit(unit)) return;
    const marker = unit.body.search(/^(?:###\s*)?Answer key(?: & Explanations)?:/im);
    const ownAnswer = marker >= 0 ? unit.body.slice(marker) : "";
    const answerText = [
      ownAnswer,
      ...units
        .slice(index + 1)
        .filter((candidate) => !isQuizUnit(candidate) && isAnswerUnit(candidate))
        .map((candidate) => candidate.body),
    ]
      .filter(Boolean)
      .join("\n\n");
    const answers = parseAnswerMap(answerText);
    const questionBody = marker >= 0 ? unit.body.slice(0, marker) : unit.body;
    const blocks = questionBody
      .split(/(?=^Question\s+\d+:)/m)
      .filter((block) => /^Question\s+\d+:/.test(block));

    blocks.forEach((block, blockIndex) => {
      const numberMatch = block.match(/^Question\s+(\d+):/);
      if (!numberMatch) return;
      const number = Number(numberMatch[1]);
      const question = block
        .replace(/^Question\s+\d+:\s*/, "")
        .split("\n")
        .filter((line) => line.trim())
        .join("\n")
        .trim();
      questions.push({
        id: `${unit.id}-q${number}-${blockIndex}`,
        module: moduleTitle,
        source: unit.label,
        number,
        question,
        answer: answers.get(number) ?? "Answer not supplied in notes.",
      });
    });
  });
  return questions;
}

export function collectCodeSnippets(
  units: TopicUnit[],
  moduleTitle: string,
): CodeSnippet[] {
  return units
    .filter(
      (unit) =>
        unit.body.includes("```") &&
        /lab|code cookbook/i.test(`${unit.label} ${unit.body}`),
    )
    .map((unit) => ({
      id: unit.id,
      module: moduleTitle,
      label: unit.label,
      body: unit.body,
    }));
}
