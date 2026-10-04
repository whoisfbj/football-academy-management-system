import {
  HandCoins,
  Landmark,
  Plus,
  ReceiptText,
} from "lucide-react";

import {
  useState,
} from "react";

import type{
    ReactNode,
} from "react";

import {
  addExpense,
  addSponsorship,
  addStaffPayment,
  getExpenses,
  getSponsorships,
  getStaffPayments,
} from "../../../services/financeService";

import {
  getPlayers,
} from "../../../services/playerService";

import {
  getCoaches,
} from "../../../services/coachService";

function FinanceRecordsPage() {
  const [refresh, setRefresh] =
    useState(0);

  void refresh;

  const expenses =
    getExpenses();

  const sponsorships =
    getSponsorships();

  const staffPayments =
    getStaffPayments();

  const players =
    getPlayers();

  const coaches =
    getCoaches();

  const [expenseTitle, setExpenseTitle] =
    useState("");

  const [
    expenseAmount,
    setExpenseAmount,
  ] = useState(0);

  const [
    sponsorPlayer,
    setSponsorPlayer,
  ] = useState(
    players[0]?.id ?? "",
  );

  const [
    sponsorName,
    setSponsorName,
  ] = useState("");

  const [
    sponsorAmount,
    setSponsorAmount,
  ] = useState(0);

  const [staffId, setStaffId] =
    useState(
      coaches[0]?.id ?? "",
    );

  const [
    staffAmount,
    setStaffAmount,
  ] = useState(0);

  const reload = () =>
    setRefresh(
      (value) => value + 1,
    );

  return (
    <div className="w-full min-w-0">
      <p className="text-xs font-semibold uppercase tracking-wide text-green-600 sm:text-sm">
        Financial Management
      </p>

      <h1 className="mt-1 break-words text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
        Finance Records
      </h1>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:mt-7 xl:grid-cols-3">
        <QuickForm
          title="Record Expense"
          icon={
            <ReceiptText
              size={20}
            />
          }
        >
          <input
            value={expenseTitle}
            onChange={(event) =>
              setExpenseTitle(
                event.target.value,
              )
            }
            placeholder="Expense title"
            className={inputClass}
          />

          <input
            type="number"
            value={
              expenseAmount || ""
            }
            onChange={(event) =>
              setExpenseAmount(
                Number(
                  event.target.value,
                ),
              )
            }
            placeholder="Amount"
            className={inputClass}
          />

          <button
            onClick={() => {
              if (
                !expenseTitle ||
                expenseAmount <= 0
              ) {
                return;
              }

              addExpense({
                id: `expense-${Date.now()}`,
                title:
                  expenseTitle,
                category:
                  "General",
                amount:
                  expenseAmount,
                date:
                  today(),
                createdAt:
                  new Date().toISOString(),
              });

              setExpenseTitle("");
              setExpenseAmount(0);
              reload();
            }}
            className={buttonClass}
          >
            <Plus size={16} />
            Save Expense
          </button>
        </QuickForm>

        <QuickForm
          title="Add Sponsorship"
          icon={
            <Landmark
              size={20}
            />
          }
        >
          <select
            value={sponsorPlayer}
            onChange={(event) =>
              setSponsorPlayer(
                event.target.value,
              )
            }
            className={inputClass}
          >
            {players.map(
              (player) => (
                <option
                  key={player.id}
                  value={player.id}
                >
                  {player.fullName}
                </option>
              ),
            )}
          </select>

          <input
            value={sponsorName}
            onChange={(event) =>
              setSponsorName(
                event.target.value,
              )
            }
            placeholder="Sponsor name"
            className={inputClass}
          />

          <input
            type="number"
            value={
              sponsorAmount || ""
            }
            onChange={(event) =>
              setSponsorAmount(
                Number(
                  event.target.value,
                ),
              )
            }
            placeholder="Amount"
            className={inputClass}
          />

          <button
            onClick={() => {
              if (
                !sponsorPlayer ||
                !sponsorName ||
                sponsorAmount <= 0
              ) {
                return;
              }

              addSponsorship({
                id: `sponsorship-${Date.now()}`,
                playerId:
                  sponsorPlayer,
                sponsorName,
                amount:
                  sponsorAmount,
                startDate:
                  today(),
                active: true,
                createdAt:
                  new Date().toISOString(),
              });

              setSponsorName("");
              setSponsorAmount(0);
              reload();
            }}
            className={buttonClass}
          >
            <Plus size={16} />
            Save Sponsorship
          </button>
        </QuickForm>

        <QuickForm
          title="Staff Payment"
          icon={
            <HandCoins
              size={20}
            />
          }
        >
          <select
            value={staffId}
            onChange={(event) =>
              setStaffId(
                event.target.value,
              )
            }
            className={inputClass}
          >
            {coaches.map(
              (coach) => (
                <option
                  key={coach.id}
                  value={coach.id}
                >
                  {coach.fullName}
                </option>
              ),
            )}
          </select>

          <input
            type="number"
            value={
              staffAmount || ""
            }
            onChange={(event) =>
              setStaffAmount(
                Number(
                  event.target.value,
                ),
              )
            }
            placeholder="Amount"
            className={inputClass}
          />

          <button
            onClick={() => {
              const coach =
                coaches.find(
                  (item) =>
                    item.id ===
                    staffId,
                );

              if (
                !coach ||
                staffAmount <= 0
              ) {
                return;
              }

              addStaffPayment({
                id: `staff-payment-${Date.now()}`,
                staffId:
                  coach.id,
                staffName:
                  coach.fullName,
                amount:
                  staffAmount,
                paymentDate:
                  today(),
                paymentType:
                  "Staff Payment",
                createdAt:
                  new Date().toISOString(),
              });

              setStaffAmount(0);
              reload();
            }}
            className={buttonClass}
          >
            <Plus size={16} />
            Save Payment
          </button>
        </QuickForm>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Records
          title="Expenses"
          rows={expenses.map(
            (item) => ({
              name: item.title,
              value:
                formatCurrency(
                  item.amount,
                ),
            }),
          )}
        />

        <Records
          title="Sponsorships"
          rows={sponsorships.map(
            (item) => ({
              name:
                item.sponsorName,
              value:
                formatCurrency(
                  item.amount,
                ),
            }),
          )}
        />

        <Records
          title="Staff Payments"
          rows={staffPayments.map(
            (item) => ({
              name:
                item.staffName,
              value:
                formatCurrency(
                  item.amount,
                ),
            }),
          )}
        />
      </div>
    </div>
  );
}

