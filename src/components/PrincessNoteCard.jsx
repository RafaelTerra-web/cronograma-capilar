import { motion } from "framer-motion";
import { Icon } from "../utils/iconMap.jsx";

export default function PrincessNoteCard({ note, variant = "rose" }) {
  const colors =
    variant === "blue"
      ? "from-[#dcebdc] to-[#f5faec] text-[#356b4a]"
      : "from-[#dcefc7] to-[#f4f9ec] text-[#4e7c48]";

  return (
    <motion.article
      className={`rounded-lg bg-gradient-to-br ${colors} p-4 shadow-soft`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24 }}
      viewport={{ once: true, margin: "-70px" }}
    >
      <Icon className="h-5 w-5" name="heart" />
      <p className="mt-3 text-base font-bold leading-7 text-[#183525]">{note}</p>
    </motion.article>
  );
}
