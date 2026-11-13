# Portfolio Project — Frank Angelo A. Malubag

Welcome to the repository for my personal developer portfolio, built with **Next.js**, **Tailwind CSS**, and high-performance WebGL/GPU shaders.

---

## Architecture & Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Visual Shaders:** `@paper-design/shaders-react` (`GrainGradient`)
- **Typography:** Custom CSS metallic text gradients utilizing hardware-accelerated text clipping.
- **Blog:** Markdown posts in `content/posts/`, rendered by a dependency-free React markdown engine (`app/lib/markdown.tsx`).

---

## Project Structure

```text
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── next/
│   │   └── page.tsx
│   ├── reading/
│   │   └── page.tsx
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
│   │   ├── BlogCard.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── SectionHeading.tsx
│   │   ├── ResumeModal.tsx
│   │   ├── HeroFocusDeck.tsx
│   │   └── HeroFocusCard.tsx
│   ├── data/
│   │   ├── portfolio.ts
│   │   ├── books.ts
│   │   ├── readingPlan.ts
│   │   └── roadmap.ts
│   └── lib/
│       ├── posts.ts
│       └── markdown.tsx
├── content/
│   └── posts/
├── public/
│   ├── certificates/            # certificate artwork for the showcase
│   ├── badges/                  # digital badges and passes
│   └── Resume_Frank_Angelo_Malubag.pdf
└── README.md
```

## Core Sections

- `Hero` — name, role, certification badge, tech stack badges, resume modal.
- `About` — engineering focus and applied AI engineering context, the NVIDIA Developer Pass, an interactive bookshelf of the books I own (`app/data/books.ts`), and the priority reading order for the AI engineering stack (`app/data/readingPlan.ts`).
- `Skills` — featured AI Engineering and LLM Tools & Agents panels first, then the supporting groups (languages, frontend, backend, architecture & cloud, ML & data, practices). Every group carries a `summary` saying what it means in practice, not just a chip list.
- `Projects` — shipped systems with stack, links, and architectural highlights.
- `Certificates` — two featured credentials (DataCamp AI associate, KodeGo full-stack bootcamp), course certificates, digital badges and passes, and program memberships.
- `Blog` — latest posts preview; full archive at `/blog`.
- `Contact` — email, LinkedIn, and GitHub channels.

Site chrome (navbar, footer, grain background) lives in `app/layout.tsx`, so every route shares it.

## Virtual Library

The `About` section ends in an interactive bookshelf built from `app/data/books.ts` (42 titles, split technical/personal). Books stand as spines; hovering or keyboard-focusing one swings its front cover open.

- Cover art is hotlinked from the [Open Library Covers API](https://openlibrary.org/dev/docs/api/covers) by `coverId` — the form Open Library asks for, and the one exempt from their 100-requests-per-5-minutes ISBN rate limit.
- The spine carries the cover art behind a blur, so it reads as a spine rather than a crop of the front cover.
- Titles wrap into a second column instead of truncating; `spineTitle` overrides the rendering where a shorter form is more faithful.
- Seven titles have no cover in the repository (`learning-domain-driven-design`, `clean-code-cookbook`, `how-highly-effective-people-speak`, `llm-engineers-handbook`, `architecting-ai-software-systems`, `high-performance-python`, `llmops`) and keep the typographic cover.
- Shelves are balanced by a `ResizeObserver` plus a window-resize listener, so the spine count tracks the column width.

## Reading Order

Below the library, `ReadingPlan.tsx` renders the priority order for the AI engineering stack from `app/data/readingPlan.ts`: four stages (AI Engineering Core, Production & Architecture, Craft & Reference, Forward Deployed Foundations), each with its objective, seventeen books, with page counts and hour estimates. The same plan, with pacing tables and reading rules, lives in the vault at `Readings/AI Engineering Reading Plan.md`, and the method behind it at `Readings/How to Read These Books.md`.

## What's Next

`/next` is a forward-looking page: the Microsoft AI & ML Engineering Professional Certificate, then Stanford CS221. Content lives in `app/data/roadmap.ts`.

## Reading Plan

`/reading` is the long-form version of the `About` block. It opens with `ReadingRationale`: the case for the books over the certificate layer, the misuse risk, and the read protocol — preview, read actively, retrieve, space the review, apply, sleep — with the session standard, its guardrails, and the learning-science mechanisms it is built on. `ReadingPlanExplorer` renders a clickable index — four stages, seventeen cards, each with its order, page count, hour estimate, one-line hook, and minimum daily commitment. Books in the Forward Deployed stage also carry their sub-track (Intelligence Augmentation, Customer Discovery, or Execution & Adaptability) and a priority rating. Clicking a card opens `BookMapModal`, a portal dialog with that book's dedicated map: the focus chapters (tagged `focus` / `skim` / `reference`), the hands-on work to do while reading, the closed-book stress-test questions, and a ready-to-paste reinforcement prompt (`PromptBlock`, with a copy button) to hand an LLM alongside your notes. Each book carries a timing model — a minimum daily commitment, the days to finish, and a consolidation budget of 30 min recall per focus chapter + 1 h LLM reinforcement + 2 h stage capstone. The modal supports Escape, backdrop click, and prev/next (arrow keys too), and locks body scroll while open. The page closes with the knowledge stress-test protocol and a per-stage capstone. Content lives in `app/data/readingPlan.ts`; the same plan with pacing tables lives in the vault at `Readings/AI Engineering Reading Plan.md`, the method with its references at `Readings/How to Read These Books.md`, and the verbatim chapter lists in `Readings/AI Engineering Book TOCs.md`.

## Blog

Posts are plain markdown files with frontmatter (`title`, `date`, `excerpt`, `tags`) in `content/posts/`. Add a file, and both `/blog` and `/blog/[slug]` pick it up at build time.

### Added Ideas to roadmap:
- Implement the resume access with an OTP Verification via their email and send the resume via email.
