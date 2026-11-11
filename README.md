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
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Certificates.tsx
│   │   ├── BlogSection.tsx
│   │   ├── BlogCard.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── SectionHeading.tsx
│   │   ├── ResumeModal.tsx
│   │   ├── HeroFocusDeck.tsx
│   │   └── HeroFocusCard.tsx
│   ├── data/
│   │   └── portfolio.ts
│   └── lib/
│       ├── posts.ts
│       └── markdown.tsx
├── content/
│   └── posts/
├── public/
│   ├── certificates/            # certificate artwork for the showcase
│   └── Resume_Frank_Angelo_Malubag.pdf
└── README.md
```

## Core Sections

- `Hero` — name, role, certification badge, tech stack badges, resume modal.
- `About` — engineering focus and applied AI engineering context.
- `Skills` — grouped skill matrix (languages, frontend, backend, AI engineering, cloud, practices).
- `Projects` — shipped systems with stack, links, and architectural highlights.
- `Certificates` — DataCamp Associate certification, course certificates, and program memberships.
- `Blog` — latest posts preview; full archive at `/blog`.
- `Contact` — email, LinkedIn, and GitHub channels.

## Blog

Posts are plain markdown files with frontmatter (`title`, `date`, `excerpt`, `tags`) in `content/posts/`. Add a file, and both `/blog` and `/blog/[slug]` pick it up at build time.

### Added Ideas to roadmap:
- Implement the resume access with an OTP Verification via their email and send the resume via email.
