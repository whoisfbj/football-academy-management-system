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
  | "Right Back"
  | "Left Back"
  | "Centre Back"
  | "Defensive Midfielder"
  | "Central Midfielder"
  | "Attacking Midfielder"
  | "Right Winger"
  | "Left Winger"
  | "Striker";

/* =====================================================
   GUARDIAN
===================================================== */

export interface Guardian {
  fullName: string;

  relationship: string;

  phone: string;

  alternativePhone?: string;

  email?: string;

  address?: string;
}

/* =====================================================
   MEDICAL INFORMATION
===================================================== */

/*
 * This is deliberately flexible for now
 * because your existing registration/edit
 * pages already contain the medical fields.
 *
 * Once everything builds again, we can
 * replace this with stricter field-by-field
 * typing.
 */
export type MedicalInfo =
  Record<string, any>;

/* =====================================================
   PLAYER
===================================================== */

export interface Player {
  /*
   * Internal ID
   * Example: player-001
   */
  id: string;

  /*
   * Academy Player ID
   * Example: PLY-26-0001
   */
  playerId: string;

  /* PERSONAL INFORMATION */

  fullName: string;

  passportPhoto?: string;

  dateOfBirth: string;

  gender: Gender;

  /*
   * Keep this as string because your
   * registration form currently produces
   * a string value.
   */
  ageCategory: string;

  phone?: string;

  address: string;

  /* SCHOOL / EDUCATION */

  schoolAttended: string;

  academicInformation?: string;

  /* FOOTBALL INFORMATION */

  playingPosition: PlayingPosition;

  preferredFoot: PreferredFoot;

  height?: number;

  weight?: number;

  previousClub?: string;

  /* ACADEMY INFORMATION */

  academyTeam?: string;

  program: string;

  academyBranch: string;

  trainingCentre: string;

  /* GUARDIAN */

  guardian: Guardian;

  /* MEDICAL */

  medicalInfo: MedicalInfo;

  /* CONSENT */

  parentConsent: boolean;

  /* REGISTRATION */

  dateJoined: string;

  status: PlayerStatus;

  registrationStatus: RegistrationStatus;

  createdAt: string;
}