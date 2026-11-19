/**
 * A pointer at a block elsewhere on the site that already covers a module's
 * ground. By id, never by URL: the label and href are resolved from the
 * target's own data at render time, so a rename propagates and a typo throws
 * instead of 404ing.
 */
export type ReinforcementRef =
  | { kind: "skillGroup"; id: string }
  | { kind: "project"; id: string }
  | { kind: "readingStage"; id: string }
  | { kind: "post"; slug: string };

export type RoadmapModule = {
  title: string;
  /** One line on what the module actually covers, in the reader's terms. */
  summary: string;
  /**
   * Optional diagram of the module's ground. The summary stays: an image of
   * text is neither readable by a screen reader nor indexable, so the figure
   * illustrates rather than replaces it.
   */
  image?: {
    src: string;
    alt: string;
    caption: string;
    /** Intrinsic size, so the box is reserved before the file arrives. */
    width: number;
    height: number;
  };
  reinforces: ReinforcementRef[];
};

export type RoadmapCourse = {
  /** URL segment, so a course is addressable on its own page. */
  slug: string;
  title: string;
  /** Optional: what the course as a whole is for. */
  summary?: string;
  modules: RoadmapModule[];
};

export type RoadmapStep = {
  id: string;
  order: string;
  title: string;
  issuer: string;
  credentialType: string;
  commitment: string;
  summary: string;
  outcomes: string[];
  url?: string;
  /**
   * The syllabus, where it has been catalogued. Absent means "not yet
   * written up", which renders no block rather than an empty one.
   */
  courses?: RoadmapCourse[];
};

