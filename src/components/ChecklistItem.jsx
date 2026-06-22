import { Icon } from "../utils/iconMap.jsx";

export default function ChecklistItem({ checked, item, onToggle }) {
  return (
    <button
      className={`glass-panel flex w-full items-start gap-3 rounded-lg p-4 text-left transition active:scale-[0.99] ${
        checked ? "bg-[#eef5d8]/80" : ""
      }`}
      onClick={() => onToggle(item.id)}
      type="button"
    >
      <span
        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
          checked ? "bg-[#6f9d4f] text-white" : "bg-white/80 text-[#62815f]"
        }`}
      >
        <Icon className="h-5 w-5" name={checked ? "checkMark" : "circle"} />
      </span>
      <span>
        <span className="block text-sm font-bold leading-5 text-[#183525]">{item.label}</span>
        <span className="mt-1 block text-xs leading-5 text-[#526b55]">{item.detail}</span>
      </span>
    </button>
  );
}
