import {
  useState,
} from "react";

import type {
  FormEvent,
} from "react";

import {
  BarChart3,
  CalendarDays,
  ClipboardCheck,
  FilePlus2,
  Shield,
  Target,
  Users,
  UsersRound,
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
  getPortalAssessments,
  getPortalDevelopmentPlans,
  getPortalPlayers,
  getPortalProgressReports,
  getPortalScoutingReports,
  getPortalSessions,
  getPortalTeams,
  getTeamName,
  updatePortalSessionStatus,
  updatePortalTeamStatus,
} from "../../services/rolePortalService";

/* =====================================================
   DASHBOARD
===================================================== */

export function TechnicalDirectorDashboardPage() {
  const players =
    getPortalPlayers();

  const teams =
    getPortalTeams();

  const sessions =
    getPortalSessions();

  const reports =
    getPortalProgressReports();

  const coachIds =
    new Set<string>();

  teams.forEach((team) => {
    if (team.headCoachId) {
      coachIds.add(
        team.headCoachId,
      );
    }

    if (
      team.assistantCoachId
    ) {
      coachIds.add(
        team.assistantCoachId,
      );
    }
  });

  return (
    <div className="w-full min-w-0 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-7xl min-w-0">
        <PortalPageHeader
          eyebrow="Technical Director Portal"
          title="Dashboard"
          description="Technical oversight of academy players, teams, coaches, training and development."
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <PortalStatCard
            label="Players"
            value={players.length}
            icon={
              <Users size={20} />
            }
            to="/technical-director/development"
            description="Review academy-wide player development."
            actionText="Review players"
          />

          <PortalStatCard
            label="Academy Teams"
            value={teams.length}
            icon={
              <Shield size={20} />
            }
            to="/technical-director/teams"
            description="Inspect team setup and activation status."
            actionText="Manage teams"
          />

          <PortalStatCard
            label="Assigned Coaches"
            value={coachIds.size}
            icon={
              <UsersRound
                size={20}
              />
            }
            to="/technical-director/coaches"
            description="Review team coaching assignments."
            actionText="View coaches"
          />

          <PortalStatCard
            label="Training Sessions"
            value={
              sessions.length
            }
            icon={
              <CalendarDays
                size={20}
              />
            }
            to="/technical-director/sessions"
            description="Review and update training activity."
            actionText="Manage sessions"
          />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <PortalStatCard
            label="Progress Reports"
            value={reports.length}
            icon={
              <Target size={20} />
            }
            to="/technical-director/development"
            description="Review and create development reports."
          />

          <PortalStatCard
            label="Technical Reports"
            value="Open"
            icon={
              <BarChart3
                size={20}
              />
            }
            to="/technical-director/reports"
            description="View academy technical statistics."
            actionText="Open reports"
          />
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   TEAMS
===================================================== */

export function TechnicalDirectorTeamsPage() {
  const [
    refresh,
    setRefresh,
  ] = useState(0);

  void refresh;

  const teams =
    getPortalTeams();

  const players =
    getPortalPlayers();

  function toggleTeam(
    teamId: string,
    currentStatus:
      | "Active"
      | "Inactive",
  ) {
    updatePortalTeamStatus(
      teamId,
      currentStatus ===
        "Active"
        ? "Inactive"
        : "Active",
    );

    setRefresh(
      (value) =>
        value + 1,
    );
  }

  return (
    <div className="w-full min-w-0 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-7xl min-w-0">
        <PortalPageHeader
          eyebrow="Technical Director Portal"
          title="Academy Teams"
          description="Review team structure and control whether a team is active."
        />

        <div className="mt-6 grid gap-5 xl:grid-cols-2">
          {teams.map(
            (team) => {
              const count =
                players.filter(
                  (player) =>
                    player.academyTeam ===
                    team.name,
                ).length;

              return (
                <article
                  key={team.id}
                  className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm"
                >
                  <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">
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

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <Info
                      label="Players"
                      value={`${count}`}
                    />

                    <Info
                      label="Head Coach"
                      value={
                        team.headCoachId ??
                        "Not assigned"
                      }
                    />

                    <Info
                      label="Branch"
                      value={
                        team.branch
                      }
                    />

                    <Info
                      label="Centre"
                      value={
                        team.centre
                      }
                    />
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <PortalButton
                      variant={
                        team.status ===
                        "Active"
                          ? "danger"
                          : "primary"
                      }
                      onClick={() =>
                        toggleTeam(
                          team.id,
                          team.status,
                        )
                      }
                    >
                      {team.status ===
                      "Active"
                        ? "Deactivate Team"
                        : "Activate Team"}
                    </PortalButton>

                    <Link
                      to="/technical-director/sessions"
                      className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700"
                    >
                      View Sessions
                    </Link>
                  </div>
                </article>
              );
            },
          )}
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   COACHES
===================================================== */

export function TechnicalDirectorCoachesPage() {
  const teams =
    getPortalTeams();

  const assignments =
    new Map<
      string,
      string[]
    >();

  teams.forEach((team) => {
    if (team.headCoachId) {
      const current =
        assignments.get(
          team.headCoachId,
        ) ?? [];

      assignments.set(
        team.headCoachId,
        [
          ...current,
          `${team.name} — Head Coach`,
        ],
      );
    }

    if (
      team.assistantCoachId
    ) {
      const current =
        assignments.get(
          team.assistantCoachId,
        ) ?? [];

      assignments.set(
        team.assistantCoachId,
        [
          ...current,
          `${team.name} — Assistant Coach`,
        ],
      );
    }
  });

  const coaches =
    Array.from(
      assignments.entries(),
    );

  return (
    <div className="w-full min-w-0 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-7xl min-w-0">
        <PortalPageHeader
          eyebrow="Technical Director Portal"
          title="Coaches"
          description="Review how coaches are assigned across academy teams."
        />

        <div className="mt-6 grid gap-5 xl:grid-cols-2">
          {coaches.map(
            ([
              coachId,
              assignments,
            ]) => (
              <article
                key={coachId}
                className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <UsersRound
                    size={21}
                  />
                </div>

                <h2 className="mt-4 font-bold text-slate-900">
                  Coach {coachId}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {assignments.length}{" "}
                  assignment
                  {assignments.length ===
                  1
                    ? ""
                    : "s"}
                </p>

                <div className="mt-4 space-y-2">
                  {assignments.map(
                    (
                      assignment,
                    ) => (
                      <div
                        key={
                          assignment
                        }
                        className="rounded-lg bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700"
                      >
                        {
                          assignment
                        }
                      </div>
                    ),
                  )}
                </div>

                <Link
                  to="/technical-director/teams"
                  className="mt-5 inline-flex rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white"
                >
                  Review Teams
                </Link>
              </article>
            ),
          )}

          {coaches.length === 0 && (
            <div className="xl:col-span-2 rounded-2xl border border-slate-200 bg-white">
              <PortalEmptyState
                title="No coach assignments"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   SESSIONS
===================================================== */

export function TechnicalDirectorSessionsPage() {
  const [
    refresh,
    setRefresh,
  ] = useState(0);

  void refresh;

  const sessions =
    getPortalSessions()
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
    <div className="w-full min-w-0 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-7xl min-w-0">
        <PortalPageHeader
          eyebrow="Technical Director Portal"
          title="Training Sessions"
          description="Monitor training activity across the academy and update session status."
        />

        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {sessions.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {sessions.map(
                (session) => (
                  <div
                    key={
                      session.id
                    }
                    className="p-4 sm:p-5 lg:p-6"
                  >
                    <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-bold text-slate-900">
                            {
                              session.title
                            }
                          </p>

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
                      </div>

                      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap">
                        <PortalButton
                          variant="secondary"
                          onClick={() =>
                            changeStatus(
                              session.id,
                              "Scheduled",
                            )
                          }
                        >
                          Scheduled
                        </PortalButton>

                        <PortalButton
                          onClick={() =>
                            changeStatus(
                              session.id,
                              "Completed",
                            )
                          }
                        >
                          Completed
                        </PortalButton>

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
                      </div>
                    </div>
                  </div>
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
   DEVELOPMENT
===================================================== */

export function TechnicalDirectorDevelopmentPage() {
  const players =
    getPortalPlayers();

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
    period,
    setPeriod,
  ] = useState("");

  const [
    comments,
    setComments,
  ] = useState("");

  const [
    recommendations,
    setRecommendations,
  ] = useState("");

  void refresh;

  const assessments =
    getPortalAssessments();

  const plans =
    getPortalDevelopmentPlans();

  const reports =
    getPortalProgressReports();

  const scouting =
    getPortalScoutingReports();

  function submitReport(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (
      !playerId ||
      !period.trim() ||
      !comments.trim()
    ) {
      return;
    }

    addPortalProgressReport({
      playerId,

      reportingPeriod:
        period.trim(),

      comments:
        comments.trim(),

      recommendations:
        recommendations.trim(),

      createdBy:
        "Technical Director",
    });

    setPeriod("");
    setComments("");
    setRecommendations("");

    setRefresh(
      (value) =>
        value + 1,
    );
  }

  return (
    <div className="w-full min-w-0 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-7xl min-w-0">
        <PortalPageHeader
          eyebrow="Technical Director Portal"
          title="Player Development"
          description="Academy-wide technical assessment and development oversight."
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
          />

          <PortalStatCard
            label="Development Plans"
            value={plans.length}
            icon={
              <Target size={20} />
            }
          />

          <PortalStatCard
            label="Progress Reports"
            value={reports.length}
            icon={
              <BarChart3
                size={20}
              />
            }
          />

          <PortalStatCard
            label="Scouting Reports"
            value={scouting.length}
            icon={
              <Users size={20} />
            }
          />
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-3">
          <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
            <h2 className="font-bold text-slate-900">
              Create Technical Report
            </h2>

            <form
              onSubmit={
                submitReport
              }
              className="mt-5 space-y-4"
            >
              <select
                value={playerId}
                onChange={(event) =>
                  setPlayerId(
                    event.target.value,
                  )
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm"
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

              <input
                value={period}
                onChange={(event) =>
                  setPeriod(
                    event.target.value,
                  )
                }
                placeholder="Reporting period"
                className="w-full rounded-lg border border-slate-300 px-3 py-3 text-sm"
              />

              <textarea
                rows={4}
                value={comments}
                onChange={(event) =>
                  setComments(
                    event.target.value,
                  )
                }
                placeholder="Technical comments"
                className="w-full rounded-lg border border-slate-300 px-3 py-3 text-sm"
              />

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
                placeholder="Recommendations"
                className="w-full rounded-lg border border-slate-300 px-3 py-3 text-sm"
              />

              <PortalButton
                type="submit"
              >
                <FilePlus2
                  size={17}
                />

                Create Report
              </PortalButton>
            </form>
          </section>

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
            <div className="border-b border-slate-200 p-4 sm:p-6">
              <h2 className="font-bold text-slate-900">
                Recent Reports
              </h2>
            </div>

            {reports.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {reports
                  .slice()
                  .reverse()
                  .slice(0, 10)
                  .map(
                    (report) => {
                      const player =
                        players.find(
                          (item) =>
                            item.id ===
                            report.playerId,
                        );

                      return (
                        <div
                          key={
                            report.id
                          }
                          className="min-w-0 p-4 sm:p-5"
                        >
                          <p className="font-bold text-slate-900">
                            {player?.fullName ??
                              "Player"}
                          </p>

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
                        </div>
                      );
                    },
                  )}
              </div>
            ) : (
              <PortalEmptyState
                title="No reports available"
              />
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   REPORTS
===================================================== */

export function TechnicalDirectorReportsPage() {
  const players =
    getPortalPlayers();

  const active =
    players.filter(
      (player) =>
        player.status ===
        "Active",
    ).length;

  const injured =
    players.filter(
      (player) =>
        player.status ===
        "Injured",
    ).length;

  const onTrial =
    players.filter(
      (player) =>
        player.status ===
        "On Trial",
    ).length;

  const graduated =
    players.filter(
      (player) =>
        player.status ===
        "Graduated",
    ).length;

  return (
    <div className="w-full min-w-0 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-7xl min-w-0">
        <PortalPageHeader
          eyebrow="Technical Director Portal"
          title="Technical Reports"
          description="Academy-wide technical player status summary."
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <PortalStatCard
            label="Active Players"
            value={active}
            icon={
              <Users size={20} />
            }
            to="/technical-director/development"
          />

          <PortalStatCard
            label="Injured"
            value={injured}
            icon={
              <Users size={20} />
            }
            to="/technical-director/development"
          />

          <PortalStatCard
            label="On Trial"
            value={onTrial}
            icon={
              <Target size={20} />
            }
            to="/technical-director/development"
          />

          <PortalStatCard
            label="Graduated"
            value={graduated}
            icon={
              <BarChart3
                size={20}
              />
            }
            to="/technical-director/development"
          />
        </div>
      </div>
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}