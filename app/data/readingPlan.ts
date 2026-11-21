export type ChapterPriority = "focus" | "skim" | "reference";

export type BookFocus = {
  /** Chapter label as published, e.g. "6. RAG and Agents" */
  chapter: string;
  /** Why this chapter earns its pages */
  why: string;
  priority: ChapterPriority;
};

export type ReadingBook = {
  order: number;
  title: string;
  author: string;
  /** Publisher print page count */
  pages: number;
  /** Estimated hours at 2.5 minutes per page */
  hours: number;
  /** One-line hook shown on the index card */
  tagline: string;
  /** Minimum daily reading commitment, in minutes */
  dailyCommitment: number;
  /** Total consolidation time after reading: recall + LLM reinforcement + capstone */
  consolidationHours: number;
  /** Prompt to hand an LLM (with the notes you just took) to reinforce the book */
  reinforcementPrompt: string;
  /** Why this book, in this stage */
  why: string;
  focus: BookFocus[];
  handsOn: string[];
  stressTest: string[];
  /** Document type — the Engelbart framework is a 1962 report, not a book */
  kind?: "book" | "report";
  /** FDE sub-track: Intelligence Augmentation, Customer Discovery, or Execution & Adaptability */
  track?: string;
  /** Priority rating for the FDE material */
  priority?: "very-high" | "high" | "medium";
  /** Open Library CoverID. Keyed on `id`, never ISBN — see references/artwork-apis.md */
  coverId?: number;
  /** Google Books volume id, used when Open Library has no art for the title */
  googleBooksId?: string;
  /** Set when the focus list is the publisher's topic list, not chapter titles. */
  focusNote?: string;
  /**
   * Short material to consume before the book itself, for a book that assumes a
   * vocabulary the reader may not have. Rendered ahead of the chapter map.
   */
  warmup?: { title: string; note: string }[];
};

export type ReadingStage = {
  id: string;
  label: string;
  /** What the reader walks out of the stage able to do */
  objective: string;
  note: string;
  /** Counted in the core-path total; reference shelves and electives are not. */
  inCorePath: boolean;
  /** Sits alongside the sequence rather than after it, so it carries no number. */
  parallel?: boolean;
  pages: number;
  hours: number;
  books: ReadingBook[];
};

/**
 * A primary source, read beside the stage it belongs to rather than as part of
 * the book sequence. A paper is not a book: no cover, no page count, no chapter
 * map, and the consolidation model does not apply, so it carries its own shape
 * instead of borrowing the book's.
 */
export type ReadingPaper = {
  /** Stable id, so a reference to it survives a title change. */
  id: string;
  title: string;
  /** First author and et al., the way the paper cites itself. */
  authors: string;
  year: number;
  /** arXiv id, or null for a specification, which links to its own document. */
  arxiv: string | null;
  /** Canonical document for a source that is not on arXiv. */
  source?: { label: string; href: string };
  /** The question it answered when it appeared. */
  problem: string;
  /** The one idea it introduced. */
  move: string;
  /** What it changes about how you build. */
  forYourWork: string;
  /** One plain sentence on what the paper is, for a first read. */
  plain: string;
  /**
   * Estimated read time. A paper is read twice, once for the idea and once for
   * the method, so this is not a page count and is not derived from one.
   */
  hours: number;
  /** Category id, from `paperCategories`. What the paper is about. */
  category: string;
  /** Stage id, from `paperStages`. When you read it. */
  stage: string;
  /** The book stage this sits beside, resolved to that stage's own title. */
  pairsWith: { kind: "stage"; id: string };
};

/**
 * The technical domains the papers fall into. A paper belongs to exactly one.
 *
 * The category is a property of the paper, while the stage is a decision about
 * the reader: the same category can be read in different stages, and two papers
 * in one stage can come from different categories.
 */
export const paperCategories = [
  { id: "architecture", label: "Core Architecture & Hardware Speed" },
  { id: "retrieval", label: "Memory, Context & Retrieval" },
  { id: "alignment", label: "Fine-Tuning & Alignment" },
  { id: "reasoning", label: "Prompting & Reasoning" },
  { id: "agents", label: "Agents & Tool Use" },
  { id: "serving", label: "Production Serving & Inference" },
] as const;

/**
 * The order the papers are read in, as a four-stage sequence.
 *
 * Deliberately not chronological. Each stage answers the question the previous
 * one raised, and the systems papers come last because they only pay off once
 * you know why the models are slow and memory-hungry. The array order of
 * `readingPapers` is the order within a stage.
 */
export const paperStages = [
  {
    id: "core-prompting",
    label: "Core Architecture & Prompting",
    note: "Start here. Understand how the base engine works and how to steer it with text alone.",
  },
  {
    id: "retrieval-agents",
    label: "Retrieval & Agents",
    note: "Building applications: connect the model to external data and to tools.",
  },
  {
    id: "fine-tuning-alignment",
    label: "Fine-Tuning & Alignment",
    note: "Customising models: change the weights, then change the behaviour.",
  },
  {
    id: "hardware-inference",
    label: "Hardware & Inference Optimization",
    note: "Save for last. Dense systems papers, read once you know why serving is slow.",
  },
] as const;

export function paperCategory(id: string) {
  return paperCategories.find((category) => category.id === id);
}

/**
 * Priority order for the AI engineering stack, as written up in the vault note
 * `Readings/AI Engineering Reading Plan.md`. Stages 1 and 2 are read cover to
 * cover; stage 3 is a reference shelf.
 *
 * Chapter lists verified against the publisher pages (O'Reilly, Packt, Google
 * Books) — not from memory.
 */
/**
 * Stage totals are derived from the books — a hand-typed total does not fail the
 * build, it just reads as correct.
 */
type ReadingStageDraft = Omit<ReadingStage, "pages" | "hours">;

