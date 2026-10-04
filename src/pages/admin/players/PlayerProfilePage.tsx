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
  useState,
} from "react";

import type {
  ReactNode,
} from "react";

import {
  Link,
  useParams,
} from "react-router";

import PlayerStatusBadge from "../../../components/players/PlayerStatusBadge";

import {
  calculatePlayerAttendancePercentage,
  getAttendanceByPlayer,
} from "../../../services/attendanceService";

import {
  getDevelopmentPlanByPlayer,
  getLatestAssessment,
  getProgressReportsByPlayer,
  getScoutingReportsByPlayer,
} from "../../../services/developmentService";

import {
  getInvoiceBalance,
  getInvoicesByPlayer,
  getPaymentsByPlayer,
} from "../../../services/financeService";

import {
  getPlayerById,
} from "../../../services/playerService";

import {
  getSessionById,
} from "../../../services/sessionService";

/* =========================================================
   TYPES
========================================================= */

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

/* =========================================================
   PLAYER PROFILE
========================================================= */

function PlayerProfilePage() {
  const {
    playerId,
  } = useParams();

  const [
    activeTab,
    setActiveTab,
  ] = useState<ProfileTab>(
    "overview",
  );

  const player = playerId
    ? getPlayerById(playerId)
    : undefined;

  /* =======================================================
     PLAYER NOT FOUND
  ======================================================= */

  if (!player) {
    return (
      <div className="w-full min-w-0">
        <Link
          to="/admin/players"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-slate-500
            transition
            hover:text-green-600
          "
        >
          <ArrowLeft size={17} />

          Back to Players
        </Link>

        <div
          className="
            mt-8
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            py-8
            text-center
            shadow-sm
            sm:p-12
          "
        >
          <UserRound
            size={40}
            className="mx-auto text-slate-300"
          />

          <h2 className="mt-4 text-lg font-bold text-slate-900">
            Player not found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            The requested player record could
            not be found.
          </p>
        </div>
      </div>
    );
  }

  const age = calculateAge(
    player.dateOfBirth,
  );

  /* =======================================================
     ATTENDANCE
  ======================================================= */

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
        record.status ===
        "Present",
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
        record.status ===
        "Absent",
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

  /* =======================================================
     DEVELOPMENT
  ======================================================= */

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
    ).sort(
      (a, b) =>
        b.date.localeCompare(
          a.date,
        ),
    );

  const playerScoutingReports =
    getScoutingReportsByPlayer(
      player.id,
    ).sort(
      (a, b) =>
        b.date.localeCompare(
          a.date,
        ),
    );

  /* =======================================================
     FINANCE
  ======================================================= */

  const playerInvoices =
    getInvoicesByPlayer(
      player.id,
    ).sort(
      (a, b) =>
        b.createdAt.localeCompare(
          a.createdAt,
        ),
    );

  const playerPayments =
    getPaymentsByPlayer(
      player.id,
    ).sort(
      (a, b) =>
        b.paymentDate.localeCompare(
          a.paymentDate,
        ),
    );

  const totalFees =
    playerInvoices.reduce(
      (
        total,
        invoice,
      ) =>
        total +
        invoice.amount -
        invoice.discountAmount -
        invoice.sponsorshipAmount,
      0,
    );

  const totalPaid =
    playerInvoices.reduce(
      (
        total,
        invoice,
      ) =>
        total +
        invoice.amountPaid,
      0,
    );

  const totalOutstanding =
    playerInvoices.reduce(
      (
        total,
        invoice,
      ) =>
        total +
        getInvoiceBalance(
          invoice,
        ),
      0,
    );

  const totalDiscounts =
    playerInvoices.reduce(
      (
        total,
        invoice,
      ) =>
        total +
        invoice.discountAmount,
      0,
    );

  const totalSponsorships =
    playerInvoices.reduce(
      (
        total,
        invoice,
      ) =>
        total +
        invoice.sponsorshipAmount,
      0,
    );

  return (
    <div className="w-full min-w-0">
      {/* ===================================================
          BACK
      ==================================================== */}

      <Link
        to="/admin/players"
        className="
          inline-flex
          items-center
          gap-2
          text-sm
          font-medium
          text-slate-500
          transition
          hover:text-green-600
        "
      >
        <ArrowLeft size={17} />

        Back to Players
      </Link>

      {/* ===================================================
          PROFILE HEADER
      ==================================================== */}

      <section
        className="
          mt-5
          min-w-0
          overflow-hidden
          rounded-xl
          bg-slate-950
          shadow-sm
        "
      >
        <div className="p-4 sm:p-6 lg:p-8">
          <div
            className="
              flex
              min-w-0
              flex-col
              gap-6
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            <div
              className="
                flex
                min-w-0
                flex-col
                gap-5
                sm:flex-row
                sm:items-center
              "
            >
              {player.passportPhoto ? (
                <img
                  src={
                    player.passportPhoto
                  }
                  alt={
                    player.fullName
                  }
                  className="
                    h-20
                    w-20
                    shrink-0
                    rounded-xl
                    object-cover
                    ring-4
                    ring-white/10
                    sm:h-24
                    sm:w-24
                  "
                />
              ) : (
                <div
                  className="
                    flex
                    h-20
                    w-20
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-white/10
                    text-white
                    ring-4
                    ring-white/5
                    sm:h-24
                    sm:w-24
                  "
                >
                  <UserRound
                    size={38}
                  />
                </div>
              )}

              <div className="min-w-0">
                <div
                  className="
                    flex
                    min-w-0
                    flex-col
                    items-start
                    gap-2
                    sm:flex-row
                    sm:flex-wrap
                    sm:items-center
                    sm:gap-3
                  "
                >
                  <h1
                    className="
                      max-w-full
                      break-words
                      text-2xl
                      font-bold
                      leading-tight
                      text-white
                      sm:text-3xl
                    "
                  >
                    {
                      player.fullName
                    }
                  </h1>

                  <PlayerStatusBadge
                    status={
                      player.status
                    }
                  />
                </div>

                <p
                  className="
                    mt-2
                    break-all
                    font-semibold
                    text-green-400
                  "
                >
                  {
                    player.playerId
                  }
                </p>

                <div
                  className="
                    mt-4
                    flex
                    flex-wrap
                    gap-x-4
                    gap-y-2
                    text-sm
                    text-slate-300
                    sm:gap-x-6
                  "
                >
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
                    {
                      player.preferredFoot
                    }{" "}
                    Foot
                  </span>

                  <span>
                    {age} years old
                  </span>
                </div>
              </div>
            </div>

            <div
              className="
                grid
                w-full
                grid-cols-1
                gap-3
                sm:grid-cols-2
                lg:w-auto
              "
            >
              <Link
                to="/admin/development"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-white/20
                  px-4
                  py-2.5
                  text-center
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-white/10
                "
              >
                Player Development
              </Link>

              <Link
                to={`/admin/players/${player.id}/edit`}
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-lg
                  bg-green-600
                  px-4
                  py-2.5
                  text-center
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-green-700
                "
              >
                Edit Player
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          TABS
      ==================================================== */}

      <div
        className="
          mt-6
          w-full
          min-w-0
          overflow-hidden
          rounded-xl
          border
          border-slate-200
          bg-white
          shadow-sm
        "
      >
        <div
          className="
            hide-scrollbar
            w-full
            overflow-x-auto
            overscroll-x-contain
          "
        >
          <div className="flex min-w-max">
            {tabs.map(
              (tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() =>
                    setActiveTab(
                      tab.id,
                    )
                  }
                  className={[
                    `
                      shrink-0
                      border-b-2
                      px-4
                      py-3.5
                      text-sm
                      font-semibold
                      transition
                      sm:px-5
                      sm:py-4
                    `,
                    activeTab ===
                    tab.id
                      ? `
                          border-green-600
                          text-green-600
                        `
                      : `
                          border-transparent
                          text-slate-500
                          hover:text-slate-800
                        `,
                  ].join(
                    " ",
                  )}
                >
                  {tab.label}
                </button>
              ),
            )}
          </div>
        </div>
      </div>

      {/* ===================================================
          OVERVIEW
      ==================================================== */}

      {activeTab ===
        "overview" && (
        <div
          className="
            mt-6
            grid
            min-w-0
            grid-cols-1
            gap-6
            xl:grid-cols-3
          "
        >
          <div
            className="
              min-w-0
              space-y-6
              xl:col-span-2
            "
          >
            {/* PLAYER INFORMATION */}

            <ProfileSection
              icon={
                <UserRound
                  size={21}
                />
              }
              title="Player Information"
            >
              <div
                className="
                  grid
                  grid-cols-1
                  gap-5
                  sm:grid-cols-2
                "
              >
                <ProfileDetail
                  label="Full Name"
                  value={
                    player.fullName
                  }
                />

                <ProfileDetail
                  label="Date of Birth"
                  value={formatDate(
                    player.dateOfBirth,
                  )}
                />

                <ProfileDetail
                  label="Age"
                  value={`${age} years`}
                />

                <ProfileDetail
                  label="Gender"
                  value={
                    player.gender
                  }
                />

                <ProfileDetail
                  label="Age Category"
                  value={
                    player.ageCategory
                  }
                />

                <ProfileDetail
                  label="Playing Position"
                  value={
                    player.playingPosition
                  }
                />

                <ProfileDetail
                  label="Preferred Foot"
                  value={
                    player.preferredFoot
                  }
                />

                <ProfileDetail
                  label="Date Joined"
                  value={formatDate(
                    player.dateJoined,
                  )}
                />
              </div>
            </ProfileSection>

            {/* FOOTBALL */}

            <ProfileSection
              icon={
                <Trophy
                  size={21}
                />
              }
              title="Football Information"
            >
              <div
                className="
                  grid
                  grid-cols-1
                  gap-5
                  sm:grid-cols-2
                "
              >
                <ProfileDetail
                  label="Academy Team"
                  value={
                    player.academyTeam ??
                    "Not Assigned"
                  }
                />

                <ProfileDetail
                  label="Program"
                  value={
                    player.program
                  }
                />

                <ProfileDetail
                  label="Academy Branch"
                  value={
                    player.academyBranch
                  }
                />

                <ProfileDetail
                  label="Training Centre"
                  value={
                    player.trainingCentre
                  }
                />

                <ProfileDetail
                  label="Previous Club"
                  value={
                    player.previousClub ??
                    "None"
                  }
                />

                <ProfileDetail
                  label="Registration Status"
                  value={
                    player.registrationStatus
                  }
                />
              </div>
            </ProfileSection>

            {/* ACADEMIC */}

            <ProfileSection
              icon={
                <GraduationCap
                  size={21}
                />
              }
              title="Academic Information"
            >
              <div
                className="
                  grid
                  grid-cols-1
                  gap-5
                  sm:grid-cols-2
                "
              >
                <ProfileDetail
                  label="School Attended"
                  value={
                    player.schoolAttended
                  }
                />

                <ProfileDetail
                  label="Academic Information"
                  value={
                    player.academicInformation ??
                    "Not provided"
                  }
                />
              </div>
            </ProfileSection>
          </div>

          {/* RIGHT COLUMN */}

          <div className="min-w-0 space-y-6">
            {/* PHYSICAL */}

            <ProfileSection
              icon={
                <Ruler
                  size={20}
                />
              }
              title="Physical Profile"
            >
              <div className="space-y-5">
                <InfoItem
                  icon={
                    <Ruler
                      size={18}
                    />
                  }
                  label="Height"
                  value={`${player.height} cm`}
                />

                <InfoItem
                  icon={
                    <Weight
                      size={18}
                    />
                  }
                  label="Weight"
                  value={`${player.weight} kg`}
                />

                <InfoItem
                  icon={
                    <Activity
                      size={18}
                    />
                  }
                  label="Status"
                  value={
                    player.status
                  }
                />
              </div>
            </ProfileSection>

            {/* GUARDIAN */}

            <ProfileSection
              icon={
                <Users
                  size={20}
                />
              }
              title="Parent / Guardian"
            >
              <div className="space-y-5">
                <ProfileDetail
                  label="Full Name"
                  value={
                    player.guardian
                      .fullName
                  }
                />

                <ProfileDetail
                  label="Relationship"
                  value={
                    player.guardian
                      .relationship
                  }
                />

                <InfoItem
                  icon={
                    <Phone
                      size={17}
                    />
                  }
                  label="Phone"
                  value={
                    player.guardian
                      .phone
                  }
                />

                {player.guardian
                  .alternativePhone && (
                  <InfoItem
                    icon={
                      <Phone
                        size={17}
                      />
                    }
                    label="Alternative Phone"
                    value={
                      player.guardian
                        .alternativePhone
                    }
                  />
                )}

                <InfoItem
                  icon={
                    <MapPin
                      size={17}
                    />
                  }
                  label="Address"
                  value={
                    player.guardian
                      .address ??
                    "Not provided"
                  }
                />
              </div>
            </ProfileSection>

            {/* REGISTRATION */}

            <ProfileSection
              icon={
                <ShieldCheck
                  size={20}
                />
              }
              title="Registration"
            >
              <div className="space-y-5">
                <ProfileDetail
                  label="Player ID"
                  value={
                    player.playerId
                  }
                />

                <ProfileDetail
                  label="Parent Consent"
                  value={
                    player.parentConsent
                      ? "Provided"
                      : "Not Provided"
                  }
                />

                <ProfileDetail
                  label="Registration Status"
                  value={
                    player.registrationStatus
                  }
                />
              </div>
            </ProfileSection>
          </div>
        </div>
      )}

      {/* ===================================================
          DEVELOPMENT
      ==================================================== */}

      {activeTab ===
        "development" && (
        <div className="mt-6 min-w-0 space-y-6">
          <div
            className="
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
              xl:grid-cols-4
            "
          >
            <DevelopmentScore
              title="Technical"
              score={
                technicalAssessment
                  ?.overallScore ?? 0
              }
            />

            <DevelopmentScore
              title="Tactical"
              score={
                tacticalAssessment
                  ?.overallScore ?? 0
              }
            />

            <DevelopmentScore
              title="Physical"
              score={
                physicalAssessment
                  ?.overallScore ?? 0
              }
            />

            <DevelopmentScore
              title="Performance"
              score={
                performanceAssessment
                  ?.overallScore ?? 0
              }
            />
          </div>

          {/* IDP */}

          <section
            className="
              min-w-0
              rounded-xl
              border
              border-slate-200
              bg-white
              p-4
              shadow-sm
              sm:p-6
            "
          >
            <div
              className="
                flex
                min-w-0
                flex-col
                gap-3
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div className="min-w-0">
                <h2 className="break-words text-lg font-bold text-slate-900">
                  Individual Development Plan
                  (IDP)
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Current player development
                  objectives.
                </p>
              </div>

              {currentDevelopmentPlan && (
                <span
                  className="
                    w-fit
                    shrink-0
                    rounded-full
                    bg-green-50
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-green-700
                  "
                >
                  {
                    currentDevelopmentPlan.status
                  }
                </span>
              )}
            </div>

            {currentDevelopmentPlan ? (
              <>
                <div
                  className="
                    mt-6
                    grid
                    grid-cols-1
                    gap-5
                    md:grid-cols-2
                  "
                >
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

                <div
                  className="
                    mt-6
                    min-w-0
                    rounded-lg
                    bg-slate-50
                    p-4
                    sm:p-5
                  "
                >
                  <p className="text-sm font-semibold text-slate-800">
                    Development Actions
                  </p>

                  <ul className="mt-3 space-y-2">
                    {currentDevelopmentPlan.actions.map(
                      (
                        action,
                        index,
                      ) => (
                        <li
                          key={`${action}-${index}`}
                          className="break-words text-sm leading-6 text-slate-600"
                        >
                          • {action}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </>
            ) : (
              <div
                className="
                  mt-6
                  rounded-lg
                  bg-slate-50
                  px-4
                  py-8
                  text-center
                  sm:p-8
                "
              >
                <p className="font-medium text-slate-700">
                  No Individual Development
                  Plan
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  An IDP has not yet been
                  created for this player.
                </p>

                <Link
                  to="/admin/development/idp/new"
                  className="
                    mt-4
                    inline-flex
                    w-full
                    items-center
                    justify-center
                    rounded-lg
                    bg-green-600
                    px-4
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    hover:bg-green-700
                    sm:w-auto
                  "
                >
                  Create IDP
                </Link>
              </div>
            )}
          </section>

          {/* ASSESSMENTS */}

          <div
            className="
              grid
              min-w-0
              grid-cols-1
              gap-6
              lg:grid-cols-2
            "
          >
            <AssessmentDetailCard
              title="Latest Technical Assessment"
              assessment={
                technicalAssessment
              }
            />

            <AssessmentDetailCard
              title="Latest Tactical Assessment"
              assessment={
                tacticalAssessment
              }
            />

            <AssessmentDetailCard
              title="Latest Physical Assessment"
              assessment={
                physicalAssessment
              }
            />

            <AssessmentDetailCard
              title="Latest Performance Assessment"
              assessment={
                performanceAssessment
              }
            />
          </div>
        </div>
      )}

      {/* ===================================================
          ATTENDANCE
      ==================================================== */}

      {activeTab ===
        "attendance" && (
        <div className="mt-6 min-w-0 space-y-6">
          {/* SUMMARY */}

          <div
            className="
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
              xl:grid-cols-5
            "
          >
            <section
              className="
                min-w-0
                rounded-xl
                border
                border-slate-200
                bg-white
                p-4
                shadow-sm
                sm:p-6
              "
            >
              <p className="text-sm text-slate-500">
                Attendance Rate
              </p>

              <p className="mt-2 text-3xl font-bold text-green-600 sm:text-4xl">
                {attendancePercentage}%
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Based on recorded sessions
              </p>
            </section>

            <AttendanceSummaryCard
              title="Present"
              value={
                presentCount
              }
              style="green"
            />

            <AttendanceSummaryCard
              title="Late Arrival"
              value={
                lateCount
              }
              style="amber"
            />

            <AttendanceSummaryCard
              title="Absent"
              value={
                absentCount
              }
              style="red"
            />

            <AttendanceSummaryCard
              title="Excused"
              value={
                excusedCount
              }
              style="blue"
            />
          </div>

          {/* COUNTS */}

          <div
            className="
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-3
              sm:gap-6
            "
          >
            <SimpleNumberCard
              label="Sessions Recorded"
              value={
                attendanceRecords.length
              }
            />

            <SimpleNumberCard
              label="Sessions Attended"
              value={
                attendedCount
              }
            />

            <SimpleNumberCard
              label="Missed Sessions"
              value={
                absentCount
              }
            />
          </div>

          {/* HISTORY */}

          <section
            className="
              min-w-0
              overflow-hidden
              rounded-xl
              border
              border-slate-200
              bg-white
              shadow-sm
            "
          >
            <SectionHeader
              title="Attendance History"
              description="Training and academy session attendance for this player."
            />

            {/* MOBILE */}

            <div className="space-y-3 bg-slate-50/50 p-3 md:hidden">
              {attendanceHistory.map(
                (record) => (
                  <article
                    key={
                      record.id
                    }
                    className="
                      min-w-0
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      p-4
                    "
                  >
                    <div className="flex min-w-0 items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="break-words font-semibold text-slate-800">
                          {record
                            .session
                            ?.title ??
                            "Unknown Session"}
                        </p>

                        <p className="mt-1 break-words text-sm text-slate-500">
                          {record
                            .session
                            ?.sessionType ??
                            "—"}
                        </p>
                      </div>

                      <div className="shrink-0">
                        <AttendanceStatusBadge
                          status={
                            record.status
                          }
                        />
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                      <ProfileDetail
                        label="Date"
                        value={
                          record.session
                            ? formatDate(
                                record
                                  .session
                                  .date,
                              )
                            : "—"
                        }
                      />

                      <ProfileDetail
                        label="Time"
                        value={
                          record.session
                            ? `${record.session.startTime} – ${record.session.endTime}`
                            : "—"
                        }
                      />
                    </div>
                  </article>
                ),
              )}

              {attendanceHistory.length ===
                0 && (
                <AttendanceEmptyState />
              )}
            </div>

            {/* DESKTOP */}

            <div className="hidden overflow-x-auto md:block">
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
                        key={
                          record.id
                        }
                        className="hover:bg-slate-50"
                      >
                        <td className="px-5 py-4">
                          <p className="font-semibold text-slate-800">
                            {record
                              .session
                              ?.title ??
                              "Unknown Session"}
                          </p>
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {record
                            .session
                            ?.sessionType ??
                            "—"}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {record.session
                            ? formatDate(
                                record
                                  .session
                                  .date,
                              )
                            : "—"}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {record.session
                            ? `${record.session.startTime} – ${record.session.endTime}`
                            : "—"}
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
                <AttendanceEmptyState />
              )}
            </div>
          </section>
        </div>
      )}

      {/* ===================================================
          PAYMENTS
      ==================================================== */}

      {activeTab ===
        "payments" && (
        <div className="mt-6 min-w-0 space-y-6">
          {/* FINANCE SUMMARY */}

          <div
            className="
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
              xl:grid-cols-4
            "
          >
            <FinanceSummaryCard
              title="Total Fees"
              value={formatCurrency(
                totalFees,
              )}
              style="slate"
            />

            <FinanceSummaryCard
              title="Paid"
              value={formatCurrency(
                totalPaid,
              )}
              style="green"
            />

            <FinanceSummaryCard
              title="Outstanding"
              value={formatCurrency(
                totalOutstanding,
              )}
              style="red"
            />

            <FinanceSummaryCard
              title="Payments"
              value={`${playerPayments.length}`}
              style="blue"
            />
          </div>

          {(totalDiscounts > 0 ||
            totalSponsorships >
              0) && (
            <div
              className="
                grid
                grid-cols-1
                gap-4
                sm:grid-cols-2
              "
            >
              <AmountCard
                label="Total Discounts"
                value={formatCurrency(
                  totalDiscounts,
                )}
                className="text-amber-600"
              />

              <AmountCard
                label="Sponsorship Support"
                value={formatCurrency(
                  totalSponsorships,
                )}
                className="text-purple-600"
              />
            </div>
          )}

          {/* INVOICES */}

          <section
            className="
              min-w-0
              overflow-hidden
              rounded-xl
              border
              border-slate-200
              bg-white
              shadow-sm
            "
          >
            <SectionHeader
              title="Player Fees & Invoices"
              description="Current and previous academy fee invoices for this player."
            />

            {/* MOBILE INVOICES */}

            <div className="space-y-3 bg-slate-50/50 p-3 md:hidden">
              {playerInvoices.map(
                (invoice) => {
                  const balance =
                    getInvoiceBalance(
                      invoice,
                    );

                  return (
                    <article
                      key={
                        invoice.id
                      }
                      className="
                        min-w-0
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        p-4
                      "
                    >
                      <div className="flex min-w-0 items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="break-all font-semibold text-slate-900">
                            {
                              invoice.invoiceNumber
                            }
                          </p>

                          <p className="mt-1 break-words text-sm leading-5 text-slate-500">
                            {
                              invoice.description
                            }
                          </p>
                        </div>

                        <div className="shrink-0">
                          <PlayerInvoiceStatusBadge
                            status={
                              invoice.status
                            }
                          />
                        </div>
                      </div>

                      <div
                        className="
                          mt-4
                          grid
                          grid-cols-2
                          gap-x-4
                          gap-y-4
                          border-t
                          border-slate-100
                          pt-4
                        "
                      >
                        <ProfileDetail
                          label="Amount"
                          value={formatCurrency(
                            invoice.amount,
                          )}
                        />

                        <ProfileDetail
                          label="Paid"
                          value={formatCurrency(
                            invoice.amountPaid,
                          )}
                        />

                        <ProfileDetail
                          label="Balance"
                          value={formatCurrency(
                            balance,
                          )}
                        />

                        <ProfileDetail
                          label="Due Date"
                          value={formatDate(
                            invoice.dueDate,
                          )}
                        />

                        {invoice.discountAmount >
                          0 && (
                          <ProfileDetail
                            label="Discount"
                            value={formatCurrency(
                              invoice.discountAmount,
                            )}
                          />
                        )}

                        {invoice.sponsorshipAmount >
                          0 && (
                          <ProfileDetail
                            label="Sponsorship"
                            value={formatCurrency(
                              invoice.sponsorshipAmount,
                            )}
                          />
                        )}
                      </div>
                    </article>
                  );
                },
              )}

              {playerInvoices.length ===
                0 && (
                <InvoiceEmptyState />
              )}
            </div>

            {/* DESKTOP INVOICE TABLE */}

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[1050px]">
                <thead className="bg-slate-50">
                  <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-5 py-4">
                      Invoice
                    </th>

                    <th className="px-5 py-4">
                      Description
                    </th>

                    <th className="px-5 py-4">
                      Amount
                    </th>

                    <th className="px-5 py-4">
                      Discount
                    </th>

                    <th className="px-5 py-4">
                      Sponsorship
                    </th>

                    <th className="px-5 py-4">
                      Paid
                    </th>

                    <th className="px-5 py-4">
                      Balance
                    </th>

                    <th className="px-5 py-4">
                      Due Date
                    </th>

                    <th className="px-5 py-4">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {playerInvoices.map(
                    (invoice) => {
                      const balance =
                        getInvoiceBalance(
                          invoice,
                        );

                      return (
                        <tr
                          key={
                            invoice.id
                          }
                          className="hover:bg-slate-50"
                        >
                          <td className="px-5 py-4">
                            <p className="font-semibold text-slate-800">
                              {
                                invoice.invoiceNumber
                              }
                            </p>
                          </td>

                          <td className="px-5 py-4 text-sm text-slate-600">
                            {
                              invoice.description
                            }
                          </td>

                          <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                            {formatCurrency(
                              invoice.amount,
                            )}
                          </td>

                          <td className="px-5 py-4 text-sm text-amber-600">
                            {invoice.discountAmount >
                            0
                              ? formatCurrency(
                                  invoice.discountAmount,
                                )
                              : "—"}
                          </td>

                          <td className="px-5 py-4 text-sm text-purple-600">
                            {invoice.sponsorshipAmount >
                            0
                              ? formatCurrency(
                                  invoice.sponsorshipAmount,
                                )
                              : "—"}
                          </td>

                          <td className="px-5 py-4 text-sm font-semibold text-green-600">
                            {formatCurrency(
                              invoice.amountPaid,
                            )}
                          </td>

                          <td className="px-5 py-4">
                            <span
                              className={
                                balance >
                                0
                                  ? "font-semibold text-red-600"
                                  : "font-semibold text-green-600"
                              }
                            >
                              {formatCurrency(
                                balance,
                              )}
                            </span>
                          </td>

                          <td className="px-5 py-4 text-sm text-slate-600">
                            {formatDate(
                              invoice.dueDate,
                            )}
                          </td>

                          <td className="px-5 py-4">
                            <PlayerInvoiceStatusBadge
                              status={
                                invoice.status
                              }
                            />
                          </td>
                        </tr>
                      );
                    },
                  )}
                </tbody>
              </table>

              {playerInvoices.length ===
                0 && (
                <InvoiceEmptyState />
              )}
            </div>
          </section>

          {/* PAYMENT HISTORY */}

          <section
            className="
              min-w-0
              overflow-hidden
              rounded-xl
              border
              border-slate-200
              bg-white
              shadow-sm
            "
          >
            <SectionHeader
              title="Payment History"
              description="All payments and receipts recorded for this player."
            />

            {/* MOBILE PAYMENTS */}

            <div className="space-y-3 bg-slate-50/50 p-3 md:hidden">
              {playerPayments.map(
                (payment) => (
                  <article
                    key={
                      payment.id
                    }
                    className="
                      min-w-0
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      p-4
                    "
                  >
                    <div className="flex min-w-0 items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link
                          to={`/admin/finance/receipt/${payment.id}`}
                          className="
                            break-all
                            font-semibold
                            text-green-600
                            hover:underline
                          "
                        >
                          {
                            payment.receiptNumber
                          }
                        </Link>

                        <p className="mt-1 break-all text-xs text-slate-500">
                          {
                            payment.paymentNumber
                          }
                        </p>
                      </div>

                      <p className="shrink-0 font-bold text-green-600">
                        {formatCurrency(
                          payment.amount,
                        )}
                      </p>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                      <ProfileDetail
                        label="Date"
                        value={formatDate(
                          payment.paymentDate,
                        )}
                      />

                      <ProfileDetail
                        label="Method"
                        value={
                          payment.paymentMethod
                        }
                      />

                      <div className="col-span-2">
                        <ProfileDetail
                          label="Reference"
                          value={
                            payment.reference ||
                            "—"
                          }
                        />
                      </div>
                    </div>

                    <Link
                      to={`/admin/finance/receipt/${payment.id}`}
                      className="
                        mt-4
                        inline-flex
                        w-full
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-green-200
                        bg-green-50
                        px-4
                        py-2.5
                        text-sm
                        font-semibold
                        text-green-700
                        transition
                        hover:bg-green-100
                      "
                    >
                      View Receipt
                    </Link>
                  </article>
                ),
              )}

              {playerPayments.length ===
                0 && (
                <PaymentEmptyState />
              )}
            </div>

            {/* DESKTOP PAYMENT TABLE */}

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[900px]">
                <thead className="bg-slate-50">
                  <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-5 py-4">
                      Receipt
                    </th>

                    <th className="px-5 py-4">
                      Payment No.
                    </th>

                    <th className="px-5 py-4">
                      Date
                    </th>

                    <th className="px-5 py-4">
                      Method
                    </th>

                    <th className="px-5 py-4">
                      Reference
                    </th>

                    <th className="px-5 py-4">
                      Amount
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {playerPayments.map(
                    (payment) => (
                      <tr
                        key={
                          payment.id
                        }
                        className="hover:bg-slate-50"
                      >
                        <td className="px-5 py-4">
                          <Link
                            to={`/admin/finance/receipt/${payment.id}`}
                            className="
                              font-semibold
                              text-green-600
                              hover:text-green-700
                              hover:underline
                            "
                          >
                            {
                              payment.receiptNumber
                            }
                          </Link>
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {
                            payment.paymentNumber
                          }
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {formatDate(
                            payment.paymentDate,
                          )}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className="
                              rounded-full
                              bg-slate-100
                              px-2.5
                              py-1
                              text-xs
                              font-semibold
                              text-slate-600
                            "
                          >
                            {
                              payment.paymentMethod
                            }
                          </span>
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-500">
                          {payment.reference ||
                            "—"}
                        </td>

                        <td className="px-5 py-4 font-bold text-green-600">
                          {formatCurrency(
                            payment.amount,
                          )}
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>

              {playerPayments.length ===
                0 && (
                <PaymentEmptyState />
              )}
            </div>
          </section>
        </div>
      )}

      {/* ===================================================
          REPORTS
      ==================================================== */}

      {activeTab ===
        "reports" && (
        <div className="mt-6 min-w-0 space-y-8">
          {/* PROGRESS REPORTS */}

          <section className="min-w-0">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-slate-900">
                Progress Reports
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Player development reports
                created by academy coaches.
              </p>
            </div>

            {playerProgressReports.length >
            0 ? (
              <div
                className="
                  grid
                  grid-cols-1
                  gap-4
                  lg:grid-cols-2
                  lg:gap-6
                "
              >
                {playerProgressReports.map(
                  (report) => (
                    <Link
                      key={
                        report.id
                      }
                      to={`/admin/development/progress-report/${report.id}`}
                      className="block min-w-0"
                    >
                      <ReportCard
                        title={
                          report.reportingPeriod
                        }
                        type="Progress Report"
                        date={formatDate(
                          report.date,
                        )}
                        description={
                          report.comments ||
                          report.recommendations ||
                          "View progress report"
                        }
                      />
                    </Link>
                  ),
                )}
              </div>
            ) : (
              <EmptyReportState title="No Progress Reports" />
            )}
          </section>

          {/* SCOUTING */}

          <section className="min-w-0">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-slate-900">
                Scouting Reports
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Scouting observations and player
                potential assessments.
              </p>
            </div>

            {playerScoutingReports.length >
            0 ? (
              <div
                className="
                  grid
                  grid-cols-1
                  gap-4
                  lg:grid-cols-2
                  lg:gap-6
                "
              >
                {playerScoutingReports.map(
                  (report) => (
                    <Link
                      key={
                        report.id
                      }
                      to={`/admin/development/scouting-report/${report.id}`}
                      className="block min-w-0"
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
                          report.recommendation ||
                          "View scouting report"
                        }
                      />
                    </Link>
                  ),
                )}
              </div>
            ) : (
              <EmptyReportState title="No Scouting Reports" />
            )}
          </section>
        </div>
      )}

      {/* ===================================================
          MEDICAL
      ==================================================== */}

      {activeTab ===
        "medical" && (
        <div
          className="
            mt-6
            grid
            min-w-0
            grid-cols-1
            gap-6
            lg:grid-cols-2
          "
        >
          <ProfileSection
            icon={
              <HeartPulse
                size={21}
              />
            }
            title="Medical Information"
          >
            <div className="space-y-5">
              <ProfileDetail
                label="Medical Conditions"
                value={
                  player.medicalInfo
                    .medicalConditions ||
                  "None recorded"
                }
              />

              <ProfileDetail
                label="Allergies"
                value={
                  player.medicalInfo
                    .allergies ||
                  "None recorded"
                }
              />

              <ProfileDetail
                label="Injury History"
                value={
                  player.medicalInfo
                    .injuryHistory ||
                  "None recorded"
                }
              />

              <ProfileDetail
                label="Additional Notes"
                value={
                  player.medicalInfo
                    .additionalNotes ||
                  "None"
                }
              />
            </div>
          </ProfileSection>

          <ProfileSection
            icon={
              <Phone
                size={21}
              />
            }
            title="Emergency Contact"
          >
            <div className="space-y-5">
              <ProfileDetail
                label="Full Name"
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
                label="Phone"
                value={
                  player.medicalInfo
                    .emergencyContact
                    .phone
                }
              />
            </div>
          </ProfileSection>
        </div>
      )}

      {/* ===================================================
          DOCUMENTS
      ==================================================== */}

      {activeTab ===
        "documents" && (
        <div className="mt-6 min-w-0">
          <section
            className="
              min-w-0
              overflow-hidden
              rounded-xl
              border
              border-slate-200
              bg-white
              shadow-sm
            "
          >
            <SectionHeader
              title="Player Documents"
              description="Registration and academy documents associated with this player."
            />

            <div className="divide-y divide-slate-100">
              <DocumentRow
                title="Player Registration Form"
                type="Registration"
                status="Available"
              />

              <DocumentRow
                title="Parent / Guardian Consent"
                type="Consent"
                status={
                  player.parentConsent
                    ? "Available"
                    : "Missing"
                }
              />

              <DocumentRow
                title="Medical Information Record"
                type="Medical"
                status="Available"
              />

              <DocumentRow
                title="Player Identification"
                type="Identification"
                status="Available"
              />
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   PROFILE SECTION
========================================================= */

function ProfileSection({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      className="
        min-w-0
        rounded-xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm
        sm:p-6
      "
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="shrink-0 text-green-600">
          {icon}
        </div>

        <h2 className="min-w-0 break-words text-lg font-bold text-slate-900">
          {title}
        </h2>
      </div>

      <div className="mt-6 min-w-0">
        {children}
      </div>
    </section>
  );
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div
      className="
        border-b
        border-slate-200
        p-4
        sm:p-6
      "
    >
      <h2 className="break-words text-lg font-bold text-slate-900">
        {title}
      </h2>

      <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   INFO ITEM
========================================================= */

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 gap-3">
      <div className="mt-0.5 shrink-0 text-green-600">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-semibold text-slate-700">
          {value}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   PROFILE DETAIL
========================================================= */

function ProfileDetail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0">
      <p
        className="
          text-xs
          font-semibold
          uppercase
          tracking-wide
          text-slate-400
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          break-words
          text-sm
          font-semibold
          text-slate-700
        "
      >
        {value || "—"}
      </p>
    </div>
  );
}

/* =========================================================
   DEVELOPMENT SCORE
========================================================= */

function DevelopmentScore({
  title,
  score,
}: {
  title: string;
  score: number;
}) {
  return (
    <section
      className="
        min-w-0
        rounded-xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm
        sm:p-5
      "
    >
      <div className="flex min-w-0 items-center justify-between gap-3">
        <p className="min-w-0 truncate text-sm font-medium text-slate-500">
          {title}
        </p>

        <Trophy
          size={18}
          className="shrink-0 text-green-600"
        />
      </div>

      <p className="mt-3 break-words text-2xl font-bold text-slate-900 sm:text-3xl">
        {score}

        <span className="ml-1 text-sm font-normal text-slate-400">
          /100
        </span>
      </p>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-green-600"
          style={{
            width: `${Math.min(
              Math.max(
                score,
                0,
              ),
              100,
            )}%`,
          }}
        />
      </div>
    </section>
  );
}

/* =========================================================
   ASSESSMENT
========================================================= */

function AssessmentDetailCard({
  title,
  assessment,
}: {
  title: string;
  assessment:
    | {
        date: string;
        overallScore: number;
        strengths: string;
        areasForImprovement: string;
        comments: string;
        metrics: {
          name: string;
          score: number;
        }[];
      }
    | undefined;
}) {
  if (!assessment) {
    return (
      <section
        className="
          min-w-0
          rounded-xl
          border
          border-slate-200
          bg-white
          p-4
          shadow-sm
          sm:p-6
        "
      >
        <h2 className="break-words font-bold text-slate-900">
          {title}
        </h2>

        <p className="mt-4 text-sm text-slate-500">
          No assessment has been recorded
          yet.
        </p>
      </section>
    );
  }

  return (
    <section
      className="
        min-w-0
        rounded-xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm
        sm:p-6
      "
    >
      <div
        className="
          flex
          min-w-0
          flex-col
          gap-3
          min-[420px]:flex-row
          min-[420px]:items-start
          min-[420px]:justify-between
        "
      >
        <div className="min-w-0">
          <h2 className="break-words font-bold text-slate-900">
            {title}
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            {formatDate(
              assessment.date,
            )}
          </p>
        </div>

        <span
          className="
            w-fit
            shrink-0
            rounded-lg
            bg-green-50
            px-3
            py-2
            text-lg
            font-bold
            text-green-700
          "
        >
          {
            assessment.overallScore
          }
          /100
        </span>
      </div>

      <div
        className="
          mt-6
          grid
          grid-cols-1
          gap-3
          sm:grid-cols-2
        "
      >
        {assessment.metrics.map(
          (metric) => (
            <div
              key={metric.name}
              className="min-w-0 rounded-lg bg-slate-50 p-3"
            >
              <p className="break-words text-xs text-slate-500">
                {
                  metric.name
                }
              </p>

              <p className="mt-1 font-bold text-slate-800">
                {
                  metric.score
                }
                /100
              </p>
            </div>
          ),
        )}
      </div>

      <div className="mt-6 space-y-4">
        <ProfileDetail
          label="Strengths"
          value={
            assessment.strengths ||
            "Not recorded"
          }
        />

        <ProfileDetail
          label="Areas for Improvement"
          value={
            assessment.areasForImprovement ||
            "Not recorded"
          }
        />

        <ProfileDetail
          label="Coach Comments"
          value={
            assessment.comments ||
            "Not recorded"
          }
        />
      </div>
    </section>
  );
}

/* =========================================================
   ATTENDANCE SUMMARY
========================================================= */

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
    <section
      className="
        min-w-0
        rounded-xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm
        sm:p-6
      "
    >
      <div
        className={`
          inline-flex
          max-w-full
          rounded-lg
          px-3
          py-1
          text-xs
          font-semibold
          ${styles[style]}
        `}
      >
        <span className="truncate">
          {title}
        </span>
      </div>

      <p className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
        {value}
      </p>
    </section>
  );
}

/* =========================================================
   ATTENDANCE STATUS
========================================================= */

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
      className={`
        inline-flex
        whitespace-nowrap
        rounded-full
        px-2.5
        py-1
        text-xs
        font-semibold
        ${style}
      `}
    >
      {status}
    </span>
  );
}

