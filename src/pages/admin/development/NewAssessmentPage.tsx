import {
  ArrowLeft,
  Save,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import type {
  ChangeEvent,
  FormEvent,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router";

import { getCoaches } from "../../../services/coachService";

import { addAssessment } from "../../../services/developmentService";

import { getPlayers } from "../../../services/playerService";

import type {
  AssessmentCategory,
  AssessmentMetric,
} from "../../../shared/types/development";

const inputClass =
  "w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-base outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:text-sm";

const labelClass =
  "mb-2 block text-sm font-medium text-slate-700";

const categories: AssessmentCategory[] = [
  "Technical Assessment",
  "Tactical Assessment",
  "Physical Assessment",
  "Performance Assessment",
];

const metricMap: Record<
  AssessmentCategory,
  string[]
> = {
  "Technical Assessment": [
    "Ball Control",
    "Passing",
    "Dribbling",
    "Shooting",
    "First Touch",
    "Crossing",
    "Heading",
    "Tackling",
  ],

  "Tactical Assessment": [
    "Positioning",
    "Decision Making",
    "Movement Off The Ball",
    "Defensive Awareness",
    "Attacking Awareness",
    "Team Play",
    "Game Understanding",
    "Transition Play",
  ],

  "Physical Assessment": [
    "Speed",
    "Acceleration",
    "Agility",
    "Strength",
    "Endurance",
    "Balance",
    "Coordination",
    "Fitness",
  ],

  "Performance Assessment": [
    "Training Performance",
    "Match Performance",
    "Consistency",
    "Discipline",
    "Work Rate",
    "Coachability",
    "Teamwork",
    "Competition Performance",
  ],
};

function NewAssessmentPage() {
  const navigate = useNavigate();

  const players =
    getPlayers().filter(
      (player) =>
        player.registrationStatus ===
        "Registered",
    );

  const coaches =
    getCoaches();

  const [playerId, setPlayerId] =
    useState(
      players[0]?.id ?? "",
    );

  const [coachId, setCoachId] =
    useState(
      coaches[0]?.id ?? "",
    );

  const [category, setCategory] =
    useState<AssessmentCategory>(
      "Technical Assessment",
    );

  const [date, setDate] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0],
    );

  const [scores, setScores] =
    useState<
      Record<string, number>
    >({});

  const [strengths, setStrengths] =
    useState("");

  const [
    areasForImprovement,
    setAreasForImprovement,
  ] = useState("");

  const [comments, setComments] =
    useState("");

  const metrics =
    metricMap[category];

  const overallScore =
    useMemo(() => {
      const values =
        metrics.map(
          (metric) =>
            scores[metric] ?? 0,
        );

      const completed =
        values.filter(
          (value) =>
            value > 0,
        );

      if (
        completed.length === 0
      ) {
        return 0;
      }

      return Math.round(
        completed.reduce(
          (total, score) =>
            total + score,
          0,
        ) /
          completed.length,
      );
    }, [
      metrics,
      scores,
    ]);

  const handleCategoryChange = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    setCategory(
      event.target
        .value as AssessmentCategory,
    );

    setScores({});
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const assessmentMetrics: AssessmentMetric[] =
      metrics.map(
        (metric) => ({
          name: metric,
          score:
            scores[metric] ?? 0,
        }),
      );

    addAssessment({
      id: `assessment-${Date.now()}`,

      playerId,

      coachId,

      category,

      date,

      metrics:
        assessmentMetrics,

      overallScore,

      strengths,

      areasForImprovement,

      comments,

      createdAt:
        new Date().toISOString(),
    });

    navigate(
      `/admin/players/${playerId}`,
    );
  };

  return (
    <div className="w-full min-w-0">
      <Link
        to="/admin/development"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-green-600"
      >
        <ArrowLeft size={17} />

        Back to Player Development
      </Link>

      <div className="mt-5 min-w-0">
        <p className="text-sm font-semibold text-green-600">
          Player Development
        </p>

        <h1 className="mt-1 break-words text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
          New Assessment
        </h1>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 sm:text-base">
          Record a technical, tactical,
          physical or performance assessment.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-7 space-y-6"
      >
        <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="font-bold text-slate-900">
            Assessment Information
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <label className={labelClass}>
                Player
              </label>

              <select
                value={playerId}
                onChange={(event) =>
                  setPlayerId(
                    event.target.value,
                  )
                }
                className={inputClass}
                required
              >
                {players.map(
                  (player) => (
                    <option
                      key={player.id}
                      value={player.id}
                    >
                      {player.fullName} —{" "}
                      {player.playerId}
                    </option>
                  ),
                )}
              </select>
            </div>

            <div>
              <label className={labelClass}>
                Coach
              </label>

              <select
                value={coachId}
                onChange={(event) =>
                  setCoachId(
                    event.target.value,
                  )
                }
                className={inputClass}
                required
              >
                {coaches.map(
                  (coach) => (
                    <option
                      key={coach.id}
                      value={coach.id}
                    >
                      {coach.fullName}
                    </option>
                  ),
                )}
              </select>
            </div>

            <div>
              <label className={labelClass}>
                Assessment Type
              </label>

              <select
                value={category}
                onChange={
                  handleCategoryChange
                }
                className={inputClass}
              >
                {categories.map(
                  (item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ),
                )}
              </select>
            </div>

            <div>
              <label className={labelClass}>
                Assessment Date
              </label>

              <input
                type="date"
                value={date}
                onChange={(event) =>
                  setDate(
                    event.target.value,
                  )
                }
                className={inputClass}
                required
              />
            </div>
          </div>
        </section>

        <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex min-w-0 items-center justify-between gap-3">
            <div>
              <h2 className="font-bold text-slate-900">
                Assessment Scores
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Score each area from 0 to 100.
              </p>
            </div>

            <div className="rounded-lg bg-green-50 px-4 py-2">
              <p className="text-xs text-green-600">
                Overall
              </p>

              <p className="text-xl font-bold text-green-700">
                {overallScore}/100
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {metrics.map(
              (metric) => (
                <div key={metric}>
                  <div className="mb-2 flex justify-between">
                    <label className="text-sm font-medium text-slate-700">
                      {metric}
                    </label>

                    <span className="text-sm font-semibold text-green-600">
                      {scores[metric] ??
                        0}
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={
                      scores[metric] ??
                      0
                    }
                    onChange={(
                      event,
                    ) =>
                      setScores(
                        (current) => ({
                          ...current,
                          [metric]:
                            Number(
                              event
                                .target
                                .value,
                            ),
                        }),
                      )
                    }
                    className="w-full accent-green-600"
                  />
                </div>
              ),
            )}
          </div>
        </section>

        <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="font-bold text-slate-900">
            Evaluation Notes
          </h2>

          <div className="mt-6 space-y-5">
            <div>
              <label className={labelClass}>
                Strengths
              </label>

              <textarea
                value={strengths}
                onChange={(event) =>
                  setStrengths(
                    event.target.value,
                  )
                }
                rows={3}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Areas for Improvement
              </label>

              <textarea
                value={
                  areasForImprovement
                }
                onChange={(event) =>
                  setAreasForImprovement(
                    event.target.value,
                  )
                }
                rows={3}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Coach Comments
              </label>

              <textarea
                value={comments}
                onChange={(event) =>
                  setComments(
                    event.target.value,
                  )
                }
                rows={4}
                className={inputClass}
              />
            </div>
          </div>
        </section>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            to="/admin/development"
            className="inline-flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={
              !playerId ||
              !coachId ||
              overallScore === 0
            }
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            <Save size={18} />

            Save Assessment
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewAssessmentPage;