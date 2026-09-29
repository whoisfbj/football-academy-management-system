import {
  CalendarDays,
  CircleDollarSign,
  Clock3,
  TrendingUp,
  UserPlus,
  Users,
  UsersRound,
  WalletCards,
} from "lucide-react";

const statistics = [
  {
    title: "Registered Players",
    value: "428",
    change: "+18 this month",
    icon: Users,
  },
  {
    title: "Active Players",
    value: "386",
    change: "90.2% of players",
    icon: TrendingUp,
  },
  {
    title: "New Registrations",
    value: "18",
    change: "September 2026",
    icon: UserPlus,
  },
  {
    title: "Academy Teams",
    value: "18",
    change: "Across all categories",
    icon: UsersRound,
  },
  {
    title: "Fees Collected",
    value: "₦4.82M",
    change: "This month",
    icon: CircleDollarSign,
  },
  {
    title: "Outstanding",
    value: "₦760K",
    change: "37 player accounts",
    icon: WalletCards,
  },
];

const ageCategories = [
  {
    category: "U7",
    players: 28,
  },
  {
    category: "U9",
    players: 41,
  },
  {
    category: "U11",
    players: 58,
  },
  {
    category: "U13",
    players: 73,
  },
  {
    category: "U15",
    players: 96,
  },
  {
    category: "U17",
    players: 81,
  },
  {
    category: "U19",
    players: 51,
  },
];

const upcomingSessions = [
  {
    team: "U15 Academy Team",
    title: "Technical Training",
    date: "29 Sep",
    time: "4:00 PM",
    centre: "Lekki Training Centre",
  },
  {
    team: "U17 Academy Team",
    title: "Tactical Session",
    date: "30 Sep",
    time: "5:00 PM",
    centre: "Main Training Centre",
  },
  {
    team: "Girls U15",
    title: "Physical Development",
    date: "1 Oct",
    time: "4:30 PM",
    centre: "Ikeja Training Centre",
  },
];

const recentRegistrations = [
  {
    name: "Daniel Okafor",
    category: "U15",
    status: "Pending Registration",
  },
  {
    name: "Samuel Adewale",
    category: "U13",
    status: "Registered",
  },
  {
    name: "David Ibrahim",
    category: "U17",
    status: "On Trial",
  },
];

function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-medium text-green-600">
          Academy Overview
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          Administrator Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Monitor academy operations, players,
          development and financial activity.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {statistics.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
                  <Icon size={21} />
                </div>
              </div>

              <p className="text-sm text-slate-500">
                {stat.title}
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
                {stat.value}
              </p>

              <p className="mt-2 text-xs text-slate-400">
                {stat.change}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-900">
                Players by Age Category
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Current registered players
              </p>
            </div>

            <span className="text-sm font-semibold text-green-600">
              428 Players
            </span>
          </div>

          <div className="space-y-5">
            {ageCategories.map((item) => {
              const percentage =
                (item.players / 96) * 100;

              return (
                <div key={item.category}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">
                      {item.category}
                    </span>

                    <span className="text-sm text-slate-500">
                      {item.players}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-green-600"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-slate-900">
            Attendance Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            This month
          </p>

          <div className="my-8 text-center">
            <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full border-[12px] border-green-100">
              <div>
                <p className="text-3xl font-bold text-green-600">
                  87%
                </p>

                <p className="text-xs text-slate-500">
                  Attendance
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-green-50 p-4">
              <p className="text-xl font-bold text-green-700">
                349
              </p>

              <p className="text-xs text-green-700">
                Present
              </p>
            </div>

            <div className="rounded-lg bg-red-50 p-4">
              <p className="text-xl font-bold text-red-700">
                52
              </p>

              <p className="text-xs text-red-700">
                Absent
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-900">
                Upcoming Training
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Scheduled academy sessions
              </p>
            </div>

            <CalendarDays
              size={21}
              className="text-slate-400"
            />
          </div>

          <div className="divide-y divide-slate-100">
            {upcomingSessions.map((session) => (
              <div
                key={`${session.team}-${session.date}`}
                className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold text-slate-800">
                    {session.title}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {session.team}
                  </p>
                </div>

                <div className="flex flex-col gap-1 text-sm text-slate-500 sm:text-right">
                  <p className="font-medium text-slate-700">
                    {session.date} • {session.time}
                  </p>

                  <p>{session.centre}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl bg-slate-950 p-6 text-white shadow-sm">
          <Clock3 className="text-green-400" />

          <p className="mt-6 text-sm text-slate-400">
            Next Academy Event
          </p>

          <h2 className="mt-2 text-xl font-bold">
            U15 Academy Team vs Future Stars
          </h2>

          <p className="mt-4 text-sm leading-6 text-slate-300">
            Academy Friendly Match
          </p>

          <div className="mt-6 rounded-lg bg-white/10 p-4">
            <p className="font-semibold">
              Saturday, 3 October
            </p>

            <p className="mt-1 text-sm text-slate-300">
              10:00 AM • Main Stadium
            </p>
          </div>
        </section>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="font-bold text-slate-900">
              Recent Registrations
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Latest player registration activity
            </p>
          </div>

          <div className="space-y-4">
            {recentRegistrations.map((player) => (
              <div
                key={player.name}
                className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0"
              >
                <div>
                  <p className="font-medium text-slate-800">
                    {player.name}
                  </p>

                  <p className="text-sm text-slate-500">
                    {player.category}
                  </p>
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {player.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-slate-900">
            Player Development
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Development activity this month
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-2xl font-bold text-slate-900">
                64
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Player Evaluations
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-2xl font-bold text-slate-900">
                38
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Active IDPs
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-2xl font-bold text-slate-900">
                51
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Progress Reports
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-2xl font-bold text-slate-900">
                12
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Scouting Reports
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;