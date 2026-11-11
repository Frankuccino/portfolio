import SectionHeading from "./SectionHeading";
import {
  achievements,
  certificates,
  featuredCertification,
  totalCertificateHours,
} from "../data/portfolio";

function CertificateCard({
  title,
  issuer,
  completed,
  hours,
}: {
  title: string;
  issuer: string;
  completed: string;
  hours: number;
}) {
  return (
    <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md hover:border-[#3e6274]/50 transition-colors">
      <p className="text-sm font-medium text-slate-100 leading-snug">{title}</p>
      <p className="text-[11px] text-slate-500 mt-1.5">
        {issuer} · {completed}
      </p>
      {hours > 0 ? (
        <p className="text-[11px] text-slate-400 mt-1">{hours} hrs</p>
      ) : null}
    </div>
  );
}

export default function Certificates() {
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

        <div className="p-5 rounded-xl border border-[#3e6274]/50 bg-gradient-to-br from-[#3e6274]/15 via-slate-900/40 to-slate-900/40 backdrop-blur-md mb-3">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
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
              <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
                Covers LLM application development, prompt engineering, RAG, and
                vector databases — the applied end of the AI engineering
                workflow.
              </p>
            </div>
            <div className="flex sm:flex-col gap-2 sm:text-right">
              <div className="px-3 py-2 rounded-lg bg-slate-950/60 border border-slate-800/70">
                <p className="text-[10px] uppercase tracking-wider text-slate-500">
                  Total Coursework
                </p>
                <p className="text-sm font-semibold text-slate-100">
                  {totalCertificateHours} hrs
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
          {certificates.map((cert) => (
            <CertificateCard
              key={cert.id}
              title={cert.title}
              issuer={cert.issuer}
              completed={cert.completed}
              hours={cert.hours}
            />
          ))}
        </div>

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
      </div>
    </section>
  );
}
