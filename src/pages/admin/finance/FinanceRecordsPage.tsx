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
    <div>
      <p className="text-sm font-semibold text-green-600">
        Financial Management
      </p>

      <h1 className="mt-1 text-3xl font-bold text-slate-900">
        Finance Records
      </h1>

      <div className="mt-7 grid gap-6 xl:grid-cols-3">
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

      <div className="mt-8 grid gap-6 xl:grid-cols-3">
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
  "w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-green-500";

const buttonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white";

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
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 text-green-600">
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
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="font-bold text-slate-900">
        {title}
      </h2>

      <div className="mt-5 space-y-3">
        {rows.map(
          (row, index) => (
            <div
              key={`${row.name}-${index}`}
              className="flex justify-between border-b border-slate-100 pb-3"
            >
              <span className="text-sm text-slate-600">
                {row.name}
              </span>

              <span className="font-semibold text-slate-800">
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