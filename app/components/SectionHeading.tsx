type SectionHeadingProps = {
  index: string;
  title: string;
  description?: string;
};

export default function SectionHeading({
  index,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mb-10 space-y-3">
      <p className="text-xs font-mono uppercase tracking-widest text-slate-500">
        {"//"} {index} {title}
      </p>
      <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-100">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-sm md:text-base text-slate-400 leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  );
}
