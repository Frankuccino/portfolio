interface HeroFocusCardProps {
  category: string;
  description: React.ReactNode;
  dotColor?: string;
}

export default function HeroFocusCard({
  category,
  description,
  dotColor = "bg-blue-400",
}: HeroFocusCardProps) {
  return (
    <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md shadow-2xl space-y-2 w-full">
      <div className="flex items-center justify-end gap-2">
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          {category}
        </span>
        <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      </div>
      <p className="text-sm text-slate-300 leading-relaxed font-normal">
        {description}
      </p>
    </div>
  );
}
