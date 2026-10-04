import type {
  ReactNode,
} from "react";

import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Trophy,
  UserRound,
  UserRoundCog,
  Users,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router";

import {
  getCoaches,
} from "../../../services/coachService";

import {
  getPlayers,
} from "../../../services/playerService";

import {
  getTeamById,
} from "../../../services/teamService";

import PlayerStatusBadge from "../../../components/players/PlayerStatusBadge";

/* =========================================================
   TEAM PROFILE
========================================================= */

function TeamProfilePage() {
  const {
    teamId,
  } = useParams();

  const team = teamId
    ? getTeamById(teamId)
    : undefined;

  /* =======================================================
     TEAM NOT FOUND
  ======================================================= */

  if (!team) {
    return (
      <div className="w-full min-w-0">
        <Link
          to="/admin/teams"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-slate-500
            transition
            hover:text-green-600
          "
        >
          <ArrowLeft
            size={17}
          />

          Back to Teams
        </Link>

        <div
          className="
            mt-8
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            py-10
            text-center
            shadow-sm
            sm:p-12
          "
        >
          <Trophy
            size={40}
            className="mx-auto text-slate-300"
          />

          <h2 className="mt-4 text-lg font-bold text-slate-900">
            Team not found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            The requested academy team
            could not be found.
          </p>
        </div>
      </div>
    );
  }

  /* =======================================================
     TEAM DATA
  ======================================================= */

  const players =
    getPlayers().filter(
      (player) =>
        player.academyTeam ===
        team.name,
    );

  const coaches =
    getCoaches();

  const headCoach =
    team.headCoachId
      ? coaches.find(
          (coach) =>
            coach.id ===
            team.headCoachId,
        )
      : undefined;

  return (
    <div className="w-full min-w-0">
      {/* ===================================================
          BACK
      ==================================================== */}

      <Link
        to="/admin/teams"
        className="
          inline-flex
          items-center
          gap-2
          text-sm
          font-medium
          text-slate-500
          transition
          hover:text-green-600
        "
      >
        <ArrowLeft
          size={17}
        />

        Back to Teams
      </Link>

      {/* ===================================================
          TEAM HERO
      ==================================================== */}

      <section
        className="
          mt-5
          min-w-0
          overflow-hidden
          rounded-xl
          bg-slate-950
          p-4
          text-white
          shadow-sm
          sm:p-6
          lg:p-7
        "
      >
        <div
          className="
            flex
            min-w-0
            flex-col
            gap-5
            sm:flex-row
            sm:items-start
            sm:justify-between
          "
        >
          <div className="min-w-0">
            <p
              className="
                break-words
                text-sm
                font-semibold
                text-green-400
              "
            >
              {team.ageCategory}
              {" • "}
              {team.genderCategory}
            </p>

            <h1
              className="
                mt-2
                break-words
                text-2xl
                font-bold
                leading-tight
                sm:text-3xl
              "
            >
              {team.name}
            </h1>

            <p
              className="
                mt-3
                max-w-2xl
                break-words
                text-sm
                leading-6
                text-slate-300
              "
            >
              {team.program}
            </p>
          </div>

          <span
            className="
              w-fit
              shrink-0
              rounded-full
              bg-green-500/10
              px-3
              py-1.5
              text-sm
              font-semibold
              text-green-300
            "
          >
            {team.status}
          </span>
        </div>
      </section>

      {/* ===================================================
          TEAM STATISTICS
      ==================================================== */}

      <div
        className="
          mt-6
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          lg:grid-cols-3
          lg:gap-6
        "
      >
        <TeamInfoCard
          icon={
            <Users
              size={20}
            />
          }
          title="Players"
          value={`${players.length}`}
        />

        <TeamInfoCard
          icon={
            <UserRoundCog
              size={20}
            />
          }
          title="Head Coach"
          value={
            headCoach?.fullName ??
            "Not Assigned"
          }
        />

        <TeamInfoCard
          icon={
            <MapPin
              size={20}
            />
          }
          title="Training Centre"
          value={
            team.centre
          }
        />
      </div>

      {/* ===================================================
          MAIN CONTENT
      ==================================================== */}

      <div
        className="
          mt-6
          grid
          min-w-0
          grid-cols-1
          gap-6
          xl:grid-cols-3
        "
      >
        {/* =================================================
            PLAYER ROSTER
        ================================================== */}

        <section
          className="
            min-w-0
            overflow-hidden
            rounded-xl
            border
            border-slate-200
            bg-white
            shadow-sm
            xl:col-span-2
          "
        >
          <div
            className="
              border-b
              border-slate-200
              p-4
              sm:p-6
            "
          >
            <div
              className="
                flex
                min-w-0
                flex-col
                gap-2
                sm:flex-row
                sm:items-start
                sm:justify-between
              "
            >
              <div className="min-w-0">
                <h2 className="text-lg font-bold text-slate-900">
                  Team Players
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Current player roster.
                </p>
              </div>

              <span
                className="
                  w-fit
                  shrink-0
                  rounded-full
                  bg-slate-100
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  text-slate-600
                "
              >
                {players.length}{" "}
                {players.length ===
                1
                  ? "Player"
                  : "Players"}
              </span>
            </div>
          </div>

          {/* ===============================================
              MOBILE ROSTER
          ================================================ */}

          <div
            className="
              space-y-3
              bg-slate-50/50
              p-3
              md:hidden
            "
          >
            {players.map(
              (player) => (
                <article
                  key={
                    player.id
                  }
                  className="
                    min-w-0
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    p-4
                  "
                >
                  <div
                    className="
                      flex
                      min-w-0
                      items-start
                      gap-3
                    "
                  >
                    {/* AVATAR */}

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
                        bg-slate-100
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
                        <UserRound
                          size={19}
                          className="text-slate-400"
                        />
                      )}
                    </div>

                    {/* PLAYER */}

                    <div className="min-w-0 flex-1">
                      <Link
                        to={`/admin/players/${player.id}`}
                        className="
                          block
                          break-words
                          font-semibold
                          text-slate-900
                          transition
                          hover:text-green-600
                        "
                      >
                        {
                          player.fullName
                        }
                      </Link>

                      <p
                        className="
                          mt-0.5
                          break-all
                          text-xs
                          font-semibold
                          text-green-600
                        "
                      >
                        {
                          player.playerId
                        }
                      </p>
                    </div>

                    <div className="shrink-0">
                      <PlayerStatusBadge
                        status={
                          player.status
                        }
                      />
                    </div>
                  </div>

                  {/* PLAYER DETAILS */}

                  <div
                    className="
                      mt-4
                      border-t
                      border-slate-100
                      pt-4
                    "
                  >
                    <Detail
                      label="Position"
                      value={
                        player.playingPosition
                      }
                    />
                  </div>

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
                    View Player Profile
                  </Link>
                </article>
              ),
            )}

            {players.length ===
              0 && (
              <EmptyRoster />
            )}
          </div>

          {/* ===============================================
              TABLET / DESKTOP ROSTER
          ================================================ */}

          <div
            className="
              hidden
              w-full
              overflow-x-auto
              md:block
            "
          >
            <table className="w-full min-w-[700px]">
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
                    Position
                  </th>

                  <th className="px-5 py-4">
                    Status
                  </th>

                  <th className="px-5 py-4">
                    Profile
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {players.map(
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
                              bg-slate-100
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
                              <UserRound
                                size={
                                  18
                                }
                                className="text-slate-400"
                              />
                            )}
                          </div>

                          <div className="min-w-0">
                            <p
                              className="
                                max-w-[220px]
                                truncate
                                font-semibold
                                text-slate-800
                              "
                            >
                              {
                                player.fullName
                              }
                            </p>

                            <p className="mt-0.5 text-xs text-green-600">
                              {
                                player.playerId
                              }
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {
                          player.playingPosition
                        }
                      </td>

                      <td className="px-5 py-4">
                        <PlayerStatusBadge
                          status={
                            player.status
                          }
                        />
                      </td>

                      <td className="px-5 py-4">
                        <Link
                          to={`/admin/players/${player.id}`}
                          className="
                            whitespace-nowrap
                            text-sm
                            font-semibold
                            text-green-600
                            transition
                            hover:text-green-700
                            hover:underline
                          "
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>

            {players.length ===
              0 && (
              <EmptyRoster />
            )}
          </div>
        </section>

        {/* =================================================
            SIDEBAR INFORMATION
        ================================================== */}

        <div className="min-w-0 space-y-6">
          {/* TEAM INFORMATION */}

          <section
            className="
              min-w-0
              rounded-xl
              border
              border-slate-200
              bg-white
              p-4
              shadow-sm
              sm:p-6
            "
          >
            <Trophy className="text-green-600" />

            <h2 className="mt-4 font-bold text-slate-900">
              Team Information
            </h2>

            <div className="mt-5 space-y-4">
              <Detail
                label="Age Category"
                value={
                  team.ageCategory
                }
              />

              <Detail
                label="Gender Category"
                value={
                  team.genderCategory
                }
              />

              <Detail
                label="Academy Branch"
                value={
                  team.branch
                }
              />

              <Detail
                label="Program"
                value={
                  team.program
                }
              />

              <Detail
                label="Training Centre"
                value={
                  team.centre
                }
              />
            </div>
          </section>

          {/* TRAINING */}

          <section
            className="
              min-w-0
              rounded-xl
              border
              border-slate-200
              bg-white
              p-4
              shadow-sm
              sm:p-6
            "
          >
            <CalendarDays className="text-green-600" />

            <h2 className="mt-4 font-bold text-slate-900">
              Training Schedule
            </h2>

            <div className="mt-5 space-y-4">
              <ScheduleItem
                day="Tuesday"
                time="4:00 PM – 6:00 PM"
              />

              <ScheduleItem
                day="Thursday"
                time="4:00 PM – 6:00 PM"
              />

              <ScheduleItem
                day="Saturday"
                time="9:00 AM – 11:00 AM"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   TEAM INFO CARD
