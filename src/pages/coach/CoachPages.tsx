import {
  useState,
} from "react";

import type {
  FormEvent,
} from "react";

import {
  Bell,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  FilePlus2,
  Target,
  Users,
  UsersRound,
  XCircle,
} from "lucide-react";

import {
  Link,
} from "react-router";

import {
  PortalButton,
  PortalEmptyState,
  PortalPageHeader,
  PortalStatCard,
  StatusBadge,
  formatPortalDate,
} from "../../components/roles/PortalUI";

import {
  addPortalProgressReport,
  getCoachPlayers,
  getCoachSessions,
  getCoachTeams,
  getPortalAssessments,
  getPortalAttendance,
  getPortalDevelopmentPlans,
  getPortalMessages,
  getPortalProgressReports,
  getTeamName,
  recordCoachAttendance,
  updatePortalSessionStatus,
} from "../../services/rolePortalService";

/* =====================================================
   COACH DASHBOARD
===================================================== */

export function CoachDashboardPage() {
  const teams =
    getCoachTeams();

  const players =
    getCoachPlayers();

  const sessions =
    getCoachSessions();

  const playerIds =
    new Set(
      players.map(
        (player) => player.id,
      ),
    );

  const reports =
    getPortalProgressReports().filter(
      (report) =>
        playerIds.has(
          report.playerId,
        ),
    );

  const upcoming =
    sessions.filter(
      (session) =>
        session.status ===
        "Scheduled",
    );

  return (
    <div className="p-5 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <PortalPageHeader
          eyebrow="Coach Portal"
          title="Dashboard"
          description="Your coaching workspace for teams, players, sessions, attendance and player development."
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <PortalStatCard
            label="Assigned Teams"
            value={teams.length}
            icon={
              <UsersRound
                size={20}
              />
            }
            to="/coach/teams"
            description="View the teams assigned to you."
            actionText="Open teams"
          />

          <PortalStatCard
            label="Players"
            value={players.length}
            icon={
              <Users size={20} />
            }
            to="/coach/players"
            description="View players from your assigned teams."
            actionText="View players"
          />

          <PortalStatCard
            label="Upcoming Sessions"
            value={
              upcoming.length
            }
            icon={
              <CalendarDays
                size={20}
              />
            }
            to="/coach/sessions"
            description="Review and update training sessions."
            actionText="Manage sessions"
          />

          <PortalStatCard
            label="Progress Reports"
            value={reports.length}
            icon={
              <Target size={20} />
            }
            to="/coach/development"
            description="Review and create player development reports."
            actionText="Open development"
          />
        </div>

        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 p-6">
            <div>
              <h2 className="font-bold text-slate-900">
                Next Training Sessions
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your upcoming coaching schedule.
              </p>
            </div>

            <Link
              to="/coach/sessions"
              className="text-sm font-semibold text-green-600"
            >
              View all →
            </Link>
          </div>

          {upcoming.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {upcoming
                .slice(0, 4)
                .map(
                  (session) => (
                    <div
                      key={
                        session.id
                      }
                      className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center"
                    >
                      <div>
                        <p className="font-bold text-slate-900">
                          {
                            session.title
                          }
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          {getTeamName(
                            session.teamId,
                          )}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          {formatPortalDate(
                            session.date,
                          )}{" "}
                          •{" "}
                          {
                            session.startTime
                          }
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Link
                          to="/coach/attendance"
                          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white"
                        >
                          Take Attendance
                        </Link>
                      </div>
                    </div>
                  ),
                )}
            </div>
          ) : (
            <PortalEmptyState
              title="No upcoming sessions"
            />
          )}
        </section>
      </div>
    </div>
  );
}

/* =====================================================
   COACH TEAMS
===================================================== */

