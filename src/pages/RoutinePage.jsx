import { useState } from "react";
import RoutineEditor from "../components/RoutineEditor.jsx";
import RoutineCard from "../components/RoutineCard.jsx";
import { Icon } from "../utils/iconMap.jsx";

export default function RoutinePage({ routine, weekly }) {
  const todayId = weekly.today.id;
  const allDone = weekly.completedCount === weekly.total;
  const [editorOpen, setEditorOpen] = useState(false);

  const openEditor = () => setEditorOpen(true);

  return (
    <div className="space-y-4">
      <section className="overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-[#dcefc7] via-[#f7faef] to-[#e4f3e6] p-4 shadow-soft ring-1 ring-white/80">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-serif text-xl font-bold text-[#183525]">Sua semana, do seu jeito</p>
            <p className="mt-1 max-w-[15rem] text-xs leading-5 text-[#526b55]">
              Troque o tipo de cuidado de qualquer dia quando sua rotina mudar.
            </p>
          </div>
          <button
            className="touch-target inline-flex shrink-0 items-center gap-2 rounded-full bg-[#3f7d45] px-4 py-3 text-xs font-black text-white shadow-lg shadow-[#3f7d45]/15"
            onClick={openEditor}
            type="button"
          >
            <Icon className="h-4 w-4" name="edit" />
            Editar
          </button>
        </div>
      </section>

      {allDone ? (
        <section className="rounded-lg bg-gradient-to-br from-[#e9efc8] to-[#dcebdc] p-4 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/70 text-[#8b650b]">
              <Icon className="h-6 w-6" name="sparkles" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#183525]">Semana concluída</h2>
              <p className="mt-1 text-sm leading-5 text-[#425b48]">
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
          className="touch-target w-full rounded-lg border border-[#6f9d4f]/45 bg-white/58 px-4 py-3 text-sm font-bold text-[#3f682d]"
          onClick={weekly.resetWeek}
          type="button"
        >
          Reiniciar semana
        </button>
      ) : null}

      {routine.isCustomized ? (
        <button
          className="touch-target inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#7d9b37]/35 bg-[#f4f8e8] px-4 py-3 text-sm font-bold text-[#587622]"
          onClick={routine.resetRoutine}
          type="button"
        >
          <Icon className="h-4 w-4" name="reset" />
          Restaurar rotina padrão
        </button>
      ) : null}

      <RoutineEditor
        days={routine.days}
        initialDayId={todayId}
        onClose={() => setEditorOpen(false)}
        onSave={(dayId, careType) => {
          routine.setDayCareType(dayId, careType);
          setEditorOpen(false);
        }}
        open={editorOpen}
      />
    </div>
  );
}
