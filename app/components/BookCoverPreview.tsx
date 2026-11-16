"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { ReadingBook } from "../data/readingPlan";
import { coverUrl, googleBooksCoverUrl } from "../lib/covers";

const WIDTH = 190;
const ART_HEIGHT = 250;
/** Art plus the caption bar — used to keep the panel inside the viewport. */
const PANEL_HEIGHT = ART_HEIGHT + 58;

/**
 * Cover art, tried in order: Open Library, then Google Books, then a tile.
 *
 * The order is availability, not preference — Open Library is keyed on a
 * non-rate-limited identifier so it goes first, and Google Books covers the
 * titles it has no art for. A failure advances one step, so a stale id degrades
 * to the next source rather than a broken image.
 */
function CoverArt({ book }: { book: ReadingBook }) {
  const [step, setStep] = useState(0);

  const sources = [
    book.coverId ? coverUrl(book.coverId) : null,
    book.googleBooksId ? googleBooksCoverUrl(book.googleBooksId) : null,
  ].filter((url): url is string => Boolean(url));

  if (step >= sources.length) {
    /* Typographic last resort: every book gets a visual, not a hole. */
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

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={step}
      src={sources[step]}
      alt={`${book.title} cover`}
      width={WIDTH}
      height={ART_HEIGHT}
      onError={() => setStep((value) => value + 1)}
      className="block w-full object-cover"
      style={{ height: ART_HEIGHT }}
    />
  );
}

export type CoverPreviewState = {
  book: ReadingBook;
  /** The hovered card. Kept as an element so the panel can track it on scroll. */
  anchor: HTMLElement;
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
 * Placement is computed from the anchor's current rect, opening toward the
 * viewport's free space and flipping near an edge so it never collides with the
 * neighbouring column. The rect is re-read on scroll and resize — a panel that
 * closed on scroll would strand the reader, since a card scrolling under a
 * stationary pointer never fires a fresh `mouseenter`.
 */
export default function BookCoverPreview({ preview, onClose }: Props) {
  // Scroll handling only needs to trigger a re-render; the rect is read fresh
  // during render, so there is no cached box to go stale.
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!preview) return;

    // Measured directly rather than inside `requestAnimationFrame`: a hidden
    // tab never fires rAF, and the panel would freeze mid-scroll. The key guard
    // collapses the several scroll events a single frame can emit into one
    // state update, which is the batching rAF was there to provide.
    let last = "";
    const measure = () => {
      const { anchor } = preview;
      // The list can re-render and drop the card while the panel is open.
      if (!anchor.isConnected) {
        onClose();
        return;
      }
      const next = anchor.getBoundingClientRect();
      // A panel that cannot sit beside its card is worse than none.
      if (next.bottom < 0 || next.top > window.innerHeight) {
        onClose();
        return;
      }
      const key = [next.top, next.left, next.width, next.height].join(",");
      if (key === last) return;
      last = key;
      setTick((value) => value + 1);
    };

    window.addEventListener("scroll", measure, true);
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure, true);
      window.removeEventListener("resize", measure);
    };
  }, [preview, onClose]);

  if (!preview) return null;

  const { book, anchor } = preview;
  const box = anchor.getBoundingClientRect();
  let left = box.right + 12;
  if (left + WIDTH > window.innerWidth - 8) left = box.left - WIDTH - 12;
  if (left < 8) left = Math.min(Math.max(8, box.left), window.innerWidth - WIDTH - 8);
  let top = box.top;
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
