import {
  Bell,
  Search,
} from "lucide-react";

import { Outlet } from "react-router";

import AdminSidebar from "../components/layout/AdminSidebar";

import { getCurrentUser } from "../services/authService";

function AdminLayout() {
  const currentUser = getCurrentUser();

  return (
    <div className="min-h-screen bg-slate-100">
  <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">
    <AdminSidebar />
  </div>

  <div className="min-w-0 lg:ml-64">
        <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6">
          <div className="relative hidden w-full max-w-md sm:block">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              placeholder="Search players, teams, coaches..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div className="ml-auto flex items-center gap-4">
            <button className="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100">
              <Bell size={21} />

              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <div className="hidden h-8 w-px bg-slate-200 sm:block" />

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 font-semibold text-white">
                {currentUser?.name.charAt(0) ?? "A"}
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-slate-800">
                  {currentUser?.name}
                </p>

                <p className="text-xs capitalize text-slate-500">
                  {currentUser?.role.replace("-", " ")}
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;