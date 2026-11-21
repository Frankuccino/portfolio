/**
 * A plain-language glossary for the papers page.
 *
 * The papers are written for someone who already has the vocabulary, and the
 * vocabulary is the barrier for a first read. This is the same move as the
 * plain-terms section: a second pass over the same material in simpler words,
 * placed after the detail rather than inside it, so it never interrupts a reader
 * who already knows the term.
 *
 * Grouped rather than alphabetical, because the groups are the mental model:
 * what a model is, how it is changed, how it is served, and how it is connected
 * to the outside world.
 */
export type GlossaryGroup = {
  id: string;
  label: string;
};

export type GlossaryTerm = {
  /** The term as it appears in the papers. */
  term: string;
  /** One sentence, no jargon that is not itself defined elsewhere here. */
  definition: string;
  group: string;
};

export const glossaryGroups: GlossaryGroup[] = [
  { id: "core", label: "The model" },
  { id: "training", label: "Changing the model" },
  { id: "serving", label: "Serving the model" },
  { id: "outside", label: "Connecting to the outside world" },
];

export const glossaryTerms: GlossaryTerm[] = [
  // The model
  {
    term: "Token",
    definition:
      "The unit a model reads and writes, roughly a piece of a word. Context length is counted in tokens.",
    group: "core",
  },
  {
    term: "Context window",
    definition: "How many tokens the model can see at once.",
    group: "core",
  },
  {
    term: "Recurrence",
    definition:
      "Processing a sequence one step at a time while carrying a hidden state forward. Expressive but serial, so slow to train.",
    group: "core",
  },
  {
    term: "Convolution",
    definition:
      "Scanning a fixed-size window over the input. Good at local patterns, and it needs many layers to reach distant positions.",
    group: "core",
  },
  {
    term: "Self-attention",
    definition:
      "For every position in a sequence, deciding how much to weigh every other position. This is how a model resolves what a word refers to.",
    group: "core",
  },
  {
    term: "Position encoding",
    definition:
      "Extra signal telling the model where each token sits, because attention by itself is order-blind.",
    group: "core",
  },
  {
    term: "Transformer",
    definition:
      "The architecture from Attention Is All You Need: self-attention plus position information, with no recurrence. Every model on this page descends from it.",
    group: "core",
  },
  {
    term: "Prompt",
    definition:
      "The text handed to the model, which includes the instruction, any retrieved context and the question.",
    group: "core",
  },
  {
    term: "Reasoning trace",
    definition:
      "The steps a model writes out before answering. They are generated rather than verified, so a confident wrong trace still reads as plausible.",
    group: "core",
  },
  // Changing the model
  {
    term: "Fine-tuning",
    definition:
      "Continuing training on a specific task after the general pre-training, so the model changes its behaviour rather than just its prompt.",
    group: "training",
  },
  {
    term: "Low-rank",
    definition:
      "Representing a large change as the product of two thin matrices, which is far cheaper to store and train than the full matrix.",
    group: "training",
  },
  {
    term: "Adapter",
    definition:
      "The small trainable module added to a frozen model. You train the adapter and leave the model alone.",
    group: "training",
  },
  {
    term: "Quantization",
    definition:
      "Storing weights in fewer bits, trading a little accuracy for much less memory. Four-bit is the aggressive end.",
    group: "training",
  },
  {
    term: "Optimizer state",
    definition:
      "The running bookkeeping an optimizer keeps for every trainable parameter, often larger than the parameters themselves.",
    group: "training",
  },
  {
    term: "Reward model",
    definition:
      "A second model trained to predict which of two answers a human prefers, used as the target for RLHF.",
    group: "training",
  },
  {
    term: "RLHF",
    definition:
      "Reinforcement learning from human feedback: fine-tune on demonstrations, learn a reward from human comparisons, then optimise against it.",
    group: "training",
  },
  {
    term: "PPO",
    definition:
      "The reinforcement learning algorithm InstructGPT used to optimise the policy against the reward model.",
    group: "training",
  },
  {
    term: "Preference pair",
    definition:
      "Two answers to the same prompt with a human judgement of which is better. DPO trains on these directly, with no reward model.",
    group: "training",
  },
  {
    term: "Chain of thought",
    definition:
      "Asking the model to write out intermediate reasoning steps before the answer, which improves multi-step problems.",
    group: "training",
  },
  {
    term: "Verifiable reward",
    definition:
      "A reward computed by checking an answer against a known-correct result rather than from human opinion. DeepSeek-R1 used only these.",
    group: "training",
  },
  // Serving the model
  {
    term: "KV cache",
    definition:
      "The stored intermediate results of attention for tokens already processed, so generating the next token does not recompute them. The main memory cost of serving.",
    group: "serving",
  },
  {
    term: "Tiling",
    definition:
      "Splitting a large computation into blocks that fit in fast memory instead of materialising the whole thing at once.",
    group: "serving",
  },
  {
    term: "Online softmax",
    definition:
      "Computing the normalisation in running fashion, block by block, without holding the full score matrix.",
    group: "serving",
  },
  {
    term: "HBM and SRAM",
    definition:
      "Two levels of GPU memory. HBM is large and slow, SRAM is tiny and fast. IO-aware code does its work in SRAM.",
    group: "serving",
  },
  {
    term: "Paging",
    definition:
      "Treating the KV cache like virtual memory: fixed-size blocks and a lookup table, so requests share blocks instead of reserving contiguous space.",
    group: "serving",
  },
  {
    term: "Throughput",
    definition:
      "Requests served per unit of time. The metric PagedAttention improved by two to four times.",
    group: "serving",
  },
  // Connecting to the outside world
  {
    term: "Embedding",
    definition:
      "Text converted to numbers so that similar meaning sits close together, which makes a corpus searchable.",
    group: "outside",
  },
  {
    term: "Vector index",
    definition:
      "The searchable store of embeddings. The retrieval half of RAG.",
    group: "outside",
  },
  {
    term: "Knowledge graph",
    definition:
      "Entities as nodes and their relations as edges, built from a corpus. GraphRAG uses it for questions about the whole set.",
    group: "outside",
  },
  {
    term: "Community summary",
    definition:
      "In GraphRAG, a pre-written summary of a cluster of related entities, so a corpus can be summarised cluster by cluster.",
    group: "outside",
  },
  {
    term: "Map-reduce",
    definition:
      "Answer each part separately, then combine the answers. Here: summarise each community, then synthesise.",
    group: "outside",
  },
  {
    term: "Tool calling",
    definition:
      "The model emits a structured request to run an external function, and the result is fed back into its context.",
    group: "outside",
  },
  {
    term: "Agent loop",
    definition: "Reason, call a tool, read the result, reason again. ReAct's pattern.",
    group: "outside",
  },
  {
    term: "MCP",
    definition:
      "An open protocol for connecting models to tools and data, so a tool is written once and works in any client that speaks it.",
    group: "outside",
  },
  {
    term: "JSON-RPC",
    definition: "A simple request and response message format that MCP is built on.",
    group: "outside",
  },
];

export function glossaryGroup(id: string) {
  return glossaryGroups.find((group) => group.id === id);
}
