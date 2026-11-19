import SectionHeading from "./SectionHeading";
import BlogIndex from "./BlogIndex";
import { getPosts } from "../lib/posts";

export default function BlogSection() {
  // Read on the server: `lib/posts.ts` touches the filesystem and cannot be
  // bundled into the client component that renders the index.
  const posts = getPosts();

  return (
    <section id="blog" className="px-4 sm:px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="05."
          title="Blog"
          description="Notes on backend engineering, distributed systems, and applied AI, written to be re-read, not just published."
        />
        <BlogIndex posts={posts} limit={4} />
      </div>
    </section>
  );
}
