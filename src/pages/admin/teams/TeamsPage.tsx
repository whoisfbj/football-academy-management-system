import type { ReactNode } from "react";
import {
  MapPin,
  Search,
  Trophy,
  UserRoundCog,
  Users,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import { Link } from "react-router";

import { getCoaches } from "../../../services/coachService";
import { getPlayers } from "../../../services/playerService";
import { getTeams } from "../../../services/teamService";

function TeamsPage() {
  const [teams] = useState(
    () => getTeams(),
  );

  const [searchTerm, setSearchTerm] =
    useState("");

  const players = getPlayers();
  const coaches = getCoaches();

  const filteredTeams =
    useMemo(() => {
      return teams.filter(
        (team) => {
          const search =
            searchTerm.toLowerCase();

          return (
            team.name
              .toLowerCase()
              .includes(search) ||
            team.ageCategory
              .toLowerCase()
              .includes(search) ||
            team.centre
              .toLowerCase()
              .includes(search)
          );
        },
      );
    }, [teams, searchTerm]);

  const activeTeams =
    teams.filter(
      (team) =>
        team.status ===
        "Active",
    ).length;

  const girlsTeams =
    teams.filter(
      (team) =>
        team.genderCategory ===
        "Girls",
    ).length;

  return (
    <div>
      <div>
        <p className="text-sm font-semibold text-green-600">
          Sporting Operations
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          Academy Teams
        </h1>

        <p className="mt-2 text-slate-500">
          Manage academy teams,
          age categories, coaches
          and player assignments.
        </p>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Teams"
          value={teams.length}
          icon={<Users size={20} />}
        />

        <StatCard
          title="Active Teams"
          value={activeTeams}
          icon={<Trophy size={20} />}
        />

        <StatCard
          title="Girls Teams"
          value={girlsTeams}
          icon={<Users size={20} />}
        />

        <StatCard
          title="Coaches Assigned"
          value={
            teams.filter(
              (team) =>
                team.headCoachId,
            ).length
          }
          icon={
            <UserRoundCog
              size={20}
            />
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
              placeholder="Search teams..."
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </div>
        </div>

        <div className="grid gap-5 p-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredTeams.map(
            (team) => {
              const coach =
                team.headCoachId
                  ? coaches.find(
                      (item) =>
                        item.id ===
                        team.headCoachId,
                    )
                  : undefined;

              const playerCount =
                players.filter(
                  (player) =>
                    player.academyTeam ===
                      team.name &&
                    player.registrationStatus ===
                      "Registered",
                ).length;

              return (
                <Link
                  key={team.id}
                  to={`/admin/teams/${team.id}`}
                  className="rounded-xl border border-slate-200 p-5 transition hover:border-green-300 hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-50 text-green-600">
                      <Trophy
                        size={21}
                      />
                    </div>

                    <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                      {team.status}
                    </span>
                  </div>

                  <h2 className="mt-5 text-lg font-bold text-slate-900">
                    {team.name}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {
                      team.ageCategory
                    }{" "}
                    •{" "}
                    {
                      team.genderCategory
                    }
                  </p>

                  <div className="mt-5 space-y-3 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Users
                        size={16}
                        className="text-slate-400"
                      />

                      {playerCount} Players
                    </div>

                    <div className="flex items-center gap-2">
                      <UserRoundCog
                        size={16}
                        className="text-slate-400"
                      />

                      {coach?.fullName ??
                        "No Head Coach"}
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin
                        size={16}
                        className="text-slate-400"
                      />

                      {
                        team.centre
                      }
                    </div>
                  </div>
                </Link>
              );
            },
          )}
        </div>
      </section>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
}

function StatCard({
  title,
  value,
  icon,
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
        {icon}
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

export default TeamsPage;