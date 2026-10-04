import { CalendarDays, MapPin, Ticket } from "lucide-react";
import { Link, useParams } from "react-router";
import { CommerceEmptyState, StatusBadge, formatNaira } from "../../components/commerce/CommerceUI";
import { getTicketEventById, getTicketOrderById, getTicketOrders } from "../../services/ticketService";

export function MyTicketsPage() {
  const orders = getTicketOrders();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold text-green-600">Match Tickets</p>
      <h1 className="mt-1 text-2xl font-bold text-slate-950 sm:text-3xl">My Tickets</h1>
      <p className="mt-2 text-sm text-slate-500">Ticket purchases made in this browser are shown below.</p>

      {orders.length === 0 ? (
        <div className="mt-7"><CommerceEmptyState type="ticket" title="No tickets purchased" description="Your digital match tickets will appear here after checkout." /></div>
      ) : (
        <div className="mt-7 grid gap-5 lg:grid-cols-2">
          {orders.map((order) => {
            const event = getTicketEventById(order.eventId);
            return (
              <Link key={order.id} to={`/my-tickets/${order.id}`} className="min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-green-300 hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600"><Ticket size={21} /></div>
                  <StatusBadge status={order.status} />
                </div>
                <h2 className="mt-4 break-words font-bold text-slate-900">{order.eventTitle}</h2>
                <p className="mt-1 text-sm text-slate-500">{order.ticketTypeName} • {order.quantity} ticket{order.quantity === 1 ? "" : "s"}</p>
                {event && (
                  <div className="mt-4 space-y-2 text-sm text-slate-500">
                    <div className="flex gap-2"><CalendarDays size={16} className="mt-0.5 shrink-0" /><span>{formatDate(event.date)} at {formatTime(event.kickoffTime)}</span></div>
                    <div className="flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0" /><span>{event.venue}</span></div>
                  </div>
                )}
                <div className="mt-5 flex items-end justify-between gap-4 border-t border-slate-100 pt-4">
                  <div><p className="text-xs text-slate-400">Order</p><p className="mt-1 text-sm font-semibold text-slate-700">{order.orderNumber}</p></div>
                  <p className="font-bold text-slate-950">{formatNaira(order.total)}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function TicketDetailPage() {
  const { ticketOrderId } = useParams();
  const order = ticketOrderId ? getTicketOrderById(ticketOrderId) : undefined;
  const event = order ? getTicketEventById(order.eventId) : undefined;

  if (!order) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Ticket not found</h1>
        <Link to="/my-tickets" className="mt-6 inline-flex rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white">View My Tickets</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-slate-950 p-5 text-white sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-400">Digital Match Ticket</p>
              <h1 className="mt-2 text-2xl font-bold">{order.eventTitle}</h1>
              {event && <p className="mt-2 text-sm text-slate-300">{event.competition}</p>}
            </div>
            <StatusBadge status={order.status} />
          </div>
        </div>

        <div className="grid gap-6 p-5 sm:p-7 md:grid-cols-[1fr_300px]">
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              <TicketInfo label="Ticket Type" value={order.ticketTypeName} />
              <TicketInfo label="Quantity" value={String(order.quantity)} />
              <TicketInfo label="Buyer" value={order.buyerName} />
              <TicketInfo label="Order" value={order.orderNumber} />
              {event && <TicketInfo label="Date & Time" value={`${formatDate(event.date)} • ${formatTime(event.kickoffTime)}`} />}
              {event && <TicketInfo label="Venue" value={event.venue} />}
            </div>

            <div className="mt-6">
              <h2 className="font-bold text-slate-900">Ticket Codes</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {order.ticketCodes.map((code) => (
                  <div key={code} className="rounded-xl border border-dashed border-green-300 bg-green-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-green-700">Entry Code</p>
                    <p className="mt-2 break-all font-mono text-sm font-bold text-slate-950">{code}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="rounded-xl bg-slate-50 p-5">
            <Ticket size={26} className="text-green-600" />
            <h2 className="mt-4 font-bold text-slate-900">Purchase Summary</h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-3 text-slate-500"><span>Unit price</span><span>{formatNaira(order.unitPrice)}</span></div>
              <div className="flex justify-between gap-3 text-slate-500"><span>Quantity</span><span>{order.quantity}</span></div>
              <div className="flex justify-between gap-3 border-t border-slate-200 pt-3 font-bold text-slate-950"><span>Total</span><span>{formatNaira(order.total)}</span></div>
            </div>
            <p className="mt-5 text-xs leading-5 text-slate-500">Present the ticket code at the gate. In a production system this would be replaced with a scannable QR or barcode.</p>
          </aside>
        </div>
      </section>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Link to="/tickets" className="rounded-lg bg-green-600 px-5 py-3 text-center text-sm font-semibold text-white">Buy More Tickets</Link>
        <Link to="/my-tickets" className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-700">All My Tickets</Link>
      </div>
    </div>
  );
}

function TicketInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 break-words text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}

function formatDate(value: string) {
  return new Date(`${value}T12:00:00`).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
}

function formatTime(value: string) {
  const [hours, minutes] = value.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date.toLocaleTimeString("en-NG", { hour: "numeric", minute: "2-digit" });
}
