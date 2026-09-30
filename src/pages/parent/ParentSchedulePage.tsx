import type { ReactNode } from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Trophy,
  Users,
} from "lucide-react";

import { getPlayerById } from "../../services/playerService";
import { getSessions } from "../../services/sessionService";
import { getTeams } from "../../services/teamService";

function ParentSchedulePage() {
  const player = getPlayerById("player-001");

  if (!player) {
    return (
      <div className="p-5 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <CalendarDays
              size={34}
              className="mx-auto text-slate-300"
            />

            <h1 className="mt-4 text-xl font-bold text-slate-900">
              No Player Linked
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              No player is currently linked to this parent or guardian account.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const teams = getTeams();

  const playerTeam = player.academyTeam
    ? teams.find(
        (team) =>
          team.name === player.academyTeam,
      )
    : undefined;

  const allSessions = getSessions();

  const playerSessions = allSessions
    .filter((session) => {
      if (!playerTeam) {
        return false;
      }

      return session.teamId === playerTeam.id;
    })
    .sort((a, b) =>
      `${a.date}-${a.startTime}`.localeCompare(
        `${b.date}-${b.startTime}`,
      ),
    );

  const scheduledSessions =
    playerSessions.filter(
      (session) =>
        session.status === "Scheduled",
    );

  const completedSessions =
    playerSessions.filter(
      (session) =>
        session.status === "Completed",
    );

  const cancelledSessions =
    playerSessions.filter(
      (session) =>
        session.status === "Cancelled",
    );

  const nextSession =
    scheduledSessions[0];

  return (
    <div className="p-5 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* PAGE HEADER */}
        <div>
          <p className="text-sm font-semibold text-green-600">
            Parent / Guardian Portal
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-950 lg:text-3xl">
            Training Schedule
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View upcoming training sessions and academy activities for{" "}
            {player.fullName}.
          </p>
        </div>

        {/* PLAYER + TEAM */}
        <section className="mt-6 rounded-2xl bg-slate-950 p-6 text-white shadow-sm">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10">
                <Trophy size={27} />
              </div>

              <div>
                <p className="text-sm text-slate-400">
                  Training schedule for
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  {player.fullName}
                </h2>

                <p className="mt-1 text-sm font-semibold text-green-400">
                  {player.academyTeam ??
                    "No Team Assigned"}{" "}
                  • {player.ageCategory}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Upcoming Sessions
              </p>

              <p className="mt-1 text-3xl font-bold text-green-400">
                {scheduledSessions.length}
              </p>
            </div>
          </div>
        </section>

        {/* SUMMARY */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Upcoming"
            value={`${scheduledSessions.length}`}
            icon={<CalendarDays size={20} />}
          />

          <StatCard
            title="Completed"
            value={`${completedSessions.length}`}
            icon={<Trophy size={20} />}
          />

          <StatCard
            title="Cancelled"
            value={`${cancelledSessions.length}`}
            icon={<CalendarDays size={20} />}
          />

          <StatCard
            title="Team"
            value={
              player.academyTeam ??
              "Not Assigned"
            }
            icon={<Users size={20} />}
          />
        </div>

        {/* NEXT SESSION */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="font-bold text-slate-900">
              Next Training Session
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              The next scheduled academy session for this player.
            </p>
          </div>

          {nextSession ? (
            <div className="mt-6 rounded-2xl bg-green-50 p-6">
              <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                <div>
                  <span className="inline-flex rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
                    {nextSession.sessionType}
                  </span>

                  <h3 className="mt-4 text-xl font-bold text-slate-900">
                    {nextSession.title}
                  </h3>

                  <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:flex-wrap sm:gap-6">
                    <SessionInfo
                      icon={
                        <CalendarDays size={17} />
                      }
                      text={formatDate(
                        nextSession.date,
                      )}
                    />

                    <SessionInfo
                      icon={<Clock3 size={17} />}
                      text={`${nextSession.startTime} – ${nextSession.endTime}`}
                    />

                    <SessionInfo
                      icon={<MapPin size={17} />}
                      text={
                        nextSession.trainingCentre
                      }
                    />
                  </div>
                </div>

                <div className="rounded-xl bg-white px-5 py-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Status
                  </p>

                  <p className="mt-2 font-bold text-green-700">
                    {nextSession.status}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <EmptyState
              title="No upcoming training"
              description="There are currently no scheduled training sessions for this player."
            />
          )}
        </section>

        {/* UPCOMING SESSIONS */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <h2 className="font-bold text-slate-900">
              Upcoming Sessions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Scheduled training sessions for the player's academy team.
            </p>
          </div>

          {scheduledSessions.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {scheduledSessions.map(
                (session) => (
                  <div
                    key={session.id}
                    className="p-5 transition hover:bg-slate-50 lg:p-6"
                  >
                    <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <SessionStatus
                            status={
                              session.status
                            }
                          />

                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                            {
                              session.sessionType
                            }
                          </span>
                        </div>

                        <h3 className="mt-3 font-bold text-slate-900">
                          {session.title}
                        </h3>

                        <div className="mt-4 flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:flex-wrap sm:gap-x-6">
                          <SessionInfo
                            icon={
                              <CalendarDays
                                size={16}
                              />
                            }
                            text={formatDate(
                              session.date,
                            )}
                          />

                          <SessionInfo
                            icon={
                              <Clock3 size={16} />
                            }
                            text={`${session.startTime} – ${session.endTime}`}
                          />

                          <SessionInfo
                            icon={
                              <MapPin size={16} />
                            }
                            text={
                              session.trainingCentre
                            }
                          />
                        </div>
                      </div>

                      <div className="rounded-xl bg-slate-50 px-5 py-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Team
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-800">
                          {player.academyTeam ??
                            "Not Assigned"}
                        </p>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          ) : (
            <EmptyState
              title="No upcoming sessions"
              description="The academy has not scheduled any future sessions for this team yet."
            />
          )}
        </section>

        {/* SESSION HISTORY */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <h2 className="font-bold text-slate-900">
              Previous Sessions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Recently completed or cancelled academy sessions.
            </p>
          </div>

          {completedSessions.length +
            cancelledSessions.length >
          0 ? (
            <div className="divide-y divide-slate-100">
              {playerSessions
                .filter(
                  (session) =>
                    session.status ===
                      "Completed" ||
                    session.status ===
                      "Cancelled",
                )
                .slice()
                .reverse()
                .map((session) => (
                  <div
                    key={session.id}
                    className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center lg:p-6"
                  >
                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {session.title}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {formatDate(
                          session.date,
                        )}{" "}
                        • {session.startTime} –{" "}
                        {session.endTime}
                      </p>
                    </div>

                    <SessionStatus
                      status={session.status}
                    />
                  </div>
                ))}
            </div>
          ) : (
            <EmptyState
              title="No previous sessions"
              description="Previous training sessions will appear here."
            />
          )}
        </section>
      </div>
    </div>
  );
}

function StatCard({
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

      <p className="mt-1 break-words text-xl font-bold text-slate-950">
        {value}
      </p>
    </div>
  );
}

function SessionInfo({
  icon,
  text,
}: {
  icon: ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-green-600">
        {icon}
      </span>

      <span>{text}</span>
    </div>
  );
}

function SessionStatus({
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
      className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${styles}`}
    >
      {status}
    </span>
  );
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-10 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-300">
        <CalendarDays size={24} />
      </div>

      <h3 className="mt-4 font-bold text-slate-800">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}

function formatDate(date: string) {
  if (!date) {
    return "—";
  }

  return new Date(
    `${date}T00:00:00`,
  ).toLocaleDateString(
    "en-GB",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );
}

export default ParentSchedulePage;