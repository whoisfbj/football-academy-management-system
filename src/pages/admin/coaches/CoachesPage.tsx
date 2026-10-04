import {
  Award,
  MapPin,
  Search,
  UserRoundCog,
  Users,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import { getCoaches } from "../../../services/coachService";
import { getTeams } from "../../../services/teamService";

function CoachesPage() {
  const [coaches] = useState(
    () => getCoaches(),
  );

  const [searchTerm, setSearchTerm] =
    useState("");

  const teams = getTeams();

  const filteredCoaches =
    useMemo(() => {
      const search =
        searchTerm.toLowerCase();

      return coaches.filter(
        (coach) =>
          coach.fullName
            .toLowerCase()
            .includes(search) ||
          coach.coachId
            .toLowerCase()
            .includes(search) ||
          coach.specialization
            .toLowerCase()
            .includes(search),
      );
    }, [coaches, searchTerm]);

  const activeCoaches =
    coaches.filter(
      (coach) =>
        coach.employmentStatus ===
        "Active",
    ).length;

  return (
    <div className="w-full min-w-0">
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-green-600 sm:text-sm">
          Staff Management
        </p>

        <h1 className="mt-1 break-words text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
          Coaches
        </h1>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 sm:text-base">
          Manage academy coaches,
          qualifications and team
          assignments.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-7 sm:grid-cols-2 lg:grid-cols-3">
        <CoachStat
          title="Total Coaches"
          value={coaches.length}
        />

        <CoachStat
          title="Active Coaches"
          value={activeCoaches}
        />

        <CoachStat
          title="Teams Covered"
          value={
            new Set(
              coaches.flatMap(
                (coach) =>
                  coach.assignedTeamIds,
              ),
            ).size
          }
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
              placeholder="Search coaches..."
              className="w-full min-w-0 rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-base outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:text-sm"
            />
          </div>
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-4 bg-slate-50/40 p-3 sm:p-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredCoaches.map(
            (coach) => {
              const assignedTeams =
                teams.filter(
                  (team) =>
                    coach.assignedTeamIds.includes(
                      team.id,
                    ),
                );

              return (
                <div
                  key={coach.id}
                  className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
                >
                  <div className="flex min-w-0 items-start justify-between gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-100">
                      <UserRoundCog
                        size={22}
                        className="text-slate-500"
                      />
                    </div>

                    <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                      {
                        coach.employmentStatus
                      }
                    </span>
                  </div>

                  <h2 className="mt-4 break-words font-bold text-slate-900">
                    {coach.fullName}
                  </h2>

                  <p className="mt-1 text-sm font-medium text-green-600">
                    {coach.coachId}
                  </p>

                  <div className="mt-5 space-y-3 text-sm text-slate-600">
                    <div className="flex min-w-0 items-start gap-2">
                      <Award
                        size={16}
                        className="mt-0.5 shrink-0 text-slate-400"
                      />

                      {
                        coach.qualification
                      }
                    </div>

                    <div className="flex min-w-0 items-start gap-2">
                      <Users
                        size={16}
                        className="mt-0.5 shrink-0 text-slate-400"
                      />

                      {assignedTeams.length >
                      0
                        ? assignedTeams
                            .map(
                              (team) =>
                                team.name,
                            )
                            .join(", ")
                        : "No team assigned"}
                    </div>

                    <div className="flex min-w-0 items-start gap-2">
                      <MapPin
                        size={16}
                        className="mt-0.5 shrink-0 text-slate-400"
                      />

                      {
                        coach.trainingCentre
                      }
                    </div>
                  </div>

                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                      Specialization
                    </p>

                    <p className="mt-1 break-words text-sm font-medium text-slate-700">
                      {
                        coach.specialization
                      }
                    </p>
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

interface CoachStatProps {
  title: string;
  value: number;
}

function CoachStat({
  title,
  value,
}: CoachStatProps) {
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

export default CoachesPage;