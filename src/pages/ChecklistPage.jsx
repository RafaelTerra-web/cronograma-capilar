import ChecklistItem from "../components/ChecklistItem.jsx";
import MonthlyCalendar from "../components/MonthlyCalendar.jsx";
import ProgressCard from "../components/ProgressCard.jsx";
import { Icon } from "../utils/iconMap.jsx";

export default function ChecklistPage({ monthly, weekly }) {
  const allDone = monthly.completedCount === monthly.total;

  return (
    <div className="space-y-4">
      <section className="relative overflow-hidden rounded-lg shadow-soft">
        <img
          alt="Calendário delicado para acompanhar a rotina capilar"
          className="h-40 w-full object-cover"
          src="/assets/widi-calendar-flatlay.png"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#153b25]/52 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <p className="text-sm font-bold drop-shadow">Calendário da princesa</p>
          <p className="mt-1 max-w-[18rem] text-xs font-semibold leading-5 text-white/86">
            Cada check é um cuidado a mais para deixar as ondas no ritmo certo.
          </p>
        </div>
      </section>

      <MonthlyCalendar calendar={weekly.calendar} />

      <ProgressCard
        completed={monthly.completedCount}
        label={`Progresso de ${monthly.monthLabel}`}
        percent={monthly.percent}
        total={monthly.total}
      />

      {allDone ? (
        <section className="rounded-lg bg-gradient-to-br from-[#dcefc7] to-[#dcebdc] p-4 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/70 text-[#4e7c48]">
              <Icon className="h-6 w-6" name="heart" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#183525]">Checklist completo</h2>
              <p className="mt-1 text-sm leading-5 text-[#425b48]">
                Princesa, o mês ficou bem cuidado.
              </p>
            </div>
          </div>
        </section>
      ) : null}

      <div className="space-y-3">
        {monthly.items.map((item) => (
          <ChecklistItem
            checked={Boolean(monthly.checkedItems[item.id])}
            item={item}
            key={item.id}
            onToggle={monthly.toggleItem}
          />
        ))}
      </div>

      {monthly.completedCount > 0 ? (
        <button
          className="touch-target w-full rounded-lg border border-[#4f8a52]/35 bg-white/58 px-4 py-3 text-sm font-bold text-[#356b3d]"
          onClick={monthly.resetChecklist}
          type="button"
        >
          Reiniciar checklist
        </button>
      ) : null}
    </div>
  );
}
