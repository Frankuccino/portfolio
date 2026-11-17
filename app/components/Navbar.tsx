"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Certificates", href: "/#certificates" },
  { label: "Next", href: "/next" },
  { label: "Reading", href: "/reading" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

/** The home-page records, in order. Anchors on other routes are not sections. */
const SECTION_IDS = ["about", "skills", "projects", "certificates", "contact"];

/** The section a nav link points at, or null for a standalone page. */
const sectionOf = (href: string) =>
  href.startsWith("/#") ? href.slice(2) : null;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy, derived from scroll position rather than an
  // IntersectionObserver: the answer is deterministic and costs one pass over
  // five elements per scroll event, with no layout writes to force a reflow.
  // The current record is the last section whose top has crossed the upper
  // third of the viewport; at the bottom of the page the final record wins,
  // because the footer follows it rather than sitting inside it.
  useEffect(() => {
    if (pathname !== "/") return;

    const update = () => {
      const probe = window.scrollY + window.innerHeight * 0.35;
      let current: string | null = null;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top + window.scrollY <= probe) {
          current = id;
        }
      }
      const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 4;
      setActive(atBottom ? SECTION_IDS[SECTION_IDS.length - 1] : current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  const isActive = (href: string) => {
    const section = sectionOf(href);
    return pathname === href || (pathname === "/" && section !== null && section === active);
  };

  const shell = scrolled || open;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-200 ${
        shell
          ? "bg-[#0e0d16]/85 backdrop-blur-md border-b border-slate-800/60"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3">
        <Link
          href="/"
          className="text-sm font-semibold tracking-wide text-slate-100"
        >
          <span className="text-[#5f93a8]">/</span>Frankuccino
        </Link>

        <div className="hidden md:flex items-center gap-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs font-medium transition-colors ${
                isActive(link.href)
                  ? "text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          className="md:hidden p-2 rounded-md border border-slate-800 text-slate-300 hover:text-white transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {open ? (
        <div className="md:hidden border-t border-slate-800/60 bg-[#0e0d16]/95 px-4 py-3 flex flex-col gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`text-xs font-medium transition-colors ${
                isActive(link.href)
                  ? "text-white"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      ) : null}
    </header>
  );
}
