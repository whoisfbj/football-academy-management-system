import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  Boxes,
  Eye,
  Package,
  Pencil,
  Plus,
  Search,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { Link } from "react-router";
import { StatusBadge, formatNaira } from "../../../components/commerce/CommerceUI";
import {
  deleteShopProduct,
  getShopOrders,
  getShopProducts,
  updateShopOrderStatus,
} from "../../../services/shopService";
import type { ShopOrderStatus } from "../../../shared/types/shop";

function AdminShopPage() {
  const [version, setVersion] = useState(0);
  const [tab, setTab] = useState<"products" | "orders">("products");
  const [searchTerm, setSearchTerm] = useState("");
  const products = useMemo(() => getShopProducts(), [version]);
  const orders = useMemo(() => getShopOrders(), [version]);
  const search = searchTerm.trim().toLowerCase();

  const filteredProducts = products.filter(
    (product) =>
      !search ||
      product.name.toLowerCase().includes(search) ||
      product.sku.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search),
  );

  const filteredOrders = orders.filter(
    (order) =>
      !search ||
      order.orderNumber.toLowerCase().includes(search) ||
      order.buyerName.toLowerCase().includes(search) ||
      order.email.toLowerCase().includes(search),
  );

  const stockUnits = products.reduce((total, product) => total + product.stockQuantity, 0);
  const revenue = orders.reduce((total, order) => total + order.total, 0);

  function refresh() {
    setVersion((current) => current + 1);
  }

  return (
    <div className="w-full min-w-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-green-600">Commercial Operations</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-950 sm:text-3xl">Academy Shop</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Manage merchandise, stock levels and customer shop orders.
          </p>
        </div>
        <Link to="/admin/shop/products/new" className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white hover:bg-green-700 sm:w-auto">
          <Plus size={17} /> Add Product
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Products" value={String(products.length)} icon={<ShoppingBag size={20} />} />
        <Stat title="Stock Units" value={String(stockUnits)} icon={<Boxes size={20} />} />
        <Stat title="Orders" value={String(orders.length)} icon={<Package size={20} />} />
        <Stat title="Shop Revenue" value={formatNaira(revenue)} icon={<ShoppingBag size={20} />} />
      </div>

      <section className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex rounded-lg bg-slate-100 p-1">
            <TabButton active={tab === "products"} onClick={() => setTab("products")} label="Products" />
            <TabButton active={tab === "orders"} onClick={() => setTab("orders")} label="Orders" />
          </div>
          <div className="relative w-full sm:max-w-sm">
            <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder={tab === "products" ? "Search products..." : "Search orders..."}
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-base outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:text-sm"
            />
          </div>
        </div>

        {tab === "products" ? (
          <div>
            <div className="space-y-3 p-3 md:hidden">
              {filteredProducts.map((product) => (
                <article key={product.id} className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="break-words font-bold text-slate-900">{product.name}</p>
                      <p className="mt-1 text-xs text-slate-400">{product.sku} • {product.category}</p>
                    </div>
                    <StatusBadge status={product.status} />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <Mini label="Price" value={formatNaira(product.price)} />
                    <Mini label="Stock" value={`${product.stockQuantity} units`} />
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Link to={`/admin/shop/products/${product.id}/edit`} className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700"><Pencil size={15} /> Edit</Link>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Delete ${product.name}?`)) {
                          deleteShopProduct(product.id);
                          refresh();
                        }
                      }}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-red-200 text-red-600"
                      aria-label={`Delete ${product.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[850px]">
                <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                  <tr><th className="px-5 py-4">Product</th><th className="px-5 py-4">Category</th><th className="px-5 py-4">Price</th><th className="px-5 py-4">Stock</th><th className="px-5 py-4">Status</th><th className="px-5 py-4">Actions</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-50">
                      <td className="px-5 py-4"><p className="font-semibold text-slate-800">{product.name}</p><p className="mt-1 text-xs text-slate-400">{product.sku}</p></td>
                      <td className="px-5 py-4 text-sm text-slate-600">{product.category}</td>
                      <td className="px-5 py-4 text-sm font-semibold text-slate-800">{formatNaira(product.price)}</td>
                      <td className="px-5 py-4 text-sm text-slate-600">{product.stockQuantity}</td>
                      <td className="px-5 py-4"><StatusBadge status={product.status} /></td>
                      <td className="px-5 py-4"><div className="flex gap-2"><Link to={`/admin/shop/products/${product.id}/edit`} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><Pencil size={16} /></Link><button type="button" onClick={() => { if (window.confirm(`Delete ${product.name}?`)) { deleteShopProduct(product.id); refresh(); } }} className="rounded-lg p-2 text-red-500 hover:bg-red-50"><Trash2 size={16} /></button></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div>
            <div className="space-y-3 p-3 md:hidden">
              {filteredOrders.map((order) => (
                <OrderCard key={order.id} order={order} onChange={(status) => { updateShopOrderStatus(order.id, status); refresh(); }} />
              ))}
            </div>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[900px]">
                <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-4">Order</th><th className="px-5 py-4">Customer</th><th className="px-5 py-4">Total</th><th className="px-5 py-4">Fulfilment</th><th className="px-5 py-4">Status</th><th className="px-5 py-4">View</th></tr></thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-5 py-4"><p className="font-semibold text-slate-800">{order.orderNumber}</p><p className="mt-1 text-xs text-slate-400">{new Date(order.createdAt).toLocaleDateString()}</p></td>
                      <td className="px-5 py-4"><p className="text-sm font-semibold text-slate-700">{order.buyerName}</p><p className="text-xs text-slate-400">{order.email}</p></td>
                      <td className="px-5 py-4 text-sm font-semibold text-slate-800">{formatNaira(order.total)}</td>
                      <td className="px-5 py-4 text-sm text-slate-600">{order.fulfilment}</td>
                      <td className="px-5 py-4"><select value={order.status} onChange={(event) => { updateShopOrderStatus(order.id, event.target.value as ShopOrderStatus); refresh(); }} className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm"><OrderStatusOptions /></select></td>
                      <td className="px-5 py-4"><Link to={`/orders/${order.id}`} className="inline-flex items-center gap-1 text-sm font-semibold text-green-600"><Eye size={15} /> View</Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function OrderCard({ order, onChange }: { order: ReturnType<typeof getShopOrders>[number]; onChange: (status: ShopOrderStatus) => void }) {
  return (
    <article className="rounded-xl border border-slate-200 p-4">
      <div className="flex items-start justify-between gap-3"><div><p className="font-bold text-slate-900">{order.orderNumber}</p><p className="mt-1 text-xs text-slate-400">{order.buyerName}</p></div><StatusBadge status={order.status} /></div>
      <p className="mt-4 text-lg font-bold text-slate-950">{formatNaira(order.total)}</p>
      <select value={order.status} onChange={(event) => onChange(event.target.value as ShopOrderStatus)} className="mt-4 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"><OrderStatusOptions /></select>
      <Link to={`/orders/${order.id}`} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700"><Eye size={15} /> View Order</Link>
    </article>
  );
}

function OrderStatusOptions() {
  return <>{(["Processing", "Ready for Pickup", "Shipped", "Completed", "Cancelled"] as ShopOrderStatus[]).map((status) => <option key={status} value={status}>{status}</option>)}</>;
}

function Stat({ title, value, icon }: { title: string; value: string; icon: ReactNode }) {
  return <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">{icon}</div><p className="mt-4 text-sm text-slate-500">{title}</p><p className="mt-1 break-words text-2xl font-bold text-slate-900">{value}</p></div>;
}

function Mini({ label, value }: { label: string; value: string }) {
  return <div className="rounded-lg bg-slate-50 p-3"><p className="text-xs text-slate-400">{label}</p><p className="mt-1 font-semibold text-slate-800">{value}</p></div>;
}

function TabButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return <button type="button" onClick={onClick} className={`rounded-md px-4 py-2 text-sm font-semibold ${active ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>{label}</button>;
}

export default AdminShopPage;
