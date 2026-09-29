import type {
  ReactNode,
} from "react";

import {
  Banknote,
  ClipboardCheck,
  Target,
  Users,
  UsersRound,
} from "lucide-react";

import {
  getAttendanceRecords,
} from "../../../services/attendanceService";

import {
  getAssessments,
} from "../../../services/developmentService";

import {
  getInvoiceBalance,
  getInvoices,
  getPayments,
} from "../../../services/financeService";

import {
  getPlayers,
} from "../../../services/playerService";

import {
  getTeams,
} from "../../../services/teamService";

function ReportsPage() {
  const players =
    getPlayers();

  const teams =
    getTeams();

  const attendance =
    getAttendanceRecords();

  const assessments =
    getAssessments();

  const invoices =
    getInvoices();

  const payments =
    getPayments();

  const registered =
    players.filter(
      (player) =>
        player.registrationStatus ===
        "Registered",
    );

  const active =
    players.filter(
      (player) =>
        player.status ===
        "Active",
    );

  const boys =
    players.filter(
      (player) =>
        player.gender ===
        "Male",
    ).length;

  const girls =
    players.filter(
      (player) =>
        player.gender ===
        "Female",
    ).length;

  const attendanceRate =
    attendance.length === 0
      ? 0
      : Math.round(
          (attendance.filter(
            (record) =>
              record.status ===
                "Present" ||
              record.status ===
                "Late Arrival",
          ).length /
            attendance.length) *
            100,
        );

  const collected =
    payments.reduce(
      (total, payment) =>
        total +
        payment.amount,
      0,
    );

  const outstanding =
    invoices.reduce(
      (total, invoice) =>
        total +
        getInvoiceBalance(
          invoice,
        ),
      0,
    );

  return (
    <div>
      <p className="text-sm font-semibold text-green-600">
        Academy Analytics
      </p>

      <h1 className="mt-1 text-3xl font-bold text-slate-900">
        Reports
      </h1>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <ReportCard
          title="Registered Players"
          value={`${registered.length}`}
          icon={<Users />}
        />

        <ReportCard
          title="Active Players"
          value={`${active.length}`}
          icon={
            <ClipboardCheck />
          }
        />

        <ReportCard
          title="Academy Teams"
          value={`${teams.length}`}
          icon={
            <UsersRound />
          }
        />

        <ReportCard
          title="Assessments"
          value={`${assessments.length}`}
          icon={<Target />}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-slate-900">
            Player Report
          </h2>

          <Metric
            label="Boys"
            value={boys}
          />

          <Metric
            label="Girls"
            value={girls}
          />

          {[
            "U7",
            "U9",
            "U11",
            "U13",
            "U15",
            "U17",
            "U19",
          ].map(
            (category) => (
              <Metric
                key={category}
                label={category}
                value={
                  players.filter(
                    (player) =>
                      player.ageCategory ===
                      category,
                  ).length
                }
              />
            ),
          )}
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-slate-900">
            Academy Performance
          </h2>

          <Metric
            label="Attendance Rate"
            value={`${attendanceRate}%`}
          />

          <Metric
            label="Fees Collected"
            value={formatCurrency(
              collected,
            )}
          />

          <Metric
            label="Outstanding Fees"
            value={formatCurrency(
              outstanding,
            )}
          />

          <Metric
            label="Development Assessments"
            value={
              assessments.length
            }
          />
        </section>
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <Banknote className="text-green-600" />

        <h2 className="mt-3 font-bold text-slate-900">
          Finance Summary
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Payment and outstanding
          balance data is calculated
          from the Finance module.
        </p>
      </div>
    </div>
  );
}

function ReportCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-green-600">
        {icon}
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value:
    | string
    | number;
}) {
  return (
    <div className="mt-4 flex justify-between border-b border-slate-100 pb-3">
      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="font-semibold text-slate-800">
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

export default ReportsPage;