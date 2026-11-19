import type { RoadmapCourse } from "../data/roadmap";

type Figure = NonNullable<RoadmapCourse["image"]>;

/**
 * A course's diagram, with its credit.
 *
 * Caption and credit are separate lines: the caption says what the picture is,
 * the credit says who drew it.
 */
export default function RoadmapFigure({ image }: { image: Figure }) {
  return (
    <figure className="mt-4">
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
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
          {image.caption}
        </span>
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#5f93a8]">
          {image.credit}
        </span>
      </figcaption>
    </figure>
  );
}
