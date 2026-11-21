import Image from "next/image";
import type { Certificate } from "../data/portfolio";

type CertificateWithImage = Certificate & { image: string };

export type LightboxImage = {
  src: string;
  title: string;
  subtitle: string;
  width?: number;
  height?: number;
};

const CERT_WIDTH = 1400;
const CERT_HEIGHT = 806;

/**
 * A course certificate plate.
 *
 * Server-rendered markup. The viewer island reads the `data-lightbox-*`
 * attributes to open the document and `data-preview-src` for the hover zoom, so
 * the card itself ships no JavaScript.
 */
export default function CertificateCard({
  cert,
}: {
  cert: CertificateWithImage;
}) {
  return (
    <article
      data-issuer={cert.issuer}
      data-preview-src={cert.image}
      data-lightbox-src={cert.image}
      data-lightbox-title={cert.title}
      data-lightbox-subtitle={`${cert.issuer} · ${cert.completed}`}
      className="group relative rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md overflow-hidden cursor-pointer transition-all hover:border-[#3e6274]/50 hover:shadow-[0_0_24px_rgba(62,98,116,0.18)]"
    >
      {/* Fixed frame, so a certificate of any source aspect keeps the grid
          row even and switching documents never resizes the card. */}
      <div className="relative aspect-[1400/806] overflow-hidden">
        <Image
          src={cert.image}
          alt={cert.title}
          width={CERT_WIDTH}
          height={CERT_HEIGHT}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="absolute inset-0 block h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute bottom-2 right-2 text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded-md bg-slate-950/85 border border-slate-700 text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Click to view
        </span>
      </div>

      <div className="p-3">
        <p className="text-xs font-medium text-slate-100 leading-snug">{cert.title}</p>
        <p className="text-[11px] text-slate-400 mt-1">
          {cert.issuer} · {cert.completed}
        </p>
        {cert.hours > 0 ? (
          <p className="text-[11px] text-slate-400">{cert.hours} hrs</p>
        ) : null}
        {cert.credentialId ? (
          <p className="text-[10px] font-mono text-slate-400">
            {cert.credentialId}
          </p>
        ) : null}
      </div>
    </article>
  );
}
