import type { ReactNode } from "react";
import {
  ClipboardCheck,
  UserCheck,
  UserMinus,
  Users,
} from "lucide-react";

import { getAttendanceRecords } from "../../../services/attendanceService";
import { getPlayers } from "../../../services/playerService";
import { getSessions } from "../../../services/sessionService";

function AttendancePage() {
  const records = getAttendanceRecords();
  const sessions = getSessions();
  const players = getPlayers();

  const present = records.filter((record) => record.status === "Present").length;
  const late = records.filter((record) => record.status === "Late Arrival").length;
  const absent = records.filter((record) => record.status === "Absent").length;
  const excused = records.filter((record) => record.status === "Excused Absence").length;

  const attendancePercentage =
    records.length === 0
      ? 0
      : Math.round(((present + late) / records.length) * 100);

  const resolvedRecords = records.map((record) => ({
    record,
    player: players.find((item) => item.id === record.playerId),
    session: sessions.find((item) => item.id === record.sessionId),
  }));

  return (
    <div className="w-full min-w-0">
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-green-600 sm:text-sm">
          Attendance Management
        </p>

        <h1 className="mt-1 break-words text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
          Attendance
        </h1>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 sm:text-base">
          Review training attendance, late arrivals, absences and academy attendance trends.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-7 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={<ClipboardCheck size={20} />}
          title="Attendance Rate"
          value={`${attendancePercentage}%`}
        />
        <SummaryCard icon={<UserCheck size={20} />} title="Present" value={`${present}`} />
        <SummaryCard icon={<Users size={20} />} title="Late Arrival" value={`${late}`} />
        <SummaryCard icon={<UserMinus size={20} />} title="Absent" value={`${absent}`} />
      </div>

      <section className="mt-6 min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-4 sm:p-6">
          <h2 className="font-bold text-slate-900">Recent Attendance Records</h2>
          <p className="mt-1 text-sm text-slate-500">Latest attendance recorded across academy sessions.</p>
        </div>

        <div className="space-y-3 bg-slate-50/50 p-3 md:hidden">
          {resolvedRecords.map(({ record, player, session }) => (
            <article
              key={record.id}
              className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex min-w-0 items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="break-words font-semibold text-slate-800">
                    {player?.fullName ?? "Unknown Player"}
                  </p>
                  <p className="mt-0.5 break-all text-xs font-semibold text-green-600">
                    {player?.playerId ?? ""}
                  </p>
                </div>

                <div className="shrink-0">
                  <AttendanceBadge status={record.status} />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 border-t border-slate-100 pt-4 min-[420px]:grid-cols-2">
                <Detail label="Session" value={session?.title ?? "Unknown Session"} />
                <Detail label="Date" value={session?.date ?? "—"} />
              </div>
            </article>
          ))}

          {records.length === 0 && <EmptyAttendance />}
        </div>

        <div className="hidden w-full overflow-x-auto md:block">
          <table className="w-full min-w-[800px]">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-5 py-4">Player</th>
                <th className="px-5 py-4">Session</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {resolvedRecords.map(({ record, player, session }) => (
                <tr key={record.id} className="transition hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-800">
                      {player?.fullName ?? "Unknown Player"}
                    </p>
                    <p className="text-xs text-green-600">{player?.playerId ?? ""}</p>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {session?.title ?? "Unknown Session"}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">{session?.date ?? "—"}</td>

                  <td className="px-5 py-4">
                    <AttendanceBadge status={record.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {records.length === 0 && <EmptyAttendance />}
        </div>
      </section>

      <section className="mt-6 min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="font-bold text-slate-900">Summary</h2>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SimpleStat label="Players" value={players.length} />
          <SimpleStat label="Sessions" value={sessions.length} />
          <SimpleStat label="Excused Absences" value={excused} />
          <SimpleStat label="Attendance Records" value={records.length} />
        </div>
      </section>
    </div>
  );
}

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  value: string;
}

function SummaryCard({ icon, title, value }: SummaryCardProps) {
  return (
    <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
        {icon}
      </div>
      <p className="mt-4 break-words text-sm text-slate-500">{title}</p>
      <p className="mt-2 break-words text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function AttendanceBadge({ status }: { status: string }) {
  const style =
    status === "Present"
      ? "bg-green-50 text-green-700"
      : status === "Late Arrival"
        ? "bg-amber-50 text-amber-700"
        : status === "Excused Absence"
          ? "bg-blue-50 text-blue-700"
          : "bg-red-50 text-red-700";

  return (
    <span className={`inline-flex max-w-full rounded-full px-2.5 py-1 text-xs font-semibold ${style}`}>
      <span className="truncate">{status}</span>
    </span>
  );
}

function SimpleStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="min-w-0 rounded-lg bg-slate-50 p-4">
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 break-words text-sm text-slate-500">{label}</p>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 break-words text-sm font-medium text-slate-700">{value}</p>
    </div>
  );
}

function EmptyAttendance() {
  return (
    <div className="px-4 py-10 text-center sm:p-12">
      <ClipboardCheck size={36} className="mx-auto text-slate-300" />
      <p className="mt-4 font-medium text-slate-700">No attendance recorded</p>
      <p className="mt-1 text-sm text-slate-500">Attendance records will appear here after sessions are marked.</p>
    </div>
  );
}

export default AttendancePage;
