import { motion } from "framer-motion";
import { Icon } from "../utils/iconMap.jsx";

export default function RoutineCard({ day, isCompleted, onToggle, today = false }) {
  return (
    <motion.article
      animate={{ scale: isCompleted ? 0.99 : 1 }}
      className={`glass-panel rounded-lg p-4 transition ${
        isCompleted ? "border-[#8fb867]/80 bg-[#f3f8e8]/75" : ""
      } ${today ? "ring-2 ring-[#78a85a]/50" : ""}`}
      layout
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
            isCompleted ? "bg-[#dcecc8] text-[#3f682d]" : "bg-[#e3f1d8] text-[#3e7745]"
          }`}
        >
          <Icon className="h-6 w-6" name={isCompleted ? "check" : day.icon} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-bold leading-6 text-[#183525]">{day.dayName}</h2>
            {day.dateLabel ? (
              <span className="rounded-full bg-white/72 px-2.5 py-1 text-[11px] font-bold text-[#58705b]">
                {day.dateLabel}
              </span>
            ) : null}
            {today ? (
              <span className="rounded-full bg-[#d8ead2]/70 px-2.5 py-1 text-[11px] font-bold text-[#315f39]">
                Hoje
              </span>
            ) : null}
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                isCompleted
                  ? "bg-[#dcecc8] text-[#3f682d]"
                  : "bg-white/75 text-[#356b3d]"
              }`}
            >
              {isCompleted ? "Feito" : "Pendente"}
            </span>
          </div>
          <p className="mt-1 text-sm font-semibold text-[#4e7c48]">{day.stage}</p>
          <p className="mt-3 text-sm leading-6 text-[#3d5542]">{day.howTo}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {day.products.map((product) => (
          <span
            className="rounded-full bg-white/70 px-3 py-1.5 text-xs font-semibold text-[#425b48]"
            key={product}
          >
            {product}
          </span>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-[1fr_auto] items-center gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#62815f]">
            {day.statusLabel}
          </p>
          <p className="mt-1 text-xs leading-5 text-[#526b55]">
            {day.time} · {day.observation}
          </p>
        </div>
        <button
          className={`touch-target inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold shadow-sm transition ${
            isCompleted
              ? "bg-[#dcecc8] text-[#355c28]"
              : "bg-[#4f8a52] text-white hover:bg-[#3e7745]"
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
