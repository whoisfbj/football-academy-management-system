import {
  CalendarDays,
  ClipboardCheck,
  CreditCard,
  FileText,
  Megaphone,
  Trophy,
  UserRound,
} from "lucide-react";

import type {
  ReactNode,
} from "react";

import {
  calculatePlayerAttendancePercentage,
  getAttendanceByPlayer,
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
  getPaymentsByPlayer,
} from "../../services/financeService";

import {
  getPlayerById,
} from "../../services/playerService";

import {
  getSessions,
} from "../../services/sessionService";

import {
  getTeams,
} from "../../services/teamService";

function ParentDashboardPage() {
  /*
   * Prototype relationship:
   * demo parent account is currently linked
   * to John Adeyemi.
   *
   * Later, the backend will connect a parent
   * account to one or more player IDs.
   */
  const player =
    getPlayerById(
      "player-001",
    );

  if (!player) {
    return (
      <div className="min-h-screen bg-slate-100 p-6">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <UserRound
              size={42}
              className="mx-auto text-slate-300"
            />

            <h1 className="mt-4 text-xl font-bold text-slate-900">
              No Player Linked
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              No player is currently linked to
              this parent or guardian account.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /*
   * ATTENDANCE
   */
  const attendanceRecords =
    getAttendanceByPlayer(
      player.id,
    );

  const attendanceRate =
    calculatePlayerAttendancePercentage(
      player.id,
    );

  const presentCount =
    attendanceRecords.filter(
      (record) =>
        record.status ===
        "Present",
    ).length;

  const lateCount =
    attendanceRecords.filter(
      (record) =>
        record.status ===
        "Late Arrival",
    ).length;

  /*
   * FINANCE
   */
  const invoices =
    getInvoicesByPlayer(
      player.id,
    );

  const payments =
    getPaymentsByPlayer(
      player.id,
    )
      .slice()
      .sort(
        (a, b) =>
          b.paymentDate.localeCompare(
            a.paymentDate,
          ),
      );

  const outstandingBalance =
    invoices.reduce(
      (
        total,
        invoice,
      ) =>
        total +
        getInvoiceBalance(
          invoice,
        ),
      0,
    );

  const totalPaid =
    payments.reduce(
      (
        total,
        payment,
      ) =>
        total +
        payment.amount,
      0,
    );

  /*
   * DEVELOPMENT
   */
  const progressReports =
    getProgressReportsByPlayer(
      player.id,
    )
      .slice()
      .sort(
        (a, b) =>
          b.date.localeCompare(
            a.date,
          ),
      );

  /*
   * COMMUNICATION
   */
  const announcements =
    getMessages()
      .filter(
        (message) =>
          message.audience ===
            "All" ||
          message.audience ===
            "Parents",
      )
      .slice()
      .reverse();

  /*
   * TRAINING SCHEDULE
   */
  const teams =
    getTeams();

  const playerTeam =
    player.academyTeam
      ? teams.find(
          (team) =>
            team.name ===
            player.academyTeam,
        )
      : undefined;

  const upcomingSessions =
    getSessions()
      .filter(
        (session) =>
          session.status ===
            "Scheduled" &&
          (!playerTeam ||
            session.teamId ===
              playerTeam.id),
      )
      .sort(
        (a, b) =>
          `${a.date}-${a.startTime}`.localeCompare(
            `${b.date}-${b.startTime}`,
          ),
      );

  return (
    <div className="min-h-screen bg-slate-100">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <div>
            <p className="text-sm font-semibold text-green-600">
              Parent / Guardian Portal
            </p>

            <h1 className="mt-1 text-2xl font-bold text-slate-900">
              Elite Academy
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
              P
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-800">
                Parent / Guardian
              </p>

              <p className="text-xs text-slate-500">
                Parent Portal
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-5 lg:p-8">
        {/* PLAYER INTRODUCTION */}
        <section className="overflow-hidden rounded-xl bg-slate-950 p-6 text-white shadow-sm lg:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            {player.passportPhoto ? (
              <img
                src={
                  player.passportPhoto
                }
                alt={
                  player.fullName
                }
                className="h-24 w-24 rounded-xl object-cover ring-4 ring-white/10"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-white/10">
                <UserRound
                  size={38}
                />
              </div>
            )}

            <div>
              <p className="text-sm font-semibold text-green-400">
                Player Profile
              </p>

              <h2 className="mt-1 text-3xl font-bold">
                {
                  player.fullName
                }
              </h2>

              <p className="mt-2 font-medium text-green-400">
                {
                  player.playerId
                }
              </p>

              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">
                <span>
                  {
                    player.ageCategory
                  }
                </span>

                <span>
                  {
                    player.playingPosition
                  }
                </span>

                <span>
                  {player.academyTeam ??
                    "No Team Assigned"}
                </span>

                <span>
                  {
                    player.status
                  }
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SUMMARY CARDS */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Player Status"
            value={
              player.status
            }
            icon={
              <UserRound
                size={20}
              />
            }
          />

          <SummaryCard
            title="Attendance"
            value={`${attendanceRate}%`}
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
            value={`${progressReports.length}`}
            icon={
              <FileText
                size={20}
              />
            }
          />
        </div>

        {/* MAIN CONTENT */}
        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          {/* TRAINING */}
          <SectionCard
            title="Training Schedule"
            subtitle="Upcoming academy sessions"
            icon={
              <CalendarDays
                size={20}
              />
            }
          >
            {upcomingSessions.length >
            0 ? (
              <div className="space-y-3">
                {upcomingSessions
                  .slice(0, 5)
                  .map(
                    (
                      session,
                    ) => (
                      <InfoRow
                        key={
                          session.id
                        }
                        title={
                          session.title
                        }
                        description={`${formatDate(
                          session.date,
                        )} • ${
                          session.startTime
                        } – ${
                          session.endTime
                        }`}
                        extra={
                          session.trainingCentre
                        }
                      />
                    ),
                  )}
              </div>
            ) : (
              <EmptyState text="No upcoming training sessions." />
            )}
          </SectionCard>

          {/* ANNOUNCEMENTS */}
          <SectionCard
            title="Announcements & Notices"
            subtitle="Messages from the academy"
            icon={
              <Megaphone
                size={20}
              />
            }
          >
            {announcements.length >
            0 ? (
              <div className="space-y-3">
                {announcements
                  .slice(0, 5)
                  .map(
                    (
                      message,
                    ) => (
                      <InfoRow
                        key={
                          message.id
                        }
                        title={
                          message.title
                        }
                        description={
                          message.message
                        }
                        extra={`${message.channel} • ${message.audience}`}
                      />
                    ),
                  )}
              </div>
            ) : (
              <EmptyState text="No announcements available." />
            )}
          </SectionCard>

          {/* ATTENDANCE */}
          <SectionCard
            title="Attendance"
            subtitle="Recent training attendance"
            icon={
              <ClipboardCheck
                size={20}
              />
            }
          >
            <div className="grid gap-3 sm:grid-cols-3">
              <MiniStat
                label="Attendance Rate"
                value={`${attendanceRate}%`}
              />

              <MiniStat
                label="Present"
                value={`${presentCount}`}
              />

              <MiniStat
                label="Late"
                value={`${lateCount}`}
              />
            </div>

            <div className="mt-5 space-y-3">
              {attendanceRecords.length >
              0 ? (
                attendanceRecords
                  .slice()
                  .reverse()
                  .slice(0, 5)
                  .map(
                    (
                      record,
                    ) => (
                      <div
                        key={
                          record.id
                        }
                        className="flex items-center justify-between rounded-lg bg-slate-50 p-4"
                      >
                        <div>
                          <p className="text-sm font-semibold text-slate-700">
                            Training
                            Attendance
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            Recorded
                            attendance
                          </p>
                        </div>

                        <AttendanceBadge
                          status={
                            record.status
                          }
                        />
                      </div>
                    ),
                  )
              ) : (
                <EmptyState text="No attendance records available." />
              )}
            </div>
          </SectionCard>

          {/* PAYMENTS */}
          <SectionCard
            title="Payments"
            subtitle="Academy fees and payment history"
            icon={
              <CreditCard
                size={20}
              />
            }
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <MiniStat
                label="Total Paid"
                value={formatCurrency(
                  totalPaid,
                )}
              />

              <MiniStat
                label="Outstanding"
                value={formatCurrency(
                  outstandingBalance,
                )}
              />
            </div>

            <div className="mt-5 space-y-3">
              {payments.length >
              0 ? (
                payments
                  .slice(0, 5)
                  .map(
                    (
                      payment,
                    ) => (
                      <InfoRow
                        key={
                          payment.id
                        }
                        title={
                          payment.receiptNumber
                        }
                        description={formatCurrency(
                          payment.amount,
                        )}
                        extra={`${formatDate(
                          payment.paymentDate,
                        )} • ${
                          payment.paymentMethod
                        }`}
                      />
                    ),
                  )
              ) : (
                <EmptyState text="No payments have been recorded." />
              )}
            </div>
          </SectionCard>

          {/* DEVELOPMENT REPORTS */}
          <SectionCard
            title="Player Development"
            subtitle="Latest progress reports"
            icon={
              <Trophy
                size={20}
              />
            }
          >
            {progressReports.length >
            0 ? (
              <div className="space-y-3">
                {progressReports
                  .slice(0, 5)
                  .map(
                    (
                      report,
                    ) => (
                      <div
                        key={
                          report.id
                        }
                        className="rounded-lg border border-slate-200 p-4"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-semibold text-slate-800">
                              {
                                report.reportingPeriod
                              }
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              {formatDate(
                                report.date,
                              )}
                            </p>
                          </div>

                          <FileText
                            size={18}
                            className="text-green-600"
                          />
                        </div>

                        <p className="mt-3 text-sm leading-6 text-slate-600">
                          {report.comments ||
                            report.recommendations ||
                            "No comments provided."}
                        </p>
                      </div>
                    ),
                  )}
              </div>
            ) : (
              <EmptyState text="No progress reports available." />
            )}
          </SectionCard>

          {/* PLAYER INFORMATION */}
          <SectionCard
            title="Player Information"
            subtitle="Academy registration details"
            icon={
              <UserRound
                size={20}
              />
            }
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Detail
                label="Age Category"
                value={
                  player.ageCategory
                }
              />

              <Detail
                label="Position"
                value={
                  player.playingPosition
                }
              />

              <Detail
                label="Preferred Foot"
                value={
                  player.preferredFoot
                }
              />

              <Detail
                label="Academy Team"
                value={
                  player.academyTeam ??
                  "Not Assigned"
                }
              />

              <Detail
                label="Program"
                value={
                  player.program
                }
              />

              <Detail
                label="Training Centre"
                value={
                  player.trainingCentre
                }
              />
            </div>
          </SectionCard>
        </div>

        {/* CONTACT */}
        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-slate-900">
            Contact Academy
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            For questions about training,
            attendance, player development,
            academy fees, tournaments or other
            academy activities, contact the
            academy administration.
          </p>

          <button
            type="button"
            className="mt-5 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
          >
            Contact Academy
          </button>
        </section>
      </main>
    </div>
  );
}

