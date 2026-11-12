"use client";

import Image from "next/image";
import { useState } from "react";
import SectionHeading from "./SectionHeading";
import CertificateCard, { type LightboxImage } from "./CertificateCard";
import CertificateLightbox from "./CertificateLightbox";
import BadgeCard from "./BadgeCard";
import {
  achievements,
  badges,
  certificates,
  featuredCertification,
  totalCourseworkHours,
  type Certificate,
} from "../data/portfolio";

type CertificateWithImage = Certificate & { image: string };

function hasImage(cert: Certificate): cert is CertificateWithImage {
  return Boolean(cert.image);
}

export default function Certificates() {
  const [activeImage, setActiveImage] = useState<LightboxImage | null>(null);
  const [docIndex, setDocIndex] = useState(0);

  const featuredDocs = featuredCertification.images ?? [
    { src: featuredCertification.image, label: "Credential" },
  ];
  const activeDoc = featuredDocs[docIndex] ?? featuredDocs[0];

  return (
    <section
      id="certificates"
      className="px-4 sm:px-6 py-24 md:py-32 bg-slate-950/40"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="04."
          title="Certificates"
          description="Formal verification of the AI engineering craft — a DataCamp associate certification backed by ten course certificates."
        />

        {/* Featured associate certification */}
        <div className="mb-3 rounded-xl border border-[#3e6274]/50 bg-gradient-to-br from-[#3e6274]/15 via-slate-900/40 to-slate-900/40 backdrop-blur-md p-4 sm:p-5">
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="lg:w-2/5 shrink-0 flex flex-col gap-2">
              <button
                type="button"
                onClick={() =>
                  setActiveImage({
                    src: activeDoc.src,
                    title: featuredCertification.title,
                    subtitle: `${featuredCertification.issuer} · ${featuredCertification.completed}`,
                  })
                }
                className="group relative rounded-lg overflow-hidden border border-slate-700 cursor-pointer text-left"
                aria-label={`View the ${activeDoc.label.toLowerCase()} for ${featuredCertification.title}`}
              >
                <Image
                  key={activeDoc.src}
                  src={activeDoc.src}
                  alt={`${featuredCertification.title} — ${activeDoc.label}`}
                  width={1400}
                  height={806}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="block w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <span className="absolute bottom-2 right-2 text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded-md bg-slate-950/85 border border-slate-700 text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Click to view
                </span>
              </button>

              {/* Document switcher — the credential and the track certificate */}
              <div className="flex flex-wrap gap-1.5">
                {featuredDocs.map((doc, index) => (
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
            </div>

            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-md bg-[#3e6274]/25 border border-[#3e6274]/40 text-slate-100">
                  Associate Certification
                </span>
                <h3 className="text-lg md:text-xl font-bold text-white">
                  {featuredCertification.title}
                </h3>
                <p className="text-sm text-slate-400">
                  {featuredCertification.issuer} ·{" "}
                  {featuredCertification.completed}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Covers LLM application development, prompt engineering, RAG,
                  and vector databases — the applied end of the AI engineering
                  workflow.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <div className="px-3 py-2 rounded-lg bg-slate-950/60 border border-slate-800/70">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500">
                    Total Coursework
                  </p>
                  <p className="text-sm font-semibold text-slate-100">
                    ~{totalCourseworkHours} hrs
                  </p>
                </div>
                <div className="px-3 py-2 rounded-lg bg-slate-950/60 border border-slate-800/70">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500">
                    Credential ID
                  </p>
                  <p className="text-[11px] font-mono text-slate-300">
                    {featuredCertification.credentialId}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course certificates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
          {certificates.filter(hasImage).map((cert) => (
            <CertificateCard key={cert.id} cert={cert} onOpen={setActiveImage} />
          ))}
        </div>

        {/* Digital badges & passes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          {badges.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} onOpen={setActiveImage} />
          ))}
        </div>

        {/* Memberships and education */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-slate-900/30 border border-slate-800/40 backdrop-blur-md flex items-center gap-3"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              <div>
                <p className="text-sm font-medium text-slate-200">{item.title}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {item.issuer} · {item.completed}
                </p>
              </div>
            </div>
          ))}
        </div>

        {activeImage ? (
          <CertificateLightbox
            image={activeImage}
            onClose={() => setActiveImage(null)}
          />
        ) : null}
      </div>
    </section>
  );
}
