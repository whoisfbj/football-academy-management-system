import {
  Check,
  Clock3,
  Eye,
  Search,
  UserRound,
  X,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import { Link } from "react-router";

import {
  approvePlayerRegistration,
  getPlayers,
  rejectPlayerRegistration,
} from "../../../services/playerService";

import type { Player } from "../../../shared/types/player";

function PendingRegistrationsPage() {
  const [players, setPlayers] = useState(
    () => getPlayers(),
  );

  const [searchTerm, setSearchTerm] =
    useState("");

  const [selectedPlayer, setSelectedPlayer] =
    useState<Player | null>(null);

  const [confirmation, setConfirmation] =
    useState<{
      player: Player;
      action: "approve" | "reject";
    } | null>(null);

  const pendingPlayers = useMemo(() => {
    return players.filter((player) => {
      const isPending =
        player.registrationStatus ===
        "Pending Registration";

      const matchesSearch =
        player.fullName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        player.playerId
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        player.guardian.fullName
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      return isPending && matchesSearch;
    });
  }, [players, searchTerm]);

  const refreshPlayers = () => {
    setPlayers(getPlayers());
  };

  const handleConfirm = () => {
    if (!confirmation) {
      return;
    }

    if (
      confirmation.action === "approve"
    ) {
      approvePlayerRegistration(
        confirmation.player.id,
      );
    } else {
      rejectPlayerRegistration(
        confirmation.player.id,
      );
    }

    setConfirmation(null);
    setSelectedPlayer(null);

    refreshPlayers();
  };

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-green-600">
            Player Management
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Pending Registrations
          </h1>

          <p className="mt-2 text-slate-500">
            Review new player applications before
            confirming academy registration.
          </p>
        </div>

        <div className="rounded-lg bg-amber-50 px-4 py-3">
          <p className="text-sm font-semibold text-amber-700">
            {pendingPlayers.length} Pending
          </p>
        </div>
      </div>

      <section className="mt-7 rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-5">
          <div className="relative max-w-md">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(
                  event.target.value,
                )
              }
              placeholder="Search player, ID or guardian..."
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-5 py-4">
                  Player
                </th>

                <th className="px-5 py-4">
                  Age Category
                </th>

                <th className="px-5 py-4">
                  Position
                </th>

                <th className="px-5 py-4">
                  Guardian
                </th>

                <th className="px-5 py-4">
                  Date Applied
                </th>

                <th className="px-5 py-4">
                  Status
                </th>

                <th className="px-5 py-4">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {pendingPlayers.map(
                (player) => (
                  <tr
                    key={player.id}
                    className="hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-slate-100">
                          {player.passportPhoto ? (
                            <img
                              src={
                                player.passportPhoto
                              }
                              alt={
                                player.fullName
                              }
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <UserRound
                              size={19}
                              className="text-slate-400"
                            />
                          )}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-800">
                            {
                              player.fullName
                            }
                          </p>

                          <p className="text-xs text-green-600">
                            {
                              player.playerId
                            }
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {player.ageCategory}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {
                        player.playingPosition
                      }
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-slate-700">
                        {
                          player.guardian
                            .fullName
                        }
                      </p>

                      <p className="text-xs text-slate-500">
                        {
                          player.guardian
                            .phone
                        }
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {new Date(
                        player.createdAt,
                      ).toLocaleDateString(
                        "en-GB",
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                        <Clock3 size={13} />

                        Pending Registration
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            setSelectedPlayer(
                              player,
                            )
                          }
                          title="Review"
                          className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-100"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          onClick={() =>
                            setConfirmation({
                              player,
                              action:
                                "approve",
                            })
                          }
                          title="Approve"
                          className="rounded-lg bg-green-50 p-2 text-green-700 transition hover:bg-green-100"
                        >
                          <Check
                            size={17}
                          />
                        </button>

                        <button
                          onClick={() =>
                            setConfirmation({
                              player,
                              action:
                                "reject",
                            })
                          }
                          title="Reject"
                          className="rounded-lg bg-red-50 p-2 text-red-700 transition hover:bg-red-100"
                        >
                          <X size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>

          {pendingPlayers.length === 0 && (
            <div className="p-14 text-center">
              <Check
                size={38}
                className="mx-auto text-green-500"
              />

              <h2 className="mt-4 font-semibold text-slate-800">
                No pending registrations
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                All player applications have
                been reviewed.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* REVIEW MODAL */}

      {selectedPlayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 p-6">
              <div>
                <p className="text-sm font-semibold text-green-600">
                  Registration Review
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  {
                    selectedPlayer.fullName
                  }
                </h2>
              </div>

              <button
                onClick={() =>
                  setSelectedPlayer(null)
                }
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6 p-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <ReviewItem
                  label="Player ID"
                  value={
                    selectedPlayer.playerId
                  }
                />

                <ReviewItem
                  label="Date of Birth"
                  value={
                    selectedPlayer.dateOfBirth
                  }
                />

                <ReviewItem
                  label="Gender"
                  value={
                    selectedPlayer.gender
                  }
                />

                <ReviewItem
                  label="Age Category"
                  value={
                    selectedPlayer.ageCategory
                  }
                />

                <ReviewItem
                  label="Playing Position"
                  value={
                    selectedPlayer.playingPosition
                  }
                />

                <ReviewItem
                  label="Preferred Foot"
                  value={
                    selectedPlayer.preferredFoot
                  }
                />

                <ReviewItem
                  label="Program"
                  value={
                    selectedPlayer.program
                  }
                />

                <ReviewItem
                  label="Training Centre"
                  value={
                    selectedPlayer.trainingCentre
                  }
                />
              </div>

              <div className="border-t border-slate-100 pt-5">
                <h3 className="font-semibold text-slate-800">
                  Parent / Guardian
                </h3>

                <div className="mt-4 grid gap-5 sm:grid-cols-2">
                  <ReviewItem
                    label="Name"
                    value={
                      selectedPlayer
                        .guardian
                        .fullName
                    }
                  />

                  <ReviewItem
                    label="Relationship"
                    value={
                      selectedPlayer
                        .guardian
                        .relationship
                    }
                  />

                  <ReviewItem
                    label="Phone"
                    value={
                      selectedPlayer
                        .guardian.phone
                    }
                  />

                  <ReviewItem
                    label="Consent"
                    value={
                      selectedPlayer.parentConsent
                        ? "Confirmed"
                        : "Not Confirmed"
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 p-6 sm:flex-row sm:justify-between">
              <Link
                to={`/admin/players/${selectedPlayer.id}`}
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-center text-sm font-semibold text-slate-700"
              >
                Open Full Profile
              </Link>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setConfirmation({
                      player:
                        selectedPlayer,
                      action: "reject",
                    });

                    setSelectedPlayer(
                      null,
                    );
                  }}
                  className="flex-1 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 sm:flex-none"
                >
                  Reject
                </button>

                <button
                  onClick={() => {
                    setConfirmation({
                      player:
                        selectedPlayer,
                      action: "approve",
                    });

                    setSelectedPlayer(
                      null,
                    );
                  }}
                  className="flex-1 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white sm:flex-none"
                >
                  Approve Registration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRMATION MODAL */}

      {confirmation && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div
              className={[
                "flex h-12 w-12 items-center justify-center rounded-full",
                confirmation.action ===
                "approve"
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-600",
              ].join(" ")}
            >
              {confirmation.action ===
              "approve" ? (
                <Check size={23} />
              ) : (
                <X size={23} />
              )}
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              {confirmation.action ===
              "approve"
                ? "Approve Registration?"
                : "Reject Registration?"}
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              {confirmation.action ===
              "approve"
                ? `${confirmation.player.fullName} will become a registered academy player.`
                : `${confirmation.player.fullName}'s registration will be marked as rejected.`}
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() =>
                  setConfirmation(null)
                }
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirm}
                className={[
                  "rounded-lg px-4 py-2.5 text-sm font-semibold text-white",
                  confirmation.action ===
                  "approve"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700",
                ].join(" ")}
              >
                {confirmation.action ===
                "approve"
                  ? "Approve"
                  : "Reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface ReviewItemProps {
  label: string;
  value: string;
}

function ReviewItem({
  label,
  value,
}: ReviewItemProps) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-700">
        {value}
      </p>
    </div>
  );
}

export default PendingRegistrationsPage;