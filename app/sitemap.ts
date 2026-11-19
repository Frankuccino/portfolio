import type { MetadataRoute } from "next";
import { getPosts } from "./lib/posts";
import { roadmapSteps } from "./data/roadmap";
import { siteUrl } from "./lib/siteUrl";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts: MetadataRoute.Sitemap = getPosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const steps: MetadataRoute.Sitemap = roadmapSteps.flatMap((step) => [
    {
      url: `${siteUrl}/next/${step.id}`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...(step.courses ?? []).flatMap((course) => [
      {
        url: `${siteUrl}/next/${step.id}/${course.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.4,
      },
      ...course.modules.map((module) => ({
        url: `${siteUrl}/next/${step.id}/${course.slug}/${module.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.3 as const,
      })),
    ]),
  ]);

  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/reading`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/next`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...steps,
    ...posts,
  ];
}
