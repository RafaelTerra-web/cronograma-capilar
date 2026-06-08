import { motion } from "framer-motion";
import { Icon } from "../utils/iconMap.jsx";

export default function RoutineCard({ day, isCompleted, onToggle, today = false }) {
  return (
    <motion.article
      animate={{ scale: isCompleted ? 0.99 : 1 }}
      className={`glass-panel rounded-lg p-4 transition ${
        isCompleted ? "border-[#d5b062]/80 bg-[#fff9ea]/75" : ""
      } ${today ? "ring-2 ring-[#d9aa54]/50" : ""}`}
      layout
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
            isCompleted ? "bg-[#f5e7ba] text-[#76540f]" : "bg-[#fde1e5] text-[#b84453]"
          }`}
        >
          <Icon className="h-6 w-6" name={isCompleted ? "check" : day.icon} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-bold leading-6 text-[#4a2e2d]">{day.dayName}</h2>
            {day.dateLabel ? (
              <span className="rounded-full bg-white/72 px-2.5 py-1 text-[11px] font-bold text-[#7a5a58]">
                {day.dateLabel}
              </span>
            ) : null}
            {today ? (
              <span className="rounded-full bg-[#b8dceb]/70 px-2.5 py-1 text-[11px] font-bold text-[#315966]">
                Hoje
              </span>
            ) : null}
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                isCompleted
                  ? "bg-[#f1dfab] text-[#76540f]"
                  : "bg-white/75 text-[#8d3843]"
              }`}
            >
              {isCompleted ? "Feito" : "Pendente"}
            </span>
          </div>
          <p className="mt-1 text-sm font-semibold text-[#9b4650]">{day.stage}</p>
          <p className="mt-3 text-sm leading-6 text-[#654846]">{day.howTo}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {day.products.map((product) => (
          <span
            className="rounded-full bg-white/70 px-3 py-1.5 text-xs font-semibold text-[#6f514e]"
            key={product}
          >
            {product}
          </span>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-[1fr_auto] items-center gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#aa6770]">
            {day.statusLabel}
          </p>
          <p className="mt-1 text-xs leading-5 text-[#805b58]">
            {day.time} · {day.observation}
          </p>
        </div>
        <button
          className={`touch-target inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold shadow-sm transition ${
            isCompleted
              ? "bg-[#f1dfab] text-[#6b4b08]"
              : "bg-[#ce5c66] text-white hover:bg-[#b84a57]"
          }`}
          onClick={() => onToggle(day.id)}
          type="button"
        >
          <Icon className="h-4 w-4" name={isCompleted ? "checkMark" : "circle"} />
          {isCompleted ? "Feito" : "Concluir"}
        </button>
      </div>
    </motion.article>
  );
}