const readingStageList: ReadingStageDraft[] = [
  {
    id: "statistics",
    label: "Stage 1: Statistics Foundations",
    objective:
      "Read a distribution before you model one: location, spread, sampling, and what a measured difference actually means.",
    note: "Watch the six warmup videos first, then read chapter by chapter.",
    inCorePath: true,
    books: [
      {
        order: 1,
        title: "Practical Statistics for Data Scientists, 2nd Edition",
        googleBooksId: "k2XcDwAAQBAJ",
        author: "Peter Bruce, Andrew Bruce & Peter Gedeck",
        pages: 368,
        hours: 15,
        tagline:
          "50+ Essential Concepts Using R and Python: distributions, sampling, experiments, and the tests that separate signal from noise",
        dailyCommitment: 45,
        consolidationHours: 5.5,
        reinforcementPrompt:
          "You are a statistics examiner for my read of Practical Statistics for Data Scientists. Context I just learned: <paste your notes on exploratory data analysis, estimates of location and variability, boxplots and percentiles, data and sampling distributions, the bootstrap, confidence intervals, hypothesis tests and p-values, regression, classification, and clustering>. Question me one at a time: start with what a z-score measures and what it assumes, then why the median and IQR survive outliers that break the mean and standard deviation, then what the central limit theorem actually says, then the difference between a p-value and a confidence interval, then when a statistically significant result is still worthless. If I stall, explain and give a small worked example, then re-ask differently. End by having me walk through a full analysis of a dataset from memory.",
        why: "The gap the AI & ML course exposed. Everything downstream assumes this vocabulary: evaluation metrics, drift, A/B tests, confidence intervals on a model's accuracy, outlier handling in training data. The course could use those ideas without building them, and that is the hole. Read it first so the rest of the stack has a floor under it.",
        warmup: [
          {
            title: "StatQuest: Histograms, Clearly Explained",
            note: "How raw data is grouped and visualized, so a normal curve and a skewed one stop looking the same.",
          },
          {
            title: "The Main Ideas behind Probability Distributions",
            note: "Why data forms shapes, and how probability connects to where values land.",
          },
          {
            title: "The Normal Distribution, Clearly Explained!!!",
            note: "The bell curve, and why standard deviations define how spread out the data is.",
          },
          {
            title: "Statistics Fundamentals: The Mean, Variance and Standard Deviation",
            note: "The exact ingredients inside the z-score formula, step by step.",
          },
          {
            title: "Boxplots, Clearly Explained",
            note: "Medians, quartiles, and the IQR: the main alternative to z-scores when the data is not a neat bell curve.",
          },
          {
            title: "Quantiles and Percentiles, Clearly Explained",
            note: "How data is sliced into ranks without relying on averages that extreme outliers pull around.",
          },
        ],
        focus: [
          { chapter: "1. Exploratory Data Analysis", why: "Location, variability, distribution, percentiles and boxplots, correlation. The chapter the z-score lives in.", priority: "focus" },
          { chapter: "2. Data and Sampling Distributions", why: "Random sampling and bias, the central limit theorem, the bootstrap, confidence intervals, the normal distribution and QQ-plots.", priority: "focus" },
          { chapter: "3. Statistical Experiments and Significance Testing", why: "Hypothesis tests, p-values, t-tests, ANOVA, chi-square, and power. How a measured difference becomes evidence.", priority: "focus" },
          { chapter: "4. Regression and Prediction", why: "Simple and multiple regression, diagnostics, outliers, and the dangers of extrapolation.", priority: "focus" },
          { chapter: "5. Classification", why: "Naive Bayes, logistic regression, evaluating classifiers, and the strategies for imbalanced data.", priority: "focus" },
          { chapter: "6. Statistical Machine Learning", why: "KNN, tree models, bagging, random forests, and boosting. Overlaps the reference shelf.", priority: "skim" },
          { chapter: "7. Unsupervised Learning", why: "PCA, k-means, hierarchical and model-based clustering. Overlaps the reference shelf.", priority: "skim" },
        ],
        handsOn: [
          "Run the companion repository's Chapter 1 notebook alongside the reading, and change the numbers to see what moves.",
          "Compute the mean, variance, standard deviation, and z-scores for a real dataset in numpy and pandas, from scratch and then with the library call.",
          "Before each new chapter, look the unfamiliar term up on the StatQuest video index and watch the short clip first.",
          "Repeat one chapter's analysis on a dataset you already have and name which chapter concept each step was.",
        ],
        stressTest: [
          "What is a z-score, and what does it assume that an IQR does not?",
          "Why does a sample mean have a sampling distribution, and what does the central limit theorem buy you?",
          "What is the difference between a p-value and a confidence interval, and what does each one not tell you?",
          "When is a difference statistically significant but practically meaningless?",
          "How do you handle an outlier, and when should you not?",
        ],
      },
    ],
  },
  {
    id: "core",
    label: "Stage 2: AI & ML Engineering Core",
    objective: "Foundation models as components, and how to design around what they get wrong.",
    note: "Read fully, in order. The mental model.",
    inCorePath: true,
    books: [
      {
        order: 2,
        title: "AI Engineering",
        coverId: 15091156,
        author: "Chip Huyen",
        pages: 534,
        hours: 22,
        tagline: "The map of the whole field",
        dailyCommitment: 60,
        consolidationHours: 6.5,
        reinforcementPrompt: "You are a staff engineer stress-testing my read of Chip Huyen's AI Engineering. Context I just learned: <paste your notes on evaluation methodology, AI-as-a-judge, prompt injection, RAG and agents, and the five-step AI engineering architecture>. Question me one at a time: start with when to fine-tune versus RAG, then why open-ended evaluation is harder than classification, then how the five architecture steps compose. If I stall, explain it and give a production example, then re-ask in different words. End by having me design a RAG feature from memory.",
        why: "The map of the territory: how AI engineering differs from ML engineering, and the full application lifecycle from prompt to production. Read it first so every later book has a place to land.",
        focus: [
          { chapter: "1. Introduction to Building AI Applications with Foundation Models", why: "The framing: AI engineering vs ML engineering, and the three-layer AI stack.", priority: "focus" },
          { chapter: "2. Understanding Foundation Models", why: "How the models actually work: training data, architecture, sampling, structured outputs.", priority: "focus" },
          { chapter: "3. Evaluation Methodology", why: "The evaluation mindset. The hardest and most neglected part of the book.", priority: "focus" },
          { chapter: "4. Evaluate AI Systems", why: "AI-as-a-judge, benchmarks, and choosing metrics for open-ended output.", priority: "focus" },
          { chapter: "5. Prompt Engineering", why: "Defensive prompting and prompt injection, directly relevant to the agent work you ship.", priority: "focus" },
          { chapter: "6. RAG and Agents", why: "Retrieval and agent patterns. The core of your current stack.", priority: "focus" },
          { chapter: "7. Finetuning", why: "When to fine-tune versus RAG, and what each costs. Read the decision framework, skim the math.", priority: "skim" },
          { chapter: "8. Dataset Engineering", why: "Data curation, synthesis, and distillation. Useful context, not a blocker.", priority: "skim" },
          { chapter: "9. Inference Optimization", why: "Latency and cost. Worth knowing, but revisit when you have a real bottleneck.", priority: "skim" },
          { chapter: "10. AI Engineering Architecture and User Feedback", why: "The five-step architecture: context, guardrails, router, cache, agents. The book's payoff.", priority: "focus" },
        ],
        handsOn: [
          "Build an evaluation harness for one LLM feature: a golden set, a judge prompt, and a pass rate.",
          "Add prompt-injection defenses to an existing agent, then attack it with a red-team script.",
          "Instrument a RAG path end to end and measure the latency of each stage.",
        ],
        stressTest: [
          "What is the difference between AI engineering and ML engineering, and why does it change how you ship?",
          "Why is evaluation harder for open-ended models than for classification, and what are the main approaches?",
          "When should you choose fine-tuning over RAG, and what does each one cost?",
          "What are the five steps of the AI engineering architecture, in order?",
          "Why is prompt injection so hard to defend against?",
        ],
      },
      {
        order: 3,
        title: "Designing Machine Learning Systems",
        coverId: 13314480,
        author: "Chip Huyen",
        pages: 386,
        hours: 16,
        tagline: "The ML system lifecycle",
        dailyCommitment: 45,
        consolidationHours: 7,
        reinforcementPrompt: "You are an ML systems reviewer for my read of Chip Huyen's Designing Machine Learning Systems. Context I just learned: <paste your notes on data engineering, training data, feature engineering, deployment, and monitoring>. Question me one at a time: start with what makes an ML system more than a model, then data leakage, then training/serving skew, then what to monitor in production. If I stall, explain and give a concrete example, then re-ask differently. End by having me write a monitoring spec for a deployed model from memory.",
        why: "The systems thinking behind ML in production. It makes the rest of the stack legible (data, features, deployment, monitoring) as one design problem.",
        focus: [
          { chapter: "1. Overview of Machine Learning Systems", why: "The system view versus the model view. The book's central argument.", priority: "focus" },
          { chapter: "2. Introduction to Machine Learning Systems Design", why: "The iterative design framework the rest of the book follows.", priority: "focus" },
          { chapter: "3. Data Engineering Fundamentals", why: "Storage, processing, and the data stack decisions that shape everything else.", priority: "focus" },
          { chapter: "4. Training Data", why: "Labeling, sampling, and the class-imbalance traps.", priority: "focus" },
          { chapter: "5. Feature Engineering", why: "Leakage, feature importance, and generalization. Where most projects quietly fail.", priority: "focus" },
          { chapter: "6. Model Development and Offline Evaluation", why: "Baselines, experiment tracking, and offline evaluation done properly.", priority: "focus" },
          { chapter: "7. Model Deployment and Prediction Service", why: "Serving patterns, batch versus online, and the cost of getting it wrong.", priority: "focus" },
          { chapter: "8. Data Distribution Shifts and Monitoring", why: "The drift taxonomy and what to watch in production.", priority: "focus" },
          { chapter: "9. Continual Learning and Test in Production", why: "Retraining strategies and testing in production. Skim unless you are running a live model.", priority: "skim" },
          { chapter: "10. Infrastructure and Tooling for MLOps", why: "The platform layer. Skim for the vocabulary.", priority: "skim" },
          { chapter: "11. The Human Side of Machine Learning", why: "Stakeholders, responsibility, and ethics. Reference.", priority: "reference" },
        ],
        handsOn: [
          "Design a feature store schema for one use case and write the leakage checks for it.",
          "Write the monitoring spec for a deployed model: metrics, thresholds, and the rollback trigger.",
          "Build a training/serving skew detector on a small dataset.",
        ],
        stressTest: [
          "What are the parts of an ML system besides the model, and why do they dominate the effort?",
          "What is data leakage, and how do you detect it before it reaches production?",
          "What is training/serving skew, and how does it happen?",
          "How do you decide what to monitor once a model is live?",
          "What is the iterative framework the book proposes, and what happens at each step?",
        ],
      },
      {
        order: 4,
        title: "LLM Engineer's Handbook",
        googleBooksId: "_ijcEQAAQBAJ",
        author: "Paul Iusztin & Maxime Labonne",
        pages: 522,
        hours: 22,
        tagline: "Applied AI engineering, end to end",
        dailyCommitment: 60,
        consolidationHours: 7,
        reinforcementPrompt: "You are a senior LLM engineer reviewing my read of the LLM Engineer's Handbook. Context I just learned: <paste your notes on the feature, training, and inference pipelines, RAG, supervised fine-tuning, evaluation, deployment, and LLMOps>. Question me one at a time: start with why RAG is a feature pipeline, then supervised fine-tuning versus preference alignment, then what LLM evaluation needs that classification evaluation does not. If I stall, explain and give a worked example, then re-ask differently. End by having me design the three pipelines for a small domain from memory.",
        why: "The end-to-end build. One product (the LLM Twin) taken from data through RAG, fine-tuning, deployment, and LLMOps, so the pieces stay connected.",
        focus: [
          { chapter: "1. Understanding the LLM Twin Concept and Architecture", why: "The pipeline mental model: feature, training, and inference pipelines.", priority: "focus" },
          { chapter: "2. Tooling and Installation", why: "Setup. Skim it and come back when something breaks.", priority: "skim" },
          { chapter: "3. Data Engineering", why: "The data collection pipeline and the orchestrator that runs it.", priority: "focus" },
          { chapter: "4. RAG Feature Pipeline", why: "RAG as a feature pipeline, not a prompt trick.", priority: "focus" },
          { chapter: "5. Supervised Fine-Tuning", why: "The fine-tuning path: data, training, and evaluation.", priority: "focus" },
          { chapter: "6. Fine-Tuning with Preference Alignment", why: "DPO and friends. Skim unless you are aligning a model.", priority: "skim" },
          { chapter: "7. Evaluating LLMs", why: "Offline and online evaluation, and why LLM eval is its own discipline.", priority: "focus" },
          { chapter: "8. Inference Optimization", why: "Quantization, batching, and caching. Skim until you have a latency budget.", priority: "skim" },
          { chapter: "9. RAG Inference Pipeline", why: "Retrieval plus generation, wired together and observable.", priority: "focus" },
          { chapter: "10. Inference Pipeline Deployment", why: "Deployment types, autoscaling, and the serving trade-offs.", priority: "focus" },
          { chapter: "11. MLOps and LLMOps", why: "The theory, at the end, once the practice has made it concrete.", priority: "focus" },
          { chapter: "12. MLOps Principles", why: "The principles reference the book builds toward. Read once, then on demand.", priority: "reference" },
        ],
        handsOn: [
          "Build the feature, training, and inference pipelines for a small domain, end to end.",
          "Implement RAG with a vector store and measure retrieval quality against a golden set.",
          "Deploy the service with autoscaling and add the monitoring the book describes.",
        ],
        stressTest: [
          "What are the three pipelines, and what does each one produce?",
          "Why is RAG a feature pipeline rather than a prompt trick?",
          "What is the difference between supervised fine-tuning and preference alignment?",
          "What does an LLM evaluation need that a classification evaluation does not?",
          "What are the deployment types, and when is a monolithic service the right call?",
        ],
      },
    ],
  },
  {
    id: "llm",
    label: "Stage 3: LLM Applications & Operations",
    objective: "Build LLM applications, then run them in production.",
    note: "Read fully, after Stage 2.",
    inCorePath: true,
    books: [
      {
        order: 5,
        title: "LLMOps",
        googleBooksId: "SLZxEQAAQBAJ",
        author: "Abi Aryan",
        pages: 284,
        hours: 12,
        tagline: "Running LLMs in production",
        dailyCommitment: 45,
        consolidationHours: 6,
        reinforcementPrompt: "You are an LLMOps reviewer for my read of Abi Aryan's LLMOps. Context I just learned: <paste your notes on the four goals, LLM-based application monitoring, data engineering, API-first deployment, evaluation, and governance>. Question me one at a time: start with the four goals and which is hardest for LLMs, then why traditional MLOps metrics fail, then offline versus online evaluation, then what governance covers beyond monitoring. If I stall, explain and give a production example, then re-ask differently. End by having me write a rollback plan for a failing LLM feature from memory.",
        why: "The operations layer: what actually breaks when an LLM goes into production, and how to keep it running. Short, dense, and directly applicable.",
        focus: [
          { chapter: "1. Introduction to Large Language Models", why: "Background. Skim if you have already read Stage 2.", priority: "skim" },
          { chapter: "2. Introduction to LLMOps", why: "The four goals (reliability, scalability, robustness, security) and the maturity model.", priority: "focus" },
          { chapter: "3. LLM-Based Applications", why: "Monitoring application performance and what you can actually control.", priority: "focus" },
          { chapter: "4. Data Engineering for LLMs", why: "The data path for production LLMs: collection, cleaning, and storage.", priority: "focus" },
          { chapter: "5. Model Domain Adaptation for LLM-Based Applications", why: "Prompting, RAG, and fine-tuning as adaptation strategies. Skim after Stage 2.", priority: "skim" },
          { chapter: "6. API-First LLM Deployment", why: "The deployment pattern that most teams start with, and its limits.", priority: "focus" },
          { chapter: "7. Evaluation for LLMs", why: "Offline evaluation, guardrails, and the evaluation pipeline.", priority: "focus" },
          { chapter: "8. Governance: Monitoring, Privacy, and Security", why: "The part most LLM apps skip: audits, privacy, and threat models.", priority: "focus" },
          { chapter: "9. Scaling: Hardware, Infrastructure, and Resource Management", why: "Capacity and cost. Skim until you have real traffic.", priority: "skim" },
          { chapter: "10. The Future of LLMs and LLMOps", why: "Speculation. Reference.", priority: "reference" },
        ],
        handsOn: [
          "Deploy a model behind an API with request logging, cost tracking, and a latency SLO.",
          "Build an offline evaluation suite and run it on every prompt change.",
          "Add a moderation layer and test it against a red-team set.",
        ],
        stressTest: [
          "What are the four goals of LLMOps, and which is hardest for LLMs?",
          "Why do traditional MLOps metrics fail for LLM applications?",
          "What is the difference between offline and online evaluation for an LLM?",
          "What does governance cover beyond monitoring?",
          "When is API-first deployment the right choice, and when is it not?",
        ],
      },
      {
        order: 6,
        title: "Mastering LangChain and LangGraph",
        googleBooksId: "VCcQEgAAQBAJ",
        author: "Ankur Kulshreshtha",
        pages: 741,
        hours: 31,
        tagline: "RAG, agents, MCP, memory, and human-in-the-loop: the applied LangChain/LangGraph build",
        dailyCommitment: 60,
        consolidationHours: 9,
        reinforcementPrompt: "You are a senior agent engineer for my read of Kulshreshtha's Mastering LangChain and LangGraph. Context I just learned: <paste your notes on LLM fundamentals, LangChain, chat models, structured outputs, prompt templates, document loaders, text splitters, embeddings and vector stores, retrievers, LangGraph, tools and MCP, checkpointers, memory, and human-in-the-loop>. Question me one at a time: start with how RAG is assembled from loaders through retrievers, then why LangGraph is a graph and not a chain, then what MCP buys you, then when you need checkpointers and memory. If I stall, explain and give a code-level example, then re-ask differently. End by having me design an agent with tools, memory, and a human approval step from memory.",
        why: "The applied build for the stack you already ship. Where the Stage 2 books explain why RAG and agents work, this one is the working implementation: loaders, splitters, embeddings, retrievers, LangGraph nodes, tools, MCP, checkpointers, memory, and human-in-the-loop.",
        focus: [
          { chapter: "1. Overview of LLMs, RAG, and Agents", why: "The conceptual map: models, RAG, and agents. Read it as the bridge from Stage 2.", priority: "focus" },
          { chapter: "2. Introduction to LangChain", why: "The framework's evolution, the package ecosystem, and how to choose a solution.", priority: "focus" },
          { chapter: "3. Chat Models", why: "Message types, roles, and the chat model methods.", priority: "focus" },
          { chapter: "4. Generating Structured Outputs", why: "Structured output from an LLM: the prerequisite for tool calling.", priority: "focus" },
          { chapter: "5. Prompt Templates", why: "Prompt management and templating.", priority: "skim" },
          { chapter: "6. Document Loaders", why: "Getting data into the pipeline.", priority: "focus" },
          { chapter: "7. Text Splitters", why: "Chunking strategy: the decision that determines retrieval quality.", priority: "focus" },
          { chapter: "8. Embeddings and Vector Stores", why: "Embeddings, vector stores, and the storage side of RAG.", priority: "focus" },
          { chapter: "9. Retrievers", why: "Retrieval patterns and how to evaluate them.", priority: "focus" },
          { chapter: "10. Fundamentals of LangGraph", why: "Nodes, edges, state. The core abstraction.", priority: "focus" },
          { chapter: "11. Tools and Model Context Protocol (MCP)", why: "Tool calling and MCP. Directly on your current work.", priority: "focus" },
          { chapter: "12. Checkpointers", why: "Persistence and resuming a graph run.", priority: "focus" },
          { chapter: "13. Implementing Memory", why: "Short-term and long-term memory in an agent.", priority: "focus" },
          { chapter: "14. Human-in-the-Loop, Time Travel, and Streaming", why: "Interrupt, resume, and stream. The production behaviours.", priority: "focus" },
          { chapter: "15. Fundamentals of LangChain Agents", why: "The agent abstraction and its limits.", priority: "focus" },
          { chapter: "16. Middlewares", why: "Cross-cutting behaviour in LangChain.", priority: "skim" },
          { chapter: "17. Runnables and LCEL", why: "The composition primitives. Skim until you need them.", priority: "skim" },
          { chapter: "18. Python Typing and Pydantic", why: "The appendix that makes the rest type-safe.", priority: "reference" },
        ],
        handsOn: [
          "Build a RAG path end to end: loader, splitter, embeddings, vector store, retriever, and an evaluation set.",
          "Build a LangGraph agent with tools, a checkpointer, and memory, and run it across two sessions.",
          "Add MCP as a tool source and a human-in-the-loop approval step to the agent.",
        ],
        stressTest: [
          "How is RAG assembled from loaders through retrievers, and where does each part fail?",
          "Why is LangGraph a graph rather than a chain?",
          "What does MCP buy you over a hand-written tool?",
          "When do you need checkpointers, and when do you need memory?",
          "What does human-in-the-loop require from the framework?",
        ],
      },
      {
        order: 7,
        title: "Building Live Voice Agents",
        googleBooksId: "K0cnEgAAQBAJ",
        author: "Heiko Hotz & Sokratis Kartakis",
        pages: 564,
        hours: 24,
        tagline: "Live voice agents: real-time multimodal interaction, A2A and MCP, AgentOps in production",
        dailyCommitment: 45,
        consolidationHours: 8.5,
        reinforcementPrompt: "You are a real-time agent architect for my read of Hotz and Kartakis's Building Live Voice Agents. Context I just learned: <paste your notes on the agent execution loop, state and memory, the live multimodal interaction loop, turn-taking and interruption, multi-agent orchestration, A2A, MCP, and AgentOps>. Question me one at a time: start with what makes real-time interaction different from request/response, then how state and memory are kept across a live session, then what A2A solves that MCP does not, then what AgentOps adds beyond monitoring. If I stall, explain and give a worked example, then re-ask differently. End by having me design a live multimodal agent from memory.",
        why: "The released book behind the live-agent half of your stack: the real-time multimodal interaction loop on one side and the open interoperability protocols on the other. It covers A2A and MCP as production protocols rather than as SDK features, and closes on AgentOps: evaluation, governance, security, and deployment for agents that are actually live.",
        focusNote: "Released November 2026 as Building Live Voice Agents: Deploying Real-Time Multimodal AI Systems to Production, originally announced as Multimodal, Real-Time AI Agent Systems. The downloaded PDF runs to 984 pages against the publisher's 564; the print count is used for pacing.",
        focus: [
          { chapter: "1. Intelligent Agents and Collaborative AI", why: "The agent taxonomy through stage 4: from prompts to multi-agent systems.", priority: "focus" },
          { chapter: "2. Understanding Multimodality: Beyond Text", why: "Tokens, embeddings, shared representation spaces, audio and vision.", priority: "focus" },
          { chapter: "3. Architecting for Real-Time AI Interaction", why: "The anatomy of a live voice assistant and the hot-mic interaction model.", priority: "focus" },
          { chapter: "4. Advanced Live Interactions: Video, Tools, and System Instructions", why: "Camera and screen context, controlled tool use, voice configuration.", priority: "focus" },
          { chapter: "5. Core Components of an Agent Framework", why: "The execution loop, state, lifecycle, concurrency, memory, and the tooling interface.", priority: "focus" },
          { chapter: "6. Designing and Building Agents", why: "Purpose, context, instructions, examples, then building and evaluating.", priority: "focus" },
          { chapter: "7. Multi-Agent Systems: Collaboration and Orchestration", why: "Splitting agents like microservices and choosing a collaboration pattern.", priority: "focus" },
          { chapter: "8. The Agent2Agent Protocol", why: "Agent cards, tasks, artifacts, and the communication mechanisms.", priority: "focus" },
          { chapter: "9. Implementing A2A-Compliant Agents", why: "A cross-framework handshake and a multi-framework workflow.", priority: "focus" },
          { chapter: "10. The Model Context Protocol: Standardizing Tool Interaction", why: "The architecture, primitives, and transports. Directly on your tool-calling work.", priority: "focus" },
          { chapter: "11. Implementing MCP-Enabled Agents and Tool Servers", why: "Building a server, discovery, multimodal data, debugging, and security.", priority: "focus" },
          { chapter: "12. Reference Architecture: An Integrated Live Agent System", why: "The whole thing composed. The book's capstone diagram.", priority: "focus" },
          { chapter: "13. Asynchronous Operations and Long-Running Tasks", why: "What breaks when a task outlives the session.", priority: "focus" },
          { chapter: "14. Designing User Experience for a Live, Multimodal, Multi-Agent System", why: "Turn-taking, interruption, and perceived latency.", priority: "focus" },
          { chapter: "15. The Birth of AgentOps: Introduction to an Agent Operationalization Platform", why: "From MLOps to GenAIOps to AgentOps, and the platform it needs.", priority: "focus" },
          { chapter: "16. Evaluation and Testing of Live Agent Systems", why: "Evaluating a system whose behaviour is time-dependent.", priority: "focus" },
          { chapter: "17. Managing Tools at Scale", why: "Tool registries, discovery, and versioning.", priority: "skim" },
          { chapter: "18. Sharing and Governing Agents as Services and Reusable Components", why: "Agents as internal services: ownership and reuse.", priority: "skim" },
          { chapter: "19. Security, Privacy, and Responsible AI", why: "The threat surface of a live agent with tools.", priority: "focus" },
          { chapter: "20. Deployment and Scaling the Integrated System", why: "Serving live agents at scale.", priority: "skim" },
        ],
        handsOn: [
          "Build a live voice loop with streaming audio in and out, then add interruption handling and measure the perceived latency.",
          "Stand up an MCP server, connect it as a tool source to an agent, and debug the exchange with the MCP inspector.",
          "Wire two agents over A2A and record the task, artifact, and message flow.",
        ],
        stressTest: [
          "What makes real-time interaction different from request/response, and what does it cost?",
          "How are state and memory kept alive across a live session?",
          "What does A2A solve that MCP does not, and where do they overlap?",
          "What does AgentOps add beyond LLM monitoring?",
          "How do you evaluate a system whose behaviour depends on time?",
        ],
      },
      {
        order: 8,
        title: "Data Engineering for Multimodal AI",
        googleBooksId: "Mun9EQAAQBAJ",
        author: "Vasundra Srinivasan",
        pages: 548,
        hours: 23,
        tagline: "Contracts, semantic layers, feature stores, MLOps: the data platform under multimodal AI",
        dailyCommitment: 45,
        consolidationHours: 8,
        reinforcementPrompt: "You are a data architect stress-testing my read of Vasundra Srinivasan's Data Engineering for Multimodal AI. Context I just learned: <paste your notes on data contracts, the semantic layer, the multimodal data lifecycle, ingestion and transformation, feature engineering and fusion, feature stores, MLOps, scaling, deployment, and governance>. Question me one at a time: start with why context is a data engineering problem before it is a model problem, then how a data contract holds a multimodal pipeline together, then where fusion happens and why it is not a join, then what a feature store buys you, then how drift and governance change the pipeline. If I stall, explain it and give a worked example, then re-ask in different words. End by having me design the data platform for a multimodal agent from memory.",
        why: "The substrate under the multimodal systems you are building. Where Building Live Voice Agents covers the runtime, this covers the data platform: contracts, the semantic layer, ingestion, feature stores, MLOps, scaling, and governance for text, image, audio, and video together. Read it before the runtime book so the agent chapters land on a platform you already understand.",
        focusNote: "Publisher print count is used for pacing; the downloaded PDF runs to 786 pages. O'Reilly still carries an early-release note on some chapters, so the list is the publisher's current one.",
        focus: [
          { chapter: "1. The Multimodal AI Data Engineering Landscape", why: "Data contracts, the semantic layer, entity resolution, and the nine-stage data lifecycle.", priority: "focus" },
          { chapter: "2. Data Architectures for Multimodal AI Systems", why: "Vector-native storage, lakehouse, embeddings and retrieval, orchestration, reliability, fabric and mesh.", priority: "focus" },
          { chapter: "3. Platforms and Patterns for Multimodal AI Data Engineering", why: "Managed platforms vs composable vs real-time streaming, and the three core system patterns.", priority: "focus" },
          { chapter: "4. Ingestion and Transformation for Multimodal AI Systems", why: "Batch vs streaming, ELT, and the six design decisions that shape latency and cost.", priority: "focus" },
          { chapter: "5. Feature Engineering and Management for Multimodal Data", why: "Modality-aware pipelines, feature selection, and why fusion is not a join.", priority: "focus" },
          { chapter: "6. Data Storage and Retrieval for Multimodal AI", why: "Storage and retrieval for heterogeneity, semantic recall, and cross-modal reasoning.", priority: "focus" },
          { chapter: "7. Streaming and Adaptive Pipelines for Multimodal AI", why: "Adaptive pipelines that react to the data rather than replay it.", priority: "focus" },
          { chapter: "8. Applying MLOps for Multimodal AI Applications", why: "CI/CD, data versioning, experiment tracking, retraining, and validation.", priority: "focus" },
          { chapter: "9. Scaling Cloud-Native Multimodal AI Data Pipelines", why: "Asymmetric scaling, distributed processing, fault tolerance, edge, federated learning.", priority: "focus" },
          { chapter: "10. Model Deployment and Serving for Multimodal AI", why: "Serving patterns, caching, graph-augmented retrieval, and the inference router.", priority: "focus" },
          { chapter: "11. Governance, Security, and Responsible Practices for Multimodal AI", why: "Lineage, metadata catalogs, IAM, privacy, bias, and explainability.", priority: "focus" },
          { chapter: "12. Putting It All Together: Building End-to-End Multimodal AI Pipelines", why: "The capstone: the whole lifecycle composed into one pipeline.", priority: "focus" },
          { chapter: "Appendix. References and Datasets", why: "The source list behind the chapters.", priority: "reference" },
        ],
        handsOn: [
          "Build a semantic layer over two modalities: ingestion, contracts, embeddings, and a queryable feature API.",
          "Run a hybrid batch and streaming ingestion pipeline and measure the latency each transformation stage adds.",
          "Stand up a feature store for one modality and test offline/online skew.",
        ],
        stressTest: [
          "Why is context a data engineering problem before it is a model problem?",
          "What does a data contract buy, and what does it cost to keep it true?",
          "Where do you draw the batch/streaming boundary, and what does that choice cost?",
          "Why is multimodal feature fusion more than a join?",
          "What does governance require that a model evaluator does not?",
        ],
      },
    ],
  },
  {
    id: "architecture",
    label: "Stage 4: Architecture & Data Platforms",
    objective: "The shapes that outlive a framework: how a system is structured, split, and documented.",
    note: "Read fully, after Stage 3.",
    inCorePath: true,
    books: [
      {
        order: 9,
        title: "Architecting AI Software Systems",
        googleBooksId: "XT2MEQAAQBAJ",
        author: "Richard D. Avila & Imran Ahmad",
        pages: 212,
        hours: 9,
        tagline: "Architecture of AI systems",
        dailyCommitment: 45,
        consolidationHours: 6.5,
        reinforcementPrompt: "You are a software architect reviewing my read of Architecting AI Software Systems. Context I just learned: <paste your notes on the architectural cycle, complexity in AI systems, CONOPS, AI pipeline requirements, and the generative-AI case study>. Question me one at a time: start with the consequences of architectural failure, then what a CONOPS contains, then how non-functional requirements change for AI systems, then the difference between conceptual design and a requirements spec. If I stall, explain and give a concrete example, then re-ask differently. End by having me write a CONOPS for an AI feature from memory.",
        why: "The architecture lens: how to design AI systems that are robust and scalable, not merely accurate. Short enough to read in a week and dense with method.",
        focus: [
          { chapter: "Fundamentals of AI System Architecture", why: "The vocabulary and the architectural cycle.", priority: "focus" },
          { chapter: "The Case for Architecture", why: "What architectural failure costs, and how architects think about decisions.", priority: "focus" },
          { chapter: "Software Engineering and Architecture", why: "Complexity in AI systems: integration, functional, and verification complexity.", priority: "focus" },
          { chapter: "Conceptual Design for AI Systems", why: "CONOPS, scenarios, use cases, and operational modes. The most transferable chapter.", priority: "focus" },
          { chapter: "Requirements and Architecture for AI Pipelines", why: "Data stores, pipeline components, and the non-functional requirements.", priority: "focus" },
          { chapter: "Design, Integration, and Testing", why: "Tactics and patterns, and how to test an AI system.", priority: "focus" },
          { chapter: "Architecting a Generative AI System – A Case Study", why: "The full worked example: a RAG-based knowledge system.", priority: "focus" },
          { chapter: "Insights and Future Directions", why: "Closing synthesis. Reference.", priority: "reference" },
        ],
        handsOn: [
          "Write a CONOPS for an AI feature: scenarios, use cases, and operational modes.",
          "Draw the architecture for a RAG system: components, data flows, non-functional requirements.",
          "Run the book's decision framework against one of your own projects.",
        ],
        stressTest: [
          "What are the consequences of architectural failure in an AI system?",
          "What is a CONOPS, and what does it contain?",
          "How do non-functional requirements change for AI systems?",
          "What is the difference between a conceptual design and a requirements specification?",
          "Walk through the case study's architecture: what happens at each stage?",
        ],
      },
      {
        order: 10,
        title: "Architecture Patterns with Python",
        coverId: 12423995,
        author: "Harry J.W. Percival & Bob Gregory",
        pages: 301,
        hours: 13,
        tagline: "DDD-style patterns in Python",
        dailyCommitment: 45,
        consolidationHours: 7.5,
        reinforcementPrompt: "You are a Python architect reviewing my read of Architecture Patterns with Python. Context I just learned: <paste your notes on domain modeling, the repository, the service layer, the unit of work, aggregates, events, CQRS, and dependency injection>. Question me one at a time: start with what the repository pattern solves and costs, then aggregates and consistency boundaries, then commands versus events, then when CQRS pays. If I stall, explain and give a small code example, then re-ask differently. End by having me sketch the patterns for one service from memory.",
        why: "The patterns that keep a codebase testable as it grows: the Python expression of domain-driven design, clean architecture, and event-driven microservices.",
        focus: [
          { chapter: "1. Domain Modeling", why: "Entities, value objects, and domain services. The foundation.", priority: "focus" },
          { chapter: "2. Repository Pattern", why: "The abstraction that decouples the model from storage.", priority: "focus" },
          { chapter: "3. A Brief Interlude: On Coupling and Abstractions", why: "How to choose an abstraction, and what it costs.", priority: "focus" },
          { chapter: "4. Our First Use Case: Flask API and Service Layer", why: "The service layer and the first end-to-end test.", priority: "focus" },
          { chapter: "5. TDD in High Gear and Low Gear", why: "Test strategy. Skim the mechanics; take the pyramid.", priority: "skim" },
          { chapter: "6. Unit of Work Pattern", why: "Atomic commits and the boundary of a transaction.", priority: "focus" },
          { chapter: "7. Aggregates and Consistency Boundaries", why: "The rule that keeps data consistent. The book's best idea.", priority: "focus" },
          { chapter: "8. Events and the Message Bus", why: "Domain events and the bus that carries them.", priority: "focus" },
          { chapter: "9. Going to Town on the Message Bus", why: "Refactoring to handlers. Skim.", priority: "skim" },
          { chapter: "10. Commands and Command Handlers", why: "Commands versus events. Skim.", priority: "skim" },
          { chapter: "11. Event-Driven Architecture: Using Events to Integrate Microservices", why: "Temporal decoupling and async messaging.", priority: "focus" },
          { chapter: "12. Command-Query Responsibility Segregation (CQRS)", why: "Separating reads from writes, and when it pays.", priority: "focus" },
          { chapter: "13. Dependency Injection (and Bootstrapping)", why: "Wiring it all together. Skim.", priority: "skim" },
        ],
        handsOn: [
          "Build a small service with the repository, unit of work, and service layer patterns.",
          "Add an event-driven integration between two services.",
          "Refactor one module to CQRS and measure the read-path improvement.",
        ],
        stressTest: [
          "What problem does the repository pattern solve, and what does it cost?",
          "What is the difference between a domain model and an ORM model?",
          "What is an aggregate, and what consistency boundary does it enforce?",
          "When is CQRS worth the complexity, and when is it not?",
          "What is the difference between a command and an event?",
        ],
      },
      {
        order: 11,
        title: "Data Engineering Design Patterns",
        googleBooksId: "zX4UEgAAQBAJ",
        author: "Bartosz Konieczny",
        pages: 374,
        hours: 16,
        tagline: "A pattern catalogue for data pipelines: ingestion, error management, idempotency, value, flow, security, storage, quality, observability",
        dailyCommitment: 45,
        consolidationHours: 7,
        reinforcementPrompt: "You are a data engineer for my read of Bartosz Konieczny's Data Engineering Design Patterns. Context I just learned: <paste your notes on ingestion, error management, idempotency, data value, data flow, security, storage, quality, and observability patterns>. Question me one at a time: start with how the patterns are organised, then which ingestion pattern fits which source, then how dead-letter and deduplication patterns compose, then what idempotency costs. If I stall, explain and give a pipeline example, then re-ask differently. End by having me choose patterns for one real pipeline from memory.",
        why: "The data shelf. Every AI system rests on a data pipeline, and this is the vocabulary for the failure modes (late data, duplicates, schema drift, skew) that show up later as model problems. Read it when a pipeline matters.",
        focus: [
          { chapter: "1. Introducing Data Engineering Design Patterns", why: "What patterns are and the case study used throughout.", priority: "skim" },
          { chapter: "2. Data Ingestion Design Patterns", why: "Full load, incremental, CDC, replication, compaction, readiness, event-driven.", priority: "focus" },
          { chapter: "3. Error Management Design Patterns", why: "Dead-letter, deduplication, late data, filtering, checkpointing.", priority: "focus" },
          { chapter: "4. Idempotency Design Patterns", why: "Overwriting, merging, keyed idempotency, transactional writes, immutability.", priority: "focus" },
          { chapter: "5. Data Value Design Patterns", why: "Enrichment, decoration, aggregation, sessionization, ordering.", priority: "focus" },
          { chapter: "6. Data Flow Design Patterns", why: "Sequencing, fan-in, fan-out, orchestration.", priority: "focus" },
          { chapter: "7. Data Security Design Patterns", why: "Removal, access control, protection, connectivity.", priority: "focus" },
          { chapter: "8. Data Storage Design Patterns", why: "Partitioning, organization, read optimization, representation.", priority: "focus" },
          { chapter: "9. Data Quality Design Patterns", why: "Enforcement, schema consistency, observation.", priority: "focus" },
          { chapter: "10. Data Observability Design Patterns", why: "Detectors, time detectors, lineage.", priority: "focus" },
        ],
        handsOn: [
          "Pick one pipeline you own and name every pattern it uses, then name the ones it is missing.",
          "Add a dead-letter path and a deduplication window to a pipeline and test both.",
          "Write the lineage and lag-detection spec for a dataset an AI feature depends on.",
        ],
        stressTest: [
          "How are the patterns organised, and how do you choose one?",
          "Which ingestion pattern fits which source?",
          "How do dead-letter and deduplication patterns compose?",
          "What does idempotency cost, and when is it worth it?",
          "Which observability pattern tells you a dataset is wrong before the model does?",
        ],
      },
      {
        order: 12,
        title: "The C4 Model: Visualizing Software Architecture",
        googleBooksId: "MDHlEQAAQBAJ",
        author: "Simon Brown",
        pages: 180,
        hours: 8,
        tagline: "Context, container, component, code: a shared language for drawing the system",
        dailyCommitment: 30,
        consolidationHours: 4,
        reinforcementPrompt: "You are an architecture reviewer for my read of Simon Brown's The C4 Model. Context I just learned: <paste your notes on the four levels, the C4 model's notation rules, and when to use dynamic views and deployment maps>. Question me one at a time: start with what each of the four levels shows and who it is for, then why the model deliberately avoids prescribing notation, then how to choose the level for a given audience. If I stall, explain and give an example, then re-ask differently. End by having me produce a context and a container diagram for a system I built, from memory.",
        why: "The diagramming craft. Software architecture is mostly communicated in diagrams, and most diagrams fail because they mix levels and audiences. C4 is the smallest shared language that fixes it, and it pairs with A Philosophy of Software Design, which is about the decisions the diagrams have to carry.",
        focusNote: "Topics from the publisher's overview; O'Reilly's chapter list for this title is not public.",
        focus: [
          { chapter: "Level 1: System Context", why: "Who uses the system and what it depends on. The widest audience.", priority: "focus" },
          { chapter: "Level 2: Containers", why: "The runnable, deployable units and how they communicate.", priority: "focus" },
          { chapter: "Level 3: Components", why: "The pieces inside a container, at the level a team owns.", priority: "focus" },
          { chapter: "Level 4: Code", why: "Classes and interfaces. Usually left to the IDE.", priority: "skim" },
          { chapter: "Notation, scopes, and audience", why: "Why C4 deliberately does not prescribe a notation, and how to pick the level per audience.", priority: "focus" },
          { chapter: "Dynamic views and deployment maps", why: "Beyond the static four: sequences, deployment, and runtime views.", priority: "focus" },
          { chapter: "Tailoring diagrams to different audiences", why: "The payoff: one model, many views.", priority: "focus" },
        ],
        handsOn: [
          "Draw a C4 context and container diagram for one system you built, and have someone else read it without explanation.",
          "Add a deployment map and one dynamic view to the same model.",
          "Replace an existing architecture diagram with C4 and note what got clearer.",
        ],
        stressTest: [
          "What does each of the four C4 levels show, and who is it for?",
          "Why does C4 not prescribe a notation?",
          "How do you choose the right level for a given audience?",
          "What do dynamic views and deployment maps add beyond the static four?",
        ],
      },
    ],
  },
  {
    id: "craft",
    label: "Stage 5: Craft & Quality",
    objective: "Better code and better verification, opened when a problem asks for it.",
    note: "Read fully, after Stage 4.",
    inCorePath: true,
    books: [
      {
        order: 13,
        title: "A Philosophy of Software Design",
        author: "John K. Ousterhout",
        pages: 196,
        hours: 8,
        tagline: "Depth over breadth, complexity named, and the discipline of deciding what matters",
        dailyCommitment: 45,
        consolidationHours: 6.5,
        reinforcementPrompt: "You are a software design reviewer for my read of Ousterhout's A Philosophy of Software Design. Context I just learned: <paste your notes on complexity, deep versus shallow modules, information hiding, general-purpose modules, defining errors out of existence, comments, consistency, and deciding what matters>. Question me one at a time: start with Ousterhout's definition of complexity and its symptoms, then why deep modules are better than shallow ones, then what information leakage is and how temporal decomposition causes it, then when a comment is worth writing. If I stall, explain and give a code example, then re-ask differently. End by having me redesign one shallow module from my own codebase from memory.",
        why: "The shortest book here and the one that changes how you see every file. Ousterhout's argument (that complexity is the enemy, that modules should be deep, and that design is the discipline of deciding what matters) is the craft layer underneath every other book on the shelf.",
        focus: [
          { chapter: "1. Introduction", why: "How to use the book, and the claim that design is a skill that can be learned.", priority: "skim" },
          { chapter: "2. The Nature of Complexity", why: "Complexity defined, its symptoms, and its causes. The book's foundation.", priority: "focus" },
          { chapter: "3. Working Code Isn't Enough", why: "Tactical versus strategic programming, and how much to invest.", priority: "focus" },
          { chapter: "4. Modules Should Be Deep", why: "The deep-module principle: an interface much simpler than its implementation.", priority: "focus" },
          { chapter: "5. Information Hiding (and Leakage)", why: "Information hiding, leakage, and temporal decomposition. Where designs quietly rot.", priority: "focus" },
          { chapter: "6. General-Purpose Modules are Deeper", why: "The 2nd edition's reworked chapter: why somewhat general-purpose beats special-purpose.", priority: "focus" },
          { chapter: "7. Different Layer, Different Abstraction", why: "Pass-through methods and variables, and when interface duplication is fine.", priority: "focus" },
          { chapter: "8. Pull Complexity Downwards", why: "Where the complexity should live: down, not up.", priority: "focus" },
          { chapter: "9. Better Together or Better Apart?", why: "The splitting and joining rules. A decision framework.", priority: "focus" },
          { chapter: "10. Define Errors Out of Existence", why: "Exceptions add complexity; design the special cases away.", priority: "focus" },
          { chapter: "11. Design it Twice", why: "The cheapest design method there is.", priority: "skim" },
          { chapter: "12. Why Write Comments? The Four Excuses", why: "The comments argument. Directly useful for everyday code reviews.", priority: "focus" },
          { chapter: "13. Comments Should Describe Things that Aren't Obvious from the Code", why: "What belongs in a comment and what does not.", priority: "focus" },
          { chapter: "14. Choosing Names", why: "Names as comments.", priority: "focus" },
          { chapter: "15. Write the Comment First", why: "Comments as a design tool.", priority: "skim" },
          { chapter: "16. Modifying Existing Code", why: "Design is not a one-time act.", priority: "focus" },
          { chapter: "17. Consistency", why: "Why naming and structural consistency compound.", priority: "focus" },
          { chapter: "18. Code Should be Obvious", why: "Obviousness as a property you can engineer.", priority: "focus" },
          { chapter: "19. Software Trends", why: "Why trends come and go. Skim.", priority: "skim" },
          { chapter: "20. Designing for Performance", why: "Measure before and after, and design around the critical path.", priority: "focus" },
          { chapter: "21. Decide What Matters", why: "The 2nd edition's new chapter: the whole thesis in one chapter.", priority: "focus" },
          { chapter: "22. Conclusion", why: "The argument compressed.", priority: "skim" },
        ],
        handsOn: [
          "Pick one shallow module in your codebase, measure its interface versus implementation complexity, and rewrite it deep.",
          "Find three pieces of information leakage in a service you own and refactor them behind a single interface.",
          "Rewrite one error path so the error is defined out of existence rather than handled.",
        ],
        stressTest: [
          "What is Ousterhout's definition of complexity, and what are its symptoms?",
          "What makes a module deep rather than shallow?",
          "What is information leakage, and how does temporal decomposition cause it?",
          "When is a comment worth writing, and what should it contain?",
          "What does it mean to decide what matters?",
        ],
        coverId: 10352230,
      },
      {
        order: 14,
        title: "Robust Python",
        coverId: 12932198,
        author: "Patrick Viafore",
        pages: 378,
        hours: 16,
        tagline: "Type hints, intent, safe failure",
        dailyCommitment: 45,
        consolidationHours: 10,
        reinforcementPrompt: "You are a Python reviewer for my read of Robust Python. Context I just learned: <paste your notes on intent, type annotations, constraining types, enums, data classes, invariants, protocols, pydantic, dependencies, static analysis, and property-based testing>. Question me one at a time: start with what intent means and how types communicate it, then invariants in classes, then protocols versus inheritance, then what property-based testing buys. If I stall, explain and give a code example, then re-ask differently. End by having me annotate a small module from memory.",
        why: "The craft layer: writing Python that survives change (types, intent, extensibility, and a testing strategy that acts as a safety net).",
        focus: [
          { chapter: "1. Introduction to Robust Python", why: "The intent argument: code is read far more than it is written.", priority: "focus" },
          { chapter: "2. Introduction to Python Types", why: "Mechanical versus semantic types, and what a type system can and cannot say.", priority: "focus" },
          { chapter: "3. Type Annotations", why: "The basics, and why annotating is worth the noise.", priority: "focus" },
          { chapter: "4. Constraining Types", why: "Optional, union, literal, and NewType. The tools for narrowing intent.", priority: "focus" },
          { chapter: "5. Collection Types", why: "Annotating containers. Skim.", priority: "skim" },
          { chapter: "6. Customizing Your Typechecker", why: "mypy configuration. Skim until you need it.", priority: "skim" },
          { chapter: "7. Adopting Typechecking Practically", why: "How to introduce types into an existing codebase without stalling.", priority: "focus" },
          { chapter: "8. User-Defined Types: Enums", why: "Enums as intent, and when not to use them.", priority: "focus" },
          { chapter: "9. User-Defined Types: Data Classes", why: "Data classes versus dicts, TypedDict, and namedtuple.", priority: "focus" },
          { chapter: "10. User-Defined Types: Classes", why: "Invariants and encapsulation. The heart of the book.", priority: "focus" },
          { chapter: "11. Defining Your Interfaces", why: "Magic methods and context managers. Skim.", priority: "skim" },
          { chapter: "12. Subtyping", why: "Inheritance versus composition. Skim.", priority: "skim" },
          { chapter: "13. Protocols", why: "Structural typing, and how protocols replace inheritance.", priority: "focus" },
          { chapter: "14. Runtime Checking With pydantic", why: "Validation at the boundary, and parsing versus validation.", priority: "focus" },
          { chapter: "15. Extensibility", why: "The open-closed principle. Skim.", priority: "skim" },
          { chapter: "16. Dependencies", why: "Physical, logical, and temporal dependencies, and how to see them.", priority: "focus" },
          { chapter: "17. Composability", why: "Composing functions and algorithms. Skim.", priority: "skim" },
          { chapter: "18. Event-Driven Architecture", why: "Events and the observer pattern. Skim.", priority: "skim" },
          { chapter: "19. Pluggable Python", why: "Extension points and the strategy pattern. Skim.", priority: "skim" },
          { chapter: "20. Static Analysis", why: "Linting, complexity checkers, and security analysis.", priority: "focus" },
          { chapter: "21. Testing Strategy", why: "What a test is, and how to keep the cost down.", priority: "focus" },
          { chapter: "22. Acceptance Testing", why: "BDD and executable specifications. Skim.", priority: "skim" },
          { chapter: "23. Property-Based Testing", why: "Hypothesis, and what it buys over example-based tests.", priority: "focus" },
          { chapter: "24. Mutation Testing", why: "Testing the tests. Skim.", priority: "skim" },
        ],
        handsOn: [
          "Add full type hints and mypy to an existing Python module, and fix every error.",
          "Replace dicts with dataclasses and enums, and add pydantic validation at the boundary.",
          "Add property-based tests with Hypothesis to one core function.",
        ],
        stressTest: [
          "What is intent in Robust Python, and how do types communicate it?",
          "When should you use an enum over a string, and over an int?",
          "What is an invariant, and how do you enforce it in a class?",
          "What is a protocol, and how does it differ from inheritance?",
          "What does property-based testing buy you over example-based tests?",
        ],
      },
      {
        order: 15,
        title: "High Performance Python",
        coverId: 13456121,
        author: "Micha Gorelick & Ian Ozsvald",
        pages: 468,
        hours: 20,
        tagline: "The performance reference",
        dailyCommitment: 45,
        consolidationHours: 6,
        reinforcementPrompt: "You are a Python performance reviewer for my read of High Performance Python. Context I just learned: <paste your notes on profiling, data structures, vectorization, async I/O, multiprocessing, and memory>. Question me one at a time: start with why profiling comes first, then concurrency versus parallelism and the GIL, then when a generator is the right tool, then how to choose between multiprocessing, threads, and async. If I stall, explain and give a profiling example, then re-ask differently. End by having me profile and fix a slow function from memory.",
        why: "The performance shelf: how to find and fix bottlenecks instead of guessing. Read it when a hot path actually matters.",
        focus: [
          { chapter: "1. Understanding Performant Python", why: "The mental model: what makes Python slow and what you can do about it.", priority: "focus" },
          { chapter: "2. Profiling to Find Bottlenecks", why: "cProfile, line_profiler, and memory_profiler. The chapter that pays for the book.", priority: "focus" },
          { chapter: "3. Lists and Tuples", why: "Skim; the data structure basics.", priority: "skim" },
          { chapter: "4. Dictionaries and Sets", why: "Skim; hashing and resizing.", priority: "skim" },
          { chapter: "5. Iterators and Generators", why: "Skim; lazy evaluation.", priority: "skim" },
          { chapter: "6. Matrix and Vector Computation", why: "NumPy, BLAS, and why vectorization wins.", priority: "focus" },
          { chapter: "7. Compiling to C", why: "Skim; Cython and Numba when you need them.", priority: "skim" },
          { chapter: "8. Asynchronous I/O", why: "Concurrency versus parallelism, and the GIL.", priority: "focus" },
          { chapter: "9. The multiprocessing Module", why: "Bypassing the GIL for CPU-bound work.", priority: "focus" },
          { chapter: "10. Clusters and Job Queues", why: "Distributed work. Reference.", priority: "reference" },
          { chapter: "11. Using Less RAM", why: "Generators, slots, and memory profiling.", priority: "focus" },
          { chapter: "12. Lessons from the Field", why: "War stories. Skim.", priority: "skim" },
        ],
        handsOn: [
          "Profile one slow function with cProfile and line_profiler, then fix the top hotspot.",
          "Replace a list comprehension with a generator and measure the memory change.",
          "Parallelize a CPU-bound task with multiprocessing and measure the speedup.",
        ],
        stressTest: [
          "Why is profiling the first step, and what happens if you skip it?",
          "What is the difference between concurrency and parallelism in Python, and where does the GIL fit?",
          "When is a generator the right tool?",
          "What does a function call cost in Python, and how do you reduce that cost?",
          "How do you decide between multiprocessing, threads, and async?",
        ],
      },
      {
        order: 16,
        title: "Full Stack Testing",
        googleBooksId: "dX9zEAAAQBAJ",
        author: "Gayathri Mohan",
        pages: 396,
        hours: 17,
        tagline: "Testing across the stack: exploratory, functional, data, visual, security, performance, accessibility, mobile",
        dailyCommitment: 45,
        consolidationHours: 8,
        reinforcementPrompt: "You are a testing lead for my read of Gayathri Mohan's Full Stack Testing. Context I just learned: <paste your notes on exploratory testing, automated functional testing, continuous testing, data testing, visual testing, security testing, performance testing, accessibility testing, cross-functional requirements, and mobile testing>. Question me one at a time: start with the ten full stack testing skills and which ones are missing from a typical team, then why shift-left matters, then how data testing differs from functional testing, then what continuous testing adds beyond CI. If I stall, explain and give a worked example, then re-ask differently. End by having me write a test strategy for one feature from memory.",
        why: "The quality layer. Most AI work ships with an evaluation harness and no test suite; this is the book that fills the rest of the stack (data, visual, security, performance, accessibility, mobile) with the exercises that make it real.",
        focus: [
          { chapter: "1. Introduction to Full Stack Testing", why: "The ten skills and the shift-left argument. The map.", priority: "focus" },
          { chapter: "2. Manual Exploratory Testing", why: "Exploratory testing frameworks and strategy: the skill automation cannot replace.", priority: "focus" },
          { chapter: "3. Automated Functional Testing", why: "Micro and macro test types, and the automation strategy.", priority: "focus" },
          { chapter: "4. Continuous Testing", why: "CI/CT/CD, principles, and the DORA metrics.", priority: "focus" },
          { chapter: "5. Data Testing", why: "Databases, caches, batch, and event streams. The gap most teams leave open.", priority: "focus" },
          { chapter: "6. Visual Testing", why: "Unit, component, snapshot, end-to-end, and cross-browser. Directly relevant to the frontend.", priority: "focus" },
          { chapter: "7. Security Testing", why: "Threat modelling with STRIDE, and the security testing strategy.", priority: "focus" },
          { chapter: "8. Performance Testing", why: "Backend and frontend performance, the RAIL model, and the strategy.", priority: "focus" },
          { chapter: "9. Accessibility Testing", why: "WCAG, personas, auditing tools, and accessibility as culture.", priority: "focus" },
          { chapter: "10. Cross-Functional Requirements Testing", why: "Usability, reliability, performance, supportability, chaos and architecture testing.", priority: "focus" },
          { chapter: "11. Mobile Testing", why: "The mobile landscape and the mobile test pyramid.", priority: "skim" },
          { chapter: "12. Moving Ahead in Testing", why: "First principles, fast feedback, and the quality-first mindset. The synthesis.", priority: "focus" },
        ],
        handsOn: [
          "Write a test strategy for one feature covering functional, data, visual, and accessibility layers.",
          "Add data tests against Testcontainers to a service and wire them into CI.",
          "Run a threat-model pass with STRIDE on one endpoint and fix the top finding.",
        ],
        stressTest: [
          "What are the ten full stack testing skills, and which are usually missing?",
          "How does data testing differ from functional testing?",
          "What does continuous testing add beyond continuous integration?",
          "What is shift-left testing, and what does it cost?",
          "How do you test accessibility, and why is it not only an automated audit?",
        ],
      },
    ],
  },
  {
    id: "reference",
    label: "Stage 6: Reference",
    objective: "The algorithms, kept on the shelf for when you need the derivation rather than the recipe.",
    note: "Reference shelf. Read on demand.",
    inCorePath: false,
    books: [
      {
        order: 17,
        title: "Hands-On Machine Learning",
        coverId: 13141163,
        author: "Aurélien Géron",
        pages: 861,
        hours: 36,
        tagline: "The algorithms reference",
        dailyCommitment: 60,
        consolidationHours: 7.5,
        reinforcementPrompt: "You are an ML examiner for my read of Hands-On Machine Learning. Context I just learned: <paste your notes on the end-to-end project, classification, training, ensembles, CNNs, and attention>. Question me one at a time: start with the steps of the end-to-end project and where projects fail, then the bias/variance trade-off, then how CNNs exploit spatial structure, then what attention buys over an RNN. If I stall, explain and give a worked example, then re-ask differently. End by having me walk through the end-to-end project from memory.",
        why: "The anchor of the reference shelf: the widest coverage of ML techniques, and the exercises that make them stick. Read it selectively, and do the exercises.",
        focus: [
          { chapter: "1. The Machine Learning Landscape", why: "The taxonomy of ML approaches. The map for the rest of the book.", priority: "focus" },
          { chapter: "2. End-to-End Machine Learning Project", why: "The full project from raw data to deployment. The most valuable chapter in the book.", priority: "focus" },
          { chapter: "3. Classification", why: "Metrics, ROC, and the precision/recall trade-off.", priority: "focus" },
          { chapter: "4. Training Models", why: "Linear, logistic, and gradient descent. The optimization core.", priority: "focus" },
          { chapter: "5. Support Vector Machines", why: "Skim unless you need them.", priority: "skim" },
          { chapter: "6. Decision Trees", why: "Skim; ensembles matter more.", priority: "skim" },
          { chapter: "7. Ensemble Learning and Random Forests", why: "Boosting and bagging. The practical workhorse.", priority: "focus" },
          { chapter: "8. Dimensionality Reduction", why: "PCA and friends. Skim.", priority: "skim" },
          { chapter: "9. Unsupervised Learning Techniques", why: "Clustering and anomaly detection. Skim.", priority: "skim" },
          { chapter: "10. Introduction to Artificial Neural Networks with Keras", why: "The neural net baseline and backpropagation.", priority: "focus" },
          { chapter: "11. Training Deep Neural Networks", why: "The training tricks that make deep nets work.", priority: "focus" },
          { chapter: "12. Custom Models and Training with TensorFlow", why: "Skim; Keras covers most needs.", priority: "skim" },
          { chapter: "13. Loading and Preprocessing Data with TensorFlow", why: "The data pipeline. Skim.", priority: "skim" },
          { chapter: "14. Deep Computer Vision Using Convolutional Neural Networks", why: "CNNs and transfer learning. The best chapter on the subject.", priority: "focus" },
          { chapter: "15. Processing Sequences Using RNNs and CNNs", why: "Skim; attention has largely superseded it.", priority: "skim" },
          { chapter: "16. Natural Language Processing with RNNs and Attention", why: "Attention and the transformer. The chapter that matters most now.", priority: "focus" },
          { chapter: "17. Autoencoders, GANs, and Diffusion Models", why: "Generative models. Skim.", priority: "skim" },
          { chapter: "18. Reinforcement Learning", why: "Reference.", priority: "reference" },
          { chapter: "19. Training and Deploying TensorFlow Models at Scale", why: "Serving TensorFlow at scale. Skim unless you run TF in production.", priority: "skim" },
        ],
        handsOn: [
          "Work the end-to-end project in chapter 2 from raw data to a deployed model.",
          "Do the exercises at the end of each focus chapter: reading is not the practice.",
          "Build one CNN and one transformer-based NLP model from the notebooks.",
        ],
        stressTest: [
          "What are the steps of the end-to-end project, and where do most projects fail?",
          "What is the bias/variance trade-off, and how does it show up in practice?",
          "How does a CNN exploit spatial structure, and why does that matter?",
          "What does attention buy over an RNN?",
          "What is the difference between supervised, unsupervised, and reinforcement learning?",
        ],
      },
    ],
  },
  {
    id: "forward",
    label: "Stage 7: Forward Deployed: People",
    objective: "Know what the technology is for, find out what people actually need, and keep executing when the problem is ambiguous.",
    note: "Read fully. The human side of the stack.",
    inCorePath: true,
    books: [
      {
        order: 18,
        title: "Augmenting Human Intellect: A Conceptual Framework",
        kind: "report",
        author: "Douglas C. Engelbart",
        pages: 134,
        hours: 6,
        tagline: "The original statement of intelligence augmentation: the map before the territory.",
        dailyCommitment: 45,
        consolidationHours: 5.5,
        reinforcementPrompt: "You are a skeptical interviewer for my read of Engelbart's 1962 'Augmenting Human Intellect'. Context I just learned: <paste your notes on the H-LAM/T system, the hierarchy of process structures, and the bootstrapping hypothesis>. Question me one at a time: start with what Engelbart means by augmentation versus automation, then the H-LAM/T framework, then the bootstrapping hypothesis. If I stall, explain it and press me on where a modern agent system fits his framework and where it breaks it. End by having me redraw his framework for a workflow I actually built.",
        why: "The primary source. Everything in the intelligence-augmentation tradition descends from this 1962 framework: intelligence as a system of artifacts, rules, methods, and habits, and technology as the means to raise its effectiveness: augmentation, not replacement.",
        track: "Intelligence Augmentation",
        priority: "high",
        focus: [
          { chapter: "I. Introduction", why: "The objective: improving the intellectual effectiveness of the individual. The whole argument in miniature.", priority: "focus" },
          { chapter: "II. Conceptual Framework", why: "The H-LAM/T system and the hierarchy of process structures. The core of the report.", priority: "focus" },
          { chapter: "III. Examples and Discussion", why: "The bootstrapping hypothesis: better tools make better tool-makers.", priority: "focus" },
          { chapter: "IV. Research Recommendations", why: "Engelbart's agenda. Skim for the shape of the programme.", priority: "skim" },
          { chapter: "V. Summary and VI. Conclusions", why: "The argument compressed. Read after the framework has landed.", priority: "focus" },
        ],
        handsOn: [
          "Map a current agent workflow onto Engelbart's H-LAM/T: which parts are artifacts, which are rules, which are methods, which are habits?",
          "List the human-in-the-loop decision points and write down what the human contributes that the model cannot.",
        ],
        stressTest: [
          "Explain the bootstrapping hypothesis with the report closed.",
          "What is 'augmentation' as Engelbart means it, and how does it differ from automation?",
          "What are the 'complex situations' he wants to improve, and are they the ones you work on?",
          "Where does a modern LLM agent fit his framework, and where does it break?",
        ],
      },
      {
        order: 19,
        title: "Supersizing the Mind: Embodiment, Action, and Cognitive Extension",
        coverId: 5541811,
        author: "Andy Clark",
        pages: 320,
        hours: 13,
        tagline: "The extended mind thesis: cognition leaks out of the skull and into the tools.",
        dailyCommitment: 45,
        consolidationHours: 5.5,
        reinforcementPrompt: "You are a philosophy examiner for my read of Andy Clark's 'Supersizing the Mind'. Context I just learned: <paste your notes on the extended mind thesis, the parity principle, and Clark's critique of brainbound cognition>. Question me one at a time: start with the extended mind thesis, then the parity principle, then what Clark thinks the brain is actually for. If I stall, explain and give the classic objections, then re-ask. End by pressing me on whether an LLM counts as part of a cognitive system on his account.",
        why: "The philosophical case for the human-tool coupling that IA assumes. Clark argues the mind is not bounded by the skin, the deepest justification for building tools that think with people rather than for them.",
        track: "Intelligence Augmentation",
        priority: "medium",
        focus: [
          { chapter: "Introduction: Brainbound versus Extended", why: "The thesis stated plainly. The book's whole argument.", priority: "focus" },
          { chapter: "1. The Active Body", why: "Embodiment. Useful context.", priority: "skim" },
          { chapter: "2. The Negotiable Body", why: "The body as part of the cognitive loop. Skim.", priority: "skim" },
          { chapter: "3. Material Symbols", why: "Language and symbols as cognitive scaffolding. Directly relevant to interface design.", priority: "focus" },
          { chapter: "4. World, Incorporated", why: "How the environment becomes part of the cognitive system.", priority: "focus" },
          { chapter: "5. Mind Re-bound?", why: "Clark's reply to critics. Skim.", priority: "skim" },
          { chapter: "6. The Cure for Cognitive Hiccups", why: "HEMC, HEC, HEMC, his taxonomy of extension. Dense; skim.", priority: "skim" },
          { chapter: "7. Rediscovering the Brain", why: "Where the brain fits. Skim.", priority: "skim" },
          { chapter: "8. Painting, Planning, and Perceiving", why: "Case studies in extended cognition. Skim.", priority: "skim" },
          { chapter: "9. Disentangling Embodiment", why: "What embodiment does and does not explain. Skim.", priority: "skim" },
          { chapter: "10. Conclusions: Mind as Mashup", why: "The synthesis. Read it.", priority: "focus" },
          { chapter: "Appendix: The Extended Mind", why: "The original 1998 Clark and Chalmers paper. The shortest path to the core idea.", priority: "focus" },
        ],
        handsOn: [
          "Take one workflow you built this month and map its cognitive loop: where does the human think, where does the tool, and where is the boundary actually drawn?",
          "Write down what the tool does that you no longer do, and what it costs when the tool fails.",
        ],
        stressTest: [
          "State the extended mind thesis and the parity principle without the book.",
          "What is Clark's answer to the 'mark of the cognitive'?",
          "Why does he think the brain is not the natural boundary of the mind?",
          "Would Clark accept an LLM as part of a cognitive system? Argue both sides.",
        ],
      },
      {
        order: 20,
        title: "The Design of Everyday Things",
        googleBooksId: "qBfRDQAAQBAJ",
        author: "Don Norman",
        pages: 384,
        hours: 15,
        tagline: "The classic on designing for humans: affordances, signifiers, and why bad design blames the user.",
        dailyCommitment: 45,
        consolidationHours: 6,
        reinforcementPrompt: "You are a design reviewer for my read of Don Norman's 'The Design of Everyday Things'. Context I just learned: <paste your notes on affordances, signifiers, mappings, feedback, constraints, and the seven stages of action>. Question me one at a time: start with affordances versus signifiers, then the seven stages, then Norman's account of human error. If I stall, explain and give an example, then re-ask. End by having me diagnose a real interface I use with his vocabulary.",
        why: "The FDE builds for people who are not engineers. Norman's vocabulary is the working language for the human side of any system you ship, and the fastest route from a working prototype to one people can actually use.",
        track: "Intelligence Augmentation",
        priority: "very-high",
        focus: [
          { chapter: "1. The Psychopathology of Everyday Things", why: "Where design fails and why people get blamed for it. The book's hook.", priority: "focus" },
          { chapter: "2. The Psychology of Everyday Actions", why: "The seven stages of action, and the gulf of execution versus evaluation.", priority: "focus" },
          { chapter: "3. Knowledge in the Head and in the World", why: "Why memorising is overrated and constraints are underrated.", priority: "focus" },
          { chapter: "4. Knowing What to Do: Constraints, Discoverability, and Feedback", why: "The core design toolkit.", priority: "focus" },
          { chapter: "5. Human Error? No, Bad Design", why: "Norman's account of error, directly relevant to how you design agent fallbacks.", priority: "focus" },
          { chapter: "6. Design Thinking", why: "The process, including the human-centred design cycle.", priority: "focus" },
          { chapter: "7. Design in the World of Business", why: "Where good design meets organisations. Skim.", priority: "skim" },
        ],
        handsOn: [
          "Audit one screen you built or use daily against Norman's principles and find three places where the design blames the user.",
          "Rewrite the worst of them and document the before and after.",
        ],
        stressTest: [
          "Explain the difference between an affordance and a signifier without the book.",
          "What are the seven stages of action, and where do the gulfs appear?",
          "Why does Norman say human error is usually bad design?",
          "Diagnose a real interface failure using his vocabulary.",
        ],
      },
      {
        order: 21,
        title: "Storytelling with Data: A Data Visualization Guide for Business Professionals",
        googleBooksId: "ABiRCgAAQBAJ",
        author: "Cole Nussbaumer Knaflic",
        pages: 288,
        hours: 12,
        tagline: "Making a chart that says one thing: context, the right visual, decluttering, attention, and the narrative",
        dailyCommitment: 45,
        consolidationHours: 7.5,
        reinforcementPrompt: "You are a data-communication coach for my read of Cole Nussbaumer Knaflic's Storytelling with Data. Context I just learned: <paste your notes on exploratory versus explanatory analysis, the who/what/how of context, choosing an effective visual, decluttering and cognitive load, preattentive attributes, affordances and accessibility, the narrative structure, and the case studies>. Question me one at a time: start with the difference between exploratory and explanatory analysis, then how to choose between simple text, a table, and a graph, then what clutter does to a visual, then how preattentive attributes direct attention, then what makes a data story hold together. If I stall, explain and show a before-and-after example, then re-ask differently. End by having me critique one chart I made from memory.",
        why: "The other half of the statistics book. Analysis produces a finding; this one is about making the finding land on someone who has to act on it: the right visual, the clutter removed, the attention directed, and the narrative that carries it. It sits beside Articulating Design Decisions, which covers the meeting, in the communication track.",
        track: "Communication & Stakeholders",
        priority: "high",
        focus: [
          { chapter: "Introduction", why: "Bad graphs are everywhere, and we are not naturally good at this. The framing.", priority: "skim" },
          { chapter: "1. The Importance of Context", why: "Exploratory versus explanatory analysis, and the who/what/how questions that decide everything before a charting tool is opened.", priority: "focus" },
          { chapter: "2. Choosing an Effective Visual", why: "Simple text, tables, and the graph families: points, lines, bars, area. The decision the book keeps returning to.", priority: "focus" },
          { chapter: "3. Clutter Is Your Enemy!", why: "Cognitive load, the Gestalt principles, and the decluttering pass. The most immediately useful chapter.", priority: "focus" },
          { chapter: "4. Focus Your Audience's Attention", why: "Preattentive attributes: size, colour, position. How the eye is steered before the brain decides anything.", priority: "focus" },
          { chapter: "5. Think Like a Designer", why: "Affordances, accessibility, aesthetics, and acceptance. The bridge to The Design of Everyday Things.", priority: "focus" },
          { chapter: "6. Dissecting Model Visuals", why: "Five worked makeovers, from a line graph to stacked bars. The method applied.", priority: "focus" },
          { chapter: "7. Lessons in Storytelling", why: "The narrative structure, the power of repetition, and the tactics that keep a story clear. The verbal and the visual together.", priority: "focus" },
          { chapter: "8. Pulling It All Together", why: "The six lessons as one workflow. The chapter to re-read before building a deck.", priority: "focus" },
          { chapter: "9. Case Studies", why: "Colour on a dark background, animation, ordering, spaghetti graphs, and alternatives to pie charts. Directly relevant to the site and to dashboards.", priority: "focus" },
          { chapter: "10. Final Thoughts", why: "Building the competency in a team. Skim.", priority: "skim" },
        ],
        handsOn: [
          "Take one chart you shipped and run the decluttering pass on it: remove every element that does not carry the message, then show it to someone for five seconds and ask what they saw.",
          "Rebuild the same chart as simple text, a table, and two graph types, and write down which one communicates it fastest and why.",
          "Write the 3-minute story and the Big Idea for one analysis you have, then storyboard it before opening the charting tool.",
        ],
        stressTest: [
          "What is the difference between exploratory and explanatory analysis, and which one is a chart for?",
          "How do you choose between simple text, a table, and a graph?",
          "What does clutter do to a visual, and in what order do you remove it?",
          "Which preattentive attributes direct attention, and what is each one good for?",
          "What is the narrative structure the book proposes for a data story?",
        ],
      },
      {
        order: 22,
        title: "Articulating Design Decisions",
        author: "Tom Greever",
        pages: 275,
        hours: 11,
        tagline: "How to explain decisions so people agree: the communication craft behind the diagrams",
        dailyCommitment: 45,
        consolidationHours: 6,
        reinforcementPrompt: "You are a communication coach for my read of Tom Greever's Articulating Design Decisions. Context I just learned: <paste your notes on understanding relationships, reducing cognitive load, listening, framing a response, choosing a message, getting agreement, and following up>. Question me one at a time: start with why most design meetings fail, then how to reduce cognitive load before the meeting, then the difference between a business, design, and research message, then what getting agreement actually requires. If I stall, explain and give an example, then re-ask differently. End by having me rehearse a real decision I need to defend, from memory.",
        why: "The companion to the C4 book. A diagram is only half the artefact; the other half is getting a room of stakeholders to understand and agree to it. Greever's book is the practical method for that half, and it transfers directly to architecture and agent-design reviews.",
        track: "Communication & Stakeholders",
        priority: "high",
        focus: [
          { chapter: "1. A Maturing Industry", why: "Why communication became the job. The framing.", priority: "skim" },
          { chapter: "2. Great Designers Are Great Communicators", why: "The core claim: communication is the deliverable.", priority: "focus" },
          { chapter: "3. Understanding Relationships", why: "Stakeholders, influencers, values, and trust. The groundwork.", priority: "focus" },
          { chapter: "4. Reducing Cognitive Load", why: "Set the context, optimize for memory, and rehearse.", priority: "focus" },
          { chapter: "5. Listening Is Understanding", why: "Implicit and explicit listening: the skill most presentations skip.", priority: "focus" },
          { chapter: "6. The Right Frame of Mind", why: "Ego, control, and vocabulary.", priority: "focus" },
          { chapter: "7. The Response: Strategy and Tactics", why: "A strategy for responding, and tactics as actions.", priority: "focus" },
          { chapter: "8. The Response: Common Messages", why: "Business, design, research, and limitations: the four message types.", priority: "focus" },
          { chapter: "9. The Ideal Response: Getting Agreement", why: "The payoff: from IDEA to agreement.", priority: "focus" },
          { chapter: "10. Meeting Adjourned: The After-Party", why: "Follow-up, filters, and what to do when it goes wrong.", priority: "focus" },
          { chapter: "11. Recovering from Disaster", why: "When the decision is taken away. The trust bank account.", priority: "focus" },
          { chapter: "12. For Nondesigners", why: "Working with designers, useful for anyone in a review room.", priority: "skim" },
          { chapter: "13. Designing for Vision", why: "The closing argument: more than pixels.", priority: "skim" },
        ],
        coverId: 8253809,
        handsOn: [
          "Rehearse a real decision with a colleague and record where they stopped following.",
          "Rewrite one of your decision documents to lead with the business message, then the design message.",
          "Run a post-meeting follow-up on your next review and note what changed.",
        ],
        stressTest: [
          "Why do most design meetings fail, and what is the actual deliverable?",
          "How do you reduce cognitive load before the meeting?",
          "What are the common message types, and when is each one right?",
          "What does getting agreement require beyond a good argument?",
          "What is the trust bank account, and how is it built?",
        ],
      },
      {
        order: 23,
        title: "Interviewing Users: How to Uncover Compelling Insights",
        coverId: 8778372,
        author: "Steve Portigal",
        pages: 260,
        hours: 11,
        tagline: "The craft of finding out what people actually do, not what they say they do.",
        dailyCommitment: 45,
        consolidationHours: 6.5,
        reinforcementPrompt: "You are a user-research coach for my read of Steve Portigal's 'Interviewing Users'. Context I just learned: <paste your notes on planning research, asking questions that do not lead, and turning interviews into decisions>. Question me one at a time: start with why interviewing beats surveys for discovery, then the key stages of an interview, then how to avoid leading questions, then what to do when someone tells you what they think you want to hear. If I stall, explain and give an example, then re-ask. End by having me design an interview guide for a real problem.",
        why: "The FDE's core skill is translating an ambiguous operational problem into a system. Portigal's book is the practical method for the first half of that: planning the research, asking questions that do not lead, and turning what you hear into decisions.",
        track: "Customer Discovery",
        priority: "very-high",
        focus: [
          { chapter: "1. Interviewing Addresses a Business Need", why: "Why interviews, why now, and what they are for. The framing chapter.", priority: "focus" },
          { chapter: "2. Research Logistics", why: "Recruiting, scheduling, incentives, and the interview guide.", priority: "focus" },
          { chapter: "3. Contextual Methods: More Than Just Asking Questions", why: "Observation and shadowing. The part most people skip.", priority: "focus" },
          { chapter: "4. The Successful Fieldwork Experience", why: "Team roles and remote research. Skim unless you are planning fieldwork.", priority: "skim" },
          { chapter: "5. Best Practices for Interviewing", why: "Rapport, listening, and checking your worldview at the door.", priority: "focus" },
          { chapter: "6. The Intricacies of Asking Questions", why: "Silence, the backchannel trap, and the palette of question types. The book's core.", priority: "focus" },
          { chapter: "7. Better Interviews", why: "Troubleshooting and special cases. Skim.", priority: "skim" },
          { chapter: "8. Documenting the Interview", why: "Notes, audio, video, sketching. Skim.", priority: "skim" },
          { chapter: "9. Making Sense of Your Data", why: "Analysis, tagging, and synthesis. Where insight actually comes from.", priority: "focus" },
          { chapter: "10. Making an Impact with Your Research", why: "Delivery, engagement, and organisational change. The payoff.", priority: "focus" },
        ],
        handsOn: [
          "Run three practice interviews on a real workflow and write a topline report for each.",
          "Have a colleague review your interview guide for leading questions.",
        ],
        stressTest: [
          "Why does interviewing beat a survey for discovery work?",
          "What are the key stages of an interview, and what belongs in each?",
          "How do you avoid leading a participant, and what do you do when they tell you what they think you want to hear?",
          "How do you move from transcripts to a decision?",
        ],
      },
      {
        order: 24,
        title: "The Looming Tower: Al-Qaeda and the Road to 9/11",
        coverId: 8172445,
        author: "Lawrence Wright",
        pages: 469,
        hours: 19,
        tagline: "How information fails inside large organizations: the FDE's problem, drawn at full scale.",
        dailyCommitment: 60,
        consolidationHours: 7,
        reinforcementPrompt: "You are an organisational analyst for my read of Lawrence Wright's 'The Looming Tower'. Context I just learned: <paste your notes on how information fragmented between the CIA and FBI, how incentives hid the truth, and what structural conditions let the failure compound>. Question me one at a time: start with the structural conditions that let intelligence failures compound, then how silos form and persist, then what an individual can do about it. If I stall, explain and give a case from the book, then re-ask. End by having me map the same failure pattern onto an organization I know.",
        why: "A history of the intelligence failures before 9/11, and a case study in how information fragments across silos, how incentives hide the truth, and how smart organizations miss what is in front of them. Read it as a study of the operational problems you will be sent to fix.",
        track: "Sensemaking & Investigation",
        priority: "high",
        focus: [
          { chapter: "Prologue", why: "The 1998 embassy bombings. Sets up the failure.", priority: "focus" },
          { chapter: "3. The Founder", why: "The ideology and the structure that followed from it.", priority: "focus" },
          { chapter: "6. The Base", why: "How the organisation was built.", priority: "focus" },
          { chapter: "13. Hijira", why: "The move to Afghanistan and the run-up.", priority: "focus" },
          { chapter: "14. Going Operational", why: "The planning. Note what the various agencies knew and did not share.", priority: "focus" },
          { chapter: "16. \"Now It Begins\"", why: "The first World Trade Center attack and the response.", priority: "focus" },
          { chapter: "18. Boom", why: "The embassy bombings and the missed signals.", priority: "focus" },
          { chapter: "20. Revelations", why: "The aftermath and the accounting. Where the lessons live.", priority: "focus" },
        ],
        handsOn: [
          "Map the information flow in an organization you know and find three places where the right information exists but does not reach the decision-maker.",
          "Write down what incentive or structure keeps each gap open.",
        ],
        stressTest: [
          "What structural conditions let intelligence failures compound?",
          "How do silos form and persist inside large organizations?",
          "What can an individual do about an information gap they did not create?",
          "Where have you seen the same pattern in a smaller organization?",
        ],
      },
      {
        order: 25,
        title: "Getting Things Done: The Art of Stress-Free Productivity",
        googleBooksId: "WXcHwzaUd4MC",
        author: "David Allen",
        pages: 352,
        hours: 15,
        tagline: "The stress-free productivity system: capture, clarify, organize, reflect, engage.",
        dailyCommitment: 45,
        consolidationHours: 6.5,
        reinforcementPrompt: "You are a productivity coach for my read of David Allen's 'Getting Things Done'. Context I just learned: <paste your notes on the five stages of the workflow, the next-action decision, and the weekly review>. Question me one at a time: start with the five stages, then why the next-action decision matters, then what the weekly review is for, then how the system handles an ambiguous workload. If I stall, explain and give an example, then re-ask. End by having me walk through my own current commitments using the five stages.",
        why: "The FDE lives in ambiguous workloads with more commitments than hours. Allen's five-stage workflow is the operating system for that condition, and chapter 14 connects it to the same cognitive science the reading method is built on.",
        track: "Execution & Adaptability",
        priority: "very-high",
        focus: [
          { chapter: "1. A New Practice for a New Reality", why: "Why the old ways fail under modern workload volume.", priority: "focus" },
          { chapter: "2. Getting Control of Your Life: The Five Steps of Mastering Workflow", why: "Capture, clarify, organize, reflect, engage. The whole system.", priority: "focus" },
          { chapter: "3. Getting Projects Creatively Under Way", why: "The five phases of project planning. Skim unless you run projects.", priority: "skim" },
          { chapter: "4. Getting Started: Setting Up the Time, Space, and Tools", why: "Setup. Skim.", priority: "skim" },
          { chapter: "5. Capturing: Corralling Your Stuff", why: "The capture habit: the entry point of the system.", priority: "focus" },
          { chapter: "6. Clarifying: Getting In to Empty", why: "What to do with what you captured.", priority: "focus" },
          { chapter: "7. Organizing: Setting Up the Right Buckets", why: "Where things go.", priority: "focus" },
          { chapter: "8. Reflecting: Keeping It All Fresh and Functional", why: "The weekly review.", priority: "focus" },
          { chapter: "9. Engaging: Making the Best Action Choices", why: "The four criteria for choosing the next action.", priority: "focus" },
          { chapter: "10. Getting Projects Under Control", why: "Skim.", priority: "skim" },
          { chapter: "11. The Power of the Capturing Habit", why: "Why capture works. Skim.", priority: "skim" },
          { chapter: "12. The Power of the Next-Action Decision", why: "The single most useful idea in the book.", priority: "focus" },
          { chapter: "13. The Power of Outcome Focusing", why: "Skim.", priority: "skim" },
          { chapter: "14. GTD and Cognitive Science", why: "The research behind the method, and a direct bridge to the reading protocol.", priority: "focus" },
          { chapter: "15. The Path of GTD Mastery", why: "Skim.", priority: "skim" },
        ],
        handsOn: [
          "Run a full capture-and-clarify pass on your current commitments and set up the weekly review.",
          "Convert every open loop into a next action and notice what changes.",
        ],
        stressTest: [
          "What are the five stages of the workflow, in order?",
          "Why does the next-action decision matter more than the project list?",
          "What is the weekly review for, and what happens without it?",
          "How does Allen's model handle a commitment that is not yet well defined?",
        ],
      },
      {
        order: 26,
        title: "Principles: Life and Work",
        coverId: 8315355,
        author: "Ray Dalio",
        pages: 590,
        hours: 24,
        tagline: "Independent thinking, radical transparency, and decision-making by principle.",
        dailyCommitment: 60,
        consolidationHours: 8,
        reinforcementPrompt: "You are a decision-making coach for my read of Ray Dalio's 'Principles'. Context I just learned: <paste your notes on the five-step process, radical open-mindedness, and idea meritocracy>. Question me one at a time: start with Dalio's five-step process for getting what you want, then what radical open-mindedness means, then how an idea meritocracy differs from consensus. If I stall, explain and give a case, then re-ask. End by having me apply the five-step process to a real decision I am avoiding.",
        why: "Dalio's system for making better decisions under uncertainty, the same conditions the FDE works in. Part 1 and the life principles carry the weight; the work principles are a long catalogue to dip into.",
        track: "Execution & Adaptability",
        priority: "medium",
        focus: [
          { chapter: "Part 1: The Importance of Principles", why: "What principles are and why to have them. The setup for everything else.", priority: "focus" },
          { chapter: "Part 2: Life Principles", why: "The five-step process, radical open-mindedness, and pain + reflection = progress. The book's core.", priority: "focus" },
          { chapter: "Part 3: Work Principles", why: "Idea meritocracy and believability-weighted decision making. Dip into the sections that match your situation.", priority: "reference" },
        ],
        handsOn: [
          "Write your own principles for one recurring decision and test them against the last three times it came up.",
          "Run a believability-weighted decision on a real problem and record what you decided and why.",
        ],
        stressTest: [
          "What is Dalio's five-step process for getting what you want?",
          "What does radical open-mindedness mean, and what is its opposite?",
          "How does an idea meritocracy differ from consensus?",
          "Where does a principle stop being useful and start being a rule?",
        ],
      },
      {
        order: 27,
        title: "Impro: Improvisation and the Theatre",
        coverId: 261287,
        author: "Keith Johnstone",
        pages: 208,
        hours: 9,
        tagline: "Status, spontaneity, and narrative: the improviser's toolkit for responding under uncertainty.",
        dailyCommitment: 45,
        consolidationHours: 5,
        reinforcementPrompt: "You are an improvisation coach for my read of Keith Johnstone's 'Impro'. Context I just learned: <paste your notes on status transactions, spontaneity, and accepting offers>. Question me one at a time: start with what status is and how it is played, then why the first idea is usually the best one, then what accepting an offer means. If I stall, demonstrate with an example, then re-ask. End by having me apply 'yes, and' to a problem I am currently blocked on.",
        why: "The FDE improvises constantly: a demo that breaks, a requirement that changes mid-meeting, a client who does not know what they want. Johnstone's theatre exercises train exactly the skill of accepting an offer and building on it instead of blocking it.",
        track: "Execution & Adaptability",
        priority: "medium",
        focus: [
          { chapter: "Introduction", why: "The pedagogy behind the exercises. Short.", priority: "skim" },
          { chapter: "Status", why: "Status as something people do, not a title they hold. The most transferable section.", priority: "focus" },
          { chapter: "Spontaneity", why: "Why the first idea is usually the best one, and how to stop censoring it.", priority: "focus" },
          { chapter: "Narrative Skills", why: "How stories are built by interrupting routines. Useful for demos and explanations.", priority: "focus" },
          { chapter: "Masks and Trance", why: "The deepest and least transferable section. Skim.", priority: "skim" },
        ],
        handsOn: [
          "Run three status exercises with a colleague and notice what changes in the room.",
          "Do a 'yes, and' session on a blocked problem: every proposal gets accepted and built on for ten minutes.",
        ],
        stressTest: [
          "What is status, and how is it played moment to moment?",
          "Why does Johnstone say the first idea is usually the best one?",
          "What does accepting an offer mean, and what is blocking?",
          "Where does this show up in a client meeting?",
        ],
      },
      {
        order: 28,
        title: "The Decision Intelligence Handbook",
        googleBooksId: "goLGEAAAQBAJ",
        author: "L. Y. Pratt & N. E. Malcolm",
        pages: 267,
        hours: 11,
        tagline: "A method for decisions under ambiguity: frame, model, simulate, assess, act, review",
        dailyCommitment: 45,
        consolidationHours: 6,
        reinforcementPrompt: "You are a decision-making coach for my read of Pratt and Malcolm's The Decision Intelligence Handbook. Context I just learned: <paste your notes on the nine DI processes, decision framing, the decision design process, decision simulation, decision assessment lenses, monitoring, and retrospectives>. Question me one at a time: start with what decision intelligence adds beyond analytics and BI, then what a decision frame contains, then how a decision model is built and simulated, then what the assessment lenses are for. If I stall, explain and give a worked example, then re-ask differently. End by having me build a decision model for a real ambiguous decision from memory.",
        why: "The FDE's core condition is ambiguity: a problem nobody has framed, a stakeholder who cannot say what they want, a decision whose outcome is uncertain. This is the method for that: framing the decision, modelling it, simulating it, and reviewing it afterwards.",
        track: "Execution & Adaptability",
        priority: "high",
        focus: [
          { chapter: "1. Decoding Decision-Making: Good and Bad Decisions", why: "How to measure decision quality. The book's opening argument.", priority: "focus" },
          { chapter: "2. Decision Requirements", why: "The decision objective statement and decision framing. Where most decisions are actually lost.", priority: "focus" },
          { chapter: "3. Decision Modeling: The Decision Design Process", why: "Outcomes, levers, intermediates, externals, and the CDD. The core method.", priority: "focus" },
          { chapter: "4. Decision Modeling: The Decision Asset Investigation Process", why: "Finding the data and knowledge the model needs.", priority: "focus" },
          { chapter: "5. Decision Reasoning: The Decision Simulation Process", why: "Running the model, backward simulation, and optimization.", priority: "focus" },
          { chapter: "6. Decision Reasoning: The Decision Assessment Process", why: "Baseline, accuracy, bias, sensitivity, uncertainty, provenance, fidelity, consensus, timing.", priority: "focus" },
          { chapter: "7. Decision Action", why: "Monitoring, when to revisit, and the measurement effect.", priority: "focus" },
          { chapter: "8. Decision Review", why: "Artifacts retention and the decision retrospective. The learning loop.", priority: "focus" },
        ],
        handsOn: [
          "Frame one real ambiguous decision: objective statement, outcomes, levers, intermediates, externals.",
          "Build a simple simulation of that model and run it backward to find the leverage points.",
          "Write the monitoring spec: what you will watch and when you will revisit the decision.",
        ],
        stressTest: [
          "What does decision intelligence add beyond analytics and business intelligence?",
          "What does a decision frame contain, and why is framing the hardest part?",
          "What are the elements of a decision model (CDD)?",
          "What are the assessment lenses, and what does each one catch?",
          "How do you review a decision after the outcome is known?",
        ],
      },
    ],
  },
  {
    id: "elective",
    label: "Domain Elective: Fraud & Risk",
    objective: "A vertical: how AI and agentic systems change fraud detection and investigation.",
    note: "Elective. Read when a fraud or risk problem appears.",
    inCorePath: false,
    parallel: true,
    books: [
      {
        order: 29,
        title: "The Fraud Fighter's AI Playbook: Strategies for the GenAI Era",
        googleBooksId: "ZCwFEgAAQBAJ",
        author: "Gilit Saporta, Chen Zamir & Shoshana Maraney",
        pages: 220,
        hours: 9,
        tagline: "How GenAI changed fraud and fraud prevention: agentic attacks, ML models, and the human loop",
        dailyCommitment: 45,
        consolidationHours: 5,
        reinforcementPrompt: "You are a fraud-risk reviewer for my read of Saporta, Zamir and Maraney's The Fraud Fighter's AI Playbook. Context I just learned: <paste your notes on how GenAI changed the fraud economics, fraudster personas, deception techniques, ML model development, rule engines, and agentic systems for investigation>. Question me one at a time: start with why GenAI changed the cost-benefit analysis for fraudsters, then how fraudster personas differ, then how ML models are tailored to fraud patterns, then what agentic systems change in investigation. If I stall, explain and give a case, then re-ask differently. End by having me design a fraud-prevention review for a system I built, from memory.",
        why: "A domain read, and an honest one: it is off the AI-engineering spine. It is here because fraud prevention is where agentic AI meets an adversarial, risk-gated system, the same shape as the work you want to do, seen from the other side of the attack.",
        priority: "medium",
        focus: [
          { chapter: "1. The Evolution of Fraud in the GenAI Era", why: "The new economics of fraud. Why GenAI changed the cost curve.", priority: "focus" },
          { chapter: "2. Impact on Fraudster Personas", why: "From amateur to sweatshop operator. The adversary taxonomy.", priority: "focus" },
          { chapter: "3. Impact on the Online Fraud Ecosystem", why: "Fraud-as-a-service, malicious LLMs, deepfakes, and voice cloning.", priority: "focus" },
          { chapter: "4. GenAI-Powered Deception Techniques", why: "Deception in identity manipulation, and the agentic-AI question.", priority: "focus" },
          { chapter: "5. Trends and Diffuse Impact", why: "Agentic fraud orchestration and where it is heading.", priority: "focus" },
          { chapter: "6. Fundamentals of Fraud Analysis in the GenAI Era", why: "The analyst mindset: thinking like an agent that thinks like a fraudster.", priority: "focus" },
          { chapter: "7. Supercharging ML Models with GenAI", why: "Feature engineering, point-in-time simulation, and cutoff strategy with LLMs.", priority: "focus" },
          { chapter: "8. The Role of GenAI in Modern Fraud Prevention", why: "Threat mapping, rule engines, and agents for manual review and investigation.", priority: "focus" },
          { chapter: "9. GenAI Beyond the Fraud Department", why: "Adoption, cross-departmental use, and training.", priority: "skim" },
          { chapter: "10. Preparing for Future Uncertainty", why: "Agentic commerce, missing data, and cyber-fraud collaboration.", priority: "focus" },
        ],
        handsOn: [
          "Map one system you built for adversarial abuse: the attack surface, the signals, and the human review step.",
          "Write a threat map for an agentic feature using the book's personas.",
          "Draft the policy-abuse and first-party-fraud cases for a product you know.",
        ],
        stressTest: [
          "How did GenAI change the economics of fraud?",
          "What are the fraudster personas, and which ones matter for a given product?",
          "How do you tailor an ML model to fraud patterns?",
          "What do agentic systems change in fraud investigation?",
          "Where is agentic commerce headed, and what data will be missing?",
        ],
      },
    ],
  },
];

