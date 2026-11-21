"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { LightboxImage } from "./CertificateCard";

const PREVIEW_WIDTH = 480;
const CERT_WIDTH = 1400;
const CERT_HEIGHT = 806;
const MARGIN = 16;

/**
 * The certificates' only client code.
 *
 * The plates, badges and featured cards are server-rendered markup carrying
 * `data-lightbox-*` and `data-preview-src`. This island attaches one delegated
 * listener to the section, opens a native `<dialog>` for the document, and runs
 * the cursor zoom from a single shared element. Nothing in the ledger hydrates.
 */
export default function CertificateViewer({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [image, setImage] = useState<LightboxImage | null>(null);
  const [preview, setPreview] = useState<{
    x: number;
    y: number;
    src: string;
  } | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const open = (event: MouseEvent) => {
      const trigger = (event.target as HTMLElement).closest<HTMLElement>(
        "[data-lightbox-src]:not([hidden])",
      );
      const src = trigger?.dataset.lightboxSrc;
      if (!trigger || !src) return;

      setImage({
        src,
        title: trigger.dataset.lightboxTitle ?? "",
        subtitle: trigger.dataset.lightboxSubtitle ?? "",
        width: trigger.dataset.lightboxWidth
          ? Number(trigger.dataset.lightboxWidth)
          : undefined,
        height: trigger.dataset.lightboxHeight
          ? Number(trigger.dataset.lightboxHeight)
          : undefined,
      });
    };

    const move = (event: MouseEvent) => {
      const card = (event.target as HTMLElement).closest<HTMLElement>(
        "[data-preview-src]",
      );
      const src = card?.dataset.previewSrc;
      if (!card || !src) {
        setPreview(null);
        return;
      }

      const height = Math.round(PREVIEW_WIDTH * (CERT_HEIGHT / CERT_WIDTH));
      let x = event.clientX + MARGIN;
      let y = event.clientY + MARGIN;
      if (x + PREVIEW_WIDTH > window.innerWidth - MARGIN) {
        x = event.clientX - PREVIEW_WIDTH - MARGIN;
      }
      if (y + height > window.innerHeight - MARGIN) {
        y = event.clientY - height - MARGIN;
      }
      setPreview({ x: Math.max(MARGIN, x), y: Math.max(MARGIN, y), src });
    };

    const leave = () => setPreview(null);

    root.addEventListener("click", open);
    root.addEventListener("mousemove", move);
    root.addEventListener("mouseleave", leave);
    return () => {
      root.removeEventListener("click", open);
      root.removeEventListener("mousemove", move);
      root.removeEventListener("mouseleave", leave);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (image && !dialog.open) dialog.showModal();
    if (!image && dialog.open) dialog.close();
  }, [image]);

  return (
    <>
      <div ref={rootRef}>{children}</div>

      {preview ? (
        <div
          className="fixed z-50 pointer-events-none rounded-lg overflow-hidden border border-slate-700 shadow-2xl bg-slate-900"
          style={{ left: preview.x, top: preview.y, width: PREVIEW_WIDTH }}
        >
          <Image
            src={preview.src}
            alt=""
            width={CERT_WIDTH}
            height={CERT_HEIGHT}
            sizes="480px"
            className="block w-full h-auto"
          />
        </div>
      ) : null}

      <dialog
        ref={dialogRef}
        onClose={() => setImage(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) setImage(null);
        }}
        className="p-0 bg-transparent backdrop:bg-[#0e0d16]/90 backdrop:backdrop-blur-sm w-full max-w-5xl"
      >
        {image ? (
          <div className="w-full">
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
                type="button"
                autoFocus
                onClick={() => setImage(null)}
                className="shrink-0 text-xs font-medium px-3 py-1.5 rounded-md border border-slate-700 text-slate-300 hover:text-white hover:border-[#3e6274]/60 transition-colors cursor-pointer"
              >
                Close ✕
              </button>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
