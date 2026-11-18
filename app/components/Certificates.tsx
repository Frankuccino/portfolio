"use client";

import { useMemo, useState } from "react";
import SectionHeading from "./SectionHeading";
import CertificateCard, { type LightboxImage } from "./CertificateCard";
import CertificateLightbox from "./CertificateLightbox";
import FeaturedCertificateCard from "./FeaturedCertificateCard";
import BadgeCard from "./BadgeCard";
import {
  achievements,
  badges,
  certificates,
  featuredCertificates,
  type Certificate,
} from "../data/portfolio";

type CertificateWithImage = Certificate & { image: string };

function hasImage(cert: Certificate): cert is CertificateWithImage {
  return Boolean(cert.image);
}

const ALL = "all";

export default function Certificates() {
  const [activeImage, setActiveImage] = useState<LightboxImage | null>(null);
  const [issuer, setIssuer] = useState<string>(ALL);

  // The ledger is the featured plates plus the course certificates; the
  // badges and memberships are supporting rows and stay put.
  const issuers = useMemo(
    () => [
      ...new Set([
        ...featuredCertificates.map((cert) => cert.issuer),
        ...certificates.map((cert) => cert.issuer),
      ]),
    ],
    [],
  );

  const visibleFeatured =
    issuer === ALL
      ? featuredCertificates
      : featuredCertificates.filter((cert) => cert.issuer === issuer);
  const visibleCourse = certificates
    .filter(hasImage)
    .filter((cert) => issuer === ALL || cert.issuer === issuer);

  return (
    <section
      id="certificates"
      className="px-4 sm:px-6 py-24 md:py-32 bg-slate-950/40"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="04."
          title="Certificates"
          description={`Formal verification of the craft — a DataCamp AI associate certification, an AWS AI practitioner track, an AWS Cloud Technical Essentials credential, and a full-stack bootcamp, backed by ${certificates.length} course certificates. Open any plate for the document.`}
        />

        {/* The ledger's index: filter the plates by who issued them. */}
        <div className="flex flex-wrap items-center gap-1.5 mb-6">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mr-1">
            Issuer
          </span>
          <button
            type="button"
            onClick={() => setIssuer(ALL)}
            aria-pressed={issuer === ALL}
            className={`text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
              issuer === ALL
                ? "bg-[#3e6274]/25 border-[#3e6274]/50 text-slate-100"
                : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-300"
            }`}
          >
            All
          </button>
          {issuers.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() =>
                setIssuer((current) => (current === item ? ALL : item))
              }
              aria-pressed={issuer === item}
              className={`text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
                issuer === item
                  ? "bg-[#3e6274]/25 border-[#3e6274]/50 text-slate-100"
                  : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-300"
              }`}
            >
              {item}
            </button>
          ))}
          <span className="ml-auto text-[11px] font-mono tabular-nums text-slate-400">
            {visibleFeatured.length + visibleCourse.length} of{" "}
            {featuredCertificates.length + certificates.length} plates
          </span>
        </div>

        {/* Featured certifications */}
        <div className="space-y-3 mb-3">
          {visibleFeatured.map((cert) => (
            <FeaturedCertificateCard
              key={cert.id}
              cert={cert}
              onOpen={setActiveImage}
            />
          ))}
        </div>

        {/* Course certificates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
          {visibleCourse.map((cert) => (
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
                <p className="text-[11px] text-slate-400 mt-0.5">
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
