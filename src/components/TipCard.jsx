import { Icon } from "../utils/iconMap.jsx";

export default function TipCard({ index, text }) {
  return (
    <article className="glass-panel flex items-start gap-3 rounded-lg p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e7f6fb] text-[#346b78]">
        <Icon className="h-5 w-5" name={index % 2 === 0 ? "lightbulb" : "sparkles"} />
      </div>
      <p className="text-sm font-semibold leading-6 text-[#5c403e]">{text}</p>
    </article>
  );
}
