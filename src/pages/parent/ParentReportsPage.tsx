import {
  ClipboardCheck,
  FileText,
  Trophy,
  UserRound,
} from "lucide-react";

import { getProgressReportsByPlayer } from "../../services/developmentService";
import { getPlayerById } from "../../services/playerService";

function ParentReportsPage() {
  const linkedPlayer =
    getPlayerById("player-001");

  if (!linkedPlayer) {
    return (
      <div className="p-5 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <UserRound
              size={34}
              className="mx-auto text-slate-300"
            />

            <h1 className="mt-4 text-xl font-bold text-slate-900">
              No Player Linked
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              No player is currently linked to this parent or guardian account.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const playerId = linkedPlayer.id;
  const playerName = linkedPlayer.fullName;

  const reports =
    getProgressReportsByPlayer(playerId)
      .slice()
      .sort((a, b) =>
        b.date.localeCompare(a.date),
      );

  const latestReport =
    reports[0];

  return (
    <div className="p-5 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}

        <div>
          <p className="text-sm font-semibold text-green-600">
            Parent / Guardian Portal
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-950 lg:text-3xl">
            Player Reports
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View progress reports and development feedback for {playerName}.
          </p>
        </div>

        {/* PLAYER SUMMARY */}

        <section className="mt-6 rounded-2xl bg-slate-950 p-6 text-white shadow-sm">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10">
                <FileText size={27} />
              </div>

              <div>
                <p className="text-sm text-slate-400">
                  Development reports for
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  {playerName}
                </h2>

                <p className="mt-1 text-sm font-semibold text-green-400">
                  {linkedPlayer.playerId} •{" "}
                  {linkedPlayer.academyTeam ??
                    "No Team Assigned"}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Reports
              </p>

              <p className="mt-1 text-3xl font-bold text-green-400">
                {reports.length}
              </p>
            </div>
          </div>
        </section>

        {/* LATEST REPORT */}

        {latestReport && (
          <section className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-6">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
              <div>
                <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
                  Latest Report
                </span>

                <h2 className="mt-4 text-xl font-bold text-slate-900">
                  {latestReport.reportingPeriod}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  {formatDate(latestReport.date)}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-green-600 shadow-sm">
                <Trophy size={22} />
              </div>
            </div>

            {latestReport.comments && (
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Coach's Comments
                </p>

                <p className="mt-2 text-sm leading-7 text-slate-700">
                  {latestReport.comments}
                </p>
              </div>
            )}

            {latestReport.recommendations && (
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Recommendations
                </p>

                <p className="mt-2 text-sm leading-7 text-slate-700">
                  {latestReport.recommendations}
                </p>
              </div>
            )}
          </section>
        )}

        {/* REPORT HISTORY */}

        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <ClipboardCheck size={21} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Progress Report History
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Reports prepared by the academy's technical staff.
                </p>
              </div>
            </div>
          </div>

          {reports.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {reports.map((report, index) => (
                <article
                  key={report.id}
                  className="p-5 lg:p-6"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-slate-900">
                          {report.reportingPeriod}
                        </h3>

                        {index === 0 && (
                          <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                            Latest
                          </span>
                        )}
                      </div>

                      <p className="mt-2 text-sm text-slate-500">
                        {formatDate(report.date)}
                      </p>
                    </div>

                    <FileText
                      size={20}
                      className="text-green-600"
                    />
                  </div>

                  {report.comments && (
                    <div className="mt-5 rounded-xl bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Comments
                      </p>

                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {report.comments}
                      </p>
                    </div>
                  )}

                  {report.recommendations && (
                    <div className="mt-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Recommendations
                      </p>

                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {report.recommendations}
                      </p>
                    </div>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-300">
                <FileText size={27} />
              </div>

              <h3 className="mt-4 font-bold text-slate-800">
                No reports available
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Progress reports will appear here after they are published by
                the academy.
              </p>
            </div>
          )}
        </section>

        {/* INFO */}

        <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <p className="font-semibold text-blue-900">
            Player development reports
          </p>

          <p className="mt-1 text-sm leading-6 text-blue-700">
            These reports allow parents and guardians to follow the player's
            development and review feedback provided by the academy's coaching
            and technical staff.
          </p>
        </div>
      </div>
    </div>
  );
}

function formatDate(
  date: string,
) {
  if (!date) {
    return "—";
  }

  return new Date(
    `${date}T00:00:00`,
  ).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );
}

export default ParentReportsPage;