export type CoachEmploymentStatus =
  | "Active"
  | "Inactive"
  | "On Leave";

export interface Coach {
  id: string;
  coachId: string;

  fullName: string;
  email: string;
  phone: string;

  qualification: string;
  licence: string;
  specialization: string;

  academyBranch: string;
  trainingCentre: string;

  assignedTeamIds: string[];

  employmentStatus: CoachEmploymentStatus;

  dateJoined: string;

  photo?: string;

  createdAt: string;
}