/** A diagram and its attribution. */
export type RoadmapImage = {
  src: string;
  alt: string;
  caption: string;
  credit: string;
  /** Intrinsic size, so the box is reserved before the file arrives. */
  width: number;
  height: number;
};

export type RoadmapModule = {
  /** URL segment, so the module's breakdown has its own page. */
  slug: string;
  title: string;
  /** One-line hook, shown on the course page. */
  summary: string;
  /** The diagram this module is read against, and who drew it. */
  image?: RoadmapImage;
  /**
   * The diagram's components, explained, in the diagram's own groupings. The
   * picture says what is there; this says what each part is for.
   */
  breakdown: { group: string; items: { name: string; role: string }[] }[];
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
        summary:
          "The foundations first: what an AI/ML environment actually is, the data and model lifecycle that runs through it, and the practices that make models generalise rather than memorise.",
        modules: [
          {
            slug: "introduction-to-ai-ml-environments",
            title: "Module 1: Introduction to AI/ML Environments",
            summary:
              "The environment end to end: ingestion, the lakehouse layers, the model frameworks, deployment, and the monitoring that closes the loop.",
            image: {
              src: "/roadmap/microsoft-course-1-module-1.png",
              alt: "Diagram of the Azure AI/ML environment: Event Hub and Data Factory ingesting IoT, database, external API and CRM/ERP sources into Databricks over a Data Lake with bronze, silver and gold layers, SQL Database and Cosmos DB as stores, TensorFlow, PyTorch, scikit-learn and the Azure Machine Learning SDK for model development, and AKS, Azure Machine Learning Service, App Service and Functions behind Monitor and Application Insights.",
              caption: "The Azure AI/ML environment, end to end.",
              credit: "Diagrammed by Frank Angelo Malubag",
              width: 1680,
              height: 784,
            },
            breakdown: [
              {
                group: "Raw data sources",
                items: [
                  {
                    name: "IoT",
                    role: "Sensor and device telemetry: the streaming source that arrives continuously rather than in batches.",
                  },
                  {
                    name: "DB",
                    role: "Existing operational and analytical databases, the structured record of the business.",
                  },
                  {
                    name: "External API",
                    role: "Third-party data and services pulled in over HTTP at ingest time.",
                  },
                  {
                    name: "CRM, ERP",
                    role: "The customer and back-office systems (Salesforce, SAP and peers) whose records describe the business directly.",
                  },
                ],
              },
              {
                group: "Ingestion & orchestration",
                items: [
                  {
                    name: "Event Hub",
                    role: "Azure's streaming ingestion service: takes in millions of events per second and hands them to consumers or to storage.",
                  },
                  {
                    name: "Azure Data Factory",
                    role: "The orchestration layer: schedules and chains the pipelines that move and transform data across services.",
                  },
                ],
              },
              {
                group: "Processing & transformation",
                items: [
                  {
                    name: "Azure Databricks",
                    role: "The Apache Spark-based analytics engine where raw data is cleaned, joined and engineered into features.",
                  },
                ],
              },
              {
                group: "Storage",
                items: [
                  {
                    name: "Azure Data Lake Storage",
                    role: "The landing store, in medallion layers: bronze holds raw ingested data, silver holds cleaned and conformed data, gold holds the aggregates ready for consumption.",
                  },
                  {
                    name: "Azure SQL Database",
                    role: "The relational store for structured, transactional and reporting workloads.",
                  },
                  {
                    name: "Azure Cosmos DB",
                    role: "The distributed NoSQL store for globally replicated, low-latency reads and writes at scale.",
                  },
                ],
              },
              {
                group: "Model development frameworks",
                items: [
                  {
                    name: "TensorFlow",
                    role: "Google's framework for building and training deep models, from research through to production serving.",
                  },
                  {
                    name: "PyTorch",
                    role: "The research-first deep learning framework that dominates papers and experimentation.",
                  },
                  {
                    name: "scikit-learn",
                    role: "The classical ML library: regression, classification, clustering, and the evaluation tooling around them.",
                  },
                  {
                    name: "Azure Machine Learning SDK",
                    role: "The Azure-native API for tracking experiments, packaging models and managing their lifecycle.",
                  },
                ],
              },
              {
                group: "Deployment platforms",
                items: [
                  {
                    name: "Azure Kubernetes Service (AKS)",
                    role: "Managed Kubernetes, for containerised services that scale on demand.",
                  },
                  {
                    name: "Azure Machine Learning Service",
                    role: "The managed serving and lifecycle layer for trained models: endpoints, retraining and rollout.",
                  },
                  {
                    name: "Azure App Service",
                    role: "The managed web app host for APIs and front ends, without managing the underlying machines.",
                  },
                  {
                    name: "Azure Functions",
                    role: "Event-driven serverless compute: run a small unit of logic in response to a trigger and pay per execution.",
                  },
                ],
              },
              {
                group: "Continuous monitoring",
                items: [
                  {
                    name: "Azure Monitor",
                    role: "Platform-wide metrics and logs: the health of every Azure resource in one place.",
                  },
                  {
                    name: "Application Insights",
                    role: "Application-level telemetry: requests, dependencies, exceptions and user flows inside the deployed app.",
                  },
                ],
              },
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
