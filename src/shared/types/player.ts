export type Gender =
  | "Male"
  | "Female";

export type PreferredFoot =
  | "Right"
  | "Left"
  | "Both";

export type PlayerStatus =
  | "Active"
  | "Inactive"
  | "Registered"
  | "Pending Registration"
  | "Suspended"
  | "Injured"
  | "On Trial"
  | "Graduated"
  | "Transferred"
  | "Released";

export type RegistrationStatus =
  | "Pending Registration"
  | "Registered"
  | "Rejected";

export type PlayingPosition =
  | "Goalkeeper"
  | "Centre Back"
  | "Left Back"
  | "Right Back"
  | "Defensive Midfielder"
  | "Central Midfielder"
  | "Attacking Midfielder"
  | "Left Winger"
  | "Right Winger"
  | "Striker";

export interface GuardianDetails {
  fullName: string;
  relationship: string;
  phone: string;
  alternativePhone?: string;
  email?: string;
  address: string;
}

export interface EmergencyContact {
  fullName: string;
  relationship: string;
  phone: string;
}

export interface PlayerMedicalInfo {
  medicalConditions?: string;
  allergies?: string;
  injuryHistory?: string;
  additionalNotes?: string;
  emergencyContact: EmergencyContact;
}

export interface Player {
  id: string;

  playerId: string;

  fullName: string;
  passportPhoto?: string;

  dateOfBirth: string;
  gender: Gender;
  ageCategory: string;

  phone?: string;
  address: string;

  schoolAttended: string;
  academicInformation?: string;

  playingPosition: PlayingPosition;
  preferredFoot: PreferredFoot;

  height: number;
  weight: number;

  previousClub?: string;

  academyTeam?: string;
  program: string;
  academyBranch: string;
  trainingCentre: string;

  guardian: GuardianDetails;

  medicalInfo: PlayerMedicalInfo;

  parentConsent: boolean;

  dateJoined: string;

  status: PlayerStatus;
  registrationStatus: RegistrationStatus;

  createdAt: string;
}