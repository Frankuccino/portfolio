# Portfolio Project — Frank Angelo A. Malubag

Welcome to the repository for my personal developer portfolio, built with **Next.js**, **Tailwind CSS**, and high-performance WebGL/GPU shaders.

---

## Architecture & Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Visual Shaders:** `@paper-design/shaders-react` (`GrainGradient`)
- **Typography:** Geist and Geist Mono, wired into Tailwind's `--font-sans` / `--font-mono` tokens (`@theme` in `app/globals.css`), plus Bricolage Grotesque 800 as `--font-display`. The display face is applied by **class** (`.font-display`), not by tag: most `h2`s on the site are small mono eyebrow labels, so a tag rule would have set them in a display grotesque. The footer wordmark is glyph geometry, not live text.
- **Blog:** Markdown posts in `content/posts/`, rendered by a dependency-free React markdown engine (`app/lib/markdown.tsx`).

---

## Project Structure

```text
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── sitemap.ts                 # /sitemap.xml
│   ├── robots.ts                 # /robots.txt
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── next/
│   │   └── page.tsx
│   ├── reading/
│   │   └── page.tsx
│   ├── not-found.tsx                # 404 — "record not found"
│   ├── icon.tsx                     # app/icon → <link rel="icon">
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── VirtualLibrary.tsx
│   │   ├── ReadingPlan.tsx
│   │   ├── ReadingPlanExplorer.tsx
│   │   ├── BookMapModal.tsx
│   │   ├── PromptBlock.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Certificates.tsx
│   │   ├── FeaturedCertificateCard.tsx
│   │   ├── CertificateCard.tsx
│   │   ├── CertificateLightbox.tsx
│   │   ├── BadgeCard.tsx
│   │   ├── BlogSection.tsx
│   │   ├── BlogIndex.tsx
│   │   ├── ScrollProgress.tsx
│   │   ├── TrackClose.tsx
│   │   ├── NameBorder.tsx
│   │   ├── FooterArt.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── SectionHeading.tsx
│   │   ├── HeroFocusDeck.tsx
│   │   └── HeroFocusCard.tsx
│   ├── data/
│   │   ├── portfolio.ts
│   │   ├── books.ts
│   │   ├── readingPlan.ts
│   │   └── roadmap.ts
│   └── lib/
│       ├── posts.ts
│       ├── postMeta.ts
│       ├── markdown.tsx
│       └── covers.ts
├── content/
│   └── posts/
├── public/
│   ├── certificates/            # certificate artwork for the showcase
│   ├── badges/                  # digital badges and passes
│   └── og-image.png             # 1200×630 social-share card
└── README.md
```

## Core Sections

- `Hero` — name, role, certification badge, tech stack badges, and contact channels.
- `About` — engineering focus and applied AI engineering context, the NVIDIA Developer Pass, an interactive bookshelf of the books I own (`app/data/books.ts`), and the priority reading order for the AI engineering stack (`app/data/readingPlan.ts`).
- `Skills` — featured AI Engineering and LLM Tools & Agents panels first, then the supporting groups (languages, frontend, backend, architecture & cloud, ML & data, practices). Every group carries a `summary` saying what it means in practice, not just a chip list.
- `Projects` — shipped systems with stack, links, and architectural highlights.
- `Certificates` — two featured credentials (DataCamp AI associate, KodeGo full-stack bootcamp), course certificates, digital badges and passes, and program memberships.
- `Blog` — latest posts preview; full archive at `/blog`.
- `Contact` — email, LinkedIn, and GitHub channels.

Site chrome (navbar, footer, grain background) lives in `app/layout.tsx`, so every route shares it.

The footer is a full-viewport closing screen (`min-h-screen`) and shares the hero's measure: full-bleed with `px-8 md:px-20` and no `max-width`. That last part matters — the hero carries `max-w-8xl`, which does not exist in this Tailwind setup and computes to `none`, so putting any max-width on the footer is what made it narrower than the section it closes. Order is columns, then `NameBorder`, then the copyright.

