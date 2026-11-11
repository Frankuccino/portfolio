"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface FocusCardData {
  id: string;
  category: string;
  description: React.ReactNode;
  dotColor: string;
  href: string;
  cta: string;
}

interface HeroFocusDeckProps {
  cards: FocusCardData[];
}

export default function HeroFocusDeck({ cards }: HeroFocusDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentCard = cards[currentIndex];

  const handleShuffle = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  return (
    <div className="relative w-full max-w-xs">
      {/* Shuffle control — kept outside the link so both actions stay available */}
      <button
        type="button"
        onClick={handleShuffle}
        aria-label="Show next focus"
        title="Shuffle focus"
        className="absolute -top-2 -right-2 z-10 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-[#3e6274]/60 text-[11px] leading-none flex items-center justify-center transition-colors cursor-pointer"
      >
        ↻
      </button>

      <Link
        href={currentCard.href}
        className="group relative block px-4 py-3.5 pt-4 rounded-xl bg-slate-950/40 border border-slate-800/50 backdrop-blur-md shadow-lg space-y-1.5 overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] hover:border-[#3e6274]/50"
      >
        {/* Header with Category and Dot */}
        <div className="flex items-center justify-between pr-4">
          <span className="text-[10px] font-mono text-slate-500">
            {currentIndex + 1}/{cards.length}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
              {currentCard.category}
            </span>
            <div className={`w-1.5 h-1.5 rounded-full ${currentCard.dotColor}`} />
          </div>
        </div>

        {/* Animated Description Swap */}
        <div className="min-h-48px flex items-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentCard.id}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
              className="text-xs text-slate-300 leading-relaxed font-normal"
            >
              {currentCard.description}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Click target */}
        <span className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-slate-500 group-hover:text-slate-300 transition-colors">
          {currentCard.cta}
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </Link>
    </div>
  );
}
