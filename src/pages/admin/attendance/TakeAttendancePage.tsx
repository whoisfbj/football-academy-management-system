import {
  ArrowLeft,
  Check,
  Save,
  Users,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router";

import {
  getAttendanceBySession,
  recordAttendance,
} from "../../../services/attendanceService";

import { getPlayers } from "../../../services/playerService";
import { getSessionById } from "../../../services/sessionService";
import { getTeamById } from "../../../services/teamService";
import type { AttendanceStatus } from "../../../shared/types/attendance";

const attendanceOptions: AttendanceStatus[] = [
  "Present",
  "Late Arrival",
  "Absent",
  "Excused Absence",
];

function TakeAttendancePage() {
  const { sessionId } = useParams();

  const session = sessionId ? getSessionById(sessionId) : undefined;
  const team = session ? getTeamById(session.teamId) : undefined;

  const teamPlayers = team
    ? getPlayers().filter(
        (player) =>
          player.academyTeam === team.name &&
          player.registrationStatus === "Registered",
      )
    : [];

  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!sessionId) return;

    const existing = getAttendanceBySession(sessionId);
    const initial: Record<string, AttendanceStatus> = {};

    existing.forEach((record) => {
      initial[record.playerId] = record.status;
    });

    setAttendance(initial);
  }, [sessionId]);

  if (!session || !team) {
    return (
      <div className="w-full min-w-0">
        <Link
          to="/admin/sessions"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-green-600"
        >
          <ArrowLeft size={17} />
          Back to Sessions
        </Link>

        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-10">
          Session not found.
        </div>
      </div>
    );
  }

  const handleStatusChange = (playerId: string, status: AttendanceStatus) => {
    setAttendance((current) => ({ ...current, [playerId]: status }));
    setSaved(false);
  };

  const markAllPresent = () => {
    const updated: Record<string, AttendanceStatus> = {};
    teamPlayers.forEach((player) => {
      updated[player.id] = "Present";
    });
    setAttendance(updated);
    setSaved(false);
  };

  const saveAttendance = () => {
    teamPlayers.forEach((player) => {
      const status = attendance[player.id];
      if (status) {
        recordAttendance(session.id, player.id, status);
      }
    });
    setSaved(true);
  };

  const presentCount = Object.values(attendance).filter((status) => status === "Present").length;
  const lateCount = Object.values(attendance).filter((status) => status === "Late Arrival").length;
  const absentCount = Object.values(attendance).filter((status) => status === "Absent").length;
  const excusedCount = Object.values(attendance).filter((status) => status === "Excused Absence").length;

  return (
    <div className="w-full min-w-0">
      <Link
        to="/admin/sessions"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-green-600"
      >
        <ArrowLeft size={17} />
        Back to Sessions
      </Link>

      <div className="mt-5 min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-green-600 sm:text-sm">Attendance</p>
        <h1 className="mt-1 break-words text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
          {session.title}
        </h1>
        <p className="mt-2 max-w-3xl break-words text-sm leading-6 text-slate-500 sm:text-base">
          {team.name} • {session.date} • {session.startTime}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-7 sm:grid-cols-2 xl:grid-cols-5">
        <AttendanceStat title="Players" value={teamPlayers.length} />
        <AttendanceStat title="Present" value={presentCount} />
        <AttendanceStat title="Late" value={lateCount} />
        <AttendanceStat title="Absent" value={absentCount} />
        <AttendanceStat title="Excused" value={excusedCount} />
      </div>

      {saved && (
        <div className="mt-6 flex min-w-0 items-start gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          <Check size={17} className="mt-0.5 shrink-0" />
          <span className="min-w-0">Attendance saved successfully.</span>
        </div>
      )}

      <section className="mt-6 min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="min-w-0">
            <h2 className="font-bold text-slate-900">Team Attendance</h2>
            <p className="mt-1 text-sm text-slate-500">Mark each player's attendance status.</p>
          </div>

          <button
            type="button"
            onClick={markAllPresent}
            className="w-full rounded-lg border border-green-200 px-4 py-2.5 text-sm font-semibold text-green-700 transition hover:bg-green-50 sm:w-auto"
          >
            Mark All Present
          </button>
        </div>

        <div className="space-y-3 bg-slate-50/50 p-3 md:hidden">
          {teamPlayers.map((player) => (
            <article
              key={player.id}
              className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="min-w-0">
                <p className="break-words font-semibold text-slate-800">{player.fullName}</p>
                <p className="mt-0.5 break-all text-xs font-semibold text-green-600">{player.playerId}</p>
                <p className="mt-2 break-words text-sm text-slate-500">{player.playingPosition}</p>
              </div>

              <div className="mt-4 border-t border-slate-100 pt-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Attendance status</p>
                <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2">
                  {attendanceOptions.map((status) => {
                    const selected = attendance[player.id] === status;
                    return (
                      <button
                        key={status}
                        type="button"
                        onClick={() => handleStatusChange(player.id, status)}
                        className={[
                          "rounded-lg border px-3 py-2.5 text-xs font-semibold transition",
                          selected
                            ? getSelectedStyle(status)
                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
                        ].join(" ")}
                      >
                        {status}
                      </button>
                    );
                  })}
                </div>
              </div>
            </article>
          ))}

          {teamPlayers.length === 0 && <EmptyTeam />}
        </div>

        <div className="hidden w-full overflow-x-auto md:block">
          <table className="w-full min-w-[850px]">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-5 py-4">Player</th>
                <th className="px-5 py-4">Position</th>
                <th className="px-5 py-4">Attendance</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {teamPlayers.map((player) => (
                <tr key={player.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-800">{player.fullName}</p>
                    <p className="text-xs text-green-600">{player.playerId}</p>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">{player.playingPosition}</td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-2">
                      {attendanceOptions.map((status) => {
                        const selected = attendance[player.id] === status;
                        return (
                          <button
                            key={status}
                            type="button"
                            onClick={() => handleStatusChange(player.id, status)}
                            className={[
                              "rounded-lg border px-3 py-2 text-xs font-semibold transition",
                              selected
                                ? getSelectedStyle(status)
                                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
                            ].join(" ")}
                          >
                            {status}
                          </button>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {teamPlayers.length === 0 && <EmptyTeam />}
        </div>

        <div className="border-t border-slate-200 p-4 sm:flex sm:justify-end sm:p-5">
          <button
            type="button"
            onClick={saveAttendance}
            disabled={teamPlayers.length === 0}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            <Save size={18} className="shrink-0" />
            Save Attendance
          </button>
        </div>
      </section>
    </div>
  );
}

function getSelectedStyle(status: AttendanceStatus) {
  switch (status) {
    case "Present":
      return "border-green-600 bg-green-600 text-white";
    case "Late Arrival":
      return "border-amber-500 bg-amber-500 text-white";
    case "Absent":
      return "border-red-600 bg-red-600 text-white";
    case "Excused Absence":
      return "border-blue-600 bg-blue-600 text-white";
  }
}

interface AttendanceStatProps {
  title: string;
  value: number;
}

function AttendanceStat({ title, value }: AttendanceStatProps) {
  return (
    <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <p className="break-words text-sm text-slate-500">{title}</p>
      <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function EmptyTeam() {
  return (
    <div className="px-4 py-10 text-center sm:p-12">
      <Users size={35} className="mx-auto text-slate-300" />
      <p className="mt-3 font-medium text-slate-700">No players assigned</p>
      <p className="mt-1 text-sm text-slate-500">This team currently has no registered players.</p>
    </div>
  );
}

export default TakeAttendancePage;
