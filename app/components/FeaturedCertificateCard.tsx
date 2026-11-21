import Image from "next/image";
import type { FeaturedCertificate } from "../data/portfolio";
import DocSwitcher from "./DocSwitcher";

/**
 * A featured credential.
 *
 * Server-rendered. The documents are stacked in one frame and the switcher is
 * an island that toggles `hidden`; the viewer island opens the visible document
 * from the `data-lightbox-*` attributes.
 */
export default function FeaturedCertificateCard({
  cert,
  id,
}: {
  cert: FeaturedCertificate;
  id: string;
}) {
  return (
    <div
      data-issuer={cert.issuer}
      className="mb-3 rounded-xl border border-[#3e6274]/50 bg-gradient-to-br from-[#3e6274]/15 via-slate-900/40 to-slate-900/40 backdrop-blur-md p-4 sm:p-5"
    >
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="lg:w-2/5 shrink-0 flex flex-col gap-2">
          {/* The certificate itself, with nothing drawn over it. Clicking opens
              the lightbox; the document switcher sits under the frame. */}
          <div
            id={`docs-${id}`}
            className="group relative aspect-[1400/806] overflow-hidden rounded-lg border border-slate-700 cursor-pointer"
          >
            {cert.images.map((doc, index) => (
              <Image
                key={doc.src}
                data-doc
                src={doc.src}
                alt={`${cert.title}: ${doc.label}`}
                width={doc.width}
                height={doc.height}
                sizes="(max-width: 1024px) 100vw, 40vw"
                hidden={index > 0}
                data-lightbox-src={doc.src}
                data-lightbox-title={cert.title}
                data-lightbox-subtitle={`${cert.issuer} · ${cert.completed}`}
                data-lightbox-width={doc.width}
                data-lightbox-height={doc.height}
                className="absolute inset-0 block h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            ))}
            <span className="absolute bottom-2 right-2 text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded-md bg-slate-950/85 border border-slate-700 text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Click to view
            </span>
          </div>

          {cert.images.length > 1 ? (
            <DocSwitcher id={`docs-${id}`} docs={cert.images} />
          ) : null}
        </div>

        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-md bg-[#3e6274]/25 border border-[#3e6274]/40 text-slate-100">
              {cert.badge}
            </span>
            <h3 className="text-lg md:text-xl font-bold text-white">
              {cert.title}
            </h3>
            <p className="text-sm text-slate-400">
              {cert.issuer} · {cert.completed}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              {cert.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {cert.stats.map((stat) => (
              <div
                key={stat.label}
                className="px-3 py-2 rounded-lg bg-slate-950/60 border border-slate-800/70"
              >
                <p className="text-[10px] uppercase tracking-wider text-slate-400">
                  {stat.label}
                </p>
                <p
                  className={
                    stat.mono
                      ? "text-[11px] font-mono text-slate-300"
                      : "text-sm font-semibold text-slate-100"
                  }
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
