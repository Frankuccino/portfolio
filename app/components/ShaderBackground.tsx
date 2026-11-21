"use client";

import { useEffect, useState } from "react";
import type { ComponentProps } from "react";
import dynamic from "next/dynamic";

/**
 * The shader background, mounted after the first paint.
 *
 * `@paper-design/shaders-react` is 83 KB, the largest single chunk on the page,
 * and it is pure decoration. Imported statically it is part of the initial
 * script, so the main thread has to parse and compile it before the browser can
 * paint anything. PageSpeed reported the LCP element as rendering 2,510 ms after
 * navigation with a 10 ms TTFB, which is that blockage: work before the first
 * paint delays LCP and is invisible to Total Blocking Time, because TBT only
 * counts tasks inside the FCP to TTI window.
 *
 * A dynamic import keeps it out of the initial bundle, and mounting it in an
 * effect puts it after the paint rather than before. The trade-off is that the
 * page shows its flat background colour for a frame or two. That is the right
 * side of the trade: the gradient is subtle, the headline is not.
 */
const GrainGradient = dynamic(
  () => import("@paper-design/shaders-react").then((mod) => mod.GrainGradient),
  { ssr: false },
);

type ShaderBackgroundProps = ComponentProps<typeof GrainGradient>;

export default function ShaderBackground(props: ShaderBackgroundProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() =>
      requestAnimationFrame(() => setReady(true)),
    );
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!ready) return null;

  return <GrainGradient {...props} />;
}
