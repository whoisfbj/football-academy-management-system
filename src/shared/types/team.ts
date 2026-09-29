export type TeamStatus =
  | "Active"
  | "Inactive";

export interface AcademyTeam {
  id: string;

  name: string;

  ageCategory: string;

  genderCategory:
    | "Boys"
    | "Girls"
    | "Mixed";

  program: string;

  academyBranch: string;

  trainingCentre: string;

  headCoachId?: string;
  assistantCoachId?: string;

  status: TeamStatus;

  createdAt: string;
}