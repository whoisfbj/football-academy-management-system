import {
  Building2,
  MapPin,
  Save,
  Trophy,
} from "lucide-react";

import {
  useState,
} from "react";

import type {
  ReactNode,
} from "react";

import {
  getAcademyProfile,
  getBranches,
  getPrograms,
  getTrainingCentres,
  saveAcademyProfile,
} from "../../../services/academyService";

function AcademySettingsPage() {
  const [profile, setProfile] =
    useState(
      () =>
        getAcademyProfile(),
    );

  const [saved, setSaved] =
    useState(false);

  const branches =
    getBranches();

  const centres =
    getTrainingCentres();

  const programs =
    getPrograms();

  return (
    <div className="w-full min-w-0">
      <p className="text-xs font-semibold uppercase tracking-wide text-green-600 sm:text-sm">
        Academy Administration
      </p>

      <h1 className="mt-1 break-words text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
        Academy Settings
      </h1>

      <section className="mt-7 min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex items-center gap-3">
          <Building2 className="text-green-600" />

          <h2 className="font-bold text-slate-900">
            Academy Profile
          </h2>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {(
            [
              [
                "name",
                "Academy Name",
              ],
              [
                "email",
                "Email",
              ],
              [
                "phone",
                "Phone",
              ],
              [
                "address",
                "Address",
              ],
              [
                "registrationNumber",
                "Registration Number",
              ],
            ] as const
          ).map(
            ([key, label]) => (
              <div key={key}>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  {label}
                </label>

                <input
                  value={
                    profile[
                      key
                    ]
                  }
                  onChange={(
                    event,
                  ) => {
                    setSaved(
                      false,
                    );

                    setProfile(
                      {
                        ...profile,
                        [key]:
                          event
                            .target
                            .value,
                      },
                    );
                  }}
                  className="w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-base outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:text-sm"
                />
              </div>
            ),
          )}
        </div>

        <button
          onClick={() => {
            saveAcademyProfile(
              profile,
            );

            setSaved(true);
          }}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 sm:w-auto"
        >
          <Save size={17} />
          Save Academy Profile
        </button>

        {saved && (
          <p className="mt-3 text-sm font-medium text-green-600">
            Academy profile saved.
          </p>
        )}
      </section>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <ListCard
          title="Academy Branches"
          icon={<Building2 />}
          values={branches.map(
            (branch) =>
              branch.name,
          )}
        />

        <ListCard
          title="Training Centres"
          icon={<MapPin />}
          values={centres.map(
            (centre) =>
              centre.name,
          )}
        />

        <ListCard
          title="Programs"
          icon={<Trophy />}
          values={programs.map(
            (program) =>
              program.name,
          )}
        />
      </div>
    </div>
  );
}

function ListCard({
  title,
  icon,
  values,
}: {
  title: string;
  icon: ReactNode;
  values: string[];
}) {
  return (
    <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex min-w-0 items-center gap-3 text-green-600">
        {icon}

        <h2 className="font-bold text-slate-900">
          {title}
        </h2>
      </div>

      <div className="mt-5 space-y-3">
        {values.map(
          (value) => (
            <div
              key={value}
              className="min-w-0 break-words rounded-lg bg-slate-50 p-3 text-sm font-medium text-slate-700"
            >
              {value}
            </div>
          ),
        )}
      </div>
    </section>
  );
}

export default AcademySettingsPage;