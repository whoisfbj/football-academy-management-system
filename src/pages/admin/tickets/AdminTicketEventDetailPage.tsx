import type { ReactNode } from "react";
import { ArrowLeft, CalendarDays, Clock3, MapPin, Pencil, Ticket, Users } from "lucide-react";
import { Link, useParams } from "react-router";
import { StatusBadge, formatNaira } from "../../../components/commerce/CommerceUI";
import { getTicketEventById, getTicketOrders } from "../../../services/ticketService";

function AdminTicketEventDetailPage() {
  const { eventId } = useParams();
  const event = eventId ? getTicketEventById(eventId) : undefined;

  if (!event) {
    return (
      <div className="w-full min-w-0">
        <Link to="/admin/tickets" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-green-600">
          <ArrowLeft size={17} /> Back to Tickets
        </Link>
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">Ticket event not found.</div>
      </div>
    );
  }

  const orders = getTicketOrders().filter((order) => order.eventId === event.id);
  const sold = orders.reduce((total, order) => total + order.quantity, 0);
  const revenue = orders.reduce((total, order) => total + order.total, 0);
  const available = event.ticketTypes.reduce((total, type) => total + type.availableQuantity, 0);

  return (
    <div className="w-full min-w-0">
      <Link to="/admin/tickets" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-green-600"><ArrowLeft size={17} /> Back to Tickets</Link>

      <section className="mt-5 rounded-2xl bg-slate-950 p-5 text-white shadow-sm sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2"><StatusBadge status={event.status} /><span className="text-xs font-semibold text-slate-400">{event.eventCode}</span></div>
            <h1 className="mt-4 break-words text-2xl font-bold sm:text-3xl">{event.title}</h1>
            <p className="mt-2 text-sm text-slate-300">{event.competition}</p>
          </div>
          <Link to={`/admin/tickets/events/${event.id}/edit`} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 sm:w-auto"><Pencil size={16} /> Edit Event</Link>
        </div>
      </section>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon={<Ticket size={20} />} label="Tickets Sold" value={String(sold)} />
        <Stat icon={<Users size={20} />} label="Available" value={String(available)} />
        <Stat icon={<Ticket size={20} />} label="Orders" value={String(orders.length)} />
        <Stat icon={<Ticket size={20} />} label="Revenue" value={formatNaira(revenue)} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-4 sm:p-5"><h2 className="font-bold text-slate-900">Ticket Categories</h2></div>
          <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5">
            {event.ticketTypes.map((type) => (
              <div key={type.id} className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-3"><div><p className="font-bold text-slate-900">{type.name}</p><p className="mt-1 text-xs leading-5 text-slate-500">{type.description}</p></div><p className="shrink-0 font-bold text-green-700">{formatNaira(type.price)}</p></div>
                <div className="mt-4 rounded-lg bg-slate-50 p-3"><p className="text-xs text-slate-400">Available quantity</p><p className="mt-1 text-lg font-bold text-slate-900">{type.availableQuantity}</p></div>
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-bold text-slate-900">Fixture Details</h2>
            <div className="mt-5 space-y-4">
              <Info icon={<CalendarDays size={17} />} label="Date" value={formatDate(event.date)} />
              <Info icon={<Clock3 size={17} />} label="Kickoff" value={event.kickoffTime} />
              <Info icon={<MapPin size={17} />} label="Venue" value={event.venue} />
            </div>
          </section>
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-bold text-slate-900">Teams</h2>
            <p className="mt-4 font-semibold text-slate-800">{event.homeTeam}</p>
            <p className="my-2 text-xs font-semibold uppercase tracking-wider text-slate-400">vs</p>
            <p className="font-semibold text-slate-800">{event.awayTeam}</p>
          </section>
        </aside>
      </div>

      <section className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-4 sm:p-5"><h2 className="font-bold text-slate-900">Recent Ticket Orders</h2></div>
        {orders.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-500">No tickets have been purchased for this event yet.</div>
        ) : (
          <div className="space-y-3 p-3 md:hidden">
            {orders.map((order) => (
              <div key={order.id} className="rounded-xl border border-slate-200 p-4"><div className="flex items-start justify-between gap-3"><div><p className="font-bold text-slate-900">{order.orderNumber}</p><p className="mt-1 text-xs text-slate-400">{order.buyerName}</p></div><p className="font-bold text-slate-900">{formatNaira(order.total)}</p></div><p className="mt-3 text-sm text-slate-500">{order.quantity} × {order.ticketTypeName}</p></div>
            ))}
          </div>
        )}
        {orders.length > 0 && (
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[760px]"><thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-4">Order</th><th className="px-5 py-4">Buyer</th><th className="px-5 py-4">Category</th><th className="px-5 py-4">Quantity</th><th className="px-5 py-4">Total</th></tr></thead><tbody className="divide-y divide-slate-100">{orders.map((order) => <tr key={order.id}><td className="px-5 py-4 font-semibold text-slate-800">{order.orderNumber}</td><td className="px-5 py-4 text-sm text-slate-600">{order.buyerName}</td><td className="px-5 py-4 text-sm text-slate-600">{order.ticketTypeName}</td><td className="px-5 py-4 text-sm text-slate-600">{order.quantity}</td><td className="px-5 py-4 text-sm font-semibold text-slate-800">{formatNaira(order.total)}</td></tr>)}</tbody></table>
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">{icon}</div><p className="mt-4 text-sm text-slate-500">{label}</p><p className="mt-1 break-words text-2xl font-bold text-slate-900">{value}</p></div>;
}

function Info({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return <div className="flex gap-3"><span className="mt-0.5 shrink-0 text-green-600">{icon}</span><div className="min-w-0"><p className="text-xs uppercase tracking-wide text-slate-400">{label}</p><p className="mt-1 break-words text-sm font-semibold text-slate-800">{value}</p></div></div>;
}

function formatDate(value: string) {
  return new Date(`${value}T12:00:00`).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
}

export default AdminTicketEventDetailPage;
