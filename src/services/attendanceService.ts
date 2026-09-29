import { demoAttendance } from "../data/demoAttendance";

import type {
  AttendanceRecord,
  AttendanceStatus,
} from "../shared/types/attendance";

const ATTENDANCE_KEY =
  "academy_attendance";

export function initializeAttendance() {
  const existing =
    localStorage.getItem(
      ATTENDANCE_KEY,
    );

  if (!existing) {
    localStorage.setItem(
      ATTENDANCE_KEY,
      JSON.stringify(
        demoAttendance,
      ),
    );
  }
}

export function getAttendanceRecords(): AttendanceRecord[] {
  initializeAttendance();

  const saved =
    localStorage.getItem(
      ATTENDANCE_KEY,
    );

  if (!saved) {
    return [];
  }

  try {
    return JSON.parse(
      saved,
    ) as AttendanceRecord[];
  } catch {
    return [];
  }
}

export function saveAttendanceRecords(
  records: AttendanceRecord[],
) {
  localStorage.setItem(
    ATTENDANCE_KEY,
    JSON.stringify(records),
  );
}

export function getAttendanceBySession(
  sessionId: string,
) {
  return getAttendanceRecords().filter(
    (record) =>
      record.sessionId ===
      sessionId,
  );
}

export function getAttendanceByPlayer(
  playerId: string,
) {
  return getAttendanceRecords().filter(
    (record) =>
      record.playerId ===
      playerId,
  );
}

export function recordAttendance(
  sessionId: string,
  playerId: string,
  status: AttendanceStatus,
  note?: string,
) {
  const records =
    getAttendanceRecords();

  const existing =
    records.find(
      (record) =>
        record.sessionId ===
          sessionId &&
        record.playerId ===
          playerId,
    );

  if (existing) {
    const updated =
      records.map(
        (record) =>
          record.id ===
          existing.id
            ? {
                ...record,
                status,
                note,
                recordedAt:
                  new Date().toISOString(),
              }
            : record,
      );

    saveAttendanceRecords(
      updated,
    );

    return;
  }

  const newRecord: AttendanceRecord = {
    id: `attendance-${Date.now()}-${playerId}`,

    sessionId,

    playerId,

    status,

    note,

    recordedAt:
      new Date().toISOString(),
  };

  saveAttendanceRecords([
    ...records,
    newRecord,
  ]);
}

export function calculatePlayerAttendancePercentage(
  playerId: string,
) {
  const records =
    getAttendanceByPlayer(
      playerId,
    );

  if (records.length === 0) {
    return 0;
  }

  const attended =
    records.filter(
      (record) =>
        record.status ===
          "Present" ||
        record.status ===
          "Late Arrival",
    ).length;

  return Math.round(
    (attended /
      records.length) *
      100,
  );
}