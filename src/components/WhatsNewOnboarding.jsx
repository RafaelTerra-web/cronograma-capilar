import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Icon } from "../utils/iconMap.jsx";

export const ONBOARDING_VERSION = "2026.06-routine-v2";
export const ONBOARDING_STORAGE_KEY = "juba:onboarding-version";

function shouldShowOnboarding() {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return window.localStorage.getItem(ONBOARDING_STORAGE_KEY) !== ONBOARDING_VERSION;
  } catch {
    return true;
  }
}

function WelcomePreview() {
  return (
    <div className="relative mx-auto flex h-52 w-52 items-center justify-center">
      <div className="absolute inset-4 rounded-full bg-[#eaf5c9] blur-2xl" />
      <img
        alt="Novo ícone da Rotina Capilar"
        className="relative h-40 w-40 rounded-[2.2rem] object-cover shadow-2xl shadow-[#7b9635]/25 ring-4 ring-white"
        src="/icons/icon-512.png"
      />
      <span className="absolute left-0 top-8 text-4xl text-[#4f8a52]">✦</span>
      <span className="absolute bottom-4 right-0 rotate-12 text-4xl text-[#78a332]">♡</span>
    </div>
  );
}

function CalendarPreview() {
  const entries = [
    { day: "Seg", number: "22", tone: "bg-[#dcebdc] text-[#356b4a]", icon: "waves" },
    { day: "Ter", number: "23", tone: "bg-[#dcefc7] text-[#356b3d]", icon: "droplets" },
    { day: "Qua", number: "24", tone: "bg-[#dcebdc] text-[#356b4a]", icon: "waves" },
    { day: "Qui", number: "25", tone: "bg-[#dcefc7] text-[#356b3d]", icon: "droplets" },
    { day: "Sex", number: "26", tone: "bg-[#e9efc8] text-[#66762c]", icon: "bath" }
  ];

  return (
    <div className="relative mx-auto h-72 w-[18rem] max-w-full">
      <div className="absolute inset-x-5 top-2 overflow-hidden rounded-[1.7rem] border border-[#d8e4d2] bg-white p-4 shadow-xl shadow-[#315f39]/10">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-[#4f7d46]">Rotina Capilar</span>
          <Icon className="h-4 w-4 text-[#86a83f]" name="calendar" />
        </div>
        <p className="mt-3 font-serif text-lg font-bold text-[#183525]">Junho 2026</p>
        <div className="mt-3 grid grid-cols-5 gap-1.5">
          {entries.map((entry) => (
            <div className={`rounded-xl px-1 py-2 text-center ${entry.tone}`} key={entry.day}>
              <span className="block text-[8px] font-bold">{entry.day}</span>
              <span className="mt-0.5 block text-xs font-black">{entry.number}</span>
              <Icon className="mx-auto mt-1 h-3.5 w-3.5" name={entry.icon} />
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 rounded-xl bg-[#eef5e7] p-2">
            <span className="h-7 w-7 rounded-full bg-[#dcefc7]" />
            <span className="text-[9px] font-bold text-[#315f39]">Lavagem + finalização</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-[#eef5e7] p-2">
            <span className="h-7 w-7 rounded-full bg-[#dcebdc]" />
            <span className="text-[9px] font-bold text-[#315f39]">Day after</span>
          </div>
        </div>
      </div>

      <svg aria-hidden="true" className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 288 288">
        <path d="M7 78 C 25 62, 35 65, 57 79" fill="none" stroke="#3f7d45" strokeLinecap="round" strokeWidth="3" />
        <path d="M50 71 L 59 79 L 49 84" fill="none" stroke="#3f7d45" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        <path d="M280 112 C 261 98, 251 99, 232 113" fill="none" stroke="#6b922b" strokeLinecap="round" strokeWidth="3" />
        <path d="M240 105 L 230 113 L 241 118" fill="none" stroke="#6b922b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
      </svg>
      <span className="absolute left-0 top-12 rounded-full bg-[#dcefc7] px-3 py-1 text-[10px] font-black text-[#356b3d] shadow-sm">Lavagem</span>
      <span className="absolute right-0 top-24 rounded-full bg-[#dcebdc] px-3 py-1 text-[10px] font-black text-[#356b4a] shadow-sm">Day after</span>
      <span className="absolute bottom-3 right-2 rounded-full bg-[#e9efc8] px-3 py-1 text-[10px] font-black text-[#66762c] shadow-sm">Máscara</span>
    </div>
  );
}

function EditorPreview() {
  return (
    <div className="relative mx-auto h-72 w-[18rem] max-w-full">
      <div className="absolute inset-x-4 top-1 rounded-[1.7rem] border border-[#d8e4d2] bg-white p-3 shadow-xl shadow-[#315f39]/10">
        <div className="flex justify-between gap-1 rounded-2xl bg-[#eef5e7] p-1.5">
          {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day) => (
            <span
              className={`rounded-xl px-1.5 py-2 text-[8px] font-black ${
                day === "Dom" ? "bg-[#eaf5c9] text-[#55751f] ring-1 ring-[#88a947]" : "text-[#58705b]"
              }`}
              key={day}
            >
              {day}
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-2xl bg-[#eef5d3] p-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/70 text-[#6c932e]">
            <Icon className="h-4 w-4" name="sparkles" />
          </span>
          <div>
            <p className="font-serif text-sm font-bold text-[#183525]">Domingo</p>
            <p className="text-[8px] font-semibold text-[#71813f]">Escolha o cuidado deste dia</p>
          </div>
        </div>
        <div className="mt-3 space-y-2">
          {[
            ["droplets", "Lavagem"],
            ["sparkles", "Lavagem com mais creme"],
            ["waves", "Day after"]
          ].map(([icon, label], index) => (
            <div
              className={`flex items-center gap-2 rounded-xl border p-2 ${
                index === 1 ? "border-[#9aaf4f] bg-[#f4f8e6]" : "border-[#d8e4d2]"
              }`}
              key={label}
            >
              <Icon className="h-3.5 w-3.5 text-[#779b35]" name={icon} />
              <span className="text-[9px] font-bold text-[#315f39]">{label}</span>
              {index === 1 ? <Icon className="ml-auto h-3.5 w-3.5 text-[#779b35]" name="checkMark" /> : null}
            </div>
          ))}
        </div>
      </div>
      <svg aria-hidden="true" className="absolute -right-1 top-20 h-24 w-20" viewBox="0 0 80 96">
        <path d="M72 6 C 33 12, 60 50, 22 72" fill="none" stroke="#3f7d45" strokeLinecap="round" strokeWidth="3" />
        <path d="M29 61 L 21 73 L 35 73" fill="none" stroke="#3f7d45" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
      </svg>
      <span className="absolute -right-1 top-12 rotate-3 rounded-full bg-[#dcefc7] px-3 py-1 text-[10px] font-black text-[#356b3d] shadow-sm">Toque e personalize</span>
    </div>
  );
}

const slides = [
  {
    title: "Sua rotina ficou ainda mais sua",
    description: "Um calendário renovado, edição simples e um novo visual.",
    preview: <WelcomePreview />
  },
  {
    title: "Calendário atualizado",
    description: "Veja rapidamente o cuidado de cada dia e marque o que já fez.",
    preview: <CalendarPreview />
  },
  {
    title: "Edite sua semana",
    description: "Troque o tipo de cuidado de cada dia e o app ajusta todo o passo a passo.",
    preview: <EditorPreview />
  }
];

export default function WhatsNewOnboarding() {
  const [open, setOpen] = useState(shouldShowOnboarding);
  const [step, setStep] = useState(0);
  const slide = slides[step];

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const dismiss = () => {
    try {
      window.localStorage.setItem(ONBOARDING_STORAGE_KEY, ONBOARDING_VERSION);
    } catch {
      // The dialog still closes when storage is unavailable.
    }
    setOpen(false);
  };

  const next = () => {
    if (step === slides.length - 1) {
      dismiss();
      return;
    }
    setStep((current) => current + 1);
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          animate={{ opacity: 1 }}
          aria-label="Novidades da Rotina Capilar"
          aria-modal="true"
          className="fixed inset-0 z-[60] mx-auto flex min-h-dvh w-full max-w-[430px] flex-col overflow-hidden bg-[#f8fbed] px-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-[calc(1rem+env(safe-area-inset-top))] shadow-2xl"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          role="dialog"
        >
          <div className="flex justify-end">
            <button
              aria-label="Fechar novidades"
              className="touch-target flex items-center justify-center rounded-full bg-[#edf4e5] text-[#426047]"
              onClick={dismiss}
              type="button"
            >
              <Icon name="x" />
            </button>
          </div>

          <div className="flex min-h-0 flex-1 flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                animate={{ opacity: 1, x: 0 }}
                className="text-center"
                exit={{ opacity: 0, x: -24 }}
                initial={{ opacity: 0, x: 24 }}
                key={step}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                {slide.preview}
                <h2 className="mx-auto mt-3 max-w-[20rem] font-serif text-[2rem] font-bold leading-[1.08] text-[#183525]">
                  {slide.title}
                </h2>
                <p className="mx-auto mt-3 max-w-[19rem] text-sm leading-6 text-[#526b55]">
                  {slide.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-4">
            <button
              className="touch-target w-full rounded-full bg-[#3f7d45] px-5 py-4 text-sm font-black text-white shadow-xl shadow-[#3f7d45]/20 transition active:scale-[0.99]"
              onClick={next}
              type="button"
            >
              {step === 0 ? "Ver novidades" : step === slides.length - 1 ? "Começar" : "Continuar"}
            </button>
            {step === 0 ? (
              <button
                className="touch-target mt-2 w-full text-sm font-bold text-[#356b3d]"
                onClick={dismiss}
                type="button"
              >
                Agora não
              </button>
            ) : (
              <button
                className="touch-target mt-2 w-full text-sm font-bold text-[#526b55]"
                onClick={() => setStep((current) => Math.max(0, current - 1))}
                type="button"
              >
                Voltar
              </button>
            )}
            <div className="mt-2 flex items-center justify-center gap-2" aria-label={`Etapa ${step + 1} de ${slides.length}`}>
              {slides.map((item, index) => (
                <span
                  className={`h-2 rounded-full transition-all ${
                    index === step ? "w-7 bg-[#3f7d45]" : "w-2 bg-[#d4dfcc]"
                  }`}
                  key={item.title}
                />
              ))}
              <span className="ml-3 text-xs font-bold text-[#526b55]">{step + 1} de {slides.length}</span>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
