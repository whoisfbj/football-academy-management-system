import { useState } from "react";
import type { FormEvent } from "react";

import {
  Navigate,
  useNavigate,
} from "react-router";

import { ShieldCheck } from "lucide-react";

import {
  getCurrentUser,
  getHomeRoute,
  login,
} from "../../services/authService";

function LoginPage() {
  const navigate = useNavigate();

  const currentUser = getCurrentUser();

  const [email, setEmail] = useState(
    "admin@academy.com",
  );

  const [password, setPassword] = useState(
    "admin123",
  );

  const [error, setError] = useState("");

  if (currentUser) {
    return (
      <Navigate
        to={getHomeRoute(currentUser.role)}
        replace
      />
    );
  }

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError("");

    const user = login(email, password);

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    navigate(getHomeRoute(user.role));
  };

  return (
    <div className="min-h-screen bg-slate-100 lg:grid lg:grid-cols-2">
      {/* LEFT SIDE */}

      <section className="hidden bg-slate-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600">
            <ShieldCheck size={27} />
          </div>

          <div>
            <h1 className="text-xl font-bold">
              Elite Football Academy
            </h1>

            <p className="text-sm text-slate-400">
              Academy Management System
            </p>
          </div>
        </div>

        <div className="max-w-xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-green-400">
            Develop. Manage. Perform.
          </p>

          <h2 className="text-5xl font-bold leading-tight">
            Building the next generation of football talent.
          </h2>

          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">
            Manage players, academy teams, coaches,
            attendance, development, payments and
            performance from one platform.
          </p>
        </div>

        <p className="text-sm text-slate-500">
          Football Academy Management System
        </p>
      </section>

      {/* LOGIN */}

      <section className="flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-white">
              <ShieldCheck size={26} />
            </div>

            <h1 className="text-2xl font-bold">
              Elite Football Academy
            </h1>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900">
                Welcome back
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Sign in to your academy account.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  required
                />
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700"
              >
                Sign In
              </button>
            </form>

            <div className="mt-7 rounded-lg bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Prototype Administrator
              </p>

              <p className="mt-2 text-sm text-slate-600">
                admin@academy.com
              </p>

              <p className="text-sm text-slate-600">
                admin123
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;