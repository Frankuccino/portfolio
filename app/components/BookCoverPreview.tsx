"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { ReadingBook } from "../data/readingPlan";
import { coverUrl } from "../lib/covers";

const WIDTH = 190;
const ART_HEIGHT = 250;
/** Art plus the caption bar — used to keep the panel inside the viewport. */
const PANEL_HEIGHT = ART_HEIGHT + 58;

/** Owns its failure state so a new book starts clean without an effect reset. */
function CoverArt({ book }: { book: ReadingBook }) {
  const [failed, setFailed] = useState(false);

  if (book.coverId && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={coverUrl(book.coverId)}
        alt={`${book.title} cover`}
        width={WIDTH}
        height={ART_HEIGHT}
        onError={() => setFailed(true)}
        className="block w-full object-cover"
        style={{ height: ART_HEIGHT }}
      />
    );
  }

  /* Typographic fallback: every book gets a visual, not a hole. */
  return (
    <div
      className="flex flex-col justify-between p-3 bg-gradient-to-b from-[#3e6274]/25 to-slate-950"
      style={{ height: ART_HEIGHT }}
    >
      <span className="text-[9px] font-mono uppercase tracking-widest text-[#3e6274]">
        {book.author}
      </span>
      <span className="text-sm font-semibold leading-snug text-slate-100">
        {book.title}
      </span>
      <span className="text-[9px] font-mono tabular-nums text-slate-500">
        {book.pages.toLocaleString()} pp
      </span>
    </div>
  );
}

export type CoverPreviewState = {
  book: ReadingBook;
  /** Viewport-relative rect of the hovered card, captured when the open fired. */
  rect: DOMRect;
};

type Props = {
  preview: CoverPreviewState | null;
  onClose: () => void;
};

/**
 * Hover preview for a book card.
 *
 * Rendered through a portal to `document.body`: the cards use `backdrop-blur`,
 * and a backdrop-filter ancestor becomes the containing block for a
 * `position: fixed` descendant, which would clip and misplace the preview.
 *
 * Placement is computed from the captured rect during render, opening toward
 * the viewport's free space and flipping near an edge so it never collides with
 * the neighbouring column.
 */
export default function BookCoverPreview({ preview, onClose }: Props) {
  useEffect(() => {
    if (!preview) return;
    // A fixed panel cannot follow the content, so it closes on scroll instead.
    window.addEventListener("scroll", onClose, true);
    window.addEventListener("resize", onClose);
    return () => {
      window.removeEventListener("scroll", onClose, true);
      window.removeEventListener("resize", onClose);
    };
  }, [preview, onClose]);

  if (!preview) return null;

  const { book, rect } = preview;
  let left = rect.right + 12;
  if (left + WIDTH > window.innerWidth - 8) left = rect.left - WIDTH - 12;
  if (left < 8) left = Math.min(Math.max(8, rect.left), window.innerWidth - WIDTH - 8);
  let top = rect.top;
  if (top + PANEL_HEIGHT > window.innerHeight - 8) {
    top = window.innerHeight - PANEL_HEIGHT - 8;
  }
  if (top < 8) top = 8;

  return createPortal(
    <div
      className="fixed z-[60] pointer-events-none animate-in fade-in zoom-in-95 duration-150"
      style={{ left, top, width: WIDTH }}
      aria-hidden="true"
    >
      <div className="rounded-lg overflow-hidden border border-[#3e6274]/40 bg-slate-900/95 shadow-2xl shadow-black/50 backdrop-blur-md">
        <CoverArt key={book.order} book={book} />
        {/* Caption is always present, so the panel is never an empty box while
            the artwork is still in flight. */}
        <div className="border-t border-slate-800/70 px-2.5 py-2">
          <p className="text-[11px] font-semibold leading-snug text-slate-100">
            {book.title}
          </p>
          <p className="text-[10px] text-slate-500">
            {book.author} · {book.pages.toLocaleString()} pp
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