export const roadmapSteps: RoadmapStep[] = [
  {
    id: "microsoft-ai-ml-engineering",
    order: "Now",
    title: "Microsoft AI & ML Engineering Professional Certificate",
    issuer: "Microsoft · Coursera",
    credentialType: "Professional Certificate · 5 courses",
    commitment: "~6 months at 7 hrs/week",
    summary:
      "The breadth first: AI & ML infrastructure and data pipelines, core algorithms and techniques, intelligent troubleshooting agents, and the Azure ML lifecycle from data prep through deployment and monitoring. The foundation the applied layer sits on.",
    outcomes: [
      "Design AI & ML infrastructure, data pipelines, and deployment platforms",
      "Apply supervised, unsupervised, reinforcement, and deep learning methods",
      "Build troubleshooting agents that diagnose and resolve issues autonomously",
      "Run the end-to-end ML lifecycle on Azure",
    ],
    url: "https://www.coursera.org/professional-certificates/microsoft-ai-and-ml-engineering",
    courses: [
      {
        slug: "course-1",
        title: "Course 1: Foundations of AI and Machine Learning",
        modules: [
          {
            title: "Module 1: Introduction to AI/ML Environments",
            summary:
              "The Azure ML stack end to end: Event Hub and Data Factory ingesting and orchestrating raw sources (IoT, databases, external APIs, CRM and ERP) into Databricks, a Data Lake split into bronze, silver and gold layers with SQL Database and Cosmos DB as stores, TensorFlow, PyTorch, scikit-learn and the Azure ML SDK for model development, then AKS, App Service and Functions behind Monitor and Application Insights.",
            image: {
              src: "/roadmap/microsoft-course-1-module-1.png",
              alt: "Diagram of the Azure AI/ML environment: Event Hub and Data Factory ingesting IoT, database, external API and CRM/ERP sources into Databricks over a Data Lake with bronze, silver and gold layers, SQL Database and Cosmos DB as stores, TensorFlow, PyTorch, scikit-learn and the Azure Machine Learning SDK for model development, and AKS, Azure Machine Learning Service, App Service and Functions behind Monitor and Application Insights.",
              caption: "The environment Module 1 describes, end to end.",
              width: 1137,
              height: 771,
            },
            reinforces: [
              { kind: "skillGroup", id: "ml-data" },
              { kind: "skillGroup", id: "architecture-cloud" },
              { kind: "readingStage", id: "core" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "deeplearning-ai-ml-specialization",
    order: "Now",
    title: "Machine Learning Specialization",
    issuer: "DeepLearning.AI · Stanford Online",
    credentialType: "Specialization · 3 courses",
    commitment: "~2 months at 10 hrs/week",
    summary:
      "The fundamentals underneath that breadth, taught by Andrew Ng: supervised learning (linear and logistic regression, neural networks, decision trees and tree ensembles) and unsupervised learning for clustering, anomaly detection and recommender systems, and the development practices that make models generalise rather than memorise.",
    outcomes: [
      "Build supervised models for prediction and classification with NumPy and scikit-learn",
      "Train neural networks with TensorFlow for multi-class classification",
      "Apply unsupervised learning: clustering, anomaly detection, recommender systems",
      "Evaluate, tune, and improve models with a data-centric approach",
    ],
    url: "https://www.coursera.org/specializations/machine-learning-introduction/",
  },
  {
    id: "aws-cloud-solutions-architect",
    order: "Next",
    title: "AWS Cloud Solutions Architect Professional Certificate",
    issuer: "Amazon Web Services · Coursera",
    credentialType: "Professional Certificate · 4 courses",
    commitment: "~2 months at 10 hrs/week",
    summary:
      "The platform layer: the core AWS services for compute, storage, database, networking, monitoring and security, then designing architectural solutions against cost, performance and operational excellence, including building and operating a secure, scalable data lake. Prepares for the AWS Certified Solutions Architect – Associate exam.",
    outcomes: [
      "Choose and apply core AWS services for compute, storage, database, networking, monitoring, and security",
      "Design architectural solutions against cost, performance, and operational excellence",
      "Create and operate a secure, scalable data lake",
      "Prepare for the AWS Certified Solutions Architect – Associate exam",
    ],
    url: "https://www.coursera.org/professional-certificates/aws-cloud-solutions-architect",
  },
  {
    id: "aws-gen-ai-developer-advanced",
    order: "Next",
    title: "AWS Generative AI Developer Advanced Professional Certificate",
    issuer: "Amazon Web Services · Coursera",
    credentialType: "Professional Certificate · 22 courses · advanced",
    commitment: "~4 weeks at 10 hrs/week",
    summary:
      "The advanced applied layer on that platform: foundation models through Amazon Bedrock, agentic AI patterns and FM API integration, responsible AI with Guardrails and governance, cost optimisation and performance tuning, and evaluation frameworks for relevance, accuracy and hallucination detection. Prepares for the AWS Certified Generative AI Developer – Professional exam.",
    outcomes: [
      "Integrate foundation models with Amazon Bedrock, Lambda, and Step Functions",
      "Apply prompt engineering and agentic patterns to enterprise-scale GenAI solutions",
      "Design secure, cost-optimised, responsible architectures with Guardrails and governance",
      "Evaluate outputs for relevance, accuracy, and hallucination detection",
    ],
    url: "https://www.coursera.org/professional-certificates/aws-gen-ai-developer-advanced",
  },
  {
    id: "langchain-academy",
    order: "Then",
    title: "LangChain Academy",
    issuer: "LangChain",
    credentialType: "Self-paced courses",
    commitment: "Self-paced · free · enrolled",
    summary:
      "The orchestration layer: agents across the full development lifecycle: build, test, deploy, monitor. LangChain and LangGraph for orchestration, LangSmith for observability and evaluation, and the LangChain Certified Agent Engineer exam as the capstone.",
    outcomes: [
      "Build agents with LangChain and LangGraph",
      "Observe, evaluate, and debug with LangSmith",
      "Deploy and monitor agents against production traces",
      "Sit the LangChain Certified Agent Engineer (LCAE) exam",
    ],
    url: "https://academy.langchain.com/enrollments",
  },
  {
    id: "stanford-cs221",
    order: "Then",
    title: "CS221: Artificial Intelligence: Principles and Techniques",
    issuer: "Stanford University",
    credentialType: "Course · 4 units",
    commitment: "10 weeks · 10–20 hrs/week",
    summary:
      "The mathematical foundations that make applied work durable: search, game playing, Markov decision processes, constraint satisfaction, graphical models, and logic: AI as the mathematics of good decisions under incomplete information.",
    outcomes: [
      "Search, game playing, and Markov decision processes",
      "Constraint satisfaction and graphical models",
      "Machine learning and logic",
      "Probability and algorithms under incomplete information",
    ],
  },
];

export const lookingFor: string[] = [
  "Ventures where AI engineering is the product, not a bolt-on",
  "Ownership of the path from data pipeline to deployed agent",
  "Room to set technical direction and help others grow",
];
