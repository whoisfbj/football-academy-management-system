import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  CalendarDays,
  Eye,
  Pencil,
  Plus,
  Search,
  Ticket,
  Trash2,
  Users,
} from "lucide-react";
import { Link } from "react-router";
import { StatusBadge, formatNaira } from "../../../components/commerce/CommerceUI";
import {
  deleteTicketEvent,
  getTicketEvents,
  getTicketOrders,
} from "../../../services/ticketService";

function AdminTicketsPage() {
  const [version, setVersion] = useState(0);
  const [tab, setTab] = useState<"events" | "orders">("events");
  const [searchTerm, setSearchTerm] = useState("");
  const events = useMemo(() => getTicketEvents(), [version]);
  const orders = useMemo(() => getTicketOrders(), [version]);
  const search = searchTerm.trim().toLowerCase();

  const filteredEvents = events.filter(
    (event) =>
      !search ||
      event.title.toLowerCase().includes(search) ||
      event.eventCode.toLowerCase().includes(search) ||
      event.venue.toLowerCase().includes(search),
  );

  const filteredOrders = orders.filter(
    (order) =>
      !search ||
      order.orderNumber.toLowerCase().includes(search) ||
      order.buyerName.toLowerCase().includes(search) ||
      order.eventTitle.toLowerCase().includes(search),
  );

  const ticketsSold = orders.reduce((total, order) => total + order.quantity, 0);
  const revenue = orders.reduce((total, order) => total + order.total, 0);
  const salesOpen = events.filter((event) => event.status === "Sales Open").length;

  function refresh() {
    setVersion((current) => current + 1);
  }

  return (
    <div className="w-full min-w-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-green-600">Commercial Operations</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-950 sm:text-3xl">Match Tickets</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Create ticketed fixtures, control availability and review online ticket purchases.
          </p>
        </div>
        <Link to="/admin/tickets/events/new" className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white hover:bg-green-700 sm:w-auto">
          <Plus size={17} /> Add Ticket Event
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Ticket Events" value={String(events.length)} icon={<CalendarDays size={20} />} />
        <Stat title="Sales Open" value={String(salesOpen)} icon={<Ticket size={20} />} />
        <Stat title="Tickets Sold" value={String(ticketsSold)} icon={<Users size={20} />} />
        <Stat title="Ticket Revenue" value={formatNaira(revenue)} icon={<Ticket size={20} />} />
      </div>

      <section className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex rounded-lg bg-slate-100 p-1">
            <TabButton active={tab === "events"} onClick={() => setTab("events")} label="Events" />
            <TabButton active={tab === "orders"} onClick={() => setTab("orders")} label="Ticket Orders" />
          </div>
          <div className="relative w-full sm:max-w-sm">
            <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder={tab === "events" ? "Search events..." : "Search ticket orders..."}
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-base outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:text-sm"
            />
          </div>
        </div>

        {tab === "events" ? (
          <div>
            <div className="space-y-3 p-3 md:hidden">
              {filteredEvents.map((event) => {
                const available = event.ticketTypes.reduce((total, type) => total + type.availableQuantity, 0);
                return (
                  <article key={event.id} className="rounded-xl border border-slate-200 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0"><p className="break-words font-bold text-slate-900">{event.title}</p><p className="mt-1 text-xs text-slate-400">{event.eventCode}</p></div>
                      <StatusBadge status={event.status} />
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3"><Mini label="Date" value={formatDate(event.date)} /><Mini label="Available" value={`${available} tickets`} /></div>
                    <div className="mt-4 flex gap-2">
                      <Link to={`/admin/tickets/events/${event.id}`} className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700"><Eye size={15} /> View</Link>
                      <Link to={`/admin/tickets/events/${event.id}/edit`} className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600" aria-label={`Edit ${event.title}`}><Pencil size={16} /></Link>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Delete ${event.title}?`)) {
                            deleteTicketEvent(event.id);
                            refresh();
                          }
                        }}
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-red-200 text-red-600"
                        aria-label={`Delete ${event.title}`}
                      ><Trash2 size={16} /></button>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[950px]">
                <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-4">Event</th><th className="px-5 py-4">Date</th><th className="px-5 py-4">Venue</th><th className="px-5 py-4">Available</th><th className="px-5 py-4">Status</th><th className="px-5 py-4">Actions</th></tr></thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredEvents.map((event) => {
                    const available = event.ticketTypes.reduce((total, type) => total + type.availableQuantity, 0);
                    return (
                      <tr key={event.id}>
                        <td className="px-5 py-4"><p className="font-semibold text-slate-800">{event.title}</p><p className="mt-1 text-xs text-slate-400">{event.eventCode}</p></td>
                        <td className="px-5 py-4 text-sm text-slate-600">{formatDate(event.date)}<br /><span className="text-xs text-slate-400">{event.kickoffTime}</span></td>
                        <td className="px-5 py-4 text-sm text-slate-600">{event.venue}</td>
                        <td className="px-5 py-4 text-sm text-slate-600">{available}</td>
                        <td className="px-5 py-4"><StatusBadge status={event.status} /></td>
                        <td className="px-5 py-4"><div className="flex gap-2"><Link to={`/admin/tickets/events/${event.id}`} className="rounded-lg p-2 text-green-600 hover:bg-green-50"><Eye size={16} /></Link><Link to={`/admin/tickets/events/${event.id}/edit`} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><Pencil size={16} /></Link><button type="button" onClick={() => { if (window.confirm(`Delete ${event.title}?`)) { deleteTicketEvent(event.id); refresh(); } }} className="rounded-lg p-2 text-red-500 hover:bg-red-50"><Trash2 size={16} /></button></div></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div>
            <div className="space-y-3 p-3 md:hidden">
              {filteredOrders.map((order) => (
                <article key={order.id} className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-3"><div><p className="font-bold text-slate-900">{order.orderNumber}</p><p className="mt-1 text-xs text-slate-400">{order.buyerName}</p></div><StatusBadge status={order.status} /></div>
                  <p className="mt-3 text-sm font-semibold text-slate-700">{order.eventTitle}</p>
                  <div className="mt-4 grid grid-cols-2 gap-3"><Mini label="Tickets" value={`${order.quantity} ${order.ticketTypeName}`} /><Mini label="Total" value={formatNaira(order.total)} /></div>
                  <Link to={`/my-tickets/${order.id}`} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700"><Eye size={15} /> View Ticket</Link>
                </article>
              ))}
            </div>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[900px]">
                <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-4">Order</th><th className="px-5 py-4">Buyer</th><th className="px-5 py-4">Event</th><th className="px-5 py-4">Tickets</th><th className="px-5 py-4">Total</th><th className="px-5 py-4">View</th></tr></thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.map((order) => (
                    <tr key={order.id}><td className="px-5 py-4"><p className="font-semibold text-slate-800">{order.orderNumber}</p><p className="text-xs text-slate-400">{new Date(order.purchasedAt).toLocaleDateString()}</p></td><td className="px-5 py-4"><p className="text-sm font-semibold text-slate-700">{order.buyerName}</p><p className="text-xs text-slate-400">{order.email}</p></td><td className="px-5 py-4 text-sm text-slate-600">{order.eventTitle}</td><td className="px-5 py-4 text-sm text-slate-600">{order.quantity} × {order.ticketTypeName}</td><td className="px-5 py-4 text-sm font-semibold text-slate-800">{formatNaira(order.total)}</td><td className="px-5 py-4"><Link to={`/my-tickets/${order.id}`} className="inline-flex items-center gap-1 text-sm font-semibold text-green-600"><Eye size={15} /> View</Link></td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({ title, value, icon }: { title: string; value: string; icon: ReactNode }) {
  return <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">{icon}</div><p className="mt-4 text-sm text-slate-500">{title}</p><p className="mt-1 break-words text-2xl font-bold text-slate-900">{value}</p></div>;
}

function Mini({ label, value }: { label: string; value: string }) {
  return <div className="rounded-lg bg-slate-50 p-3"><p className="text-xs text-slate-400">{label}</p><p className="mt-1 break-words font-semibold text-slate-800">{value}</p></div>;
}

function TabButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return <button type="button" onClick={onClick} className={`rounded-md px-4 py-2 text-sm font-semibold ${active ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>{label}</button>;
}

function formatDate(value: string) {
  return new Date(`${value}T12:00:00`).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
}

export default AdminTicketsPage;
