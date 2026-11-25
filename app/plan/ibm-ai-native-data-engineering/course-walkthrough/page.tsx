import Link from "next/link";
import type { Metadata } from "next";
import { canonical } from "../../../lib/siteUrl";
import { PromptBlock } from "./components/PromptBlock";

export const metadata: Metadata = {
  title: "Course Walkthrough Guide · Frank Angelo Malubag",
  description:
    "The workflow for collecting raw sub-module files, synthesizing notes, and rolling up sub-modules into a Complete Module Guide with a mock exam.",
  alternates: { canonical: canonical("/plan/ibm-ai-native-data-engineering/course-walkthrough") },
};

const SUB_MODULE_PROMPT = `Act as a Principal AI Data Engineer and technical study assistant. I have attached a batch of raw course files for a single sub-module of the IBM AI-Native Data Engineering course (\`.txt\` video transcripts, \`.pdf\` reading guides, \`.ipynb\` Jupyter lab notebooks, and/or diagram screenshots).

Process ALL attached files together in one unified pass. Strip out all conversational filler, intros, repetition, and noisy notebook setup/pip-install logs. Synthesize, deduplicate, and cross-reference everything into ONE cohesive, copy-pasteable Markdown study guide using this exact structure:

# [Sub-Module Title]

## 1. The 3-Bullet Takeaway
- **Core Architecture Pattern:** [1 sentence capturing the main design pattern across all files]
- **#1 Failure Mode:** [1 sentence capturing the biggest operational or security trap]
- **Key Engineering Trade-Off:** [1 sentence capturing the main architectural trade-off]

## 2. Unified Glossary of Facts & Definitions
- Merge definitions from all videos and readings into clear thematic subheadings. Eliminate duplicates. Keep definitions sharp, factual, and exam-focused.

## 3. Architecture, Workflows & Comparisons
- Convert any multi-step pipelines, layer responsibilities, visual diagrams, and tool comparisons into clean Markdown tables.

## 4. Failure Modes, Security & Best Practices
- Consolidate every warning, latency bottleneck, governance rule, and "what breaks if ignored" mentioned across the files.

## 5. Lab Code Cookbook (Include ONLY if an \`.ipynb\` notebook or code is attached)
- **Imports & Dependencies Breakdown:** List every \`import\` statement used in the notebook and explain in plain English what each library does and why it is needed in the pipeline.
- **Core Functional Snippets:** Extract the main functional code blocks (parsing, chunking, embedding, metadata filtering, vector search), ignoring dummy setup or installation cells.
- **Parameter & Logic Breakdown:** Explain how the data transforms from input to output and why key parameters (e.g., \`chunk_size\`, \`overlap\`, \`top_k\`, metadata filters) were chosen.

## 6. 5-Question Sub-Module Practice Quiz
- Write 5 scenario-based multiple-choice questions that test how concepts from the videos, readings, and labs connect together (matching Coursera's graded quiz style).
- Place the **Answer Key & Explanations** at the very bottom.`;

