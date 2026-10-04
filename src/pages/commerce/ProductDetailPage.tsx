import { useState } from "react";
import { ArrowLeft, Check, Minus, Plus, ShoppingCart } from "lucide-react";
import { Link, useParams } from "react-router";
import { ProductVisual, StatusBadge, formatNaira } from "../../components/commerce/CommerceUI";
import { addToCart, getShopProductById } from "../../services/shopService";

function ProductDetailPage() {
  const { productId } = useParams();
  const product = productId ? getShopProductById(productId) : undefined;
  const [size, setSize] = useState(() => product?.sizes[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return <NotFound />;
  }

  const maxQuantity = Math.max(1, Math.min(product.stockQuantity, 10));

  function handleAddToCart() {
    if (!product || product.stockQuantity <= 0) {
      return;
    }

    addToCart(product.id, quantity, size || undefined);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-green-600">
        <ArrowLeft size={17} /> Back to Shop
      </Link>

      <div className="mt-6 grid min-w-0 gap-8 lg:grid-cols-2 lg:items-start">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <ProductVisual product={product} />
        </div>

        <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{product.category}</span>
            <StatusBadge status={product.status} />
          </div>

          <h1 className="mt-4 break-words text-3xl font-bold tracking-tight text-slate-950">{product.name}</h1>
          <p className="mt-3 text-2xl font-bold text-green-700">{formatNaira(product.price)}</p>
          <p className="mt-5 text-sm leading-7 text-slate-600">{product.description}</p>

          {product.sizes.length > 0 && (
            <div className="mt-7">
              <p className="text-sm font-semibold text-slate-800">Select size</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSize(item)}
                    className={[
                      "min-w-12 rounded-lg border px-3 py-2 text-sm font-semibold transition",
                      size === item
                        ? "border-green-600 bg-green-50 text-green-700"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300",
                    ].join(" ")}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-7">
            <p className="text-sm font-semibold text-slate-800">Quantity</p>
            <div className="mt-3 inline-flex items-center rounded-lg border border-slate-200 bg-white">
              <button
                type="button"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                className="flex h-10 w-10 items-center justify-center text-slate-500 hover:bg-slate-50"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span className="min-w-10 text-center text-sm font-bold">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((current) => Math.min(maxQuantity, current + 1))}
                className="flex h-10 w-10 items-center justify-center text-slate-500 hover:bg-slate-50"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>
            <p className="mt-2 text-xs text-slate-400">{product.stockQuantity} currently in stock</p>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={product.stockQuantity <= 0}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {added ? <Check size={18} /> : <ShoppingCart size={18} />}
            {added ? "Added to Cart" : product.stockQuantity <= 0 ? "Out of Stock" : "Add to Cart"}
          </button>

          <div className="mt-5 rounded-lg bg-slate-50 p-4 text-xs leading-5 text-slate-500">
            This prototype uses simulated checkout. No real payment details are collected.
          </div>
        </section>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-slate-900">Product not found</h1>
      <p className="mt-2 text-sm text-slate-500">The requested store product is unavailable.</p>
      <Link to="/shop" className="mt-6 inline-flex rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white">Return to Shop</Link>
    </div>
  );
}

export default ProductDetailPage;
