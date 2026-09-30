import type { ReactNode } from "react";
import {
  Activity,
  GraduationCap,
  HeartPulse,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";

import { getPlayerById } from "../../services/playerService";

function ParentPlayerPage() {
  // Prototype parent -> player relationship
  const player = getPlayerById("player-001");

  if (!player) {
    return (
      <div className="p-5 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <UserRound size={28} />
            </div>

            <h1 className="mt-4 text-xl font-bold text-slate-900">
              No Player Linked
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              No player is currently linked to this parent or guardian account.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /*
   * These helpers allow the page to display optional fields
   * without breaking if your Player interface uses slightly
   * different names for some of them.
   */
  const record = player as unknown as Record<string, unknown>;

  const dateOfBirth = readValue(
    record,
    "dateOfBirth",
    "dob",
  );

  const address = readValue(
    record,
    "address",
    "homeAddress",
  );

  const phone = readValue(
    record,
    "phone",
    "phoneNumber",
  );

  const school = readValue(
    record,
    "schoolAttended",
    "school",
  );

  const academicInformation = readValue(
    record,
    "academicInformation",
    "academicInfo",
  );

  const height = readValue(
    record,
    "height",
  );

  const weight = readValue(
    record,
    "weight",
  );

  const previousClub = readValue(
    record,
    "previousClub",
  );

  const dateJoined = readValue(
    record,
    "dateJoined",
  );

  const branch = readValue(
    record,
    "branch",
    "academyBranch",
  );

  const guardian =
    getObject(record.guardian) ??
    getObject(record.parentGuardian);

  const guardianName = guardian
    ? readValue(
        guardian,
        "fullName",
        "name",
        "guardianName",
      )
    : "Not provided";

  const guardianRelationship = guardian
    ? readValue(
        guardian,
        "relationship",
        "relation",
      )
    : "Not provided";

  const guardianPhone = guardian
    ? readValue(
        guardian,
        "phone",
        "phoneNumber",
      )
    : "Not provided";

  const guardianEmail = guardian
    ? readValue(
        guardian,
        "email",
      )
    : "Not provided";

  const emergency =
    getObject(record.emergencyContact) ??
    getObject(record.emergency);

  const emergencyName = emergency
    ? readValue(
        emergency,
        "name",
        "fullName",
      )
    : "Not provided";

  const emergencyPhone = emergency
    ? readValue(
        emergency,
        "phone",
        "phoneNumber",
      )
    : "Not provided";

  const emergencyRelationship = emergency
    ? readValue(
        emergency,
        "relationship",
        "relation",
      )
    : "Not provided";

  const medical =
    getObject(record.medicalInformation) ??
    getObject(record.medical);

  const allergies = medical
    ? readValue(
        medical,
        "allergies",
      )
    : "None recorded";

  const medicalConditions = medical
    ? readValue(
        medical,
        "medicalConditions",
        "conditions",
      )
    : "None recorded";

  const medications = medical
    ? readValue(
        medical,
        "medications",
      )
    : "None recorded";

  return (
    <div className="p-5 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* PAGE HEADING */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-green-600">
            Parent / Guardian Portal
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-950 lg:text-3xl">
            My Player
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View your player's academy profile and registration information.
          </p>
        </div>

        {/* PLAYER HERO */}
        <section className="relative overflow-hidden rounded-2xl bg-slate-950 p-6 text-white shadow-sm lg:p-8">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-green-500/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center">
            {player.passportPhoto ? (
              <img
                src={player.passportPhoto}
                alt={player.fullName}
                className="h-28 w-28 rounded-2xl object-cover ring-4 ring-white/10"
              />
            ) : (
              <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                <UserRound size={42} />
              </div>
            )}

            <div className="flex-1">
              <p className="text-sm font-semibold text-green-400">
                Registered Academy Player
              </p>

              <h2 className="mt-1 text-3xl font-bold">
                {player.fullName}
              </h2>

              <p className="mt-2 font-semibold text-green-400">
                {player.playerId}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Tag text={player.ageCategory} />

                <Tag text={player.playingPosition} />

                <Tag
                  text={
                    player.academyTeam ??
                    "No Team Assigned"
                  }
                />

                <Tag text={player.status} />
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Player Status
              </p>

              <div className="mt-2 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

                <span className="font-semibold">
                  {player.status}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* PERSONAL INFORMATION */}
        <div className="mt-6 grid gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <ProfileSection
              title="Personal Information"
              subtitle="Player's basic information"
              icon={<UserRound size={20} />}
            >
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <Detail
                  label="Full Name"
                  value={player.fullName}
                />

                <Detail
                  label="Player ID"
                  value={player.playerId}
                />

                <Detail
                  label="Gender"
                  value={player.gender}
                />

                <Detail
                  label="Date of Birth"
                  value={formatPossibleDate(
                    dateOfBirth,
                  )}
                />

                <Detail
                  label="Age Category"
                  value={player.ageCategory}
                />

                <Detail
                  label="Playing Position"
                  value={player.playingPosition}
                />

                <Detail
                  label="Preferred Foot"
                  value={player.preferredFoot}
                />

                <Detail
                  label="Height"
                  value={formatMeasurement(
                    height,
                    "cm",
                  )}
                />

                <Detail
                  label="Weight"
                  value={formatMeasurement(
                    weight,
                    "kg",
                  )}
                />
              </div>
            </ProfileSection>
          </div>

          {/* REGISTRATION */}
          <ProfileSection
            title="Registration"
            subtitle="Academy registration details"
            icon={<ShieldCheck size={20} />}
          >
            <div className="space-y-5">
              <Detail
                label="Registration Status"
                value={player.registrationStatus}
              />

              <Detail
                label="Player Status"
                value={player.status}
              />

              <Detail
                label="Date Joined"
                value={formatPossibleDate(
                  dateJoined,
                )}
              />

              <Detail
                label="Previous Club"
                value={previousClub}
              />
            </div>
          </ProfileSection>
        </div>

        {/* ACADEMY INFORMATION */}
        <div className="mt-6">
          <ProfileSection
            title="Academy Information"
            subtitle="Team, program and training information"
            icon={<Activity size={20} />}
          >
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <Detail
                label="Academy Team"
                value={
                  player.academyTeam ??
                  "Not Assigned"
                }
              />

              <Detail
                label="Age Category"
                value={player.ageCategory}
              />

              <Detail
                label="Program"
                value={player.program}
              />

              <Detail
                label="Academy Branch"
                value={branch}
              />

              <Detail
                label="Training Centre"
                value={player.trainingCentre}
              />

              <Detail
                label="Playing Position"
                value={player.playingPosition}
              />
            </div>
          </ProfileSection>
        </div>

        {/* SCHOOL + CONTACT */}
        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <ProfileSection
            title="Education & Contact"
            subtitle="School and contact information"
            icon={<GraduationCap size={20} />}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Detail
                label="School Attended"
                value={school}
              />

              <Detail
                label="Academic Information"
                value={academicInformation}
              />

              <Detail
                label="Phone Number"
                value={phone}
              />

              <Detail
                label="Address"
                value={address}
              />
            </div>
          </ProfileSection>

          <ProfileSection
            title="Parent / Guardian"
            subtitle="Registered guardian information"
            icon={<Users size={20} />}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Detail
                label="Guardian Name"
                value={guardianName}
              />

              <Detail
                label="Relationship"
                value={guardianRelationship}
              />

              <Detail
                label="Phone Number"
                value={guardianPhone}
              />

              <Detail
                label="Email Address"
                value={guardianEmail}
              />
            </div>
          </ProfileSection>
        </div>

        {/* MEDICAL + EMERGENCY */}
        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <ProfileSection
            title="Medical Information"
            subtitle="Important player health information"
            icon={<HeartPulse size={20} />}
          >
            <div className="space-y-5">
              <Detail
                label="Allergies"
                value={allergies}
              />

              <Detail
                label="Medical Conditions"
                value={medicalConditions}
              />

              <Detail
                label="Medication"
                value={medications}
              />
            </div>
          </ProfileSection>

          <ProfileSection
            title="Emergency Contact"
            subtitle="Contact information for emergencies"
            icon={<Phone size={20} />}
          >
            <div className="space-y-5">
              <Detail
                label="Contact Name"
                value={emergencyName}
              />

              <Detail
                label="Relationship"
                value={emergencyRelationship}
              />

              <Detail
                label="Phone Number"
                value={emergencyPhone}
              />
            </div>
          </ProfileSection>
        </div>

        {/* LOCATION */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <MapPin size={20} />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Training Location
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Current academy training assignment.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            <Detail
              label="Academy Branch"
              value={branch}
            />

            <Detail
              label="Training Centre"
              value={player.trainingCentre}
            />

            <Detail
              label="Program"
              value={player.program}
            />
          </div>
        </section>

        {/* INFORMATION NOTICE */}
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <ShieldCheck
            size={20}
            className="mt-0.5 shrink-0 text-blue-600"
          />

          <div>
            <p className="font-semibold text-blue-900">
              Read-only player information
            </p>

            <p className="mt-1 text-sm leading-6 text-blue-700">
              Player profile information is maintained by the academy. Contact
              the academy if any of the information displayed here needs to be
              corrected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   COMPONENTS
===================================================== */

function ProfileSection({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
          {icon}
        </div>

        <div>
          <h2 className="font-bold text-slate-900">
            {title}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="mt-6">{children}</div>
    </section>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1.5 break-words text-sm font-semibold text-slate-700">
        {value || "Not provided"}
      </p>
    </div>
  );
}

function Tag({
  text,
}: {
  text: string;
}) {
  return (
    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-slate-200">
      {text}
    </span>
  );
}

/* =====================================================
   HELPERS
===================================================== */

function getObject(
  value: unknown,
): Record<string, unknown> | undefined {
  if (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  ) {
    return value as Record<
      string,
      unknown
    >;
  }

  return undefined;
}

function readValue(
  object: Record<string, unknown>,
  ...keys: string[]
): string {
  for (const key of keys) {
    const value = object[key];

    if (
      value !== undefined &&
      value !== null &&
      value !== ""
    ) {
      if (Array.isArray(value)) {
        return value.join(", ");
      }

      return String(value);
    }
  }

  return "Not provided";
}

function formatPossibleDate(
  value: string,
) {
  if (
    !value ||
    value === "Not provided"
  ) {
    return "Not provided";
  }

  const parsed = new Date(value);

  if (
    Number.isNaN(parsed.getTime())
  ) {
    return value;
  }

  return parsed.toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );
}

function formatMeasurement(
  value: string,
  unit: string,
) {
  if (
    !value ||
    value === "Not provided"
  ) {
    return "Not provided";
  }

  if (
    value
      .toLowerCase()
      .includes(
        unit.toLowerCase(),
      )
  ) {
    return value;
  }

  return `${value} ${unit}`;
}

export default ParentPlayerPage;