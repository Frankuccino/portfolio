import Link from "next/link";

const socials = [
  { label: "GitHub", href: "https://github.com/Frankuccino" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/frank-angelo-malubag/" },
  { label: "Email", href: "mailto:frankamalubag@gmail.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/60 bg-slate-950/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
      <div className="border-t border-slate-800/40 py-4 text-center text-[11px] text-slate-600">
        <Link href="/" className="hover:text-slate-400 transition-colors">
          © {new Date().getFullYear()} Frank Angelo A. Malubag
        </Link>{" "}
        · Built with Next.js & Tailwind CSS
      </div>
    </footer>
  );
}
