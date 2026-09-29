import type { Player } from "../shared/types/player";

export const demoPlayers: Player[] = [
  {
    id: "player-001",
    playerId: "PLY-26-0001",

    fullName: "John Adeyemi",

    dateOfBirth: "2011-05-14",
    gender: "Male",
    ageCategory: "U15",

    phone: "08012345678",
    address: "Lekki, Lagos",

    schoolAttended: "Greenfield College",
    academicInformation: "SS1",

    playingPosition: "Central Midfielder",
    preferredFoot: "Right",

    height: 167,
    weight: 58,

    previousClub: "Future Stars Academy",

    academyTeam: "U15 Lions",
    program: "Elite Football Development",
    academyBranch: "Lagos Branch",
    trainingCentre: "Lekki Training Centre",

    guardian: {
      fullName: "Mr. Adeyemi",
      relationship: "Father",
      phone: "08011112222",
      email: "adeyemi@example.com",
      address: "Lekki, Lagos",
    },

    medicalInfo: {
      medicalConditions: "None",
      allergies: "None",
      injuryHistory: "None",
      emergencyContact: {
        fullName: "Mr. Adeyemi",
        relationship: "Father",
        phone: "08011112222",
      },
    },

    parentConsent: true,

    dateJoined: "2026-01-15",

    status: "Active",
    registrationStatus: "Registered",

    createdAt: "2026-01-15T10:00:00.000Z",
  },

  {
    id: "player-002",
    playerId: "PLY-26-0002",

    fullName: "Daniel Okafor",

    dateOfBirth: "2012-08-21",
    gender: "Male",
    ageCategory: "U15",

    address: "Ikeja, Lagos",

    schoolAttended: "Victory Secondary School",
    academicInformation: "JSS3",

    playingPosition: "Striker",
    preferredFoot: "Right",

    height: 165,
    weight: 55,

    academyTeam: "U15 Eagles",
    program: "Elite Football Development",
    academyBranch: "Lagos Branch",
    trainingCentre: "Ikeja Training Centre",

    guardian: {
      fullName: "Mrs. Okafor",
      relationship: "Mother",
      phone: "08033334444",
      email: "okafor@example.com",
      address: "Ikeja, Lagos",
    },

    medicalInfo: {
      emergencyContact: {
        fullName: "Mrs. Okafor",
        relationship: "Mother",
        phone: "08033334444",
      },
    },

    parentConsent: true,

    dateJoined: "2026-02-10",

    status: "Active",
    registrationStatus: "Registered",

    createdAt: "2026-02-10T09:00:00.000Z",
  },

  {
    id: "player-003",
    playerId: "PLY-26-0003",

    fullName: "David Ibrahim",

    dateOfBirth: "2009-03-11",
    gender: "Male",
    ageCategory: "U17",

    address: "Surulere, Lagos",

    schoolAttended: "Kings College",
    academicInformation: "SS2",

    playingPosition: "Centre Back",
    preferredFoot: "Left",

    height: 178,
    weight: 69,

    previousClub: "City Football Academy",

    academyTeam: "U17 Elite",
    program: "Elite Football Development",
    academyBranch: "Lagos Branch",
    trainingCentre: "Main Training Centre",

    guardian: {
      fullName: "Mr. Ibrahim",
      relationship: "Father",
      phone: "08055556666",
      address: "Surulere, Lagos",
    },

    medicalInfo: {
      injuryHistory: "Minor ankle injury",
      emergencyContact: {
        fullName: "Mr. Ibrahim",
        relationship: "Father",
        phone: "08055556666",
      },
    },

    parentConsent: true,

    dateJoined: "2026-03-05",

    status: "On Trial",
    registrationStatus: "Registered",

    createdAt: "2026-03-05T12:30:00.000Z",
  },

  {
    id: "player-004",
    playerId: "PLY-26-0004",

    fullName: "Samuel Adewale",

    dateOfBirth: "2013-09-09",
    gender: "Male",
    ageCategory: "U13",

    address: "Yaba, Lagos",

    schoolAttended: "Bright Future School",

    playingPosition: "Right Winger",
    preferredFoot: "Right",

    height: 154,
    weight: 46,

    academyTeam: "U13 Academy Team",
    program: "Grassroots Development Program",
    academyBranch: "Lagos Branch",
    trainingCentre: "Main Training Centre",

    guardian: {
      fullName: "Mrs. Adewale",
      relationship: "Mother",
      phone: "08077778888",
      address: "Yaba, Lagos",
    },

    medicalInfo: {
      emergencyContact: {
        fullName: "Mrs. Adewale",
        relationship: "Mother",
        phone: "08077778888",
      },
    },

    parentConsent: true,

    dateJoined: "2026-04-18",

    status: "Injured",
    registrationStatus: "Registered",

    createdAt: "2026-04-18T08:15:00.000Z",
  },

  {
    id: "player-005",
    playerId: "PLY-26-0005",

    fullName: "Grace Williams",

    dateOfBirth: "2011-11-20",
    gender: "Female",
    ageCategory: "U15",

    address: "Victoria Island, Lagos",

    schoolAttended: "Royal Girls College",
    academicInformation: "SS1",

    playingPosition: "Attacking Midfielder",
    preferredFoot: "Both",

    height: 163,
    weight: 52,

    academyTeam: "Girls U15",
    program: "Girls Football Development",
    academyBranch: "Lagos Branch",
    trainingCentre: "Lekki Training Centre",

    guardian: {
      fullName: "Mrs. Williams",
      relationship: "Mother",
      phone: "08099990000",
      email: "williams@example.com",
      address: "Victoria Island, Lagos",
    },

    medicalInfo: {
      emergencyContact: {
        fullName: "Mrs. Williams",
        relationship: "Mother",
        phone: "08099990000",
      },
    },

    parentConsent: true,

    dateJoined: "2026-05-10",

    status: "Active",
    registrationStatus: "Registered",

    createdAt: "2026-05-10T14:00:00.000Z",
  },

  {
    id: "player-006",
    playerId: "PLY-26-0006",

    fullName: "Michael Bello",

    dateOfBirth: "2010-02-17",
    gender: "Male",
    ageCategory: "U17",

    address: "Ajah, Lagos",

    schoolAttended: "Cedar College",

    playingPosition: "Goalkeeper",
    preferredFoot: "Right",

    height: 181,
    weight: 72,

    program: "Goalkeeper Development",
    academyBranch: "Lagos Branch",
    trainingCentre: "Lekki Training Centre",

    guardian: {
      fullName: "Mr. Bello",
      relationship: "Father",
      phone: "08122223333",
      address: "Ajah, Lagos",
    },

    medicalInfo: {
      emergencyContact: {
        fullName: "Mr. Bello",
        relationship: "Father",
        phone: "08122223333",
      },
    },

    parentConsent: true,

    dateJoined: "2026-09-26",

    status: "Pending Registration",
    registrationStatus: "Pending Registration",

    createdAt: "2026-09-26T11:20:00.000Z",
  },
];