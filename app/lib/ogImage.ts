/**
 * The social-share card. Declared once because a page that overrides the
 * openGraph object does not inherit the parent's fields — the layout's image
 * has to be restated wherever a page supplies its own block.
 */
export const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Frank Angelo A. Malubag — Software & AI Engineer",
} as const;
