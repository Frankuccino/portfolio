import { roadmapSteps, type RoadmapStep } from "./roadmap";
import { takeawaySections } from "./takeaways";

/**
 * Coverage: which parts of the field the condensed map carries weight in.
 *
 * The denominator is the concept count of `takeaways.ts`, not hours. Hours are
 * published for only three of the seven plan steps, and a two hour methodology
 * resource would render as a zero width bar next to a 176 hour certificate even
 * though it changes the work more. Concepts are counted from the map itself, so
 * the total is derived rather than asserted.
 *
 * This measures where the map is heavy. It is not a measure of skill, and the
 * component says so.
 */

export type CoverageArea = {
  id: string;
  title: string;
  /** Short form for the table header. */
  short: string;
  /** The condensed map sections this area draws from. */
  sections: string[];
  statement: string;
  /** Plan steps that feed it, by step id. */
  steps: string[];
};

export const coverageAreas: CoverageArea[] = [
  {
    id: "ml-and-model-fundamentals",
    title: "Machine learning and model fundamentals",
    short: "ML and models",
    sections: ["the-shape-of-the-field", "the-model-layer"],
    statement:
      "What a model is and what you can ask of it: the nesting of the field, the controls on a call, the message and output shapes, and the mathematics underneath.",
    steps: ["microsoft-ai-ml-engineering", "stanford-cs221"],
  },
  {
    id: "prompting-and-language-applications",
    title: "Prompting and language applications",
    short: "Prompts and text",
    sections: ["prompting", "the-text-tasks"],
    statement:
      "How you ask, and what the model is asked to do: the prompting patterns, and the text tasks grouped by the family each one belongs to.",
    steps: [
      "datacamp-ai-engineer-developers",
      "duke-llmops-specialization",
      "langchain-academy",
    ],
  },
  {
    id: "retrieval",
    title: "Retrieval",
    short: "Retrieval",
    sections: ["retrieval"],
    statement:
      "How a model answers from knowledge it was never trained on: embeddings, vector search, chunking, and the RAG pattern.",
    steps: ["datacamp-ai-engineer-developers", "duke-llmops-specialization"],
  },
  {
    id: "agents-tools-and-protocols",
    title: "Agents, tools and protocols",
    short: "Agents and tools",
    sections: ["agents-and-tools"],
    statement:
      "How a model acts: chains versus agents, function calling, and the protocol that lets it reach outside itself.",
    steps: ["datacamp-ai-engineer-developers", "langchain-academy"],
  },
  {
    id: "engineering-and-operations",
    title: "Engineering and operations",
    short: "Engineering and ops",
    sections: ["engineering-discipline", "operations"],
    statement:
      "How it holds up: the software discipline around the model, and the operations layer that keeps it running.",
    steps: [
      "datacamp-ai-engineer-developers",
      "duke-mlops-specialization",
      "duke-llmops-specialization",
    ],
  },
  {
    id: "evaluation-and-the-wider-field",
    title: "Evaluation and the wider field",
    short: "Evaluation",
    sections: ["beyond-the-track"],
    statement:
      "How you know it works: error analysis, judges, significance, and the vocabulary the courses stop short of.",
    steps: ["ai-evals-faq", "langchain-academy"],
  },
];

/** Concepts in a set of sections, counted from the map. */
const conceptsIn = (ids: string[]) =>
  ids.reduce((sum, id) => {
    const section = takeawaySections.find((entry) => entry.id === id);
    return (
      sum + (section ? section.families.reduce((n, family) => n + family.concepts.length, 0) : 0)
    );
  }, 0);

export const coverageTotal = coverageAreas.reduce(
  (sum, area) => sum + conceptsIn(area.sections),
  0,
);

/** Concepts in each area, with its share of the whole map. */
export const coverageStats = coverageAreas.map((area) => {
  const concepts = conceptsIn(area.sections);
  return {
    ...area,
    concepts,
    percent: Math.round((concepts / coverageTotal) * 1000) / 10,
  };
});

