import SectionHeading from "./SectionHeading";

const channels = [
  {
    label: "Email",
    value: "frankamalubag@gmail.com",
    href: "mailto:frankamalubag@gmail.com",
    note: "Fastest way to reach me",
  },
  {
    label: "LinkedIn",
    value: "in/frank-angelo-malubag",
    href: "https://www.linkedin.com/in/frank-angelo-malubag/",
    note: "Network & opportunities",
  },
  {
    label: "GitHub",
    value: "@Frankuccino",
    href: "https://github.com/Frankuccino",
    note: "Code & open source",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="px-4 sm:px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="06."
          title="Contact"
          description="Open to backend, AI engineering, and full-stack roles — especially where the work is hard and the standards are high."
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {channels.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md hover:border-[#3e6274]/50 transition-colors group"
            >
              <p className="text-[11px] uppercase tracking-wider text-slate-500">
                {channel.label}
              </p>
              <p className="text-sm font-medium text-slate-100 mt-1.5 group-hover:text-white transition-colors">
                {channel.value}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">{channel.note}</p>
            </a>
          ))}
        </div>

        <div className="mt-3 p-4 rounded-xl bg-slate-900/30 border border-slate-800/40 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-slate-400 leading-relaxed">
            Based in Dumaguete City, Philippines — working remotely across time
            zones. Currently deepening expertise in distributed systems and
            applied AI engineering.
          </p>
          <a
            href="mailto:frankamalubag@gmail.com"
            className="text-xs font-medium px-3 py-1.5 rounded-md border border-[#3e6274]/50 text-slate-200 hover:bg-[#3e6274]/20 transition-colors shrink-0"
          >
            Start a conversation
          </a>
        </div>
      </div>
    </section>
  );
}