export function CoachTeamPage() {
  const teams =
    getCoachTeams();

  const players =
    getCoachPlayers();

  return (
    <div className="p-5 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <PortalPageHeader
          eyebrow="Coach Portal"
          title="My Teams"
          description="Teams currently assigned to you as head coach or assistant coach."
        />

        <div className="mt-6 grid gap-5 xl:grid-cols-2">
          {teams.map(
            (team) => {
              const teamPlayers =
                players.filter(
                  (player) =>
                    player.academyTeam ===
                    team.name,
                );

              return (
                <article
                  key={team.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">
                        {team.name}
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        {
                          team.ageCategory
                        }{" "}
                        •{" "}
                        {
                          team.program
                        }
                      </p>
                    </div>

                    <StatusBadge
                      status={
                        team.status
                      }
                    />
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-4">
                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-xs text-slate-400">
                        Players
                      </p>

                      <p className="mt-1 text-2xl font-bold">
                        {
                          teamPlayers.length
                        }
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-xs text-slate-400">
                        Centre
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        {
                          team.centre
                        }
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <Link
                      to="/coach/players"
                      className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white"
                    >
                      View Players
                    </Link>

                    <Link
                      to="/coach/sessions"
                      className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700"
                    >
                      View Sessions
                    </Link>
                  </div>
                </article>
              );
            },
          )}

          {teams.length === 0 && (
            <div className="xl:col-span-2 rounded-2xl border border-slate-200 bg-white">
              <PortalEmptyState
                title="No teams assigned"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   COACH PLAYERS
===================================================== */

export function CoachPlayersPage() {
  const players =
    getCoachPlayers();

  return (
    <div className="p-5 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <PortalPageHeader
          eyebrow="Coach Portal"
          title="Players"
          description="Players belonging to your assigned teams."
        />

        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {players.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {players.map(
                (player) => (
                  <div
                    key={player.id}
                    className="flex flex-col justify-between gap-4 p-5 md:flex-row md:items-center lg:p-6"
                  >
                    <div>
                      <p className="font-bold text-slate-900">
                        {
                          player.fullName
                        }
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {
                          player.playerId
                        }{" "}
                        •{" "}
                        {
                          player.ageCategory
                        }{" "}
                        •{" "}
                        {
                          player.playingPosition
                        }
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {player.academyTeam ??
                          "No team assigned"}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge
                        status={
                          player.status
                        }
                      />

                      <Link
                        to="/coach/development"
                        className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white"
                      >
                        Development
                      </Link>
                    </div>
                  </div>
                ),
              )}
            </div>
          ) : (
            <PortalEmptyState
              title="No players assigned"
            />
          )}
        </section>
      </div>
    </div>
  );
}

/* =====================================================
   COACH SESSIONS
===================================================== */

export function CoachSessionsPage() {
  const [
    refresh,
    setRefresh,
  ] = useState(0);

  void refresh;

  const sessions =
    getCoachSessions()
      .slice()
      .sort(
        (a, b) =>
          b.date.localeCompare(
            a.date,
          ),
      );

  function changeStatus(
    sessionId: string,
    status:
      | "Scheduled"
      | "Completed"
      | "Cancelled",
  ) {
    updatePortalSessionStatus(
      sessionId,
      status,
    );

    setRefresh(
      (value) =>
        value + 1,
    );
  }

  return (
    <div className="p-5 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <PortalPageHeader
          eyebrow="Coach Portal"
          title="Training Sessions"
          description="Review sessions for your teams and update their status."
        />

        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {sessions.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {sessions.map(
                (session) => (
                  <article
                    key={session.id}
                    className="p-5 lg:p-6"
                  >
                    <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="font-bold text-slate-900">
                            {
                              session.title
                            }
                          </h2>

                          <StatusBadge
                            status={
                              session.status
                            }
                          />
                        </div>

                        <p className="mt-2 text-sm text-slate-500">
                          {getTeamName(
                            session.teamId,
                          )}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          {formatPortalDate(
                            session.date,
                          )}{" "}
                          •{" "}
                          {
                            session.startTime
                          }{" "}
                          –{" "}
                          {
                            session.endTime
                          }
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {
                            session.sessionType
                          }{" "}
                          •{" "}
                          {
                            session.trainingCentre
                          }
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Link
                          to="/coach/attendance"
                          className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white"
                        >
                          Attendance
                        </Link>

                        {session.status !==
                          "Completed" && (
                          <PortalButton
                            variant="secondary"
                            onClick={() =>
                              changeStatus(
                                session.id,
                                "Completed",
                              )
                            }
                          >
                            Mark Completed
                          </PortalButton>
                        )}

                        {session.status !==
                          "Cancelled" && (
                          <PortalButton
                            variant="danger"
                            onClick={() =>
                              changeStatus(
                                session.id,
                                "Cancelled",
                              )
                            }
                          >
                            Cancel
                          </PortalButton>
                        )}
                      </div>
                    </div>
                  </article>
                ),
              )}
            </div>
          ) : (
            <PortalEmptyState
              title="No training sessions"
            />
          )}
        </section>
      </div>
    </div>
  );
}

/* =====================================================
   COACH ATTENDANCE
===================================================== */

export function CoachAttendancePage() {
  const sessions =
    getCoachSessions();

  const players =
    getCoachPlayers();

  const [
    selectedSessionId,
    setSelectedSessionId,
  ] = useState(
    sessions[0]?.id ?? "",
  );

  const [
    refresh,
    setRefresh,
  ] = useState(0);

  void refresh;

  const selectedSession =
    sessions.find(
      (session) =>
        session.id ===
        selectedSessionId,
    );

  const team =
    getCoachTeams().find(
      (item) =>
        item.id ===
        selectedSession?.teamId,
    );

  const sessionPlayers =
    players.filter(
      (player) =>
        player.academyTeam ===
        team?.name,
    );

  const attendance =
    getPortalAttendance();

  function statusFor(
    playerId: string,
  ) {
    return attendance.find(
      (record) =>
        record.sessionId ===
          selectedSessionId &&
        record.playerId ===
          playerId,
    )?.status;
  }

  function setAttendance(
    playerId: string,
    status:
      | "Present"
      | "Absent",
  ) {
    if (!selectedSessionId) {
      return;
    }

    recordCoachAttendance(
      selectedSessionId,
      playerId,
      status,
    );

    setRefresh(
      (value) =>
        value + 1,
    );
  }

  return (
    <div className="p-5 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <PortalPageHeader
          eyebrow="Coach Portal"
          title="Attendance"
          description="Record attendance for players in your training sessions."
        />

        <div className="mt-6 max-w-xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <label className="text-sm font-semibold text-slate-700">
            Training Session
          </label>

          <select
            value={
              selectedSessionId
            }
            onChange={(event) =>
              setSelectedSessionId(
                event.target.value,
              )
            }
            className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm"
          >
            {sessions.map(
              (session) => (
                <option
                  key={
                    session.id
                  }
                  value={
                    session.id
                  }
                >
                  {session.title} -{" "}
                  {session.date}
                </option>
              ),
            )}
          </select>
        </div>

        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {sessionPlayers.length >
          0 ? (
            <div className="divide-y divide-slate-100">
              {sessionPlayers.map(
                (player) => {
                  const status =
                    statusFor(
                      player.id,
                    );

                  return (
                    <div
                      key={
                        player.id
                      }
                      className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center"
                    >
                      <div>
                        <p className="font-bold text-slate-900">
                          {
                            player.fullName
                          }
                        </p>

                        <p className="text-sm text-slate-500">
                          {
                            player.playerId
                          }
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setAttendance(
                              player.id,
                              "Present",
                            )
                          }
                          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold ${
                            status ===
                            "Present"
                              ? "bg-green-600 text-white"
                              : "bg-green-50 text-green-700"
                          }`}
                        >
                          <CheckCircle2
                            size={16}
                          />

                          Present
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setAttendance(
                              player.id,
                              "Absent",
                            )
                          }
                          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold ${
                            status ===
                            "Absent"
                              ? "bg-red-600 text-white"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          <XCircle
                            size={16}
                          />

                          Absent
                        </button>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          ) : (
            <PortalEmptyState
              title="No players for this session"
            />
          )}
        </section>
      </div>
    </div>
  );
}

/* =====================================================
   COACH DEVELOPMENT
===================================================== */

export function CoachDevelopmentPage() {
  const players =
    getCoachPlayers();

  const [
    refresh,
    setRefresh,
  ] = useState(0);

  const [
    playerId,
    setPlayerId,
  ] = useState(
    players[0]?.id ?? "",
  );

  const [
    reportingPeriod,
    setReportingPeriod,
  ] = useState("");

  const [
    comments,
    setComments,
  ] = useState("");

  const [
    recommendations,
    setRecommendations,
  ] = useState("");

  const [
    message,
    setMessage,
  ] = useState("");

  void refresh;

  const playerIds =
    new Set(
      players.map(
        (player) =>
          player.id,
      ),
    );

  const assessments =
    getPortalAssessments().filter(
      (item) =>
        playerIds.has(
          item.playerId,
        ),
    );

  const plans =
    getPortalDevelopmentPlans().filter(
      (item) =>
        playerIds.has(
          item.playerId,
        ),
    );

  const reports =
    getPortalProgressReports().filter(
      (item) =>
        playerIds.has(
          item.playerId,
        ),
    );

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (
      !playerId ||
      !reportingPeriod.trim() ||
      !comments.trim()
    ) {
      return;
    }

    addPortalProgressReport({
      playerId,

      reportingPeriod:
        reportingPeriod.trim(),

      comments:
        comments.trim(),

      recommendations:
        recommendations.trim(),

      createdBy: "Coach",
    });

    setReportingPeriod("");
    setComments("");
    setRecommendations("");

    setMessage(
      "Progress report created successfully.",
    );

    setRefresh(
      (value) =>
        value + 1,
    );
  }

  return (
    <div className="p-5 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <PortalPageHeader
          eyebrow="Coach Portal"
          title="Player Development"
          description="Review development records and create progress reports for your players."
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <PortalStatCard
            label="Assessments"
            value={
              assessments.length
            }
            icon={
              <ClipboardCheck
                size={20}
              />
            }
            description="Recorded technical, tactical, physical and performance assessments."
          />

          <PortalStatCard
            label="Development Plans"
            value={plans.length}
            icon={
              <Target size={20} />
            }
            description="Individual Development Plans for your players."
          />

          <PortalStatCard
            label="Progress Reports"
            value={reports.length}
            icon={
              <FilePlus2
                size={20}
              />
            }
            description="Reports created for players in your teams."
          />
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-3">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-slate-900">
              Create Progress Report
            </h2>

            <form
              onSubmit={
                handleSubmit
              }
              className="mt-5 space-y-4"
            >
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Player
                </label>

                <select
                  value={playerId}
                  onChange={(event) =>
                    setPlayerId(
                      event.target.value,
                    )
                  }
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm"
                >
                  {players.map(
                    (player) => (
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
                        }
                      </option>
                    ),
                  )}
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Reporting Period
                </label>

                <input
                  value={
                    reportingPeriod
                  }
                  onChange={(event) =>
                    setReportingPeriod(
                      event.target.value,
                    )
                  }
                  placeholder="e.g. October 2026"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Comments
                </label>

                <textarea
                  rows={4}
                  value={comments}
                  onChange={(event) =>
                    setComments(
                      event.target.value,
                    )
                  }
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Recommendations
                </label>

                <textarea
                  rows={3}
                  value={
                    recommendations
                  }
                  onChange={(event) =>
                    setRecommendations(
                      event.target.value,
                    )
                  }
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 text-sm"
                />
              </div>

              {message && (
                <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
                  {message}
                </div>
              )}

              <PortalButton
                type="submit"
              >
                <FilePlus2
                  size={17}
                />

                Save Report
              </PortalButton>
            </form>
          </section>

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
            <div className="border-b border-slate-200 p-6">
              <h2 className="font-bold text-slate-900">
                Recent Reports
              </h2>
            </div>

            {reports.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {reports
                  .slice()
                  .reverse()
                  .map(
                    (report) => {
                      const player =
                        players.find(
                          (item) =>
                            item.id ===
                            report.playerId,
                        );

                      return (
                        <article
                          key={
                            report.id
                          }
                          className="p-5"
                        >
                          <h3 className="font-bold text-slate-900">
                            {player?.fullName ??
                              "Player"}
                          </h3>

                          <p className="mt-1 text-sm text-slate-500">
                            {
                              report.reportingPeriod
                            }
                          </p>

                          <p className="mt-3 text-sm leading-6 text-slate-600">
                            {
                              report.comments
                            }
                          </p>
                        </article>
                      );
                    },
                  )}
              </div>
            ) : (
              <PortalEmptyState
                title="No progress reports"
              />
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   COACH ANNOUNCEMENTS
===================================================== */

export function CoachAnnouncementsPage() {
  const messages =
    getPortalMessages()
      .filter(
        (message) =>
          message.audience ===
            "All" ||
          message.audience ===
            "Coaches" ||
          message.audience ===
            "Staff",
      )
      .slice()
      .reverse();

  return (
    <div className="p-5 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <PortalPageHeader
          eyebrow="Coach Portal"
          title="Announcements"
          description="Notices sent to academy coaches and staff."
        />

        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {messages.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {messages.map(
                (message) => (
                  <article
                    key={
                      message.id
                    }
                    className="p-5 lg:p-6"
                  >
                    <div className="flex gap-3">
                      <Bell
                        size={20}
                        className="mt-1 shrink-0 text-green-600"
                      />

                      <div>
                        <h2 className="font-bold text-slate-900">
                          {
                            message.title
                          }
                        </h2>

                        <p className="mt-2 text-xs font-semibold text-slate-400">
                          {
                            message.audience
                          }{" "}
                          •{" "}
                          {
                            message.channel
                          }
                        </p>

                        <p className="mt-3 text-sm leading-7 text-slate-600">
                          {
                            message.message
                          }
                        </p>
                      </div>
                    </div>
                  </article>
                ),
              )}
            </div>
          ) : (
            <PortalEmptyState
              title="No announcements"
            />
          )}
        </section>
      </div>
    </div>
  );
}