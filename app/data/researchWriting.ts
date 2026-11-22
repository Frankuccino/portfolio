/**
 * The research writing track.
 *
 * A separate track from the reading plan because the skill is different: the
 * books are read in order, the papers are read beside the stage they belong to,
 * and this is written rather than read. The ordering claim is the point of the
 * track: LaTeX is a weekend of work, while constructing a defensible argument is
 * the thing that takes practice.
 *
 * Every resource here is linked to a page that was checked, not to a name that
 * was remembered. An unverified citation on a public page is worse than a
 * missing one.
 */

export type ResearchBook = {
  id: string;
  title: string;
  author: string;
  publisher: string;
  priority: string;
  /** The one sentence that says what the book is for. */
  focus: string;
  topics: string[];
};

export type ResearchResource = {
  title: string;
  author: string;
  purpose: string;
  href: string;
};

export type ResearchPhase = {
  id: string;
  title: string;
  goal: string;
  items: string[];
};

export type ResearchPrinciple = {
  skill: string;
  /** What actually matters about it, as opposed to how it looks. */
  matters: string;
};

export const researchBooks: ResearchBook[] = [
  {
    id: "craft-of-research",
    title: "The Craft of Research",
    author: "Booth, Colomb, Williams, Bizup and Fitzgerald",
    publisher: "University of Chicago Press",
    priority: "Priority 1",
    focus:
      "Learn how to develop a research question into a defensible argument.",
    topics: [
      "Question, problem, evidence, claim, warrant",
      "How to formulate research questions",
      "How to construct convincing arguments",
      "How to anticipate reviewer objections",
    ],
  },
  {
    id: "handbook-of-writing",
    title: "Handbook of Writing for the Mathematical Sciences",
    author: "Nicholas J. Higham",
    publisher: "SIAM, third edition 2020",
    priority: "Priority 2",
    focus: "Learn how to communicate mathematics professionally.",
    topics: [
      "Mathematical notation and structure",
      "Writing mathematical explanations",
      "Abstracts and introductions",
      "Figures, tables and equations",
      "Writing for reviewers and referees",
    ],
  },
];

/**
 * The LaTeX objectives. Kept as a list rather than a phase because they are
 * skills to check off, and because the same work appears as phase 3 of the
 * roadmap: the objectives say what to learn, the phase says when to do it.
 */
export const latexObjectives: string[] = [
  "Understand document structure",
  "Learn sections, subsections and paragraphs",
  "Write mathematical equations",
  "Use equation numbering and references",
  "Manage citations and bibliographies",
  "Insert figures and tables",
  "Learn mathematical environments, matrices and aligned equations",
  "Build a paper using an actual academic template",
];

export const latexResources: ResearchResource[] = [
  {
    title: "LaTeX Cookbook",
    author: "Stefan Kottwitz, Packt",
    purpose: "Practical examples and formatting, with the code online",
    href: "https://latex-cookbook.net",
  },
  {
    title: "Overleaf Documentation",
    author: "Overleaf",
    purpose: "Learn the actual workflow, from a first document to templates",
    href: "https://www.overleaf.com/learn",
  },
];

export const researchResources: ResearchResource[] = [
  {
    title: "How to Read a Paper",
    author: "S. Keshav, ACM SIGCOMM CCR 2007",
    purpose: "Learn to critically read research papers",
    href: "https://web.stanford.edu/class/ee384m/Handouts/HowtoReadPaper.pdf",
  },
  {
    title: "NeurIPS Paper Checklist",
    author: "NeurIPS",
    purpose: "Understand research quality expectations",
    href: "https://neurips.cc/public/guides/PaperChecklist",
  },
  {
    title: "Crafting Papers on Machine Learning",
    author: "ICML",
    purpose: "Examine conference requirements and paper standards",
    href: "https://icml.cc/Conferences/2000/craft.html",
  },
  {
    title: "How to Write ML Papers",
    author: "Sebastian Farquhar",
    purpose: "Structure and present an ML paper so that it lands",
    href: "https://sebastianfarquhar.com/on-research/2024/11/04/how_to_write_ml_papers/",
  },
  {
    title: "How To ML Paper",
    author: "Jakob Foerster",
    purpose: "A brief guide to canonical ML paper structure",
    href: "https://www.jakobfoerster.com/how-to-ml-paper",
  },
  {
    title: "Advice for Authors",
    author: "Jacob Steinhardt",
    purpose: "The local style feedback reviewers give most often",
    href: "https://jsteinhardt.stat.berkeley.edu/blog/advice-for-authors",
  },
];

export const researchPhases: ResearchPhase[] = [
  {
    id: "phase-1",
    title: "Phase 1: Understand research writing",
    goal: "Read the two books that frame the work, then learn to read a paper properly.",
    items: [
      "Read The Craft of Research",
      "Read Keshav's How to Read a Paper",
      "Select three research papers in your area of interest",
      "Reverse-outline each paper: its question, motivation, methodology, results and conclusion",
    ],
  },
  {
    id: "phase-2",
    title: "Phase 2: Mathematical communication",
    goal: "Turn notation and structure into explanations a reader can follow.",
    items: [
      "Study Higham's handbook",
      "Practice explaining mathematical concepts in your own words",
      "Practice writing equations and defining notation",
      "Learn how to explain assumptions, derivations and results",
    ],
  },
  {
    id: "phase-3",
    title: "Phase 3: LaTeX implementation",
    goal: "Learn the tool by producing a real document, not by studying it.",
    items: [
      "Set up an Overleaf account",
      "Follow its introductory tutorials",
      "Build a document using a real research paper template",
      "Implement equations, citations, figures, tables and references",
    ],
  },
  {
    id: "phase-4",
    title: "Phase 4: Research idea development",
    goal: "Write a one page research idea memo containing:",
    items: [
      "Research question",
      "Why the problem matters",
      "Your proposed claim or contribution",
      "What evidence would convince a skeptical reader",
    ],
  },
  {
    id: "phase-5",
    title: "Phase 5: Review and refinement",
    goal: "Hold your own writing to the standard a reviewer will apply.",
    items: [
      "Compare your writing against the NeurIPS and ICML checklists",
      "Review your argument for unsupported claims",
      "Improve clarity, structure and mathematical precision",
      "Get someone to review your draft",
    ],
  },
];

export const researchPrinciples: ResearchPrinciple[] = [
  {
    skill: "LaTeX",
    matters: "Knowing how to produce a properly formatted paper",
  },
  {
    skill: "Mathematics writing",
    matters: "Explaining technical ideas precisely",
  },
  {
    skill: "Research writing",
    matters: "Constructing a defensible argument",
  },
  {
    skill: "Research methodology",
    matters: "Producing evidence that supports your claims",
  },
  {
    skill: "Scientific communication",
    matters: "Surviving critical evaluation by reviewers",
  },
];

/** The order the whole track is worked in. */
export const researchReadingOrder: string[] = [
  "The Craft of Research",
  "Handbook of Writing for the Mathematical Sciences",
  "Keshav's How to Read a Paper",
  "LaTeX Cookbook with the Overleaf tutorials",
  "Your own one page research proposal",
];
