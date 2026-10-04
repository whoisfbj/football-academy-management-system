import type { ReactNode } from "react";
import { useState } from "react";
import { ArrowLeft, CalendarDays, Clock3, MapPin, Minus, Plus, Ticket } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { StatusBadge, TicketVisual, formatNaira } from "../../components/commerce/CommerceUI";
import { getTicketEventById } from "../../services/ticketService";

function TicketEventPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const event = eventId ? getTicketEventById(eventId) : undefined;
  const [ticketTypeId, setTicketTypeId] = useState(() => event?.ticketTypes[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);

  if (!event) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Event not found</h1>
        <Link to="/tickets" className="mt-6 inline-flex rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white">View Match Tickets</Link>
      </div>
    );
  }

  const safeEvent = event;
  const selectedType = safeEvent.ticketTypes.find((type) => type.id === ticketTypeId) ?? safeEvent.ticketTypes[0];
  const salesOpen = event.status === "Sales Open" && Boolean(selectedType);
  const maxQuantity = selectedType ? Math.max(1, Math.min(10, selectedType.availableQuantity)) : 1;

  function continueToCheckout() {
    if (!selectedType || !salesOpen || selectedType.availableQuantity <= 0) {
      return;
    }

    navigate(`/tickets/${safeEvent.id}/checkout?type=${selectedType.id}&qty=${quantity}`);
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
      <Link to="/tickets" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-green-600">
        <ArrowLeft size={17} /> Back to Tickets
      </Link>

      <div className="mt-6 grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <TicketVisual event={event} />

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={event.status} />
            <span className="text-xs font-semibold text-slate-400">{event.eventCode}</span>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-slate-950 sm:text-3xl">{event.title}</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">{event.description}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Info icon={<CalendarDays size={18} />} label="Date" value={formatDate(event.date)} />
            <Info icon={<Clock3 size={18} />} label="Kickoff" value={formatTime(event.kickoffTime)} />
            <Info icon={<MapPin size={18} />} label="Venue" value={event.venue} />
          </div>

          <div className="mt-7">
            <h2 className="font-bold text-slate-900">Choose Ticket Type</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {event.ticketTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  disabled={type.availableQuantity <= 0}
                  onClick={() => {
                    setTicketTypeId(type.id);
                    setQuantity(1);
                  }}
                  className={[
                    "rounded-xl border p-4 text-left transition disabled:cursor-not-allowed disabled:opacity-50",
                    ticketTypeId === type.id
                      ? "border-green-500 bg-green-50 ring-2 ring-green-100"
                      : "border-slate-200 hover:border-slate-300",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-slate-900">{type.name}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">{type.description}</p>
                    </div>
                    <Ticket size={18} className="shrink-0 text-green-600" />
                  </div>
                  <div className="mt-4 flex items-end justify-between gap-3">
                    <p className="font-bold text-slate-950">{formatNaira(type.price)}</p>
                    <p className="text-xs text-slate-400">{type.availableQuantity} left</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {selectedType && (
            <div className="mt-7 flex flex-col gap-4 rounded-xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800">Quantity</p>
                <div className="mt-2 inline-flex items-center rounded-lg border border-slate-200 bg-white">
                  <button type="button" onClick={() => setQuantity((current) => Math.max(1, current - 1))} className="flex h-9 w-9 items-center justify-center text-slate-500" aria-label="Decrease quantity"><Minus size={15} /></button>
                  <span className="min-w-9 text-center text-sm font-bold">{quantity}</span>
                  <button type="button" onClick={() => setQuantity((current) => Math.min(maxQuantity, current + 1))} className="flex h-9 w-9 items-center justify-center text-slate-500" aria-label="Increase quantity"><Plus size={15} /></button>
                </div>
              </div>
              <div className="sm:text-right">
                <p className="text-xs text-slate-400">Total</p>
                <p className="mt-1 text-xl font-bold text-slate-950">{formatNaira(selectedType.price * quantity)}</p>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={continueToCheckout}
            disabled={!salesOpen || !selectedType || selectedType.availableQuantity <= 0}
            className="mt-6 w-full rounded-lg bg-green-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {salesOpen ? "Continue to Checkout" : "Ticket Sales Not Open"}
          </button>
        </section>
      </div>
    </div>
  );
}

function Info({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-3">
      <span className="text-green-600">{icon}</span>
      <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 break-words text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}

function formatDate(value: string) {
  return new Date(`${value}T12:00:00`).toLocaleDateString("en-NG", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatTime(value: string) {
  const [hours, minutes] = value.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date.toLocaleTimeString("en-NG", { hour: "numeric", minute: "2-digit" });
}

export default TicketEventPage;
