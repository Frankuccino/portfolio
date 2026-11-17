"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { LightboxImage } from "./CertificateCard";

const CERT_WIDTH = 1400;
const CERT_HEIGHT = 806;

type CertificateLightboxProps = {
  image: LightboxImage;
  onClose: () => void;
};

export default function CertificateLightbox({
  image,
  onClose,
}: CertificateLightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  // Whoever opened the dialog gets focus back when it closes.
  const returnFocusTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    returnFocusTo.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      // The dialog has exactly one focusable control. Letting Tab escape it
      // drops the reader into the page behind an opaque, scroll-locked
      // backdrop, so focus is kept inside.
      if (event.key === "Tab") {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Lock background scroll while the certificate is on screen
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      returnFocusTo.current?.focus?.();
    };
  }, [onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.title}
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-8"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="absolute inset-0 bg-[#0e0d16]/90 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-5xl">
        <div className="flex justify-center">
          <Image
            key={image.src}
            src={image.src}
            alt={image.title}
            width={image.width ?? CERT_WIDTH}
            height={image.height ?? CERT_HEIGHT}
            sizes="(max-width: 1024px) 100vw, 1100px"
            className="block rounded-xl border border-slate-700 shadow-2xl"
            style={
              (image.height ?? CERT_HEIGHT) >= (image.width ?? CERT_WIDTH)
                ? { height: "80vh", width: "auto" }
                : { width: "100%", height: "auto" }
            }
          />
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-slate-100">{image.title}</p>
            <p className="text-xs text-slate-400">{image.subtitle}</p>
          </div>
          <button
            ref={closeRef}
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
