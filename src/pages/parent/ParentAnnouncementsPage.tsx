import {
  Bell,
  Mail,
  Megaphone,
  MessageSquare,
} from "lucide-react";

import { getMessages } from "../../services/communicationService";

function ParentAnnouncementsPage() {
  const announcements = getMessages()
    .filter(
      (message) =>
        message.audience === "All" ||
        message.audience === "Parents",
    )
    .slice()
    .reverse();

  return (
    <div className="w-full min-w-0 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-7xl min-w-0">
        {/* HEADER */}

        <div>
          <p className="text-sm font-semibold text-green-600">
            Parent / Guardian Portal
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-950 lg:text-3xl">
            Announcements
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Receive important notices, reminders and academy updates.
          </p>
        </div>

        {/* SUMMARY */}

        <section className="mt-6 rounded-2xl bg-slate-950 p-4 sm:p-6 text-white shadow-sm">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10">
                <Megaphone size={27} />
              </div>

              <div>
                <p className="text-sm text-slate-400">
                  Academy Communication
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  Parent Announcements
                </h2>

                <p className="mt-1 text-sm text-green-400">
                  Notices addressed to parents and guardians
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Messages
              </p>

              <p className="mt-1 text-3xl font-bold text-green-400">
                {announcements.length}
              </p>
            </div>
          </div>
        </section>

        {/* ANNOUNCEMENTS */}

        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <Bell size={21} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Academy Notices
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Latest information from the academy.
                </p>
              </div>
            </div>
          </div>

          {announcements.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {announcements.map((announcement) => (
                <article
                  key={announcement.id}
                  className="min-w-0 p-4 transition hover:bg-slate-50 sm:p-5 lg:p-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                      <AnnouncementIcon
                        channel={announcement.channel}
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">
                            {announcement.title}
                          </h3>

                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                              {announcement.audience}
                            </span>

                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                              {announcement.channel}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
                        {announcement.message}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="px-4 py-10 text-center sm:p-12">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-300">
                <Bell size={27} />
              </div>

              <h3 className="mt-4 font-bold text-slate-800">
                No announcements
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Academy announcements and notices intended for parents will
                appear here.
              </p>
            </div>
          )}
        </section>

        {/* NOTICE */}

        <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <p className="font-semibold text-blue-900">
            Stay informed
          </p>

          <p className="mt-1 text-sm leading-6 text-blue-700">
            The academy can use announcements to share training changes,
            payment reminders, tournament information and other important
            updates with parents and guardians.
          </p>
        </div>
      </div>
    </div>
  );
}

function AnnouncementIcon({
  channel,
}: {
  channel: string;
}) {
  if (channel === "Email") {
    return <Mail size={20} />;
  }

  if (channel === "SMS") {
    return <MessageSquare size={20} />;
  }

  return <Bell size={20} />;
}

export default ParentAnnouncementsPage;