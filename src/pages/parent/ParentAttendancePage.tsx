import {
  CalendarCheck,
  CheckCircle2,
  UserRound,
  XCircle,
} from "lucide-react";

import {
  calculatePlayerAttendancePercentage,
  getAttendanceByPlayer,
} from "../../services/attendanceService";

import {
  getPrimaryLinkedPlayer,
} from "../../services/parentService";

import {
  getSessions,
} from "../../services/sessionService";

function ParentAttendancePage() {
  const linkedPlayer =
    getPrimaryLinkedPlayer();

  if (!linkedPlayer) {
    return (
      <div className="p-5 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <UserRound
              size={34}
              className="mx-auto text-slate-300"
            />

            <h1 className="mt-4 text-xl font-bold">
              No Player Linked
            </h1>
          </div>
        </div>
      </div>
    );
  }

  const playerId =
    linkedPlayer.id;

  const attendance =
    getAttendanceByPlayer(
      playerId,
    );

  const sessions =
    getSessions();

  const percentage =
    calculatePlayerAttendancePercentage(
      playerId,
    );

  const present =
    attendance.filter(
      (record) =>
        record.status ===
        "Present",
    ).length;

  const absent =
    attendance.filter(
      (record) =>
        record.status ===
        "Absent",
    ).length;

  const history =
    attendance
      .map((record) => ({
        record,
        session:
          sessions.find(
            (session) =>
              session.id ===
              record.sessionId,
          ),
      }))
      .sort((a, b) =>
        (
          b.session?.date ?? ""
        ).localeCompare(
          a.session?.date ?? "",
        ),
      );

  return (
    <div className="p-5 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div>
          <p className="text-sm font-semibold text-green-600">
            Parent / Guardian Portal
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-950 lg:text-3xl">
            Attendance
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View training attendance
            records for{" "}
            {linkedPlayer.fullName}.
          </p>
        </div>

        <section className="mt-6 rounded-2xl bg-slate-950 p-6 text-white">
          <p className="text-sm text-slate-400">
            Overall Attendance
          </p>

          <div className="mt-2 flex items-end gap-2">
            <p className="text-4xl font-bold text-green-400">
              {percentage}%
            </p>

            <p className="pb-1 text-sm text-slate-400">
              attendance rate
            </p>
          </div>
        </section>

       <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <StatCard
            label="Present"
            value={present}
            icon={
              <CheckCircle2
                size={20}
              />
            }
          />

          <StatCard
            label="Absent"
            value={absent}
            icon={
              <XCircle size={20} />
            }
          />

        </div>

        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <h2 className="font-bold text-slate-900">
              Attendance History
            </h2>
          </div>

          {history.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {history.map(
                ({
                  record,
                  session,
                }) => (
                  <div
                    key={record.id}
                    className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center lg:p-6"
                  >
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {session?.title ??
                          "Training Session"}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {session
                          ? formatDate(
                              session.date,
                            )
                          : "Date unavailable"}
                      </p>

                      {session && (
                        <p className="mt-1 text-xs text-slate-400">
                          {
                            session.sessionType
                          }
                        </p>
                      )}
                    </div>

                    <AttendanceBadge
                      status={
                        record.status
                      }
                    />
                  </div>
                ),
              )}
            </div>
          ) : (
            <div className="p-12 text-center">
              <CalendarCheck
                size={34}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-4 font-semibold text-slate-800">
                No attendance records
              </h3>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
        {icon}
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {label}
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
      : status === "Late"
        ? "bg-amber-50 text-amber-700"
        : status === "Excused"
          ? "bg-blue-50 text-blue-700"
          : "bg-red-50 text-red-700";

  return (
    <span
      className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${styles}`}
    >
      {status}
    </span>
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

export default ParentAttendancePage;