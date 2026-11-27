import Link from "next/link";

export type ModuleStep = {
  slug: string;
  title: string;
  number: number;
};

const shortLabel = (title: string) =>
  title
    .replace(/^Welcome to the Course$/, "Welcome")
    .replace(/^Introduction to AI-Native Data Engineering$/, "Foundations")
    .replace(/^AI Fundamentals and Stack Components for Data Engineers$/, "Stack")
    .replace(/^The AI Data Lifecycle and the Role of AI Data Engineers$/, "Lifecycle")
    .replace(/^LLMs for Data Engineers:.*$/, "LLMs & Scale")
    .replace(/^RAG Pipelines:.*$/, "RAG & Failure")
    .replace(/^Build a Semantic Search Engine with AI-Native Data Architecture$/, "Search Project")
    .replace(/^Course Summary$/, "Summary")
    .replace(/^Final Exam$/, "Exam")
    .replace(/^AI-Native Data Engineering.*$/, "Foundations");

const code = (number: number) => `M${String(number).padStart(2, "0")}`;

function prevNext(
  module: ModuleStep | undefined,
  basePath: string,
  direction: "previous" | "next",
) {
  const isPrevious = direction === "previous";
  if (!module) {
    return (
      <div className={`max-w-[45%] ${isPrevious ? "" : "text-right"}`}>
        <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
          {isPrevious ? "Start of course" : "End of course"}
        </p>
      </div>
    );
  }
  return (
    <Link
      href={`${basePath}/${module.slug}`}
      className={`group max-w-[45%] rounded-md px-2 py-1.5 transition-colors hover:bg-slate-800/40 ${
        isPrevious ? "" : "text-right"
      }`}
    >
      <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
        {isPrevious ? "← Previous" : "Next →"} · {code(module.number)}
      </p>
      <p className="mt-0.5 truncate text-xs text-slate-300 group-hover:text-white">
        {shortLabel(module.title)}
      </p>
    </Link>
  );
}

export default function ModuleStepper({
  modules,
  currentIndex,
  basePath,
  variant = "top",
}: {
  modules: ModuleStep[];
  currentIndex: number;
  basePath: string;
  variant?: "top" | "bottom";
}) {
  const previous = modules[currentIndex - 1];
  const next = modules[currentIndex + 1];

  if (variant === "bottom") {
    return (
      <nav aria-label="Module pagination" className="border-t border-slate-800/60 pt-3">
        <div className="flex items-stretch justify-between gap-3">
          {prevNext(previous, basePath, "previous")}
          {prevNext(next, basePath, "next")}
        </div>
      </nav>
    );
  }

  return (
    <nav aria-label="Module navigation" className="border-t border-slate-800/60 pt-4">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
          Module roadmap
        </p>
        <Link
          href={`${basePath}/cheat-sheet`}
          className="text-[10px] font-mono uppercase tracking-wider text-[#7fb0c2] transition-colors hover:text-white"
        >
          Exam kit ↗
        </Link>
      </div>

      <ol className="mt-2.5 grid grid-cols-9 gap-1">
        {modules.map((module, index) => {
          const active = index === currentIndex;
          const passed = index < currentIndex;
          return (
            <li key={module.slug} className="min-w-0">
              <Link
                href={`${basePath}/${module.slug}`}
                aria-current={active ? "page" : undefined}
                className="group block min-w-0"
              >
                <span
                  aria-hidden="true"
                  className={`block h-0.5 rounded-full transition-colors ${
                    active
                      ? "bg-[#7fb0c2]"
                      : passed
                        ? "bg-[#3e6274]/70"
                        : "bg-slate-700 group-hover:bg-slate-600"
                  }`}
                />
                <span
                  className={`mt-1.5 block truncate font-mono text-[9px] uppercase tracking-wider ${
                    active
                      ? "text-[#a8d0de]"
                      : passed
                        ? "text-slate-400"
                        : "text-slate-500 group-hover:text-slate-300"
                  }`}
                >
                  {code(module.number)}
                </span>
                <span
                  className={`hidden truncate text-[10px] sm:block ${
                    active
                      ? "text-slate-200"
                      : passed
                        ? "text-slate-400"
                        : "text-slate-500 group-hover:text-slate-300"
                  }`}
                >
                  {shortLabel(module.title)}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
