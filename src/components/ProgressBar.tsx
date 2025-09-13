type Props = { value: number; gradient?: string };

export default function ProgressBar({ value, gradient = "from-sky-500 to-blue-600" }: Props) {
  const v = Math.min(100, Math.max(0, value));
  return (
    <div className="h-2 w-full rounded-full bg-gray-100">
      <div
        className={`h-2 rounded-full bg-gradient-to-r ${gradient} transition-[width] duration-500`}
        style={{ width: `${v}%` }}
        role="progressbar"
        aria-valuenow={v}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}
