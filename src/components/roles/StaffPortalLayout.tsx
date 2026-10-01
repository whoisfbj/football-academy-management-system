import {
  useState,
} from "react";

import type {
  ReactNode,
} from "react";

import {
  LogOut,
  Menu,
  X,
} from "lucide-react";

import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router";

import {
  logout,
} from "../../services/authService";

export interface StaffNavigationItem {
  label: string;
  path: string;
  icon: ReactNode;
}

type StaffPortalLayoutProps = {
  title: string;
  subtitle: string;
  items: StaffNavigationItem[];
};

function StaffPortalLayout({
  title,
  subtitle,
  items,
}: StaffPortalLayoutProps) {
  const navigate =
    useNavigate();

  const [
    mobileOpen,
    setMobileOpen,
  ] = useState(false);

  function handleLogout() {
    logout();

    navigate(
      "/login",
      {
        replace: true,
      },
    );
  }

  const sidebar = (
    <div className="flex h-full flex-col bg-slate-950 text-white">
      <div className="border-b border-white/10 px-5 py-6">
        <p className="text-lg font-bold">
          Elite Academy
        </p>

        <p className="mt-1 text-xs text-slate-400">
          {subtitle}
        </p>
      </div>

      <div className="px-5 pt-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </p>
      </div>

      <nav className="mt-4 flex-1 space-y-1 px-3">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() =>
              setMobileOpen(false)
            }
            className={({
              isActive,
            }) =>
              `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-green-600 text-white"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            {item.icon}

            <span>
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 p-3">
        <button
          type="button"
          onClick={
            handleLogout
          }
          className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-red-500/10 hover:text-red-300"
        >
          <LogOut
            size={19}
          />

          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 lg:block">
        {sidebar}
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
          onClick={() =>
            setMobileOpen(false)
          }
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-200 lg:hidden ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {sidebar}

        <button
          type="button"
          onClick={() =>
            setMobileOpen(false)
          }
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white"
        >
          <X size={18} />
        </button>
      </aside>

      <div className="min-h-screen lg:ml-64">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                setMobileOpen(true)
              }
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200"
            >
              <Menu size={20} />
            </button>

            <div>
              <p className="font-bold text-slate-900">
                Elite Academy
              </p>

              <p className="text-xs text-slate-500">
                {subtitle}
              </p>
            </div>
          </div>
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default StaffPortalLayout;