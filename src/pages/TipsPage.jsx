import PrincessNoteCard from "../components/PrincessNoteCard.jsx";
import TipCard from "../components/TipCard.jsx";
import { adjustmentNotes, princessNotes } from "../data/notes.js";
import { tips } from "../data/tips.js";
import { Icon } from "../utils/iconMap.jsx";

const affectionateNotes = princessNotes.filter(
  (note) =>
    note.includes("segredo é consistência") ||
    note.includes("Você já é linda")
);

export default function TipsPage() {
  return (
    <div className="space-y-4">
      <section className="space-y-3">
        {tips.map((tip, index) => (
          <TipCard index={index} key={tip} text={tip} />
        ))}
      </section>

      <section className="space-y-3">
        {affectionateNotes.map((note, index) => (
          <PrincessNoteCard key={note} note={note} variant={index % 2 === 0 ? "rose" : "blue"} />
        ))}
      </section>

      <section className="glass-panel rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e9efc8] text-[#66762c]">
            <Icon className="h-5 w-5" name="lightbulb" />
          </div>
          <h2 className="text-base font-bold text-[#183525]">Ajustes rápidos</h2>
        </div>
        <div className="mt-4 space-y-3">
          {adjustmentNotes.map((item) => (
            <article className="rounded-lg bg-white/60 p-3" key={item.issue}>
              <h3 className="text-sm font-bold text-[#356b3d]">{item.issue}</h3>
              <p className="mt-1 text-xs leading-5 text-[#526b55]">{item.cause}</p>
              <p className="mt-2 text-sm font-semibold leading-5 text-[#183525]">{item.fix}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
