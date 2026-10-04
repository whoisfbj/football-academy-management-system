import {
  ArrowLeft,
  Plus,
  Save,
  Trash2,
} from "lucide-react";

import {
  useState,
} from "react";

import type {
  FormEvent,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router";

import { getCoaches } from "../../../services/coachService";

import {
  addDevelopmentPlan,
} from "../../../services/developmentService";

import { getPlayers } from "../../../services/playerService";

import type {
  DevelopmentPlanStatus,
} from "../../../shared/types/development";

const inputClass =
  "w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-base outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:text-sm";

const labelClass =
  "mb-2 block text-sm font-medium text-slate-700";

function NewDevelopmentPlanPage() {
  const navigate =
    useNavigate();

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

  const [title, setTitle] =
    useState("");

  const [primaryGoal, setPrimaryGoal] =
    useState("");

  const [secondaryGoal, setSecondaryGoal] =
    useState("");

  const [startDate, setStartDate] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0],
    );

  const [reviewDate, setReviewDate] =
    useState("");

  const [status, setStatus] =
    useState<DevelopmentPlanStatus>(
      "In Progress",
    );

  const [actions, setActions] =
    useState<string[]>([""]);

  const updateAction = (
    index: number,
    value: string,
  ) => {
    setActions((current) =>
      current.map(
        (action, actionIndex) =>
          actionIndex === index
            ? value
            : action,
      ),
    );
  };

  const addAction = () => {
    setActions((current) => [
      ...current,
      "",
    ]);
  };

  const removeAction = (
    index: number,
  ) => {
    setActions((current) =>
      current.filter(
        (_, actionIndex) =>
          actionIndex !== index,
      ),
    );
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const player =
      players.find(
        (item) =>
          item.id === playerId,
      );

    addDevelopmentPlan({
      id: `idp-${Date.now()}`,

      playerId,
      coachId,

      title:
        title ||
        `${player?.fullName ?? "Player"} Individual Development Plan`,

      primaryGoal,

      secondaryGoal:
        secondaryGoal ||
        undefined,

      actions:
        actions
          .map((action) =>
            action.trim(),
          )
          .filter(Boolean),

      startDate,
      reviewDate,

      status,

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
          Create Individual Development Plan
        </h1>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 sm:text-base">
          Define development goals and actions for
          a player.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-7 space-y-6"
      >
        <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="font-bold text-slate-900">
            Plan Information
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

            <div className="md:col-span-2">
              <label className={labelClass}>
                Plan Title
              </label>

              <input
                value={title}
                onChange={(event) =>
                  setTitle(
                    event.target.value,
                  )
                }
                className={inputClass}
                placeholder="Optional custom title"
              />
            </div>

            <div>
              <label className={labelClass}>
                Start Date
              </label>

              <input
                type="date"
                value={startDate}
                onChange={(event) =>
                  setStartDate(
                    event.target.value,
                  )
                }
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>
                Review Date
              </label>

              <input
                type="date"
                value={reviewDate}
                onChange={(event) =>
                  setReviewDate(
                    event.target.value,
                  )
                }
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>
                Status
              </label>

              <select
                value={status}
                onChange={(event) =>
                  setStatus(
                    event.target
                      .value as DevelopmentPlanStatus,
                  )
                }
                className={inputClass}
              >
                <option value="Not Started">
                  Not Started
                </option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Completed">
                  Completed
                </option>

                <option value="Paused">
                  Paused
                </option>
              </select>
            </div>
          </div>
        </section>

        <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="font-bold text-slate-900">
            Development Goals
          </h2>

          <div className="mt-6 space-y-5">
            <div>
              <label className={labelClass}>
                Primary Goal
              </label>

              <textarea
                value={primaryGoal}
                onChange={(event) =>
                  setPrimaryGoal(
                    event.target.value,
                  )
                }
                rows={3}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>
                Secondary Goal
              </label>

              <textarea
                value={secondaryGoal}
                onChange={(event) =>
                  setSecondaryGoal(
                    event.target.value,
                  )
                }
                rows={3}
                className={inputClass}
              />
            </div>
          </div>
        </section>

        <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex min-w-0 items-center justify-between gap-3">
            <div>
              <h2 className="font-bold text-slate-900">
                Development Actions
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Training actions required to
                achieve the goals.
              </p>
            </div>

            <button
              type="button"
              onClick={addAction}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-green-200 px-3 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-50"
            >
              <Plus size={16} />
              Add Action
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {actions.map(
              (action, index) => (
                <div
                  key={index}
                  className="flex min-w-0 items-start gap-2 sm:gap-3"
                >
                  <input
                    value={action}
                    onChange={(event) =>
                      updateAction(
                        index,
                        event.target.value,
                      )
                    }
                    placeholder={`Development action ${index + 1}`}
                    className={inputClass}
                  />

                  {actions.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removeAction(
                          index,
                        )
                      }
                      className="rounded-lg border border-red-200 px-3 text-red-600 hover:bg-red-50"
                    >
                      <Trash2
                        size={17}
                      />
                    </button>
                  )}
                </div>
              ),
            )}
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
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 sm:w-auto"
          >
            <Save size={18} />
            Save IDP
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewDevelopmentPlanPage;