import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { PaymentMethodPicker, formatNaira } from "../../components/commerce/CommerceUI";
import { createShopOrder, getDetailedCart } from "../../services/shopService";
import { getCurrentUser } from "../../services/authService";
import type { PaymentMethod } from "../../shared/types/shop";

const inputClass = "w-full rounded-lg border border-slate-200 px-3 py-2.5 text-base outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:text-sm";
const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

function ShopCheckoutPage() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const cart = useMemo(() => getDetailedCart(), []);
  const subtotal = cart.reduce((total, entry) => total + entry.product.price * entry.item.quantity, 0);
  const [buyerName, setBuyerName] = useState(currentUser?.name ?? "");
  const [email, setEmail] = useState(currentUser?.email ?? "");
  const [phone, setPhone] = useState("");
  const [fulfilment, setFulfilment] = useState<"Pickup" | "Delivery">("Pickup");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Card");
  const [error, setError] = useState("");
  const deliveryFee = fulfilment === "Delivery" ? 2500 : 0;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!buyerName.trim() || !email.trim() || !phone.trim()) {
      setError("Name, email and phone number are required.");
      return;
    }

    if (fulfilment === "Delivery" && !deliveryAddress.trim()) {
      setError("Please enter a delivery address.");
      return;
    }

    try {
      const order = createShopOrder({
        buyerName,
        email,
        phone,
        fulfilment,
        deliveryAddress,
        paymentMethod,
      });
      navigate(`/orders/${order.id}`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to complete checkout.");
    }
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Your cart is empty</h1>
        <p className="mt-2 text-sm text-slate-500">Add a product before checking out.</p>
        <Link to="/shop" className="mt-6 inline-flex rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white">Browse Shop</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
      <Link to="/cart" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-green-600">
        <ArrowLeft size={17} /> Back to Cart
      </Link>

      <div className="mt-5">
        <p className="text-sm font-semibold text-green-600">Secure Prototype Checkout</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-950 sm:text-3xl">Complete Your Order</h1>
      </div>

      {error && <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      <form onSubmit={handleSubmit} className="mt-7 grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
        <div className="space-y-6">
          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-slate-900">Customer Information</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className={labelClass}>Full Name *</label>
                <input value={buyerName} onChange={(event) => setBuyerName(event.target.value)} className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Email *</label>
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Phone *</label>
                <input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} className={inputClass} required />
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-slate-900">Fulfilment</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {(["Pickup", "Delivery"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFulfilment(option)}
                  className={[
                    "rounded-xl border p-4 text-left transition",
                    fulfilment === option ? "border-green-500 bg-green-50 ring-2 ring-green-100" : "border-slate-200",
                  ].join(" ")}
                >
                  <p className="font-bold text-slate-900">{option}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {option === "Pickup" ? "Collect from the academy office at no extra charge." : `Delivery within the prototype area for ${formatNaira(2500)}.`}
                  </p>
                </button>
              ))}
            </div>
            {fulfilment === "Delivery" && (
              <div className="mt-5">
                <label className={labelClass}>Delivery Address *</label>
                <textarea value={deliveryAddress} onChange={(event) => setDeliveryAddress(event.target.value)} rows={3} className={inputClass} required />
              </div>
            )}
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-slate-900">Payment Method</h2>
            <p className="mt-1 text-sm text-slate-500">Choose how you want to simulate payment.</p>
            <div className="mt-5">
              <PaymentMethodPicker value={paymentMethod} onChange={setPaymentMethod} />
            </div>
          </section>
        </div>

        <aside className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
          <ShieldCheck size={22} className="text-green-600" />
          <h2 className="mt-3 text-lg font-bold text-slate-900">Order Summary</h2>
          <div className="mt-5 space-y-4">
            {cart.map(({ item, product }) => (
              <div key={`${product.id}-${item.size ?? "default"}`} className="flex justify-between gap-4 text-sm">
                <div className="min-w-0">
                  <p className="break-words font-semibold text-slate-700">{product.name}</p>
                  <p className="mt-1 text-xs text-slate-400">Qty {item.quantity}{item.size ? ` • ${item.size}` : ""}</p>
                </div>
                <span className="shrink-0 font-semibold text-slate-900">{formatNaira(product.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm">
            <div className="flex justify-between text-slate-500"><span>Subtotal</span><span>{formatNaira(subtotal)}</span></div>
            <div className="flex justify-between text-slate-500"><span>Delivery</span><span>{deliveryFee ? formatNaira(deliveryFee) : "Free"}</span></div>
            <div className="flex justify-between border-t border-slate-100 pt-3 text-base font-bold text-slate-950"><span>Total</span><span>{formatNaira(subtotal + deliveryFee)}</span></div>
          </div>
          <button type="submit" className="mt-5 w-full rounded-lg bg-green-600 px-4 py-3 text-sm font-bold text-white hover:bg-green-700">
            Pay {formatNaira(subtotal + deliveryFee)}
          </button>
          <p className="mt-3 text-center text-xs leading-5 text-slate-400">Prototype only — no real payment will be charged.</p>
        </aside>
      </form>
    </div>
  );
}

export default ShopCheckoutPage;
