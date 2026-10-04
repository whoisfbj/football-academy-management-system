import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import {
  Link,
} from "react-router";

/* =========================================================
   PAGE HEADER
========================================================= */

type PortalPageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function PortalPageHeader({
  eyebrow,
  title,
  description,
  action,
}: PortalPageHeaderProps) {
  return (
    <div
      className="
        flex
        min-w-0
        flex-col
        gap-4
        sm:flex-row
        sm:items-start
        sm:justify-between
      "
    >
      {/* LEFT SIDE */}

      <div className="min-w-0 flex-1">
        <p
          className="
            text-xs
            font-semibold
            uppercase
            tracking-wide
            text-green-600
            sm:text-sm
          "
        >
          {eyebrow}
        </p>

        <h1
          className="
            mt-1
            break-words
            text-2xl
            font-bold
            leading-tight
            text-slate-950
            sm:text-3xl
          "
        >
          {title}
        </h1>

        {description && (
          <p
            className="
              mt-2
              max-w-3xl
              text-sm
              leading-6
              text-slate-500
              sm:text-base
            "
          >
            {description}
          </p>
        )}
      </div>

      {/* RIGHT SIDE / ACTION */}

      {action && (
        <div
          className="
            w-full
            shrink-0
            sm:w-auto
          "
        >
          {action}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

type PortalStatCardProps = {
  label: string;
  value: string | number;
  icon?: ReactNode;
  description?: string;
  to?: string;
  actionText?: string;
};

export function PortalStatCard({
  label,
  value,
  icon,
  description,
  to,
  actionText,
}: PortalStatCardProps) {
  const card = (
    <div
      className={`
        h-full
        min-w-0
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm
        transition
        sm:p-5

        ${
          to
            ? `
              cursor-pointer
              hover:-translate-y-0.5
              hover:border-green-300
              hover:shadow-md
            `
            : ""
        }
      `}
    >
      <div
        className="
          flex
          min-w-0
          items-start
          justify-between
          gap-3
        "
      >
        {/* CONTENT */}

        <div className="min-w-0 flex-1">
          <p
            className="
              truncate
              text-sm
              font-medium
              text-slate-500
            "
          >
            {label}
          </p>

          <p
            className="
              mt-2
              break-words
              text-xl
              font-bold
              leading-tight
              text-slate-950
              sm:text-2xl
            "
          >
            {value}
          </p>

          {description && (
            <p
              className="
                mt-2
                break-words
                text-xs
                leading-5
                text-slate-500
                sm:text-sm
              "
            >
              {description}
            </p>
          )}

          {to && actionText && (
            <p
              className="
                mt-3
                text-xs
                font-semibold
                text-green-700
                sm:text-sm
              "
            >
              {actionText}
            </p>
          )}
        </div>

        {/* ICON */}

        {icon && (
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-green-50
              text-green-700
              sm:h-11
              sm:w-11
            "
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );

  if (to) {
    return (
      <Link
        to={to}
        className="
          block
          h-full
          min-w-0
          rounded-2xl
          focus:outline-none
          focus:ring-2
          focus:ring-green-500
          focus:ring-offset-2
        "
      >
        {card}
      </Link>
    );
  }

  return card;
}

/* =========================================================
   EMPTY STATE
========================================================= */

type PortalEmptyStateProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
};

export function PortalEmptyState({
  title,
  description,
  icon,
  action,
}: PortalEmptyStateProps) {
  return (
    <div
      className="
        flex
        min-h-[220px]
        w-full
        min-w-0
        flex-col
        items-center
        justify-center
        rounded-2xl
        border
        border-dashed
        border-slate-300
        bg-white
        px-4
        py-8
        text-center
        sm:px-6
        sm:py-10
      "
    >
      {icon && (
        <div
          className="
            mb-4
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-slate-100
            text-slate-500
          "
        >
          {icon}
        </div>
      )}

      <h3
        className="
          break-words
          text-base
          font-bold
          text-slate-900
          sm:text-lg
        "
      >
        {title}
      </h3>

      {description && (
        <p
          className="
            mt-2
            max-w-md
            text-sm
            leading-6
            text-slate-500
          "
        >
          {description}
        </p>
      )}

      {action && (
        <div className="mt-5 w-full sm:w-auto">
          {action}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

type StatusBadgeProps = {
  status: string;
};

function getStatusClasses(
  status: string,
) {
  const normalized =
    status
      .trim()
      .toLowerCase();

  switch (normalized) {
    case "active":
    case "approved":
    case "present":
    case "completed":
    case "paid":
    case "ongoing":
      return `
        bg-green-50
        text-green-700
        ring-green-600/20
      `;

    case "pending":
    case "pending registration":
    case "scheduled":
    case "upcoming":
    case "partially paid":
      return `
        bg-amber-50
        text-amber-700
        ring-amber-600/20
      `;

    case "inactive":
    case "cancelled":
    case "canceled":
    case "released":
    case "rejected":
      return `
        bg-slate-100
        text-slate-600
        ring-slate-500/20
      `;

    case "suspended":
    case "absent":
    case "overdue":
    case "unpaid":
      return `
        bg-red-50
        text-red-700
        ring-red-600/20
      `;

    case "injured":
      return `
        bg-orange-50
        text-orange-700
        ring-orange-600/20
      `;

    case "on trial":
      return `
        bg-blue-50
        text-blue-700
        ring-blue-600/20
      `;

    case "registered":
    case "graduated":
    case "transferred":
      return `
        bg-purple-50
        text-purple-700
        ring-purple-600/20
      `;

    default:
      return `
        bg-slate-100
        text-slate-700
        ring-slate-500/20
      `;
  }
}

export function StatusBadge({
  status,
}: StatusBadgeProps) {
  return (
    <span
      className={`
        inline-flex
        max-w-full
        items-center
        rounded-full
        px-2.5
        py-1
        text-xs
        font-semibold
        ring-1
        ring-inset
        ${getStatusClasses(
          status,
        )}
      `}
    >
      <span className="truncate">
        {status}
      </span>
    </span>
  );
}

/* =========================================================
   PORTAL BUTTON
========================================================= */

type PortalButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "ghost";

type PortalButtonProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: PortalButtonVariant;
    icon?: ReactNode;
    fullWidthOnMobile?: boolean;
  };

export function PortalButton({
  children,
  variant = "primary",
  icon,
  fullWidthOnMobile = false,
  className = "",
  type = "button",
  disabled,
  ...props
}: PortalButtonProps) {
  const variantClasses: Record<
    PortalButtonVariant,
    string
  > = {
    primary: `
      bg-green-600
      text-white
      hover:bg-green-700
      focus:ring-green-500
    `,

    secondary: `
      border
      border-slate-300
      bg-white
      text-slate-700
      hover:bg-slate-50
      focus:ring-slate-400
    `,

    danger: `
      bg-red-600
      text-white
      hover:bg-red-700
      focus:ring-red-500
    `,

    ghost: `
      bg-transparent
      text-slate-600
      hover:bg-slate-100
      hover:text-slate-900
      focus:ring-slate-400
    `,
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        inline-flex
        min-h-[42px]
        items-center
        justify-center
        gap-2
        rounded-lg
        px-4
        py-2.5
        text-sm
        font-semibold
        transition
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        disabled:cursor-not-allowed
        disabled:opacity-50

        ${
          fullWidthOnMobile
            ? "w-full sm:w-auto"
            : ""
        }

        ${
          variantClasses[
            variant
          ]
        }

        ${className}
      `}
      {...props}
    >
      {icon && (
        <span className="shrink-0">
          {icon}
        </span>
      )}

      <span className="min-w-0">
        {children}
      </span>
    </button>
  );
}

/* =========================================================
   DATE FORMATTER
========================================================= */

export function formatPortalDate(
  value?: string | Date | null,
) {
  if (!value) {
    return "—";
  }

  const date =
    value instanceof Date
      ? value
      : new Date(value);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return String(value);
  }

  return new Intl.DateTimeFormat(
    "en-NG",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  ).format(date);
}

/* =========================================================
   CURRENCY FORMATTER
========================================================= */

export function formatPortalCurrency(
  value?: number | null,
) {
  const amount =
    value ?? 0;

  return new Intl.NumberFormat(
    "en-NG",
    {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
  ).format(amount);
}