import { motion } from "framer-motion";

export default function TutorialStep({ step }) {
  return (
    <motion.article
      className="glass-panel rounded-lg p-4"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24 }}
      viewport={{ once: true, margin: "-80px" }}
    >
      <div className="flex gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#ce5c66] text-lg font-black text-white shadow-glow">
          {step.id}
        </div>
        <div>
          <h2 className="text-base font-bold leading-6 text-[#4a2e2d]">{step.title}</h2>
          <p className="mt-2 text-sm leading-6 text-[#654846]">{step.description}</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-lg bg-white/60 p-3">
          <p className="font-bold uppercase tracking-[0.12em] text-[#aa6770]">Produto</p>
          <p className="mt-1 leading-5 text-[#654846]">{step.product}</p>
        </div>
        <div className="rounded-lg bg-white/60 p-3">
          <p className="font-bold uppercase tracking-[0.12em] text-[#aa6770]">Tempo</p>
          <p className="mt-1 leading-5 text-[#654846]">{step.time}</p>
        </div>
      </div>
      <p className="mt-3 rounded-lg bg-[#fff7ef]/75 px-3 py-2 text-xs leading-5 text-[#805b58]">
        Evitar: {step.avoid}
      </p>
    </motion.article>
  );
}
