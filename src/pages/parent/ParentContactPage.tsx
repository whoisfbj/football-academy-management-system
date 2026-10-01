import {
  useState,
} from "react";

import type {
  FormEvent,
  ReactNode,
} from "react";

import {
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
} from "lucide-react";

import {
  getAcademyProfile,
} from "../../services/academyService";

import {
  getPrimaryLinkedPlayer,
} from "../../services/parentService";

function ParentContactPage() {
  const academy =
    getAcademyProfile();

  const linkedPlayer =
    getPrimaryLinkedPlayer();

  const [subject, setSubject] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (
      !subject.trim() ||
      !message.trim()
    ) {
      return;
    }

    const existing =
      JSON.parse(
        localStorage.getItem(
          "academy_parent_contact_messages",
        ) || "[]",
      );

    const newMessage = {
      id: `contact-${Date.now()}`,

      playerId:
        linkedPlayer?.id,

      playerName:
        linkedPlayer?.fullName,

      subject:
        subject.trim(),

      message:
        message.trim(),

      status: "Sent",

      createdAt:
        new Date().toISOString(),
    };

    localStorage.setItem(
      "academy_parent_contact_messages",
      JSON.stringify([
        ...existing,
        newMessage,
      ]),
    );

    setSubject("");
    setMessage("");
    setSuccess(true);
  }

  return (
    <div className="p-5 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div>
          <p className="text-sm font-semibold text-green-600">
            Parent / Guardian Portal
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-950 lg:text-3xl">
            Contact Academy
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Contact the academy about
            training, payments, player
            development or general
            enquiries.
          </p>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="space-y-4">
            <ContactCard
              icon={<Phone size={20} />}
              label="Phone"
              value={
                academy.phone ||
                "Not provided"
              }
            />

            <ContactCard
              icon={<Mail size={20} />}
              label="Email"
              value={
                academy.email ||
                "Not provided"
              }
            />

            <ContactCard
              icon={
                <MapPin size={20} />
              }
              label="Address"
              value={
                academy.address ||
                "Not provided"
              }
            />
          </div>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <MessageSquare
                  size={21}
                />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Send a Message
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Submit an enquiry to
                  the academy.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-5"
            >
              {linkedPlayer && (
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Player
                  </label>

                  <div className="mt-2 rounded-lg bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
                    {
                      linkedPlayer.fullName
                    }{" "}
                    —{" "}
                    {
                      linkedPlayer.playerId
                    }
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="subject"
                  className="text-sm font-semibold text-slate-700"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  value={subject}
                  onChange={(event) => {
                    setSubject(
                      event.target.value,
                    );

                    setSuccess(false);
                  }}
                  required
                  className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-green-500"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="text-sm font-semibold text-slate-700"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  rows={7}
                  value={message}
                  onChange={(event) => {
                    setMessage(
                      event.target.value,
                    );

                    setSuccess(false);
                  }}
                  required
                  className="mt-2 w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-green-500"
                />
              </div>

              {success && (
                <div className="rounded-lg bg-green-50 p-4 text-sm font-medium text-green-700">
                  Your message has been
                  submitted successfully.
                </div>
              )}

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700"
              >
                <Send size={17} />
                Send Message
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

function ContactCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
        {icon}
      </div>

      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-2 break-words text-sm font-semibold text-slate-700">
        {value}
      </p>
    </div>
  );
}

export default ParentContactPage;