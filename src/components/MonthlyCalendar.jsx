import { Icon } from "../utils/iconMap.jsx";

const weekLabels = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

function getRoutineTone(routine) {
  if (routine.tags.includes("máscara")) {
    return "bg-[#c99223]";
  }

  if (routine.tags.includes("lavagem")) {
    return "bg-[#c94f5d]";
  }

  if (routine.tags.includes("refresh") || routine.tags.includes("revitalização")) {
    return "bg-[#4aa9c1]";
  }

  return "bg-[#9b817d]";
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
          <p className="text-sm font-bold text-[#8d3843]">Calendário da rotina</p>
          <h2 className="mt-1 text-xl font-black capitalize text-[#4a2e2d]">
            {calendar.monthLabel}
          </h2>
          <p className="mt-1 text-xs leading-5 text-[#805b58]">
            {markedLabel}
          </p>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#e9f7fb] text-[#2f6574]">
          <Icon className="h-5 w-5" name="calendar" />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1.5">
        {weekLabels.map((label) => (
          <div className="py-1 text-center text-[10px] font-black text-[#aa6770]" key={label}>
            {label}
          </div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-px overflow-hidden rounded-lg border border-[#ead6d5]/45 bg-[#ead6d5]/45 p-px">
        {calendar.cells.map((cell) => {
          const isDisabled = !cell.isCurrentMonth;
          const tone = getRoutineTone(cell.routine);

          return (
            <button
              aria-label={`${cell.dayNumber} - ${cell.routine.stage}`}
              className={`relative aspect-square text-center text-sm font-bold transition active:scale-[0.97] ${
                cell.isCompleted
                  ? "bg-[#f2fbf5] text-[#236b45]"
                  : cell.isToday
                    ? "bg-[#fff8df] text-[#76540f]"
                    : "bg-white/78 text-[#6f514e]"
              } ${isDisabled ? "opacity-35" : ""}`}
              disabled={isDisabled}
              key={cell.dateKey}
              onClick={() => calendar.toggleDate(cell.dateKey)}
              type="button"
            >
              <span
                className={`absolute left-1/2 top-1.5 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full ${
                  cell.isCompleted ? "bg-[#43a878] text-white shadow-sm" : ""
                }`}
              >
                {cell.dayNumber}
              </span>
              {cell.isCompleted ? (
                <Icon className="absolute bottom-1.5 right-1.5 h-4 w-4 text-[#2f9b67]" name="checkMark" />
              ) : (
                <span
                  className={`absolute bottom-2 left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full ring-2 ring-white/80 ${tone}`}
                />
              )}
              {cell.isToday ? (
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#ce5c66] ring-2 ring-white/80" />
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] font-bold text-[#6f514e]">
        <span className="flex items-center gap-2 rounded-lg bg-white/56 px-3 py-2">
          <span className="h-3.5 w-3.5 rounded-full bg-[#c94f5d] ring-2 ring-white/80" />
          Lavagem
        </span>
        <span className="flex items-center gap-2 rounded-lg bg-white/56 px-3 py-2">
          <span className="h-3.5 w-3.5 rounded-full bg-[#c99223] ring-2 ring-white/80" />
          Máscara
        </span>
        <span className="flex items-center gap-2 rounded-lg bg-white/56 px-3 py-2">
          <span className="h-3.5 w-3.5 rounded-full bg-[#4aa9c1] ring-2 ring-white/80" />
          Refresh
        </span>
        <span className="flex items-center gap-2 rounded-lg bg-white/56 px-3 py-2">
          <Icon className="h-4 w-4 text-[#2f9b67]" name="checkMark" />
          Marcado
        </span>
      </div>
    </section>
  );
}
