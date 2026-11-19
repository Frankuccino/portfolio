import type { ReinforcementRef } from "../data/roadmap";
import { projects, skillGroups } from "../data/portfolio";
import { readingStages } from "../data/readingPlan";
import { getPosts } from "./posts";

export type Reinforcement = {
  kind: ReinforcementRef["kind"];
  /** Rendered prefix, so the reader can tell a skill group from a post. */
  kindLabel: string;
  /** The target's own title, read from its data rather than restated here. */
  label: string;
  href: string;
};

const KIND_LABELS: Record<ReinforcementRef["kind"], string> = {
  skillGroup: "Skills",
  project: "Project",
  readingStage: "Reading",
  post: "Post",
};

/**
 * Resolve reinforcement references into renderable links.
 *
 * References are by id, never by URL. The label and the href are read from the
 * target's own data, so renaming a reading stage or a post updates every link
 * that points at it, and a typo throws here rather than surfacing later as a
 * 404 on a recruiter-facing page.
 *
 * Server-only: this reaches `node:fs` through `getPosts`.
 */
export function resolveReinforcements(
  refs: ReinforcementRef[],
): Reinforcement[] {
  return refs.map((ref) => {
    switch (ref.kind) {
      case "skillGroup": {
        const group = skillGroups.find((item) => item.id === ref.id);
        if (!group) {
          throw new Error(`reinforcements: unknown skill group "${ref.id}"`);
        }
        return {
          kind: ref.kind,
          kindLabel: KIND_LABELS[ref.kind],
          label: group.title,
          href: `/#${group.id}`,
        };
      }
      case "project": {
        const project = projects.find((item) => item.id === ref.id);
        if (!project) {
          throw new Error(`reinforcements: unknown project "${ref.id}"`);
        }
        return {
          kind: ref.kind,
          kindLabel: KIND_LABELS[ref.kind],
          label: project.title,
          href: `/#${project.id}`,
        };
      }
      case "readingStage": {
        const stage = readingStages.find((item) => item.id === ref.id);
        if (!stage) {
          throw new Error(`reinforcements: unknown reading stage "${ref.id}"`);
        }
        return {
          kind: ref.kind,
          kindLabel: KIND_LABELS[ref.kind],
          label: stage.label,
          href: `/reading#${stage.id}`,
        };
      }
      case "post": {
        const post = getPosts().find((item) => item.slug === ref.slug);
        if (!post) {
          throw new Error(`reinforcements: unknown post "${ref.slug}"`);
        }
        return {
          kind: ref.kind,
          kindLabel: KIND_LABELS[ref.kind],
          label: post.title,
          href: `/blog/${post.slug}`,
        };
      }
    }
  });
}
