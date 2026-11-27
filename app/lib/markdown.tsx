import React from "react";
import CodeCopyButton from "../components/CodeCopyButton";
import CollapsibleTableRows from "../components/CollapsibleTableRows";

/**
 * Minimal, dependency-free markdown renderer.
 *
 * Supports headings, paragraphs, ordered/unordered lists, blockquotes,
 * fenced code blocks, horizontal rules, and inline bold / italic / code /
 * links. Built for the blog's own authored content — not a general parser.
 */

const INLINE_PATTERN =
  /(`[^`]+`)|(\[[^\]]+\]\([^)]+\))|(\*\*[^*]+\*\*)|(\*[^*\n]+\*)/g;

function parseInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let cursor = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  INLINE_PATTERN.lastIndex = 0;
  while ((match = INLINE_PATTERN.exec(text)) !== null) {
    if (match.index > cursor) {
      nodes.push(text.slice(cursor, match.index));
    }
    const token = match[0];

    if (token.startsWith("`")) {
      nodes.push(
        <code
          key={key++}
          className="px-1 py-0.5 rounded bg-slate-950 border border-slate-800 text-[0.85em] font-mono text-slate-200"
        >
          {token.slice(1, -1)}
        </code>,
      );
    } else if (token.startsWith("[")) {
      const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        nodes.push(
          <a
            key={key++}
            href={link[2]}
            target={link[2].startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="text-slate-100 underline decoration-[#3e6274]/60 underline-offset-2 hover:text-white"
          >
            {link[1]}
          </a>,
        );
      }
    } else if (token.startsWith("**")) {
      nodes.push(
        <strong key={key++} className="text-slate-100 font-semibold">
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
      nodes.push(<em key={key++}>{token.slice(1, -1)}</em>);
    }
    cursor = match.index + token.length;
  }

  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

function Heading({
  level,
  children,
}: {
  level: number;
  children: React.ReactNode;
}) {
  const styles: Record<number, string> = {
    1: "text-2xl font-bold text-white mt-8 mb-3",
    2: "text-xl font-semibold text-slate-100 mt-6 mb-2",
    3: "text-lg font-semibold text-slate-100 mt-5 mb-2",
    4: "text-base font-medium text-slate-200 mt-4 mb-1.5",
  };
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4";
  return <Tag className={styles[level] ?? styles[4]}>{children}</Tag>;
}

const KEYWORDS = new Set([
  "and", "as", "assert", "async", "await", "break", "class", "continue",
  "def", "del", "elif", "else", "except", "False", "finally", "for", "from",
  "global", "if", "import", "in", "is", "lambda", "None", "nonlocal", "not",
  "or", "pass", "raise", "return", "True", "try", "while", "with", "yield",
  "int", "float", "str", "bool", "dict", "list", "tuple", "len", "all",
  "print", "range", "enumerate", "zip", "min", "max", "sum", "round",
]);

const TOKEN = {
  comment: "text-[#5f7180] italic",
  string: "text-[#a7d3bf]",
  keyword: "text-[#8fbfe0]",
  fn: "text-[#c9b6e4]",
  number: "text-[#e2b98f]",
  key: "text-[#9fd0e0]",
};

type CodePart = { text: string; className?: string };

/**
 * A small, dependency-free tokeniser for the code this site actually ships:
 * Python, JSON and short text snippets. It preserves whitespace verbatim and
 * merges adjacent tokens of the same class so the DOM stays small.
 */
