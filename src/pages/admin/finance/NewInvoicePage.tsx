import {
  ArrowLeft,
  FilePlus2,
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
  addInvoice,
  generateInvoiceNumber,
  getFeePlans,
} from "../../../services/financeService";

import {
  getPlayers,
} from "../../../services/playerService";

const inputClass =
  "w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-base outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:text-sm";

const labelClass =
  "mb-2 block text-sm font-medium text-slate-700";

function NewInvoicePage() {
  const navigate =
    useNavigate();

  const players =
    getPlayers().filter(
      (player) =>
        player.registrationStatus ===
        "Registered",
    );

  const feePlans =
    getFeePlans().filter(
      (plan) =>
        plan.active,
    );

  const [playerId, setPlayerId] =
    useState(
      players[0]?.id ?? "",
    );

  const [feePlanId, setFeePlanId] =
    useState(
      feePlans[0]?.id ?? "",
    );

  const [description, setDescription] =
    useState(
      feePlans[0]?.name ?? "",
    );

  const [dueDate, setDueDate] =
    useState("");

  const [
    discountAmount,
    setDiscountAmount,
  ] = useState(0);

  const [
    sponsorshipAmount,
    setSponsorshipAmount,
  ] = useState(0);

  const [
    customAmount,
    setCustomAmount,
  ] = useState<number | null>(
    null,
  );

  const invoiceNumber =
    useMemo(
      () =>
        generateInvoiceNumber(),
      [],
    );

  const selectedPlayer =
    useMemo(
      () =>
        players.find(
          (player) =>
            player.id ===
            playerId,
        ),
      [
        players,
        playerId,
      ],
    );

  const selectedFeePlan =
    useMemo(
      () =>
        feePlans.find(
          (plan) =>
            plan.id ===
            feePlanId,
        ),
      [
        feePlans,
        feePlanId,
      ],
    );

  const invoiceAmount =
    customAmount !== null
      ? customAmount
      : selectedFeePlan?.amount ??
        0;

  const totalAdjustments =
    discountAmount +
    sponsorshipAmount;

  const amountPayable =
    Math.max(
      invoiceAmount -
        totalAdjustments,
      0,
    );

  const handleFeePlanChange = (
    nextFeePlanId: string,
  ) => {
    setFeePlanId(
      nextFeePlanId,
    );

    const plan =
      feePlans.find(
        (item) =>
          item.id ===
          nextFeePlanId,
      );

    if (plan) {
      setDescription(
        plan.name,
      );

      setCustomAmount(
        null,
      );
    }
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (
      !playerId ||
      !selectedFeePlan ||
      !dueDate ||
      invoiceAmount <= 0
    ) {
      return;
    }

    if (
      totalAdjustments >
      invoiceAmount
    ) {
      return;
    }

    addInvoice({
      id: `invoice-${Date.now()}`,

      invoiceNumber,

      playerId,

      feePlanId:
        selectedFeePlan.id,

      description:
        description ||
        selectedFeePlan.name,

      amount:
        invoiceAmount,

      discountAmount,

      sponsorshipAmount,

      amountPaid: 0,

      dueDate,

      status:
        amountPayable === 0
          ? "Paid"
          : "Pending",

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
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-green-600"
      >
        <ArrowLeft
          size={17}
        />

        Back to Finance
      </Link>

      <div className="mt-5 min-w-0">
        <p className="text-sm font-semibold text-green-600">
          Financial Management
        </p>

        <h1 className="mt-1 break-words text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
          Create Invoice
        </h1>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 sm:text-base">
          Create a new academy fee
          invoice for a registered
          player.
        </p>
      </div>

      <form
        onSubmit={
          handleSubmit
        }
        className="mt-7 space-y-6"
      >
        {/* INVOICE INFORMATION */}
        <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex items-center gap-3">
            <FilePlus2
              size={21}
              className="text-green-600"
            />

            <div>
              <h2 className="font-bold text-slate-900">
                Invoice Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Select the player
                and fee plan.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <label
                className={
                  labelClass
                }
              >
                Invoice Number
              </label>

              <input
                value={
                  invoiceNumber
                }
                readOnly
                className={`${inputClass} bg-slate-50 text-slate-500`}
              />
            </div>

            <div>
              <label
                className={
                  labelClass
                }
              >
                Player
              </label>

              <select
                value={
                  playerId
                }
                onChange={(
                  event,
                ) =>
                  setPlayerId(
                    event
                      .target
                      .value,
                  )
                }
                className={
                  inputClass
                }
                required
              >
                {players.map(
                  (
                    player,
                  ) => (
                    <option
                      key={
                        player.id
                      }
                      value={
                        player.id
                      }
                    >
                      {
                        player.fullName
                      }{" "}
                      —{" "}
                      {
                        player.playerId
                      }
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
                Fee Plan
              </label>

              <select
                value={
                  feePlanId
                }
                onChange={(
                  event,
                ) =>
                  handleFeePlanChange(
                    event
                      .target
                      .value,
                  )
                }
                className={
                  inputClass
                }
                required
              >
                {feePlans.map(
                  (
                    plan,
                  ) => (
                    <option
                      key={
                        plan.id
                      }
                      value={
                        plan.id
                      }
                    >
                      {
                        plan.name
                      }{" "}
                      —{" "}
                      {formatCurrency(
                        plan.amount,
                      )}
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
                Due Date
              </label>

              <input
                type="date"
                value={
                  dueDate
                }
                onChange={(
                  event,
                ) =>
                  setDueDate(
                    event
                      .target
                      .value,
                  )
                }
                className={
                  inputClass
                }
                required
              />
            </div>

            <div className="md:col-span-2">
              <label
                className={
                  labelClass
                }
              >
                Description
              </label>

              <input
                value={
                  description
                }
                onChange={(
                  event,
                ) =>
                  setDescription(
                    event
                      .target
                      .value,
                  )
                }
                className={
                  inputClass
                }
                placeholder="Invoice description"
                required
              />
            </div>
          </div>
        </section>

        {/* PLAYER INFORMATION */}
        {selectedPlayer && (
          <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <h2 className="font-bold text-slate-900">
              Player Information
            </h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <Detail
                label="Player"
                value={
                  selectedPlayer.fullName
                }
              />

              <Detail
                label="Player ID"
                value={
                  selectedPlayer.playerId
                }
              />

              <Detail
                label="Age Category"
                value={
                  selectedPlayer.ageCategory
                }
              />

              <Detail
                label="Academy Team"
                value={
                  selectedPlayer.academyTeam ??
                  "Not Assigned"
                }
              />
            </div>
          </section>
        )}

        {/* AMOUNT */}
        <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="font-bold text-slate-900">
            Invoice Amount
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Adjust the fee if
            necessary and apply
            discounts or sponsorships.
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <div>
              <label
                className={
                  labelClass
                }
              >
                Fee Amount
              </label>

              <input
                type="number"
                min="0"
                value={
                  invoiceAmount ||
                  ""
                }
                onChange={(
                  event,
                ) =>
                  setCustomAmount(
                    Number(
                      event
                        .target
                        .value,
                    ),
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
                Discount
              </label>

              <input
                type="number"
                min="0"
                value={
                  discountAmount ||
                  ""
                }
                onChange={(
                  event,
                ) =>
                  setDiscountAmount(
                    Number(
                      event
                        .target
                        .value,
                    ),
                  )
                }
                className={
                  inputClass
                }
                placeholder="0"
              />
            </div>

            <div>
              <label
                className={
                  labelClass
                }
              >
                Sponsorship
              </label>

              <input
                type="number"
                min="0"
                value={
                  sponsorshipAmount ||
                  ""
                }
                onChange={(
                  event,
                ) =>
                  setSponsorshipAmount(
                    Number(
                      event
                        .target
                        .value,
                    ),
                  )
                }
                className={
                  inputClass
                }
                placeholder="0"
              />
            </div>
          </div>

          {totalAdjustments >
            invoiceAmount && (
            <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              Discount and sponsorship
              cannot be greater than
              the invoice amount.
            </div>
          )}

          <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
            <SummaryRow
              label="Fee Amount"
              value={formatCurrency(
                invoiceAmount,
              )}
            />

            <SummaryRow
              label="Discount"
              value={`- ${formatCurrency(
                discountAmount,
              )}`}
            />

            <SummaryRow
              label="Sponsorship"
              value={`- ${formatCurrency(
                sponsorshipAmount,
              )}`}
            />

            <div className="flex items-center justify-between bg-slate-50 px-5 py-5">
              <span className="font-bold text-slate-900">
                Amount Payable
              </span>

              <span className="text-xl font-bold text-green-600">
                {formatCurrency(
                  amountPayable,
                )}
              </span>
            </div>
          </div>
        </section>

        {/* BUTTONS */}
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
              !playerId ||
              !feePlanId ||
              !dueDate ||
              invoiceAmount <=
                0 ||
              totalAdjustments >
                invoiceAmount
            }
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            <Save
              size={18}
            />

            Create Invoice
          </button>
        </div>
      </form>
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
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-700">
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

export default NewInvoicePage;