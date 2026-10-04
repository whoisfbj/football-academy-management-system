import type {
  ReactNode,
} from "react";

import {
  CalendarDays,
  Clock3,
  MapPin,
  Trophy,
  UserRound,
  Users,
} from "lucide-react";

import {
  getPrimaryLinkedPlayer,
} from "../../services/parentService";

import {
  getTournamentsByTeam,
} from "../../services/tournamentService";

function ParentTournamentsPage() {
  const linkedPlayer =
    getPrimaryLinkedPlayer();

  if (!linkedPlayer) {
    return (
      <div className="w-full min-w-0 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <div className="mx-auto w-full max-w-7xl min-w-0">
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-8 text-center sm:p-12">
            <UserRound
              size={34}
              className="mx-auto text-slate-300"
            />

            <h1 className="mt-4 text-xl font-bold">
              No Player Linked
            </h1>
          </div>
        </div>
      </div>
    );
  }

  const teamName =
    linkedPlayer.academyTeam;

  const tournaments =
    teamName
      ? getTournamentsByTeam(
          teamName,
        )
          .slice()
          .sort(
            (a, b) =>
              a.startDate.localeCompare(
                b.startDate,
              ),
          )
      : [];

  return (
    <div className="w-full min-w-0 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-7xl min-w-0">
        <div>
          <p className="text-sm font-semibold text-green-600">
            Parent / Guardian Portal
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-950 lg:text-3xl">
            Tournaments
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Tournament information for{" "}
            {linkedPlayer.fullName}.
          </p>
        </div>

        <section className="mt-6 rounded-2xl bg-slate-950 p-4 sm:p-6 text-white">
          <p className="text-sm text-slate-400">
            Team
          </p>

          <h2 className="mt-1 text-xl font-bold">
            {teamName ??
              "No Team Assigned"}
          </h2>

          <p className="mt-1 text-green-400">
            {
              linkedPlayer.ageCategory
            }
          </p>
        </section>

        <section className="mt-6 space-y-5">
          {tournaments.length >
          0 ? (
            tournaments.map(
              (tournament) => (
                <article
                  key={tournament.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="border-b border-slate-200 p-4 sm:p-6">
                    <StatusBadge
                      status={
                        tournament.status
                      }
                    />

                    <h2 className="mt-3 text-xl font-bold text-slate-900">
                      {
                        tournament.name
                      }
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                      Organized by{" "}
                      {
                        tournament.organizer
                      }
                    </p>
                  </div>

                  <div className="grid gap-5 p-4 sm:p-6 lg:grid-cols-2">
                    <div className="space-y-4">
                      <Detail
                        icon={
                          <CalendarDays
                            size={18}
                          />
                        }
                        label="Dates"
                        value={
                          tournament.startDate ===
                          tournament.endDate
                            ? formatDate(
                                tournament.startDate,
                              )
                            : `${formatDate(
                                tournament.startDate,
                              )} – ${formatDate(
                                tournament.endDate,
                              )}`
                        }
                      />

                      <Detail
                        icon={
                          <MapPin
                            size={18}
                          />
                        }
                        label="Venue"
                        value={`${tournament.venue}, ${tournament.city}`}
                      />

                      <Detail
                        icon={
                          <Clock3
                            size={18}
                          />
                        }
                        label="Reporting Time"
                        value={
                          tournament.reportingTime ??
                          "To be announced"
                        }
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <Users
                          size={18}
                          className="text-green-600"
                        />

                        <h3 className="font-bold text-slate-900">
                          Opponents
                        </h3>
                      </div>

                      <div className="mt-3 space-y-2">
                        {tournament.opponents?.map(
                          (opponent) => (
                            <div
                              key={
                                opponent
                              }
                              className="rounded-lg bg-slate-50 px-4 py-3 text-sm"
                            >
                              {
                                opponent
                              }
                            </div>
                          ),
                        )}
                      </div>

                      {tournament.notes && (
                        <div className="mt-5 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-800">
                          {
                            tournament.notes
                          }
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ),
            )
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-8 text-center sm:p-12">
              <Trophy
                size={34}
                className="mx-auto text-slate-300"
              />

              <p className="mt-4 text-sm text-slate-500">
                No tournament
                information available.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function Detail({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="text-green-600">
        {icon}
      </div>

      <div>
        <p className="text-xs uppercase text-slate-400">
          {label}
        </p>

        <p className="mt-1 text-sm font-semibold text-slate-700">
          {value}
        </p>
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  return (
    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
      {status}
    </span>
  );
}

function formatDate(
  date: string,
) {
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

export default ParentTournamentsPage;