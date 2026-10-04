import { useMemo, useState } from "react";
import { Search, ShoppingBag, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router";
import { ProductVisual, StatusBadge, formatNaira } from "../../components/commerce/CommerceUI";
import { getShopProducts } from "../../services/shopService";
import type { ProductCategory } from "../../shared/types/shop";

const categories: Array<"All" | ProductCategory> = [
  "All",
  "Jersey",
  "Training Kit",
  "Shorts",
  "Tracksuit",
  "Footwear",
  "Accessories",
  "Other",
];

function ShopPage() {
  const [products] = useState(() => getShopProducts());
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");

  const filteredProducts = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesSearch =
        !search ||
        product.name.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search) ||
        product.sku.toLowerCase().includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [products, searchTerm, category]);

  return (
    <div>
      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-end lg:px-8 lg:py-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1.5 text-sm font-semibold text-green-400">
              <ShoppingBag size={16} /> Official Academy Store
            </div>
            <h1 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Wear the academy. Support the journey.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Shop official jerseys, training wear and academy merchandise for players, families and supporters.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-4">
            <p className="text-sm text-slate-400">Available products</p>
            <p className="mt-1 text-3xl font-bold">{products.length}</p>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_auto] md:items-center">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search jerseys, training kits, accessories..."
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-base outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:text-sm"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:max-w-xl">
            <SlidersHorizontal size={17} className="shrink-0 text-slate-400" />
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={[
                  "whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition",
                  category === item
                    ? "bg-green-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200",
                ].join(" ")}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/shop/${product.id}`}
              className="group min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-green-300 hover:shadow-md"
            >
              <ProductVisual product={product} />
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-green-600">{product.category}</p>
                    <h2 className="mt-1 break-words font-bold text-slate-900 group-hover:text-green-700">{product.name}</h2>
                  </div>
                  <StatusBadge status={product.status} />
                </div>
                <p className="mt-4 text-lg font-bold text-slate-950">{formatNaira(product.price)}</p>
                <p className="mt-1 text-xs text-slate-400">SKU {product.sku}</p>
              </div>
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="mt-7 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
            No products match your current search or category.
          </div>
        )}
      </div>
    </div>
  );
}

export default ShopPage;
