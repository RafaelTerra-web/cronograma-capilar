import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { careTypeOptions } from "../data/routine.js";
import { Icon } from "../utils/iconMap.jsx";

export default function RoutineEditor({ days, initialDayId, onClose, onSave, open }) {
  const [selectedDayId, setSelectedDayId] = useState(initialDayId);
  const [selectedCareType, setSelectedCareType] = useState("");

  const selectedDay = useMemo(
    () => days.find((day) => day.id === selectedDayId) ?? days[0],
    [days, selectedDayId]
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    setSelectedDayId(initialDayId);
  }, [initialDayId, open]);

  useEffect(() => {
    setSelectedCareType(selectedDay.careType);
  }, [selectedDay.careType]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  const preview = careTypeOptions.find((item) => item.id === selectedCareType) ?? careTypeOptions[0];

  const save = () => {
    onSave(selectedDay.id, selectedCareType);
  };

  const editor = (
    <AnimatePresence>
      {open ? (
        <motion.div
          animate={{ opacity: 1 }}
          aria-label="Editar rotina"
          aria-modal="true"
          className="fixed inset-0 z-[70] mx-auto flex w-full max-w-[430px] flex-col overflow-hidden bg-[#fffaf4] shadow-2xl"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          role="dialog"
        >
          <header className="safe-top flex items-center justify-between border-b border-[#eadbd1] bg-white/80 px-4 pb-3 backdrop-blur-xl">
            <button
              aria-label="Voltar"
              className="touch-target flex items-center justify-center rounded-full bg-[#f8efe8] text-[#704b45]"
              onClick={onClose}
              type="button"
            >
              <Icon name="arrowLeft" />
            </button>
            <h2 className="font-serif text-2xl font-bold text-[#36231f]">Editar rotina</h2>
            <button
              aria-label="Fechar editor"
              className="touch-target flex items-center justify-center rounded-full bg-[#f8efe8] text-[#704b45]"
              onClick={onClose}
              type="button"
            >
              <Icon name="x" />
            </button>
          </header>

          <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-4 pb-6 pt-4">
            <div className="grid grid-cols-7 gap-1 rounded-[1.4rem] bg-white p-2 shadow-sm ring-1 ring-[#eadbd1]">
              {days.map((day) => {
                const selected = day.id === selectedDay.id;
                return (
                  <button
                    aria-pressed={selected}
                    className={`touch-target rounded-2xl px-1 py-2 text-center transition ${
                      selected
                        ? "bg-[#e9f4c9] text-[#405b18] ring-1 ring-[#83a93b]"
                        : "text-[#755d55]"
                    }`}
                    key={day.id}
                    onClick={() => setSelectedDayId(day.id)}
                    type="button"
                  >
                    <span className="block text-[10px] font-bold">{day.shortName}</span>
                    <span className="mt-1 block text-sm font-black">{day.dayName.slice(0, 1)}</span>
                  </button>
                );
              })}
            </div>

            <section className="mt-4 flex items-center gap-3 rounded-[1.5rem] bg-gradient-to-r from-[#eaf5ca] to-[#f6f5da] p-4 shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/70 text-[#638d25]">
                <Icon className="h-6 w-6" name={preview.icon} />
              </span>
              <div>
                <p className="font-serif text-xl font-bold text-[#39251f]">{selectedDay.dayName}</p>
                <p className="mt-0.5 text-xs font-semibold text-[#71813f]">Escolha o cuidado deste dia</p>
              </div>
            </section>

            <fieldset className="mt-5 space-y-3">
              <legend className="mb-3 text-sm font-black text-[#513631]">Tipo de cuidado</legend>
              {careTypeOptions.map((careType) => {
                const checked = selectedCareType === careType.id;
                return (
                  <label
                    className={`flex cursor-pointer items-start gap-3 rounded-[1.35rem] border p-4 transition ${
                      checked
                        ? "border-[#9aaf4f] bg-[#f4f8e6] shadow-sm"
                        : "border-[#eadbd1] bg-white"
                    }`}
                    key={careType.id}
                  >
                    <input
                      checked={checked}
                      className="mt-1 h-4 w-4 accent-[#7d9b37]"
                      name="care-type"
                      onChange={() => setSelectedCareType(careType.id)}
                      type="radio"
                      value={careType.id}
                    />
                    <span className="flex min-w-0 flex-1 gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#edf5d8] text-[#648d26]">
                        <Icon className="h-5 w-5" name={careType.icon} />
                      </span>
                      <span>
                        <span className="block text-sm font-black text-[#4b312c]">{careType.label}</span>
                        <span className="mt-1 block text-xs leading-5 text-[#7c625a]">{careType.howTo}</span>
                      </span>
                    </span>
                  </label>
                );
              })}
            </fieldset>

            <section className="mt-5 rounded-[1.5rem] border border-[#eadbd1] bg-white p-4">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[#a13552]">Prévia do cuidado</p>
              <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-2xl bg-[#fbf3ed] p-3">
                  <p className="font-bold text-[#8d3843]">Produtos</p>
                  <p className="mt-1 leading-5 text-[#6f514e]">{preview.products.join(", ")}</p>
                </div>
                <div className="rounded-2xl bg-[#f1f7df] p-3">
                  <p className="font-bold text-[#587622]">Tempo</p>
                  <p className="mt-1 leading-5 text-[#657248]">{preview.time}</p>
                </div>
              </div>
              <p className="mt-3 rounded-2xl bg-[#f2f7fb] p-3 text-xs leading-5 text-[#536b76]">
                {preview.observation}
              </p>
            </section>
          </div>

          <footer className="safe-bottom shrink-0 border-t border-[#eadbd1] bg-white/92 px-4 pt-3 backdrop-blur-xl">
            <div className="grid grid-cols-[0.8fr_1.2fr] gap-3">
              <button
                className="touch-target rounded-full border border-[#a5234b] bg-white px-4 py-3 text-sm font-black text-[#8d2345]"
                onClick={onClose}
                type="button"
              >
                Cancelar
              </button>
              <button
                className="touch-target rounded-full bg-[#a71948] px-4 py-3 text-sm font-black text-white shadow-lg shadow-[#a71948]/20"
                onClick={save}
                type="button"
              >
                Salvar alterações
              </button>
            </div>
          </footer>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  return typeof document === "undefined" ? null : createPortal(editor, document.body);
}
