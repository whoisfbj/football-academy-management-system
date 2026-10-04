import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import {
  Menu,
  ShoppingBag,
  ShoppingCart,
  Ticket,
  Trophy,
  X,
} from "lucide-react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import { getCurrentUser, getHomeRoute } from "../services/authService";
import { getCartCount } from "../services/shopService";

function CommerceLayout() {
  const location = useLocation();
  const currentUser = getCurrentUser();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(() => getCartCount());

  useEffect(() => {
    setMobileOpen(false);
    setCartCount(getCartCount());
  }, [location.pathname]);

  useEffect(() => {
    const refreshCart = () => setCartCount(getCartCount());
    window.addEventListener("academy-cart-updated", refreshCart);
    return () => window.removeEventListener("academy-cart-updated", refreshCart);
  }, []);

  const accountPath = currentUser ? getHomeRoute(currentUser.role) : "/login";

  return (
    <div className="min-h-dvh w-full overflow-x-hidden bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-600 text-white">
              <Trophy size={20} />
            </div>
            <div className="hidden min-w-0 sm:block">
              <p className="truncate font-bold text-slate-950">Elite Academy</p>
              <p className="truncate text-xs text-slate-500">Official Store & Tickets</p>
            </div>
          </Link>

          <nav className="ml-4 hidden items-center gap-1 md:flex">
            <CommerceNavLink to="/shop" icon={<ShoppingBag size={17} />} label="Shop" />
            <CommerceNavLink to="/tickets" icon={<Ticket size={17} />} label="Match Tickets" />
            <CommerceNavLink to="/orders" label="My Orders" />
            <CommerceNavLink to="/my-tickets" label="My Tickets" />
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <Link
              to="/cart"
              className="relative flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:border-green-300 hover:text-green-700"
            >
              <ShoppingCart size={18} />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="flex min-w-5 items-center justify-center rounded-full bg-green-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              to={accountPath}
              className="hidden rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 sm:inline-flex"
            >
              {currentUser ? "My Portal" : "Sign In"}
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-2">
              <MobileLink to="/shop" label="Academy Shop" />
              <MobileLink to="/tickets" label="Match Tickets" />
              <MobileLink to="/orders" label="My Orders" />
              <MobileLink to="/my-tickets" label="My Tickets" />
              <MobileLink
                to={accountPath}
                label={currentUser ? "Return to My Portal" : "Sign In"}
              />
            </div>
          </div>
        )}
      </header>

      <main className="min-w-0">
        <Outlet />
      </main>

      <footer className="mt-16 border-t border-slate-200 bg-white">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <p className="font-bold text-slate-950">Elite Academy</p>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Official academy merchandise and match ticketing for players, families and supporters.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Quick Links</p>
            <div className="mt-3 space-y-2 text-sm text-slate-500">
              <Link className="block hover:text-green-600" to="/shop">Academy Shop</Link>
              <Link className="block hover:text-green-600" to="/tickets">Match Tickets</Link>
              <Link className="block hover:text-green-600" to="/">Academy Home</Link>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Prototype Checkout</p>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Card, bank transfer and USSD are simulated in this prototype. No real payment is processed.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CommerceNavLink({
  to,
  icon,
  label,
}: {
  to: string;
  icon?: ReactNode;
  label: string;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition",
          isActive
            ? "bg-green-50 text-green-700"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
        ].join(" ")
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}

function MobileLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
    >
      {label}
    </Link>
  );
}

export default CommerceLayout;
