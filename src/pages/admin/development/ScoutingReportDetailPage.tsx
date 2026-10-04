import {
  ArrowLeft,
  Eye,
  Trophy,
  UserRoundCog,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router";

import { getCoachById } from "../../../services/coachService";

import {
  getScoutingReportById,
} from "../../../services/developmentService";

import { getPlayerById } from "../../../services/playerService";

function ScoutingReportDetailPage() {
  const { reportId } =
    useParams();

  const report = reportId
    ? getScoutingReportById(
        reportId,
      )
    : undefined;

  if (!report) {
    return (
      <div className="w-full min-w-0">
        <Link
          to="/admin/development"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-green-600"
        >
          <ArrowLeft size={17} />

          Back to Player Development
        </Link>

        <div className="mt-8 rounded-xl border border-slate-200 bg-white px-4 py-8 text-center sm:p-12">
          <h2 className="text-lg font-bold text-slate-900">
            Scouting Report Not Found
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

  const overallRating =
    Math.round(
      (report.technicalRating +
        report.tacticalRating +
        report.physicalRating +
        report.performanceRating) /
        4,
    );

  return (
    <div className="w-full min-w-0">
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
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-green-400">
              Scouting Report
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              {
                report.matchObserved
              }
            </h1>

            <p className="mt-2 text-slate-300">
              {player?.fullName ??
                "Unknown Player"}{" "}
              • {report.position}
            </p>
          </div>

          <div className="w-fit rounded-xl bg-white/10 px-5 py-3 text-center">
            <p className="text-xs uppercase tracking-wide text-slate-300">
              Overall
            </p>

            <p className="mt-1 text-3xl font-bold text-green-400">
              {overallRating}
            </p>

            <p className="text-xs text-slate-300">
              /100
            </p>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <RatingCard
          title="Technical"
          score={
            report.technicalRating
          }
        />

        <RatingCard
          title="Tactical"
          score={
            report.tacticalRating
          }
        />

        <RatingCard
          title="Physical"
          score={
            report.physicalRating
          }
        />

        <RatingCard
          title="Performance"
          score={
            report.performanceRating
          }
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <section className="space-y-6 lg:col-span-2">
          <ReportSection
            title="Strengths"
            value={
              report.strengths
            }
          />

          <ReportSection
            title="Weaknesses / Areas for Improvement"
            value={
              report.weaknesses
            }
          />

          <ReportSection
            title="Player Potential"
            value={
              report.potential
            }
          />

          <ReportSection
            title="Recommendation"
            value={
              report.recommendation
            }
          />
        </section>

        <div className="space-y-6">
          <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <Eye className="text-green-600" />

            <h2 className="mt-4 font-bold text-slate-900">
              Observation
            </h2>

            <div className="mt-5 space-y-4">
              <Detail
                label="Player"
                value={
                  player?.fullName ??
                  "Unknown Player"
                }
              />

              <Detail
                label="Player ID"
                value={
                  player?.playerId ??
                  "-"
                }
              />

              <Detail
                label="Position"
                value={
                  report.position
                }
              />

              <Detail
                label="Match"
                value={
                  report.matchObserved
                }
              />

              <Detail
                label="Date"
                value={formatDate(
                  report.date,
                )}
              />
            </div>
          </section>

          <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <UserRoundCog className="text-green-600" />

            <h2 className="mt-4 font-bold text-slate-900">
              Scout / Coach
            </h2>

            <p className="mt-4 font-semibold text-slate-700">
              {coach?.fullName ??
                "Unknown Coach"}
            </p>

            {coach && (
              <>
                <p className="mt-1 text-sm text-slate-500">
                  {
                    coach.qualification
                  }
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {
                    coach.specialization
                  }
                </p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

function RatingCard({
  title,
  score,
}: {
  title: string;
  score: number;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
        <Trophy size={19} />
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-1 break-words text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
        {score}
        <span className="text-sm font-normal text-slate-400">
          /100
        </span>
      </p>
    </div>
  );
}

function ReportSection({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <h2 className="font-bold text-slate-900">
        {title}
      </h2>

      <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-600">
        {value ||
          "No information recorded."}
      </p>
    </section>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="w-full min-w-0">
      <p className="text-xs uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-700">
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

export default ScoutingReportDetailPage;