import type { Tournament } from "../shared/types/tournament";

export const demoTournaments: Tournament[] = [
  {
    id: "tournament-001",
    name: "Lagos Youth Football Championship",
    teamName: "U15 Lions",
    ageCategory: "U15",

    startDate: "2026-10-17",
    endDate: "2026-10-19",

    venue: "National Stadium Training Pitch",
    city: "Lagos",

    organizer: "Lagos Youth Football Association",

    reportingTime: "08:00",

    opponents: [
      "Future Stars Academy",
      "City Football Academy",
      "Young Champions FC",
    ],

    notes:
      "Players should arrive in full academy tracksuit with boots, shin guards and water bottles.",

    status: "Upcoming",

    createdAt: "2026-09-25T09:00:00.000Z",
  },

  {
    id: "tournament-002",
    name: "Elite Youth Development Cup",
    teamName: "U17 Elite",
    ageCategory: "U17",

    startDate: "2026-11-06",
    endDate: "2026-11-09",

    venue: "Legacy Sports Complex",
    city: "Lagos",

    organizer: "Elite Youth Sports",

    reportingTime: "07:30",

    opponents: [
      "Victory Academy",
      "Pro Talent FC",
      "Golden Boot Academy",
    ],

    notes:
      "Tournament schedule and travel details will be communicated before departure.",

    status: "Upcoming",

    createdAt: "2026-09-27T10:00:00.000Z",
  },

  {
    id: "tournament-003",
    name: "Junior Academy Festival",
    teamName: "U13 Academy Team",
    ageCategory: "U13",

    startDate: "2026-10-24",
    endDate: "2026-10-24",

    venue: "Main Academy Training Centre",
    city: "Lagos",

    organizer: "Elite Academy",

    reportingTime: "09:00",

    opponents: [
      "Junior Stars FC",
      "Future Talent Academy",
    ],

    notes:
      "Parents and guardians are welcome to attend.",

    status: "Upcoming",

    createdAt: "2026-09-28T10:00:00.000Z",
  },
];