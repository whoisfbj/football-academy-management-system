import {
  ClipboardCheck,
  FileText,
  Trophy,
  UserRound,
} from "lucide-react";

import {
  getProgressReportsByPlayer,
} from "../../services/developmentService";

import {
  getPrimaryLinkedPlayer,
} from "../../services/parentService";

function ParentReportsPage() {
  const linkedPlayer =
    getPrimaryLinkedPlayer();

  if (!linkedPlayer) {
    return (
      <div className="p-5 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <UserRound
              size={34}
              className="mx-auto text-slate-300"
            />

            <h1 className="mt-4 text-xl font-bold">
              No Player Linked
            </h1>
          </div>
        </div>
      </div>
    );
  }

  const reports =
    getProgressReportsByPlayer(
      linkedPlayer.id,
    )
      .slice()
      .sort(
        (a, b) =>
          b.date.localeCompare(
            a.date,
          ),
      );

  const latestReport =
    reports[0];

  return (
    <div className="p-5 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div>
          <p className="text-sm font-semibold text-green-600">
            Parent / Guardian Portal
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-950 lg:text-3xl">
            Player Reports
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View development reports
            for{" "}
            {linkedPlayer.fullName}.
          </p>
        </div>

        <section className="mt-6 rounded-2xl bg-slate-950 p-6 text-white">
          <p className="text-sm text-slate-400">
            Development reports for
          </p>

          <h2 className="mt-1 text-xl font-bold">
            {linkedPlayer.fullName}
          </h2>

          <p className="mt-1 text-green-400">
            {
              linkedPlayer.playerId
            }{" "}
            •{" "}
            {linkedPlayer.academyTeam ??
              "No Team Assigned"}
          </p>
        </section>

        {latestReport && (
          <section className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-6">
            <div className="flex justify-between gap-4">
              <div>
                <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
                  Latest Report
                </span>

                <h2 className="mt-4 text-xl font-bold text-slate-900">
                  {
                    latestReport.reportingPeriod
                  }
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  {formatDate(
                    latestReport.date,
                  )}
                </p>
              </div>

              <Trophy
                size={24}
                className="text-green-600"
              />
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-700">
              {
                latestReport.comments
              }
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-700">
              <strong>
                Recommendations:
              </strong>{" "}
              {
                latestReport.recommendations
              }
            </p>
          </section>
        )}

        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <div className="flex items-center gap-3">
              <ClipboardCheck
                size={20}
                className="text-green-600"
              />

              <h2 className="font-bold text-slate-900">
                Report History
              </h2>
            </div>
          </div>

          {reports.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {reports.map(
                (report) => (
                  <article
                    key={report.id}
                    className="p-5 lg:p-6"
                  >
                    <div className="flex justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-slate-900">
                          {
                            report.reportingPeriod
                          }
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {formatDate(
                            report.date,
                          )}
                        </p>
                      </div>

                      <FileText
                        size={20}
                        className="text-green-600"
                      />
                    </div>

                    <p className="mt-4 text-sm leading-7 text-slate-600">
                      {
                        report.comments
                      }
                    </p>

                    <p className="mt-4 text-sm leading-7 text-slate-600">
                      <strong>
                        Recommendations:
                      </strong>{" "}
                      {
                        report.recommendations
                      }
                    </p>
                  </article>
                ),
              )}
            </div>
          ) : (
            <div className="p-12 text-center">
              <FileText
                size={34}
                className="mx-auto text-slate-300"
              />

              <p className="mt-4 text-sm text-slate-500">
                No progress reports
                available.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function formatDate(
  date: string,
) {
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