The footer has its own field. `.footer-bg` paints a charcoal-to-dark-teal gradient (`100deg`, so the shift runs left to right) in the grain's hue — `rgba(62,98,116,…)` blooming high on the right, ending at `#1e3d47` — kept deliberately low. It masks itself to transparent over the top 180px so the boundary with the page above is a blend rather than a seam. The footer deliberately does not set `overflow-hidden`. Column eyebrows are `// Navigate` and `// Contact`, written as `{"// Navigate"}` — a bare `//` at the start of JSX text parses as a comment and trips `react/jsx-no-comment-textnodes`.

`NameBorder.tsx` is the closing wordmark, and it is the one piece of the site built as real glyph geometry rather than text. Each letter of `Frank Angelo Malubag` is an SVG `<path>` taken from Geist Mono 400's own outlines, laid out with the font's advances and kerning at 100 units/em (baseline y=100), then frozen into a `GLYPHS` array. The reference this is modelled on does the same thing, and it buys three things a live `<text>` cannot: the gradient is a **fill**, so it covers the glyph bodies (`-webkit-text-stroke` takes no gradient at all); the glyphs no longer depend on the webfont arriving, so the word cannot swap face or fall back in a screenshot; and each letter is addressable, so per-glyph effects are possible later. The face is mono — the reference uses a mono for this exact element, and it matches the `//` eyebrows.

The fill gradient is `userSpaceOnUse` from x=0 to x=1200. That is deliberate: with the default `objectBoundingBox` each `<path>` gets its own box, so the gradient restarts inside every letter and the word reads as uniform rather than lit. It runs dim at both ends (`rgba(150,185,200,…)` at 0.48–0.58 alpha) and lifts to one light band between the 38% and 47% stops. A `feDropShadow` filter supplies the halo.

That band travels. On scroll the gradient is translated with `gradientTransform`, so the light sweeps left to right as the footer comes into view — one attribute write per scroll event, and the band keeps its width because the whole ramp moves with it. The gradient is a flat dim field with one narrow bright stop, not a broad ramp: a wide ramp only shifts the word's overall brightness as it moves, so the travel is invisible, whereas a tight spot reads as a glow visiting each letter in turn.

The sweep is anchored to the *ink*, not the SVG's box. The outlines' cap height sits at y=29 of the 120-high viewBox, so the letters' top edge is that far below the box; anchoring to the box would start the band roughly a letter and a half further along, after the name was already on screen. With the ink anchor the progress clamps at 0 until the first letter enters the viewport, so the glow waits on the F and reaches the final g as the name settles fully into view. It is written from the handler rather than through rAF, because a throttled tab can starve rAF and freeze the band.

The sweep is deliberately **not** gated on `prefers-reduced-motion`, unlike the reveal. The reveal is an automatic fade, which is what that setting exists to suppress; the sweep is scroll-linked, so the reader is already moving the page and the glow only follows, and the wordmark is decorative (`aria-hidden`). Gating it meant anyone with Reduce Motion enabled saw a static centred band and never saw the effect — the failure mode being that a media query intended as an accessibility aid silently disabled a feature. No-JS still gets the static band.

The sign-off sits close under the columns (the grid carries no bottom padding, the name wrapper is `mt-4`, `.name-border` padding `0.5rem 0 0.75rem` — 59px between the last column line and the ink at the wide measure, 32px on a 390px phone), with the copyright directly beneath it as the caption. The footer is `min-h-screen`, so on a viewport shorter than its content it grows past one screen rather than clipping.

`FooterArt.tsx` is the closing landscape, and it fills the whole footer rather than a band at the bottom. The painting is `public/footer-monet.webp` (1440x960, quality 70 — 238KB, down from a 532KB JPEG). `.footer-art` is `position: absolute; inset: 0` over `.footer-bg` and under the content, so it covers the entire footer behind the columns and the wordmark. It carries four background layers: a dimming pass that seats the text, the field's own teal laid over the painting, a radial falloff so the rectangle never shows, and the painting itself (`cover`, `center 60%`, so the water and the sun's reflection survive the crop). The gradient is a `mask-image` rather than a background stop: transparent at the top, opaque at the bottom, so the painting's opacity is 1 at the bottom edge and ramps down to nothing above — which is what keeps it from competing with the text. Both the standard and `-webkit-` properties are set. The painting is a binary asset, so it is the one image request the footer adds. It ships as WebP because it is the largest request on every route; the JPEG it replaced was 532KB.

