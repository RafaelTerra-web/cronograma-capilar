import { motion } from "framer-motion";
import { Icon } from "../utils/iconMap.jsx";

export default function ProgressCard({ completed, label, percent, total }) {
  return (
    <section className="glass-panel rounded-lg p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-[#8d3843]">{label}</p>
          <p className="mt-1 text-2xl font-bold text-[#4a2e2d]">
            {completed}/{total}
          </p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#e9f7fb] text-[#2f6574]">
          <Icon className="h-6 w-6" name="check" />
        </div>
      </div>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/70">
        <motion.div
          animate={{ width: `${percent}%` }}
          className="h-full rounded-full bg-gradient-to-r from-[#ce5c66] via-[#d8a74d] to-[#78bdd1]"
          initial={false}
          transition={{ duration: 0.45, ease: "easeOut" }}
        />
      </div>
      <p className="mt-2 text-xs font-medium text-[#805b58]">{percent}% concluído</p>
    </section>
  );
}
