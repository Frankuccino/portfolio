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
    order: "Next",
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
