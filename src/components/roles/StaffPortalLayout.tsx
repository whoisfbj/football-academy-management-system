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

  function closeSidebar() {
    setMobileOpen(false);
  }

  const sidebarContent = (
    <div className="flex h-full min-h-0 flex-col bg-slate-950 text-white">
      {/* LOGO */}

      <div className="shrink-0 border-b border-white/10 px-5 py-5">
        <p className="truncate text-lg font-bold">
          Elite Academy
        </p>

        <p className="mt-1 truncate text-xs text-slate-400">
          {subtitle}
        </p>
      </div>

      {/* ROLE */}

      <div className="shrink-0 px-5 pb-2 pt-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </p>
      </div>

      {/* MENU */}

      <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto px-3 pb-4">
        {items.map(
          (item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={
                closeSidebar
              }
              className={({
                isActive,
              }) =>
                `
                flex
                min-w-0
                items-center
                gap-3
                rounded-lg
                px-3
                py-3
                text-sm
                font-medium
                transition

                ${
                  isActive
                    ? "bg-green-600 text-white"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }
              `
              }
            >
              <span className="shrink-0">
                {item.icon}
              </span>

              <span className="truncate">
                {item.label}
              </span>
            </NavLink>
          ),
        )}
      </nav>

      {/* LOGOUT */}

      <div className="shrink-0 border-t border-white/10 p-3">
        <button
          type="button"
          onClick={
            handleLogout
          }
          className="
            flex
            w-full
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

          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-dvh w-full overflow-x-hidden bg-slate-50">
      {/* ======================================
          DESKTOP SIDEBAR
      ======================================= */}

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 lg:block xl:w-72">
        {sidebarContent}
      </aside>

      {/* ======================================
          MOBILE OVERLAY
      ======================================= */}

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={
            closeSidebar
          }
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-[1px] lg:hidden"
        />
      )}

      {/* ======================================
          MOBILE SIDEBAR
      ======================================= */}

      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-50
          w-[85vw]
          max-w-[300px]
          transform
          bg-slate-950
          shadow-2xl
          transition-transform
          duration-300
          ease-in-out
          lg:hidden

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {sidebarContent}

        <button
          type="button"
          aria-label="Close menu"
          onClick={
            closeSidebar
          }
          className="
            absolute
            right-3
            top-3
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            bg-white/10
            text-white
            transition
            hover:bg-white/20
          "
        >
          <X size={19} />
        </button>
      </aside>

      {/* ======================================
          CONTENT
      ======================================= */}

      <div className="min-h-dvh min-w-0 lg:ml-64 xl:ml-72">
        {/* MOBILE HEADER */}

        <header
          className="
            sticky
            top-0
            z-30
            flex
            min-h-[64px]
            items-center
            border-b
            border-slate-200
            bg-white/95
            px-4
            backdrop-blur
            sm:px-6
            lg:hidden
          "
        >
          <div className="flex w-full min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() =>
                setMobileOpen(
                  true,
                )
              }
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-lg
                border
                border-slate-200
                bg-white
                text-slate-700
              "
              aria-label="Open navigation"
            >
              <Menu size={20} />
            </button>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-slate-950">
                Elite Academy
              </p>

              <p className="truncate text-xs text-slate-500">
                {subtitle}
              </p>
            </div>
          </div>
        </header>

        {/* ROUTED PAGE */}

        <main className="min-w-0 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default StaffPortalLayout;