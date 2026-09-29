export type CommunicationChannel =
  | "SMS"
  | "Email"
  | "WhatsApp"
  | "Push Notification";

export type CommunicationAudience =
  | "All"
  | "Players"
  | "Parents"
  | "Coaches"
  | "Staff";

export interface AcademyMessage {
  id: string;
  title: string;
  message: string;
  channel: CommunicationChannel;
  audience: CommunicationAudience;
  createdAt: string;
}