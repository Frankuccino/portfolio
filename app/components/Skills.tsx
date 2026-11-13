import StackIcon from "tech-stack-icons";
import SectionHeading from "./SectionHeading";
import { skillGroups } from "../data/portfolio";

const featured = skillGroups.filter((group) => group.featured);
const supporting = skillGroups.filter((group) => !group.featured);

const chip =
  "text-[11px] px-2 py-1 rounded-md bg-slate-950/60 border border-slate-800/60 text-slate-300";

export default function Skills() {
  return (
    <section id="skills" className="px-4 sm:px-6 py-24 md:py-32 bg-slate-950/40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="02."
          title="Skills"
          description="Applied AI engineering first, then the engineering foundation that ships it. Each group says what I can actually do with it, not just the names."
        />

        {/* Featured: the two groups that do the differentiating */}
        <div className="grid gap-3 lg:grid-cols-2">
          {featured.map((group) => (
            <article
              key={group.title}
              className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md hover:border-[#3e6274]/50 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <StackIcon name={group.icon} className="w-4 h-4" />
                <h3 className="text-sm font-semibold text-slate-100">
                  {group.title}
                </h3>
                <span className="ml-auto text-[10px] font-mono uppercase tracking-widest text-[#3e6274]">
                  Primary focus
                </span>
              </div>
              <p className="text-xs leading-relaxed text-slate-400">
                {group.summary}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {group.items.map((item) => (
                  <span key={item} className={chip}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Supporting groups */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mt-3">
          {supporting.map((group) => (
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
              <p className="text-[11px] leading-relaxed text-slate-400 mb-3">
                {group.summary}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span key={item} className={chip}>
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
