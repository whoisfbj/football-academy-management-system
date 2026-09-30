import {
  Bell,
  CalendarDays,
  ClipboardCheck,
  CreditCard,
  FileText,
  LayoutDashboard,
  LogOut,
  Mail,
  ReceiptText,
  Trophy,
  UserRound,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router";
import { logout } from "../../services/authService";

const navigationItems = [
  {
    label: "Dashboard",
    path: "/parent/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Player",
    path: "/parent/player",
    icon: UserRound,
  },
  {
    label: "Attendance",
    path: "/parent/attendance",
    icon: ClipboardCheck,
  },
  {
    label: "Training Schedule",
    path: "/parent/schedule",
    icon: CalendarDays,
  },
  {
    label: "Payments & Fees",
    path: "/parent/payments",
    icon: CreditCard,
  },
  {
    label: "Receipts",
    path: "/parent/receipts",
    icon: ReceiptText,
  },
  {
    label: "Announcements",
    path: "/parent/announcements",
    icon: Bell,
  },
  {
    label: "Player Reports",
    path: "/parent/reports",
    icon: FileText,
  },
  {
    label: "Tournaments",
    path: "/parent/tournaments",
    icon: Trophy,
  },
  {
    label: "Contact Academy",
    path: "/parent/contact",
    icon: Mail,
  },
];

function ParentSidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <aside className="flex h-screen w-64 flex-col bg-slate-950 text-white">
      {/* LOGO */}
      <div className="border-b border-slate-800 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600">
            <Trophy size={22} />
          </div>

          <div>
            <h1 className="font-bold text-white">
              Elite Academy
            </h1>

            <p className="mt-1 text-xs text-slate-400">
              Parent / Guardian Portal
            </p>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Portal
        </p>

        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition",
                    isActive
                      ? "bg-green-600 text-white"
                      : "text-slate-300 hover:bg-slate-900 hover:text-white",
                  ].join(" ")
                }
              >
                <Icon size={18} />

                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* LOGOUT */}
      <div className="border-t border-slate-800 p-3">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut size={18} />

          Logout
        </button>
      </div>
    </aside>
  );
}

export default ParentSidebar;