/* =========================================================
   SIMPLE NUMBER CARD
========================================================= */

function SimpleNumberCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <section
      className="
        min-w-0
        rounded-xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm
        sm:p-6
      "
    >
      <p className="break-words text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
        {value}
      </p>
    </section>
  );
}

/* =========================================================
   FINANCE SUMMARY
========================================================= */

interface FinanceSummaryCardProps {
  title: string;
  value: string;
  style:
    | "green"
    | "red"
    | "blue"
    | "slate";
}

function FinanceSummaryCard({
  title,
  value,
  style,
}: FinanceSummaryCardProps) {
  const styles = {
    green:
      "bg-green-50 text-green-700",
    red:
      "bg-red-50 text-red-700",
    blue:
      "bg-blue-50 text-blue-700",
    slate:
      "bg-slate-100 text-slate-700",
  };

  return (
    <section
      className="
        min-w-0
        rounded-xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm
        sm:p-5
      "
    >
      <span
        className={`
          inline-flex
          max-w-full
          rounded-lg
          px-3
          py-1
          text-xs
          font-semibold
          ${styles[style]}
        `}
      >
        <span className="truncate">
          {title}
        </span>
      </span>

      <p className="mt-4 break-words text-xl font-bold text-slate-900 sm:text-2xl">
        {value}
      </p>
    </section>
  );
}

