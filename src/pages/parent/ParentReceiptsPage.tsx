import {
  Download,
  Printer,
  ReceiptText,
} from "lucide-react";

import {
  getPaymentsByPlayer,
} from "../../services/financeService";

import {
  getPrimaryLinkedPlayer,
} from "../../services/parentService";

function ParentReceiptsPage() {
  const linkedPlayer =
    getPrimaryLinkedPlayer();

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
          </div>
        </div>
      </div>
    );
  }

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
            body {
              font-family: Arial, sans-serif;
              background: #f8fafc;
              padding: 40px;
              color: #0f172a;
            }

            .receipt {
              max-width: 700px;
              margin: auto;
              background: white;
              padding: 32px;
              border: 1px solid #e2e8f0;
              border-radius: 16px;
            }

            .row {
              display: flex;
              justify-content: space-between;
              margin: 16px 0;
            }

            .label {
              color: #64748b;
            }

            .amount {
              background: #f0fdf4;
              padding: 24px;
              margin-top: 25px;
              border-radius: 12px;
              font-size: 28px;
              font-weight: bold;
              color: #15803d;
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
            <h1>Elite Academy</h1>

            <p>
              Football Academy Payment Receipt
            </p>

            <hr />

            <div class="row">
              <span class="label">Receipt</span>
              <strong>${payment.receiptNumber}</strong>
            </div>

            <div class="row">
              <span class="label">Player</span>
              <strong>${playerName}</strong>
            </div>

            <div class="row">
              <span class="label">Player ID</span>
              <strong>${playerNumber}</strong>
            </div>

            <div class="row">
              <span class="label">Payment Number</span>
              <strong>${payment.paymentNumber}</strong>
            </div>

            <div class="row">
              <span class="label">Date</span>
              <strong>${formatDate(
                payment.paymentDate,
              )}</strong>
            </div>

            <div class="row">
              <span class="label">Method</span>
              <strong>${payment.paymentMethod}</strong>
            </div>

            <div class="amount">
              ${formatCurrency(
                payment.amount,
              )}
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
        <div>
          <p className="text-sm font-semibold text-green-600">
            Parent / Guardian Portal
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-950 lg:text-3xl">
            Receipts
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View and print payment
            receipts for {playerName}.
          </p>
        </div>

        <section className="mt-6 rounded-2xl bg-slate-950 p-6 text-white">
          <p className="text-sm text-slate-400">
            Receipts for
          </p>

          <h2 className="mt-1 text-xl font-bold">
            {playerName}
          </h2>

          <p className="mt-1 text-green-400">
            {playerNumber}
          </p>
        </section>

        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {payments.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {payments.map(
                (payment) => (
                  <div
                    key={payment.id}
                    className="flex flex-col justify-between gap-5 p-5 sm:flex-row sm:items-center lg:p-6"
                  >
                    <div>
                      <p className="font-bold text-slate-900">
                        {
                          payment.receiptNumber
                        }
                      </p>

                      <p className="mt-2 text-sm text-slate-500">
                        {formatDate(
                          payment.paymentDate,
                        )}{" "}
                        •{" "}
                        {
                          payment.paymentMethod
                        }
                      </p>

                      <p className="mt-3 text-lg font-bold text-green-700">
                        {formatCurrency(
                          payment.amount,
                        )}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          printReceipt(
                            payment.id,
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold"
                      >
                        <Printer
                          size={16}
                        />
                        Print
                      </button>

                      <button
                        onClick={() =>
                          printReceipt(
                            payment.id,
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white"
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
              <ReceiptText
                size={34}
                className="mx-auto text-slate-300"
              />

              <p className="mt-4 text-sm text-slate-500">
                No receipts available.
              </p>
            </div>
          )}
        </section>
      </div>
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
      month: "long",
      year: "numeric",
    },
  );
}

export default ParentReceiptsPage;