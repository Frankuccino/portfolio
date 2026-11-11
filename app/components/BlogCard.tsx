import Link from "next/link";
import type { Post } from "../lib/posts";
import { formatDate } from "../lib/posts";

export default function BlogCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md hover:border-[#3e6274]/50 transition-colors group"
    >
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-500">
        <span>{formatDate(post.date)}</span>
        {post.tags.length > 0 ? (
          <>
            <span className="text-slate-700">·</span>
            <span>{post.tags.join(" · ")}</span>
          </>
        ) : null}
      </div>
      <h3 className="text-base font-semibold text-slate-100 mt-1.5 group-hover:text-white transition-colors">
        {post.title}
      </h3>
      <p className="text-sm text-slate-400 mt-1 leading-relaxed line-clamp-3">
        {post.excerpt}
      </p>
      <span className="text-xs font-medium text-slate-500 group-hover:text-slate-300 transition-colors mt-2 inline-block">
        Read more →
      </span>
    </Link>
  );
}
