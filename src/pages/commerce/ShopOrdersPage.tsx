import { Package, ReceiptText } from "lucide-react";
import { Link, useParams } from "react-router";
import { CommerceEmptyState, StatusBadge, formatNaira } from "../../components/commerce/CommerceUI";
import { getShopOrderById, getShopOrders } from "../../services/shopService";

export function ShopOrdersPage() {
  const orders = getShopOrders();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold text-green-600">Academy Shop</p>
      <h1 className="mt-1 text-2xl font-bold text-slate-950 sm:text-3xl">My Orders</h1>
      <p className="mt-2 text-sm text-slate-500">Orders placed in this browser are shown below.</p>

      {orders.length === 0 ? (
        <div className="mt-7">
          <CommerceEmptyState type="package" title="No shop orders yet" description="Your completed academy shop purchases will appear here." />
        </div>
      ) : (
        <div className="mt-7 space-y-4">
          {orders.map((order) => (
            <Link key={order.id} to={`/orders/${order.id}`} className="grid min-w-0 gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-green-300 sm:grid-cols-[1fr_auto] sm:items-center sm:p-5">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Package size={18} className="text-green-600" />
                  <p className="font-bold text-slate-900">{order.orderNumber}</p>
                  <StatusBadge status={order.status} />
                </div>
                <p className="mt-2 text-sm text-slate-500">{order.items.length} line item{order.items.length === 1 ? "" : "s"} • {new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <p className="text-lg font-bold text-slate-950">{formatNaira(order.total)}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function ShopOrderDetailPage() {
  const { orderId } = useParams();
  const order = orderId ? getShopOrderById(orderId) : undefined;

  if (!order) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Order not found</h1>
        <Link to="/orders" className="mt-6 inline-flex rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white">View My Orders</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-2xl border border-green-200 bg-green-50 p-5 sm:p-7">
        <ReceiptText size={28} className="text-green-700" />
        <p className="mt-4 text-sm font-semibold text-green-700">Payment successful</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-950">Order {order.orderNumber}</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">Your prototype order has been recorded and inventory has been updated.</p>
      </section>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-bold text-slate-900">Items</h2>
          <div className="mt-4 space-y-4">
            {order.items.map((item) => (
              <div key={`${item.productId}-${item.size ?? "default"}`} className="flex justify-between gap-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                <div className="min-w-0">
                  <p className="font-semibold text-slate-800">{item.name}</p>
                  <p className="mt-1 text-xs text-slate-400">Qty {item.quantity}{item.size ? ` • Size ${item.size}` : ""}</p>
                </div>
                <span className="shrink-0 text-sm font-bold text-slate-900">{formatNaira(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3"><h2 className="font-bold text-slate-900">Order Details</h2><StatusBadge status={order.status} /></div>
          <dl className="mt-5 space-y-3 text-sm">
            <Row label="Customer" value={order.buyerName} />
            <Row label="Email" value={order.email} />
            <Row label="Fulfilment" value={order.fulfilment} />
            <Row label="Payment" value={order.paymentMethod} />
            <Row label="Subtotal" value={formatNaira(order.subtotal)} />
            <Row label="Delivery" value={order.deliveryFee ? formatNaira(order.deliveryFee) : "Free"} />
            <Row label="Total" value={formatNaira(order.total)} strong />
          </dl>
        </section>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link to="/shop" className="rounded-lg bg-green-600 px-5 py-3 text-center text-sm font-semibold text-white">Continue Shopping</Link>
        <Link to="/orders" className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-700">All Orders</Link>
      </div>
    </div>
  );
}

function Row({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-slate-500">{label}</dt>
      <dd className={`max-w-[65%] break-words text-right ${strong ? "font-bold text-slate-950" : "font-semibold text-slate-800"}`}>{value}</dd>
    </div>
  );
}
