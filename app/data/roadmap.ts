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
  },
  {
    id: "deeplearning-ai-ml-specialization",
    order: "Now",
    title: "Machine Learning Specialization",
    issuer: "DeepLearning.AI · Stanford Online",
    credentialType: "Specialization · 3 courses",
    commitment: "~2 months at 10 hrs/week",
    summary:
      "The fundamentals underneath that breadth, taught by Andrew Ng: supervised learning — linear and logistic regression, neural networks, decision trees and tree ensembles — unsupervised learning for clustering, anomaly detection and recommender systems, and the development practices that make models generalise rather than memorise.",
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
      "The platform layer: the core AWS services for compute, storage, database, networking, monitoring and security, then designing architectural solutions against cost, performance and operational excellence — including building and operating a secure, scalable data lake. Prepares for the AWS Certified Solutions Architect – Associate exam.",
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
      "The orchestration layer: agents across the full development lifecycle — build, test, deploy, monitor. LangChain and LangGraph for orchestration, LangSmith for observability and evaluation, and the LangChain Certified Agent Engineer exam as the capstone.",
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
    title: "CS221: Artificial Intelligence — Principles and Techniques",
    issuer: "Stanford University",
    credentialType: "Course · 4 units",
    commitment: "10 weeks · 10–20 hrs/week",
    summary:
      "The mathematical foundations that make applied work durable: search, game playing, Markov decision processes, constraint satisfaction, graphical models, and logic — AI as the mathematics of good decisions under incomplete information.",
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
