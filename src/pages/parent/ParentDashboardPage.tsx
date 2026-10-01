import type { ReactNode } from "react";

import { Link } from "react-router";

import {
  Bell,
  CalendarDays,
  ClipboardCheck,
  CreditCard,
  FileText,
  Trophy,
  UserRound,
} from "lucide-react";

import {
  calculatePlayerAttendancePercentage,
} from "../../services/attendanceService";

import {
  getMessages,
} from "../../services/communicationService";

import {
  getProgressReportsByPlayer,
} from "../../services/developmentService";

import {
  getInvoiceBalance,
  getInvoicesByPlayer,
} from "../../services/financeService";

import {
  getPrimaryLinkedPlayer,
} from "../../services/parentService";

import {
  getSessions,
} from "../../services/sessionService";

import {
  getTeams,
} from "../../services/teamService";

import {
  getTournamentsByTeam,
} from "../../services/tournamentService";

function ParentDashboardPage() {
  const linkedPlayer =
    getPrimaryLinkedPlayer();

  if (!linkedPlayer) {
    return (
      <div className="p-5 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <UserRound
              size={38}
              className="mx-auto text-slate-300"
            />

            <h1 className="mt-4 text-xl font-bold text-slate-900">
              No Player Linked
            </h1>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              No player is currently linked to this parent or guardian account.
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

  const teamName =
    linkedPlayer.academyTeam;

  const attendancePercentage =
    calculatePlayerAttendancePercentage(
      playerId,
    );

  const invoices =
    getInvoicesByPlayer(
      playerId,
    );

  const outstandingBalance =
    invoices.reduce(
      (total, invoice) =>
        total +
        getInvoiceBalance(
          invoice,
        ),
      0,
    );

  const reports =
    getProgressReportsByPlayer(
      playerId,
    )
      .slice()
      .sort(
        (a, b) =>
          b.date.localeCompare(
            a.date,
          ),
      );

  const latestReport =
    reports[0];

  const announcements =
    getMessages()
      .filter(
        (message) =>
          message.audience ===
            "Parents" ||
          message.audience ===
            "All",
      )
      .slice()
      .reverse();

  const latestAnnouncement =
    announcements[0];

  const teams =
    getTeams();

  const playerTeam =
    teams.find(
      (team) =>
        team.name ===
        teamName,
    );

  const sessions =
    getSessions()
      .filter(
        (session) =>
          playerTeam &&
          session.teamId ===
            playerTeam.id,
      )
      .slice()
      .sort(
        (a, b) =>
          a.date.localeCompare(
            b.date,
          ),
      );

  const upcomingSessions =
    sessions.filter(
      (session) =>
        session.status ===
        "Scheduled",
    );

  const nextSession =
    upcomingSessions[0];

  const tournaments =
    teamName
      ? getTournamentsByTeam(
          teamName,
        )
      : [];

  const nextTournament =
    tournaments
      .filter(
        (tournament) =>
          tournament.status ===
          "Upcoming",
      )
      .sort(
        (a, b) =>
          a.startDate.localeCompare(
            b.startDate,
          ),
      )[0];

  return (
    <div className="p-5 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}

        <div>
          <p className="text-sm font-semibold text-green-600">
            Parent / Guardian Portal
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-950 lg:text-3xl">
            Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Follow {playerName}'s
            academy activity,
            development, attendance and
            payments.
          </p>
        </div>

        {/* PLAYER HERO */}

        <section className="mt-6 rounded-2xl bg-slate-950 p-6 text-white shadow-sm">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-sm text-slate-400">
                Linked Player
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                {playerName}
              </h2>

              <p className="mt-2 text-sm font-semibold text-green-400">
                {
                  linkedPlayer.playerId
                }{" "}
                •{" "}
                {
                  linkedPlayer.ageCategory
                }{" "}
                •{" "}
                {teamName ??
                  "No Team Assigned"}
              </p>
            </div>

            <Link
              to="/parent/player"
              className="inline-flex items-center justify-center rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              View Player Profile
            </Link>
          </div>
        </section>

        {/* SUMMARY */}

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Attendance"
            value={`${attendancePercentage}%`}
            icon={
              <ClipboardCheck
                size={20}
              />
            }
          />

          <SummaryCard
            title="Outstanding Fees"
            value={formatCurrency(
              outstandingBalance,
            )}
            icon={
              <CreditCard
                size={20}
              />
            }
          />

          <SummaryCard
            title="Progress Reports"
            value={`${reports.length}`}
            icon={
              <FileText
                size={20}
              />
            }
          />

          <SummaryCard
            title="Upcoming Training"
            value={`${upcomingSessions.length}`}
            icon={
              <CalendarDays
                size={20}
              />
            }
          />
        </div>

        {/* INFORMATION GRID */}

        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          {/* NEXT TRAINING */}

          <DashboardSection
            title="Next Training Session"
            icon={
              <CalendarDays
                size={20}
              />
            }
            link="/parent/schedule"
            linkText="View Schedule"
          >
            {nextSession ? (
              <div>
                <h3 className="font-bold text-slate-900">
                  {
                    nextSession.title
                  }
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  {formatDate(
                    nextSession.date,
                  )}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {
                    nextSession.startTime
                  }{" "}
                  –{" "}
                  {
                    nextSession.endTime
                  }
                </p>

                <span className="mt-4 inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                  {
                    nextSession.sessionType
                  }
                </span>
              </div>
            ) : (
              <EmptyText text="No upcoming training sessions." />
            )}
          </DashboardSection>

          {/* PAYMENT */}

          <DashboardSection
            title="Payment Status"
            icon={
              <CreditCard
                size={20}
              />
            }
            link="/parent/payments"
            linkText="View Payments"
          >
            <p className="text-sm text-slate-500">
              Current outstanding
              balance
            </p>

            <p className="mt-2 text-2xl font-bold text-slate-950">
              {formatCurrency(
                outstandingBalance,
              )}
            </p>

            <p className="mt-3 text-sm text-slate-500">
              {invoices.length} invoice
              {invoices.length === 1
                ? ""
                : "s"}{" "}
              on this player account.
            </p>
          </DashboardSection>

          {/* REPORT */}

          <DashboardSection
            title="Latest Player Report"
            icon={
              <FileText
                size={20}
              />
            }
            link="/parent/reports"
            linkText="View Reports"
          >
            {latestReport ? (
              <>
                <h3 className="font-bold text-slate-900">
                  {
                    latestReport.reportingPeriod
                  }
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  {formatDate(
                    latestReport.date,
                  )}
                </p>

                <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">
                  {
                    latestReport.comments
                  }
                </p>
              </>
            ) : (
              <EmptyText text="No player reports available." />
            )}
          </DashboardSection>

          {/* ANNOUNCEMENTS */}

          <DashboardSection
            title="Latest Announcement"
            icon={<Bell size={20} />}
            link="/parent/announcements"
            linkText="View Announcements"
          >
            {latestAnnouncement ? (
              <>
                <h3 className="font-bold text-slate-900">
                  {
                    latestAnnouncement.title
                  }
                </h3>

                <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-600">
                  {
                    latestAnnouncement.message
                  }
                </p>
              </>
            ) : (
              <EmptyText text="No announcements available." />
            )}
          </DashboardSection>

          {/* TOURNAMENT */}

          <DashboardSection
            title="Tournament Information"
            icon={
              <Trophy size={20} />
            }
            link="/parent/tournaments"
            linkText="View Tournaments"
          >
            {nextTournament ? (
              <>
                <h3 className="font-bold text-slate-900">
                  {
                    nextTournament.name
                  }
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  {formatDate(
                    nextTournament.startDate,
                  )}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {
                    nextTournament.venue
                  }
                  ,{" "}
                  {
                    nextTournament.city
                  }
                </p>
              </>
            ) : (
              <EmptyText text="No upcoming tournament information." />
            )}
          </DashboardSection>

          {/* QUICK ACTIONS */}

          <DashboardSection
            title="Quick Actions"
            icon={
              <UserRound
                size={20}
              />
            }
          >
            <div className="grid gap-2 sm:grid-cols-2">
              <QuickLink
                to="/parent/attendance"
                text="Attendance"
              />

              <QuickLink
                to="/parent/receipts"
                text="Receipts"
              />

              <QuickLink
                to="/parent/player"
                text="Player Profile"
              />

              <QuickLink
                to="/parent/contact"
                text="Contact Academy"
              />
            </div>
          </DashboardSection>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
        {icon}
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-1 break-words text-2xl font-bold text-slate-950">
        {value}
      </p>
    </div>
  );
}

function DashboardSection({
  title,
  icon,
  children,
  link,
  linkText,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  link?: string;
  linkText?: string;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
            {icon}
          </div>

          <h2 className="font-bold text-slate-900">
            {title}
          </h2>
        </div>

        {link && linkText && (
          <Link
            to={link}
            className="text-sm font-semibold text-green-600 hover:text-green-700"
          >
            {linkText}
          </Link>
        )}
      </div>

      <div className="mt-5">
        {children}
      </div>
    </section>
  );
}

function QuickLink({
  to,
  text,
}: {
  to: string;
  text: string;
}) {
  return (
    <Link
      to={to}
      className="rounded-lg border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
    >
      {text}
    </Link>
  );
}

function EmptyText({
  text,
}: {
  text: string;
}) {
  return (
    <p className="text-sm text-slate-500">
      {text}
    </p>
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
      month: "long",
      year: "numeric",
    },
  );
}

export default ParentDashboardPage;