import Link from "next/link";

const socials = [
  { label: "GitHub", href: "https://github.com/Frankuccino" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/frank-angelo-malubag/" },
  { label: "Email", href: "mailto:frankamalubag@gmail.com" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-800/60 bg-slate-950/60">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 pt-10 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-200">
            Frank Angelo A. Malubag
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Software Engineer · AI Engineer — Dumaguete City, Philippines
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-400">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>

      {/* Ghost name — a full-width watermark band between the links and the
          copyright line, so nothing overlaps or clips it */}
      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden">
        <div className="ghost-name text-center">Frank Angelo A. Malubag</div>
      </div>

      <div className="relative z-10 border-t border-slate-800/40 bg-slate-950/85 backdrop-blur-sm py-4 text-center text-[11px] text-slate-500">
        <Link href="/" className="hover:text-slate-400 transition-colors">
          © {new Date().getFullYear()} Frank Angelo A. Malubag
        </Link>{" "}
        · Built with Next.js & Tailwind CSS
      </div>
    </footer>
  );
}
