import type {
  ReactNode,
} from "react";

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

import {
  Link,
} from "react-router";

import {
  getCoaches,
} from "../../../services/coachService";

import {
  getPlayers,
} from "../../../services/playerService";

import {
  getTeams,
} from "../../../services/teamService";

/* =========================================================
   TEAMS PAGE
========================================================= */

function TeamsPage() {
  const [teams] = useState(
    () => getTeams(),
  );

  const [
    searchTerm,
    setSearchTerm,
  ] = useState("");

  const players =
    getPlayers();

  const coaches =
    getCoaches();

  /* =======================================================
     FILTER TEAMS
  ======================================================= */

  const filteredTeams =
    useMemo(() => {
      const search =
        searchTerm
          .trim()
          .toLowerCase();

      return teams.filter(
        (team) =>
          !search ||
          team.name
            .toLowerCase()
            .includes(search) ||
          team.ageCategory
            .toLowerCase()
            .includes(search) ||
          team.centre
            .toLowerCase()
            .includes(search),
      );
    }, [
      teams,
      searchTerm,
    ]);

  /* =======================================================
     STATISTICS
  ======================================================= */

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

  const assignedCoaches =
    teams.filter(
      (team) =>
        team.headCoachId,
    ).length;

  return (
    <div className="w-full min-w-0">
      {/* ===================================================
          PAGE HEADER
      ==================================================== */}

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
          Sporting Operations
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
          Academy Teams
        </h1>

        <p
          className="
            mt-2
            max-w-3xl
            text-sm
            leading-6
            text-slate-500
            sm:text-base
          "
        >
          Manage academy teams,
          age categories, coaches and
          player assignments.
        </p>
      </div>

      {/* ===================================================
          STATISTICS
      ==================================================== */}

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
        <StatCard
          title="Total Teams"
          value={
            teams.length
          }
          icon={
            <Users
              size={20}
            />
          }
        />

        <StatCard
          title="Active Teams"
          value={
            activeTeams
          }
          icon={
            <Trophy
              size={20}
            />
          }
        />

        <StatCard
          title="Girls Teams"
          value={
            girlsTeams
          }
          icon={
            <Users
              size={20}
            />
          }
        />

        <StatCard
          title="Coaches Assigned"
          value={
            assignedCoaches
          }
          icon={
            <UserRoundCog
              size={20}
            />
          }
        />
      </div>

      {/* ===================================================
          TEAM DIRECTORY
      ==================================================== */}

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
        {/* SEARCH */}

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
              relative
              w-full
              max-w-md
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
              placeholder="Search teams, categories or centres..."
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

          <p className="mt-3 text-xs text-slate-400">
            Showing{" "}
            <span className="font-semibold text-slate-600">
              {
                filteredTeams.length
              }
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-600">
              {teams.length}
            </span>{" "}
            teams
          </p>
        </div>

        {/* TEAM CARDS */}

        {filteredTeams.length >
        0 ? (
          <div
            className="
              grid
              min-w-0
              grid-cols-1
              gap-4
              bg-slate-50/40
              p-3
              sm:p-5
              md:grid-cols-2
              xl:grid-cols-3
            "
          >
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
                    key={
                      team.id
                    }
                    to={`/admin/teams/${team.id}`}
                    className="
                      block
                      min-w-0
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      p-4
                      shadow-sm
                      transition

                      hover:-translate-y-0.5
                      hover:border-green-300
                      hover:shadow-md

                      sm:p-5
                    "
                  >
                    {/* CARD HEADER */}

                    <div
                      className="
                        flex
                        min-w-0
                        items-start
                        justify-between
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
                          rounded-lg
                          bg-green-50
                          text-green-600
                        "
                      >
                        <Trophy
                          size={21}
                        />
                      </div>

                      <TeamStatusBadge
                        status={
                          team.status
                        }
                      />
                    </div>

                    {/* TEAM */}

                    <h2
                      className="
                        mt-5
                        break-words
                        text-lg
                        font-bold
                        text-slate-900
                      "
                    >
                      {team.name}
                    </h2>

                    <p className="mt-1 break-words text-sm text-slate-500">
                      {
                        team.ageCategory
                      }{" "}
                      •{" "}
                      {
                        team.genderCategory
                      }
                    </p>

                    <p
                      className="
                        mt-2
                        break-words
                        text-sm
                        font-medium
                        text-slate-600
                      "
                    >
                      {
                        team.program
                      }
                    </p>

                    {/* DETAILS */}

                    <div
                      className="
                        mt-5
                        space-y-3
                        border-t
                        border-slate-100
                        pt-4
                        text-sm
                        text-slate-600
                      "
                    >
                      <TeamCardDetail
                        icon={
                          <Users
                            size={16}
                          />
                        }
                        value={`${playerCount} ${
                          playerCount ===
                          1
                            ? "Player"
                            : "Players"
                        }`}
                      />

                      <TeamCardDetail
                        icon={
                          <UserRoundCog
                            size={16}
                          />
                        }
                        value={
                          coach?.fullName ??
                          "No Head Coach"
                        }
                      />

                      <TeamCardDetail
                        icon={
                          <MapPin
                            size={16}
                          />
                        }
                        value={
                          team.centre
                        }
                      />
                    </div>

                    <div
                      className="
                        mt-5
                        text-sm
                        font-semibold
                        text-green-600
                      "
                    >
                      View Team →
                    </div>
                  </Link>
                );
              },
            )}
          </div>
        ) : (
          <div
            className="
              px-4
              py-12
              text-center
              sm:p-14
            "
          >
            <Users
              size={38}
              className="mx-auto text-slate-300"
            />

            <h2 className="mt-4 font-semibold text-slate-800">
              No teams found
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search
              term.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

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
          bg-green-50
          text-green-600
        "
      >
        {icon}
      </div>

      <p className="mt-4 break-words text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   TEAM CARD DETAIL
========================================================= */

function TeamCardDetail({
  icon,
  value,
}: {
  icon: ReactNode;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-start gap-2">
      <span className="mt-0.5 shrink-0 text-slate-400">
        {icon}
      </span>

      <span className="min-w-0 break-words">
        {value}
      </span>
    </div>
  );
}

/* =========================================================
   STATUS
========================================================= */

function TeamStatusBadge({
  status,
}: {
  status: string;
}) {
  const active =
    status === "Active";

  return (
    <span
      className={[
        `
          inline-flex
          max-w-full
          shrink-0
          rounded-full
          px-2.5
          py-1
          text-xs
          font-semibold
        `,
        active
          ? "bg-green-50 text-green-700"
          : "bg-slate-100 text-slate-600",
      ].join(" ")}
    >
      {status}
    </span>
  );
}

export default TeamsPage;