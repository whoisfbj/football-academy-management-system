import {
  calculatePlayerAttendancePercentage,
  getAttendanceByPlayer,
} from "../../../services/attendanceService";

import {
  getSessionById,
} from "../../../services/sessionService";

import {
  getDevelopmentPlanByPlayer,
  getLatestAssessment,
  getProgressReportsByPlayer,
  getScoutingReportsByPlayer,
} from "../../../services/developmentService";

import { useState } from "react";
import type { ReactNode } from "react";
import {
  Activity,
  ArrowLeft,
  CalendarDays,
  ClipboardCheck,
  CreditCard,
  FileText,
  GraduationCap,
  HeartPulse,
  MapPin,
  Phone,
  Ruler,
  ShieldCheck,
  Trophy,
  UserRound,
  Users,
  Weight,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router";

import PlayerStatusBadge from "../../../components/players/PlayerStatusBadge";

import {
  getPlayerById,
} from "../../../services/playerService";

type ProfileTab =
  | "overview"
  | "development"
  | "attendance"
  | "payments"
  | "reports"
  | "medical"
  | "documents";

const tabs: {
  id: ProfileTab;
  label: string;
}[] = [
  {
    id: "overview",
    label: "Overview",
  },
  {
    id: "development",
    label: "Development",
  },
  {
    id: "attendance",
    label: "Attendance",
  },
  {
    id: "payments",
    label: "Payments",
  },
  {
    id: "reports",
    label: "Reports",
  },
  {
    id: "medical",
    label: "Medical",
  },
  {
    id: "documents",
    label: "Documents",
  },
];

function calculateAge(dateOfBirth: string) {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();

  let age =
    today.getFullYear() -
    birthDate.getFullYear();

  const monthDifference =
    today.getMonth() -
    birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 &&
      today.getDate() <
        birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

function formatDate(date: string) {
  return new Date(
    `${date}T00:00:00`,
  ).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function PlayerProfilePage() {
  const { playerId } = useParams();

  const [activeTab, setActiveTab] =
    useState<ProfileTab>("overview");

  const player = playerId
    ? getPlayerById(playerId)
    : undefined;

  if (!player) {
    return (
      <div>
        <Link
          to="/admin/players"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-green-600"
        >
          <ArrowLeft size={17} />
          Back to Players
        </Link>

        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <UserRound
            size={40}
            className="mx-auto text-slate-300"
          />

          <h1 className="mt-4 text-xl font-bold text-slate-900">
            Player Not Found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            The requested player record does
            not exist.
          </p>
        </div>
      </div>
    );
  }

  const age = calculateAge(
    player.dateOfBirth,
  );

  const attendanceRecords =
  getAttendanceByPlayer(
    player.id,
  );

const attendancePercentage =
  calculatePlayerAttendancePercentage(
    player.id,
  );

const presentCount =
  attendanceRecords.filter(
    (record) =>
      record.status === "Present",
  ).length;

const lateCount =
  attendanceRecords.filter(
    (record) =>
      record.status ===
      "Late Arrival",
  ).length;

const absentCount =
  attendanceRecords.filter(
    (record) =>
      record.status === "Absent",
  ).length;

const excusedCount =
  attendanceRecords.filter(
    (record) =>
      record.status ===
      "Excused Absence",
  ).length;

const attendedCount =
  presentCount + lateCount;

const attendanceHistory =
  attendanceRecords
    .map((record) => {
      const session =
        getSessionById(
          record.sessionId,
        );

      return {
        ...record,
        session,
      };
    })
    .sort((a, b) => {
      const aDate =
        a.session?.date ?? "";

      const bDate =
        b.session?.date ?? "";

      return bDate.localeCompare(
        aDate,
      );
    });
const technicalAssessment =
  getLatestAssessment(
    player.id,
    "Technical Assessment",
  );

const tacticalAssessment =
  getLatestAssessment(
    player.id,
    "Tactical Assessment",
  );

const physicalAssessment =
  getLatestAssessment(
    player.id,
    "Physical Assessment",
  );

const performanceAssessment =
  getLatestAssessment(
    player.id,
    "Performance Assessment",
  );

const currentDevelopmentPlan =
  getDevelopmentPlanByPlayer(
    player.id,
  );

  const playerProgressReports =
  getProgressReportsByPlayer(
    player.id,
  ).sort((a, b) =>
    b.date.localeCompare(a.date),
  );

const playerScoutingReports =
  getScoutingReportsByPlayer(
    player.id,
  ).sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  return (
    <div>
      <Link
        to="/admin/players"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-green-600"
      >
        <ArrowLeft size={17} />

        Back to Players
      </Link>

      {/* PROFILE HEADER */}

      <section className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="h-28 bg-slate-950" />

        <div className="px-6 pb-6">
          <div className="-mt-14 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-xl border-4 border-white bg-slate-200 shadow-sm">
                {player.passportPhoto ? (
                  <img
                    src={
                      player.passportPhoto
                    }
                    alt={player.fullName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserRound
                    size={45}
                    className="text-slate-400"
                  />
                )}
              </div>

              <div className="pb-1">
                <div className="flex flex-wrap items-center gap-3">
                 <h1 className="text-2xl font-bold text-white">
                     {player.fullName}
                </h1>

                  <PlayerStatusBadge
                    status={player.status}
                  />
                </div>

                <p className="mt-1 font-medium text-green-600">
                  {player.playerId}
                </p>

                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                  <span>
                    {
                      player.ageCategory
                    }
                  </span>

                  <span>
                    {
                      player.playingPosition
                    }
                  </span>

                  <span>
                    {player.preferredFoot} Foot
                  </span>

                  <span>
                    {age} years old
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/admin/development"
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Player Development
              </Link>

              <Link
  to={`/admin/players/${player.id}/edit`}
  className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
>
  Edit Player
</Link>
            </div>
          </div>
        </div>

        {/* TABS */}

        <div className="overflow-x-auto border-t border-slate-200">
          <div className="flex min-w-max px-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(tab.id)
                }
                className={[
                  "border-b-2 px-4 py-4 text-sm font-semibold transition",
                  activeTab === tab.id
                    ? "border-green-600 text-green-600"
                    : "border-transparent text-slate-500 hover:text-slate-800",
                ].join(" ")}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* OVERVIEW */}

      {activeTab === "overview" && (
        <div className="mt-6 grid gap-6 xl:grid-cols-3">
          <div className="space-y-6 xl:col-span-2">
            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">
                Player Information
              </h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <InfoItem
                  icon={
                    <CalendarDays
                      size={18}
                    />
                  }
                  label="Date of Birth"
                  value={formatDate(
                    player.dateOfBirth,
                  )}
                />

                <InfoItem
                  icon={
                    <Users size={18} />
                  }
                  label="Gender"
                  value={player.gender}
                />

                <InfoItem
                  icon={
                    <Trophy size={18} />
                  }
                  label="Academy Team"
                  value={
                    player.academyTeam ??
                    "Not Assigned"
                  }
                />

                <InfoItem
                  icon={
                    <ShieldCheck
                      size={18}
                    />
                  }
                  label="Program"
                  value={player.program}
                />

                <InfoItem
                  icon={
                    <MapPin size={18} />
                  }
                  label="Training Centre"
                  value={
                    player.trainingCentre
                  }
                />

                <InfoItem
                  icon={
                    <MapPin size={18} />
                  }
                  label="Academy Branch"
                  value={
                    player.academyBranch
                  }
                />

                <InfoItem
                  icon={
                    <Ruler size={18} />
                  }
                  label="Height"
                  value={`${player.height} cm`}
                />

                <InfoItem
                  icon={
                    <Weight size={18} />
                  }
                  label="Weight"
                  value={`${player.weight} kg`}
                />
              </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">
                Football Information
              </h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <InfoItem
                  icon={
                    <Trophy size={18} />
                  }
                  label="Playing Position"
                  value={
                    player.playingPosition
                  }
                />

                <InfoItem
                  icon={
                    <Activity size={18} />
                  }
                  label="Preferred Foot"
                  value={
                    player.preferredFoot
                  }
                />

                <InfoItem
                  icon={
                    <CalendarDays
                      size={18}
                    />
                  }
                  label="Date Joined"
                  value={formatDate(
                    player.dateJoined,
                  )}
                />

                <InfoItem
                  icon={
                    <ShieldCheck
                      size={18}
                    />
                  }
                  label="Previous Club / Academy"
                  value={
                    player.previousClub ??
                    "None"
                  }
                />
              </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">
                Academic Information
              </h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <InfoItem
                  icon={
                    <GraduationCap
                      size={18}
                    />
                  }
                  label="School Attended"
                  value={
                    player.schoolAttended
                  }
                />

                <InfoItem
                  icon={
                    <FileText size={18} />
                  }
                  label="Academic Information"
                  value={
                    player.academicInformation ??
                    "Not provided"
                  }
                />
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="font-bold text-slate-900">
                Parent / Guardian
              </h2>

              <div className="mt-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                  <UserRound
                    size={22}
                    className="text-slate-500"
                  />
                </div>

                <p className="mt-4 font-semibold text-slate-800">
                  {
                    player.guardian
                      .fullName
                  }
                </p>

                <p className="text-sm text-slate-500">
                  {
                    player.guardian
                      .relationship
                  }
                </p>

                <div className="mt-5 space-y-3 text-sm">
                  <div className="flex gap-3 text-slate-600">
                    <Phone
                      size={17}
                      className="shrink-0 text-slate-400"
                    />

                    {
                      player.guardian
                        .phone
                    }
                  </div>

                  {player.guardian
                    .email && (
                    <div className="text-slate-600">
                      {
                        player
                          .guardian
                          .email
                      }
                    </div>
                  )}

                  <div className="flex gap-3 text-slate-600">
                    <MapPin
                      size={17}
                      className="shrink-0 text-slate-400"
                    />

                    {
                      player.guardian
                        .address
                    }
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="font-bold text-slate-900">
                Registration
              </h2>

              <div className="mt-5 space-y-4">
                <ProfileDetail
                  label="Registration Status"
                  value={
                    player.registrationStatus
                  }
                />

                <ProfileDetail
                  label="Player Status"
                  value={player.status}
                />

                <ProfileDetail
                  label="Parent Consent"
                  value={
                    player.parentConsent
                      ? "Confirmed"
                      : "Not Confirmed"
                  }
                />

                <ProfileDetail
                  label="Player ID"
                  value={player.playerId}
                />
              </div>
            </section>

            <section className="rounded-xl bg-slate-950 p-6 text-white shadow-sm">
              <p className="text-sm text-slate-400">
                Academy Assignment
              </p>

              <p className="mt-3 text-lg font-bold">
                {player.academyTeam ??
                  "No Team Assigned"}
              </p>

              <p className="mt-2 text-sm text-slate-300">
                {
                  player.trainingCentre
                }
              </p>

              <p className="mt-1 text-sm text-slate-400">
                {
                  player.academyBranch
                }
              </p>
            </section>
          </div>
        </div>
      )}

      {/* DEVELOPMENT */}

      {activeTab === "development" && (
        <div className="mt-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-4">
            <DevelopmentScore
  title="Technical"
  score={
    technicalAssessment?.overallScore ??
    0
  }
/>

<DevelopmentScore
  title="Tactical"
  score={
    tacticalAssessment?.overallScore ??
    0
  }
/>

<DevelopmentScore
  title="Physical"
  score={
    physicalAssessment?.overallScore ??
    0
  }
/>

<DevelopmentScore
  title="Performance"
  score={
    performanceAssessment?.overallScore ??
    0
  }
/>
          </div>

  <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h2 className="text-lg font-bold text-slate-900">
        Individual Development Plan (IDP)
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Current player development objectives.
      </p>
    </div>

    {currentDevelopmentPlan && (
      <span className="w-fit rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
        {currentDevelopmentPlan.status}
      </span>
    )}
  </div>

  {currentDevelopmentPlan ? (
    <>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <ProfileDetail
          label="Primary Goal"
          value={
            currentDevelopmentPlan.primaryGoal
          }
        />

        <ProfileDetail
          label="Secondary Goal"
          value={
            currentDevelopmentPlan.secondaryGoal ??
            "None"
          }
        />

        <ProfileDetail
          label="Start Date"
          value={formatDate(
            currentDevelopmentPlan.startDate,
          )}
        />

        <ProfileDetail
          label="Review Date"
          value={formatDate(
            currentDevelopmentPlan.reviewDate,
          )}
        />
      </div>

      <div className="mt-6 rounded-lg bg-slate-50 p-5">
        <p className="text-sm font-semibold text-slate-800">
          Development Actions
        </p>

        <ul className="mt-3 space-y-2">
          {currentDevelopmentPlan.actions.map(
            (action) => (
              <li
                key={action}
                className="text-sm text-slate-600"
              >
                • {action}
              </li>
            ),
          )}
        </ul>
      </div>
    </>
  ) : (
    <div className="mt-6 rounded-lg bg-slate-50 p-8 text-center">
      <p className="font-medium text-slate-700">
        No Individual Development Plan
      </p>

      <p className="mt-1 text-sm text-slate-500">
        An IDP has not yet been created for this
        player.
      </p>
    </div>
  )}
</section>
        </div>
      )}

      {/* ATTENDANCE */}

      {activeTab === "attendance" && (
  <div className="mt-6 space-y-6">
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">
          Attendance Rate
        </p>

        <p className="mt-2 text-4xl font-bold text-green-600">
          {attendancePercentage}%
        </p>

        <p className="mt-2 text-sm text-slate-500">
          Based on recorded sessions
        </p>
      </section>

      <AttendanceSummaryCard
        title="Present"
        value={presentCount}
        style="green"
      />

      <AttendanceSummaryCard
        title="Late Arrival"
        value={lateCount}
        style="amber"
      />

      <AttendanceSummaryCard
        title="Absent"
        value={absentCount}
        style="red"
      />

      <AttendanceSummaryCard
        title="Excused"
        value={excusedCount}
        style="blue"
      />
    </div>

    <div className="grid gap-6 lg:grid-cols-3">
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">
          Sessions Recorded
        </p>

        <p className="mt-2 text-3xl font-bold text-slate-900">
          {attendanceRecords.length}
        </p>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">
          Sessions Attended
        </p>

        <p className="mt-2 text-3xl font-bold text-slate-900">
          {attendedCount}
        </p>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">
          Missed Sessions
        </p>

        <p className="mt-2 text-3xl font-bold text-slate-900">
          {absentCount}
        </p>
      </section>
    </div>

    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-6">
        <h2 className="font-bold text-slate-900">
          Attendance History
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Training and academy session attendance
          for this player.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-slate-50">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-5 py-4">
                Session
              </th>

              <th className="px-5 py-4">
                Type
              </th>

              <th className="px-5 py-4">
                Date
              </th>

              <th className="px-5 py-4">
                Time
              </th>

              <th className="px-5 py-4">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {attendanceHistory.map(
              (record) => (
                <tr
                  key={record.id}
                  className="hover:bg-slate-50"
                >
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-800">
                      {record.session?.title ??
                        "Unknown Session"}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {record.session
                      ?.sessionType ??
                      "-"}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {record.session
                      ? formatDate(
                          record.session
                            .date,
                        )
                      : "-"}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {record.session
                      ? `${record.session.startTime} – ${record.session.endTime}`
                      : "-"}
                  </td>

                  <td className="px-5 py-4">
                    <AttendanceStatusBadge
                      status={
                        record.status
                      }
                    />
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>

        {attendanceHistory.length ===
          0 && (
          <div className="p-12 text-center">
            <ClipboardCheck
              size={36}
              className="mx-auto text-slate-300"
            />

            <p className="mt-4 font-medium text-slate-700">
              No attendance recorded
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Attendance will appear here once
              this player attends a session.
            </p>
          </div>
        )}
      </div>
    </section>
  </div>
)}
      {/* PAYMENTS */}

      {activeTab === "payments" && (
        <div className="mt-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <FinanceCard
              title="Current Package"
              value="3-Month Package"
            />

            <FinanceCard
              title="Total Paid"
              value="₦60,000"
            />

            <FinanceCard
              title="Outstanding"
              value="₦30,000"
            />
          </div>

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-slate-900">
              Payment History
            </h2>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[750px]">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-xs uppercase text-slate-500">
                    <th className="py-3">
                      Receipt
                    </th>
                    <th className="py-3">
                      Description
                    </th>
                    <th className="py-3">
                      Date
                    </th>
                    <th className="py-3">
                      Amount
                    </th>
                    <th className="py-3">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className="py-4 text-sm font-medium text-green-600">
                      RCT-2026-00421
                    </td>

                    <td className="py-4 text-sm text-slate-600">
                      3-Month Package
                    </td>

                    <td className="py-4 text-sm text-slate-600">
                      5 Sep 2026
                    </td>

                    <td className="py-4 text-sm font-semibold text-slate-800">
                      ₦60,000
                    </td>

                    <td className="py-4">
                      <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                        Paid
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}

      {/* REPORTS */}

     {activeTab === "reports" && (
  <div className="mt-6 space-y-8">
    <section>
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-900">
          Progress Reports
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Player development reports created by
          academy coaches.
        </p>
      </div>

      {playerProgressReports.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {playerProgressReports.map(
            (report) => (
              <Link
  key={report.id}
  to={`/admin/development/progress-report/${report.id}`}
  className="block"
>
  <ReportCard
    title={report.reportingPeriod}
    type="Progress Report"
    date={formatDate(
      report.date,
    )}
    description={
      report.comments ||
      report.recommendations
    }
  />
</Link>
            ),
          )}
        </div>
      ) : (
        <EmptyReportState
          title="No Progress Reports"
        />
      )}
    </section>

    <section>
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-900">
          Scouting Reports
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Scouting observations and player
          potential assessments.
        </p>
      </div>

      {playerScoutingReports.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {playerScoutingReports.map(
            (report) => (
              <Link
  key={report.id}
  to={`/admin/development/scouting-report/${report.id}`}
  className="block"
>
  <ReportCard
    title={
      report.matchObserved
    }
    type="Scouting Report"
    date={formatDate(
      report.date,
    )}
    description={
      report.recommendation
    }
  />
</Link>
            ),
          )}
        </div>
      ) : (
        <EmptyReportState
          title="No Scouting Reports"
        />
      )}
    </section>
  </div>
)}

      {/* MEDICAL */}

      {activeTab === "medical" && (
        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <HeartPulse className="text-red-500" />

              <h2 className="text-lg font-bold text-slate-900">
                Medical Information
              </h2>
            </div>

            <div className="mt-6 space-y-5">
              <ProfileDetail
                label="Medical Conditions"
                value={
                  player.medicalInfo
                    .medicalConditions ??
                  "None recorded"
                }
              />

              <ProfileDetail
                label="Allergies"
                value={
                  player.medicalInfo
                    .allergies ??
                  "None recorded"
                }
              />

              <ProfileDetail
                label="Injury History"
                value={
                  player.medicalInfo
                    .injuryHistory ??
                  "No injury history recorded"
                }
              />

              <ProfileDetail
                label="Additional Notes"
                value={
                  player.medicalInfo
                    .additionalNotes ??
                  "No additional medical notes"
                }
              />
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Emergency Contact
            </h2>

            <div className="mt-6 space-y-5">
              <ProfileDetail
                label="Name"
                value={
                  player.medicalInfo
                    .emergencyContact
                    .fullName
                }
              />

              <ProfileDetail
                label="Relationship"
                value={
                  player.medicalInfo
                    .emergencyContact
                    .relationship
                }
              />

              <ProfileDetail
                label="Phone Number"
                value={
                  player.medicalInfo
                    .emergencyContact
                    .phone
                }
              />
            </div>
          </section>
        </div>
      )}

      {/* DOCUMENTS */}

      {activeTab === "documents" && (
        <div className="mt-6">
          <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900">
                Player Documents
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Registration, consent and
                supporting academy documents.
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              <DocumentRow
                name="Player Registration Form"
                type="Registration"
              />

              <DocumentRow
                name="Parent Consent Form"
                type="Consent"
              />

              <DocumentRow
                name="Medical Information Form"
                type="Medical"
              />

              <DocumentRow
                name="Academic Information"
                type="Academic"
              />
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

interface InfoItemProps {
 icon: ReactNode;
  label: string;
  value: string;
}

function InfoItem({
  icon,
  label,
  value,
}: InfoItemProps) {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
        {icon}
      </div>

      <div>
        <p className="text-xs text-slate-500">
          {label}
        </p>

        <p className="mt-1 text-sm font-semibold text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}

interface ProfileDetailProps {
  label: string;
  value: string;
}

function ProfileDetail({
  label,
  value,
}: ProfileDetailProps) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-700">
        {value}
      </p>
    </div>
  );
}

interface DevelopmentScoreProps {
  title: string;
  score: number;
}

function DevelopmentScore({
  title,
  score,
}: DevelopmentScoreProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">
        {title} Assessment
      </p>

      <p className="mt-2 text-3xl font-bold text-slate-900">
        {score}
        <span className="text-base font-medium text-slate-400">
          /100
        </span>
      </p>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-green-600"
          style={{
            width: `${score}%`,
          }}
        />
      </div>
    </div>
  );
}

interface FinanceCardProps {
  title: string;
  value: string;
}

function FinanceCard({
  title,
  value,
}: FinanceCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <CreditCard
        size={20}
        className="text-green-600"
      />

      <p className="mt-4 text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

interface ReportCardProps {
  title: string;
  type: string;
  date: string;
  description: string;
}

function ReportCard({
  title,
  type,
  date,
  description,
}: ReportCardProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
        <FileText size={20} />
      </div>

      <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-green-600">
        {type}
      </p>

      <h2 className="mt-2 font-bold text-slate-900">
        {title}
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        {date}
      </p>

      <p className="mt-4 text-sm leading-6 text-slate-600">
        {description}
      </p>

      <button className="mt-5 text-sm font-semibold text-green-600 hover:text-green-700">
        View Report
      </button>
    </section>
  );
}

interface DocumentRowProps {
  name: string;
  type: string;
}

function DocumentRow({
  name,
  type,
}: DocumentRowProps) {
  return (
    <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
          <FileText size={19} />
        </div>

        <div>
          <p className="font-medium text-slate-800">
            {name}
          </p>

          <p className="text-xs text-slate-500">
            {type}
          </p>
        </div>
      </div>

      <button className="text-left text-sm font-semibold text-green-600 sm:text-right">
        View Document
      </button>
    </div>
  );
}

interface AttendanceSummaryCardProps {
  title: string;
  value: number;
  style:
    | "green"
    | "amber"
    | "red"
    | "blue";
}

function AttendanceSummaryCard({
  title,
  value,
  style,
}: AttendanceSummaryCardProps) {
  const styles = {
    green:
      "bg-green-50 text-green-700",
    amber:
      "bg-amber-50 text-amber-700",
    red:
      "bg-red-50 text-red-700",
    blue:
      "bg-blue-50 text-blue-700",
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div
        className={`inline-flex rounded-lg px-3 py-1 text-xs font-semibold ${styles[style]}`}
      >
        {title}
      </div>

      <p className="mt-4 text-3xl font-bold text-slate-900">
        {value}
      </p>
    </section>
  );
}

function AttendanceStatusBadge({
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
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${style}`}
    >
      {status}
    </span>
  );
}

function EmptyReportState({
  title,
}: {
  title: string;
}) {
  return (
  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-green-300 hover:shadow-md">
      <FileText
        size={32}
        className="mx-auto text-slate-300"
      />

      <p className="mt-3 font-medium text-slate-700">
        {title}
      </p>
    </div>
  );
}


export default PlayerProfilePage;