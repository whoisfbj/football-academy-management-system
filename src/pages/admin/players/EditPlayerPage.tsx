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

const inputClass =
  "w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100";

const labelClass =
  "mb-2 block text-sm font-medium text-slate-700";

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

function EditPlayerPage() {
  const { playerId } = useParams();
  const navigate = useNavigate();

  const existingPlayer = playerId
    ? getPlayerById(playerId)
    : undefined;

  const [player, setPlayer] =
    useState<Player | null>(
      existingPlayer ?? null,
    );

  const [error, setError] =
    useState("");

  if (!player) {
    return (
      <div>
        <Link
          to="/admin/players"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-green-600"
        >
          <ArrowLeft size={17} />
          Back to Players
        </Link>

        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">
            Player Not Found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            The player record you are trying to edit does not exist.
          </p>
        </div>
      </div>
    );
  }

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
      event.target instanceof HTMLInputElement
        ? event.target.checked
        : false;

    setPlayer((current) => {
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
    });
  };

  const handleNumberChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const {
      name,
      value,
    } = event.target;

    setPlayer((current) => {
      if (!current) {
        return current;
      }

      return {
        ...current,
        [name]: Number(value),
      };
    });
  };

  const handleGuardianChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const {
      name,
      value,
    } = event.target;

    setPlayer((current) => {
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
    });
  };

  const handleMedicalChange = (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const {
      name,
      value,
    } = event.target;

    setPlayer((current) => {
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
    });
  };

  const handleEmergencyChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const {
      name,
      value,
    } = event.target;

    setPlayer((current) => {
      if (!current) {
        return current;
      }

      return {
        ...current,
        medicalInfo: {
          ...current.medicalInfo,
          emergencyContact: {
            ...current.medicalInfo
              .emergencyContact,
            [name]: value,
          },
        },
      };
    });
  };

  const handlePhotoChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError(
        "Please select a valid image file.",
      );
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (
        typeof reader.result === "string"
      ) {
        setPlayer((current) => {
          if (!current) {
            return current;
          }

          return {
            ...current,
            passportPhoto:
              reader.result as string,
          };
        });
      }
    };

    reader.readAsDataURL(file);
  };

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

    updatePlayer(player);

    navigate(
      `/admin/players/${player.id}`,
    );
  };

  return (
    <div>
      <Link
        to={`/admin/players/${player.id}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-green-600"
      >
        <ArrowLeft size={17} />

        Back to Player Profile
      </Link>

      <div className="mt-5">
        <p className="text-sm font-semibold text-green-600">
          Player Management
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          Edit Player
        </h1>

        <p className="mt-2 text-slate-500">
          Update the academy record for{" "}
          <span className="font-semibold text-slate-700">
            {player.fullName}
          </span>
          .
        </p>
      </div>

      <div className="mt-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3">
        <p className="text-sm text-green-800">
          Player ID:{" "}
          <span className="font-semibold">
            {player.playerId}
          </span>
        </p>
      </div>

      {error && (
        <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-6"
      >
        {/* PERSONAL */}

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Personal Information
          </h2>

          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
              {player.passportPhoto ? (
                <img
                  src={player.passportPhoto}
                  alt={player.fullName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserRound
                  size={40}
                  className="text-slate-300"
                />
              )}
            </div>

            <div>
              <label
                htmlFor="editPhoto"
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <Camera size={17} />

                Change Photograph
              </label>

              <input
                id="editPhoto"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </div>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <label className={labelClass}>
                Full Name *
              </label>

              <input
                name="fullName"
                value={player.fullName}
                onChange={handleBasicChange}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>
                Date of Birth *
              </label>

              <input
                type="date"
                name="dateOfBirth"
                value={player.dateOfBirth}
                onChange={handleBasicChange}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>
                Gender
              </label>

              <select
                name="gender"
                value={player.gender}
                onChange={handleBasicChange}
                className={inputClass}
              >
                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>
              </select>
            </div>

            <div>
              <label className={labelClass}>
                Age Category
              </label>

              <select
                name="ageCategory"
                value={player.ageCategory}
                onChange={handleBasicChange}
                className={inputClass}
              >
                {ageCategories.map(
                  (category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  ),
                )}
              </select>
            </div>

            <div>
              <label className={labelClass}>
                Phone Number
              </label>

              <input
                name="phone"
                value={player.phone ?? ""}
                onChange={handleBasicChange}
                className={inputClass}
              />
            </div>

            <div className="md:col-span-2 xl:col-span-3">
              <label className={labelClass}>
                Address *
              </label>

              <textarea
                name="address"
                value={player.address}
                onChange={handleBasicChange}
                rows={3}
                className={inputClass}
                required
              />
            </div>
          </div>
        </section>

        {/* FOOTBALL */}

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Football Information
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <div>
              <label className={labelClass}>
                Playing Position
              </label>

              <select
                name="playingPosition"
                value={
                  player.playingPosition
                }
                onChange={handleBasicChange}
                className={inputClass}
              >
                {positions.map(
                  (position) => (
                    <option
                      key={position}
                      value={position}
                    >
                      {position}
                    </option>
                  ),
                )}
              </select>
            </div>

            <div>
              <label className={labelClass}>
                Preferred Foot
              </label>

              <select
                name="preferredFoot"
                value={player.preferredFoot}
                onChange={handleBasicChange}
                className={inputClass}
              >
                {(
                  [
                    "Right",
                    "Left",
                    "Both",
                  ] as PreferredFoot[]
                ).map((foot) => (
                  <option
                    key={foot}
                    value={foot}
                  >
                    {foot}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>
                Academy Team
              </label>

              <select
                name="academyTeam"
                value={
                  player.academyTeam ?? ""
                }
                onChange={handleBasicChange}
                className={inputClass}
              >
                <option value="">
                  Not Assigned
                </option>

                {teams.map((team) => (
                  <option
                    key={team}
                    value={team}
                  >
                    {team}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>
                Program
              </label>

              <select
                name="program"
                value={player.program}
                onChange={handleBasicChange}
                className={inputClass}
              >
                {programs.map(
                  (program) => (
                    <option
                      key={program}
                      value={program}
                    >
                      {program}
                    </option>
                  ),
                )}
              </select>
            </div>

            <div>
              <label className={labelClass}>
                Academy Branch
              </label>

              <select
                name="academyBranch"
                value={
                  player.academyBranch
                }
                onChange={handleBasicChange}
                className={inputClass}
              >
                {branches.map(
                  (branch) => (
                    <option
                      key={branch}
                      value={branch}
                    >
                      {branch}
                    </option>
                  ),
                )}
              </select>
            </div>

            <div>
              <label className={labelClass}>
                Training Centre
              </label>

              <select
                name="trainingCentre"
                value={
                  player.trainingCentre
                }
                onChange={handleBasicChange}
                className={inputClass}
              >
                {trainingCentres.map(
                  (centre) => (
                    <option
                      key={centre}
                      value={centre}
                    >
                      {centre}
                    </option>
                  ),
                )}
              </select>
            </div>

            <div>
              <label className={labelClass}>
                Height (cm)
              </label>

              <input
                type="number"
                name="height"
                value={player.height}
                onChange={handleNumberChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Weight (kg)
              </label>

              <input
                type="number"
                name="weight"
                value={player.weight}
                onChange={handleNumberChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Previous Club / Academy
              </label>

              <input
                name="previousClub"
                value={
                  player.previousClub ?? ""
                }
                onChange={handleBasicChange}
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* ACADEMIC */}

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Academic Information
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <label className={labelClass}>
                School Attended *
              </label>

              <input
                name="schoolAttended"
                value={
                  player.schoolAttended
                }
                onChange={handleBasicChange}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>
                Academic Information
              </label>

              <input
                name="academicInformation"
                value={
                  player.academicInformation ??
                  ""
                }
                onChange={handleBasicChange}
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* GUARDIAN */}

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Parent / Guardian
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <div>
              <label className={labelClass}>
                Full Name *
              </label>

              <input
                name="fullName"
                value={
                  player.guardian.fullName
                }
                onChange={
                  handleGuardianChange
                }
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>
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
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Phone *
              </label>

              <input
                name="phone"
                value={
                  player.guardian.phone
                }
                onChange={
                  handleGuardianChange
                }
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>
                Alternative Phone
              </label>

              <input
                name="alternativePhone"
                value={
                  player.guardian
                    .alternativePhone ?? ""
                }
                onChange={
                  handleGuardianChange
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Email
              </label>

              <input
                type="email"
                name="email"
                value={
                  player.guardian.email ??
                  ""
                }
                onChange={
                  handleGuardianChange
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Address
              </label>

              <input
                name="address"
                value={
                  player.guardian.address
                }
                onChange={
                  handleGuardianChange
                }
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* MEDICAL */}

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Medical & Emergency Information
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <label className={labelClass}>
                Medical Conditions
              </label>

              <textarea
                name="medicalConditions"
                value={
                  player.medicalInfo
                    .medicalConditions ?? ""
                }
                onChange={handleMedicalChange}
                rows={3}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Allergies
              </label>

              <textarea
                name="allergies"
                value={
                  player.medicalInfo
                    .allergies ?? ""
                }
                onChange={handleMedicalChange}
                rows={3}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Injury History
              </label>

              <textarea
                name="injuryHistory"
                value={
                  player.medicalInfo
                    .injuryHistory ?? ""
                }
                onChange={handleMedicalChange}
                rows={3}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Additional Notes
              </label>

              <textarea
                name="additionalNotes"
                value={
                  player.medicalInfo
                    .additionalNotes ?? ""
                }
                onChange={handleMedicalChange}
                rows={3}
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-7 border-t border-slate-100 pt-6">
            <h3 className="font-semibold text-slate-800">
              Emergency Contact
            </h3>

            <div className="mt-4 grid gap-5 md:grid-cols-3">
              <div>
                <label className={labelClass}>
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
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
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
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Phone
                </label>

                <input
                  name="phone"
                  value={
                    player.medicalInfo
                      .emergencyContact
                      .phone
                  }
                  onChange={
                    handleEmergencyChange
                  }
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </section>

        {/* REGISTRATION */}

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Registration & Status
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <div>
              <label className={labelClass}>
                Date Joined
              </label>

              <input
                type="date"
                name="dateJoined"
                value={player.dateJoined}
                onChange={handleBasicChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Player Status
              </label>

              <select
                name="status"
                value={player.status}
                onChange={handleBasicChange}
                className={inputClass}
              >
                {statuses.map(
                  (status) => (
                    <option
                      key={status}
                      value={status}
                    >
                      {status}
                    </option>
                  ),
                )}
              </select>
            </div>

            <div>
              <label className={labelClass}>
                Registration Status
              </label>

              <select
                name="registrationStatus"
                value={
                  player.registrationStatus
                }
                onChange={handleBasicChange}
                className={inputClass}
              >
                {(
                  [
                    "Pending Registration",
                    "Registered",
                  ] as RegistrationStatus[]
                ).map((status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <input
              type="checkbox"
              name="parentConsent"
              checked={
                player.parentConsent
              }
              onChange={handleBasicChange}
              className="mt-1 h-4 w-4 accent-green-600"
            />

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Parent / Guardian Consent
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Confirm whether the player's consent documentation has been received.
              </p>
            </div>
          </label>
        </section>

        {/* ACTIONS */}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            to={`/admin/players/${player.id}`}
            className="rounded-lg border border-slate-300 px-5 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            <Save size={18} />

            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPlayerPage;