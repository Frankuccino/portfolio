import Link from "next/link";

/**
 * The missing record.
 *
 * Rendered by Next for any unmatched route, so it is the one page that has to
 * work without knowing what was asked for. It keeps the section language —
 * mono eyebrow, ruled index rows — and turns the status code into the
 * centrepiece rather than hiding it in a sentence.
 */
const destinations = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Certificates", href: "/#certificates" },
  { label: "Blog", href: "/blog" },
  { label: "What's next", href: "/next" },
  { label: "Reading plan", href: "/reading" },
  { label: "Contact", href: "/#contact" },
];

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center px-4 sm:px-6">
      <div className="mx-auto w-full max-w-3xl py-24">
        <p className="text-xs font-mono uppercase tracking-widest text-[#5f93a8]">
          {"//"} 404 — record not found
        </p>

        <h1 className="mt-4 text-7xl md:text-9xl font-black tracking-tighter font-display leading-none text-slate-100">
          404<span className="text-[#5f93a8]">.</span>
        </h1>

        <p className="mt-6 max-w-xl text-sm md:text-base text-slate-400 leading-relaxed">
          The record you asked for isn&apos;t in the index — it may have been
          renamed, moved, or never filed. The rest of the archive is intact.
        </p>

        <div className="mt-10 border-t border-slate-800/70">
          {destinations.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-baseline gap-4 px-2 py-3 border-b border-slate-800/70 hover:bg-slate-900/30 transition-colors"
            >
              <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                {item.label}
              </span>
              <span className="ml-auto text-xs font-mono text-slate-600 group-hover:text-slate-400 transition-colors">
                →
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-6 text-xs text-slate-400">
          <Link
            href="/"
            className="text-slate-300 hover:text-white transition-colors"
          >
            ← Back to the index
          </Link>
        </p>
      </div>
    </main>
  );
}