/* ===================================================== */
/* COMPONENTS */
/* ===================================================== */

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
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
        {icon}
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function SectionCard({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
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

      <div className="mt-6">
        {children}
      </div>
    </section>
  );
}

function InfoRow({
  title,
  description,
  extra,
}: {
  title: string;
  description: string;
  extra?: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <p className="font-semibold text-slate-800">
        {title}
      </p>

      <p className="mt-1 text-sm text-slate-600">
        {description}
      </p>

      {extra && (
        <p className="mt-2 text-xs text-slate-400">
          {extra}
        </p>
      )}
    </div>
  );
}

function MiniStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg bg-slate-50 p-4">
      <p className="text-xl font-bold text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {label}
      </p>
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
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-700">
        {value}
      </p>
    </div>
  );
}

function EmptyState({
  text,
}: {
  text: string;
}) {
  return (
    <div className="rounded-lg bg-slate-50 p-6 text-center text-sm text-slate-500">
      {text}
    </div>
  );
}

function AttendanceBadge({
  status,
}: {
  status: string;
}) {
  const style =
    status === "Present"
      ? "bg-green-50 text-green-700"
      : status ===
          "Late Arrival"
        ? "bg-amber-50 text-amber-700"
        : status ===
            "Excused Absence"
          ? "bg-blue-50 text-blue-700"
          : "bg-red-50 text-red-700";

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${style}`}
    >
      {status}
    </span>
  );
}

/* ===================================================== */
/* UTILITIES */
/* ===================================================== */

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