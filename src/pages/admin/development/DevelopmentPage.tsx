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
    (player) =>
      player.registrationStatus ===
      "Registered",
  );

  const assessments =
    getAssessments();

  const plans =
    getDevelopmentPlans();

  const progressReports =
    getProgressReports();

  const scoutingReports =
    getScoutingReports();

  const [searchTerm, setSearchTerm] =
    useState("");

  const filteredPlayers =
    useMemo(() => {
      const search =
        searchTerm.toLowerCase();

      return players.filter(
        (player) =>
          player.fullName
            .toLowerCase()
            .includes(search) ||
          player.playerId
            .toLowerCase()
            .includes(search),
      );
    }, [
      players,
      searchTerm,
    ]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-green-600">
            Football Development
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Player Development
          </h1>

          <p className="mt-2 text-slate-500">
            Manage assessments, evaluations,
            IDPs, progress reports and scouting
            reports.
          </p>
        </div>

       <div className="flex flex-wrap gap-2">
  <Link
    to="/admin/development/assessment/new"
    className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
  >
    <Plus size={17} />
    Assessment
  </Link>

  <Link
    to="/admin/development/idp/new"
    className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
  >
    New IDP
  </Link>

  <Link
    to="/admin/development/progress-report/new"
    className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
  >
    Progress Report
  </Link>

  <Link
    to="/admin/development/scouting-report/new"
    className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
  >
    Scouting Report
  </Link>
</div>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DevelopmentStat
          title="Assessments"
          value={assessments.length}
          icon={<ClipboardList size={20} />}
        />

        <DevelopmentStat
          title="Active IDPs"
          value={
            plans.filter(
              (plan) =>
                plan.status ===
                "In Progress",
            ).length
          }
          icon={<Target size={20} />}
        />

        <DevelopmentStat
          title="Progress Reports"
          value={progressReports.length}
          icon={<FileText size={20} />}
        />

        <DevelopmentStat
          title="Scouting Reports"
          value={scoutingReports.length}
          icon={<Trophy size={20} />}
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
              placeholder="Search player or Player ID..."
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
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
                  Technical
                </th>

                <th className="px-5 py-4">
                  Tactical
                </th>

                <th className="px-5 py-4">
                  Physical
                </th>

                <th className="px-5 py-4">
                  Performance
                </th>

                <th className="px-5 py-4">
                  IDP
                </th>

                <th className="px-5 py-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredPlayers.map(
                (player) => {
                  const technical =
                    getLatestAssessment(
                      player.id,
                      "Technical Assessment",
                    );

                  const tactical =
                    getLatestAssessment(
                      player.id,
                      "Tactical Assessment",
                    );

                  const physical =
                    getLatestAssessment(
                      player.id,
                      "Physical Assessment",
                    );

                  const performance =
                    getLatestAssessment(
                      player.id,
                      "Performance Assessment",
                    );

                  const idp =
                    plans.find(
                      (plan) =>
                        plan.playerId ===
                        player.id &&
                        plan.status ===
                          "In Progress",
                    );

                  return (
                    <tr
                      key={player.id}
                      className="hover:bg-slate-50"
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

                      <ScoreCell
                        score={
                          technical?.overallScore
                        }
                      />

                      <ScoreCell
                        score={
                          tactical?.overallScore
                        }
                      />

                      <ScoreCell
                        score={
                          physical?.overallScore
                        }
                      />

                      <ScoreCell
                        score={
                          performance?.overallScore
                        }
                      />

                      <td className="px-5 py-4">
                        {idp ? (
                          <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                            In Progress
                          </span>
                        ) : (
                          <span className="text-sm text-slate-400">
                            No IDP
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <Link
                          to={`/admin/players/${player.id}`}
                          className="text-sm font-semibold text-green-600 hover:text-green-700"
                        >
                          View Player
                        </Link>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
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

function DevelopmentStat({
  title,
  value,
  icon,
}: DevelopmentStatProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
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

function ScoreCell({
  score,
}: {
  score?: number;
}) {
  if (score === undefined) {
    return (
      <td className="px-5 py-4 text-sm text-slate-400">
        —
      </td>
    );
  }

  return (
    <td className="px-5 py-4">
      <span className="font-bold text-slate-800">
        {score}
      </span>

      <span className="text-xs text-slate-400">
        /100
      </span>
    </td>
  );
}

export default DevelopmentPage;