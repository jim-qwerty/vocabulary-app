type Props = { title?: string; children?: React.ReactNode };
export default function Card({ title, children }: Props) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm animate-in slide-in-from-bottom-2 fade-in-50 duration-300">
      {title && <h2 className="font-semibold mb-2">{title}</h2>}
      {children}
    </div>
  );
}
