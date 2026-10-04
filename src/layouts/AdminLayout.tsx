import {
  useEffect,
  useState,
} from "react";

import {
  Bell,
  Menu,
  Search,
  X,
} from "lucide-react";

import {
  Outlet,
  useLocation,
} from "react-router";

import AdminSidebar from "../components/layout/AdminSidebar";

import {
  getCurrentUser,
} from "../services/authService";

function AdminLayout() {
  const currentUser =
    getCurrentUser();

  const location =
    useLocation();

  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);

  /*
    Close the mobile sidebar whenever
    navigation changes.
  */
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-dvh w-full overflow-x-hidden bg-slate-100">
      {/* ==================================================
          DESKTOP SIDEBAR
      ================================================== */}

      <aside
        className="
          fixed
          inset-y-0
          left-0
          z-40
          hidden
          w-64
          lg:block
        "
      >
        <AdminSidebar />
      </aside>

      {/* ==================================================
          MOBILE OVERLAY
      ================================================== */}

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() =>
            setSidebarOpen(false)
          }
          className="
            fixed
            inset-0
            z-40
            bg-slate-950/60
            backdrop-blur-[1px]
            lg:hidden
          "
        />
      )}

      {/* ==================================================
          MOBILE SIDEBAR
      ================================================== */}

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
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <AdminSidebar />

        {/* CLOSE BUTTON */}

        <button
          type="button"
          aria-label="Close menu"
          onClick={() =>
            setSidebarOpen(false)
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

      {/* ==================================================
          MAIN APPLICATION
      ================================================== */}

      <div
        className="
          min-h-dvh
          min-w-0
          lg:ml-64
        "
      >
        {/* ==================================================
            HEADER
        ================================================== */}

        <header
          className="
            sticky
            top-0
            z-30
            border-b
            border-slate-200
            bg-white/95
            backdrop-blur
          "
        >
          {/* TOP HEADER */}

          <div
            className="
              flex
              min-h-[64px]
              w-full
              min-w-0
              items-center
              gap-3
              px-4
              sm:px-6
              lg:h-20
              lg:px-8
            "
          >
            {/* MOBILE MENU BUTTON */}

            <button
              type="button"
              aria-label="Open navigation"
              onClick={() =>
                setSidebarOpen(true)
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
                transition
                hover:bg-slate-50
                lg:hidden
              "
            >
              <Menu size={21} />
            </button>

            {/* DESKTOP SEARCH */}

            <div
              className="
                relative
                hidden
                w-full
                max-w-md
                md:block
              "
            >
              <Search
                size={18}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="search"
                placeholder="Search players, teams, shop, tickets..."
                className="
                  w-full
                  rounded-lg
                  border
                  border-slate-200
                  bg-slate-50
                  py-2.5
                  pl-10
                  pr-4
                  text-sm
                  outline-none
                  transition

                  focus:border-green-500
                  focus:bg-white
                  focus:ring-2
                  focus:ring-green-100
                "
              />
            </div>

            {/* MOBILE TITLE */}

            <div
              className="
                min-w-0
                flex-1
                md:hidden
              "
            >
              <p
                className="
                  truncate
                  text-sm
                  font-bold
                  text-slate-900
                "
              >
                Elite Academy
              </p>

              <p
                className="
                  truncate
                  text-xs
                  text-slate-500
                "
              >
                Administrator Portal
              </p>
            </div>

            {/* RIGHT HEADER SECTION */}

            <div
              className="
                ml-auto
                flex
                shrink-0
                items-center
                gap-2
                sm:gap-3
                lg:gap-4
              "
            >
              {/* NOTIFICATION */}

              <button
                type="button"
                aria-label="Notifications"
                className="
                  relative
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-lg
                  text-slate-500
                  transition

                  hover:bg-slate-100
                  hover:text-slate-700
                "
              >
                <Bell size={21} />

                <span
                  className="
                    absolute
                    right-2
                    top-2
                    h-2
                    w-2
                    rounded-full
                    bg-red-500
                    ring-2
                    ring-white
                  "
                />
              </button>

              {/* SEPARATOR */}

              <div
                className="
                  hidden
                  h-8
                  w-px
                  bg-slate-200
                  sm:block
                "
              />

              {/* CURRENT USER */}

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
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-slate-900
                    text-sm
                    font-semibold
                    text-white
                    sm:h-10
                    sm:w-10
                  "
                >
                  {currentUser?.name
                    ?.charAt(0)
                    ?.toUpperCase() ??
                    "A"}
                </div>

                <div
                  className="
                    hidden
                    min-w-0
                    sm:block
                  "
                >
                  <p
                    className="
                      max-w-[160px]
                      truncate
                      text-sm
                      font-semibold
                      text-slate-800
                    "
                  >
                    {currentUser?.name ??
                      "Administrator"}
                  </p>

                  <p
                    className="
                      max-w-[160px]
                      truncate
                      text-xs
                      capitalize
                      text-slate-500
                    "
                  >
                    {currentUser?.role
                      ? currentUser.role.replace(
                          "-",
                          " ",
                        )
                      : "administrator"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ==================================================
              MOBILE SEARCH
          ================================================== */}

          <div
            className="
              border-t
              border-slate-100
              px-4
              py-3
              md:hidden
            "
          >
            <div className="relative w-full">
              <Search
                size={17}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="search"
                placeholder="Search players, teams..."
                className="
                  w-full
                  min-w-0
                  rounded-lg
                  border
                  border-slate-200
                  bg-slate-50
                  py-2.5
                  pl-10
                  pr-3
                  text-base
                  outline-none
                  transition

                  focus:border-green-500
                  focus:bg-white
                  focus:ring-2
                  focus:ring-green-100
                "
              />
            </div>
          </div>
        </header>

        {/* ==================================================
            PAGE CONTENT
        ================================================== */}

        <main
          className="
            min-w-0
            overflow-x-hidden
            px-4
            py-5
            sm:px-6
            sm:py-6
            lg:px-8
            lg:py-8
          "
        >
          <div
            className="
              mx-auto
              w-full
              max-w-7xl
              min-w-0
            "
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;