const MODULE_ROLLUP_PROMPT = `Act as a Principal AI Data Engineer and curriculum architect. I have attached the structured Markdown study notes (\`.md\` files) from all the sub-modules that make up a single complete module in the IBM AI-Native Data Engineering course.

Your job is to synthesize, deduplicate, and connect all attached sub-module files into ONE unified, comprehensive **Complete Module Master Guide**. Eliminate repeated definitions across sub-modules, resolve any overlapping concepts, and show how the pieces connect end-to-end.

Format the final output strictly using this Markdown structure:

# [Module Title] — Complete Master Guide

## 1. Module Executive Summary & Mental Model
- **The Big Picture:** [2–3 sentences explaining what this entire module teaches and why it matters in production.]
- **How the Sub-Modules Connect:** [A short step-by-step flow showing how Sub-Module 1 leads into Sub-Module 2, 3, etc., forming one complete system.]

## 2. Master Glossary (Deduplicated)
- Merge all definitions from the attached sub-module files into one clean, non-repetitive glossary grouped by logical theme (e.g., Architecture, Storage & Indexing, Retrieval, Governance & Observability).

## 3. End-to-End Architecture & Decision Matrix
- **System Blueprint Table:** Combine the architectural layers, components, or pipeline stages across all sub-modules into one master reference table (Columns: Stage / Component | Core Responsibility | Key Tools / Patterns | Primary Failure Mode).
- **Engineering Trade-Offs Matrix:** Summarize the key "When to use X vs. Y" decisions covered across the module.

## 4. Master Failure Modes & Security Checklist
- Consolidate all warnings, anti-patterns, latency bottlenecks, and security rules from the sub-modules into a single prioritized checklist for production readiness.

## 5. Unified Lab Code Reference (Include ONLY if lab code is present in the attached files)
- **Master Imports List:** Combine all unique \`import\` statements across the module's labs with a concise, plain-English explanation of each library's role.
- **End-to-End Pipeline Flow:** Show how the individual lab snippets connect together in sequence (e.g., Load/Parse -> Chunk -> Embed -> Store -> Permission-Filtered Retrieve -> Generate), keeping key parameter explanations intact.

## 6. 10-Question Final Module Mock Exam
- Create 10 challenging, scenario-based multiple-choice questions that blend concepts across *multiple* sub-modules (matching the difficulty of a Coursera Graded Module Quiz).
- Include a detailed **Answer Key & Explanations** section at the very bottom explaining why the correct answer works and why the distractors fail.`;

const COURSE_PROMPT = `Act as a Principal AI Data Engineer and Chief Curriculum Architect. I have attached the Complete Module Master Guides (\`.md\` files) for every module in the IBM AI-Native Data Engineering course.

Your job is to synthesize, deduplicate, and unify ALL attached module guides into ONE definitive, executive-level **Complete Course Master Bible & Production Playbook**. Eliminate any repeated definitions across modules, connect concepts across the entire course lifecycle, and turn this into a permanent engineering reference and final exam prep guide.

Format the output strictly using this Markdown structure:

# [Course Title] — Complete Course Master Bible

## 1. Course-Wide Mental Model & Architecture Narrative
- **The Core Thesis:** [3–4 sentences summarizing the overarching engineering philosophy of the entire course.]
- **End-to-End Course Progression:** [Show how Module 1 builds into Module 2, 3, 4, etc., forming a single production-grade AI-native system from raw ingestion to live runtime observability.]

## 2. Master Course Glossary (Deduplicated)
- Consolidate all core terms across every module into one clean, non-repetitive reference dictionary organized by architectural domain (e.g., Data Ingestion & Prep, Embeddings & Indexing, Runtime Retrieval, Security & Governance, Evaluation & Observability).

## 3. Master Architectural Blueprint & Decision Matrix
- **End-to-End System Table:** Map every layer/stage taught across the entire course (Columns: Stage | Core Responsibility | Key Tools & Patterns | Latency/Freshness Requirement | Primary Failure Mode).
- **Master Engineering Trade-Offs Table:** Consolidate all major architectural decisions ("When to choose Option A vs. Option B") across the course.

## 4. Production Readiness & Governance Checklist
- Create a single, prioritized engineering checklist covering security (RBAC, metadata filtering, PII protection), freshness/drift controls, evaluation sets, and full-chain observability.

## 5. Master Code Cookbook & Library Reference
- **Complete Tech Stack & Imports Directory:** List every unique Python library/module used across all course labs with a crisp explanation of its exact role in the pipeline.
- **Canonical End-to-End Code Pattern:** Provide a clean, annotated reference skeleton showing how all the lab stages fit together in sequence (Ingest/Parse -> Chunk -> Tag Metadata -> Embed -> Vector Index -> Permission-Filtered Search -> Grounded LLM Generation).

## 6. 15-Question Comprehensive Course Final Exam
- Write 15 high-difficulty, scenario-based multiple-choice questions that test cross-module mastery (e.g., diagnosing a failure where chunking, metadata filtering, freshness drift, and latency interact).
- Include a thorough **Answer Key & Explanations** section at the very bottom detailing why the right answer works and why each distractor fails.`;

