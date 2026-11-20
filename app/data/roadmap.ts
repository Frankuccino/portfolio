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
  /**
   * The module's own material, condensed, as markdown blocks. Rendered after
   * the breakdown: the diagram and the list say what the module contains, this
   * says what it means.
   */
  notes: string[];
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
              width: 1622,
              height: 745,
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
            notes: [
              "### What the module is about\n\nAI/ML infrastructure is the cloud-based tools, services and resources that carry a model through its entire lifecycle. The course frames it as three pillars, and the argument is that infrastructure comes before technique.\n\n- **Data pipelines**: how data is ingested, processed, stored and served to models.\n- **Model development frameworks**: the libraries that build, train and evaluate models.\n- **Deployment platforms**: the services that put a trained model into production.\n\nBefore supervised learning or pre-trained LLMs, you need to know how data flows through systems, how models are built inside frameworks, and how they reach production.",
              "### The working environment\n\nThe course runs in Azure Machine Learning Studio. The lab is set up in four moves:\n\n- **Workspace**: create one at ml.azure.com, then add a notebook.\n- **Kernel**: select the Python - AzureML kernel, which carries the machine learning libraries the course uses.\n- **Resources**: the lab runs on a resource group with virtual machines and SSH access.\n- **Reproducibility**: save the setup as an Azure Resource Manager template so it can be recreated.",
              "### Data sources and pipelines\n\nA pipeline is a series of automated processes that move data from source to destination, transforming it along the way. Sources come in four kinds:\n\n- **Relational databases**: SQL Server, MySQL, PostgreSQL.\n- **NoSQL stores**: Azure Cosmos DB, MongoDB.\n- **Cloud object storage**: Azure Blob Storage, Amazon S3.\n- **Real-time streams**: IoT sensors, APIs.\n\nThe pipeline then runs through four stages:\n\n- **Ingestion**: collects the data, in real time or in batches; Azure Data Factory schedules and orchestrates it.\n- **Processing and transformation**: cleans, normalises, aggregates and engineers features; Azure Databricks, built on Apache Spark, does the heavy work.\n- **Storage**: Azure Data Lake Storage for raw unstructured data, Azure SQL Database for structured data that needs advanced queries, Azure Blob Storage for files and media.\n- **Access and utilisation**: Azure Machine Learning trains the models, Power BI reports on them.\n\nModel quality is bounded by data quality, which is why the pipeline comes first.",
              "### Choosing a framework\n\nModel development is the cycle of selecting an algorithm, training on data while tuning hyperparameters, and evaluating until the model generalises to new data. Four frameworks dominate:\n\n- **TensorFlow**: deep learning, with eager execution for prototyping and graph execution for optimised runs; TensorFlow Serving for production.\n- **PyTorch**: the research favourite, with dynamic computation graphs that are easier to debug; TorchScript for deployment.\n- **scikit-learn**: traditional machine learning, with regression, classification, clustering, preprocessing and evaluation behind one consistent API.\n- **Azure Machine Learning SDK**: the Azure-native layer, integrating with Data Factory, Databricks and AKS; AutoML for baselines, experiment tracking and managed deployment.\n\nThe selection factors are the nature of the problem, data type and size, performance requirements, ease of use, deployment and maintenance, and total cost of ownership.",
              "### Choosing a deployment platform\n\nDeployment takes a trained model and makes it available in a real environment: as a service, inside a web application, or on a device. Azure offers four routes:\n\n- **Azure Kubernetes Service**: containerises the model and runs it across a cluster, with autoscaling, load balancing and high availability; suits large-scale, high-traffic systems.\n- **Azure Machine Learning Service**: deploys a model as a RESTful endpoint in a few clicks; adds automated machine learning and model management.\n- **Azure App Service**: hosts web applications and APIs with built-in scaling, security and monitoring.\n- **Azure Functions**: serverless and event-driven, so you pay per execution and the model runs only when triggered.\n\nSix factors decide the choice: deployment speed, cost efficiency, ease of use, scalability, updates and maintenance, and security and compliance. The module's tips follow from those factors:\n\n- Azure Machine Learning Service for rapid prototyping and low-latency predictions.\n- Azure Functions or Azure Container Instances for infrequent or temporary deployments.\n- AKS for enterprise scale, and reserved instances for long-term runs.",
              "### Monitoring and maintenance\n\nDeployment is not the end of the loop. Two services watch a deployed model:\n\n- **Azure Monitor**: platform metrics and logs across every Azure resource.\n- **Application Insights**: application telemetry, meaning requests, dependencies, exceptions and user flows.\n\nAzure DevOps sits beside them for continuous integration and deployment, so updates, rollbacks and testing are automated rather than manual. The module points onward from here to model observability and drift detection as the next layer of the same problem.",
              "### How the course is assessed\n\nThe course is graded in six parts:\n\n- **Five quizzes, 15% each**: AI/ML applications; data management in AI/ML; selecting a framework; platform deployment; AI/ML concepts in practice.\n- **One peer review, 25%**: draft your pitch to the C-suite.\n\nIt is the first of five courses in the Microsoft AI & ML Engineering Professional Certificate:\n\n- AI and Machine Learning Algorithms and Techniques.\n- Building Intelligent Troubleshooting Agents.\n- Microsoft Azure for AI and Machine Learning.\n- Advanced AI and Machine Learning Techniques and Capstone.",
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