The wordmark must be a positioned descendant (it carries `relative z-10`). `.footer-bg` is `position: absolute`, which paints in the positioned layer above static in-flow content, so a static wordmark is painted *over* by the footer's own gradient and disappears entirely while the columns survive — they only show because their wrapper is `relative`.

The reveal adds `is-off` on mount and removes it once the name is *fully* on screen — the bottom edge of the last letter, not the top of the first. The observer runs at `threshold: 1`, backed by a scroll listener and a 500ms position poll, so it fires on scroll, on a page loaded already scrolled there, or not at all in a quirky browser. All three check the same `fullyVisible()` predicate rather than a timer: an unconditional timeout would reveal the name while the footer was still thousands of pixels below the fold and spend the whole fade before the reader arrived. The transition is `opacity 3s cubic-bezier(0.8, 0, 0.2, 1)` — `ease` reads as nearly linear over this opacity range, so the curve is spelled out to hold back hard at both ends: at a tenth of the duration only a few percent of the fade has happened, and the last tenth delivers the last few. `prefers-reduced-motion` skips the hiding so it renders in its finished state, and with no JS it is simply visible. It replaced an earlier full-viewport sign-off section with a scroll-driven outline-to-glow reveal, which was removed for being too loud. Earlier attempts worth recording: an outline-one-half-plus-gradient split (stock name-banner formula), a 400/700 weight split inside one line (lopsided), all-caps under a chrome gradient (athletic/esports), a single full-width line under `scaleY`, a two-line full-viewport glow reveal, an arched `textPath` glitch masthead with channel-shear keyframes and monospace fragments, a receding `rotateX` floor grid, and a `padding` shorthand on the name that silently overrode the gutter utilities and pinned the text to x=0.

## SEO & Social Preview

The root layout sets `metadataBase` from `NEXT_PUBLIC_SITE_URL` (falling back to `https://localhost:3000` in development) and emits a `summary_large_image` Twitter card alongside the Open Graph tags, all pointing at `public/og-image.png` (1200×630). `app/lib/siteUrl.ts` is the single source for that origin; it upgrades any `http://` scheme to `https://` because X refuses insecure card images. `app/sitemap.ts` lists the static routes plus every blog post; `app/robots.ts` points crawlers at it. Copy `.env.example` to `.env.local` and set the real origin for production.

Every routable page declares `alternates.canonical` through the `canonical()` helper, and the blog post template sets its own `openGraph`/`twitter` block (`type: "article"`, `publishedTime`, tags) so a shared post carries its own title and excerpt rather than the site's. The root layout also emits a schema.org `Person` record whose `sameAs` links the site to the GitHub and LinkedIn profiles — that is what lets a search engine treat them as one entity.

Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (from a Search Console **URL prefix** property, HTML-tag method) to add the verification tag; it is omitted while unset.

## Virtual Library

The `About` section ends in an interactive bookshelf built from `app/data/books.ts` (42 titles, split technical/personal). Books stand as spines; hovering or keyboard-focusing one swings its front cover open.

