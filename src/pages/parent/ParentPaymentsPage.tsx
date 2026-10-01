import {
  useState,
} from "react";

import type {
  FormEvent,
} from "react";

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

import {
  getPrimaryLinkedPlayer,
} from "../../services/parentService";

import type {
  Payment,
  PaymentMethod,
  PlayerInvoice,
} from "../../shared/types/finance";

function ParentPaymentsPage() {
  const linkedPlayer =
    getPrimaryLinkedPlayer();

  const [refresh, setRefresh] =
    useState(0);

  const [
    selectedInvoiceId,
    setSelectedInvoiceId,
  ] = useState("");

  const [amount, setAmount] =
    useState("");

  const [
    paymentMethod,
    setPaymentMethod,
  ] =
    useState<PaymentMethod>(
      "Bank Transfer",
    );

  const [
    reference,
    setReference,
  ] = useState("");

  const [message, setMessage] =
    useState("");

  const [
    messageType,
    setMessageType,
  ] =
    useState<
      "success" | "error" | ""
    >("");

  void refresh;

  if (!linkedPlayer) {
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

  const playerId =
    linkedPlayer.id;

  const playerName =
    linkedPlayer.fullName;

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
      (total, invoice) =>
        total +
        getInvoiceBalance(
          invoice,
        ),
      0,
    );

  const totalPaid =
    payments.reduce(
      (total, payment) =>
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
          item.id === invoiceId,
      );

    if (invoice) {
      setAmount(
        String(
          getInvoiceBalance(
            invoice,
          ),
        ),
      );
    } else {
      setAmount("");
    }
  }

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

      setMessageType("error");

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

      setMessageType("error");

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

      setMessageType("error");

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

  return (
    <div className="p-5 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div>
          <p className="text-sm font-semibold text-green-600">
            Parent / Guardian Portal
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-950 lg:text-3xl">
            Payments & Fees
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View academy fees and
            payments for {playerName}.
          </p>
        </div>

        <section className="mt-6 rounded-2xl bg-slate-950 p-6 text-white">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm text-slate-400">
                Payment account for
              </p>

              <h2 className="mt-1 text-xl font-bold">
                {playerName}
              </h2>

              <p className="mt-1 text-sm font-semibold text-green-400">
                {
                  linkedPlayer.playerId
                }{" "}
                •{" "}
                {linkedPlayer.academyTeam ??
                  "No Team Assigned"}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">
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

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
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

        <div className="mt-6 grid gap-6 xl:grid-cols-3">
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
            <div className="border-b border-slate-200 p-6">
              <h2 className="font-bold text-slate-900">
                Fee Invoices
              </h2>
            </div>

            {invoices.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {invoices.map(
                  (invoice) => {
                    const balance =
                      getInvoiceBalance(
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
                              {
                                invoice.description
                              }
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                              Due:{" "}
                              {formatDate(
                                invoice.dueDate,
                              )}
                            </p>

                            <div className="mt-4 flex flex-wrap gap-5 text-sm">
                              <span>
                                Amount:{" "}
                                <strong>
                                  {formatCurrency(
                                    getPayableAmount(
                                      invoice,
                                    ),
                                  )}
                                </strong>
                              </span>

                              <span>
                                Paid:{" "}
                                <strong className="text-green-700">
                                  {formatCurrency(
                                    invoice.amountPaid,
                                  )}
                                </strong>
                              </span>

                              <span>
                                Balance:{" "}
                                <strong className="text-red-600">
                                  {formatCurrency(
                                    balance,
                                  )}
                                </strong>
                              </span>
                            </div>
                          </div>

                          {balance > 0 ? (
                            <button
                              type="button"
                              onClick={() =>
                                handleSelectInvoice(
                                  invoice.id,
                                )
                              }
                              className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
                            >
                              Pay Invoice
                            </button>
                          ) : (
                            <span className="rounded-lg bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-700">
                              Fully Paid
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            ) : (
              <div className="p-12 text-center text-sm text-slate-500">
                No invoices available.
              </div>
            )}
          </section>

          <section className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <WalletCards
                size={21}
              />
            </div>

            <h2 className="mt-4 font-bold text-slate-900">
              Make Payment
            </h2>

            <form
              onSubmit={
                handlePayment
              }
              className="mt-6 space-y-4"
            >
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Invoice
                </label>

                <select
                  value={
                    selectedInvoiceId
                  }
                  onChange={(event) =>
                    handleSelectInvoice(
                      event.target
                        .value,
                    )
                  }
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm"
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

              {selectedInvoice && (
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs uppercase text-slate-400">
                    Outstanding Balance
                  </p>

                  <p className="mt-1 text-xl font-bold">
                    {formatCurrency(
                      selectedBalance,
                    )}
                  </p>
                </div>
              )}

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Amount
                </label>

                <input
                  type="number"
                  value={amount}
                  onChange={(event) =>
                    setAmount(
                      event.target
                        .value,
                    )
                  }
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Payment Method
                </label>

                <select
                  value={
                    paymentMethod
                  }
                  onChange={(event) =>
                    setPaymentMethod(
                      event.target
                        .value as PaymentMethod,
                    )
                  }
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm"
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

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Reference
                </label>

                <input
                  value={reference}
                  onChange={(event) =>
                    setReference(
                      event.target
                        .value,
                    )
                  }
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 text-sm"
                />
              </div>

              {message && (
                <div
                  className={
                    messageType ===
                    "error"
                      ? "rounded-lg bg-red-50 p-3 text-sm text-red-700"
                      : "rounded-lg bg-green-50 p-3 text-sm text-green-700"
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
                className="w-full rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white disabled:bg-slate-300"
              >
                Make Payment
              </button>
            </form>
          </section>
        </div>

        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <h2 className="font-bold text-slate-900">
              Payment History
            </h2>
          </div>

          {payments.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {payments.map(
                (payment) => (
                  <div
                    key={payment.id}
                    className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center"
                  >
                    <div>
                      <p className="font-bold text-slate-900">
                        {
                          payment.receiptNumber
                        }
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {formatDate(
                          payment.paymentDate,
                        )}{" "}
                        •{" "}
                        {
                          payment.paymentMethod
                        }
                      </p>
                    </div>

                    <p className="font-bold text-green-700">
                      {formatCurrency(
                        payment.amount,
                      )}
                    </p>
                  </div>
                ),
              )}
            </div>
          ) : (
            <div className="p-12 text-center">
              <ReceiptText
                size={34}
                className="mx-auto text-slate-300"
              />

              <p className="mt-4 text-sm text-slate-500">
                No payments recorded.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <CreditCard
        size={19}
        className="text-green-600"
      />

      <p className="mt-4 text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold text-slate-950">
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
          : "bg-blue-50 text-blue-700";

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles}`}
    >
      {status}
    </span>
  );
}

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