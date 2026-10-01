import type {
  TrainingSession,
} from "../shared/types/sessions";

export const demoSessions: TrainingSession[] = [
  /* =====================================================
     U15 LIONS
  ===================================================== */

  {
    id: "session-001",

    title:
      "U15 Technical Training",

    sessionType:
      "Technical Training",

    teamId:
      "team-005",

    coachId:
      "coach-001",

    date:
      "2026-10-02",

    startTime:
      "16:00",

    endTime:
      "18:00",

    trainingCentre:
      "Main Training Centre",

    program:
      "Elite Development",

    status:
      "Scheduled",

    description:
      "Technical development session focusing on first touch, passing, ball control and positional play.",

    createdAt:
      "2026-09-25T08:00:00.000Z",
  },

  /* =====================================================
     U17 ELITE
  ===================================================== */

  {
    id: "session-002",

    title:
      "U17 Tactical Session",

    sessionType:
      "Tactical Training",

    teamId:
      "team-008",

    coachId:
      "coach-003",

    date:
      "2026-10-03",

    startTime:
      "17:00",

    endTime:
      "19:00",

    trainingCentre:
      "Main Training Centre",

    program:
      "Elite Development",

    status:
      "Scheduled",

    description:
      "Tactical training covering team shape, transitions, pressing and defensive organisation.",

    createdAt:
      "2026-09-25T08:10:00.000Z",
  },

  /* =====================================================
     GIRLS U15
  ===================================================== */

  {
    id: "session-003",

    title:
      "Girls U15 Physical Development",

    sessionType:
      "Physical Training",

    teamId:
      "team-007",

    coachId:
      "coach-004",

    date:
      "2026-10-04",

    startTime:
      "16:30",

    endTime:
      "18:00",

    trainingCentre:
      "Main Training Centre",

    program:
      "Girls Development",

    status:
      "Scheduled",

    description:
      "Physical development session focusing on speed, agility, coordination and conditioning.",

    createdAt:
      "2026-09-25T08:20:00.000Z",
  },

  /* =====================================================
     EXISTING COMPLETED U15 SESSION

     Keep session-004 because the existing demo
     attendance record already references it.
  ===================================================== */

  {
    id: "session-004",

    title:
      "U15 Technical Training",

    sessionType:
      "Technical Training",

    teamId:
      "team-005",

    coachId:
      "coach-001",

    date:
      "2026-09-26",

    startTime:
      "16:00",

    endTime:
      "18:00",

    trainingCentre:
      "Main Training Centre",

    program:
      "Elite Development",

    status:
      "Completed",

    description:
      "Completed technical training session for the U15 Lions.",

    createdAt:
      "2026-09-20T08:00:00.000Z",
  },

  /* =====================================================
     U7
  ===================================================== */

  {
    id: "session-005",

    title:
      "U7 Foundation Skills",

    sessionType:
      "Technical Training",

    teamId:
      "team-001",

    coachId:
      "coach-001",

    date:
      "2026-10-02",

    startTime:
      "14:00",

    endTime:
      "15:15",

    trainingCentre:
      "Main Training Centre",

    program:
      "Foundation Development",

    status:
      "Scheduled",

    description:
      "Foundation football session introducing ball familiarity, dribbling, passing and movement through age-appropriate activities.",

    createdAt:
      "2026-09-30T09:00:00.000Z",
  },

  /* =====================================================
     U9
  ===================================================== */

  {
    id: "session-006",

    title:
      "U9 Ball Mastery Training",

    sessionType:
      "Technical Training",

    teamId:
      "team-002",

    coachId:
      "coach-002",

    date:
      "2026-10-03",

    startTime:
      "14:00",

    endTime:
      "15:30",

    trainingCentre:
      "Main Training Centre",

    program:
      "Foundation Development",

    status:
      "Scheduled",

    description:
      "Technical foundation session covering close control, passing, receiving, dribbling and small-sided football.",

    createdAt:
      "2026-09-30T09:10:00.000Z",
  },

  /* =====================================================
     U11
  ===================================================== */

  {
    id: "session-007",

    title:
      "U11 Technical Development",

    sessionType:
      "Technical Training",

    teamId:
      "team-003",

    coachId:
      "coach-003",

    date:
      "2026-10-04",

    startTime:
      "14:30",

    endTime:
      "16:00",

    trainingCentre:
      "Main Training Centre",

    program:
      "Youth Development",

    status:
      "Scheduled",

    description:
      "Youth development session focused on passing combinations, receiving under pressure and individual technique.",

    createdAt:
      "2026-09-30T09:20:00.000Z",
  },

  /* =====================================================
     U13
  ===================================================== */

  {
    id: "session-008",

    title:
      "U13 Tactical Development",

    sessionType:
      "Tactical Training",

    teamId:
      "team-004",

    coachId:
      "coach-004",

    date:
      "2026-10-05",

    startTime:
      "15:00",

    endTime:
      "16:45",

    trainingCentre:
      "Main Training Centre",

    program:
      "Youth Development",

    status:
      "Scheduled",

    description:
      "Introduction to tactical principles including team shape, support play, movement and transition.",

    createdAt:
      "2026-09-30T09:30:00.000Z",
  },

  /* =====================================================
     U15 EAGLES
  ===================================================== */

  {
    id: "session-009",

    title:
      "U15 Eagles Match Preparation",

    sessionType:
      "Match Preparation",

    teamId:
      "team-006",

    coachId:
      "coach-002",

    date:
      "2026-10-05",

    startTime:
      "17:00",

    endTime:
      "18:30",

    trainingCentre:
      "Main Training Centre",

    program:
      "Elite Development",

    status:
      "Scheduled",

    description:
      "Match preparation session covering tactical organisation, set pieces and game scenarios.",

    createdAt:
      "2026-09-30T09:40:00.000Z",
  },

  /* =====================================================
     U19 DEVELOPMENT SQUAD
  ===================================================== */

  {
    id: "session-010",

    title:
      "U19 Performance Training",

    sessionType:
      "Performance Training",

    teamId:
      "team-009",

    coachId:
      "coach-003",

    date:
      "2026-10-06",

    startTime:
      "17:00",

    endTime:
      "19:00",

    trainingCentre:
      "Main Training Centre",

    program:
      "Performance Development",

    status:
      "Scheduled",

    description:
      "High-performance session combining technical execution, tactical decision-making and physical intensity.",

    createdAt:
      "2026-09-30T09:50:00.000Z",
  },
];