import Link from "next/link";
import {
  coverageAreas,
  coverageStats,
  coverageTotal,
  planHours,
  planHoursMissing,
  planHoursTotal,
  stepComposition,
} from "../data/coverage";
import { roadmapSteps } from "../data/roadmap";
import { takeawayStepId } from "../data/takeaways";

/**
 * Dark to light ramp of the accent family, one shade per area. A single hue
 * family reads as one discipline; six unrelated colours would read as six
 * tracks, which is the thing the whole bar exists to argue against.
 */
const RAMP = [
  "bg-[#2c4250]",
  "bg-[#3e6274]",
  "bg-[#4f7d92]",
  "bg-[#5f93a8]",
  "bg-[#7fb0c2]",
  "bg-[#a8d0de]",
];

/**
 * Neutral ramp for the plan-level bar. Deliberately not the accent family: that
 * ramp encodes the six areas, and a second meaning for the same shades is worse
 * than a bar that reads as structural rather than as field content.
 */
const PLAN_RAMP = [
  "bg-slate-600",
  "bg-slate-500",
  "bg-slate-400",
  "bg-slate-300",
];

/**
 * The coverage section on the plan page, placed right under the page description
 * because it is the summary of the plan rather than an appendix to it.
 *
 * Two views, labelled differently on purpose. "What each step covers" is a
 * declared mapping read off the published syllabi, so it says so. "Where the map
 * is heavy" is counted from the condensed concept map, so its denominator is
 * printed. Neither is a measure of skill, and the section closes on that.
 */
export default function Coverage() {
  return (
    <section className="mb-12 space-y-3">
      <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">
        {"//"} Coverage
      </h2>

      <p className="max-w-2xl text-sm md:text-base text-slate-400 leading-relaxed">
        What each step covers, as a share of that step&apos;s own content. Declared
        from the published syllabus rather than measured, and editable in the
        plan&apos;s data. A zero means the step does not touch the area at all.
      </p>

      <div className="overflow-x-auto pb-1">
        <table className="w-full min-w-[820px] border-collapse text-sm">
          <thead>
            <tr>
              <th className="py-2 pr-3 text-left font-mono text-[11px] uppercase tracking-wider text-slate-300">
                {"//"} Step
              </th>
              {coverageAreas.map((area) => (
                <th
                  key={area.id}
                  className="py-2 px-1 text-right font-mono text-[11px] uppercase tracking-wider text-slate-300"
                >
                  {area.short}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {roadmapSteps.map((step) => {
              const row = stepComposition[step.id] ?? {};
              const cells = coverageAreas.map((area) => row[area.id] ?? 0);
              const max = Math.max(...cells);
              return (
                <tr key={step.id} className="border-t border-slate-800/70">
                  <th className="py-2 pr-3 text-left font-medium text-slate-100">
                    {step.title}
                    <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-slate-400">
                      {step.finished ? "Finished" : step.order}
                    </span>
                  </th>
                  {coverageAreas.map((area, index) => {
                    const value = cells[index];
                    const isMax = value === max && value > 0;
                    return (
                      <td key={area.id} className="py-2 px-1 text-right">
                        <span
                          className={`inline-block min-w-[2.75rem] rounded px-1.5 py-0.5 tabular-nums ${
                            isMax
                              ? "bg-[#3e6274]/45 font-semibold text-white"
                              : "text-slate-400"
                          }`}
                        >
                          {value}%
                        </span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* The table's own whole. The six bars below answer a different question,
          about the concept map, so this one is about the plan itself. Solid
          accent rather than the area ramp: the ramp encodes the six areas, and
          reusing it here would have one scale meaning two things. */}
      <div className="pt-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
          <p className="text-sm font-semibold text-slate-100">
            The plan, by published course hours
          </p>
          <p className="text-xs font-mono text-slate-300 tabular-nums">
            {planHoursTotal} h
          </p>
        </div>
        <div
          aria-hidden="true"
          className="mt-2 flex h-2.5 overflow-hidden rounded-full bg-slate-800/80"
        >
          {planHours.map(({ step, hours }, index) => (
            <div
              key={step.id}
              className={PLAN_RAMP[index % PLAN_RAMP.length]}
              style={{ width: `${(hours / planHoursTotal) * 100}%` }}
            />
          ))}
        </div>
        <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
          {planHours.map(({ step, hours }, index) => (
            <li
              key={step.id}
              className="flex items-center gap-1.5 text-[11px] text-slate-400"
            >
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${PLAN_RAMP[index % PLAN_RAMP.length]}`}
              />
              {step.title}
              <span className="font-mono text-slate-500">{hours} h</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-slate-300 leading-relaxed">
          Not in the bar: {planHoursMissing.map((step) => step.title).join(", ")}.
          They publish no course hours, so they are named rather than estimated.
        </p>
      </div>

      <p className="max-w-2xl text-sm md:text-base text-slate-400 leading-relaxed">
        Where the map is heavy: share of the {coverageTotal} concepts in the
        condensed AI engineering map, counted from the map itself.
      </p>

      <div className="space-y-4 pt-1">
        {coverageStats.map((area) => (
          <div key={area.id}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <p className="text-sm font-semibold text-slate-100">{area.title}</p>
              <p className="text-xs font-mono text-slate-300 tabular-nums">
                {area.percent}%
              </p>
            </div>
            <div className="mt-2 h-2 rounded-full bg-slate-800/80">
              <div
                className="h-2 rounded-full bg-[#5f93a8]"
                style={{ width: `${(area.concepts / coverageTotal) * 100}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              {area.statement}
            </p>
          </div>
        ))}
      </div>

      <div className="pt-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
          <p className="text-sm font-semibold text-slate-100">AI Engineering</p>
          <p className="text-xs font-mono text-slate-300 tabular-nums">100%</p>
        </div>
        <div
          aria-hidden="true"
          className="mt-2 flex h-2.5 overflow-hidden rounded-full bg-slate-800/80"
        >
          {coverageStats.map((area, index) => (
            <div
              key={area.id}
              className={RAMP[index]}
              style={{ width: `${(area.concepts / coverageTotal) * 100}%` }}
            />
          ))}
        </div>
        <p className="mt-2 text-xs text-slate-400 leading-relaxed">
          The six areas are the composition of one discipline, not six separate
          tracks.
        </p>
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          {coverageStats.map((area, index) => (
            <li
              key={area.id}
              className="flex items-center gap-1.5 text-[11px] text-slate-400"
            >
              <span className={`h-2 w-2 rounded-full ${RAMP[index]}`} />
              {area.title}
              <span className="font-mono text-slate-500">{area.percent}%</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="max-w-2xl text-sm md:text-base text-slate-400 leading-relaxed">
        Both views measure what the plan covers, not how good you are. Coverage is
        not skill. The evidence lives in the portfolio, the blog, and the eval set,
        and the map itself is at{" "}
        <Link
          href={`/plan/${takeawayStepId}/takeaways`}
          className="text-[#5f93a8] hover:text-slate-300 transition-colors"
        >
          /plan/{takeawayStepId}/takeaways
        </Link>
        .
      </p>
    </section>
  );
}
