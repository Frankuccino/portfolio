import { totalCourseworkHours } from "./portfolio";

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
  /** When the module was finished, and how long it took, where it is done. */
  completed?: string;
  hours?: number;
  /** The diagram this module is read against, and who drew it. */
  image?: RoadmapImage;
  /**
   * The diagram's components, explained, in the diagram's own groupings. The
   * picture says what is there; this says what each part is for. Absent on a
   * module that has been completed but not yet written up.
   */
  breakdown?: { group: string; items: { name: string; role: string }[] }[];
  /**
   * The module's own material, condensed, as markdown blocks. Rendered after
   * the breakdown: the diagram and the list say what the module contains, this
   * says what it means.
   */
  notes?: string[];
};

export type RoadmapCourse = {
  /** URL segment, so a course is addressable on its own page. */
  slug: string;
  title: string;
  /** Optional: what the course as a whole is for. */
  summary?: string;
  /**
   * What the modules under it are called. Defaults to "modules"; a track
   * whose parts are themselves courses says "courses".
   */
  moduleLabel?: string;
  /** Hours the issuer publishes for the course, where it publishes one. */
  hours?: number;
  /**
   * Optional, because a course can be catalogued before it is worked. The
   * course page and the sitemap both guard on it.
   */
  modules?: RoadmapModule[];
};

export type RoadmapStep = {
  id: string;
  order: string;
  title: string;
  issuer: string;
  credentialType: string;
  commitment: string;
  moduleProgress?: string;
  summary: string;
  outcomes: string[];
  /** Set when the credential has been earned, which tags it on the plan. */
  finished?: boolean;
  /** When it was earned, where it is a finished credential. */
  completed?: string;
  /** The verification record, where there is one. */
  credentialId?: string;
  /** What the syllabus section is called: "Courses", or "Track" for a track. */
  coursesLabel?: string;
  /**
   * How the credential is actually assessed, where it has been earned. The
   * syllabus is what was learned; this is what had to be passed.
   */
  process?: { name: string; detail: string }[];
  url?: string;
  /**
   * The syllabus, where it has been catalogued. Absent means "not yet
   * written up", which renders no block rather than an empty one.
   */
  courses?: RoadmapCourse[];
  /**
   * Set when the step is a self-study resource rather than a credential, so the
   * plan card and the step page stop calling it a certificate.
   */
  kind?: "resource";
};

