import {
  demoTeams,
} from "../data/demoTeams";

import type {
  AcademyTeam,
} from "../shared/types/team";

const STORAGE_KEY =
  "academy_teams";

export function initializeTeams() {
  const existing =
    localStorage.getItem(
      STORAGE_KEY,
    );

  if (!existing) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        demoTeams,
      ),
    );
  }
}

export function getTeams():
  AcademyTeam[] {
  initializeTeams();

  return JSON.parse(
    localStorage.getItem(
      STORAGE_KEY,
    ) || "[]",
  ) as AcademyTeam[];
}

export function saveTeams(
  teams: AcademyTeam[],
) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(teams),
  );
}

export function getTeamById(
  id: string,
) {
  return getTeams().find(
    (team) =>
      team.id === id,
  );
}

export function addTeam(
  team: AcademyTeam,
) {
  const teams =
    getTeams();

  saveTeams([
    ...teams,
    team,
  ]);
}

export function updateTeam(
  updatedTeam: AcademyTeam,
) {
  const teams =
    getTeams().map(
      (team) =>
        team.id ===
        updatedTeam.id
          ? updatedTeam
          : team,
    );

  saveTeams(teams);
}