- Cover art is hotlinked from the [Open Library Covers API](https://openlibrary.org/dev/docs/api/covers) by `coverId` — the form Open Library asks for, and the one exempt from their 100-requests-per-5-minutes ISBN rate limit.
- The spine carries the cover art behind a blur, so it reads as a spine rather than a crop of the front cover.
- Titles wrap into a second column instead of truncating; `spineTitle` overrides the rendering where a shorter form is more faithful.
- Seven titles have no cover in the repository (`learning-domain-driven-design`, `clean-code-cookbook`, `how-highly-effective-people-speak`, `llm-engineers-handbook`, `architecting-ai-software-systems`, `high-performance-python`, `llmops`) and keep the typographic cover.
- Shelves are balanced by a `ResizeObserver` plus a window-resize listener, so the spine count tracks the column width.

## Reading Order

Below the library, `ReadingPlan.tsx` renders the priority order for the AI engineering stack from `app/data/readingPlan.ts`: six stages (AI & ML Engineering Core, LLM Applications & Operations, Architecture & Data Platforms, Craft & Quality, Reference, Forward Deployed: People) plus a parallel domain elective, each with its objective, one band per stage with its books in a responsive grid, page counts and hour estimates. It sits in the same `ReadingPlanLayout` as the `/reading` page, so the summary gets the sticky "on this page" rail and the active band highlights as you scroll; its own heading is passed as the layout's `header` slot, which spans the full block so the rail starts level with the first band rather than beside the heading. The same plan, with pacing tables and reading rules, lives in the vault at `Readings/AI Engineering Reading Plan.md`, and the method behind it at `Readings/How to Read These Books.md`.

## What's Next

`/next` is a forward-looking page: six steps in three phases. The foundation first (the Microsoft AI & ML Engineering Professional Certificate, then the DeepLearning.AI Machine Learning Specialization), then the platform and the applied layer (the AWS Cloud Solutions Architect and AWS Generative AI Developer Advanced Professional Certificates), then LangChain Academy and Stanford CS221. Content lives in `app/data/roadmap.ts`. Every step carries an `order` phase label, and the page closes with the shared `TrackClose` "where this fits" block.

## Reading Plan

`/reading` is the long-form version of the `About` block. It opens with `ReadingRationale`: the case for the books over the certificate layer, the misuse risk, and the read protocol — preview, read actively, retrieve, space the review, apply, sleep — with the session standard, its guardrails, and the learning-science mechanisms it is built on. `ReadingPlanExplorer` renders a clickable index — six stages plus a parallel domain elective, one card per book, each with its order, page count, hour estimate, one-line hook, and minimum daily commitment. On the wide measure the whole page sits in one centred block: a reading column on the left holding every prose block and every card, and `ReadingPlanLayout`'s sticky rail in the right-hand column — an "on this page" list of the seven blocks with a position counter, and beneath it a note panel that always names the block currently on screen: its objective, page and hour cost, and reading instruction. Because the block is a single grid rather than a rail appended to a narrower container, every left and right edge lines up and nothing protrudes past the centred measure. A scroll-spy (the last stage whose heading has crossed a probe line a third down the viewport) drives both the rail's active row and a fill-and-wash highlight on the active stage's own header; clicking a rail row jumps to that stage with a scroll margin that clears the fixed nav. Below the wide breakpoint the rail is replaced by a horizontally scrolling chip row carrying the same active state. The same layout wraps the `About` page's reading-order summary, so its bands highlight as they pass; that section's `overflow-hidden` had to become `overflow-x-clip`, because a clipping ancestor is a scroll container and pins `position: sticky` to itself instead of the viewport. Each stage carries an index chip and a left accent rule binding its cards to it, and priority is colour-coded so the top tier reads at a glance. Books in the Forward Deployed stage also carry their sub-track (Intelligence Augmentation, Communication & Stakeholders, Customer Discovery, Sensemaking & Investigation, or Execution & Adaptability) and a priority rating; the elective carries an `E` chip instead of a number because it sits alongside the sequence rather than after it. Hovering a card opens `BookCoverPreview`, a portal panel showing the cover — hotlinked from the Open Library Covers API, keyed on CoverID since the ISBN key is rate-limited per IP, and for the titles Open Library has no art for, from Google Books, keyed on the volume id — with a typographic tile for the one title neither catalogue carries. The panel is pinned to its card and re-measured on scroll, so it tracks the card instead of closing; it closes when the card leaves the viewport or the pointer leaves the card. Clicking a card opens `BookMapModal`, a portal dialog with that book's dedicated map: the focus chapters (tagged `focus` / `skim` / `reference`, numbered so the reader can see where they are), the hands-on work to do while reading, the closed-book stress-test questions, and a ready-to-paste reinforcement prompt (`PromptBlock`, with a copy button) to hand an LLM alongside your notes. Each book carries a timing model — a minimum daily commitment, the days to finish, and a consolidation budget of 30 min recall per focus chapter + 1 h LLM reinforcement + 2 h stage capstone. The modal supports Escape, backdrop click, and prev/next (arrow keys too), and locks body scroll while open. The page closes with the knowledge stress-test protocol and a per-stage capstone. Content lives in `app/data/readingPlan.ts`; the same plan with pacing tables lives in the vault at `Readings/AI Engineering Reading Plan.md`, the method with its references at `Readings/How to Read These Books.md`, and the verbatim chapter lists in `Readings/AI Engineering Book TOCs.md`.

## Site Chrome

The six home sections share one language — mono eyebrows, `// 0N.` indices, hairlines, tabular numerals, one teal accent — and differ in **structure**, not palette: About is a shelf plus a catalogue card, Skills a ruled spec sheet with accordions, Projects a domain-filtered case-file index, Certificates an issuer-filtered ledger, Blog a ruled index, Contact a single letter sheet. Separation is systemic rather than per-section: the backgrounds alternate (`slate-950` opaque, `slate-950/40`, transparent) and `main > section { border-top: … }` gives every current *and future* section its hairline in one line.

`ScrollProgress` is mounted once in the layout as a 2px rule under the nav. It hides itself when the page fits the viewport and writes `transform` straight from the scroll handler instead of through rAF, because a throttled tab starves rAF and freezes the bar. The navbar's scroll-spy is likewise scroll-position derived rather than `IntersectionObserver`: it takes the last section whose top has crossed a probe at 35% of the viewport, which is deterministic and works on a page loaded already scrolled. `SECTION_IDS` deliberately excludes `/blog`, `/next` and `/reading` — they are linked but never numbered, because numbering eight links against five sections creates two competing numbering systems.

`BlogIndex` is the one blog surface: a client component taking `posts`, an optional `limit` (the home section passes `4`) and `showArchiveLink` (the archive passes `false`). `/blog` renders the same ruled rows as the home section instead of a second card treatment, and `BlogCard` was deleted with its last caller rather than left as an orphan. `app/lib/postMeta.ts` holds the pure `formatDate`/`readingMinutes` helpers so a client component never pulls `node:fs` in through `lib/posts.ts`; `posts.ts` re-exports them.

`not-found.tsx` is the 404, framed as a record lookup that failed rather than a dead end. `app/icon.tsx` answers `<link rel="icon">` only — the conventional `/favicon.ico` path is answered separately by `public/favicon.ico`.

## Colour & Print

Body copy is `text-slate-400` (7.59:1 on the page background) and the accent `#5f93a8` measures 5.77:1. `text-slate-500` was retired from the newer surfaces: it measured 4.09:1, under AA. An accent `:focus-visible` override is declared in `globals.css`, but Tailwind's preflight ring currently outranks it, so the ring renders slate-200. A ring exists and is clearly visible; only its colour is off.

`@media print` exists because the site is a dark textured screen. Printing yields one ink colour (`#101828`) on white, no grain canvas, no footer art, no nav or skip link, and each section starting on its own page. It wins by blanket override rather than by token, which is the right call for exactly one theme and the wrong call the moment a second appears.

## Blog

Posts are plain markdown files with frontmatter (`title`, `date`, `excerpt`, `tags`) in `content/posts/`. Add a file, and both `/blog` and `/blog/[slug]` pick it up at build time. `lib/posts.ts` reads them with `node:fs`; the pure date/reading-time helpers live in `lib/postMeta.ts` so client components can import them without dragging `node:fs` into the browser bundle.

## Ideas Backlog

Open, and deliberately not built yet:

- **Project imagery.** The six case files carry no visuals; a dedicated pass would add a plate per project.
- **A custom domain — `fuiss.com`, live.** `www.fuiss.com` is the canonical host (Vercel redirects the apex to it) and `NEXT_PUBLIC_SITE_URL` is set to match. `docs/custom-domain.md` carries the runbook and the remaining steps: Search Console Domain property, Email Routing, project subdomains.
- **business-atlas.** `Frankuccino/business-atlas` (69 entries across 14 domains) is not among the case files.
- **A generated OG route.** `@vercel/og` would make the card live data; at four posts a committed raster is the better call.
- **Accent focus ring.** The override in `globals.css` loses the cascade to Tailwind's preflight, so the ring renders slate-200.
- **Search Console.** The verification hook and the sitemap exist; the property itself has to be created and submitted against a URL-prefix property, since DNS verification is impossible on a hosting subdomain.