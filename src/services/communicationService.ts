import type {
  AcademyMessage,
} from "../shared/types/communication";

const KEY =
  "academy_messages";

const demoMessages: AcademyMessage[] = [
  {
    id: "message-001",
    title:
      "Weekend Training",
    message:
      "Saturday training begins at 9:00 AM.",
    channel:
      "Push Notification",
    audience: "All",
    createdAt:
      "2026-09-28T08:00:00.000Z",
  },
  {
    id: "message-002",
    title:
      "Monthly Fee Reminder",
    message:
      "Parents are reminded to clear outstanding academy fees.",
    channel: "Email",
    audience: "Parents",
    createdAt:
      "2026-09-27T10:00:00.000Z",
  },
];

export function getMessages(): AcademyMessage[] {
  if (
    !localStorage.getItem(
      KEY,
    )
  ) {
    localStorage.setItem(
      KEY,
      JSON.stringify(
        demoMessages,
      ),
    );
  }

  return JSON.parse(
    localStorage.getItem(
      KEY,
    ) || "[]",
  );
}

export function addMessage(
  message: AcademyMessage,
) {
  localStorage.setItem(
    KEY,
    JSON.stringify([
      ...getMessages(),
      message,
    ]),
  );
}