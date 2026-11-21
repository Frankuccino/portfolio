import type { RoadmapImage } from "../data/roadmap";

/**
 * A module's diagram with its caption and credit.
 *
 * Deliberately free of outer spacing: the parent decides where the figure sits,
 * because on the course page it shares a card with the module's text.
 */
export default function RoadmapFigure({ image }: { image: RoadmapImage }) {
  return (
    <figure>
      {/* Local asset, so a plain <img> with intrinsic dimensions: the
          width/height reserve the box and prevent a layout shift. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading="lazy"
        className="w-full h-auto rounded-lg border border-slate-800/60 bg-black/40"
      />
      <figcaption className="mt-1.5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
          {image.caption}
        </span>
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#5f93a8]">
          {image.credit}
        </span>
      </figcaption>
    </figure>
  );
}
