import React from "react";

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

function CodeBlock({ language, code }: { language: string; code: string }) {
  return (
    <div className="my-4 rounded-lg border border-slate-800 bg-slate-950 overflow-hidden">
      {language ? (
        <div className="px-3 py-1.5 border-b border-slate-800 text-[10px] font-mono uppercase tracking-wider text-slate-500">
          {language}
        </div>
      ) : null}
      <pre className="p-3 overflow-x-auto text-xs font-mono leading-relaxed text-slate-300">
        <code>{code}</code>
      </pre>
    </div>
  );
}

const HEADING_PATTERN = /^(#{1,4})\s+(.*)$/;
const ULIST_PATTERN = /^\s*[-*]\s+/;
const OLIST_PATTERN = /^\s*\d+\.\s+/;
const TABLE_ROW_PATTERN = /^\s*\|.*\|\s*$/;

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

export function Markdown({ content }: { content: string }) {
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
      blocks.push(
        <Heading key={key++} level={heading[1].length}>
          {parseInline(heading[2])}
        </Heading>,
      );
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
      blocks.push(
        <blockquote
          key={key++}
          className="border-l-2 border-[#3e6274]/60 pl-4 py-1 my-3 text-slate-400 italic"
        >
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
          className="list-disc list-inside space-y-1 my-3 text-sm text-slate-300 marker:text-[#3e6274]"
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
          className="list-decimal list-inside space-y-1 my-3 text-sm text-slate-300 marker:text-[#3e6274]"
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
      const bodyRows = rows.slice(isTableSeparator(rows[1] ?? "") ? 2 : 1);
      blocks.push(
        <div key={key++} className="my-4 overflow-x-auto">
          <table className="w-full text-xs text-slate-300 border border-slate-800 rounded-lg border-collapse">
            <thead>
              <tr className="bg-slate-900/70">
                {parseTableRow(rows[0]).map((cell, cellIndex) => (
                  <th
                    key={cellIndex}
                    className="px-3 py-2 text-left font-semibold text-slate-100 border-b border-slate-800"
                  >
                    {parseInline(cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, rowIndex) => (
                <tr key={rowIndex} className="odd:bg-slate-950/40">
                  {parseTableRow(row).map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-3 py-2 border-b border-slate-800/60 align-top"
                    >
                      {parseInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
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
