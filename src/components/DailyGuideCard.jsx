import { Icon } from "../utils/iconMap.jsx";

export default function DailyGuideCard({ action, day, guide, isToday }) {
  return (
    <section className="glass-panel overflow-hidden rounded-lg">
      <div className="bg-gradient-to-br from-[#f8fbed] via-[#eef6df] to-[#e4f3e6] p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#dcefc7] text-[#4e7c48]">
              <Icon className="h-6 w-6" name={day.icon} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#4f7d46]">
                {isToday ? "Passo a passo de hoje" : day.dayName}
              </p>
              <h2 className="mt-1 text-xl font-black leading-7 text-[#183525]">
                {guide.title}
              </h2>
              <p className="mt-1 text-sm leading-5 text-[#526b55]">{guide.summary}</p>
            </div>
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/70 px-3 py-1.5 text-xs font-bold text-[#356b3d]">
            {day.dayName}
          </span>
          <span className="rounded-full bg-white/70 px-3 py-1.5 text-xs font-bold text-[#425b48]">
            {guide.time}
          </span>
          <span className="rounded-full bg-white/70 px-3 py-1.5 text-xs font-bold text-[#425b48]">
            {day.products.join(" + ")}
          </span>
        </div>
      </div>

      <ol className="space-y-3 p-4">
        {guide.steps.map((step, index) => (
          <li className="flex gap-3" key={step}>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#4f8a52] text-xs font-black text-white">
              {index + 1}
            </span>
            <p className="pt-0.5 text-sm font-semibold leading-6 text-[#3d5542]">{step}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
