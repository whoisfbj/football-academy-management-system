import {
  ArrowLeft,
  Save,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import type {
  FormEvent,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router";

import {
  getCoaches,
} from "../../../services/coachService";

import {
  addScoutingReport,
} from "../../../services/developmentService";

import {
  getPlayers,
} from "../../../services/playerService";

const inputClass =
  "w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100";

const labelClass =
  "mb-2 block text-sm font-medium text-slate-700";

function NewScoutingReportPage() {
  const navigate =
    useNavigate();

  const players =
    getPlayers();

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

  const [
    matchObserved,
    setMatchObserved,
  ] = useState("");

  // Explicitly using string here prevents the
  // PlayingPosition union type error.
  const [position, setPosition] =
    useState<string>(
      players[0]?.playingPosition ??
        "",
    );

  const [
    technicalRating,
    setTechnicalRating,
  ] = useState(0);

  const [
    tacticalRating,
    setTacticalRating,
  ] = useState(0);

  const [
    physicalRating,
    setPhysicalRating,
  ] = useState(0);

  const [
    performanceRating,
    setPerformanceRating,
  ] = useState(0);

  const [
    strengths,
    setStrengths,
  ] = useState("");

  const [
    weaknesses,
    setWeaknesses,
  ] = useState("");

  const [
    potential,
    setPotential,
  ] = useState("");

  const [
    recommendation,
    setRecommendation,
  ] = useState("");

  const [date, setDate] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0],
    );

  const overallRating =
    useMemo(() => {
      return Math.round(
        (technicalRating +
          tacticalRating +
          physicalRating +
          performanceRating) /
          4,
      );
    }, [
      technicalRating,
      tacticalRating,
      physicalRating,
      performanceRating,
    ]);

  const handlePlayerChange = (
    nextPlayerId: string,
  ) => {
    setPlayerId(
      nextPlayerId,
    );

    const selectedPlayer =
      players.find(
        (player) =>
          player.id ===
          nextPlayerId,
      );

    if (selectedPlayer) {
      setPosition(
        selectedPlayer.playingPosition,
      );
    }
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (
      !playerId ||
      !coachId
    ) {
      return;
    }

    addScoutingReport({
      id: `scouting-${Date.now()}`,

      playerId,

      coachId,

      matchObserved,

      position,

      technicalRating,

      tacticalRating,

      physicalRating,

      performanceRating,

      strengths,

      weaknesses,

      potential,

      recommendation,

      date,

      createdAt:
        new Date().toISOString(),
    });

    navigate(
      `/admin/players/${playerId}`,
    );
  };

  return (
    <div>
      <Link
        to="/admin/development"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-green-600"
      >
        <ArrowLeft
          size={17}
        />

        Back to Player Development
      </Link>

      <div className="mt-5">
        <p className="text-sm font-semibold text-green-600">
          Player Development
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          New Scouting Report
        </h1>

        <p className="mt-2 text-slate-500">
          Record scouting observations,
          player ratings, strengths,
          weaknesses and development
          potential.
        </p>
      </div>

      <form
        onSubmit={
          handleSubmit
        }
        className="mt-7 space-y-6"
      >
        {/* REPORT INFORMATION */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-slate-900">
            Report Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Select the player,
            coach and match being
            observed.
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <label
                className={
                  labelClass
                }
              >
                Player
              </label>

              <select
                value={
                  playerId
                }
                onChange={(
                  event,
                ) =>
                  handlePlayerChange(
                    event
                      .target
                      .value,
                  )
                }
                className={
                  inputClass
                }
                required
              >
                {players.map(
                  (
                    player,
                  ) => (
                    <option
                      key={
                        player.id
                      }
                      value={
                        player.id
                      }
                    >
                      {
                        player.fullName
                      }{" "}
                      —{" "}
                      {
                        player.playerId
                      }
                    </option>
                  ),
                )}
              </select>
            </div>

            <div>
              <label
                className={
                  labelClass
                }
              >
                Scout / Coach
              </label>

              <select
                value={
                  coachId
                }
                onChange={(
                  event,
                ) =>
                  setCoachId(
                    event
                      .target
                      .value,
                  )
                }
                className={
                  inputClass
                }
                required
              >
                {coaches.map(
                  (
                    coach,
                  ) => (
                    <option
                      key={
                        coach.id
                      }
                      value={
                        coach.id
                      }
                    >
                      {
                        coach.fullName
                      }
                    </option>
                  ),
                )}
              </select>
            </div>

            <div>
              <label
                className={
                  labelClass
                }
              >
                Match Observed
              </label>

              <input
                type="text"
                value={
                  matchObserved
                }
                onChange={(
                  event,
                ) =>
                  setMatchObserved(
                    event
                      .target
                      .value,
                  )
                }
                className={
                  inputClass
                }
                placeholder="e.g. U17 Academy Trial Match"
                required
              />
            </div>

            <div>
              <label
                className={
                  labelClass
                }
              >
                Position Observed
              </label>

              <input
                type="text"
                value={
                  position
                }
                onChange={(
                  event,
                ) =>
                  setPosition(
                    event
                      .target
                      .value,
                  )
                }
                className={
                  inputClass
                }
                placeholder="e.g. Centre Back"
                required
              />
            </div>

            <div>
              <label
                className={
                  labelClass
                }
              >
                Observation Date
              </label>

              <input
                type="date"
                value={date}
                onChange={(
                  event,
                ) =>
                  setDate(
                    event
                      .target
                      .value,
                  )
                }
                className={
                  inputClass
                }
                required
              />
            </div>

            <div>
              <label
                className={
                  labelClass
                }
              >
                Overall Rating
              </label>

              <div className="flex h-[42px] items-center rounded-lg border border-green-100 bg-green-50 px-4">
                <span className="text-xl font-bold text-green-700">
                  {
                    overallRating
                  }
                </span>

                <span className="ml-1 text-sm text-green-600">
                  /100
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* RATINGS */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="font-bold text-slate-900">
              Scouting Ratings
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Rate the player from
              0 to 100 in each
              development area.
            </p>
          </div>

          <div className="mt-6 grid gap-7 md:grid-cols-2">
            <RatingField
              label="Technical Rating"
              value={
                technicalRating
              }
              onChange={
                setTechnicalRating
              }
            />

            <RatingField
              label="Tactical Rating"
              value={
                tacticalRating
              }
              onChange={
                setTacticalRating
              }
            />

            <RatingField
              label="Physical Rating"
              value={
                physicalRating
              }
              onChange={
                setPhysicalRating
              }
            />

            <RatingField
              label="Performance Rating"
              value={
                performanceRating
              }
              onChange={
                setPerformanceRating
              }
            />
          </div>
        </section>

        {/* OBSERVATIONS */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-slate-900">
            Scouting Observations
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Record detailed observations
            about the player.
          </p>

          <div className="mt-6 space-y-5">
            <TextAreaField
              label="Strengths"
              value={
                strengths
              }
              onChange={
                setStrengths
              }
              placeholder="Describe the player's strongest qualities..."
            />

            <TextAreaField
              label="Weaknesses / Areas for Improvement"
              value={
                weaknesses
              }
              onChange={
                setWeaknesses
              }
              placeholder="Describe areas that need improvement..."
            />

            <TextAreaField
              label="Player Potential"
              value={
                potential
              }
              onChange={
                setPotential
              }
              placeholder="Describe the player's development potential..."
            />

            <TextAreaField
              label="Recommendation"
              value={
                recommendation
              }
              onChange={
                setRecommendation
              }
              placeholder="e.g. Continue trial period and reassess after three matches..."
            />
          </div>
        </section>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            to="/admin/development"
            className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={
              !playerId ||
              !coachId ||
              !matchObserved ||
              !position ||
              overallRating ===
                0
            }
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save
              size={18}
            />

            Save Scouting Report
          </button>
        </div>
      </form>
    </div>
  );
}

interface RatingFieldProps {
  label: string;

  value: number;

  onChange: (
    value: number,
  ) => void;
}

function RatingField({
  label,
  value,
  onChange,
}: RatingFieldProps) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <label className="text-sm font-medium text-slate-700">
          {label}
        </label>

        <span className="rounded-md bg-green-50 px-2 py-1 text-sm font-bold text-green-700">
          {value}/100
        </span>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={value}
        onChange={(
          event,
        ) =>
          onChange(
            Number(
              event.target
                .value,
            ),
          )
        }
        className="w-full accent-green-600"
      />

      <div className="mt-1 flex justify-between text-xs text-slate-400">
        <span>0</span>
        <span>50</span>
        <span>100</span>
      </div>
    </div>
  );
}

interface TextAreaFieldProps {
  label: string;

  value: string;

  onChange: (
    value: string,
  ) => void;

  placeholder?: string;
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
}: TextAreaFieldProps) {
  return (
    <div>
      <label
        className={
          labelClass
        }
      >
        {label}
      </label>

      <textarea
        value={value}
        onChange={(
          event,
        ) =>
          onChange(
            event.target.value,
          )
        }
        placeholder={
          placeholder
        }
        rows={4}
        className={
          inputClass
        }
      />
    </div>
  );
}

export default NewScoutingReportPage;