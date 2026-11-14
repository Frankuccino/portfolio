/**
 * The site's canonical origin, used for metadataBase, the Open Graph and
 * Twitter cards, and the sitemap.
 *
 * Set NEXT_PUBLIC_SITE_URL in production. Social cards must be HTTPS — X
 * refuses http:// images and some platforms drop the preview entirely — so
 * the scheme is upgraded rather than emitted as given. Local development
 * falls back to localhost over HTTPS, which is fine for tag inspection and
 * for the platform crawlers that only ever see the deployed origin.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://localhost:3000"
).replace(/^http:\/\//i, "https://");
