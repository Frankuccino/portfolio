import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, getPosts, formatDate } from "../../lib/posts";
import { Markdown } from "../../lib/markdown";

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: `${post.title} — Frank Angelo Malubag`, description: post.excerpt };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="px-4 sm:px-6 pt-28 pb-24 min-h-screen">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          ← Back to all posts
        </Link>

        <header className="mt-6 mb-8 space-y-3">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-500">
            <span>{formatDate(post.date)}</span>
            {post.tags.length > 0 ? (
              <>
                <span className="text-slate-700">·</span>
                <span>{post.tags.join(" · ")}</span>
              </>
            ) : null}
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-100 leading-tight">
            {post.title}
          </h1>
          <p className="text-sm md:text-base text-slate-400 leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        <Markdown content={post.content} />

        <div className="mt-12 pt-6 border-t border-slate-800/60 flex items-center justify-between">
          <Link
            href="/blog"
            className="text-xs font-medium text-slate-300 hover:text-white transition-colors"
          >
            ← All posts
          </Link>
          <Link
            href="/#contact"
            className="text-xs font-medium text-slate-300 hover:text-white transition-colors"
          >
            Get in touch →
          </Link>
        </div>
      </article>
    </main>
  );
}