export const readingStages: ReadingStage[] = readingStageList.map((stage) => ({
  ...stage,
  pages: stage.books.reduce((total, book) => total + book.pages, 0),
  hours: stage.books.reduce((total, book) => total + book.hours, 0),
}));

export const readingBookCount = readingStages.reduce(
  (total, stage) => total + stage.books.length,
  0,
);

export const readingTotalHours = readingStages.reduce(
  (total, stage) => total + stage.hours,
  0,
);

/** Every stage except the reference shelf — the realistic reading load. */
export const readingCoreHours = readingStages
  .filter((stage) => stage.inCorePath)
  .reduce((total, stage) => total + stage.hours, 0);

export const readingTotalPages = readingStages.reduce(
  (total, stage) => total + stage.pages,
  0,
);

/**
 * The primary sources behind the LLM stages, in reading order.
 *
 * The order is the argument and it is deliberately not chronological: each
 * stage answers a question the previous one raised, and the systems papers come
 * last because they only pay off once you know why the models are slow and
 * memory-hungry. Each paper also names the domain it belongs to, which is a
 * property of the paper rather than a position in this sequence, and the book
 * stage it sits beside.
 */

export const readingPapers: ReadingPaper[] = [
  {
    id: "attention-is-all-you-need",
    plain: "The 2017 paper that dropped recurrence and convolution for self-attention, producing the Transformer that every model you call is built from.",
    title: "Attention Is All You Need",
    authors: "Vaswani et al.",
    year: 2017,
    arxiv: "1706.03762",
    problem:
      "Sequence transduction meant recurrence or convolution plus attention: slow to train, and distant positions could only be related through a long chain of steps.",
    move:
      "Drop recurrence and convolution entirely. Self-attention over the whole sequence at once, so every position attends to every other in a single step.",
    forYourWork:
      "The architecture under every model you call. Read it to see why context length costs quadratically, why position has to be injected rather than learned from order, and what the KV cache you serve actually is.",
    hours: 3,
    category: "architecture",
    stage: "core-prompting",
    pairsWith: { kind: "stage", id: "core" },
  },
  {
    id: "chain-of-thought",
    plain: "Shows that a few worked examples in the prompt make a model markedly better at multi-step problems, because it writes the steps down before it answers.",
    title: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models",
    authors: "Wei et al.",
    year: 2022,
    arxiv: "2201.11903",
    problem:
      "Prompting for an answer directly fails on multi-step reasoning, and the model cannot show its work.",
    move:
      "Put a few chain-of-thought demonstrations in the prompt, so the model generates intermediate reasoning steps before it commits to an answer.",
    forYourWork:
      "The mechanism behind structured-output and reasoning prompts. It also shows the limit: the steps are generated, not verified, so a confident wrong trace still reads as plausible.",
    hours: 2.5,
    category: "reasoning",
    stage: "core-prompting",
    pairsWith: { kind: "stage", id: "llm" },
  },
  {
    id: "lost-in-the-middle",
    plain: "Measures where in a long prompt a model actually looks. The answer is the beginning and the end, and performance falls off sharply in the middle.",
    title: "Lost in the Middle: How Language Models Use Long Contexts",
    authors: "Liu et al.",
    year: 2023,
    arxiv: "2307.03172",
    problem:
      "A long context was assumed to be a usable context, and no one had measured where in that context a model actually looks.",
    move:
      "Show that performance peaks when the answer sits at the start or the end of the context and drops sharply when it is buried in the middle, even with a longer window.",
    forYourWork:
      "The empirical basis for context engineering: put the instruction and the key fact at the edges, re-rank so the relevant chunk lands early, and treat a longer window as a cost rather than a free upgrade.",
    hours: 2.5,
    category: "retrieval",
    stage: "core-prompting",
    pairsWith: { kind: "stage", id: "llm" },
  },
  {
    id: "retrieval-augmented-generation",
    plain: "Pairs a language model with a searchable index, so it can answer from documents it was never trained on and show where the answer came from.",
    title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
    authors: "Lewis et al.",
    year: 2020,
    arxiv: "2005.11401",
    problem:
      "A pre-trained model keeps its knowledge in its parameters, so updating a fact means retraining, and the model still cannot show where an answer came from.",
    move:
      "Pair a parametric sequence-to-sequence model with a non-parametric vector index over Wikipedia, and train the retriever and the generator end to end.",
    forYourWork:
      "The paper behind the RAG you build. Retrieval and generation are one system rather than two, which is why the index is part of the model rather than a lookup in front of it.",
    hours: 2.5,
    category: "retrieval",
    stage: "retrieval-agents",
    pairsWith: { kind: "stage", id: "llm" },
  },
  {
    id: "react",
    plain: "The pattern behind most agent loops: reason, call a tool, read the result, reason again.",
    title: "ReAct: Synergizing Reasoning and Acting in Language Models",
    authors: "Yao et al.",
    year: 2022,
    arxiv: "2210.03629",
    problem:
      "Reasoning and acting were studied separately: a model could think without grounding, or act without a plan it could revise.",
    move:
      "Interleave reasoning traces with tool actions, so the trace induces and updates the plan while each action gathers information back into it.",
    forYourWork:
      "The agent loop you already ship. Read it to see why the trace has to stay in the prompt, and why hallucination drops once the model can observe the result of its own call.",
    hours: 2.5,
    category: "agents",
    stage: "retrieval-agents",
    pairsWith: { kind: "stage", id: "llm" },
  },
  {
    id: "toolformer",
    plain: "Shows a model teaching itself where to insert API calls, rather than being handed every call in a prompt.",
    title: "Toolformer: Language Models Can Teach Themselves to Use Tools",
    authors: "Schick et al.",
    year: 2023,
    arxiv: "2302.04761",
    problem:
      "A model can be told to use a tool in a prompt, but it does not know which call to make, when to make it, or with what arguments.",
    move:
      "Let the model insert candidate API calls into ordinary text, execute them, and keep only the calls whose result lowers the loss on the tokens that follow.",
    forYourWork:
      "The self-supervised route to tool use, and the clearest statement of the tool-calling contract: a name, arguments, and a defined way for the result to re-enter the context.",
    hours: 2.5,
    category: "agents",
    stage: "retrieval-agents",
    pairsWith: { kind: "stage", id: "llm" },
  },
  {
    id: "model-context-protocol",
    plain: "Not a paper but the open specification for connecting agents to tools and data, so a tool is written once and works in any client that speaks the protocol.",
    title: "Model Context Protocol Specification",
    authors: "Anthropic",
    year: 2024,
    arxiv: null,
    source: {
      label: "Specification",
      href: "https://modelcontextprotocol.io/specification/2024-11-05",
    },
    problem:
      "Every product that connects a model to tools builds its own interface, so a tool written for one agent does not work in another, and every integration is bespoke.",
    move:
      "Define an open JSON-RPC protocol with a client and a server role, a capability-negotiated lifecycle, and three primitives: resources, prompts and tools.",
    forYourWork:
      "The contract your own tool registry already half-implements. Read the architecture overview rather than the whole schema, to see how a server advertises capabilities and how a client discovers them.",
    hours: 1.5,
    category: "agents",
    stage: "retrieval-agents",
    pairsWith: { kind: "stage", id: "llm" },
  },
  {
    id: "graphrag",
    plain: "Adds a knowledge graph and community summaries to retrieval, so a system can answer questions about a whole corpus rather than one passage.",
    title: "From Local to Global: A Graph RAG Approach to Query-Focused Summarization",
    authors: "Edge et al.",
    year: 2024,
    arxiv: "2404.16130",
    problem:
      "Vector RAG answers a question about a particular passage, and fails on global questions about a whole corpus, because that is a summarisation task rather than a retrieval one.",
    move:
      "Build an entity knowledge graph with an LLM, partition it into a hierarchy of communities, pregenerate a summary for each, and answer by map-reduce over the community summaries.",
    forYourWork:
      "What to do when one vector index cannot answer a dataset-wide question, and what it costs: the graph is built at index time, so the index stops being only embeddings.",
    hours: 2.5,
    category: "retrieval",
    stage: "retrieval-agents",
    pairsWith: { kind: "stage", id: "llm" },
  },
  {
    id: "instructgpt",
    plain: "The paper behind chat models: fine-tune on demonstrations, learn a reward from human comparisons, then optimise against it.",
    title: "Training Language Models to Follow Instructions with Human Feedback",
    authors: "Ouyang et al.",
    year: 2022,
    arxiv: "2203.02155",
    problem:
      "A model trained to predict text is not trained to follow instructions, and more capability makes misalignment worse rather than better.",
    move:
      "Supervised fine-tuning on demonstrations, then a reward model learned from human comparisons, then PPO against that reward.",
    forYourWork:
      "The RLHF pipeline every aligned model descends from. Long, but it is where label quality, reward hacking, and the real cost of preference data become concrete.",
    hours: 4,
    category: "alignment",
    stage: "fine-tuning-alignment",
    pairsWith: { kind: "stage", id: "llm" },
  },
  {
    id: "lora",
    plain: "Freezes the model and trains a pair of small matrices per layer, so fine-tuning costs a fraction of the memory a full update needs.",
    title: "LoRA: Low-Rank Adaptation of Large Language Models",
    authors: "Hu et al.",
    year: 2021,
    arxiv: "2106.09685",
    problem:
      "Fine-tuning a large model updates every weight, which costs about the same memory and storage as the model itself.",
    move:
      "Freeze the pre-trained weights and inject trainable low-rank matrices into each layer, so the update is a pair of thin matrices rather than a full copy.",
    forYourWork:
      "Why adapters work and where they fail. Read it before choosing between a fine-tune and RAG, and before assuming a small rank is always enough.",
    hours: 2.5,
    category: "alignment",
    stage: "fine-tuning-alignment",
    pairsWith: { kind: "stage", id: "llm" },
  },
  {
    id: "qlora",
    plain: "LoRA with 4-bit weights, which is what makes fine-tuning a very large model possible on a single GPU.",
    title: "QLoRA: Efficient Finetuning of Quantized LLMs",
    authors: "Dettmers et al.",
    year: 2023,
    arxiv: "2305.14314",
    problem:
      "LoRA cut the trainable parameters, but the frozen base model still had to sit in memory at full precision, so a 65B model needed hundreds of gigabytes.",
    move:
      "Quantize the frozen base to 4-bit NormalFloat, keep the adapters in 16-bit, and page the optimizer state out, so gradients flow through quantized weights into low-rank adapters.",
    forYourWork:
      "What makes a 65B fine-tune fit on one 48GB GPU with no measured quality loss, and which of the three memory tricks carries the most weight. Read it after LoRA, because it is LoRA plus quantization.",
    hours: 2.5,
    category: "alignment",
    stage: "fine-tuning-alignment",
    pairsWith: { kind: "stage", id: "llm" },
  },
  {
    id: "dpo",
    plain: "A simpler route to alignment that trains on preference pairs directly, with no separate reward model and no reinforcement learning loop.",
    title: "Direct Preference Optimization: Your Language Model is Secretly a Reward Model",
    authors: "Rafailov et al.",
    year: 2023,
    arxiv: "2305.18290",
    problem:
      "RLHF needs a separate reward model and an RL loop, and both are unstable and expensive to run.",
    move:
      "Reframe preference optimisation as a classification loss on the policy itself, removing the reward model and the sampling loop.",
    forYourWork:
      "The simpler alignment path now in most stacks. Read it to know what you gain in stability and what you may lose against a well-tuned reward model.",
    hours: 3,
    category: "alignment",
    stage: "fine-tuning-alignment",
    pairsWith: { kind: "stage", id: "llm" },
  },
  {
    id: "deepseek-r1",
    plain: "Shows reasoning behaviour emerging from reinforcement learning on verifiable rewards alone, with no human-written reasoning examples.",
    title: "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning",
    authors: "DeepSeek-AI",
    year: 2025,
    arxiv: "2501.12948",
    problem:
      "Chain-of-thought reasoning depended on human-written demonstrations, and it was not clear a model could learn to reason without them.",
    move:
      "Train with group relative policy optimization against verifiable rewards alone, with no supervised reasoning traces, and let self-reflection, verification and backtracking emerge; then distil the behaviour into smaller models.",
    forYourWork:
      "The evidence that reasoning can be incentivised rather than taught, and why a verifiable reward is the load-bearing part. Long, and the ablations matter more than the headline.",
    hours: 4,
    category: "reasoning",
    stage: "fine-tuning-alignment",
    pairsWith: { kind: "stage", id: "llm" },
  },
  {
    id: "pagedattention",
    plain: "The paper behind vLLM. It treats the KV cache like virtual memory, so a server can run far more requests at the same time.",
    title: "Efficient Memory Management for Large Language Model Serving with PagedAttention",
    authors: "Kwon et al.",
    year: 2023,
    arxiv: "2309.06180",
    problem:
      "Serving wasted most of the GPU memory on KV cache fragmentation, so concurrency was bounded by memory rather than by compute.",
    move:
      "Treat the KV cache like virtual memory: fixed-size pages, a block table, and copy-on-write sharing of blocks across requests.",
    forYourWork:
      "Why serving throughput is a memory-management problem. Read it before tuning batch size or buying a larger GPU.",
    hours: 3,
    category: "serving",
    stage: "hardware-inference",
    pairsWith: { kind: "stage", id: "llm" },
  },
  {
    id: "flashattention",
    plain: "Rewrites attention so less data moves between the GPU's memory levels, giving exact attention that is faster and far lighter on memory.",
    title: "FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness",
    authors: "Dao et al.",
    year: 2022,
    arxiv: "2205.14135",
    problem:
      "Self-attention is quadratic in sequence length and dominated by memory traffic: the full score matrix is written to and read back from high-bandwidth memory, so long sequences are bound by bandwidth rather than by compute.",
    move:
      "Make attention IO-aware. Tile the query, key and value blocks, compute attention block by block in on-chip SRAM with an online softmax, and never materialise the full score matrix in HBM.",
    forYourWork:
      "Why long-context training and serving are memory problems rather than arithmetic ones, and why the fix is algorithmic. Read it before reaching for a larger GPU.",
    hours: 3.5,
    category: "architecture",
    stage: "hardware-inference",
    pairsWith: { kind: "stage", id: "core" },
  },
];

