/**
 * The social-share card. Declared once because a page that overrides the
 * openGraph object does not inherit the parent's fields — the layout's image
 * has to be restated wherever a page supplies its own block.
 */
export const ogImage = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  contentType: "image/jpeg",
  alt: "Frank Angelo Malubag — Software & AI Engineer",
} as const;
