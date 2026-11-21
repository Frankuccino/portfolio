import SectionHeading from "./SectionHeading";
import CertificateCard from "./CertificateCard";
import FeaturedCertificateCard from "./FeaturedCertificateCard";
import BadgeCard from "./BadgeCard";
import IssuerFilter from "./IssuerFilter";
import CertificateViewer from "./CertificateViewer";
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

/**
 * The certificate ledger.
 *
 * A server component. The plates, badges and memberships are markup; the issuer
 * filter, the document switcher and the viewer are small client islands that
 * act on the rows already in the document.
 */
export default function Certificates() {
  const issuers = [
    ...new Set([
      ...featuredCertificates.map((cert) => cert.issuer),
      ...certificates.map((cert) => cert.issuer),
    ]),
  ];
  const plates =
    featuredCertificates.length + certificates.filter(hasImage).length;

  return (
    <section
      id="certificates"
      className="px-4 sm:px-6 py-24 md:py-32 bg-slate-950/40"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="04."
          title="Certificates"
          description={`Formal verification of the craft: a DataCamp AI associate certification, an AWS AI practitioner track, an AWS Cloud Technical Essentials credential, and a full-stack bootcamp, backed by ${certificates.length} course certificates. Open any plate for the document.`}
        />

        <IssuerFilter issuers={issuers} total={plates} />

        <CertificateViewer>
          {/* Featured certifications */}
          <div className="space-y-3 mb-3">
            {featuredCertificates.map((cert) => (
              <FeaturedCertificateCard key={cert.id} cert={cert} id={cert.id} />
            ))}
          </div>

          {/* Course certificates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
            {certificates.filter(hasImage).map((cert) => (
              <CertificateCard key={cert.id} cert={cert} />
            ))}
          </div>

          {/* Digital badges & passes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            {badges.map((badge) => (
              <BadgeCard key={badge.id} badge={badge} />
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
        </CertificateViewer>
      </div>
    </section>
  );
}
