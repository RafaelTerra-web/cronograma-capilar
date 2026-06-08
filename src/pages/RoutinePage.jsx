import RoutineCard from "../components/RoutineCard.jsx";
import { Icon } from "../utils/iconMap.jsx";

export default function RoutinePage({ weekly }) {
  const todayId = weekly.today.id;
  const allDone = weekly.completedCount === weekly.total;

  return (
    <div className="space-y-4">
      {allDone ? (
        <section className="rounded-lg bg-gradient-to-br from-[#fff0bf] to-[#e7f6fb] p-4 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/70 text-[#8b650b]">
              <Icon className="h-6 w-6" name="sparkles" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#4a2e2d]">Semana concluída</h2>
              <p className="mt-1 text-sm leading-5 text-[#6f514e]">
                Princesa, a constância da semana está impecável.
              </p>
            </div>
          </div>
        </section>
      ) : null}

      {weekly.weekEntries.map((day) => (
        <RoutineCard
          day={day}
          isCompleted={Boolean(day.isCompleted)}
          key={day.id}
          onToggle={weekly.toggleDay}
          today={day.id === todayId}
        />
      ))}

      {weekly.completedCount > 0 ? (
        <button
          className="touch-target w-full rounded-lg border border-[#d9aa54]/45 bg-white/58 px-4 py-3 text-sm font-bold text-[#76540f]"
          onClick={weekly.resetWeek}
          type="button"
        >
          Reiniciar semana
        </button>
      ) : null}
    </div>
  );
}
