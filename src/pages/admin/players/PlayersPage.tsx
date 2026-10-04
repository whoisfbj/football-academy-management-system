import {
  Filter,
  Plus,
  Search,
  UserRound,
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

import {
  getPlayers,
} from "../../../services/playerService";

import type {
  Gender,
  PlayerStatus,
} from "../../../shared/types/player";

function PlayersPage() {
  const [allPlayers] = useState(
    () => getPlayers(),
  );

  /*
    Rejected registrations should not appear
    in the normal Players directory.
  */
  const players = allPlayers.filter(
    (player) =>
      player.registrationStatus !==
      "Rejected",
  );

  const [
    searchTerm,
    setSearchTerm,
  ] = useState("");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState("");

  const [
    ageFilter,
    setAgeFilter,
  ] = useState("");

  const [
    genderFilter,
    setGenderFilter,
  ] = useState("");

  /*
    Filter players based on search
    and selected filter options.
  */
  const filteredPlayers =
    useMemo(() => {
      const normalizedSearch =
        searchTerm
          .trim()
          .toLowerCase();

      return players.filter(
        (player) => {
          const matchesSearch =
            !normalizedSearch ||
            player.fullName
              .toLowerCase()
              .includes(
                normalizedSearch,
              ) ||
            player.playerId
              .toLowerCase()
              .includes(
                normalizedSearch,
              ) ||
            player.playingPosition
              .toLowerCase()
              .includes(
                normalizedSearch,
              );

          const matchesStatus =
            !statusFilter ||
            player.status ===
              statusFilter;

          const matchesAge =
            !ageFilter ||
            player.ageCategory ===
              ageFilter;

          const matchesGender =
            !genderFilter ||
            player.gender ===
              genderFilter;

          return (
            matchesSearch &&
            matchesStatus &&
            matchesAge &&
            matchesGender
          );
        },
      );
    }, [
      players,
      searchTerm,
      statusFilter,
      ageFilter,
      genderFilter,
    ]);

  const ageCategories =
    Array.from(
      new Set(
        players.map(
          (player) =>
            player.ageCategory,
        ),
      ),
    );

  const statuses: PlayerStatus[] =
    [
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
      (player) =>
        player.status === "Active",
    ).length;

  const pendingPlayers =
    players.filter(
      (player) =>
        player.registrationStatus ===
        "Pending Registration",
    ).length;

  const hasActiveFilters =
    searchTerm ||
    statusFilter ||
    ageFilter ||
    genderFilter;

  function clearFilters() {
    setSearchTerm("");
    setStatusFilter("");
    setAgeFilter("");
    setGenderFilter("");
  }

  return (
    <div className="w-full min-w-0">
      {/* =====================================
          PAGE HEADER
      ====================================== */}

      <div
        className="
          flex
          min-w-0
          flex-col
          gap-4
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <div className="min-w-0">
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-wide
              text-green-600
              sm:text-sm
            "
          >
            Player Management
          </p>

          <h1
            className="
              mt-1
              break-words
              text-2xl
              font-bold
              leading-tight
              text-slate-900
              sm:text-3xl
            "
          >
            Players
          </h1>

          <p
            className="
              mt-2
              max-w-2xl
              text-sm
              leading-6
              text-slate-500
              sm:text-base
            "
          >
            Manage academy player
            registrations, profiles and
            statuses.
          </p>
        </div>

        <Link
          to="/admin/players/new"
          className="
            inline-flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-lg
            bg-green-600
            px-4
            py-3
            text-sm
            font-semibold
            text-white
            transition

            hover:bg-green-700

            sm:w-auto
            sm:py-2.5
          "
        >
          <Plus
            size={18}
            className="shrink-0"
          />

          Register Player
        </Link>
      </div>

      {/* =====================================
          STATISTICS
      ====================================== */}

      <div
        className="
          mt-6
          grid
          grid-cols-1
          gap-4
          sm:mt-7
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        {/* TOTAL */}

        <div
          className="
            min-w-0
            rounded-xl
            border
            border-slate-200
            bg-white
            p-4
            shadow-sm
            sm:p-5
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-lg
              bg-blue-50
              text-blue-600
            "
          >
            <Users size={20} />
          </div>

          <p className="mt-4 text-sm text-slate-500">
            Total Players
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-900">
            {players.length}
          </p>
        </div>

        {/* REGISTERED */}

        <div
          className="
            min-w-0
            rounded-xl
            border
            border-slate-200
            bg-white
            p-4
            shadow-sm
            sm:p-5
          "
        >
          <p className="text-sm text-slate-500">
            Registered
          </p>

          <p className="mt-3 text-2xl font-bold text-slate-900">
            {registeredPlayers}
          </p>
        </div>

        {/* ACTIVE */}

        <div
          className="
            min-w-0
            rounded-xl
            border
            border-slate-200
            bg-white
            p-4
            shadow-sm
            sm:p-5
          "
        >
          <p className="text-sm text-slate-500">
            Active Players
          </p>

          <p className="mt-3 text-2xl font-bold text-green-600">
            {activePlayers}
          </p>
        </div>

        {/* PENDING */}

        <div
          className="
            min-w-0
            rounded-xl
            border
            border-slate-200
            bg-white
            p-4
            shadow-sm
            sm:p-5
          "
        >
          <p className="text-sm text-slate-500">
            Pending Registration
          </p>

          <p className="mt-3 text-2xl font-bold text-amber-600">
            {pendingPlayers}
          </p>
        </div>
      </div>

      {/* =====================================
          FILTERS + PLAYER LIST
      ====================================== */}

      <section
        className="
          mt-6
          min-w-0
          overflow-hidden
          rounded-xl
          border
          border-slate-200
          bg-white
          shadow-sm
        "
      >
        {/* FILTER HEADER */}

        <div
          className="
            border-b
            border-slate-200
            p-4
            sm:p-5
          "
        >
          <div
            className="
              flex
              flex-col
              gap-3
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div className="flex items-center gap-2">
              <Filter
                size={18}
                className="shrink-0 text-slate-400"
              />

              <h2 className="font-semibold text-slate-800">
                Player Filters
              </h2>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={
                  clearFilters
                }
                className="
                  w-fit
                  text-sm
                  font-semibold
                  text-green-600
                  transition
                  hover:text-green-700
                "
              >
                Clear filters
              </button>
            )}
          </div>

          {/* FILTER INPUTS */}

          <div
            className="
              mt-4
              grid
              grid-cols-1
              gap-3
              sm:grid-cols-2
              lg:grid-cols-5
            "
          >
            {/* SEARCH */}

            <div
              className="
                relative
                min-w-0
                sm:col-span-2
                lg:col-span-2
              "
            >
              <Search
                size={17}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="search"
                value={
                  searchTerm
                }
                onChange={(event) =>
                  setSearchTerm(
                    event.target.value,
                  )
                }
                placeholder="Search name, ID or position..."
                className="
                  w-full
                  min-w-0
                  rounded-lg
                  border
                  border-slate-200
                  bg-white
                  py-2.5
                  pl-10
                  pr-4
                  text-base
                  outline-none
                  transition

                  focus:border-green-500
                  focus:ring-2
                  focus:ring-green-100

                  sm:text-sm
                "
              />
            </div>

            {/* AGE */}

            <select
              value={
                ageFilter
              }
              onChange={(event) =>
                setAgeFilter(
                  event.target.value,
                )
              }
              className="
                w-full
                min-w-0
                rounded-lg
                border
                border-slate-200
                bg-white
                px-3
                py-2.5
                text-base
                outline-none

                focus:border-green-500
                focus:ring-2
                focus:ring-green-100

                sm:text-sm
              "
            >
              <option value="">
                All Age Categories
              </option>

              {ageCategories.map(
                (category) => (
                  <option
                    key={
                      category
                    }
                    value={
                      category
                    }
                  >
                    {
                      category
                    }
                  </option>
                ),
              )}
            </select>

            {/* STATUS */}

            <select
              value={
                statusFilter
              }
              onChange={(event) =>
                setStatusFilter(
                  event.target.value,
                )
              }
              className="
                w-full
                min-w-0
                rounded-lg
                border
                border-slate-200
                bg-white
                px-3
                py-2.5
                text-base
                outline-none

                focus:border-green-500
                focus:ring-2
                focus:ring-green-100

                sm:text-sm
              "
            >
              <option value="">
                All Statuses
              </option>

              {statuses.map(
                (status) => (
                  <option
                    key={
                      status
                    }
                    value={
                      status
                    }
                  >
                    {
                      status
                    }
                  </option>
                ),
              )}
            </select>

            {/* GENDER */}

            <select
              value={
                genderFilter
              }
              onChange={(event) =>
                setGenderFilter(
                  event.target.value,
                )
              }
              className="
                w-full
                min-w-0
                rounded-lg
                border
                border-slate-200
                bg-white
                px-3
                py-2.5
                text-base
                outline-none

                focus:border-green-500
                focus:ring-2
                focus:ring-green-100

                sm:text-sm
              "
            >
              <option value="">
                All Genders
              </option>

              {genders.map(
                (gender) => (
                  <option
                    key={
                      gender
                    }
                    value={
                      gender
                    }
                  >
                    {
                      gender
                    }
                  </option>
                ),
              )}
            </select>
          </div>
        </div>

        {/* =====================================
            MOBILE PLAYER CARDS
        ====================================== */}

        <div
          className="
            space-y-3
            bg-slate-50/50
            p-3
            md:hidden
          "
        >
          {filteredPlayers.map(
            (player) => (
              <article
                key={player.id}
                className="
                  min-w-0
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  p-4
                  shadow-sm
                "
              >
                {/* PLAYER HEADER */}

                <div
                  className="
                    flex
                    min-w-0
                    items-start
                    gap-3
                  "
                >
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-full
                      bg-slate-900
                      text-sm
                      font-semibold
                      text-white
                    "
                  >
                    {player.passportPhoto ? (
                      <img
                        src={
                          player.passportPhoto
                        }
                        alt={
                          player.fullName
                        }
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span>
                        {getInitials(
                          player.fullName,
                        )}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <Link
                      to={`/admin/players/${player.id}`}
                      className="
                        block
                        truncate
                        font-semibold
                        text-slate-900
                        transition
                        hover:text-green-600
                      "
                    >
                      {player.fullName}
                    </Link>

                    <Link
                      to={`/admin/players/${player.id}`}
                      className="
                        mt-0.5
                        block
                        truncate
                        text-xs
                        font-semibold
                        text-green-600
                      "
                    >
                      {player.playerId}
                    </Link>
                  </div>

                  <div className="shrink-0">
                    <PlayerStatusBadge
                      status={
                        player.status
                      }
                    />
                  </div>
                </div>

                {/* DETAILS */}

                <div
                  className="
                    mt-4
                    grid
                    grid-cols-2
                    gap-x-4
                    gap-y-3
                    border-t
                    border-slate-100
                    pt-4
                  "
                >
                  <MobileDetail
                    label="Age Category"
                    value={
                      player.ageCategory
                    }
                  />

                  <MobileDetail
                    label="Gender"
                    value={
                      player.gender
                    }
                  />

                  <MobileDetail
                    label="Position"
                    value={
                      player.playingPosition
                    }
                  />

                  <MobileDetail
                    label="Joined"
                    value={new Date(
                      player.dateJoined,
                    ).toLocaleDateString()}
                  />

                  <div className="col-span-2 min-w-0">
                    <p className="text-xs text-slate-400">
                      Academy Team
                    </p>

                    <p
                      className="
                        mt-1
                        break-words
                        text-sm
                        font-medium
                        text-slate-700
                      "
                    >
                      {player.academyTeam ??
                        "Not Assigned"}
                    </p>
                  </div>
                </div>

                {/* ACTION */}

                <Link
                  to={`/admin/players/${player.id}`}
                  className="
                    mt-4
                    inline-flex
                    w-full
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-green-200
                    bg-green-50
                    px-4
                    py-2.5
                    text-sm
                    font-semibold
                    text-green-700
                    transition

                    hover:bg-green-100
                  "
                >
                  View Profile
                </Link>
              </article>
            ),
          )}

          {filteredPlayers.length ===
            0 && (
            <EmptyPlayers />
          )}
        </div>

        {/* =====================================
            TABLET / DESKTOP TABLE
        ====================================== */}

        <div
          className="
            hidden
            w-full
            overflow-x-auto
            md:block
          "
        >
          <table
            className="
              w-full
              min-w-[1000px]
              border-collapse
            "
          >
            <thead className="bg-slate-50">
              <tr
                className="
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500
                "
              >
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
                    key={
                      player.id
                    }
                    className="
                      transition
                      hover:bg-slate-50
                    "
                  >
                    {/* PLAYER */}

                    <td className="px-5 py-4">
                      <div
                        className="
                          flex
                          min-w-0
                          items-center
                          gap-3
                        "
                      >
                        <div
                          className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            overflow-hidden
                            rounded-full
                            bg-slate-900
                            text-sm
                            font-semibold
                            text-white
                          "
                        >
                          {player.passportPhoto ? (
                            <img
                              src={
                                player.passportPhoto
                              }
                              alt={
                                player.fullName
                              }
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            getInitials(
                              player.fullName,
                            )
                          )}
                        </div>

                        <div className="min-w-0">
                          <Link
                            to={`/admin/players/${player.id}`}
                            className="
                              block
                              max-w-[180px]
                              truncate
                              font-semibold
                              text-slate-800
                              hover:text-green-600
                            "
                          >
                            {player.fullName}
                          </Link>

                          <p className="mt-0.5 text-xs text-slate-500">
                            {
                              player.gender
                            }
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* PLAYER ID */}

                    <td className="px-5 py-4">
                      <Link
                        to={`/admin/players/${player.id}`}
                        className="
                          text-sm
                          font-medium
                          text-green-600
                          hover:underline
                        "
                      >
                        {
                          player.playerId
                        }
                      </Link>
                    </td>

                    {/* AGE */}

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {
                        player.ageCategory
                      }
                    </td>

                    {/* POSITION */}

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {
                        player.playingPosition
                      }
                    </td>

                    {/* TEAM */}

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {player.academyTeam ??
                        "Not Assigned"}
                    </td>

                    {/* STATUS */}

                    <td className="px-5 py-4">
                      <PlayerStatusBadge
                        status={
                          player.status
                        }
                      />
                    </td>

                    {/* JOINED */}

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {new Date(
                        player.dateJoined,
                      ).toLocaleDateString()}
                    </td>

                    {/* ACTION */}

                    <td className="px-5 py-4">
                      <Link
                        to={`/admin/players/${player.id}`}
                        className="
                          whitespace-nowrap
                          text-sm
                          font-semibold
                          text-green-600
                          hover:text-green-700
                        "
                      >
                        View Profile
                      </Link>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>

          {filteredPlayers.length ===
            0 && (
            <EmptyPlayers />
          )}
        </div>

        {/* =====================================
            RESULT COUNT
        ====================================== */}

        <div
          className="
            flex
            min-w-0
            flex-col
            gap-2
            border-t
            border-slate-200
            px-4
            py-4
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:px-5
          "
        >
          <p
            className="
              break-words
              text-sm
              text-slate-500
            "
          >
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {
                filteredPlayers.length
              }
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {players.length}
            </span>{" "}
            players
          </p>
        </div>
      </section>
    </div>
  );
}

/* =========================================
   MOBILE DETAIL
========================================= */

function MobileDetail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p
        className="
          mt-1
          break-words
          text-sm
          font-medium
          text-slate-700
        "
      >
        {value}
      </p>
    </div>
  );
}

/* =========================================
   EMPTY STATE
========================================= */

function EmptyPlayers() {
  return (
    <div
      className="
        px-4
        py-10
        text-center
        sm:p-12
      "
    >
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
  );
}

/* =========================================
   INITIALS
========================================= */

function getInitials(
  fullName: string,
) {
  const initials =
    fullName
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map(
        (name) =>
          name[0]?.toUpperCase() ??
          "",
      )
      .slice(0, 2)
      .join("");

  return (
    initials || (
      <UserRound size={18} />
    )
  );
}

export default PlayersPage;