import { useMemo, useState } from "react";
import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { CommerceEmptyState, ProductVisual, formatNaira } from "../../components/commerce/CommerceUI";
import { getDetailedCart, removeCartItem, updateCartItem } from "../../services/shopService";

function CartPage() {
  const [version, setVersion] = useState(0);
  const cart = useMemo(() => getDetailedCart(), [version]);
  const subtotal = cart.reduce(
    (total, entry) => total + entry.product.price * entry.item.quantity,
    0,
  );

  function refresh() {
    setVersion((current) => current + 1);
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
      <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-green-600">
        <ArrowLeft size={17} /> Continue Shopping
      </Link>

      <div className="mt-5">
        <p className="text-sm font-semibold text-green-600">Academy Shop</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-950 sm:text-3xl">Shopping Cart</h1>
      </div>

      {cart.length === 0 ? (
        <div className="mt-7">
          <CommerceEmptyState
            type="shop"
            title="Your cart is empty"
            description="Browse the academy shop and add jerseys, training wear or merchandise to continue."
          />
        </div>
      ) : (
        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
          <section className="space-y-4">
            {cart.map(({ item, product }) => (
              <article key={`${product.id}-${item.size ?? "default"}`} className="grid min-w-0 gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[120px_1fr]">
                <ProductVisual product={product} compact />
                <div className="min-w-0">
                  <div className="flex min-w-0 items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link to={`/shop/${product.id}`} className="break-words font-bold text-slate-900 hover:text-green-600">{product.name}</Link>
                      <p className="mt-1 text-xs text-slate-500">{item.size ? `Size: ${item.size}` : product.category}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        removeCartItem(product.id, item.size);
                        refresh();
                      }}
                      className="shrink-0 rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                      aria-label={`Remove ${product.name}`}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="inline-flex items-center rounded-lg border border-slate-200">
                      <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center text-slate-500 hover:bg-slate-50"
                        onClick={() => {
                          updateCartItem(product.id, item.size, item.quantity - 1);
                          refresh();
                        }}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={15} />
                      </button>
                      <span className="min-w-9 text-center text-sm font-bold">{item.quantity}</span>
                      <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center text-slate-500 hover:bg-slate-50 disabled:text-slate-300"
                        disabled={item.quantity >= product.stockQuantity}
                        onClick={() => {
                          updateCartItem(product.id, item.size, item.quantity + 1);
                          refresh();
                        }}
                        aria-label="Increase quantity"
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                    <p className="font-bold text-slate-950">{formatNaira(product.price * item.quantity)}</p>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <aside className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
            <ShoppingCart className="text-green-600" size={22} />
            <h2 className="mt-3 text-lg font-bold text-slate-900">Order Summary</h2>
            <div className="mt-5 space-y-3 border-b border-slate-100 pb-5 text-sm">
              <div className="flex justify-between gap-4 text-slate-500">
                <span>Items</span><span>{cart.reduce((total, entry) => total + entry.item.quantity, 0)}</span>
              </div>
              <div className="flex justify-between gap-4 font-semibold text-slate-900">
                <span>Subtotal</span><span>{formatNaira(subtotal)}</span>
              </div>
            </div>
            <p className="mt-4 text-xs leading-5 text-slate-500">Delivery fees, if applicable, are calculated during checkout.</p>
            <Link to="/checkout" className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-green-600 px-4 py-3 text-sm font-bold text-white hover:bg-green-700">
              Proceed to Checkout
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}

export default CartPage;
