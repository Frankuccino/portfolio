import Link from "next/link";
import type { RoadmapModule } from "../data/roadmap";
import { resolveReinforcements } from "../lib/reinforcements";

/**
 * One module of a roadmap course: what it covers, an optional diagram, and the
 * work on this site that already covers the same ground.
 *
 * Resolution happens here so the course page stays about layout. The
 * references are by id — see `lib/reinforcements.ts`.
 */
export default function RoadmapModuleCard({ module }: { module: RoadmapModule }) {
  return (
    <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md">
      <p className="text-[10px] font-mono uppercase tracking-widest text-[#5f93a8]">
        {module.title}
      </p>
      <p className="mt-2 text-sm text-slate-400 leading-relaxed">
        {module.summary}
      </p>

      {module.image ? (
        <figure className="mt-3">
          {/* Local asset, so a plain <img> with intrinsic dimensions: the
              width/height reserve the box and prevent a layout shift. The
              optimizer is for the hotlinked catalogue art, not this. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={module.image.src}
            alt={module.image.alt}
            width={module.image.width}
            height={module.image.height}
            loading="lazy"
            className="w-full h-auto rounded-lg border border-slate-800/60 bg-black/40"
          />
          <figcaption className="mt-1.5 text-[10px] font-mono uppercase tracking-widest text-slate-500">
            {module.image.caption}
          </figcaption>
        </figure>
      ) : null}

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
        {resolveReinforcements(module.reinforces).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-[11px] font-medium text-slate-300 hover:text-white transition-colors"
          >
            <span className="text-slate-500">{item.kindLabel} · </span>
            {item.label}{" "}
            <span className="text-slate-400 transition-colors">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
