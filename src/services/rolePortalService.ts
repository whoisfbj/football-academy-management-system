import {
  getCurrentUser,
} from "./authService";

import {
  getPlayers,
} from "./playerService";

import {
  getTeams,
} from "./teamService";

import {
  getSessions,
} from "./sessionService";

import {
  getTournaments,
} from "./tournamentService";

import {
  getMessages,
} from "./communicationService";

import type {
  Player,
} from "../shared/types/player";

import type {
  AcademyTeam,
  TeamStatus,
} from "../shared/types/team";

import type {
  TrainingSession,
  SessionStatus,
} from "../shared/types/sessions";

import type {
  Tournament,
  TournamentStatus,
} from "../shared/types/tournament";

/* =====================================================
   TYPES
===================================================== */

export type PortalAttendanceStatus =
  | "Present"
  | "Absent";

export interface PortalAttendanceRecord {
  id: string;
  sessionId: string;
  playerId: string;
  status: PortalAttendanceStatus;
  recordedAt?: string;
  createdAt?: string;
}

export interface PortalAssessment {
  id: string;
  playerId: string;
  category?: string;
  assessmentType?: string;
  date?: string;
  assessmentDate?: string;
  score?: number;
  comments?: string;
  createdAt?: string;
}

export interface PortalDevelopmentPlan {
  id: string;
  playerId: string;
  title?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  createdAt?: string;
}

export interface PortalProgressReport {
  id: string;
  playerId: string;
  reportingPeriod?: string;
  date?: string;
  comments?: string;
  recommendations?: string;
  createdBy?: string;
  createdAt?: string;
}

export interface PortalScoutingReport {
  id: string;
  playerId: string;
  date?: string;
  recommendation?: string;
  comments?: string;
  createdAt?: string;
}

export interface PortalInvoice {
  id: string;
  invoiceNumber?: string;
  playerId: string;
  amount: number;
  amountPaid: number;
  discountAmount?: number;
  sponsorshipAmount?: number;
  status?: string;
}

export interface PortalPayment {
  id: string;
  playerId: string;
  amount: number;
  paymentDate?: string;
}

export interface PortalExpense {
  id: string;
  description?: string;
  amount: number;
  date?: string;
  expenseDate?: string;
}

/* =====================================================
   STORAGE
===================================================== */

function readStorage<T>(
  key: string,
): T[] {
  try {
    return JSON.parse(
      localStorage.getItem(key) ||
        "[]",
    ) as T[];
  } catch {
    return [];
  }
}

function writeStorage<T>(
  key: string,
  value: T[],
) {
  localStorage.setItem(
    key,
    JSON.stringify(value),
  );
}

/* =====================================================
   SHARED DATA
===================================================== */

export function getPortalPlayers():
  Player[] {
  return getPlayers();
}

export function getPortalTeams():
  AcademyTeam[] {
  return getTeams();
}

export function getPortalSessions():
  TrainingSession[] {
  return getSessions();
}

export function getPortalTournaments() {
  return getTournaments();
}

export function getPortalMessages() {
  return getMessages();
}

/* =====================================================
   ATTENDANCE
===================================================== */

export function getPortalAttendance():
  PortalAttendanceRecord[] {
  return readStorage<PortalAttendanceRecord>(
    "academy_attendance",
  );
}

export function recordCoachAttendance(
  sessionId: string,
  playerId: string,
  status: PortalAttendanceStatus,
) {
  const records =
    getPortalAttendance();

  const existingIndex =
    records.findIndex(
      (record) =>
        record.sessionId ===
          sessionId &&
        record.playerId ===
          playerId,
    );

  const record:
    PortalAttendanceRecord = {
      id:
        existingIndex >= 0
          ? records[existingIndex].id
          : `attendance-${Date.now()}-${playerId}`,

      sessionId,
      playerId,
      status,

      recordedAt:
        new Date().toISOString(),
    };

  if (existingIndex >= 0) {
    records[existingIndex] =
      record;
  } else {
    records.push(record);
  }

  writeStorage(
    "academy_attendance",
    records,
  );
}

/* =====================================================
   DEVELOPMENT
===================================================== */

export function getPortalAssessments() {
  return readStorage<PortalAssessment>(
    "academy_assessments",
  );
}

export function getPortalDevelopmentPlans() {
  return readStorage<PortalDevelopmentPlan>(
    "academy_development_plans",
  );
}

export function getPortalProgressReports() {
  return readStorage<PortalProgressReport>(
    "academy_progress_reports",
  );
}

export function getPortalScoutingReports() {
  return readStorage<PortalScoutingReport>(
    "academy_scouting_reports",
  );
}

