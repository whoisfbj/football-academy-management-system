export type AttendanceStatus =
  | "Present"
  | "Late Arrival"
  | "Absent"
  | "Excused Absence";

export interface AttendanceRecord {
  id: string;

  sessionId: string;

  playerId: string;

  status: AttendanceStatus;

  note?: string;

  recordedAt: string;
}