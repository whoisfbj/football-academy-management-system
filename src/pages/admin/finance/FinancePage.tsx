import {
  Banknote,
  CreditCard,
  HandCoins,
  Plus,
  ReceiptText,
  WalletCards,
} from "lucide-react";

import type {
  ReactNode,
} from "react";

import { Link } from "react-router";

import {
  getExpenses,
  getInvoiceBalance,
  getInvoices,
  getPayments,
  getSponsorships,
  getStaffPayments,
} from "../../../services/financeService";

import {
  getPlayerById,
} from "../../../services/playerService";

function FinancePage() {
  const invoices =
    getInvoices();

  const payments =
    getPayments();

  const expenses =
    getExpenses();

  const sponsorships =
    getSponsorships();

  const staffPayments =
    getStaffPayments();

  const totalCollected =
    payments.reduce(
      (total, payment) =>
        total +
        payment.amount,
      0,
    );

  const outstanding =
    invoices.reduce(
      (total, invoice) =>
        total +
        getInvoiceBalance(
          invoice,
        ),
      0,
    );

  const totalExpenses =
    expenses.reduce(
      (total, expense) =>
        total +
        expense.amount,
      0,
    );

  const totalStaffPayments =
    staffPayments.reduce(
      (total, payment) =>
        total +
        payment.amount,
      0,
    );

  const activeSponsorships =
    sponsorships.filter(
      (item) =>
        item.active,
    ).length;

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-green-600">
            Financial Management
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Finance
          </h1>

          <p className="mt-2 text-slate-500">
            Manage player fees, payments,
            balances, receipts, sponsorships
            and academy expenses.
          </p>
        </div>

       <div className="flex flex-wrap gap-3">
  <Link
    to="/admin/finance/invoice/new"
    className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
  >
    <Plus size={18} />

    New Invoice
  </Link>

  <Link
    to="/admin/finance/payment/new"
    className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
  >
    <Plus size={18} />

    Record Payment
  </Link>
</div>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <FinanceCard
          title="Fees Collected"
          value={formatCurrency(
            totalCollected,
          )}
          icon={
            <Banknote
              size={20}
            />
          }
        />

        <FinanceCard
          title="Outstanding"
          value={formatCurrency(
            outstanding,
          )}
          icon={
            <WalletCards
              size={20}
            />
          }
        />

        <FinanceCard
          title="Expenses"
          value={formatCurrency(
            totalExpenses,
          )}
          icon={
            <CreditCard
              size={20}
            />
          }
        />

        <FinanceCard
          title="Staff Payments"
          value={formatCurrency(
            totalStaffPayments,
          )}
          icon={
            <HandCoins
              size={20}
            />
          }
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <section className="rounded-xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-200 p-6">
            <div>
              <h2 className="font-bold text-slate-900">
                Player Invoices
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Current academy fee balances.
              </p>
            </div>

            <ReceiptText className="text-green-600" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-4">
                    Invoice
                  </th>

                  <th className="px-5 py-4">
                    Player
                  </th>

                  <th className="px-5 py-4">
                    Fee
                  </th>

                  <th className="px-5 py-4">
                    Amount
                  </th>

                  <th className="px-5 py-4">
                    Paid
                  </th>

                  <th className="px-5 py-4">
                    Balance
                  </th>

                  <th className="px-5 py-4">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {invoices.map(
                  (invoice) => {
                    const player =
                      getPlayerById(
                        invoice.playerId,
                      );

                    const balance =
                      getInvoiceBalance(
                        invoice,
                      );

                    return (
                      <tr
                        key={
                          invoice.id
                        }
                        className="hover:bg-slate-50"
                      >
                       <Link
  to={`/admin/finance/invoice/${invoice.id}`}
  className="font-semibold text-green-600 hover:underline"
>
  {invoice.invoiceNumber}
</Link>

                        <td className="px-5 py-4">
                          <p className="font-semibold text-slate-700">
                            {player?.fullName ??
                              "Unknown Player"}
                          </p>

                          <p className="text-xs text-slate-400">
                            {player?.playerId ??
                              ""}
                          </p>
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {
                            invoice.description
                          }
                        </td>

                        <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                          {formatCurrency(
                            invoice.amount,
                          )}
                        </td>

                        <td className="px-5 py-4 text-sm text-green-600">
                          {formatCurrency(
                            invoice.amountPaid,
                          )}
                        </td>

                        <td className="px-5 py-4 text-sm font-semibold text-red-600">
                          {formatCurrency(
                            balance,
                          )}
                        </td>

                        <td className="px-5 py-4">
                          <InvoiceStatusBadge
                            status={
                              invoice.status
                            }
                          />
                        </td>
                      </tr>
                    );
                  },
                )}
              </tbody>
            </table>
          </div>
        </section>

        <div className="space-y-6">
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-slate-900">
              Finance Summary
            </h2>

            <div className="mt-5 space-y-4">
              <SummaryRow
                label="Invoices"
                value={`${invoices.length}`}
              />

              <SummaryRow
                label="Payments"
                value={`${payments.length}`}
              />

              <SummaryRow
                label="Active Sponsorships"
                value={`${activeSponsorships}`}
              />

              <SummaryRow
                label="Expenses"
                value={`${expenses.length}`}
              />
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-slate-900">
              Recent Payments
            </h2>

            <div className="mt-5 space-y-4">
              {payments
                .slice()
                .reverse()
                .slice(0, 4)
                .map(
                  (payment) => {
                    const player =
                      getPlayerById(
                        payment.playerId,
                      );

                    return (
                      <div
                        key={
                          payment.id
                        }
                        className="border-b border-slate-100 pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-slate-700">
                              {player?.fullName ??
                                "Unknown Player"}
                            </p>

                           <Link
  to={`/admin/finance/receipt/${payment.id}`}
  className="mt-1 inline-block text-xs font-semibold text-green-600 hover:underline"
>
  {
    payment.receiptNumber
  }
</Link>
                          </div>

                          <p className="text-sm font-bold text-green-600">
                            {formatCurrency(
                              payment.amount,
                            )}
                          </p>
                        </div>
                      </div>
                    );
                  },
                )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function FinanceCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
        {icon}
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="font-bold text-slate-800">
        {value}
      </span>
    </div>
  );
}

function InvoiceStatusBadge({
  status,
}: {
  status: string;
}) {
  const style =
    status === "Paid"
      ? "bg-green-50 text-green-700"
      : status ===
          "Partially Paid"
        ? "bg-amber-50 text-amber-700"
        : status ===
            "Overdue"
          ? "bg-red-50 text-red-700"
          : "bg-slate-100 text-slate-600";

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${style}`}
    >
      {status}
    </span>
  );
}

function formatCurrency(
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

export default FinancePage;