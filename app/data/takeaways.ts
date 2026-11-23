/**
 * Condensed Key Takeaways.
 *
 * A concept map of AI engineering, condensed from the ten DataCamp courses
 * behind the AI Engineer for Developers Associate. Every entry is one sentence
 * and, where it comes from the track, it is condensed from the module notes
 * already in `roadmap.ts` rather than recalled.
 *
 * The track stops at the application layer. Entries flagged `extended` are the
 * standard vocabulary the notes point at but never name; they are here because
 * a map with a hole in it misleads more than a shorter one does. The page says
 * so, and marks them with a plus.
 */

export type TakeawayConcept = {
  term: string;
  /** One sentence: what it is, and the part it plays. */
  detail: string;
  /** True when the concept is not in the track and was added to complete the picture. */
  extended?: boolean;
};

export type TakeawayFamily = {
  id: string;
  /** The one idea that ties the family together. */
  title: string;
  concepts: TakeawayConcept[];
};

export type TakeawaySection = {
  id: string;
  title: string;
  /** What this block of the field is about. */
  statement: string;
  /** The track this condenses, where it comes from the courses. */
  source: string;
  families: TakeawayFamily[];
};

/* ------------------------------------------------------------------ 01 */

const theShapeOfTheField: TakeawaySection = {
  id: "the-shape-of-the-field",
  title: "The shape of the field",
  statement:
    "The terms are nested, not interchangeable. Confusing them is how you end up solving the wrong problem with exactly the right tool.",
  source: "LLMOps Concepts",
  families: [
    {
      id: "nesting",
      title: "The nesting",
      concepts: [
        {
          term: "artificial intelligence",
          detail:
            "The field of building machines that carry out tasks we would call intelligent.",
          extended: true,
        },
        {
          term: "machine learning",
          detail: "Systems that improve from data rather than from explicit rules.",
          extended: true,
        },
        {
          term: "deep learning",
          detail: "Machine learning built on multi-layer neural networks.",
          extended: true,
        },
        {
          term: "natural language processing",
          detail:
            "The branch concerned with getting machines to read and write language.",
          extended: true,
        },
        {
          term: "large language model",
          detail:
            "A model trained on extensive text data to understand and generate human-like text, marked by pre-training on vast datasets, massive parameters, and sometimes unpredictable behavior.",
        },
      ],
    },
    {
      id: "two-disciplines",
      title: "Two operations disciplines",
      concepts: [
        {
          term: "MLOps",
          detail:
            "Managing the operational aspects of traditional machine learning models.",
        },
        {
          term: "LLMOps",
          detail:
            "Specialized practices, processes, and infrastructure to manage, deploy, and maintain LLMs throughout their lifecycle while controlling risk.",
        },
        {
          term: "where they differ",
          detail: "Model size, data type, and output.",
        },
      ],
    },
    {
      id: "lifecycle",
      title: "The lifecycle every model moves through",
      concepts: [
        {
          term: "ideation",
          detail:
            "Identifying data needs, choosing a base model, and deciding between proprietary and open source.",
        },
        {
          term: "development",
          detail: "Prompt engineering, retrieval, fine-tuning, and testing.",
        },
        {
          term: "operations",
          detail: "Hosting, deployment, monitoring, and cost control.",
        },
        {
          term: "revisited in either direction",
          detail:
            "The phases are not a waterfall. Needs change, and you go back.",
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ 02 */

const theModelLayer: TakeawaySection = {
  id: "the-model-layer",
  title: "The model layer",
  statement:
    "Everything above the model is a conversation. These are the few knobs and shapes that conversation actually has.",
  source: "Working with the OpenAI API · Working with the OpenAI Responses API",
  families: [
    {
      id: "unit-of-account",
      title: "The unit of account",
      concepts: [
        {
          term: "tokens",
          detail:
            "Units of one or more characters that language models use to understand and interpret text.",
        },
        {
          term: "API usage cost",
          detail:
            "The price of a request, which depends on the model requested and the size of input and output.",
        },
        {
          term: "tiktoken",
          detail:
            "OpenAI's tokenizer, used to count tokens and estimate cost before sending or storing text.",
        },
      ],
    },
    {
      id: "controls",
      title: "The controls",
      concepts: [
        {
          term: "temperature",
          detail:
            "A control on determinism, set to 1 by default and ranging from 0 (highly deterministic) to 2 (very random).",
        },
        {
          term: "max_completion_tokens",
          detail:
            "An upper limit on the number of tokens the model will output.",
        },
        {
          term: "max_output_tokens",
          detail:
            "The Responses API equivalent, which also caps reasoning tokens.",
        },
        {
          term: "reasoning effort",
          detail:
            "A dictionary key on reasoning-enabled models that tunes how much deep thinking the model does.",
        },
        {
          term: "top_p",
          detail:
            "Nucleus sampling: choose from the smallest set of tokens whose probability mass exceeds p.",
          extended: true,
        },
      ],
    },
    {
      id: "message-shape",
      title: "The message shape",
      concepts: [
        {
          term: "messages list",
          detail:
            "A list of dictionaries with role and content, often starting with the system role, that represents the conversation.",
        },
        {
          term: "system message",
          detail:
            "Outlines the role of the model and can add guardrails restricting what it may generate.",
        },
        {
          term: "user role",
          detail: "Provides an instruction or prompt to the assistant.",
        },
        {
          term: "assistant role",
          detail:
            "Attached to model responses, and also used to provide example answers that steer style and tone.",
        },
        {
          term: "conversation history",
          detail:
            "Stored assistant responses appended back into messages so each new user message carries the full context.",
        },
        {
          term: "previous_response_id",
          detail:
            "Provides a prior response ID so the model loads context from that conversation.",
        },
        {
          term: "instructions",
          detail:
            "The Responses API's replacement for the system message, considered superior to input.",
        },
      ],
    },
    {
      id: "output-shapes",
      title: "The output shapes",
      concepts: [
        {
          term: "ChatCompletion object",
          detail:
            "The response object with attributes like id, choices, created, model, object, and usage; the text is under choices[0].message.content.",
        },
        {
          term: "response.output",
          detail:
            "The Responses API's structured output, where each object is an item.",
        },
        {
          term: "structured outputs",
          detail:
            "A pydantic BaseModel defines the schema, text_format passes it to the model, and output_parsed extracts the typed result.",
        },
        {
          term: "streaming",
          detail:
            "Semantic events deliver partial updates describing what is happening during generation.",
        },
      ],
    },
    {
      id: "beyond-text",
      title: "Beyond text",
      concepts: [
        {
          term: "input_image",
          detail:
            "A content type for sending images from URLs or local base64 files.",
        },
        {
          term: "web_search",
          detail:
            "A tool that lets the model retrieve up-to-date information, overcoming knowledge cutoffs.",
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ 03 */

const prompting: TakeawaySection = {
  id: "prompting",
  title: "Prompting",
  statement:
    "The cheapest lever and the least understood. These are the patterns that hold up in production, not the ones that demo well.",
  source:
    "Prompt Engineering with the OpenAI API · Developing LLM Applications with LangChain",
  families: [
    {
      id: "principles",
      title: "The principles",
      concepts: [
        {
          term: "clear and precise prompts",
          detail: "Unambiguous instructions guide the model to the best results.",
        },
        {
          term: "action verbs",
          detail:
            "Explicit verbs such as write, complete, explain, describe, or evaluate that steer the task.",
        },
        {
          term: "detailed instructions",
          detail:
            "Specify context, output length, format and style, and audience.",
        },
        {
          term: "delimiters",
          detail:
            "Markers such as triple backticks that isolate input text so the model can locate it.",
        },
        {
          term: "output length limits",
          detail:
            "max_tokens enforces a strict cap, while prompt limits can be bypassed but keep responses complete.",
        },
      ],
    },
    {
      id: "example-based",
      title: "The example-based family",
      concepts: [
        {
          term: "shot prompting",
          detail:
            "Including examples in a prompt to guide the model's response, as zero-shot, one-shot, or few-shot.",
        },
        {
          term: "zero, one and few-shot",
          detail:
            "The name depends on whether zero, one, or several examples are provided.",
        },
        {
          term: "FewShotPromptTemplate",
          detail:
            "Converts a list of question-answer dictionaries into a reusable few-shot template.",
        },
        {
          term: "example_prompt",
          detail:
            "A PromptTemplate that formats how each example question and answer is structured.",
        },
        {
          term: "suffix",
          detail:
            "Formats the user input and specifies which variable that input is assigned to.",
        },
        {
          term: "input_variables",
          detail:
            "Declares the variables, like the user query, that the template expects.",
        },
      ],
    },
    {
      id: "reasoning",
      title: "The reasoning family",
      concepts: [
        {
          term: "multi-step prompting",
          detail:
            "Breaking a goal into smaller ordered steps to improve accuracy.",
        },
        {
          term: "chain-of-thought prompting",
          detail:
            "Asking the model to present reasoning steps before the final answer.",
        },
        {
          term: "self-consistency prompting",
          detail:
            "Generating multiple chain-of-thought responses and selecting the majority vote.",
        },
      ],
    },
    {
      id: "the-loop",
      title: "The loop",
      concepts: [
        {
          term: "iterative refinement",
          detail:
            "Building, testing, analyzing, and improving prompts in repeated cycles.",
        },
        {
          term: "prompt management",
          detail:
            "Tracking prompts, outputs, and model settings for efficiency, reproducibility, and collaboration.",
        },
        {
          term: "PromptTemplate",
          detail:
            "A reusable prompt recipe built from a template string, inserting variables with curly braces.",
        },
        {
          term: "ChatPromptTemplate",
          detail:
            "Builds prompts with chat message roles such as system, human, and ai.",
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ 04 */

const theTextTasks: TakeawaySection = {
  id: "the-text-tasks",
  title: "The text tasks, and the families they fall into",
  statement:
    "The track lists these as business applications. The useful view is the family each one belongs to, because the family decides the evaluation and the failure modes.",
  source:
    "Prompt Engineering with the OpenAI API · Working with Hugging Face",
  families: [
    {
      id: "compressing",
      title: "Compressing",
      concepts: [
        {
          term: "text summarization",
          detail:
            "Condensing text into a shorter coherent version while preserving essential meaning.",
        },
        {
          term: "extractive summarization",
          detail:
            "Selecting and ranking sentences that are already present in the source.",
          extended: true,
        },
        {
          term: "abstractive summarization",
          detail:
            "Generating new sentences that say what the source means, which can hallucinate.",
          extended: true,
        },
        {
          term: "text expansion",
          detail: "Generating text from a few ideas or bullet points.",
        },
      ],
    },
    {
      id: "rewriting",
      title: "Rewriting",
      concepts: [
        {
          term: "text transformation",
          detail:
            "Changing text while keeping the same information, covering translation, tone adjustment, and writing improvement.",
        },
        {
          term: "code generation and explanation",
          detail:
            "Creating code from a problem description or input-output examples, then explaining it.",
        },
      ],
    },
    {
      id: "deciding",
      title: "Deciding",
      concepts: [
        {
          term: "text classification",
          detail:
            "Assigning one of several potential categories, such as sentiment.",
        },
        {
          term: "zero-shot classification",
          detail:
            "Assigning predefined categories to text even when the model was not trained for them.",
        },
        {
          term: "entity extraction",
          detail:
            "Extracting specific entities such as names, places, organizations, and dates.",
        },
      ],
    },
    {
      id: "answering-and-finding",
      title: "Answering and finding",
      concepts: [
        {
          term: "question answering",
          detail:
            "Generating answers to a question from a document passed as context.",
        },
        {
          term: "semantic search",
          detail:
            "Embedding the query and candidate texts, computing distances, and returning the closest matches.",
        },
        {
          term: "recommendation",
          detail:
            "Embedding the items and the user's history, filtering seen items, and recommending the nearest unseen.",
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ 05 */

const retrieval: TakeawaySection = {
  id: "retrieval",
  title: "Retrieval",
  statement:
    "Retrieval is what lets a model answer from knowledge it was never trained on. Four separate problems hide inside the acronym RAG.",
  source:
    "Introduction to Embeddings with the OpenAI API · Building AI Applications with Pinecone · Developing LLM Applications with LangChain",
  families: [
    {
      id: "representation",
      title: "The representation",
      concepts: [
        {
          term: "embeddings",
          detail:
            "Numerical representations of text mapped into a multi-dimensional vector space, where more similar texts sit closer together.",
        },
        {
          term: "semantic meaning",
          detail:
            "The full context and intent captured by an embedding, so paraphrases like supermarket and shop are recognized as related.",
        },
        {
          term: "vector space",
          detail:
            "The multi-dimensional space where each text's position is given by the numbers the model outputs.",
        },
        {
          term: "cosine distance",
          detail:
            "A metric ranging from 0 to 2, where smaller values indicate greater similarity.",
        },
        {
          term: "t-SNE",
          detail:
            "A dimensionality reduction technique used to project embeddings down to 2 dimensions for visualization, at the cost of some information.",
        },
      ],
    },
    {
      id: "producing",
      title: "Producing them",
      concepts: [
        {
          term: "embeddings endpoint",
          detail:
            "The API route called through client.embeddings.create(), taking model and input.",
        },
        {
          term: "batching",
          detail:
            "Passing a list of texts so embeddings come back in a single API call, one dictionary per input.",
        },
        {
          term: "enriched embeddings",
          detail:
            "Combining headline, topic, and keywords into one formatted string before embedding to improve relevance.",
        },
      ],
    },
    {
      id: "storing",
      title: "Storing them",
      concepts: [
        {
          term: "vector database",
          detail:
            "Stores embeddings, source text, and metadata, and computes similarity far more efficiently than in-memory rescanning.",
        },
        {
          term: "collection",
          detail:
            "Analogous to a table, created with create_collection() from a name and an embedding function.",
        },
        {
          term: "metadata",
          detail:
            "Small extra data such as type and release_year used to filter results with where clauses.",
        },
        {
          term: "query",
          detail:
            "Retrieves the n_results nearest items to query_texts, embedding the query automatically.",
        },
        {
          term: "namespace",
          detail:
            "A container that partitions an index so queries and other operations are limited to that unit.",
        },
        {
          term: "multitenancy",
          detail:
            "One index serving multiple tenant datasets in isolated namespaces.",
        },
        {
          term: "upsert",
          detail:
            "Inserts new vectors or updates existing ones by ID, taking id, vector, and metadata.",
        },
        {
          term: "distance metric",
          detail:
            "Cosine, euclidean, or dotproduct, set at index creation and not changeable later.",
        },
      ],
    },
    {
      id: "splitting",
      title: "Splitting the documents",
      concepts: [
        {
          term: "document loaders",
          detail:
            "Classes like PyPDFLoader, CSVLoader, and UnstructuredHTMLLoader that load documents into memory.",
        },
        {
          term: "chunk overlap",
          detail:
            "Shared text between chunks that helps retain context when splitting long documents.",
        },
        {
          term: "CharacterTextSplitter",
          detail:
            "Splits on a single separator, but may fail to keep chunks below chunk_size.",
        },
        {
          term: "RecursiveCharacterTextSplitter",
          detail:
            "Works through a list of separators left to right, combining chunks to stay under chunk_size.",
        },
      ],
    },
    {
      id: "the-pattern",
      title: "The pattern",
      concepts: [
        {
          term: "RAG",
          detail:
            "Retrieval augmented generation: retrieving related documents from vector databases to augment prompts with external knowledge.",
        },
        {
          term: "retrieve",
          detail:
            "Embeds the query, queries the namespace, and returns documents with sources.",
        },
        {
          term: "prompt_with_context_builder",
          detail:
            "Glues an instruction, retrieved documents, and the user query into one prompt.",
        },
        {
          term: "question_answering",
          detail:
            "Sends the contextual prompt to the chat endpoint and returns the answer with sources.",
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ 06 */

const agentsAndTools: TakeawaySection = {
  id: "agents-and-tools",
  title: "Agents, tools and protocols",
  statement:
    "A chain is a pipeline you wrote. An agent is a loop the model drives. Everything else here is plumbing for giving the model hands.",
  source:
    "LLMOps Concepts · Developing LLM Applications with LangChain · Working with the OpenAI Responses API · Introduction to Model Context Protocol",
  families: [
    {
      id: "deterministic-vs-adaptive",
      title: "Deterministic versus adaptive",
      concepts: [
        {
          term: "chains",
          detail: "Deterministic pipelines of connected steps.",
        },
        {
          term: "agents",
          detail: "Let the LLM choose among available tools adaptively.",
        },
        {
          term: "LCEL pipe operator",
          detail:
            "Chains prompts, models, and output parsers into a sequence where data flows from one component to the next.",
        },
        {
          term: "sequential chains",
          detail:
            "Feed the output of one chain into another, passing parsed strings through a dictionary of keys.",
        },
        {
          term: "ReAct agents",
          detail:
            "Reasoning and Acting agents that loop through thinking, acting, and observing to solve problems with tools.",
        },
        {
          term: "create_react_agent",
          detail:
            "A LangGraph function that builds a ReAct agent from an LLM and a list of tools.",
        },
        {
          term: "custom tools",
          detail:
            "Python functions converted with the @tool decorator, needing a name, description, and return_direct.",
        },
      ],
    },
    {
      id: "function-calling",
      title: "Function calling",
      concepts: [
        {
          term: "tool definitions",
          detail:
            "A manual for the LLM so it can choose which tool to use and call it correctly.",
        },
        {
          term: "function_call item",
          detail:
            "Returned when the model decides a message requires the tool, with arguments as a JSON string.",
        },
        {
          term: "function_call_output",
          detail: "The message type appended with the tool's result.",
        },
        {
          term: "tool-calling workflow",
          detail:
            "The five-step process from sending definitions and a query to returning a final informed response.",
        },
        {
          term: "stop_reason",
          detail:
            "The response attribute checked for tool_use to detect that the model wants to call a tool.",
        },
      ],
    },
    {
      id: "the-protocol",
      title: "The protocol",
      concepts: [
        {
          term: "MCP",
          detail:
            "An open standard for secure, modular, bi-directional connections between AI models and external data sources or tools.",
        },
        {
          term: "host",
          detail:
            "The application the user interacts with directly; it starts the connection and lets the LLM choose external connections.",
        },
        {
          term: "client",
          detail:
            "Creates a session with an MCP server and executes requests using the JSON-RPC 2.0 message format.",
        },
        {
          term: "server",
          detail:
            "Provides AI-friendly access to external data or functionality, translating API and database calls into the MCP format.",
        },
        {
          term: "dynamic tool discovery",
          detail:
            "Lets the LLM see which tools a server offers in real time while completing a request.",
        },
        {
          term: "tools",
          detail:
            "Actions the LLM performs to complete a request, such as querying a database or booking a flight.",
        },
        {
          term: "resources",
          detail:
            "Read-only data or context, such as documents, files, database records, or API responses.",
        },
        {
          term: "prompts",
          detail:
            "Predefined workflow templates or instruction sets that guide the model and save users from writing long prompts.",
        },
      ],
    },
    {
      id: "building-and-connecting",
      title: "Building and connecting",
      concepts: [
        {
          term: "FastMCP",
          detail:
            "The class from the official MCP Python SDK used to instantiate a server in one line.",
        },
        {
          term: "@mcp.tool()",
          detail: "Registers a Python function as a tool discoverable by MCP clients.",
        },
        {
          term: "@mcp.resource()",
          detail: "Registers a resource function to read data, such as a local file.",
        },
        {
          term: "@mcp.prompt()",
          detail:
            "Registers a prompt, with the title as metadata and the function name as the identifier.",
        },
        {
          term: "docstrings and type hints",
          detail:
            "Describe each tool so the LLM can choose and use it; an absolute necessity.",
        },
        {
          term: "stdio",
          detail:
            "Transport where the client launches the server as a subprocess and exchanges messages over stdin and stdout.",
        },
        {
          term: "Streamable HTTP",
          detail:
            "Transport for remote servers, delivering JSON-RPC over HTTP and receiving it via Server-Sent Events.",
        },
        {
          term: "list_tools / call_tool",
          detail:
            "Session methods that discover the primitives a server exposes, then invoke them.",
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ 07 */

const engineeringDiscipline: TakeawaySection = {
  id: "engineering-discipline",
  title: "The engineering discipline",
  statement:
    "The model is the smallest part of the system. Everything else is software, and the software is what fails.",
  source: "Software Engineering Principles in Python",
  families: [
    {
      id: "structure",
      title: "Structure",
      concepts: [
        {
          term: "modularity",
          detail:
            "Dividing code into shorter functional units to improve readability, maintainability, and reuse.",
        },
        {
          term: "package structure",
          detail:
            "A directory plus an __init__.py file, where the directory name becomes the package name.",
        },
        {
          term: "submodules",
          detail: "Additional Python files inside a package, imported with dot notation.",
        },
        {
          term: "relative import",
          detail:
            "A dot notation import such as .utils, required when packaging Python 3 and above.",
        },
        {
          term: "setup.py",
          detail: "Tells pip how to install the package and supplies metadata for PyPI.",
        },
        {
          term: "requirements.txt",
          detail:
            "Lists dependencies and optional version constraints, installed with pip install -r.",
        },
      ],
    },
    {
      id: "readability",
      title: "Readability",
      concepts: [
        {
          term: "PEP 8",
          detail: "The de facto style guide for Python code, focused on readability.",
        },
        {
          term: "pycodestyle",
          detail:
            "Checks code for PEP 8 violations across files and reports location and error code.",
        },
        {
         term: "comments",
          detail: "Inline notes explaining why code does something, visible only in source.",
        },
        {
          term: "docstrings",
          detail:
            "Triple-quoted documentation for functions, classes, and scripts, shown when help() is called.",
        },
        {
          term: "self-documenting code",
          detail:
            "Descriptive naming that makes code describe what it does, such as is_boiling.",
        },
        {
          term: "refactoring",
          detail:
            "Splitting long functions that do several things into smaller, descriptively named functions.",
        },
      ],
    },
    {
      id: "reuse",
      title: "Reuse",
      concepts: [
        {
          term: "DRY",
          detail:
            "Don't Repeat Yourself, the rule against copy-pasting code so a bug is fixed once.",
        },
        {
          term: "inheritance",
          detail:
            "Passing a parent class's methods and attributes to a child class while adding new functionality.",
        },
        {
          term: "super()",
          detail:
            "Calls the parent class's __init__, improving maintainability and helping multiple inheritance.",
        },
      ],
    },
    {
      id: "testing-and-ci",
      title: "Testing and CI",
      concepts: [
        {
          term: "automated testing",
          detail:
            "Running tests automatically to save time over manual testing, find more bugs, and check code anytime.",
        },
        {
          term: "doctest",
          detail: "Runs docstring examples and reports failures.",
        },
        {
          term: "pytest",
          detail: "Finds test files and functions by name and checks them with assert.",
        },
        {
          term: "Travis CI",
          detail:
            "A continuous integration service that runs tests automatically on changes and on a schedule.",
        },
        {
          term: "Codecov",
          detail: "Reports test coverage so untested code can be found.",
        },
        {
          term: "Code Climate",
          detail:
            "Analyzes readability and flags functions that are too long or confusing.",
        },
      ],
    },
    {
      id: "packages",
      title: "Packages",
      concepts: [
        {
          term: "PyPI",
          detail: "The Python Package Index, a platform for leveraging published packages.",
        },
        {
          term: "pip",
          detail: "The package installer, used to install packages and dependencies.",
        },
        {
          term: "help()",
          detail: "Prints documentation for a package, class, method, or object.",
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ 08 */

const operations: TakeawaySection = {
  id: "operations",
  title: "Operations",
  statement:
    "Shipping is the easy half. The job is keeping it up, and knowing what it costs, after the demo.",
  source: "LLMOps Concepts · Introduction to Model Context Protocol",
  families: [
    {
      id: "choosing-a-base-model",
      title: "Choosing a base model",
      concepts: [
        {
          term: "proprietary models",
          detail:
            "Privately owned models such as ChatGPT, Claude, PaLM2, and Gemini, easy to set up but requiring data exposure.",
        },
        {
          term: "open-source models",
          detail:
            "Publicly available models such as Meta Llama 3, hostable in-house with transparency and full customizability.",
        },
        {
          term: "model selection factors",
          detail:
            "Performance, model characteristics, practical considerations, and secondary factors like parameter count and popularity.",
        },
        {
          term: "data sourcing",
          detail:
            "Identifying data needs, finding sources, and making data accessible while checking relevance, availability, and quality.",
        },
      ],
    },
    {
      id: "running-it",
      title: "Running it",
      concepts: [
        {
          term: "hosting",
          detail:
            "Deciding where to host application components, on private or public cloud or on-premise.",
        },
        {
          term: "API design",
          detail:
            "Defining endpoints and rules so software components can request and share information.",
        },
        {
          term: "CI/CD",
          detail:
            "Continuous integration and continuous deployment automating integration, testing, and deployment from source to production.",
        },
        {
          term: "horizontal scaling",
          detail: "Adds machines for traffic.",
        },
        {
          term: "vertical scaling",
          detail: "Boosts single-machine power for reliability and speed.",
        },
        {
          term: "monitoring and observability",
          detail:
            "Using logs, metrics, and traces to watch system behavior and reveal internal state across input, functional, and output monitoring.",
        },
        {
          term: "cost management",
          detail:
            "Choosing the right model, optimizing prompts, and reducing calls to lower hosting and usage expenses.",
        },
      ],
    },
    {
      id: "governance-and-security",
      title: "Governance and security",
      concepts: [
        {
          term: "governance",
          detail:
            "Policies, guidelines, and frameworks governing development, deployment, and usage of LLM applications.",
        },
        {
          term: "security",
          detail:
            "Measures preventing unauthorized access, data breaches, adversarial attacks, and misuse of model outputs.",
        },
        {
          term: "access control",
          detail:
            "Role-based access control assigns permissions to roles, with zero trust requiring continuous authentication and authorization.",
        },
        {
          term: "prompt injection",
          detail:
            "Attackers manipulating input fields or prompts to execute unauthorized commands or actions.",
        },
        {
          term: "data poisoning",
          detail:
            "Injecting false, misleading, or malicious data into training sets, deliberately or unintentionally.",
        },
      ],
    },
    {
      id: "in-production",
      title: "In production",
      concepts: [
        {
          term: "database integration",
          detail:
            "Connect to databases for query power, scale, concurrency, and production-ready backups and replication.",
        },
        {
          term: "connection lifecycle",
          detail:
            "Create a connection once at startup or first use, reuse it in handlers, and close it on shutdown.",
        },
        {
          term: "parameterized queries",
          detail:
            "Placeholders instead of concatenating user or LLM input into SQL, to prevent prompt injection.",
        },
        {
          term: "timeout and error handling",
          detail:
            "Pass a timeout to requests and check raise_for_status() so tool calls fail clearly instead of hanging.",
        },
        {
          term: "API authentication",
          detail:
            "Keep API keys server-side in environment variables and attach them as Bearer tokens; never expose them to the client.",
        },
        {
          term: "third-party MCP servers",
          detail:
            "Prebuilt servers for speed and maintained integration, weighed against trust, security, and surface area.",
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ 09 */

const beyondTheTrack: TakeawaySection = {
  id: "beyond-the-track",
  title: "Beyond the track",
  statement:
    "The ten courses stop at the application layer. These are the concepts the notes point at but never name: the standard vocabulary of the field, here because a map with a hole in it misleads more than a shorter one.",
  source: "Extended from the track",
  families: [
    {
      id: "teaching-the-model",
      title: "Teaching the model",
      concepts: [
        {
          term: "fine-tuning",
          detail:
            "Adjusting model weights with your own data, through supervised fine-tuning or reinforcement learning from human feedback.",
        },
        {
          term: "supervised fine-tuning",
          detail:
            "Training on labelled input-output pairs so the model imitates a format or a domain.",
          extended: true,
        },
        {
          term: "RLHF",
          detail:
            "Reinforcement learning from human feedback, tuning a model against ranked human preferences.",
          extended: true,
        },
        {
          term: "adapters and PEFT",
          detail:
            "Parameter-efficient methods such as LoRA that train a small number of weights instead of the whole model.",
          extended: true,
        },
        {
          term: "quantization",
          detail:
            "Reducing the precision of the weights to fit a model into less memory, trading a little quality for a lot of cost.",
          extended: true,
        },
      ],
    },
    {
      id: "decoding",
      title: "Decoding",
      concepts: [
        {
          term: "greedy decoding",
          detail: "Always take the highest-probability token; deterministic and often dull.",
          extended: true,
        },
        {
          term: "top-k sampling",
          detail: "Sample from the k most likely tokens.",
          extended: true,
        },
        {
          term: "top-p sampling",
          detail:
            "Sample from the smallest set of tokens whose probability mass exceeds p.",
          extended: true,
        },
        {
          term: "temperature",
          detail:
            "Flattens or sharpens the distribution the decoder samples from, which is why it changes voice more than it changes facts.",
          extended: true,
        },
      ],
    },
    {
      id: "measuring",
      title: "Measuring",
      concepts: [
        {
          term: "accuracy",
          detail:
            "The share of predictions that are right, misleading when the classes are imbalanced.",
          extended: true,
        },
        {
          term: "precision and recall",
          detail:
            "Of the things you flagged, how many were right; and of the things that were right, how many you flagged.",
          extended: true,
        },
        {
          term: "F1",
          detail: "The harmonic mean of precision and recall, one number for a trade-off.",
          extended: true,
        },
        {
          term: "perplexity",
          detail: "How surprised a model is by held-out text; lower is better.",
          extended: true,
        },
        {
          term: "ROUGE and BLEU",
          detail:
            "Overlap scores for summarization and translation, cheap and imperfect proxies for quality.",
          extended: true,
        },
      ],
    },
    {
      id: "evaluating-a-system",
      title: "Evaluating a system, not a model",
      concepts: [
        {
          term: "eval set",
          detail: "A fixed set of inputs with expected outputs, run whenever the pipeline changes.",
          extended: true,
        },
        {
          term: "per-case scores",
          detail: "One row per case, kept rather than averaged away.",
          extended: true,
        },
        {
          term: "mean versus distribution",
          detail:
            "An average hides a polarized system, half the cases at 10 and half at 0; the shape of the scores says more than their mean.",
          extended: true,
        },
        {
          term: "LLM-as-judge",
          detail:
            "Using a model to score a model: fast and scalable, with its own bias to control for.",
          extended: true,
        },
      ],
    },
    {
      id: "context-and-memory",
      title: "Context and memory",
      concepts: [
        {
          term: "context window",
          detail:
            "The number of tokens a model can hold at once, and the hard budget every design decision spends.",
          extended: true,
        },
        {
          term: "context engineering",
          detail:
            "Deciding what goes into the window and in what order, as a discipline rather than an afterthought.",
          extended: true,
        },
        {
          term: "long context versus RAG",
          detail:
            "Stuffing the window is simpler and loses detail; retrieval is more work and stays precise.",
          extended: true,
        },
        {
          term: "memory",
          detail:
            "Persisting facts across conversations, which is a storage and retrieval problem, not a model problem.",
          extended: true,
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */

/**
 * The plan step this condensation belongs to. The document lives under that
 * step rather than at a top-level route, because it is the condensation of one
 * credential's notes and would be misleading anywhere else.
 */
export const takeawayStepId = "datacamp-ai-engineer-developers";

export const takeawaySections: TakeawaySection[] = [
  theShapeOfTheField,
  theModelLayer,
  prompting,
  theTextTasks,
  retrieval,
  agentsAndTools,
  engineeringDiscipline,
  operations,
  beyondTheTrack,
];

/**
 * The ten DataCamp courses this condenses. Reported rather than derived, because
 * the count is a claim about the track, not about the data structure.
 */
export const takeawaySourceCourses = [
  "Working with the OpenAI API",
  "Prompt Engineering with the OpenAI API",
  "Working with Hugging Face",
  "LLMOps Concepts",
  "Working with the OpenAI Responses API",
  "Introduction to Embeddings with the OpenAI API",
  "Building AI Applications with Pinecone",
  "Software Engineering Principles in Python",
  "Developing LLM Applications with LangChain",
  "Introduction to Model Context Protocol (MCP)",
] as const;

/** Raw notes in the track, counted from `roadmap.ts`. A claim, kept beside its source. */
export const takeawaySourceNotes = 253;

export const takeawayStats = {
  sections: takeawaySections.length,
  families: takeawaySections.reduce((sum, section) => sum + section.families.length, 0),
  concepts: takeawaySections.reduce(
    (sum, section) =>
      sum + section.families.reduce((inner, family) => inner + family.concepts.length, 0),
    0,
  ),
  extended: takeawaySections.reduce(
    (sum, section) =>
      sum +
      section.families.reduce(
        (inner, family) =>
          inner + family.concepts.filter((concept) => concept.extended).length,
        0,
      ),
    0,
  ),
};
