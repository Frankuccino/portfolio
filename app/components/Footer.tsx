import Link from "next/link";
import FooterArt from "./FooterArt";
import NameBorder from "./NameBorder";

const nav = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Certificates", href: "/#certificates" },
  { label: "Next", href: "/next" },
  { label: "Reading", href: "/reading" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

const channels = [
  {
    label: "Email",
    value: "frankamalubag@gmail.com",
    href: "mailto:frankamalubag@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "in/frank-angelo-malubag",
    href: "https://www.linkedin.com/in/frank-angelo-malubag/",
  },
  { label: "GitHub", value: "@Frankuccino", href: "https://github.com/Frankuccino" },
];

/** Eyebrow heading shared by the footer's two link columns. */
function ColumnHeading({ children }: { children: string }) {
  return (
    <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
      {children}
    </p>
  );
}

export default function Footer() {
  return (
    <footer className="relative min-h-screen border-t border-white/5">
      {/* The footer's own field: a charcoal-to-dark-teal gradient, the grain's
          hue kept low. It sits behind everything; the footer itself carries no
          `overflow-hidden`, so nothing clips the wordmark. */}
      <div className="footer-bg" aria-hidden="true" />

      {/* The closing landscape, laid over the field and under the content. It
          fills the whole footer rather than a band at the bottom, and is
          masked so its opacity ramps from nothing at the top to full at the
          bottom edge — the text sits where the painting has faded out. */}
      <FooterArt />

      {/* Same measure as the hero: full-bleed with the hero's gutter, no
          max-width. The hero's `max-w-8xl` does not exist in this Tailwind
          setup and computes to `none`, so a max-width here would be the thing
          making the footer narrower than the section it closes. */}
      <div className="relative z-10 flex min-h-screen flex-col px-8 md:px-20">
        {/* Identity and the two link columns. The name carries the hierarchy;
            the links are secondary, so they are smaller and dimmer but still
            above body-text contrast. */}
        <div className="grid gap-10 pt-16 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-[#6f9ab5]">
              {"// Dumaguete City, Philippines"}
            </p>
            <p className="mt-3 text-xl font-bold tracking-tight text-slate-100">
              Frank Angelo Malubag
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Software Engineer · AI Engineer
            </p>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-slate-400">
              Working remotely across time zones on distributed systems and
              applied AI engineering: backend, LLM applications, and the
              tooling around them.
            </p>
            <Link
              href="mailto:frankamalubag@gmail.com"
              className="mt-5 inline-flex items-center gap-2 text-[11px] font-medium px-3 py-1.5 rounded-md border border-[#3e6274]/50 text-slate-200 hover:bg-[#3e6274]/20 hover:text-white transition-colors"
            >
              <span>Start a conversation</span>
              <span className="text-slate-400">↗</span>
            </Link>
          </div>

          <nav aria-label="Footer">
            <ColumnHeading>{"// Navigate"}</ColumnHeading>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <ColumnHeading>{"// Contact"}</ColumnHeading>
            <ul className="mt-4 space-y-4">
              {channels.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    target={channel.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                      {channel.label}
                    </span>
                    <span className="mt-0.5 block text-xs text-slate-300 break-all hover:text-white transition-colors">
                      {channel.value}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[11px] leading-snug text-slate-400">
              Usually replies within a day.
            </p>
          </div>
        </div>

        {/* Sits close under the columns; the leftover height drops below the
            sign-off instead of above it, so the name reads as the closer
            rather than floating in an empty band. */}
        <div className="mt-4">
          <NameBorder />
        </div>

        {/* The copyright is the caption to the sign-off, so it sits directly
            under the glyphs. */}
        <div className="mt-5 flex flex-col-reverse sm:flex-row items-center justify-between gap-1.5 py-3 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Frank Angelo A. Malubag</p>
        </div>
      </div>
    </footer>
  );
}
