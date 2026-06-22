import { motion } from "framer-motion";
import { Icon } from "../utils/iconMap.jsx";

export default function ProgressCard({ completed, label, percent, total }) {
  return (
    <section className="glass-panel rounded-lg p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-[#356b3d]">{label}</p>
          <p className="mt-1 text-2xl font-bold text-[#183525]">
            {completed}/{total}
          </p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#dcebd4] text-[#356b3d]">
          <Icon className="h-6 w-6" name="check" />
        </div>
      </div>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/70">
        <motion.div
          animate={{ width: `${percent}%` }}
          className="h-full rounded-full bg-gradient-to-r from-[#86b96b] via-[#4f8a52] to-[#9aba4f]"
          initial={false}
          transition={{ duration: 0.45, ease: "easeOut" }}
        />
      </div>
      <p className="mt-2 text-xs font-medium text-[#526b55]">{percent}% concluído</p>
    </section>
  );
}
