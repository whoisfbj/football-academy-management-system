import { demoTournaments } from "../data/demoTournaments";

import type { Tournament } from "../shared/types/tournament";

const STORAGE_KEY =
  "academy_tournaments";

export function initializeTournaments() {
  const existing =
    localStorage.getItem(
      STORAGE_KEY,
    );

  if (!existing) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        demoTournaments,
      ),
    );
  }
}

export function getTournaments(): Tournament[] {
  initializeTournaments();

  return JSON.parse(
    localStorage.getItem(
      STORAGE_KEY,
    ) || "[]",
  ) as Tournament[];
}

export function saveTournaments(
  tournaments: Tournament[],
) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(
      tournaments,
    ),
  );
}

export function getTournamentById(
  id: string,
) {
  return getTournaments().find(
    (tournament) =>
      tournament.id === id,
  );
}

export function getTournamentsByTeam(
  teamName: string,
) {
  return getTournaments().filter(
    (tournament) =>
      tournament.teamName ===
      teamName,
  );
}