import ProgressCard from "../components/ProgressCard.jsx";
import RoutineCard from "../components/RoutineCard.jsx";
import { routineHighlights } from "../data/routine.js";
import { Icon } from "../utils/iconMap.jsx";

export default function HomePage({ navigate, weekly }) {
  const today = weekly.today;
  const isTodayDone = Boolean(weekly.todayEntry.isCompleted);
  const maskDay = weekly.weekEntries.find((day) => day.tags.includes("máscara"));

  return (
    <div className="space-y-4">
      <section className="relative overflow-hidden rounded-lg shadow-soft">
        <img
          alt="Kit capilar delicado com frascos em tons creme e rosa"
          className="h-48 w-full object-cover"
          src="/assets/widi-routine-tools.png"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#153b25]/68 via-[#153b25]/26 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#153b25]/70 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <p className="text-sm font-semibold drop-shadow">Olá, Princesa</p>
          <h2 className="mt-1 max-w-[17rem] text-2xl font-black leading-8 text-balance drop-shadow-[0_2px_10px_rgba(36,18,18,0.42)]">
            Bem-vinda à sua rotina capilar.
          </h2>
        </div>
      </section>

      <ProgressCard
        completed={weekly.completedCount}
        label="Progresso da semana"
        percent={weekly.percent}
        total={weekly.total}
      />

      <RoutineCard
        day={weekly.todayEntry}
        isCompleted={isTodayDone}
        onToggle={weekly.toggleDay}
        today
      />

      <button
        className="touch-target flex w-full items-center justify-between rounded-lg bg-[#285b35] px-5 py-4 text-left text-white shadow-soft transition active:scale-[0.99]"
        onClick={() => navigate("tutorial")}
        type="button"
      >
        <span>
          <span className="block text-sm font-bold">Ver passo a passo</span>
          <span className="mt-1 block text-xs text-white/72">Finalização com creme e fitagem leve</span>
        </span>
        <Icon className="h-5 w-5" name="chevron" />
      </button>

      <section className="glass-panel rounded-lg p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-[#356b3d]">Resumo da semana</p>
            <p className="mt-1 text-xs leading-5 text-[#526b55]">
              Máscara em {maskDay.dayName.toLowerCase()} · {maskDay.time}
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e3efc8] text-[#54722e]">
            <Icon className="h-5 w-5" name="calendar" />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-1.5">
          {weekly.weekEntries.map((day) => {
            const done = Boolean(day.isCompleted);
            const isToday = day.id === today.id;

            return (
              <button
                aria-label={`${day.dayName}, ${day.dateLabel}`}
                className={`rounded-lg px-1 py-2 text-center text-[11px] font-bold transition ${
                  done
                    ? "bg-[#6f9d4f] text-white"
                    : isToday
                      ? "bg-[#dcefc7] text-[#356b3d]"
                      : "bg-white/64 text-[#58705b]"
                }`}
                key={day.id}
                onClick={() => weekly.toggleDay(day.id)}
                type="button"
              >
                <span className="block">{day.shortName}</span>
                <span className="mt-0.5 block text-[10px] opacity-75">{day.dateNumber}</span>
                <Icon
                  className="mx-auto mt-1 h-4 w-4"
                  name={done ? "checkMark" : isToday ? "sparkles" : "circle"}
                />
              </button>
            );
          })}
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3">
        {routineHighlights.map((highlight) => (
          <div className="rounded-lg bg-white/62 p-3 shadow-sm" key={highlight}>
            <p className="text-xs font-bold leading-5 text-[#425b48]">{highlight}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
