import { Icon } from "../utils/iconMap.jsx";

export default function BottomNav({ activeTab, items, onNavigate }) {
  return (
    <nav className="safe-bottom fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[430px] border-t border-white/70 bg-white/78 px-2 pt-2 shadow-[0_-18px_38px_rgba(98,44,42,0.12)] backdrop-blur-2xl">
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
      >
        {items.map((item) => {
          const isActive = item.id === activeTab;

          return (
            <button
              aria-current={isActive ? "page" : undefined}
              className={`touch-target flex flex-col items-center justify-center gap-1 rounded-lg px-1 py-2 text-[10px] font-semibold transition ${
                isActive
                  ? "bg-[#f8d8dc] text-[#8d3843] shadow-sm"
                  : "text-[#7a5a58] hover:bg-white/70"
              }`}
              key={item.id}
              onClick={() => onNavigate(item.id)}
              type="button"
            >
              <Icon className="h-5 w-5" name={item.icon} strokeWidth={isActive ? 2.5 : 2} />
              <span className="leading-none">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
