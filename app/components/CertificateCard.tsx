"use client";

import Image from "next/image";
import { useState } from "react";
import { createPortal } from "react-dom";
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

const PREVIEW_WIDTH = 480;
const PREVIEW_HEIGHT = Math.round(PREVIEW_WIDTH * (CERT_HEIGHT / CERT_WIDTH));
const MARGIN = 16;

type CertificateCardProps = {
  cert: CertificateWithImage;
  onOpen: (image: LightboxImage) => void;
};

export default function CertificateCard({ cert, onOpen }: CertificateCardProps) {
  const [preview, setPreview] = useState<{ x: number; y: number } | null>(null);

  const trackCursor = (event: React.MouseEvent<HTMLElement>) => {
    let x = event.clientX + MARGIN;
    let y = event.clientY + MARGIN;

    if (x + PREVIEW_WIDTH > window.innerWidth - MARGIN) {
      x = event.clientX - PREVIEW_WIDTH - MARGIN;
    }
    if (y + PREVIEW_HEIGHT > window.innerHeight - MARGIN) {
      y = event.clientY - PREVIEW_HEIGHT - MARGIN;
    }

    setPreview({ x: Math.max(MARGIN, x), y: Math.max(MARGIN, y) });
  };

  return (
    <article
      onMouseEnter={trackCursor}
      onMouseMove={trackCursor}
      onMouseLeave={() => setPreview(null)}
      onClick={() =>
        onOpen({
          src: cert.image,
          title: cert.title,
          subtitle: `${cert.issuer} · ${cert.completed}`,
        })
      }
      className="group relative rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md overflow-hidden cursor-pointer transition-all hover:border-[#3e6274]/50 hover:shadow-[0_0_24px_rgba(62,98,116,0.18)]"
    >
      <div className="relative overflow-hidden">
        <Image
          src={cert.image}
          alt={cert.title}
          width={CERT_WIDTH}
          height={CERT_HEIGHT}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="block w-full h-auto transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute bottom-2 right-2 text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded-md bg-slate-950/85 border border-slate-700 text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Click to view
        </span>
      </div>

      <div className="p-3">
        <p className="text-xs font-medium text-slate-100 leading-snug">{cert.title}</p>
        <p className="text-[11px] text-slate-500 mt-1">
          {cert.issuer} · {cert.completed}
        </p>
        {cert.hours > 0 ? (
          <p className="text-[11px] text-slate-400">{cert.hours} hrs</p>
        ) : null}
        {cert.credentialId ? (
          <p className="text-[10px] font-mono text-slate-500">
            {cert.credentialId}
          </p>
        ) : null}
      </div>

      {preview &&
        createPortal(
          <div
            className="fixed z-50 pointer-events-none rounded-lg overflow-hidden border border-slate-700 shadow-2xl bg-slate-900"
            style={{ left: preview.x, top: preview.y, width: PREVIEW_WIDTH }}
          >
            <Image
              src={cert.image}
              alt=""
              width={CERT_WIDTH}
              height={CERT_HEIGHT}
              sizes="480px"
              className="block w-full h-auto"
            />
          </div>,
          document.body,
        )}
    </article>
  );
}