function highlight(code: string, language: string): CodePart[] {
  const parts: CodePart[] = [];
  const isPython = language === "python" || language === "py";
  const isJs = language === "javascript" || language === "typescript";
  const isJson = language === "json";

  const push = (text: string, className?: string) => {
    if (!text) return;
    const last = parts[parts.length - 1];
    if (last && last.className === className) last.text += text;
    else parts.push({ text, className });
  };

  let i = 0;
  while (i < code.length) {
    const rest = code.slice(i);

    if (isPython && code[i] === "#") {
      const end = code.indexOf("\n", i);
      const stop = end === -1 ? code.length : end;
      push(code.slice(i, stop), TOKEN.comment);
      i = stop;
      continue;
    }
    if (isJs && rest.startsWith("//")) {
      const end = code.indexOf("\n", i);
      const stop = end === -1 ? code.length : end;
      push(code.slice(i, stop), TOKEN.comment);
      i = stop;
      continue;
    }
    if (isPython && rest.startsWith('"""')) {
      const end = code.indexOf('"""', i + 3);
      const stop = end === -1 ? code.length : end + 3;
      push(code.slice(i, stop), TOKEN.string);
      i = stop;
      continue;
    }
    if (code[i] === '"' || code[i] === "'") {
      const quote = code[i];
      let j = i + 1;
      while (j < code.length) {
        if (code[j] === "\\") {
          j += 2;
          continue;
        }
        if (code[j] === quote) {
          j += 1;
          break;
        }
        if (code[j] === "\n") break;
        j += 1;
      }
      const isKey = isJson && /^\s*:/.test(code.slice(j));
      push(code.slice(i, j), isKey ? TOKEN.key : TOKEN.string);
      i = j;
      continue;
    }

    const number = rest.match(/^\d+(?:\.\d+)?/);
    if (number) {
      push(number[0], TOKEN.number);
      i += number[0].length;
      continue;
    }

    const word = rest.match(/^[A-Za-z_][A-Za-z0-9_]*/);
    if (word) {
      const token = word[0];
      let className: string | undefined;
      if (KEYWORDS.has(token)) className = TOKEN.keyword;
      else if (token === "true" || token === "false" || token === "null") {
        className = TOKEN.number;
      } else {
        let j = i + token.length;
        while (code[j] === " " || code[j] === "\t") j += 1;
        if (code[j] === "(") className = TOKEN.fn;
        else if (isJson && code[j] === ":") className = TOKEN.key;
      }
      push(token, className);
      i += token.length;
      continue;
    }

    push(code[i]);
    i += 1;
  }
  return parts;
}

