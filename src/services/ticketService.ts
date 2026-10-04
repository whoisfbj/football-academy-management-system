import { demoTicketEvents } from "../data/demoTickets";
import type {
  TicketEvent,
  TicketOrder,
} from "../shared/types/ticket";

const EVENTS_KEY = "academy_ticket_events";
const ORDERS_KEY = "academy_ticket_orders";

function initializeTicketData() {
  if (!localStorage.getItem(EVENTS_KEY)) {
    localStorage.setItem(EVENTS_KEY, JSON.stringify(demoTicketEvents));
  }

  if (!localStorage.getItem(ORDERS_KEY)) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify([]));
  }
}

function parseStorage<T>(key: string): T[] {
  initializeTicketData();

  try {
    return JSON.parse(localStorage.getItem(key) || "[]") as T[];
  } catch {
    return [];
  }
}

function saveEvents(events: TicketEvent[]) {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
}

export function getTicketEvents(): TicketEvent[] {
  return parseStorage<TicketEvent>(EVENTS_KEY).sort((a, b) => {
    const first = new Date(`${a.date}T${a.kickoffTime}`).getTime();
    const second = new Date(`${b.date}T${b.kickoffTime}`).getTime();
    return first - second;
  });
}

export function getTicketEventById(id: string) {
  return getTicketEvents().find(
    (event) => event.id === id || event.eventCode === id,
  );
}

export function addTicketEvent(event: TicketEvent) {
  saveEvents([...getTicketEvents(), event]);
}

export function updateTicketEvent(event: TicketEvent) {
  saveEvents(
    getTicketEvents().map((current) =>
      current.id === event.id ? event : current,
    ),
  );
}

export function deleteTicketEvent(id: string) {
  saveEvents(getTicketEvents().filter((event) => event.id !== id));
}

export function getTicketOrders(): TicketOrder[] {
  return parseStorage<TicketOrder>(ORDERS_KEY).sort(
    (a, b) =>
      new Date(b.purchasedAt).getTime() - new Date(a.purchasedAt).getTime(),
  );
}

export function getTicketOrderById(id: string) {
  return getTicketOrders().find(
    (order) => order.id === id || order.orderNumber === id,
  );
}

export function purchaseTickets(input: {
  eventId: string;
  ticketTypeId: string;
  quantity: number;
  buyerName: string;
  email: string;
  phone: string;
  paymentMethod: TicketOrder["paymentMethod"];
}): TicketOrder {
  const events = getTicketEvents();
  const event = events.find((current) => current.id === input.eventId);

  if (!event) {
    throw new Error("The selected event could not be found.");
  }

  if (event.status !== "Sales Open") {
    throw new Error("Ticket sales are not currently open for this event.");
  }

  const ticketType = event.ticketTypes.find(
    (current) => current.id === input.ticketTypeId,
  );

  if (!ticketType) {
    throw new Error("The selected ticket type could not be found.");
  }

  if (input.quantity < 1 || input.quantity > ticketType.availableQuantity) {
    throw new Error("The requested ticket quantity is not available.");
  }

  const currentOrders = getTicketOrders();
  const sequence = currentOrders.length + 1;
  const year = new Date().getFullYear();
  const orderNumber = `TKT-${year}-${String(sequence).padStart(4, "0")}`;
  const ticketCodes = Array.from({ length: input.quantity }, (_, index) =>
    `${orderNumber}-${String(index + 1).padStart(2, "0")}`,
  );

  const order: TicketOrder = {
    id: `ticket-order-${Date.now()}`,
    orderNumber,
    eventId: event.id,
    eventTitle: event.title,
    buyerName: input.buyerName.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    ticketTypeId: ticketType.id,
    ticketTypeName: ticketType.name,
    quantity: input.quantity,
    unitPrice: ticketType.price,
    total: ticketType.price * input.quantity,
    paymentMethod: input.paymentMethod,
    paymentStatus: "Paid",
    status: "Confirmed",
    ticketCodes,
    purchasedAt: new Date().toISOString(),
  };

  const updatedEvents = events.map((current) => {
    if (current.id !== event.id) {
      return current;
    }

    const ticketTypes = current.ticketTypes.map((currentType) =>
      currentType.id === ticketType.id
        ? {
            ...currentType,
            availableQuantity:
              currentType.availableQuantity - input.quantity,
          }
        : currentType,
    );

    const soldOut = ticketTypes.every(
      (currentType) => currentType.availableQuantity <= 0,
    );

    return {
      ...current,
      ticketTypes,
      status: soldOut ? "Sold Out" : current.status,
    } as TicketEvent;
  });

  saveEvents(updatedEvents);
  localStorage.setItem(ORDERS_KEY, JSON.stringify([...currentOrders, order]));

  return order;
}
