import type { ReactNode } from "react";
import {
  ClipboardList,
  FileText,
  Plus,
  Search,
  Target,
  Trophy,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import { Link } from "react-router";

import {
  getAssessments,
  getDevelopmentPlans,
  getLatestAssessment,
  getProgressReports,
  getScoutingReports,
} from "../../../services/developmentService";

import { getPlayers } from "../../../services/playerService";

function DevelopmentPage() {
  const players = getPlayers().filter(
    (player) => player.registrationStatus === "Registered",
  );

  const assessments = getAssessments();
  const plans = getDevelopmentPlans();
  const progressReports = getProgressReports();
  const scoutingReports = getScoutingReports();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredPlayers = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return players.filter(
      (player) =>
        !search ||
        player.fullName.toLowerCase().includes(search) ||
        player.playerId.toLowerCase().includes(search),
    );
  }, [players, searchTerm]);

  const getPlayerDevelopment = (playerId: string) => ({
    technical: getLatestAssessment(playerId, "Technical Assessment"),
    tactical: getLatestAssessment(playerId, "Tactical Assessment"),
    physical: getLatestAssessment(playerId, "Physical Assessment"),
    performance: getLatestAssessment(playerId, "Performance Assessment"),
    idp: plans.find(
      (plan) => plan.playerId === playerId && plan.status === "In Progress",
    ),
  });

  return (
    <div className="w-full min-w-0">
      <div className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-green-600 sm:text-sm">
            Football Development
          </p>

          <h1 className="mt-1 break-words text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
            Player Development
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 sm:text-base">
            Manage assessments, evaluations, IDPs, progress reports and scouting reports.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-2 sm:w-auto sm:grid-cols-2 lg:flex lg:flex-wrap">
          <Link
            to="/admin/development/assessment/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            <Plus size={17} />
            Assessment
          </Link>

          <Link
            to="/admin/development/idp/new"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            New IDP
          </Link>

          <Link
            to="/admin/development/progress-report/new"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Progress Report
          </Link>

          <Link
            to="/admin/development/scouting-report/new"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Scouting Report
          </Link>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-7 sm:grid-cols-2 xl:grid-cols-4">
        <DevelopmentStat title="Assessments" value={assessments.length} icon={<ClipboardList size={20} />} />
        <DevelopmentStat
          title="Active IDPs"
          value={plans.filter((plan) => plan.status === "In Progress").length}
          icon={<Target size={20} />}
        />
        <DevelopmentStat title="Progress Reports" value={progressReports.length} icon={<FileText size={20} />} />
        <DevelopmentStat title="Scouting Reports" value={scoutingReports.length} icon={<Trophy size={20} />} />
      </div>

      <section className="mt-6 min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-4 sm:p-5">
          <div className="relative w-full max-w-md">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search player or Player ID..."
              className="w-full min-w-0 rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-base outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:text-sm"
            />
          </div>
        </div>

        <div className="space-y-3 bg-slate-50/50 p-3 md:hidden">
          {filteredPlayers.map((player) => {
            const data = getPlayerDevelopment(player.id);

            return (
              <article
                key={player.id}
                className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex min-w-0 items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="break-words font-semibold text-slate-900">{player.fullName}</p>
                    <p className="mt-0.5 break-all text-xs font-semibold text-green-600">{player.playerId}</p>
                  </div>

                  {data.idp ? (
                    <span className="shrink-0 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                      IDP Active
                    </span>
                  ) : (
                    <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
                      No IDP
                    </span>
                  )}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                  <ScoreTile label="Technical" score={data.technical?.overallScore} />
                  <ScoreTile label="Tactical" score={data.tactical?.overallScore} />
                  <ScoreTile label="Physical" score={data.physical?.overallScore} />
                  <ScoreTile label="Performance" score={data.performance?.overallScore} />
                </div>

                <Link
                  to={`/admin/players/${player.id}`}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-lg border border-green-200 bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-700 transition hover:bg-green-100"
                >
                  View Player
                </Link>
              </article>
            );
          })}

          {filteredPlayers.length === 0 && <EmptyDevelopment />}
        </div>

        <div className="hidden w-full overflow-x-auto md:block">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-5 py-4">Player</th>
                <th className="px-5 py-4">Technical</th>
                <th className="px-5 py-4">Tactical</th>
                <th className="px-5 py-4">Physical</th>
                <th className="px-5 py-4">Performance</th>
                <th className="px-5 py-4">IDP</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredPlayers.map((player) => {
                const data = getPlayerDevelopment(player.id);

                return (
                  <tr key={player.id} className="transition hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-800">{player.fullName}</p>
                      <p className="text-xs text-green-600">{player.playerId}</p>
                    </td>
                    <ScoreCell score={data.technical?.overallScore} />
                    <ScoreCell score={data.tactical?.overallScore} />
                    <ScoreCell score={data.physical?.overallScore} />
                    <ScoreCell score={data.performance?.overallScore} />
                    <td className="px-5 py-4">
                      {data.idp ? (
                        <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                          In Progress
                        </span>
                      ) : (
                        <span className="text-sm text-slate-400">No IDP</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <Link
                        to={`/admin/players/${player.id}`}
                        className="whitespace-nowrap text-sm font-semibold text-green-600 hover:text-green-700"
                      >
                        View Player
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredPlayers.length === 0 && <EmptyDevelopment />}
        </div>
      </section>
    </div>
  );
}

interface DevelopmentStatProps {
  title: string;
  value: number;
  icon: ReactNode;
}

function DevelopmentStat({ title, value, icon }: DevelopmentStatProps) {
  return (
    <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
        {icon}
      </div>
      <p className="mt-4 break-words text-sm text-slate-500">{title}</p>
      <p className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">{value}</p>
    </div>
  );
}

function ScoreCell({ score }: { score?: number }) {
  if (score === undefined) {
    return <td className="px-5 py-4 text-sm text-slate-400">—</td>;
  }

  return (
    <td className="px-5 py-4">
      <span className="font-bold text-slate-800">{score}</span>
      <span className="text-xs text-slate-400">/100</span>
    </td>
  );
}

function ScoreTile({ label, score }: { label: string; score?: number }) {
  return (
    <div className="min-w-0 rounded-lg bg-slate-50 p-3">
      <p className="truncate text-xs text-slate-500">{label}</p>
      <p className="mt-1 font-bold text-slate-800">
        {score === undefined ? "—" : score}
        {score !== undefined && <span className="text-xs font-normal text-slate-400">/100</span>}
      </p>
    </div>
  );
}

function EmptyDevelopment() {
  return (
    <div className="px-4 py-10 text-center sm:p-12">
      <Target size={36} className="mx-auto text-slate-300" />
      <p className="mt-4 font-medium text-slate-700">No players found</p>
      <p className="mt-1 text-sm text-slate-500">Try changing your search term.</p>
    </div>
  );
}

export default DevelopmentPage;
