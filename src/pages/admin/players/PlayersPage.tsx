import {
  Filter,
  Plus,
  Search,
  Users,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import {
  Link,
} from "react-router";

import PlayerStatusBadge from "../../../components/players/PlayerStatusBadge";

import { getPlayers } from "../../../services/playerService";

import type {
  Gender,
  PlayerStatus,
} from "../../../shared/types/player";

function PlayersPage() {
 const [allPlayers] = useState(
  () => getPlayers(),
);

const players = allPlayers.filter(
  (player) =>
    player.registrationStatus !==
    "Rejected",
);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("");

  const [ageFilter, setAgeFilter] =
    useState("");

  const [genderFilter, setGenderFilter] =
    useState("");

  const filteredPlayers = useMemo(() => {
    return players.filter((player) => {
      const matchesSearch =
        player.fullName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        player.playerId
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        player.playingPosition
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        !statusFilter ||
        player.status === statusFilter;

      const matchesAge =
        !ageFilter ||
        player.ageCategory === ageFilter;

      const matchesGender =
        !genderFilter ||
        player.gender === genderFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesAge &&
        matchesGender
      );
    });
  }, [
    players,
    searchTerm,
    statusFilter,
    ageFilter,
    genderFilter,
  ]);

  const ageCategories = Array.from(
    new Set(
      players.map(
        (player) => player.ageCategory,
      ),
    ),
  );

  const statuses: PlayerStatus[] = [
    "Active",
    "Inactive",
    "Registered",
    "Pending Registration",
    "Suspended",
    "Injured",
    "On Trial",
    "Graduated",
    "Transferred",
    "Released",
  ];

  const genders: Gender[] = [
    "Male",
    "Female",
  ];

  const registeredPlayers =
    players.filter(
      (player) =>
        player.registrationStatus ===
        "Registered",
    ).length;

  const activePlayers =
    players.filter(
      (player) => player.status === "Active",
    ).length;

  const pendingPlayers =
    players.filter(
      (player) =>
        player.registrationStatus ===
        "Pending Registration",
    ).length;

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-green-600">
            Player Management
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Players
          </h1>

          <p className="mt-2 text-slate-500">
            Manage academy player registrations,
            profiles and statuses.
          </p>
        </div>

        <Link
          to="/admin/players/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          <Plus size={18} />

          Register Player
        </Link>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Users size={20} />
          </div>

          <p className="mt-4 text-sm text-slate-500">
            Total Players
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-900">
            {players.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Registered
          </p>

          <p className="mt-3 text-2xl font-bold text-slate-900">
            {registeredPlayers}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Active Players
          </p>

          <p className="mt-3 text-2xl font-bold text-green-600">
            {activePlayers}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Pending Registration
          </p>

          <p className="mt-3 text-2xl font-bold text-amber-600">
            {pendingPlayers}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-5">
          <div className="flex items-center gap-2">
            <Filter
              size={18}
              className="text-slate-400"
            />

            <h2 className="font-semibold text-slate-800">
              Player Filters
            </h2>
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-5">
            <div className="relative lg:col-span-2">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="search"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(
                    event.target.value,
                  )
                }
                placeholder="Search name, ID or position..."
                className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <select
              value={ageFilter}
              onChange={(event) =>
                setAgeFilter(
                  event.target.value,
                )
              }
              className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-green-500"
            >
              <option value="">
                All Age Categories
              </option>

              {ageCategories.map(
                (category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ),
              )}
            </select>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value,
                )
              }
              className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-green-500"
            >
              <option value="">
                All Statuses
              </option>

              {statuses.map((status) => (
                <option
                  key={status}
                  value={status}
                >
                  {status}
                </option>
              ))}
            </select>

            <select
              value={genderFilter}
              onChange={(event) =>
                setGenderFilter(
                  event.target.value,
                )
              }
              className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-green-500"
            >
              <option value="">
                All Genders
              </option>

              {genders.map((gender) => (
                <option
                  key={gender}
                  value={gender}
                >
                  {gender}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-5 py-4">
                  Player
                </th>

                <th className="px-5 py-4">
                  Player ID
                </th>

                <th className="px-5 py-4">
                  Age Category
                </th>

                <th className="px-5 py-4">
                  Position
                </th>

                <th className="px-5 py-4">
                  Team
                </th>

                <th className="px-5 py-4">
                  Status
                </th>

                <th className="px-5 py-4">
                  Joined
                </th>

                <th className="px-5 py-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredPlayers.map(
                (player) => (
                  <tr
                    key={player.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                          {player.fullName
                            .split(" ")
                            .map(
                              (name) =>
                                name[0],
                            )
                            .slice(0, 2)
                            .join("")}
                        </div>

                        <div>
                          <Link
                            to={`/admin/players/${player.id}`}
                            className="font-semibold text-slate-800 hover:text-green-600"
                          >
                            {player.fullName}
                          </Link>

                          <p className="mt-0.5 text-xs text-slate-500">
                            {player.gender}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <Link
                        to={`/admin/players/${player.id}`}
                        className="text-sm font-medium text-green-600 hover:underline"
                      >
                        {player.playerId}
                      </Link>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {player.ageCategory}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {player.playingPosition}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {player.academyTeam ??
                        "Not Assigned"}
                    </td>

                    <td className="px-5 py-4">
                      <PlayerStatusBadge
                        status={
                          player.status
                        }
                      />
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {new Date(
                        player.dateJoined,
                      ).toLocaleDateString()}
                    </td>

                    <td className="px-5 py-4">
                      <Link
                        to={`/admin/players/${player.id}`}
                        className="text-sm font-semibold text-green-600 hover:text-green-700"
                      >
                        View Profile
                      </Link>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>

          {filteredPlayers.length === 0 && (
            <div className="p-12 text-center">
              <Users
                size={35}
                className="mx-auto text-slate-300"
              />

              <p className="mt-3 font-medium text-slate-700">
                No players found
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Try changing your search or
                filters.
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {filteredPlayers.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {players.length}
            </span>{" "}
            players
          </p>
        </div>
      </div>
    </div>
  );
}

export default PlayersPage;