import {
  Bell,
  CalendarDays,
  ClipboardCheck,
  Clock3,
  CreditCard,
  FileText,
  Gauge,
  LogOut,
  Megaphone,
  Settings,
  ShoppingBag,
  Ticket,
  Trophy,
  UserRoundCog,
  Users,
  UsersRound,
  WalletCards,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
} from "react-router";

import {
  logout,
} from "../../services/authService";

const menuItems = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: Gauge,
  },
  {
    label: "Players",
    path: "/admin/players",
    icon: Users,
  },
  {
    label: "Pending Registrations",
    path: "/admin/players/pending",
    icon: Clock3,
  },
  {
    label: "Academy Teams",
    path: "/admin/teams",
    icon: UsersRound,
  },
  {
    label: "Coaches",
    path: "/admin/coaches",
    icon: UserRoundCog,
  },
  {
    label: "Attendance",
    path: "/admin/attendance",
    icon: ClipboardCheck,
  },
  {
    label: "Training Sessions",
    path: "/admin/sessions",
    icon: CalendarDays,
  },
  {
    label: "Player Development",
    path: "/admin/development",
    icon: Trophy,
  },
  {
    label: "Finance",
    path: "/admin/finance",
    icon: CreditCard,
  },
  {
    label: "Finance Records",
    path: "/admin/finance/records",
    icon: WalletCards,
  },
  {
    label: "Academy Shop",
    path: "/admin/shop",
    icon: ShoppingBag,
  },
  {
    label: "Match Tickets",
    path: "/admin/tickets",
    icon: Ticket,
  },
  {
    label: "Communication",
    path: "/admin/communication",
    icon: Megaphone,
  },
  {
    label: "Reports",
    path: "/admin/reports",
    icon: FileText,
  },
  {
    label: "Announcements",
    path: "/admin/announcements",
    icon: Bell,
  },
  {
    label: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

function AdminSidebar() {
  const navigate =
    useNavigate();

  const handleLogout = () => {
    logout();

    navigate(
      "/login",
      {
        replace: true,
      },
    );
  };

  return (
    <div
      className="
        flex
        h-full
        min-h-0
        w-full
        flex-col
        overflow-hidden
        bg-slate-950
        text-white
      "
    >
      {/* =====================================
          ACADEMY BRANDING
      ====================================== */}

      <div
        className="
          shrink-0
          border-b
          border-white/10
          px-4
          py-5
          sm:px-5
          lg:px-6
          lg:py-6
        "
      >
        <div
          className="
            flex
            min-w-0
            items-center
            gap-3
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-green-600
              font-bold
              text-white
            "
          >
            FA
          </div>

          <div className="min-w-0">
            <h1
              className="
                truncate
                font-bold
              "
            >
              Elite Academy
            </h1>

            <p
              className="
                mt-0.5
                truncate
                text-xs
                text-slate-400
              "
            >
              Management System
            </p>
          </div>
        </div>
      </div>

      {/* =====================================
          NAVIGATION
      ====================================== */}

      <nav
        className="
          min-h-0
          flex-1
          overflow-y-auto
          overscroll-contain
          px-3
          py-4
          lg:py-5
        "
      >
        <p
          className="
            mb-3
            px-3
            text-xs
            font-semibold
            uppercase
            tracking-wider
            text-slate-500
          "
        >
          Academy Management
        </p>

        <div className="space-y-1">
          {menuItems.map(
            (item) => {
              const Icon =
                item.icon;

              return (
                <NavLink
                  key={
                    item.path
                  }
                  to={item.path}
                  className={({
                    isActive,
                  }) =>
                    [
                      `
                        flex
                        min-w-0
                        items-center
                        gap-3
                        rounded-lg
                        px-3
                        py-2.5
                        text-sm
                        font-medium
                        transition
                      `,
                      isActive
                        ? `
                            bg-green-600
                            text-white
                            shadow-sm
                          `
                        : `
                            text-slate-300
                            hover:bg-white/10
                            hover:text-white
                          `,
                    ].join(
                      " ",
                    )
                  }
                >
                  <Icon
                    size={
                      19
                    }
                    className="shrink-0"
                  />

                  <span
                    className="
                      min-w-0
                      truncate
                    "
                  >
                    {
                      item.label
                    }
                  </span>
                </NavLink>
              );
            },
          )}
        </div>
      </nav>

      {/* =====================================
          LOGOUT
      ====================================== */}

      <div
        className="
          shrink-0
          border-t
          border-white/10
          p-3
        "
      >
        <button
          type="button"
          onClick={
            handleLogout
          }
          className="
            flex
            w-full
            min-w-0
            items-center
            gap-3
            rounded-lg
            px-3
            py-3
            text-sm
            font-medium
            text-slate-300
            transition

            hover:bg-red-500/10
            hover:text-red-300
          "
        >
          <LogOut
            size={19}
            className="shrink-0"
          />

          <span className="truncate">
            Logout
          </span>
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;