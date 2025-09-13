import ProgressBar from "./ProgressBar";

export type Module = {
  id: number;
  title: string;
  tags: string[];
  progress: number;
  gradient: string;
};

export default function ModuleCard({ title, tags, progress, gradient }: Module) {
  return (
    <article className="group flex flex-col gap-3 rounded-2xl border bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <div className={`h-28 w-full rounded-xl bg-gradient-to-br ${gradient} group-hover:scale-[1.01] transition-transform`} />
      <div className="flex flex-1 flex-col gap-3">
        <h3 className="text-base font-semibold tracking-tight">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium text-gray-700">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-auto">
          <ProgressBar value={progress} gradient={gradient} />
          <p className="mt-1 text-xs text-gray-500">{progress}%</p>
        </div>
      </div>
    </article>
  );
}
