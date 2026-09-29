export type AssessmentCategory =
  | "Technical Assessment"
  | "Tactical Assessment"
  | "Physical Assessment"
  | "Performance Assessment";

export interface AssessmentMetric {
  name: string;
  score: number;
}

export interface PlayerAssessment {
  id: string;

  playerId: string;

  category: AssessmentCategory;

  coachId: string;

  date: string;

  metrics: AssessmentMetric[];

  overallScore: number;

  strengths: string;
  areasForImprovement: string;
  comments: string;

  createdAt: string;
}

export type DevelopmentPlanStatus =
  | "Not Started"
  | "In Progress"
  | "Completed"
  | "Paused";

export interface DevelopmentPlan {
  id: string;

  playerId: string;

  coachId: string;

  title: string;

  primaryGoal: string;
  secondaryGoal?: string;

  actions: string[];

  startDate: string;
  reviewDate: string;

  status: DevelopmentPlanStatus;

  createdAt: string;
}

export interface ProgressReport {
  id: string;

  playerId: string;
  coachId: string;

  reportingPeriod: string;

  technicalProgress: string;
  tacticalProgress: string;
  physicalProgress: string;
  performanceProgress: string;

  attendancePercentage: number;

  comments: string;
  recommendations: string;

  date: string;

  createdAt: string;
}

export interface ScoutingReport {
  id: string;

  playerId: string;
  coachId: string;

  matchObserved: string;

  position: string;

  technicalRating: number;
  tacticalRating: number;
  physicalRating: number;
  performanceRating: number;

  strengths: string;
  weaknesses: string;
  potential: string;
  recommendation: string;

  date: string;

  createdAt: string;
}