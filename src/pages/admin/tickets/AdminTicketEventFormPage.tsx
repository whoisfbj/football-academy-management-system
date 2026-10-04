import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowLeft, Plus, Save, Trash2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { addTicketEvent, getTicketEventById, updateTicketEvent } from "../../../services/ticketService";
import type { TicketEvent, TicketEventStatus, TicketType } from "../../../shared/types/ticket";

const inputClass = "w-full rounded-lg border border-slate-200 px-3 py-2.5 text-base outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:text-sm";
const labelClass = "mb-2 block text-sm font-semibold text-slate-700";
const statuses: TicketEventStatus[] = ["Upcoming", "Sales Open", "Sold Out", "Completed"];

function AdminTicketEventFormPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const existing = eventId ? getTicketEventById(eventId) : undefined;
  const editing = Boolean(existing);
  const [form, setForm] = useState(() => ({
    eventCode: existing?.eventCode ?? "",
    title: existing?.title ?? "",
    homeTeam: existing?.homeTeam ?? "Elite Academy",
    awayTeam: existing?.awayTeam ?? "",
    competition: existing?.competition ?? "",
    date: existing?.date ?? "",
    kickoffTime: existing?.kickoffTime ?? "16:00",
    venue: existing?.venue ?? "",
    description: existing?.description ?? "",
    status: existing?.status ?? ("Upcoming" as TicketEventStatus),
    featured: existing?.featured ?? false,
  }));
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>(
    existing?.ticketTypes ?? [
      { id: `type-${Date.now()}-1`, name: "Regular", description: "General admission seating.", price: 2500, availableQuantity: 100 },
      { id: `type-${Date.now()}-2`, name: "VIP", description: "Premium covered seating.", price: 7500, availableQuantity: 30 },
    ],
  );
  const [error, setError] = useState("");

  function setField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function updateType(id: string, patch: Partial<TicketType>) {
    setTicketTypes((current) => current.map((type) => (type.id === id ? { ...type, ...patch } : type)));
  }

  function handleSubmit(submitEvent: FormEvent<HTMLFormElement>) {
    submitEvent.preventDefault();
    setError("");

    if (!form.eventCode.trim() || !form.title.trim() || !form.homeTeam.trim() || !form.awayTeam.trim() || !form.competition.trim() || !form.date || !form.kickoffTime || !form.venue.trim() || !form.description.trim()) {
      setError("Please complete all required event fields.");
      return;
    }

    if (ticketTypes.length === 0 || ticketTypes.some((type) => !type.name.trim() || type.price < 0 || type.availableQuantity < 0)) {
      setError("Add at least one valid ticket type.");
      return;
    }

    const event: TicketEvent = {
      id: existing?.id ?? `event-${Date.now()}`,
      eventCode: form.eventCode.trim(),
      title: form.title.trim(),
      homeTeam: form.homeTeam.trim(),
      awayTeam: form.awayTeam.trim(),
      competition: form.competition.trim(),
      date: form.date,
      kickoffTime: form.kickoffTime,
      venue: form.venue.trim(),
      description: form.description.trim(),
      status: form.status,
      featured: form.featured,
      ticketTypes,
      createdAt: existing?.createdAt ?? new Date().toISOString(),
    };

    if (existing) updateTicketEvent(event);
    else addTicketEvent(event);
    navigate(`/admin/tickets/events/${event.id}`);
  }

  return (
    <div className="w-full min-w-0">
      <Link to="/admin/tickets" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-green-600"><ArrowLeft size={17} /> Back to Tickets</Link>
      <div className="mt-5"><p className="text-sm font-semibold text-green-600">Ticket Management</p><h1 className="mt-1 text-2xl font-bold text-slate-950 sm:text-3xl">{editing ? "Edit Ticket Event" : "Create Ticket Event"}</h1></div>
      {error && <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="text-lg font-bold text-slate-900">Event Information</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <div><label className={labelClass}>Event Code *</label><input value={form.eventCode} onChange={(event) => setField("eventCode", event.target.value)} className={inputClass} placeholder="MAT-2026-004" required /></div>
            <div className="md:col-span-1 xl:col-span-2"><label className={labelClass}>Event Title *</label><input value={form.title} onChange={(event) => setField("title", event.target.value)} className={inputClass} required /></div>
            <div><label className={labelClass}>Home Team *</label><input value={form.homeTeam} onChange={(event) => setField("homeTeam", event.target.value)} className={inputClass} required /></div>
            <div><label className={labelClass}>Away Team *</label><input value={form.awayTeam} onChange={(event) => setField("awayTeam", event.target.value)} className={inputClass} required /></div>
            <div><label className={labelClass}>Competition *</label><input value={form.competition} onChange={(event) => setField("competition", event.target.value)} className={inputClass} required /></div>
            <div><label className={labelClass}>Date *</label><input type="date" value={form.date} onChange={(event) => setField("date", event.target.value)} className={inputClass} required /></div>
            <div><label className={labelClass}>Kickoff *</label><input type="time" value={form.kickoffTime} onChange={(event) => setField("kickoffTime", event.target.value)} className={inputClass} required /></div>
            <div><label className={labelClass}>Status</label><select value={form.status} onChange={(event) => setField("status", event.target.value as TicketEventStatus)} className={inputClass}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></div>
            <div className="md:col-span-2 xl:col-span-3"><label className={labelClass}>Venue *</label><input value={form.venue} onChange={(event) => setField("venue", event.target.value)} className={inputClass} required /></div>
            <div className="md:col-span-2 xl:col-span-3"><label className={labelClass}>Description *</label><textarea rows={4} value={form.description} onChange={(event) => setField("description", event.target.value)} className={inputClass} required /></div>
          </div>
          <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-lg bg-slate-50 p-4"><input type="checkbox" checked={form.featured} onChange={(event) => setField("featured", event.target.checked)} className="mt-1 h-4 w-4 accent-green-600" /><span><span className="block text-sm font-semibold text-slate-800">Featured event</span><span className="mt-1 block text-xs text-slate-500">Highlight this fixture in the ticket storefront.</span></span></label>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div><h2 className="text-lg font-bold text-slate-900">Ticket Categories</h2><p className="mt-1 text-sm text-slate-500">Set ticket names, prices and available quantities.</p></div>
            <button type="button" onClick={() => setTicketTypes((current) => [...current, { id: `type-${Date.now()}`, name: "New Category", description: "", price: 0, availableQuantity: 0 }])} className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"><Plus size={16} /> Add Category</button>
          </div>
          <div className="mt-5 space-y-4">
            {ticketTypes.map((type) => (
              <div key={type.id} className="grid gap-4 rounded-xl border border-slate-200 p-4 md:grid-cols-2 xl:grid-cols-[1fr_1.4fr_160px_170px_auto] xl:items-end">
                <div><label className={labelClass}>Name</label><input value={type.name} onChange={(event) => updateType(type.id, { name: event.target.value })} className={inputClass} /></div>
                <div><label className={labelClass}>Description</label><input value={type.description} onChange={(event) => updateType(type.id, { description: event.target.value })} className={inputClass} /></div>
                <div><label className={labelClass}>Price (₦)</label><input type="number" min="0" value={type.price} onChange={(event) => updateType(type.id, { price: Number(event.target.value) })} className={inputClass} /></div>
                <div><label className={labelClass}>Available Qty</label><input type="number" min="0" value={type.availableQuantity} onChange={(event) => updateType(type.id, { availableQuantity: Number(event.target.value) })} className={inputClass} /></div>
                <button type="button" onClick={() => setTicketTypes((current) => current.filter((currentType) => currentType.id !== type.id))} className="flex h-11 items-center justify-center rounded-lg border border-red-200 px-3 text-red-600" aria-label={`Remove ${type.name}`}><Trash2 size={16} /></button>
              </div>
            ))}
          </div>
        </section>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><Link to="/admin/tickets" className="rounded-lg border border-slate-300 px-5 py-3 text-center text-sm font-semibold text-slate-700">Cancel</Link><button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white"><Save size={17} /> {editing ? "Save Changes" : "Create Event"}</button></div>
      </form>
    </div>
  );
}

export default AdminTicketEventFormPage;
