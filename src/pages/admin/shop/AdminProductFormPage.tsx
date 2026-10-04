import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { ArrowLeft, Camera, Save, ShoppingBag } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { addShopProduct, getShopProductById, updateShopProduct } from "../../../services/shopService";
import type { ProductCategory, ShopProduct } from "../../../shared/types/shop";

const categories: ProductCategory[] = ["Jersey", "Training Kit", "Shorts", "Tracksuit", "Footwear", "Accessories", "Other"];
const inputClass = "w-full rounded-lg border border-slate-200 px-3 py-2.5 text-base outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:text-sm";
const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

function AdminProductFormPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const existing = productId ? getShopProductById(productId) : undefined;
  const editing = Boolean(existing);
  const [form, setForm] = useState(() => ({
    name: existing?.name ?? "",
    sku: existing?.sku ?? "",
    category: existing?.category ?? ("Jersey" as ProductCategory),
    description: existing?.description ?? "",
    price: existing ? String(existing.price) : "",
    stockQuantity: existing ? String(existing.stockQuantity) : "",
    sizes: existing?.sizes.join(", ") ?? "S, M, L, XL",
    featured: existing?.featured ?? false,
  }));
  const [image, setImage] = useState(existing?.image ?? "");
  const [error, setError] = useState("");

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose a valid image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImage(reader.result);
        setError("");
      }
    };
    reader.readAsDataURL(file);
  }

  function setField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const price = Number(form.price);
    const stockQuantity = Number(form.stockQuantity);

    if (!form.name.trim() || !form.sku.trim() || !form.description.trim() || !Number.isFinite(price) || price < 0 || !Number.isFinite(stockQuantity) || stockQuantity < 0) {
      setError("Complete the required product fields with valid price and stock values.");
      return;
    }

    const product: ShopProduct = {
      id: existing?.id ?? `product-${Date.now()}`,
      sku: form.sku.trim(),
      name: form.name.trim(),
      category: form.category,
      description: form.description.trim(),
      price,
      sizes: form.sizes.split(",").map((size) => size.trim()).filter(Boolean),
      stockQuantity,
      status: stockQuantity <= 0 ? "Out of Stock" : stockQuantity <= 10 ? "Low Stock" : "In Stock",
      featured: form.featured,
      createdAt: existing?.createdAt ?? new Date().toISOString(),
      image: image || undefined,
    };

    if (existing) updateShopProduct(product);
    else addShopProduct(product);
    navigate("/admin/shop");
  }

  return (
    <div className="w-full min-w-0">
      <Link to="/admin/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-green-600"><ArrowLeft size={17} /> Back to Shop</Link>
      <div className="mt-5"><p className="text-sm font-semibold text-green-600">Shop Inventory</p><h1 className="mt-1 text-2xl font-bold text-slate-950 sm:text-3xl">{editing ? "Edit Product" : "Add Product"}</h1></div>
      {error && <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="text-lg font-bold text-slate-900">Product Information</h2>

          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
              {image ? <img src={image} alt="Product preview" className="h-full w-full object-cover" /> : <ShoppingBag size={34} className="text-slate-300" />}
            </div>
            <div className="w-full sm:w-auto">
              <label htmlFor="productImage" className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 sm:w-auto"><Camera size={17} /> Upload Product Image</label>
              <input id="productImage" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              <p className="mt-2 text-xs text-slate-400">Optional. Stored locally in this prototype.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <div className="md:col-span-2"><label className={labelClass}>Product Name *</label><input value={form.name} onChange={(event) => setField("name", event.target.value)} className={inputClass} required /></div>
            <div><label className={labelClass}>SKU *</label><input value={form.sku} onChange={(event) => setField("sku", event.target.value)} className={inputClass} required /></div>
            <div><label className={labelClass}>Category</label><select value={form.category} onChange={(event) => setField("category", event.target.value as ProductCategory)} className={inputClass}>{categories.map((category) => <option key={category}>{category}</option>)}</select></div>
            <div><label className={labelClass}>Price (₦) *</label><input type="number" min="0" value={form.price} onChange={(event) => setField("price", event.target.value)} className={inputClass} required /></div>
            <div><label className={labelClass}>Stock Quantity *</label><input type="number" min="0" value={form.stockQuantity} onChange={(event) => setField("stockQuantity", event.target.value)} className={inputClass} required /></div>
            <div className="md:col-span-2 xl:col-span-3"><label className={labelClass}>Sizes</label><input value={form.sizes} onChange={(event) => setField("sizes", event.target.value)} className={inputClass} placeholder="S, M, L, XL" /><p className="mt-1 text-xs text-slate-400">Separate sizes with commas.</p></div>
            <div className="md:col-span-2 xl:col-span-3"><label className={labelClass}>Description *</label><textarea rows={4} value={form.description} onChange={(event) => setField("description", event.target.value)} className={inputClass} required /></div>
          </div>
          <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-lg bg-slate-50 p-4"><input type="checkbox" checked={form.featured} onChange={(event) => setField("featured", event.target.checked)} className="mt-1 h-4 w-4 accent-green-600" /><span><span className="block text-sm font-semibold text-slate-800">Featured product</span><span className="mt-1 block text-xs text-slate-500">Highlight this item in the academy storefront.</span></span></label>
        </section>
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><Link to="/admin/shop" className="rounded-lg border border-slate-300 px-5 py-3 text-center text-sm font-semibold text-slate-700">Cancel</Link><button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white"><Save size={17} /> {editing ? "Save Changes" : "Add Product"}</button></div>
      </form>
    </div>
  );
}

export default AdminProductFormPage;
