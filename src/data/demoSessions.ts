import type { TrainingSession } from "../shared/types/sessions";

export const demoSessions: TrainingSession[] = [
  {
    id: "session-001",

    title: "U15 Technical Training",

    sessionType: "Technical Training",

    teamId: "team-u15-lions",

    coachId: "coach-001",

    date: "2026-09-29",

    startTime: "16:00",

    endTime: "18:00",

    trainingCentre: "Lekki Training Centre",

    program: "Elite Football Development",

    description:
      "Passing, first touch and possession drills.",

    status: "Scheduled",

    createdAt:
      "2026-09-20T10:00:00.000Z",
  },

  {
    id: "session-002",

    title: "U17 Tactical Session",

    sessionType: "Tactical Training",

    teamId: "team-u17-elite",

    coachId: "coach-003",

    date: "2026-09-30",

    startTime: "17:00",

    endTime: "19:00",

    trainingCentre: "Main Training Centre",

    program: "Elite Football Development",

    description:
      "Defensive shape, transitions and pressing.",

    status: "Scheduled",

    createdAt:
      "2026-09-20T10:30:00.000Z",
  },

  {
    id: "session-003",

    title: "Girls U15 Physical Development",

    sessionType: "Physical Training",

    teamId: "team-girls-u15",

    coachId: "coach-004",

    date: "2026-10-01",

    startTime: "16:30",

    endTime: "18:00",

    trainingCentre: "Lekki Training Centre",

    program: "Girls Football Development",

    status: "Scheduled",

    createdAt:
      "2026-09-21T08:00:00.000Z",
  },

  {
    id: "session-004",

    title: "U15 Technical Training",

    sessionType: "Technical Training",

    teamId: "team-u15-lions",

    coachId: "coach-001",

    date: "2026-09-26",

    startTime: "16:00",

    endTime: "18:00",

    trainingCentre: "Lekki Training Centre",

    program: "Elite Football Development",

    status: "Completed",

    createdAt:
      "2026-09-18T09:00:00.000Z",
  },
];