import { demoUsers } from "../data/demoUsers";
import type {
  SessionUser,
  UserRole,
} from "../shared/types/auth";

const CURRENT_USER_KEY = "academy_current_user";

export function login(
  email: string,
  password: string,
): SessionUser | null {
  const user = demoUsers.find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() &&
      user.password === password,
  );

  if (!user) {
    return null;
  }

  const sessionUser: SessionUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify(sessionUser),
  );

  return sessionUser;
}

export function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function getCurrentUser(): SessionUser | null {
  const savedUser = localStorage.getItem(CURRENT_USER_KEY);

  if (!savedUser) {
    return null;
  }

  try {
    return JSON.parse(savedUser) as SessionUser;
  } catch {
    localStorage.removeItem(CURRENT_USER_KEY);
    return null;
  }
}

export function getHomeRoute(role: UserRole) {
  switch (role) {
    case "administrator":
      return "/admin/dashboard";

    case "technical-director":
      return "/technical-director";

    case "sports-director":
      return "/sports-director";

    case "coach":
      return "/coach";

    case "parent":
      return "/parent";

    default:
      return "/login";
  }
}