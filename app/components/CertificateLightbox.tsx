"use client";

import Image from "next/image";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Certificate } from "../data/portfolio";

type CertificateWithImage = Certificate & { image: string };

const CERT_WIDTH = 1400;
const CERT_HEIGHT = 806;

type CertificateLightboxProps = {
  cert: CertificateWithImage;
  onClose: () => void;
};

export default function CertificateLightbox({
  cert,
  onClose,
}: CertificateLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-8">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#0e0d16]/90 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-5xl">
        <Image
          src={cert.image}
          alt={cert.title}
          width={CERT_WIDTH}
          height={CERT_HEIGHT}
          sizes="(max-width: 1024px) 100vw, 1100px"
          className="block w-full h-auto rounded-xl border border-slate-700 shadow-2xl"
        />

        <div className="mt-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-slate-100">{cert.title}</p>
            <p className="text-xs text-slate-500">
              {cert.issuer} · {cert.completed}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 text-xs font-medium px-3 py-1.5 rounded-md border border-slate-700 text-slate-300 hover:text-white hover:border-[#3e6274]/60 transition-colors cursor-pointer"
          >
            Close ✕
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
