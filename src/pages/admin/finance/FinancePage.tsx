import {
  Banknote,
  CreditCard,
  HandCoins,
  Plus,
  ReceiptText,
  WalletCards,
} from "lucide-react";

import type { ReactNode } from "react";
import { Link } from "react-router";

import {
  getExpenses,
  getInvoiceBalance,
  getInvoices,
  getPayments,
  getSponsorships,
  getStaffPayments,
} from "../../../services/financeService";

import { getPlayerById } from "../../../services/playerService";

function FinancePage() {
  const invoices = getInvoices();
  const payments = getPayments();
  const expenses = getExpenses();
  const sponsorships = getSponsorships();
  const staffPayments = getStaffPayments();

  const totalCollected = payments.reduce((total, payment) => total + payment.amount, 0);
  const outstanding = invoices.reduce(
    (total, invoice) => total + getInvoiceBalance(invoice),
    0,
  );
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const totalStaffPayments = staffPayments.reduce(
    (total, payment) => total + payment.amount,
    0,
  );
  const activeSponsorships = sponsorships.filter((item) => item.active).length;

  return (
    <div className="w-full min-w-0">
      <div className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-green-600 sm:text-sm">
            Financial Management
          </p>
          <h1 className="mt-1 break-words text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
            Finance
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 sm:text-base">
            Manage player fees, payments, balances, receipts, sponsorships and academy expenses.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-2 sm:w-auto sm:grid-cols-2">
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

      <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-7 sm:grid-cols-2 xl:grid-cols-4">
        <FinanceCard title="Fees Collected" value={formatCurrency(totalCollected)} icon={<Banknote size={20} />} />
        <FinanceCard title="Outstanding" value={formatCurrency(outstanding)} icon={<WalletCards size={20} />} />
        <FinanceCard title="Expenses" value={formatCurrency(totalExpenses)} icon={<CreditCard size={20} />} />
        <FinanceCard title="Staff Payments" value={formatCurrency(totalStaffPayments)} icon={<HandCoins size={20} />} />
      </div>

      <div className="mt-6 grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-3">
        <section className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
          <div className="flex min-w-0 items-start justify-between gap-3 border-b border-slate-200 p-4 sm:p-6">
            <div className="min-w-0">
              <h2 className="font-bold text-slate-900">Player Invoices</h2>
              <p className="mt-1 text-sm text-slate-500">Current academy fee balances.</p>
            </div>
            <ReceiptText className="shrink-0 text-green-600" />
          </div>

          <div className="space-y-3 bg-slate-50/50 p-3 md:hidden">
            {invoices.map((invoice) => {
              const player = getPlayerById(invoice.playerId);
              const balance = getInvoiceBalance(invoice);

              return (
                <article
                  key={invoice.id}
                  className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex min-w-0 items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link
                        to={`/admin/finance/invoice/${invoice.id}`}
                        className="break-all font-semibold text-green-600 hover:underline"
                      >
                        {invoice.invoiceNumber}
                      </Link>
                      <p className="mt-1 break-words text-sm font-semibold text-slate-800">
                        {player?.fullName ?? "Unknown Player"}
                      </p>
                      <p className="mt-0.5 break-all text-xs text-slate-400">{player?.playerId ?? ""}</p>
                    </div>
                    <div className="shrink-0">
                      <InvoiceStatusBadge status={invoice.status} />
                    </div>
                  </div>

                  <p className="mt-3 break-words text-sm leading-5 text-slate-500">{invoice.description}</p>

                  <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                    <AmountDetail label="Amount" value={formatCurrency(invoice.amount)} />
                    <AmountDetail label="Paid" value={formatCurrency(invoice.amountPaid)} className="text-green-600" />
                    <AmountDetail label="Balance" value={formatCurrency(balance)} className={balance > 0 ? "text-red-600" : "text-green-600"} />
                  </div>

                  <Link
                    to={`/admin/finance/invoice/${invoice.id}`}
                    className="mt-4 inline-flex w-full items-center justify-center rounded-lg border border-green-200 bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-700 transition hover:bg-green-100"
                  >
                    View Invoice
                  </Link>
                </article>
              );
            })}

            {invoices.length === 0 && <FinanceEmpty icon={<ReceiptText size={34} />} title="No invoices found" />}
          </div>

          <div className="hidden w-full overflow-x-auto md:block">
            <table className="w-full min-w-[900px]">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-4">Invoice</th>
                  <th className="px-5 py-4">Player</th>
                  <th className="px-5 py-4">Fee</th>
                  <th className="px-5 py-4">Amount</th>
                  <th className="px-5 py-4">Paid</th>
                  <th className="px-5 py-4">Balance</th>
                  <th className="px-5 py-4">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {invoices.map((invoice) => {
                  const player = getPlayerById(invoice.playerId);
                  const balance = getInvoiceBalance(invoice);

                  return (
                    <tr key={invoice.id} className="transition hover:bg-slate-50">
                      <td className="px-5 py-4">
                        <Link
                          to={`/admin/finance/invoice/${invoice.id}`}
                          className="font-semibold text-green-600 hover:underline"
                        >
                          {invoice.invoiceNumber}
                        </Link>
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-700">{player?.fullName ?? "Unknown Player"}</p>
                        <p className="text-xs text-slate-400">{player?.playerId ?? ""}</p>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">{invoice.description}</td>
                      <td className="px-5 py-4 text-sm font-semibold text-slate-700">{formatCurrency(invoice.amount)}</td>
                      <td className="px-5 py-4 text-sm font-semibold text-green-600">{formatCurrency(invoice.amountPaid)}</td>
                      <td className={`px-5 py-4 text-sm font-semibold ${balance > 0 ? "text-red-600" : "text-green-600"}`}>
                        {formatCurrency(balance)}
                      </td>
                      <td className="px-5 py-4"><InvoiceStatusBadge status={invoice.status} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {invoices.length === 0 && <FinanceEmpty icon={<ReceiptText size={34} />} title="No invoices found" />}
          </div>
        </section>

        <div className="min-w-0 space-y-6">
          <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <h2 className="font-bold text-slate-900">Finance Summary</h2>
            <div className="mt-5 space-y-4">
              <SummaryRow label="Invoices" value={`${invoices.length}`} />
              <SummaryRow label="Payments" value={`${payments.length}`} />
              <SummaryRow label="Active Sponsorships" value={`${activeSponsorships}`} />
              <SummaryRow label="Expenses" value={`${expenses.length}`} />
            </div>
          </section>

          <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <h2 className="font-bold text-slate-900">Recent Payments</h2>

            <div className="mt-5 space-y-4">
              {payments
                .slice()
                .reverse()
                .slice(0, 4)
                .map((payment) => {
                  const player = getPlayerById(payment.playerId);

                  return (
                    <div
                      key={payment.id}
                      className="min-w-0 border-b border-slate-100 pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex min-w-0 flex-col gap-2 min-[420px]:flex-row min-[420px]:items-start min-[420px]:justify-between">
                        <div className="min-w-0">
                          <p className="break-words text-sm font-semibold text-slate-700">
                            {player?.fullName ?? "Unknown Player"}
                          </p>
                          <Link
                            to={`/admin/finance/receipt/${payment.id}`}
                            className="mt-1 inline-block break-all text-xs font-semibold text-green-600 hover:underline"
                          >
                            {payment.receiptNumber}
                          </Link>
                        </div>

                        <p className="shrink-0 text-sm font-bold text-green-600">
                          {formatCurrency(payment.amount)}
                        </p>
                      </div>
                    </div>
                  );
                })}

              {payments.length === 0 && (
                <p className="text-sm text-slate-500">No payments have been recorded yet.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function FinanceCard({ title, value, icon }: { title: string; value: string; icon: ReactNode }) {
  return (
    <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">{icon}</div>
      <p className="mt-4 break-words text-sm text-slate-500">{title}</p>
      <p className="mt-2 break-words text-xl font-bold text-slate-900 sm:text-2xl">{value}</p>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-3">
      <span className="min-w-0 break-words text-sm text-slate-500">{label}</span>
      <span className="shrink-0 font-bold text-slate-800">{value}</span>
    </div>
  );
}

function AmountDetail({ label, value, className = "" }: { label: string; value: string; className?: string }) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <p className={`mt-1 break-words text-sm font-bold text-slate-800 ${className}`}>{value}</p>
    </div>
  );
}

function InvoiceStatusBadge({ status }: { status: string }) {
  const style =
    status === "Paid"
      ? "bg-green-50 text-green-700"
      : status === "Partially Paid"
        ? "bg-amber-50 text-amber-700"
        : status === "Overdue"
          ? "bg-red-50 text-red-700"
          : "bg-slate-100 text-slate-600";

  return (
    <span className={`inline-flex max-w-full rounded-full px-2.5 py-1 text-xs font-semibold ${style}`}>
      <span className="truncate">{status}</span>
    </span>
  );
}

function FinanceEmpty({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="px-4 py-10 text-center text-slate-500 sm:p-12">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">{icon}</div>
      <p className="mt-4 font-medium text-slate-700">{title}</p>
    </div>
  );
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default FinancePage;
