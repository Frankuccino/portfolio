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
  /**
   * Skills the reader should be able to demonstrate, not just remember.
   * Shown at the top of the module page as a short operating checklist.
   */
  mustMasterSkills?: { skill: string; outcome: string }[];
  /**
   * Short rules kept in working memory while applying this module.
   * Rendered directly under the skills checklist.
   */
  mentalLocks?: { title: string; lines: string[] }[];
  /**
   * Optional rail grouping: chapter numbers (1-based, inclusive) that belong
   * to one sub-module. Without it the rail lists chapters directly.
   */
  submodules?: { label: string; start: number; end: number }[];
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
    moduleProgress: "In progress",
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
            mustMasterSkills: [
              { skill: "Read the lifecycle as a loop", outcome: "Trace governed source data through preparation, embedding, retrieval, inference, evaluation and feedback without calling ETL the finish line." },
              { skill: "Explain the AI data engineer's role", outcome: "Name what you own at each stage and where ownership is shared with AI engineering, platform, security and product." },
              { skill: "Distinguish AI-ready from analytics-ready", outcome: "State why a clean table can still fail an AI use case and what extra contracts make it usable." },
              { skill: "Use the concept map as a diagnostic", outcome: "Point to each band of the diagram and say what breaks when that band is weak." },
              { skill: "Turn the module into practice", outcome: "Pick one skill, one small artifact and one way to prove you can deliver it." },
            ],
            mentalLocks: [
              { title: "The lifecycle is a loop, not a handoff", lines: [
                "Preparation, embedding, retrieval, inference, evaluation and feedback feed each other.",
                "Calling ETL done before serving context is ready is where AI projects start to fail.",
              ] },
              { title: "The role is defined by what you make true", lines: [
                "You own contracts, lineage, freshness and permissions before the model sees data.",
                "Shared ownership still needs named boundaries.",
              ] },
              { title: "AI-ready adds contracts that BI never needed", lines: [
                "A clean table can still fail a live assistant.",
                "Ask who consumes the data, how fresh it must be and what evidence must survive.",
              ] },
              { title: "Learn by shipping a proof", lines: [
                "Pick one artifact and one test that proves the skill.",
                "Retain the decision record, not just the summary.",
              ] },
            ],
            completed: "Module 1 of 9",
            breakdown: [
              {
                group: "Orientation",
              items: [
                {
                  name: "The welcome video",
                  role: "Sets the scope, audience, course arc, mindset and where to find the full overview.",
                },
                {
                  name: "Why now",
                  role: "The field is shifting from analytics-first delivery towards systems that also serve AI workloads, without erasing established engineering practice.",
                },
                {
                  name: "Who it serves",
                  role: "Working data professionals who already know pipelines, warehouses, SQL, quality and operations and want a practical map into AI-native work.",
                },
                {
                  name: "What you will explore",
                  role: "The major ideas of AI-native data engineering at an orientation level, so the terms and patterns become usable rather than intimidating.",
                },
                {
                  name: "Mindset",
                  role: "Confidence, curiosity and professional caution; the goal is steady understanding rather than hype or jargon collection.",
                },
                {
                  name: "Where next",
                  role: "The course overview is the reference map for learning objectives, prerequisites and the full syllabus throughout the certificate.",
                },
              ],
            },
            {
              group: "Built for practitioners",
              items: [
                {
                  name: "Data engineers",
                  role: "Existing strengths in pipelines, operational discipline and delivery remain the foundation as new consumers begin using the same data.",
                },
                {
                  name: "Data architects",
                  role: "The emphasis is system shape and design significance, connecting familiar platform thinking to retrieval, embeddings and AI-enabled data products.",
                },
                {
                  name: "Database administrators",
                  role: "The course broadens stewardship rather than replacing it: performance, trust, governance and dependable operations still matter.",
                },
                {
                  name: "Assumed knowledge",
                  role: "Pipelines, warehouses, ETL and ELT, data quality, orchestration and platform concepts.",
                },
                {
                  name: "Not assumed",
                  role: "Deep knowledge of LLM internals, model training or vector systems.",
                },
              ],
            },
            {
              group: "The AI-native landscape",
              items: [
                {
                  name: "LLM",
                  role: "One major consumer of enterprise data, treated as part of the operating landscape rather than a deep model-science topic.",
                },
                {
                  name: "Retrieval",
                  role: "Connects user prompts to relevant enterprise information, because practical systems need the right context before generating an answer.",
                },
                {
                  name: "Embeddings",
                  role: "Turn content into machine-comparable representations; the maths is not needed yet, only why they support search and matching.",
                },
                {
                  name: "Semantic search",
                  role: "Shifts from exact keywords toward meaning-based retrieval across unstructured information.",
                },
                {
                  name: "Vector databases",
                  role: "One enabling component in the landscape, introduced by purpose and design role rather than implementation.",
                },
                {
                  name: "System design",
                  role: "Ties the pieces together so responsibilities, trade-offs and architecture can be reasoned about clearly.",
                },
              ],
            },
            {
              group: "The course arc",
              items: [
                {
                  name: "Orientation",
                  role: "Establish scope, shared language and a practical view of what AI-native data engineering includes and what it does not.",
                },
                {
                  name: "Mindset shift",
                  role: "Reframe familiar instincts: data increasingly supports intelligent applications and AI experiences as well as analysts and reports.",
                },
                {
                  name: "Building blocks",
                  role: "Meet the major components and concepts at the level of purpose, role and design significance.",
                },
                {
                  name: "Integrated view",
                  role: "Bring the separate themes together into a coherent system that feels practical and discussable in professional work.",
                },
              ],
            },
            {
              group: "Foundation and practice",
              items: [
                {
                  name: "Foundation still matters",
                  role: "Reliable movement, governance, modelling, documentation and operational discipline become more valuable as more consumers depend on data.",
                },
                {
                  name: "What AI can support",
                  role: "Exploration, drafting, option generation and faster iteration, but not a substitute for disciplined engineering.",
                },
                {
                  name: "What people own",
                  role: "Review, validation, governance, documentation and judgement, so quality stays visible and decisions stay accountable.",
                },
                {
                  name: "The certificate around it",
                  role: "Seven courses and 156 published hours, of which this foundations course publishes 20 hours.",
                },
                {
                  name: "Reference map",
                  role: "The course overview and general information guide sit alongside the welcome material for the full objectives and prerequisites.",
                },
              ],
            },
            ],
            notes: [
              "### What the welcome sets up\n\nThis module orients experienced data professionals to a changing landscape. Data no longer supports only reports, dashboards and applications; it increasingly powers AI experiences too. The welcome sets scope, audience, course arc and mindset, and points to the full overview for objectives and prerequisites. The field is shifting from analytics-first delivery towards systems that also serve AI workloads, and that creates new design questions without erasing the value of established engineering practice.",
              "### Who it serves\n\nThe course assumes familiarity with pipelines, warehouses, ETL and ELT, data quality, orchestration and platform concepts, but not deep knowledge of LLM internals, model training or vector systems. Data engineers extend reliable movement and transformation into AI-aware systems. Data architects connect platform thinking to retrieval, embeddings and AI-enabled data products. Database administrators broaden stewardship: performance, trust, governance and dependable operations still matter when enterprise data supports AI experiences.",
              "### The landscape in six terms\n\nLarge language models are a major consumer of enterprise data. Retrieval connects prompts to relevant information. Embeddings turn content into machine-comparable representations, so semantic similarity can support search and matching. Semantic search moves beyond exact keywords toward meaning. Vector databases appear as one enabling component. System design ties these together so responsibilities, constraints and trade-offs can be reasoned about in professional discussion.",
              "### The arc ahead\n\nThe course starts with orientation, then reframes familiar instincts for a broader setting where data serves intelligent applications as well as reports. It introduces the major components by purpose and design significance, then brings them together into an integrated system view. The aim is for the landscape to feel practical, discussable and easier to reason about at work.",
              "### Foundation still matters\n\nA narrow view says data engineering serves only dashboards, reports and analysts; that misses how AI systems, search experiences and language interfaces depend on trustworthy data too. The broader view keeps the same professional foundation and expands around it. Reliable movement, governance, modelling, documentation and operational discipline become more valuable, not less, when more consumers depend on the data.",
              "### Work carefully, learn steadily\n\nAcross the certificate, AI can support exploration, drafting, option generation and faster iteration. It is not a substitute for disciplined engineering. People still own review, validation, governance, documentation and judgement. The course treats AI work as professional engineering work where quality remains visible and decisions remain accountable.",
            ],
          },
          {
            slug: "introduction-to-ai-native-data-engineering",
            title: "Introduction to AI-Native Data Engineering",
            hours: 3,
            summary: "How AI workloads differ from BI workloads, and why traditional pipelines need redesign for semantic search, RAG, embeddings and agentic consumers.",
            mustMasterSkills: [
              { skill: "Map the AI-native stack", outcome: "Name the layers from source data through pipeline, retrieval, model and serving interface, and say what each contributes." },
              { skill: "Trace the runtime retrieval path", outcome: "Follow a query through metadata filters, chunk selection, prompt assembly and a grounded response." },
              { skill: "Design for freshness and lineage", outcome: "Choose identifiers, timestamps and version records that make retrieval current and auditable." },
              { skill: "Separate training from serving", outcome: "Explain why a feature built for training can be wrong at inference time and how to prevent it." },
              { skill: "Compare retrieval strategies", outcome: "Defend keyword, embedding or hybrid retrieval with recall, latency and governance evidence." },
              { skill: "Place trust controls at the point of use", outcome: "Put permissions, redaction and retention where they actually take effect, not only in policy prose." },
            ],
            mentalLocks: [
              { title: "Map the stack before choosing a tool", lines: [
                "Sources, pipelines, retrieval, models and serving interfaces form one chain.",
                "Every layer inherits the weakness of the one below it.",
              ] },
              { title: "Freshness and lineage are correctness, not housekeeping", lines: [
                "Without timestamps and version IDs, retrieval cannot prove it is current.",
                "A stale answer is a data bug even when the model is fine.",
              ] },
              { title: "Retrieval shape decides answer quality", lines: [
                "Chunking, metadata and filters determine what evidence the model can use.",
                "Tune retrieval before tuning prompts.",
              ] },
              { title: "Training logic does not serve inference", lines: [
                "A feature built offline can be wrong online.",
                "Share window logic and null defaults through one versioned contract.",
              ] },
              { title: "Trust controls must execute", lines: [
                "Permissions and redaction belong in the pipeline, not only in a policy document.",
                "A rule you cannot trace in code is a rule you do not have.",
              ] },
            ],
            completed: "Module 2 of 9",
            breakdown: [
            {
              group: "Role and consumers",
              items: [
                {
                  name: "AI-Native Data Engineering",
                  role: "Prepares enterprise data so analytics tools, applications, models and agents can use it reliably, securely and observably.",
                },
                {
                  name: "Dashboards versus assistants",
                  role: "A dashboard targets a known metric from structured rows; an assistant answers an open-ended question that may span manuals, policies, inventory and account rules.",
                },
                {
                  name: "Data product consumers",
                  role: "Dashboards, semantic search, RAG apps, assistants and agents each impose a different freshness, context and permission obligation on the same governed foundation.",
                },
                {
                  name: "One foundation, many consumers",
                  role: "Curated data serves aggregated reporting and retrieval-ready context at the same time, so BI-ready does not automatically mean AI-ready.",
                },
                {
                  name: "Skill stack",
                  role: "Core engineering stays the base; AI data products, operational controls and cross-team delivery layer on top of it.",
                },
              ],
            },
            {
              group: "Choosing the first use case",
              items: [
                {
                  name: "Recognise the workload",
                  role: "Separate search, RAG, assistance, training and agentic workflows before designing anything, because they consume very different pipeline capabilities.",
                },
                {
                  name: "Read the data demands",
                  role: "Examine freshness, permissions, metadata, context assembly, latency and observability at inference time for each candidate.",
                },
                {
                  name: "Select a feasible target",
                  role: "Choose one that is valuable, measurable and constrained enough to ship responsibly.",
                },
                {
                  name: "Northstar constraints",
                  role: "Millions of product pages and tickets, thousands of policies, 95,000 service chats a day, a two-second answer SLA, a twelve-week launch and no policy leaks.",
                },
                {
                  name: "Five workload families",
                  role: "Find covers semantic search and similar-ticket lookup; Generate covers RAG answers and reply drafts; Act or Learn covers training sets, routing models and agents.",
                },
                {
                  name: "Value versus readiness",
                  role: "High value with high readiness starts now; high value with low readiness waits for the platform; low-value work is deferred even when technically easy.",
                },
                {
                  name: "Three rules for starting",
                  role: "Choose by workload, start with constraints, and let the chosen use case drive architecture rather than the other way round.",
                },
              ],
            },
            {
              group: "Inference-time context",
              items: [
                {
                  name: "Ingest",
                  role: "Collect policy documents, product metadata, support macros and selected ticket summaries from operational systems into a governed, repeatable flow.",
                },
                {
                  name: "Prepare",
                  role: "Clean, deduplicate, tag metadata and chunk long documents; a warranty rule split from its exception produces incomplete context and misleads the model.",
                },
                {
                  name: "Embed",
                  role: "Convert each chunk into a vector that captures semantic similarity, so differing query words can still find the right source.",
                },
                {
                  name: "Index",
                  role: "Store vectors with metadata in pgvector, Pinecone, Weaviate or Elasticsearch for nearest-neighbour retrieval at inference time.",
                },
                {
                  name: "Grounded answer",
                  role: "Semantic search is the foundation; RAG adds controlled generation on top of governed retrieval and citations.",
                },
              ],
            },
            {
              group: "Architecture layers",
              items: [
                {
                  name: "Source systems",
                  role: "Operational systems of record: commerce platforms, policy repositories, CRM records and ticketing tools.",
                },
                {
                  name: "Data processing",
                  role: "Quality checks, enrichment, normalisation and metadata management on top of raw sources.",
                },
                {
                  name: "Retrieval services",
                  role: "Embedding generation, vector indexes, query handling and filtering turn prepared data into searchable context.",
                },
                {
                  name: "AI applications",
                  role: "Prompting, answer generation, citations and possible actions in tools or workflows.",
                },
                {
                  name: "Trust controls",
                  role: "Governance, access control, evaluation and observability wrapped around the whole path.",
                },
              ],
            },
            {
              group: "Runtime retrieval path",
              items: [
                {
                  name: "Identity check",
                  role: "Verify which agent is asking, which customer record is in view and which fields or regions are authorised.",
                },
                {
                  name: "Query rewrite",
                  role: "Expand a vague request such as holiday refund into explicit terms covering return window, damage status and product category.",
                },
                {
                  name: "Vector search",
                  role: "Retrieve passages whose embeddings are semantically close to the rewritten query.",
                },
                {
                  name: "Metadata filter",
                  role: "Narrow candidates by effective date, region, product line or permission tag before they reach the prompt.",
                },
                {
                  name: "Context pack",
                  role: "Compose the top results into a compact, ordered payload with citations.",
                },
                {
                  name: "LLM response",
                  role: "Generate the grounded answer only after retrieval and filtering have assembled the evidence.",
                },
              ],
            },
            {
              group: "Stack guide and observability",
              items: [
                {
                  name: "Search by meaning",
                  role: "Embedding pipeline, vector index, metadata schema and ranking, with a stated refresh cadence.",
                },
                {
                  name: "Ground and authorise",
                  role: "Retrieval layer, context builder, model gateway, source tracking and an access-control service that filters before prompting.",
                },
                {
                  name: "Support training",
                  role: "Curated datasets, labelling workflows, feature pipelines and dataset versioning so a training set can be reproduced.",
                },
                {
                  name: "Handle changing sources",
                  role: "Incremental ingestion, CDC, embedding refresh jobs and an index rebuild strategy for edits and deletions.",
                },
                {
                  name: "Serve low latency",
                  role: "Caching, search tuning, model routing and token-budget controls, with the dominant hop identified.",
                },
                {
                  name: "Six observability signals",
                  role: "Ingest health, embedding freshness, index coverage, retrieval quality, answer grounding and usage feedback.",
                },
              ],
            },
            {
              group: "Ownership and runtime governance",
              items: [
                {
                  name: "Decision authority",
                  role: "Who decides the rule: security decides that support agents cannot retrieve restricted legal notes.",
                },
                {
                  name: "Implementation responsibility",
                  role: "Who builds the rule: data engineering applies row-level and document-level controls during indexing.",
                },
                {
                  name: "Operational accountability",
                  role: "Who detects and fixes breakage: platform and application teams monitor failed permission checks and retrieval errors.",
                },
                {
                  name: "Property-based ownership",
                  role: "Ask which property of the vector index each team owns, not who owns the index as a whole.",
                },
                {
                  name: "Runtime questions",
                  role: "Was this chunk permitted, which document version and embedding model produced it, which model received it, and is there enough evidence to audit the answer?",
                },
                {
                  name: "Governance checklist",
                  role: "Access control, lineage, classification, evaluation and monitoring, human accountability and change management.",
                },
                {
                  name: "Embedding upgrades",
                  role: "Changing the embedding model is a governance event: it implies index rebuilds, reevaluation, rollback rules and approvals.",
                },
              ],
            },
            {
              group: "Case study and assessment",
              items: [
                {
                  name: "Northstar Copilot before Black Friday",
                  role: "A support copilot case built on 1.8 million product pages, 42 million tickets, daily policy updates, 9,000 agents and a response target under three seconds.",
                },
                {
                  name: "The review timeline",
                  role: "A prompt-only prototype looked plausible until security found role leakage; a first 42M-chunk embedding batch had no refresh cadence or coverage report.",
                },
                {
                  name: "Exhibit metrics",
                  role: "Grounded answer rate rose from 54 percent to 88 percent with governed RAG; citations from 18 to 92 percent; restricted-content leakage from 3.1 to 0.0 percent; p95 latency from 780 ms to 1,920 ms.",
                },
                {
                  name: "Ownership gap",
                  role: "Source tables had named owners, but chunks, embeddings, the vector index, prompt templates and inference logs did not.",
                },
                {
                  name: "Decision",
                  role: "The best answer is Option 2 with constrained scope: identity filters and audit logging, keeping semantic retrieval, metadata filters and citations when budget is cut.",
                },
                {
                  name: "Module quiz",
                  role: "Seven graded questions covering the definition, the missing retrieval layer, the chunk-embed-index-retrieve sequence, runtime governance, starting path, ownership and RAG versus training.",
                },
              ],
            },
            {
              group: "Lab: batch to AI-native redesign",
              items: [
                {
                  name: "Legacy keyword baseline",
                  role: "A batch retrieval pipeline built with CountVectorizer over a normalised text corpus.",
                },
                {
                  name: "Dense semantic retrieval",
                  role: "The redesigned flow that produces document embeddings for semantic search over the same corpus.",
                },
                {
                  name: "Reusable Pipeline",
                  role: "Scikit-learn Pipeline objects keep the transformations maintainable and reviewable.",
                },
                {
                  name: "Corpus",
                  role: "The built-in fetch_20newsgroups dataset, sourced under BSD 3-Clause, keeps the lab reproducible.",
                },
                {
                  name: "Latency and scale benchmark",
                  role: "Mean and p95 latency are measured for both pipelines, with readiness scoring that weights freshness against serving latency.",
                },
                {
                  name: "Model comparison",
                  role: "A Random Forest baseline is compared against Logistic Regression on F1 score and p95 single-request latency before recommending what to deploy first.",
                },
                {
                  name: "Governance evidence",
                  role: "Deliverables include a side-by-side relevance comparison, a latency benchmark and evidence aligned with CI/CD and data-quality expectations.",
                },
              ],
            },
            ],
            notes: [
              "### What the module is about\n\nAI-Native Data Engineering is the practice of preparing enterprise data so analytics tools, applications, models and agents can use it reliably, securely and observably. It extends classic pipelines beyond reporting into inference-time context, retrieval, policy enforcement and behavioural evidence. The foundation does not disappear: reliable movement, governance, modelling, documentation and operational discipline become more valuable as more consumers depend on the data.",
              "### Why dashboards are not enough\n\nA dashboard question targets a known metric from structured rows and can be served on a schedule for a human to interpret. An assistant question is open-ended and contextual: which tent fits four people in heavy rain, and is it returnable after use? That answer may combine manuals, policies, inventory and account rules. BI-ready therefore does not automatically mean AI-ready. Inference-time context is a just-in-time join on meaning, not an exact-key join on columns.",
              "### Consumers change the pipeline\n\nThe same governed foundation serves dashboards, a search index, an LLM assistant and a policy agent, each with a different engineering obligation. Dashboards tolerate some latency; agents acting on answers are the most sensitive to contracts and controls because stale or unauthorised context becomes an operational risk. The skill stack is additive: core engineering, AI data products, operational controls and cross-team delivery.",
              "### Choosing a first use case\n\nThe practical question is not whether a model can be added, but which workload creates value without demanding a platform you do not have. The method is to recognise the workload, read its data demands, select a feasible target and let that choice shape the architecture. Northstar's support copilot carries millions of product pages and tickets, thousands of policies, 95,000 service chats a day, a two-second answer SLA, a twelve-week launch and a hard rule against policy leaks. Those constraints make governed retrieval and latency engineering central from the start.",
              "### Five workload families\n\nCalling something an AI assistant hides several jobs. Find covers semantic search, similar-ticket lookup and policy discovery, needing chunks, embeddings, metadata and vector retrieval. Generate covers RAG answers, reply drafts and case summaries, needing trusted context, permissions before prompting and citations. Act or Learn covers training datasets, routing models and agentic workflows, needing curated examples, labels, evaluation sets, workflow permissions, event logging and explicit approval boundaries.",
              "### Value against readiness\n\nHigh value with high readiness is the first target: permission-aware RAG for a controlled user group is measurable and improves through retrieval, metadata and access work. High value with low readiness, such as a custom routing model with weak labels, is a poor first redesign. Low-value work is deferred, and low-value high-readiness work such as autonomous refund agents can wait because the operational risk outweighs the immediate gain. Choose by workload, start with constraints, and let the use case drive architecture.",
              "### Data becomes context\n\nThe offline path ingests policy documents, product metadata, support macros and ticket summaries, then cleans, deduplicates, tags and chunks them. Chunking quality is decisive: a warranty rule split from its exception produces incomplete context. An embedding model turns each chunk into a vector, and the vectors plus metadata go into an index such as pgvector, Pinecone or Elasticsearch for nearest-neighbour search. The result is governed, searchable context prepared before anyone asks a question.",
              "### Architecture shape\n\nFour core layers carry the work: source systems, data processing, retrieval services and AI applications. Governance, access control, evaluation and observability wrap the whole path. Batch preparation builds embeddings and indexes ahead of time; retrieval assembles context per request. Keeping those roles separate lets different teams own them and keeps failures isolated. Trust comes from governed context, not model magic.",
              "### The runtime retrieval path\n\nA request moves through identity check, query rewrite, vector search, metadata filter, context pack and finally the LLM response. The metadata filter is the boundary between broad semantic similarity and a permitted answer. Only after evidence is assembled does generation begin, which is why trace logs must record the rewritten query, the filters applied and the retrieved chunk IDs. Every hop has a latency budget, and a green batch job says nothing about inference-time relevance.",
              "### The stack reference guide\n\nThe module maps requirements to platform components. Search by meaning needs an embedding pipeline, vector index, metadata schema and ranking; grounded answers need a retrieval layer, context builder, model gateway and source tracking; permissions need an identity provider, access-control service and retrieval-time filters. Changing source documents need incremental ingestion, CDC and an embedding refresh strategy; low latency needs caching, search tuning, model routing and token budgets; governed automation needs a tool registry, authorisation checks, human approvals and action logs.",
              "### Observability and pipeline evolution\n\nSix signals replace the old batch checklist: ingest health, embedding freshness, index coverage, retrieval quality, answer grounding and usage feedback. The practical method is to compare outputs against the current pipeline, trace every downstream consumer rather than only dashboards, and turn the gaps into a redesigned map. Reliable AI starts with reliable ETL extended for intelligent consumers.",
              "### Ownership is a technical contract\n\nA useful ownership boundary names three things: decision authority, implementation responsibility and operational accountability. The tempting question, who owns the vector index, is the wrong shape; the useful question asks which property of it each team owns. Data engineering may own what enters the index, AI engineering the relevance threshold, security the access constraints, platform latency and backups, application how context is shown, and product whether the result is good enough.",
              "### Governance moves to runtime\n\nWarehouse governance focuses on data at rest. AI-native systems add harder questions: was the user allowed to retrieve this exact chunk, which document version and embedding model produced it, which model received it, and is there enough evidence for an audit? A permission model that works in a warehouse can fail once text is extracted and chunked; if access labels do not travel into chunk metadata, retrieval cannot enforce them. The starter checklist covers access control, lineage, classification, evaluation, human accountability and change management. Upgrading the embedding model is a governance event, not a routine dependency bump.",
              "### The Northstar case\n\nThe case study puts a support copilot under load: 1.8 million product pages, 42 million tickets, daily policy updates, 9,000 agents, 120 million customers, PII restrictions and a response target under three seconds. A prompt-only prototype looked plausible until security found wholesale playbooks leaking into retail-agent answers. A first embedding batch of 42 million chunks had no refresh cadence or coverage report. The exhibits compare three paths: prompt-only, narrow RAG, and narrow RAG with identity filtering and audit logging.",
              "### Reading the exhibits\n\nGrounded answers rise from 54 percent to 88 percent with governed RAG; citations from 18 to 92 percent; restricted-content leakage from 3.1 percent to zero. The cost is latency, with p95 moving from 780 ms to 1,920 ms, and monthly infrastructure from $9.5k to $24.6k. Source tables had named owners, but chunks, embeddings, the vector index, prompt templates and inference logs did not. The best decision is the governed option with constrained scope; if budget is cut, remove broad feature ambition, not the retrieval foundation.",
              "### Lab and assessment\n\nThe lab builds two retrieval pipelines over the same normalised corpus, a legacy keyword baseline and a redesigned embedding flow, then compares relevance and reports mean and p95 latency. A readiness score can be reweighted to prioritise freshness over serving latency, and a Random Forest baseline is compared with Logistic Regression on F1 and p95 before choosing what to deploy. The module quiz tests the definition, the missing retrieval layer, the chunk to embed to index to retrieve sequence, runtime governance, starting path, ownership and why RAG fits fresh policies better than fine-tuning.",
            ],
          },
          {
            slug: "ai-fundamentals-and-stack-components-for-data-engineers",
            title: "AI Fundamentals and Stack Components for Data Engineers",
            hours: 3,
            summary: "The AI stack from a data engineering seat: AI, machine learning, deep learning, generative AI and LLMs, and the components around them.",
            mustMasterSkills: [
              { skill: "Use the vocabulary precisely", outcome: "Explain data drift, embedding drift, retrieval drift, leakage, provenance and lineage in a design discussion." },
              { skill: "Build a retrievable corpus", outcome: "Chunk documents into answer-sized passages and attach metadata that supports filtering, freshness and citation." },
              { skill: "Choose a retrieval strategy", outcome: "Decide between keyword, vector and hybrid search with recall, latency and governance evidence." },
              { skill: "Design a RAG pipeline", outcome: "Move from source systems to authorized context, model input, cited answer and fallback without losing ownership boundaries." },
              { skill: "Write model input contracts", outcome: "Assemble typed payloads with stable fields, permission metadata and an explicit abstain path." },
              { skill: "Diagnose failures by layer", outcome: "Separate model problems from indexing, metadata, freshness and permission problems using traces and benchmarks." },
              { skill: "Govern retrieval at query time", outcome: "Prove that role, tenant and purpose filters were applied before the model saw the context." },
            ],
            mentalLocks: [
              { title: "Vocabulary is a precision tool", lines: [
                "Drift, leakage, provenance and lineage name different failures.",
                "Loose language hides the layer that is broken.",
              ] },
              { title: "A retrievable corpus is designed", lines: [
                "Chunk into answer-sized passages with metadata that supports filters and citations.",
                "Whole-document blobs blur topics and weaken citation quality.",
              ] },
              { title: "Retrieval strategy is an evidence decision", lines: [
                "Keyword, vector and hybrid search trade exact codes against semantic reach.",
                "Defend the choice with recall, latency and governance evidence.",
              ] },
              { title: "RAG is a pipeline with owners", lines: [
                "Sources, retrieval, prompts and answers stay connected by evidence.",
                "Abstain is a designed output, not an accident.",
              ] },
              { title: "Diagnose by layer", lines: [
                "Separate model, index, metadata, freshness and permission failures.",
                "Use traces and benchmarks, not guesses.",
              ] },
            ],
            completed: "Module 3 of 9",
            breakdown: [
            {
              group: "Core AI vocabulary",
              items: [
                {
                  name: "AI",
                  role: "The broad umbrella for reasoning-like, perception-like, classification, generation and decision-support systems; useful but too vague on its own.",
                },
                {
                  name: "Machine learning",
                  role: "Systems that learn patterns from data rather than relying only on fixed rules; the question is which training data shaped the behaviour.",
                },
                {
                  name: "Deep learning",
                  role: "Machine learning built on multi-layer neural networks, usually at larger compute and data scale.",
                },
                {
                  name: "Generative AI",
                  role: "Systems that produce new content, shifting the engineering question to prompt, source context, output quality and downstream safety.",
                },
                {
                  name: "Large language model",
                  role: "A language-focused deep learning model trained on large text or code corpora, working with tokens and context windows during inference.",
                },
                {
                  name: "Prediction versus generation",
                  role: "A predictive model returns a score, class, forecast or recommendation; a generative model produces language, summaries or drafted responses.",
                },
                {
                  name: "Training versus inference",
                  role: "Training shapes behaviour from historical data; inference consumes live context, policy and user prompts at request time.",
                },
              ],
            },
            {
              group: "Anatomy of an LLM request",
              items: [
                {
                  name: "User text",
                  role: "The question itself, whose wording shapes retrieval, instructions and the style of the final answer.",
                },
                {
                  name: "Retrieved passages",
                  role: "Approved chunks fetched at inference time that supply the evidence the model may use.",
                },
                {
                  name: "Structured business attributes",
                  role: "Identifiers, store or employee context and other typed facts that constrain the answer.",
                },
                {
                  name: "System instructions",
                  role: "Rules such as answer only from the provided context, applied before generation.",
                },
                {
                  name: "Conversation history",
                  role: "Prior turns that change what a follow-up question means.",
                },
                {
                  name: "Tool or API results",
                  role: "Live data returned by calls made during the request.",
                },
                {
                  name: "Security context",
                  role: "Role, region and access scope that decide which content is eligible to enter the prompt.",
                },
              ],
            },
            {
              group: "Embeddings and vector search",
              items: [
                {
                  name: "Embedding",
                  role: "A model-generated representation of a piece of content; text with similar meaning should land near each other in vector space.",
                },
                {
                  name: "Vector",
                  role: "The array of numbers actually stored and compared, often hundreds or thousands of dimensions.",
                },
                {
                  name: "Cosine similarity",
                  role: "Compares the direction of two vectors more than their raw magnitude, so semantic alignment drives the score.",
                },
                {
                  name: "Nearest-neighbour search",
                  role: "Finds stored vectors closest to a query vector; vector indexes make this fast enough for interactive use.",
                },
                {
                  name: "Indexing side",
                  role: "Content is extracted, cleaned, chunked, embedded and stored, with freshness, lineage, deduplication and access labels as the concerns.",
                },
                {
                  name: "Query side",
                  role: "The query is embedded, compared, filtered, ranked and returned, with latency, permissions and observability as the concerns.",
                },
                {
                  name: "Production failure modes",
                  role: "Old vectors left after a model change, updated documents not reindexed, missing filters, bad chunk sizes and plausible but outdated passages ranking too high.",
                },
              ],
            },
            {
              group: "Vector databases and retrieval strategy",
              items: [
                {
                  name: "Approved corpus",
                  role: "Retrieval starts from documents with owners, dates and status; a vector index cannot rescue an incomplete or untrusted corpus.",
                },
                {
                  name: "Chunking",
                  role: "Split into retrieval-sized sections, around 450 tokens in the Riverbend example, preserving meaning and avoiding mixed instructions.",
                },
                {
                  name: "Keyword search",
                  role: "Fast and precise for known titles, codes and exact compliance language where query wording overlaps the document.",
                },
                {
                  name: "Similarity search",
                  role: "Matches by meaning, so post-hospital check-ins can find content labelled transitional care follow-up.",
                },
                {
                  name: "Hybrid retrieval",
                  role: "Adds keyword signals for exact identifiers, abbreviations and codes, at the cost of tuning lexical, vector, filter and re-rank interactions.",
                },
                {
                  name: "Re-ranking",
                  role: "Reorders top candidates by freshness, source authority or phrase overlap, often improving seen quality more than index changes.",
                },
                {
                  name: "Metadata filters",
                  role: "Region, owner, effective date and permissions decide what is eligible to be retrieved; the vector carries meaning, metadata carries control.",
                },
              ],
            },
            {
              group: "RAG and the AI stack",
              items: [
                {
                  name: "RAG versus fine-tuning",
                  role: "Fine-tuning bakes patterns into behaviour but cannot supply live document lookup or row-level access control; RAG fetches authorised passages at inference time.",
                },
                {
                  name: "Query-to-answer flow",
                  role: "Question becomes an embedding, the index returns candidates with filters, the best passages are packed with instructions, and the LLM returns a cited answer.",
                },
                {
                  name: "Middle-layer tasks",
                  role: "Chunk into answer-sized passages, tag metadata, filter unauthorised material first, rank, and assemble enough context without overflowing the window.",
                },
                {
                  name: "Source layer",
                  role: "Documents, tickets, portal pages and policy tables; if these are stale or poorly structured, every higher layer inherits the weakness.",
                },
                {
                  name: "Pipeline layer",
                  role: "Ingestion, cleaning, normalisation, chunking, tagging, validation and publication of trustworthy inputs.",
                },
                {
                  name: "Retrieval layer",
                  role: "Embeddings, the vector index, similarity search and metadata filtering.",
                },
                {
                  name: "Application layer",
                  role: "User requests, orchestration of retrieval and model calls, and the served response.",
                },
                {
                  name: "Ownership split",
                  role: "Data engineering owns freshness, chunking, metadata and index reliability; evaluation, prompts, access rules and incidents are shared.",
                },
              ],
            },
            {
              group: "Preparing model inputs",
              items: [
                {
                  name: "AI-ready store",
                  role: "Behaves like a dispatch centre: it knows what each item is, where it came from, how recent it is, who may access it and which system may consume it.",
                },
                {
                  name: "Stable identifiers",
                  role: "Generated responses and audit logs must be able to point back to source records.",
                },
                {
                  name: "Freshness tracking",
                  role: "Retrieval quality depends on whether indexed content reflects the current state.",
                },
                {
                  name: "Lineage and versioning",
                  role: "Teams must trace which source version produced which input or embedding.",
                },
                {
                  name: "Permission mapping",
                  role: "Interfaces must not expose content a user could not access elsewhere.",
                },
                {
                  name: "Structured data",
                  role: "Start from rows, types, keys and constraints; select fields, standardise dates and units, join reference data and apply row or column controls.",
                },
                {
                  name: "Unstructured data",
                  role: "PDFs and documents need extraction cleanup, section-aware chunking and metadata before they are retrievable.",
                },
                {
                  name: "Serving interface",
                  role: "A prompt, retrieved passages, a feature row, an image or a JSON contract assembled under tight latency, privacy and correctness limits.",
                },
                {
                  name: "Field minimisation",
                  role: "Minimise fields before model use, mask sensitive values, route sensitive workloads to approved endpoints, enforce tenant isolation and apply retention limits.",
                },
              ],
            },
            {
              group: "Labs and case study",
              items: [
                {
                  name: "Embedding model comparison",
                  role: "PCA and NMF embeddings on the digits dataset, scored with Hit@K and MRR and inspected with PCA and t-SNE projections.",
                },
                {
                  name: "Keyword to vector migration",
                  role: "A CountVectorizer keyword baseline compared with TF-IDF vectors, a cosine nearest-neighbour index and TruncatedSVD visualisation.",
                },
                {
                  name: "Northstar open enrollment",
                  role: "A benefits assistant answered an hourly employee using a draft executive PPO document, eight days before open enrollment.",
                },
                {
                  name: "Prototype exhibits",
                  role: "Recall@5 rose from 0.42 to 0.81, answer accuracy from 58 to 87 percent, citations from 12 to 96 percent, with p95 at 3.2 seconds and three cross-role leaks without metadata.",
                },
                {
                  name: "Decision",
                  role: "Ship governed RAG, keep HR tickets for evaluation rather than a pre-launch fine-tune, and treat retrieval preparation as a product feature.",
                },
              ],
            },
            {
              group: "Lifecycle and request terms",
              items: [
                {
                  name: "Training",
                  role: "Data shapes behaviour by adjusting internal values; biased, duplicated, outdated or unconsented training data echoes later in production.",
                },
                {
                  name: "Parameters",
                  role: "Internal numeric values learned during training, managed indirectly through dataset versions, evaluation sets, approvals, deployment history and monitoring.",
                },
                {
                  name: "Inference",
                  role: "The moment a trained model is used: a request arrives, inputs are assembled, the model runs and an output appears.",
                },
                {
                  name: "Prediction and completion",
                  role: "Classical ML calls the output a prediction; generative systems say response, generation or completion. The engineering question is the same: what came out and can you trace why.",
                },
                {
                  name: "Token",
                  role: "A chunk of text such as a word, subword, punctuation or symbol; token counts drive both limits and cost.",
                },
                {
                  name: "Context window",
                  role: "Working-memory budget for one request, shared by system instructions, user input, retrieved documents, examples, history and the model's own output.",
                },
                {
                  name: "Prompt",
                  role: "Not just what the user typed, but a production bundle of instructions and evidence that needs versioning, testing and monitoring.",
                },
                {
                  name: "Completion",
                  role: "The generated continuation or answer returned by the model.",
                },
              ],
            },
            {
              group: "Operational vocabulary",
              items: [
                {
                  name: "Source data",
                  role: "Original warehouse tables, exports, tickets, PDFs, docs, transcripts, repos and event streams with their original permissions and quality issues.",
                },
                {
                  name: "Prepared corpus",
                  role: "Source data made usable for AI through cleaning, chunking, deduplication, normalisation, redaction, metadata extraction and policy filtering.",
                },
                {
                  name: "Metadata and lineage",
                  role: "Owner, region, language, version, timestamp, classification and retention class; lineage traces where data came from and what downstream artifact it produced.",
                },
                {
                  name: "Data quality for AI",
                  role: "Usual completeness, accuracy, consistency, validity and timeliness, plus chunk usefulness, duplicates, conflicting sources, sensitive text and retrieval relevance.",
                },
                {
                  name: "Serving interface",
                  role: "The API endpoint, gateway, batch job or orchestration service through which the application calls AI services.",
                },
                {
                  name: "Latency",
                  role: "Total response time across retrieval, prompt building, model calls and formatting, not just the model call.",
                },
                {
                  name: "Freshness",
                  role: "How current the data must be, and whether the answer is based on outdated content.",
                },
                {
                  name: "Access control",
                  role: "Permissions that must follow data into indexes and prompts, not just protect the original source.",
                },
                {
                  name: "Observability",
                  role: "Logs, traces, metrics, evaluation results, token counts, model versions and retrieval diagnostics available when something goes wrong.",
                },
              ],
            },
            {
              group: "Retrieval strategies",
              items: [
                {
                  name: "Keyword search",
                  role: "Exact token overlap, deterministic and fast for SKUs, error codes and policy titles; misses synonyms.",
                },
                {
                  name: "Semantic search",
                  role: "Ranked retrieval by vector closeness, bridging vocabulary gaps when phrasing varies.",
                },
                {
                  name: "Hybrid retrieval",
                  role: "Lexical plus dense signals so exact codes survive while conceptual recall is preserved.",
                },
                {
                  name: "Re-ranker",
                  role: "Secondary scoring on top candidates using freshness, authority or phrase overlap.",
                },
                {
                  name: "Cosine similarity",
                  role: "Direction-based vector similarity, measured as A dot B over the product of norms.",
                },
                {
                  name: "kNN and ANN",
                  role: "Exact nearest-neighbour search and its approximate, lower-latency counterpart at scale.",
                },
                {
                  name: "Vector database",
                  role: "Stores vectors with metadata so semantic lookup can combine with attribute filters.",
                },
                {
                  name: "Upsert versus append",
                  role: "Overwrite deterministic chunk_ids on update instead of inserting duplicates that crowd top-k.",
                },
              ],
            },
            {
              group: "Evaluation and benchmarking",
              items: [
                {
                  name: "Hit@K",
                  role: "Fraction of queries with at least one relevant item in the top K results.",
                },
                {
                  name: "Mean Reciprocal Rank",
                  role: "Ranking metric that scores 1 divided by the position of the first correct match.",
                },
                {
                  name: "Recall@5",
                  role: "Retrieval recall measured on the Northstar 50-query evaluation set.",
                },
                {
                  name: "p95 latency",
                  role: "Response time at the 95th percentile, measured against the 4.0s SLA.",
                },
                {
                  name: "Citation present",
                  role: "Share of answers carrying a source citation, used as an audibility signal.",
                },
              ],
            },
            {
              group: "RAG and serving",
              items: [
                {
                  name: "Retrieval-Augmented Generation",
                  role: "Fetches authorized current passages at query time and grounds the answer in that evidence.",
                },
                {
                  name: "Fine-tuning",
                  role: "Adjusts model weights for tone or task behavior; cannot enforce live freshness or row-level access.",
                },
                {
                  name: "Context assembly",
                  role: "Selects and orders authorized passages inside the token budget with grounding instructions and citations.",
                },
                {
                  name: "Abstain path",
                  role: "Fallback that refuses to answer when retrieval confidence is low or sources conflict.",
                },
                {
                  name: "AI-ready store",
                  role: "Tracks identifiers, freshness, lineage and permissions rather than passively holding files.",
                },
                {
                  name: "Schema drift",
                  role: "Structural changes in nested data that break attribute extraction and metadata filters.",
                },
                {
                  name: "Attribution",
                  role: "Carrying document_id, section_title, effective_date and source_url through to the UI.",
                },
                {
                  name: "Serving interface contract",
                  role: "Input and output schemas, latency SLAs, access rules, redaction, logging and fallbacks.",
                },
              ],
            },
            {
              group: "Dimensionality reduction lab",
              items: [
                {
                  name: "PCA",
                  role: "Linear compression onto orthogonal axes, fast and deterministic for inference.",
                },
                {
                  name: "NMF",
                  role: "Additive parts-based decomposition requiring non-negative inputs and MinMaxScaler.",
                },
                {
                  name: "t-SNE",
                  role: "Non-linear 2D neighbourhood projection, too slow for live inference.",
                },
                {
                  name: "TruncatedSVD",
                  role: "Compresses sparse TF-IDF matrices into dense vectors, tuned with n_components.",
                },
                {
                  name: "StandardScaler",
                  role: "Zero-mean unit-variance scaling used before PCA.",
                },
                {
                  name: "MinMaxScaler",
                  role: "Bounds values to zero and one for NMF, which cannot accept negatives.",
                },
              ],
            },
            {
              group: "Case study decisions",
              items: [
                {
                  name: "Governed RAG",
                  role: "Chunked embeddings plus metadata filters, the chosen Northstar architecture.",
                },
                {
                  name: "Section-aware chunking",
                  role: "450 to 650 token sections with roughly 15% overlap for answerable retrieval units.",
                },
                {
                  name: "Cross-role leak",
                  role: "A user receiving answers from documents outside their access tier or status.",
                },
                {
                  name: "Templated retrieval unit",
                  role: "Structured rows rewritten as human-readable text with source keys and tags.",
                },
                {
                  name: "document_status",
                  role: "Published versus draft state that must be filtered alongside role and region.",
                },
              ],
            },
            {
              group: "Indexing side controls",
              items: [
                {
                  name: "Freshness",
                  role: "CDC and event triggers with deterministic upsert and delete, monitored by source_updated_at and indexed_at.",
                },
                {
                  name: "Lineage",
                  role: "Deterministic chunk IDs and versioned payload metadata that trace an answer to source, chunking strategy and embedding model.",
                },
                {
                  name: "Deduplication",
                  role: "Pre-embedding SHA-256 content hashing plus MinHash and LSH for near-duplicates.",
                },
                {
                  name: "Schema consistency",
                  role: "Pydantic or Great Expectations contracts with a quarantine queue for failed chunks.",
                },
                {
                  name: "Access labels",
                  role: "Source ACL extraction flattened into chunk metadata arrays with metadata-only permission sync.",
                },
              ],
            },
            {
              group: "Query side controls",
              items: [
                {
                  name: "ANN indexing",
                  role: "HNSW or IVF indexes trading a fraction of recall for millisecond search.",
                },
                {
                  name: "Query caching",
                  role: "Redis caching of frequent query embeddings or verified answers to bypass repeat work.",
                },
                {
                  name: "Pre-filtering",
                  role: "Mandatory tenant and role filters injected inside the vector search, never applied after top-K.",
                },
                {
                  name: "Reranking",
                  role: "Cross-Encoder reranking of 20 to 50 candidates down to the best three to five chunks.",
                },
                {
                  name: "Similarity threshold",
                  role: "Minimum cosine cutoff that returns empty context when no chunk clears the bar.",
                },
                {
                  name: "Distributed tracing",
                  role: "trace_id with per-step latency and retrieval telemetry for every live request.",
                },
                {
                  name: "Safe retrieval",
                  role: "Input guardrails, citation enforcement and Presidio scanning before external LLM calls.",
                },
              ],
            },
            {
              group: "Vector record fields",
              items: [
                {
                  name: "chunk_id",
                  role: "Stable identifier derived from the source document and chunk position.",
                },
                {
                  name: "source_document_id",
                  role: "Identifier of the document the chunk came from.",
                },
                {
                  name: "source_version",
                  role: "Version of the source used when the vector was produced.",
                },
                {
                  name: "embedding_model",
                  role: "Model name and version that generated the vector.",
                },
                {
                  name: "embedded_at",
                  role: "Timestamp of embedding generation, used with source update time to measure lag.",
                },
                {
                  name: "last_source_updated_at",
                  role: "Timestamp of the last source change, used for staleness checks.",
                },
                {
                  name: "access_label",
                  role: "Visibility classification enforced by query-time filters.",
                },
                {
                  name: "content_hash",
                  role: "Hash of the normalized text, used to skip duplicate embedding work.",
                },
              ],
            },
            {
              group: "Riverbend retrieval case",
              items: [
                {
                  name: "Corpus scale",
                  role: "Roughly 120,000 clinical policies, 38,000 support articles and 9,000 insurance rules plus thousands of daily updates.",
                },
                {
                  name: "Care coordinators",
                  role: "2,800 users asking natural-language questions such as discharge follow-up requirements.",
                },
                {
                  name: "Three-second SLA",
                  role: "Results must arrive in under 3 seconds while staying current and access-controlled.",
                },
                {
                  name: "Approved corpus",
                  role: "Sources carry owners, dates and status before any chunking or embedding begins.",
                },
                {
                  name: "450-token chunks",
                  role: "Retrieval-sized sections that preserve meaning and keep instructions from mixing.",
                },
                {
                  name: "Compatible encoders",
                  role: "Queries and chunks must share preprocessing and an approved encoder such as OpenAI Embeddings.",
                },
                {
                  name: "Query-time filters",
                  role: "Region, approval status, effective date and user permissions enforced during search.",
                },
                {
                  name: "Hybrid routing",
                  role: "Vector search for loose care guidance, hybrid retrieval for exact policy and insurance codes.",
                },
              ],
            },
            {
              group: "Northstar benefits RAG",
              items: [
                {
                  name: "Benefits assistant",
                  role: "Internal HR help system answering benefits questions from current company content with grounded responses.",
                },
                {
                  name: "Policy corpus",
                  role: "Hundreds of frequently revised policy documents plus noisy HR tickets and weekly portal pages.",
                },
                {
                  name: "Spouse eligibility",
                  role: "Example enrollment-change question that starts the query to answer flow.",
                },
                {
                  name: "Union and manager filters",
                  role: "Restricted content must be filtered before the model sees any context.",
                },
                {
                  name: "90-page handbook",
                  role: "Too large to embed as one blob, so answer-sized chunks are required.",
                },
                {
                  name: "Chunk metadata",
                  role: "State, employee type, effective date, source URL and access group for filtering and lineage.",
                },
                {
                  name: "Shared ownership",
                  role: "Evaluation, prompt policy, access rules and incident review are cross-functional.",
                },
              ],
            },
            {
              group: "Prepared inputs and serving contracts",
              items: [
                {
                  name: "AI-ready store",
                  role: "Knows what an item is, where it came from, how recent it is and who can consume it.",
                },
                {
                  name: "Structured fields",
                  role: "account_age_days, transaction_count_30d and risk_tier for a fraud classifier.",
                },
                {
                  name: "Schema drift",
                  role: "Nested JSON shapes move, so validate versions and retain the raw payload.",
                },
                {
                  name: "Chunking risk",
                  role: "An exception without its policy, or a procedure without its product version.",
                },
                {
                  name: "Task-specific input",
                  role: "Classification, generation, semantic search and RAG each need a different package.",
                },
                {
                  name: "Abstain path",
                  role: "Thresholds and source priorities decide when to say there is not enough supported information.",
                },
                {
                  name: "Interface contract",
                  role: "Input schema, output schema, latency, access control, attribution and fallback.",
                },
                {
                  name: "Attribution",
                  role: "Reliability infrastructure for debugging, auditing and trust.",
                },
              ],
            },
            {
              group: "Northstar launch case",
              items: [
                {
                  name: "Sep 23 war room",
                  role: "Draft executive policy answered an hourly employee question eight days before open enrollment.",
                },
                {
                  name: "18 percent target",
                  role: "HR promised an 18 percent cut in benefits tickets during the busiest two weeks.",
                },
                {
                  name: "4-second SLA",
                  role: "The architecture decision had to preserve role controls and weekly policy freshness.",
                },
                {
                  name: "Recall@5 gap",
                  role: "0.42 for keyword plus prompt versus 0.81 for RAG with metadata filters.",
                },
                {
                  name: "Three leaks",
                  role: "Disabling metadata filters produced three unauthorized leaks in 200 red-team sessions.",
                },
                {
                  name: "312 policy PDFs",
                  role: "Full-document embedding blurred topics and collapsed tables during extraction.",
                },
                {
                  name: "92,000 HR tickets",
                  role: "Useful language patterns, but kept for evaluation instead of raw retrieval.",
                },
                {
                  name: "18 eligibility tables",
                  role: "Loaded nightly but not packaged as governed retrieval fragments.",
                },
                {
                  name: "Option 3",
                  role: "Ship chunked RAG with embeddings and metadata filters, and defer fine-tuning.",
                },
              ],
            },
            ],
            notes: [
              "### Important sentences to remember\n\n> For AI workloads, \"available\" is not the same as usable.\n> Metadata is not decoration. It is retrieval control, security control, and audit evidence at the same time.\n> Bad chunking produces context that is technically retrieved but practically useless.\n> A classifier, a search system, and a retrieval-augmented assistant need different inputs because they are solving different problems.\n> That is not failure. That is system integrity.\n> Tip: design the abstain path early. Thresholds, deduplication, ranking rules, and source priorities are part of input construction, not afterthoughts.\n> If the answer must be current, cited, and access-controlled, treat retrieval and preparation as first-class product features, not preprocessing trivia.\n> Loaded data is not the same as AI-usable data.\n> Chunking into 450-650 token sections with overlap lets similarity search retrieve the exact deductible, deadline, or password-reset step, which improves both recall and citation quality.\n> In this case, retrieval quality and governance are product requirements, not optional enhancements.\n> Access control must happen before content enters retrieval results, prompts, generation inputs, or logs.\n> Attribution is often sold as a user feature, but it is really reliability infrastructure.\n> The work is not finished when data lands in storage. It is finished when the right user gets the right response, for the right reason, with the right evidence behind it.",
              "## 01 / Module frame",
              "### Module 3 at a glance\n\nThe module separates two jobs that are often confused. Training and preparation build governed corpora and versioned embeddings offline. Inference and runtime retrieval assemble prompts, permissions and semantic context dynamically under strict latency budgets. The dominant failure is blaming the LLM for a data engineering fault: stale vectors after an embedding model swap, missing metadata access filters, or a truncated context window. The core trade-off runs through every lab: higher dimensionality and non-linear projection capture finer structure, while lower dimensionality and linear compression reduce memory and retrieval latency.",
              "## 02 / Sub-module 1: terminology and embeddings",
              "### Sub-module 1: the three-bullet takeaway\n\nCore architecture pattern: separate training and preparation, where governed corpora and versioned embeddings are built offline, from inference and runtime retrieval, where prompts, permissions and semantic context are assembled dynamically under strict latency budgets.\n\nNumber one failure mode: blaming the LLM for bad outputs when the root cause is upstream, such as stale vectors after an embedding model swap, missing metadata access filters, or truncated context windows.\n\nKey engineering trade-off: higher embedding dimensions and non-linear projections such as t-SNE capture finer structure, whereas lower dimensions and linear compression such as PCA reduce memory footprint and production retrieval latency.",
              "### Unified glossary: nested AI categories\n\n| Category | Core mechanism or output | Question for data engineers |\n| --- | --- | --- |\n| AI (umbrella) | Reasoning, perception, or generation | What data does it consume, produce, and expose? |\n| Machine learning | Learns patterns from data, producing scores, forecasts, classes | What historical training data and features shaped behavior? |\n| Deep learning | Multi-layer neural networks at high scale | What compute and data preparation constraints exist? |\n| Generative AI | Produces new artifacts such as text, code, images | How will output be evaluated for accuracy and safety? |\n| LLM | Predicts text or code token continuations from a context window | What governed context enters the model at request time? |\n\nArtificial intelligence is the broad umbrella covering reasoning-like, perception-like, classification, generation and decision-support tasks. Machine learning learns patterns from historical data instead of hand-coded rules. Deep learning uses multi-layer neural networks at high scale. Generative AI produces new content rather than scoring existing records. An LLM is a deep learning model trained on massive text and code corpora to process token sequences and generate continuations during inference.",
              "### Unified glossary: model lifecycle and runtime mechanics\n\nTraining is the offline stage where data shapes model behavior by adjusting internal numeric parameters, called weights. Inference is the live runtime moment when a trained model receives assembled inputs and produces an output, called a prediction in classical ML or a response, generation or completion in generative AI.\n\nTokens are chunks of text (words, subwords, punctuation, symbols) that LLMs read and generate. Token counts directly govern context limits, latency and API costs. The context window is the working-memory token budget for a single request. System instructions, the user prompt, retrieved documents, conversation history and generated output all compete for that space.\n\nA prompt in production is not just user text. It is a structured bundle of system instructions, user query, retrieved evidence, conversation history, tool results and security context. That makes it a production artifact to version and test, not a throwaway string.",
              "### Unified glossary: data supply chain and vector retrieval\n\nA prepared corpus is raw operational data (tables, tickets, PDFs, transcripts) engineered for AI through cleaning, chunking, deduplication, normalization, redaction and metadata tagging.\n\nAI-specific lineage answers five questions end to end: which document chunk supported the answer, which transformation created it, which embedding model vectorized it, which index version was queried, and which permissions applied.\n\nAn embedding is a machine-readable numeric representation of content, stored as a vector so mathematically nearby items share semantic meaning. Similarity search finds nearby vectors using measures such as cosine similarity. A vector database stores vectors alongside metadata to combine semantic lookup with strict attribute filtering. Retrieval-Augmented Generation (RAG) retrieves approved, relevant context at runtime and injects it into the prompt so answers are grounded in enterprise evidence.",
              "### Unified glossary: evaluation and production operations\n\nHit@K, also called Recall@K, measures the fraction of queries where at least one correct or relevant item appears within the top K retrieved results. Mean Reciprocal Rank (MRR) rewards a retrieval model for placing the first correct match higher in the ranked list, scoring 1 divided by rank.\n\nFreshness is how current data and embeddings must be to match operational reality. Latency is total end-to-end response time across retrieval, prompt construction, model inference and output formatting. Both are system properties, not model properties, and both are measured at the boundary the user experiences.",
              "### Embedding and dimensionality reduction benchmark\n\n| Technique | Mathematical approach | Strengths | Limitations and trade-offs |\n| --- | --- | --- | --- |\n| PCA (Principal Component Analysis) | Linear compression onto orthogonal axes | Fast, lightweight in memory, deterministic for production inference | Can lose complex non-linear neighborhood structure |\n| NMF (Non-Negative Matrix Factorization) | Additive, parts-based decomposition, requires non-negative inputs | Higher interpretability in certain domains | Slower convergence (max_iter), requires MinMaxScaler, more tuning |\n| t-SNE (t-Distributed Stochastic Neighbor Embedding) | Non-linear neighborhood projection | Reveals local clusters and class separation clearly in 2D plots | Computationally slow, not suitable for live production inference |\n\nModel selection heuristic: start with the candidate yielding the highest MRR, verify cluster separation visually with PCA or t-SNE, then pick the lowest dimensionality (n_components) that meets accuracy targets to save RAM and latency.",
              "### Operational production controls\n\n| Pillar | Definition | Critical failure question |\n| --- | --- | --- |\n| Serving interface | API endpoint, gateway, batch job, or orchestration service | Which layer actually handled and routed the request? |\n| Latency | Total time across retrieval, prompt assembly, inference, formatting | Where is the delay bottleneck: retrieval, model, or formatting? |\n| Freshness | Currency of source records and vector indexes | Is the assistant answering from outdated content or stale vectors? |\n| Access control | Permission enforcement across indexes and prompts | Did restricted content leak into retrieval or LLM output? |\n| Observability | Logs, traces, token counts, model versions, retrieval scores | Do we have enough traces to explain and audit the answer? |",
              "### Sub-module 1 failure modes and best practices\n\nBI-ready is not AI-ready. Dashboard tables do not automatically work for AI; conflicting supplier codes, drifting timestamps or unredacted PII create silent noise and compliance risk.\n\nNever leave old vectors after an embedding swap. Changing models changes vector geometry, and old vectors left in the index silently corrupt similarity search.\n\nProtect the context window from overpacking. Too many retrieved chunks or a long chat history cause silent truncation that can drop safety rules or policy exceptions.\n\nVersion prompts and context like code. Prompts and retrieval configs are production artifacts, monitored like dbt models or SQL transforms.\n\nRun schema and null quality gates before embedding. Validate expected feature dimensions, numeric data types and zero-null assumptions in CI/CD before generating embeddings.",
              "### Lab cookbook: embedding comparison imports\n\n```python\nimport numpy as np                                        # Numerical array operations, indexing, and metric averaging\nimport pandas as pd                                       # Tabular DataFrames for schema validation and leaderboard formatting\nimport matplotlib.pyplot as plt                           # Plotting library for rendering 2D PCA and t-SNE scatter plots\nfrom sklearn.datasets import load_digits                  # Loads the benchmark 1,797-sample, 64-feature handwritten digits corpus\nfrom sklearn.model_selection import train_test_split      # Splits data into stratified train (index) and test (query) sets\nfrom sklearn.preprocessing import StandardScaler, MinMaxScaler # Scales features (zero-mean/unit-variance for PCA; [0,1] non-negative for NMF)\nfrom sklearn.decomposition import PCA, NMF                # Linear (PCA) and non-negative parts-based (NMF) embedding models\nfrom sklearn.manifold import TSNE                         # Non-linear dimensionality reduction for 2D cluster visualization\nfrom sklearn.metrics.pairwise import cosine_similarity    # Computes pairwise cosine similarity scores between query and index vectors\n```",
              "### Lab cookbook: data quality and schema gate\n\n```python\ntotal_null_values = int(X_df.isnull().sum().sum())\nexpected_feature_count = 64\nall_numeric_features = all(np.issubdtype(dtype, np.number) for dtype in X_df.dtypes)\nschema_is_valid = (X_df.shape[1] == expected_feature_count) and all_numeric_features\n```\n\nThis is an automated pre-embedding data contract check. It verifies zero missing values and confirms all 64 columns are strictly numeric before vectorization.",
              "### Lab cookbook: building and scaling embedding spaces\n\n```python\ndef build_embedding_spaces(X_train_raw, X_test_raw, n_components=32):\n    # 1. Standardize for PCA (fit ONLY on train to prevent data leakage)\n    standard_scaler = StandardScaler()\n    X_train_standardized = standard_scaler.fit_transform(X_train_raw)\n    X_test_standardized = standard_scaler.transform(X_test_raw)\n\n    pca_model = PCA(n_components=n_components, random_state=RANDOM_STATE)\n    X_train_pca = pca_model.fit_transform(X_train_standardized)\n    X_test_pca = pca_model.transform(X_test_standardized)\n\n    # 2. MinMax scale to [0, 1] because NMF mathematically requires non-negative inputs\n    minmax_scaler = MinMaxScaler()\n    X_train_non_negative = minmax_scaler.fit_transform(X_train_raw)\n    X_test_non_negative = minmax_scaler.transform(X_test_raw)\n\n    nmf_model = NMF(n_components=n_components, init=\"nndsvda\", max_iter=500, random_state=RANDOM_STATE)\n    X_train_nmf = nmf_model.fit_transform(X_train_non_negative)\n    X_test_nmf = nmf_model.transform(X_test_non_negative)\n```\n\n`fit_transform` on X_train versus `transform` on X_test prevents test-set leakage. `n_components=32` (or 16) compresses the original 64 features to test memory and latency against accuracy. NMF fails on negative numbers, so `MinMaxScaler` bounds values to at least zero while `init=\"nndsvda\"` initializes sparse non-negative matrices cleanly.",
              "### Lab cookbook: retrieval ranking with Hit@K and MRR\n\n```python\ndef evaluate_retrieval(train_vectors, train_labels, test_vectors, test_labels, top_k=5):\n    similarity_matrix = cosine_similarity(test_vectors, train_vectors)\n    top_k_indices = np.argsort(-similarity_matrix, axis=1)[:, :top_k]\n    retrieved_labels = train_labels[top_k_indices]\n\n    hit_scores, reciprocal_ranks = [], []\n    for row_index, true_label in enumerate(test_labels):\n        candidate_labels = retrieved_labels[row_index]\n        hit_scores.append(int(true_label in candidate_labels))\n\n        matching_positions = np.where(candidate_labels == true_label)[0]\n        reciprocal_rank = 1.0 / (matching_positions[0] + 1) if matching_positions.size > 0 else 0.0\n        reciprocal_ranks.append(reciprocal_rank)\n\n    return {\"Hit@K\": float(np.mean(hit_scores)), \"MRR\": float(np.mean(reciprocal_ranks))}\n```\n\n`np.argsort(-similarity_matrix, axis=1)[:, :top_k]` negates similarity so argsort sorts descending, then slices the top k neighbors. Lowering `top_k` from 5 to 3 enforces stricter precision, often reducing Hit@K slightly while keeping MRR strong when top-1 matches are accurate.",
              "### Lab deliverables: defending a model choice\n\nThe lab produces three artifacts, not just a number. A leaderboard ranks each model on retrieval accuracy (Hit@K and MRR) beside its vector size. Paired 2D plots from PCA and t-SNE show how cleanly categories separate. A selection rationale explains the trade-off between search accuracy, memory footprint and retrieval latency.\n\nChoosing between a 32-dimension model with MRR 0.9410 and Hit@5 0.9820 and a 16-dimension model with MRR 0.9395 and Hit@5 0.9800 should favor the 16-dimension model when quality is nearly identical: half the dimensions means less RAM and faster nearest-neighbor search.",
              "### Key takeaways from the AI System Vocabulary Guide\n\nAI vocabulary is operational language that lets teams assign responsibility and debug failures precisely. Training and inference describe different stages of model behavior, and mixing them leads to bad diagnoses. Tokens, context windows, prompts and completions are real production artifacts. Source data, prepared corpus, metadata, lineage and data quality still determine reliability. Embeddings, vectors, similarity search, vector databases and RAG explain how context is retrieved. Serving interfaces, latency, freshness, access control and observability decide whether a system can be trusted in production.",
              "## 03 / Sub-module 2: embeddings and retrieval",
              "### Sub-module 2: the three-bullet takeaway\n\nEmbeddings map content into a numeric vector space so search matches semantic meaning rather than literal words, while metadata filters act as the mandatory control plane enforcing access permissions, region, freshness and lineage before or during retrieval.\n\nThe number one failure mode is treating vector similarity as a substitute for data governance. Skipping pre-retrieval filters, leaving stale vectors after a model swap or appending duplicates instead of upserting makes the system confidently return outdated or unauthorized records.\n\nPure keyword search is fast, deterministic and exact for codes and SKUs but fails on synonyms. Dense vector search generalizes across phrasing and improves recall. Hybrid retrieval with re-ranking combines both strengths at the cost of tuning complexity and latency.",
              "### Unified glossary: vector and similarity concepts\n\nAn embedding is a model-generated numeric representation of content (text, product records, tickets, images) so items with similar meaning land close together in vector space. A vector is the actual array of numbers stored and compared by the retrieval engine.\n\nCosine similarity measures the angle or direction between two vectors, `A dot B / (norm A * norm B)`, rather than raw magnitude, which makes it suitable for semantic alignment. Nearest-neighbor search finds stored vectors closest to a query vector. At millions of chunks, Approximate Nearest-Neighbor (ANN) indexes trade a small amount of recall for ultra-low query latency. A vector index or vector database (pgvector, Pinecone, Weaviate, Milvus, Snowflake) organizes vectors for fast similarity search while supporting structured metadata filtering.",
              "### Unified glossary: retrieval strategies and ranking\n\nKeyword (lexical) search checks exact token overlap. It is strong for SKUs, error codes, policy titles and legal phrases, but brittle when users phrase concepts differently. Semantic (vector) search ranks by vector closeness and excels at concept matching, such as linking \"post-hospital check-ins\" to \"transitional care follow-up\".\n\nHybrid retrieval combines lexical signals (keyword, TF-IDF, BM25) with dense vector similarity so exact codes are never missed while conceptual recall survives. A re-ranker is a secondary scoring step on top initial candidates, reordering by freshness, source authority or exact phrase overlap. Re-ranking often improves perceived quality more than index changes alone.",
              "### Unified glossary: governance, metadata and lineage\n\nThe indexing side extracts, cleans, chunks, embeds and stores vectors offline. The query side embeds the user question, applies metadata filters, ranks matches and returns results at runtime.\n\nThe metadata control plane is a set of structured attributes attached to every vector record: `source_system`, `document_type`, `last_updated_at`, `tenant_id`, `access_label`, `region`, `chunk_id`, `source_version`, `embedding_model`, `content_hash`. These attributes govern eligibility, not just display.\n\nUpsert means updating a document by overwriting its deterministic `chunk_id`. Append inserts a second copy, which lets duplicate vectors crowd the top-k results.",
              "### Retrieval strategy selection matrix\n\n| Strategy | Best use case | Strengths | Weaknesses and trade-offs |\n| --- | --- | --- | --- |\n| Keyword search | Exact SKUs, error codes, policy titles, compliance phrases | Fast, deterministic, zero embedding overhead, easy to debug | Misses synonyms, paraphrases and conceptual intent |\n| Vector-only search | Broad natural-language questions, varied phrasing | Bridges vocabulary gaps, returns ranked candidates with zero word overlap | Can miss exact codes and IDs, needs an embedding pipeline and drift monitoring |\n| Hybrid search with re-ranker | Regulated policies, mixed code plus intent queries | Balances lexical precision with semantic recall, boosts freshness and authority | Higher tuning complexity: weights, filters, re-ranker latency |",
              "### Indexing side versus query side\n\n| Pipeline side | Cadence | Core operations | Primary data engineering concerns |\n| --- | --- | --- | --- |\n| Indexing side | Batch or event-driven, offline | Ingest, clean and deduplicate, chunk (around 450 tokens), attach metadata, embed, upsert to index | Freshness lag, deterministic IDs, schema consistency, canonical versions |\n| Query side | Real-time inference, under 3s SLA | Embed query with the same model, apply pre-search metadata filters, ANN or hybrid search, re-rank, return or RAG | Latency, strict RBAC and tenant isolation, audit logging |",
              "### Production vector failure modes and engineering fixes\n\n| Failure mode | Symptom | Root cause | Engineering fix |\n| --- | --- | --- | --- |\n| Stale embeddings | Old policies or retired product names surface | Source updated without re-embedding affected chunks | Track `last_source_updated_at` against `embedded_at`, retire obsolete vectors |\n| Post-retrieval filtering leak | Restricted memos influence answers or ranking | Permissions applied after search instead of before or during | Enforce metadata filters (region, access_label, tenant_id) inside the index query |\n| Duplicate vectors | Top-5 results are five near-identical passages | Re-indexing appended new rows instead of overwriting | Use deterministic `chunk_ids` and `content_hash` upserts |\n| Disconnected lineage | Cannot prove where an answer came from during an audit | Missing source and version identifiers | Store `source_document_id`, `source_version`, `embedding_model` on every chunk |\n| Embedding model mismatch | Recall collapses after a model upgrade | Query and document vectors come from different models | Version indexes by `embedding_model`, re-embed the full corpus on model swap |\n| Oversized or unstructured chunks | Vague matches, missing exceptions | Giant PDFs embedded as single blocks, section headings stripped | Split into focused chunks around 450 tokens while preserving section headers |",
              "### Golden rules for production retrieval\n\nNot shown to the user is not the same as never used. Filter metadata before or during similarity search so unauthorized chunks never enter the ranker or prompt.\n\nA vector index cannot rescue a weak corpus. Enforce ingestion quality gates (null checks, deduplication, canonical versioning) before text reaches an embedding model.\n\nAuditability is the ultimate test. Every retrieved chunk must answer four questions immediately: what source produced it, which version, when it was embedded, and what permissions governed its retrieval.",
              "### Lab cookbook: keyword to vector migration imports\n\n```python\nimport pandas as pd                                         # Tabular DataFrames for corpus construction, quality profiling, and evaluation tables\nimport numpy as np                                          # Fast array indexing, quantile bucketing, and vector score sorting\nfrom sklearn.datasets import load_breast_cancer             # Loads the built-in 569-record dataset converted into pseudo-documents\nfrom sklearn.feature_extraction.text import (\n    CountVectorizer,                                        # Builds sparse binary token-presence matrices for exact keyword matching\n    TfidfVectorizer                                         # Weighs terms by frequency and rarity (TF-IDF) prior to dense compression\n)\nfrom sklearn.decomposition import TruncatedSVD, PCA         # TruncatedSVD compresses sparse TF-IDF matrices into dense embeddings; PCA projects to 2D\nfrom sklearn.neighbors import NearestNeighbors              # Builds an exact/brute-force cosine-distance index for nearest-neighbor search\nfrom sklearn.preprocessing import normalize                 # L2-normalizes dense vectors so cosine similarity behaves consistently\nimport matplotlib.pyplot as plt                             # Plots 2D PCA cluster separation between benign and malignant records\n```",
              "### Lab cookbook: pre-corpus quality gate and keyword baseline\n\n```python\nnull_counts = df.isnull().sum().sort_values(ascending=False)\nschema_snapshot = df.dtypes.astype(str)\nduplicate_rows = df.duplicated().sum()\n```\n\nThis audits null completeness, data types and exact duplicates before the search corpus is built, preventing duplicate records from skewing top-k rankings.\n\n```python\nkeyword_vectorizer = CountVectorizer(binary=True)\nX_keyword = keyword_vectorizer.fit_transform(corpus_df[\"text\"])\n\ndef keyword_retrieve(query, top_k=5):\n    q_vec = keyword_vectorizer.transform([query])\n    overlap_scores = (X_keyword.multiply(q_vec)).sum(axis=1).A1\n    ranked_idx = np.argsort(-overlap_scores)\n    non_zero_idx = ranked_idx[overlap_scores[ranked_idx] > 0][:top_k]\n    return corpus_df.iloc[non_zero_idx][[\"doc_id\", \"diagnosis\", \"text\"]].copy()\n```\n\n`binary=True` records only whether a query token exists. `overlap_scores > 0` drops documents with zero exact overlap, which is why keyword search can return fewer than top_k results when phrasing varies.",
              "### Lab cookbook: migrated dense vector retrieval\n\n```python\ntfidf_vectorizer = TfidfVectorizer()\nX_tfidf = tfidf_vectorizer.fit_transform(corpus_df[\"text\"])\n\nsvd = TruncatedSVD(n_components=12, random_state=42)\nX_dense = normalize(svd.fit_transform(X_tfidf))\n\nnn_index = NearestNeighbors(metric=\"cosine\", algorithm=\"brute\")\nnn_index.fit(X_dense)\n\ndef vector_retrieve(query, top_k=5):\n    q_tfidf = tfidf_vectorizer.transform([query])\n    q_dense = normalize(svd.transform(q_tfidf))\n    distances, indices = nn_index.kneighbors(q_dense, n_neighbors=top_k)\n    result = corpus_df.iloc[indices[0]][[\"doc_id\", \"diagnosis\", \"text\"]].copy()\n    result[\"vector_similarity\"] = 1 - distances[0]\n    return result\n```\n\n`TruncatedSVD(n_components=12)` (raised to 18 in Task 2) compresses sparse TF-IDF into dense vectors. More components preserve finer variance at the cost of memory and search latency. `normalize(...)` scales vectors to unit length so `metric=\"cosine\"` measures direction. `1 - distances[0]` converts cosine distance back to cosine similarity, where 1 means identical.",
              "## 04 / Sub-module 3: RAG and stack components",
              "### Sub-module 3: the three-bullet takeaway\n\nRAG separates the static LLM from dynamic enterprise knowledge so answers are generated at inference time from governed, freshly retrieved, permission-filtered context rather than stale parametric training memory.\n\nThe number one failure mode is treating different data shapes (structured rows, nested JSON, unstructured PDFs) or different workloads (classification, generation, semantic search, RAG) as generic plain text, or allowing restricted content into the context window before access checks occur.\n\nThe key trade-off: fine-tuning bakes static tone and task patterns into model weights but cannot enforce live document freshness or row-level access control. RAG adds runtime retrieval complexity and latency budgets in exchange for live policy accuracy, pre-retrieval authorization and source attribution.",
              "### Unified glossary: RAG, tuning and runtime flow\n\nRetrieval-Augmented Generation keeps the LLM separate from the knowledge base, fetching authorized, current passages at query time and injecting them into the prompt so the model answers strictly from verified evidence.\n\nFine-tuning adjusts weights to improve tone or task behavior but cannot provide live document lookup or row-level access control. RAG solves policy freshness and authorization dynamically at inference time.\n\nContext assembly is the middle step that selects top-ranked authorized passages, orders them within the context window without overflowing token limits, adds grounding instructions such as \"answer only from provided context\", and preserves citations. An abstain path is an intentional fallback that says \"I do not have enough supported information\" when retrieval scores fall below confidence thresholds or sources conflict.",
              "### Unified glossary: AI-ready stores and serving contracts\n\nAn AI-ready store is not a passive file cabinet or analytics table. It acts like a dispatch center, tracking stable identifiers, freshness timestamps, lineage, permissions and downstream consumption rules.\n\nSchema drift in semi-structured data means unexpected structural changes in JSON, Avro or nested logs, such as a status flag moving paths. Without schema version validation, attribute extraction and metadata filtering break silently.\n\nAttribution carries `document_id`, `section_title`, `effective_date` and `source_url` from raw ingestion to the user interface. It is reliability infrastructure for debugging and compliance, not UI polish.\n\nA serving interface contract defines required input and output schemas, latency SLAs (under 500ms for search, under 2s for streaming), access control, PII redaction, attribution, logging policies and fallback behavior for any API, search bar, copilot or batch scorer.",
              "### RAG versus fine-tuning decision matrix\n\n| Dimension | Fine-tuning (model adaptation) | RAG (retrieval-augmented generation) |\n| --- | --- | --- |\n| Where knowledge lives | Baked into model weights, parametric memory | External vector index and AI-ready stores, non-parametric |\n| Updating changing policies | Requires expensive retraining or re-adaptation | Immediate: re-embed and upsert updated chunks |\n| Row-level and user access control | Cannot dynamically enforce per-user permissions | Enforces pre-retrieval metadata filters (role, region, group) |\n| Source citations and auditability | Poor, cannot reliably cite exact source versions | High, exact `chunk_id` and `source_url` travel with the prompt |\n| Best use case | Teaching domain tone, formatting, specialized syntax | Answering over changing policies, catalogs and tickets |",
              "### Preparing different data shapes for AI\n\n| Data shape | Examples | Preparation steps | Primary failure risk |\n| --- | --- | --- | --- |\n| Structured | Warehouse tables, PostgreSQL, MySQL | Select relevant fields, standardize dates and units, translate raw codes (CUST_SEG_04 becomes enterprise customer), preserve keys and timestamps, mask sensitive columns | Exposing raw internal codes or unnecessary PII |\n| Semi-structured | JSON payloads, Avro, nested event logs | Parse nested objects, flatten filter attributes (region, active_flag), extract text fields, validate schema versions, keep raw payload for replay | Schema drift causing archived tickets to surface |\n| Unstructured | PDF handbooks, transcripts, emails, portal pages | Extract clean text, strip boilerplate, split into answer-sized chunks around 450 tokens preserving headings, attach governance metadata | Bad chunking separating an exception from the rule it modifies |",
              "### Task-specific model input construction\n\n| AI workload | Required input payload | What to exclude |\n| --- | --- | --- |\n| Classification (triage, fraud, sentiment) | Relevant fields or excerpts, allowed output labels, contextual metadata, audit IDs | Entire account histories or unrelated private agent notes |\n| Generation (customer replies) | System job description, user request, selected facts, formatting rules, output schema | Unapproved sources or conflicting draft notes |\n| Semantic search (document lookup) | User query embedding plus hard metadata filters (region, language, effective_date, access_group) | Unauthorized or expired records |\n| RAG (grounded Q&A assistant) | User question, top-ranked authorized passages, source IDs, grounding and abstain instructions | Noisy or duplicate chunks that overflow the context window |",
              "### Cross-functional ownership in RAG systems\n\n| Role or team | Core responsibilities |\n| --- | --- |\n| Data engineers (hard dependency) | Source freshness, text extraction, chunking rules, metadata quality, lineage, vector index update reliability |\n| AI and ML teams (shared) | Embedding and LLM model selection, automated answer quality evaluation |\n| Application teams (shared) | Prompt templates, context window assembly, UI citations, abstain and fallback UX |\n| Security and operations (shared) | RBAC and access policies, PII redaction rules, latency monitoring, incident review |",
              "### RAG failure modes and layered sensitive data handling\n\nApplying access checks after retrieval means restricted content has already entered the ranker or prompt. Once inside the context window, the security boundary is crossed.\n\nMissing upstream metadata breaks downstream interfaces. Without `document_id` the chatbot cannot cite. Without `effective_date` expired policies outrank current rules. Without `access_label` search leaks manager-only documents.\n\nOverpacking the prompt introduces conflicting rules and risks silent truncation of critical instructions. Forcing an answer when retrieval returns weak or zero relevant chunks produces confident hallucinations.\n\nThe sensitive data checklist: minimize fields at ingestion, mask or redact before embedding or prompt assembly, filter by tenant and region and role before similarity search, route sensitive workloads to approved model endpoints, and log access and citations within privacy retention limits.",
              "## 05 / Case study: Northstar copilot",
              "### Case study: the three-bullet takeaway\n\nWhen answers depend on live, frequently updated enterprise policies and strict role-based boundaries, RAG with chunked embeddings and pre-retrieval metadata filters is required, separating offline preparation from inference-time context delivery.\n\nThe number one failure mode is treating retrieval as pure vector similarity without filters for role, region, `effective_date` and `document_status`. That caused cross-role leaks, including a draft executive PPO document surfacing to an hourly employee, and stale policy answers.\n\nThe trade-off is real: governed RAG raises p95 latency from 1.1s to 3.2s and monthly infrastructure spend from $6.4k to $11.8k. It stays under the 4.0s SLA, raises accuracy from 58% to 87% and produces zero security leaks.",
              "### Case-specific architectural and governance terms\n\nInference-time context delivery versus training-time behavior shaping is the foundational boundary. RAG injects live governed policy facts at query time, while fine-tuning adjusts weights for tone and style and cannot reflect post-training updates or per-user permissions.\n\nAnswerable retrieval units come from section-aware chunking: 70-page PDFs split into 450 to 650 token sections with about 15% overlap, so embeddings represent focused concepts rather than a blurred average of the whole document.\n\nA cross-role leak is a security failure where a user in one tier retrieves answers from documents restricted to another tier or an unapproved status such as draft.\n\nTemplated retrieval units transform structured warehouse rows, such as Snowflake eligibility tables, into normalized human-readable text fragments paired with source keys.\n\nLoaded data is not AI-usable data. Nightly warehouse loads and portal crawls make data available. AI-usable data also needs OCR and table cleanup, chunking, deduplication, `effective_date` and `document_status` tags, and source lineage IDs.",
              "### Prototype benchmark comparison\n\n| Metric | Keyword plus direct prompt | RAG with embeddings and metadata | RAG without metadata |\n| --- | --- | --- | --- |\n| Recall@5 (50 eval queries) | 0.42 | 0.81 | 0.84 |\n| Exact answer accuracy | 58% | 87% | 85% |\n| Citation present | 12% | 96% | 94% |\n| Cross-role leaks (200 tests) | 0 | 0 | 3 (disqualifying) |\n| p95 latency, SLA under 4.0s | 1.1 s | 3.2 s (passes SLA) | 3.0 s |\n| Monthly infra estimate | $6.4k | $11.8k | $10.9k |\n| Verdict | Reject, fails paraphrased queries | Ship, best balance of quality, safety, SLA | Kill, fails security red-team |",
              "### Heterogeneous source preparation matrix\n\n| Source type | Volume | Prototype failure | Required AI-native transformation |\n| --- | --- | --- | --- |\n| Policy PDFs | 312 | Full-document embedding blurred topics and collapsed tables during extraction | OCR cleanup, table preservation, section-aware chunking (450 to 650 tokens, 15% overlap), lineage IDs |\n| Benefits portal pages | 1,480 | Good text, weak freshness tracking caused stale answers after Sep 12 | Add `effective_date` and `document_status` (published versus draft) tags |\n| HR support tickets | 92,000 | Useful phrasing, noisy and permission-sensitive | Exclude from live retrieval corpus, use for offline evaluation sets and optional future fine-tuning |\n| Snowflake eligibility tables | 18 tables | Loaded nightly, raw rows not packaged as model-ready text | Normalize rows into templated retrieval units with source keys and role and region tags |",
              "### Architecture decision options\n\n| Option | Core approach | Why it wins or fails |\n| --- | --- | --- |\n| Option 1: keyword plus prompt | Exact lexical search plus hosted LLM | Fails: misses paraphrased queries, 0.42 Recall@5 and 58% accuracy |\n| Option 2: fine-tune only | Train smaller model on 92k HR tickets | Fails: cannot answer Sep 12 open-enrollment updates or enforce dynamic role and region rules |\n| Option 3: governed RAG | Chunked embeddings, vector index, metadata filters | Wins: 87% accuracy, 96% citations, 0 leaks, 3.2s p95 under the 4.0s SLA |\n| Option 4: unfiltered RAG | Vector similarity without metadata filters | Fails: 0.84 raw recall but leaked a draft executive PPO policy, 3 leaks in 200 tests |",
              "### Case study engineering lessons\n\nDo not blame the LLM for pipeline faults. The prototype failed because of full-document embeddings, collapsed PDF tables, duplicate portal crawls, missing `effective_date` tags and disabled metadata filters.\n\nEnforce `document_status` alongside role and region. Access control must filter role (hourly, salaried, contractor, executive, HR-admin), region (US, Canada) and `document_status == \"published\"`.\n\nChunking is the highest-leverage accuracy lever. Moving from full-document PDF embeddings to 450 to 650 token chunks with 15% overlap lifted accuracy from 61% to 79% before any model change. Metadata filters pushed it to 87%.\n\nKeep noisy tickets out of the canonical knowledge base. The 92,000 historical tickets contain unverified workarounds and PII, so they belong in evaluation benchmarks.\n\nValidate embedding geometry offline with PCA and t-SNE before locking an embedding model. Defend infrastructure spend with operational ROI: the $5.4k monthly increase is insurance against ticket spikes and compliance breaches during open enrollment.",
              "### Sub-module 1 practice quiz\n\nQ1. A retail support copilot returns confident but inaccurate answers about regional promotion substitutions after an embedding model upgrade. Warehouse tables are fresh and accurate. Most likely cause?\nA) LLM temperature too high. B) Stale vectors from the previous embedding model remain in the index alongside new vectors. C) Warehouse lacks primary keys on the product hierarchy. D) StandardScaler used instead of MinMaxScaler on text chunks.\n\nQ2. Why not use t-SNE to compress live query embeddings before vector search?\nA) t-SNE requires non-negative inputs. B) t-SNE only works on tabular data. C) t-SNE is computationally slow and built for offline 2D visualization, not low-latency inference. D) t-SNE truncates the context window.\n\nQ3. Why apply MinMaxScaler before NMF but StandardScaler before PCA?\nA) NMF requires non-negative inputs, StandardScaler produces negative values. B) PCA fails on values between 0 and 1. C) MinMaxScaler removes nulls and validates schemas. D) NMF requires zero-mean unit-variance features.\n\nQ4. Model A: 32 dimensions, MRR 0.9410, Hit@5 0.9820. Model B: 16 dimensions, MRR 0.9395, Hit@5 0.9800. Which to deploy?\nA) A, any Hit@5 gain outweighs cost. B) B, nearly identical quality at half the dimensionality for lower memory and faster retrieval. C) A, 16 dimensions cannot use cosine similarity. D) Neither, MRR must be 1.0000.\n\nQ5. A retrieval payload exceeds the context window budget. Primary operational risk?\nA) Vector database reverts to keyword search. B) Embedding model retrains on overflow tokens. C) Critical instructions, guardrails or policy exceptions may be silently dropped. D) Hit@5 drops to zero.\n\nAnswers: 1 B, 2 C, 3 A, 4 B, 5 C. A changed embedding model changes the coordinate space, so old vectors corrupt similarity. t-SNE is slow and offline by design. NMF is additive and needs non-negative inputs, while StandardScaler centers around zero. Near-equal retrieval quality favors the smaller vector. Context overflow silently drops rules and exceptions.",
              "### Sub-module 2 practice quiz\n\nQ1. A Germany employee asks about parental leave and gets a US policy, although the UI hides the citation. Architectural flaw?\nA) TruncatedSVD instead of PCA. B) Region metadata filtering omitted or applied after retrieval instead of before or during vector search. C) Cosine similarity without L2 normalization. D) CountVectorizer with binary=False.\n\nQ2. A sync inserts new chunks for 500 modified policies without deleting old ones. Top-5 results are near-identical and conflicting. Which failure mode?\nA) Embedding drift. B) ANN recall degradation. C) Duplicate vectors from appending instead of upserting with deterministic `chunk_ids`. D) Context truncation.\n\nQ3. Care coordinators need broad natural-language questions and exact insurance plan codes. Best strategy for code lookups?\nA) Pure vector search. B) Hybrid retrieval with keyword plus vector and re-ranking, because pure similarity can miss exact codes. C) t-SNE projection. D) Regex filtering on the generated response.\n\nQ4. What happens when `TruncatedSVD(n_components=12)` is raised to 18?\nA) Reverts to binary keyword overlap. B) Dense vectors retain more variance and potentially better retrieval quality at higher memory and search latency. C) NearestNeighbors switches to Euclidean. D) Nulls and duplicates are stripped automatically.\n\nQ5. Why convert `nn_index.kneighbors()` output with `1 - distances[0]`?\nA) TruncatedSVD outputs negative similarity. B) `metric=\"cosine\"` returns cosine distance, where 0 means identical, so subtracting from 1 restores cosine similarity. C) CountVectorizer needs scores below zero. D) ANN inverts ranking when top_k exceeds 3.\n\nAnswers: 1 B, 2 C, 3 B, 4 B, 5 B. Filtering after retrieval still lets unauthorized context shape the answer. Appending without deterministic IDs crowds top-k. Hybrid preserves lexical precision for codes. More components preserve variance at a cost. Cosine distance converts to similarity with 1 minus distance.",
              "### Sub-module 3 practice quiz\n\nQ1. Weekly policy updates across states and union groups. Why RAG over fine-tuning?\nA) Fine-tuning eliminates data cleaning. B) RAG keeps knowledge external so policies can be re-indexed immediately and filtered by state and access group before the LLM sees context. C) Fine-tuned models need exact keyword overlap. D) RAG bakes weekly changes into weights at zero latency.\n\nQ2. Nested JSON ticket payloads start recommending archived tickets after `status.active_flag` is renamed to `ticket_state.is_active`. What failed?\nA) Context truncation. B) Semi-structured schema drift breaking metadata filter extraction. C) Embedding dimensionality mismatch. D) Over-redaction of PII.\n\nQ3. A RAG pipeline retrieves 20 chunks and relies on a system prompt saying \"do not mention manager-only rules.\" Why does this fail enterprise security?\nA) top_k=20 is too small. B) Access control must filter unauthorized chunks before or during retrieval; once inside the context window the boundary is crossed. C) Manager policies belong in a warehouse. D) Fine-tuning is required for RBAC.\n\nQ4. A table has raw codes like CUST_SEG_04 for a generative customer-reply assistant. Best handling?\nA) Drop the column. B) Keep the raw code for audit and lineage, transform it into a human-readable label for the prompt. C) Embed the raw code with CountVectorizer. D) Expose all raw account tables to the LLM.\n\nQ5. A new regulation is not in the knowledge base. Retriever returns three weak passages with low similarity. Best serving behavior?\nA) Let the LLM use parametric knowledge. B) Trigger an explicit abstain path based on retrieval confidence thresholds. C) Lower the freshness filter to three-year-old policies. D) Bypass access control to search executive folders.\n\nAnswers: 1 B, 2 B, 3 B, 4 B, 5 B. RAG keeps knowledge external and filterable. Nested schema drift breaks filters silently. Prompt instructions after retrieval are not a security boundary. Keep raw codes for lineage but translate them for the model. Abstain beats hallucination.",
              "### Case study practice quiz\n\nQ1. Eight days before open enrollment, a prototype answers an hourly employee using a draft executive PPO document. Red-team testing finds 3 cross-role leaks in 200 sessions. Primary lesson?\nA) Vector search is too slow with filters. B) Semantic closeness does not enforce authorization; metadata filters for role, region and `document_status` must constrain retrieval. C) Fine-tune on hourly tickets. D) Full-document embeddings are safer than chunks.\n\nQ2. Which evidence most strongly proves the problem is inference-time context delivery rather than lack of training?\nA) 1.1s p95 keyword latency. B) Policies changed on Sep 12 and accuracy rose from 58% to 87% once current documents were chunked, embedded and filtered at retrieval time. C) Snowflake loads by 7:00 a.m. D) 92,000 HR tickets.\n\nQ3. Why did 450 to 650 token chunks with 15% overlap raise accuracy from 61% to 79% on identical PDFs?\nA) Smaller chunks remove the need for cosine similarity. B) Whole-document embeddings average unrelated rules and waste context tokens, while answer-sized chunks let similarity search pinpoint clauses. C) Chunks automatically strip draft documents. D) Overlap retrains parameters during inference.\n\nQ4. How should the 92,000 HR tickets and 18 Snowflake tables be handled for launch?\nA) Embed all tickets, ignore tables. B) Exclude tickets from retrieval and use them for evaluation, normalize Snowflake rows into templated text units with source keys and metadata. C) Fine-tune on Snowflake, keyword search tickets. D) Convert both to 2D t-SNE for routing.\n\nQ5. Finance objects to $6.4k to $11.8k and 1.1s to 3.2s. Best justification?\nA) Only architecture using open-source Python. B) It stays inside the 4.0s SLA, yields 0 leaks instead of 3, and lifts accuracy to 87%, avoiding ticket spikes and compliance breaches. C) Option 4 has higher recall and lower cost. D) Latency is irrelevant for internal assistants.\n\nAnswers: 1 B, 2 B, 3 B, 4 B, 5 B. Similarity alone carries no authorization. A post-training policy update that only retrieval fixed isolates the bottleneck. Chunks match answerable units. Noisy tickets belong in evaluation, structured rows need templating. The extra spend buys SLA compliance, zero leaks and accuracy during open enrollment.",
              "## 06 / Indexing side and query side controls",
              "### The two sides of a practical pipeline\n\nA practical pipeline has an indexing side and a query side, and mixing them up causes trouble quickly. The indexing side extracts, cleans, chunks, embeds and stores content. Its data engineering concerns are freshness, lineage, deduplication, schema consistency and access labels. The query side embeds the user query, compares, filters, ranks and returns. Its concerns are latency, permissions, relevance, observability and safe retrieval.\n\nThe reason to keep the sides separate is simple: the query embedding is fresh, but the document embedding may be days or weeks old. If the source changed and the vector did not, the system retrieves yesterday's meaning with today's confidence.",
              "### Indexing side: freshness\n\nThe concern: if a company updates its return policy today but the vector database still holds last month's chunks, the AI confidently gives outdated, wrong answers.\n\nChange Data Capture and event triggers: listen to source events such as S3 file uploads, Confluence webhooks or database CDC streams, instead of waiting for a weekly batch job. Trigger incremental re-indexing only for modified documents.\n\nUpsert and delete sync: when a source document is updated, overwrite its old vectors using deterministic IDs. When a document is deleted or archived, run a cleanup job that purges its chunks from the index.\n\nTimestamp metadata: stamp every chunk with `source_updated_at` and `indexed_at` so staleness SLAs can be monitored rather than assumed.",
              "### Indexing side: lineage\n\nThe concern: if an AI gives a dangerous or hallucinated answer during an audit, you must trace that exact response back to the source file, the chunking logic and the embedding model version that created it.\n\nDeterministic chunk IDs come from a hash of the source document ID and chunk position, for example `sha256(doc_id + \"_\" + chunk_index)`. Rich payload metadata travels with every vector:\n\n```json\n{\n  \"doc_id\": \"policy_returns_2026\",\n  \"source_uri\": \"s3://corp-policies/returns.pdf\",\n  \"doc_version\": \"v3.2\",\n  \"chunk_index\": 4,\n  \"chunking_strategy\": \"recursive_512_overlap_50\",\n  \"embedding_model\": \"text-embedding-3-small-v1\"\n}\n```",
              "### Indexing side: deduplication\n\nDuplicate files, copied emails and overlapping boilerplate pages create identical or near-identical vectors. At runtime those duplicates crowd the top-K results, waste context window tokens and hide other relevant documents.\n\nExact content hashing: normalize the cleaned text with lowercase and whitespace stripping, then compute a cryptographic hash such as SHA-256. Check a metadata store or cache before calling the embedding API. If the hash already exists, skip re-embedding.\n\nNear-duplicate detection: for noisy text such as support tickets or scraped pages, use MinHash or Locality-Sensitive Hashing during preprocessing to catch and drop documents more than 95% identical before chunking.",
              "### Indexing side: schema consistency\n\nVector databases are often schema-flexible on metadata, which makes it easy for one pipeline run to write `department: \"HR\"` while another writes `dept: \"hr\"` or null. That inconsistency silently breaks runtime metadata filters.\n\nStrict data contracts: define a mandatory schema class in Python with Pydantic, or a validation suite with dbt or Great Expectations. Every chunk must pass before it is embedded or written to the vector store.\n\nQuarantine dead-letter queues: if a document fails validation because of a missing `doc_id`, an empty text chunk or a wrong vector dimension, route it to a quarantine table or queue for inspection instead of letting bad data poison the index.",
              "### Indexing side: access labels\n\nVector databases do not automatically know who may view a file in SharePoint, Snowflake or Google Drive. If permissions are stripped during ingestion, any user can retrieve confidential documents through the AI.\n\nPermission extraction at ingestion: read Access Control Lists, role tags or sensitivity classifications such as public, internal and confidential directly from the source system alongside the document text.\n\nFlattening into filterable metadata: attach permissions to every child chunk as arrays or tags:\n\n```json\n{\n  \"tenant_id\": \"acme_corp\",\n  \"allowed_roles\": [\"support_tier_2\", \"billing_admin\"],\n  \"allowed_markets\": [\"PH\", \"SG\"],\n  \"classification\": \"internal_only\"\n}\n```\n\nPermission sync jobs: run a lightweight metadata-only sync when group membership or a document ACL changes, updating the payload without paying to re-embed the text.",
              "### Indexing side checklist\n\n| Concern | Failure mode if ignored | Core engineering control |\n| --- | --- | --- |\n| Freshness | Bot quotes expired policies | Event-driven CDC with deterministic upsert and delete |\n| Lineage | Cannot prove where an answer came from | Versioned metadata: `doc_version`, `embedding_model`, `chunk_id` |\n| Deduplication | Top-K results filled with identical text | Pre-embedding SHA-256 hashing plus MinHash |\n| Schema consistency | Runtime filters silently return zero results | Pydantic or Great Expectations contracts plus a quarantine queue |\n| Access labels | Unauthorized users leak restricted data | Source ACL extraction flattened into chunk metadata arrays |",
              "### Query side: latency\n\nUsers expect conversational answers within one to two seconds. Embedding the query, filtering metadata, searching millions of vectors and reranking can easily exceed that.\n\nApproximate Nearest Neighbor indexing: configure HNSW or IVF indexes instead of brute-force exact scans, trading a tiny fraction of recall for millisecond search.\n\nSemantic and query caching: use an in-memory store such as Redis to cache embeddings for frequent queries, or cache full verified answers for identical questions and bypass the model on repeat hits.\n\nDimensionality and quantization: use compact dimensions such as 256D to 512D instead of 3072D, or scalar and binary quantization such as int8 instead of float32, to keep the index in RAM.",
              "### Query side: permissions\n\nEven if every chunk was stamped with `allowed_roles` during indexing, that metadata does nothing unless the query layer enforces it on every request.\n\nIdentity context extraction: validate the OAuth2 or JWT token at the API gateway before touching the vector store, resolving the verified `user_id`, `tenant_id`, role and market.\n\nPre-filtering at query time: inject a mandatory metadata filter inside the vector search so unauthorized vectors are excluded before similarity scoring and context packing.\n\n```python\nresults = vector_db.search(\n    query_vector=embedded_query,\n    filter={\n        \"tenant_id\": {\"$eq\": user.tenant_id},\n        \"allowed_roles\": {\"$in\": user.roles}\n    },\n    top_k=5\n)\n```\n\nNever post-filter after fetching top-K. If all five results belong to a restricted group and get dropped afterwards, the user gets zero results even though an authorized document exists at rank six.",
              "### Query side: relevance\n\nBasic cosine similarity sometimes retrieves chunks that share keywords with the question but do not answer it, which leads to hallucinated or vague responses.\n\nHybrid search: combine dense semantic vectors with BM25 sparse keyword vectors using Reciprocal Rank Fusion, so exact product codes, SKUs and policy numbers are not missed.\n\nTwo-stage retrieval with reranking: fetch 20 to 50 candidates quickly with the vector database, then pass them through a slower Cross-Encoder Reranker such as Cohere Rerank or BGE-Reranker to pick the best three to five chunks.\n\nSimilarity thresholds: set a minimum cosine cutoff such as score at least 0.72. If no chunk clears the bar, return empty context and let the system say it does not know instead of forcing a guess.",
              "### Query side: observability\n\nIn traditional software, a 200 OK means everything worked. In AI systems, a 200 OK can still return a hallucinated, slow or unauthorized answer.\n\nDistributed tracing: assign a unique `trace_id` per request with OpenTelemetry or tools such as Langfuse, Arize Phoenix and Datadog LLM Observability. Log latency per step: `embed_ms`, `vector_search_ms`, `rerank_ms` and `llm_ttft_ms`.\n\nRetrieval telemetry and citation capture: log the exact `query_text`, applied `permission_filters`, retrieved `chunk_ids`, `similarity_scores`, `embedding_model_version`, and which citations the model actually used.\n\nDrift and zero-result alerts: monitor the rate of queries returning zero chunks above the similarity threshold. A spike usually signals a broken ingestion pipeline, expired content, or a new topic missing from the knowledge base.",
              "### Query side: safe retrieval\n\nAttackers can hide malicious instructions inside documents through indirect prompt injection, or craft queries that trick the model into ignoring rules and exposing raw system prompts or ungrounded claims.\n\nInput guardrails: run a fast pre-flight classifier before embedding to block jailbreak attempts, toxic inputs and out-of-domain queries.\n\nGroundedness and citation enforcement: require inline source citations such as `[doc_1]` for every claim through the system prompt and output parser, and block free-form generation when retrieved context is empty.\n\nPII redaction and output scanning: scan incoming queries and retrieved chunks for credit card numbers, SSNs and internal secrets with tools such as Microsoft Presidio before sending text to an external LLM API.",
              "### End-to-end comparison\n\n| Dimension | Indexing side, offline or batch | Query side, online or runtime |\n| --- | --- | --- |\n| Primary goal | Prepare clean, accurate, permission-tagged vectors | Find and return safe, relevant context in milliseconds |\n| Key bottleneck | Throughput, schema validation, sync lag | Tail latency (p95), permission accuracy, recall |\n| Security job | Extract and stamp ACL labels onto chunks | Enforce user identity filters before scoring |\n| Failure impact | Stale index, duplicate chunks, broken metadata | Data leakage, hallucinations, slow user experience |",
              "## 07 / Embeddings and vector search reference",
              "### What this reference covers\n\nA user types \"reset my password\" and the system finds a runbook titled \"credential recovery workflow\". That feels effortless only because text has been transformed into machine-comparable representations, stored efficiently, and searched with enough speed and control to be useful in production. This reference covers embeddings, vectors, similarity search, vector indexes and metadata filters as real data assets, not magical AI dust. They have refresh cycles, lineage, permissions, failure modes and governance implications. If they drift, retrieval quality drifts with them.\n\nThe two-sided pipeline itself is already set out in chapter 06. The point here is the operating context around each piece.",
              "### Embeddings and vectors: meaning turned into data\n\nA search engine cannot compare \"account access issue\" and \"reset my password\" by intuition. It needs a numerical representation. An embedding is the model-generated representation of a piece of content. A vector is the actual array of numbers you store and compare. Text with similar meaning should land near each other in vector space even when the words differ.\n\n```text\n[0.021, -0.442, 0.118, 0.907, ...]\n```\n\nThose numbers may span hundreds or thousands of dimensions. You usually do not inspect them directly and do not need to. What matters operationally is that the retrieval system can compute against them consistently. Think of the embedding as a compiled artifact for meaning: the source text is the raw code, the vector is what the retrieval engine can actually execute on.",
              "### Similarity search is a ranked guess, not a string match\n\nExact lookup asks hard-edged questions: does `customer_id = 104992` exist, which rows have `status = 'FAILED'`, which documents contain the phrase \"data retention policy\". Similarity search asks something fuzzier and more powerful: which stored items are closest in meaning to this query.\n\nExact match is typically deterministic. Similarity retrieval is ranked. The top result might be perfect, vaguely relevant, or confidently wrong in a way that looks plausible enough to pass a quick glance.\n\n| Concept | Plain-language meaning | Why it matters |\n| --- | --- | --- |\n| Cosine similarity | Compares the direction of two vectors more than their raw size | Useful when semantic alignment matters more than magnitude |\n| Nearest-neighbor search | Finds stored vectors closest to a query vector | Makes semantic retrieval possible over large collections |\n\nAt a conceptual level, cosine similarity asks whether two vectors point in roughly the same direction.\n\n```text\ncosine similarity = (A · B) / (||A|| ||B||)\n```\n\nAt 10 million chunks, comparing every query to every vector is too slow for an interactive application. Vector indexes organize vectors so the system can find likely nearest matches quickly, often with approximate nearest-neighbor methods.\n\nWarning: approximate search trades recall for latency. That trade-off can be excellent or disastrous depending on the use case. A support bot missing one obscure FAQ is different from a compliance assistant missing the current legal policy.",
              "### Metadata filters that keep retrieval grounded\n\nVector similarity can tell you what is semantically close. It cannot tell you what is allowed, current, region-specific, approved or scoped to the right tenant. Without metadata, semantic search becomes an elegant way to retrieve the wrong thing faster.\n\n| Metadata field | Example | Retrieval use |\n| --- | --- | --- |\n| Source system | confluence, zendesk, sharepoint, s3_lakehouse | Trace origin of retrieved content |\n| Document type | policy, ticket, runbook | Restrict search to useful categories |\n| Freshness timestamp | last_updated_at | Avoid stale or superseded content |\n| Tenant or account | tenant_id | Prevent cross-tenant leakage |\n| Access label | public, internal, restricted | Enforce visibility rules |\n| Region | US, EU, APAC | Support jurisdiction-specific retrieval |\n| Lineage ID | document_id, chunk_id, version_id | Audit retrieval decisions |\n\nA good design filters eligible records before or during vector search so the ranker only compares candidates the user is actually allowed to see.\n\n```text\nregion = 'US'\nAND access_label IN ('public', 'internal')\nAND document_type = 'approved_policy'\nAND last_updated_at >= '2026-01-01'\n```\n\nConsider a global HR assistant. A user in the EU asks about parental leave. Without region metadata, the retriever might surface a US policy that is semantically similar but legally irrelevant. The meaning match is strong; the business answer is wrong.\n\nIf permissions are applied only after retrieval, restricted content may already have influenced ranking or generation. In AI systems, not shown to the user is not the same as never used.",
              "### Production failures: drift, gaps and mystery vectors\n\nWhen retrieval quality drops, teams often blame the model first. Sometimes the model deserves it. More often the problem is upstream: stale embeddings, missing chunks, bad preprocessing, metadata drift or duplicate records quietly poisoning the candidate set.\n\n| Failure mode | What it looks like | Likely root cause | Engineering response |\n| --- | --- | --- | --- |\n| Stale embeddings | Old policies and retired names appear | Source changed without re-embedding | Track source version and embedding lag |\n| Incomplete embeddings | Important content never appears | Ingestion or chunking skipped data | Validate source-to-vector coverage |\n| Poorly generated embeddings | Results are related but weak | Bad chunk size, noisy extraction, wrong model | Evaluate on realistic queries and tune preprocessing |\n| Disconnected lineage | Snippets cannot be traced back | Missing source and version IDs | Store stable lineage fields with every record |\n| Metadata drift | Unauthorized or irrelevant results appear | Metadata updates did not propagate | Refresh metadata independently when needed |\n| Duplicate vectors | Search returns five near-identical answers | Re-indexing appended instead of upserting | Use deterministic IDs and cleanup logic |",
              "### Auditability is the revealing test\n\nCould you prove where a retrieved chunk came from, which source version it reflects, when it was embedded and what permissions applied at retrieval time? If not, you do not just have a retrieval gap. You have a governance gap.\n\nA minimal production-ready vector record carries both the vector and the context needed to operate it responsibly.\n\n```json\n{\n  \"chunk_id\": \"policy_842_v7_chunk_003\",\n  \"source_document_id\": \"policy_842\",\n  \"source_version\": \"7\",\n  \"embedding_model\": \"text-embedding-model-name\",\n  \"embedded_at\": \"2026-05-18T14:22:09Z\",\n  \"last_source_updated_at\": \"2026-05-18T13:57:41Z\",\n  \"access_label\": \"internal\",\n  \"region\": \"US\",\n  \"content_hash\": \"sha256:...\",\n  \"vector\": \"[...]\"\n}\n```\n\nStore enough context to answer four operational questions quickly: what source produced this vector, which version of that source was used, when the embedding was generated, and what permissions and filters govern its use.",
              "### The vector lifecycle\n\nA vector record moves through states that mirror a data pipeline: `SourceUpdated`, `NeedsReembedding`, `Embedded`, `Indexed`, then either `Stale` or `Deleted`. Treating that sequence explicitly is what makes refresh logic, cleanup jobs and staleness alerts possible. A record can be current at index time and stale moments later if the source changes without an event reaching the pipeline.\n\nKey takeaways from this reference: embeddings are model-generated numeric representations and vectors are the stored numeric structures used for semantic comparison. Similarity search returns ranked candidates by meaning, not strict key equality. Cosine similarity, nearest-neighbor search and vector indexes are the core concepts behind scalable retrieval. Metadata filters are essential for freshness, access control, tenant isolation, regional rules and traceability. Retrieval quality degrades when embeddings are stale, incomplete, duplicated, poorly generated or disconnected from lineage.\n\nSemantic retrieval lets AI-native systems find by meaning instead of exact wording. That capability is powerful but not self-managing. Vectors are derived data products and need the same care as any important dataset: versioning, refresh logic, access rules and observability. Good semantic retrieval is never just about the embedding model. It is about chunking, indexing, metadata, permissions, freshness and lineage. Ignore those and the system will still return answers, just fast, polished and wrong.",
              "## 08 / Vector search in AI systems: Riverbend",
              "### Why vector search exists\n\nVector databases support semantic retrieval, but they are only one layer in an engineered system. Vector search exists because applications must find semantically related content when users and documents use different wording. The moving parts are chunks, embeddings, metadata, indexes and query-time filters working together. Vector-only retrieval can be compared with keyword and hybrid approaches for practical workloads. The operational responsibilities are ingestion, refresh, permissions, validation and retrieval quality. Data engineering decisions determine both quality and trust.",
              "### Riverbend Care Assist: the retrieval problem\n\nRiverbend Care Assist searches a large healthcare corpus: roughly 120,000 clinical policies, 38,000 support articles and 9,000 insurance rules, plus thousands of daily updates. That scale makes manual lookup unrealistic and demands fast, indexed retrieval.\n\nThe users are 2,800 care coordinators asking questions such as discharge follow-up requirements. Results must arrive in under 3 seconds, stay current as documents change, and respect strict role-based access. Relevance alone is not enough. The short version of the problem is big corpus, many users and strict access.",
              "### Keyword search versus similarity\n\nKeyword search is still useful when the user knows the exact policy title, code or phrase. It works best when query wording overlaps document wording, which makes it fast and precise for known-item lookup and exact compliance language.\n\nSimilarity search compares embeddings instead of raw strings. A query such as \"post-hospital check-ins\" can retrieve content labeled \"transitional care follow-up\". It is stronger for concept matching, especially when users describe needs in natural language rather than exact terms.",
              "### Documents into the vector index\n\nThe process starts with an approved corpus, not random text scraped from everywhere. At Riverbend, source documents include policies, insurance rules and support content that already have owners, dates and status.\n\nDocuments are split into chunks sized for retrieval, such as a 450-token policy section. Good chunking preserves meaning, keeps context coherent and avoids mixing unrelated instructions that would confuse downstream search.\n\nEach chunk is converted into an embedding, a numeric representation of meaning produced by a model such as OpenAI Embeddings or another approved encoder. Similar meanings land near each other in vector space. The embeddings are stored in a vector index with metadata such as region, owner, effective date and permissions. The index makes nearest-neighbor lookup fast enough for applications using pgVector, Pinecone, Weaviate or similar systems.\n\nThe vector carries meaning. Metadata carries control.",
              "### Safe retrieval at query time\n\nEverything begins with current, approved documents. If the corpus is stale, incomplete or untrusted, retrieval quality collapses before search even starts.\n\nQueries and chunks must use a compatible embedding setup with consistent preprocessing and chunking rules. Changing models carelessly can shift vector positions and degrade recall or require re-embedding the corpus.\n\nAt query time, the application embeds the question, searches the index and retrieves candidate chunks by semantic closeness. The layer must support fast lookup while applying practical filters. The serving layer enforces rules such as region, approval status, effective date and user permissions. It may show results directly or pass them into a RAG workflow, but unauthorized or outdated chunks must never surface.",
              "### Choosing a retrieval strategy\n\nVector-only retrieval is best for concept matching in natural language. Hybrid retrieval adds keyword signals, so it works better when exact identifiers, abbreviations, policy names or medical codes carry crucial meaning. Pure similarity can miss exact codes or legal phrases that matter operationally. Hybrid retrieval reduces that risk but adds tuning complexity because lexical search, vector search, filters and re-ranking all interact.\n\nRiverbend can use vector search for broad care guidance questions where users describe intent loosely. For policy lookup and insurance rules, hybrid retrieval is safer because exact wording often changes the answer.\n\nAfter initial retrieval, a re-ranker can reorder top candidates using freshness, source authority or phrase overlap. That final ranking step often improves the quality seen by the user more than index changes alone.",
              "### Reliable retrieval principles\n\nA vector database cannot rescue a weak corpus. If source documents are incomplete, unapproved or outdated, the system retrieves confidently from bad material. Ingestion and document governance remain core engineering work.\n\nMetadata decides what is eligible to be retrieved. Permissions, status, region, effective dates and ownership are not side details. They are the control plane that keeps semantic search safe and operationally correct.\n\nRetrieval quality comes from the whole plan: chunking, embeddings, filters, vector search, keyword search and re-ranking. Data engineers own that plan by keeping the pipeline current, validated and observable over time. The database is important, but the retrieval system makes it useful.",
              "## 09 / Northstar Benefits RAG system",
              "### RAG as a full system\n\nThis lesson treats RAG as a full system, not a chatbot trick. The path runs from a user question to retrieved passages and a final answer. The stack connects sources, pipelines, embeddings, indexes, models and applications into one architecture. Ownership splits between data engineering responsibilities, such as freshness, metadata, access and monitoring, and shared responsibilities such as evaluation and policy.",
              "### Northstar Benefits Help Assistant\n\nNorthstar Benefits Assistant is an internal HR help system that answers employee benefits questions by retrieving current company content and generating grounded responses inside a governed application.\n\nThe knowledge base includes hundreds of policy documents, so retrieval must work across long, frequently revised text. Historical HR tickets add practical precedent, but they also introduce noise, duplication and sensitive details. Portal pages change weekly, so stale indexing can quietly turn a correct design into a wrong answer.\n\nLatency matters because employees expect help in workflow, not after a long search-style delay. Authorization is essential. Union-specific or manager-only content must be filtered before the model ever sees it.",
              "### RAG versus model tuning\n\nFine-tuning bakes patterns into model behavior. It can improve tone or task performance, but updating benefits rules would require retraining or adaptation, and it still does not provide live document lookup or row-level access control.\n\nRAG keeps the model separate from the knowledge store. At inference time, the system fetches authorized passages, adds them as context and lets the model answer from current evidence instead of relying on remembered training data.\n\nFor Northstar, the winning pattern is retrieval plus generation, because policy freshness and access rules change more often than the model should.",
              "### Query to answer flow\n\nThe flow starts in the benefits portal when an employee asks a natural language question, such as spouse eligibility after enrollment changes. The application converts that question into a search form, often an embedding vector, so semantic similarity can capture meaning beyond exact keywords.\n\nA vector index returns candidate chunks ranked by relevance, often combined with metadata filters such as state, employee class or access group. The system assembles the best passages, adds instructions such as \"answer only from provided context\", calls the LLM and returns a cited response through the same interface.\n\nThe model writes the answer, but retrieval decides what evidence the model can use.",
              "### The RAG middle layer\n\nDocuments are split into answer-sized passages. A 90-page handbook should not be indexed as one blob, because retrieval needs sections that preserve meaning while remaining small enough to rank and cite cleanly.\n\nEach chunk carries metadata such as state, employee type, effective date, source URL and access group. Those tags support filtering, freshness checks, lineage and safer retrieval.\n\nWhen a query arrives, the retriever filters unauthorized material first, then ranks the remaining chunks to find the strongest evidence for the question. Context assembly chooses enough passages to answer well without overflowing the model context window, and it preserves citations so the answer can be audited.",
              "### AI stack layers\n\nThe foundation is source data: policy documents, HR tickets, portal pages and policy tables. If these assets are incomplete, stale or poorly structured, every higher layer inherits that weakness.\n\nPipelines ingest, clean, normalize, chunk, tag, validate and publish assets. This is classic data engineering work, and it enables everything above to operate on trustworthy inputs.\n\nThe AI retrieval layer creates embeddings, maintains the vector index and executes similarity search plus metadata filtering to find relevant context. The top layer handles user requests, orchestrates retrieval and LLM calls, returns answers and exposes the experience through an application or API. Governance and observability cut across the full stack, from source freshness to response auditability.",
              "### Ownership split\n\nData engineers own source freshness, chunking rules, metadata quality, lineage and index update reliability. If embeddings are stale or tags are wrong, the model can sound fluent while answering from the wrong evidence.\n\nOther responsibilities are shared: answer evaluation with AI teams, prompt policy with application teams, access rules with security and incident review across operations. RAG is cross-functional, but its data foundation is a hard dependency. Reliable AI starts with reliable, well-operated data systems.",
              "## 10 / Data preparation, model inputs and serving interfaces",
              "### Prepared inputs, not raw data\n\nA model never sees \"the data\" in the way a human analyst does. It sees a payload: a prompt, a set of retrieved passages, a row of features, an image, a JSON request, or a context bundle assembled under tight limits for latency, privacy and correctness.\n\nGetting files into S3, tables into Snowflake or events into Kafka is only the beginning. A pipeline that used to stop at a curated table may now continue through text extraction, chunking, metadata enrichment, embedding refresh, retrieval filtering, prompt assembly and response contracts. When something goes wrong, it goes wrong in public: the chatbot cites stale policy, semantic search leaks restricted content, or a classifier makes a decision nobody can audit.",
              "### From source systems to AI-ready stores\n\nTwo datasets can both load successfully overnight, but one powers a dashboard while the other feeds an assistant answering customer questions. Same ingestion status, very different bar for success. For AI workloads, \"available\" is not the same as usable.\n\nUpstream sources include operational databases such as PostgreSQL or MySQL, event streams such as Kafka, application content such as tickets and CRM notes, object stores full of PDFs and Parquet, and external partner feeds. A file in object storage is merely present; it is not automatically safe, fresh, attributable or retrievable.\n\nAn AI-ready store behaves less like a filing cabinet and more like a dispatch center. It needs to know what each item is, where it came from, how recent it is, who can access it, and which downstream system may consume it.\n\n| Requirement | Why it matters for AI systems |\n| --- | --- |\n| Stable identifiers | Generated responses and audit logs must point back to source records. |\n| Freshness tracking | Retrieval quality depends on whether indexed content reflects current state. |\n| Metadata availability | Filters, ranking, ownership and access policy all depend on metadata. |\n| Content normalization | Models need text and fields represented consistently. |\n| Lineage and versioning | Teams need to trace which source version produced which input or embedding. |\n| Permission mapping | Interfaces must not expose content users could not access elsewhere. |\n\nA support table can be perfectly clean for analytics and still fail an AI use case. It may lack the descriptive text needed for semantic retrieval, have no `effective_date` so old policy beats new policy, or be queryable but not permission-aware. Upstream omissions show up late: missing IDs break attribution, missing timestamps break freshness checks, and missing permission metadata breaks trust.",
              "### Preparing structured, semi-structured and unstructured data\n\nA row in a warehouse, a nested API payload and a 70-page policy PDF are all data, but they do not become model input the same way. Treating them as interchangeable quietly produces junk with excellent lineage.\n\nWith structured data, preparation means selecting relevant fields, standardizing dates and units, joining reference data, preserving source keys and applying row- or column-level controls. A fraud classifier might need `account_age_days`, `transaction_count_30d` and `risk_tier`; a generated customer message may instead need a human-readable rendering such as `enterprise customer` rather than the raw code `CUST_SEG_04`.\n\nKeep the raw field for audit and replay, create transformed fields for model use, preserve source timestamps for freshness checks, and exclude sensitive fields unless the task truly requires them.\n\nWith semi-structured data such as JSON, Avro or nested logs, the main enemy is schema drift. Preparation means parsing nested objects, flattening selected attributes, validating schema versions, extracting text-bearing fields and retaining the raw payload for debugging.\n\n```json\n{\n  \"ticket_id\": \"T-10482\",\n  \"customer\": {\"tier\": \"gold\", \"region\": \"eu\"},\n  \"issue\": {\"title\": \"Login fails\", \"details\": \"SSO timeout after MFA\"},\n  \"status\": {\"active_flag\": true}\n}\n```\n\nThat ticket is not one thing. Its title and details may become retrieval text, region becomes a filter, and `active_flag` may prevent archived issues from surfacing. If the schema changes and `active_flag` moves, the assistant may start retrieving the wrong content.\n\nFor unstructured data, the pipeline has to extract text, remove headers and boilerplate, preserve section structure, split long content into smaller units and attach metadata that makes retrieval safe and useful. Bad chunking produces context that is technically retrieved but practically useless: a chunk may contain an exception without the policy it modifies, or a procedure without the product version it applies to.",
              "### Metadata is control, not decoration\n\n| Metadata field | Example use |\n| --- | --- |\n| `source_system` | Separate CRM notes from official policy docs. |\n| `document_id` | Trace answers back to originals. |\n| `section_title` | Preserve local context. |\n| `effective_date` | Exclude expired guidance. |\n| `region` | Apply market-specific retrieval rules. |\n| `classification_level` | Block restricted content. |\n| `owner_team` | Route quality issues. |\n| `ingested_at` | Diagnose freshness and indexing delays. |\n\nMetadata is retrieval control, security control and audit evidence at the same time.",
              "### Model inputs are task-specific packages\n\nOne of the most expensive mistakes in AI systems is pretending every workload is just sending text to the model. A classifier, a search system and a retrieval-augmented assistant need different inputs because they are solving different problems.\n\nFor classification, the input should be tightly scoped to the decision: support triage, fraud risk, sentiment, escalation priority or document type. You want the relevant fields or excerpts, the allowed output labels, contextual metadata and enough identifiers to audit the result. A support-ticket classifier might receive the ticket title, description, language, product area and customer tier, but probably not private agent notes or unrelated account documents.\n\nFor generation, the model needs a job description and guardrails: instructions, user request, selected facts, formatting constraints, excluded content and sometimes a target schema for the response.\n\n```json\n{\n  \"task\": \"draft_customer_reply\",\n  \"customer_tier\": \"enterprise\",\n  \"case_status\": \"open\",\n  \"allowed_sources\": [\"policy_excerpt\", \"case_summary\"],\n  \"output_schema\": [\"answer\", \"sources\", \"escalation_required\"]\n}\n```\n\nFor semantic search, the user may type a short query, but the real input often includes permissions, region, language, product scope and freshness constraints. The system is not just asking what is similar. It is asking what is similar enough, current enough and authorized enough for this user.\n\nFor retrieval-augmented generation, the package usually contains the user question, retrieved passages, source IDs, instructions about uncertainty and output requirements. The hard question is what happens when retrieval returns weak, stale, conflicting or unauthorized context. If no reliable source is found, the correct answer is sometimes \"I do not have enough supported information.\" That is not failure. That is system integrity. Design the abstain path early: thresholds, deduplication, ranking rules and source priorities are part of input construction, not afterthoughts.",
              "### Serving interfaces cross-examine the pipeline\n\nYou can hide a lot of mess inside a pipeline. You cannot hide it for long once an API, search bar or chatbot starts serving real users. Common interfaces include APIs returning predictions or embeddings, semantic search tools, chatbots and assistants, internal operator applications and batch scoring jobs.\n\nEach has a technical contract and a behavioral contract: what goes in, what comes out, what gets logged, what gets cited and what the system must refuse to do.\n\n| Contract area | Example requirement |\n| --- | --- |\n| Input schema | Required fields, accepted formats, max sizes, allowed languages. |\n| Output schema | Labels, scores, response text, source refs, warnings, errors. |\n| Latency target | Search under 500 ms, response streaming within 2 seconds. |\n| Access control | Filter by role, tenant, region or entitlement. |\n| Sensitive data handling | Redact or exclude personal data before model use. |\n| Attribution | Include source titles, record IDs or timestamps. |\n| Logging policy | Store inputs and outputs only where permitted. |\n| Fallback behavior | Retry, abstain, escalate or return safe errors. |\n\nA surprising number of interface failures are really data failures. If a chatbot cannot cite its sources, maybe `document_id` never survived processing. If a search tool exposes restricted content, maybe permission metadata never made it into the index. If an assistant answers with old policy, maybe ingestion freshness or `effective_date` filtering is weak.",
              "### Access control and sensitive data at the boundary\n\nAccess control must happen before content enters retrieval results, prompts, generation inputs or logs. Once restricted content is in the context window, the boundary has already been crossed.\n\nSensitive data handling usually needs layers, not one heroic filter: minimize fields before model use, mask or redact sensitive values, route sensitive workloads only to approved endpoints, enforce tenant and regional isolation, log access and source usage where policy allows, and apply retention limits to prompts and outputs.\n\nAttribution is often sold as a user feature, but it is really reliability infrastructure. It lets teams answer which documents supported a response, whether those documents were current, whether the user had access, which retrieval configuration selected them and which model endpoint produced the final output.",
              "### The chain that has to exist\n\nSourced, prepared, indexed, retrieved, prompted, generated, served, logged. A healthy serving path preserves the chain from source record to prepared representation to retrievable unit to model input to served response. It does not need to be glamorous. It needs to exist.\n\nAI systems are downstream of data engineering in a more literal way than analytics systems used to be. What the model sees depends on choices about extraction, normalization, chunking, metadata, permissions and assembly. If those choices are weak, the model will amplify the weakness with confidence.\n\nThe work is not finished when data lands in storage. It is finished when the right user gets the right response, for the right reason, with the right evidence behind it.",
              "## 11 / Northstar Copilot before open enrollment",
              "### Learning objectives\n\n- Diagnose whether a failed AI assistant is suffering from model limitations or pipeline preparation and retrieval flaws.\n- Choose between fine-tune only, keyword search and RAG architectures under latency, governance and freshness constraints.\n- Compare embedding-based retrieval against keyword matching using chunking, metadata filters and prepared inputs.\n- Defend an AI-native pipeline redesign that separates training concerns from inference-time serving responsibilities.\n- Design retrieval controls that preserve access permissions, attribution and current enterprise context at the user interface.",
              "### Eight days before launch\n\nOn Sep 23, 2024, Elena Park, PM for employee experience at Northstar Health, walked into a war room with a screenshot nobody wanted to see. The benefits assistant had answered an hourly employee's question about fertility coverage using an executive PPO document marked draft. Open enrollment started Oct 1. HR had already promised the assistant would cut ticket volume by 18 percent during the busiest two weeks of the year.\n\nMarcus Reed, the staff data engineer on the project, had a narrower fear. If they blamed the LLM and rushed a fine-tune, they would miss the real failure: the retrieval pipeline was pulling semantically plausible but operationally unsafe context. His team had one week to decide whether to ship the current keyword-plus-prompt stack, pivot to a retrieval-augmented design or delay launch.\n\nThe decision for the learner: what architecture should Northstar ship for the first release, given a 4-second SLA, role-based access requirements, weekly policy updates and mixed source formats including PDFs, portal APIs and warehouse tables?",
              "### Timeline before the war room\n\n- Jul 18, 2024: HR leadership asked for \"an AI solution\" to reduce benefits and account-access tickets. Proposed ideas ranged from a rules engine to a chatbot to a recommendation service, and no one agreed on the category of system being built.\n- Aug 2, 2024: Marcus's team shipped a fast prototype, keyword search over portal pages plus direct prompting to a hosted LLM. It worked on obvious queries copied from FAQs.\n- Aug 21, 2024: Security added role-based requirements. Hourly, salaried, contractor, executive and HR-admin users must not retrieve one another's restricted materials.\n- Sep 3, 2024: Evaluation on 50 realistic employee questions exposed misses on paraphrased queries such as \"account access issue\" versus \"reset my password\", and the team began testing embedding-based retrieval in Python.\n- Sep 12, 2024: Benefits policy updates for 2025 plans landed in PDFs and a portal API. The prototype continued answering from stale portal text because the ingestion path for new documents was not retrieval-ready.\n- Sep 18, 2024: A red-team test disabled metadata filters and produced three unauthorized document leaks in 200 sessions, including the draft executive policy screenshot Elena brought into the room.\n- Sep 23, 2024: The launch review was converted into an architecture decision meeting: ship, pivot or delay.",
              "### Exhibit: prototype metrics\n\n| Metric | Keyword plus direct prompt | RAG with embeddings and metadata | RAG without metadata |\n| --- | --- | --- | --- |\n| Recall@5 on 50 eval questions | 0.42 | 0.81 | 0.84 |\n| Exact answer accuracy | 58% | 87% | 85% |\n| Citation present | 12% | 96% | 94% |\n| Cross-role leaks in 200 tests | 0 | 0 | 3 |\n| p95 latency | 1.1 s | 3.2 s | 3.0 s |\n| Monthly infra estimate | $6.4k | $11.8k | $10.9k |\n\nAccuracy barely moved while Northstar treated retrieval as a search problem only. It jumped from 61 percent to 79 percent when the team switched from full-document indexing to chunked embeddings, then to 87 percent after metadata filters and source cleanup. The latency increase was real, but bounded.",
              "### Exhibit: source types and preparation\n\n| Source type | Count | Preparation issue seen in prototype | Fix under consideration |\n| --- | --- | --- | --- |\n| Policy PDFs | 312 | Full-document embedding blurred multiple topics and collapsed tables during extraction | OCR cleanup, section-aware chunking, lineage IDs |\n| Benefits portal pages | 1,480 | Good text quality but weak freshness tracking | Add `effective_date` and `document_status` metadata |\n| HR tickets | 92,000 | Useful language patterns but noisy and permission-sensitive | Use for evaluation and optional fine-tune later, not as raw retrieval corpus |\n| Eligibility tables in Snowflake | 18 tables | Data loaded nightly but not packaged as model-ready text fragments | Normalize rows into templated retrieval units with source keys |",
              "### Questions the team had to answer\n\n- [Analyze] Which exhibit most strongly shows that Northstar's main problem is inference-time context delivery rather than lack of model training, and why?\n- [Evaluate] Given the numbers in the table, which decision option best balances answer quality, governance and the 4-second SLA?\n- [Apply] Which source types need the biggest transformation before they become AI-usable inputs, and what preparation step matters most for each?\n- [Analyze] Why does chunking change answer accuracy so sharply even though the underlying documents did not change?\n- [Evaluate] If finance objects to the jump from $6.4k to $11.8k per month, what is the strongest engineering argument for accepting the spend?",
              "### Instructor notes\n\nFor Question 1, the best evidence is the dated policy change on Sep 12 combined with the retrieval metrics. A fine-tuned-only approach cannot reliably answer from policies updated after training, while the RAG system reached 87 percent accuracy once current documents were properly chunked, embedded and filtered. That points to inference-time context delivery, not missing model capability.\n\nFor Question 2, Option 3 is the strongest choice. It preserves governance with 0 cross-role leaks, beats keyword retrieval on both Recall@5 (0.81 versus 0.42) and answer accuracy (87 percent versus 58 percent), and still stays below the 4-second SLA at 3.2 seconds p95. Option 4 is tempting on recall, but the three authorization leaks should kill it.\n\nFor Question 3, the hardest transformations are the policy PDFs and Snowflake eligibility tables. PDFs need extraction cleanup plus section-aware chunking because full-document embeddings hide answerable units. Warehouse tables are already loaded, but availability is not enough. They need templated text packaging, metadata and lineage so the model can consume governed fragments at runtime.\n\nFor Question 4, chunking matters because retrieval works on units. Embedding a whole 70-page document creates a broad semantic average, which is bad for pinpointing specific policy clauses. Chunking into 450-650 token sections with overlap lets similarity search retrieve the exact deductible, deadline or password-reset step, which improves both recall and citation quality.\n\nFor Question 5, the cleanest argument is ROI under operational risk. The extra $5.4k/month buys a system that is current, attributable and permission-safe during open enrollment. Shipping a cheaper but wrong assistant risks higher HR ticket volume, employee distrust and compliance exposure. In this case, retrieval quality and governance are product requirements, not optional enhancements.",
              "### Marcus's whiteboard and target architecture\n\n\"If the answer must be current, cited, and access-controlled, treat retrieval and preparation as first-class product features, not preprocessing trivia.\"\n\nMarcus proposed a first-release target architecture in Python: extract and normalize portal pages, PDF sections and selected Snowflake rows. Chunk them into retrieval units. Attach role, region, effective_date, source and status metadata. Generate embeddings and index in a vector store. Retrieve top-k with metadata filters, then send only approved context into the LLM for answer generation.\n\nHe also suggested using PCA and t-SNE on sample embeddings to inspect whether password, account-access and enrollment concepts actually clustered the way the team expected before locking in an embedding model.\n\nHe explicitly cut one item from scope: no fine-tuning before launch. Historical HR tickets would be kept for evaluation and perhaps later style adaptation, but not used as a substitute for current enterprise context. That decision drew a hard line between training work and inference-serving work, which finally made ownership clear between platform engineering, data engineering and the application team.",
              "### Decision points\n\nOption 1, keep the current keyword search plus direct LLM prompting for the Oct 1 launch. Expected impact: fastest path to ship, but it will likely miss semantically related policy content and keep answer quality uneven for employee phrasing like \"account access issue\" versus \"reset my password\". Key risk: launching a visibly unreliable assistant during open enrollment, driving HR ticket volume up instead of down. Evidence to confirm: offline evaluation would need keyword retrieval to match or exceed semantic retrieval on Recall@5 for the top 50 employee questions while staying under the 4-second SLA. Evidence to kill: if failed queries consistently involve concept matches with low lexical overlap, keyword retrieval is the wrong foundation.\n\nOption 2, fine-tune a smaller model on historical HR tickets and skip retrieval for the first release. Expected impact: the model may adopt Northstar tone and common answer patterns, but it will not reliably incorporate current 2024 plan changes and role-based access rules. Key risk: confusing training-time behavior shaping with inference-time access to current governed policy documents, producing fluent but outdated answers. Evidence to confirm: a held-out set would need to show correct answers on post-Jul 2024 policy updates without retrieval and without increased hallucination on edge cases. Evidence to kill: if the answer depends on Sep 2024 benefit changes or user-specific permission boundaries, a fine-tuned-only system cannot prove grounding.\n\nOption 3, build a RAG pipeline with chunked documents, embeddings, vector retrieval and metadata filters before launch. Expected impact: improve semantic recall, keep answers tied to approved current sources and allow role- and region-aware retrieval within the existing interface. Key risk: the extra retrieval hop can push p95 latency above the 4-second SLA unless chunking, indexing and prompt assembly are tightly engineered. Evidence to confirm: a pilot should show answer accuracy above 85 percent on evaluation queries, p95 latency under 3.5 seconds and zero cross-role document leaks. Evidence to kill: if retrieval adds more than 1.8 seconds at p95 or chunking fractures policy meaning so badly that citation quality collapses, the implementation needs redesign.\n\nOption 4, build RAG but use vector similarity alone without metadata filters to maximize recall. Expected impact: may lift top-k semantic match rates quickly across HR tickets, portal pages and PDF policies with different wording. Key risk: the assistant could return relevant-sounding but unauthorized or stale content across region, employee class or draft-versus-published boundaries. Evidence to confirm: security testing would need to show that unrestricted vector retrieval still returns only authorized current content for every tested role and region. Evidence to kill: a single retrieval of draft executive benefits policy into an hourly employee session should immediately disqualify this option.",
              "### Analysis walkthrough\n\nNorthstar's team kept saying \"we need an AI solution\", and that fuzziness wasted six weeks. Elena Park thought they were buying a chatbot. HR operations wanted lower ticket volume. Security cared about role boundaries. Marcus Reed forced the question into architecture terms: are we serving static model knowledge, or are we answering from current governed enterprise context? Once asked that way, Option 2 starts to collapse.\n\nStart with the constraint that matters most: open enrollment policy changed on Sep 12, 2024, and the assistant launches Oct 1. That separates training from inference. Fine-tuning on older HR tickets can shape behavior, format and tone, but it cannot guarantee access to the latest deductible tables or role-specific enrollment exceptions unless those facts are injected at runtime. The current system answered only 58 percent of evaluation questions correctly when wording differed from source text, and many misses were on newly updated policies. That is a context-delivery problem.\n\nOption 1, keyword search plus direct prompting, looks attractive only because it is operationally familiar. In the exhibit, queries like \"account access issue\" mapped poorly to pages written as password reset and multifactor unlock. Keyword retrieval got Recall@5 = 0.42 on the 50-question benchmark versus 0.81 for embeddings with metadata filtering. When lexical overlap is weak, no prompt saves documents that were never retrieved.\n\nOption 4, vector search without metadata filters, overcorrects in the other direction. It would likely preserve much of the 0.81 Recall@5, maybe even improve raw retrieval breadth, but the case stakes make that unacceptable. Northstar has union, salaried, contractor and executive benefit variants across US and Canada. Similarity alone cannot enforce role, region, effective_date, document_status and source_system constraints. The red-team exhibit showed three cross-role leaks in 200 tests when metadata filters were disabled. For an HR assistant, that is a showstopper, not a bug backlog item.\n\nThat leaves Option 3: RAG with chunking, embeddings, vector retrieval and metadata filters. The documents are heterogeneous: warehouse rows from eligibility tables, nested portal API payloads and 70-page PDF policy guides. Treating all of that as raw interchangeable text is exactly what broke the first prototype. The AI-native move is to create prepared input packages: normalized text, source IDs, chunk boundaries, effective dates, role tags, region tags, citation URLs and lineage back to source revisions. Loaded data is not the same as AI-usable data.\n\nThe chunking exhibit explains why full-document embedding underperformed. When Marcus embedded entire PDFs, the retriever returned giant policy blobs with mixed topics. The model then cited the wrong paragraph or ran out of useful context window. Re-chunking to 450-650 tokens with 15 percent overlap raised answer accuracy from 61 percent to 87 percent in the offline run because retrieval units finally matched answerable units. The hidden lever is the retrievable package, not the LLM or the prompt.\n\nLatency is the tradeoff to accept and manage. Direct generation averaged 1.1 seconds p95, while the full RAG path hit 3.2 seconds p95 after indexing and chunk tuning. That is slower, but still inside the 4-second SLA. The extra two seconds buy grounding, citations, freshness and permission enforcement. If the RAG path had landed at 4.8 seconds p95, revisit index design, top-k, reranking and prompt assembly before changing the architecture.\n\nThe debugging trail tells you where ownership belongs. The failed prototype was initially blamed on \"the model being dumb\", but the evidence points to stale embeddings, missing metadata on region, duplicate chunks from the portal crawler and PDF extraction that collapsed tables into unreadable text. Those are pipeline faults. The serving interface merely exposed them. A dashboard can tolerate data being merely loaded; a copilot cannot.\n\nIf signing the design review, pick Option 3 and explicitly defer fine-tuning. Ship a governed RAG baseline first, because the answer quality bottleneck is retrieval and preparation, not model adaptation. After launch, Northstar can use Python evaluation workflows plus PCA or t-SNE inspection of embeddings to compare models and decide whether a smaller, cheaper embedding model can preserve the 0.81 Recall@5 without increasing latency or monthly cost.",
              "### Reflection and transfer\n\nIf your own team says \"we need AI\", what is the first boundary you would force into the conversation: training versus inference, keyword versus semantic retrieval, or raw data versus prepared inputs? Which one would change the architecture fastest?\n\n- Name the system category early so teams stop mixing rules engines, predictive models, copilots and generators into one vague request.\n- Separate training-time behavior shaping from inference-time context delivery before assigning blame or budget.\n- Prepare inputs as governed packages with metadata and lineage instead of throwing raw source text at a model.\n- Chunk long documents into answerable units because retrieval quality lives or dies at the chunk boundary.\n- Constrain semantic retrieval with metadata filters for permissions, freshness, region and source status.\n- Measure the serving interface with accuracy, citation rate, leak tests and p95 latency, because that is where pipeline quality becomes visible.",
            ],
          },
          {
            slug: "the-ai-data-lifecycle-and-the-role-of-ai-data-engineers",
            title: "The AI Data Lifecycle and the Role of AI Data Engineers",
            hours: 3,
            summary: "The AI data lifecycle from ingestion through features, embeddings, retrieval, inference, evaluation and monitoring, and where ownership sits.",
            mustMasterSkills: [
              { skill: "Map the lifecycle as a control surface", outcome: "Trace a document from assessment through ingestion, chunking, embedding, retrieval, inference and monitoring, naming what can fail at each stage." },
              { skill: "Enforce point-in-time correctness", outcome: "Design feature logic that cannot see future outcomes and survives promotion into serving." },
              { skill: "Monitor drift as a family", outcome: "Separate data, feature, label, embedding and retrieval drift, then pick a signal and first response for each." },
              { skill: "Preserve explainability evidence", outcome: "Retain lineage, versions, retrieval traces and policy rules so an answer can be explained without exposing raw sensitive text." },
              { skill: "Apply governance at runtime", outcome: "Carry classification, minimization, role filters and retention across ingestion, retrieval, generation and logs." },
              { skill: "Assign ownership explicitly", outcome: "Name who detects, triages, changes and approves recovery when a signal crosses a threshold." },
              { skill: "Run a drift check", outcome: "Build comparable embedding windows, compute centroid and distribution drift, and turn thresholds into actions." },
            ],
            mentalLocks: [
              { title: "The golden rule: trust comes from governed context, not model magic", lines: [
                "An LLM is only as reliable as the exact slice of data injected into its prompt at runtime.",
                "When an answer is wrong, inspect the pipeline first: stale chunks, broken filters and truncated context come before model blame.",
              ] },
              { title: "BI-ready is not AI-ready", lines: [
                "Dashboards tolerate daily batches, raw internal codes and table-level security.",
                "AI systems need minutes-level freshness, 450 to 650 token chunks with overlap, human-readable text, lineage IDs and pre-retrieval metadata filters.",
              ] },
              { title: "Training and inference are different jobs", lines: [
                "Fine-tuning shapes behavior and tone. It cannot deliver weekly policy changes or row-level permissions.",
                "RAG handles live facts and access control at inference by retrieving current authorized passages.",
              ] },
              { title: "Vectors carry meaning, metadata carries control", lines: [
                "Embeddings search by meaning. Hybrid search and re-ranking protect exact codes and SKUs.",
                "Role, region, tenant_id, effective_date and document_status == 'published' filters must run before or during vector search, never after. Not shown to the user is not the same as never used by the LLM.",
              ] },
              { title: "Two silent feature killers: leakage and skew", lines: [
                "Leakage trains on future post-event data and violates point-in-time correctness.",
                "Train/serve skew separates offline batch SQL from online streaming logic through windows, null defaults or timezones. Versioned feature contracts fix both.",
              ] },
              { title: "Deletion cascades, logs do not leak", lines: [
                "Deleting a source row does not delete its chunks, vectors, caches or logs. Propagate deletes everywhere.",
                "Capture decision records with document IDs, policy versions, hashes, retrieval scores and role tags instead of raw PII or PHI.",
              ] },
              { title: "Green systems still fail", lines: [
                "200 OK uptime and 40 ms search latency mean nothing if grounded answer rate drops or two embedding models share one index.",
                "Monitoring says something moved. Evaluation says whether it matters. Every breach needs a named owner and an immediate first action.",
              ] },
            ],
            breakdown: [
              {
                group: "Lifecycle loop",
                items: [
                  {
                    name: "Assess sources",
                    role: "Profile formats, missing fields, duplicates, sensitivity and permission boundaries.",
                  },
                  {
                    name: "Prepare",
                    role: "Clean, normalize and chunk long text into meaningful passages with metadata.",
                  },
                  {
                    name: "Embed",
                    role: "Turn approved chunks into semantic vectors with a versioned encoder.",
                  },
                  {
                    name: "Retrieve",
                    role: "Rank candidates with vector search plus metadata filters.",
                  },
                  {
                    name: "Infer",
                    role: "Assemble policy text, claim facts and permissions into the prompt.",
                  },
                  {
                    name: "Evaluate and monitor",
                    role: "Feed misses and restricted-content signals back to the earlier stages.",
                  },
                ],
              },
              {
                group: "Analytics ready versus AI ready",
                items: [
                  {
                    name: "Consumer",
                    role: "An analyst reading a dashboard versus software acting in real time.",
                  },
                  {
                    name: "Success",
                    role: "Correct metrics and joins versus relevant, filterable, citable context.",
                  },
                  {
                    name: "Freshness",
                    role: "A stale BI table delays a report; stale AI context produces a bad live answer.",
                  },
                  {
                    name: "Context control",
                    role: "Row access is not enough; decide which chunks may be retrieved and cited.",
                  },
                  {
                    name: "Observability",
                    role: "Add embedding age, retrieval hit rate, top chunk overlap and unanswered patterns.",
                  },
                ],
              },
              {
                group: "Pipeline outputs",
                items: [
                  {
                    name: "Source contracts",
                    role: "Ownership, refresh expectations, schema rules, approved fields and sensitivity.",
                  },
                  {
                    name: "Normalization",
                    role: "Align schemas, units and identifiers across catalog, inventory and events.",
                  },
                  {
                    name: "Enrichment",
                    role: "Attach activity, policy, effective-date and regional metadata.",
                  },
                  {
                    name: "Publishing",
                    role: "Reusable AI-ready datasets for feature, embedding and retrieval jobs.",
                  },
                  {
                    name: "Features",
                    role: "Governed structured signals with definitions, tests and refresh schedules.",
                  },
                  {
                    name: "Embeddings",
                    role: "Versioned vectors and searchable IDs written to the index.",
                  },
                ],
              },
              {
                group: "Feature objects",
                items: [
                  {
                    name: "Raw data",
                    role: "Original records before AI-specific transformation.",
                  },
                  {
                    name: "Feature",
                    role: "Model-usable derived input with timing and freshness rules.",
                  },
                  {
                    name: "Label",
                    role: "Outcome used for supervised learning, with delay and leakage risk.",
                  },
                  {
                    name: "Metadata",
                    role: "Descriptive context for filtering and governance.",
                  },
                  {
                    name: "Embedding",
                    role: "Dense vector whose model version changes the coordinate system.",
                  },
                ],
              },
              {
                group: "Governance controls",
                items: [
                  {
                    name: "Source classification",
                    role: "Catalog tags for PII, PHI, PCI and confidential fields.",
                  },
                  {
                    name: "Approval workflow",
                    role: "Registry status, pull-request checks and risk review.",
                  },
                  {
                    name: "Lineage",
                    role: "Column-level trace from source to model input.",
                  },
                  {
                    name: "Access enforcement",
                    role: "Row, column or attribute-based policies.",
                  },
                  {
                    name: "Purpose binding",
                    role: "Metadata linking a feature to allowed workload types.",
                  },
                ],
              },
              {
                group: "Lab artifacts",
                items: [
                  {
                    name: "Lifecycle map",
                    role: "Eight stages with one owner and one or more controls each.",
                  },
                  {
                    name: "Control catalog",
                    role: "C1 to C5 covering PII, schema, parity, performance and drift.",
                  },
                  {
                    name: "Policy gates",
                    role: "Accuracy 0.90, recall 0.90 and ROC AUC 0.95 with pass or review.",
                  },
                  {
                    name: "Ownership matrix",
                    role: "Compact RACI labels for accountability at each stage.",
                  },
                  {
                    name: "Control heatmap",
                    role: "Control coverage by owner to expose concentration risk.",
                  },
                ],
              },
            ],
            notes: [
              "### Important sentences to remember\n\n> The AI data lifecycle is the operating path that turns governed enterprise data into reliable AI inputs, outputs, feedback, and improvements.\n> In feature engineering, time is part of the definition, not a side note.\n> A reliable feature is one you can explain twice: once as business meaning, and once as data lineage through time.\n> If your training data and serving data are produced by different logic with different timing assumptions, you do not have one feature. You have two similarly named features pretending to be the same thing.\n> A retrieval system without metadata filters is basically a very confident intern with access to every filing cabinet.\n> Governance is not a meeting that happens after feature engineering. It is part of how feature engineering becomes safe, repeatable, and auditable.\n> AI-ready pipelines are governed data products with visible runtime consequences.\n> A restricted medical note exposed in a summary is a lifecycle failure, not one bug.\n> A completed job only proves the workflow ran. It does not prove the result was useful, current or appropriate for the downstream AI experience.\n> If an artifact can influence an AI output, it belongs in the governance map.\n> Citation helps, but citation is not reasoning.\n> Deleting a source document does not automatically delete the chunks made from it, the embeddings stored in the index, cached retrieval results or prompt logs quoting its content.\n> Leakage is a boundary failure across time, access, purpose or persistence.\n> Cross-functional is not the same as ownerless.\n> Explainability is evidence plus lineage, not just fluent output.\n> In AI, permissions must be enforced at every retrieval because the system assembles context dynamically.\n> Monitoring detects movement. Evaluation tells you whether the movement matters.\n> A drift alert without an owner is just production ambience.\n> Green infrastructure metrics hid a red product reality.\n> Deleting a source record does not remove its derived chunks, embeddings, caches or prompt logs.\n> The winning move is not just a new vector store, but a pipeline that can survive contact with production.",
              "## 01 / Module frame\n\n### What the lifecycle is\n\nThe AI data lifecycle is the operating path that turns governed enterprise data into reliable AI inputs, outputs, feedback and improvements. The path maps to an enterprise workflow and focuses on what data engineers must make true before AI can use data reliably.\n\nPreparation, embedding, retrieval, inference support, evaluation, monitoring and governance form one connected loop rather than a finished ETL handoff. The module contrasts analytics-ready data with AI-ready data, where semantic meaning, permissions, professionalism and retrieval quality become operational requirements.\n\n### Northstar Claims Assist\n\nNorthstar Claims Assist anchors the lifecycle. It is an internal insurance assistant that must answer from claim notes, policy documents, repair estimates and prior decisions while protecting sensitive customer data.\n\n### Operating constraints\n\nNorthstar handles 2.4 million claim documents a year, serves 8,000 adjusters, targets responses under 30 seconds and works with PII-heavy records. Those constraints make data relevance, latency and access control central, not optional. The challenge is not adding a chatbot, it is supplying current, permitted, explainable context during a live claim interaction.",
              "## 02 / The lifecycle as a loop\n\n### Assess sources\n\nTeams begin by assessing source systems, document formats, missing fields, duplicates, sensitivity and permission boundaries. This stage decides whether claim notes, policies and estimates are trustworthy enough to enter the AI path.\n\n### Prepare content\n\nPreparation cleans records, normalizes documents and chunks long text into meaningful passages. It also attaches metadata such as state, claim type, effective date and access group so later retrieval can filter correctly.\n\n### Embed meaning\n\nEmbedding converts prepared text into semantic vectors using models such as OpenAI Embeddings or open-source alternatives. The output lets related passages be found by meaning, not only by exact keywords.\n\n### Retrieve candidates\n\nRetrieval ranks candidate chunks for the live question, often with metadata filters and vector search in systems such as pgVector or Snowflake Cortex Search. Poor preparation here becomes poor context.\n\n### Assemble context for inference\n\nOpen-source support assembles retrieved policy text, claim facts and permissions into the model prompt. The model answer depends heavily on this fresh context, not only on pre-training.\n\n### Evaluate and feed back\n\nEvaluation and feedback measure usefulness, safety and misses. If answers degrade or restricted content appears, signals loop back to source assessment, preparation rules and embedding refresh.",
              "## 03 / Analytics-ready versus AI-ready\n\n### Who consumes the data\n\nAnalytics-ready data serves an analyst reading a report or dashboard. AI-ready data serves a model or application assembling context automatically, so the consumer is software acting in real time.\n\n### What success means\n\nFor analytics, success means correct metrics and clean joins. For AI, success means relevant context, chunks that preserve meaning, metadata that filters correctly and retrieved passages that actually help answer the question.\n\n### Why staleness costs more\n\nA stale BI table may delay a report. Stale AI context can produce a bad answer on a live customer call, especially when policy language or claim status has changed.\n\n### Context control\n\nRow access is not enough for AI workloads. AI-ready systems need context control: which chunks can be embedded, retrieved, cited or excluded for a given user and use case.\n\n### Observability beyond job status\n\nTraditional observability watches pipeline status and job failures. AI-ready observability adds embedding age, retrieval hit rate, top chunk overlap and unanswered question patterns because the data path continues into retrieval.",
              "## 04 / Source to context and inference signals\n\n### Profile before embedding\n\nData engineers profile claim notes and documents for missing fields, duplicates, unsupported formats and sensitive content. The output is a decision about quality, permission and readiness before any model call happens.\n\n### Prepare and attach metadata\n\nPreparation standardizes files, cleans text and chunks long policy documents into units that keep meaning intact. Data such as state, product and access group is attached because retrieval depends on it.\n\n### Embed into a searchable index\n\nEmbedding generates semantic representations for each approved chunk and stores them in a searchable index such as pgVector. What enters is prepared text and metadata. What leaves is meaning-aware lookup capability.\n\n### Retrieve with filters\n\nRetrieval ranks the best chunks for an adjuster's question using vector similarity plus filters. If chunking, metadata or refresh logic is weak, answer quality drops even when the model itself is strong. Governed documents become usable claim-time context through explicit preparation and retrieval steps.\n\n### Ground the live answer\n\nThe answer should use the active policy language, not generic model memory. Retrieved policy passages provide grounded evidence for a specific claim decision. Claim facts such as vehicle details, loss type and prior decisions narrow the answer to this case. Estimate line items connect policy language to the actual repair scenario being reviewed.\n\n### Filter at inference time\n\nInference-time context must be filtered by what the adjuster is allowed to see. Process control determines which notes or documents can enter the prompt at all. Once live, teams monitor source freshness, embedding age, retrieval misses and escalation frequency. Those signals reveal data drift, embedding drift, retrieval drift or changing user questions before failures spread.",
              "## 05 / Ownership across the lifecycle\n\n### What data engineering owns\n\nData engineering owns source contracts, preparation rules, chunk metadata, embedding refresh and pipeline observability. These controls keep inputs fresh, traceable and usable for retrieval and inference.\n\n### What needs shared ownership\n\nUnsafe answers, policy conflicts, access violations and quality regressions require product, security, legal, application and model teams, as well as data engineering. A restricted medical note exposed in a summary is a lifecycle failure, not one bug. Reliable AI needs named owners, monitored signals and clear escalation paths.",
              "## 06 / Pipelines for AI workloads\n\n### What changes in an AI pipeline\n\nAI workloads change what a good pipeline must produce. Beyond clean tables, the pipeline has to prepare reusable data, generate features and embeddings, and serve fresh context reliably to applications, models and agents.\n\n### Preparation, transformation and serving\n\nPreparation starts with source assessment, cleansing, chunking, metadata and field controls. Transformation includes engineered features, embedding generation and index creation. These outputs support ranking, retrieval, recommendations and grounded responses. Serving means inference-time delivery under latency, freshness and policy constraints. Data is no longer just stored; it actively shapes live model behavior.\n\n### Meridian at scale\n\nMeridian Outfitters runs at enterprise scale: 12 million events a day, 850,000 products, 1.8 million customers and inventory changing every 15 minutes. The company is launching a shopping and support assistant that must answer product fit and availability questions. The nightly analytics pipeline is trusted for BI but cannot package fresh, retrieval-ready context fast enough.\n\n### Three design constraints\n\nThree constraints dominate the design: sub-second retrieval, blocked PII and coexistence with legacy BI flows. Daily batch may be acceptable for merchandising metrics, but an assistant often needs minutes-level or event-driven updates. Outdated inventory or policy data can produce visibly wrong answers. BI favors tables, aggregates and metrics. AI workloads also need chunks, features, embeddings, IDs and metadata that can be filtered, retrieved and assembled into prompts.",
              "## 07 / Source contracts and reusable outputs\n\n### Contracts before models\n\nThe first design choice is the source contract, not the model. Each source needs ownership, refresh expectations, schema rules, approved fields and sensitivity handling before it can safely feed AI data products.\n\n### Catalog and inventory feeds\n\nThe catalog contributes structured attributes such as size, waterproof rating and category. Those fields become dependable metadata for features, filters and retrieval grounding. Inventory is freshness critical and arrives every 15 minutes. If this feed lags or breaks, the assistant can recommend products that are semantically relevant but unavailable.\n\n### Support content and clickstream\n\nSupport content provides unstructured policy and product guidance. It must be cleaned, permissioned and prepared for chunking so retrieval returns complete, trustworthy passages. Clickstream events add behavioral signals but are noisy and often include unstable identifiers. They need validation and privacy controls before becoming features or training signals.\n\n### From raw to published\n\nIngestion brings in catalog records, documents and event streams from operational systems. The output is raw but controlled landing data with timestamps, lineage and source-specific boundaries. Normalization aligns schemas, units and identifiers across systems. Enrichment adds metadata such as activity type, policy category, effective dates and regional attributes. Publishing produces reusable AI-ready datasets for feature jobs, embedding jobs, retrieval services and applications. This is where classic engineering output becomes a governed data product.",
              "## 08 / Features and embeddings together\n\n### Two outputs after preparation\n\nOnce sources are prepared, the pipeline produces two major AI outputs: governed features for structured signals and embeddings for semantic retrieval.\n\n### Governed features\n\nFeature workflows create reusable signals such as user intent, 7-day popularity, regional availability and policy eligibility. These are not ad hoc model tricks. They need definitions, refresh schedules, lineage, tests and consistent reuse across ranking, recommendations and evaluation.\n\n### Embedding workflows\n\nEmbedding workflows start from clean text and metadata, apply chunking rules, generate vectors and write searchable IDs into a vector index. Chunk quality matters because badly split passages can retrieve incomplete answers even when the semantic match looks strong.\n\n### Guardrails\n\nOperational guardrails include freshness checks before publishing inventory, schema tests before feature jobs, index completion checks before swapping vector stores and fallback paths when retrieval is incomplete. AI-specific guardrails include metadata filters, PII removal before embedding, stable feature definitions and retrieval validation against permissions and stock. They ensure the context package is not only available, but safe and correct.",
              "## 09 / Feature objects and point-in-time correctness\n\n### What a feature really is\n\nA feature can look deceptively simple: a count, a flag, a timestamp or an embedding vector. In production, that value has to be right in a much stricter sense than a notebook demo reveals. It must be computed from the right source data, at the right time, with the right definition, and be available when the model or application actually needs it.\n\n### A leakage example\n\nA support-case model might find `case_resolution_time_minutes` incredibly predictive, but at prediction time the case has not resolved yet. That is data leakage. A better feature set uses `minutes_since_case_opened`, `number_of_agent_reassignments_so_far`, `customer_tier_at_case_open_time` and `open_cases_for_customer_last_30_days_as_of_case_open`.\n\n### Point-in-time correctness\n\nThe phrase \"as of\" is doing serious work. It points to point-in-time correctness: every training row should use only the data that would have been available at the prediction timestamp. If you violate that rule, offline evaluation will flatter the model and production will punish it.\n\n### Where correctness gets hard\n\nFor data engineers, point-in-time correctness shows up in window functions, joins against changing dimensions, late-arriving events, snapshots and backfills. A feature pipeline is not just transforming data. It is reconstructing what the world looked like at a specific moment.\n\n### The five objects\n\n| Object | What it represents | Example | Engineering concern |\n| --- | --- | --- | --- |\n| Raw data | Original source records before AI-specific transformation | Clickstream event, CRM row, PDF text | Schema drift, source quality, access control |\n| Feature | Model-usable derived input | 7-day transaction count, account age | Freshness, consistency, point-in-time correctness |\n| Label | Outcome used for supervised learning | Fraud confirmed, ticket escalated | Delay, ambiguity, leakage |\n| Metadata | Descriptive context for filtering or governance | Region, owner, effective date | Completeness, controlled vocabulary, policy enforcement |\n| Embedding | Dense vector representation | 1536-dimensional text vector | Model versioning, re-indexing, retrieval quality |\n\n### Embeddings change the coordinate system\n\nChange the embedding model and you effectively change the coordinate system. The text might be the same, but similarity search behavior can shift enough to alter retrieval results, ranking and downstream answers.",
              "## 10 / Train/serve skew and feature contracts\n\n### What skew looks like\n\nTrain/serve skew happens when the model learns from one version of reality and is asked to act in another. Skew often comes from ordinary engineering mismatches: training might use a nightly warehouse table while serving uses streaming events, offline SQL may normalize categories one way while application code leaves raw values untouched, or a production cache may be three hours old.\n\n### Common causes\n\nCommon sources include batch features in training versus event-driven features in serving, SQL logic offline versus hand-written application logic online, different null handling or defaults, mismatched time-window semantics, cached reference data in one environment, and source corrections appearing in backfills but not first-arrival production data.\n\n### Single-source logic\n\nThe fix starts with single-source transformation logic whenever possible. The stack can vary: dbt, Spark, Flink, Beam, a managed feature platform, or versioned SQL plus online materialization. What matters is that the feature definition behaves like a contract instead of a rumor.\n\n### A feature contract\n\n```text\nname: completed_orders_last_30_days\nentity_key: account_id\nbusiness_meaning: Count of successfully completed orders in prior 30 days\nwindow_logic: rolling_30_days_excluding_prediction_event\nrefresh_cadence: 15_minutes\nallowed_staleness: 60_minutes\nnull_handling: default_0\nowner: growth_data_platform\nversion: v3\n```\n\n### Weak versus production-ready\n\n| Weak implementation | Production-ready implementation |\n| --- | --- |\n| Column appears in a training table with no definition | Feature has a documented contract, owner and version |\n| Offline and online logic diverge | Shared logic or tested equivalent implementations |\n| Backfills overwrite history silently | Backfills are versioned and reproducible |\n| Timestamp meaning is implied | Event time, processing time and prediction time are explicit |\n| Sensitive fields are excluded by convention | Policy checks enforce feature usage rules |\n| Problems appear only after model failure | Freshness, nulls, distributions and volume are monitored |",
              "## 11 / Features across data shapes\n\n### Structured signals\n\nFor structured data, the patterns are familiar: aggregations such as `purchases_last_7_days`, ratios such as utilization or return rate, flags such as `identity_verified`, temporal features such as days since last login, and sequence features such as a user's last five actions.\n\n### Unstructured and semi-structured signals\n\nFor unstructured and semi-structured data, the engineered inputs often include chunk attributes, extracted entities, classification labels, parse quality metrics and embedding vectors. In retrieval systems, metadata fields such as `tenant_id`, `region`, `document_type`, `classification` and `effective_date` directly control relevance, authorization and auditability.\n\n### Metadata controls the chunk\n\nThe embedding tells you what a chunk is about. The metadata tells you whether it is the right chunk to retrieve for this user, in this context, under this policy.\n\n### A prepared chunk record\n\n```json\n{\n  \"chunk_id\": \"policy_042_section_03_chunk_007\",\n  \"source_document\": \"policy_042\",\n  \"document_title\": \"Vendor Risk Review Standard\",\n  \"section_title\": \"Required Review Evidence\",\n  \"effective_date\": \"2026-01-15\",\n  \"region\": \"US\",\n  \"classification\": \"internal\",\n  \"owner_team\": \"Governance Risk and Compliance\",\n  \"embedding_model_version\": \"text-embedding-model-v3\",\n  \"chunking_strategy_version\": \"recursive_800_token_overlap_100\"\n}\n```\n\n### Version the embedding pipeline\n\nTreat embedding generation as a versioned pipeline: track the embedding model version and chunking strategy version, store the source document version or content hash, record the index build timestamp, preserve lineage from source to chunk to embedding to index, evaluate retrieval quality before and after re-indexing, and roll out index changes gradually. If you cannot say which chunking version and embedding model produced a retrieval result, you will struggle to explain why an answer cited one document and not another.",
              "## 12 / Governance inside the pipeline\n\n### Governance belongs early\n\nGovernance gets painful when it shows up late. Sensitive attributes may already be copied into training tables, cached in online stores or transformed into vectors that are much harder to inspect directly. Build governance into the pipeline from the start.\n\n### Questions the pipeline must answer\n\nEvery feature pipeline should be able to answer: what source fields were used, whether any are sensitive or restricted, whether the feature is a proxy for something prohibited, who approved it for this workload, and whether the value can be traced back or deleted under retention rules. A model may never see a prohibited attribute directly yet still infer it from ZIP code, language preference, device type, browsing patterns or income band.\n\n### The control set\n\n| Control | What it prevents | Example |\n| --- | --- | --- |\n| Source classification | Sensitive fields entering pipelines unnoticed | Catalog tags for PII, PHI, PCI, confidential |\n| Feature approval workflow | Unreviewed features reaching production | Pull-request checks, registry status, risk review ticket |\n| Lineage tracking | Inability to trace values during incidents | Column-level lineage from source to model input |\n| Access enforcement | Unauthorized feature use | Row-level, column-level or attribute-based policies |\n| Purpose binding | Reuse outside approved context | Metadata linking a feature to allowed workload types |\n| Retention controls | Features outliving source-data policy | Expiration jobs, deletion propagation, re-index workflow |\n| Monitoring | Silent quality or policy drift | Freshness, null rate, distribution shift, access anomalies |\n\n### What to monitor\n\nMonitor freshness, completeness, volume, value distribution, cardinality, join success, latency and policy conformance. A bad backfill can poison evaluation. A bad online lookup can poison inference. A bad index build can poison retrieval.\n\n### Degradation behavior\n\nDefine degradation behavior before something breaks. If a feature is stale, should the system serve the last known value, drop the feature, fall back to a simpler model, block the request or route the case for human review? A stale recommendation feature may be tolerable for hours. A stale fraud feature may not be. A retrieval system serving internal policy documents should enforce filters such as `tenant_id`, `classification` and `effective_date` before retrieval, not after response generation. If the metadata is stale or missing, the correct fallback may be to block the answer rather than risk exposing the wrong document.",
              "## 13 / Lab: enterprise lifecycle mapping\n\n### What the lab produces\n\nThe lab translates a healthcare risk-triage use case into a full lifecycle map spanning business framing, data onboarding, validation, model training, deployment and monitoring. The deliverables are a lifecycle map artifact, a control matrix, policy gates tied to model evidence and an ownership view for architecture and risk reviews.\n\n### Model and dataset\n\nIt uses a reproducible scikit-learn Pipeline with StandardScaler and LogisticRegression, evaluated with confusion_matrix and threshold-based policy gates. The dataset is the built-in Breast Cancer Wisconsin dataset from `sklearn.datasets`, used as a proxy for a clinical risk-triage use case where lifecycle governance and ownership are critical.\n\n### Trade-offs\n\nArchitectural trade-offs: speed versus accuracy, since a simple linear model is fast to retrain and explain but may underfit nonlinear patterns; latency versus memory, since richer features and ensembles increase runtime and footprint; governance depth versus delivery speed, since more controls improve auditability but add coordination overhead.\n\n### Stage taxonomy and controls\n\nThe eight lifecycle stages are Business Framing, Data Acquisition, Data Validation, Feature Engineering, Model Training, Model Validation, Deployment and Monitoring and Drift Response. The control catalog has five controls: C1 PII scan, C2 schema contract test, C3 bias and parity check, C4 model performance gate and C5 drift threshold alert.\n\n### Ownership map\n\nThe lifecycle map assigns one owner and one or more controls to each stage: Product Owner for framing with C1; Data Engineer for acquisition with C1,C2 and validation with C2; ML Engineer for feature engineering with C2,C3, training with C3,C4 and deployment with C4; Risk Officer for model validation with C3,C4; Data Steward for monitoring with C5.\n\n### Evidence and policy gates\n\nModel evidence is generated with a fixed seed, a 25 percent test split and stratification. Metrics include accuracy, precision, recall and ROC AUC, plus a confusion matrix. These become control evidence for C4, the model performance gate. Policy thresholds are `accuracy: 0.90`, `recall: 0.90` and `roc_auc: 0.95`, and each metric is classified as `pass` or `review`. A review status means release should not proceed without remediation, owned by Data Engineer for upstream quality defects, ML Engineer for feature or model adjustments, or Risk Officer for threshold exceptions.\n\n### Ownership matrix and tasks\n\nThe ownership matrix uses compact RACI-style labels. A heatmap of control coverage by owner makes it easier to spot overloaded teams or weak separation of duties. Student tasks ask for a new use case with at least six mapped stages, one owner and one testable control per stage, and a stricter gate set such as recall at least 0.94 and ROC AUC at least 0.97 with a named remediation owner.",
              "## 14 / Drift monitoring: signals and response\n\n### The question monitoring should ask\n\nDrift monitoring asks a better question than whether the pipeline is green. It separates drift types, chooses signals for retrieval and inference quality, and ties those signals to evidence, owners and operational response so monitoring drives action instead of dashboard theater.\n\n### Quality can fall while jobs stay green\n\nGreen systems still fail. The chart shows grounded answer rate falling from 91 percent to 68 percent over 4 months. That downward trend matters because usefulness is degrading even while standard operational metrics still look stable.\n\n### Northstar at scale\n\nNorthstar is a fictional HR assistant for 42,000 employees, indexing 180,000 policy pages and tickets nightly with a 2-second SLA. Documents load, embeddings refresh and APIs respond. Yet employees still receive outdated plan details. Availability stays healthy while answer quality quietly slips. Large user base, large corpus and strict latency make silent quality decline expensive and hard to ignore.\n\n### Input change\n\nDrift is any change that makes yesterday's assumptions less reliable today. Input change includes data drift, schema shift and source freshness problems. A new benefits vendor, missing deletion feed or delayed policy upload changes what enters the system before any model runs.\n\n### Representation change\n\nRepresentation change covers feature drift, embedding drift and index aging. Region, employment type or union status features may shift, while new document language or embedding model versions can alter vector neighborhoods.\n\n### Outcome change\n\nOutcome change appears as label drift, retrieval drift or answer quality decline. The system still returns results, but the retrieved passages may be less relevant, less current or less supportive of a trustworthy answer.\n\n### Job success is not outcome health\n\nA completed job only proves the workflow ran. It does not prove the result was useful, current or appropriate for the downstream AI experience. Loaded today is not the same as policy current. If obsolete documents were never removed, fresh ingestion can still deliver stale guidance. Pipeline failures create outages engineers notice quickly. Outcome failures create misleading responses, which may be slower to detect and more dangerous to users.",
              "## 15 / Retrieval and answer checks\n\n### Capture observable artifacts\n\nCapture source events and system outputs continuously. Document ACLs, effective dates, embedding distributions, top queries, retrieved passages and answer traces. Monitoring starts with observable artifacts, not intuition.\n\n### Baselines and alerts\n\nUse a rolling baseline, such as the prior eight weeks, to compare current behavior against normal behavior. The goal is to detect meaningful shifts, not every small wiggle. Run retrieval tests and answer checks against known cases. Signals become useful when they connect observed change to quality evidence such as hit rate, grounding or stale passage rate. Every alert needs a threshold, an owner and a response playbook. Escalate only when the change can affect employees, compliance or support volume.\n\n### Automated checks\n\nAutomated checks scale across every refresh. Northstar can verify citation presence, answer grounding, current policy dates, top five hit rate on a known answer set, stale passage rate, no result rate and region mismatch without waiting for user complaints.\n\n### Human review\n\nHuman review covers what rules miss. Ambiguous wording, edge cases, high-risk topics such as medical leave or payroll corrections, and new vendor rules that have not appeared often enough for automation. Domain experts judge whether an answer is actually appropriate. Scalable tests catch repeatable failure patterns. Expert review catches contextual ones.\n\n### Who responds\n\nData engineering owns source freshness, deletions, metadata quality and index rebuild jobs. If the corpus changed incorrectly, this team fixes the underlying data supply. AI engineering owns retrieval evaluation, prompt behavior, embedding changes and answer grounding tests. Platform owns latency, availability and runtime reliability. Security reviews sensitive data exposure and privacy violations. HR product decides whether policy content is authoritative and whether a response should be trusted, revised or temporarily suppressed. Support operations watches ticket spikes and frontline confusion.",
              "## 16 / Governance lives in the pipeline\n\n### Failure at the data boundary\n\nAI systems usually fail governance at the least glamorous place: the data boundary. That is where raw records become chunks, chunks become embeddings, retrieval results become prompts, and prompts become answers that users may trust far more than they should. A single weak link can turn a routine pipeline bug into a privacy incident, a compliance problem or an explanation nobody can defend.\n\n### From source to answer\n\nFor an AI-native data engineer, the job is no longer just moving data from source to target. You are preserving permissions, lineage, provenance and usage constraints as data changes shape across lakehouses, feature stores, vector indexes, prompt layers and evaluation logs. A broken dashboard often fails loudly. A retrieval system with missing metadata filters may keep serving polished answers all day while exposing text that should never have been retrieved.\n\n### Runtime governance\n\nA policy that says support notes with payment disputes must not be exposed to a general assistant sounds crisp in a meeting. Then the real question appears: where does that rule actually live? In the source system, dbt models, Snowflake row policies, the embedding job, the vector store metadata or the retrieval API? Usually, several of them. That is the shift from traditional analytics governance to runtime governance.\n\n### Artifacts that carry obligations\n\n| Data form | Why governance still applies |\n| --- | --- |\n| Raw documents | May contain names, account numbers, health details or contract restrictions. |\n| Cleaned text | Formatting changes do not remove sensitive meaning. |\n| Features | Can encode protected traits through proxies such as ZIP code or employer. |\n| Embeddings | Numeric vectors can still preserve semantic information from sensitive text. |\n| Retrieval chunks | Missing filters can expose restricted passages. |\n| Prompts | May combine user context, retrieved records and hidden instructions. |\n| Model outputs | Can reveal confidential facts or unsupported claims. |\n| Evaluation logs | Often store prompts, context, responses and labels that need retention rules. |\n\n### The governance map\n\nIf an artifact can influence an AI output, it belongs in the governance map. That includes retrieval defaults, chunking parameters, prompt templates, redaction logs and index metadata schemas.\n\n### Retrieval policy as code\n\n```yaml\nretrieval_policy:\n  tenant_filter: required\n  role_filter: required\n  sensitivity_levels_allowed:\n    - public\n    - internal\n  log_prompt_content: masked\n  retention_days: 30\n```\n\n### Proof, not principles\n\nA control that exists only in a policy document and not in executable pipeline logic is aspirational rather than real. The practical question is whether you can prove which data was allowed to influence a response, under which policy, at which version, for which user, at which time.",
              "## 17 / Explainability starts before the answer\n\n### Traceability before generation\n\nA model cannot explain what the platform cannot trace. For an internal assistant answering a benefits question, the explanation depends on which documents were eligible for retrieval, which chunks were selected, which filters were applied and whether the cited text actually supported the answer.\n\n### Citation is not reasoning\n\nExplainability for data engineers is really about traceable artifacts. Citation helps, but citation is not reasoning. A system can point to the right PDF and still stitch together the wrong conclusion. Without lineage, versioning and runtime traces, you are left with a polished answer and no reliable way to inspect how it happened.\n\n### What to store\n\n| Explainability need | Data engineering support |\n| --- | --- |\n| Why did the system return this answer | Store retrieved context, scores, prompt version, response and citations. |\n| Was the user allowed to see that source | Preserve access metadata and enforce authorization during retrieval. |\n| Which data version influenced the output | Track dataset snapshots, index build times and source revisions. |\n| Was the answer grounded | Compare claims against retrieved passages during evaluation. |\n| Can we reproduce the result | Capture model IDs, prompt templates, retrieval parameters and runtime config. |\n\n### An AI request as a query plan\n\nThink of it like a query plan for an AI request. A SQL plan shows joins, scans and filters. An AI trace needs to show retrieval, ranking, prompt construction, model version and post-processing. Because some steps are deterministic and others are probabilistic, reproducibility is uneven. Approximate nearest-neighbor search, reranking and sampling parameters can all change what comes back. You do not need to log everything forever, but you do need to decide before production which inputs, retrieval events, prompt versions, outputs and review actions must remain traceable.",
              "## 18 / Sensitive data and leakage boundaries\n\n### Risk changes shape\n\nA customer name in a source table is easy to spot. A sentence such as \"I lost my card ending in 1234\" inside a support ticket is fairly obvious. But after that ticket gets chunked, embedded with `text-embedding-3-small`, stored in pgvector, retrieved into a prompt, summarized by a model and copied into an evaluation dataset, the risk has not disappeared. It has changed shape.\n\n### Controls by lifecycle stage\n\n| Lifecycle stage | Common risk | Practical control |\n| --- | --- | --- |\n| Source assessment | Restricted data enters AI workflows unclassified | Inventory sources and classify by sensitivity and allowed use. |\n| Ingestion | Raw text lands in broad-access storage | Use landing-zone permissions, encryption and tags. |\n| Preparation | Redaction misses free-text disclosures | Combine pattern detection, entity recognition and manual review. |\n| Feature engineering | Proxy variables encode sensitive attributes | Review feature definitions and document justification. |\n| Embedding generation | Sensitive text becomes semantically searchable | Classify before embedding and restrict index access. |\n| Retrieval | Users get chunks they could not access in the source | Enforce metadata filters and policy checks at query time. |\n| Inference | Prompt contains unnecessary sensitive context | Minimize context and redact where needed. |\n| Evaluation | Logs accumulate real user data | Apply anonymization, sampling controls and retention limits. |\n| Lifecycle management | Deletes do not propagate to derived stores | Remove or quarantine chunks, embeddings, caches and logs. |\n\n### Deletion does not propagate by itself\n\nDeleting a source document does not automatically delete the chunks made from it, the embeddings stored in the index, cached retrieval results or prompt logs quoting its content. Data can outlive its permission state unless you engineer propagation deliberately.\n\n### The control backbone\n\nClassify before transformation. Separate permissions for store, train, retrieve, display and log. Make metadata travel with derived artifacts. Enforce policy at use time, not only upstream. Propagate deletes, retention expiry and consent changes. Sample and review high-risk outputs.\n\n### Four boundaries\n\nLeakage is a boundary failure across time, access, purpose or persistence.\n\n### Leakage taxonomy\n\n| Leakage type | What crosses the boundary | Example failure | Engineering response |\n| --- | --- | --- | --- |\n| Temporal leakage | Future information enters training or evaluation | A churn model uses a cancellation event recorded after prediction time | Enforce point-in-time joins and snapshot datasets. |\n| Label leakage | The target is encoded in an input | Fraud features include downstream investigation status | Review lineage and exclude post-outcome fields. |\n| Access leakage | Restricted data reaches unauthorized users or services | Shared index searched without tenant filters | Partition or filter indexes and check auth during retrieval. |\n| Retrieval leakage | Irrelevant or restricted chunks enter the prompt | Contractor sees internal HR notes | Use metadata filters and policy-aware reranking. |\n| Prompt leakage | Sensitive context is inserted or logged unnecessarily | Full customer profile copied into prompt logs | Minimize context and mask logs. |\n| Output leakage | Response reveals confidential or inferred information | Summary exposes details from inaccessible documents | Validate output against permissions and add review gates. |\n| Evaluation leakage | Test data overlaps with tuning or training data | Benchmark contains prompt-tuning examples | Track split lineage and membership. |\n\n### A filtered request record\n\n```json\n{\n  \"request_id\": \"req_4821\",\n  \"user_role\": \"contractor\",\n  \"tenant_id\": \"acme\",\n  \"retrieval_filters\": {\n    \"tenant\": \"acme\",\n    \"allowed_sensitivity\": [\"public\"],\n    \"role\": \"contractor\"\n  },\n  \"prompt_logging\": \"masked\"\n}\n```\n\n### Why role filtering matters\n\nA retrieval app that passes `tenant_id` but forgets role filtering may seem fine in QA if all testers are employees. The bug only appears when a lower-privilege user hits the same index with a broader semantic query.",
              "## 19 / Ownership makes controls real\n\n### Ownerless governance\n\nCross-functional is not the same as ownerless. Governance breaks when everyone nods in the planning meeting and nobody carries the pager when restricted data appears in retrieval logs. AI-native systems need named owners for controls, exceptions and incident response.\n\n### The responsibility split\n\n| Responsibility area | Typical owner | Data engineering role |\n| --- | --- | --- |\n| Data classification standards | Security, privacy, governance, legal | Implement labels in schemas, catalogs and pipelines. |\n| Source data contracts | Data owners, app teams | Validate schema, freshness, permissions and retention metadata. |\n| Feature and dataset lineage | Data engineering, ML engineering | Track definitions, joins, timestamps and downstream consumers. |\n| Embedding and index governance | Data engineering, AI platform teams | Preserve metadata and propagate deletes. |\n| Retrieval authorization | Application, platform, security | Ensure APIs enforce tenant, role and purpose filters. |\n| Prompt and response logging | Application, AI platform, security | Define masking, sampling, retention and review. |\n| Explainability evidence | AI platform, data engineering, product | Store traces linking outputs to sources and versions. |\n| Incident response | Security, platform, data, product | Supply logs, lineage, affected artifacts and remediation steps. |\n\n### Seven operating questions\n\nA lightweight operating model starts with seven questions: who approves data sources for AI use, who maintains sensitivity and allowed-use metadata, who owns embeddings and evaluation datasets, who can approve exceptions, who responds when restricted data appears in outputs or logs, who signs off on retention and deletion propagation, and who verifies that traces are sufficient for audit and debugging.\n\n### Flow versus accountability\n\nGood architecture explains how data flows. A good operating model explains who is accountable when that flow violates policy, loses lineage or cannot explain itself. Speed without ownership creates invisible risk debt.",
              "## 20 / Lab: embedding drift detection over time\n\n### What the lab builds\n\nThe lab builds a compact drift-monitoring workflow that simulates temporal windows, generates embeddings in a shared space, computes quantitative drift signals and converts those signals into operational thresholds and remediation actions. It uses the built-in Breast Cancer Wisconsin dataset as a stand-in for production embedding inputs, with controlled feature shifts to simulate temporal windows.\n\n### Methods\n\nMaterials and methods: feature standardization with StandardScaler, low-dimensional projection with PCA to create a stable comparison space, centroid-level Euclidean distance and distribution-level Wasserstein distance, plus rule-based alerting thresholds and remediation recommendations.\n\n### Trade-offs\n\nArchitectural trade-offs: PCA is fast and interpretable but may miss nonlinear structure; tighter thresholds catch issues earlier but increase false positives; looser thresholds reduce alert fatigue but risk delayed intervention.\n\n### Four windows\n\nFour windows are generated: `W1_baseline` with scale 1.00, bias 0.00 and noise 0.00; `W2_light` with 1.01, 0.02 and 0.01; `W3_moderate` with 1.03, 0.06 and 0.02; `W4_high` with 1.08, 0.12 and 0.03. The scaler and PCA are fit only on the baseline, then all windows are projected into the same coordinate system so distances are comparable.\n\n### Score and thresholds\n\nThe composite drift score is `0.6 * centroid_l2 + 0.4 * mean_wasserstein`. Thresholds use stable early windows: warning is mean plus two standard deviations, critical is mean plus three. Drift levels map to actions: critical triggers retraining, freezes risky deployment and runs root-cause analysis; warning increases monitoring cadence and runs targeted feature diagnostics; normal continues standard monitoring and weekly validation.\n\n### Student tasks\n\nStudent tasks ask for an equal-weight score of 0.5 and 0.5 with a comparison of window rankings, and a stricter policy with multipliers 1.5 and 2.5 that reclassifies drift levels and counts each level. The workflow can be extended to real vector stores and production telemetry by replacing synthetic windows with timestamped embedding logs.",
              "## 21 / Governed AI systems and ownership\n\n### What governance means here\n\nGovernance in AI data engineering means more than moving data into a warehouse or vector index. It requires controls for sensitive data, evidence for why an answer appeared, clear ownership across teams and a defined response when an AI incident happens.\n\nAsk what sensitive data can enter ingestion, embeddings, prompts, retrieval results and logs. Leakage risk follows every copy and transformation. Ask how an output can be defended. Explainability comes from lineage, citations, retrieval context and decision records, not just a confident model response. Ask who owns each control across data engineering, AI engineering, platforms, security, application and product. Finally, decide where incidents go when permissions fail, evidence is missing or harmful output appears. Escalation paths are part of the design.",
              "## 22 / HarborCare Copilot and pipeline risk\n\n### The case\n\nHarborCare is a fictional healthcare benefits copilot answering employee and HR questions from claim summaries, plan documents, provider directories and policy rules. It serves high daily volume, includes protected data and must respond fast enough for support operations while remaining auditable.\n\nBecause the corpus contains protected health information and employee identifiers, governance cannot be deferred. Classification, minimization and role-aware access start before indexing. This is a retrieval-augmented system, so risk sits in both stored content and retrieved context. Bad retrieval can expose or distort information before generation even starts. Healthcare workflows need records that show what data, version and policy supported an answer. Computers need evidence, not just a transcript.\n\n### Connectors and preparation\n\nConnectors often pull more than the copilot needs. If claims feeds or policy repositories include unnecessary fields, the risk begins before chunking or embedding. Cleaning, chunking and redaction shape what the model can later see. A bad chunk can detach a clause from its consent language or preserve hidden identifiers.\n\n### Retrieval and output\n\nControl is an access boundary, not just a ranking step. Role filters must apply before vector search and re-ranking so users only receive permitted evidence. The final answer and its logs can still leak data. Generated text, citations and observability events need storage controls, redaction and retention rules. Governance is not a final checkpoint. It is a control surface attached to each stage.\n\n### Analytics access versus AI access\n\nAn analytics report serves a known audience through a fixed dashboard. A copilot serves an interactive user whose questions change, so access must adapt per request. Dashboard security often happens before report delivery. In AI, permissions must be enforced at every retrieval because the system assembles context dynamically.\n\nA report shows fixed metrics and visible rows. A copilot generates new text from retrieved evidence, so the answer itself becomes a governance artifact. For BI, risk is usually the exposed dataset. For AI, risk includes source content, retrieved passages, prompts, generated output and logs, which is why policy-aware pipelines matter.",
              "## 23 / Explainable answers and decision records\n\n### Evidence, not model weights\n\nExplainability here does not mean exposing model weights. It means retaining enough structured evidence to understand why a specific answer was produced. Keep the exact retrieved passages or references that grounded the answer. Reviewers need to inspect what evidence the model actually received.\n\n### What to retain\n\nAnswers depend on document versioning. If a benefits policy changed yesterday, version metadata helps distinguish stale data from model error. Retrieval scores and result identifiers show whether the system found strong evidence or weak matches. That helps diagnose ranking problems versus content problems. When access or answer style is constrained by policy, store which rule applied. Governance needs traceable decisions, not undocumented behavior. Explainability is evidence plus lineage, not just fluent output.\n\n### Ownership and escalation\n\nEverything starts with cataloging, data classification and clear source owners. If the corpus is poorly labeled, every downstream control becomes weaker. Data engineering owns validation, redaction, minimization and index refresh pipelines. These controls decide what can enter runtime and what should be excluded.\n\nDecision records capture user role, document IDs, policy version, retrieval identifiers and response IDs. They support investigation without dumping raw sensitive text into observability. Above the evidence layer sit audits, appeals and escalation. Security, AI engineering, platform, application and product teams each need explicit handoffs when incidents occur. Good governance joins evidence, controls and ownership into one operating model.\n\n### Three takeaways\n\nApply access control, minimization and redaction across ingestion, retrieval, generation and logging. The safest sensitive field is often the one the AI system never receives. Tie answers to source lineage, versions, retrieval traces and policy rules. If evidence is missing, support teams cannot separate model failure from data failure. Assign responsibilities for controls, monitoring, reviews and escalation before launch. Shared ownership works only when each team knows its operational boundary.",
              "## 24 / Monitoring signals and evaluation\n\n### Infrastructure health is not AI quality\n\nAn AI system can look perfectly healthy right up to the moment users stop trusting it. Your batch job finishes. Your vector store responds in 40 ms. Your API returns 200 OK. And yet the assistant starts citing stale policies, the retrieval layer misses the obvious document, or a model keeps scoring users with features that no longer mean what they used to mean.\n\nMonitoring turns assumptions into observable signals, connects those signals to actions and makes sure the system can be diagnosed, governed and recovered under production pressure.\n\n### Drift is a family of problems\n\nDifferent layers drift in different ways and fail differently. A raw source feed can change shape. A feature pipeline can keep producing valid values that no longer carry the same predictive signal. An embedding index can silently mix vectors from incompatible model versions.\n\n| Drift type | What changes | What you might observe | Why it matters |\n| --- | --- | --- | --- |\n| Data drift | Raw input distributions | New categories, missing fields, longer documents | Source contracts and transformations stop matching reality. |\n| Feature drift | Model-facing variables | Aggregates shift, ratios spike, encodings thin out | Features remain valid but lose predictive meaning. |\n| Label drift | Outcomes or targets | Fraud labels, churn definitions, review results move | Training and evaluation logic become stale. |\n| Embedding drift | Vector representations | Similarity scores shift, clusters look different | Old and new embeddings may no longer be comparable. |\n| Retrieval drift | Search relevance | Plausible results miss recent or domain-critical content | RAG and semantic search degrade without obvious outages. |\n\nMany of these failures happen with completely valid data. A column can pass null checks. A document can parse cleanly. A vector search can return `top_k=5` every time. Green dashboards do not guarantee useful AI behavior.\n\nAsk which assumption would hurt if it stopped being true. For a recommendation system, it may be that past clicks still predict intent. For a RAG pipeline, it may be that all indexed chunks were embedded with the same model and chunking strategy. For an internal assistant, it may be that retrieved policy documents are current and permission-filtered. Once you name the assumption, you can name the signal.\n\n### Monitoring versus evaluation\n\nMonitoring detects movement. Evaluation tells you whether the movement changed relevance, correctness, groundedness, safety or business outcomes. A feature distribution can shift because a new product line launched and the model may handle it fine. A small retrieval-quality drop in a compliance workflow can become a serious operational risk.\n\n| Signal category | Example signals | What it helps detect |\n| --- | --- | --- |\n| Pipeline health | Freshness, job success, row counts, processing lag | Broken or delayed data movement. |\n| Data quality | Null rates, duplicates, range checks, parse success | Invalid or suspicious inputs. |\n| Feature or embedding health | Distribution shifts, model version, vector dimensionality, similarity spread | Train-serve skew and mixed embedding populations. |\n| Retrieval quality | Benchmark recall, top-k relevance, citation coverage, no-result rate | Missing or weak evidence. |\n| Output quality | Human ratings, groundedness checks, correction rate | User-visible AI degradation. |\n| Business and safety outcomes | Conversion, complaint rate, fraud loss, policy violations | Real-world impact and governance risk. |\n\nA good workload has a minimum viable signal set, not a maximal one: `index_freshness_minutes`, the percentage of chunks using the current embedding model version, benchmark relevance on a fixed query set, citation coverage where citations are required, permission-filter enforcement rate, no-result and low-confidence retrieval rate, and escalation or fallback rate.\n\nSuppose retrieval relevance on benchmark queries drops by 18 percent while latency stays flat and uptime remains perfect. That is an AI quality incident, not an infrastructure incident. Respond by inspecting source document changes, chunking revisions, re-embedding status or ranking logic rather than scaling more pods.\n\nA signal becomes operational only when it can trigger an action. If low relevance means watching a graph, that is decoration. If it means pausing the rollout, comparing index versions, rerunning the benchmark set and routing high-risk queries to fallback, that is a system people can trust.\n\n```json\n{\n  \"workload\": \"internal_policy_assistant\",\n  \"signals\": {\n    \"index_freshness_sla_hours\": 4,\n    \"embedding_version_match_pct\": 99.5,\n    \"retrieval_benchmark_min\": 0.82,\n    \"citation_coverage_min\": 0.95,\n    \"permission_filter_failures_max\": 0\n  }\n}\n```",
              "## 25 / Ownership boundaries and lifecycle design\n\n### Signals need owners\n\nA drift alert without an owner is production ambience. Everyone sees it and nobody acts. AI failures often appear in one layer while originating in another, so ownership gets fuzzy fast. A retrieval-quality drop may show up in the application, but the cause could live in ingestion, chunking, embedding generation, vector index settings, prompt assembly, access filtering or an upstream policy change.\n\nA practical ownership map answers four questions: who detects the issue, who determines severity and user impact, who can change the system safely, and who approves recovery when governance or compliance risk is involved.\n\n| Area | Primary responsibility | Typical owner | Escalates to |\n| --- | --- | --- | --- |\n| Source freshness and schema | Delayed feeds, schema changes, source contract issues | Data engineering | Source app team, platform |\n| Transformation and feature pipelines | Joins, aggregates, reproducibility, point-in-time correctness | Data engineering | AI or analytics engineering |\n| Embedding generation | Model version, chunking rules, failed records, batch completeness | Data engineering or AI platform | ML engineering, platform |\n| Vector index and retrieval | Index freshness, relevance benchmarks, access filtering | AI platform or application engineering | Data engineering, governance |\n| Output quality | Groundedness, task success, harmful output review | AI or application team | Product, risk owners |\n| Sensitive data controls | Masking, retention, consent, access policy enforcement | Security or governance | Legal, compliance |\n| Business impact | Whether degradation is tolerable for the use case | Product owner | Incident command, leadership |\n\nConnect each signal to a first response. `index_freshness` breached means rerun ingestion and embedding backlog checks. A retrieval benchmark below baseline means compare source, chunking and ranking changes. A restricted document retrieved means disable the path, preserve logs and start a security review. A correction rate above tolerance means route traffic to fallback and inspect context quality.\n\nAs a data engineer, you usually sit in the uncomfortable middle. You may not own the model, product choice or legal policy, but you often own the lineage, timestamps, run IDs, source contracts, access attributes and reproducibility hooks that let everyone else explain what happened.\n\n### Design monitoring into the lifecycle\n\nThe most painful monitoring projects start after quality has already dropped. Suddenly everyone wants to know whether the embedding distribution changed last month, whether the source docs were updated and whether the old index can be reconstructed. If the answer is probably or not exactly, the system was never truly observable.\n\nEvery lifecycle stage should emit enough metadata to answer a future question: what data was used, what version transformed it, what model represented it and what controls governed its use.\n\n| Lifecycle stage | What to capture | Why it matters |\n| --- | --- | --- |\n| Source assessment | Owner, update frequency, schema contract, sensitivity class | Confirms data is appropriate and governed. |\n| Ingestion and preparation | Run IDs, timestamps, parse errors, dropped records | Shows completeness and processing consistency. |\n| Feature or dataset creation | Transformation version, join logic, time windows, quality profile | Supports reproducibility and drift diagnosis. |\n| Embedding generation | Embedding model version, chunking strategy, vector dimension, failed chunks | Prevents silent mixing of incompatible vectors. |\n| Indexing and retrieval | Index build version, document IDs, permission filters, top-k scores | Makes retrieval quality and access behavior visible. |\n| Inference and application use | Prompt metadata, source references, latency, fallback path, user feedback | Connects data inputs to user-facing behavior. |\n| Evaluation and monitoring | Benchmarks, thresholds, evaluator version, incident decisions | Turns observation into release gates. |\n| Lifecycle management | Retention policy, deprecation date, rollback artifacts, re-embedding plan | Keeps stale data and representations from lingering. |\n\nCapture diagnostic metadata, not everything forever. Hashes, references, redacted traces, classifications and version IDs often give enough evidence without violating retention or privacy constraints.\n\nKeep the monitoring plan small enough to operate. A five-signal plan tied to clear actions is stronger than a fifty-chart dashboard nobody trusts. A starter checklist: at least two pipeline or data health signals, at least two AI quality signals, at least one governance or security signal, one escalation rule with named investigators and approvers, and one lifecycle action such as re-embedding, rollback, quarantine or human review.\n\nFor one layer deeper, keep a lightweight benchmark set of 10 to 20 representative queries, records or cases. Define what good looks like and rerun the set whenever data sources, chunking rules, embedding models, retrieval settings or prompts change. Reliable AI systems are not the ones with the prettiest dashboards. They are the ones where important assumptions are visible, risky changes are measurable and the team knows exactly who acts when a threshold is crossed.",
              "## 26 / Case study: Northstar Claims Assistant\n\n### The incident\n\nOn 2024-06-17, Maya Chen, Northstar Insurance's lead AI data engineer, walked into the claims war room with three screenshots printed on paper. The first showed the claims assistant quoting an internal litigation guideline to a contractor. The second showed an answer grounded in a repair estimate uploaded after the adjuster had asked the question. The third looked harmless: all service dashboards were green.\n\nNorthstar had promised a full rollout before 2024-Q3 hurricane season. Adjusters used the assistant to summarize claim facts, pull policy language and compare repair estimates while customers waited on the phone. Delaying launch would miss the staffing plan tied to a projected 11 percent reduction in handle time. Shipping the current design risked a legal freeze. The decision was whether to keep the analytics-first architecture or force a redesign into an AI-native lifecycle with governance, retrieval controls and evaluation built in.\n\n### Timeline\n\n| Date | Event |\n| --- | --- |\n| 2024-02-05 | The data platform team exported the Snowflake claims mart to a search prototype because it contained denormalized policy, claim and estimate fields used by reporting. |\n| 2024-03-01 | AI engineering launched a pilot using `text-embedding-3-small` for chunk embeddings and `pgvector` for similarity search over 4.8 million chunks. |\n| 2024-03-28 | Pilot review reported 84 percent grounded answers on 300 manually reviewed adjuster prompts and 1.9 s p95 end-to-end latency. |\n| 2024-04-22 | Contractors were added for catastrophe overflow. Access control stayed at the application layer; the vector index remained shared. |\n| 2024-05-14 | Claims operations introduced a new Gulf region and longer repair-estimate templates. No embedding evaluation set or drift owner existed. |\n| 2024-06-07 | Legal escalated an answer citing internal HR-related leave guidance stored in the same broad policy corpus as claims documents. |\n| 2024-06-17 | Maya was asked to recommend a production architecture by Friday. |\n\nThe team had increased top k from 5 to 12, rewritten prompts twice and added a simple blacklist of document titles. None fixed the underlying problem because the retrieval corpus was assembled from reporting logic, not retrieval-safe source pathways.\n\n### Exhibits\n\n| Metric | March pilot | June production shadow | Why it matters |\n| --- | --- | --- | --- |\n| Grounded answers on audited sample | 84% | 61% | Answers sound fluent but cite weaker evidence. |\n| Unauthorized retrieval incidents | 0 | 7 | Shared index leaked restricted material. |\n| p95 end-to-end latency | 1.9 s | 2.1 s | Runtime still looks acceptable. |\n| Ingestion freshness | 14 min | 12 min | Freshness alone did not protect answer quality. |\n| Top-k retrieval non-empty rate | 99.2% | 99.6% | Retrieval returns something, not necessarily the right thing. |\n| Audit reconstruction time per answer | 2 min | 47 min | Missing prompt, filter and chunk evidence slowed investigations. |\n| Monthly run cost | $18.4k | $22.7k | Higher spend without better control. |\n\nMedian cosine distance to the March centroid rose from 0.09 in March to 0.118 in May and 0.148 in June. Paired with longer chunks and region-specific vocabulary, that explained why retrieval quality drifted while infrastructure dashboards stayed green.\n\n| Data path | Current implementation | Failure observed |\n| --- | --- | --- |\n| Source preparation | Reporting mart flattening | Mixed timestamps and overwritten note versions. |\n| Access control | UI role checks only | Restricted chunks still retrievable from shared index. |\n| Chunk metadata | Document title and claim ID | Missing source version, retention class and access tier. |\n| Evaluation | One-time pilot sample | No recurring relevance or answer-quality tracking. |\n| Logging | Final answer only | Could not reconstruct selected chunks and filters. |\n\n### Questions and model answers\n\nWhich exhibit shows this is not simple uptime or latency? Top-k non-empty retrieval improved to 99.6 percent, freshness improved to 12 minutes and p95 stayed near 2.1 s, yet grounded answers fell to 61 percent. The failing stage is the retrieve-evaluate loop and the quality of assembled context.\n\nWhere is point-in-time correctness violated? The assistant used repair or settlement information created after the adjuster's question. Northstar needs source-versioned records and retrieval eligibility filtered by event timestamp so only chunks available at question time can be embedded or retrieved for replay and evaluation.\n\nWhich option solves both contractor leakage and the 47-minute audit? Option 2, because permission-filtered retrieval and Snowflake access policies address leakage while evidence-rich logging of source passages, filters, prompt templates and runtime settings reduces reconstruction time.\n\nWhat suggests skew rather than poor prompt wording? Longer repair templates, the new Gulf region, rising centroid distance from 0.09 to 0.148 and a pilot evaluation set frozen in March. That is skew between what the stack was tuned on and what it now serves against.\n\nWho owns the signals? AI engineering owns embedding drift and reruns the notebook plus retrieval eval. Security owns unauthorized retrieval and audits access filters and corpus membership. Product operations owns grounded-answer drops and starts human review on failing intent clusters. Data engineering owns deletion propagation and verifies dbt lineage plus downstream purge completion in Snowflake and pgvector.\n\n### Case quiz answers\n\nQ1: The evidence is stale portal text on Sep 12, Recall@5 of 0.42 on the 50-question benchmark versus 0.81 with embeddings plus metadata, accuracy rising from 61 percent to 87 percent after re-chunking and source cleanup, and red-team leaks after metadata filters were disabled.\n\nQ2: Endorse RAG with chunked documents, embeddings, vector retrieval and metadata filters. Reject fine-tuned-only and vector search without metadata filters. The RAG path reached 3.2 seconds p95 inside the 4-second SLA.\n\nQ3: Policy PDFs needed OCR cleanup, section-aware chunking and lineage IDs. Portal pages mainly needed `effective_date` and `document_status`. Eligibility tables in Snowflake needed normalized templated text fragments with source keys. Prepared inputs carried role, region, effective_date, source and status.\n\nQ4: Whole-document embeddings averaged many topics. Chunking into roughly 450 to 650 tokens with overlap aligned retrieval units to answerable passages and improved citation quality. Smaller passages used context window space more efficiently.\n\nQ5: The $6.4k to $11.8k increase bought accuracy from 58 percent to 87 percent, citations to approved current sources, permission-safe retrieval with zero cross-role leaks and a 3.2-second p95 inside the 4-second SLA.",
              "## 27 / Decision points and analysis walkthrough\n\n### Option 1: bolt RAG onto the reporting mart\n\nExpected impact: ships fastest and reuses current Snowflake exports, but preserves analytics assumptions that already caused retrieval leakage and stale context.\n\nKey risk: permission mistakes and point-in-time errors keep appearing because governance and retrieval metadata are added after the data has been flattened.\n\nEvidence to confirm: a two-week pilot with zero unauthorized chunk exposures and stable answer grounding above 90 percent without per-team exceptions.\n\nEvidence to kill: any repeat of contractor-visible internal policy text or answers citing claim status updates created after the user question.\n\n### Option 2: AI-native retrieval pipeline\n\nExpected impact: raises implementation effort up front but aligns prepare, embed, retrieve, infer and evaluate stages so the assistant can be governed and debugged in production.\n\nKey risk: the team must invest in new ownership, evaluation datasets and explainability storage before launch, which can threaten the Q3 release date.\n\nEvidence to confirm: offline replay shows lower unauthorized retrievals, answer-grounding evidence for every response and less than 5 percent train-serve mismatch across sampled requests.\n\nEvidence to kill: if the redesign cannot meet p95 retrieval-plus-generation latency under 2.2 seconds or doubles monthly run cost without measurable quality gains, leadership will reject it.\n\n### Option 3: fine-tune only\n\nExpected impact: may reduce per-request latency and simplify runtime architecture, but weakens freshness, explainability and deletion propagation for changing policy content.\n\nKey risk: model behavior drifts away from current policy versions and auditors cannot reconstruct disputed answers from source passages.\n\nEvidence to confirm: a holdout set within 3 points of RAG accuracy while proving document-version traceability and compliant deletion workflows.\n\nEvidence to kill: policy updates taking more than 24 hours to reflect safely, or legal being unable to reconstruct an answer.\n\n### The call\n\nOption 1 wins only on calendar speed. It loses on point-in-time correctness, governance, explainability, freshness and launch risk because the shared index is populated from flattened reporting tables with mixed timestamps and no durable link to source document versions. Option 3 looks cleaner but claims policy changes every few days during storm events and legal wants evidence down to selected passages, retrieval scores and row-level policy filters.\n\nOption 2 is the right call. Use dbt to define AI-ready transformations instead of exporting the analytics mart. Normalize claim notes, repair estimates, policy endorsements and permission tags as separate retrieval-ready assets. Generate embeddings with `text-embedding-3-small`. Store vectors in `pgvector` with document version, chunk boundaries, claim region and access classification attached as metadata. Apply Snowflake row-level access policies before publishing retrieval candidates and again at use time as permission filters. One bad export should not become one bad answer.\n\nAverage chunk length grew from 420 tokens to 690, cosine distance versus the March centroid rose about 64 percent from 0.09 to 0.148, and the new Gulf region introduced vocabulary absent from the original evaluation set. The redesign accepts a slower Q3 launch by roughly four weeks. The payoff targeted is grounded answers above 80 percent, unauthorized retrievals at zero, audit reconstruction under 15 minutes and incident routing to an owner within 10 minutes.\n\n### Redesign quiz answers\n\nQ1: Option 2 aligns source preparation, embedding, retrieval, inference and evaluation into a governable lifecycle, supports permission metadata and source versions in the vector-serving layer, and applies access controls before publishing candidates and again at use time.\n\nQ2: The assistant cited a repair or settlement note created after the user asked. Filtering retrieval eligibility by event timestamp and preserving source-versioned records prevent future-derived context. Mixed timestamps and overwritten note versions in the reporting mart contributed.\n\nQ3: Ingestion freshness improved from 14 to 12 minutes, yet grounded answers fell from 84 percent in March to 61 percent in June while p95 stayed near 2.1 s. Unauthorized retrievals rose after contractors were added and audit reconstruction expanded from 2 to 47 minutes.\n\nQ4: Apply Snowflake row-level access policies before publishing candidates and again at use time. Store vectors with document version, chunk boundaries, claim region and access classification. Preserve source passages, retrieval scores, filters, prompt templates and runtime settings. Normalize claim notes, repair estimates, policy endorsements and permission tags with dbt-managed transformations.\n\nQ5: Data engineering owns source contracts, dbt models and deletion propagation. AI engineering owns chunking, embedding generation, retrieval evaluation and prompt templates. Platform owns pgvector performance and runtime observability. Product operations owns answer-review queues and business outcome thresholds.",
              "## 28 / Derived notes: lifecycle and feature engineering\n\n### Three-bullet takeaway\n\nCore architecture pattern: an AI-native pipeline is a continuous closed loop, not a one-way ETL handoff, that starts with strict source contracts and produces both governed structured features and versioned semantic embeddings under point-in-time and access controls.\n\nNumber one failure mode: data leakage, such as training on future post-event values, and train/serve skew from divergent offline batch SQL versus live online streaming logic, window definitions or null handling. These make models shine in notebooks but fail silently in production.\n\nKey engineering trade-off: deeper lifecycle governance gates, point-in-time joins and dual structured and vector pipelines add coordination overhead and latency management, whereas lightweight BI-style batch jobs run faster upfront but expose live AI systems to stale context, drift and cross-user PII leaks.\n\n### Unified glossary\n\nAI Data Lifecycle: the closed-loop path connecting Source Assessment to Preparation, Embedding and Feature Engineering, Retrieval and Serving, Evaluation and Observability, then Feedback and Rebuilds.\n\nAnalytics-ready serves human analysts reading dashboards through daily batch metrics and clean joins. AI-ready serves live software and models acting in real time, requiring sub-second or minutes-level freshness, semantic chunking, context-level permissions and full source lineage.\n\nSource Contract: the foundational agreement defined before model selection that specifies data ownership, refresh cadence, schema rules, approved fields and sensitivity handling for every upstream system.\n\nFeature Contract: a versioned specification defining name, entity_key, business_meaning, window_logic, refresh_cadence, allowed_staleness, null_handling, owner and version.\n\nData Leakage: including information in training features that would not exist at the exact moment of prediction, such as `case_resolution_time_minutes` used to predict whether an open support case will escalate.\n\nPoint-in-Time Correctness, or \"as of\": reconstructing exact historical state so every training row uses only data available at or before the prediction timestamp.\n\nTrain/Serve Skew: divergence caused by nightly batch SQL versus live streaming events, NULL imputed to 0 offline versus -1 online, UTC versus local timezones, or rolling 24-hour windows versus calendar days.\n\nProxy Features: non-sensitive attributes such as ZIP code, language preference, device type or income band from which a model can indirectly infer a protected attribute.\n\nContext Control: granular governance deciding which chunks or notes can be embedded, retrieved, cited or blocked for a given user and workload, beyond database row-level security.\n\n### Analytics pipelines versus AI-native pipelines\n\n| Dimension | Traditional analytics pipeline | AI-native data pipeline |\n| --- | --- | --- |\n| Primary consumers | Human analysts, dashboards, BI reports | Live assistants, RAG retrievers, recommenders, agents |\n| Core outputs | Clean tables, dimensions, aggregates, metrics | Governed features, text chunks, vector embeddings, lineage IDs, metadata |\n| Refresh cadence | Scheduled nightly batch, for example completed by 7 a.m. | Hybrid event-driven or minutes-level sync plus batch, such as 15-minute inventory sync |\n| Impact of bad or stale data | Delayed report or distorted historical metric | Wrong live answer on a customer call, hallucination or compliance leak |\n| Observability scope | Job completion, row counts, SQL schema tests | Embedding age, retrieval hit rate, top-chunk overlap, unanswered queries, drift |\n\n### Core data objects\n\n| Object | What it represents | Concrete example | Primary engineering concern |\n| --- | --- | --- | --- |\n| Raw Data | Unprocessed operational records | Clickstream event, CRM row, claim PDF | Schema drift, source quality, PII exposure |\n| Feature | Model-usable derived signal | `open_cases_last_30d_as_of_open` | Point-in-time correctness, train/serve skew, freshness |\n| Label | Ground-truth outcome for supervised ML | `ticket_escalated`, malignant / benign | Label delay, ambiguity, target leakage |\n| Metadata | Descriptive attributes for filtering and control | `state`, `effective_date`, `access_group`, `chunking_version` | Completeness, controlled vocabulary, policy enforcement |\n| Embedding | Dense numeric vector representation | 1536-dim vector from `text-embedding-model-v3` | Model versioning, full re-indexing on model swap |\n\n### Lifecycle control and ownership matrix\n\n| Lifecycle stage | Primary owner | Required controls | Remediation if gate fails |\n| --- | --- | --- | --- |\n| 1. Business Framing | Product Owner, Accountable | C1 PII scan and scope | Clarify allowed data boundaries and SLA targets. |\n| 2. Data Acquisition | Data Engineer, Accountable | C1 PII scan, C2 schema contract | Fix upstream connectors or redact PII at landing. |\n| 3. Data Validation | Data Engineer, Responsible | C2 schema contract test | Quarantine malformed or null batches. |\n| 4. Feature Engineering | ML Engineer, Responsible | C2 schema, C3 bias and parity check | Align offline and online logic, fix point-in-time joins. |\n| 5. Model Training | ML Engineer, Accountable | C3 bias and parity, C4 performance gate | Tune hyperparameters, rebalance classes or re-engineer features. |\n| 6. Model Validation | Risk Officer, Accountable | C3 bias and parity, C4 performance gate | Block release with `status = 'review'` if metrics miss policy thresholds. |\n| 7. Deployment | ML Engineer, Responsible | C4 performance gate | Enforce pre-swap index checks and fallback or abstain paths. |\n| 8. Monitoring and Drift | Data Steward, Accountable | C5 drift threshold alert | Trigger re-embedding, feature backfill or retraining. |\n\n### Failure modes\n\nEliminate train/serve skew with single-source logic in dbt, Spark, Flink or versioned SQL plus online materialization so offline and online share window logic, timezone handling and null defaults.\n\nVersion every retrieval and feature dependency: `embedding_model_version`, `chunking_strategy_version`, source_document hash and `index_build_timestamp` must travel together because swapping an embedding model changes vector geometry and invalidates old indexes.\n\nDefine degradation rules before launch. For stale features or indexes, serve cached values for low-risk recommendations but block the response when security or policy metadata is missing.\n\nAudit control concentration with ownership matrices and control heatmaps to avoid a single overloaded team without automated CI/CD gates and separation of duties.\n\n### Lab code notes\n\nThe lab uses the deterministic 569-row Breast Cancer Wisconsin proxy dataset. `train_test_split` with `test_size=0.25`, `random_state=42` and `stratify=y` creates reproducible audit evidence. A `Pipeline` of `StandardScaler` and `LogisticRegression(max_iter=1000)` prevents train/serve skew by binding scaling and classification into one object.\n\n```python\nnull_counts = df.isnull().sum().sort_values(ascending=False)\nschema_snapshot = df.dtypes.astype(str).rename('dtype')\nduplicate_rows = int(df.duplicated().sum())\nclass_balance = df['target_label'].value_counts(normalize=True).rename('ratio')\n```\n\n```python\npolicy_thresholds = {'accuracy': 0.90, 'recall': 0.90, 'roc_auc': 0.95}\nobserved = dict(zip(metric_report['metric'], metric_report['value']))\n\ngate_results = []\nfor metric_name, threshold in policy_thresholds.items():\n    observed_value = float(observed.get(metric_name, np.nan))\n    gate_results.append({\n        'metric': metric_name,\n        'threshold': threshold,\n        'observed': round(observed_value, 4),\n        'status': 'pass' if observed_value >= threshold else 'review'\n    })\n```\n\nTightening recall to 0.94 and roc_auc to 0.97 in Student Task 2 flips borderline metrics from `pass` to `review`, halting deployment until Model Validation and ML Engineering remediate. The RACI pivot and control heatmap expose concentration risk across owners.\n\n### Quiz answers\n\nQ1: B. `total_agent_messages_before_close` violates point-in-time correctness because the count until close is unknown while the ticket is open.\n\nQ2: B. Mismatched null handling and window semantics cause train/serve skew, fixed by a versioned feature contract with single-source transformation logic.\n\nQ3: B. BI pipelines optimize for daily reporting, not minutes-level freshness, governed text chunks, embeddings and inference-time context packaging.\n\nQ4: B. A `review` status is a hard release gate. Deployment stops and remediation routes to Model Validation and ML Engineering.\n\nQ5: B. AI-native observability tracks embedding age, retrieval hit rate, chunk overlap, unanswered questions and escalation drift.",
              "## 29 / Derived notes: drift, risk and governance\n\n### Three-bullet takeaway\n\nCore architecture pattern: AI observability moves beyond green ETL status to measure outcome health such as grounded answer rate, hit rate, stale passage rate and embedding drift, and enforces executable governance boundaries across raw text, chunks, vectors, prompts and evaluation logs.\n\nNumber one failure mode: green systems still fail and derived-artifact leakage. A pipeline can run cleanly with low latency while grounded accuracy collapses from 91 percent to 68 percent because deletions were not propagated, role or tenant filters were missing, or sensitive PII lingered in indexes and prompt logs after source deletion.\n\nKey engineering trade-off: combining centroid Euclidean L2 with Wasserstein distance and stricter multipliers such as 1.5 sigma and 2.5 sigma catches drift earlier and protects compliance, at the cost of compute and false-positive triage.\n\n### Glossary\n\nInput Drift covers data distribution shifts, schema shifts, missing deletion feeds and delayed policy uploads. Loaded today is not policy current.\n\nRepresentation Drift covers engineered features, embedding distributions and index aging caused by changing demographics, new terminology or embedding model swaps.\n\nOutcome Drift is degradation in retrieval or answer quality measured by grounded answer rate, top-5 hit rate, stale passage rate or no-result rate even when APIs return 200 OK.\n\nRolling Baseline is a reference window such as the prior eight weeks or stable W1 to W2 windows used to compute mean and sigma limits.\n\nCentroid Euclidean Distance, or L2, measures straight-line shift between baseline and current embedding cloud centers. It is lightweight but blind to spread and shape changes.\n\nWasserstein Distance measures statistical distance along each embedding axis and captures spread, skew and shape that centroid averages miss.\n\nFour leakage boundaries: time, access, purpose and persistence. Executable governance means rules live in YAML retrieval filters, RBAC checks and redaction pipelines, not only in a PDF.\n\n### Seven types of leakage\n\n| Leakage type | What crosses the boundary | Concrete failure | Engineering fix |\n| --- | --- | --- | --- |\n| Temporal Leakage | Future facts enter training or evaluation | Churn model uses cancellation timestamp recorded after prediction time | Enforce point-in-time joins and historical snapshots. |\n| Label Leakage | Target outcome encoded in features | Fraud feature includes downstream investigation status | Audit column lineage and strip post-outcome fields. |\n| Access Leakage | Restricted data reaches wrong user or service | Shared index queried without `tenant_id` filter | Partition indexes or enforce mandatory tenant filters at query time. |\n| Retrieval Leakage | Unauthorized chunks enter prompt | Contractor retrieves internal HR notes via broad semantic query | Combine tenant, role and sensitivity filters before ranking. |\n| Prompt Leakage | Unnecessary PII inserted or logged | Full customer profile copied into raw prompt logs | Minimize context and set `log_prompt_content: masked`. |\n| Output Leakage | LLM reveals confidential details | Summary exposes facts from inaccessible documents | Validate output permissions and route high-risk topics to human review. |\n| Evaluation Leakage | Test set overlaps training or tuning data | Golden benchmark includes prompt-tuning examples | Track split lineage and strict membership isolation. |\n\n### Automated checks versus human review\n\n| Method | Best for | Examples from the Northstar HR assistant |\n| --- | --- | --- |\n| Automated Checks | Repeatable, objective, high-volume failure patterns | Citation presence, grounding score, `effective_date` validity, top-5 hit rate, stale passage rate, region mismatch |\n| Human Expert Review | Nuanced, contextual or new edge cases | Ambiguous legal wording, medical leave, payroll corrections, brand-new vendor rules |\n\n### Ownership matrix\n\n| Team | Primary responsibility | Action when incident occurs |\n| --- | --- | --- |\n| Data Engineering | Source freshness, deletion propagation, metadata schemas, index rebuilds | Fix deletion feeds, re-index stale documents, repair metadata. |\n| AI or ML Engineering | Retrieval evaluation, embedding versions, prompt templates, grounding tests | Investigate drift, tune chunking and reranking, recalibrate thresholds. |\n| Platform Engineering | Latency under 2 s, API availability, serving infrastructure | Resolve compute bottlenecks, index scaling or timeouts. |\n| Security and Privacy | Classification standards, PII redaction, audit compliance | Lead containment when PII or restricted records surface. |\n| Product and Domain Owners | Policy authority, exception approval, trust decisions | Revise content or temporarily suppress unsafe answers. |\n| Support Operations | Frontline feedback, ticket spikes, escalation routing | Flag confusion early and manage communications. |\n\n### Lab code notes\n\nFit the scaler and PCA only on `W1_baseline`, then call `.transform()` on later windows. Refitting per window would hide drift by re-centering each window.\n\n```python\nbaseline_mask = emb_input[\"window_id\"] == \"W1_baseline\"\n\nscaler = StandardScaler()\npca = PCA(n_components=2, random_state=42)\n\nbaseline_scaled = scaler.fit_transform(emb_input.loc[baseline_mask, feature_cols])\npca.fit(baseline_scaled)\n\nall_scaled = scaler.transform(emb_input[feature_cols])\nall_embeddings = pca.transform(all_scaled)\n```\n\n```python\ncurr_centroid = current_vecs.mean(axis=0)\ncentroid_l2 = float(np.linalg.norm(curr_centroid - base_centroid))\n\nw_x = wasserstein_distance(baseline_vecs[:, 0], current_vecs[:, 0])\nw_y = wasserstein_distance(baseline_vecs[:, 1], current_vecs[:, 1])\nmean_wasserstein = float((w_x + w_y) / 2.0)\n\ndrift_df[\"drift_score\"] = 0.6 * drift_df[\"centroid_l2\"] + 0.4 * drift_df[\"mean_wasserstein\"]\n```\n\n```python\nreference = drift_df.loc[drift_df[\"window_rank\"] <= 2, \"drift_score\"]\nmu = float(reference.mean())\nsigma = float(reference.std(ddof=0))\n\nwarn_threshold = mu + (2 * sigma)\ncritical_threshold = mu + (3 * sigma)\n\ndef classify_drift(score, warn, critical):\n    if score >= critical:\n        return \"critical\"\n    if score >= warn:\n        return \"warning\"\n    return \"normal\"\n```\n\nCentroid distance tracks center movement; Wasserstein detects spread, variance and shape changes even when the center barely moves. Lowering multipliers from 2 and 3 to 1.5 and 2.5 catches moderate drift earlier at the cost of alert volume.\n\n### Quiz answers\n\nQ1: B. Green infrastructure and completed ETL jobs do not guarantee outcome health without deletion propagation and freshness checks.\n\nQ2: B. Deleting a source record does not remove derived chunks, embeddings, caches or prompt logs.\n\nQ3: B. `tenant_id` alone is not enough; role and sensitivity filters prevented the contractor retrieval.\n\nQ4: A. Refitting scaler or PCA on each window re-centers and re-orients the space, masking geometric drift.\n\nQ5: B. Wasserstein captures distributional shape changes that centroid distance misses.",
              "## 30 / Derived notes: explainability, ownership and assessment\n\n### Three-bullet takeaway\n\nCore architecture pattern: governance and observability are continuous control surfaces that capture lightweight decision records such as hashes, version IDs, role filters and retrieval scores, and pair monitoring, which detects shifts, with evaluation, which verifies whether the shift degrades safety or relevance.\n\nNumber one failure mode: treating uptime such as 200 OK and 40 ms vector latency as proof of AI health, or logging raw sensitive text and PHI into observability instead of redacted references and versioned decision records.\n\nKey engineering trade-off: logging every raw token maximizes forensic detail but violates privacy and retention rules and inflates storage cost. Structured diagnostic metadata such as document IDs, policy versions, hashes and redacted traces preserves auditability without creating a secondary PII or PHI leak.\n\n### Glossary\n\nDecision Record: a structured audit log per AI request containing `user_role`, `document_ids`, `policy_version`, `retrieval_identifiers`, `retrieval_scores`, `applied_rules` and `response_id`.\n\nExplainability in data engineering means retaining traceable evidence and lineage, not exposing neural network weights. Reviewers need exact retrieved passages, document versions, retrieval scores and active policy rules to distinguish stale data from model error.\n\nData Minimization strips unnecessary fields at the ingestion connector before chunking or embedding. The safest sensitive field is the one the AI system never receives.\n\nAnalytics reports serve a known audience through static dashboards where security applies before delivery. Copilots assemble dynamic context per prompt and require per-request permission enforcement and governance over generated text.\n\nMinimum viable signal set for a RAG assistant: `index_freshness_minutes` with an SLA of 4 hours, `embedding_version_match_pct` at or above 99.5, `retrieval_benchmark_min` at or above 0.82 on a fixed 10 to 20 query golden set, `citation_coverage_min` at or above 0.95, and `permission_filter_failures_max` strictly 0.\n\n### Six signal categories\n\n| Category | Example signals | Detects |\n| --- | --- | --- |\n| Pipeline Health | Freshness lag, job success, row counts, processing delay | Broken or delayed data movement. |\n| Data Quality | Null rates, duplicates, range checks, parse error rates | Invalid, malformed or corrupted inputs. |\n| Feature and Embedding Health | Distribution shifts, model version mix, vector dimensionality | Train/serve skew and incompatible vector populations. |\n| Retrieval Quality | Benchmark recall, top-k relevance, citation coverage, no-result rate | Missing, stale or weak grounding evidence. |\n| Output Quality | Human ratings, groundedness scores, correction rate | User-visible hallucinations or degraded answers. |\n| Business and Safety Outcomes | Complaints, escalations, policy violations, PII exposure | Real-world impact and compliance breaches. |\n\n### Signal-to-action playbook\n\n| Trigger | Primary owner | Immediate response | Escalates to |\n| --- | --- | --- | --- |\n| `index_freshness` SLA breached | Data Engineering | Rerun ingestion and embedding backlog checks. | Source App Team, Platform |\n| `embedding_version_match_pct` drops | Data Engineering or AI Platform | Pause rollout, check compatibility, schedule full re-embed. | ML Engineering, Platform |\n| Retrieval benchmark below baseline | AI Platform or App Engineering | Compare source changes, chunking revisions and ranking weights. | Data Engineering, Governance |\n| Restricted document retrieved | Security or Governance | Disable path, preserve trace logs, start security review. | Legal, Compliance, Incident Command |\n| Correction or escalation spike | AI or Application Team | Route to safe fallback and inspect retrieved context. | Product Owner, Risk Owners |\n\n### Lifecycle metadata capture\n\n| Stage | Diagnostic metadata | Purpose |\n| --- | --- | --- |\n| Source Assessment | Owner, update cadence, schema contract, sensitivity class | Confirms data is approved and governed. |\n| Ingestion and Prep | Run IDs, timestamps, parse errors, dropped or redacted counts | Proves completeness and PII minimization. |\n| Embedding Generation | Model version, chunking strategy, vector dimension, failed chunks | Prevents silent mixing of incompatible vectors. |\n| Indexing and Retrieval | Index build version, document IDs, applied filters, top-k scores | Diagnoses ranking versus content problems and proves access enforcement. |\n| Inference and App Use | Prompt template version, citations, latency, fallback path, feedback | Connects data inputs to user behavior. |\n| Lifecycle Management | Retention policy, deprecation date, rollback artifacts, re-embed plan | Enables rollback and prevents stale vectors from lingering. |\n\n### Best practices\n\nDo not dump raw sensitive text into observability logs. Store decision records with hashes, document IDs, version numbers, role tags and redacted traces.\n\nBad chunking can break legal consent by detaching a clinical or financial clause from its consent language or leaving hidden identifiers intact.\n\nEnforce role and sensitivity filters before vector search and re-ranking, never rely on a re-ranker or post-generation check to hide unauthorized chunks.\n\nUse a five-signal starter plan: two pipeline or data health signals, two AI quality signals, one governance or security signal, one escalation rule with named investigators and approvers, and one automated lifecycle action.\n\nRe-run a 10 to 20 query benchmark whenever source templates, chunking sizes, embedding models, retrieval settings or prompt templates change.\n\n### Assessment answers\n\nQ1: The lifecycle loop order is Assess, Prepare, Embed, Retrieve, Infer, Evaluate.\n\nQ2: `case_resolution_time_minutes` violates point-in-time correctness because the value is unavailable at prediction time.\n\nQ3: AI-ready pipelines must support retrieval and inference-time serving, not only historical analysis.\n\nQ4: A contractor receiving internal policy chunks is leakage across access and purpose boundaries.\n\nQ5: Explainability needs source passages, document version, retrieval score and policy rule evidence.\n\nQ6: Use evaluation to determine whether embedding shift affects relevance, correctness, safety or business impact.\n\nQ7: Alerts without named operators become background noise and may not lead to action.",
            ],
            submodules: [
              { label: "Sub-module 1", start: 1, end: 13 },
              { label: "Sub-module 2", start: 14, end: 20 },
              { label: "Sub-module 3", start: 21, end: 25 },
              { label: "Case study and review", start: 26, end: 30 },
            ],
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
    moduleProgress: "Paused",
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
},
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
