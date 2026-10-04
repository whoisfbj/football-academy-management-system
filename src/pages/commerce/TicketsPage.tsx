import type { ReactNode } from "react";
import { CalendarDays, Clock3, MapPin, Ticket } from "lucide-react";
import { Link } from "react-router";
import { StatusBadge, TicketVisual, formatNaira } from "../../components/commerce/CommerceUI";
import { getTicketEvents } from "../../services/ticketService";

function TicketsPage() {
  const events = getTicketEvents().filter((event) => event.status !== "Completed");

  return (
    <div>
      <section className="bg-slate-950 text-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1.5 text-sm font-semibold text-green-400">
            <Ticket size={16} /> Online Match Tickets
          </div>
          <h1 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Book your place at the next academy match.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            Browse upcoming academy fixtures, choose your ticket category and complete a simulated online purchase.
          </p>
        </div>
      </section>

      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {events.map((event) => {
            const lowestPrice = Math.min(...event.ticketTypes.map((type) => type.price));
            const available = event.ticketTypes.reduce((total, type) => total + type.availableQuantity, 0);

            return (
              <Link
                key={event.id}
                to={`/tickets/${event.id}`}
                className="grid min-w-0 gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-green-300 hover:shadow-md sm:grid-cols-[190px_1fr]"
              >
                <TicketVisual event={event} />
                <div className="min-w-0 py-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge status={event.status} />
                    <span className="text-xs font-semibold text-slate-400">{event.eventCode}</span>
                  </div>
                  <h2 className="mt-3 break-words text-lg font-bold text-slate-900">{event.title}</h2>
                  <div className="mt-4 space-y-2 text-sm text-slate-500">
                    <Meta icon={<CalendarDays size={16} />} text={formatDate(event.date)} />
                    <Meta icon={<Clock3 size={16} />} text={formatTime(event.kickoffTime)} />
                    <Meta icon={<MapPin size={16} />} text={event.venue} />
                  </div>
                  <div className="mt-5 flex flex-wrap items-end justify-between gap-3 border-t border-slate-100 pt-4">
                    <div>
                      <p className="text-xs text-slate-400">Tickets from</p>
                      <p className="font-bold text-slate-950">{formatNaira(lowestPrice)}</p>
                    </div>
                    <p className="text-xs font-semibold text-green-700">{available} available</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {events.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center text-sm text-slate-500">
            There are no ticketed fixtures available right now.
          </div>
        )}
      </div>
    </div>
  );
}

function Meta({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className="flex min-w-0 items-start gap-2">
      <span className="mt-0.5 shrink-0 text-slate-400">{icon}</span>
      <span className="min-w-0 break-words">{text}</span>
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

export default TicketsPage;
