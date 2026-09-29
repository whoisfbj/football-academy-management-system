import { demoCoaches } from "../data/demoCoaches";

import type { Coach } from "../shared/types/coach";

const COACHES_KEY =
  "academy_coaches";

export function initializeCoaches() {
  const existing =
    localStorage.getItem(
      COACHES_KEY,
    );

  if (!existing) {
    localStorage.setItem(
      COACHES_KEY,
      JSON.stringify(
        demoCoaches,
      ),
    );
  }
}

export function getCoaches(): Coach[] {
  initializeCoaches();

  const saved =
    localStorage.getItem(
      COACHES_KEY,
    );

  if (!saved) {
    return [];
  }

  try {
    return JSON.parse(
      saved,
    ) as Coach[];
  } catch {
    return [];
  }
}

export function getCoachById(
  id: string,
): Coach | undefined {
  return getCoaches().find(
    (coach) =>
      coach.id === id ||
      coach.coachId === id,
  );
}

export function saveCoaches(
  coaches: Coach[],
) {
  localStorage.setItem(
    COACHES_KEY,
    JSON.stringify(coaches),
  );
}

export function addCoach(
  coach: Coach,
) {
  saveCoaches([
    ...getCoaches(),
    coach,
  ]);
}

export function updateCoach(
  updatedCoach: Coach,
) {
  const updated =
    getCoaches().map(
      (coach) =>
        coach.id ===
        updatedCoach.id
          ? updatedCoach
          : coach,
    );

  saveCoaches(updated);
}