export const readingPapersCount = readingPapers.length;

export const readingPapersHours = readingPapers.reduce(
  (total, paper) => total + paper.hours,
  0,
);

export type StressTestStep = {
  title: string;
  body: string;
};

/**
 * The knowledge stress test: the four-step recall protocol run after every
 * focus chapter. Reading is not learning — the test is whether the idea can be
 * reproduced with the book closed.
 */
export const stressTestProtocol: StressTestStep[] = [
  {
    title: "Close the book",
    body: "After each focus chapter, write its core idea in two sentences from memory. If you cannot, you read it but did not take it.",
  },
  {
    title: "Explain it aloud",
    body: "Teach the idea to an imaginary junior engineer. Where you hedge or reach for the book's exact phrasing, that is the gap.",
  },
  {
    title: "Rebuild it by hand",
    body: "Implement the mechanism in a scratch file, not a summary, a working version. Ten lines that run beat a page of notes.",
  },
  {
    title: "Revisit on a schedule",
    body: "Return at one day, one week, and one month. Each revisit should be faster. If it is not, the idea never landed.",
  },
];

export type StageStressTest = {
  stage: string;
  body: string;
};

/** The capstone that closes each stage: a synthetic build that exercises the whole stage. */
export const stageStressTests: StageStressTest[] = [
  {
    stage: "Stage 1",
    body: "Take a raw dataset and produce the exploratory analysis, the sampling distribution, the confidence interval, and the hypothesis test, in numpy and pandas, without a library call that hides the step.",
  },
  {
    stage: "Stage 2",
    body: "Design an ML system end to end on paper (data, features, model, deployment, monitoring) then build the evaluation harness for it.",
  },
  {
    stage: "Stage 3",
    body: "Ship a model behind an API with monitoring, offline evaluation, and a rollback path. The stage is done when it survives a week of traffic.",
  },
  {
    stage: "Stage 4",
    body: "Refactor one Python service to the patterns in the book, and profile one hot path until the bottleneck moves.",
  },
  {
    stage: "Stage 5",
    body: "Spend a week embedded with one user of a system you built: interview them, watch them work, and ship one change that removes a real obstacle. Then write down what you believed before and what the evidence changed.",
  },
];

