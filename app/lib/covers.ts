/**
 * Cover art is hotlinked from the Open Library Covers API, keyed on CoverID —
 * never ISBN, which is rate-limited per IP. See the showcase skill's
 * `references/artwork-apis.md`.
 */
export const coverUrl = (coverId: number, size: "S" | "M" | "L" = "L"): string =>
  `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg?default=false`;

export const OPEN_LIBRARY_ATTRIBUTION =
  "https://openlibrary.org/developers/api/covers";
