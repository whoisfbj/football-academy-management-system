import {
  ArrowLeft,
  CheckCircle2,
  Printer,
  ReceiptText,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router";

import {
  getInvoiceById,
  getInvoiceBalance,
  getPaymentById,
} from "../../../services/financeService";

import {
  getPlayerById,
} from "../../../services/playerService";

function ReceiptPage() {
  const { paymentId } =
    useParams();

  const payment =
    paymentId
      ? getPaymentById(
          paymentId,
        )
      : undefined;

  if (!payment) {
    return (
      <div className="w-full min-w-0">
        <Link
          to="/admin/finance"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-green-600"
        >
          <ArrowLeft
            size={17}
          />

          Back to Finance
        </Link>

        <div className="mt-8 rounded-xl border border-slate-200 bg-white px-4 py-8 text-center shadow-sm sm:p-12">
          <ReceiptText
            size={40}
            className="mx-auto text-slate-300"
          />

          <h2 className="mt-4 text-lg font-bold text-slate-900">
            Receipt not found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            The requested payment receipt
            could not be found.
          </p>
        </div>
      </div>
    );
  }

  const player =
    getPlayerById(
      payment.playerId,
    );

  const invoice =
    getInvoiceById(
      payment.invoiceId,
    );

  const invoiceBalance =
    invoice
      ? getInvoiceBalance(
          invoice,
        )
      : 0;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full min-w-0">
      {/* PAGE ACTIONS */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <Link
          to={
            player
              ? `/admin/players/${player.id}`
              : "/admin/finance"
          }
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-green-600"
        >
          <ArrowLeft
            size={17}
          />

          Back
        </Link>

        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
        >
          <Printer
            size={18}
          />

          Print Receipt
        </button>
      </div>

      {/* RECEIPT */}
      <section className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm print:max-w-none print:border-0 print:shadow-none">
        {/* HEADER */}
        <div className="bg-slate-950 px-7 py-7 text-white print:bg-white print:text-slate-900">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-600 text-white">
                  <ReceiptText
                    size={22}
                  />
                </div>

                <div>
                  <h1 className="text-xl font-bold">
                    Elite Academy
                  </h1>

                  <p className="text-sm text-slate-300 print:text-slate-500">
                    Football Academy Management
                  </p>
                </div>
              </div>

              <div className="mt-5 text-sm text-slate-300 print:text-slate-600">
                <p>
                  Lagos, Nigeria
                </p>

                <p className="mt-1">
                  Academy Payment Receipt
                </p>
              </div>
            </div>

            <div className="sm:text-right">
              <p className="text-xs font-semibold uppercase tracking-wider text-green-400 print:text-green-700">
                Payment Receipt
              </p>

              <p className="mt-2 text-xl font-bold">
                {
                  payment.receiptNumber
                }
              </p>

              <p className="mt-2 text-sm text-slate-300 print:text-slate-500">
                {formatDate(
                  payment.paymentDate,
                )}
              </p>
            </div>
          </div>
        </div>

        {/* SUCCESS MESSAGE */}
        <div className="border-b border-slate-200 bg-green-50 px-7 py-4">
          <div className="flex items-center gap-3 text-green-700">
            <CheckCircle2
              size={20}
            />

            <p className="text-sm font-semibold">
              Payment successfully recorded
            </p>
          </div>
        </div>

        <div className="p-7">
          {/* PLAYER / INVOICE */}
          <div className="grid gap-8 md:grid-cols-2">
            <section>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Received From
              </p>

              <h2 className="mt-3 text-lg font-bold text-slate-900">
                {player?.fullName ??
                  "Unknown Player"}
              </h2>

              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <ReceiptDetail
                  label="Player ID"
                  value={
                    player?.playerId ??
                    "—"
                  }
                />

                <ReceiptDetail
                  label="Age Category"
                  value={
                    player?.ageCategory ??
                    "—"
                  }
                />

                <ReceiptDetail
                  label="Academy Team"
                  value={
                    player?.academyTeam ??
                    "Not Assigned"
                  }
                />

                <ReceiptDetail
                  label="Program"
                  value={
                    player?.program ??
                    "—"
                  }
                />
              </div>
            </section>

            <section>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Invoice Information
              </p>

              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <ReceiptDetail
                  label="Invoice Number"
                  value={
                    invoice?.invoiceNumber ??
                    "—"
                  }
                />

                <ReceiptDetail
                  label="Fee"
                  value={
                    invoice?.description ??
                    "—"
                  }
                />

                <ReceiptDetail
                  label="Due Date"
                  value={
                    invoice
                      ? formatDate(
                          invoice.dueDate,
                        )
                      : "—"
                  }
                />

                <ReceiptDetail
                  label="Invoice Status"
                  value={
                    invoice?.status ??
                    "—"
                  }
                />
              </div>
            </section>
          </div>

          {/* PAYMENT AMOUNT */}
          <section className="mt-8 rounded-xl bg-slate-50 p-4 sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Amount Paid
                </p>

                <p className="mt-2 text-4xl font-bold text-green-600">
                  {formatCurrency(
                    payment.amount,
                  )}
                </p>
              </div>

              <div className="sm:text-right">
                <p className="text-sm text-slate-500">
                  Payment Method
                </p>

                <p className="mt-1 font-bold text-slate-800">
                  {
                    payment.paymentMethod
                  }
                </p>
              </div>
            </div>
          </section>

          {/* PAYMENT DETAILS */}
          <section className="mt-8">
            <h2 className="text-lg font-bold text-slate-900">
              Payment Details
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <DetailCard
                label="Payment Number"
                value={
                  payment.paymentNumber
                }
              />

              <DetailCard
                label="Receipt Number"
                value={
                  payment.receiptNumber
                }
              />

              <DetailCard
                label="Payment Date"
                value={formatDate(
                  payment.paymentDate,
                )}
              />

              <DetailCard
                label="Payment Method"
                value={
                  payment.paymentMethod
                }
              />

              <DetailCard
                label="Transaction Reference"
                value={
                  payment.reference ??
                  "Not provided"
                }
              />

              <DetailCard
                label="Recorded By"
                value={
                  payment.recordedBy
                }
              />
            </div>
          </section>

          {/* INVOICE SUMMARY */}
          {invoice && (
            <section className="mt-8">
              <h2 className="text-lg font-bold text-slate-900">
                Invoice Summary
              </h2>

              <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
                <ReceiptSummaryRow
                  label="Original Fee"
                  value={formatCurrency(
                    invoice.amount,
                  )}
                />

                <ReceiptSummaryRow
                  label="Discount"
                  value={
                    invoice.discountAmount >
                    0
                      ? `- ${formatCurrency(
                          invoice.discountAmount,
                        )}`
                      : formatCurrency(
                          0,
                        )
                  }
                />

                <ReceiptSummaryRow
                  label="Sponsorship"
                  value={
                    invoice.sponsorshipAmount >
                    0
                      ? `- ${formatCurrency(
                          invoice.sponsorshipAmount,
                        )}`
                      : formatCurrency(
                          0,
                        )
                  }
                />

                <ReceiptSummaryRow
                  label="Total Paid"
                  value={formatCurrency(
                    invoice.amountPaid,
                  )}
                />

                <div className="flex items-center justify-between bg-slate-50 px-5 py-4">
                  <span className="font-bold text-slate-800">
                    Outstanding Balance
                  </span>

                  <span
                    className={
                      invoiceBalance >
                      0
                        ? "font-bold text-red-600"
                        : "font-bold text-green-600"
                    }
                  >
                    {formatCurrency(
                      invoiceBalance,
                    )}
                  </span>
                </div>
              </div>
            </section>
          )}

          {/* NOTES */}
          {payment.notes && (
            <section className="mt-8">
              <h2 className="font-bold text-slate-900">
                Payment Notes
              </h2>

              <div className="mt-3 rounded-lg bg-slate-50 p-4">
                <p className="whitespace-pre-line text-sm leading-6 text-slate-600">
                  {
                    payment.notes
                  }
                </p>
              </div>
            </section>
          )}

          {/* FOOTER */}
          <footer className="mt-10 border-t border-slate-200 pt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-bold text-slate-900">
                  Elite Academy
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Thank you for your payment.
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  This receipt was generated by
                  the Football Academy Management
                  System.
                </p>
              </div>

              <div className="text-xs text-slate-400 sm:text-right">
                <p>
                  Receipt:
                  {" "}
                  {
                    payment.receiptNumber
                  }
                </p>

                <p className="mt-1">
                  Generated:
                  {" "}
                  {new Date().toLocaleDateString(
                    "en-GB",
                  )}
                </p>
              </div>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}

function ReceiptDetail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between gap-6">
      <span className="text-slate-500">
        {label}
      </span>

      <span className="text-right font-semibold text-slate-700">
        {value}
      </span>
    </div>
  );
}

function DetailCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold text-slate-700">
        {value}
      </p>
    </div>
  );
}

function ReceiptSummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="text-sm font-semibold text-slate-700">
        {value}
      </span>
    </div>
  );
}

function formatDate(
  date: string,
) {
  if (!date) {
    return "—";
  }

  return new Date(
    `${date}T00:00:00`,
  ).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
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

export default ReceiptPage;