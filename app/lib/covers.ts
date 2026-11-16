/**
 * Cover art is hotlinked, never vendored.
 *
 * Two catalogues, in order: Open Library, keyed on CoverID because the ISBN key
 * is rate-limited per IP, and Google Books, keyed on the volume id, which fills
 * the titles Open Library has no art for. See the showcase skill's
 * `references/artwork-apis.md`.
 */
export const coverUrl = (coverId: number, size: "S" | "M" | "L" = "L"): string =>
  `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg?default=false`;

export const googleBooksCoverUrl = (volumeId: string, zoom = 3): string =>
  `https://books.google.com/books/content?id=${volumeId}&printsec=frontcover&img=1&zoom=${zoom}&edge=curl&source=gbs_api`;

export const OPEN_LIBRARY_ATTRIBUTION =
  "https://openlibrary.org/developers/api/covers";
