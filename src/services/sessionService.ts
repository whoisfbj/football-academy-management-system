import { demoSessions } from "../data/demoSessions";

import type { TrainingSession } from "../shared/types/sessions";

const SESSIONS_KEY =
  "academy_sessions";

export function initializeSessions() {
  const existing =
    localStorage.getItem(
      SESSIONS_KEY,
    );

  if (!existing) {
    localStorage.setItem(
      SESSIONS_KEY,
      JSON.stringify(
        demoSessions,
      ),
    );
  }
}

export function getSessions(): TrainingSession[] {
  initializeSessions();

  const saved =
    localStorage.getItem(
      SESSIONS_KEY,
    );

  if (!saved) {
    return [];
  }

  try {
    return JSON.parse(
      saved,
    ) as TrainingSession[];
  } catch {
    return [];
  }
}

export function getSessionById(
  id: string,
): TrainingSession | undefined {
  return getSessions().find(
    (session) =>
      session.id === id,
  );
}

export function saveSessions(
  sessions: TrainingSession[],
) {
  localStorage.setItem(
    SESSIONS_KEY,
    JSON.stringify(sessions),
  );
}

export function addSession(
  session: TrainingSession,
) {
  saveSessions([
    ...getSessions(),
    session,
  ]);
}

export function updateSession(
  updatedSession: TrainingSession,
) {
  const sessions =
    getSessions().map(
      (session) =>
        session.id ===
        updatedSession.id
          ? updatedSession
          : session,
    );

  saveSessions(sessions);
}