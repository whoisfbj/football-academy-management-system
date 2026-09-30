import type { ReactNode } from "react";
import { Link } from "react-router";

import {
  ArrowRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  FileText,
  MapPin,
  ReceiptText,
  Trophy,
  UserRound,
  WalletCards,
} from "lucide-react";

import {
  calculatePlayerAttendancePercentage,
  getAttendanceByPlayer,
} from "../../services/attendanceService";

import { getMessages } from "../../services/communicationService";

import { getProgressReportsByPlayer } from "../../services/developmentService";

import {
  getInvoiceBalance,
  getInvoicesByPlayer,
  getPaymentsByPlayer,
} from "../../services/financeService";

import { getPlayerById } from "../../services/playerService";

import { getSessions } from "../../services/sessionService";

import { getTeams } from "../../services/teamService";

function ParentDashboardPage() {
  /*
   * PROTOTYPE LINK
   *
   * The demo parent account is currently linked
   * to John Adeyemi.
   *
   * Later we can replace this with a proper
   * parent -> player relationship.
   */
  const player = getPlayerById("player-001");

  if (!player) {
    return (
      <div className="p-5 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <UserRound size={28} />
            </div>

            <h1 className="mt-5 text-xl font-bold text-slate-900">
              No Player Linked
            </h1>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              There is currently no player linked to this parent or guardian
              account.
            </p>

            <Link
              to="/parent/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              Contact Academy
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* =====================================================
     ATTENDANCE
  ===================================================== */

  const attendanceRecords = getAttendanceByPlayer(player.id);

  const attendanceRate =
    calculatePlayerAttendancePercentage(player.id);

  const presentCount = attendanceRecords.filter(
    (record) => record.status === "Present",
  ).length;

  const lateCount = attendanceRecords.filter(
    (record) => record.status === "Late Arrival",
  ).length;

  const absentCount = attendanceRecords.filter(
    (record) => record.status === "Absent",
  ).length;

  const excusedCount = attendanceRecords.filter(
    (record) => record.status === "Excused Absence",
  ).length;

  /* =====================================================
     FINANCE
  ===================================================== */

  const invoices = getInvoicesByPlayer(player.id);

  const payments = getPaymentsByPlayer(player.id)
    .slice()
    .sort((a, b) =>
      b.paymentDate.localeCompare(a.paymentDate),
    );

  const outstandingBalance = invoices.reduce(
    (total, invoice) =>
      total + getInvoiceBalance(invoice),
    0,
  );

  const totalPaid = payments.reduce(
    (total, payment) =>
      total + payment.amount,
    0,
  );

  const unpaidInvoices = invoices.filter(
    (invoice) =>
      getInvoiceBalance(invoice) > 0,
  );

  /* =====================================================
     PLAYER REPORTS
  ===================================================== */

  const progressReports =
    getProgressReportsByPlayer(player.id)
      .slice()
      .sort((a, b) =>
        b.date.localeCompare(a.date),
      );

  const latestReport =
    progressReports[0];

  /* =====================================================
     ANNOUNCEMENTS
  ===================================================== */

  const announcements = getMessages()
    .filter(
      (message) =>
        message.audience === "All" ||
        message.audience === "Parents",
    )
    .slice()
    .reverse();

  const latestAnnouncement =
    announcements[0];

  /* =====================================================
     TEAM + TRAINING SCHEDULE
  ===================================================== */

  const teams = getTeams();

  const playerTeam = player.academyTeam
    ? teams.find(
        (team) =>
          team.name === player.academyTeam,
      )
    : undefined;

  const upcomingSessions = getSessions()
    .filter((session) => {
      if (session.status !== "Scheduled") {
        return false;
      }

      if (!playerTeam) {
        return true;
      }

      return session.teamId === playerTeam.id;
    })
    .sort((a, b) =>
      `${a.date}-${a.startTime}`.localeCompare(
        `${b.date}-${b.startTime}`,
      ),
    );

  const nextSession =
    upcomingSessions[0];

  return (
    <div className="p-5 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* =================================================
            PAGE HEADING
        ================================================= */}

        <div className="mb-6">
          <p className="text-sm font-semibold text-green-600">
            Parent / Guardian Portal
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-950 lg:text-3xl">
            Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Follow your player's academy activities,
            development, attendance and payments.
          </p>
        </div>

        {/* =================================================
            PLAYER HERO CARD
        ================================================= */}

        <section className="relative overflow-hidden rounded-2xl bg-slate-950 p-6 text-white shadow-sm lg:p-8">
          <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-green-500/10 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              {player.passportPhoto ? (
                <img
                  src={player.passportPhoto}
                  alt={player.fullName}
                  className="h-24 w-24 rounded-2xl object-cover ring-4 ring-white/10"
                />
              ) : (
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white">
                  <UserRound size={38} />
                </div>
              )}

              <div>
                <p className="text-sm font-semibold text-green-400">
                  My Player
                </p>

                <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                  {player.fullName}
                </h2>

                <p className="mt-2 font-medium text-green-400">
                  {player.playerId}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <PlayerTag text={player.ageCategory} />

                  <PlayerTag
                    text={player.playingPosition}
                  />

                  <PlayerTag
                    text={
                      player.academyTeam ??
                      "No Team Assigned"
                    }
                  />

                  <PlayerTag text={player.status} />
                </div>
              </div>
            </div>

            <Link
              to="/parent/player"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              View Player Profile
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* =================================================
            SUMMARY CARDS
        ================================================= */}

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Attendance"
            value={`${attendanceRate}%`}
            description={`${presentCount} present records`}
            icon={
              <ClipboardCheck size={21} />
            }
            link="/parent/attendance"
          />

          <SummaryCard
            title="Outstanding Fees"
            value={formatCurrency(
              outstandingBalance,
            )}
            description={
              unpaidInvoices.length > 0
                ? `${unpaidInvoices.length} unpaid invoice${
                    unpaidInvoices.length === 1
                      ? ""
                      : "s"
                  }`
                : "No outstanding fees"
            }
            icon={<CreditCard size={21} />}
            link="/parent/payments"
          />

          <SummaryCard
            title="Player Reports"
            value={`${progressReports.length}`}
            description="Progress reports available"
            icon={<FileText size={21} />}
            link="/parent/reports"
          />

          <SummaryCard
            title="Announcements"
            value={`${announcements.length}`}
            description="Academy notices available"
            icon={<Bell size={21} />}
            link="/parent/announcements"
          />
        </div>

        {/* =================================================
            MAIN DASHBOARD
        ================================================= */}

        <div className="mt-6 grid gap-6 xl:grid-cols-3">
          {/* NEXT TRAINING */}

          <div className="xl:col-span-2">
            <DashboardSection
              title="Next Training Session"
              subtitle="Upcoming academy training"
              icon={<CalendarDays size={20} />}
              actionLabel="View Schedule"
              actionLink="/parent/schedule"
            >
              {nextSession ? (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                    <div>
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        {nextSession.sessionType}
                      </span>

                      <h3 className="mt-4 text-lg font-bold text-slate-900">
                        {nextSession.title}
                      </h3>

                      <div className="mt-4 space-y-2">
                        <SessionDetail
                          icon={
                            <CalendarDays
                              size={16}
                            />
                          }
                          text={`${formatDate(
                            nextSession.date,
                          )} • ${
                            nextSession.startTime
                          } – ${
                            nextSession.endTime
                          }`}
                        />

                        <SessionDetail
                          icon={
                            <MapPin size={16} />
                          }
                          text={
                            nextSession.trainingCentre
                          }
                        />
                      </div>
                    </div>

                    <div className="rounded-xl bg-white p-4 text-center shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Team
                      </p>

                      <p className="mt-2 text-sm font-bold text-slate-800">
                        {player.academyTeam ??
                          "Not Assigned"}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <EmptyState
                  icon={
                    <CalendarDays size={25} />
                  }
                  title="No upcoming sessions"
                  description="There are currently no scheduled training sessions for this player."
                />
              )}
            </DashboardSection>
          </div>

          {/* ATTENDANCE SUMMARY */}

          <DashboardSection
            title="Attendance"
            subtitle="Current attendance record"
            icon={
              <ClipboardCheck size={20} />
            }
            actionLabel="View Attendance"
            actionLink="/parent/attendance"
          >
            <div className="text-center">
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-8 border-green-100">
                <span className="text-2xl font-bold text-slate-950">
                  {attendanceRate}%
                </span>
              </div>

              <p className="mt-3 text-sm text-slate-500">
                Overall attendance
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <AttendanceStat
                label="Present"
                value={presentCount}
              />

              <AttendanceStat
                label="Late"
                value={lateCount}
              />

              <AttendanceStat
                label="Absent"
                value={absentCount}
              />

              <AttendanceStat
                label="Excused"
                value={excusedCount}
              />
            </div>
          </DashboardSection>

          {/* PAYMENT STATUS */}

          <DashboardSection
            title="Payment Status"
            subtitle="Academy fees and payments"
            icon={<WalletCards size={20} />}
            actionLabel="View Payments"
            actionLink="/parent/payments"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <FinanceStat
                label="Total Paid"
                value={formatCurrency(totalPaid)}
              />

              <FinanceStat
                label="Outstanding"
                value={formatCurrency(
                  outstandingBalance,
                )}
              />
            </div>

            {outstandingBalance > 0 ? (
              <Link
                to="/parent/payments"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
              >
                Make Payment
                <ArrowRight size={16} />
              </Link>
            ) : (
              <div className="mt-5 flex items-center gap-3 rounded-lg bg-green-50 p-4 text-sm font-medium text-green-700">
                <CheckCircle2 size={19} />
                No outstanding fees
              </div>
            )}

            {payments.length > 0 && (
              <Link
                to="/parent/receipts"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <ReceiptText size={16} />
                View Receipts
              </Link>
            )}
          </DashboardSection>

          {/* LATEST PLAYER REPORT */}

          <DashboardSection
            title="Latest Player Report"
            subtitle="Player development update"
            icon={<FileText size={20} />}
            actionLabel="View Reports"
            actionLink="/parent/reports"
          >
            {latestReport ? (
              <div className="rounded-xl border border-slate-200 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-slate-900">
                      {
                        latestReport.reportingPeriod
                      }
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {formatDate(
                        latestReport.date,
                      )}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
                    <FileText size={19} />
                  </div>
                </div>

                <p className="mt-4 line-clamp-4 text-sm leading-6 text-slate-600">
                  {latestReport.comments ||
                    latestReport.recommendations ||
                    "A new progress report is available for this player."}
                </p>
              </div>
            ) : (
              <EmptyState
                icon={<FileText size={25} />}
                title="No reports yet"
                description="No player progress reports have been published yet."
              />
            )}
          </DashboardSection>

          {/* ANNOUNCEMENTS */}

          <DashboardSection
            title="Latest Announcement"
            subtitle="News from the academy"
            icon={<Bell size={20} />}
            actionLabel="View All"
            actionLink="/parent/announcements"
          >
            {latestAnnouncement ? (
              <div className="rounded-xl border border-slate-200 p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                    <Bell size={19} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      {
                        latestAnnouncement.title
                      }
                    </h3>

                    <p className="mt-2 line-clamp-4 text-sm leading-6 text-slate-600">
                      {
                        latestAnnouncement.message
                      }
                    </p>

                    <div className="mt-3 flex gap-2">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
                        {
                          latestAnnouncement.channel
                        }
                      </span>

                      <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
                        {
                          latestAnnouncement.audience
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <EmptyState
                icon={<Bell size={25} />}
                title="No announcements"
                description="There are currently no academy announcements."
              />
            )}
          </DashboardSection>
        </div>

        {/* =================================================
            TOURNAMENT INFORMATION
        ================================================= */}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <Trophy size={21} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Tournament Information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Upcoming competitions and academy
                  tournament updates.
                </p>
              </div>
            </div>

            <Link
              to="/parent/tournaments"
              className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700"
            >
              View Tournaments
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-7 text-center">
            <Trophy
              size={28}
              className="mx-auto text-slate-300"
            />

            <p className="mt-3 font-semibold text-slate-700">
              Tournament information will appear here
            </p>

            <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-slate-500">
              Parents will be able to receive tournament
              dates, venues, participating teams and other
              competition information.
            </p>
          </div>
        </section>

        {/* =================================================
            QUICK LINKS
        ================================================= */}

        <section className="mt-6">
          <h2 className="text-lg font-bold text-slate-900">
            Quick Actions
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <QuickAction
              icon={<UserRound size={21} />}
              title="Player Profile"
              description="View complete player information."
              link="/parent/player"
            />

            <QuickAction
              icon={<CreditCard size={21} />}
              title="Make Payment"
              description="View fees and make academy payments."
              link="/parent/payments"
            />

            <QuickAction
              icon={<ReceiptText size={21} />}
              title="Receipts"
              description="View and download payment receipts."
              link="/parent/receipts"
            />

            <QuickAction
              icon={<Bell size={21} />}
              title="Announcements"
              description="Read the latest academy notices."
              link="/parent/announcements"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

/* =====================================================
   COMPONENTS
===================================================== */

function PlayerTag({
  text,
}: {
  text: string;
}) {
  return (
    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-slate-200">
      {text}
    </span>
  );
}

function SummaryCard({
  title,
  value,
  description,
  icon,
  link,
}: {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
  link: string;
}) {
  return (
    <Link
      to={link}
      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-green-200 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
          {icon}
        </div>

        <ArrowRight
          size={17}
          className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-green-600"
        />
      </div>

      <p className="mt-5 text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold text-slate-950">
        {value}
      </p>

      <p className="mt-2 text-xs text-slate-400">
        {description}
      </p>
    </Link>
  );
}

function DashboardSection({
  title,
  subtitle,
  icon,
  actionLabel,
  actionLink,
  children,
}: {
  title: string;
  subtitle: string;
  icon: ReactNode;
  actionLabel?: string;
  actionLink?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
            {icon}
          </div>

          <div>
            <h2 className="font-bold text-slate-900">
              {title}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {subtitle}
            </p>
          </div>
        </div>

        {actionLabel && actionLink && (
          <Link
            to={actionLink}
            className="hidden items-center gap-1 text-xs font-semibold text-green-600 hover:text-green-700 sm:flex"
          >
            {actionLabel}
            <ArrowRight size={14} />
          </Link>
        )}
      </div>

      <div className="mt-6">{children}</div>

      {actionLabel && actionLink && (
        <Link
          to={actionLink}
          className="mt-5 flex items-center gap-1 text-sm font-semibold text-green-600 sm:hidden"
        >
          {actionLabel}
          <ArrowRight size={14} />
        </Link>
      )}
    </section>
  );
}

function SessionDetail({
  icon,
  text,
}: {
  icon: ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-500">
      <span className="text-green-600">
        {icon}
      </span>

      {text}
    </div>
  );
}

function AttendanceStat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-lg bg-slate-50 p-3 text-center">
      <p className="text-lg font-bold text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {label}
      </p>
    </div>
  );
}

function FinanceStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs font-medium text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-lg font-bold text-slate-950">
        {value}
      </p>
    </div>
  );
}

function QuickAction({
  icon,
  title,
  description,
  link,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  link: string;
}) {
  return (
    <Link
      to={link}
      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-green-200 hover:shadow-md"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
        {icon}
      </div>

      <h3 className="mt-4 font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>

      <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-green-600">
        Open
        <ArrowRight
          size={15}
          className="transition group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}

function EmptyState({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-7 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-300">
        {icon}
      </div>

      <p className="mt-3 font-semibold text-slate-700">
        {title}
      </p>

      <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}

/* =====================================================
   UTILITIES
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

export default ParentDashboardPage;