/**
 * The consolidation model behind `consolidationHours`:
 *   30 min of recall per focus chapter + 1 h of LLM reinforcement + 2 h stage capstone.
 */
export const RECALL_MINUTES_PER_FOCUS_CHAPTER = 30;
export const LLM_REINFORCEMENT_HOURS = 1;
export const STAGE_CAPSTONE_HOURS = 2;

/** Total consolidation time across the whole plan. */
export const readingConsolidationHours = readingStages.reduce(
  (total, stage) =>
    total + stage.books.reduce((sum, book) => sum + book.consolidationHours, 0),
  0,
);

/** Reading plus consolidation — the real commitment. */
export const readingTotalCommitmentHours = readingTotalHours + readingConsolidationHours;

/** Days to finish a book at its minimum daily commitment. */
export const daysToFinish = (book: ReadingBook) =>
  Math.ceil((book.hours * 60) / book.dailyCommitment);

/* ------------------------------------------------------------------ *
 * Why these books, and how to read them
 *
 * The owner plans against this, so it lives on the site. The fuller
 * argument — including the neuroscience and its references — is in the
 * vault note `Readings/How to Read These Books.md`.
 * ------------------------------------------------------------------ */

export type ReadingRationale = {
  title: string;
  body: string;
};

/** The case for the list, against stopping at the certificate layer. */
export const readingRationale: ReadingRationale[] = [
  {
    title: "Completion is a rate. Depth is a stock.",
    body: "A certificate is built to be finished: short lessons, guided labs, known answers. A book is the author's full argument, including the parts that do not fit in a lesson: why the happy path fails, what it costs, when not to use it.",
  },
  {
    title: "The field moves faster than curricula.",
    body: "A course from 2024 teaches 2024's tooling. The load-bearing ideas here (evaluation, the data lifecycle, architecture, cost) move far more slowly than the SDKs.",
  },
  {
    title: "Certificates teach the vocabulary. Books teach the judgement.",
    body: "The hard part of AI engineering is not calling a model; it is deciding what to build, how to know whether it works, and what to do when it drifts. That is judgement, built from depth.",
  },
];

