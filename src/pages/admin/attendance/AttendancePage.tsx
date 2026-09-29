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
  const records =
    getAttendanceRecords();

  const sessions =
    getSessions();

  const players =
    getPlayers();

  const present =
    records.filter(
      (record) =>
        record.status ===
        "Present",
    ).length;

  const late =
    records.filter(
      (record) =>
        record.status ===
        "Late Arrival",
    ).length;

  const absent =
    records.filter(
      (record) =>
        record.status ===
        "Absent",
    ).length;

  const excused =
    records.filter(
      (record) =>
        record.status ===
        "Excused Absence",
    ).length;

  const attendancePercentage =
    records.length === 0
      ? 0
      : Math.round(
          ((present + late) /
            records.length) *
            100,
        );

  return (
    <div>
      <div>
        <p className="text-sm font-semibold text-green-600">
          Attendance Management
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          Attendance
        </h1>

        <p className="mt-2 text-slate-500">
          Review training attendance,
          late arrivals, absences and
          academy attendance trends.
        </p>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={
            <ClipboardCheck
              size={20}
            />
          }
          title="Attendance Rate"
          value={`${attendancePercentage}%`}
        />

        <SummaryCard
          icon={
            <UserCheck
              size={20}
            />
          }
          title="Present"
          value={`${present}`}
        />

        <SummaryCard
          icon={
            <Users size={20} />
          }
          title="Late Arrival"
          value={`${late}`}
        />

        <SummaryCard
          icon={
            <UserMinus
              size={20}
            />
          }
          title="Absent"
          value={`${absent}`}
        />
      </div>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <h2 className="font-bold text-slate-900">
            Recent Attendance Records
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="px-5 py-4">
                  Player
                </th>

                <th className="px-5 py-4">
                  Session
                </th>

                <th className="px-5 py-4">
                  Date
                </th>

                <th className="px-5 py-4">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {records.map(
                (record) => {
                  const player =
                    players.find(
                      (item) =>
                        item.id ===
                        record.playerId,
                    );

                  const session =
                    sessions.find(
                      (item) =>
                        item.id ===
                        record.sessionId,
                    );

                  return (
                    <tr
                      key={
                        record.id
                      }
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-800">
                          {player?.fullName ??
                            "Unknown Player"}
                        </p>

                        <p className="text-xs text-green-600">
                          {player?.playerId ??
                            ""}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {session?.title ??
                          "Unknown Session"}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {session?.date ??
                          "-"}
                      </td>

                      <td className="px-5 py-4">
                        <AttendanceBadge
                          status={
                            record.status
                          }
                        />
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>

          {records.length === 0 && (
            <div className="p-12 text-center text-sm text-slate-500">
              No attendance has been
              recorded yet.
            </div>
          )}
        </div>
      </section>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-bold text-slate-900">
          Summary
        </h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SimpleStat
            label="Players"
            value={players.length}
          />

          <SimpleStat
            label="Sessions"
            value={sessions.length}
          />

          <SimpleStat
            label="Excused Absences"
            value={excused}
          />

          <SimpleStat
            label="Attendance Records"
            value={records.length}
          />
        </div>
      </div>
    </div>
  );
}

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  value: string;
}

function SummaryCard({
  icon,
  title,
  value,
}: SummaryCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
        {icon}
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function AttendanceBadge({
  status,
}: {
  status: string;
}) {
  const style =
    status === "Present"
      ? "bg-green-50 text-green-700"
      : status ===
          "Late Arrival"
        ? "bg-amber-50 text-amber-700"
        : status ===
            "Excused Absence"
          ? "bg-blue-50 text-blue-700"
          : "bg-red-50 text-red-700";

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${style}`}
    >
      {status}
    </span>
  );
}

function SimpleStat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-lg bg-slate-50 p-4">
      <p className="text-2xl font-bold text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-sm text-slate-500">
        {label}
      </p>
    </div>
  );
}

export default AttendancePage;