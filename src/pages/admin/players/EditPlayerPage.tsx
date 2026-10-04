import {
  ArrowLeft,
  Camera,
  Save,
  UserRound,
} from "lucide-react";

import {
  useState,
} from "react";

import type {
  ChangeEvent,
  FormEvent,
  ReactNode,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router";

import {
  getPlayerById,
  updatePlayer,
} from "../../../services/playerService";

import type {
  Player,
  PlayerStatus,
  PlayingPosition,
  PreferredFoot,
  RegistrationStatus,
} from "../../../shared/types/player";

/* =========================================================
   SHARED STYLES
========================================================= */

const inputClass = `
  w-full
  min-w-0
  rounded-lg
  border
  border-slate-200
  bg-white
  px-3
  py-2.5
  text-base
  text-slate-800
  outline-none
  transition
  placeholder:text-slate-400

  focus:border-green-500
  focus:ring-2
  focus:ring-green-100

  sm:text-sm
`;

const labelClass = `
  mb-2
  block
  text-sm
  font-medium
  text-slate-700
`;

/* =========================================================
   OPTIONS
========================================================= */

const positions: PlayingPosition[] = [
  "Goalkeeper",
  "Centre Back",
  "Left Back",
  "Right Back",
  "Defensive Midfielder",
  "Central Midfielder",
  "Attacking Midfielder",
  "Left Winger",
  "Right Winger",
  "Striker",
];

const statuses: PlayerStatus[] = [
  "Active",
  "Inactive",
  "Registered",
  "Pending Registration",
  "Suspended",
  "Injured",
  "On Trial",
  "Graduated",
  "Transferred",
  "Released",
];

const ageCategories = [
  "U7",
  "U9",
  "U11",
  "U13",
  "U15",
  "U17",
  "U19",
];

const teams = [
  "U7 Academy Team",
  "U9 Academy Team",
  "U11 Academy Team",
  "U13 Academy Team",
  "U15 Lions",
  "U15 Eagles",
  "U17 Elite",
  "U19 Development Squad",
  "Girls U15",
  "Girls U17",
];

const programs = [
  "Elite Football Development",
  "Weekend Football Program",
  "Grassroots Development Program",
  "Goalkeeper Development",
  "Girls Football Development",
  "Holiday Football Camp",
];

const branches = [
  "Lagos Branch",
  "Abuja Branch",
  "Ibadan Branch",
];

const trainingCentres = [
  "Lekki Training Centre",
  "Ikeja Training Centre",
  "Main Training Centre",
];

/* =========================================================
   PAGE
========================================================= */

function EditPlayerPage() {
  const {
    playerId,
  } = useParams();

  const navigate =
    useNavigate();

  const existingPlayer =
    playerId
      ? getPlayerById(
          playerId,
        )
      : undefined;

  const [
    player,
    setPlayer,
  ] = useState<Player | null>(
    existingPlayer ?? null,
  );

  const [
    error,
    setError,
  ] = useState("");

  /* =======================================================
     PLAYER NOT FOUND
  ======================================================= */

  if (!player) {
    return (
      <div className="w-full min-w-0">
        <Link
          to="/admin/players"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-slate-500
            transition
            hover:text-green-600
          "
        >
          <ArrowLeft
            size={17}
          />

          Back to Players
        </Link>

        <div
          className="
            mt-8
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            py-8
            text-center
            shadow-sm
            sm:p-12
          "
        >
          <UserRound
            size={40}
            className="mx-auto text-slate-300"
          />

          <h1 className="mt-4 text-xl font-bold text-slate-900">
            Player Not Found
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            The player record you are
            trying to edit does not
            exist.
          </p>
        </div>
      </div>
    );
  }

  /* =======================================================
     BASIC PLAYER CHANGE
  ======================================================= */

  const handleBasicChange = (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const {
      name,
      value,
      type,
    } = event.target;

    const checked =
      event.target instanceof
      HTMLInputElement
        ? event.target.checked
        : false;

    setPlayer(
      (current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,

          [name]:
            type === "checkbox"
              ? checked
              : value,
        };
      },
    );
  };

  /* =======================================================
     NUMBER CHANGE
  ======================================================= */

  const handleNumberChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const {
      name,
      value,
    } = event.target;

    setPlayer(
      (current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,
          [name]:
            Number(value),
        };
      },
    );
  };

  /* =======================================================
     GUARDIAN CHANGE
  ======================================================= */

  const handleGuardianChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const {
      name,
      value,
    } = event.target;

    setPlayer(
      (current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,

          guardian: {
            ...current.guardian,
            [name]: value,
          },
        };
      },
    );
  };

  /* =======================================================
     MEDICAL CHANGE
  ======================================================= */

  const handleMedicalChange = (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const {
      name,
      value,
    } = event.target;

    setPlayer(
      (current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,

          medicalInfo: {
            ...current.medicalInfo,
            [name]: value,
          },
        };
      },
    );
  };

  /* =======================================================
     EMERGENCY CONTACT CHANGE
  ======================================================= */

  const handleEmergencyChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const {
      name,
      value,
    } = event.target;

    setPlayer(
      (current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,

          medicalInfo: {
            ...current.medicalInfo,

            emergencyContact: {
              ...current
                .medicalInfo
                .emergencyContact,

              [name]: value,
            },
          },
        };
      },
    );
  };

  /* =======================================================
     PHOTO CHANGE
  ======================================================= */

  const handlePhotoChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    if (
      !file.type.startsWith(
        "image/",
      )
    ) {
      setError(
        "Please select a valid image file.",
      );

      return;
    }

    setError("");

    const reader =
      new FileReader();

    reader.onload = () => {
      if (
        typeof reader.result ===
        "string"
      ) {
        setPlayer(
          (current) => {
            if (!current) {
              return current;
            }

            return {
              ...current,

              passportPhoto:
                reader.result as string,
            };
          },
        );
      }
    };

    reader.readAsDataURL(
      file,
    );
  };

  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError("");

    if (
      !player.fullName.trim() ||
      !player.dateOfBirth ||
      !player.address.trim() ||
      !player.schoolAttended.trim()
    ) {
      setError(
        "Please complete all required player fields.",
      );

      return;
    }

    if (
      !player.guardian.fullName.trim() ||
      !player.guardian.phone.trim()
    ) {
      setError(
        "Parent or guardian name and phone number are required.",
      );

      return;
    }

    updatePlayer(
      player,
    );

    navigate(
      `/admin/players/${player.id}`,
    );
  };

  return (
    <div className="w-full min-w-0">
      {/* ===================================================
          HEADER
      ==================================================== */}

      <Link
        to={`/admin/players/${player.id}`}
        className="
          inline-flex
          items-center
          gap-2
          text-sm
          font-medium
          text-slate-500
          transition
          hover:text-green-600
        "
      >
        <ArrowLeft
          size={17}
        />

        Back to Player Profile
      </Link>

      <div className="mt-5 min-w-0">
        <p
          className="
            text-xs
            font-semibold
            uppercase
            tracking-wide
            text-green-600
            sm:text-sm
          "
        >
          Player Management
        </p>

        <h1
          className="
            mt-1
            break-words
            text-2xl
            font-bold
            leading-tight
            text-slate-900
            sm:text-3xl
          "
        >
          Edit Player
        </h1>

        <p
          className="
            mt-2
            max-w-3xl
            break-words
            text-sm
            leading-6
            text-slate-500
            sm:text-base
          "
        >
          Update the academy record
          for{" "}
          <span className="font-semibold text-slate-700">
            {player.fullName}
          </span>
          .
        </p>
      </div>

      {/* PLAYER ID */}

      <div
        className="
          mt-5
          min-w-0
          rounded-lg
          border
          border-green-200
          bg-green-50
          px-4
          py-3
        "
      >
        <p className="break-all text-sm text-green-800">
          Player ID:{" "}
          <span className="font-semibold">
            {player.playerId}
          </span>
        </p>
      </div>

      {/* ERROR */}

      {error && (
        <div
          role="alert"
          className="
            mt-5
            break-words
            rounded-lg
            border
            border-red-200
            bg-red-50
            px-4
            py-3
            text-sm
            leading-6
            text-red-700
          "
        >
          {error}
        </div>
      )}

      {/* ===================================================
          FORM
      ==================================================== */}

      <form
        onSubmit={
          handleSubmit
        }
        className="
          mt-6
          min-w-0
          space-y-6
        "
      >
        {/* =================================================
            PERSONAL
        ================================================== */}

        <FormSection
          title="Personal Information"
          description="Update the player's personal and contact information."
        >
          {/* PHOTO */}

          <div
            className="
              flex
              min-w-0
              flex-col
              items-start
              gap-5
              sm:flex-row
              sm:items-center
            "
          >
            <div
              className="
                flex
                h-24
                w-24
                shrink-0
                items-center
                justify-center
                overflow-hidden
                rounded-xl
                border
                border-slate-200
                bg-slate-100
                sm:h-28
                sm:w-28
              "
            >
              {player.passportPhoto ? (
                <img
                  src={
                    player.passportPhoto
                  }
                  alt={
                    player.fullName
                  }
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserRound
                  size={40}
                  className="text-slate-300"
                />
              )}
            </div>

            <div
              className="
                w-full
                min-w-0
                sm:w-auto
              "
            >
              <label
                htmlFor="editPhoto"
                className="
                  inline-flex
                  w-full
                  cursor-pointer
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  border
                  border-slate-300
                  bg-white
                  px-4
                  py-2.5
                  text-center
                  text-sm
                  font-semibold
                  text-slate-700
                  transition

                  hover:bg-slate-50

                  sm:w-auto
                "
              >
                <Camera
                  size={17}
                  className="shrink-0"
                />

                Change Photograph
              </label>

              <input
                id="editPhoto"
                type="file"
                accept="image/*"
                onChange={
                  handlePhotoChange
                }
                className="hidden"
              />

              <p className="mt-2 text-xs leading-5 text-slate-400">
                Upload a new photograph
                to replace the current
                image.
              </p>
            </div>
          </div>

          {/* FIELDS */}

          <div
            className="
              mt-7
              grid
              min-w-0
              grid-cols-1
              gap-5
              md:grid-cols-2
              xl:grid-cols-3
            "
          >
            <div
              className="
                min-w-0
                xl:col-span-2
              "
            >
              <label
                className={
                  labelClass
                }
              >
                Full Name *
              </label>

              <input
                name="fullName"
                value={
                  player.fullName
                }
                onChange={
                  handleBasicChange
                }
                className={
                  inputClass
                }
                required
              />
            </div>

            <div className="min-w-0">
              <label
                className={
                  labelClass
                }
              >
                Date of Birth *
              </label>

              <input
                type="date"
                name="dateOfBirth"
                value={
                  player.dateOfBirth
                }
                onChange={
                  handleBasicChange
                }
                className={
                  inputClass
                }
                required
              />
            </div>

            <div className="min-w-0">
              <label
                className={
                  labelClass
                }
              >
                Gender
              </label>

              <select
                name="gender"
                value={
                  player.gender
                }
                onChange={
                  handleBasicChange
                }
                className={
                  inputClass
                }
              >
                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>
              </select>
            </div>

            <div className="min-w-0">
              <label
                className={
                  labelClass
                }
              >
                Age Category
              </label>

              <select
                name="ageCategory"
                value={
                  player.ageCategory
                }
                onChange={
                  handleBasicChange
                }
                className={
                  inputClass
                }
              >
                {ageCategories.map(
                  (
                    category,
                  ) => (
                    <option
                      key={
                        category
                      }
                      value={
                        category
                      }
                    >
                      {
                        category
                      }
                    </option>
                  ),
                )}
              </select>
            </div>

            <div className="min-w-0">
              <label
                className={
                  labelClass
                }
              >
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                value={
                  player.phone ?? ""
                }
                onChange={
                  handleBasicChange
                }
                className={
                  inputClass
                }
              />
            </div>

            <div
              className="
                min-w-0
                md:col-span-2
                xl:col-span-3
              "
            >
              <label
                className={
                  labelClass
                }
              >
                Address *
              </label>

              <textarea
                name="address"
                value={
                  player.address
                }
                onChange={
                  handleBasicChange
                }
                rows={3}
                className={
                  inputClass
                }
                required
              />
            </div>
          </div>
        </FormSection>

        {/* =================================================
            FOOTBALL
        ================================================== */}

        <FormSection
          title="Football Information"
          description="Update the player's playing profile and academy assignment."
        >
          <div
            className="
              grid
              min-w-0
              grid-cols-1
              gap-5
              md:grid-cols-2
              xl:grid-cols-3
            "
          >
            <div className="min-w-0">
              <label
                className={
                  labelClass
                }
              >
                Playing Position
              </label>

              <select
                name="playingPosition"
                value={
                  player.playingPosition
                }
                onChange={
                  handleBasicChange
                }
                className={
                  inputClass
                }
              >
                {positions.map(
                  (
                    position,
                  ) => (
                    <option
                      key={
                        position
                      }
                      value={
                        position
                      }
                    >
                      {
                        position
                      }
                    </option>
                  ),
                )}
              </select>
            </div>

            <div className="min-w-0">
              <label
                className={
                  labelClass
                }
              >
                Preferred Foot
              </label>

              <select
                name="preferredFoot"
                value={
                  player.preferredFoot
                }
                onChange={
                  handleBasicChange
                }
                className={
                  inputClass
                }
              >
                {(
                  [
                    "Right",
                    "Left",
                    "Both",
                  ] as PreferredFoot[]
                ).map(
                  (foot) => (
                    <option
                      key={foot}
                      value={foot}
                    >
                      {foot}
                    </option>
                  ),
                )}
              </select>
            </div>

            <div className="min-w-0">
              <label
                className={
                  labelClass
                }
              >
                Academy Team
              </label>

              <select
                name="academyTeam"
                value={
                  player.academyTeam ??
                  ""
                }
                onChange={
                  handleBasicChange
                }
                className={
                  inputClass
                }
              >
                <option value="">
                  Not Assigned
                </option>

                {teams.map(
                  (team) => (
                    <option
                      key={team}
                      value={team}
                    >
                      {team}
                    </option>
                  ),
                )}
              </select>
            </div>

            <div className="min-w-0">
              <label
                className={
                  labelClass
                }
              >
                Program
              </label>

              <select
                name="program"
                value={
                  player.program
                }
                onChange={
                  handleBasicChange
                }
                className={
                  inputClass
                }
              >
                {programs.map(
                  (
                    program,
                  ) => (
                    <option
                      key={
                        program
                      }
                      value={
                        program
                      }
                    >
                      {
                        program
                      }
                    </option>
                  ),
                )}
              </select>
            </div>

            <div className="min-w-0">
              <label
                className={
                  labelClass
                }
              >
                Academy Branch
              </label>

              <select
                name="academyBranch"
                value={
                  player.academyBranch
                }
                onChange={
                  handleBasicChange
                }
                className={
                  inputClass
                }
              >
                {branches.map(
                  (
                    branch,
                  ) => (
                    <option
                      key={
                        branch
                      }
                      value={
                        branch
                      }
                    >
                      {
                        branch
                      }
                    </option>
                  ),
                )}
              </select>
            </div>

            <div className="min-w-0">
              <label
                className={
                  labelClass
                }
              >
                Training Centre
              </label>

              <select
                name="trainingCentre"
                value={
                  player.trainingCentre
                }
                onChange={
                  handleBasicChange
                }
                className={
                  inputClass
                }
              >
                {trainingCentres.map(
                  (
                    centre,
                  ) => (
                    <option
                      key={
                        centre
                      }
                      value={
                        centre
                      }
                    >
                      {
                        centre
                      }
                    </option>
                  ),
                )}
              </select>
            </div>

            <div className="min-w-0">
              <label
                className={
                  labelClass
                }
              >
                Height (cm)
              </label>

              <input
                type="number"
                min="0"
                name="height"
                value={
                  player.height
                }
                onChange={
                  handleNumberChange
                }
                className={
                  inputClass
                }
              />
            </div>

            <div className="min-w-0">
              <label
                className={
                  labelClass
                }
              >
                Weight (kg)
              </label>

              <input
                type="number"
                min="0"
                name="weight"
                value={
                  player.weight
                }
                onChange={
                  handleNumberChange
                }
                className={
                  inputClass
                }
              />
            </div>

            <div className="min-w-0">
              <label
                className={
                  labelClass
                }
              >
                Previous Club /
                Academy
              </label>

              <input
                name="previousClub"
                value={
                  player.previousClub ??
                  ""
                }
                onChange={
                  handleBasicChange
                }
                className={
                  inputClass
                }
              />
            </div>
          </div>
        </FormSection>

        {/* =================================================
            ACADEMIC
        ================================================== */}

        <FormSection
          title="Academic Information"
          description="Update the player's school and academic information."
        >
          <div
            className="
              grid
              min-w-0
              grid-cols-1
              gap-5
              md:grid-cols-2
            "
          >
            <div className="min-w-0">
              <label
                className={
                  labelClass
                }
              >
                School Attended *
              </label>

              <input
                name="schoolAttended"
                value={
                  player.schoolAttended
                }
                onChange={
                  handleBasicChange
                }
                className={
                  inputClass
                }
                required
              />
            </div>

            <div className="min-w-0">
              <label
                className={
                  labelClass
                }
              >
                Academic Information
              </label>

              <input
                name="academicInformation"
                value={
                  player.academicInformation ??
                  ""
                }
                onChange={
                  handleBasicChange
                }
                className={
                  inputClass
                }
                placeholder="Class, grade or notes"
              />
            </div>
          </div>
        </FormSection>

        {/* =================================================
            GUARDIAN
        ================================================== */}

        <FormSection
          title="Parent / Guardian"
          description="Update the player's primary parent or guardian contact."
        >
          <div
            className="
              grid
              min-w-0
              grid-cols-1
              gap-5
              md:grid-cols-2
              xl:grid-cols-3
            "
          >
            <div className="min-w-0">
              <label
                className={
                  labelClass
                }
              >
                Full Name *
              </label>

              <input
                name="fullName"
                value={
                  player.guardian
                    .fullName
                }
                onChange={
                  handleGuardianChange
                }
                className={
                  inputClass
                }
                required
              />
            </div>

            <div className="min-w-0">
              <label
                className={
                  labelClass
                }
              >
                Relationship
              </label>

              <input
                name="relationship"
                value={
                  player.guardian
                    .relationship
                }
                onChange={
                  handleGuardianChange
                }
                className={
                  inputClass
                }
              />
            </div>

            <div className="min-w-0">
              <label
                className={
                  labelClass
                }
              >
                Phone *
              </label>

              <input
                type="tel"
                name="phone"
                value={
                  player.guardian
                    .phone
                }
                onChange={
                  handleGuardianChange
                }
                className={
                  inputClass
                }
                required
              />
            </div>

            <div className="min-w-0">
              <label
                className={
                  labelClass
                }
              >
                Alternative Phone
              </label>

              <input
                type="tel"
                name="alternativePhone"
                value={
                  player.guardian
                    .alternativePhone ??
                  ""
                }
                onChange={
                  handleGuardianChange
                }
                className={
                  inputClass
                }
              />
            </div>

            <div className="min-w-0">
              <label
                className={
                  labelClass
                }
              >
                Email
              </label>

              <input
                type="email"
                name="email"
                value={
                  player.guardian
                    .email ?? ""
                }
                onChange={
                  handleGuardianChange
                }
                className={
                  inputClass
                }
              />
            </div>

            <div className="min-w-0">
              <label
                className={
                  labelClass
                }
              >
                Address
              </label>

              <input
                name="address"
                value={
                  player.guardian
                    .address ?? ""
                }
                onChange={
                  handleGuardianChange
                }
                className={
                  inputClass
                }
              />
            </div>
          </div>
        </FormSection>

        {/* =================================================
            MEDICAL
        ================================================== */}

        <FormSection
          title="Medical & Emergency Information"
          description="Update health information and the player's emergency contact."
        >
          <div
            className="
              grid
              min-w-0
              grid-cols-1
              gap-5
              md:grid-cols-2
            "
          >
            <div className="min-w-0">
              <label
                className={
                  labelClass
                }
              >
                Medical Conditions
              </label>

              <textarea
                name="medicalConditions"
                value={
                  player.medicalInfo
                    .medicalConditions ??
                  ""
                }
                onChange={
                  handleMedicalChange
                }
                rows={3}
                className={
                  inputClass
                }
              />
            </div>

            <div className="min-w-0">
              <label
                className={
                  labelClass
                }
              >
                Allergies
              </label>

              <textarea
                name="allergies"
                value={
                  player.medicalInfo
                    .allergies ?? ""
                }
                onChange={
                  handleMedicalChange
                }
                rows={3}
                className={
                  inputClass
                }
              />
            </div>

            <div className="min-w-0">
              <label
                className={
                  labelClass
                }
              >
                Injury History
              </label>

              <textarea
                name="injuryHistory"
                value={
                  player.medicalInfo
                    .injuryHistory ??
                  ""
                }
                onChange={
                  handleMedicalChange
                }
                rows={3}
                className={
                  inputClass
                }
              />
            </div>

            <div className="min-w-0">
              <label
                className={
                  labelClass
                }
              >
                Additional Notes
              </label>

              <textarea
                name="additionalNotes"
                value={
                  player.medicalInfo
                    .additionalNotes ??
                  ""
                }
                onChange={
                  handleMedicalChange
                }
                rows={3}
                className={
                  inputClass
                }
              />
            </div>
          </div>

          {/* EMERGENCY CONTACT */}

          <div
            className="
              mt-7
              border-t
              border-slate-100
              pt-6
            "
          >
            <h3 className="font-semibold text-slate-800">
              Emergency Contact
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Person to contact in the
              event of an emergency.
            </p>

            <div
              className="
                mt-4
                grid
                min-w-0
                grid-cols-1
                gap-5
                md:grid-cols-3
              "
            >
              <div className="min-w-0">
                <label
                  className={
                    labelClass
                  }
                >
                  Full Name
                </label>

                <input
                  name="fullName"
                  value={
                    player.medicalInfo
                      .emergencyContact
                      .fullName
                  }
                  onChange={
                    handleEmergencyChange
                  }
                  className={
                    inputClass
                  }
                />
              </div>

              <div className="min-w-0">
                <label
                  className={
                    labelClass
                  }
                >
                  Relationship
                </label>

                <input
                  name="relationship"
                  value={
                    player.medicalInfo
                      .emergencyContact
                      .relationship
                  }
                  onChange={
                    handleEmergencyChange
                  }
                  className={
                    inputClass
                  }
                />
              </div>

              <div className="min-w-0">
                <label
                  className={
                    labelClass
                  }
                >
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={
                    player.medicalInfo
                      .emergencyContact
                      .phone
                  }
                  onChange={
                    handleEmergencyChange
                  }
                  className={
                    inputClass
                  }
                />
              </div>
            </div>
          </div>
        </FormSection>

        {/* =================================================
            REGISTRATION
        ================================================== */}

        <FormSection
          title="Registration & Status"
          description="Manage the player's academy registration and current status."
        >
          <div
            className="
              grid
              min-w-0
              grid-cols-1
              gap-5
              md:grid-cols-3
            "
          >
            <div className="min-w-0">
              <label
                className={
                  labelClass
                }
              >
                Date Joined
              </label>

              <input
                type="date"
                name="dateJoined"
                value={
                  player.dateJoined
                }
                onChange={
                  handleBasicChange
                }
                className={
                  inputClass
                }
              />
            </div>

            <div className="min-w-0">
              <label
                className={
                  labelClass
                }
              >
                Player Status
              </label>

              <select
                name="status"
                value={
                  player.status
                }
                onChange={
                  handleBasicChange
                }
                className={
                  inputClass
                }
              >
                {statuses.map(
                  (
                    status,
                  ) => (
                    <option
                      key={
                        status
                      }
                      value={
                        status
                      }
                    >
                      {
                        status
                      }
                    </option>
                  ),
                )}
              </select>
            </div>

            <div className="min-w-0">
              <label
                className={
                  labelClass
                }
              >
                Registration Status
              </label>

              <select
                name="registrationStatus"
                value={
                  player.registrationStatus
                }
                onChange={
                  handleBasicChange
                }
                className={
                  inputClass
                }
              >
                {(
                  [
                    "Pending Registration",
                    "Registered",
                  ] as RegistrationStatus[]
                ).map(
                  (status) => (
                    <option
                      key={
                        status
                      }
                      value={
                        status
                      }
                    >
                      {
                        status
                      }
                    </option>
                  ),
                )}
              </select>
            </div>
          </div>

          {/* CONSENT */}

          <label
            className="
              mt-6
              flex
              min-w-0
              cursor-pointer
              items-start
              gap-3
              rounded-lg
              border
              border-slate-200
              bg-slate-50
              p-4
            "
          >
            <input
              type="checkbox"
              name="parentConsent"
              checked={
                player.parentConsent
              }
              onChange={
                handleBasicChange
              }
              className="
                mt-1
                h-4
                w-4
                shrink-0
                accent-green-600
              "
            />

            <div className="min-w-0">
              <p className="break-words text-sm font-semibold text-slate-800">
                Parent / Guardian
                Consent
              </p>

              <p className="mt-1 break-words text-xs leading-5 text-slate-500">
                Confirm whether the
                player's consent
                documentation has been
                received.
              </p>
            </div>
          </label>
        </FormSection>

        {/* =================================================
            ACTIONS
        ================================================== */}

        <div
          className="
            flex
            min-w-0
            flex-col-reverse
            gap-3
            pb-2
            sm:flex-row
            sm:justify-end
          "
        >
          <Link
            to={`/admin/players/${player.id}`}
            className="
              inline-flex
              w-full
              items-center
              justify-center
              rounded-lg
              border
              border-slate-300
              bg-white
              px-5
              py-3
              text-center
              text-sm
              font-semibold
              text-slate-700
              transition

              hover:bg-slate-50

              sm:w-auto
            "
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="
              inline-flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-green-600
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition

              hover:bg-green-700

              focus:outline-none
              focus:ring-2
              focus:ring-green-500
              focus:ring-offset-2

              sm:w-auto
            "
          >
            <Save
              size={18}
              className="shrink-0"
            />

            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

/* =========================================================
   FORM SECTION
========================================================= */

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section
      className="
        w-full
        min-w-0
        rounded-xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm
        sm:p-6
      "
    >
      <div className="mb-6 min-w-0">
        <h2 className="break-words text-lg font-bold text-slate-900">
          {title}
        </h2>

        {description && (
          <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
            {description}
          </p>
        )}
      </div>

      <div className="min-w-0">
        {children}
      </div>
    </section>
  );
}

export default EditPlayerPage;