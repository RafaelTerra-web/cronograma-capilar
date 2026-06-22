import { Icon } from "../utils/iconMap.jsx";

const toneClasses = {
  blue: "bg-[#dcebdc] text-[#356b4a]",
  coral: "bg-[#e4f0d1] text-[#507a35]",
  gold: "bg-[#e9efc8] text-[#66762c]",
  rose: "bg-[#dcefc7] text-[#3f7d45]"
};

export default function ProductCard({ product }) {
  return (
    <article className="glass-panel rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
            toneClasses[product.tone] ?? toneClasses.rose
          }`}
        >
          <Icon className="h-6 w-6" name={product.icon} />
        </div>
        <div>
          <h2 className="text-base font-bold leading-6 text-[#183525]">{product.name}</h2>
          <p className="mt-1 text-sm font-semibold text-[#4e7c48]">{product.role}</p>
        </div>
      </div>

      <dl className="mt-4 space-y-3 text-sm leading-6">
        <div>
          <dt className="font-bold text-[#426047]">Frequência</dt>
          <dd className="text-[#3d5542]">{product.frequency}</dd>
        </div>
        <div>
          <dt className="font-bold text-[#426047]">Como usar</dt>
          <dd className="text-[#3d5542]">{product.howTo}</dd>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-white/58 p-3">
            <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[#62815f]">
              Quantidade
            </dt>
            <dd className="mt-1 text-[#3d5542]">{product.amount}</dd>
          </div>
          <div className="rounded-lg bg-white/58 p-3">
            <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[#62815f]">
              Resultado
            </dt>
            <dd className="mt-1 text-[#3d5542]">{product.result}</dd>
          </div>
        </div>
        <div>
          <dt className="font-bold text-[#426047]">Observação</dt>
          <dd className="text-[#3d5542]">{product.observation}</dd>
        </div>
      </dl>
    </article>
  );
}
