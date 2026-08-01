"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function ResumeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <>
      {/* Trigger Button */}
      <div className="relative group/tooltip inline-flex">
        <button
          onClick={() => setIsOpen(true)}
          className="text-base md:text-lg font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-2 select-none group/btn cursor-pointer"
        >
          <span>Resume</span>
          <span className="text-slate-500 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform">
            ↗
          </span>
        </button>
      </div>

      {/* In-Page Modal Viewer Overlay */}
      {isOpen &&
        createPortal(
          <div className="fixed inset-0 z-9999 flex items-center justify-center p-3 sm:p-6 md:p-10">
            {/* Backdrop */}
            <div
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#0e0d16]/85 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            />

            {/* Large Modal Container */}
            <div
              className="relative w-full max-w-2xl flex flex-col rounded-2xl shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200 border overflow-hidden"
              style={{
                backgroundColor: "rgba(14, 13, 22, 0.95)",
                borderColor: "rgba(62, 98, 116, 0.3)",
                boxShadow:
                  "0 0 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(62, 98, 116, 0.2)",
              }}
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[#3e6274]/20 bg-[#0e0d16]/50">
                <div className="flex items-center gap-2.5 truncate mr-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#3e6274] shrink-0" />
                  <span className="text-xs sm:text-sm font-medium tracking-wide text-slate-200 truncate">
                    Frank Angelo Malubag — Resume
                  </span>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-slate-100 p-1.5 rounded-full transition-colors cursor-pointer shrink-0"
                  style={{ backgroundColor: "rgba(62, 98, 116, 0.15)" }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* PDF Preview Frame Container - Fixed aspect ratio box for mobile & desktop */}
              <div className="w-full bg-[#0e0d16] p-3 sm:p-6 flex items-center justify-center overflow-hidden">
                <div className="w-full max-w-[500px] sm:max-w-xl aspect-[8.5/11] max-h-[58vh] sm:max-h-[72vh]">
                  <iframe
                    src="/Frank-Angelo-Malubag-Software-Engineer-Resume.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
                    className="w-full h-full rounded-xl border border-[#3e6274]/20 bg-slate-950"
                    title="Resume PDF Viewer"
                  />
                </div>
              </div>

              {/* Footer Bar */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-t border-[#3e6274]/20 bg-[#0e0d16]">
                <span className="text-xs text-slate-400 hidden sm:inline">
                  PDF Document Viewer
                </span>
                <a
                  href="/Frank-Angelo-Malubag-Software-Engineer-Resume.pdf"
                  download="Frank-Angelo-Malubag-Software-Engineer-Resume.pdf"
                  className="w-full sm:w-auto text-xs sm:text-sm font-medium px-4 py-2 rounded-lg text-white transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md active:scale-95"
                  style={{
                    backgroundColor: "#3e6274",
                    boxShadow: "0 4px 12px rgba(62, 98, 116, 0.3)",
                  }}
                >
                  <span>Download PDF</span>
                  <span>↓</span>
                </a>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