export function addPortalProgressReport({
  playerId,
  reportingPeriod,
  comments,
  recommendations,
  createdBy,
}: {
  playerId: string;
  reportingPeriod: string;
  comments: string;
  recommendations: string;
  createdBy: string;
}) {
  const reports =
    getPortalProgressReports();

  const now =
    new Date();

  const report:
    PortalProgressReport = {
      id: `progress-${Date.now()}`,

      playerId,

      reportingPeriod,

      date: now
        .toISOString()
        .slice(0, 10),

      comments,

      recommendations,

      createdBy,

      createdAt:
        now.toISOString(),
    };

  writeStorage(
    "academy_progress_reports",
    [
      ...reports,
      report,
    ],
  );

  return report;
}

/* =====================================================
   FINANCE
===================================================== */

export function getPortalInvoices() {
  return readStorage<PortalInvoice>(
    "academy_invoices",
  );
}

export function getPortalPayments() {
  return readStorage<PortalPayment>(
    "academy_payments",
  );
}

export function getPortalExpenses() {
  return readStorage<PortalExpense>(
    "academy_expenses",
  );
}

export function calculateInvoiceBalance(
  invoice: PortalInvoice,
) {
  const payable =
    invoice.amount -
    (invoice.discountAmount ??
      0) -
    (invoice.sponsorshipAmount ??
      0);

  return Math.max(
    0,
    payable -
      invoice.amountPaid,
  );
}

/* =====================================================
   COACH DATA
===================================================== */

function getCurrentCoachId() {
  const user =
    getCurrentUser();

  if (!user) {
    return undefined;
  }

  if (
    user.email ===
    "coach@academy.com"
  ) {
    return "coach-001";
  }

  return user.id;
}

export function getCoachTeams() {
  const coachId =
    getCurrentCoachId();

  if (!coachId) {
    return [];
  }

  return getPortalTeams().filter(
    (team) =>
      team.headCoachId ===
        coachId ||
      team.assistantCoachId ===
        coachId,
  );
}

export function getCoachPlayers() {
  const teams =
    getCoachTeams();

  const teamNames =
    new Set(
      teams.map(
        (team) =>
          team.name,
      ),
    );

  return getPortalPlayers().filter(
    (player) =>
      player.academyTeam &&
      teamNames.has(
        player.academyTeam,
      ),
  );
}

export function getCoachSessions() {
  const teamIds =
    new Set(
      getCoachTeams().map(
        (team) => team.id,
      ),
    );

  return getPortalSessions().filter(
    (session) =>
      teamIds.has(
        session.teamId,
      ),
  );
}

/* =====================================================
   SESSION ACTIONS
===================================================== */

export function updatePortalSessionStatus(
  sessionId: string,
  status: SessionStatus,
) {
  const sessions =
    getPortalSessions();

  const updated =
    sessions.map(
      (session) =>
        session.id ===
        sessionId
          ? {
              ...session,
              status,
            }
          : session,
    );

  writeStorage(
    "academy_sessions",
    updated,
  );
}

/* =====================================================
   TEAM ACTIONS
===================================================== */

export function updatePortalTeamStatus(
  teamId: string,
  status: TeamStatus,
) {
  const teams =
    getPortalTeams();

  const updated =
    teams.map(
      (team) =>
        team.id === teamId
          ? {
              ...team,
              status,
            }
          : team,
    );

  writeStorage(
    "academy_teams",
    updated,
  );
}

/* =====================================================
   TOURNAMENT ACTIONS
===================================================== */

export function addPortalTournament(
  tournament: Tournament,
) {
  const tournaments =
    getPortalTournaments();

  writeStorage(
    "academy_tournaments",
    [
      ...tournaments,
      tournament,
    ],
  );
}

export function updatePortalTournamentStatus(
  tournamentId: string,
  status: TournamentStatus,
) {
  const tournaments =
    getPortalTournaments();

  const updated =
    tournaments.map(
      (tournament) =>
        tournament.id ===
        tournamentId
          ? {
              ...tournament,
              status,
            }
          : tournament,
    );

  writeStorage(
    "academy_tournaments",
    updated,
  );
}

/* =====================================================
   ANNOUNCEMENT ACTION
===================================================== */

export function addPortalAnnouncement({
  title,
  message,
  audience,
  channel,
}: {
  title: string;
  message: string;
  audience:
    | "All"
    | "Players"
    | "Parents"
    | "Coaches"
    | "Staff";
  channel:
    | "SMS"
    | "Email"
    | "WhatsApp"
    | "Push Notification";
}) {
  const messages =
    readStorage<Record<string, unknown>>(
      "academy_messages",
    );

  const newMessage = {
    id: `message-${Date.now()}`,
    title,
    message,
    audience,
    channel,
    createdAt:
      new Date().toISOString(),
  };

  writeStorage(
    "academy_messages",
    [
      ...messages,
      newMessage,
    ],
  );

  return newMessage;
}

/* =====================================================
   HELPERS
===================================================== */

export function getTeamName(
  teamId: string,
) {
  return (
    getPortalTeams().find(
      (team) =>
        team.id === teamId,
    )?.name ??
    "Unknown Team"
  );
}