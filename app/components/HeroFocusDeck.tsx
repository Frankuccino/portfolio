"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface FocusCardData {
  id: string;
  category: string;
  description: React.ReactNode;
  dotColor: string;
}

interface HeroFocusDeckProps {
  cards: FocusCardData[];
}

export default function HeroFocusDeck({ cards }: HeroFocusDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const currentCard = cards[currentIndex];

  return (
    <div
      onClick={handleNext}
      className="group relative px-4 py-3.5 rounded-xl bg-slate-950/40 border border-slate-800/50 backdrop-blur-md shadow-lg space-y-1.5 w-full max-w-xs cursor-pointer select-none transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] overflow-hidden"
      title="Click to shuffle"
    >
      {/* Header with Category and Dot */}
      <div className="flex items-center justify-between">
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
    </div>
  );
}
