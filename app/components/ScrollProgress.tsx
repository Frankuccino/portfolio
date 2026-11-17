"use client";

import { useEffect, useRef } from "react";

/**
 * Reading progress: a 2px rule at the top of the viewport.
 *
 * Mounted once in the root layout rather than per page. It measures the
 * document on mount and hides itself when the page is shorter than the
 * viewport, so short pages get no bar and long pages get one without every
 * route having to opt in.
 *
 * Written straight to `transform` from a throttled scroll handler, not through
 * state: one style write per frame, and no re-render of the tree.
 */
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bar.current;
    if (!el) return;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      // Nothing to measure on a page that fits the screen.
      if (max <= 1) {
        el.style.display = "none";
        return;
      }
      el.style.display = "";
      const t = Math.min(1, Math.max(0, window.scrollY / max));
      el.style.transform = `scaleX(${t})`;
    };

    update();
    // Written straight from the handler rather than through rAF, for the same
    // reason as the footer sweep: a throttled or backgrounded tab can starve
    // rAF entirely and the bar would freeze part-way down the page. One
    // transform write per scroll event is cheap.
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 inset-x-0 z-[60] h-0.5"
    >
      <div
        ref={bar}
        className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-[#5f93a8] to-[#3e6274]"
      />
    </div>
  );
}
