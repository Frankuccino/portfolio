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
  /** Why this book, in this tier */
  why: string;
  focus: BookFocus[];
  handsOn: string[];
  stressTest: string[];
};

export type ReadingTier = {
  id: string;
  label: string;
  note: string;
  pages: number;
  hours: number;
  books: ReadingBook[];
};

/**
 * Priority order for the AI engineering stack, as written up in the vault note
 * `Readings/AI Engineering Reading Plan.md`. Tiers 1 and 2 are read cover to
 * cover; tier 3 is a reference shelf.
 *
 * Chapter lists verified against the publisher pages (O'Reilly, Packt, Google
 * Books) — not from memory.
 */
export const readingTiers: ReadingTier[] = [
  {
    id: "core",
    label: "Tier 1 — Core",
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
    label: "Tier 2 — Production & Architecture",
    note: "Read fully, after Tier 1.",
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
          { chapter: "1. Introduction to Large Language Models", why: "Background. Skim if you have already read Tier 1.", priority: "skim" },
          { chapter: "2. Introduction to LLMOps", why: "The four goals — reliability, scalability, robustness, security — and the maturity model.", priority: "focus" },
          { chapter: "3. LLM-Based Applications", why: "Monitoring application performance and what you can actually control.", priority: "focus" },
          { chapter: "4. Data Engineering for LLMs", why: "The data path for production LLMs: collection, cleaning, and storage.", priority: "focus" },
          { chapter: "5. Model Domain Adaptation for LLM-Based Applications", why: "Prompting, RAG, and fine-tuning as adaptation strategies. Skim after Tier 1.", priority: "skim" },
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
    label: "Tier 3 — Craft & Reference",
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
];

export const readingBookCount = readingTiers.reduce(
  (total, tier) => total + tier.books.length,
  0,
);

export const readingTotalHours = readingTiers.reduce(
  (total, tier) => total + tier.hours,
  0,
);

/** Tier 1 + 2, read cover to cover — the realistic reading load. */
export const readingCoreHours = readingTiers
  .filter((tier) => tier.id !== "reference")
  .reduce((total, tier) => total + tier.hours, 0);

export const readingTotalPages = readingTiers.reduce(
  (total, tier) => total + tier.pages,
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

export type TierStressTest = {
  tier: string;
  body: string;
};

/** The capstone that closes each tier: a synthetic build that exercises the whole tier. */
export const tierStressTests: TierStressTest[] = [
  {
    tier: "Tier 1",
    body: "Design an ML system end to end on paper — data, features, model, deployment, monitoring — then build the evaluation harness for it.",
  },
  {
    tier: "Tier 2",
    body: "Ship a model behind an API with monitoring, offline evaluation, and a rollback path. The tier is done when it survives a week of traffic.",
  },
  {
    tier: "Tier 3",
    body: "Refactor one Python service to the patterns in the book, and profile one hot path until the bottleneck moves.",
  },
];

/**
 * The consolidation model behind `consolidationHours`:
 *   30 min of recall per focus chapter + 1 h of LLM reinforcement + 2 h tier capstone.
 */
export const RECALL_MINUTES_PER_FOCUS_CHAPTER = 30;
export const LLM_REINFORCEMENT_HOURS = 1;
export const TIER_CAPSTONE_HOURS = 2;

/** Total consolidation time across the whole plan. */
export const readingConsolidationHours = readingTiers.reduce(
  (total, tier) =>
    total + tier.books.reduce((sum, book) => sum + book.consolidationHours, 0),
  0,
);

/** Reading plus consolidation — the real commitment. */
export const readingTotalCommitmentHours = readingTotalHours + readingConsolidationHours;

/** Days to finish a book at its minimum daily commitment. */
export const daysToFinish = (book: ReadingBook) =>
  Math.ceil((book.hours * 60) / book.dailyCommitment);
