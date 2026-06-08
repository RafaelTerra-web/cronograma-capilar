import ProductCard from "../components/ProductCard.jsx";
import { products } from "../data/products.js";

export default function ProductsPage() {
  return (
    <div className="space-y-4">
      <section className="relative overflow-hidden rounded-lg shadow-soft">
        <img
          alt="Produtos inspirados no kit Widi Care Ondulando a Juba"
          className="h-44 w-full object-cover"
          src="/assets/widi-kit-products.png"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3c2522]/55 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <p className="text-sm font-bold drop-shadow">Kit Widi Care</p>
          <p className="mt-1 max-w-[18rem] text-xs font-semibold leading-5 text-white/86">
            Shampoo, máscara, condicionador e creme organizados para a rotina da princesa.
          </p>
        </div>
      </section>

      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
