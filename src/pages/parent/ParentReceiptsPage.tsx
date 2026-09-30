import {
  Download,
  Printer,
  ReceiptText,
} from "lucide-react";

import {
  getPaymentsByPlayer,
} from "../../services/financeService";

import {
  getPlayerById,
} from "../../services/playerService";

function ParentReceiptsPage() {
  const linkedPlayer =
    getPlayerById("player-001");

  if (!linkedPlayer) {
    return (
      <div className="p-5 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <ReceiptText
              size={34}
              className="mx-auto text-slate-300"
            />

            <h1 className="mt-4 text-xl font-bold text-slate-900">
              No Player Linked
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              No player is currently linked to this parent or guardian account.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /*
   * Store guaranteed player values after
   * the undefined check.
   */
  const playerId =
    linkedPlayer.id;

  const playerName =
    linkedPlayer.fullName;

  const playerNumber =
    linkedPlayer.playerId;

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

  function printReceipt(
    paymentId: string,
  ) {
    const payment =
      payments.find(
        (item) =>
          item.id === paymentId,
      );

    if (!payment) {
      return;
    }

    const receiptWindow =
      window.open(
        "",
        "_blank",
        "width=800,height=700",
      );

    if (!receiptWindow) {
      return;
    }

    receiptWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${payment.receiptNumber}</title>

          <style>
            * {
              box-sizing: border-box;
            }

            body {
              margin: 0;
              padding: 40px;
              font-family: Arial, Helvetica, sans-serif;
              background: #f8fafc;
              color: #0f172a;
            }

            .receipt {
              max-width: 700px;
              margin: 0 auto;
              background: white;
              border: 1px solid #e2e8f0;
              border-radius: 16px;
              padding: 32px;
            }

            .header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              gap: 20px;
            }

            h1 {
              margin: 0;
              font-size: 26px;
            }

            .subtitle {
              margin-top: 6px;
              color: #64748b;
              font-size: 14px;
            }

            .receipt-number {
              text-align: right;
            }

            .receipt-number p {
              margin: 0;
              color: #64748b;
              font-size: 12px;
            }

            .receipt-number strong {
              display: block;
              margin-top: 6px;
              font-size: 15px;
            }

            .line {
              border-top: 1px solid #e2e8f0;
              margin: 28px 0;
            }

            .row {
              display: flex;
              justify-content: space-between;
              gap: 20px;
              margin: 16px 0;
            }

            .label {
              color: #64748b;
            }

            .amount-box {
              margin-top: 24px;
              padding: 24px;
              border-radius: 12px;
              background: #f0fdf4;
            }

            .amount-label {
              margin: 0;
              color: #64748b;
              font-size: 13px;
            }

            .amount {
              margin-top: 8px;
              font-size: 30px;
              font-weight: bold;
              color: #15803d;
            }

            .footer {
              margin-top: 28px;
              color: #64748b;
              font-size: 12px;
              line-height: 1.6;
            }

            @media print {
              body {
                background: white;
                padding: 0;
              }

              .receipt {
                border: none;
              }
            }
          </style>
        </head>

        <body>
          <div class="receipt">
            <div class="header">
              <div>
                <h1>Elite Academy</h1>

                <p class="subtitle">
                  Football Academy Payment Receipt
                </p>
              </div>

              <div class="receipt-number">
                <p>Receipt Number</p>

                <strong>
                  ${payment.receiptNumber}
                </strong>
              </div>
            </div>

            <div class="line"></div>

            <div class="row">
              <span class="label">
                Player
              </span>

              <strong>
                ${playerName}
              </strong>
            </div>

            <div class="row">
              <span class="label">
                Player ID
              </span>

              <strong>
                ${playerNumber}
              </strong>
            </div>

            <div class="row">
              <span class="label">
                Payment Number
              </span>

              <strong>
                ${payment.paymentNumber}
              </strong>
            </div>

            <div class="row">
              <span class="label">
                Payment Date
              </span>

              <strong>
                ${formatDate(
                  payment.paymentDate,
                )}
              </strong>
            </div>

            <div class="row">
              <span class="label">
                Payment Method
              </span>

              <strong>
                ${payment.paymentMethod}
              </strong>
            </div>

            ${
              payment.reference
                ? `
                  <div class="row">
                    <span class="label">
                      Reference
                    </span>

                    <strong>
                      ${payment.reference}
                    </strong>
                  </div>
                `
                : ""
            }

            <div class="amount-box">
              <p class="amount-label">
                Amount Paid
              </p>

              <div class="amount">
                ${formatCurrency(
                  payment.amount,
                )}
              </div>
            </div>

            <div class="footer">
              This receipt was generated by
              Elite Academy Management System.
            </div>
          </div>

          <script>
            window.onload = function () {
              window.print();
            };
          </script>
        </body>
      </html>
    `);

    receiptWindow.document.close();
  }

  return (
    <div className="p-5 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* PAGE HEADER */}

        <div>
          <p className="text-sm font-semibold text-green-600">
            Parent / Guardian Portal
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-950 lg:text-3xl">
            Receipts
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View, print and download
            payment receipts for{" "}
            {playerName}.
          </p>
        </div>

        {/* PLAYER SUMMARY */}

        <section className="mt-6 rounded-2xl bg-slate-950 p-6 text-white shadow-sm">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm text-slate-400">
                Payment receipts for
              </p>

              <h2 className="mt-1 text-xl font-bold">
                {playerName}
              </h2>

              <p className="mt-1 text-sm font-semibold text-green-400">
                {playerNumber}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Receipts
              </p>

              <p className="mt-1 text-3xl font-bold text-green-400">
                {payments.length}
              </p>
            </div>
          </div>
        </section>

        {/* RECEIPTS */}

        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <ReceiptText
                  size={21}
                />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Payment Receipts
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {payments.length}{" "}
                  receipt
                  {payments.length === 1
                    ? ""
                    : "s"}{" "}
                  available
                </p>
              </div>
            </div>
          </div>

          {payments.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {payments.map(
                (payment) => (
                  <div
                    key={
                      payment.id
                    }
                    className="flex flex-col justify-between gap-5 p-5 sm:flex-row sm:items-center lg:p-6"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <ReceiptText
                          size={17}
                          className="text-green-600"
                        />

                        <p className="font-bold text-slate-900">
                          {
                            payment.receiptNumber
                          }
                        </p>
                      </div>

                      <p className="mt-2 text-sm text-slate-500">
                        {formatDate(
                          payment.paymentDate,
                        )}{" "}
                        •{" "}
                        {
                          payment.paymentMethod
                        }
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {
                          payment.paymentNumber
                        }
                      </p>

                      <p className="mt-3 text-lg font-bold text-green-700">
                        {formatCurrency(
                          payment.amount,
                        )}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          printReceipt(
                            payment.id,
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        <Printer
                          size={16}
                        />

                        Print
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          printReceipt(
                            payment.id,
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                      >
                        <Download
                          size={16}
                        />

                        Download
                      </button>
                    </div>
                  </div>
                ),
              )}
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-300">
                <ReceiptText
                  size={27}
                />
              </div>

              <h3 className="mt-4 font-bold text-slate-800">
                No receipts available
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Receipts will appear
                here after an academy
                payment has been
                recorded.
              </p>
            </div>
          )}
        </section>

        {/* NOTICE */}

        <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <p className="font-semibold text-blue-900">
            Downloading receipts
          </p>

          <p className="mt-1 text-sm leading-6 text-blue-700">
            Selecting Download opens the
            printable receipt. Choose
            "Save as PDF" from your
            browser's print window to
            save a copy of the receipt.
          </p>
        </div>
      </div>
    </div>
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
      month: "long",
      year: "numeric",
    },
  );
}

export default ParentReceiptsPage;