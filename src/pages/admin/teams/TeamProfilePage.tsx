import type { ReactNode } from "react";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Trophy,
  UserRoundCog,
  Users,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router";

import { getCoaches } from "../../../services/coachService";
import { getPlayers } from "../../../services/playerService";
import { getTeamById } from "../../../services/teamService";

import PlayerStatusBadge from "../../../components/players/PlayerStatusBadge";

function TeamProfilePage() {
  const { teamId } =
    useParams();

  const team = teamId
    ? getTeamById(teamId)
    : undefined;

  if (!team) {
    return (
      <div>
        <Link
          to="/admin/teams"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-green-600"
        >
          <ArrowLeft
            size={17}
          />

          Back to Teams
        </Link>

        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-12 text-center">
          Team not found.
        </div>
      </div>
    );
  }

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
    <div>
      <Link
        to="/admin/teams"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-green-600"
      >
        <ArrowLeft size={17} />

        Back to Teams
      </Link>

      <section className="mt-5 rounded-xl bg-slate-950 p-7 text-white shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-green-400">
              {team.ageCategory} •{" "}
              {team.genderCategory}
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              {team.name}
            </h1>

            <p className="mt-3 text-sm text-slate-300">
              {team.program}
            </p>
          </div>

          <span className="w-fit rounded-full bg-green-500/10 px-3 py-1.5 text-sm font-semibold text-green-300">
            {team.status}
          </span>
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <TeamInfoCard
          icon={
            <Users size={20} />
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
            <MapPin size={20} />
          }
          title="Training Centre"
          value={
            team.centre
          }
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <section className="rounded-xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
          <div className="border-b border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-900">
              Team Players
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Current player roster.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
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
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-800">
                          {
                            player.fullName
                          }
                        </p>

                        <p className="text-xs text-green-600">
                          {
                            player.playerId
                          }
                        </p>
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
                          className="text-sm font-semibold text-green-600"
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
              <div className="p-10 text-center text-sm text-slate-500">
                No players have been
                assigned to this team.
              </div>
            )}
          </div>
        </section>

        <div className="space-y-6">
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
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
                value={team.program}
              />
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <CalendarDays className="text-green-600" />

            <h2 className="mt-4 font-bold text-slate-900">
              Training Schedule
            </h2>

            <div className="mt-5 space-y-4 text-sm">
              <div>
                <p className="font-semibold text-slate-700">
                  Tuesday
                </p>

                <p className="text-slate-500">
                  4:00 PM – 6:00 PM
                </p>
              </div>

              <div>
                <p className="font-semibold text-slate-700">
                  Thursday
                </p>

                <p className="text-slate-500">
                  4:00 PM – 6:00 PM
                </p>
              </div>

              <div>
                <p className="font-semibold text-slate-700">
                  Saturday
                </p>

                <p className="text-slate-500">
                  9:00 AM – 11:00 AM
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

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
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
        {icon}
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-1 font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

interface DetailProps {
  label: string;
  value: string;
}

function Detail({
  label,
  value,
}: DetailProps) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-700">
        {value}
      </p>
    </div>
  );
}

export default TeamProfilePage;