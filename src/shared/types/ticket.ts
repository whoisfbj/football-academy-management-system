import type { PaymentMethod } from "./shop";

export type TicketEventStatus =
  | "Upcoming"
  | "Sales Open"
  | "Sold Out"
  | "Completed";

export interface TicketType {
  id: string;
  name: string;
  description: string;
  price: number;
  availableQuantity: number;
}

export interface TicketEvent {
  id: string;
  eventCode: string;
  title: string;
  homeTeam: string;
  awayTeam: string;
  competition: string;
  date: string;
  kickoffTime: string;
  venue: string;
  description: string;
  status: TicketEventStatus;
  featured: boolean;
  ticketTypes: TicketType[];
  createdAt: string;
}

export interface TicketOrder {
  id: string;
  orderNumber: string;
  eventId: string;
  eventTitle: string;
  buyerName: string;
  email: string;
  phone: string;
  ticketTypeId: string;
  ticketTypeName: string;
  quantity: number;
  unitPrice: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: "Paid";
  status: "Confirmed" | "Cancelled";
  ticketCodes: string[];
  purchasedAt: string;
}
