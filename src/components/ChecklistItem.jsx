import { Icon } from "../utils/iconMap.jsx";

export default function ChecklistItem({ checked, item, onToggle }) {
  return (
    <button
      className={`glass-panel flex w-full items-start gap-3 rounded-lg p-4 text-left transition active:scale-[0.99] ${
        checked ? "bg-[#fff6dc]/80" : ""
      }`}
      onClick={() => onToggle(item.id)}
      type="button"
    >
      <span
        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
          checked ? "bg-[#d9aa54] text-white" : "bg-white/80 text-[#a36a6f]"
        }`}
      >
        <Icon className="h-5 w-5" name={checked ? "checkMark" : "circle"} />
      </span>
      <span>
        <span className="block text-sm font-bold leading-5 text-[#4a2e2d]">{item.label}</span>
        <span className="mt-1 block text-xs leading-5 text-[#805b58]">{item.detail}</span>
      </span>
    </button>
  );
}
