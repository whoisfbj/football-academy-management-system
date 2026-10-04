import type { ReactNode } from "react";
import {
  Building2,
  CreditCard,
  Package,
  ShoppingBag,
  Smartphone,
  Ticket,
} from "lucide-react";
import type { PaymentMethod, ShopProduct } from "../../shared/types/shop";
import type { TicketEvent } from "../../shared/types/ticket";

export function formatNaira(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

export function ProductVisual({ product, compact = false }: { product: ShopProduct; compact?: boolean }) {
  return (
    <div
      className={`flex w-full items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-green-950 text-white ${
        compact ? "aspect-[4/3] rounded-lg" : "aspect-square"
      }`}
    >
      {product.image ? (
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
      ) : (
        <div className="px-6 text-center">
          <ShoppingBag className="mx-auto text-green-400" size={compact ? 32 : 48} />
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
            {product.category}
          </p>
          <p className="mt-2 font-bold">Elite Academy</p>
        </div>
      )}
    </div>
  );
}

export function TicketVisual({ event }: { event: TicketEvent }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-slate-950 p-5 text-white">
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-green-500/15" />
      <Ticket size={28} className="relative text-green-400" />
      <p className="relative mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-green-400">
        {event.competition}
      </p>
      <p className="relative mt-2 text-xl font-bold">{event.homeTeam}</p>
      <p className="relative my-1 text-sm font-semibold text-slate-400">VS</p>
      <p className="relative text-xl font-bold">{event.awayTeam}</p>
    </div>
  );
}

export function PaymentMethodPicker({
  value,
  onChange,
}: {
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
}) {
  const options: Array<{ value: PaymentMethod; label: string; description: string; icon: ReactNode }> = [
    {
      value: "Card",
      label: "Card Payment",
      description: "Simulate Visa or Mastercard payment.",
      icon: <CreditCard size={20} />,
    },
    {
      value: "Bank Transfer",
      label: "Bank Transfer",
      description: "Simulate an instant bank transfer.",
      icon: <Building2 size={20} />,
    },
    {
      value: "USSD",
      label: "USSD",
      description: "Simulate payment using a bank USSD code.",
      icon: <Smartphone size={20} />,
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={[
            "min-w-0 rounded-xl border p-4 text-left transition",
            value === option.value
              ? "border-green-500 bg-green-50 ring-2 ring-green-100"
              : "border-slate-200 bg-white hover:border-slate-300",
          ].join(" ")}
        >
          <span className={value === option.value ? "text-green-600" : "text-slate-500"}>
            {option.icon}
          </span>
          <p className="mt-3 text-sm font-bold text-slate-900">{option.label}</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">{option.description}</p>
        </button>
      ))}
    </div>
  );
}

export function CommerceEmptyState({
  type,
  title,
  description,
}: {
  type: "shop" | "ticket" | "package";
  title: string;
  description: string;
}) {
  const Icon = type === "ticket" ? Ticket : type === "package" ? Package : ShoppingBag;

  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
      <Icon className="mx-auto text-slate-300" size={38} />
      <h2 className="mt-4 font-bold text-slate-900">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const style =
    status === "Paid" || status === "Confirmed" || status === "Completed" || status === "In Stock" || status === "Sales Open"
      ? "bg-green-50 text-green-700"
      : status === "Low Stock" || status === "Processing" || status === "Upcoming" || status === "Ready for Pickup"
        ? "bg-amber-50 text-amber-700"
        : status === "Out of Stock" || status === "Sold Out" || status === "Cancelled"
          ? "bg-red-50 text-red-700"
          : "bg-blue-50 text-blue-700";

  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${style}`}>{status}</span>;
}
