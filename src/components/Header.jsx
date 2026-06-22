export default function Header({ subtitle, title, weeklyProgress }) {
  const circumference = 2 * Math.PI * 18;
  const progressOffset = circumference - (weeklyProgress / 100) * circumference;

  return (
    <header className="safe-top relative z-20 px-4 pb-2">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4f7d46]">
            Rotina capilar
          </p>
          <h1 className="mt-1 truncate text-2xl font-bold leading-tight text-[#183525]">
            {title}
          </h1>
          <p className="mt-1 max-w-[19rem] text-sm leading-5 text-[#526b55]">{subtitle}</p>
        </div>
        <div
          aria-label={`${weeklyProgress}% da semana concluída`}
          className="glass-panel relative mr-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
          role="img"
        >
          <svg className="h-12 w-12 -rotate-90" viewBox="0 0 44 44">
            <circle cx="22" cy="22" fill="none" r="18" stroke="#dce8d2" strokeWidth="4" />
            <circle
              cx="22"
              cy="22"
              fill="none"
              r="18"
              stroke="#4f8a52"
              strokeDasharray={circumference}
              strokeDashoffset={progressOffset}
              strokeLinecap="round"
              strokeWidth="4"
            />
          </svg>
          <span className="absolute text-[10px] font-black text-[#285b35]">{weeklyProgress}%</span>
        </div>
      </div>
    </header>
  );
}
