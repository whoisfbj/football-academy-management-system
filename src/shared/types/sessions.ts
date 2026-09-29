export type SessionType =
  | "Technical Training"
  | "Tactical Training"
  | "Physical Training"
  | "Performance Training"
  | "Match Preparation"
  | "Recovery Session";

export type SessionStatus =
  | "Scheduled"
  | "Completed"
  | "Cancelled";

export interface TrainingSession {
  id: string;

  title: string;

  sessionType: SessionType;

  teamId: string;

  coachId: string;

  date: string;

  startTime: string;

  endTime: string;

  trainingCentre: string;

  program: string;

  description?: string;

  status: SessionStatus;

  createdAt: string;
}