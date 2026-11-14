import Link from "next/link";
import type { Metadata } from "next";
import { canonical } from "../lib/siteUrl";
import { getPosts } from "../lib/posts";
import BlogCard from "../components/BlogCard";

export const metadata: Metadata = {
  title: "Blog — Frank Angelo Malubag",
  description:
    "Notes on backend engineering, distributed systems, and applied AI engineering.",
  alternates: { canonical: canonical("/blog") },
};

export default function BlogIndex() {
  const posts = getPosts();

  return (
    <main className="px-4 sm:px-6 pt-28 pb-24 min-h-screen">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          ← Back to home
        </Link>

        <div className="mt-6 mb-10 space-y-3">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-500">
            {"//"} Blog
          </p>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-100">
            Writing on engineering.
          </h1>
          <p className="max-w-2xl text-sm md:text-base text-slate-400 leading-relaxed">
            Practical notes from building production systems — AI agents,
            distributed backends, and the design decisions that hold up under
            load.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="space-y-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            No posts yet — the first one is in the works.
          </p>
        )}
      </div>
    </main>
  );
}
