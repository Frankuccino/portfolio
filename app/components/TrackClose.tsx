import Link from "next/link";

/**
 * The close of a study page: where it sits in the track.
 *
 * `/reading`, `/next` and the About reading order are three views of one
 * system — the plan, the credentials on top of it, and the notes that come out
 * of it. Without this the reader reaches the end of a page and has to work out
 * the next step from the navbar, which is the one place they have already
 * ruled out.
 *
 * Links are quiet on purpose. These pages are read, not browsed, so the close
 * offers the next step rather than shouting over the content above it.
 */
export default function TrackClose({
  note,
  links,
}: {
  note: string;
  links: { label: string; href: string }[];
}) {
  return (
    <section className="border-t border-slate-800/60 pt-8 mt-14 space-y-4">
      <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">
        {"//"} Where this fits
      </h2>
      <p className="max-w-2xl text-sm md:text-base text-slate-400 leading-relaxed">
        {note}
      </p>
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-xs font-medium text-slate-300 hover:text-white transition-colors"
          >
            {link.label}{" "}
            <span className="text-slate-400 transition-colors">→</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
