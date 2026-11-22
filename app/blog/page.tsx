import Link from "next/link";
import type { Metadata } from "next";
import { canonical } from "../lib/siteUrl";
import { getPosts } from "../lib/posts";
import { roadmapSteps } from "../data/roadmap";
import BlogIndex from "../components/BlogIndex";

export const metadata: Metadata = {
  title: "Blog · Frank Angelo Malubag",
  description:
    "Notes on backend engineering, distributed systems, and applied AI engineering.",
  alternates: { canonical: canonical("/blog") },
};

export default function BlogArchive() {
  const posts = getPosts();

  return (
    <main className="px-4 sm:px-6 pt-28 pb-24 min-h-screen">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="text-xs text-slate-400 hover:text-slate-300 transition-colors"
        >
          ← Back to home
        </Link>

        <div className="mt-6 mb-10 space-y-3">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
            {"//"} Blog
          </p>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight font-display text-slate-100">
            Writing on engineering.
          </h1>
          <p className="max-w-2xl text-sm md:text-base text-slate-400 leading-relaxed">
            Practical notes from building production systems: AI agents,
            distributed backends, and the design decisions that hold up under
            load.
          </p>
        </div>

        {/* Same ruled index as the home page, minus the link to itself. The
            archive is the full catalog rather than a four-row preview. */}
        {posts.length > 0 ? (
          <BlogIndex posts={posts} showArchiveLink={false} />
        ) : (
          <p className="text-sm text-slate-400">
            No posts yet: the first one is in the works.
          </p>
        )}

        {/* The index points forward: the plan behind the notes. Derived from
            the roadmap data so it cannot drift from /plan. */}
        <Link
          href="/plan"
          className="group mt-6 flex items-baseline gap-3 px-3 py-3 rounded-lg border border-slate-800/70 hover:border-[#3e6274]/50 hover:bg-slate-900/30 transition-colors"
        >
          <span className="shrink-0 text-[11px] font-mono uppercase tracking-widest text-[#5f93a8]">
            /plan
          </span>
          <span className="flex-1 min-w-0">
            <span className="block text-sm font-semibold text-slate-100 group-hover:text-white transition-colors">
              Where I&apos;m headed
            </span>
            <span className="block text-xs text-slate-400 mt-0.5">
              {roadmapSteps.length} steps, starting{" "}
              {roadmapSteps[0].order.toLowerCase()}: the plan behind these
              notes.
            </span>
          </span>
          <span className="shrink-0 text-xs font-mono text-slate-400 group-hover:text-slate-300 transition-colors">
            Open →
          </span>
        </Link>
      </div>
    </main>
  );
}
