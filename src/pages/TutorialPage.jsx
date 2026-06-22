import { useMemo, useState } from "react";
import DailyGuideCard from "../components/DailyGuideCard.jsx";
import TutorialStep from "../components/TutorialStep.jsx";
import { careGuides } from "../data/routine.js";
import { goldenRules, tutorialSteps } from "../data/tutorial.js";
import { Icon } from "../utils/iconMap.jsx";

export default function TutorialPage({ weekly }) {
  const todayId = weekly.todayEntry.id;
  const [showOtherDays, setShowOtherDays] = useState(false);
  const [selectedDayId, setSelectedDayId] = useState(todayId);

  const selectedDay = useMemo(
    () => weekly.weekEntries.find((day) => day.id === selectedDayId) ?? weekly.todayEntry,
    [selectedDayId, weekly.todayEntry, weekly.weekEntries]
  );
  const selectedGuide = careGuides[selectedDay.careType] ?? careGuides.dayAfter;
  const isTodaySelected = selectedDay.id === todayId;

  const showToday = () => {
    setSelectedDayId(todayId);
    setShowOtherDays(false);
  };

  return (
    <div className="space-y-4">
      <section className="relative overflow-hidden rounded-lg shadow-soft">
        <img
          alt="Acessórios e produtos para finalizar cabelo ondulado"
          className="h-44 w-full object-cover"
          src="/assets/widi-routine-tools.png"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#153b25]/58 via-[#153b25]/8 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <p className="text-sm font-bold drop-shadow">Finalização com carinho</p>
          <p className="mt-1 max-w-[17rem] text-xs font-semibold leading-5 text-white/86">
            Creme no cabelo bem molhado, pouca quantidade e amassar de baixo para cima.
          </p>
        </div>
      </section>

      <DailyGuideCard
        action={
          <button
            className="touch-target rounded-lg bg-[#285b35] px-4 py-3 text-xs font-black text-white transition active:scale-[0.98]"
            onClick={() => setShowOtherDays((value) => !value)}
            type="button"
          >
            {showOtherDays ? "Ocultar" : "Ver dias"}
          </button>
        }
        day={selectedDay}
        guide={selectedGuide}
        isToday={isTodaySelected}
      />

      {showOtherDays ? (
        <section className="glass-panel rounded-lg p-4">
          <div>
            <p className="text-sm font-bold text-[#356b3d]">Outros passo a passo</p>
            <p className="mt-1 text-xs leading-5 text-[#526b55]">
              Escolha outro dia se quiser se preparar antes.
            </p>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {weekly.weekEntries.map((day) => {
              const isSelected = day.id === selectedDay.id;

              return (
                <button
                  className={`touch-target rounded-lg px-2 py-3 text-center text-xs font-black transition ${
                    isSelected
                      ? "bg-[#dcefc7] text-[#356b3d] shadow-sm"
                      : "bg-white/64 text-[#425b48]"
                  }`}
                  key={day.id}
                  onClick={() => setSelectedDayId(day.id)}
                  type="button"
                >
                  <span className="block">{day.shortName}</span>
                  <span className="mt-1 block text-[10px] opacity-75">{day.dateNumber}</span>
                </button>
              );
            })}
            {!isTodaySelected ? (
              <button
                className="touch-target col-span-4 rounded-lg border border-[#4f8a52]/30 bg-white/70 px-4 py-3 text-xs font-black text-[#356b3d]"
                onClick={showToday}
                type="button"
              >
                Voltar para hoje
              </button>
            ) : null}
          </div>
        </section>
      ) : null}

      <section>
        <div className="mb-3 px-1">
          <p className="text-sm font-black text-[#356b3d]">Guia completo de finalização</p>
          <p className="mt-1 text-xs leading-5 text-[#526b55]">
            Use quando for lavar e finalizar com creme.
          </p>
        </div>
      </section>

      {tutorialSteps.map((step) => (
        <TutorialStep key={step.id} step={step} />
      ))}

      <section className="rounded-lg bg-[#285b35] p-4 text-white shadow-soft">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/14">
            <Icon className="h-5 w-5" name="sparkles" />
          </div>
          <h2 className="text-base font-bold">Regra de ouro</h2>
        </div>
        <div className="mt-4 space-y-2">
          {goldenRules.map((rule) => (
            <p className="rounded-lg bg-white/10 px-3 py-2 text-sm leading-6 text-white/88" key={rule}>
              {rule}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
