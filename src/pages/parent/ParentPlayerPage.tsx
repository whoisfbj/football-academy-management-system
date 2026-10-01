import type { ReactNode } from "react";
import {
  Activity,
  GraduationCap,
  HeartPulse,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";

import {
  getPrimaryLinkedPlayer,
} from "../../services/parentService";

function ParentPlayerPage() {
  const player =
    getPrimaryLinkedPlayer();

  if (!player) {
    return (
      <div className="p-5 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <EmptyPlayer />
        </div>
      </div>
    );
  }

  const guardian =
    player.guardian as unknown as
      | Record<string, unknown>
      | undefined;

  const medical =
    player.medicalInfo as unknown as
      | Record<string, unknown>
      | undefined;

  const emergency =
    player.parentConsent as unknown as
      | Record<string, unknown>
      | undefined;

  return (
    <div className="p-5 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div>
          <p className="text-sm font-semibold text-green-600">
            Parent / Guardian Portal
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-950 lg:text-3xl">
            My Player
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View the player's
            registration and academy
            profile.
          </p>
        </div>

        <section className="mt-6 rounded-2xl bg-slate-950 p-6 text-white">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-white/10">
              {player.passportPhoto ? (
                <img
                  src={player.passportPhoto}
                  alt={player.fullName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserRound
                  size={34}
                />
              )}
            </div>

            <div>
              <p className="text-sm text-slate-400">
                Player
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                {player.fullName}
              </h2>

              <p className="mt-2 font-semibold text-green-400">
                {player.playerId}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <Badge
                  text={
                    player.status
                  }
                />

                <Badge
                  text={
                    player.registrationStatus
                  }
                />

                <Badge
                  text={
                    player.ageCategory
                  }
                />
              </div>
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <InfoSection
            title="Personal Information"
            icon={
              <UserRound
                size={20}
              />
            }
          >
            <InfoRow
              label="Full Name"
              value={player.fullName}
            />

            <InfoRow
              label="Date of Birth"
              value={formatDate(
                player.dateOfBirth,
              )}
            />

            <InfoRow
              label="Gender"
              value={player.gender}
            />

            <InfoRow
              label="Age Category"
              value={
                player.ageCategory
              }
            />

            <InfoRow
              label="Phone"
              value={
                player.phone ||
                "Not provided"
              }
            />

            <InfoRow
              label="Address"
              value={
                player.address ||
                "Not provided"
              }
            />
          </InfoSection>

          <InfoSection
            title="Football Information"
            icon={
              <Activity size={20} />
            }
          >
            <InfoRow
              label="Position"
              value={
                player.playingPosition
              }
            />

            <InfoRow
              label="Preferred Foot"
              value={
                player.preferredFoot
              }
            />

            <InfoRow
              label="Height"
              value={
                player.height
                  ? `${player.height} cm`
                  : "Not provided"
              }
            />

            <InfoRow
              label="Weight"
              value={
                player.weight
                  ? `${player.weight} kg`
                  : "Not provided"
              }
            />

            <InfoRow
              label="Previous Club"
              value={
                player.previousClub ||
                "None"
              }
            />

            <InfoRow
              label="Status"
              value={player.status}
            />
          </InfoSection>

          <InfoSection
            title="Academy Information"
            icon={
              <ShieldCheck
                size={20}
              />
            }
          >
            <InfoRow
              label="Academy Team"
              value={
                player.academyTeam ||
                "Not assigned"
              }
            />

            <InfoRow
              label="Program"
              value={
                player.program ||
                "Not assigned"
              }
            />

            <InfoRow
              label="Academy Branch"
              value={
                player.academyBranch ||
                "Not assigned"
              }
            />

            <InfoRow
              label="Training Centre"
              value={
                player.trainingCentre ||
                "Not assigned"
              }
            />

            <InfoRow
              label="Date Joined"
              value={formatDate(
                player.dateJoined,
              )}
            />

            <InfoRow
              label="Registration"
              value={
                player.registrationStatus
              }
            />
          </InfoSection>

          <InfoSection
            title="School & Academic Information"
            icon={
              <GraduationCap
                size={20}
              />
            }
          >
            <InfoRow
              label="School"
              value={
                player.schoolAttended ||
                "Not provided"
              }
            />

            <InfoRow
              label="Academic Information"
              value={
                player.academicInformation ||
                "Not provided"
              }
            />
          </InfoSection>

          <InfoSection
            title="Parent / Guardian"
            icon={
              <UsersRound
                size={20}
              />
            }
          >
            <InfoRow
              label="Name"
              value={readText(
                guardian,
                [
                  "fullName",
                  "name",
                ],
              )}
            />

            <InfoRow
              label="Relationship"
              value={readText(
                guardian,
                ["relationship"],
              )}
            />

            <InfoRow
              label="Phone"
              value={readText(
                guardian,
                ["phone"],
              )}
            />

            <InfoRow
              label="Email"
              value={readText(
                guardian,
                ["email"],
              )}
            />
          </InfoSection>

          <InfoSection
            title="Medical Information"
            icon={
              <HeartPulse
                size={20}
              />
            }
          >
            <InfoRow
              label="Medical Conditions"
              value={readText(
                medical,
                [
                  "medicalConditions",
                  "conditions",
                  "condition",
                ],
              )}
            />

            <InfoRow
              label="Allergies"
              value={readText(
                medical,
                ["allergies"],
              )}
            />

            <InfoRow
              label="Medication"
              value={readText(
                medical,
                [
                  "medication",
                  "medications",
                ],
              )}
            />
          </InfoSection>

          <InfoSection
            title="Emergency Contact"
            icon={
              <Phone size={20} />
            }
          >
            <InfoRow
              label="Name"
              value={readText(
                emergency,
                [
                  "fullName",
                  "name",
                ],
              )}
            />

            <InfoRow
              label="Relationship"
              value={readText(
                emergency,
                ["relationship"],
              )}
            />

            <InfoRow
              label="Phone"
              value={readText(
                emergency,
                ["phone"],
              )}
            />
          </InfoSection>

          <InfoSection
            title="Training Location"
            icon={
              <MapPin size={20} />
            }
          >
            <InfoRow
              label="Branch"
              value={
                player.academyBranch ||
                "Not assigned"
              }
            />

            <InfoRow
              label="Training Centre"
              value={
                player.trainingCentre ||
                "Not assigned"
              }
            />
          </InfoSection>
        </div>

        <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <p className="font-semibold text-blue-900">
            Read-only profile
          </p>

          <p className="mt-1 text-sm leading-6 text-blue-700">
            Player information shown
            here is managed by the
            academy. Contact the academy
            if any information needs to
            be corrected.
          </p>
        </div>
      </div>
    </div>
  );
}

function EmptyPlayer() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
      <UserRound
        size={36}
        className="mx-auto text-slate-300"
      />

      <h1 className="mt-4 text-xl font-bold text-slate-900">
        No Player Linked
      </h1>

      <p className="mt-2 text-sm text-slate-500">
        No player is currently linked
        to this parent or guardian
        account.
      </p>
    </div>
  );
}

function InfoSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
          {icon}
        </div>

        <h2 className="font-bold text-slate-900">
          {title}
        </h2>
      </div>

      <div className="mt-5 space-y-4">
        {children}
      </div>
    </section>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1 border-b border-slate-100 pb-3 last:border-0 last:pb-0 sm:flex-row sm:justify-between sm:gap-6">
      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="text-sm font-semibold text-slate-800 sm:text-right">
        {value}
      </span>
    </div>
  );
}

function Badge({
  text,
}: {
  text: string;
}) {
  return (
    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
      {text}
    </span>
  );
}

function readText(
  object:
    | Record<string, unknown>
    | undefined,
  keys: string[],
) {
  if (!object) {
    return "Not provided";
  }

  for (const key of keys) {
    const value =
      object[key];

    if (
      typeof value === "string" &&
      value.trim()
    ) {
      return value;
    }
  }

  return "Not provided";
}

function formatDate(
  date: string,
) {
  if (!date) {
    return "Not provided";
  }

  return new Date(
    `${date}T00:00:00`,
  ).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );
}

export default ParentPlayerPage;