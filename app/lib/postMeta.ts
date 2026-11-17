/**
 * Pure post metadata helpers.
 *
 * These live apart from `lib/posts.ts` on purpose: that module reads the
 * filesystem, so anything importing it ends up in the server bundle. A client
 * component that only needs a date or a reading time must not pull `node:fs`
 * into the browser chunk.
 */

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return iso;
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}

/** Rough reading time at 200 wpm, floored at a minute. */
export function readingMinutes(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
