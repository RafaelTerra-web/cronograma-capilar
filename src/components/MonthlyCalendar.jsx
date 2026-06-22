import { Icon } from "../utils/iconMap.jsx";

const weekLabels = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

function getRoutineTone(routine) {
  if (routine.tags.includes("máscara")) {
    return "bg-[#819b32]";
  }

  if (routine.tags.includes("lavagem")) {
    return "bg-[#4f8a52]";
  }

  if (routine.tags.includes("refresh") || routine.tags.includes("revitalização")) {
    return "bg-[#82a98a]";
  }

  return "bg-[#9aab8f]";
}

export default function MonthlyCalendar({ calendar }) {
  const markedLabel =
    calendar.completedThisMonth === 1
      ? "1 dia marcado neste mês."
      : `${calendar.completedThisMonth} dias marcados neste mês.`;

  return (
    <section className="glass-panel rounded-lg p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-[#356b3d]">Calendário da rotina</p>
          <h2 className="mt-1 text-xl font-black capitalize text-[#183525]">
            {calendar.monthLabel}
          </h2>
          <p className="mt-1 text-xs leading-5 text-[#526b55]">
            {markedLabel}
          </p>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#dcebd4] text-[#356b3d]">
          <Icon className="h-5 w-5" name="calendar" />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1.5">
        {weekLabels.map((label) => (
          <div className="py-1 text-center text-[10px] font-black text-[#62815f]" key={label}>
            {label}
          </div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-px overflow-hidden rounded-lg border border-[#d8e4d2]/60 bg-[#d8e4d2]/60 p-px">
        {calendar.cells.map((cell) => {
          const isDisabled = !cell.isCurrentMonth;
          const tone = getRoutineTone(cell.routine);

          return (
            <button
              aria-label={`${cell.dayNumber} - ${cell.routine.stage}`}
              className={`relative aspect-square text-center text-sm font-bold transition active:scale-[0.97] ${
                cell.isCompleted
                  ? "bg-[#eff8e9] text-[#28613a]"
                  : cell.isToday
                    ? "bg-[#eef5d5] text-[#54722e]"
                    : "bg-white/78 text-[#425b48]"
              } ${isDisabled ? "opacity-35" : ""}`}
              disabled={isDisabled}
              key={cell.dateKey}
              onClick={() => calendar.toggleDate(cell.dateKey)}
              type="button"
            >
              <span
                className={`absolute left-1/2 top-1.5 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full ${
                  cell.isCompleted ? "bg-[#4f8a52] text-white shadow-sm" : ""
                }`}
              >
                {cell.dayNumber}
              </span>
              {cell.isCompleted ? (
                <Icon className="absolute bottom-1.5 right-1.5 h-4 w-4 text-[#3e7745]" name="checkMark" />
              ) : (
                <span
                  className={`absolute bottom-2 left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full ring-2 ring-white/80 ${tone}`}
                />
              )}
              {cell.isToday ? (
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#76a84f] ring-2 ring-white/80" />
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] font-bold text-[#425b48]">
        <span className="flex items-center gap-2 rounded-lg bg-white/56 px-3 py-2">
          <span className="h-3.5 w-3.5 rounded-full bg-[#4f8a52] ring-2 ring-white/80" />
          Lavagem
        </span>
        <span className="flex items-center gap-2 rounded-lg bg-white/56 px-3 py-2">
          <span className="h-3.5 w-3.5 rounded-full bg-[#819b32] ring-2 ring-white/80" />
          Máscara
        </span>
        <span className="flex items-center gap-2 rounded-lg bg-white/56 px-3 py-2">
          <span className="h-3.5 w-3.5 rounded-full bg-[#82a98a] ring-2 ring-white/80" />
          Refresh
        </span>
        <span className="flex items-center gap-2 rounded-lg bg-white/56 px-3 py-2">
          <Icon className="h-4 w-4 text-[#3e7745]" name="checkMark" />
          Marcado
        </span>
      </div>
    </section>
  );
}
