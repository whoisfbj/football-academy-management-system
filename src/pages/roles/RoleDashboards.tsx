import type {
  ReactNode,
} from "react";

import {
  ClipboardCheck,
  Target,
  Trophy,
  Users,
} from "lucide-react";

import {
  getAssessments,
} from "../../services/developmentService";

import {
  getPlayers,
} from "../../services/playerService";

import {
  getSessions,
} from "../../services/sessionService";

import {
  getTeams,
} from "../../services/teamService";

import {
  getCurrentUser,
} from "../../services/authService";

function BaseDashboard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const players =
    getPlayers();

  const teams =
    getTeams();

  const sessions =
    getSessions();

  const assessments =
    getAssessments();

  const user =
    getCurrentUser();

  return (
    <div className="min-h-dvh w-full min-w-0 bg-slate-100 p-4 sm:p-6 lg:p-8">
      <p className="text-sm font-semibold text-green-600">
        {
          user?.name
        }
      </p>

      <h1 className="mt-1 break-words text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
        {title}
      </h1>

      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 sm:text-base">
        {description}
      </p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card
          title="Players"
          value={
            players.length
          }
          icon={<Users />}
        />

        <Card
          title="Teams"
          value={
            teams.length
          }
          icon={<Trophy />}
        />

        <Card
          title="Sessions"
          value={
            sessions.length
          }
          icon={
            <ClipboardCheck />
          }
        />

        <Card
          title="Assessments"
          value={
            assessments.length
          }
          icon={<Target />}
        />
      </div>

      <section className="mt-6 rounded-xl bg-white p-4 sm:p-6 shadow-sm">
        <h2 className="font-bold text-slate-900">
          Upcoming Training
        </h2>

        <div className="mt-5 space-y-3">
          {sessions
            .filter(
              (session) =>
                session.status ===
                "Scheduled",
            )
            .map(
              (session) => (
                <div
                  key={
                    session.id
                  }
                  className="rounded-lg bg-slate-50 p-4"
                >
                  <p className="font-semibold text-slate-700">
                    {
                      session.title
                    }
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {
                      session.date
                    }{" "}
                    •{" "}
                    {
                      session.startTime
                    }
                  </p>
                </div>
              ),
            )}
        </div>
      </section>
    </div>
  );
}

function Card({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <div className="text-green-600">
        {icon}
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

export function TechnicalDirectorDashboard() {
  return (
    <BaseDashboard
      title="Technical Director"
      description="Player development, technical assessments and coaching overview."
    />
  );
}

export function SportsDirectorDashboard() {
  return (
    <BaseDashboard
      title="Sports Director"
      description="Teams, competitions, sporting activities and academy operations."
    />
  );
}

export function CoachDashboard() {
  return (
    <BaseDashboard
      title="Coach Dashboard"
      description="Training sessions, players, attendance and player development."
    />
  );
}