function CodeBlock({ language, code }: { language: string; code: string }) {
  const parts = highlight(code, language);
  return (
    <div className="my-4 rounded-lg border border-slate-800 bg-slate-950 overflow-hidden">
      {language ? (
        <div className="relative flex items-center justify-between border-b border-slate-800 px-3 py-1.5 pr-20 text-[10px] font-mono uppercase tracking-wider text-slate-400">
          <span>{language}</span>
          <CodeCopyButton code={code} />
        </div>
      ) : null}
      <pre className="p-3 overflow-x-auto text-xs font-mono leading-relaxed text-slate-300">
        <code>
          {parts.map((part, index) => (
            <span key={index} className={part.className}>
              {part.text}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

const HEADING_PATTERN = /^(#{1,4})\s+(.*)$/;
const ULIST_PATTERN = /^\s*[-*]\s+/;
const OLIST_PATTERN = /^\s*\d+\.\s+/;
const TABLE_ROW_PATTERN = /^\s*\|.*\|\s*$/;

/** Stable anchors derived from the heading text the reader actually sees. */
export function headingSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Level-2 headings declare a chapter; level-3 headings are its note sections. */
export function noteChapters(notes: string[] | undefined): {
  id: string;
  label: string;
  count: number;
}[] {
  const chapters: { id: string; label: string; count: number }[] = [];
  for (const note of notes ?? []) {
    const line = note.split("\n").find((part) => /^##\s+/.test(part));
    if (line) {
      const label = line.replace(/^##\s+/, "").trim();
      chapters.push({ id: headingSlug(label), label, count: 0 });
    } else if (/^###\s+/.test(note) && chapters.length > 0) {
      chapters[chapters.length - 1].count += 1;
    }
  }
  return chapters;
}

function semanticBadge(cell: string): { label: string; className: string } | null {
  if (/failure|trap|watch for|risk/i.test(cell)) {
    return {
      label: "TRAP",
      className: "border-amber-500/30 bg-amber-500/10 text-amber-300",
    };
  }
  if (/boundary|rule|enforced|guardrail/i.test(cell)) {
    return {
      label: "BOUNDARY",
      className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    };
  }
  if (/metric|sla|latency|precision|score|rate/i.test(cell)) {
    return {
      label: "METRIC",
      className: "border-purple-500/30 bg-purple-500/10 text-purple-300",
    };
  }
  return null;
}

function isTableSeparator(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed.includes("-")) return false;
  return /^[\s|:-]+$/.test(trimmed);
}

function parseTableRow(row: string): string[] {
  let trimmed = row.trim();
  if (trimmed.startsWith("|")) trimmed = trimmed.slice(1);
  if (trimmed.endsWith("|")) trimmed = trimmed.slice(0, -1);
  return trimmed.split("|").map((cell) => cell.trim());
}

export function Markdown({
  content,
  headingAnchors = false,
  chapterDividers = false,
  chapterLayers,
  topicKeywords,
  collapsibleTables = false,
}: {
  content: string;
  headingAnchors?: boolean;
  chapterDividers?: boolean;
  chapterLayers?: Record<string, { label: string; color: string }>;
  topicKeywords?: Record<string, string[]>;
  collapsibleTables?: boolean;
}) {
  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  let index = 0;
  let key = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (line.trim() === "") {
      index += 1;
      continue;
    }

    if (line.trimStart().startsWith("```")) {
      const language = line.trim().slice(3).trim();
      const buffer: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].trimStart().startsWith("```")) {
        buffer.push(lines[index]);
        index += 1;
      }
      index += 1;
      blocks.push(
        <CodeBlock key={key++} language={language} code={buffer.join("\n")} />,
      );
      continue;
    }

    const heading = line.match(HEADING_PATTERN);
    if (heading) {
      const level = heading[1].length;
      const id = headingAnchors ? headingSlug(heading[2]) : undefined;
      if (chapterDividers && level === 2) {
        const layer = id ? chapterLayers?.[id] : undefined;
        blocks.push(
          <div
            key={key++}
            className="mt-12 pt-6 pl-5 border-t border-l-2 border-slate-800/80 first:mt-0 scroll-mt-28"
            style={layer ? { borderLeftColor: layer.color } : undefined}
            id={id}
          >
            {layer ? (
              <div className="mb-2 flex items-center gap-3">
                <span
                  className="font-mono text-[10px] uppercase tracking-widest"
                  style={{ color: layer.color }}
                >
                  {layer.label}
                </span>
                <span className="h-px flex-1 bg-slate-800/70" />
              </div>
            ) : null}
            <h2 className="text-lg md:text-xl font-semibold text-slate-100 tracking-tight leading-snug">
              {parseInline(heading[2])}
            </h2>
            {id && topicKeywords?.[id]?.length ? (
              <p className="mt-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-500">
                Keywords: {topicKeywords[id].join(" · ")}
              </p>
            ) : null}
          </div>,
        );
      } else {
        blocks.push(
          <Heading key={key++} level={level}>
            {id ? <span id={id} className="scroll-mt-28">{parseInline(heading[2])}</span> : parseInline(heading[2])}
          </Heading>,
        );
      }
      index += 1;
      continue;
    }

    if (/^-{3,}\s*$/.test(line.trim())) {
      blocks.push(<hr key={key++} className="border-slate-800 my-6" />);
      index += 1;
      continue;
    }

    if (line.trimStart().startsWith(">")) {
      const buffer: string[] = [];
      while (index < lines.length && lines[index].trimStart().startsWith(">")) {
        buffer.push(lines[index].trimStart().replace(/^>\s?/, ""));
        index += 1;
      }
      const callout = buffer[0]?.match(/^(Tip|Warning|Note):/i)?.[1];
      const badgeClass = callout
        ? /warning/i.test(callout)
          ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
          : /tip/i.test(callout)
            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
            : "border-[#3e6274]/40 bg-[#3e6274]/10 text-[#7fb0c2]"
        : "";
      blocks.push(
        <blockquote
          key={key++}
          className={`border-l-2 pl-4 py-1 my-3 text-slate-400 italic ${
            badgeClass ? "border-[#5f93a8]/60" : "border-[#3e6274]/60"
          }`}
        >
          {callout ? (
            <span
              className={`mr-2 inline-block rounded border px-1.5 py-0.5 font-mono text-[9px] not-italic uppercase tracking-wider ${badgeClass}`}
            >
              {callout}
            </span>
          ) : null}
          {buffer.map((text, lineIndex) => (
            <p key={lineIndex} className="mb-1.5 last:mb-0 text-sm leading-relaxed">
              {parseInline(text)}
            </p>
          ))}
        </blockquote>,
      );
      continue;
    }

    if (ULIST_PATTERN.test(line)) {
      const items: string[] = [];
      while (index < lines.length && ULIST_PATTERN.test(lines[index])) {
        items.push(lines[index].replace(ULIST_PATTERN, ""));
        index += 1;
      }
      blocks.push(
        <ul
          key={key++}
          className="list-disc list-inside space-y-1 my-3 text-sm text-slate-300 marker:text-[#5f93a8]"
        >
          {items.map((item, itemIndex) => (
            <li key={itemIndex}>{parseInline(item)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    if (OLIST_PATTERN.test(line)) {
      const items: string[] = [];
      while (index < lines.length && OLIST_PATTERN.test(lines[index])) {
        items.push(lines[index].replace(OLIST_PATTERN, ""));
        index += 1;
      }
      blocks.push(
        <ol
          key={key++}
          className="list-decimal list-inside space-y-1 my-3 text-sm text-slate-300 marker:text-[#5f93a8]"
        >
          {items.map((item, itemIndex) => (
            <li key={itemIndex}>{parseInline(item)}</li>
          ))}
        </ol>,
      );
      continue;
    }

    if (TABLE_ROW_PATTERN.test(line)) {
      const rows: string[] = [];
      while (index < lines.length && TABLE_ROW_PATTERN.test(lines[index])) {
        rows.push(lines[index]);
        index += 1;
      }
      const headerCells = parseTableRow(rows[0]);
      const bodyRows = rows.slice(isTableSeparator(rows[1] ?? "") ? 2 : 1);
      const hasOverflow = collapsibleTables && bodyRows.length > 6;
      const visibleRows = hasOverflow ? bodyRows.slice(0, 6) : bodyRows;
      const hiddenRows = hasOverflow ? bodyRows.slice(6) : [];

      const renderRow = (row: string, rowIndex: number, suffix: string) => (
        <tr key={`${suffix}-${rowIndex}`} className="odd:bg-slate-950/40">
          {parseTableRow(row).map((cell, cellIndex) => (
            <td
              key={`${suffix}-${rowIndex}-${cellIndex}`}
              className="px-3 py-2 border-b border-slate-800/60 align-top"
            >
              {parseInline(cell)}
            </td>
          ))}
        </tr>
      );

      blocks.push(
        <div key={key++} className="my-4 overflow-x-auto">
          <table className="w-full text-xs text-slate-300 border border-slate-800 rounded-lg border-collapse">
            <thead>
              <tr className="bg-slate-900/70">
                {headerCells.map((cell, cellIndex) => {
                  const badge = semanticBadge(cell);
                  return (
                    <th
                      key={`h-${cellIndex}`}
                      className="px-3 py-2 text-left font-semibold text-slate-100 border-b border-slate-800"
                    >
                      {badge ? (
                        <span
                          className={`mr-1.5 inline-block rounded border px-1 py-0.5 font-mono text-[8px] ${badge.className}`}
                        >
                          {badge.label}
                        </span>
                      ) : null}
                      {parseInline(cell)}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row, rowIndex) => renderRow(row, rowIndex, "row"))}
              {hiddenRows.length ? (
                <CollapsibleTableRows
                  rows={hiddenRows.map((row, rowIndex) =>
                    renderRow(row, rowIndex + visibleRows.length, "extra"),
                  )}
                  colSpan={headerCells.length}
                />
              ) : null}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    const paragraph: string[] = [];
    while (
      index < lines.length &&
      lines[index].trim() !== "" &&
      !lines[index].trimStart().startsWith("```") &&
      !HEADING_PATTERN.test(lines[index]) &&
      !/^-{3,}\s*$/.test(lines[index].trim()) &&
      !lines[index].trimStart().startsWith(">") &&
      !ULIST_PATTERN.test(lines[index]) &&
      !OLIST_PATTERN.test(lines[index]) &&
      !TABLE_ROW_PATTERN.test(lines[index])
    ) {
      paragraph.push(lines[index]);
      index += 1;
    }

    if (paragraph.length > 0) {
      blocks.push(
        <p key={key++} className="my-3 text-sm text-slate-300 leading-relaxed">
          {parseInline(paragraph.join(" "))}
        </p>,
      );
    }
  }

  return <div className="space-y-0">{blocks}</div>;
}
