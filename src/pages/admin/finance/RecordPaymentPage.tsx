import {
  ArrowLeft,
  Save,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import type {
  FormEvent,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router";

import {
  addPayment,
  generatePaymentNumber,
  generateReceiptNumber,
  getInvoiceBalance,
  getInvoices,
} from "../../../services/financeService";

import {
  getCurrentUser,
} from "../../../services/authService";

import {
  getPlayerById,
} from "../../../services/playerService";

import type {
  PaymentMethod,
} from "../../../shared/types/finance";

const inputClass =
  "w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-base outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:text-sm";

const labelClass =
  "mb-2 block text-sm font-medium text-slate-700";

const paymentMethods: PaymentMethod[] = [
  "Cash",
  "Bank Transfer",
  "Card",
  "POS",
  "Online Payment",
];

function RecordPaymentPage() {
  const navigate =
    useNavigate();

  const invoices =
    getInvoices().filter(
      (invoice) =>
        getInvoiceBalance(
          invoice,
        ) > 0,
    );

  const currentUser =
    getCurrentUser();

  const [invoiceId, setInvoiceId] =
    useState(
      invoices[0]?.id ?? "",
    );

  const [amount, setAmount] =
    useState<number>(0);

  const [
    paymentMethod,
    setPaymentMethod,
  ] = useState<PaymentMethod>(
    "Bank Transfer",
  );

  const [reference, setReference] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const [paymentDate, setPaymentDate] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0],
    );

  const selectedInvoice =
    useMemo(
      () =>
        invoices.find(
          (invoice) =>
            invoice.id ===
            invoiceId,
        ),
      [
        invoices,
        invoiceId,
      ],
    );

  const selectedPlayer =
    selectedInvoice
      ? getPlayerById(
          selectedInvoice.playerId,
        )
      : undefined;

  const balance =
    selectedInvoice
      ? getInvoiceBalance(
          selectedInvoice,
        )
      : 0;

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (
      !selectedInvoice ||
      amount <= 0 ||
      amount > balance
    ) {
      return;
    }

    addPayment({
      id: `payment-${Date.now()}`,

      paymentNumber:
        generatePaymentNumber(),

      receiptNumber:
        generateReceiptNumber(),

      playerId:
        selectedInvoice.playerId,

      invoiceId:
        selectedInvoice.id,

      amount,

      paymentMethod,

      paymentDate,

      reference:
        reference || undefined,

      notes:
        notes || undefined,

      recordedBy:
        currentUser?.id ??
        "admin",

      createdAt:
        new Date().toISOString(),
    });

    navigate(
      "/admin/finance",
    );
  };

  return (
    <div className="w-full min-w-0">
      <Link
        to="/admin/finance"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-green-600"
      >
        <ArrowLeft size={17} />

        Back to Finance
      </Link>

      <div className="mt-5 min-w-0">
        <p className="text-sm font-semibold text-green-600">
          Financial Management
        </p>

        <h1 className="mt-1 break-words text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
          Record Payment
        </h1>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 sm:text-base">
          Record a player fee payment and
          automatically update the outstanding
          balance.
        </p>
      </div>

      <form
        onSubmit={
          handleSubmit
        }
        className="mt-7 space-y-6"
      >
        <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="font-bold text-slate-900">
            Invoice
          </h2>

          <div className="mt-6">
            <label
              className={
                labelClass
              }
            >
              Select Invoice
            </label>

            <select
              value={invoiceId}
              onChange={(event) => {
                setInvoiceId(
                  event.target.value,
                );

                setAmount(0);
              }}
              className={
                inputClass
              }
              required
            >
              {invoices.map(
                (invoice) => {
                  const player =
                    getPlayerById(
                      invoice.playerId,
                    );

                  return (
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
                      —{" "}
                      {player?.fullName ??
                        "Unknown Player"}{" "}
                      —{" "}
                      {formatCurrency(
                        getInvoiceBalance(
                          invoice,
                        ),
                      )}{" "}
                      outstanding
                    </option>
                  );
                },
              )}
            </select>
          </div>

          {selectedInvoice && (
            <div className="mt-6 grid gap-4 rounded-lg bg-slate-50 p-5 sm:grid-cols-2 lg:grid-cols-4">
              <InvoiceDetail
                label="Player"
                value={
                  selectedPlayer?.fullName ??
                  "Unknown"
                }
              />

              <InvoiceDetail
                label="Fee"
                value={
                  selectedInvoice.description
                }
              />

              <InvoiceDetail
                label="Invoice Amount"
                value={formatCurrency(
                  selectedInvoice.amount,
                )}
              />

              <InvoiceDetail
                label="Outstanding"
                value={formatCurrency(
                  balance,
                )}
              />
            </div>
          )}
        </section>

        <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="font-bold text-slate-900">
            Payment Information
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <label
                className={
                  labelClass
                }
              >
                Amount
              </label>

              <input
                type="number"
                min="1"
                max={balance}
                value={
                  amount || ""
                }
                onChange={(event) =>
                  setAmount(
                    Number(
                      event.target.value,
                    ),
                  )
                }
                className={
                  inputClass
                }
                required
              />

              <p className="mt-1 text-xs text-slate-400">
                Maximum payment:{" "}
                {formatCurrency(
                  balance,
                )}
              </p>
            </div>

            <div>
              <label
                className={
                  labelClass
                }
              >
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
                className={
                  inputClass
                }
              >
                {paymentMethods.map(
                  (method) => (
                    <option
                      key={
                        method
                      }
                      value={
                        method
                      }
                    >
                      {method}
                    </option>
                  ),
                )}
              </select>
            </div>

            <div>
              <label
                className={
                  labelClass
                }
              >
                Payment Date
              </label>

              <input
                type="date"
                value={
                  paymentDate
                }
                onChange={(event) =>
                  setPaymentDate(
                    event.target.value,
                  )
                }
                className={
                  inputClass
                }
                required
              />
            </div>

            <div>
              <label
                className={
                  labelClass
                }
              >
                Reference
              </label>

              <input
                value={
                  reference
                }
                onChange={(event) =>
                  setReference(
                    event.target.value,
                  )
                }
                placeholder="Transfer reference, POS reference..."
                className={
                  inputClass
                }
              />
            </div>

            <div className="md:col-span-2">
              <label
                className={
                  labelClass
                }
              >
                Notes
              </label>

              <textarea
                value={notes}
                onChange={(event) =>
                  setNotes(
                    event.target.value,
                  )
                }
                rows={3}
                className={
                  inputClass
                }
              />
            </div>
          </div>
        </section>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            to="/admin/finance"
            className="inline-flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={
              !selectedInvoice ||
              amount <= 0 ||
              amount > balance
            }
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            <Save size={18} />

            Record Payment
          </button>
        </div>
      </form>
    </div>
  );
}

function InvoiceDetail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="w-full min-w-0">
      <p className="text-xs uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-700">
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

export default RecordPaymentPage;