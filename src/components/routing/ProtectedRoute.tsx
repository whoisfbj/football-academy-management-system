import { Navigate, Outlet } from "react-router";

import {
  getCurrentUser,
  getHomeRoute,
} from "../../services/authService";

import type { UserRole } from "../../shared/types/auth";

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
}

function ProtectedRoute({
  allowedRoles,
}: ProtectedRouteProps) {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(currentUser.role)) {
    return (
      <Navigate
        to={getHomeRoute(currentUser.role)}
        replace
      />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;