const inputClass =
  "w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-base outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:text-sm";

const buttonClass =
  "inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700";

function QuickForm({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex min-w-0 items-center gap-2 text-green-600">
        {icon}

        <h2 className="font-bold text-slate-900">
          {title}
        </h2>
      </div>

      <div className="mt-5 space-y-3">
        {children}
      </div>
    </section>
  );
}

function Records({
  title,
  rows,
}: {
  title: string;
  rows: {
    name: string;
    value: string;
  }[];
}) {
  return (
    <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <h2 className="font-bold text-slate-900">
        {title}
      </h2>

      <div className="mt-5 space-y-3">
        {rows.map(
          (row, index) => (
            <div
              key={`${row.name}-${index}`}
              className="flex min-w-0 flex-col gap-1 border-b border-slate-100 pb-3 min-[420px]:flex-row min-[420px]:items-start min-[420px]:justify-between"
            >
              <span className="min-w-0 break-words text-sm text-slate-600">
                {row.name}
              </span>

              <span className="shrink-0 break-words font-semibold text-slate-800">
                {row.value}
              </span>
            </div>
          ),
        )}
      </div>
    </section>
  );
}

function today() {
  return new Date()
    .toISOString()
    .split("T")[0];
}

function formatCurrency(
  value: number,
) {
  return new Intl.NumberFormat(
    "en-NG",
    {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    },
  ).format(value);
}

export default FinanceRecordsPage;