import type {
  AcademyBranch,
  AcademyProfile,
  AcademyProgram,
  TrainingCentre,
} from "../shared/types/academy";

const PROFILE_KEY =
  "academy_profile";

const BRANCHES_KEY =
  "academy_branches";

const CENTRES_KEY =
  "academy_training_centres";

const PROGRAMS_KEY =
  "academy_programs";

const defaultProfile: AcademyProfile = {
  name: "Elite Academy",
  email:
    "info@eliteacademy.com",
  phone: "08012345678",
  address: "Lagos, Nigeria",
  registrationNumber:
    "FA-2026-001",
};

const defaultBranches: AcademyBranch[] = [
  {
    id: "branch-lagos",
    name: "Lagos Branch",
    address: "Lagos",
  },
  {
    id: "branch-abuja",
    name: "Abuja Branch",
    address: "Abuja",
  },
];

const defaultCentres: TrainingCentre[] = [
  {
    id: "centre-lekki",
    name: "Lekki Training Centre",
    branchId: "branch-lagos",
    address: "Lekki, Lagos",
  },
  {
    id: "centre-ikeja",
    name: "Ikeja Training Centre",
    branchId: "branch-lagos",
    address: "Ikeja, Lagos",
  },
  {
    id: "centre-main",
    name: "Main Training Centre",
    branchId: "branch-lagos",
    address: "Lagos",
  },
];

const defaultPrograms: AcademyProgram[] = [
  {
    id: "program-elite",
    name: "Elite Football Development",
    description:
      "Advanced football development programme.",
    active: true,
  },
  {
    id: "program-grassroots",
    name: "Grassroots Development Program",
    description:
      "Foundation football programme.",
    active: true,
  },
  {
    id: "program-girls",
    name: "Girls Football Development",
    description:
      "Girls football development programme.",
    active: true,
  },
];

function initialize() {
  if (
    !localStorage.getItem(
      PROFILE_KEY,
    )
  ) {
    localStorage.setItem(
      PROFILE_KEY,
      JSON.stringify(
        defaultProfile,
      ),
    );
  }

  if (
    !localStorage.getItem(
      BRANCHES_KEY,
    )
  ) {
    localStorage.setItem(
      BRANCHES_KEY,
      JSON.stringify(
        defaultBranches,
      ),
    );
  }

  if (
    !localStorage.getItem(
      CENTRES_KEY,
    )
  ) {
    localStorage.setItem(
      CENTRES_KEY,
      JSON.stringify(
        defaultCentres,
      ),
    );
  }

  if (
    !localStorage.getItem(
      PROGRAMS_KEY,
    )
  ) {
    localStorage.setItem(
      PROGRAMS_KEY,
      JSON.stringify(
        defaultPrograms,
      ),
    );
  }
}

export function getAcademyProfile() {
  initialize();

  return JSON.parse(
    localStorage.getItem(
      PROFILE_KEY,
    )!,
  ) as AcademyProfile;
}

export function saveAcademyProfile(
  profile: AcademyProfile,
) {
  localStorage.setItem(
    PROFILE_KEY,
    JSON.stringify(profile),
  );
}

export function getBranches(): AcademyBranch[] {
  initialize();

  return JSON.parse(
    localStorage.getItem(
      BRANCHES_KEY,
    )!,
  );
}

export function getTrainingCentres(): TrainingCentre[] {
  initialize();

  return JSON.parse(
    localStorage.getItem(
      CENTRES_KEY,
    )!,
  );
}

export function getPrograms(): AcademyProgram[] {
  initialize();

  return JSON.parse(
    localStorage.getItem(
      PROGRAMS_KEY,
    )!,
  );
}