/* =========================================================
   AMOUNT CARD
========================================================= */

function AmountCard({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className: string;
}) {
  return (
    <section
      className="
        min-w-0
        rounded-xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm
        sm:p-5
      "
    >
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p
        className={`
          mt-2
          break-words
          text-xl
          font-bold
          sm:text-2xl
          ${className}
        `}
      >
        {value}
      </p>
    </section>
  );
}

/* =========================================================
   INVOICE STATUS
========================================================= */

function PlayerInvoiceStatusBadge({
  status,
}: {
  status: string;
}) {
  const style =
    status === "Paid"
      ? "bg-green-50 text-green-700"
      : status ===
          "Partially Paid"
        ? "bg-amber-50 text-amber-700"
        : status ===
            "Overdue"
          ? "bg-red-50 text-red-700"
          : status ===
              "Cancelled"
            ? "bg-slate-100 text-slate-500"
            : "bg-blue-50 text-blue-700";

  return (
    <span
      className={`
        inline-flex
        max-w-full
        whitespace-nowrap
        rounded-full
        px-2.5
        py-1
        text-xs
        font-semibold
        ${style}
      `}
    >
      {status}
    </span>
  );
}

/* =========================================================
   REPORT CARD
========================================================= */

function ReportCard({
  title,
  type,
  date,
  description,
}: {
  title: string;
  type: string;
  date: string;
  description: string;
}) {
  return (
    <div
      className="
        h-full
        min-w-0
        rounded-xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm
        transition
        hover:border-green-300
        hover:shadow-md
        sm:p-6
      "
    >
      <div className="flex min-w-0 items-start justify-between gap-4">
        <div className="min-w-0">
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-wide
              text-green-600
            "
          >
            {type}
          </p>

          <h3 className="mt-2 break-words font-bold text-slate-900">
            {title}
          </h3>
        </div>

        <FileText
          size={20}
          className="shrink-0 text-slate-400"
        />
      </div>

      <p
        className="
          mt-4
          line-clamp-3
          break-words
          text-sm
          leading-6
          text-slate-600
        "
      >
        {description}
      </p>

      <div className="mt-5 flex items-center gap-2 text-xs text-slate-400">
        <CalendarDays
          size={14}
          className="shrink-0"
        />

        {date}
      </div>
    </div>
  );
}

