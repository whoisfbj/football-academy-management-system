import {
  ArrowLeft,
  CreditCard,
  ReceiptText,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router";

import {
  getInvoiceBalance,
  getInvoiceById,
  getPaymentsByInvoice,
} from "../../../services/financeService";

import {
  getPlayerById,
} from "../../../services/playerService";

function InvoiceDetailPage() {
  const { invoiceId } =
    useParams();

  const invoice = invoiceId
    ? getInvoiceById(invoiceId)
    : undefined;

  if (!invoice) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white px-4 py-8 text-center sm:p-10">
        Invoice not found.
      </div>
    );
  }

  const player =
    getPlayerById(
      invoice.playerId,
    );

  const payments =
    getPaymentsByInvoice(
      invoice.id,
    );

  const balance =
    getInvoiceBalance(
      invoice,
    );

  return (
    <div className="w-full min-w-0">
      <Link
        to="/admin/finance"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-green-600"
      >
        <ArrowLeft size={17} />
        Back to Finance
      </Link>

      <section className="mt-5 rounded-xl bg-slate-950 p-7 text-white">
        <p className="text-sm font-semibold text-green-400">
          Player Invoice
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          {invoice.invoiceNumber}
        </h1>

        <p className="mt-2 text-slate-300">
          {player?.fullName}
        </p>
      </section>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card
          label="Original Fee"
          value={formatCurrency(
            invoice.amount,
          )}
        />

        <Card
          label="Paid"
          value={formatCurrency(
            invoice.amountPaid,
          )}
        />

        <Card
          label="Balance"
          value={formatCurrency(
            balance,
          )}
        />

        <Card
          label="Status"
          value={invoice.status}
        />
      </div>

      <section className="mt-6 min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="font-bold text-slate-900">
          Invoice Information
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Detail
            label="Player"
            value={
              player?.fullName ??
              "Unknown"
            }
          />

          <Detail
            label="Fee"
            value={
              invoice.description
            }
          />

          <Detail
            label="Discount"
            value={formatCurrency(
              invoice.discountAmount,
            )}
          />

          <Detail
            label="Sponsorship"
            value={formatCurrency(
              invoice.sponsorshipAmount,
            )}
          />

          <Detail
            label="Due Date"
            value={formatDate(
              invoice.dueDate,
            )}
          />

          <Detail
            label="Invoice Status"
            value={
              invoice.status
            }
          />
        </div>

        {balance > 0 && (
          <Link
            to="/admin/finance/payment/new"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white"
          >
            <CreditCard size={17} />

            Record Payment
          </Link>
        )}
      </section>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-4 sm:p-6">
          <h2 className="font-bold text-slate-900">
            Payments
          </h2>
        </div>

        <div className="divide-y divide-slate-100">
          {payments.map(
            (payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-5"
              >
                <div>
                  <Link
                    to={`/admin/finance/receipt/${payment.id}`}
                    className="font-semibold text-green-600 hover:underline"
                  >
                    {
                      payment.receiptNumber
                    }
                  </Link>

                  <p className="mt-1 text-xs text-slate-400">
                    {
                      payment.paymentMethod
                    }{" "}
                    •{" "}
                    {formatDate(
                      payment.paymentDate,
                    )}
                  </p>
                </div>

                <p className="font-bold text-green-600">
                  {formatCurrency(
                    payment.amount,
                  )}
                </p>
              </div>
            ),
          )}

          {payments.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-slate-500 sm:p-10">
              <ReceiptText
                className="mx-auto mb-3 text-slate-300"
              />

              No payments recorded.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function Card({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="w-full min-w-0">
      <p className="text-xs uppercase text-slate-400">
        {label}
      </p>

      <p className="mt-1 font-semibold text-slate-700">
        {value}
      </p>
    </div>
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

function formatDate(
  date: string,
) {
  return new Date(
    `${date}T00:00:00`,
  ).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  );
}

export default InvoiceDetailPage;