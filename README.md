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
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── VirtualLibrary.tsx
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
- `About` — engineering focus and applied AI engineering context, the NVIDIA Developer Pass, and an interactive bookshelf of the books I own (`app/data/books.ts`).
- `Skills` — grouped skill matrix (languages, frontend, backend, AI engineering, cloud, practices).
- `Projects` — shipped systems with stack, links, and architectural highlights.
- `Certificates` — two featured credentials (DataCamp AI associate, KodeGo full-stack bootcamp), course certificates, digital badges and passes, and program memberships.
- `Blog` — latest posts preview; full archive at `/blog`.
- `Contact` — email, LinkedIn, and GitHub channels.

Site chrome (navbar, footer, grain background) lives in `app/layout.tsx`, so every route shares it.

## Virtual Library

The `About` section ends in an interactive bookshelf built from `app/data/books.ts` (33 titles, split technical/personal). Books stand as spines; hovering or keyboard-focusing one swings its front cover open.

- Cover art is hotlinked from the [Open Library Covers API](https://openlibrary.org/dev/docs/api/covers) by `coverId` — the form Open Library asks for, and the one exempt from their 100-requests-per-5-minutes ISBN rate limit.
- The spine carries the cover art behind a blur, so it reads as a spine rather than a crop of the front cover.
- Titles wrap into a second column instead of truncating; `spineTitle` overrides the rendering where a shorter form is more faithful.
- Three titles have no cover in the repository (`learning-domain-driven-design`, `clean-code-cookbook`, `how-highly-effective-people-speak`) and keep the typographic cover.

## What's Next

`/next` is a forward-looking page: the Microsoft AI & ML Engineering Professional Certificate, then Stanford CS221. Content lives in `app/data/roadmap.ts`.

## Blog

Posts are plain markdown files with frontmatter (`title`, `date`, `excerpt`, `tags`) in `content/posts/`. Add a file, and both `/blog` and `/blog/[slug]` pick it up at build time.

### Added Ideas to roadmap:
- Implement the resume access with an OTP Verification via their email and send the resume via email.
