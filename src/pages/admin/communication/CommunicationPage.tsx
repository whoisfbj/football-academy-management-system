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
    <div>
      <p className="text-sm font-semibold text-green-600">
        Communication
      </p>

      <h1 className="mt-1 text-3xl font-bold text-slate-900">
        Communication & Announcements
      </h1>

      <div className="mt-7 grid gap-6 xl:grid-cols-3">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
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
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 py-2.5 text-sm font-semibold text-white"
            >
              <Send size={17} />
              Send Message
            </button>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
          <div className="border-b border-slate-200 p-6">
            <h2 className="font-bold text-slate-900">
              Messages & Notices
            </h2>
          </div>

          <div className="divide-y divide-slate-100">
            {messages.map(
              (item) => (
                <div
                  key={item.id}
                  className="p-5"
                >
                  <div className="flex items-start gap-3">
                    <Mail
                      size={18}
                      className="mt-1 text-green-600"
                    />

                    <div>
                      <h3 className="font-bold text-slate-800">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm text-slate-600">
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
  "w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-green-500";

export default CommunicationPage;