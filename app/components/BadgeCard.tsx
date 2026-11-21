import Image from "next/image";
import type { Badge } from "../data/portfolio";

const THUMB_HEIGHT = 80;

/**
 * A digital badge or pass. Server-rendered; the viewer island opens the
 * document from the `data-lightbox-*` attributes.
 */
export default function BadgeCard({ badge }: { badge: Badge }) {
  return (
    <article
      data-lightbox-src={badge.image}
      data-lightbox-title={badge.title}
      data-lightbox-subtitle={`${badge.issuer} · ${badge.completed}`}
      data-lightbox-width={badge.width}
      data-lightbox-height={badge.height}
      className="group flex items-center gap-3 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md p-3 cursor-pointer transition-all hover:border-[#3e6274]/50 hover:shadow-[0_0_24px_rgba(62,98,116,0.18)]"
    >
      <div className="h-20 shrink-0 rounded-lg overflow-hidden border border-slate-800 bg-slate-950/60">
        <Image
          src={badge.image}
          alt={badge.title}
          width={badge.width}
          height={badge.height}
          sizes="80px"
          className="block object-contain transition-transform duration-300 group-hover:scale-[1.03]"
          style={{
            height: THUMB_HEIGHT,
            width: Math.round((THUMB_HEIGHT * badge.width) / badge.height),
          }}
        />
      </div>

      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-100 leading-snug">
          {badge.title}
        </p>
        <p className="text-[11px] text-slate-400 mt-0.5">
          {badge.issuer} · {badge.completed}
        </p>
        {badge.url ? (
          <p className="text-[10px] font-medium text-[#5f93a8] mt-0.5 group-hover:text-slate-300 transition-colors">
            Verify credential →
          </p>
        ) : null}
      </div>
    </article>
  );
}