export const roadmapSteps: RoadmapStep[] = [
  {
    id: "datacamp-ai-engineer-developers",
    order: "Done",
    title: "AI Engineer for Developers Associate",
    issuer: "DataCamp",
    credentialType: "Associate Certification · 2 exams",
    commitment: `~${totalCourseworkHours} hrs of coursework`,
    summary:
      "The applied end of the workflow: LLM application development, prompt engineering, RAG and vector databases, across ten DataCamp courses and both certification exams. Finished in November 2026.",
    outcomes: [
      "Build LLM applications against the OpenAI API, including the Responses API",
      "Apply prompt engineering patterns that hold up in production",
      "Use embeddings and vector databases, with Pinecone for retrieval",
      "Develop LLM applications with LangChain and integrate the Model Context Protocol",
      "Apply software engineering principles to the Python around the models",
    ],
    finished: true,
    completed: "Nov 2026",
    credentialId: "AIEDA0015784021049",
    /**
     * The issuer's own page. Direct (not pre-tagged): the Impact Publisher Tag
     * in the root layout rewrites it to a tracking link at runtime.
     */
    url: "https://www.datacamp.com/tracks/associate-ai-engineer-for-developers",
    coursesLabel: "Track",
    process: [
      {
        name: "Registration",
        detail:
          "Registering opens a 30-day window to complete every requirement, and the exams can be started whenever they fit inside it.",
      },
      {
        name: "Readiness quiz",
        detail:
          "DataCamp recommends sitting the readiness quiz before the certification, so the gaps show up before they cost an attempt.",
      },
      {
        name: "Timed exam · AIEDEVA101",
        detail:
          "Two hours, two attempts. It evaluates AI governance, model usage, programming, and application development.",
      },
      {
        name: "Practical exam · AIEDEVA501P",
        detail:
          "Four hours, two attempts, graded automatically. Three tasks built around a real-world scenario, completed in Python.",
      },
      {
        name: "Preparation",
        detail:
          "A sample exam is available for the format, so the expectations are familiar before a real attempt.",
      },
      {
        name: "Validity",
        detail:
          "The certification is valid for two years, then renewed by retaking it or upgrading.",
      },
    ],
    courses: [
      {
        slug: "associate-track",
        title: "The Associate Track",
        summary:
          "Ten courses completed between 3 and 8 November 2026, then the two certification exams. The track is the practical half of AI engineering: the API layer, retrieval, orchestration, and the engineering discipline around the model.",
        moduleLabel: "courses",
        modules: [
          {
            slug: "working-with-the-openai-api",
            title: "Working with the OpenAI API",
            summary: "An introduction to the OpenAI API: API keys, endpoints, cost, and calling chat models from Python, then controlling output with tokens and temperature. Covers shot prompting, chat roles, system messages, assistant examples, and building multi-turn conversations.",
            completed: "Nov 03, 2026",
            hours: 3,
            breakdown: [
              {
                group: "Getting started with the API",
                items: [
                  {
                    name: "API key",
                    role: "A unique secret key used to authenticate requests to the OpenAI API.",
                  },
                  {
                    name: "endpoints",
                    role: "The URLs for different model capabilities; the chat completions endpoint sends a conversation and returns a response.",
                  },
                  {
                    name: "API Usage cost",
                    role: "The price of a request, which depends on the model requested and the size of input and output.",
                  },
                  {
                    name: "tokens",
                    role: "Units of one or more characters that language models use to understand and interpret text.",
                  },
                ],
              },
              {
                group: "Calling the API with Python",
                items: [
                  {
                    name: "OpenAI's python library",
                    role: "The package used to interact with the OpenAI API from Python.",
                  },
                  {
                    name: "OpenAI API client",
                    role: "Created with the API key, it configures the environment for communicating with the API.",
                  },
                  {
                    name: "chat completions endpoint",
                    role: "Called with client.chat.completions.create() to send messages and get a model response.",
                  },
                  {
                    name: "ChatCompletion object",
                    role: "The response object with attributes like id, choices, created, model, object, and usage; the message text is under choices[0].message.content.",
                  },
                ],
              },
              {
                group: "Controlling the response",
                items: [
                  {
                    name: "max_completion_tokens",
                    role: "An upper limit on the number of tokens the model will output, used to shorten or lengthen responses.",
                  },
                  {
                    name: "temperature",
                    role: "A control on determinism, set to 1 by default and ranging from 0 (highly deterministic) to 2 (very random).",
                  },
                ],
              },
              {
                group: "Prompting and roles",
                items: [
                  {
                    name: "shot prompting",
                    role: "Including examples in a prompt to guide the model's response, as zero-shot, one-shot, or few-shot.",
                  },
                  {
                    name: "system message",
                    role: "A prompt that outlines the role of the model and can add guardrails restricting what it may generate.",
                  },
                  {
                    name: "user role",
                    role: "Provides an instruction or prompt to the assistant.",
                  },
                  {
                    name: "assistant role",
                    role: "Attached to model responses, and also used by developers to provide example answers that steer the desired style and tone.",
                  },
                ],
              },
              {
                group: "Multi-turn conversations",
                items: [
                  {
                    name: "messages list",
                    role: "A list of dictionaries with role and content, often starting with the system role, that represents the conversation.",
                  },
                  {
                    name: "single-turn tasks",
                    role: "Tasks with one input and one output, where the model uses only the system message and user prompt.",
                  },
                  {
                    name: "conversation history",
                    role: "Stored assistant responses appended back into messages so each new user message carries the full context.",
                  },
                ],
              },
            ],
            notes: [
              "### Getting started with the API\n\nRequests reach models through one unique secret API key, which authenticates every call. Endpoints are the URLs for different model capabilities, and the chat completions endpoint is the one used here. Usage cost depends on the model requested and the size of input and output, billed per million tokens. To get started: create an account, open the API keys page, and create a new secret key. Get the key in place first, since every later step depends on it.",
              "### Calling the API from Python\n\nThree lines get a Python call working: install OpenAI's Python library, import the OpenAI class, and instantiate a client with the API key to configure the environment. Then client.chat.completions.create() sends the request, taking a model and a messages list of dictionaries with role and content. The reply comes back as a ChatCompletion object exposing id, choices, created, model, object, and usage. The text itself sits at response.choices[0].message.content, so reach it one attribute at a time.",
              "### Controlling output and estimating cost\n\nTwo dials decide what comes back, and both are measured in tokens, the units of one or more characters models use to interpret text. max_completion_tokens caps how much the model outputs, while temperature (0 to 2, default 1) runs from highly deterministic to very random. Estimate cost as input_tokens times input_token_price plus output_tokens times output_token_price, assuming output tokens equal max_completion_tokens and dividing the per million prices down. Estimate before deploying, since longer outputs add up fast.",
              "### Transforming and generating text\n\nChat models do two jobs here: transform text through editing and summarization, and generate brand-new content. For editing, triple quotes define a multi-line prompt, and f-strings insert variables like a chat transcript into a prompt asking for a concise summary. For new content, write a clear and detailed prompt: a tagline for an electric car, or a product description built from features, tone, and target audience. Then tweak temperature and max_completion_tokens to iterate.",
              "### Roles, prompting, and multi-turn conversations\n\nExamples guide the model before you ask anything: shot prompting comes as zero-shot, one-shot, and few-shot. Messages then carry three roles, system, user, and assistant. The system role sets behavior and adds guardrails against misuse, while assistant messages supply structured examples that steer style and tone.\n- Single-turn tasks have one input and one output, drawing on the system message and user prompt.\n- For multi-turn conversations, append each assistant response to messages so the model keeps the full history.",
              "### In plain terms\n\nTalking to the OpenAI API is like ordering at a very literal restaurant: your API key is the reservation, the chat completions endpoint is the kitchen, and the bill arrives per million tokens. A system message sets the house rules, example messages set the recipe, and temperature plus max_completion_tokens decide how adventurous and how large the dish comes out.",
              "### Worth sitting with\n\n- When a system message and an assistant example pull in different directions, which one does the model follow, and how would you test it?\n- Temperature and max_completion_tokens both shape the reply, so when an answer feels wrong, which dial should you turn first and how do you know?\n- Conversation history lets the model remember earlier turns, so where does that approach start to strain as the exchange grows longer?",
            ],
          },
          {
            slug: "prompt-engineering-with-the-openai-api",
            title: "Prompt Engineering with the OpenAI API",
            summary: "These notes cover prompt engineering foundations and the OpenAI API, principles for clear prompts, advanced strategies such as few-shot and chain-of-thought prompting, business applications, and chatbot development with system messages and external context.",
            completed: "Nov 04, 2026",
            hours: 4,
            breakdown: [
              {
                group: "Foundations and API Recap",
                items: [
                  {
                    name: "Prompt engineering",
                    role: "Crafting prompts or instructions given to large language models to obtain desired responses.",
                  },
                  {
                    name: "Chat Completions",
                    role: "The main API endpoint used for chatting.",
                  },
                  {
                    name: "Message roles",
                    role: "User, assistant, and system labels attached to every API message.",
                  },
                  {
                    name: "Temperature",
                    role: "A value between 0 and 2 that controls the randomness of the answer.",
                  },
                  {
                    name: "max_tokens",
                    role: "A parameter that controls the desired response length.",
                  },
                  {
                    name: "get_response",
                    role: "A wrapper function that sends a prompt to the API and returns the response.",
                  },
                ],
              },
              {
                group: "Key Prompt Principles",
                items: [
                  {
                    name: "Clear and precise prompts",
                    role: "Guiding the model to the best results with unambiguous instructions.",
                  },
                  {
                    name: "Action verbs",
                    role: "Explicit verbs such as write, complete, explain, describe, or evaluate that steer the task.",
                  },
                  {
                    name: "Detailed instructions",
                    role: "Specifying context, output length, format and style, and audience.",
                  },
                  {
                    name: "Output length limits",
                    role: "max_tokens enforces a strict cap, while prompt limits can be bypassed but keep responses complete.",
                  },
                  {
                    name: "Delimiters",
                    role: "Markers such as triple backticks that isolate input text so the model can locate it.",
                  },
                  {
                    name: "F-strings",
                    role: "Python formatted strings that embed variable content into a prompt.",
                  },
                ],
              },
              {
                group: "Advanced Prompting Strategies",
                items: [
                  {
                    name: "Few-shot prompting",
                    role: "Giving the model example question-answer pairs so it learns how to answer.",
                  },
                  {
                    name: "Zero, one, and few-shot",
                    role: "The technique name depends on whether zero, one, or several examples are provided.",
                  },
                  {
                    name: "Multi-step prompting",
                    role: "Breaking a goal into smaller ordered steps to improve accuracy.",
                  },
                  {
                    name: "Chain-of-thought prompting",
                    role: "Asking the model to present reasoning steps before the final answer.",
                  },
                  {
                    name: "Self-consistency prompting",
                    role: "Generating multiple chain-of-thought responses and selecting the majority vote.",
                  },
                  {
                    name: "Iterative refinement",
                    role: "Building, testing, analyzing, and improving prompts in repeated cycles.",
                  },
                ],
              },
              {
                group: "Business Applications",
                items: [
                  {
                    name: "Text summarization",
                    role: "Condensing text into a shorter coherent version while preserving essential meaning.",
                  },
                  {
                    name: "Text expansion",
                    role: "Generating text from a few ideas or bullet points.",
                  },
                  {
                    name: "Text transformation",
                    role: "Changing text while keeping the same information, covering translation, tone adjustment, and writing improvement.",
                  },
                  {
                    name: "Text classification",
                    role: "Assigning one of several potential categories, such as sentiment.",
                  },
                  {
                    name: "Entity extraction",
                    role: "Extracting specific entities such as names, places, organizations, and dates.",
                  },
                  {
                    name: "Code generation and explanation",
                    role: "Creating code from a problem description or input-output examples, then explaining it.",
                  },
                ],
              },
              {
                group: "Chatbot Development",
                items: [
                  {
                    name: "System message",
                    role: "Defines the chatbot's purpose, response guidelines, and behavior guidance.",
                  },
                  {
                    name: "Role-playing prompts",
                    role: "Instructing the chatbot to adopt a specific role with matching tone, vocabulary, and behavior.",
                  },
                  {
                    name: "External context",
                    role: "Supplying missing information the model lacks from training cut-offs or non-public sources.",
                  },
                  {
                    name: "Dual-prompt get_response",
                    role: "A modified function that accepts a system prompt and a user prompt.",
                  },
                ],
              },
            ],
            notes: [
              "### Foundations and API Recap\n\nPrompts are the lever this whole module pulls: craft them well and the model delivers, craft them poorly and it wanders. Prompt engineering means writing prompts or instructions for large language models to get desired responses, like a recipe that combines ingredients into a dish.\n\n- The OpenAI Python package talks to the API with your key; Chat Completions is the main chat endpoint.\n- Every message carries one of three roles: user, assistant, or system.\n- Temperature (0 to 2) controls randomness, and max_tokens controls response length.\n- A get_response wrapper turns a prompt into a one-line call.\n\nWhy it matters: with roles and controls set, improving the model means editing the prompt, not the code.",
              "### Key Prompt Principles\n\nClear and precise prompts give the best results, so the first move is precision: name the action and spell out the details.\n\n- Use action verbs like write, explain, or evaluate; avoid ambiguous ones like understand, think, feel, or know.\n- Specify context, output length, format and style, and audience.\n- Cap length with max_tokens for a strict limit, or prompt instructions that can be bypassed but keep responses complete.\n- Delimit input with markers like triple backticks, place instructions first, and name the delimiters.\n\nWatch for the trade-off: a hard token cap can truncate an answer, while a soft instruction can be ignored.",
              "### Structured Outputs and Advanced Strategies\n\nThree levers do the heavy lifting here: structured outputs, conditional prompts, and iterative refinement.\n\n- Request tables, lists, structured paragraphs, or a custom format from instructions, output format, and delimited input.\n- Add if-else conditions, like generating a title only for English text.\n- Few-shot prompting supplies example question-answer pairs; zero-shot uses none, one-shot uses one.\n- Multi-step prompting breaks a goal into ordered steps; chain-of-thought asks for reasoning before the answer.\n- Self-consistency samples several chain-of-thought responses, then takes a majority vote.\n\nWhat to watch: examples and reasoning raise accuracy, but a flawed example or a wrong step still propagates.",
              "### Prompt Engineering for Business Applications\n\nBusiness value comes from a repeatable pattern: delimited input, a stated job, and a specified output.\n\n- Summarization condenses text with output limits, structure, and focus.\n- Expansion turns bullet points into text with tone, length, and audience.\n- Transformation covers translation, tone adjustment, and grammar or writing improvement.\n- Classification assigns categories like sentiment; entity extraction pulls names, places, organizations, and dates.\n- Code generation uses a problem description, language, and format, or input-output examples.\n- Code explanation ranges from a one-sentence summary to a detailed chain-of-thought walkthrough.\n\nWatch for: each task changes the details, not the underlying prompt discipline.",
              "### Prompt Engineering for Chatbot Development\n\nUser questions are hard to predict, so a chatbot's behavior must be set before the conversation starts, in the system message.\n\n- Define the chatbot's purpose, response guidelines, and conditional behavior in the system message.\n- A dual-prompt get_response function accepts a system and a user prompt.\n- Role-playing prompts assign a role, adjusting tone, vocabulary, and behavior to fit it.\n- External context fills gaps from training cut-offs or non-public information.\n- Provide it through sample conversations or delimited text in the system prompt, which suits only small contexts.\n\nWhat to watch: these methods hold for small contexts; large ones need more sophisticated techniques.",
              "### In plain terms\n\nPrompt engineering is cooking with a very literal chef: you pick the ingredients, write the recipe, and specify the plating, and the model follows your instructions exactly. Clear prompts, examples, and constraints turn a general-purpose model into a dependable assistant for summaries, chatbots, and code. The model is not the bottleneck, the prompt is.",
              "### Worth sitting with\n\n- When does adding more examples stop helping and start to muddy the answer?\n- How would you tell a weak prompt apart from a model that simply does not know?\n- Once a chatbot's context outgrows a few examples, what takes the place of the system prompt?",
            ],
          },
          {
            slug: "working-with-hugging-face",
            title: "Working with Hugging Face",
            summary: "Hugging Face is a community platform for sharing models and datasets. The notes cover running models locally or through inference providers, and building pipelines for text classification, summarization, and document Q&A, plus Auto classes for more control.",
            completed: "Nov 04, 2026",
            hours: 2,
            breakdown: [
              {
                group: "Hugging Face Hub",
                items: [
                  {
                    name: "Hub",
                    role: "a centralized place to find the best models, datasets, and applications for a project.",
                  },
                  {
                    name: "Model card",
                    role: "provides a model's name, uploader, tasks, modalities, languages, license, intended use, training details, and evaluation results.",
                  },
                  {
                    name: "Dataset card",
                    role: "holds dataset metadata such as how it was compiled, its license, and the number of rows.",
                  },
                  {
                    name: "Dataset viewer",
                    role: "lets you preview rows, while Data Studio enables SQL queries using WHERE and LIKE.",
                  },
                ],
              },
              {
                group: "Running models",
                items: [
                  {
                    name: "Local hardware",
                    role: "runs inference on your own computer or cloud environment, free but slow for large models without GPUs.",
                  },
                  {
                    name: "Inference provider",
                    role: "a partner organization giving remote access to high-performance machines through the API.",
                  },
                  {
                    name: "InferenceClient",
                    role: "configures the environment for the inference API, taking a provider and an API key from an environment variable.",
                  },
                ],
              },
              {
                group: "Transformers library",
                items: [
                  {
                    name: "pipeline",
                    role: "a convenient class for quickly running local inference for models and tasks on Hugging Face.",
                  },
                  {
                    name: "AutoModelForSequenceClassification",
                    role: "downloads a model for sequence classification using from_pretrained.",
                  },
                  {
                    name: "AutoTokenizer",
                    role: "loads the tokenizer paired with a model so text is processed as it was during training.",
                  },
                  {
                    name: "Custom pipeline",
                    role: "combines a task, model, and tokenizer for full control over tasks like sentiment analysis.",
                  },
                ],
              },
              {
                group: "Datasets",
                items: [
                  {
                    name: "datasets",
                    role: "a Python package to access, download, use, and share datasets with minimal code.",
                  },
                  {
                    name: "load_dataset",
                    role: "downloads a dataset by path and optional split such as train, test, or validate.",
                  },
                  {
                    name: "Apache Arrow",
                    role: "a columnar data format used by most Hugging Face datasets for faster querying.",
                  },
                  {
                    name: ".filter() and .select()",
                    role: "methods for filtering rows with a lambda and selecting rows by index, returning a new dataset.",
                  },
                ],
              },
              {
                group: "NLP tasks",
                items: [
                  {
                    name: "text-classification",
                    role: "assigns predefined categories to text, as in sentiment analysis and grammatical correctness.",
                  },
                  {
                    name: "zero-shot-classification",
                    role: "assigns predefined categories to text even when the model was not trained for them.",
                  },
                  {
                    name: "summarization",
                    role: "reduces text to a smaller version, either extractive or abstractive.",
                  },
                  {
                    name: "question-answering",
                    role: "generates answers to a question from a document passed as context.",
                  },
                ],
              },
              {
                group: "PDF processing",
                items: [
                  {
                    name: "pypdf",
                    role: "a lightweight library for reading PDF files.",
                  },
                  {
                    name: "PdfReader",
                    role: "loads a PDF by path and exposes pages and extract_text() for document Q&A.",
                  },
                ],
              },
            ],
            notes: [
              "### The Hub and the community\n\nRead the card before you download anything. The Hub is the centralized place to find models, datasets, and applications, and each entry carries the metadata that decides whether it is worth using: browse, filter by task, then open the model card.\n\n- Model cards carry the model name, uploader, supported tasks and modalities, languages, license, intended use, training details, and evaluation results.\n\nCompare models with those evaluation results, and check the license before you build on one.",
              "### Running models\n\nInference simply means prediction, and there are two ways to run it: on your own local hardware, or through an inference provider on the API.\n\n- Local hardware is free but slow for large models without GPUs.\n- An inference provider is a partner organization with high-performance machines; you send a request with the model and inputs, and the result comes back.\n- The InferenceClient configures the environment, taking a provider and an API key from an environment variable.\n\nSwitch to a provider when the model outgrows your hardware, and keep the API key in an environment variable rather than in code.",
              "### Datasets\n\nPull a dataset in one call. The Hub hosts community-curated sets, each with a card, a viewer, and Data Studio for SQL queries; install the datasets package and use load_dataset with a path and an optional split such as train, test, or validate.\n\n- Dataset cards hold metadata like how it was compiled, its license, and the number of rows.\n- The viewer previews rows, while Data Studio runs SQL with WHERE and LIKE.\n- Datasets use Apache Arrow columnar storage, which queries faster than row-based formats.\n\nManipulate rows with .filter() and .select() rather than pandas operations, since Arrow datasets behave differently.",
              "### Text classification and summarization\n\nThe task name changes with the kind of category: text classification assigns predefined labels, and there is a pipeline for each variant.\n\n- Sentiment analysis labels emotional tone.\n- Grammatical correctness labels text Acceptable or Unacceptable.\n- QNLI checks whether a premise answers a question, for question-premise entailment.\n- zero-shot-classification assigns dynamic categories the model was not trained for.\n\nSummarization reduces text to a smaller version: extractive selects key sentences, while abstractive generates new text. Set min_new_tokens and max_new_tokens to control length, and prefer extractive when accuracy matters.",
              "### Auto classes and document Q&A\n\nPipelines are fast and simple, but Auto classes give more control over every step.\n\n- AutoModelForSequenceClassification and AutoTokenizer load a model and its paired tokenizer with from_pretrained, so text is processed as it was during training.\n- A custom pipeline then combines a task, model, and tokenizer, as in sentiment analysis.\n\nFor document Q&A, pypdf's PdfReader loads a PDF by path, exposes pages, and extract_text() pulls the text; a question-answering pipeline takes that text as context plus a question. Watch the tokenizer pairing, since the wrong one changes how the model reads your input.",
              "### In plain terms\n\nHugging Face is like a public library for AI: the Hub is the shelves where you borrow models and datasets, a pipeline is the front desk that hands you an answer in one visit, and Auto classes let you open the book and work through the pages yourself. You can run a model on your own machine or pay an inference provider to run it for you, then feed it text to classify, summarize, or question. Read the card first, because the license and the evaluation results decide whether a model is worth your time.",
              "### Worth sitting with\n\n- What does a model card's evaluation result actually measure, and what does it leave out?\n- When does running a model locally stop being cheaper than an inference provider once you count hardware and time?\n- Why does the tokenizer have to match the model, and what breaks when it does not?",
            ],
          },
          {
            slug: "llmops-concepts",
            title: "LLMOps Concepts",
            summary: "LLMOps covers the practices, processes, and infrastructure for managing LLMs across their lifecycle, from ideation and development to deployment and operations. It combines prompt engineering, RAG, fine-tuning, CI/CD, monitoring, cost management, and security governance.",
            completed: "Nov 05, 2026",
            hours: 1,
            breakdown: [
              {
                group: "Foundations of LLMOps",
                items: [
                  {
                    name: "LLMs",
                    role: "Models trained on extensive text data to understand and generate human-like text, marked by pre-training on vast datasets, massive parameters, and sometimes unpredictable behavior.",
                  },
                  {
                    name: "LLMOps",
                    role: "Specialized practices, processes, and infrastructure to manage, deploy, and maintain LLMs throughout their lifecycle while controlling risk.",
                  },
                  {
                    name: "MLOps",
                    role: "Managing the operational aspects of traditional machine learning models, differing from LLMOps in model size, data type, and output.",
                  },
                  {
                    name: "Lifecycle phases",
                    role: "Ideation, development, and operational phases that can be revisited in either direction as needs change.",
                  },
                ],
              },
              {
                group: "Ideation Phase",
                items: [
                  {
                    name: "Data sourcing",
                    role: "Identifying data needs, finding sources, and making data accessible while checking relevance, availability, and quality.",
                  },
                  {
                    name: "Base model selection",
                    role: "Choosing the right pre-trained LLM for the application's use case.",
                  },
                  {
                    name: "Proprietary models",
                    role: "Privately owned models such as ChatGPT, Claude, PaLM2, and Gemini, easy to set up but requiring data exposure.",
                  },
                  {
                    name: "Open-source models",
                    role: "Publicly available models such as Meta Llama 3, hostable in-house with transparency and full customizability.",
                  },
                  {
                    name: "Model selection factors",
                    role: "Performance, model characteristics, practical considerations, and secondary factors like parameter count and popularity.",
                  },
                ],
              },
              {
                group: "Development Phase",
                items: [
                  {
                    name: "Prompt engineering",
                    role: "Crafting prompts with instruction, examples or context, input data, and output indicator to improve accuracy and control.",
                  },
                  {
                    name: "Prompt management",
                    role: "Tracking prompts, outputs, and model settings for efficiency, reproducibility, and collaboration.",
                  },
                  {
                    name: "Chains and agents",
                    role: "Chains are deterministic pipelines of connected steps, while agents let the LLM choose among available tools adaptively.",
                  },
                  {
                    name: "RAG",
                    role: "Retrieval augmented generation, retrieving related documents from vector databases to augment prompts with external knowledge.",
                  },
                  {
                    name: "Fine-tuning",
                    role: "Adjusting model weights with own data through supervised fine-tuning or reinforcement learning from human feedback.",
                  },
                  {
                    name: "Testing",
                    role: "Building test sets and choosing metrics to determine when the application is ready for production.",
                  },
                ],
              },
              {
                group: "Deployment, Monitoring, and Cost Management",
                items: [
                  {
                    name: "Hosting",
                    role: "Deciding where to host application components, on private or public cloud or on-premise.",
                  },
                  {
                    name: "API design",
                    role: "Defining endpoints and rules so software components can request and share information.",
                  },
                  {
                    name: "CI/CD",
                    role: "Continuous integration and continuous deployment automating integration, testing, and deployment from source to production.",
                  },
                  {
                    name: "Scaling",
                    role: "Horizontal scaling adds machines for traffic, while vertical scaling boosts single-machine power for reliability and speed.",
                  },
                  {
                    name: "Monitoring and observability",
                    role: "Using logs, metrics, and traces to watch system behavior and reveal internal state across input, functional, and output monitoring.",
                  },
                  {
                    name: "Cost management",
                    role: "Choosing the right model, optimizing prompts, and reducing calls to lower hosting and usage expenses.",
                  },
                ],
              },
              {
                group: "Governance and Security",
                items: [
                  {
                    name: "Governance",
                    role: "Policies, guidelines, and frameworks governing development, deployment, and usage of LLM applications.",
                  },
                  {
                    name: "Security",
                    role: "Measures preventing unauthorized access, data breaches, adversarial attacks, and misuse of model outputs.",
                  },
                  {
                    name: "Access control",
                    role: "Role-based access control assigns permissions to roles, with zero trust requiring continuous authentication and authorization.",
                  },
                  {
                    name: "Prompt injection",
                    role: "Attackers manipulating input fields or prompts to execute unauthorized commands or actions.",
                  },
                  {
                    name: "Data poisoning",
                    role: "Injecting false, misleading, or malicious data into training sets, deliberately or unintentionally.",
                  },
                ],
              },
            ],
            notes: [
              "### Foundations of LLMOps\n\nLLMOps exists because LLM scale changes the management problem. These models carry massive parameters, pre-train on vast datasets, and sometimes behave unpredictably, so they need practices and infrastructure to carry them through a whole lifecycle. That is what sets LLMOps apart from MLOps, on model size, data type, and output. The lifecycle runs through ideation, development, and operational phases, and those phases can be revisited in both directions. That flexibility is the point: the process is not a straight line.",
              "### Ideation Phase\n\nEverything starts with data. Ideation opens with data sourcing: identifying data needs, finding sources, and making the data accessible and checking its quality. Only then comes base model selection, choosing a pre-trained LLM that fits the use case, whether proprietary like ChatGPT or open-source like Meta Llama 3. Selection weighs four things: performance, model characteristics, practical considerations, and secondary factors such as parameters and popularity. Get these calls wrong and the rest of the lifecycle pays for it, so this phase sets the application's scope and requirements.",
              "### Development Phase\n\nDevelopment is a cyclic process, and at its heart sits the prompt. Prompt engineering shapes that prompt with instruction, examples, input data, and output indicators, while prompt management tracks the results so work stays reproducible. Around it, chains give deterministic step sequences and agents let the LLM choose among tools adaptively. To bring in outside knowledge, RAG retrieves documents from vector databases to augment prompts, and fine-tuning adjusts the model's weights with your own data. Testing then uses test sets and metrics to decide whether the application is ready to deploy.",
              "### Deployment, Monitoring, and Cost Management\n\nDeployment is the handoff from build to live traffic, and three disciplines keep it healthy once it is there. It covers hosting choice, API design, and how each component runs, often in containers, with CI/CD automating integration, testing, and deployment. Scaling follows two routes: horizontal, adding machines, and vertical, boosting one machine's power.\n\n- Monitoring: logs, metrics, and traces across input, functional, and output monitoring\n- Alert handling: procedures to notify and respond to issues promptly\n- Cost optimization: right model, shorter prompts, fewer calls via batching, caching, and quotas",
              "### Governance and Security\n\nNeglecting governance and security is how LLM applications cause real damage. Governance sets the policies, guidelines, and frameworks for developing, deploying, and using them; security prevents unauthorized access, breaches, and adversarial attacks. Role-based access control assigns permissions to roles under a zero trust model. The threats to plan for:\n\n- Prompt injection: manipulating inputs to execute unauthorized commands\n- Output manipulation: leveraging outputs for downstream attacks\n- Denial-of-service: flooding requests to raise cost and hurt availability\n- Data poisoning: injecting false or malicious data into training sets",
              "### In plain terms\n\nAn LLM is a brilliant new hire who has read the entire internet but has never set foot in your company. LLMOps is what makes that hire usable: the right data, clear instructions, tested prompts, and then, once they are live, monitoring, cost control, and guardrails. Ideation decides what they should do, development trains and tests them, and operations keeps them honest.",
              "### Worth sitting with\n\n- When does an agent's adaptability stop being worth its unpredictability, and what signals tell you to fall back to a deterministic chain?\n- If fine-tuning can cause catastrophic forgetting, when is that trade-off worth it, and can RAG and fine-tuning be combined instead of choosing one?\n- If the LLM is treated as an untrusted user, what does that rule out for the data it can retrieve through RAG, and who gets to decide?",
            ],
          },
          {
            slug: "working-with-the-openai-responses-api",
            title: "Working with the OpenAI Responses API",
            summary: "Covers the OpenAI Responses API from first request through production patterns: parameters and reasoning, conversation chaining, response items, web search, function-calling tools, structured outputs, streaming semantic events, and multimodal inputs.",
            completed: "Nov 07, 2026",
            hours: 3,
            breakdown: [
              {
                group: "First Requests and Parameters",
                items: [
                  {
                    name: "client.responses.create()",
                    role: "Creates a request, passing model, instructions, and input.",
                  },
                  {
                    name: "instructions",
                    role: "Clear requirements on how the model should behave, considered superior to input.",
                  },
                  {
                    name: "input",
                    role: "The task or question at hand.",
                  },
                  {
                    name: "reasoning",
                    role: "A dictionary with an effort key that tunes how much deep thinking the model does.",
                  },
                  {
                    name: "max_output_tokens",
                    role: "An integer specifying the token count, which also limits reasoning tokens.",
                  },
                ],
              },
              {
                group: "Conversation Chaining",
                items: [
                  {
                    name: "previous_response_id",
                    role: "Provides a prior response ID so the model loads context from that conversation.",
                  },
                  {
                    name: "conversation history",
                    role: "Stores and retrieves previous prompts and responses so the model has access to them.",
                  },
                  {
                    name: "control flow",
                    role: "A mechanism that keeps the prompt following the response continually.",
                  },
                  {
                    name: "latest_response_id",
                    role: "Variable updated after each iteration to extract the latest response ID.",
                  },
                ],
              },
              {
                group: "Response Items and Web Search",
                items: [
                  {
                    name: "response.output",
                    role: "Extracts the output in structured form, where each object is an item.",
                  },
                  {
                    name: "ResponseReasoningItem",
                    role: "Returned for reasoning-enabled models, with a summary attribute if requested.",
                  },
                  {
                    name: "ResponseOutputMessage",
                    role: "Contains the final output of the model under the content attribute.",
                  },
                  {
                    name: "web_search tool",
                    role: "Enables the model to retrieve up-to-date information, overcoming knowledge cutoffs.",
                  },
                  {
                    name: "include",
                    role: "Parameter passing web_search_call.action.sources to add sources.",
                  },
                ],
              },
              {
                group: "Function-Calling Tools",
                items: [
                  {
                    name: "function-calling tools",
                    role: "Convert Python functions into tools the LLM can use.",
                  },
                  {
                    name: "tool definitions",
                    role: "A manual for the LLM so it can choose which tool to use and call it correctly.",
                  },
                  {
                    name: "function_call item",
                    role: "Returned when the model decides a message requires the tool, with arguments as a JSON string.",
                  },
                  {
                    name: "function_call_output",
                    role: "Message type appended to messages with the tool's result.",
                  },
                ],
              },
              {
                group: "Structured Outputs",
                items: [
                  {
                    name: "pydantic BaseModel",
                    role: "Defines the output schema, the template the LLM populates.",
                  },
                  {
                    name: "text_format",
                    role: "Argument passing the pydantic class to enforce output structure.",
                  },
                  {
                    name: "output_parsed",
                    role: "Attribute extracting the parsed output with attributes for each defined field.",
                  },
                ],
              },
              {
                group: "Streaming and Multimodality",
                items: [
                  {
                    name: "semantic events",
                    role: "Structured updates describing what is happening during generation.",
                  },
                  {
                    name: "stream=True",
                    role: "Enables streaming so partial updates are delivered as the model types.",
                  },
                  {
                    name: "role-based messages",
                    role: "Dictionaries with role and content keys passed to input.",
                  },
                  {
                    name: "input_image",
                    role: "Content type for sending images from URLs or local base64 files.",
                  },
                ],
              },
            ],
            notes: [
              "### First Requests and Parameters\n\nThe Responses API is the latest stop on a road from the Completions API (2020) through Chat Completions and Assistants to one simplified interface for chat and tool-based work. A request goes through client.responses.create(), passing model, instructions, and input.\n\n- **instructions**: clear requirements on behavior, considered superior to input.\n- **input**: the task or question at hand.\n- **reasoning**: a dictionary with an effort key (none, low, medium, high, xhigh).\n- **max_output_tokens**: an integer token count that also caps reasoning tokens.\n\nBecause instructions outrank input, behavior belongs there and the task in input.",
              "### Conversation Chaining and Response Items\n\nBack-and-forth conversation needs control flow plus conversation history, and the API supplies the second part out of the box: previous_response_id loads context from that conversation, so any thread can be picked up at any point.\n\n- **response.output**: structured output where each object is an item.\n- **ResponseReasoningItem**: reasoning for reasoning-enabled models, with .summary.\n- **ResponseOutputMessage**: final output under .content, with .status for cut-offs.\n- **items as building blocks**: loop over items, check item.type, and extract attributes for custom logic.\n\nThe payoff is a predictable loop: inspect item.type, then pull the attribute you need.",
              "### Web Search and Function-Calling Tools\n\nModels carry a knowledge cut-off, so web search is built in; enabling it takes a single tools parameter, and sources ride along with include. Function-calling tools turn any Python function into a tool the LLM can reach for.\n\n- **tool definitions**: a manual with type, name, description, and parameters.\n- **two-request workflow**: first to trigger the call, then to send results back.\n- **json.loads / json.dumps**: convert arguments and results between JSON strings and dictionaries.\n- **function_call and function_call_output**: item types for the call and its result.\n\nThe watch point is the handoff: the model proposes arguments as JSON, your code executes, then the result goes back before the answer.",
              "### Structured Outputs\n\nStructured outputs enforce strict JSON for production systems, and the schema is a pydantic BaseModel template the LLM populates, with Field descriptions so the model knows what to generate.\n\n- **client.responses.parse()**: sends the request with text_format set to the pydantic class.\n- **output_parsed**: extracts the parsed object with attributes per field.\n- **nested classes**: a Mistake class can be listed inside DetailedQuizResult for detailed results.\n\nThis is the fix for the weakest link in an LLM app: formatting a UI depends on.",
              "### Streaming, Inputs, and Multimodality\n\nStreaming delivers partial updates through semantic events instead of raw chunks, which is what makes real-time interfaces feel alive. Inputs can be plain strings or role-based messages, and images arrive from URLs or local files.\n\n- **stream=True**: opens a streaming connection via a with statement.\n- **events**: response.output_text.delta, response.created, response.completed, function_call_arguments.delta.\n- **role-based messages**: dictionaries with role and content keys; system, user, and assistant roles.\n- **input_image**: image_url from a URL or a base64-encoded local file.\n\nBecause events are typed, your app can react to each stage rather than guess.",
              "### In plain terms\n\nThe Responses API is a concierge for OpenAI models: hand it a request and it can answer, look up fresh information, call your own code, and return the result in a strict format you define. Web search, function-calling tools, structured JSON, streaming, and images all go through the same desk. One interface, and the model does the running around.",
              "### Worth sitting with\n\n- If max_output_tokens caps reasoning tokens too, what happens to the answer when the model spends its budget thinking?\n- Since instructions outrank input, what shifts when you move to role-based messages and a system role instead?\n- What should an app do when a streamed function_call_arguments.delta never arrives at .done?",
            ],
          },
          {
            slug: "introduction-to-embeddings-with-the-openai-api",
            title: "Introduction to Embeddings with the OpenAI API",
            summary: "Embeddings map text into a multi-dimensional vector space so that similar meanings sit close together, enabling semantic search, recommendations, and zero-shot classification by comparing cosine distances. ChromaDB stores and queries these vectors efficiently at scale.",
            completed: "Nov 06, 2026",
            hours: 3,
            breakdown: [
              {
                group: "Embedding fundamentals",
                items: [
                  {
                    name: "embeddings",
                    role: "Numerical representations of text mapped into a multi-dimensional vector space, where more similar texts sit closer together.",
                  },
                  {
                    name: "semantic meaning",
                    role: "The full context and intent captured by an embedding, so paraphrases like supermarket and shop are recognized as related.",
                  },
                  {
                    name: "vector space",
                    role: "The multi-dimensional space where each text's position is given by the numbers the model outputs.",
                  },
                  {
                    name: "cosine distance",
                    role: "A metric from scipy.spatial ranging from 0 to 2, where smaller values indicate greater similarity between two vectors.",
                  },
                  {
                    name: "t-SNE",
                    role: "A dimensionality reduction technique used to project embeddings down to 2 dimensions for visualization, at the cost of some information.",
                  },
                ],
              },
              {
                group: "Creating embeddings with the OpenAI API",
                items: [
                  {
                    name: "Embeddings endpoint",
                    role: "The OpenAI API route called through client.embeddings.create(), requiring an API key and taking model and input arguments.",
                  },
                  {
                    name: "input",
                    role: "The text to embed, which accepts a single string or a list of strings for batching multiple inputs in one call.",
                  },
                  {
                    name: "model_dump()",
                    role: "Converts the response object into a dictionary for easier access to keys such as data, model, and usage.",
                  },
                  {
                    name: "data",
                    role: "The list in the response holding one dictionary per input, each containing an embedding, index, and object.",
                  },
                  {
                    name: "batching",
                    role: "Passing a list of texts to create() so embeddings come back in a single API call, one dictionary per input.",
                  },
                  {
                    name: "usage",
                    role: "The response key reporting token counts such as total_tokens.",
                  },
                ],
              },
              {
                group: "Embedding applications",
                items: [
                  {
                    name: "semantic search",
                    role: "Embeds the query and candidate texts, computes cosine distances, and returns the closest matches.",
                  },
                  {
                    name: "enriched embeddings",
                    role: "Combining headline, topic, and keywords into one formatted string before embedding to improve relevance.",
                  },
                  {
                    name: "recommendation systems",
                    role: "Embed the items and the user's history, average history vectors with numpy.mean, filter seen items, and recommend the nearest unseen.",
                  },
                  {
                    name: "zero-shot classification",
                    role: "Embeds class descriptions as reference points, computes cosine distances, and assigns the label with the smallest distance.",
                  },
                  {
                    name: "find_n_closest",
                    role: "A helper that computes distances, sorts them, and returns the n closest results with their indices.",
                  },
                  {
                    name: "user history",
                    role: "Multiple viewed articles combined by taking the mean of their embeddings to base recommendations on.",
                  },
                ],
              },
              {
                group: "Vector databases and ChromaDB",
                items: [
                  {
                    name: "vector database",
                    role: "Stores embeddings, source text, and metadata, and computes similarity much more efficiently than in-memory rescanning.",
                  },
                  {
                    name: "ChromaDB",
                    role: "An open-source vector database with local and client/server modes, used to embed, store, update, and query vectors.",
                  },
                  {
                    name: "collection",
                    role: "Analogous to a table, created with create_collection() from a name and an embedding_function such as OpenAIEmbeddingFunction.",
                  },
                  {
                    name: "query()",
                    role: "Retrieves the n_results nearest items to query_texts, embedding the query automatically and returning ids, documents, metadatas, and distances.",
                  },
                  {
                    name: "metadata",
                    role: "Small extra data such as type and release_year used to filter results with where clauses and operators like $eq, $ne, $gt, and $and.",
                  },
                  {
                    name: "tiktoken",
                    role: "OpenAI's tokenizer used to count tokens and estimate embedding costs before inserting a large dataset.",
                  },
                ],
              },
            ],
            notes: [
              "### What embeddings are\n\nThe point of an embedding is position: similar texts land near each other in a multi-dimensional vector space, dissimilar ones far apart.\n\n- Words, phrases, or entire documents are mapped to numbers by an embedding model.\n- Proximity is semantic meaning, the full context and intent behind a word: supermarket and shop sit close, so a model treats those queries as related.\n- Every vector holds 1536 numbers, no matter the input.\n- t-SNE projects 1536 dimensions down to 2D for plotting, and some information is lost in the squeeze.\n\nWatch the squeeze: the 2D view is a map, not the territory.",
              "### Creating embeddings\n\nOne API call can embed a whole batch of texts, so batch instead of looping.\n\n- The embeddings endpoint takes a model and an input, a single string or a list of strings.\n- Batching a list is more efficient than one call per text and returns one embedding per input.\n- model_dump() turns the response into a dictionary; data holds one entry per input with embedding, index, and object.\n- usage reports total_tokens.\n- Loop with enumerate to assign each embedding back to its article.\n\nBatch early: it is the difference between one request and hundreds.",
              "### Similarity and applications\n\nEvery embedding application is the same three moves: embed the query and the candidates, compute cosine distances, return the closest.\n\n- Cosine distance runs from 0 to 2; smaller means more similar.\n- Semantic search enriches text by combining headline, topic, and keywords into one string before embedding.\n- Recommendations average user-history vectors with numpy.mean and filter out seen items.\n- Zero-shot classification embeds class descriptions as reference points and assigns the nearest label.\n\nVague class descriptions mislabel: a one-word label like Business carries too little meaning, so write detailed descriptions.",
              "### Vector databases with ChromaDB\n\nAt scale, holding millions of 13kB embeddings in memory and rescanning them per query stops working, so the vectors move into a vector database that stores embeddings, source text, and metadata and computes similarity far more efficiently.\n\n- ChromaDB runs in local or client/server mode; PersistentClient saves to disk.\n- create_collection takes a name and an embedding_function like OpenAIEmbeddingFunction.\n- Add documents with add(ids=..., documents=...), inspect with count() and peek(), query with query(query_texts=[...], n_results=...), which embeds the query automatically.\n- update, upsert, and delete modify items; where filters like $eq or $and narrow results.\n\nRead the query return carefully: Chroma nests results in a list per query text.",
              "### In plain terms\n\nEmbeddings are a map of meaning: the OpenAI API turns text into 1536 numbers, so supermarket and shop land in the same neighbourhood and cosine distance is just the distance between two addresses. Search, recommendations, and zero-shot classification all become a nearest-neighbour lookup on that map, and ChromaDB is the filing cabinet that keeps millions of coordinates searchable.",
              "### Worth sitting with\n\n- What does an embedding space do with two texts that share every keyword but mean opposite things, like a sarcastic review and a glowing one?\n- If a query vector lands almost exactly between two class descriptions, what should the classifier do, and what does that gap tell you about the space?\n- When a Chroma collection grows from thousands to millions of vectors, which breaks first: embedding cost, query latency, or metadata filtering?",
            ],
          },
          {
            slug: "building-ai-applications-with-pinecone",
            title: "Building AI Applications with Pinecone",
            summary: "Covers Pinecone index setup and management, vector ingestion with metadata, fetching and querying with distance metrics and metadata filters, updates and deletes, batching, namespaces, plus semantic search and a RAG chatbot built with OpenAI.",
            completed: "Nov 07, 2026",
            hours: 3,
            breakdown: [
              {
                group: "Indexes and setup",
                items: [
                  {
                    name: "Pinecone client",
                    role: "Initializes the API client with an API key to configure the environment.",
                  },
                  {
                    name: "Serverless index",
                    role: "Index type that scales automatically and runs as a managed cloud service, used throughout.",
                  },
                  {
                    name: "Pod-based index",
                    role: "Index type built on pre-configured hardware pods with chosen storage, latency, and throughput.",
                  },
                  {
                    name: "create_index",
                    role: "Creates an index with a name, dimensionality, metric, and ServerlessSpec cloud provider.",
                  },
                  {
                    name: "list_indexes",
                    role: "Verifies an index exists by listing indexes on the client.",
                  },
                  {
                    name: "delete_index",
                    role: "Removes an index and all of its records, so it must be used with caution.",
                  },
                ],
              },
              {
                group: "Vector ingestion",
                items: [
                  {
                    name: "upsert",
                    role: "Inserts new vectors or updates existing ones by ID, taking tuples of id, vector, and metadata.",
                  },
                  {
                    name: "Metadata",
                    role: "Dictionary of extra fields stored with each vector for filtering and later retrieval.",
                  },
                  {
                    name: "Dimensionality check",
                    role: "Verifies every vector length matches the index dimension before ingesting.",
                  },
                  {
                    name: "describe_index_stats",
                    role: "Reports vector count, index fullness, dimensionality, and namespaces.",
                  },
                ],
              },
              {
                group: "Retrieving vectors",
                items: [
                  {
                    name: "fetch",
                    role: "Returns records by ID, normally to explore or verify particular records.",
                  },
                  {
                    name: "query",
                    role: "Sends a vector and returns the top_k most similar vectors with a similarity score.",
                  },
                  {
                    name: "Read units (RUs)",
                    role: "Pinecone measure of resources consumed by fetching, querying, and listing.",
                  },
                  {
                    name: "Distance metric",
                    role: "Cosine, euclidean, or dotproduct similarity function set at index creation and not changeable later.",
                  },
                  {
                    name: "Metadata filtering",
                    role: "Narrows the searched records with filter operators before the LLM step.",
                  },
                ],
              },
              {
                group: "Maintaining vectors",
                items: [
                  {
                    name: "update",
                    role: "Changes vector values, metadata, or both for a given record id.",
                  },
                  {
                    name: "delete",
                    role: "Removes vectors by ID list, by metadata filter, or all records in a namespace.",
                  },
                  {
                    name: "Sequential batching",
                    role: "Splits upserts into chunks sent one by one, avoiding rate and size limits.",
                  },
                  {
                    name: "Parallel batching",
                    role: "Sends many chunks at once using pool_threads and async_req for large speed gains.",
                  },
                ],
              },
              {
                group: "Namespaces and multitenancy",
                items: [
                  {
                    name: "Namespace",
                    role: "Container that partitions an index so queries and other operations are limited to that unit.",
                  },
                  {
                    name: "Multitenancy",
                    role: "Architecture where one index serves multiple tenant datasets in isolated namespaces.",
                  },
                  {
                    name: "Implicit namespace creation",
                    role: "Upserting with a namespace argument creates the namespace if it does not exist.",
                  },
                ],
              },
              {
                group: "AI applications",
                items: [
                  {
                    name: "Semantic search",
                    role: "Embeds documents and a user query, then queries the index for the most similar results.",
                  },
                  {
                    name: "RAG",
                    role: "Retrieval-augmented generation that embeds the query, retrieves documents, and adds them to the model prompt.",
                  },
                  {
                    name: "retrieve",
                    role: "Function that embeds the query, queries the namespace, and returns documents with sources.",
                  },
                  {
                    name: "prompt_with_context_builder",
                    role: "Glues an instruction, retrieved documents, and the user query into one prompt.",
                  },
                  {
                    name: "question_answering",
                    role: "Sends the contextual prompt to OpenAI's ChatCompletions endpoint and returns the answer with sources.",
                  },
                ],
              },
            ],
            notes: [
              "### Indexes and setup\n\nThe index is the foundation every later step depends on. Pinecone is a fully managed vector database: it stores embeddings and serves queries over their semantic meaning.\n- Indexes hold records, each a vector plus metadata.\n- Pod-based indexes use pre-configured hardware pods; serverless indexes scale automatically on a cloud provider and often cost less.\n- The client is initialized with an API key; create_index() sets name, dimension, metric, and ServerlessSpec cloud and region.\n- list_indexes() verifies creation; delete_index() removes the index and every record it contains, so use it with caution.",
              "### Vector ingestion\n\nVectors enter the index through upsert(), which combines update and insert: an existing ID is overwritten, a new ID added. The payload is a list of id, vector, and metadata tuples.\n- Check dimensionality with a list comprehension and all() so every vector length matches the index dimension.\n- Metadata is a dictionary of fields such as date, category, or user attribution, stored under the metadata key for later filtering.\n- describe_index_stats() confirms the upsert, though statistics can take a few moments to refresh.",
              "### Fetching, querying, and filtering\n\nTwo methods read vectors: fetch() returns records by ID, while query() sends a vector and returns the top_k most similar records with a similarity score.\n- Read units measure resources consumed by fetching, querying, and listing; one RU covers a batch of 10 records.\n- The distance metric, cosine by default, plus euclidean and dotproduct, is set in create_index() and cannot be changed later.\n- Metadata filtering passes filter={} to query() with operators to narrow the search space and cut query latency.",
              "### Updates, deletes, batching, and namespaces\n\nData stays current through update() and delete(). update() changes vector values, metadata with set_metadata, or both; delete() removes vectors by ID, by metadata filter, or a namespace with delete_all.\n- Upsert rate and size are limited, so large ingests are split into chunks by a generator using iter() and itertools.islice().\n- Sequential batching sends chunks one by one and is slow; parallel batching uses pool_threads and async_req=True.\n- Namespaces partition an index into smaller units, are created implicitly on upsert, and all index operations can target one.",
              "### Semantic search and RAG\n\nSemantic search embeds documents and the user query with the same model, then queries the index for the closest matches. RAG adds those documents to the model prompt so the answer has extra context.\n- Documents are batched, embedded through the OpenAI API, and upserted with uuid4() IDs and metadata into a namespace.\n- retrieve() embeds the query, queries the namespace, and returns document texts with sources.\n- prompt_with_context_builder() joins an instruction, documents, and query; question_answering() sends it to ChatCompletions and returns the answer with sources.",
              "### In plain terms\n\nThink of Pinecone as a library that sorts books by what they mean rather than by their titles. You turn each document and each question into a vector, file it in an index with upsert, and ask for the closest matches with fetch or query, using metadata to skip whole shelves. RAG is the librarian who pulls the top few books and hands them to the model so it answers from your own material.",
              "### Worth sitting with\n\n- Why is the distance metric locked at index creation, and what does that force you to settle before you have real query data?\n- How does query cost in read units change as records grow in dimensionality and metadata, and what would you trim first?\n- If documents and the user query were embedded with different models, what would break even when the index dimensionality happens to match?",
            ],
          },
          {
            slug: "software-engineering-principles-in-python",
            title: "Software Engineering Principles in Python",
            summary: "Study notes on software engineering fundamentals in Python, covering modularity, documentation, testing, and version control, plus hands-on work with packages, PEP 8 style, classes, inheritance, and testing tools.",
            completed: "Nov 08, 2026",
            hours: 4,
            breakdown: [
              {
                group: "Software Engineering Principles",
                items: [
                  {
                    name: "Modularity",
                    role: "Dividing code into shorter functional units to improve readability, maintainability, and reuse across projects.",
                  },
                  {
                    name: "Documentation",
                    role: "Explaining code through comments, docstrings, and self-documenting code so users and future you can read it.",
                  },
                  {
                    name: "Automated Testing",
                    role: "Running tests automatically to save time over manual testing, find more bugs, and check code anytime.",
                  },
                  {
                    name: "Version Control & Git",
                    role: "A topic listed as a follow-up for managing code versions, not covered in these notes.",
                  },
                ],
              },
              {
                group: "Packages and Style",
                items: [
                  {
                    name: "PyPI",
                    role: "The Python Package Index, a platform for leveraging published packages.",
                  },
                  {
                    name: "pip",
                    role: "The package installer, a recursive acronym for Pip install Packages, used to install packages and dependencies.",
                  },
                  {
                    name: "help()",
                    role: "A built-in function that prints documentation for a package, class, method, or object.",
                  },
                  {
                    name: "PEP 8",
                    role: "The de facto style guide for Python code, focused on readability.",
                  },
                  {
                    name: "pycodestyle",
                    role: "A package that checks code for PEP 8 violations across files and reports their location and error code.",
                  },
                ],
              },
              {
                group: "Package Construction",
                items: [
                  {
                    name: "package structure",
                    role: "A directory plus an __init__.py file, where the directory name becomes the package name.",
                  },
                  {
                    name: "__init__.py",
                    role: "The file that tells Python a directory is a package and can expose key functionality to users.",
                  },
                  {
                    name: "submodules",
                    role: "Additional Python files inside a package, imported with dot notation such as my_package.utils.",
                  },
                  {
                    name: "relative import",
                    role: "A dot notation import such as .utils, required when packaging Python 3 and above.",
                  },
                  {
                    name: "setup.py",
                    role: "A file using setuptools.setup that tells pip how to install the package and supplies metadata for PyPI.",
                  },
                  {
                    name: "requirements.txt",
                    role: "A file listing dependencies and optional version constraints, installed with pip install -r requirements.txt.",
                  },
                ],
              },
              {
                group: "Classes and OOP",
                items: [
                  {
                    name: "class",
                    role: "A blueprint created with the class keyword, documented with a docstring, and initialized with __init__.",
                  },
                  {
                    name: "self",
                    role: "The first argument of instance methods, referring to the instance being created or used.",
                  },
                  {
                    name: "non-public methods",
                    role: "Methods named with a single leading underscore, intended for internal use and carrying less documentation and stability.",
                  },
                  {
                    name: "DRY principle",
                    role: "Don't Repeat Yourself, the rule against copy-pasting code so a bug is fixed once.",
                  },
                  {
                    name: "inheritance",
                    role: "Passing a parent class's methods and attributes to a child class while adding new functionality.",
                  },
                  {
                    name: "super()",
                    role: "A function that calls the parent class's __init__, improving maintainability and helping multiple inheritance.",
                  },
                ],
              },
              {
                group: "Documentation and Readability",
                items: [
                  {
                    name: "comments",
                    role: "Inline notes explaining why code does something, visible only in source code.",
                  },
                  {
                    name: "docstrings",
                    role: "Triple-quoted documentation for functions, classes, and scripts, shown when help() is called.",
                  },
                  {
                    name: "Zen of Python",
                    role: "A list of readability guidelines viewable with import this, including readability counts.",
                  },
                  {
                    name: "self-documenting code",
                    role: "Descriptive naming that makes code describe what it does, such as is_boiling.",
                  },
                  {
                    name: "refactoring",
                    role: "Splitting long functions that do several things into smaller, descriptively named functions.",
                  },
                ],
              },
              {
                group: "Testing and Tooling",
                items: [
                  {
                    name: "doctest",
                    role: "A module that runs docstring examples via doctest.testmod() and reports failures.",
                  },
                  {
                    name: "pytest",
                    role: "A testing framework that finds test files and functions by name and checks them with assert.",
                  },
                  {
                    name: "Sphinx",
                    role: "A tool that transforms docstrings into HTML documentation.",
                  },
                  {
                    name: "Travis CI",
                    role: "A continuous integration service that runs tests automatically on changes and on a schedule.",
                  },
                  {
                    name: "Codecov",
                    role: "A tool that reports test coverage so untested code can be found.",
                  },
                  {
                    name: "Code Climate",
                    role: "A tool that analyzes code readability and flags functions that are too long or confusing.",
                  },
                ],
              },
            ],
            notes: [
              "### Software Engineering Principles\n\nSoftware engineering is code hygiene for data science, and the course is built on four habits that decide whether your exam code reads clean or spaghetti.\n\n- Modularity divides code into shorter functional units, improving readability, maintainability, and reuse; Python uses packages, classes, and methods.\n- Documentation helps collaborators and future you through comments, docstrings, and self-documenting code.\n- Automated testing saves time over manual testing, finds more bugs, and runs anytime.\n- Version Control & Git is recommended as a follow-up topic, not covered in these notes.\n\nThe exam will test this hygiene and organization directly, so these are the four habits to carry into every exercise.",
              "### Using Packages and Reading Documentation\n\nPython's ecosystem pays off the moment you treat packages as finished solutions, not code to rebuild.\n\n- Packages are installed from the Python Package Index, or PyPI, with pip, a recursive acronym for Pip install Packages.\n- pip install numpy installs a package along with its dependencies.\n- pip install -r requirements.txt recreates an environment from a requirements file.\n- help() prints documentation shipped with a package, class, or object, such as help(numpy.busday_count).\n\nWriting that documentation is the developer's job, and future-you is a user who benefits. It saves a lot of wasted time and headaches.",
              "### PEP 8 and Package Construction\n\nPEP 8 is the de facto style guide for Python, and its reason is simple: code is read much more often than it is written.\n\n- Violations: import not at the top, inconsistent spacing, missing line breaks.\n- pycodestyle reports file, line, column, description, and error code, using one-based indexing.\n- A minimal package is a directory plus __init__.py, with a short, all-lowercase name.\n- Submodules like utils.py use dot notation; relative imports such as .utils are required in Python 3.\n- setup.py and requirements.txt make a package portable; pip install . installs it.\n\nWatch the naming rules, because the same conventions govern packages, submodules, and the classes you will write next.",
              "### Classes, Inheritance, and DRY\n\nA class bundles state and behaviour into one reusable blueprint: the class keyword, a CamelCase name, and an __init__ method, with self referring to the instance and passed automatically.\n\n- Non-public methods use a leading underscore and are for internal use, with little documentation and possible breaking changes.\n- The DRY principle, Don't Repeat Yourself, avoids copy-pasting code so a bug is fixed once.\n- Inheritance passes a parent's methods and attributes to a child class.\n- super() calls the parent's __init__ and aids maintainability.\n- Multilevel inheritance extends the family tree; dir() and help() list attributes.\n\nNote that help() shows only public methods, while dir() is exhaustive but not advised inside scripts.",
              "### Documentation, Testing, and Tooling\n\nComments explain why code does something and stay in the source; docstrings use triple quotes and appear when help() is called.\n\n- The Zen of Python and descriptive naming support self-documenting code.\n- Refactoring splits long functions that do several things into smaller, descriptively named functions.\n- doctest runs docstring examples; pytest finds test files and functions by name and checks them with assert.\n- Sphinx turns docstrings into HTML documentation.\n- Travis CI runs tests on changes and on a schedule; Codecov measures test coverage and Code Climate analyzes readability.\n\nTogether these tools turn the same principles into practice, so untested code and unread code both become visible.",
              "### In plain terms\n\nWriting Python well is like running a shared kitchen: every station, label, and recipe has to make sense to the next cook. Packages are the store-bought staples, PEP 8 the agreed layout, docstrings the labels on the jars, and tests the taster who catches a bad batch before it is served.",
              "### Worth sitting with\n\n- Why does copy-pasting code still feel faster than writing a shared function, and what changes the moment a bug surfaces in three places?\n- If a docstring example and a pytest test can both check the same function, which one should carry the edge cases, and why?\n- What does a non-public method owe its users, and how do you decide whether a helper is central enough to expose in __init__.py?",
            ],
          },
          {
            slug: "developing-llm-applications-with-langchain",
            title: "Developing LLM Applications with LangChain",
            summary: "Covers building LLM apps with LangChain: prompting OpenAI and Hugging Face models, prompt templates, few-shot prompting, LCEL chains, ReAct agents with custom tools, and a full RAG workflow using document loaders, splitters, and ChromaDB vector storage.",
            completed: "Nov 07, 2026",
            hours: 3,
            breakdown: [
              {
                group: "Models and Prompting",
                items: [
                  {
                    name: "ChatOpenAI",
                    role: "Calls the OpenAI API to define a model, accepting parameters like temperature and max_completion_tokens.",
                  },
                  {
                    name: "HuggingFacePipeline",
                    role: "Downloads an open-source model locally from a model ID and task, prompted the same way with .invoke().",
                  },
                  {
                    name: "PromptTemplate",
                    role: "Creates reusable prompt recipes from a template string, inserting variables with curly braces.",
                  },
                  {
                    name: "ChatPromptTemplate",
                    role: "Builds prompts with chat message roles such as system, human, and ai using .from_messages.",
                  },
                ],
              },
              {
                group: "Few-Shot Prompting",
                items: [
                  {
                    name: "FewShotPromptTemplate",
                    role: "Converts a list of question-answer dictionaries into a few-shot prompt template for extra model context.",
                  },
                  {
                    name: "example_prompt",
                    role: "A PromptTemplate that formats how each example question and answer is structured.",
                  },
                  {
                    name: "suffix",
                    role: "Formats the user input and specifies which variable that input is assigned to.",
                  },
                  {
                    name: "input_variables",
                    role: "Declares the variables, like the user query, that the few-shot template expects.",
                  },
                ],
              },
              {
                group: "Chains and Agents",
                items: [
                  {
                    name: "LCEL pipe operator",
                    role: "Chains prompts, models, and output parsers into a sequence where data flows from one component to the next.",
                  },
                  {
                    name: "Sequential chains",
                    role: "Feed the output of one chain into another, passing parsed strings through a dictionary of keys.",
                  },
                  {
                    name: "ReAct agents",
                    role: "Reasoning and Acting agents that loop through thinking, acting, and observing to solve problems with tools.",
                  },
                  {
                    name: "create_react_agent",
                    role: "LangGraph function that builds a ReAct agent from an LLM and a list of tools.",
                  },
                  {
                    name: "Custom tools",
                    role: "Python functions converted with the @tool decorator, needing a name, description, and return_direct.",
                  },
                ],
              },
              {
                group: "RAG Workflow",
                items: [
                  {
                    name: "Document loaders",
                    role: "Classes like PyPDFLoader, CSVLoader, and UnstructuredHTMLLoader that load documents into memory with .load().",
                  },
                  {
                    name: "Chunk overlap",
                    role: "Shared text between chunks that helps retain context when splitting long documents.",
                  },
                  {
                    name: "CharacterTextSplitter",
                    role: "Splits on a single separator, but may fail to keep chunks below the specified chunk_size.",
                  },
                  {
                    name: "RecursiveCharacterTextSplitter",
                    role: "Works through a list of separators left to right, combining chunks to stay under chunk_size.",
                  },
                  {
                    name: "ChromaDB",
                    role: "Lightweight vector database used to embed, store, and retrieve document chunks via a retriever.",
                  },
                ],
              },
              {
                group: "Ecosystem and Resources",
                items: [
                  {
                    name: "LangSmith",
                    role: "For troubleshooting and evaluating applications in the LangChain ecosystem.",
                  },
                  {
                    name: "LangServe",
                    role: "For deploying applications to production.",
                  },
                  {
                    name: "LangGraph",
                    role: "Branch of the ecosystem for designing agentic systems and multi-agent knowledge graphs.",
                  },
                  {
                    name: "LangChain Hub",
                    role: "Catalog of prompts for a range of tasks that can be searched, used, and added to.",
                  },
                  {
                    name: "LangChain templates",
                    role: "Ready-to-use code blocks covering common use cases, often needing minor modifications.",
                  },
                ],
              },
            ],
            notes: [
              "### Models and Prompt Templates\n\nLangChain's real trick is that swapping models changes almost nothing. ChatOpenAI calls the OpenAI API with parameters like temperature and max_completion_tokens; HuggingFacePipeline downloads an open-source model locally, and you still prompt it the same way with .invoke(). Prompt templates turn one-off prompts into reusable recipes: PromptTemplate.from_template inserts variables with curly braces, while ChatPromptTemplate.from_messages adds chat roles such as system, human, and ai. The LCEL pipe operator chains a prompt to a model, and .invoke() takes a dictionary. Watch for the trap: pass a dictionary, not raw variables.",
              "### Few-Shot Prompting\n\nPlain PromptTemplate classes handle a single example but do not scale to a dataset, so FewShotPromptTemplate converts a list of question-answer dictionaries into a few-shot prompt template. Build an example set, format it with a PromptTemplate example_prompt, then pass both to FewShotPromptTemplate along with a suffix and input_variables. Invoke the template to inspect the exact context the model will see, then pipe it to an LLM in an LCEL chain and invoke with a dictionary. Few-shot prompting steers behavior without fine-tuning.",
              "### Chains and Agents\n\nSequential chains feed the output of one chain into another, using a dictionary to pass the first chain's parsed string to the second prompt template. Agents go further: they use language models to decide actions and call tools. ReAct agents loop through thinking, acting, and observing, built with create_react_agent and load_tools from LangGraph. Custom tools need a name, description, and return_direct, created by adding the @tool decorator to a Python function. Watch that the LLM rewords the tool output in its final answer, so check the raw result.",
              "### Retrieval Augmented Generation\n\nRAG embeds a user query, retrieves relevant documents, and adds them to the model prompt so the answer has context beyond training data. The workflow has three stages. Load documents with loaders like PyPDFLoader, CSVLoader, and UnstructuredHTMLLoader. Split into chunks, where RecursiveCharacterTextSplitter handles large documents better than CharacterTextSplitter, and chunk overlap keeps context from leaking away at the edges. Encode and store chunks in ChromaDB, then convert it to a retriever with .as_retriever(). Splitting and retrieval quality decide whether RAG works.",
              "### Wrap-Up and Ecosystem\n\nLangChain's core library is only part of the picture. LangSmith handles troubleshooting and evaluating applications, LangServe deploys them to production, and LangGraph designs multi-agent knowledge graphs. Two resources are worth bookmarking: LangChain Hub offers a searchable catalog of prompts for many tasks, and LangChain templates provide ready-to-use code blocks for common use cases, often needing only minor modifications. The takeaway is that models, prompts, chains, and agents combine through LCEL, and RAG is how external data gets in.",
              "### In plain terms\n\nLangChain is the plumbing of an LLM app: prompt templates are the fittings, chains are the pipes, and tools are the taps an agent can turn. You write a prompt once, connect it to any model, and let data flow through a chain until an answer comes out. When the model needs outside knowledge, RAG works like a librarian who pulls the right shelf before the model answers.",
              "### Worth sitting with\n\n- When a ReAct agent loops through thinking, acting, and observing, what decides when it stops, and what happens when a tool returns a plausible but wrong result?\n- If chunk overlap is what keeps meaning across split boundaries, how do you find the right amount before retrieval quality degrades?\n- Since the LLM can reword a tool's output before it reaches the user, what would it take to keep the final answer faithful to the raw data?",
            ],
          },
          {
            slug: "introduction-to-model-context-protocol",
            title: "Introduction to Model Context Protocol (MCP)",
            summary: "MCP is an open standard that connects AI models to external tools and data through a host, client, and server architecture. This cheatsheet covers its primitives, server building, client communication, LLM integration, and production practices.",
            completed: "Nov 08, 2026",
            hours: 3,
            breakdown: [
              {
                group: "Architecture",
                items: [
                  {
                    name: "MCP",
                    role: "Open standard for secure, modular, bi-directional connections between AI models and external data sources or tools.",
                  },
                  {
                    name: "Host",
                    role: "Application the user interacts with directly; it starts the connection and lets the LLM choose external connections.",
                  },
                  {
                    name: "Client",
                    role: "Creates a session with an MCP server and executes requests using the JSON-RPC 2.0 message format.",
                  },
                  {
                    name: "Server",
                    role: "Provides AI-friendly access to external data or functionality, translating API and database calls into the MCP format.",
                  },
                  {
                    name: "Dynamic tool discovery",
                    role: "Lets the LLM see which tools a server offers in real time while completing a request.",
                  },
                ],
              },
              {
                group: "Primitives",
                items: [
                  {
                    name: "Tools",
                    role: "Actions the LLM performs to complete a request, such as querying a database or booking a flight.",
                  },
                  {
                    name: "Resources",
                    role: "Read-only data or context, such as documents, files, database records, or API responses.",
                  },
                  {
                    name: "Prompts",
                    role: "Predefined workflow templates or instruction sets that guide the model and save users from writing long prompts.",
                  },
                  {
                    name: "URI",
                    role: "Uniform resource identifier that points a resource at local files, APIs, or remote servers.",
                  },
                ],
              },
              {
                group: "Building Servers",
                items: [
                  {
                    name: "FastMCP",
                    role: "Class from the official MCP Python SDK used to instantiate a server in one line.",
                  },
                  {
                    name: "@mcp.tool()",
                    role: "Decorator that registers a Python function as a tool discoverable by MCP clients.",
                  },
                  {
                    name: "@mcp.resource(\"uri\")",
                    role: "Decorator that registers a resource function to read data, such as a local file.",
                  },
                  {
                    name: "@mcp.prompt(title=\"\")",
                    role: "Decorator that registers a prompt, with the title as metadata and the function name as the identifier.",
                  },
                  {
                    name: "Docstrings and type hints",
                    role: "Describe each tool so the LLM can intelligently choose and use it; considered an absolute necessity.",
                  },
                ],
              },
              {
                group: "Client Communication",
                items: [
                  {
                    name: "JSON-RPC 2.0",
                    role: "Standardized message format for every request, response, and function call between client and server.",
                  },
                  {
                    name: "stdio",
                    role: "Transport where the client launches the server as a subprocess and exchanges messages over stdin and stdout.",
                  },
                  {
                    name: "Streamable HTTP",
                    role: "Transport for remote servers, delivering JSON-RPC over HTTP and receiving it via Server-Sent Events.",
                  },
                  {
                    name: "list_tools / list_resources / list_prompts",
                    role: "Session methods that discover the primitives a server exposes.",
                  },
                  {
                    name: "call_tool / read_resource / get_prompt",
                    role: "Session methods that invoke a tool, read a resource, or retrieve a prompt.",
                  },
                  {
                    name: "async with / await",
                    role: "Pattern that manages connections, pauses for server responses, and allows concurrent operations.",
                  },
                ],
              },
              {
                group: "LLM Integration",
                items: [
                  {
                    name: "Tool-calling workflow",
                    role: "Five-step process from sending definitions and a query to returning a final informed response.",
                  },
                  {
                    name: "stop_reason",
                    role: "Response attribute checked for tool_use to detect that the model wants to call a tool.",
                  },
                  {
                    name: "read_resource",
                    role: "Client helper that fetches read-only context by URI for injection into the request.",
                  },
                  {
                    name: "get_prompt",
                    role: "Client helper that retrieves a prompt template and injects the user's input into its arguments.",
                  },
                  {
                    name: "Anthropic Messages API",
                    role: "Provider API used to wire MCP tools to Claude with tool-calling in mind.",
                  },
                ],
              },
              {
                group: "Production",
                items: [
                  {
                    name: "Database integration",
                    role: "Connect to databases for query power, scale, concurrency, and production-ready backups and replication.",
                  },
                  {
                    name: "Connection lifecycle",
                    role: "Create a connection once at startup or first use, reuse it in handlers, and close it on shutdown.",
                  },
                  {
                    name: "Parameterized queries",
                    role: "Use placeholders instead of concatenating user or LLM input into SQL to prevent prompt injection.",
                  },
                  {
                    name: "Timeout and error handling",
                    role: "Pass a timeout to requests and check raise_for_status() so tool calls fail clearly instead of hanging.",
                  },
                  {
                    name: "API authentication",
                    role: "Keep API keys server-side in environment variables and attach them as Bearer tokens; never expose them to the client.",
                  },
                  {
                    name: "Third-party MCP servers",
                    role: "Prebuilt servers for speed and maintained integration, weighed against trust, security, and surface area.",
                  },
                ],
              },
            ],
            notes: [
              "### MCP Architecture\n\nMCP exists because LLMs cannot reach live data, and bespoke code for every tool and API quickly turns complex. The fix is an open standard for secure, modular, bi-directional connections, often described as the USB-C port for AI applications. It adds dynamic tool discovery, so the LLM sees which tools a server offers in real time while completing a request.\n\n- Host: the application the user interacts with directly; this is where the server connection begins.\n- Client: opens a session with a server and executes requests using JSON-RPC 2.0.\n- Server: exposes external data or functionality in the consistent MCP format.\n\nWatch for how the split gives models controlled access to external context.",
              "### MCP Primitives\n\nServers expose functionality as primitives. Resources differ from tools in that the LLM does not necessarily call them.\n\n- Tools: actions the LLM performs to complete a request, such as querying a database or booking a flight.\n- Resources: read-only data or context, such as documents, files, database records, or API responses.\n- Prompts: predefined workflow templates or instruction sets that guide the model for specific tasks.\n- URI: the identifier used to point resources at local files, APIs, or remote servers.\n\nKnowing which primitive fits a job decides whether the model acts or just reads.",
              "### Servers, Clients, and Transports\n\nAny Python function can become a tool. Register functions with decorators on a FastMCP server, then connect a client that sends JSON-RPC 2.0 requests.\n\n- Decorators: @mcp.tool(), @mcp.resource(\"uri\"), and @mcp.prompt(title=\"\") register primitives.\n- Docstrings and type hints: let the LLM choose and use each tool correctly.\n- stdio: the client launches the server as a subprocess and talks over stdin/stdout.\n- Streamable HTTP: delivers JSON-RPC to remote servers over HTTP via Server-Sent Events.\n- Client methods: list_tools, list_resources, list_prompts; call_tool, read_resource, get_prompt.\n\nThe docstring quality determines whether the LLM picks the right tool.",
              "### LLM Integration\n\nTools are wired to an LLM through a five-step tool-calling workflow; resources and prompts are fetched by the client and injected into the request.\n\n- Tool calling: send tool definitions and the query, check stop_reason for tool_use, call the tool, then send the result back as a follow-up message.\n- Context: read_resource fetches read-only context and get_prompt injects user input into a template, both passed to the model.\n- Provider note: integration is LLM-dependent; this uses Claude through Anthropic's Messages API.\n\nThe same process looks different on every provider, so read your model's docs rather than memorizing code.",
              "### Production and Databases\n\nProduction servers harden API integrations and add database access with safe habits.\n\n- API safety: set a timeout, call raise_for_status(), and keep keys server-side in environment variables as Bearer tokens.\n- Databases: connect once at startup, reuse the connection, use parameterized queries, and close it on shutdown.\n- Data access: resources fit read-only, infrequently changing reference data; tools fit dynamic, user-input-driven or write operations.\n- Third-party servers: weigh trust, security, and surface area before plugging one in.\n\nShortcut any of these and the LLM gains a way to misuse the power you just handed it.",
              "### In plain terms\n\nMCP is the USB-C port for AI applications. One standard port lets a model plug into databases, files, and APIs instead of a bespoke, insecure adapter for every tool. A host starts the connection, a client runs the session in JSON-RPC 2.0, and a server translates the messy outside world into that one consistent format.",
              "### Worth sitting with\n\n- If MCP is a single standard port, what stops a server from exposing a dangerous tool, and who decides what the LLM is allowed to see?\n- Why does dynamic tool discovery matter more than a fixed list of tools, and what could go wrong when the tool set changes mid-request?\n- If docstrings and type hints decide whether the right tool gets called, where does prompt engineering end and tool design begin?",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "ibm-ai-native-data-engineering",
    order: "Now",
    title: "AI-Native Data Engineering Professional Certificate",
    issuer: "IBM · Coursera",
    credentialType: "Professional Certificate · 7 courses",
    commitment: "4 months at 10 hrs/week · intermediate",
    summary:
      "The data platform layer nothing else in the plan covers: governed ingestion and lakehouse storage, embedding and vector retrieval, unstructured corpora, reproducible training data, and the CI/CD, observability and governance that make them production systems rather than pipelines. Ends in a capstone that builds and operates an end-to-end AI-native data platform.",
    outcomes: [
      "Design AI-native data platforms for analytics, ML, semantic search and RAG workloads",
      "Build vector retrieval systems, embedding pipelines and governed lakehouse architectures",
      "Create reproducible ML-ready datasets and engineer unstructured data for AI use cases",
      "Apply CI/CD, observability, governance and security practices to production AI data systems",
    ],
    url: "https://www.coursera.org/professional-certificates/ibm-ai-native-data-engineering",
    courses: [
      {
        slug: "foundations-of-ai-native-data-engineering",
        title: "Foundations of AI Native Data Engineering",
        summary: "How AI-native data engineering differs from traditional pipeline design, and how LLMs, embeddings, vector databases and RAG look from the data side.",
        hours: 20,
        modules: [
          {
            slug: "welcome-to-the-course",
            title: "Welcome to the Course",
            hours: 1,
            summary: "How the course is structured, what it expects, and how the final project arc and the responsible use of AI assistants fit together.",
          },
          {
            slug: "introduction-to-ai-native-data-engineering",
            title: "Introduction to AI-Native Data Engineering",
            hours: 3,
            summary: "How AI workloads differ from BI workloads, and why traditional pipelines need redesign for semantic search, RAG, embeddings and agentic consumers.",
          },
          {
            slug: "ai-fundamentals-and-stack-components-for-data-engineers",
            title: "AI Fundamentals and Stack Components for Data Engineers",
            hours: 3,
            summary: "The AI stack from a data engineering seat: AI, machine learning, deep learning, generative AI and LLMs, and the components around them.",
          },
          {
            slug: "the-ai-data-lifecycle-and-the-role-of-ai-data-engineers",
            title: "The AI Data Lifecycle and the Role of AI Data Engineers",
            hours: 3,
            summary: "The AI data lifecycle from ingestion through features, embeddings, retrieval, inference, evaluation and monitoring, and where ownership sits.",
          },
          {
            slug: "llms-for-data-engineers-prompting-hosting-fine-tuning-and-scale",
            title: "LLMs for Data Engineers: Prompting, Hosting, Fine-Tuning, and Scale",
            hours: 3,
            summary: "How prompting, context, hosting, cost, latency, scaling and fine-tuning shape the data decisions around a language model.",
          },
          {
            slug: "rag-pipelines-design-implementation-failure-diagnosis-and-fine-tuning-tradeoffs",
            title: "RAG Pipelines: Design, Implementation, Failure Diagnosis, and Fine-Tuning Tradeoffs",
            hours: 3,
            summary: "How a RAG pipeline is designed and supported, the ways it fails, and when tuning the data beats tuning the model.",
          },
          {
            slug: "build-a-semantic-search-engine-with-ai-native-data-architecture",
            title: "Build a Semantic Search Engine with AI-Native Data Architecture",
            hours: 2,
            summary: "A course project: design or build a semantic search workflow over a prepared corpus.",
          },
          {
            slug: "course-summary",
            title: "Course Summary",
            hours: 1,
            summary: "Connects what was built to portfolio-ready evidence and the next course in the certificate.",
          },
          {
            slug: "final-exam",
            title: "Final Exam",
            hours: 1,
            summary: "Assesses the core concepts across retrieval, embeddings, RAG, LLM integration, governance and semantic search operations.",
          },
        ],
      },
      {
        slug: "ai-systems-automation-cicd-and-data-engineering-workflows",
        title: "AI Systems, Automation, CI/CD and Data Engineering Workflows",
        summary: "The infrastructure, Git and CI/CD practice, and the policy and validation gates that keep AI data work reviewable.",
        hours: 19,
        modules: [
          {
            slug: "welcome-to-the-course",
            title: "Welcome to the Course",
            hours: 1,
            summary: "Orientation to Course 2: its purpose, expected outcomes, and how the modules build toward a governed CI/CD workflow.",
          },
          {
            slug: "ai-infrastructure-for-data-engineers",
            title: "AI Infrastructure for Data Engineers",
            hours: 3,
            summary: "Compute, serving, vector databases and storage: the infrastructure a data engineer has to reason about in AI-native systems.",
          },
          {
            slug: "git-repository-structure-and-ci-cd-foundations",
            title: "Git, Repository Structure, and CI/CD Foundations",
            hours: 3,
            summary: "Repository layout and branching for AI data work, and the CI/CD basics that keep changes reviewable.",
          },
          {
            slug: "ai-assisted-sql-code-and-test-generation",
            title: "AI-Assisted SQL, Code, and Test Generation",
            hours: 3,
            summary: "Using AI to draft SQL, code and tests, then reviewing and validating what it produced rather than accepting it.",
          },
          {
            slug: "ai-augmented-pipeline-and-workflow-automation",
            title: "AI-Augmented Pipeline and Workflow Automation",
            hours: 3,
            summary: "DAG and orchestration design, dependency mapping, scheduling, and the documentation that makes a pipeline operable.",
          },
          {
            slug: "metadata-documentation-and-data-product-artifacts",
            title: "Metadata, Documentation, and Data Product Artifacts",
            hours: 3,
            summary: "The metadata and documentation that make a data product understandable, reusable and governable.",
          },
          {
            slug: "ci-cd-gates-policy-checks-and-course-project",
            title: "CI/CD Gates, Policy Checks, and Course Project",
            hours: 2,
            summary: "Policy and validation gates that validate, document and approve changes before they land.",
          },
          {
            slug: "course-summary",
            title: "Course Summary",
            hours: 1,
            summary: "Reflects on Course 2 and connects it to the next step in the certificate.",
          },
          {
            slug: "final-exam",
            title: "Final Exam",
            hours: 1,
            summary: "Assesses the engineering principles across AI systems, automation, CI/CD and data workflows.",
          },
        ],
      },
      {
        slug: "vector-databases-and-retrieval-data-engineering",
        title: "Vector Databases and Retrieval Data Engineering",
        summary: "Embeddings, vector schemas, index strategy, refresh and consistency, retrieval evaluation, and the governance around all of it.",
        hours: 22,
        modules: [
          {
            slug: "module-purpose",
            title: "Module Purpose",
            hours: 1,
            summary: "Orientation to Course 3 and its place in the certificate.",
          },
          {
            slug: "embeddings-and-vector-retrieval-foundations",
            title: "Embeddings and Vector Retrieval Foundations",
            hours: 3,
            summary: "What embeddings are, how vector retrieval differs from keyword search, and why the difference matters to a data engineer.",
          },
          {
            slug: "vector-database-design-and-storage-patterns",
            title: "Vector Database Design and Storage Patterns",
            hours: 3,
            summary: "Storage patterns that join embeddings to metadata, filters, source links and the system of record.",
          },
          {
            slug: "index-design-and-scaling",
            title: "Index Design and Scaling",
            hours: 3,
            summary: "Exact versus approximate retrieval, ANN structures, compression, and the trade-offs that decide an index.",
          },
          {
            slug: "refresh-updates-deletes-and-consistency",
            title: "Refresh, Updates, Deletes, and Consistency",
            hours: 3,
            summary: "Keeping a vector index accurate as source data changes: refresh, update, delete, rollback and validation.",
          },
          {
            slug: "retrieval-evaluation-and-observability",
            title: "Retrieval Evaluation and Observability",
            hours: 3,
            summary: "Golden query sets, relevance labels and retrieval metrics, carried into production observability for latency, throughput and drift.",
          },
          {
            slug: "security-governance-and-course-project",
            title: "Security, Governance, and Course Project",
            hours: 2,
            summary: "Access control, tenancy and governance for retrieval systems, plus the course project package.",
          },
          {
            slug: "course-summary",
            title: "Course Summary",
            hours: 1,
            summary: "Reflects on retrieval as an engineered, governable subsystem.",
          },
          {
            slug: "final-exam",
            title: "Final Exam",
            hours: 2,
            summary: "Assesses vector database and retrieval engineering across realistic production scenarios.",
          },
        ],
      },
      {
        slug: "lakehouse-architecture-for-ai-native-data-platforms",
        title: "Lakehouse Architecture for AI-Native Data Platforms",
        summary: "SLOs, open table formats, schema evolution, ingestion patterns, and the operations and governance of a lakehouse.",
        hours: 24,
        modules: [
          {
            slug: "welcome-to-the-course",
            title: "Welcome to the Course",
            hours: 1,
            summary: "Orientation to Course 4: purpose, outcomes and expectations.",
          },
          {
            slug: "requirements-data-product-slos-and-architecture-tradeoffs",
            title: "Requirements, Data Product SLOs, and Architecture Tradeoffs",
            hours: 4,
            summary: "Turning AI workload needs into measurable SLOs, and using those to choose between lakehouse, warehouse and data lake.",
          },
          {
            slug: "table-formats-time-travel-and-platform-tradeoffs",
            title: "Table Formats, Time Travel, and Platform Tradeoffs",
            hours: 4,
            summary: "Delta Lake, Apache Iceberg and Apache Hudi compared on reliability, reproducibility and governance.",
          },
          {
            slug: "schema-evolution-retention-and-deletion-workflows",
            title: "Schema Evolution, Retention, and Deletion Workflows",
            hours: 4,
            summary: "Schema evolution, retention, lifecycle states and deletion in a governed lakehouse.",
          },
          {
            slug: "ingestion-architecture-batch-cdc-streaming-and-replay",
            title: "Ingestion Architecture: Batch, CDC, Streaming, and Replay",
            hours: 4,
            summary: "Choosing among batch, CDC, streaming and event-driven ingestion on freshness, latency, cost and AI workload needs.",
          },
          {
            slug: "provisioning-orchestration-observability-and-cost-slos",
            title: "Provisioning, Orchestration, Observability, and Cost SLOs",
            hours: 4,
            summary: "Compute provisioning, orchestration, observability, alerting, cost SLOs and incident response.",
          },
          {
            slug: "governance-security-ci-gates-and-course-project",
            title: "Governance, Security, CI Gates, and Course Project",
            hours: 2,
            summary: "Governance, security, auditability and CI controls, closing in the governed lakehouse architecture.",
          },
          {
            slug: "course-summary",
            title: "Course Summary",
            hours: 1,
            summary: "Reflects on the architectural themes and previews Course 5.",
          },
          {
            slug: "final-exam",
            title: "Final Exam",
            hours: 2,
            summary: "Assesses lakehouse architecture decisions in realistic contexts.",
          },
        ],
      },
      {
        slug: "unstructured-data-engineering-for-ai",
        title: "Unstructured Data Engineering for AI",
        summary: "Ingestion and object storage, extraction and OCR, cleaning and PII safety, chunking and metadata, annotation, and quality gates.",
        hours: 24,
        modules: [
          {
            slug: "welcome-to-the-course",
            title: "Welcome to the Course",
            hours: 1,
            summary: "Orientation to Course 5 and why unstructured data engineering matters for AI-native work.",
          },
          {
            slug: "unstructured-ingestion-and-object-storage-architecture",
            title: "Unstructured Ingestion and Object Storage Architecture",
            hours: 4,
            summary: "Storage zones, naming conventions, manifests and file quality controls for unstructured corpora.",
          },
          {
            slug: "content-extraction-documents-html-ocr-and-structure",
            title: "Content Extraction: Documents, HTML, OCR, and Structure",
            hours: 5,
            summary: "Extracting text from PDFs, Word, HTML, Markdown and scans, preserving structure and deciding when OCR is needed.",
          },
          {
            slug: "text-cleaning-normalization-and-sensitive-data-handling",
            title: "Text Cleaning, Normalization, and Sensitive Data Handling",
            hours: 4,
            summary: "Cleaning and normalizing extracted text, and handling sensitive content safely.",
          },
          {
            slug: "chunking-and-metadata-enrichment",
            title: "Chunking and Metadata Enrichment",
            hours: 4,
            summary: "Turning cleaned content into AI-ready chunks with the metadata needed for filtering, citation and audit.",
          },
          {
            slug: "annotation-labeling-and-corpus-governance",
            title: "Annotation, Labeling, and Corpus Governance",
            hours: 3,
            summary: "Taxonomy, human review, agreement checks, AI-assisted labeling boundaries and versioning.",
          },
          {
            slug: "safety-gates-quality-gates-and-course-project",
            title: "Safety Gates, Quality Gates, and Course Project",
            hours: 2,
            summary: "The gates that decide whether a corpus is fit for AI use, and the course project package.",
          },
          {
            slug: "course-summary",
            title: "Course Summary",
            hours: 1,
            summary: "Reflects on governed unstructured data engineering.",
          },
          {
            slug: "final-exam",
            title: "Final Exam",
            hours: 2,
            summary: "Assesses the full workflow from ingestion and extraction to governed release.",
          },
        ],
      },
      {
        slug: "reproducible-training-data-and-ml-ready-data-pipelines",
        title: "Reproducible Training Data and ML-Ready Data Pipelines",
        summary: "Training data as a governed product: versioning, leakage and contamination, features and labels, and CI validation before release.",
        hours: 22,
        modules: [
          {
            slug: "welcome-to-the-course",
            title: "Welcome to the Course",
            summary: "Orientation to Course 6 and why reproducible, governed training data matters for trustworthy AI work.",
          },
          {
            slug: "training-data-as-a-product",
            title: "Training Data as a Product",
            hours: 4,
            summary: "Ownership, contracts, service expectations, documentation and release readiness for training data.",
          },
          {
            slug: "versioning-and-reproducibility",
            title: "Versioning and Reproducibility",
            hours: 3,
            summary: "Versioning, snapshots, hashing, deterministic builds, lineage and reconstruction evidence.",
          },
          {
            slug: "leakage-and-contamination-controls",
            title: "Leakage and Contamination Controls",
            hours: 4,
            summary: "Detecting leakage and contamination that invalidate evaluation, and controlling them.",
          },
          {
            slug: "feature-engineering-pipelines",
            title: "Feature Engineering Pipelines",
            hours: 4,
            summary: "Feature pipelines with reproducibility, freshness, quality, lineage and training/inference consistency.",
          },
          {
            slug: "label-pipelines-and-ground-truth-management",
            title: "Label Pipelines and Ground Truth Management",
            hours: 4,
            summary: "Source selection, taxonomy, review policy, quality checks, drift monitoring and versioning for labels.",
          },
          {
            slug: "ci-validation-for-ai-grade-data-quality",
            title: "CI Validation for AI-Grade Data Quality",
            hours: 2,
            summary: "CI-style validation gates that verify training data quality before release.",
          },
          {
            slug: "final-exam",
            title: "Final Exam",
            hours: 2,
            summary: "Assesses the release-oriented approach to reproducible training data.",
          },
          {
            slug: "course-summary",
            title: "Course Summary",
            summary: "Reflects on the course and the certificate's remaining capstone.",
          },
        ],
      },
      {
        slug: "capstone-build-and-operate-an-ai-native-data-platform",
        title: "Capstone: Build and Operate an AI-Native Data Platform",
        summary: "An end-to-end platform built, validated, documented and operated, ending in a portfolio-ready architecture story.",
        hours: 25,
        modules: [
          {
            slug: "welcome-to-the-course",
            title: "Welcome to the Course",
            summary: "Orientation to Course 7 as the capstone of the certificate.",
          },
          {
            slug: "capstone-use-case-requirements-and-success-criteria",
            title: "Capstone Use Case, Requirements, and Success Criteria",
            hours: 4,
            summary: "Framing a realistic capstone use case and the criteria that will judge it.",
          },
          {
            slug: "source-assessment-architecture-and-data-product-design",
            title: "Source Assessment, Architecture, and Data Product Design",
            hours: 4,
            summary: "Assessing sources, defining a curated data product and choosing an AI-native component path.",
          },
          {
            slug: "ingestion-storage-and-core-pipeline-implementation",
            title: "Ingestion, Storage, and Core Pipeline Implementation",
            hours: 5,
            summary: "Building the core platform: repeatable ingestion, source-aligned storage, curated transformations and orchestration.",
          },
          {
            slug: "ai-native-component-and-serving-interface",
            title: "AI-Native Component and Serving Interface",
            hours: 5,
            summary: "Selecting and implementing one well-scoped component: retrieval, RAG, a governed corpus, a feature pipeline or a dataset release.",
          },
          {
            slug: "quality-evaluation-governance-and-ci-cd",
            title: "Quality, Evaluation, Governance, and CI/CD",
            hours: 5,
            summary: "Quality checks, evaluation, governance and CI/CD for operational handoff.",
          },
          {
            slug: "operations-monitoring-incident-response-and-portfolio-presentation",
            title: "Operations, Monitoring, Incident Response, and Portfolio Presentation",
            hours: 2,
            summary: "Monitoring, incident response, runbooks and the portfolio story.",
          },
          {
            slug: "final-exam",
            title: "Final Exam",
            hours: 2,
            summary: "Assesses the full capstone workflow for designing and operating an AI-native data platform.",
          },
          {
            slug: "course-summary",
            title: "Course Summary",
            summary: "Closes the capstone and the certificate.",
          },
        ],
      },
    ],
  },
  {
    id: "microsoft-ai-ml-engineering",
    order: "Next",
    title: "Microsoft AI & ML Engineering Professional Certificate",
    issuer: "Microsoft · Coursera",
    credentialType: "Professional Certificate · 5 courses",
    commitment: "~6 months at 7 hrs/week",
    /**
     * Where the builder is, right now, inside the syllabus.
     */
    moduleProgress: "Course 1 · Module 2 · ATM",
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
        slug: "foundations-of-ai-and-machine-learning",
        title: "Foundations of AI and Machine Learning",
        hours: 36,
        summary:
          "The environment end to end: what an AI/ML environment is, the data and model lifecycle that runs through it, data sources and pipelines, framework and deployment platform selection, and the monitoring that closes the loop.",
        modules: [
          {
            slug: "introduction-to-ai-ml-environments",
            title: "Module 1: Introduction to AI/ML Environments",
            summary:
              "The environment end to end: ingestion, the lakehouse layers, the model frameworks, deployment, and the monitoring that closes the loop.",
            completed: "Module 1 of 5",
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
          {
            slug: "data-management-in-ai-ml",
            title: "Data management in AI/ML",
            hours: 7,
            summary: "How data is acquired, cleaned, preprocessed, stored and governed, and kept secure across the AI lifecycle, for both traditional ML pipelines and RAG in LLMs.",
            completed: "Module 2 of 5",
            breakdown: [
              {
                group: "Data sources",
                items: [
                  {
                    name: "Relational databases",
                    role: "SQL Server, MySQL and PostgreSQL: structured, queryable stores where integrity and consistency matter, such as finance or healthcare records.",
                  },
                  {
                    name: "Web scraping",
                    role: "Extracting unstructured data from sites with automated scripts, which brings cleaning work and terms-of-service and privacy exposure.",
                  },
                  {
                    name: "APIs",
                    role: "Programmatic access to live third-party data, usually returned as JSON or XML and documented by the provider.",
                  },
                  {
                    name: "External datasets",
                    role: "Public, government, research and marketplace data used to supplement your own or to add context.",
                  },
                  {
                    name: "Direct collection",
                    role: "Sensors, cameras, user input and internal systems you own, gathered at the source.",
                  },
                  {
                    name: "Third-party providers",
                    role: "Licensed data bought rather than gathered, when coverage matters more than cost.",
                  },
                ],
              },
              {
                group: "Querying and tooling",
                items: [
                  {
                    name: "SQL",
                    role: "SELECT, WHERE, JOIN, GROUP BY and ORDER BY to filter, aggregate and join across tables, plus INSERT, UPDATE and DELETE to write back.",
                  },
                  {
                    name: "Subqueries and indexing",
                    role: "Nested queries for a shaped extract, and indexes so those queries stay fast as the tables grow.",
                  },
                  {
                    name: "Transactions and ACID",
                    role: "The guarantee that a set of writes lands consistently or not at all.",
                  },
                  {
                    name: "requests and BeautifulSoup",
                    role: "Fetch a page, parse the HTML, and pull the tables and fields you actually need.",
                  },
                  {
                    name: "pandas",
                    role: "Hold what you extracted as a DataFrame, reshape it, and write it out to CSV.",
                  },
                ],
              },
              {
                group: "Cleaning and preprocessing",
                items: [
                  {
                    name: "Handle missing values",
                    role: "Drop them or fill them, with the mean for numeric columns and an explicit decision for categoricals.",
                  },
                  {
                    name: "Remove outliers",
                    role: "Z-score the numeric columns and drop rows past three sigma.",
                  },
                  {
                    name: "Scale numeric features",
                    role: "StandardScaler puts every numeric feature on the same scale so none dominates on magnitude alone.",
                  },
                  {
                    name: "Encode categorical variables",
                    role: "One-hot encoding through get_dummies turns categories into model-ready columns.",
                  },
                  {
                    name: "Save and verify",
                    role: "Write the preprocessed file, then confirm nulls are gone, outliers removed, numerics scaled and categoricals encoded.",
                  },
                ],
              },
              {
                group: "Data sources for RAG versus traditional ML",
                items: [
                  {
                    name: "Static datasets",
                    role: "Fixed at training time, consistent across runs, cheap to manage and reproduce, but limited to what was collected.",
                  },
                  {
                    name: "Live retrieval",
                    role: "Pulled at query time, contextually relevant and current, but variable between calls and more complex to operate.",
                  },
                  {
                    name: "Governance, quality, scalability, freshness",
                    role: "The four properties to trade off when choosing between them, with collaboration and security alongside.",
                  },
                ],
              },
              {
                group: "Error identification in data collection",
                items: [
                  {
                    name: "Sampling, measurement, entry, response bias, non-response, systematic",
                    role: "The six ways collected data drifts away from the thing it was meant to measure.",
                  },
                  {
                    name: "Detection",
                    role: "Descriptive statistics, visualization, data auditing, consistency checks and control groups.",
                  },
                  {
                    name: "Mitigation",
                    role: "Standardize the procedure, train the collectors, automate collection, detect in real time and review the method regularly.",
                  },
                ],
              },
              {
                group: "Data security across the lifecycle",
                items: [
                  {
                    name: "Encryption at rest and in transit",
                    role: "AES-256 for stored data and TLS for data moving between systems.",
                  },
                  {
                    name: "Access control",
                    role: "Role-based permissions on the principle of least privilege, with access logged.",
                  },
                  {
                    name: "Anonymization and masking",
                    role: "Pseudonymization, masking and differential privacy applied before training on PII.",
                  },
                  {
                    name: "Audits and continuous monitoring",
                    role: "Access logs and anomaly detection, reviewed on a schedule.",
                  },
                  {
                    name: "Secure sharing, backup and recovery",
                    role: "Encrypted channels and access agreements for third parties; backups and a recovery plan for availability.",
                  },
                  {
                    name: "Compliance and transparency",
                    role: "GDPR and CCPA alignment, and being able to explain how data is handled.",
                  },
                ],
              },
              {
                group: "Auditing ML code for vulnerabilities",
                items: [
                  {
                    name: "No data validation or sanitization",
                    role: "Values reach the pipeline unchecked, so malformed or malicious rows train the model.",
                  },
                  {
                    name: "No input validation",
                    role: "Untrusted input flows straight into processing.",
                  },
                  {
                    name: "Fixed random state",
                    role: "A hardcoded seed that trades reproducibility away without saying so.",
                  },
                  {
                    name: "Unencrypted model saving",
                    role: "Artifacts written to disk where anyone on the host can read them.",
                  },
                  {
                    name: "No integrity check on load",
                    role: "A loaded model is never verified, so a swapped file is used as-is.",
                  },
                ],
              },
            ],
            notes: [
              "### What data management covers\n\nData management is collecting, storing, organizing and maintaining data so that its quality, accessibility and security hold across its whole lifecycle. The module's premise is that model performance is capped by data quality, and that poor management produces inaccurate models, biased predictions and failed projects.\n\nFour components carry it:\n\n- **Data collection**: gathering from databases, sensors, APIs or web scraping, with the goal of data that actually represents the problem.\n- **Data storage**: databases or data lakes depending on size and complexity, scaled for analysis and secured by encryption.\n- **Data preprocessing**: cleaning, transforming and preparing raw data for analysis and training.\n- **Data governance**: the policies and procedures behind quality, security and ethical use, covering ownership, access control, compliance and audit trails.\n\nThe module's examples: Tesla gathers from vehicle sensors and cameras for autonomous driving, Amazon stores structured and unstructured behaviour data in data lakes for recommendations and logistics, and JPMorgan Chase cleans and normalizes transaction data before feeding fraud detection.",
              "### Libraries and tools used in this module\n\nThe module is written in **Python 3.x** and runs in a standard virtual environment. These are the packages it touches, and what each one contributes:\n\n- **Python 3.x.** The language every step runs in.\n- **pip.** Python's package installer. The module installs everything with `pip install pandas numpy scikit-learn missingno`.\n- **VS Code, PyCharm, Sublime Text.** The code editors the activity opens the scripts in. Any editor works; the module only assumes somewhere to type and run the code.\n- **pandas.** The data-frame library that carries the module. Every stage loads a dataset into a DataFrame and leaves with one; it is the common shape of the whole text.\n- **NumPy.** The numerical engine underneath pandas, supplying the `np.log`, `np.where` and `np.abs` calls and the array maths behind the statistics.\n- **Scikit-learn.** Preprocessing and modelling. `StandardScaler`, `MinMaxScaler` and `get_dummies` serve the cleaning steps, `train_test_split` and `LogisticRegression` serve the audit activity.\n- **Missingno (optional).** Visualises where the gaps are with `msno.matrix` and `msno.heatmap`. Optional, because it shows the gaps; the fixes themselves use pandas.\n- **matplotlib.pyplot.** Draws the box plots used to spot outliers by eye in the error-identification walkthrough.\n- **scipy.stats.** Supplies `zscore` and `boxcox`, the two statistical functions behind the outlier and transformation steps.\n- **requests.** Fetches the pages the scraper visits, one HTTP GET per page.\n- **bs4.BeautifulSoup.** Parses the HTML those pages return, finding the table and reading the stripped cell text.\n- **os.** Produces the secure random state with `os.urandom(16)`, the fix for a fixed `random_state` in the audit activity.\n- **pickle.** Serialises and deserialises the scikit-learn model, so the audit activity saves the artefact and loads it again on the other side of disk.\n- **hashlib.** Counts the SHA-256 digest of the loaded model, so the audit activity can tell whether the file changed since it was saved.\n- **cryptography.fernet.** Encrypts the saved model behind a generated key, the fix for unencrypted model saving.\n\nWhere each appears:\n\n- **Scraper:** requests, `bs4.BeautifulSoup`, pandas, matplotlib.pyplot.\n- **Cleaning and preprocessing:** pandas, NumPy, Scikit-learn, scipy.stats, matplotlib.pyplot, Missingno.\n- **Reusable tool:** pandas, NumPy, Scikit-learn, scipy.stats, Missingno.\n- **RAG:** none. The section is conceptual and names no packages.\n- **Errors in data collection:** pandas, matplotlib.pyplot, scipy.stats.\n- **Data security:** conceptual, plus `cryptography.fernet`, `hashlib`, `pickle` and `os` in the audit activity.\n- **Auditing ML code:** `os`, pandas, Scikit-learn, `pickle`, `hashlib`, `cryptography.fernet`",

              "### Data sources\n\n- **Databases** are relational stores such as SQL Server, MySQL and PostgreSQL, organized into tables and easy to query, update and manage. That structure makes them ideal where integrity and consistency are critical, such as finance or healthcare, and a customer recommendation system would pull purchase history from one.\n- **Web scraping** extracts data from websites, usually by automated scripts, and suits large volumes of unstructured data such as product reviews, social posts or news. The costs are significant cleaning and terms-of-service and privacy exposure.\n- **APIs** give programmatic access to other applications, often real-time weather, social or market data, and usually return JSON or XML so the data integrates directly. They come with documentation, which makes them reliable.\n- **External datasets** come from government portals, research institutions and data marketplaces, often already curated and cleaned, which saves preparation time. They still need quality and relevance assessed before use.\n\nThe choice of source shapes the downstream processing and ultimately the model.",
              "### Methods for acquiring data\n\nFive methods, each with an ideal case:\n\n- **Direct data collection** gathers firsthand from your own systems or devices, and is the most controlled because you decide what to collect, how and how often. Sensors in an IoT setup, website interaction logging, customer surveys. Ideal when you need specific data closely aligned to the project.\n- **Third-party data sources** are providers who specialize in collecting and curating, from data brokers to firms covering market trends or weather. Valuable, but the quality, accuracy and licensing terms need checking.\n- **Web scraping** uses automated tools for large volumes of unstructured data such as reviews, social posts or competitor pricing, with legal and cleaning overhead attached.\n- **APIs** pull real-time or frequently updated information directly into your system, in a structured format, which makes them efficient for dynamic needs.\n- **Publicly available datasets** are freely accessible, from governments, academic institutions or organizations promoting research. Useful for supplementing your own data or when budget rules out other routes.",
              "### SQL for data acquisition\n\nSQL is the standardized language for communicating with relational databases, and the reading covers its components and then the advanced ones.\n\nKey components:\n\n- **SELECT** queries and retrieves specific columns against defined criteria.\n- **WHERE** filters records by condition, narrowing what a query returns.\n- **JOIN** combines rows from two or more tables on a related column: INNER returns only matches in both, LEFT keeps every left row with NULLs where the right has no match, RIGHT is the mirror, and FULL keeps matches from either side.\n- **GROUP BY** with COUNT, SUM, AVG, MIN and MAX groups rows into summary rows.\n- **ORDER BY** sorts ascending or descending.\n- **INSERT, UPDATE, DELETE** add, modify and remove records, and correct use is what maintains dataset integrity.\n\nAdvanced concepts:\n\n- **Subqueries** nest a query inside another, as with IN over a second table, for multi-step conditions.\n- **Indexing** keeps a sorted copy of a column so retrieval speeds up, at the cost of slower writes, so it should be used deliberately.\n- **Transactions and ACID** treat a sequence of operations as one unit. Atomicity means the whole sequence commits or the whole sequence rolls back; consistency means every operation leaves the database in a valid state; isolation means concurrent operations do not see each other's mid-state; durability means committed data survives power loss or crash. A money transfer is the standard example: both accounts update, or neither does.",
              "### Building a scraper in Python\n\nPrerequisites: Python 3.x, pip, a code editor such as VS Code, PyCharm or Sublime Text, and a basic understanding of HTML.\n\nThe steps: import requests, BeautifulSoup and pandas; send a GET request and check `response.status_code == 200`; parse with `BeautifulSoup(response.content, 'html.parser')`; locate the table and loop its rows into lists of stripped cell text; convert to a pandas DataFrame; save with `to_csv(index=False)`.\n\nThe worked example scrapes the Wikipedia cloud computing comparison page: it reads headers from the first row's `th` tags, loops the remaining rows for `td` cells, builds a DataFrame with those headers as columns, and saves it. Same shape every time: fetch, parse, tabulate, persist.",
              "### Why cleaning and preprocessing matter\n\nCleaning identifies and corrects or removes errors and inconsistencies, meaning missing values, duplicated records and outliers. Preprocessing transforms data into a shape suitable for analysis and training, meaning normalizing, encoding categorical variables and splitting into training and test sets.\n\nThe module's worked example: missing ages filled with the average is cleaning, converting customer location into numerical values is preprocessing.\n\nPoor quality data drives overfitting, where the model ties itself to noise in the training data, and underfitting, where it misses the underlying trend. Both end in lost trust in the predictions, and the module cites the common estimate that data scientists spend up to 80 percent of their time on this stage.",
              "### Handling missing values\n\nMissing values arrive through entry errors or information that was simply unavailable, and left alone they bias results and cut model accuracy. Three strategies:\n\n1. **Remove missing data.** `df.dropna()` drops rows carrying missing values and `df.dropna(axis=1)` drops columns. Use it when the missing share is small enough that removal does not materially change the dataset.\n2. **Impute missing data.** Fill with a substitute such as the mean, `df['column_name'].fillna(df['column_name'].mean(), inplace=True)`, or the median. Use it when missing data is more prevalent and dropping rows would discard usable information.\n3. **Forward or backward fill.** `df.fillna(method='ffill')` propagates the last valid observation forward and `bfill` does the reverse. Use it on time series, where the sequence and the trend are the point.",
              "### Managing outliers\n\nOutliers distort statistical analysis and degrade model performance, so the work splits into identifying them and then handling them.\n\n**Identify.** The Z-score route uses `scipy.stats.zscore` inside `numpy.abs` and flags anything past three sigma. The IQR route takes quantiles at 0.25 and 0.75, computes the spread, and fences at 1.5 times it on either side.\n\n**Handle.** Remove the offending rows, keeping `z_scores <= 3` or negating the IQR mask. Or keep the rows and reduce their impact: cap with `numpy.where` against an upper threshold such as the 0.95 quantile, or dampen with a log transform.",
              "### Normalization and transformation\n\nNormalization adjusts numeric columns onto a common scale so that magnitude alone does not decide importance. Two methods: `sklearn.preprocessing.MinMaxScaler` scales into the 0 to 1 range, and `StandardScaler` gives a mean of zero and a standard deviation of one, which is better when features are measured in different units and you need to compare them directly. Use MinMax when you need bounded output, as with neural networks; use StandardScaler when the algorithm assumes centred data, as with PCA or SVMs.\n\nTransformation changes the shape of the data rather than its scale, because some algorithms assume normal-ish distributions and some columns are dominated by a few extreme values:\n\n- **Logarithmic**, `np.log(x + 1)`, stabilizes variance and softens outliers. The plus-one avoids log-of-zero. Use it when the column is right-skewed, as with income or transaction amount.\n- **Box-Cox**, `scipy.stats.boxcox`, finds the best power transform automatically. Use it when log is not enough and you want the data closer to normal without guessing the exponent.\n- **Binning**, `pd.cut`, converts a continuous variable into labelled discrete bands. You choose the number of bands and optionally the boundaries; `pd.cut(..., bins=[0, 10, 20, 30], labels=['Low', 'Medium', 'High'])` splits age into three readable tiers. Use it when the exact value does not matter and the range does, such as turning credit scores into risk tiers for a marketing audience, or turning sensor readings into on or off states. The module uses it on a continuous numeric column, which is exactly the case where it converts a machine-friendly scale into a human-shaped one.\n- **One-hot encoding**, `pandas.get_dummies`, converts categories into binary columns. The module flags the limit here: it is right for low-cardinality columns such as true or false, because each category becomes exactly one 1 and the rest 0s. It becomes a problem when a column has many distinct values, because the frame balloons in width and the model has to learn from mostly empty columns. When a categorical column has many values, consider target encoding or frequency encoding instead.",
              "### The reusable preprocessing tool\n\nThe practice activity turns the whole pipeline into a local tool. Prerequisites: Python 3.x, pip, a code editor, and pandas for manipulation, NumPy for numerical operations, Scikit-learn for preprocessing and modeling, plus the optional Missingno for visualizing gaps. Installed with `pip install pandas numpy scikit-learn missingno`.\n\nSeven steps: import; load with `read_csv`; handle missing values, optionally visualizing first with `msno.matrix` and `msno.heatmap`, then `dropna()` or `fillna(df.mean())`; manage outliers by Z-score removal or capping at the 0.95 quantile; scale with MinMaxScaler or StandardScaler; encode categoricals with `get_dummies`; save with `to_csv`.\n\nThe automation step wraps each stage in a function: `load_data`, `handle_missing_values`, `remove_outliers`, `scale_data`, `encode_categorical` and `save_data`, then composes them into one call so the identical pipeline runs against a different dataset without rewriting anything.",
              "### Data sources for RAG versus traditional ML\n\nTraditional pipelines rely on static, pre-collected datasets organized into training, validation and test sets. Their sources are structured databases holding customer records or transactions, CSV and Excel files for small to medium sets, APIs whose output is fetched and stored rather than live, and scraped web data. Their strengths are stability, a controlled environment and reproducibility; their challenges are outdated information and a scope fixed at collection time.\n\nRAG retrieves external information during generation instead of learning it at training time. Its sources are structured knowledge bases, document repositories such as internal databases or technical manuals, live APIs and real-time feeds, and occasionally live web search. Its strengths are current information, contextual relevance and adaptability to unexpected questions; its challenges are variable data, harder quality assurance and more infrastructure.\n\nThe module compares the two on five aspects: data stability, update frequency, scope and relevance, complexity, and reproducibility.\n\nBest practices for keeping a RAG source efficient: data governance with clear access, quality and lifecycle policy aligned to GDPR and CCPA; data quality through regular audits and automated validation; scalable infrastructure using cloud storage, distributed databases and caching; security through encryption at rest and in transit, role-based access, monitoring and a breach response plan; freshness through automated sync and refresh triggers; and collaboration between data engineers, data scientists and AI developers.",
              "### Errors in data collection\n\nSix error types, with the module's own examples:\n\n- **Sampling error**, when the data is not representative of the population, as customer feedback drawn from one location.\n- **Measurement error**, when the measuring process is flawed, as a sensor consistently two degrees high.\n- **Data entry error**, mistakes in manual input, as a survey response recorded as 5.0 instead of 50.\n- **Response bias**, respondents answering inaccurately, as underreporting of socially undesirable behaviour.\n- **Non-response error**, when a large part of the sample never responds, as dropouts in a longitudinal study.\n- **Systematic error**, a consistent repeatable skew from faulty equipment or method, as a scale always five grams light.\n\nSix ways to find them: descriptive statistics, data visualization, cross-validation against trusted sources, data auditing, consistency checks, and control groups or redundant collection points.\n\nFive ways to reduce them: standardize the collection procedure, train the collectors, automate collection to remove human error, implement real-time error detection, and review and update the method regularly.\n\nThe step-by-step walkthrough runs the same ground in pandas: `read_csv` then `head` and `dtypes`; `isnull().sum()` and `dropna()` or `fillna(df.mean())`; `describe()`, a matplotlib box plot, and `scipy.stats` Z-scores on numeric columns; `unique()` to surface spelling variants; `duplicated()` and `drop_duplicates()`; then cross-column consistency checks.",
              "### Why data security in AI\n\nThree roles for data set the stakes: training data, whose compromise produces biased, inaccurate or harmful outputs; inference data, whose integrity carries trust in the deployed system; and sensitive PII, whose exposure carries legal and financial consequences.\n\nFour risks follow weak security: data breaches exposing sensitive information, data poisoning where false data is introduced into the training set so the model learns wrong patterns, model inversion where attackers reconstruct training data from the model, and adversarial attacks where manipulated inputs force wrong predictions.\n\nSeven practices answer them: encryption, access control, anonymization, regular audits and monitoring, secure data sharing, adversarial robustness, and the ethical and legal layer. On the legal side the module names GDPR and CCPA compliance, plus transparency about how data is collected, stored and used.",
              "### Security practices in detail\n\n- **Encryption.** At rest, AES-256 on servers, databases and cloud storage. In transit, SSL and TLS between clients and servers. Benefits: confidentiality, fewer breaches, regulatory compliance.\n- **Access control.** Role-based access control granting least privilege, with permissions tied to job function, and multifactor authentication especially for administrative and remote access. Benefits: less unauthorized access and accountability through logged access.\n- **Anonymization and masking.** Anonymization through k-anonymity, l-diversity and t-closeness; masking for fields such as card numbers and national identifiers while keeping the data useful for testing. Benefits: privacy, safe sharing, reduced breach and noncompliance risk.\n- **Audits and monitoring.** Regular audits of policy, practice and infrastructure, internally or by third parties, plus continuous monitoring of access, network traffic and system activity with real-time alerts. Benefits: vulnerabilities caught early, ongoing compliance, visible security health.\n- **Secure sharing.** Encrypted channels and end-to-end encryption, with secure file transfer for large payloads, and written data access agreements covering protection, who may access, and responsibilities.\n- **Backup and recovery.** Automated encrypted backups on a schedule matched to data criticality, plus a tested disaster recovery plan covering restoration, system recovery and stakeholder communication. Benefits: availability and continuity, minimal downtime and data loss.",
              "### Two breach case studies\n\n**Facebook and Cambridge Analytica, 2018.** The error was a loophole in Facebook's API that let third-party apps collect data from users who consented and from their friends who had not. Ramifications: a major loss of public trust, lawsuits and regulatory scrutiny worldwide, and an FTC fine of $5 billion, then the largest the commission had imposed. Policy changes: restricted API access, stricter consent mechanisms and auditing of third-party apps, and a contribution to GDPR and CCPA.\n\n**MyFitnessPal, 2018.** Around 150 million accounts were affected, exposing usernames, email addresses and hashed passwords, some still protected by the older SHA-1 algorithm. Ramifications: eroded user trust, legal and notification costs, a temporary stock dip and account deletions. Policy changes: moving from SHA-1 to bcrypt, stronger storage and transmission protocols, enhanced monitoring and incident response, and user education including two-factor authentication.",
              "### Auditing ML code\n\nThe practice activity hands over intentionally flawed ML code, and the five planted vulnerabilities are the module's real assessment. Each has a package-level fix, and the corrected file at the end shows the set together.\n\n1. **No data validation or sanitization.** A `validate_data()` helper checks `df.isnull().values.any()` and raises ValueError, then wraps both the load and the feature and target split so nothing reaches training unchecked.\n2. **No input validation.** The same helper applies to `X` and `y` after slicing, so a corrupted column cannot slip through.\n3. **Fixed random state.** `random_state=42` becomes `os.urandom(16)`, so the split cannot be reproduced by someone who guesses the seed.\n4. **Unencrypted model saving.** `cryptography.fernet.Fernet` encrypts `pickle.dumps(model)` before the bytes reach disk, with a key generated per save.\n5. **No integrity check on load.** `hashlib.sha256` digests the decrypted payload and compares it with the digest of the model in memory, raising if they differ.\n\nRead the corrected file's imports as the checklist: `os`, `pandas`, `sklearn.model_selection.train_test_split`, `sklearn.linear_model.LogisticRegression`, `pickle`, `hashlib` and `cryptography.fernet`. If a pipeline touches data, a random seed and a saved artifact, those seven are the minimum surface to secure.",
            ],
          image: {
            src: "/roadmap/microsoft-course-1-module-2.png",
            alt: "Diagram of the data management in AI/ML module showing the data lifecycle from collection through processing to governance and security.",
            caption: "The data management in AI/ML module at a glance.",
            credit: "Diagrammed by Frank Angelo Malubay",
            width: 1904,
            height: 856,
          },          },
          {
            slug: "considering-and-selecting-model-frameworks",
            title: "Considering and selecting model frameworks",
            hours: 9,
            summary: "The popular ML frameworks, libraries and pretrained LLMs, and how to weigh their strengths and weaknesses against a project's needs.",
          },
          {
            slug: "considerations-when-deploying-platforms",
            title: "Considerations when deploying platforms",
            hours: 7,
            summary: "Deploying models into production: the features of a deployment platform, preparing a model for real use, version control for reproducibility, and judging scalability and efficiency.",
          },
          {
            slug: "ai-ml-concepts-in-practice",
            title: "AI/ML concepts in practice",
            hours: 6,
            summary: "The AI/ML engineer's role in a corporate setting: the responsibilities across data, frameworks, deployment and cloud, the operational priorities, and networking and mentorship.",
          },
        ],
      },
      {
        slug: "ai-and-machine-learning-algorithms-and-techniques",
        title: "AI and Machine Learning Algorithms and Techniques",
        hours: 45,
        summary:
          "The core algorithms: supervised, unsupervised and reinforcement learning, and deep learning including how these operate in pre-trained large language models, with the feature selection and engineering that decide whether a model generalises.",
      },
      {
        slug: "building-intelligent-troubleshooting-agents",
        title: "Building Intelligent Troubleshooting Agents",
        hours: 43,
        summary:
          "Designing agents that diagnose and resolve issues on their own: the architecture of a troubleshooting agent, natural language processing for user interaction, and the decision-making algorithms behind diagnosis and resolution.",
      },
      {
        slug: "microsoft-azure-for-ai-and-machine-learning",
        title: "Microsoft Azure for AI and Machine Learning",
        hours: 21,
        summary:
          "The Azure ML lifecycle by hand: configuring and managing Azure resources, building end-to-end pipelines, deploying and monitoring models in production, and troubleshooting the workflows that fail.",
      },
      {
        slug: "advanced-ai-and-machine-learning-techniques-and-capstone",
        title: "Advanced AI and Machine Learning Techniques and Capstone",
        hours: 31,
        summary:
          "Ensemble methods and transfer learning, the ethical and responsible AI questions around GenAI, and designing for scale, ending in a capstone that applies the whole certificate to one real problem.",
      },
    ],
  },
  {
    id: "security-engineering-agentic-ai",
    order: "Next",
    title: "Security Engineering for Agentic AI Systems",
    issuer: "Packt · Coursera",
    credentialType: "Course · 14 modules",
    commitment: "1 week at 10 hours a week · intermediate",
    summary:
      "The layer the operations steps assume and never teach, aimed at agents rather than models in general: goal integrity and hijacking, tool security and sandboxing, non-human identity and delegated privilege, supply chain trust, code and RCE defense, memory and context poisoning, multi-agent protocol security, cascading failures, human-agent manipulation, and rogue-agent detection.",
    outcomes: [
      "Threat model an agentic system and defend against goal drift, hijacking and hidden instruction channels",
      "Secure the toolchain: sandboxing, egress control, least privilege and blast radius",
      "Apply zero-trust identity, scoped credentials and per-action authorization to agents",
      "Protect memory, context and knowledge bases from poisoning, and design for cascading failure",
    ],
    url: "https://www.coursera.org/learn/packt-security-engineering-for-agentic-ai-systems-amy6d",
    courses: [
      {
        slug: "security-engineering-for-agentic-ai-systems",
        title: "Security Engineering for Agentic AI Systems",
        summary:
          "Fourteen modules, from the agentic attack surface to a capstone secure agent. Based on Anand Rao Nednur's book of the same name. The header says one week at 10 hours a week and the modules publish 13 hours; both are left as Packt publishes them.",
        modules: [
          {
            slug: "introduction",
            title: "Introduction",
            summary:
              "Why agentic AI security matters, and how to work through the masterclass.",
          },
          {
            slug: "the-agentic-ai-security-universe",
            title: "Module 1 — The Agentic AI Security Universe",
            hours: 1,
            summary:
              "What makes agentic AI different, the new attack surface, autonomy and delegation risks, why traditional cybersecurity fails for agents, and the foundations of secure AI architecture.",
          },
          {
            slug: "mastering-agent-goal-integrity",
            title: "Module 2 — Mastering Agent Goal Integrity",
            hours: 1,
            summary:
              "Goal drift, hijacking and injection, hidden instruction channels and trigger-based exploits, defended through intent provenance, capsules and drift monitoring.",
          },
          {
            slug: "tool-security-sandboxing-execution-safety",
            title: "Module 3 — Tool Security, Sandboxing & Execution Safety",
            hours: 1,
            summary:
              "Secure toolchains: tool interfaces and selection, misuse and unsafe delegation, sandboxing in Docker, VM and WASM, egress control, rate limits and blast radius.",
          },
          {
            slug: "ai-identity-access-controls-credential-security",
            title: "Module 4 — AI Identity, Access Controls & Credential Security",
            hours: 1,
            summary:
              "Non-human identity, delegated privilege and escalation, confused deputy and impersonation attacks, credential leakage, policy-as-code and per-action authorization.",
          },
          {
            slug: "agentic-supply-chain-component-trust",
            title: "Module 5 — Agentic Supply Chain & Component Trust",
            hours: 1,
            summary:
              "Dataset and embedding poisoning, MCP and tool descriptor attacks, registry compromise and typosquatting, prompt template hardening, and the AI Bill of Materials.",
          },
          {
            slug: "code-safety-rce-defense-execution-control",
            title: "Module 6 — Code Safety, RCE Defense & Execution Control",
            hours: 1,
            summary:
              "Prompt-based code injection, code hallucinations and dependency-based RCE, safe generation pipelines, static and dynamic analysis, and locked execution sandboxes.",
          },
          {
            slug: "memory-context-knowledge-base-security",
            title: "Module 7 — Memory, Context & Knowledge Base Security",
            hours: 1,
            summary:
              "Memory poisoning, embedding store attacks, cross-user contamination, trust-scored retrieval, multi-tenant isolation and secure RAG design.",
          },
          {
            slug: "multi-agent-comms-protocols-coordination-security",
            title: "Module 8 — Multi-Agent Comms, Protocols & Coordination Security",
            hours: 1,
            summary:
              "Agent-in-the-middle, replay and coordination corruption, semantic drift between agents, mTLS and signatures, protocol pinning and secure discovery.",
          },
          {
            slug: "cascading-failures-systemic-risk-resilience",
            title: "Module 9 — Cascading Failures, Systemic Risk & Resilience",
            hours: 1,
            summary:
              "Planner-executor-tool loops, error propagation across agents, circuit breakers and fail-fast, blast radius engineering and AI observability.",
          },
          {
            slug: "human-agent-trust-psychology-manipulation-defense",
            title: "Module 10 — Human-Agent Trust, Psychology & Manipulation Defense",
            hours: 1,
            summary:
              "Authority illusions and automation bias, social engineering through AI, fake explainability, secure recommendation systems and human-in-the-loop patterns.",
          },
          {
            slug: "rogue-agents-misalignment-behavioral-security",
            title: "Module 11 — Rogue Agents, Misalignment & Behavioral Security",
            hours: 1,
            summary:
              "Emergent misalignment, agent collusion and reward hacking, behavioral drift detection, constraint engines, kill switches and integrity monitoring.",
          },
          {
            slug: "capstone-build-a-secure-agentic-system",
            title: "Module 12 — Capstone: Build a Secure Agentic System",
            hours: 1,
            summary:
              "Threat model, red-team and harden a full agent: architecture, identity, tools, memory and communications integrated, then hardened for production.",
          },
          {
            slug: "course-conclusion",
            title: "Course Conclusion",
            hours: 1,
            summary:
              "A reflective close on the course and what to keep practising.",
          },
        ],
      },
    ],
  },
  {
    id: "duke-mlops-specialization",
    order: "Next",
    title: "MLOps | Machine Learning Operations Specialization",
    issuer: "Duke University · Coursera",
    credentialType: "Specialization · 4 courses",
    commitment: "~6 months at 5 hrs/week",
    summary:
      "The operations layer: Python and automation for MLOps, the DevOps and DataOps practices behind a production pipeline, the Amazon SageMaker and Azure ML platforms, and MLflow with Hugging Face for experiment tracking, model management and deployment. Advanced level, and the difference between a model that works in a notebook and one that holds up in production.",
    outcomes: [
      "Automate data preprocessing and feature extraction with Python, tests and command-line tools",
      "Build operations pipelines across DevOps, DataOps and MLOps, and deploy models to production",
      "Train, optimize and deploy models on Amazon SageMaker and Azure ML",
      "Design a full MLOps pipeline with MLflow, and fine-tune and deploy models with Hugging Face",
    ],
    url: "https://www.coursera.org/specializations/mlops-machine-learning-duke",
    courses: [
      {
        slug: "python-mlops-duke",
        title: "Python Essentials for MLOps",
        hours: 43,
        summary:
          "Python for operations: variables and data structures, writing and debugging tests with Pytest, and working with APIs and SDKs to build the command-line tools and HTTP APIs that automate machine learning work.",
      },
      {
        slug: "devops-dataops-mlops-duke",
        title: "DevOps, DataOps, MLOps",
        hours: 45,
        summary:
          "Building operations pipelines across the three: the MLOps principles and practices of data management, model training and development, continuous integration and delivery, and deploying models to a production environment.",
      },
      {
        slug: "mlops-aws-azure-duke",
        title: "MLOps Platforms: Amazon SageMaker and Azure ML",
        hours: 31,
        summary:
          "Exploratory data analysis on real datasets, building machine learning solutions on both AWS and Azure, and training and deploying them to production with cloud technology.",
      },
      {
        slug: "mlops-mlflow-huggingface-duke",
        title: "MLOps Tools: MLflow and Hugging Face",
        hours: 26,
        summary:
          "Creating MLflow projects and registering models, building APIs from Hugging Face models and datasets, and packaging and deploying Hugging Face to the cloud with automation.",
      },
    ],
  },
  {
    id: "duke-llmops-specialization",
    order: "Next",
    title: "Large Language Model Operations (LLMOps) Specialization",
    issuer: "Duke University · Coursera",
    credentialType: "Specialization · 6 courses",
    commitment: "~5 months at 10 hrs/week",
    summary:
      "The operations layer pointed at language models: deploying, managing and optimizing large language models across Azure, AWS, Databricks, local infrastructure and open source, through more than twenty hands-on projects. Beginner level, and the difference between a prompt that works once and a language model that holds up in production.",
    outcomes: [
      "Build generative AI software solutions, and improve their output with prompt engineering",
      "Deploy and manage large language models on Azure with Semantic Kernel, and implement RAG applications",
      "Design data pipelines with message queues, and store data at scale in vector, graph and key/value databases",
      "Build generative AI solutions on AWS, and develop them with Amazon Bedrock",
      "Run local LLMs with Databricks, Llamafile and Mixtral, and fine-tune open source models",
    ],
    url: "https://www.coursera.org/specializations/large-language-model-operations",
    courses: [
      {
        slug: "introduction-to-generative-ai",
        title: "Introduction to Generative AI",
        hours: 38,
        summary:
          "Generative AI for automation: developing generative AI software solutions, and building with prompt engineering to improve the output.",
      },
      {
        slug: "operationalizing-llms-on-azure",
        title: "Operationalizing LLMs on Azure",
        hours: 11,
        summary:
          "Deploying and managing large language models on Azure, crafting queries with Semantic Kernel, and implementing and deploying applications with retrieval augmented generation.",
      },
      {
        slug: "advanced-data-engineering",
        title: "Advanced Data Engineering",
        hours: 23,
        summary:
          "Data pipelines and their lifecycle, message queues for managing data processing, and vector, graph and key/value databases for storage at scale.",
      },
      {
        slug: "genai-and-llms-on-aws",
        title: "GenAI and LLMs on AWS",
        hours: 46,
        summary:
          "Building generative AI solutions on AWS, the cloud computing fundamentals underneath machine learning on AWS, and developing solutions with Amazon Bedrock.",
      },
      {
        slug: "databricks-to-local-llms",
        title: "Databricks to Local LLMs",
        hours: 27,
        summary:
          "Databricks for data engineering and machine learning workloads, designing ML pipelines, and running local LLMs with Llamafile and Mixtral.",
      },
      {
        slug: "open-source-llmops-solutions",
        title: "Open Source LLMOps Solutions",
        hours: 36,
        summary:
          "Running local large language models, fine-tuning them, and using open source generative AI.",
      },
    ],
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
    coursesLabel: "Tracks",
    courses: [
      {
        slug: "build",
        title: "Build",
        summary:
          "The framework layer, and the first track to start in: Introduction to LangChain, Introduction to LangGraph, Introduction to Deep Agents, dcode Essentials, Building and Deploying Managed Agents, and the Ambient Agents project.",
      },
      {
        slug: "test",
        title: "Test",
        summary:
          "Observability and evaluation with LangSmith: Quickstart, LangSmith Essentials, Introduction to Agent Observability and Evaluations, and Building Reliable Agents with LangSmith.",
      },
      {
        slug: "deploy",
        title: "Deploy",
        summary:
          "Getting an agent into a production runtime: Building and Deploying Managed Agents, and Introduction to LangSmith Agent Server for deploying, managing and controlling agents.",
      },
      {
        slug: "monitor",
        title: "Monitor",
        summary:
          "Watching agents in production: Monitoring Production Agents, on cost, trace analysis, quality and latency, and Autonomous Agent Improvement with LangSmith Engine for closing the loop.",
      },
    ],
  },
  {
    id: "ai-evals-faq",
    order: "Alongside",
    title: "AI Evals: Everything You Need to Know",
    issuer: "Hamel Husain and Shreya Shankar",
    credentialType: "Self-study resource",
    commitment: "Free · self-paced · 1 to 2 hrs",
    summary:
      "The methodology layer behind the tooling: how to design an evaluation rather than operate one. Read traces before automating anything, group the failures into a taxonomy, judge binary pass and fail, hold a test set back from the judge, and validate an LLM judge against human labels before trusting it.",
    outcomes: [
      "Read traces before automating, and turn the failures into a taxonomy",
      "Split examples into train, dev and test, and keep the test set away from the judge",
      "Prefer binary pass and fail over a one to five scale",
      "Validate an LLM judge against human labels before trusting it",
    ],
    url: "https://hamel.dev/blog/posts/evals-faq/",
    kind: "resource",
  },
  {
    id: "stanford-cs221",
    order: "Then",
    title: "CS221: Artificial Intelligence: Principles and Techniques",
    issuer: "Stanford University",
    commitment: "10 weeks · 10–20 hrs/week",
    summary:
      "The mathematical foundations that make applied work durable: search, game playing, Markov decision processes, constraint satisfaction, graphical models, and logic: AI as the mathematics of good decisions under incomplete information.",
    outcomes: [
      "Search, game playing, and Markov decision processes",
      "Constraint satisfaction and graphical models",
      "Machine learning and logic",
      "Probability and algorithms under incomplete information",
    ],
    credentialType: "Graduate course · 6 topics",
    coursesLabel: "Topics",
    courses: [
      {
        slug: "machine-learning",
        title: "Machine Learning",
        summary:
          "The opening block: learning from data, the methods the rest of the course assumes, and the first homework.",
      },
      {
        slug: "search",
        title: "Search",
        summary:
          "Uninformed and informed search, heuristic design, and the algorithms underneath route finding and web search.",
      },
      {
        slug: "reinforcement-learning",
        title: "Reinforcement Learning",
        summary:
          "Markov decision processes, value and policy iteration, and learning from reward. The largest block of the quarter, and the Mountaincar homework.",
      },
      {
        slug: "games",
        title: "Games",
        summary:
          "Adversarial search: minimax, alpha-beta pruning and the Pacman project.",
      },
      {
        slug: "bayesian-networks",
        title: "Bayesian Networks",
        summary:
          "Graphical models: representation, inference and learning over a joint distribution, and the Bayesian homework.",
      },
      {
        slug: "logic",
        title: "Logic",
        summary:
          "Propositional and first-order logic as the representation for an agent that reasons, and the Logic homework.",
      },
    ],
  },
];

export const lookingFor: string[] = [
  "Ventures where AI engineering is the product, not a bolt-on",
  "Ownership of the path from data pipeline to deployed agent",
  "Room to set technical direction and help others grow",
];
