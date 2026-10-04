import {
  Mail,
  Megaphone,
  Send,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  addMessage,
  getMessages,
} from "../../../services/communicationService";

import type {
  CommunicationAudience,
  CommunicationChannel,
} from "../../../shared/types/communication";

function CommunicationPage() {
  const [refresh, setRefresh] =
    useState(0);

  void refresh;

  const [title, setTitle] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [channel, setChannel] =
    useState<CommunicationChannel>(
      "Push Notification",
    );

  const [audience, setAudience] =
    useState<CommunicationAudience>(
      "All",
    );

  const messages =
    getMessages()
      .slice()
      .reverse();

  return (
    <div className="w-full min-w-0">
      <p className="text-xs font-semibold uppercase tracking-wide text-green-600 sm:text-sm">
        Communication
      </p>

      <h1 className="mt-1 break-words text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
        Communication & Announcements
      </h1>

      <div className="mt-6 grid min-w-0 grid-cols-1 gap-6 sm:mt-7 xl:grid-cols-3">
        <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <Megaphone className="text-green-600" />

          <h2 className="mt-4 font-bold text-slate-900">
            New Message
          </h2>

          <div className="mt-5 space-y-4">
            <input
              value={title}
              onChange={(event) =>
                setTitle(
                  event.target.value,
                )
              }
              placeholder="Title"
              className={inputClass}
            />

            <textarea
              value={message}
              onChange={(event) =>
                setMessage(
                  event.target.value,
                )
              }
              rows={5}
              placeholder="Message"
              className={inputClass}
            />

            <select
              value={audience}
              onChange={(event) =>
                setAudience(
                  event.target
                    .value as CommunicationAudience,
                )
              }
              className={inputClass}
            >
              <option>All</option>
              <option>Players</option>
              <option>Parents</option>
              <option>Coaches</option>
              <option>Staff</option>
            </select>

            <select
              value={channel}
              onChange={(event) =>
                setChannel(
                  event.target
                    .value as CommunicationChannel,
                )
              }
              className={inputClass}
            >
              <option>SMS</option>
              <option>Email</option>
              <option>WhatsApp</option>
              <option>
                Push Notification
              </option>
            </select>

            <button
              onClick={() => {
                if (
                  !title ||
                  !message
                ) {
                  return;
                }

                addMessage({
                  id: `message-${Date.now()}`,
                  title,
                  message,
                  audience,
                  channel,
                  createdAt:
                    new Date().toISOString(),
                });

                setTitle("");
                setMessage("");

                setRefresh(
                  (value) =>
                    value + 1,
                );
              }}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              <Send size={17} />
              Send Message
            </button>
          </div>
        </section>

        <section className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
          <div className="border-b border-slate-200 p-4 sm:p-6">
            <h2 className="font-bold text-slate-900">
              Messages & Notices
            </h2>
          </div>

          <div className="divide-y divide-slate-100">
            {messages.map(
              (item) => (
                <div
                  key={item.id}
                  className="min-w-0 p-4 sm:p-5"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <Mail
                      size={18}
                      className="mt-1 shrink-0 text-green-600"
                    />

                    <div className="min-w-0">
                      <h3 className="break-words font-bold text-slate-800">
                        {item.title}
                      </h3>

                      <p className="mt-2 break-words text-sm leading-6 text-slate-600">
                        {item.message}
                      </p>

                      <p className="mt-3 text-xs text-slate-400">
                        {
                          item.audience
                        }{" "}
                        •{" "}
                        {
                          item.channel
                        }
                      </p>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

const inputClass =
  "w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-base outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:text-sm";

export default CommunicationPage;