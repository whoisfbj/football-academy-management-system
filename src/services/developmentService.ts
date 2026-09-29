import {
  demoAssessments,
  demoDevelopmentPlans,
  demoProgressReports,
  demoScoutingReports,
} from "../data/demoDevelopment";

import type {
  AssessmentCategory,
  DevelopmentPlan,
  PlayerAssessment,
  ProgressReport,
  ScoutingReport,
} from "../shared/types/development";

const ASSESSMENTS_KEY =
  "academy_assessments";

const IDPS_KEY =
  "academy_development_plans";

const PROGRESS_REPORTS_KEY =
  "academy_progress_reports";

const SCOUTING_REPORTS_KEY =
  "academy_scouting_reports";

function initializeDevelopmentData() {
  if (
    !localStorage.getItem(
      ASSESSMENTS_KEY,
    )
  ) {
    localStorage.setItem(
      ASSESSMENTS_KEY,
      JSON.stringify(
        demoAssessments,
      ),
    );
  }

  if (
    !localStorage.getItem(
      IDPS_KEY,
    )
  ) {
    localStorage.setItem(
      IDPS_KEY,
      JSON.stringify(
        demoDevelopmentPlans,
      ),
    );
  }

  if (
    !localStorage.getItem(
      PROGRESS_REPORTS_KEY,
    )
  ) {
    localStorage.setItem(
      PROGRESS_REPORTS_KEY,
      JSON.stringify(
        demoProgressReports,
      ),
    );
  }

  if (
    !localStorage.getItem(
      SCOUTING_REPORTS_KEY,
    )
  ) {
    localStorage.setItem(
      SCOUTING_REPORTS_KEY,
      JSON.stringify(
        demoScoutingReports,
      ),
    );
  }
}

export function getAssessments(): PlayerAssessment[] {
  initializeDevelopmentData();

  try {
    return JSON.parse(
      localStorage.getItem(
        ASSESSMENTS_KEY,
      ) || "[]",
    ) as PlayerAssessment[];
  } catch {
    return [];
  }
}

export function getAssessmentsByPlayer(
  playerId: string,
) {
  return getAssessments().filter(
    (assessment) =>
      assessment.playerId ===
      playerId,
  );
}

export function addAssessment(
  assessment: PlayerAssessment,
) {
  const assessments =
    getAssessments();

  localStorage.setItem(
    ASSESSMENTS_KEY,
    JSON.stringify([
      ...assessments,
      assessment,
    ]),
  );
}

export function getLatestAssessment(
  playerId: string,
  category: AssessmentCategory,
) {
  return getAssessments()
    .filter(
      (assessment) =>
        assessment.playerId ===
          playerId &&
        assessment.category ===
          category,
    )
    .sort((a, b) =>
      b.date.localeCompare(a.date),
    )[0];
}

export function getDevelopmentPlans(): DevelopmentPlan[] {
  initializeDevelopmentData();

  try {
    return JSON.parse(
      localStorage.getItem(
        IDPS_KEY,
      ) || "[]",
    ) as DevelopmentPlan[];
  } catch {
    return [];
  }
}

export function getDevelopmentPlanByPlayer(
  playerId: string,
) {
  return getDevelopmentPlans()
    .filter(
      (plan) =>
        plan.playerId ===
        playerId,
    )
    .sort((a, b) =>
      b.createdAt.localeCompare(
        a.createdAt,
      ),
    )[0];
}

export function getProgressReports(): ProgressReport[] {
  initializeDevelopmentData();

  try {
    return JSON.parse(
      localStorage.getItem(
        PROGRESS_REPORTS_KEY,
      ) || "[]",
    ) as ProgressReport[];
  } catch {
    return [];
  }
}

export function getProgressReportsByPlayer(
  playerId: string,
) {
  return getProgressReports().filter(
    (report) =>
      report.playerId ===
      playerId,
  );
}

export function addDevelopmentPlan(
  plan: DevelopmentPlan,
) {
  const plans =
    getDevelopmentPlans();

  localStorage.setItem(
    IDPS_KEY,
    JSON.stringify([
      ...plans,
      plan,
    ]),
  );
}

export function updateDevelopmentPlan(
  updatedPlan: DevelopmentPlan,
) {
  const plans =
    getDevelopmentPlans().map(
      (plan) =>
        plan.id === updatedPlan.id
          ? updatedPlan
          : plan,
    );

  localStorage.setItem(
    IDPS_KEY,
    JSON.stringify(plans),
  );
}

export function addProgressReport(
  report: ProgressReport,
) {
  const reports =
    getProgressReports();

  localStorage.setItem(
    PROGRESS_REPORTS_KEY,
    JSON.stringify([
      ...reports,
      report,
    ]),
  );
}

export function addScoutingReport(
  report: ScoutingReport,
) {
  const reports =
    getScoutingReports();

  localStorage.setItem(
    SCOUTING_REPORTS_KEY,
    JSON.stringify([
      ...reports,
      report,
    ]),
  );
}

export function getScoutingReportsByPlayer(
  playerId: string,
) {
  return getScoutingReports().filter(
    (report) =>
      report.playerId ===
      playerId,
  );
}

export function getProgressReportById(
  id: string,
): ProgressReport | undefined {
  return getProgressReports().find(
    (report) => report.id === id,
  );
}

export function getScoutingReportById(
  id: string,
): ScoutingReport | undefined {
  return getScoutingReports().find(
    (report) => report.id === id,
  );
}

export function getScoutingReports(): ScoutingReport[] {
  initializeDevelopmentData();

  try {
    return JSON.parse(
      localStorage.getItem(
        SCOUTING_REPORTS_KEY,
      ) || "[]",
    ) as ScoutingReport[];
  } catch {
    return [];
  }
}