import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { ArrowLeft, CalendarDays, MapPin, ShieldCheck, Ticket } from "lucide-react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
import { PaymentMethodPicker, formatNaira } from "../../components/commerce/CommerceUI";
import { getCurrentUser } from "../../services/authService";
import { getTicketEventById, purchaseTickets } from "../../services/ticketService";
import type { PaymentMethod } from "../../shared/types/shop";

const inputClass = "w-full rounded-lg border border-slate-200 px-3 py-2.5 text-base outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:text-sm";
const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

function TicketCheckoutPage() {
  const { eventId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const event = eventId ? getTicketEventById(eventId) : undefined;
  const typeId = searchParams.get("type") ?? "";
  const requestedQuantity = Number(searchParams.get("qty") ?? "1");
  const ticketType = event?.ticketTypes.find((type) => type.id === typeId);
  const quantity = useMemo(
    () => Math.max(1, Math.min(Number.isFinite(requestedQuantity) ? requestedQuantity : 1, ticketType?.availableQuantity ?? 1, 10)),
    [requestedQuantity, ticketType?.availableQuantity],
  );
  const [buyerName, setBuyerName] = useState(currentUser?.name ?? "");
  const [email, setEmail] = useState(currentUser?.email ?? "");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Card");
  const [error, setError] = useState("");

  if (!event || !ticketType) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Ticket selection not found</h1>
        <Link to="/tickets" className="mt-6 inline-flex rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white">View Match Tickets</Link>
      </div>
    );
  }

  const safeEvent = event;
  const safeTicketType = ticketType;
  const total = safeTicketType.price * quantity;

  function handleSubmit(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    setError("");

    if (!buyerName.trim() || !email.trim() || !phone.trim()) {
      setError("Name, email and phone number are required.");
      return;
    }

    try {
      const order = purchaseTickets({
        eventId: safeEvent.id,
        ticketTypeId: safeTicketType.id,
        quantity,
        buyerName,
        email,
        phone,
        paymentMethod,
      });

      navigate(`/my-tickets/${order.id}`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to complete ticket purchase.");
    }
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
      <Link to={`/tickets/${event.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-green-600">
        <ArrowLeft size={17} /> Back to Event
      </Link>

      <div className="mt-5">
        <p className="text-sm font-semibold text-green-600">Online Ticket Purchase</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-950 sm:text-3xl">Complete Ticket Checkout</h1>
      </div>

      {error && <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      <form onSubmit={handleSubmit} className="mt-7 grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
        <div className="space-y-6">
          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-slate-900">Buyer Information</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className={labelClass}>Full Name *</label>
                <input value={buyerName} onChange={(event) => setBuyerName(event.target.value)} className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Email *</label>
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Phone *</label>
                <input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} className={inputClass} required />
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-slate-900">Payment Method</h2>
            <p className="mt-1 text-sm text-slate-500">Choose how you want to simulate payment.</p>
            <div className="mt-5"><PaymentMethodPicker value={paymentMethod} onChange={setPaymentMethod} /></div>
          </section>
        </div>

        <aside className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
          <div className="flex items-center justify-between gap-3">
            <Ticket className="text-green-600" size={22} />
            <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">{ticketType.name}</span>
          </div>
          <h2 className="mt-4 font-bold text-slate-900">{event.title}</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-500">
            <div className="flex gap-2"><CalendarDays size={16} className="mt-0.5 shrink-0" /><span>{formatDate(event.date)} at {formatTime(event.kickoffTime)}</span></div>
            <div className="flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0" /><span>{event.venue}</span></div>
          </div>
          <div className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm">
            <div className="flex justify-between gap-4 text-slate-500"><span>{ticketType.name} × {quantity}</span><span>{formatNaira(total)}</span></div>
            <div className="flex justify-between gap-4 border-t border-slate-100 pt-3 text-base font-bold text-slate-950"><span>Total</span><span>{formatNaira(total)}</span></div>
          </div>
          <div className="mt-5 flex items-start gap-2 rounded-lg bg-slate-50 p-3 text-xs leading-5 text-slate-500">
            <ShieldCheck size={17} className="mt-0.5 shrink-0 text-green-600" />
            Prototype checkout only. No real payment is processed.
          </div>
          <button type="submit" className="mt-5 w-full rounded-lg bg-green-600 px-4 py-3 text-sm font-bold text-white hover:bg-green-700">Pay {formatNaira(total)}</button>
        </aside>
      </form>
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

export default TicketCheckoutPage;
