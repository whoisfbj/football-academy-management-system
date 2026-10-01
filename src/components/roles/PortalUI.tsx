import type {
  ReactNode,
} from "react";

import {
  ArrowRight,
  Inbox,
} from "lucide-react";

import {
  Link,
} from "react-router";

export function PortalPageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
      <div>
        <p className="text-sm font-semibold text-green-600">
          {eyebrow}
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-950 lg:text-3xl">
          {title}
        </h1>

        {description && (
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            {description}
          </p>
        )}
      </div>

      {action && (
        <div className="shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}

/* =====================================================
   CLICKABLE SUMMARY CARD
===================================================== */

export function PortalStatCard({
  label,
  value,
  icon,
  to,
  description,
  actionText = "View details",
}: {
  label: string;
  value: string | number;
  icon: ReactNode;
  to?: string;
  description?: string;
  actionText?: string;
}) {
  const content = (
    <div
      className={`h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition ${
        to
          ? "cursor-pointer hover:-translate-y-0.5 hover:border-green-300 hover:shadow-md"
          : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
          {icon}
        </div>

        {to && (
          <ArrowRight
            size={18}
            className="text-slate-300 transition group-hover:text-green-600"
          />
        )}
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 break-words text-2xl font-bold text-slate-950">
        {value}
      </p>

      {description && (
        <p className="mt-2 text-xs leading-5 text-slate-400">
          {description}
        </p>
      )}

      {to && (
        <p className="mt-4 text-xs font-semibold text-green-600">
          {actionText} →
        </p>
      )}
    </div>
  );

  if (!to) {
    return content;
  }

  return (
    <Link
      to={to}
      className="group block h-full"
    >
      {content}
    </Link>
  );
}

/* =====================================================
   EMPTY STATE
===================================================== */

export function PortalEmptyState({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="p-12 text-center">
      <Inbox
        size={34}
        className="mx-auto text-slate-300"
      />

      <h3 className="mt-4 font-bold text-slate-800">
        {title}
      </h3>

      {description && (
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
          {description}
        </p>
      )}
    </div>
  );
}

/* =====================================================
   STATUS BADGE
===================================================== */

export function StatusBadge({
  status,
}: {
  status: string;
}) {
  const value =
    status.toLowerCase();

  const style =
    value.includes("active") ||
    value.includes("present") ||
    value.includes("completed") ||
    value.includes("paid")
      ? "bg-green-50 text-green-700"
      : value.includes("pending") ||
          value.includes("scheduled") ||
          value.includes("upcoming")
        ? "bg-blue-50 text-blue-700"
        : value.includes("injured") ||
            value.includes("suspended") ||
            value.includes("cancelled") ||
            value.includes("absent")
          ? "bg-red-50 text-red-700"
          : "bg-slate-100 text-slate-700";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${style}`}
    >
      {status}
    </span>
  );
}

/* =====================================================
   BUTTONS
===================================================== */

export function PortalButton({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  variant?:
    | "primary"
    | "secondary"
    | "danger";
}) {
  const styles =
    variant === "danger"
      ? "bg-red-600 text-white hover:bg-red-700"
      : variant === "secondary"
        ? "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
        : "bg-green-600 text-white hover:bg-green-700";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${styles}`}
    >
      {children}
    </button>
  );
}

/* =====================================================
   FORMATTERS
===================================================== */

export function formatPortalDate(
  date?: string,
) {
  if (!date) {
    return "—";
  }

  return new Date(
    `${date.slice(0, 10)}T00:00:00`,
  ).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  );
}

export function formatPortalCurrency(
  amount: number,
) {
  return new Intl.NumberFormat(
    "en-NG",
    {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    },
  ).format(amount);
}