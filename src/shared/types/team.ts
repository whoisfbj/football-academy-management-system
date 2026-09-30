export type TeamStatus =
  | "Active"
  | "Inactive";

export type TeamGenderCategory =
  | "Boys"
  | "Girls"
  | "Mixed";

export interface AcademyTeam {
  id: string;

  name: string;

  ageCategory:
    | "U7"
    | "U9"
    | "U11"
    | "U13"
    | "U15"
    | "U17"
    | "U19";

  genderCategory: TeamGenderCategory;

  program: string;

  branch: string;

  centre: string;

  headCoachId?: string;

  assistantCoachId?: string;

  status: TeamStatus;

  createdAt: string;
}