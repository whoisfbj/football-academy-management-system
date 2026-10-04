import {
  useEffect,
  useState,
} from "react";

import {
  Menu,
  X,
} from "lucide-react";

import {
  Outlet,
  useLocation,
} from "react-router";

import ParentPlayerSwitcher from "../components/parent/ParentPlayerSwitcher";
import ParentSidebar from "../components/parent/ParentSidebar";

import {
  getPrimaryLinkedPlayer,
  setSelectedLinkedPlayerId,
} from "../services/parentService";

function ParentLayout() {
  const location = useLocation();

  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);

  const initialPlayer =
    getPrimaryLinkedPlayer();

  const [
    selectedPlayerId,
    setSelectedPlayerId,
  ] = useState(
    initialPlayer?.id ?? "",
  );

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  function changePlayer(
    playerId: string,
  ) {
    const success =
      setSelectedLinkedPlayerId(
        playerId,
      );

    if (!success) {
      return;
    }

    setSelectedPlayerId(
      playerId,
    );
  }

  return (
    <div className="min-h-dvh w-full overflow-x-hidden bg-slate-50">
      {/* ======================================
          DESKTOP SIDEBAR
      ======================================= */}

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 lg:block xl:w-72">
        <ParentSidebar />
      </aside>

      {/* ======================================
          MOBILE OVERLAY
      ======================================= */}

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() =>
            setSidebarOpen(
              false,
            )
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
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <ParentSidebar />

        <button
          type="button"
          onClick={() =>
            setSidebarOpen(
              false,
            )
          }
          aria-label="Close navigation"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-white/20"
        >
          <X size={19} />
        </button>
      </aside>

      {/* ======================================
          MAIN AREA
      ======================================= */}

      <div className="min-h-dvh min-w-0 lg:ml-64 xl:ml-72">
        {/* MOBILE HEADER */}

        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:px-6 lg:hidden">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() =>
                setSidebarOpen(
                  true,
                )
              }
              aria-label="Open navigation"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700"
            >
              <Menu size={20} />
            </button>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-slate-950">
                Elite Academy
              </p>

              <p className="truncate text-xs text-slate-500">
                Parent / Guardian Portal
              </p>
            </div>
          </div>
        </header>

        {/* PLAYER SWITCHER */}

        <div className="border-b border-slate-200 bg-white px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <div className="w-full sm:max-w-md">
              <ParentPlayerSwitcher
                selectedPlayerId={
                  selectedPlayerId
                }
                onPlayerChange={
                  changePlayer
                }
              />
            </div>
          </div>
        </div>

        {/* PAGE */}

        <main className="min-w-0 overflow-x-hidden">
          <Outlet
            key={
              selectedPlayerId ||
              "no-player"
            }
          />
        </main>
      </div>
    </div>
  );
}

export default ParentLayout;