export default function CourseWalkthroughPage() {
  return (
    <main className="px-4 sm:px-6 pt-28 pb-24 min-h-screen">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/plan/ibm-ai-native-data-engineering"
          className="text-xs text-slate-400 hover:text-slate-300 transition-colors"
        >
          ← Back to IBM AI-Native Data Engineering
        </Link>

        <header className="mt-6 mb-10 space-y-3">
          <p className="text-xs font-mono uppercase tracking-widest text-[#5f93a8]">
            {"//"} Course Walkthrough
          </p>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight font-display text-slate-100 leading-tight">
            How to work through a single module.
          </h1>
          <p className="max-w-2xl text-sm md:text-base text-slate-400 leading-relaxed">
            Three steps, from collecting raw files to a complete module guide
            with a 10-question mock exam. Written for the IBM AI-Native Data
            Engineering Professional Certificate, but it applies to any
            Coursera sub-module.
          </p>
        </header>

        {/* Timeline rail, same geometry as the plan page. */}
        <div className="relative space-y-8">
          <div className="absolute left-[15px] top-3 bottom-3 w-px bg-slate-800" />

          <section className="relative pl-12">
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full border-2 border-[#3e6274] bg-[#0e0d16] text-[#5f93a8] flex items-center justify-center font-mono text-xs font-bold">
              1
            </div>
            <h3 className="text-lg font-semibold text-slate-100">Collect the raw files</h3>
            <p className="mt-1 text-sm text-slate-400">
              As you work through a sub-module, save each file straight to a folder.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li>
                <strong className="text-slate-300">Videos:</strong> right-click the
                transcript link → Save Link As… → .txt file.
              </li>
              <li>
                <strong className="text-slate-300">Labs:</strong> right-click the
                .ipynb file in JupyterLab → Download.
              </li>
              <li>
                <strong className="text-slate-300">Readings:</strong> hit Ctrl+P →
                Save as PDF (or highlight and copy the text if it is short).
              </li>
            </ul>
          </section>

          <section className="relative pl-12">
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full border-2 border-[#3e6274] bg-[#0e0d16] text-[#5f93a8] flex items-center justify-center font-mono text-xs font-bold">
              2
            </div>
            <h3 className="text-lg font-semibold text-slate-100">
              Drag &amp; drop into one chat message
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              At the end of the sub-module you do not need to open the files.
            </p>
            <ol className="mt-4 space-y-2 text-sm text-slate-400">
              <li>Open a chat message (or your localhost app).</li>
              <li>
                Drag and drop all downloaded .txt, .ipynb, and .pdf files for that
                sub-module directly into the chat input at once.
              </li>
              <li>Paste the Sub-Module Master Prompt above the attached files and hit Send.</li>
              <li>
                Save the generated Markdown output as{" "}
                <code className="text-xs bg-slate-800 px-1.5 py-0.5 rounded font-mono text-slate-300">
                  SubModule_1_Notes.md
                </code>{" "}
                (and take the 5-question practice quiz).
              </li>
            </ol>
          </section>

          <section className="relative pl-12">
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full border-2 border-[#3e6274] bg-[#0e0d16] text-[#5f93a8] flex items-center justify-center font-mono text-xs font-bold">
              3
            </div>
            <h3 className="text-lg font-semibold text-slate-100">Roll up all sub-modules</h3>
            <p className="mt-1 text-sm text-slate-400">
              Once you have finished every sub-module in the module, roll them up.
            </p>
            <ol className="mt-4 space-y-2 text-sm text-slate-400">
              <li>
                Drag and drop the saved{" "}
                <code className="text-xs bg-slate-800 px-1.5 py-0.5 rounded font-mono text-slate-300">
                  SubModule_1_Notes.md
                </code>
                ,{" "}
                <code className="text-xs bg-slate-800 px-1.5 py-0.5 rounded font-mono text-slate-300">
                  SubModule_2_Notes.md
                </code>
                ,{" "}
                <code className="text-xs bg-slate-800 px-1.5 py-0.5 rounded font-mono text-slate-300">
                  SubModule_3_Notes.md
                </code>
                {", ..."}{" "}
                files into a new message (or paste them together).
              </li>
              <li>Paste the Complete Module Roll-Up Prompt above them and hit Send.</li>
              <li>
                You now have one master, deduplicated Complete Module Guide plus a
                10-question mock exam ready for the Coursera Graded Quiz.
              </li>
            </ol>
          </section>
        </div>

        {/* Which prompt to use, before the two side-by-side blocks. */}
        <div className="mt-12 mb-5 border-t border-slate-800/60 pt-6">
          <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">
            {"//"} The two prompts
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-400 leading-relaxed">
            Use the first prompt on every sub-module, attached to that sub-module&apos;s
            raw files. Use the second only once the module is complete, attached to
            the saved notes from all of its sub-modules. Copy either one with the
            button in its corner.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <PromptBlock label="Sub-Module Master Prompt" content={SUB_MODULE_PROMPT} />
          <PromptBlock label="Complete Module Roll-Up Prompt" content={MODULE_ROLLUP_PROMPT} />
        </div>

        {/* Tier 3, the final Reduce. Placed below the two side-by-side blocks. */}
        <div className="mt-12 border-t border-slate-800/60 pt-6">
          <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">
            {"//"} Final Course Roll-Up Prompt
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-slate-400 leading-relaxed">
            Here is the Final Course Roll-Up Prompt (your top-level &quot;Reduce&quot; step). Once you
            finish all the modules in the course, you simply attach all of your saved{" "}
            <code className="text-xs bg-slate-800 px-1.5 py-0.5 rounded font-mono text-slate-300">
              Module_1_Master_Guide.md
            </code>
            ,{" "}
            <code className="text-xs bg-slate-800 px-1.5 py-0.5 rounded font-mono text-slate-300">
              Module_2_Master_Guide.md
            </code>
            , etc. files into one chat and run this prompt to create a single Complete
            Course Capstone &amp; Interview Bible.
          </p>

          <h3 className="mt-6 text-sm font-semibold text-slate-200">
            Your Complete 3-Tier Knowledge Hierarchy
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            You now have a complete Map-Reduce-Reduce study pipeline:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#5f93a8] shrink-0">Tier 1</span>
                <span className="text-slate-300 font-medium">Sub-Module Level</span>
                <span className="text-slate-500">:</span>
                <span>Raw .txt + .ipynb + Pasted Readings <span className="text-[#5f93a8]">→</span> Sub-Module Guide (5-question quiz)</span>
              </li>
              <li className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#5f93a8] shrink-0">Tier 2</span>
                <span className="text-slate-300 font-medium">Module Level</span>
                <span className="text-slate-500">:</span>
                <span>All Sub-Module .md files <span className="text-[#5f93a8]">→</span> Complete Module Master Guide (10-question mock exam)</span>
              </li>
              <li className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#5f93a8] shrink-0">Tier 3</span>
                <span className="text-slate-300 font-medium">Course Level</span>
                <span className="text-slate-500">:</span>
                <span>All Module .md files <span className="text-[#5f93a8]">→</span> Complete Course Master Bible (15-question final exam + interview reference)</span>
              </li>
          </ul>
        </div>

        <div className="mt-5">
          <PromptBlock label="Complete Course Roll-Up Prompt" content={COURSE_PROMPT} />
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800/60">
          <Link
            href="/plan/ibm-ai-native-data-engineering"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors"
          >
            <span className="text-[#5f93a8]">←</span>
            Back to IBM AI-Native Data Engineering
          </Link>
        </div>
      </div>
    </main>
  );
}
