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
};

export type ReadingStage = {
  id: string;
  label: string;
  /** What the reader walks out of the stage able to do */
  objective: string;
  note: string;
  pages: number;
  hours: number;
  books: ReadingBook[];
};

/**
 * Priority order for the AI engineering stack, as written up in the vault note
 * `Readings/AI Engineering Reading Plan.md`. Stages 1 and 2 are read cover to
 * cover; stage 3 is a reference shelf.
 *
 * Chapter lists verified against the publisher pages (O'Reilly, Packt, Google
 * Books) — not from memory.
 */
export const readingStages: ReadingStage[] = [
  {
    id: "core",
    label: "Stage 1 — AI Engineering Core",
    objective: "Foundation models as components, and how to design around what they get wrong.",
    note: "Read fully, in order. The mental model.",
    pages: 1442,
    hours: 60,
    books: [
      {
        order: 1,
        title: "AI Engineering",
        author: "Chip Huyen",
        pages: 534,
        hours: 22,
        tagline: "The map of the whole field",
        dailyCommitment: 60,
        consolidationHours: 6.5,
        reinforcementPrompt: "You are a staff engineer stress-testing my read of Chip Huyen's AI Engineering. Context I just learned: <paste your notes on evaluation methodology, AI-as-a-judge, prompt injection, RAG and agents, and the five-step AI engineering architecture>. Question me one at a time — start with when to fine-tune versus RAG, then why open-ended evaluation is harder than classification, then how the five architecture steps compose. If I stall, explain it and give a production example, then re-ask in different words. End by having me design a RAG feature from memory.",
        why: "The map of the territory: how AI engineering differs from ML engineering, and the full application lifecycle from prompt to production. Read it first so every later book has a place to land.",
        focus: [
          { chapter: "1. Introduction to Building AI Applications with Foundation Models", why: "The framing — AI engineering vs ML engineering, and the three-layer AI stack.", priority: "focus" },
          { chapter: "2. Understanding Foundation Models", why: "How the models actually work: training data, architecture, sampling, structured outputs.", priority: "focus" },
          { chapter: "3. Evaluation Methodology", why: "The evaluation mindset. The hardest and most neglected part of the book.", priority: "focus" },
          { chapter: "4. Evaluate AI Systems", why: "AI-as-a-judge, benchmarks, and choosing metrics for open-ended output.", priority: "focus" },
          { chapter: "5. Prompt Engineering", why: "Defensive prompting and prompt injection — directly relevant to the agent work you ship.", priority: "focus" },
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
        order: 2,
        title: "Designing Machine Learning Systems",
        author: "Chip Huyen",
        pages: 386,
        hours: 16,
        tagline: "The ML system lifecycle",
        dailyCommitment: 45,
        consolidationHours: 7,
        reinforcementPrompt: "You are an ML systems reviewer for my read of Chip Huyen's Designing Machine Learning Systems. Context I just learned: <paste your notes on data engineering, training data, feature engineering, deployment, and monitoring>. Question me one at a time — start with what makes an ML system more than a model, then data leakage, then training/serving skew, then what to monitor in production. If I stall, explain and give a concrete example, then re-ask differently. End by having me write a monitoring spec for a deployed model from memory.",
        why: "The systems thinking behind ML in production. It makes the rest of the stack legible — data, features, deployment, monitoring — as one design problem.",
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
        order: 3,
        title: "LLM Engineer's Handbook",
        author: "Paul Iusztin & Maxime Labonne",
        pages: 522,
        hours: 22,
        tagline: "Applied LLM engineering, end to end",
        dailyCommitment: 60,
        consolidationHours: 7,
        reinforcementPrompt: "You are a senior LLM engineer reviewing my read of the LLM Engineer's Handbook. Context I just learned: <paste your notes on the feature, training, and inference pipelines, RAG, supervised fine-tuning, evaluation, deployment, and LLMOps>. Question me one at a time — start with why RAG is a feature pipeline, then supervised fine-tuning versus preference alignment, then what LLM evaluation needs that classification evaluation does not. If I stall, explain and give a worked example, then re-ask differently. End by having me design the three pipelines for a small domain from memory.",
        why: "The end-to-end build. One product — the LLM Twin — taken from data through RAG, fine-tuning, deployment, and LLMOps, so the pieces stay connected.",
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
    id: "production",
    label: "Stage 2 — Production & Architecture",
    objective: "Move from a working prototype to a system that runs in production.",
    note: "Read fully, after Stage 1.",
    pages: 797,
    hours: 34,
    books: [
      {
        order: 4,
        title: "LLMOps",
        author: "Abi Aryan",
        pages: 284,
        hours: 12,
        tagline: "Running LLMs in production",
        dailyCommitment: 45,
        consolidationHours: 6,
        reinforcementPrompt: "You are an LLMOps reviewer for my read of Abi Aryan's LLMOps. Context I just learned: <paste your notes on the four goals, LLM-based application monitoring, data engineering, API-first deployment, evaluation, and governance>. Question me one at a time — start with the four goals and which is hardest for LLMs, then why traditional MLOps metrics fail, then offline versus online evaluation, then what governance covers beyond monitoring. If I stall, explain and give a production example, then re-ask differently. End by having me write a rollback plan for a failing LLM feature from memory.",
        why: "The operations layer: what actually breaks when an LLM goes into production, and how to keep it running. Short, dense, and directly applicable.",
        focus: [
          { chapter: "1. Introduction to Large Language Models", why: "Background. Skim if you have already read Stage 1.", priority: "skim" },
          { chapter: "2. Introduction to LLMOps", why: "The four goals — reliability, scalability, robustness, security — and the maturity model.", priority: "focus" },
          { chapter: "3. LLM-Based Applications", why: "Monitoring application performance and what you can actually control.", priority: "focus" },
          { chapter: "4. Data Engineering for LLMs", why: "The data path for production LLMs: collection, cleaning, and storage.", priority: "focus" },
          { chapter: "5. Model Domain Adaptation for LLM-Based Applications", why: "Prompting, RAG, and fine-tuning as adaptation strategies. Skim after Stage 1.", priority: "skim" },
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
        order: 5,
        title: "Architecting AI Software Systems",
        author: "Richard D. Avila & Imran Ahmad",
        pages: 212,
        hours: 9,
        tagline: "Architecture of AI systems",
        dailyCommitment: 45,
        consolidationHours: 6.5,
        reinforcementPrompt: "You are a software architect reviewing my read of Architecting AI Software Systems. Context I just learned: <paste your notes on the architectural cycle, complexity in AI systems, CONOPS, AI pipeline requirements, and the generative-AI case study>. Question me one at a time — start with the consequences of architectural failure, then what a CONOPS contains, then how non-functional requirements change for AI systems, then the difference between conceptual design and a requirements spec. If I stall, explain and give a concrete example, then re-ask differently. End by having me write a CONOPS for an AI feature from memory.",
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
        order: 6,
        title: "Architecture Patterns with Python",
        author: "Harry J.W. Percival & Bob Gregory",
        pages: 301,
        hours: 13,
        tagline: "DDD-style patterns in Python",
        dailyCommitment: 45,
        consolidationHours: 7.5,
        reinforcementPrompt: "You are a Python architect reviewing my read of Architecture Patterns with Python. Context I just learned: <paste your notes on domain modeling, the repository, the service layer, the unit of work, aggregates, events, CQRS, and dependency injection>. Question me one at a time — start with what the repository pattern solves and costs, then aggregates and consistency boundaries, then commands versus events, then when CQRS pays. If I stall, explain and give a small code example, then re-ask differently. End by having me sketch the patterns for one service from memory.",
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
    ],
  },
  {
    id: "reference",
    label: "Stage 3 — Craft & Reference",
    objective: "Sharpen the craft on demand, when a problem asks for it.",
    note: "Reference shelf. Read on demand.",
    pages: 1707,
    hours: 72,
    books: [
      {
        order: 7,
        title: "Robust Python",
        author: "Patrick Viafore",
        pages: 378,
        hours: 16,
        tagline: "Type hints, intent, safe failure",
        dailyCommitment: 45,
        consolidationHours: 10,
        reinforcementPrompt: "You are a Python reviewer for my read of Robust Python. Context I just learned: <paste your notes on intent, type annotations, constraining types, enums, data classes, invariants, protocols, pydantic, dependencies, static analysis, and property-based testing>. Question me one at a time — start with what intent means and how types communicate it, then invariants in classes, then protocols versus inheritance, then what property-based testing buys. If I stall, explain and give a code example, then re-ask differently. End by having me annotate a small module from memory.",
        why: "The craft layer: writing Python that survives change — types, intent, extensibility, and a testing strategy that acts as a safety net.",
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
          { chapter: "16. Dependencies", why: "Physical, logical, and temporal dependencies — and how to see them.", priority: "focus" },
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
        order: 8,
        title: "Hands-On Machine Learning",
        author: "Aurélien Géron",
        pages: 861,
        hours: 36,
        tagline: "The algorithms reference",
        dailyCommitment: 60,
        consolidationHours: 7.5,
        reinforcementPrompt: "You are an ML examiner for my read of Hands-On Machine Learning. Context I just learned: <paste your notes on the end-to-end project, classification, training, ensembles, CNNs, and attention>. Question me one at a time — start with the steps of the end-to-end project and where projects fail, then the bias/variance trade-off, then how CNNs exploit spatial structure, then what attention buys over an RNN. If I stall, explain and give a worked example, then re-ask differently. End by having me walk through the end-to-end project from memory.",
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
          "Do the exercises at the end of each focus chapter — reading is not the practice.",
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
      {
        order: 9,
        title: "High Performance Python",
        author: "Micha Gorelick & Ian Ozsvald",
        pages: 468,
        hours: 20,
        tagline: "The performance reference",
        dailyCommitment: 45,
        consolidationHours: 6,
        reinforcementPrompt: "You are a Python performance reviewer for my read of High Performance Python. Context I just learned: <paste your notes on profiling, data structures, vectorization, async I/O, multiprocessing, and memory>. Question me one at a time — start with why profiling comes first, then concurrency versus parallelism and the GIL, then when a generator is the right tool, then how to choose between multiprocessing, threads, and async. If I stall, explain and give a profiling example, then re-ask differently. End by having me profile and fix a slow function from memory.",
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
    ],
  },
  {
    id: "fde",
    label: "Stage 4 — Forward Deployed Foundations",
    objective:
      "Know what the technology is for, how to find out what people actually need, and how to keep executing when the problem is ambiguous — the forward-deployed foundation.",
    note: "Read fully. The human side of the stack.",
    pages: 2717,
    hours: 112,
    books: [
      {
        order: 10,
        title: "Augmenting Human Intellect: A Conceptual Framework",
        kind: "report",
        author: "Douglas C. Engelbart",
        pages: 134,
        hours: 6,
        tagline: "The original statement of intelligence augmentation — the map before the territory.",
        dailyCommitment: 45,
        consolidationHours: 5.5,
        reinforcementPrompt: "You are a skeptical interviewer for my read of Engelbart's 1962 'Augmenting Human Intellect'. Context I just learned: <paste your notes on the H-LAM/T system, the hierarchy of process structures, and the bootstrapping hypothesis>. Question me one at a time — start with what Engelbart means by augmentation versus automation, then the H-LAM/T framework, then the bootstrapping hypothesis. If I stall, explain it and press me on where a modern agent system fits his framework and where it breaks it. End by having me redraw his framework for a workflow I actually built.",
        why: "The primary source. Everything in the intelligence-augmentation tradition descends from this 1962 framework: intelligence as a system of artifacts, rules, methods, and habits, and technology as the means to raise its effectiveness — augmentation, not replacement.",
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
        order: 11,
        title: "Supersizing the Mind: Embodiment, Action, and Cognitive Extension",
        author: "Andy Clark",
        pages: 320,
        hours: 13,
        tagline: "The extended mind thesis: cognition leaks out of the skull and into the tools.",
        dailyCommitment: 45,
        consolidationHours: 5.5,
        reinforcementPrompt: "You are a philosophy examiner for my read of Andy Clark's 'Supersizing the Mind'. Context I just learned: <paste your notes on the extended mind thesis, the parity principle, and Clark's critique of brainbound cognition>. Question me one at a time — start with the extended mind thesis, then the parity principle, then what Clark thinks the brain is actually for. If I stall, explain and give the classic objections, then re-ask. End by pressing me on whether an LLM counts as part of a cognitive system on his account.",
        why: "The philosophical case for the human-tool coupling that IA assumes. Clark argues the mind is not bounded by the skin — the deepest justification for building tools that think with people rather than for them.",
        track: "Intelligence Augmentation",
        priority: "medium",
        focus: [
          { chapter: "Introduction: Brainbound versus Extended", why: "The thesis stated plainly. The book's whole argument.", priority: "focus" },
          { chapter: "1. The Active Body", why: "Embodiment. Useful context.", priority: "skim" },
          { chapter: "2. The Negotiable Body", why: "The body as part of the cognitive loop. Skim.", priority: "skim" },
          { chapter: "3. Material Symbols", why: "Language and symbols as cognitive scaffolding. Directly relevant to interface design.", priority: "focus" },
          { chapter: "4. World, Incorporated", why: "How the environment becomes part of the cognitive system.", priority: "focus" },
          { chapter: "5. Mind Re-bound?", why: "Clark's reply to critics. Skim.", priority: "skim" },
          { chapter: "6. The Cure for Cognitive Hiccups", why: "HEMC, HEC, HEMC — his taxonomy of extension. Dense; skim.", priority: "skim" },
          { chapter: "7. Rediscovering the Brain", why: "Where the brain fits. Skim.", priority: "skim" },
          { chapter: "8. Painting, Planning, and Perceiving", why: "Case studies in extended cognition. Skim.", priority: "skim" },
          { chapter: "9. Disentangling Embodiment", why: "What embodiment does and does not explain. Skim.", priority: "skim" },
          { chapter: "10. Conclusions: Mind as Mashup", why: "The synthesis. Read it.", priority: "focus" },
          { chapter: "Appendix: The Extended Mind", why: "The original 1998 Clark and Chalmers paper. The shortest path to the core idea.", priority: "focus" },
        ],
        handsOn: [
          "Take one workflow you built this month and map its cognitive loop: where does the human think, where does the tool, and where is the boundary actually drawn?",
          "Write down what the tool does that you no longer do — and what it costs when the tool fails.",
        ],
        stressTest: [
          "State the extended mind thesis and the parity principle without the book.",
          "What is Clark's answer to the 'mark of the cognitive'?",
          "Why does he think the brain is not the natural boundary of the mind?",
          "Would Clark accept an LLM as part of a cognitive system? Argue both sides.",
        ],
      },
      {
        order: 12,
        title: "The Design of Everyday Things",
        author: "Don Norman",
        pages: 384,
        hours: 15,
        tagline: "The classic on designing for humans: affordances, signifiers, and why bad design blames the user.",
        dailyCommitment: 45,
        consolidationHours: 6,
        reinforcementPrompt: "You are a design reviewer for my read of Don Norman's 'The Design of Everyday Things'. Context I just learned: <paste your notes on affordances, signifiers, mappings, feedback, constraints, and the seven stages of action>. Question me one at a time — start with affordances versus signifiers, then the seven stages, then Norman's account of human error. If I stall, explain and give an example, then re-ask. End by having me diagnose a real interface I use with his vocabulary.",
        why: "The FDE builds for people who are not engineers. Norman's vocabulary is the working language for the human side of any system you ship, and the fastest route from a working prototype to one people can actually use.",
        track: "Intelligence Augmentation",
        priority: "very-high",
        focus: [
          { chapter: "1. The Psychopathology of Everyday Things", why: "Where design fails and why people get blamed for it. The book's hook.", priority: "focus" },
          { chapter: "2. The Psychology of Everyday Actions", why: "The seven stages of action, and the gulf of execution versus evaluation.", priority: "focus" },
          { chapter: "3. Knowledge in the Head and in the World", why: "Why memorising is overrated and constraints are underrated.", priority: "focus" },
          { chapter: "4. Knowing What to Do: Constraints, Discoverability, and Feedback", why: "The core design toolkit.", priority: "focus" },
          { chapter: "5. Human Error? No, Bad Design", why: "Norman's account of error — directly relevant to how you design agent fallbacks.", priority: "focus" },
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
        order: 13,
        title: "Interviewing Users: How to Uncover Compelling Insights",
        author: "Steve Portigal",
        pages: 260,
        hours: 11,
        tagline: "The craft of finding out what people actually do — not what they say they do.",
        dailyCommitment: 45,
        consolidationHours: 6.5,
        reinforcementPrompt: "You are a user-research coach for my read of Steve Portigal's 'Interviewing Users'. Context I just learned: <paste your notes on planning research, asking questions that do not lead, and turning interviews into decisions>. Question me one at a time — start with why interviewing beats surveys for discovery, then the key stages of an interview, then how to avoid leading questions, then what to do when someone tells you what they think you want to hear. If I stall, explain and give an example, then re-ask. End by having me design an interview guide for a real problem.",
        why: "The FDE's core skill is translating an ambiguous operational problem into a system. Portigal's book is the practical method for the first half of that: planning the research, asking questions that do not lead, and turning what you hear into decisions.",
        track: "Customer Discovery",
        priority: "very-high",
        focus: [
          { chapter: "1. Interviewing Addresses a Business Need", why: "Why interviews, why now, and what they are for. The framing chapter.", priority: "focus" },
          { chapter: "2. Research Logistics", why: "Recruiting, scheduling, incentives, and the interview guide.", priority: "focus" },
          { chapter: "3. Contextual Methods — More Than Just Asking Questions", why: "Observation and shadowing. The part most people skip.", priority: "focus" },
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
        order: 14,
        title: "The Looming Tower: Al-Qaeda and the Road to 9/11",
        author: "Lawrence Wright",
        pages: 469,
        hours: 19,
        tagline: "How information fails inside large organizations — the FDE's problem, drawn at full scale.",
        dailyCommitment: 60,
        consolidationHours: 7,
        reinforcementPrompt: "You are an organisational analyst for my read of Lawrence Wright's 'The Looming Tower'. Context I just learned: <paste your notes on how information fragmented between the CIA and FBI, how incentives hid the truth, and what structural conditions let the failure compound>. Question me one at a time — start with the structural conditions that let intelligence failures compound, then how silos form and persist, then what an individual can do about it. If I stall, explain and give a case from the book, then re-ask. End by having me map the same failure pattern onto an organization I know.",
        why: "A history of the intelligence failures before 9/11, and a case study in how information fragments across silos, how incentives hide the truth, and how smart organizations miss what is in front of them. Read it as a study of the operational problems you will be sent to fix.",
        track: "Customer Discovery",
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
        order: 15,
        title: "Getting Things Done: The Art of Stress-Free Productivity",
        author: "David Allen",
        pages: 352,
        hours: 15,
        tagline: "The stress-free productivity system: capture, clarify, organize, reflect, engage.",
        dailyCommitment: 45,
        consolidationHours: 6.5,
        reinforcementPrompt: "You are a productivity coach for my read of David Allen's 'Getting Things Done'. Context I just learned: <paste your notes on the five stages of the workflow, the next-action decision, and the weekly review>. Question me one at a time — start with the five stages, then why the next-action decision matters, then what the weekly review is for, then how the system handles an ambiguous workload. If I stall, explain and give an example, then re-ask. End by having me walk through my own current commitments using the five stages.",
        why: "The FDE lives in ambiguous workloads with more commitments than hours. Allen's five-stage workflow is the operating system for that condition, and chapter 14 connects it to the same cognitive science the reading method is built on.",
        track: "Execution & Adaptability",
        priority: "very-high",
        focus: [
          { chapter: "1. A New Practice for a New Reality", why: "Why the old ways fail under modern workload volume.", priority: "focus" },
          { chapter: "2. Getting Control of Your Life: The Five Steps of Mastering Workflow", why: "Capture, clarify, organize, reflect, engage. The whole system.", priority: "focus" },
          { chapter: "3. Getting Projects Creatively Under Way", why: "The five phases of project planning. Skim unless you run projects.", priority: "skim" },
          { chapter: "4. Getting Started: Setting Up the Time, Space, and Tools", why: "Setup. Skim.", priority: "skim" },
          { chapter: "5. Capturing: Corralling Your Stuff", why: "The capture habit — the entry point of the system.", priority: "focus" },
          { chapter: "6. Clarifying: Getting In to Empty", why: "What to do with what you captured.", priority: "focus" },
          { chapter: "7. Organizing: Setting Up the Right Buckets", why: "Where things go.", priority: "focus" },
          { chapter: "8. Reflecting: Keeping It All Fresh and Functional", why: "The weekly review.", priority: "focus" },
          { chapter: "9. Engaging: Making the Best Action Choices", why: "The four criteria for choosing the next action.", priority: "focus" },
          { chapter: "10. Getting Projects Under Control", why: "Skim.", priority: "skim" },
          { chapter: "11. The Power of the Capturing Habit", why: "Why capture works. Skim.", priority: "skim" },
          { chapter: "12. The Power of the Next-Action Decision", why: "The single most useful idea in the book.", priority: "focus" },
          { chapter: "13. The Power of Outcome Focusing", why: "Skim.", priority: "skim" },
          { chapter: "14. GTD and Cognitive Science", why: "The research behind the method — and a direct bridge to the reading protocol.", priority: "focus" },
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
        order: 16,
        title: "Principles: Life and Work",
        author: "Ray Dalio",
        pages: 590,
        hours: 24,
        tagline: "Independent thinking, radical transparency, and decision-making by principle.",
        dailyCommitment: 60,
        consolidationHours: 8,
        reinforcementPrompt: "You are a decision-making coach for my read of Ray Dalio's 'Principles'. Context I just learned: <paste your notes on the five-step process, radical open-mindedness, and idea meritocracy>. Question me one at a time — start with Dalio's five-step process for getting what you want, then what radical open-mindedness means, then how an idea meritocracy differs from consensus. If I stall, explain and give a case, then re-ask. End by having me apply the five-step process to a real decision I am avoiding.",
        why: "Dalio's system for making better decisions under uncertainty — the same conditions the FDE works in. Part 1 and the life principles carry the weight; the work principles are a long catalogue to dip into.",
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
        order: 17,
        title: "Impro: Improvisation and the Theatre",
        author: "Keith Johnstone",
        pages: 208,
        hours: 9,
        tagline: "Status, spontaneity, and narrative — the improviser's toolkit for responding under uncertainty.",
        dailyCommitment: 45,
        consolidationHours: 5,
        reinforcementPrompt: "You are an improvisation coach for my read of Keith Johnstone's 'Impro'. Context I just learned: <paste your notes on status transactions, spontaneity, and accepting offers>. Question me one at a time — start with what status is and how it is played, then why the first idea is usually the best one, then what accepting an offer means. If I stall, demonstrate with an example, then re-ask. End by having me apply 'yes, and' to a problem I am currently blocked on.",
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
    ],
  },
];

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
  .filter((stage) => stage.id !== "reference")
  .reduce((total, stage) => total + stage.hours, 0);

export const readingTotalPages = readingStages.reduce(
  (total, stage) => total + stage.pages,
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
    body: "Implement the mechanism in a scratch file — not a summary, a working version. Ten lines that run beat a page of notes.",
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
    body: "Design an ML system end to end on paper — data, features, model, deployment, monitoring — then build the evaluation harness for it.",
  },
  {
    stage: "Stage 2",
    body: "Ship a model behind an API with monitoring, offline evaluation, and a rollback path. The stage is done when it survives a week of traffic.",
  },
  {
    stage: "Stage 3",
    body: "Refactor one Python service to the patterns in the book, and profile one hot path until the bottleneck moves.",
  },
  {
    stage: "Stage 4",
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
    body: "A certificate is built to be finished: short lessons, guided labs, known answers. A book is the author's full argument, including the parts that do not fit in a lesson — why the happy path fails, what it costs, when not to use it.",
  },
  {
    title: "The field moves faster than curricula.",
    body: "A course from 2024 teaches 2024's tooling. The load-bearing ideas here — evaluation, the data lifecycle, architecture, cost — move far more slowly than the SDKs.",
  },
  {
    title: "Certificates teach the vocabulary. Books teach the judgement.",
    body: "The hard part of AI engineering is not calling a model; it is deciding what to build, how to know whether it works, and what to do when it drifts. That is judgement, built from depth.",
  },
];

/** The misuse risk: a book is a fountain, not a faucet. */
export const readingMisuse =
  "A book is a fountain: the water is there whether you drink or not. Passive reading, highlighting, re-reading, and binge-reading all produce the memory of having read rather than the ability to use it. The difference between a reader who keeps the ideas and one who keeps only the memory is not talent — it is whether the reading demanded something of them.";

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
    body: "Conditions that feel harder in the moment — retrieval, spacing, interleaving — produce the durable learning. If it feels easy, it is probably not sticking.",
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
    body: "Pen in hand, not highlighter. The claim in your own words, the evidence, what would make it false. Sketch the diagram — a second retrieval route.",
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
  "One session = one chapter = one artifact. If a session produced nothing you can point to — a recall note, a sketch, a piece of code — it did not happen.";

export const readingGuardrails: string[] = [
  "No highlighting as a substitute for retrieval.",
  "No re-reading before attempting recall.",
  "No reading without a purpose.",
  "No massed binge-reading.",
  "No reading without application.",
];
