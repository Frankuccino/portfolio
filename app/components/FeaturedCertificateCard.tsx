"use client";

import Image from "next/image";
import { useState } from "react";
import type { FeaturedCertificate } from "../data/portfolio";
import type { LightboxImage } from "./CertificateCard";

type FeaturedCertificateCardProps = {
  cert: FeaturedCertificate;
  onOpen: (image: LightboxImage) => void;
};

export default function FeaturedCertificateCard({
  cert,
  onOpen,
}: FeaturedCertificateCardProps) {
  const [docIndex, setDocIndex] = useState(0);
  const activeDoc = cert.images[docIndex] ?? cert.images[0];

  return (
    <div className="mb-3 rounded-xl border border-[#3e6274]/50 bg-gradient-to-br from-[#3e6274]/15 via-slate-900/40 to-slate-900/40 backdrop-blur-md p-4 sm:p-5">
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="lg:w-2/5 shrink-0 flex flex-col gap-2">
          <button
            type="button"
            onClick={() =>
              onOpen({
                src: activeDoc.src,
                title: cert.title,
                subtitle: `${cert.issuer} · ${cert.completed}`,
                width: activeDoc.width,
                height: activeDoc.height,
              })
            }
            className="group relative rounded-lg overflow-hidden border border-slate-700 cursor-pointer text-left"
            aria-label={`View the ${activeDoc.label.toLowerCase()} for ${cert.title}`}
          >
            <Image
              key={activeDoc.src}
              src={activeDoc.src}
              alt={`${cert.title} — ${activeDoc.label}`}
              width={activeDoc.width}
              height={activeDoc.height}
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="block w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <span className="absolute bottom-2 right-2 text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded-md bg-slate-950/85 border border-slate-700 text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Click to view
            </span>
          </button>

          {/* Document switcher — only when a credential has more than one document */}
          {cert.images.length > 1 ? (
            <div className="flex flex-wrap gap-1.5">
              {cert.images.map((doc, index) => (
                <button
                  key={doc.src}
                  type="button"
                  onClick={() => setDocIndex(index)}
                  aria-pressed={index === docIndex}
                  className={`text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded-md border transition-colors cursor-pointer ${
                    index === docIndex
                      ? "bg-[#3e6274]/25 border-[#3e6274]/50 text-slate-100"
                      : "bg-slate-950/50 border-slate-800 text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {doc.label}
                </button>
              ))}
            </div>
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