========================================================= */

interface TeamInfoCardProps {
  icon: ReactNode;
  title: string;
  value: string;
}

function TeamInfoCard({
  icon,
  title,
  value,
}: TeamInfoCardProps) {
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

      <p className="mt-4 text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-1 break-words font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   DETAIL
========================================================= */

interface DetailProps {
  label: string;
  value: string;
}

function Detail({
  label,
  value,
}: DetailProps) {
  return (
    <div className="min-w-0">
      <p
        className="
          text-xs
          font-semibold
          uppercase
          tracking-wide
          text-slate-400
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          break-words
          text-sm
          font-semibold
          text-slate-700
        "
      >
        {value || "—"}
      </p>
    </div>
  );
}

/* =========================================================
   SCHEDULE
========================================================= */

function ScheduleItem({
  day,
  time,
}: {
  day: string;
  time: string;
}) {
  return (
    <div
      className="
        min-w-0
        rounded-lg
        bg-slate-50
        p-3
      "
    >
      <p className="font-semibold text-slate-700">
        {day}
      </p>

      <p className="mt-1 break-words text-sm text-slate-500">
        {time}
      </p>
    </div>
  );
}

/* =========================================================
   EMPTY ROSTER
========================================================= */

function EmptyRoster() {
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
        size={36}
        className="mx-auto text-slate-300"
      />

      <p className="mt-4 font-medium text-slate-700">
        No players assigned
      </p>

      <p className="mt-1 text-sm text-slate-500">
        No players have been assigned
        to this team.
      </p>
    </div>
  );
}

export default TeamProfilePage;