/** Step titles for the "feeding" line, resolved from the plan. */
export const coverageFeeding = (area: CoverageArea) =>
  area.steps
    .map((id) => roadmapSteps.find((step) => step.id === id)?.title)
    .filter((title): title is string => Boolean(title));

/**
 * How each step's own content splits across the areas. This is declared, not
 * measured: it is read off each step's published syllabus and stored here so it
 * can be corrected in one place. Only the DataCamp track has a concept level
 * record behind it, and that is what `coverageStats` reports above.
 *
 * Every row sums to 100. A zero means the step does not touch the area at all,
 * which is the point of the view.
 */
export const stepComposition: Record<string, Partial<Record<string, number>>> = {
  "datacamp-ai-engineer-developers": {
    "ml-and-model-fundamentals": 15,
    "prompting-and-language-applications": 25,
    retrieval: 15,
    "agents-tools-and-protocols": 20,
    "engineering-and-operations": 15,
    "evaluation-and-the-wider-field": 10,
  },
  "microsoft-ai-ml-engineering": {
    "ml-and-model-fundamentals": 40,
    "prompting-and-language-applications": 10,
    retrieval: 5,
    "agents-tools-and-protocols": 15,
    "engineering-and-operations": 25,
    "evaluation-and-the-wider-field": 5,
  },
  "duke-mlops-specialization": {
    "ml-and-model-fundamentals": 10,
    "prompting-and-language-applications": 0,
    retrieval: 0,
    "agents-tools-and-protocols": 5,
    "engineering-and-operations": 80,
    "evaluation-and-the-wider-field": 5,
  },
  "duke-llmops-specialization": {
    "ml-and-model-fundamentals": 15,
    "prompting-and-language-applications": 20,
    retrieval: 10,
    "agents-tools-and-protocols": 10,
    "engineering-and-operations": 35,
    "evaluation-and-the-wider-field": 10,
  },
  "langchain-academy": {
    "ml-and-model-fundamentals": 5,
    "prompting-and-language-applications": 15,
    retrieval: 10,
    "agents-tools-and-protocols": 40,
    "engineering-and-operations": 15,
    "evaluation-and-the-wider-field": 15,
  },
  "ai-evals-faq": {
    "ml-and-model-fundamentals": 5,
    "prompting-and-language-applications": 5,
    retrieval: 5,
    "agents-tools-and-protocols": 10,
    "engineering-and-operations": 15,
    "evaluation-and-the-wider-field": 60,
  },
  "stanford-cs221": {
    "ml-and-model-fundamentals": 80,
    "prompting-and-language-applications": 0,
    retrieval: 0,
    "agents-tools-and-protocols": 5,
    "engineering-and-operations": 5,
    "evaluation-and-the-wider-field": 10,
  },
};

/**
 * Published hours per step, for the plan-level bar below the table.
 *
 * A course contributes its own `hours` when the issuer publishes one, otherwise
 * the sum of its modules' hours. Steps that publish nothing at all are excluded
 * rather than estimated, and named on the page: a "whole" that silently drops
 * three of seven steps would be the same mistake as a percentage with no
 * denominator.
 */
const publishedHours = (step: RoadmapStep): number | null => {
  let total = 0;
  let found = false;
  for (const course of step.courses ?? []) {
    if (course.hours) {
      total += course.hours;
      found = true;
      continue;
    }
    for (const entry of course.modules ?? []) {
      if (entry.hours) {
        total += entry.hours;
        found = true;
      }
    }
  }
  return found ? total : null;
};

export const planHours = roadmapSteps
  .map((step) => ({ step, hours: publishedHours(step) }))
  .filter((entry): entry is { step: RoadmapStep; hours: number } => entry.hours !== null);

export const planHoursTotal = planHours.reduce((sum, entry) => sum + entry.hours, 0);

export const planHoursMissing = roadmapSteps.filter(
  (step) => publishedHours(step) === null,
);
