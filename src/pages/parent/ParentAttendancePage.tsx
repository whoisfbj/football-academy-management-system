import type { ReactNode } from "react";
import {
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Info,
  XCircle,
} from "lucide-react";

import {
  calculatePlayerAttendancePercentage,
  getAttendanceByPlayer,
} from "../../services/attendanceService";

import { getPlayerById } from "../../services/playerService";
import { getSessions } from "../../services/sessionService";

function ParentAttendancePage() {
  const player = getPlayerById("player-001");

  if (!player) {
    return (
      <div className="p-5 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <ClipboardCheck
              size={34}
              className="mx-auto text-slate-300"
            />

            <h1 className="mt-4 text-xl font-bold text-slate-900">
              No Player Linked
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              No player is currently linked to this parent or guardian account.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const records = getAttendanceByPlayer(player.id);
  const sessions = getSessions();

  const attendanceRate =
    calculatePlayerAttendancePercentage(player.id);

  const present = records.filter(
    (record) => record.status === "Present",
  ).length;

  const late = records.filter(
    (record) => record.status === "Late Arrival",
  ).length;

  const absent = records.filter(
    (record) => record.status === "Absent",
  ).length;

  const excused = records.filter(
    (record) => record.status === "Excused Absence",
  ).length;

  const attendanceRows = records
    .map((record) => {
      const session = sessions.find(
        (item) => item.id === record.sessionId,
      );

      return {
        record,
        session,
      };
    })
    .sort((a, b) =>
      (b.session?.date ?? "").localeCompare(
        a.session?.date ?? "",
      ),
    );

  return (
    <div className="p-5 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div>
          <p className="text-sm font-semibold text-green-600">
            Parent / Guardian Portal
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-950 lg:text-3xl">
            Attendance
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View {player.fullName}'s training and academy attendance records.
          </p>
        </div>

        {/* PLAYER SUMMARY */}
        <section className="mt-6 rounded-2xl bg-slate-950 p-6 text-white shadow-sm">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10">
                <ClipboardCheck size={27} />
              </div>

              <div>
                <p className="text-sm text-slate-400">
                  Attendance record for
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  {player.fullName}
                </h2>

                <p className="mt-1 text-sm font-medium text-green-400">
                  {player.academyTeam ?? "No Team Assigned"} •{" "}
                  {player.ageCategory}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-slate-400">
                Overall Attendance
              </p>

              <p className="mt-1 text-3xl font-bold text-green-400">
                {attendanceRate}%
              </p>
            </div>
          </div>
        </section>

        {/* SUMMARY CARDS */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <StatCard
            title="Attendance Rate"
            value={`${attendanceRate}%`}
            icon={<ClipboardCheck size={20} />}
          />

          <StatCard
            title="Present"
            value={`${present}`}
            icon={<CheckCircle2 size={20} />}
          />

          <StatCard
            title="Late Arrival"
            value={`${late}`}
            icon={<Clock3 size={20} />}
          />

          <StatCard
            title="Absent"
            value={`${absent}`}
            icon={<XCircle size={20} />}
          />

          <StatCard
            title="Excused"
            value={`${excused}`}
            icon={<Info size={20} />}
          />
        </div>

        {/* ATTENDANCE HISTORY */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <h2 className="font-bold text-slate-900">
              Attendance History
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Training and academy session attendance records.
            </p>
          </div>

          {attendanceRows.length > 0 ? (
            <>
              {/* DESKTOP TABLE */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full text-left">
                  <thead className="bg-slate-50">
                    <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      <th className="px-6 py-4">
                        Session
                      </th>

                      <th className="px-6 py-4">
                        Date
                      </th>

                      <th className="px-6 py-4">
                        Type
                      </th>

                      <th className="px-6 py-4">
                        Time
                      </th>

                      <th className="px-6 py-4">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {attendanceRows.map(({ record, session }) => (
                      <tr
                        key={record.id}
                        className="hover:bg-slate-50"
                      >
                        <td className="px-6 py-4">
                          <p className="font-semibold text-slate-800">
                            {session?.title ?? "Academy Session"}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {session?.trainingCentre ??
                              player.trainingCentre}
                          </p>
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                          {session
                            ? formatDate(session.date)
                            : "—"}
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                          {session?.sessionType ?? "—"}
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                          {session
                            ? `${session.startTime} – ${session.endTime}`
                            : "—"}
                        </td>

                        <td className="px-6 py-4">
                          <AttendanceBadge
                            status={record.status}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* MOBILE */}
              <div className="divide-y divide-slate-100 md:hidden">
                {attendanceRows.map(({ record, session }) => (
                  <div
                    key={record.id}
                    className="p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-slate-800">
                          {session?.title ?? "Academy Session"}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          {session
                            ? formatDate(session.date)
                            : "Date unavailable"}
                        </p>
                      </div>

                      <AttendanceBadge
                        status={record.status}
                      />
                    </div>

                    {session && (
                      <div className="mt-4 space-y-2 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                          <CalendarDays size={15} />

                          {session.sessionType}
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock3 size={15} />

                          {session.startTime} – {session.endTime}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="p-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-300">
                <ClipboardCheck size={26} />
              </div>

              <h3 className="mt-4 font-bold text-slate-800">
                No attendance records
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Attendance records will appear here after the academy records
                attendance for this player.
              </p>
            </div>
          )}
        </section>

        {/* EXPLANATION */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-slate-900">
            Attendance Status Guide
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatusExplanation
              title="Present"
              description="Player attended the scheduled session."
              status="Present"
            />

            <StatusExplanation
              title="Late Arrival"
              description="Player attended but arrived after the scheduled start time."
              status="Late Arrival"
            />

            <StatusExplanation
              title="Absent"
              description="Player did not attend the scheduled session."
              status="Absent"
            />

            <StatusExplanation
              title="Excused Absence"
              description="Player's absence was approved or explained."
              status="Excused Absence"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
        {icon}
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold text-slate-950">
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
  const styles =
    status === "Present"
      ? "bg-green-50 text-green-700"
      : status === "Late Arrival"
        ? "bg-amber-50 text-amber-700"
        : status === "Excused Absence"
          ? "bg-blue-50 text-blue-700"
          : "bg-red-50 text-red-700";

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${styles}`}
    >
      {status}
    </span>
  );
}

function StatusExplanation({
  title,
  description,
  status,
}: {
  title: string;
  description: string;
  status: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <AttendanceBadge status={status} />

      <p className="mt-3 font-semibold text-slate-800">
        {title}
      </p>

      <p className="mt-1 text-xs leading-5 text-slate-500">
        {description}
      </p>
    </div>
  );
}

function formatDate(date: string) {
  if (!date) {
    return "—";
  }

  return new Date(`${date}T00:00:00`).toLocaleDateString(
    "en-GB",
    {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  );
}

export default ParentAttendancePage;