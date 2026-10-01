export type TournamentStatus =
  | "Upcoming"
  | "Ongoing"
  | "Completed"
  | "Cancelled";

export interface Tournament {
  id: string;
  name: string;
  teamName: string;
  ageCategory: string;

  startDate: string;
  endDate: string;

  venue: string;
  city: string;

  organizer: string;

  reportingTime?: string;

  opponents?: string[];

  notes?: string;

  status: TournamentStatus;

  createdAt: string;
}