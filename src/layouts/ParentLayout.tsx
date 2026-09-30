import { Menu, Trophy, X } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router";

import ParentSidebar from "../components/parent/ParentSidebar";

function ParentLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* DESKTOP SIDEBAR */}
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">
        <ParentSidebar />
      </div>

      {/* MOBILE HEADER */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 lg:hidden">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-600 text-white">
            <Trophy size={18} />
          </div>

          <div>
            <p className="text-sm font-bold text-slate-900">
              Elite Academy
            </p>

            <p className="text-xs text-slate-500">
              Parent Portal
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            setMobileSidebarOpen(true)
          }
          className="rounded-lg border border-slate-200 p-2 text-slate-700"
        >
          <Menu size={21} />
        </button>
      </header>

      {/* MOBILE OVERLAY */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() =>
              setMobileSidebarOpen(false)
            }
            className="absolute inset-0 bg-slate-950/60"
          />

          <div className="relative h-full w-64">
            <ParentSidebar />

            <button
              type="button"
              onClick={() =>
                setMobileSidebarOpen(false)
              }
              className="absolute right-3 top-3 rounded-lg bg-slate-900 p-2 text-white"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* PAGE CONTENT */}
      <div className="min-w-0 lg:ml-64">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default ParentLayout;