import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  UserRound,
} from "lucide-react";

import {
  getPrimaryLinkedPlayer,
} from "../../services/parentService";

import {
  getSessions,
} from "../../services/sessionService";

import {
  getTeams,
} from "../../services/teamService";

function ParentSchedulePage() {
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

  const teams =
    getTeams();

  const playerTeam =
    teams.find(
      (team) =>
        team.name ===
        linkedPlayer.academyTeam,
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

  const upcoming =
    sessions.filter(
      (session) =>
        session.status ===
        "Scheduled",
    );

  const completed =
    sessions.filter(
      (session) =>
        session.status ===
        "Completed",
    );

  const cancelled =
    sessions.filter(
      (session) =>
        session.status ===
        "Cancelled",
    );

  const nextSession =
    upcoming[0];

  return (
    <div className="w-full min-w-0 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-7xl min-w-0">
        <div>
          <p className="text-sm font-semibold text-green-600">
            Parent / Guardian Portal
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-950 lg:text-3xl">
            Training Schedule
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View training sessions for{" "}
            {linkedPlayer.fullName}.
          </p>
        </div>

        <section className="mt-6 rounded-2xl bg-slate-950 p-4 sm:p-6 text-white">
          <p className="text-sm text-slate-400">
            Academy Team
          </p>

          <h2 className="mt-1 text-xl font-bold">
            {linkedPlayer.academyTeam ??
              "No Team Assigned"}
          </h2>

          <p className="mt-2 text-sm font-semibold text-green-400">
            {
              linkedPlayer.ageCategory
            }{" "}
            •{" "}
            {
              linkedPlayer.trainingCentre
            }
          </p>
        </section>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <StatCard
            label="Upcoming"
            value={upcoming.length}
          />

          <StatCard
            label="Completed"
            value={completed.length}
          />

          <StatCard
            label="Cancelled"
            value={cancelled.length}
          />
        </div>

        {nextSession && (
          <section className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-4 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-wide text-green-700">
              Next Training
            </p>

            <h2 className="mt-2 text-xl font-bold text-slate-900">
              {nextSession.title}
            </h2>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <Detail
                icon={
                  <CalendarDays
                    size={18}
                  />
                }
                text={formatDate(
                  nextSession.date,
                )}
              />

              <Detail
                icon={
                  <Clock3 size={18} />
                }
                text={`${nextSession.startTime} – ${nextSession.endTime}`}
              />

              <Detail
                icon={
                  <MapPin size={18} />
                }
                text={
                  nextSession.trainingCentre
                }
              />
            </div>
          </section>
        )}

        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-4 sm:p-6">
            <h2 className="font-bold text-slate-900">
              Training Sessions
            </h2>
          </div>

          {sessions.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {sessions.map(
                (session) => (
                  <article
                    key={session.id}
                    className="p-4 sm:p-5 lg:p-6"
                  >
                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-bold text-slate-900">
                            {
                              session.title
                            }
                          </h3>

                          <StatusBadge
                            status={
                              session.status
                            }
                          />
                        </div>

                        <p className="mt-2 text-sm text-slate-500">
                          {formatDate(
                            session.date,
                          )}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          {
                            session.startTime
                          }{" "}
                          –{" "}
                          {
                            session.endTime
                          }
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          {
                            session.trainingCentre
                          }
                        </p>
                      </div>

                      <div className="rounded-lg bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
                        {
                          session.sessionType
                        }
                      </div>
                    </div>
                  </article>
                ),
              )}
            </div>
          ) : (
            <div className="px-4 py-10 text-center sm:p-12">
              <CalendarDays
                size={34}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-4 font-semibold text-slate-800">
                No sessions found
              </h3>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <CheckCircle2
        size={20}
        className="text-green-600"
      />

      <p className="mt-4 text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold text-slate-950">
        {value}
      </p>
    </div>
  );
}

function Detail({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
      <span className="text-green-600">
        {icon}
      </span>

      {text}
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const styles =
    status === "Scheduled"
      ? "bg-blue-50 text-blue-700"
      : status === "Completed"
        ? "bg-green-50 text-green-700"
        : "bg-red-50 text-red-700";

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles}`}
    >
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

export default ParentSchedulePage;