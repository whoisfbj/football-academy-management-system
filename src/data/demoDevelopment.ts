import type {
  DevelopmentPlan,
  PlayerAssessment,
  ProgressReport,
  ScoutingReport,
} from "../shared/types/development";

export const demoAssessments: PlayerAssessment[] = [
  {
    id: "assessment-001",
    playerId: "player-001",
    category: "Technical Assessment",
    coachId: "coach-001",
    date: "2026-09-20",

    metrics: [
      {
        name: "Ball Control",
        score: 84,
      },
      {
        name: "Passing",
        score: 86,
      },
      {
        name: "Dribbling",
        score: 78,
      },
      {
        name: "First Touch",
        score: 82,
      },
      {
        name: "Shooting",
        score: 80,
      },
    ],

    overallScore: 82,

    strengths:
      "Passing accuracy and first touch.",

    areasForImprovement:
      "Weak-foot control and shooting.",

    comments:
      "Good technical foundation with consistent improvement.",

    createdAt:
      "2026-09-20T12:00:00.000Z",
  },

  {
    id: "assessment-002",
    playerId: "player-001",
    category: "Tactical Assessment",
    coachId: "coach-001",
    date: "2026-09-21",

    metrics: [
      {
        name: "Positioning",
        score: 78,
      },
      {
        name: "Decision Making",
        score: 75,
      },
      {
        name: "Movement Off The Ball",
        score: 77,
      },
      {
        name: "Team Play",
        score: 79,
      },
      {
        name: "Game Understanding",
        score: 71,
      },
    ],

    overallScore: 76,

    strengths:
      "Good positional discipline.",

    areasForImprovement:
      "Faster decision making under pressure.",

    comments:
      "Tactical awareness is improving steadily.",

    createdAt:
      "2026-09-21T12:00:00.000Z",
  },

  {
    id: "assessment-003",
    playerId: "player-001",
    category: "Physical Assessment",
    coachId: "coach-001",
    date: "2026-09-22",

    metrics: [
      {
        name: "Speed",
        score: 80,
      },
      {
        name: "Acceleration",
        score: 81,
      },
      {
        name: "Agility",
        score: 78,
      },
      {
        name: "Strength",
        score: 74,
      },
      {
        name: "Endurance",
        score: 82,
      },
    ],

    overallScore: 79,

    strengths:
      "Acceleration and endurance.",

    areasForImprovement:
      "Core strength and balance.",

    comments:
      "Strong physical development for age category.",

    createdAt:
      "2026-09-22T12:00:00.000Z",
  },

  {
    id: "assessment-004",
    playerId: "player-001",
    category: "Performance Assessment",
    coachId: "coach-001",
    date: "2026-09-23",

    metrics: [
      {
        name: "Training Performance",
        score: 87,
      },
      {
        name: "Match Performance",
        score: 84,
      },
      {
        name: "Work Rate",
        score: 88,
      },
      {
        name: "Teamwork",
        score: 86,
      },
      {
        name: "Coachability",
        score: 80,
      },
    ],

    overallScore: 85,

    strengths:
      "Work rate and consistent training performance.",

    areasForImprovement:
      "Maintain composure in competitive matches.",

    comments:
      "One of the more consistent performers in the team.",

    createdAt:
      "2026-09-23T12:00:00.000Z",
  },
];

export const demoDevelopmentPlans: DevelopmentPlan[] = [
  {
    id: "idp-001",

    playerId: "player-001",

    coachId: "coach-001",

    title:
      "John Adeyemi Individual Development Plan",

    primaryGoal:
      "Improve weak-foot passing and receiving.",

    secondaryGoal:
      "Improve tactical positioning.",

    actions: [
      "Weak-foot passing drills",
      "First-touch exercises",
      "Positional awareness sessions",
      "Match analysis",
    ],

    startDate: "2026-09-01",

    reviewDate: "2026-12-15",

    status: "In Progress",

    createdAt:
      "2026-09-01T09:00:00.000Z",
  },
];

export const demoProgressReports: ProgressReport[] = [
  {
    id: "progress-001",

    playerId: "player-001",

    coachId: "coach-001",

    reportingPeriod:
      "September 2026",

    technicalProgress:
      "Very Good",

    tacticalProgress:
      "Good",

    physicalProgress:
      "Very Good",

    performanceProgress:
      "Very Good",

    attendancePercentage: 92,

    comments:
      "John continues to improve his technical consistency.",

    recommendations:
      "Continue weak-foot work and increase tactical analysis sessions.",

    date: "2026-09-25",

    createdAt:
      "2026-09-25T10:00:00.000Z",
  },
];

export const demoScoutingReports: ScoutingReport[] = [
  {
    id: "scouting-001",

    playerId: "player-003",

    coachId: "coach-003",

    matchObserved:
      "Academy Trial Match",

    position:
      "Centre Back",

    technicalRating: 76,
    tacticalRating: 81,
    physicalRating: 84,
    performanceRating: 79,

    strengths:
      "Aerial ability, strength and defensive positioning.",

    weaknesses:
      "Distribution under pressure.",

    potential:
      "Strong potential for academy development.",

    recommendation:
      "Continue trial period and evaluate in another competitive match.",

    date: "2026-09-18",

    createdAt:
      "2026-09-18T15:00:00.000Z",
  },
];