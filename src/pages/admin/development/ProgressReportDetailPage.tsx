import {
  ArrowLeft,
  CalendarDays,
  ClipboardCheck,
  UserRoundCog,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router";

import { getCoachById } from "../../../services/coachService";

import {
  getProgressReportById,
} from "../../../services/developmentService";

import { getPlayerById } from "../../../services/playerService";

function ProgressReportDetailPage() {
  const { reportId } =
    useParams();

  const report = reportId
    ? getProgressReportById(
        reportId,
      )
    : undefined;

  if (!report) {
    return (
      <div>
        <Link
          to="/admin/development"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-green-600"
        >
          <ArrowLeft size={17} />

          Back to Player Development
        </Link>

        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-12 text-center">
          <h2 className="text-lg font-bold text-slate-900">
            Progress Report Not Found
          </h2>
        </div>
      </div>
    );
  }

  const player =
    getPlayerById(
      report.playerId,
    );

  const coach =
    getCoachById(
      report.coachId,
    );

  return (
    <div>
      <Link
        to={
          player
            ? `/admin/players/${player.id}`
            : "/admin/development"
        }
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-green-600"
      >
        <ArrowLeft size={17} />

        Back
      </Link>

      <section className="mt-5 rounded-xl bg-slate-950 p-7 text-white shadow-sm">
        <p className="text-sm font-semibold text-green-400">
          Progress Report
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          {report.reportingPeriod}
        </h1>

        <p className="mt-2 text-slate-300">
          {player?.fullName ??
            "Unknown Player"}
        </p>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <InfoCard
          title="Player"
          value={
            player?.fullName ??
            "Unknown Player"
          }
        />

        <InfoCard
          title="Coach"
          value={
            coach?.fullName ??
            "Unknown Coach"
          }
        />

        <InfoCard
          title="Report Date"
          value={formatDate(
            report.date,
          )}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center gap-3">
            <ClipboardCheck
              size={21}
              className="text-green-600"
            />

            <h2 className="text-lg font-bold text-slate-900">
              Development Progress
            </h2>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <ProgressItem
              title="Technical"
              value={
                report.technicalProgress
              }
            />

            <ProgressItem
              title="Tactical"
              value={
                report.tacticalProgress
              }
            />

            <ProgressItem
              title="Physical"
              value={
                report.physicalProgress
              }
            />

            <ProgressItem
              title="Performance"
              value={
                report.performanceProgress
              }
            />
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Attendance
          </p>

          <p className="mt-3 text-4xl font-bold text-green-600">
            {
              report.attendancePercentage
            }
            %
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Attendance at the time this
            report was created.
          </p>
        </section>
      </div>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-bold text-slate-900">
          Coach Comments
        </h2>

        <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-600">
          {report.comments ||
            "No comments recorded."}
        </p>
      </section>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-bold text-slate-900">
          Recommendations
        </h2>

        <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-600">
          {report.recommendations ||
            "No recommendations recorded."}
        </p>
      </section>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex gap-3">
            <CalendarDays
              size={19}
              className="mt-0.5 text-green-600"
            />

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Reporting Period
              </p>

              <p className="mt-1 font-semibold text-slate-700">
                {
                  report.reportingPeriod
                }
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <UserRoundCog
              size={19}
              className="mt-0.5 text-green-600"
            />

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Prepared By
              </p>

              <p className="mt-1 font-semibold text-slate-700">
                {coach?.fullName ??
                  "Unknown Coach"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-2 font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function ProgressItem({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-lg bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {title}
      </p>

      <p className="mt-2 font-bold text-slate-800">
        {value}
      </p>
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

export default ProgressReportDetailPage;