/* =========================================================
   REPORT EMPTY STATE
========================================================= */

function EmptyReportState({
  title,
}: {
  title: string;
}) {
  return (
    <div
      className="
        rounded-xl
        border
        border-dashed
        border-slate-300
        bg-white
        px-4
        py-8
        text-center
        sm:p-10
      "
    >
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

/* =========================================================
   DOCUMENT ROW
========================================================= */

function DocumentRow({
  title,
  type,
  status,
}: {
  title: string;
  type: string;
  status: string;
}) {
  const available =
    status === "Available";

  return (
    <div
      className="
        flex
        min-w-0
        flex-col
        gap-4
        p-4
        sm:flex-row
        sm:items-center
        sm:justify-between
        sm:p-5
      "
    >
      <div className="flex min-w-0 items-center gap-4">
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-slate-100
            text-slate-500
          "
        >
          <FileText
            size={19}
          />
        </div>

        <div className="min-w-0">
          <p className="break-words font-semibold text-slate-800">
            {title}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {type}
          </p>
        </div>
      </div>

      <span
        className={[
          `
            w-fit
            shrink-0
            rounded-full
            px-2.5
            py-1
            text-xs
            font-semibold
          `,
          available
            ? "bg-green-50 text-green-700"
            : "bg-red-50 text-red-700",
        ].join(" ")}
      >
        {status}
      </span>
    </div>
  );
}

/* =========================================================
   EMPTY STATES
========================================================= */

function AttendanceEmptyState() {
  return (
    <div className="px-4 py-10 text-center sm:p-12">
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
  );
}

function InvoiceEmptyState() {
  return (
    <div className="px-4 py-10 text-center sm:p-12">
      <CreditCard
        size={36}
        className="mx-auto text-slate-300"
      />

      <p className="mt-4 font-medium text-slate-700">
        No invoices found
      </p>

      <p className="mt-1 text-sm text-slate-500">
        No academy fee invoice has been
        created for this player.
      </p>
    </div>
  );
}

function PaymentEmptyState() {
  return (
    <div className="px-4 py-10 text-center sm:p-12">
      <CreditCard
        size={36}
        className="mx-auto text-slate-300"
      />

      <p className="mt-4 font-medium text-slate-700">
        No payments recorded
      </p>

      <p className="mt-1 text-sm text-slate-500">
        Payments made for this player
        will appear here.
      </p>
    </div>
  );
}

/* =========================================================
   UTILITIES
========================================================= */

function calculateAge(
  dateOfBirth: string,
) {
  const today =
    new Date();

  const birthDate =
    new Date(
      `${dateOfBirth}T00:00:00`,
    );

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

function formatDate(
  date: string,
) {
  if (!date) {
    return "—";
  }

  return new Date(
    `${date}T00:00:00`,
  ).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  );
}

function formatCurrency(
  amount: number,
) {
  return new Intl.NumberFormat(
    "en-NG",
    {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    },
  ).format(amount);
}

export default PlayerProfilePage;