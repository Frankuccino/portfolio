"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { books, type Book, type BookCategory } from "../data/books";

type Filter = "all" | BookCategory;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "technical", label: "Technical" },
  { id: "personal", label: "Personal" },
];

// Deterministic spine colour per title, so a book keeps its colour across filters
const PALETTE = [
  "#3e6274",
  "#0e7490",
  "#475569",
  "#7c3aed",
  "#b45309",
  "#15803d",
  "#be185d",
  "#1d4ed8",
];

const SPINE_WIDTH = 48;
const SHELF_GAP = 5;
const BOOK_HEIGHT = 210;
const COVER_WIDTH = 160;
const FALLBACK_SHELF_WIDTH = 680;

function spineColor(title: string) {
  let hash = 0;
  for (let index = 0; index < title.length; index += 1) {
    hash = (hash * 31 + title.charCodeAt(index)) >>> 0;
  }
  return PALETTE[hash % PALETTE.length];
}

// Spread books over the fewest shelves, keeping every shelf evenly filled
function balanceShelves(visible: Book[], perShelf: number): Book[][] {
  if (visible.length === 0) return [];
  const shelfCount = Math.ceil(visible.length / perShelf);
  const base = Math.floor(visible.length / shelfCount);
  const extra = visible.length % shelfCount;

  const shelves: Book[][] = [];
  let cursor = 0;
  for (let index = 0; index < shelfCount; index += 1) {
    const size = base + (index < extra ? 1 : 0);
    shelves.push(visible.slice(cursor, cursor + size));
    cursor += size;
  }
  return shelves;
}

export default function VirtualLibrary() {
  const [filter, setFilter] = useState<Filter>("all");
  const [shelfWidth, setShelfWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) setShelfWidth(entry.contentRect.width);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const visible = useMemo(
    () => books.filter((book) => filter === "all" || book.category === filter),
    [filter],
  );

  const countFor = (id: Filter) =>
    id === "all"
      ? books.length
      : books.filter((book) => book.category === id).length;

  const perShelf = Math.max(
    1,
    Math.floor(
      ((shelfWidth || FALLBACK_SHELF_WIDTH) + SHELF_GAP) /
        (SPINE_WIDTH + SHELF_GAP),
    ),
  );
  const shelves = balanceShelves(visible, perShelf);

  return (
    <div ref={containerRef}>
      <div className="flex items-baseline justify-between gap-3 mb-3">
        <h2 className="text-xs font-mono uppercase tracking-widest text-slate-500">
          {"// My Library"}
        </h2>
        <span className="text-[11px] text-slate-500 tabular-nums">
          {visible.length} {visible.length === 1 ? "book" : "books"}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            aria-pressed={filter === item.id}
            className={`text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
              filter === item.id
                ? "bg-[#3e6274]/25 border-[#3e6274]/50 text-slate-100"
                : "bg-slate-950/50 border-slate-800 text-slate-500 hover:text-slate-300"
            }`}
          >
            {item.label}
            <span className="ml-1.5 text-slate-500 tabular-nums">
              {countFor(item.id)}
            </span>
          </button>
        ))}
      </div>

      <div aria-label="Bookshelf">
        {shelves.map((shelf, index) => (
          <div key={shelf[0]?.id ?? index} className="mb-7 last:mb-0">
            <div className="shelf-row flex items-end" style={{ gap: SHELF_GAP }}>
              {shelf.map((book, index) => {
                // Last two books on a shelf swing their cover the other way
                const flip = index >= shelf.length - 2;

                return (
                  <div
                    key={book.id}
                    className={`book-slot${flip ? " book-slot--flip" : ""}`}
                    style={{ width: SPINE_WIDTH, height: BOOK_HEIGHT }}
                    tabIndex={0}
                    role="button"
                    aria-label={`${book.title}${
                      book.author ? ` by ${book.author}` : ""
                    } — ${book.category}`}
                  >
                  {/* Spine — what the shelf shows */}
                  <div
                    className="book-spine bg-gradient-to-b from-white/10 to-black/25"
                    style={{ backgroundColor: spineColor(book.title) }}
                  >
                    <span className="book-spine-title">{book.title}</span>
                  </div>

                  {/* Front cover — swings open on hover or focus */}
                  <div
                    className="book-cover bg-gradient-to-br from-white/10 to-black/30"
                    style={{
                      width: COVER_WIDTH,
                      height: BOOK_HEIGHT,
                      backgroundColor: spineColor(book.title),
                    }}
                  >
                    <div className="relative z-10 flex h-full flex-col justify-between p-3">
                      <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/70">
                        {book.category}
                      </p>
                      <div>
                        <p className="text-[13px] font-bold leading-tight text-white">
                          {book.title}
                        </p>
                        {book.author ? (
                          <p className="mt-1.5 text-[10px] leading-snug text-white/75">
                            {book.author}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  </div>
                );
              })}
            </div>
            <div className="shelf-plank" />
          </div>
        ))}
      </div>
    </div>
  );
}
