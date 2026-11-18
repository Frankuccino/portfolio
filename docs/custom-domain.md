# Custom Domain Runbook — fuiss.com

Registered 2026-11-18. This is the checklist for pointing it at the portfolio and
for everything else a domain unlocks. Registrar-agnostic: the exact record values
always come from the Vercel domain card, not from this file.

## Current state (live)

- **DNS is configured.** `fuiss.com` resolves and `307`-redirects to `www.fuiss.com`;
  `www.fuiss.com` serves the portfolio. Vercel issued the certificate.
- **`www` is the primary host.** Vercel's domain config redirects `fuiss.com` →
  `www.fuiss.com`, which is also Vercel's recommendation (a `www` CNAME routes more
  flexibly than a fixed apex A record). Making the apex primary instead means
  removing that redirect in the Vercel dashboard and setting the canonical to
  `https://fuiss.com` — there is no CLI/MCP command for it.
- **`NEXT_PUBLIC_SITE_URL=https://www.fuiss.com`** on the Vercel project (`portfolio`).
  It is inlined at build time, so it takes effect on the next production deploy.
- **Remaining:** the four unpushed commits (Platform Atlas, the display face, the study-page closes, the FUISS runbook) still need a push — the live deploy is `4c29fc9`, so the OG card on the domain is still the previous design. After the push: confirm the card, then a Domain property in Search Console (see below), and Email Routing.

## 1. Point the portfolio at the domain

1. Vercel dashboard → the portfolio project → **Settings → Domains** → add
   `fuiss.com`. Vercel detects the apex and shows the exact records to create.
2. At the registrar / DNS host, create:
   - `A` `@` → the apex value on the domain card, commonly `76.76.21.21` (newer
     projects may show an address such as `216.198.79.1`).
   - `CNAME` `www` → the project-specific target on the card, of the form
     `<hash>.vercel-dns-N.com`.
   - **Delete any stale apex `A`/`AAAA` records first** — leftovers from a previous
     host block verification.
3. Add `www.fuiss.com` to the project as well, then redirect one host to the other
   so there is a single canonical origin. (Vercel notes that making `www` primary
   lets it use a CNAME, which routes more flexibly than a fixed A record; for a
   personal brand the apex is what people type, so apex-primary is the usual choice.)
4. Wait for the card to read **Valid Configuration** — Vercel issues SSL
   automatically. Confirm from the terminal:

   ```sh
   dig A fuiss.com +short
   dig CNAME www.fuiss.com +short
   curl -IL https://fuiss.com
   ```

## 2. Switch the site's origin

`NEXT_PUBLIC_SITE_URL` is the single origin constant. It drives `metadataBase`, the
Open Graph and Twitter card URLs, every canonical, `sitemap.xml`, `robots.txt` and
the JSON-LD `Person.url`. The repo hardcodes no origin — only the OG card's footer
line is baked in.

1. Vercel → Project Settings → Environment Variables → Production:
   `NEXT_PUBLIC_SITE_URL=https://fuiss.com`. It is inlined at **build time**, so
   setting it changes nothing until a rebuild.
2. Regenerate `public/og-image.png`. The footer line is rasterised, so it still reads
   `frankamalubag.vercel.app` until it is re-rendered from the template.
3. Redeploy, then verify the **served** HTML rather than the source:

   ```sh
   curl -s https://fuiss.com/ | grep -o '<link rel="canonical"[^>]*>'
   curl -s https://fuiss.com/sitemap.xml | grep -o '<loc>[^<]*</loc>' | head
   ```

   The canonical and every `<loc>` must read `fuiss.com`, and the sitemap must carry
   no `http://` locations.

## 3. Search consoles — a domain property is now possible

On `*.vercel.app`, DNS verification was impossible (the TXT records belong to the
host), so only a URL-prefix property with the HTML tag was available. With a domain:

1. Google Search Console → **Add a Domain property** → `fuiss.com`. Verify by DNS TXT
   — one record covers both hosts and every subdomain. The HTML-tag method still
   works if preferred.
2. Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel to the token; the meta tag is
   omitted while it is unset.
3. Submit `/sitemap.xml`, then request indexing for the key routes. Expect a thin
   result at first — a new domain has no established name.
4. Bing Webmaster Tools can import the same property.

## 4. Cloudflare specifics (this domain is registered there)

Because the nameservers are already on Cloudflare, DNS and email are both handled in
the same place:

- Add the `A` and `CNAME` in **Cloudflare → DNS → Records**. Set both to
  **DNS-only** (grey cloud) while verifying — Cloudflare's proxy in front of a Vercel
  apex can interfere with certificate issuance. Proxying can be re-enabled once the
  domain card reads Valid Configuration.
- **Email Routing** (Cloudflare → Email → Email Routing) is free and built in. Route
  `hello@fuiss.com` to the existing Gmail address, then update the Contact section.
  Email Routing manages its own MX and TXT records; leave those to it rather than
  adding mail records by hand.
- If the domain was registered through Cloudflare Registrar, the nameservers are
  already correct — skip any nameserver change.

## 5. Subdomains — yes, and this is where they earn their keep

Any subdomain can point at any Vercel project, so the portfolio does not have to be
one. The useful shape:

- `fuiss.com` → the portfolio (apex; `www` redirects here)
- `atlas.fuiss.com` → Platform Atlas
- `hello@fuiss.com` → email forwarding (below)

Each is added in its **target project's** Domains settings and gets a `CNAME` at the
DNS host. Once `atlas.fuiss.com` exists, repoint the Platform Atlas case file's
`Live` link away from `platformatlas.vercel.app`.

## 6. Email on the domain

A domain lets the Contact section stop advertising a Gmail address. **Cloudflare
Email Routing is the natural pick here** since the domain already lives on
Cloudflare — free, and configured in the same dashboard. Alternatives:

- **ImprovMX** — CNAME-only forwarding, works with any registrar; has a free tier.
- **Zoho Mail** — one domain on the free plan, with webmail plus SMTP/IMAP.

Then change the Contact section's address.

## 7. Housekeeping once it is live

- The README's Ideas Backlog "custom domain" item is done.
- Check the OG card, canonicals, sitemap and JSON-LD all read `fuiss.com`.
- `frankamalubag.vercel.app` keeps serving (Vercel does not drop it), but every
  outward-facing reference should move to the new origin.
