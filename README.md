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
- `About` — engineering focus and applied AI engineering context, the NVIDIA Developer Pass, and a filterable virtual library of the books I own (`app/data/books.ts`).
- `Skills` — grouped skill matrix (languages, frontend, backend, AI engineering, cloud, practices).
- `Projects` — shipped systems with stack, links, and architectural highlights.
- `Certificates` — two featured credentials (DataCamp AI associate, KodeGo full-stack bootcamp), course certificates, digital badges and passes, and program memberships.
- `Blog` — latest posts preview; full archive at `/blog`.
- `Contact` — email, LinkedIn, and GitHub channels.

Site chrome (navbar, footer, grain background) lives in `app/layout.tsx`, so every route shares it.

## What's Next

`/next` is a forward-looking page: the Microsoft AI & ML Engineering Professional Certificate, then Stanford CS221. Content lives in `app/data/roadmap.ts`.

## Blog

Posts are plain markdown files with frontmatter (`title`, `date`, `excerpt`, `tags`) in `content/posts/`. Add a file, and both `/blog` and `/blog/[slug]` pick it up at build time.

### Added Ideas to roadmap:
- Implement the resume access with an OTP Verification via their email and send the resume via email.
