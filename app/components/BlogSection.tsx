import Link from "next/link";
import SectionHeading from "./SectionHeading";
import BlogCard from "./BlogCard";
import { getPosts } from "../lib/posts";

export default function BlogSection() {
  const posts = getPosts().slice(0, 3);

  return (
    <section id="blog" className="px-4 sm:px-6 py-24 md:py-32 bg-slate-950/40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="05."
          title="Blog"
          description="Notes on backend engineering, distributed systems, and applied AI — written to be re-read, not just published."
        />

        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-slate-500">Latest posts</span>
          <Link
            href="/blog"
            className="text-xs font-medium text-slate-300 hover:text-white transition-colors"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
