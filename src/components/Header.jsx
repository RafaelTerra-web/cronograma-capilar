import { Icon } from "../utils/iconMap.jsx";

export default function Header({ subtitle, title, weeklyProgress }) {
  return (
    <header className="safe-top relative z-20 px-4 pb-2">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b35b62]">
            Rotina capilar
          </p>
          <h1 className="mt-1 truncate text-2xl font-bold leading-tight text-[#4a2e2d]">
            {title}
          </h1>
          <p className="mt-1 max-w-[19rem] text-sm leading-5 text-[#815b59]">{subtitle}</p>
        </div>
        <div className="glass-panel mr-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#fff7ef]">
            <Icon className="h-5 w-5 text-[#cf5b68]" name="sparkles" />
            <span className="absolute bottom-0 right-0 rounded-full bg-[#b8dceb] px-1.5 py-0.5 text-[10px] font-bold text-[#314d59]">
              {weeklyProgress}%
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
