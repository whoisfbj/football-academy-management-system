import {
  ArrowLeft,
  Save,
} from "lucide-react";

import {
  useEffect,
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
  calculatePlayerAttendancePercentage,
} from "../../../services/attendanceService";

import {
  getCoaches,
} from "../../../services/coachService";

import {
  addProgressReport,
} from "../../../services/developmentService";

import {
  getPlayers,
} from "../../../services/playerService";

const inputClass =
  "w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-base outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:text-sm";

const labelClass =
  "mb-2 block text-sm font-medium text-slate-700";

function NewProgressReportPage() {
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

  const [
    reportingPeriod,
    setReportingPeriod,
  ] = useState("");

  const [
    technicalProgress,
    setTechnicalProgress,
  ] = useState("");

  const [
    tacticalProgress,
    setTacticalProgress,
  ] = useState("");

  const [
    physicalProgress,
    setPhysicalProgress,
  ] = useState("");

  const [
    performanceProgress,
    setPerformanceProgress,
  ] = useState("");

  const [attendance, setAttendance] =
    useState(0);

  const [comments, setComments] =
    useState("");

  const [
    recommendations,
    setRecommendations,
  ] = useState("");

  const [date, setDate] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0],
    );

  useEffect(() => {
    if (!playerId) {
      return;
    }

    setAttendance(
      calculatePlayerAttendancePercentage(
        playerId,
      ),
    );
  }, [playerId]);

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    addProgressReport({
      id: `progress-${Date.now()}`,

      playerId,
      coachId,

      reportingPeriod,

      technicalProgress,
      tacticalProgress,
      physicalProgress,
      performanceProgress,

      attendancePercentage:
        attendance,

      comments,
      recommendations,

      date,

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
          New Progress Report
        </h1>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 sm:text-base">
          Record a player's development progress
          for a reporting period.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-7 space-y-6"
      >
        <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="grid gap-5 md:grid-cols-2">
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
              >
                {players.map(
                  (player) => (
                    <option
                      key={player.id}
                      value={player.id}
                    >
                      {player.fullName}
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
                Reporting Period
              </label>

              <input
                value={reportingPeriod}
                onChange={(event) =>
                  setReportingPeriod(
                    event.target.value,
                  )
                }
                placeholder="e.g. September 2026"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>
                Report Date
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
          <h2 className="font-bold text-slate-900">
            Development Progress
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <ProgressField
              label="Technical Progress"
              value={technicalProgress}
              onChange={setTechnicalProgress}
            />

            <ProgressField
              label="Tactical Progress"
              value={tacticalProgress}
              onChange={setTacticalProgress}
            />

            <ProgressField
              label="Physical Progress"
              value={physicalProgress}
              onChange={setPhysicalProgress}
            />

            <ProgressField
              label="Performance Progress"
              value={performanceProgress}
              onChange={setPerformanceProgress}
            />
          </div>

          <div className="mt-6 rounded-lg bg-green-50 p-4">
            <p className="text-xs font-semibold uppercase text-green-600">
              Current Attendance
            </p>

            <p className="mt-1 text-2xl font-bold text-green-700">
              {attendance}%
            </p>
          </div>
        </section>

        <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
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

          <div className="mt-5">
            <label className={labelClass}>
              Recommendations
            </label>

            <textarea
              value={recommendations}
              onChange={(event) =>
                setRecommendations(
                  event.target.value,
                )
              }
              rows={4}
              className={inputClass}
            />
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
            Save Progress Report
          </button>
        </div>
      </form>
    </div>
  );
}

interface ProgressFieldProps {
  label: string;
  value: string;
  onChange: (
    value: string,
  ) => void;
}

function ProgressField({
  label,
  value,
  onChange,
}: ProgressFieldProps) {
  return (
    <div className="w-full min-w-0">
      <label className={labelClass}>
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value,
          )
        }
        className={inputClass}
        required
      >
        <option value="">
          Select progress
        </option>

        <option value="Needs Improvement">
          Needs Improvement
        </option>

        <option value="Fair">
          Fair
        </option>

        <option value="Good">
          Good
        </option>

        <option value="Very Good">
          Very Good
        </option>

        <option value="Excellent">
          Excellent
        </option>
      </select>
    </div>
  );
}

export default NewProgressReportPage;