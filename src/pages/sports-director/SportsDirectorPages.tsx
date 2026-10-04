import {
  useState,
} from "react";

import type {
  FormEvent,
  ReactNode,
} from "react";

import {
  BarChart3,
  Bell,
  CheckCircle2,
  CreditCard,
  FileText,
  Plus,
  Receipt,
  Send,
  Shield,
  Trophy,
  Users,
  WalletCards,
  Workflow,
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
  formatPortalCurrency,
  formatPortalDate,
} from "../../components/roles/PortalUI";

import {
  addPortalAnnouncement,
  addPortalTournament,
  calculateInvoiceBalance,
  getPortalExpenses,
  getPortalInvoices,
  getPortalMessages,
  getPortalPayments,
  getPortalPlayers,
  getPortalTeams,
  getPortalTournaments,
  updatePortalTeamStatus,
  updatePortalTournamentStatus,
} from "../../services/rolePortalService";

import type {
  TournamentStatus,
} from "../../shared/types/tournament";

/* =====================================================
   DASHBOARD
===================================================== */

export function SportsDirectorDashboardPage() {
  const players =
    getPortalPlayers();

  const teams =
    getPortalTeams();

  const tournaments =
    getPortalTournaments();

  const invoices =
    getPortalInvoices();

  const programs =
    new Set(
      teams.map(
        (team) =>
          team.program,
      ),
    );

  const outstanding =
    invoices.reduce(
      (
        total,
        invoice,
      ) =>
        total +
        calculateInvoiceBalance(
          invoice,
        ),
      0,
    );

  return (
    <div className="w-full min-w-0 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-7xl min-w-0">
        <PortalPageHeader
          eyebrow="Sports Director Portal"
          title="Dashboard"
          description="Operational oversight of academy programs, teams, tournaments, finance and communication."
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <PortalStatCard
            label="Players"
            value={players.length}
            icon={
              <Users size={20} />
            }
            to="/sports-director/teams"
            description="View players distributed across academy teams."
            actionText="View teams"
          />

          <PortalStatCard
            label="Academy Teams"
            value={teams.length}
            icon={
              <Shield size={20} />
            }
            to="/sports-director/teams"
            description="Review and manage academy team status."
            actionText="Manage teams"
          />

          <PortalStatCard
            label="Programs"
            value={programs.size}
            icon={
              <Workflow
                size={20}
              />
            }
            to="/sports-director/programs"
            description="Review active academy development programs."
            actionText="View programs"
          />

          <PortalStatCard
            label="Tournaments"
            value={
              tournaments.length
            }
            icon={
              <Trophy size={20} />
            }
            to="/sports-director/tournaments"
            description="Create competitions and update tournament status."
            actionText="Manage tournaments"
          />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <PortalStatCard
            label="Outstanding Fees"
            value={formatPortalCurrency(
              outstanding,
            )}
            icon={
              <CreditCard
                size={20}
              />
            }
            to="/sports-director/finance"
            description="Review unpaid and partially paid academy invoices."
            actionText="Open finance"
          />

          <PortalStatCard
            label="Announcements"
            value={
              getPortalMessages()
                .length
            }
            icon={
              <Bell size={20} />
            }
            to="/sports-director/announcements"
            description="Publish information to staff, players and parents."
            actionText="Open communication"
          />
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   PROGRAMS
===================================================== */

export function SportsDirectorProgramsPage() {
  const teams =
    getPortalTeams();

  const players =
    getPortalPlayers();

  const programs =
    Array.from(
      new Set(
        teams.map(
          (team) =>
            team.program,
        ),
      ),
    );

  return (
    <div className="w-full min-w-0 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-7xl min-w-0">
        <PortalPageHeader
          eyebrow="Sports Director Portal"
          title="Programs"
          description="Review academy sporting and player-development programs."
        />

        <div className="mt-6 grid gap-5 xl:grid-cols-2">
          {programs.map(
            (program) => {
              const programTeams =
                teams.filter(
                  (team) =>
                    team.program ===
                    program,
                );

              const teamNames =
                new Set(
                  programTeams.map(
                    (team) =>
                      team.name,
                  ),
                );

              const programPlayers =
                players.filter(
                  (player) =>
                    player.program ===
                      program ||
                    (
                      player.academyTeam &&
                      teamNames.has(
                        player.academyTeam,
                      )
                    ),
                );

              return (
                <article
                  key={program}
                  className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                    <Workflow
                      size={22}
                    />
                  </div>

                  <h2 className="mt-4 text-xl font-bold text-slate-900">
                    {program}
                  </h2>

                  <div className="mt-5 grid grid-cols-2 gap-4">
                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-xs text-slate-400">
                        Teams
                      </p>

                      <p className="mt-1 text-2xl font-bold text-slate-900">
                        {
                          programTeams.length
                        }
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-xs text-slate-400">
                        Players
                      </p>

                      <p className="mt-1 text-2xl font-bold text-slate-900">
                        {
                          programPlayers.length
                        }
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Teams in program
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {programTeams.map(
                        (team) => (
                          <span
                            key={
                              team.id
                            }
                            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
                          >
                            {
                              team.name
                            }
                          </span>
                        ),
                      )}
                    </div>
                  </div>

                  <Link
                    to="/sports-director/teams"
                    className="mt-5 inline-flex rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                  >
                    View Program Teams
                  </Link>
                </article>
              );
            },
          )}

          {programs.length === 0 && (
            <div className="xl:col-span-2 rounded-2xl border border-slate-200 bg-white">
              <PortalEmptyState
                title="No academy programs"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   TEAMS
===================================================== */

export function SportsDirectorTeamsPage() {
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
    status:
      | "Active"
      | "Inactive",
  ) {
    updatePortalTeamStatus(
      teamId,
      status === "Active"
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
          eyebrow="Sports Director Portal"
          title="Academy Teams"
          description="Review team operations and control team availability."
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
                  className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
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
                      value={`${teamPlayers.length}`}
                    />

                    <Info
                      label="Gender"
                      value={
                        team.genderCategory
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

                  <div className="mt-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Registered Players
                    </p>

                    <div className="mt-3 space-y-2">
                      {teamPlayers
                        .slice(
                          0,
                          5,
                        )
                        .map(
                          (
                            player,
                          ) => (
                            <div
                              key={
                                player.id
                              }
                              className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3"
                            >
                              <div>
                                <p className="text-sm font-semibold text-slate-800">
                                  {
                                    player.fullName
                                  }
                                </p>

                                <p className="text-xs text-slate-400">
                                  {
                                    player.playingPosition
                                  }
                                </p>
                              </div>

                              <StatusBadge
                                status={
                                  player.status
                                }
                              />
                            </div>
                          ),
                        )}

                      {teamPlayers.length ===
                        0 && (
                        <p className="text-sm text-slate-400">
                          No players assigned.
                        </p>
                      )}
                    </div>
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
                        ? (
                          <>
                            <XCircle
                              size={16}
                            />
                            Deactivate
                          </>
                        )
                        : (
                          <>
                            <CheckCircle2
                              size={16}
                            />
                            Activate
                          </>
                        )}
                    </PortalButton>

                    <Link
                      to="/sports-director/tournaments"
                      className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      View Tournaments
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
   TOURNAMENTS
===================================================== */

export function SportsDirectorTournamentsPage() {
  const teams =
    getPortalTeams();

  const [
    refresh,
    setRefresh,
  ] = useState(0);

  const [
    name,
    setName,
  ] = useState("");

  const [
    teamName,
    setTeamName,
  ] = useState(
    teams[0]?.name ?? "",
  );

  const [
    startDate,
    setStartDate,
  ] = useState("");

  const [
    endDate,
    setEndDate,
  ] = useState("");

  const [
    venue,
    setVenue,
  ] = useState("");

  const [
    city,
    setCity,
  ] = useState("");

  const [
    organizer,
    setOrganizer,
  ] = useState("");

  const [
    reportingTime,
    setReportingTime,
  ] = useState("");

  const [
    notes,
    setNotes,
  ] = useState("");

  const [
    successMessage,
    setSuccessMessage,
  ] = useState("");

  void refresh;

  const tournaments =
    getPortalTournaments()
      .slice()
      .sort(
        (
          a,
          b,
        ) =>
          a.startDate.localeCompare(
            b.startDate,
          ),
      );

  function createTournament(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const team =
      teams.find(
        (item) =>
          item.name ===
          teamName,
      );

    if (
      !team ||
      !name.trim() ||
      !startDate ||
      !venue.trim()
    ) {
      return;
    }

    addPortalTournament({
      id: `tournament-${Date.now()}`,

      name:
        name.trim(),

      teamName:
        team.name,

      ageCategory:
        team.ageCategory,

      startDate,

      endDate:
        endDate ||
        startDate,

      venue:
        venue.trim(),

      city:
        city.trim(),

      organizer:
        organizer.trim() ||
        "Elite Academy",

      reportingTime:
        reportingTime ||
        undefined,

      notes:
        notes.trim() ||
        undefined,

      status:
        "Upcoming",

      createdAt:
        new Date().toISOString(),
    });

    setName("");
    setStartDate("");
    setEndDate("");
    setVenue("");
    setCity("");
    setOrganizer("");
    setReportingTime("");
    setNotes("");

    setSuccessMessage(
      "Tournament created successfully.",
    );

    setRefresh(
      (value) =>
        value + 1,
    );
  }

  function changeStatus(
    tournamentId: string,
    status:
      TournamentStatus,
  ) {
    updatePortalTournamentStatus(
      tournamentId,
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
          eyebrow="Sports Director Portal"
          title="Tournaments"
          description="Create competitions, inspect tournament information and update tournament status."
        />

        <div className="mt-6 grid gap-6 xl:grid-cols-3">
          {/* CREATE TOURNAMENT */}

          <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Plus
                size={20}
                className="text-green-600"
              />

              <h2 className="font-bold text-slate-900">
                New Tournament
              </h2>
            </div>

            <form
              onSubmit={
                createTournament
              }
              className="mt-5 space-y-4"
            >
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Tournament Name
                </label>

                <input
                  value={name}
                  onChange={(event) =>
                    setName(
                      event.target.value,
                    )
                  }
                  placeholder="Tournament name"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none focus:border-green-500"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Academy Team
                </label>

                <select
                  value={teamName}
                  onChange={(event) =>
                    setTeamName(
                      event.target.value,
                    )
                  }
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm"
                >
                  {teams.map(
                    (team) => (
                      <option
                        key={
                          team.id
                        }
                        value={
                          team.name
                        }
                      >
                        {
                          team.name
                        }{" "}
                        -{" "}
                        {
                          team.ageCategory
                        }
                      </option>
                    ),
                  )}
                </select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Start Date
                  </label>

                  <input
                    type="date"
                    value={
                      startDate
                    }
                    onChange={(event) =>
                      setStartDate(
                        event.target.value,
                      )
                    }
                    className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    End Date
                  </label>

                  <input
                    type="date"
                    value={
                      endDate
                    }
                    onChange={(event) =>
                      setEndDate(
                        event.target.value,
                      )
                    }
                    className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Venue
                </label>

                <input
                  value={venue}
                  onChange={(event) =>
                    setVenue(
                      event.target.value,
                    )
                  }
                  placeholder="Tournament venue"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  City
                </label>

                <input
                  value={city}
                  onChange={(event) =>
                    setCity(
                      event.target.value,
                    )
                  }
                  placeholder="City"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Organizer
                </label>

                <input
                  value={
                    organizer
                  }
                  onChange={(event) =>
                    setOrganizer(
                      event.target.value,
                    )
                  }
                  placeholder="Tournament organizer"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Reporting Time
                </label>

                <input
                  type="time"
                  value={
                    reportingTime
                  }
                  onChange={(event) =>
                    setReportingTime(
                      event.target.value,
                    )
                  }
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Notes
                </label>

                <textarea
                  rows={3}
                  value={notes}
                  onChange={(event) =>
                    setNotes(
                      event.target.value,
                    )
                  }
                  placeholder="Additional tournament information"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 text-sm"
                />
              </div>

              {successMessage && (
                <div className="rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                  {
                    successMessage
                  }
                </div>
              )}

              <PortalButton
                type="submit"
              >
                <Plus size={17} />

                Create Tournament
              </PortalButton>
            </form>
          </section>

          {/* TOURNAMENT LIST */}

          <section className="space-y-5 xl:col-span-2">
            {tournaments.map(
              (
                tournament,
              ) => (
                <article
                  key={
                    tournament.id
                  }
                  className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <StatusBadge
                          status={
                            tournament.status
                          }
                        />

                        <span className="text-xs font-semibold text-slate-400">
                          {
                            tournament.ageCategory
                          }
                        </span>
                      </div>

                      <h2 className="mt-3 text-xl font-bold text-slate-900">
                        {
                          tournament.name
                        }
                      </h2>

                      <p className="mt-1 text-sm font-semibold text-green-600">
                        {
                          tournament.teamName
                        }
                      </p>
                    </div>

                    <Trophy
                      size={26}
                      className="text-green-600"
                    />
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    <Info
                      label="Start Date"
                      value={formatPortalDate(
                        tournament.startDate,
                      )}
                    />

                    <Info
                      label="End Date"
                      value={formatPortalDate(
                        tournament.endDate,
                      )}
                    />

                    <Info
                      label="Venue"
                      value={
                        tournament.venue
                      }
                    />

                    <Info
                      label="City"
                      value={
                        tournament.city ||
                        "—"
                      }
                    />

                    <Info
                      label="Organizer"
                      value={
                        tournament.organizer
                      }
                    />

                    <Info
                      label="Reporting Time"
                      value={
                        tournament.reportingTime ??
                        "—"
                      }
                    />
                  </div>

                  {tournament.notes && (
                    <div className="mt-5 rounded-xl bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Tournament Notes
                      </p>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {
                          tournament.notes
                        }
                      </p>
                    </div>
                  )}

                  {tournament.opponents &&
                    tournament
                      .opponents
                      .length >
                      0 && (
                      <div className="mt-5">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Opponents
                        </p>

                        <div className="mt-2 flex flex-wrap gap-2">
                          {tournament.opponents.map(
                            (
                              opponent,
                            ) => (
                              <span
                                key={
                                  opponent
                                }
                                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
                              >
                                {
                                  opponent
                                }
                              </span>
                            ),
                          )}
                        </div>
                      </div>
                    )}

                  <div className="mt-6">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Update Status
                    </p>

                    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap">
                      <PortalButton
                        variant="secondary"
                        onClick={() =>
                          changeStatus(
                            tournament.id,
                            "Upcoming",
                          )
                        }
                      >
                        Upcoming
                      </PortalButton>

                      <PortalButton
                        variant="secondary"
                        onClick={() =>
                          changeStatus(
                            tournament.id,
                            "Ongoing",
                          )
                        }
                      >
                        Ongoing
                      </PortalButton>

                      <PortalButton
                        onClick={() =>
                          changeStatus(
                            tournament.id,
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
                            tournament.id,
                            "Cancelled",
                          )
                        }
                      >
                        Cancel
                      </PortalButton>
                    </div>
                  </div>
                </article>
              ),
            )}

            {tournaments.length ===
              0 && (
              <div className="rounded-2xl border border-slate-200 bg-white">
                <PortalEmptyState
                  title="No tournaments"
                  description="Create the academy's first tournament using the form."
                />
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   FINANCE
===================================================== */

type FinanceView =
  | "invoices"
  | "payments"
  | "outstanding"
  | "expenses";

export function SportsDirectorFinancePage() {
  const [
    selectedView,
    setSelectedView,
  ] =
    useState<FinanceView>(
      "invoices",
    );

  const invoices =
    getPortalInvoices();

  const payments =
    getPortalPayments();

  const expenses =
    getPortalExpenses();

  const players =
    getPortalPlayers();

  const totalInvoiced =
    invoices.reduce(
      (
        total,
        invoice,
      ) =>
        total +
        invoice.amount,
      0,
    );

  const totalPayments =
    payments.reduce(
      (
        total,
        payment,
      ) =>
        total +
        payment.amount,
      0,
    );

  const totalOutstanding =
    invoices.reduce(
      (
        total,
        invoice,
      ) =>
        total +
        calculateInvoiceBalance(
          invoice,
        ),
      0,
    );

  const totalExpenses =
    expenses.reduce(
      (
        total,
        expense,
      ) =>
        total +
        expense.amount,
      0,
    );

  const outstandingInvoices =
    invoices.filter(
      (invoice) =>
        calculateInvoiceBalance(
          invoice,
        ) > 0,
    );

  function getPlayerName(
    playerId: string,
  ) {
    return (
      players.find(
        (player) =>
          player.id ===
          playerId,
      )?.fullName ??
      "Unknown Player"
    );
  }

  return (
    <div className="w-full min-w-0 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-7xl min-w-0">
        <PortalPageHeader
          eyebrow="Sports Director Portal"
          title="Finance Overview"
          description="Review academy invoices, payments, outstanding fees and operating expenses."
        />

        {/* CLICKABLE FINANCE CARDS */}

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <FinanceCard
            label="Total Invoiced"
            value={formatPortalCurrency(
              totalInvoiced,
            )}
            icon={
              <FileText
                size={20}
              />
            }
            selected={
              selectedView ===
              "invoices"
            }
            onClick={() =>
              setSelectedView(
                "invoices",
              )
            }
          />

          <FinanceCard
            label="Payments Received"
            value={formatPortalCurrency(
              totalPayments,
            )}
            icon={
              <Receipt size={20} />
            }
            selected={
              selectedView ===
              "payments"
            }
            onClick={() =>
              setSelectedView(
                "payments",
              )
            }
          />

          <FinanceCard
            label="Outstanding"
            value={formatPortalCurrency(
              totalOutstanding,
            )}
            icon={
              <WalletCards
                size={20}
              />
            }
            selected={
              selectedView ===
              "outstanding"
            }
            onClick={() =>
              setSelectedView(
                "outstanding",
              )
            }
          />

          <FinanceCard
            label="Expenses"
            value={formatPortalCurrency(
              totalExpenses,
            )}
            icon={
              <BarChart3
                size={20}
              />
            }
            selected={
              selectedView ===
              "expenses"
            }
            onClick={() =>
              setSelectedView(
                "expenses",
              )
            }
          />
        </div>

        {/* INVOICES */}

        {selectedView ===
          "invoices" && (
          <FinanceSection
            title="Academy Invoices"
            description="All player invoices issued by the academy."
          >
            {invoices.length >
            0 ? (
              <div className="min-w-0">
                <div className="space-y-3 bg-slate-50/50 p-3 md:hidden">
                  {invoices.map((invoice) => {
                    const balance = calculateInvoiceBalance(invoice);

                    return (
                      <article
                        key={invoice.id}
                        className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                      >
                        <div className="flex min-w-0 items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="break-all font-semibold text-slate-900">
                              {invoice.invoiceNumber ?? invoice.id}
                            </p>
                            <p className="mt-1 break-words text-sm text-slate-600">
                              {getPlayerName(invoice.playerId)}
                            </p>
                          </div>

                          <div className="shrink-0">
                            <StatusBadge status={invoice.status ?? "Pending"} />
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                          <div className="min-w-0">
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Amount</p>
                            <p className="mt-1 break-words text-sm font-bold text-slate-800">
                              {formatPortalCurrency(invoice.amount)}
                            </p>
                          </div>

                          <div className="min-w-0">
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Paid</p>
                            <p className="mt-1 break-words text-sm font-bold text-green-600">
                              {formatPortalCurrency(invoice.amountPaid)}
                            </p>
                          </div>

                          <div className="col-span-2 min-w-0">
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Balance</p>
                            <p className="mt-1 break-words text-sm font-bold text-slate-900">
                              {formatPortalCurrency(balance)}
                            </p>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>

                <div className="hidden w-full overflow-x-auto md:block">
                  <table className="w-full min-w-[760px] text-left">
                  <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                    <tr>
                      <th className="px-6 py-4">
                        Invoice
                      </th>

                      <th className="px-6 py-4">
                        Player
                      </th>

                      <th className="px-6 py-4">
                        Amount
                      </th>

                      <th className="px-6 py-4">
                        Paid
                      </th>

                      <th className="px-6 py-4">
                        Balance
                      </th>

                      <th className="px-6 py-4">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {invoices.map(
                      (
                        invoice,
                      ) => (
                        <tr
                          key={
                            invoice.id
                          }
                        >
                          <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                            {invoice.invoiceNumber ??
                              invoice.id}
                          </td>

                          <td className="px-6 py-4 text-sm text-slate-600">
                            {getPlayerName(
                              invoice.playerId,
                            )}
                          </td>

                          <td className="px-6 py-4 text-sm">
                            {formatPortalCurrency(
                              invoice.amount,
                            )}
                          </td>

                          <td className="px-6 py-4 text-sm">
                            {formatPortalCurrency(
                              invoice.amountPaid,
                            )}
                          </td>

                          <td className="px-6 py-4 text-sm font-semibold">
                            {formatPortalCurrency(
                              calculateInvoiceBalance(
                                invoice,
                              ),
                            )}
                          </td>

                          <td className="px-6 py-4">
                            <StatusBadge
                              status={
                                invoice.status ??
                                "Pending"
                              }
                            />
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <PortalEmptyState
                title="No invoices"
              />
            )}
          </FinanceSection>
        )}

        {/* PAYMENTS */}

        {selectedView ===
          "payments" && (
          <FinanceSection
            title="Payments Received"
            description="Recorded payments made by academy players and parents."
          >
            {payments.length >
            0 ? (
              <div className="divide-y divide-slate-100">
                {payments
                  .slice()
                  .reverse()
                  .map(
                    (
                      payment,
                    ) => (
                      <div
                        key={
                          payment.id
                        }
                        className="flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center lg:p-6"
                      >
                        <div>
                          <p className="font-semibold text-slate-900">
                            {getPlayerName(
                              payment.playerId,
                            )}
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            Payment ID:{" "}
                            {
                              payment.id
                            }
                          </p>

                          {payment.paymentDate && (
                            <p className="mt-1 text-xs text-slate-400">
                              {formatPortalDate(
                                payment.paymentDate,
                              )}
                            </p>
                          )}
                        </div>

                        <p className="text-lg font-bold text-green-600">
                          {formatPortalCurrency(
                            payment.amount,
                          )}
                        </p>
                      </div>
                    ),
                  )}
              </div>
            ) : (
              <PortalEmptyState
                title="No payments recorded"
              />
            )}
          </FinanceSection>
        )}

        {/* OUTSTANDING */}

        {selectedView ===
          "outstanding" && (
          <FinanceSection
            title="Outstanding Fees"
            description="Invoices that still have an unpaid balance."
          >
            {outstandingInvoices.length >
            0 ? (
              <div className="divide-y divide-slate-100">
                {outstandingInvoices.map(
                  (
                    invoice,
                  ) => (
                    <div
                      key={
                        invoice.id
                      }
                      className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center lg:p-6"
                    >
                      <div>
                        <p className="font-bold text-slate-900">
                          {getPlayerName(
                            invoice.playerId,
                          )}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          {invoice.invoiceNumber ??
                            invoice.id}
                        </p>
                      </div>

                      <div className="sm:text-right">
                        <p className="text-xs text-slate-400">
                          Outstanding
                        </p>

                        <p className="mt-1 text-lg font-bold text-red-600">
                          {formatPortalCurrency(
                            calculateInvoiceBalance(
                              invoice,
                            ),
                          )}
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            ) : (
              <PortalEmptyState
                title="No outstanding invoices"
                description="All current invoices have been settled."
              />
            )}
          </FinanceSection>
        )}

        {/* EXPENSES */}

        {selectedView ===
          "expenses" && (
          <FinanceSection
            title="Academy Expenses"
            description="Operating expenses recorded by the academy."
          >
            {expenses.length >
            0 ? (
              <div className="divide-y divide-slate-100">
                {expenses
                  .slice()
                  .reverse()
                  .map(
                    (
                      expense,
                    ) => (
                      <div
                        key={
                          expense.id
                        }
                        className="flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center lg:p-6"
                      >
                        <div>
                          <p className="font-semibold text-slate-900">
                            {expense.description ??
                              "Academy Expense"}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {formatPortalDate(
                              expense.expenseDate ??
                                expense.date,
                            )}
                          </p>
                        </div>

                        <p className="text-lg font-bold text-slate-900">
                          {formatPortalCurrency(
                            expense.amount,
                          )}
                        </p>
                      </div>
                    ),
                  )}
              </div>
            ) : (
              <PortalEmptyState
                title="No expenses recorded"
              />
            )}
          </FinanceSection>
        )}

        <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-blue-700">
          The Sports Director has financial oversight in this prototype. Creating invoices, recording payments and issuing receipts remain with the Administrator/finance workflow.
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   ANNOUNCEMENTS
===================================================== */

export function SportsDirectorAnnouncementsPage() {
  const [
    refresh,
    setRefresh,
  ] = useState(0);

  const [
    title,
    setTitle,
  ] = useState("");

  const [
    message,
    setMessage,
  ] = useState("");

  const [
    audience,
    setAudience,
  ] = useState<
    | "All"
    | "Players"
    | "Parents"
    | "Coaches"
    | "Staff"
  >("All");

  const [
    channel,
    setChannel,
  ] = useState<
    | "SMS"
    | "Email"
    | "WhatsApp"
    | "Push Notification"
  >("Push Notification");

  const [
    success,
    setSuccess,
  ] = useState("");

  void refresh;

  const messages =
    getPortalMessages()
      .slice()
      .reverse();

  function publish(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (
      !title.trim() ||
      !message.trim()
    ) {
      return;
    }

    addPortalAnnouncement({
      title:
        title.trim(),

      message:
        message.trim(),

      audience,

      channel,
    });

    setTitle("");
    setMessage("");
    setAudience("All");
    setChannel(
      "Push Notification",
    );

    setSuccess(
      "Announcement published successfully.",
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
          eyebrow="Sports Director Portal"
          title="Announcements"
          description="Publish academy notices to players, parents, coaches and staff."
        />

        <div className="mt-6 grid gap-6 xl:grid-cols-3">
          {/* PUBLISH */}

          <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Send
                size={19}
                className="text-green-600"
              />

              <h2 className="font-bold text-slate-900">
                Publish Announcement
              </h2>
            </div>

            <form
              onSubmit={
                publish
              }
              className="mt-5 space-y-4"
            >
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Title
                </label>

                <input
                  value={title}
                  onChange={(event) =>
                    setTitle(
                      event.target.value,
                    )
                  }
                  placeholder="Announcement title"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Audience
                </label>

                <select
                  value={
                    audience
                  }
                  onChange={(event) =>
                    setAudience(
                      event.target.value as
                        | "All"
                        | "Players"
                        | "Parents"
                        | "Coaches"
                        | "Staff",
                    )
                  }
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm"
                >
                  <option value="All">
                    Everyone
                  </option>

                  <option value="Players">
                    Players
                  </option>

                  <option value="Parents">
                    Parents / Guardians
                  </option>

                  <option value="Coaches">
                    Coaches
                  </option>

                  <option value="Staff">
                    Staff
                  </option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Channel
                </label>

                <select
                  value={
                    channel
                  }
                  onChange={(event) =>
                    setChannel(
                      event.target.value as
                        | "SMS"
                        | "Email"
                        | "WhatsApp"
                        | "Push Notification",
                    )
                  }
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm"
                >
                  <option value="Push Notification">
                    Push Notification
                  </option>

                  <option value="Email">
                    Email
                  </option>

                  <option value="SMS">
                    SMS
                  </option>

                  <option value="WhatsApp">
                    WhatsApp
                  </option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Message
                </label>

                <textarea
                  rows={6}
                  value={message}
                  onChange={(event) =>
                    setMessage(
                      event.target.value,
                    )
                  }
                  placeholder="Write announcement..."
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 text-sm"
                />
              </div>

              {success && (
                <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
                  {success}
                </div>
              )}

              <PortalButton
                type="submit"
              >
                <Send size={16} />

                Publish
              </PortalButton>
            </form>
          </section>

          {/* HISTORY */}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
            <div className="border-b border-slate-200 p-4 sm:p-6">
              <h2 className="font-bold text-slate-900">
                Announcement History
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Communications available across the academy.
              </p>
            </div>

            {messages.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {messages.map(
                  (
                    item,
                  ) => (
                    <article
                      key={
                        item.id
                      }
                      className="p-4 sm:p-5 lg:p-6"
                    >
                      <div className="flex gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
                          <Bell
                            size={18}
                          />
                        </div>

                        <div className="min-w-0">
                          <h3 className="font-bold text-slate-900">
                            {
                              item.title
                            }
                          </h3>

                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                              {
                                item.audience
                              }
                            </span>

                            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                              {
                                item.channel
                              }
                            </span>
                          </div>

                          <p className="mt-3 text-sm leading-7 text-slate-600">
                            {
                              item.message
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
    </div>
  );
}

/* =====================================================
   REPORTS
===================================================== */

type ReportView =
  | "players"
  | "teams"
  | "tournaments"
  | "finance";

export function SportsDirectorReportsPage() {
  const [
    selectedReport,
    setSelectedReport,
  ] =
    useState<ReportView>(
      "players",
    );

  const players =
    getPortalPlayers();

  const teams =
    getPortalTeams();

  const tournaments =
    getPortalTournaments();

  const invoices =
    getPortalInvoices();

  const activePlayers =
    players.filter(
      (player) =>
        player.status ===
        "Active",
    );

  const activeTeams =
    teams.filter(
      (team) =>
        team.status ===
        "Active",
    );

  const upcomingTournaments =
    tournaments.filter(
      (tournament) =>
        tournament.status ===
        "Upcoming",
    );

  const outstandingInvoices =
    invoices.filter(
      (invoice) =>
        calculateInvoiceBalance(
          invoice,
        ) > 0,
    );

  const outstandingTotal =
    outstandingInvoices.reduce(
      (
        total,
        invoice,
      ) =>
        total +
        calculateInvoiceBalance(
          invoice,
        ),
      0,
    );

  return (
    <div className="w-full min-w-0 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-7xl min-w-0">
        <PortalPageHeader
          eyebrow="Sports Director Portal"
          title="Operational Reports"
          description="Click a report card to inspect the underlying academy records."
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <ReportCard
            label="Active Players"
            value={
              activePlayers.length
            }
            icon={
              <Users size={20} />
            }
            selected={
              selectedReport ===
              "players"
            }
            onClick={() =>
              setSelectedReport(
                "players",
              )
            }
          />

          <ReportCard
            label="Active Teams"
            value={
              activeTeams.length
            }
            icon={
              <Shield size={20} />
            }
            selected={
              selectedReport ===
              "teams"
            }
            onClick={() =>
              setSelectedReport(
                "teams",
              )
            }
          />

          <ReportCard
            label="Upcoming Tournaments"
            value={
              upcomingTournaments.length
            }
            icon={
              <Trophy size={20} />
            }
            selected={
              selectedReport ===
              "tournaments"
            }
            onClick={() =>
              setSelectedReport(
                "tournaments",
              )
            }
          />

          <ReportCard
            label="Outstanding Fees"
            value={formatPortalCurrency(
              outstandingTotal,
            )}
            icon={
              <CreditCard
                size={20}
              />
            }
            selected={
              selectedReport ===
              "finance"
            }
            onClick={() =>
              setSelectedReport(
                "finance",
              )
            }
          />
        </div>

        {/* PLAYER REPORT */}

        {selectedReport ===
          "players" && (
          <ReportSection
            title="Active Players"
            description="Players whose current academy status is Active."
          >
            {activePlayers.length >
            0 ? (
              <div className="divide-y divide-slate-100">
                {activePlayers.map(
                  (
                    player,
                  ) => (
                    <div
                      key={
                        player.id
                      }
                      className="flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center"
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

                      <StatusBadge
                        status={
                          player.status
                        }
                      />
                    </div>
                  ),
                )}
              </div>
            ) : (
              <PortalEmptyState
                title="No active players"
              />
            )}
          </ReportSection>
        )}

        {/* TEAM REPORT */}

        {selectedReport ===
          "teams" && (
          <ReportSection
            title="Active Academy Teams"
            description="Teams currently available for academy sporting activity."
          >
            {activeTeams.length >
            0 ? (
              <div className="divide-y divide-slate-100">
                {activeTeams.map(
                  (team) => (
                    <div
                      key={
                        team.id
                      }
                      className="flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center"
                    >
                      <div>
                        <p className="font-bold text-slate-900">
                          {
                            team.name
                          }
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          {
                            team.ageCategory
                          }{" "}
                          •{" "}
                          {
                            team.program
                          }
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {
                            team.centre
                          }
                        </p>
                      </div>

                      <StatusBadge
                        status={
                          team.status
                        }
                      />
                    </div>
                  ),
                )}
              </div>
            ) : (
              <PortalEmptyState
                title="No active teams"
              />
            )}
          </ReportSection>
        )}

        {/* TOURNAMENT REPORT */}

        {selectedReport ===
          "tournaments" && (
          <ReportSection
            title="Upcoming Tournaments"
            description="Competitions currently marked as upcoming."
          >
            {upcomingTournaments.length >
            0 ? (
              <div className="divide-y divide-slate-100">
                {upcomingTournaments.map(
                  (
                    tournament,
                  ) => (
                    <div
                      key={
                        tournament.id
                      }
                      className="flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center"
                    >
                      <div>
                        <p className="font-bold text-slate-900">
                          {
                            tournament.name
                          }
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          {
                            tournament.teamName
                          }{" "}
                          •{" "}
                          {formatPortalDate(
                            tournament.startDate,
                          )}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {
                            tournament.venue
                          }
                          {tournament.city
                            ? `, ${tournament.city}`
                            : ""}
                        </p>
                      </div>

                      <StatusBadge
                        status={
                          tournament.status
                        }
                      />
                    </div>
                  ),
                )}
              </div>
            ) : (
              <PortalEmptyState
                title="No upcoming tournaments"
              />
            )}
          </ReportSection>
        )}

        {/* FINANCE REPORT */}

        {selectedReport ===
          "finance" && (
          <ReportSection
            title="Outstanding Academy Fees"
            description="Player invoices with remaining balances."
          >
            {outstandingInvoices.length >
            0 ? (
              <div className="divide-y divide-slate-100">
                {outstandingInvoices.map(
                  (
                    invoice,
                  ) => {
                    const player =
                      players.find(
                        (
                          item,
                        ) =>
                          item.id ===
                          invoice.playerId,
                      );

                    return (
                      <div
                        key={
                          invoice.id
                        }
                        className="flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center"
                      >
                        <div>
                          <p className="font-bold text-slate-900">
                            {player?.fullName ??
                              "Unknown Player"}
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            {invoice.invoiceNumber ??
                              invoice.id}
                          </p>
                        </div>

                        <div className="sm:text-right">
                          <p className="text-xs text-slate-400">
                            Outstanding
                          </p>

                          <p className="text-lg font-bold text-red-600">
                            {formatPortalCurrency(
                              calculateInvoiceBalance(
                                invoice,
                              ),
                            )}
                          </p>
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            ) : (
              <PortalEmptyState
                title="No outstanding fees"
              />
            )}
          </ReportSection>
        )}
      </div>
    </div>
  );
}

/* =====================================================
   HELPER COMPONENTS
===================================================== */

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

      <p className="mt-1 break-words text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function FinanceCard({
  label,
  value,
  icon,
  selected,
  onClick,
}: {
  label: string;
  value: string;
  icon: ReactNode;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
        selected
          ? "border-green-500 ring-2 ring-green-500/10"
          : "border-slate-200 hover:border-green-300"
      }`}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-lg ${
          selected
            ? "bg-green-600 text-white"
            : "bg-green-50 text-green-600"
        }`}
      >
        {icon}
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 break-words text-xl font-bold text-slate-950">
        {value}
      </p>

      <p className="mt-3 text-xs font-semibold text-green-600">
        View records →
      </p>
    </button>
  );
}

function ReportCard({
  label,
  value,
  icon,
  selected,
  onClick,
}: {
  label: string;
  value: string | number;
  icon: ReactNode;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
        selected
          ? "border-green-500 ring-2 ring-green-500/10"
          : "border-slate-200 hover:border-green-300"
      }`}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-lg ${
          selected
            ? "bg-green-600 text-white"
            : "bg-green-50 text-green-600"
        }`}
      >
        {icon}
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 break-words text-2xl font-bold text-slate-950">
        {value}
      </p>

      <p className="mt-3 text-xs font-semibold text-green-600">
        Inspect data →
      </p>
    </button>
  );
}

function FinanceSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-4 sm:p-6">
        <h2 className="font-bold text-slate-900">
          {title}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>
      </div>

      {children}
    </section>
  );
}

function ReportSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-4 sm:p-6">
        <h2 className="font-bold text-slate-900">
          {title}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>
      </div>

      {children}
    </section>
  );
}