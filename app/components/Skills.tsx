import StackIcon from "tech-stack-icons";
import SectionHeading from "./SectionHeading";
import { skillGroups } from "../data/portfolio";

export default function Skills() {
  return (
    <section id="skills" className="px-4 sm:px-6 py-24 md:py-32 bg-slate-950/40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="02."
          title="Skills"
          description="A working matrix of the languages, frameworks, and infrastructure I use to take a system from idea to production."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md hover:border-[#3e6274]/50 transition-colors"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <StackIcon name={group.icon} className="w-4 h-4" />
                <h3 className="text-sm font-semibold text-slate-100">
                  {group.title}
                </h3>
              </div>
              <p className="text-[11px] text-slate-500 mb-3">{group.note}</p>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-[11px] px-2 py-1 rounded-md bg-slate-950/60 border border-slate-800/60 text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
