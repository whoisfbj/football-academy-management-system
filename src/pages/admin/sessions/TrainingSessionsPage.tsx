import {
  CalendarDays,
  Clock3,
  MapPin,
  Search,
  UserRoundCog,
  Users,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import { Link } from "react-router";

import { getCoaches } from "../../../services/coachService";
import { getSessions } from "../../../services/sessionService";
import { getTeams } from "../../../services/teamService";

function TrainingSessionsPage() {
  const [sessions] = useState(
    () => getSessions(),
  );

  const [searchTerm, setSearchTerm] =
    useState("");

  const teams = getTeams();
  const coaches = getCoaches();

  const filteredSessions =
    useMemo(() => {
      const search =
        searchTerm.toLowerCase();

      return sessions.filter(
        (session) =>
          session.title
            .toLowerCase()
            .includes(search) ||
          session.sessionType
            .toLowerCase()
            .includes(search) ||
          session.trainingCentre
            .toLowerCase()
            .includes(search),
      );
    }, [
      sessions,
      searchTerm,
    ]);

  const scheduled =
    sessions.filter(
      (session) =>
        session.status ===
        "Scheduled",
    ).length;

  const completed =
    sessions.filter(
      (session) =>
        session.status ===
        "Completed",
    ).length;

  return (
    <div className="w-full min-w-0">
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-green-600 sm:text-sm">
          Academy Operations
        </p>

        <h1 className="mt-1 break-words text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
          Training Sessions
        </h1>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 sm:text-base">
          Manage scheduled training,
          team sessions and attendance.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-7 sm:grid-cols-3">
        <SessionStat
          title="Total Sessions"
          value={sessions.length}
        />

        <SessionStat
          title="Scheduled"
          value={scheduled}
        />

        <SessionStat
          title="Completed"
          value={completed}
        />
      </div>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-4 sm:p-5">
          <div className="relative w-full max-w-md">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(
                  event.target.value,
                )
              }
              placeholder="Search sessions..."
              className="w-full min-w-0 rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-base outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:text-sm"
            />
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredSessions.map(
            (session) => {
              const team =
                teams.find(
                  (item) =>
                    item.id ===
                    session.teamId,
                );

              const coach =
                coaches.find(
                  (item) =>
                    item.id ===
                    session.coachId,
                );

              return (
                <div
                  key={session.id}
                  className="min-w-0 p-4 sm:p-5"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex min-w-0 flex-wrap items-center gap-3">
                        <h2 className="break-words font-bold text-slate-900">
                          {
                            session.title
                          }
                        </h2>

                        <span
                          className={[
                            "rounded-full px-2.5 py-1 text-xs font-semibold",
                            session.status ===
                            "Completed"
                              ? "bg-green-50 text-green-700"
                              : session.status ===
                                  "Cancelled"
                                ? "bg-red-50 text-red-700"
                                : "bg-blue-50 text-blue-700",
                          ].join(
                            " ",
                          )}
                        >
                          {
                            session.status
                          }
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-slate-500">
                        {
                          session.sessionType
                        }
                      </p>

                      <div className="mt-4 grid min-w-0 grid-cols-1 gap-2 text-sm text-slate-600 sm:grid-cols-2 xl:flex xl:flex-wrap xl:gap-x-6">
                        <span className="flex min-w-0 items-start gap-2">
                          <Users
                            size={15}
                          />

                          {team?.name ??
                            "Unknown Team"}
                        </span>

                        <span className="flex min-w-0 items-start gap-2">
                          <UserRoundCog
                            size={15}
                          />

                          {coach?.fullName ??
                            "Unknown Coach"}
                        </span>

                        <span className="flex min-w-0 items-start gap-2">
                          <MapPin
                            size={15}
                          />

                          {
                            session.trainingCentre
                          }
                        </span>
                      </div>
                    </div>

                    <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center">
                      <div className="text-sm">
                        <div className="flex items-center gap-2 font-semibold text-slate-700">
                          <CalendarDays
                            size={16}
                          />

                          {new Date(
                            `${session.date}T00:00:00`,
                          ).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </div>

                        <div className="mt-1 flex items-center gap-2 text-slate-500">
                          <Clock3
                            size={16}
                          />

                          {
                            session.startTime
                          }{" "}
                          –{" "}
                          {
                            session.endTime
                          }
                        </div>
                      </div>

                      <Link
                        to={`/admin/sessions/${session.id}/attendance`}
                        className="inline-flex w-full items-center justify-center rounded-lg bg-green-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-green-700 sm:w-auto"
                      >
                        Take Attendance
                      </Link>
                    </div>
                  </div>
                </div>
              );
            },
          )}
        </div>
      </section>
    </div>
  );
}

interface SessionStatProps {
  title: string;
  value: number;
}

function SessionStat({
  title,
  value,
}: SessionStatProps) {
  return (
    <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
        {value}
      </p>
    </div>
  );
}

export default TrainingSessionsPage;