import { useState } from "react";
import type { FormEvent } from "react";

import {
  CreditCard,
  ReceiptText,
  WalletCards,
} from "lucide-react";

import {
  addPayment,
  generatePaymentNumber,
  generateReceiptNumber,
  getInvoiceBalance,
  getInvoicesByPlayer,
  getPaymentsByPlayer,
} from "../../services/financeService";

import { getPlayerById } from "../../services/playerService";

import type {
  Payment,
  PaymentMethod,
  PlayerInvoice,
} from "../../shared/types/finance";

function ParentPaymentsPage() {
  const player = getPlayerById("player-001");

  const [refresh, setRefresh] = useState(0);

  const [selectedInvoiceId, setSelectedInvoiceId] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>(
      "Bank Transfer",
    );

  const [reference, setReference] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [messageType, setMessageType] =
    useState<
      "success" | "error" | ""
    >("");

  /*
   * refresh exists only to trigger
   * another render after localStorage
   * finance data changes.
   */
  void refresh;

  /* =====================================================
     NO LINKED PLAYER
  ===================================================== */

  if (!player) {
    return (
      <div className="p-5 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <CreditCard
              size={34}
              className="mx-auto text-slate-300"
            />

            <h1 className="mt-4 text-xl font-bold text-slate-900">
              No Player Linked
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              No player is currently
              linked to this parent or
              guardian account.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /*
   * Store this after the player guard.
   * This guarantees TypeScript knows
   * that we have a valid string ID.
   */
  const playerId = player.id;

  /* =====================================================
     FINANCE DATA
  ===================================================== */

  const invoices =
    getInvoicesByPlayer(
      playerId,
    );

  const payments =
    getPaymentsByPlayer(
      playerId,
    )
      .slice()
      .sort(
        (a, b) =>
          b.paymentDate.localeCompare(
            a.paymentDate,
          ),
      );

  const outstandingInvoices =
    invoices.filter(
      (invoice) =>
        getInvoiceBalance(
          invoice,
        ) > 0,
    );

  const totalOutstanding =
    invoices.reduce(
      (
        total,
        invoice,
      ) =>
        total +
        getInvoiceBalance(
          invoice,
        ),
      0,
    );

  const totalPaid =
    payments.reduce(
      (
        total,
        payment,
      ) =>
        total +
        payment.amount,
      0,
    );

  const selectedInvoice =
    invoices.find(
      (invoice) =>
        invoice.id ===
        selectedInvoiceId,
    );

  const selectedBalance =
    selectedInvoice
      ? getInvoiceBalance(
          selectedInvoice,
        )
      : 0;

  /* =====================================================
     SELECT INVOICE
  ===================================================== */

  function handleSelectInvoice(
    invoiceId: string,
  ) {
    setSelectedInvoiceId(
      invoiceId,
    );

    setMessage("");
    setMessageType("");

    const invoice =
      invoices.find(
        (item) =>
          item.id ===
          invoiceId,
      );

    if (invoice) {
      const balance =
        getInvoiceBalance(
          invoice,
        );

      setAmount(
        String(balance),
      );
    } else {
      setAmount("");
    }
  }

  /* =====================================================
     MAKE PAYMENT
  ===================================================== */

  function handlePayment(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setMessage("");
    setMessageType("");

    if (!selectedInvoice) {
      setMessage(
        "Please select an invoice.",
      );

      setMessageType(
        "error",
      );

      return;
    }

    const numericAmount =
      Number(amount);

    if (
      Number.isNaN(
        numericAmount,
      ) ||
      numericAmount <= 0
    ) {
      setMessage(
        "Enter a valid payment amount.",
      );

      setMessageType(
        "error",
      );

      return;
    }

    const currentBalance =
      getInvoiceBalance(
        selectedInvoice,
      );

    if (
      numericAmount >
      currentBalance
    ) {
      setMessage(
        "Payment cannot be greater than the outstanding balance.",
      );

      setMessageType(
        "error",
      );

      return;
    }

    const now =
      new Date().toISOString();

    const payment: Payment = {
      id: `payment-${Date.now()}`,

      paymentNumber:
        generatePaymentNumber(),

      receiptNumber:
        generateReceiptNumber(),

      invoiceId:
        selectedInvoice.id,

      playerId,

      amount: numericAmount,

      paymentMethod,

      paymentDate:
        now.slice(0, 10),

      reference:
        reference.trim() ||
        undefined,

      /*
       * Payment requires recordedBy
       * in your existing finance type.
       */
      recordedBy:
        "Parent / Guardian Portal",

      createdAt: now,
    };

    addPayment(payment);

    setSelectedInvoiceId(
      "",
    );

    setAmount("");
    setReference("");

    setMessageType(
      "success",
    );

    setMessage(
      `Payment recorded successfully. Receipt number: ${payment.receiptNumber}`,
    );

    setRefresh(
      (value) =>
        value + 1,
    );
  }

  /* =====================================================
     UI
  ===================================================== */

  return (
    <div className="p-5 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* PAGE HEADER */}

        <div>
          <p className="text-sm font-semibold text-green-600">
            Parent / Guardian Portal
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-950 lg:text-3xl">
            Payments & Fees
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View academy fees,
            outstanding balances and
            make payments for{" "}
            {player.fullName}.
          </p>
        </div>

        {/* PLAYER SUMMARY */}

        <section className="mt-6 rounded-2xl bg-slate-950 p-6 text-white shadow-sm">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm text-slate-400">
                Payment account for
              </p>

              <h2 className="mt-1 text-xl font-bold">
                {player.fullName}
              </h2>

              <p className="mt-1 text-sm font-semibold text-green-400">
                {player.playerId} •{" "}
                {player.academyTeam ??
                  "No Team Assigned"}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Outstanding
              </p>

              <p className="mt-1 text-2xl font-bold text-green-400">
                {formatCurrency(
                  totalOutstanding,
                )}
              </p>
            </div>
          </div>
        </section>

        {/* SUMMARY CARDS */}

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <SummaryCard
            label="Total Paid"
            value={formatCurrency(
              totalPaid,
            )}
          />

          <SummaryCard
            label="Outstanding"
            value={formatCurrency(
              totalOutstanding,
            )}
          />

          <SummaryCard
            label="Open Invoices"
            value={`${outstandingInvoices.length}`}
          />
        </div>

        {/* INVOICES + PAYMENT FORM */}

        <div className="mt-6 grid gap-6 xl:grid-cols-3">
          {/* INVOICES */}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
            <div className="border-b border-slate-200 p-6">
              <h2 className="font-bold text-slate-900">
                Fee Invoices
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Academy invoices issued
                for this player.
              </p>
            </div>

            {invoices.length >
            0 ? (
              <div className="divide-y divide-slate-100">
                {invoices.map(
                  (invoice) => {
                    const balance =
                      getInvoiceBalance(
                        invoice,
                      );

                    const payableAmount =
                      getPayableAmount(
                        invoice,
                      );

                    return (
                      <div
                        key={
                          invoice.id
                        }
                        className="p-5 lg:p-6"
                      >
                        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="font-bold text-slate-900">
                                {
                                  invoice.invoiceNumber
                                }
                              </p>

                              <InvoiceStatus
                                status={
                                  invoice.status
                                }
                              />
                            </div>

                            <p className="mt-2 text-sm text-slate-500">
                              Due:{" "}
                              {formatDate(
                                invoice.dueDate,
                              )}
                            </p>

                            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm">
                              <div>
                                <p className="text-xs text-slate-400">
                                  Amount
                                </p>

                                <p className="mt-1 font-semibold text-slate-800">
                                  {formatCurrency(
                                    payableAmount,
                                  )}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs text-slate-400">
                                  Paid
                                </p>

                                <p className="mt-1 font-semibold text-green-700">
                                  {formatCurrency(
                                    invoice.amountPaid,
                                  )}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs text-slate-400">
                                  Balance
                                </p>

                                <p className="mt-1 font-semibold text-red-600">
                                  {formatCurrency(
                                    balance,
                                  )}
                                </p>
                              </div>
                            </div>

                            {(invoice.discountAmount ??
                              0) >
                              0 && (
                              <p className="mt-3 text-xs text-slate-500">
                                Discount:{" "}
                                <strong>
                                  {formatCurrency(
                                    invoice.discountAmount ??
                                      0,
                                  )}
                                </strong>
                              </p>
                            )}

                            {(invoice.sponsorshipAmount ??
                              0) >
                              0 && (
                              <p className="mt-1 text-xs text-slate-500">
                                Sponsorship:{" "}
                                <strong>
                                  {formatCurrency(
                                    invoice.sponsorshipAmount ??
                                      0,
                                  )}
                                </strong>
                              </p>
                            )}
                          </div>

                          {balance >
                            0 ? (
                            <button
                              type="button"
                              onClick={() =>
                                handleSelectInvoice(
                                  invoice.id,
                                )
                              }
                              className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                            >
                              Pay Invoice
                            </button>
                          ) : (
                            <div className="rounded-lg bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-700">
                              Fully Paid
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            ) : (
              <div className="p-12 text-center">
                <CreditCard
                  size={34}
                  className="mx-auto text-slate-300"
                />

                <h3 className="mt-4 font-semibold text-slate-800">
                  No invoices
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  No academy invoices
                  have been issued for
                  this player.
                </p>
              </div>
            )}
          </section>

          {/* MAKE PAYMENT */}

          <section className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <WalletCards
                size={21}
              />
            </div>

            <h2 className="mt-4 font-bold text-slate-900">
              Make Payment
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Select an outstanding
              invoice and enter the
              payment details.
            </p>

            <form
              onSubmit={
                handlePayment
              }
              className="mt-6 space-y-4"
            >
              {/* INVOICE */}

              <div>
                <label
                  htmlFor="invoice"
                  className="text-sm font-semibold text-slate-700"
                >
                  Invoice
                </label>

                <select
                  id="invoice"
                  value={
                    selectedInvoiceId
                  }
                  onChange={(event) =>
                    handleSelectInvoice(
                      event.target
                        .value,
                    )
                  }
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/10"
                >
                  <option value="">
                    Select invoice
                  </option>

                  {outstandingInvoices.map(
                    (invoice) => (
                      <option
                        key={
                          invoice.id
                        }
                        value={
                          invoice.id
                        }
                      >
                        {
                          invoice.invoiceNumber
                        }{" "}
                        -{" "}
                        {formatCurrency(
                          getInvoiceBalance(
                            invoice,
                          ),
                        )}
                      </option>
                    ),
                  )}
                </select>
              </div>

              {/* CURRENT BALANCE */}

              {selectedInvoice && (
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Outstanding Balance
                  </p>

                  <p className="mt-2 text-xl font-bold text-slate-950">
                    {formatCurrency(
                      selectedBalance,
                    )}
                  </p>
                </div>
              )}

              {/* AMOUNT */}

              <div>
                <label
                  htmlFor="amount"
                  className="text-sm font-semibold text-slate-700"
                >
                  Amount
                </label>

                <input
                  id="amount"
                  type="number"
                  min="1"
                  max={
                    selectedBalance ||
                    undefined
                  }
                  value={amount}
                  onChange={(event) =>
                    setAmount(
                      event.target
                        .value,
                    )
                  }
                  placeholder="Enter amount"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/10"
                />
              </div>

              {/* PAYMENT METHOD */}

              <div>
                <label
                  htmlFor="payment-method"
                  className="text-sm font-semibold text-slate-700"
                >
                  Payment Method
                </label>

                <select
                  id="payment-method"
                  value={
                    paymentMethod
                  }
                  onChange={(event) =>
                    setPaymentMethod(
                      event.target
                        .value as PaymentMethod,
                    )
                  }
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/10"
                >
                  <option value="Bank Transfer">
                    Bank Transfer
                  </option>

                  <option value="Card">
                    Card
                  </option>

                  <option value="POS">
                    POS
                  </option>

                  <option value="Online Payment">
                    Online Payment
                  </option>

                  <option value="Cash">
                    Cash
                  </option>
                </select>
              </div>

              {/* REFERENCE */}

              <div>
                <label
                  htmlFor="reference"
                  className="text-sm font-semibold text-slate-700"
                >
                  Payment Reference
                </label>

                <input
                  id="reference"
                  value={reference}
                  onChange={(event) =>
                    setReference(
                      event.target
                        .value,
                    )
                  }
                  placeholder="Optional reference"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/10"
                />
              </div>

              {/* MESSAGE */}

              {message && (
                <div
                  className={
                    messageType ===
                    "error"
                      ? "rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700"
                      : "rounded-lg bg-green-50 p-3 text-sm font-medium text-green-700"
                  }
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={
                  !selectedInvoiceId
                }
                className="w-full rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Make Payment
              </button>
            </form>

            <p className="mt-4 text-xs leading-5 text-slate-400">
              Prototype only. This
              records the transaction
              in localStorage. A real
              online payment gateway
              will be integrated when
              the production backend is
              developed.
            </p>
          </section>
        </div>

        {/* PAYMENT HISTORY */}

        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 p-6">
            <div>
              <h2 className="font-bold text-slate-900">
                Payment History
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Payments recorded for
                this player.
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <ReceiptText
                size={21}
              />
            </div>
          </div>

          {payments.length >
          0 ? (
            <>
              {/* DESKTOP */}

              <div className="hidden overflow-x-auto md:block">
                <table className="w-full text-left">
                  <thead className="bg-slate-50">
                    <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      <th className="px-6 py-4">
                        Receipt
                      </th>

                      <th className="px-6 py-4">
                        Payment No.
                      </th>

                      <th className="px-6 py-4">
                        Date
                      </th>

                      <th className="px-6 py-4">
                        Method
                      </th>

                      <th className="px-6 py-4">
                        Amount
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {payments.map(
                      (payment) => (
                        <tr
                          key={
                            payment.id
                          }
                          className="hover:bg-slate-50"
                        >
                          <td className="px-6 py-4 font-semibold text-slate-800">
                            {
                              payment.receiptNumber
                            }
                          </td>

                          <td className="px-6 py-4 text-sm text-slate-600">
                            {
                              payment.paymentNumber
                            }
                          </td>

                          <td className="px-6 py-4 text-sm text-slate-600">
                            {formatDate(
                              payment.paymentDate,
                            )}
                          </td>

                          <td className="px-6 py-4 text-sm text-slate-600">
                            {
                              payment.paymentMethod
                            }
                          </td>

                          <td className="px-6 py-4 font-semibold text-green-700">
                            {formatCurrency(
                              payment.amount,
                            )}
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>

              {/* MOBILE */}

              <div className="divide-y divide-slate-100 md:hidden">
                {payments.map(
                  (payment) => (
                    <div
                      key={
                        payment.id
                      }
                      className="p-5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-slate-800">
                            {
                              payment.receiptNumber
                            }
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {
                              payment.paymentNumber
                            }
                          </p>
                        </div>

                        <p className="font-bold text-green-700">
                          {formatCurrency(
                            payment.amount,
                          )}
                        </p>
                      </div>

                      <p className="mt-3 text-sm text-slate-500">
                        {formatDate(
                          payment.paymentDate,
                        )}{" "}
                        •{" "}
                        {
                          payment.paymentMethod
                        }
                      </p>
                    </div>
                  ),
                )}
              </div>
            </>
          ) : (
            <div className="p-12 text-center">
              <ReceiptText
                size={34}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-4 font-semibold text-slate-800">
                No payment history
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Payments will appear
                here after they have
                been recorded.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

/* =====================================================
   COMPONENTS
===================================================== */

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
        <CreditCard
          size={19}
        />
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 break-words text-2xl font-bold text-slate-950">
        {value}
      </p>
    </div>
  );
}

function InvoiceStatus({
  status,
}: {
  status: string;
}) {
  const styles =
    status === "Paid"
      ? "bg-green-50 text-green-700"
      : status ===
          "Partially Paid"
        ? "bg-amber-50 text-amber-700"
        : status ===
            "Overdue"
          ? "bg-red-50 text-red-700"
          : status ===
              "Cancelled"
            ? "bg-slate-100 text-slate-600"
            : "bg-blue-50 text-blue-700";

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles}`}
    >
      {status}
    </span>
  );
}

/* =====================================================
   FINANCE HELPERS
===================================================== */

function getPayableAmount(
  invoice: PlayerInvoice,
) {
  return Math.max(
    0,
    invoice.amount -
      (invoice.discountAmount ??
        0) -
      (invoice.sponsorshipAmount ??
        0),
  );
}

/* =====================================================
   FORMATTERS
===================================================== */

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
  if (!date) {
    return "—";
  }

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

export default ParentPaymentsPage;