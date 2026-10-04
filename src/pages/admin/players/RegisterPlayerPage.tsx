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
} from "react-router";

import {
  addPlayer,
  generatePlayerId,
} from "../../../services/playerService";

import type {
  Gender,
  PlayingPosition,
  PlayerStatus,
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

const playerStatuses: PlayerStatus[] = [
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

function RegisterPlayerPage() {
  const navigate =
    useNavigate();

  const [
    passportPhoto,
    setPassportPhoto,
  ] = useState<string>("");

  const [
    formData,
    setFormData,
  ] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "Male" as Gender,
    ageCategory: "U15",

    phone: "",
    address: "",

    schoolAttended: "",
    academicInformation: "",

    playingPosition:
      "Central Midfielder" as PlayingPosition,

    preferredFoot:
      "Right" as PreferredFoot,

    height: "",
    weight: "",

    previousClub: "",
    academyTeam: "",

    program:
      "Elite Football Development",

    academyBranch:
      "Lagos Branch",

    trainingCentre:
      "Lekki Training Centre",

    guardianName: "",
    guardianRelationship: "",
    guardianPhone: "",
    guardianAlternativePhone: "",
    guardianEmail: "",
    guardianAddress: "",

    medicalConditions: "",
    allergies: "",
    injuryHistory: "",
    medicalNotes: "",

    emergencyName: "",
    emergencyRelationship: "",
    emergencyPhone: "",

    dateJoined: new Date()
      .toISOString()
      .split("T")[0],

    status:
      "Pending Registration" as PlayerStatus,

    registrationStatus:
      "Pending Registration" as RegistrationStatus,

    parentConsent: false,
  });

  const [
    error,
    setError,
  ] = useState("");

  /* =======================================================
     INPUT CHANGE
  ======================================================= */

  const handleChange = (
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

    setFormData(
      (current) => ({
        ...current,

        [name]:
          type === "checkbox"
            ? checked
            : value,
      }),
    );
  };

  /* =======================================================
     PHOTO
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
        setPassportPhoto(
          reader.result,
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
      !formData.parentConsent
    ) {
      setError(
        "Parent or guardian consent is required.",
      );

      return;
    }

    if (
      !formData.fullName ||
      !formData.dateOfBirth ||
      !formData.address ||
      !formData.schoolAttended ||
      !formData.guardianName ||
      !formData.guardianPhone ||
      !formData.emergencyName ||
      !formData.emergencyPhone
    ) {
      setError(
        "Please complete all required fields.",
      );

      return;
    }

    const newPlayer = {
      id: `player-${Date.now()}`,

      playerId:
        generatePlayerId(),

      fullName:
        formData.fullName.trim(),

      passportPhoto:
        passportPhoto ||
        undefined,

      dateOfBirth:
        formData.dateOfBirth,

      gender:
        formData.gender,

      ageCategory:
        formData.ageCategory,

      phone:
        formData.phone ||
        undefined,

      address:
        formData.address.trim(),

      schoolAttended:
        formData.schoolAttended.trim(),

      academicInformation:
        formData.academicInformation ||
        undefined,

      playingPosition:
        formData.playingPosition,

      preferredFoot:
        formData.preferredFoot,

      height:
        Number(
          formData.height,
        ),

      weight:
        Number(
          formData.weight,
        ),

      previousClub:
        formData.previousClub ||
        undefined,

      academyTeam:
        formData.academyTeam ||
        undefined,

      program:
        formData.program,

      academyBranch:
        formData.academyBranch,

      trainingCentre:
        formData.trainingCentre,

      guardian: {
        fullName:
          formData.guardianName.trim(),

        relationship:
          formData.guardianRelationship,

        phone:
          formData.guardianPhone,

        alternativePhone:
          formData.guardianAlternativePhone ||
          undefined,

        email:
          formData.guardianEmail ||
          undefined,

        address:
          formData.guardianAddress,
      },

      medicalInfo: {
        medicalConditions:
          formData.medicalConditions ||
          undefined,

        allergies:
          formData.allergies ||
          undefined,

        injuryHistory:
          formData.injuryHistory ||
          undefined,

        additionalNotes:
          formData.medicalNotes ||
          undefined,

        emergencyContact: {
          fullName:
            formData.emergencyName,

          relationship:
            formData.emergencyRelationship,

          phone:
            formData.emergencyPhone,
        },
      },

      parentConsent:
        formData.parentConsent,

      dateJoined:
        formData.dateJoined,

      status:
        formData.status,

      registrationStatus:
        formData.registrationStatus,

      createdAt:
        new Date().toISOString(),
    };

    addPlayer(
      newPlayer,
    );

    navigate(
      "/admin/players",
    );
  };

  return (
    <div className="w-full min-w-0">
      {/* ===================================================
          PAGE HEADER
      ==================================================== */}

      <div className="mb-6 min-w-0 sm:mb-7">
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
            Register Player
          </h1>

          <p
            className="
              mt-2
              max-w-2xl
              text-sm
              leading-6
              text-slate-500
              sm:text-base
            "
          >
            Create a complete academy
            player profile.
          </p>
        </div>
      </div>

      {/* ===================================================
          ERROR
      ==================================================== */}

      {error && (
        <div
          role="alert"
          className="
            mb-6
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
        className="min-w-0 space-y-6"
      >
        {/* =================================================
            PERSONAL INFORMATION
        ================================================== */}

        <FormSection
          title="Personal Information"
          description="Basic information about the player."
        >
          {/* PHOTO */}

          <div
            className="
              mb-7
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
                border-dashed
                border-slate-300
                bg-slate-50
                sm:h-28
                sm:w-28
              "
            >
              {passportPhoto ? (
                <img
                  src={
                    passportPhoto
                  }
                  alt="Player"
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserRound
                  size={40}
                  className="text-slate-300"
                />
              )}
            </div>

            <div className="w-full min-w-0 sm:w-auto">
              <label
                htmlFor="passportPhoto"
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

                <span className="break-words">
                  Upload Passport
                  Photograph
                </span>
              </label>

              <input
                id="passportPhoto"
                type="file"
                accept="image/*"
                onChange={
                  handlePhotoChange
                }
                className="hidden"
              />

              <p className="mt-2 text-xs leading-5 text-slate-400">
                JPG, PNG or similar
                image format.
              </p>
            </div>
          </div>

          {/* PERSONAL FIELDS */}

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
            <div className="min-w-0 xl:col-span-2">
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
                  formData.fullName
                }
                onChange={
                  handleChange
                }
                className={
                  inputClass
                }
                placeholder="Player full name"
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
                  formData.dateOfBirth
                }
                onChange={
                  handleChange
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
                Gender *
              </label>

              <select
                name="gender"
                value={
                  formData.gender
                }
                onChange={
                  handleChange
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
                Age Category *
              </label>

              <select
                name="ageCategory"
                value={
                  formData.ageCategory
                }
                onChange={
                  handleChange
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
                  formData.phone
                }
                onChange={
                  handleChange
                }
                className={
                  inputClass
                }
                placeholder="Player phone number"
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
                  formData.address
                }
                onChange={
                  handleChange
                }
                rows={3}
                className={
                  inputClass
                }
                placeholder="Residential address"
                required
              />
            </div>
          </div>
        </FormSection>

        {/* =================================================
            FOOTBALL INFORMATION
        ================================================== */}

        <FormSection
          title="Football Information"
          description="Playing profile and academy assignment."
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
                Playing Position *
              </label>

              <select
                name="playingPosition"
                value={
                  formData.playingPosition
                }
                onChange={
                  handleChange
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
                Preferred Foot *
              </label>

              <select
                name="preferredFoot"
                value={
                  formData.preferredFoot
                }
                onChange={
                  handleChange
                }
                className={
                  inputClass
                }
              >
                <option value="Right">
                  Right
                </option>

                <option value="Left">
                  Left
                </option>

                <option value="Both">
                  Both
                </option>
              </select>
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
                  formData.previousClub
                }
                onChange={
                  handleChange
                }
                className={
                  inputClass
                }
                placeholder="Previous club"
              />
            </div>

            <div className="min-w-0">
              <label
                className={
                  labelClass
                }
              >
                Height (cm) *
              </label>

              <input
                type="number"
                min="1"
                name="height"
                value={
                  formData.height
                }
                onChange={
                  handleChange
                }
                className={
                  inputClass
                }
                placeholder="e.g. 168"
                required
              />
            </div>

            <div className="min-w-0">
              <label
                className={
                  labelClass
                }
              >
                Weight (kg) *
              </label>

              <input
                type="number"
                min="1"
                name="weight"
                value={
                  formData.weight
                }
                onChange={
                  handleChange
                }
                className={
                  inputClass
                }
                placeholder="e.g. 60"
                required
              />
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
                  formData.academyTeam
                }
                onChange={
                  handleChange
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
                Program *
              </label>

              <select
                name="program"
                value={
                  formData.program
                }
                onChange={
                  handleChange
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
                Academy Branch *
              </label>

              <select
                name="academyBranch"
                value={
                  formData.academyBranch
                }
                onChange={
                  handleChange
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
                Training Centre *
              </label>

              <select
                name="trainingCentre"
                value={
                  formData.trainingCentre
                }
                onChange={
                  handleChange
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
          </div>
        </FormSection>

        {/* =================================================
            ACADEMIC INFORMATION
        ================================================== */}

        <FormSection
          title="Academic Information"
          description="School and academic information for the player."
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
                  formData.schoolAttended
                }
                onChange={
                  handleChange
                }
                className={
                  inputClass
                }
                placeholder="School name"
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
                  formData.academicInformation
                }
                onChange={
                  handleChange
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
          title="Parent / Guardian Details"
          description="Primary contact responsible for the player."
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
                name="guardianName"
                value={
                  formData.guardianName
                }
                onChange={
                  handleChange
                }
                className={
                  inputClass
                }
                placeholder="Parent or guardian name"
                required
              />
            </div>

            <div className="min-w-0">
              <label
                className={
                  labelClass
                }
              >
                Relationship *
              </label>

              <input
                name="guardianRelationship"
                value={
                  formData.guardianRelationship
                }
                onChange={
                  handleChange
                }
                className={
                  inputClass
                }
                placeholder="Father, Mother, Guardian..."
                required
              />
            </div>

            <div className="min-w-0">
              <label
                className={
                  labelClass
                }
              >
                Phone Number *
              </label>

              <input
                type="tel"
                name="guardianPhone"
                value={
                  formData.guardianPhone
                }
                onChange={
                  handleChange
                }
                className={
                  inputClass
                }
                placeholder="Primary phone number"
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
                name="guardianAlternativePhone"
                value={
                  formData.guardianAlternativePhone
                }
                onChange={
                  handleChange
                }
                className={
                  inputClass
                }
                placeholder="Alternative number"
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
                name="guardianEmail"
                value={
                  formData.guardianEmail
                }
                onChange={
                  handleChange
                }
                className={
                  inputClass
                }
                placeholder="guardian@example.com"
              />
            </div>

            <div className="min-w-0">
              <label
                className={
                  labelClass
                }
              >
                Address *
              </label>

              <input
                name="guardianAddress"
                value={
                  formData.guardianAddress
                }
                onChange={
                  handleChange
                }
                className={
                  inputClass
                }
                placeholder="Parent / guardian address"
                required
              />
            </div>
          </div>
        </FormSection>

        {/* =================================================
            MEDICAL
        ================================================== */}

        <FormSection
          title="Medical & Emergency Information"
          description="Health notes and emergency contact details."
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
                  formData.medicalConditions
                }
                onChange={
                  handleChange
                }
                rows={3}
                className={
                  inputClass
                }
                placeholder="Known medical conditions"
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
                  formData.allergies
                }
                onChange={
                  handleChange
                }
                rows={3}
                className={
                  inputClass
                }
                placeholder="Known allergies"
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
                  formData.injuryHistory
                }
                onChange={
                  handleChange
                }
                rows={3}
                className={
                  inputClass
                }
                placeholder="Previous injuries"
              />
            </div>

            <div className="min-w-0">
              <label
                className={
                  labelClass
                }
              >
                Additional Medical
                Notes
              </label>

              <textarea
                name="medicalNotes"
                value={
                  formData.medicalNotes
                }
                onChange={
                  handleChange
                }
                rows={3}
                className={
                  inputClass
                }
                placeholder="Additional notes"
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
              Person to contact in an
              emergency.
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
                  Full Name *
                </label>

                <input
                  name="emergencyName"
                  value={
                    formData.emergencyName
                  }
                  onChange={
                    handleChange
                  }
                  className={
                    inputClass
                  }
                  placeholder="Emergency contact"
                  required
                />
              </div>

              <div className="min-w-0">
                <label
                  className={
                    labelClass
                  }
                >
                  Relationship *
                </label>

                <input
                  name="emergencyRelationship"
                  value={
                    formData.emergencyRelationship
                  }
                  onChange={
                    handleChange
                  }
                  className={
                    inputClass
                  }
                  placeholder="Relationship"
                  required
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
                  name="emergencyPhone"
                  value={
                    formData.emergencyPhone
                  }
                  onChange={
                    handleChange
                  }
                  className={
                    inputClass
                  }
                  placeholder="Emergency phone"
                  required
                />
              </div>
            </div>
          </div>
        </FormSection>

        {/* =================================================
            REGISTRATION
        ================================================== */}

        <FormSection
          title="Registration Information"
          description="Academy registration and player status."
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
                Date Joined *
              </label>

              <input
                type="date"
                name="dateJoined"
                value={
                  formData.dateJoined
                }
                onChange={
                  handleChange
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
                Player Status *
              </label>

              <select
                name="status"
                value={
                  formData.status
                }
                onChange={
                  handleChange
                }
                className={
                  inputClass
                }
              >
                {playerStatuses.map(
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
                Registration Status *
              </label>

              <select
                name="registrationStatus"
                value={
                  formData.registrationStatus
                }
                onChange={
                  handleChange
                }
                className={
                  inputClass
                }
              >
                <option value="Pending Registration">
                  Pending Registration
                </option>

                <option value="Registered">
                  Registered
                </option>
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
                formData.parentConsent
              }
              onChange={
                handleChange
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
                Parent / Guardian Consent
              </p>

              <p className="mt-1 break-words text-xs leading-5 text-slate-500">
                Confirm that appropriate
                registration and
                participation consent has
                been provided.
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
            to="/admin/players"
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

            Register Player
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

export default RegisterPlayerPage;