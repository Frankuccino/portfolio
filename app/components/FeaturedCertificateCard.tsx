"use client";

import Image from "next/image";
import { useState } from "react";
import type { FeaturedCertificate } from "../data/portfolio";
import type { LightboxImage } from "./CertificateCard";

type FeaturedCertificateCardProps = {
  cert: FeaturedCertificate;
  onOpen: (image: LightboxImage) => void;
};

/** A 14px stroke chevron, so the arrows stay crisp at any size. */
function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {direction === "left" ? (
        <polyline points="15 18 9 12 15 6" />
      ) : (
        <polyline points="9 18 15 12 9 6" />
      )}
    </svg>
  );
}

export default function FeaturedCertificateCard({
  cert,
  onOpen,
}: FeaturedCertificateCardProps) {
  const [docIndex, setDocIndex] = useState(0);
  const count = cert.images.length;
  const activeDoc = cert.images[docIndex] ?? cert.images[0];
  const multi = count > 1;

  const openLightbox = () =>
    onOpen({
      src: activeDoc.src,
      title: cert.title,
      subtitle: `${cert.issuer} · ${cert.completed}`,
      width: activeDoc.width,
      height: activeDoc.height,
    });

  return (
    <div className="mb-3 rounded-xl border border-[#3e6274]/50 bg-gradient-to-br from-[#3e6274]/15 via-slate-900/40 to-slate-900/40 backdrop-blur-md p-4 sm:p-5">
      <div className="flex flex-col lg:flex-row gap-5">
        {/* The image block is one control surface, so a credential with one
            document and a credential with five look the same: the frame is
            identical and only the dots differ. Clicking the image advances
            through the documents; the chip opens the lightbox. */}
        <div className="lg:w-2/5 shrink-0">
          <div className="group relative aspect-[1400/806] overflow-hidden rounded-lg border border-slate-700">
            <Image
              key={activeDoc.src}
              src={activeDoc.src}
              alt={`${cert.title} — ${activeDoc.label}`}
              width={activeDoc.width}
              height={activeDoc.height}
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="absolute inset-0 block h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />

            {/* The image's halves are the controls: left is backward, right is
                forward, both wrapping around the set. Nothing is drawn on the
                image until the cursor is over it — the half under the cursor
                lights up and its chevron fades in, so the affordance is
                discoverable without being a permanent control. A
                single-document card has nothing to switch, so its whole image
                opens the lightbox. */}
            {multi ? (
              <>
                <button
                  type="button"
                  onClick={() => setDocIndex((docIndex - 1 + count) % count)}
                  aria-label={`Previous document for ${cert.title}`}
                  className="group/half absolute inset-y-0 left-0 z-10 flex w-1/2 cursor-pointer items-center justify-start pl-3"
                >
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#3e6274]/35 to-transparent opacity-0 transition-opacity duration-200 group-hover/half:opacity-100" />
                  <span className="pointer-events-none absolute inset-y-0 left-0 w-px bg-white/40 opacity-0 transition-opacity duration-200 group-hover/half:opacity-100" />
                  <span className="pointer-events-none relative flex h-7 w-7 items-center justify-center rounded-full border border-slate-700 bg-slate-950/70 text-slate-200 opacity-0 transition-opacity duration-200 group-hover/half:opacity-100">
                    <Chevron direction="left" />
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setDocIndex((docIndex + 1) % count)}
                  aria-label={`Next document for ${cert.title}`}
                  className="group/half absolute inset-y-0 right-0 z-10 flex w-1/2 cursor-pointer items-center justify-end pr-3"
                >
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-l from-[#3e6274]/35 to-transparent opacity-0 transition-opacity duration-200 group-hover/half:opacity-100" />
                  <span className="pointer-events-none absolute inset-y-0 right-0 w-px bg-white/40 opacity-0 transition-opacity duration-200 group-hover/half:opacity-100" />
                  <span className="pointer-events-none relative flex h-7 w-7 items-center justify-center rounded-full border border-slate-700 bg-slate-950/70 text-slate-200 opacity-0 transition-opacity duration-200 group-hover/half:opacity-100">
                    <Chevron direction="right" />
                  </span>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={openLightbox}
                className="absolute inset-0 z-10 cursor-pointer"
                aria-label={`View the ${activeDoc.label.toLowerCase()} for ${cert.title}`}
              />
            )}

            {multi ? (
              <span className="absolute left-2 top-2 z-20 max-w-[70%] truncate rounded-md bg-slate-950/85 border border-slate-700 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-slate-200">
                {activeDoc.label}
              </span>
            ) : null}

            <button
              type="button"
              onClick={openLightbox}
              aria-label={`View the ${activeDoc.label.toLowerCase()} for ${cert.title}`}
              className="absolute right-2 top-2 z-20 cursor-pointer rounded-md bg-slate-950/85 border border-slate-700 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-slate-200 transition-colors hover:bg-slate-900 hover:text-white"
            >
              View
            </button>

            {/* Document dots, over the image rather than stacked under it. */}
            {multi ? (
              <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-slate-800/70 bg-slate-950/70 px-2 py-1.5">
                {cert.images.map((doc, index) => (
                  <button
                    key={doc.src}
                    type="button"
                    onClick={() => setDocIndex(index)}
                    aria-pressed={index === docIndex}
                    aria-label={`Show ${doc.label}`}
                    title={doc.label}
                    className={`h-1.5 cursor-pointer rounded-full transition-all ${
                      index === docIndex
                        ? "w-4 bg-slate-100"
                        : "w-1.5 bg-slate-100/35 hover:bg-slate-100/70"
                    }`}
                  />
                ))}
              </div>
            ) : null}
          </div>
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
            <p className="text-xs text-slate-500 leading-relaxed">
              {cert.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {cert.stats.map((stat) => (
              <div
                key={stat.label}
                className="px-3 py-2 rounded-lg bg-slate-950/60 border border-slate-800/70"
              >
                <p className="text-[10px] uppercase tracking-wider text-slate-500">
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
