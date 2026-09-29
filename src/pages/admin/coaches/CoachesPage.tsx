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
    <div>
      <div>
        <p className="text-sm font-semibold text-green-600">
          Staff Management
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          Coaches
        </h1>

        <p className="mt-2 text-slate-500">
          Manage academy coaches,
          qualifications and team
          assignments.
        </p>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
        <div className="border-b border-slate-200 p-5">
          <div className="relative max-w-md">
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
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-green-500"
            />
          </div>
        </div>

        <div className="grid gap-5 p-5 md:grid-cols-2 xl:grid-cols-3">
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
                  className="rounded-xl border border-slate-200 p-5"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
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

                  <h2 className="mt-4 font-bold text-slate-900">
                    {coach.fullName}
                  </h2>

                  <p className="mt-1 text-sm font-medium text-green-600">
                    {coach.coachId}
                  </p>

                  <div className="mt-5 space-y-3 text-sm text-slate-600">
                    <div className="flex gap-2">
                      <Award
                        size={16}
                        className="text-slate-400"
                      />

                      {
                        coach.qualification
                      }
                    </div>

                    <div className="flex gap-2">
                      <Users
                        size={16}
                        className="text-slate-400"
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

                    <div className="flex gap-2">
                      <MapPin
                        size={16}
                        className="text-slate-400"
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

                    <p className="mt-1 text-sm font-medium text-slate-700">
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
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

export default CoachesPage;