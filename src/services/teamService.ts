import { demoTeams } from "../data/demoTeams";

import type { AcademyTeam } from "../shared/types/team";

const TEAMS_KEY =
  "academy_teams";

export function initializeTeams() {
  const existing =
    localStorage.getItem(
      TEAMS_KEY,
    );

  if (!existing) {
    localStorage.setItem(
      TEAMS_KEY,
      JSON.stringify(
        demoTeams,
      ),
    );
  }
}

export function getTeams(): AcademyTeam[] {
  initializeTeams();

  const saved =
    localStorage.getItem(
      TEAMS_KEY,
    );

  if (!saved) {
    return [];
  }

  try {
    return JSON.parse(
      saved,
    ) as AcademyTeam[];
  } catch {
    return [];
  }
}

export function getTeamById(
  id: string,
): AcademyTeam | undefined {
  return getTeams().find(
    (team) => team.id === id,
  );
}

export function saveTeams(
  teams: AcademyTeam[],
) {
  localStorage.setItem(
    TEAMS_KEY,
    JSON.stringify(teams),
  );
}

export function addTeam(
  team: AcademyTeam,
) {
  saveTeams([
    ...getTeams(),
    team,
  ]);
}

export function updateTeam(
  updatedTeam: AcademyTeam,
) {
  const updated =
    getTeams().map(
      (team) =>
        team.id ===
        updatedTeam.id
          ? updatedTeam
          : team,
    );

  saveTeams(updated);
}