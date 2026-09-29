export type UserRole =
  | "administrator"
  | "technical-director"
  | "sports-director"
  | "coach"
  | "parent";

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}