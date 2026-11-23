import {
  paperCategories,
  readingPapers,
  readingBookCount,
  readingStages,
} from "./readingPlan";
import {
  latexObjectives,
  researchBooks,
  researchPhases,
  researchPrinciples,
} from "./researchWriting";

/**
 * The foundation's counterpart to the plan page's coverage gauge, on a different
 * measure.
 *
 * The plan page asks what the credentials cover. This asks how directly each
 * part of the foundation serves AI engineering, which is a property of the
 * material rather than a count of hours. Hours were the first attempt here and
 * were the wrong question: they say how long something takes, not whether it
 * matters.
 *
 * Tiers are declared from each part's own objective, not measured, and the
 * percentage is the share of that track's items. A stage whose objective is
 * building systems is core; one that supplies the mathematics or the craft
 * underneath is supporting; one about people or a domain is adjacent.
 */

export type RelevanceTier = "core" | "supporting" | "adjacent";

export const relevanceTiers: {
  id: RelevanceTier;
  label: string;
  blurb: string;
}[] = [
  {
    id: "core",
    label: "Core",
    blurb: "Directly about building AI systems.",
  },
  {
    id: "supporting",
    label: "Supporting",
    blurb: "The mathematics, craft and reference underneath.",
  },
  {
    id: "adjacent",
    label: "Adjacent",
    blurb: "People, process and domain. Makes the core usable rather than being part of it.",
  },
];

/** Declared from each stage's own objective. */
const stageTier: Record<string, RelevanceTier> = {
  statistics: "supporting",
  core: "core",
  llm: "core",
  architecture: "core",
  craft: "supporting",
  reference: "supporting",
  forward: "adjacent",
  elective: "adjacent",
};

/** The papers were selected as primary sources for the technical stages. */
const categoryTier: Record<string, RelevanceTier> = {
  architecture: "core",
  retrieval: "core",
  alignment: "core",
  reasoning: "core",
  agents: "core",
  serving: "core",
};

export type FoundationBar = {
  id: string;
  label: string;
  tier: RelevanceTier;
  /** How many items in the track sit here. */
  count: number;
  /** Exact share of the track's items, used for the bar width. */
  share: number;
  /** Share rounded for display. */
  percent: number;
  /** Where the row navigates, carrying the highlight that selects these items. */
  href: string;
};

const trackShare = (count: number, total: number) => (count / total) * 100;

/** Books: share of the reading by stage. */
export const bookCoverage: FoundationBar[] = readingStages.map((stage) => {
  const count = stage.books.length;
  return {
    id: stage.id,
    label: stage.label,
    tier: stageTier[stage.id] ?? "supporting",
    count,
    share: trackShare(count, readingBookCount),
    percent: Math.round(trackShare(count, readingBookCount) * 10) / 10,
    href: `/books?highlight=${stage.id}`,
  };
});

/** Papers: share of the papers by category. */
export const paperCoverage: FoundationBar[] = paperCategories.map((category) => {
  const count = readingPapers.filter(
    (paper) => paper.category === category.id,
  ).length;
  return {
    id: category.id,
    label: category.label,
    tier: categoryTier[category.id] ?? "core",
    count,
    share: trackShare(count, readingPapers.length),
    percent: Math.round(trackShare(count, readingPapers.length) * 10) / 10,
    href: `/papers?highlight=${category.id}`,
  };
});

/** Writing: one row, and a different shape, because the track is not itemised. */
export const writingCoverage: FoundationBar = {
  id: "writing",
  label: "Research writing",
  tier: "adjacent",
  count: researchPhases.length,
  share: 100,
  percent: 100,
  href: "/research-writing",
};

export const writingComposition = [
  { id: "books", label: "Books", count: researchBooks.length },
  { id: "principles", label: "Principles", count: researchPrinciples.length },
  { id: "phases", label: "Phases", count: researchPhases.length },
  {
    id: "phase-items",
    label: "Phase items",
    count: researchPhases.reduce((total, phase) => total + phase.items.length, 0),
  },
  { id: "latex", label: "LaTeX objectives", count: latexObjectives.length },
];

/**
 * How the books and papers fall across the tiers. The writing track is left out
 * because its items are not the same kind of thing as a book or a paper.
 */
export const foundationTierSplit = (() => {
  const items = [
    ...readingStages.flatMap((stage) =>
      stage.books.map(() => stageTier[stage.id] ?? "supporting"),
    ),
    ...readingPapers.map((paper) => categoryTier[paper.category] ?? "core"),
  ];
  const total = items.length;
  return relevanceTiers.map((tier) => {
    const count = items.filter((entry) => entry === tier.id).length;
    return {
      ...tier,
      count,
      share: trackShare(count, total),
      percent: Math.round(trackShare(count, total) * 10) / 10,
    };
  });
})();

export const foundationItemCount = readingBookCount + readingPapers.length;
