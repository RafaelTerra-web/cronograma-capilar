import { Icon } from "../utils/iconMap.jsx";

const toneClasses = {
  blue: "bg-[#e5f6fb] text-[#2e6877]",
  coral: "bg-[#ffe1dc] text-[#a54037]",
  gold: "bg-[#fff0bf] text-[#806118]",
  rose: "bg-[#fbe0e6] text-[#a73e55]"
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
          <h2 className="text-base font-bold leading-6 text-[#4a2e2d]">{product.name}</h2>
          <p className="mt-1 text-sm font-semibold text-[#9b4650]">{product.role}</p>
        </div>
      </div>

      <dl className="mt-4 space-y-3 text-sm leading-6">
        <div>
          <dt className="font-bold text-[#80504f]">Frequência</dt>
          <dd className="text-[#654846]">{product.frequency}</dd>
        </div>
        <div>
          <dt className="font-bold text-[#80504f]">Como usar</dt>
          <dd className="text-[#654846]">{product.howTo}</dd>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-white/58 p-3">
            <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[#aa6770]">
              Quantidade
            </dt>
            <dd className="mt-1 text-[#654846]">{product.amount}</dd>
          </div>
          <div className="rounded-lg bg-white/58 p-3">
            <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[#aa6770]">
              Resultado
            </dt>
            <dd className="mt-1 text-[#654846]">{product.result}</dd>
          </div>
        </div>
        <div>
          <dt className="font-bold text-[#80504f]">Observação</dt>
          <dd className="text-[#654846]">{product.observation}</dd>
        </div>
      </dl>
    </article>
  );
}
