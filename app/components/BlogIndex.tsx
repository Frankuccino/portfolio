"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Post } from "../lib/posts";
import { formatDate, readingMinutes } from "../lib/postMeta";

export default function BlogIndex({ posts }: { posts: Post[] }) {
  const tags = useMemo(
    () => [...new Set(posts.flatMap((post) => post.tags))],
    [posts],
  );
  const [tag, setTag] = useState<string | null>(null);

  const visible = tag ? posts.filter((post) => post.tags.includes(tag)) : posts;
  const shown = visible.slice(0, 4);

  return (
    <div>
      {/* The index's own index: filter the entries by subject. */}
      <div className="flex flex-wrap items-center gap-1.5 mb-6">
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mr-1">
          Index
        </span>
        <button
          type="button"
          onClick={() => setTag(null)}
          aria-pressed={tag === null}
          className={`text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
            tag === null
              ? "bg-[#3e6274]/25 border-[#3e6274]/50 text-slate-100"
              : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-300"
          }`}
        >
          All
        </button>
        {tags.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTag((current) => (current === item ? null : item))}
            aria-pressed={tag === item}
            className={`text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
              tag === item
                ? "bg-[#3e6274]/25 border-[#3e6274]/50 text-slate-100"
                : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-300"
            }`}
          >
            {item}
          </button>
        ))}
        <span className="ml-auto text-[11px] font-mono tabular-nums text-slate-500">
          {shown.length} of {posts.length} entries
        </span>
      </div>

      {/* Ruled rows: date, title, reading time, excerpt. */}
      <div className="border-t border-slate-800/70">
        {shown.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex items-baseline gap-3 sm:gap-5 px-2 sm:px-3 py-4 border-b border-slate-800/70 last:border-b-0 hover:bg-slate-900/30 transition-colors"
          >
            <span className="shrink-0 w-20 text-[11px] font-mono tabular-nums text-slate-500">
              {formatDate(post.date)}
            </span>
            <span className="flex-1 min-w-0">
              <span className="flex flex-wrap items-baseline gap-x-3">
                <span className="text-base font-semibold text-slate-100 group-hover:text-white transition-colors">
                  {post.title}
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  {readingMinutes(post.content)} min
                </span>
              </span>
              <span className="block text-sm text-slate-400 mt-1 leading-relaxed line-clamp-2">
                {post.excerpt}
              </span>
            </span>
            <span className="hidden sm:flex shrink-0 flex-wrap justify-end gap-1.5 max-w-[12rem]">
              {post.tags.map((item) => (
                <span
                  key={item}
                  className="text-[10px] font-mono uppercase tracking-wider text-slate-500"
                >
                  {item}
                </span>
              ))}
            </span>
          </Link>
        ))}
      </div>

      {/* Always a way into the archive — even when every post already fits
          above, the page itself is the index. */}
      <div className="mt-5 flex justify-end">
        <Link
          href="/blog"
          className="text-xs font-medium text-slate-300 hover:text-white transition-colors"
        >
          {posts.length > shown.length
            ? `View all ${posts.length} entries`
            : "Full index"}{" "}
          →
        </Link>
      </div>
    </div>
  );
}
