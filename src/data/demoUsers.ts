import type { DemoUser } from "../shared/types/auth";

export const demoUsers: DemoUser[] = [
  {
    id: "admin-001",
    name: "Academy Administrator",
    email: "admin@academy.com",
    password: "admin123",
    role: "administrator",
  },
  {
    id: "technical-001",
    name: "Technical Director",
    email: "technical@academy.com",
    password: "technical123",
    role: "technical-director",
  },
  {
    id: "sports-001",
    name: "Sports Director",
    email: "sports@academy.com",
    password: "sports123",
    role: "sports-director",
  },
  {
    id: "coach-001",
    name: "Coach Michael Johnson",
    email: "coach@academy.com",
    password: "coach123",
    role: "coach",
  },
  {
    id: "parent-001",
    name: "Mr. Adeyemi",
    email: "parent@academy.com",
    password: "parent123",
    role: "parent",
  },
];