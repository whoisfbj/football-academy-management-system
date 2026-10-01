import {
  useState,
} from "react";

import {
  Menu,
  X,
} from "lucide-react";

import {
  Outlet,
} from "react-router";

import ParentPlayerSwitcher from "../components/parent/ParentPlayerSwitcher";

import ParentSidebar from "../components/parent/ParentSidebar";

import {
  getPrimaryLinkedPlayer,
  setSelectedLinkedPlayerId,
} from "../services/parentService";

function ParentLayout() {
  const [
    mobileSidebarOpen,
    setMobileSidebarOpen,
  ] = useState(false);

  const initialPlayer =
    getPrimaryLinkedPlayer();

  const [
    selectedPlayerId,
    setSelectedPlayerIdState,
  ] = useState(
    initialPlayer?.id ?? "",
  );

  function handlePlayerChange(
    playerId: string,
  ) {
    const success =
      setSelectedLinkedPlayerId(
        playerId,
      );

    if (!success) {
      return;
    }

    /*
     * Updating this state changes the
     * Outlet key below.
     *
     * That remounts the current parent
     * page, causing it to load data for
     * the newly selected player.
     */
    setSelectedPlayerIdState(
      playerId,
    );
  }

  function closeMobileSidebar() {
    setMobileSidebarOpen(false);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* =========================================
          DESKTOP SIDEBAR
      ========================================== */}

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 lg:block">
        <ParentSidebar />
      </aside>

      {/* =========================================
          MOBILE SIDEBAR OVERLAY
      ========================================== */}

      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
          onClick={
            closeMobileSidebar
          }
        />
      )}

      {/* =========================================
          MOBILE SIDEBAR
      ========================================== */}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-slate-950 transition-transform duration-200 lg:hidden ${
          mobileSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <div className="absolute right-3 top-3 z-50">
          <button
            type="button"
            onClick={
              closeMobileSidebar
            }
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20"
            aria-label="Close menu"
          >
            <X size={19} />
          </button>
        </div>

        <ParentSidebar />
      </aside>

      {/* =========================================
          MAIN CONTENT
      ========================================== */}

      <div className="min-h-screen lg:ml-64">
        {/* MOBILE HEADER */}

        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() =>
                setMobileSidebarOpen(
                  true,
                )
              }
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-slate-900">
                Elite Academy
              </p>

              <p className="truncate text-xs text-slate-500">
                Parent / Guardian Portal
              </p>
            </div>
          </div>
        </header>

        {/* PLAYER SWITCHER */}

        <div className="border-b border-slate-200 bg-white px-5 py-4 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-md">
              <ParentPlayerSwitcher
                selectedPlayerId={
                  selectedPlayerId
                }
                onPlayerChange={
                  handlePlayerChange
                }
              />
            </div>
          </div>
        </div>

        {/* PAGE */}

        <main>
          <Outlet
            key={
              selectedPlayerId ||
              "no-linked-player"
            }
          />
        </main>
      </div>
    </div>
  );
}

export default ParentLayout;