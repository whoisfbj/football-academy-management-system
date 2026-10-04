import type { ReactNode } from "react";
import {
  CalendarDays,
  CircleDollarSign,
  Clock3,
  TrendingUp,
  UserPlus,
  Users,
  UsersRound,
  WalletCards,
  ShoppingBag,
  Ticket,
} from "lucide-react";

import { Link } from "react-router";
import { getShopOrders, getShopProducts } from "../../services/shopService";
import { getTicketEvents, getTicketOrders } from "../../services/ticketService";
import { formatNaira } from "../../components/commerce/CommerceUI";

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
  const shopProducts = getShopProducts();
  const shopOrders = getShopOrders();
  const ticketEvents = getTicketEvents();
  const ticketOrders = getTicketOrders();
  const shopRevenue = shopOrders.reduce((total, order) => total + order.total, 0);
  const ticketRevenue = ticketOrders.reduce((total, order) => total + order.total, 0);

  return (
    <div className="w-full min-w-0">
      {/* =========================================
          PAGE HEADER
      ========================================== */}

      <div className="mb-6 min-w-0 sm:mb-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-green-600 sm:text-sm">
          Academy Overview
        </p>

        <h1 className="mt-1 break-words text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
          Administrator Dashboard
        </h1>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 sm:text-base">
          Monitor academy operations, players, development and
          financial activity.
        </p>
      </div>

      {/* =========================================
          STATISTICS
      ========================================== */}

      <div
        className="
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          lg:grid-cols-3
          2xl:grid-cols-6
        "
      >
        {statistics.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="
                min-w-0
                rounded-xl
                border
                border-slate-200
                bg-white
                p-4
                shadow-sm
                transition
                hover:border-slate-300
                hover:shadow-md
                sm:p-5
              "
            >
              <div className="mb-4 flex items-center justify-between sm:mb-5">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-green-50
                    text-green-600
                  "
                >
                  <Icon size={21} />
                </div>
              </div>

              <p className="truncate text-sm text-slate-500">
                {stat.title}
              </p>

              <p className="mt-1 break-words text-xl font-bold text-slate-900 sm:text-2xl">
                {stat.value}
              </p>

              <p className="mt-2 break-words text-xs leading-5 text-slate-400">
                {stat.change}
              </p>
            </div>
          );
        })}
      </div>

      {/* =========================================
          AGE CATEGORIES + ATTENDANCE
      ========================================== */}

      <div
        className="
          mt-6
          grid
          min-w-0
          grid-cols-1
          gap-6
          xl:grid-cols-3
        "
      >
        {/* PLAYERS BY AGE */}

        <section
          className="
            min-w-0
            rounded-xl
            border
            border-slate-200
            bg-white
            p-4
            shadow-sm
            sm:p-6
            xl:col-span-2
          "
        >
          <div
            className="
              mb-6
              flex
              min-w-0
              flex-col
              gap-2
              sm:flex-row
              sm:items-start
              sm:justify-between
              sm:gap-4
            "
          >
            <div className="min-w-0">
              <h2 className="font-bold text-slate-900">
                Players by Age Category
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Current registered players
              </p>
            </div>

            <span className="shrink-0 text-sm font-semibold text-green-600">
              428 Players
            </span>
          </div>

          <div className="space-y-5">
            {ageCategories.map((item) => {
              const percentage =
                (item.players / 96) * 100;

              return (
                <div
                  key={item.category}
                  className="min-w-0"
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-slate-700">
                      {item.category}
                    </span>

                    <span className="shrink-0 text-sm text-slate-500">
                      {item.players}
                    </span>
                  </div>

                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
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

        {/* ATTENDANCE */}

        <section
          className="
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
          <h2 className="font-bold text-slate-900">
            Attendance Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            This month
          </p>

          <div className="my-6 text-center sm:my-8">
            <div
              className="
                mx-auto
                flex
                h-32
                w-32
                items-center
                justify-center
                rounded-full
                border-[10px]
                border-green-100
                sm:h-36
                sm:w-36
                sm:border-[12px]
              "
            >
              <div>
                <p className="text-2xl font-bold text-green-600 sm:text-3xl">
                  87%
                </p>

                <p className="text-xs text-slate-500">
                  Attendance
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="min-w-0 rounded-lg bg-green-50 p-3 sm:p-4">
              <p className="break-words text-lg font-bold text-green-700 sm:text-xl">
                349
              </p>

              <p className="mt-1 text-xs text-green-700">
                Present
              </p>
            </div>

            <div className="min-w-0 rounded-lg bg-red-50 p-3 sm:p-4">
              <p className="break-words text-lg font-bold text-red-700 sm:text-xl">
                52
              </p>

              <p className="mt-1 text-xs text-red-700">
                Absent
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* =========================================
          UPCOMING TRAINING + EVENT
      ========================================== */}

      <div
        className="
          mt-6
          grid
          min-w-0
          grid-cols-1
          gap-6
          xl:grid-cols-3
        "
      >
        {/* TRAINING */}

        <section
          className="
            min-w-0
            rounded-xl
            border
            border-slate-200
            bg-white
            p-4
            shadow-sm
            sm:p-6
            xl:col-span-2
          "
        >
          <div className="mb-5 flex min-w-0 items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 className="font-bold text-slate-900">
                Upcoming Training
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Scheduled academy sessions
              </p>
            </div>

            <CalendarDays
              size={21}
              className="shrink-0 text-slate-400"
            />
          </div>

          <div className="divide-y divide-slate-100">
            {upcomingSessions.map((session) => (
              <div
                key={`${session.team}-${session.date}`}
                className="
                  flex
                  min-w-0
                  flex-col
                  gap-3
                  py-4
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  sm:gap-5
                "
              >
                <div className="min-w-0">
                  <p className="break-words font-semibold text-slate-800">
                    {session.title}
                  </p>

                  <p className="mt-1 break-words text-sm text-slate-500">
                    {session.team}
                  </p>
                </div>

                <div
                  className="
                    min-w-0
                    text-sm
                    text-slate-500
                    sm:max-w-[45%]
                    sm:text-right
                  "
                >
                  <p className="font-medium text-slate-700">
                    {session.date} • {session.time}
                  </p>

                  <p className="mt-1 break-words">
                    {session.centre}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* NEXT EVENT */}

        <section
          className="
            min-w-0
            overflow-hidden
            rounded-xl
            bg-slate-950
            p-4
            text-white
            shadow-sm
            sm:p-6
          "
        >
          <Clock3 className="text-green-400" />

          <p className="mt-5 text-sm text-slate-400 sm:mt-6">
            Next Academy Event
          </p>

          <h2 className="mt-2 break-words text-lg font-bold leading-7 sm:text-xl">
            U15 Academy Team vs Future Stars
          </h2>

          <p className="mt-4 text-sm leading-6 text-slate-300">
            Academy Friendly Match
          </p>

          <div className="mt-5 min-w-0 rounded-lg bg-white/10 p-4 sm:mt-6">
            <p className="break-words font-semibold">
              Saturday, 3 October
            </p>

            <p className="mt-1 break-words text-sm text-slate-300">
              10:00 AM • Main Stadium
            </p>
          </div>
        </section>
      </div>

      {/* =========================================
          REGISTRATIONS + DEVELOPMENT
      ========================================== */}

      <div
        className="
          mt-6
          grid
          min-w-0
          grid-cols-1
          gap-6
          xl:grid-cols-2
        "
      >
        {/* RECENT REGISTRATIONS */}

        <section
          className="
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
          <div className="mb-5">
            <h2 className="font-bold text-slate-900">
              Recent Registrations
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Latest player registration activity
            </p>
          </div>

          <div className="space-y-0">
            {recentRegistrations.map((player) => (
              <div
                key={player.name}
                className="
                  flex
                  min-w-0
                  flex-col
                  gap-3
                  border-b
                  border-slate-100
                  py-4
                  first:pt-0
                  last:border-0
                  last:pb-0
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  sm:gap-4
                "
              >
                <div className="min-w-0">
                  <p className="break-words font-medium text-slate-800">
                    {player.name}
                  </p>

                  <p className="mt-0.5 text-sm text-slate-500">
                    {player.category}
                  </p>
                </div>

                <span
                  className="
                    w-fit
                    max-w-full
                    rounded-full
                    bg-slate-100
                    px-3
                    py-1
                    text-xs
                    font-medium
                    text-slate-600
                    sm:shrink-0
                  "
                >
                  {player.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* PLAYER DEVELOPMENT */}

        <section
          className="
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
          <h2 className="font-bold text-slate-900">
            Player Development
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Development activity this month
          </p>

          <div
            className="
              mt-6
              grid
              grid-cols-1
              gap-3
              sm:grid-cols-2
              sm:gap-4
            "
          >
            <div className="min-w-0 rounded-lg bg-slate-50 p-4">
              <p className="text-xl font-bold text-slate-900 sm:text-2xl">
                64
              </p>

              <p className="mt-1 break-words text-sm text-slate-500">
                Player Evaluations
              </p>
            </div>

            <div className="min-w-0 rounded-lg bg-slate-50 p-4">
              <p className="text-xl font-bold text-slate-900 sm:text-2xl">
                38
              </p>

              <p className="mt-1 break-words text-sm text-slate-500">
                Active IDPs
              </p>
            </div>

            <div className="min-w-0 rounded-lg bg-slate-50 p-4">
              <p className="text-xl font-bold text-slate-900 sm:text-2xl">
                51
              </p>

              <p className="mt-1 break-words text-sm text-slate-500">
                Progress Reports
              </p>
            </div>

            <div className="min-w-0 rounded-lg bg-slate-50 p-4">
              <p className="text-xl font-bold text-slate-900 sm:text-2xl">
                12
              </p>

              <p className="mt-1 break-words text-sm text-slate-500">
                Scouting Reports
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* =========================================
          COMMERCIAL OPERATIONS
      ========================================== */}

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-bold text-slate-900">Commercial Operations</h2>
            <p className="mt-1 text-sm text-slate-500">Academy shop inventory, merchandise orders and match ticket activity.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link to="/admin/shop" className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-green-300 hover:text-green-700"><ShoppingBag size={16} /> Manage Shop</Link>
            <Link to="/admin/tickets" className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700"><Ticket size={16} /> Manage Tickets</Link>
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <CommercialStat label="Shop Products" value={String(shopProducts.length)} icon={<ShoppingBag size={18} />} />
          <CommercialStat label="Shop Revenue" value={formatNaira(shopRevenue)} icon={<WalletCards size={18} />} />
          <CommercialStat label="Ticket Events" value={String(ticketEvents.length)} icon={<Ticket size={18} />} />
          <CommercialStat label="Ticket Revenue" value={formatNaira(ticketRevenue)} icon={<CircleDollarSign size={18} />} />
        </div>
      </section>
    </div>
  );
}

function CommercialStat({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
  return (
    <div className="min-w-0 rounded-xl bg-slate-50 p-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-green-600 shadow-sm">{icon}</div>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 break-words text-xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

export default AdminDashboard;