/** The misuse risk: a book is a fountain, not a faucet. */
export const readingMisuse =
  "A book is a fountain: the water is there whether you drink or not. Passive reading, highlighting, re-reading, and binge-reading all produce the memory of having read rather than the ability to use it. The difference between a reader who keeps the ideas and one who keeps only the memory is not talent. It is whether the reading demanded something of them.";

/** The mechanisms the protocol is built on. */
export const readingMechanisms: ReadingRationale[] = [
  {
    title: "Retrieval practice",
    body: "Recalling information strengthens it more than restudying it. Retrieval is a memory modifier, not a read-out.",
  },
  {
    title: "Spacing",
    body: "A review at the edge of forgetting reconsolidates the trace, stronger than before.",
  },
  {
    title: "Interleaving",
    body: "Mixing topics forces you to choose the right strategy, not just execute a known one.",
  },
  {
    title: "Desirable difficulties",
    body: "Conditions that feel harder in the moment (retrieval, spacing, interleaving) produce the durable learning. If it feels easy, it is probably not sticking.",
  },
];

export type ReadingMethodStep = {
  step: string;
  title: string;
  body: string;
};

/** The read protocol, one chapter at a time. */
export const readingMethod: ReadingMethodStep[] = [
  {
    step: "01",
    title: "Preview",
    body: "Headings, summary, figures. Write one question the chapter should answer. Reading with a question is reading with a destination.",
  },
  {
    step: "02",
    title: "Read actively",
    body: "Pen in hand, not highlighter. The claim in your own words, the evidence, what would make it false. Sketch the diagram, a second retrieval route.",
  },
  {
    step: "03",
    title: "Retrieve",
    body: "Close the book. Write the chapter's argument from memory: what it was about, the key claims, the evidence, what is missing. This feels like wasted time. It is the step that does the work.",
  },
  {
    step: "04",
    title: "Space the review",
    body: "Return to the recall note at 24 hours, 1 week, and 1 month. Each review is a retrieval, not a re-read.",
  },
  {
    step: "05",
    title: "Apply it",
    body: "Build the smallest thing that uses the idea, or teach it. Knowledge that is used transfers; knowledge that is not used decays.",
  },
  {
    step: "06",
    title: "Sleep on it",
    body: "Consolidation happens overnight. Trading sleep for reading borrows from the retention the reading depends on.",
  },
];

/** The standard: tangible learning. */
export const readingSessionRule =
  "One session = one chapter = one artifact. If a session produced nothing you can point to (a recall note, a sketch, a piece of code) it did not happen.";

export const readingGuardrails: string[] = [
  "No highlighting as a substitute for retrieval.",
  "No re-reading before attempting recall.",
  "No reading without a purpose.",
  "No massed binge-reading.",
  "No reading without application.",
];
