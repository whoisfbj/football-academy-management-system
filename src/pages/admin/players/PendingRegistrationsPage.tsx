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

import {
  Link,
} from "react-router";

import {
  approvePlayerRegistration,
  getPlayers,
  rejectPlayerRegistration,
} from "../../../services/playerService";

import type {
  Player,
} from "../../../shared/types/player";

function PendingRegistrationsPage() {
  const [
    players,
    setPlayers,
  ] = useState(
    () => getPlayers(),
  );

  const [
    searchTerm,
    setSearchTerm,
  ] = useState("");

  const [
    selectedPlayer,
    setSelectedPlayer,
  ] = useState<Player | null>(
    null,
  );

  const [
    confirmation,
    setConfirmation,
  ] = useState<{
    player: Player;
    action: "approve" | "reject";
  } | null>(null);

  /* =========================================
     FILTER PENDING PLAYERS
  ========================================= */

  const pendingPlayers =
    useMemo(() => {
      const normalizedSearch =
        searchTerm
          .trim()
          .toLowerCase();

      return players.filter(
        (player) => {
          const isPending =
            player.registrationStatus ===
            "Pending Registration";

          const matchesSearch =
            !normalizedSearch ||
            player.fullName
              .toLowerCase()
              .includes(
                normalizedSearch,
              ) ||
            player.playerId
              .toLowerCase()
              .includes(
                normalizedSearch,
              ) ||
            player.guardian.fullName
              .toLowerCase()
              .includes(
                normalizedSearch,
              );

          return (
            isPending &&
            matchesSearch
          );
        },
      );
    }, [
      players,
      searchTerm,
    ]);

  /* =========================================
     REFRESH
  ========================================= */

  const refreshPlayers = () => {
    setPlayers(
      getPlayers(),
    );
  };

  /* =========================================
     APPROVE / REJECT
  ========================================= */

  const handleConfirm = () => {
    if (!confirmation) {
      return;
    }

    if (
      confirmation.action ===
      "approve"
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
    <div className="w-full min-w-0">
      {/* =====================================
          PAGE HEADER
      ====================================== */}

      <div
        className="
          flex
          min-w-0
          flex-col
          gap-4
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <div className="min-w-0">
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-wide
              text-green-600
              sm:text-sm
            "
          >
            Player Management
          </p>

          <h1
            className="
              mt-1
              break-words
              text-2xl
              font-bold
              leading-tight
              text-slate-900
              sm:text-3xl
            "
          >
            Pending Registrations
          </h1>

          <p
            className="
              mt-2
              max-w-2xl
              text-sm
              leading-6
              text-slate-500
              sm:text-base
            "
          >
            Review new player applications
            before confirming academy
            registration.
          </p>
        </div>

        <div
          className="
            w-fit
            shrink-0
            rounded-lg
            bg-amber-50
            px-4
            py-3
          "
        >
          <p className="text-sm font-semibold text-amber-700">
            {pendingPlayers.length}{" "}
            Pending
          </p>
        </div>
      </div>

      {/* =====================================
          REGISTRATION LIST
      ====================================== */}

      <section
        className="
          mt-6
          min-w-0
          overflow-hidden
          rounded-xl
          border
          border-slate-200
          bg-white
          shadow-sm
          sm:mt-7
        "
      >
        {/* SEARCH */}

        <div
          className="
            border-b
            border-slate-200
            p-4
            sm:p-5
          "
        >
          <div
            className="
              relative
              w-full
              max-w-md
            "
          >
            <Search
              size={17}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
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
              className="
                w-full
                min-w-0
                rounded-lg
                border
                border-slate-200
                bg-white
                py-2.5
                pl-10
                pr-4
                text-base
                outline-none
                transition

                focus:border-green-500
                focus:ring-2
                focus:ring-green-100

                sm:text-sm
              "
            />
          </div>
        </div>

        {/* =================================
            MOBILE CARDS
        ================================== */}

        <div
          className="
            space-y-3
            bg-slate-50/50
            p-3
            md:hidden
          "
        >
          {pendingPlayers.map(
            (player) => (
              <article
                key={player.id}
                className="
                  min-w-0
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  p-4
                  shadow-sm
                "
              >
                {/* PLAYER */}

                <div
                  className="
                    flex
                    min-w-0
                    items-start
                    gap-3
                  "
                >
                  <PlayerAvatar
                    player={
                      player
                    }
                    size="large"
                  />

                  <div className="min-w-0 flex-1">
                    <p
                      className="
                        truncate
                        font-semibold
                        text-slate-900
                      "
                    >
                      {
                        player.fullName
                      }
                    </p>

                    <p
                      className="
                        mt-0.5
                        truncate
                        text-xs
                        font-semibold
                        text-green-600
                      "
                    >
                      {
                        player.playerId
                      }
                    </p>
                  </div>

                  <span
                    className="
                      inline-flex
                      shrink-0
                      items-center
                      gap-1
                      rounded-full
                      bg-amber-50
                      px-2
                      py-1
                      text-[11px]
                      font-semibold
                      text-amber-700
                    "
                  >
                    <Clock3
                      size={12}
                    />

                    Pending
                  </span>
                </div>

                {/* DETAILS */}

                <div
                  className="
                    mt-4
                    grid
                    grid-cols-2
                    gap-x-4
                    gap-y-3
                    border-t
                    border-slate-100
                    pt-4
                  "
                >
                  <MobileDetail
                    label="Age Category"
                    value={
                      player.ageCategory
                    }
                  />

                  <MobileDetail
                    label="Position"
                    value={
                      player.playingPosition
                    }
                  />

                  <MobileDetail
                    label="Guardian"
                    value={
                      player.guardian
                        .fullName
                    }
                  />

                  <MobileDetail
                    label="Phone"
                    value={
                      player.guardian
                        .phone
                    }
                  />

                  <div className="col-span-2 min-w-0">
                    <p className="text-xs text-slate-400">
                      Date Applied
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {new Date(
                        player.createdAt,
                      ).toLocaleDateString(
                        "en-GB",
                      )}
                    </p>
                  </div>
                </div>

                {/* ACTIONS */}

                <div
                  className="
                    mt-4
                    grid
                    grid-cols-1
                    gap-2
                    border-t
                    border-slate-100
                    pt-4
                    min-[400px]:grid-cols-3
                  "
                >
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedPlayer(
                        player,
                      )
                    }
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-lg
                      border
                      border-slate-200
                      px-3
                      py-2.5
                      text-sm
                      font-semibold
                      text-slate-600
                      transition
                      hover:bg-slate-50
                    "
                  >
                    <Eye size={16} />

                    Review
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setConfirmation({
                        player,
                        action:
                          "approve",
                      })
                    }
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-lg
                      bg-green-50
                      px-3
                      py-2.5
                      text-sm
                      font-semibold
                      text-green-700
                      transition
                      hover:bg-green-100
                    "
                  >
                    <Check
                      size={16}
                    />

                    Approve
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setConfirmation({
                        player,
                        action:
                          "reject",
                      })
                    }
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-lg
                      bg-red-50
                      px-3
                      py-2.5
                      text-sm
                      font-semibold
                      text-red-700
                      transition
                      hover:bg-red-100
                    "
                  >
                    <X size={16} />

                    Reject
                  </button>
                </div>
              </article>
            ),
          )}

          {pendingPlayers.length ===
            0 && (
            <EmptyPendingState />
          )}
        </div>

        {/* =================================
            TABLET / DESKTOP TABLE
        ================================== */}

        <div
          className="
            hidden
            w-full
            overflow-x-auto
            md:block
          "
        >
          <table className="w-full min-w-[1000px]">
            <thead className="bg-slate-50">
              <tr
                className="
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500
                "
              >
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
                    key={
                      player.id
                    }
                    className="
                      transition
                      hover:bg-slate-50
                    "
                  >
                    {/* PLAYER */}

                    <td className="px-5 py-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <PlayerAvatar
                          player={
                            player
                          }
                        />

                        <div className="min-w-0">
                          <p
                            className="
                              max-w-[180px]
                              truncate
                              font-semibold
                              text-slate-800
                            "
                          >
                            {
                              player.fullName
                            }
                          </p>

                          <p className="mt-0.5 text-xs text-green-600">
                            {
                              player.playerId
                            }
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* CATEGORY */}

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {
                        player.ageCategory
                      }
                    </td>

                    {/* POSITION */}

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {
                        player.playingPosition
                      }
                    </td>

                    {/* GUARDIAN */}

                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-slate-700">
                        {
                          player.guardian
                            .fullName
                        }
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        {
                          player.guardian
                            .phone
                        }
                      </p>
                    </td>

                    {/* DATE */}

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {new Date(
                        player.createdAt,
                      ).toLocaleDateString(
                        "en-GB",
                      )}
                    </td>

                    {/* STATUS */}

                    <td className="px-5 py-4">
                      <span
                        className="
                          inline-flex
                          items-center
                          gap-1
                          whitespace-nowrap
                          rounded-full
                          bg-amber-50
                          px-2.5
                          py-1
                          text-xs
                          font-semibold
                          text-amber-700
                        "
                      >
                        <Clock3
                          size={13}
                        />

                        Pending Registration
                      </span>
                    </td>

                    {/* ACTIONS */}

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedPlayer(
                              player,
                            )
                          }
                          title="Review"
                          aria-label={`Review ${player.fullName}`}
                          className="
                            rounded-lg
                            border
                            border-slate-200
                            p-2
                            text-slate-500
                            transition
                            hover:bg-slate-100
                          "
                        >
                          <Eye
                            size={17}
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setConfirmation(
                              {
                                player,
                                action:
                                  "approve",
                              },
                            )
                          }
                          title="Approve"
                          aria-label={`Approve ${player.fullName}`}
                          className="
                            rounded-lg
                            bg-green-50
                            p-2
                            text-green-700
                            transition
                            hover:bg-green-100
                          "
                        >
                          <Check
                            size={17}
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setConfirmation(
                              {
                                player,
                                action:
                                  "reject",
                              },
                            )
                          }
                          title="Reject"
                          aria-label={`Reject ${player.fullName}`}
                          className="
                            rounded-lg
                            bg-red-50
                            p-2
                            text-red-700
                            transition
                            hover:bg-red-100
                          "
                        >
                          <X
                            size={17}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>

          {pendingPlayers.length ===
            0 && (
            <EmptyPendingState />
          )}
        </div>
      </section>

      {/* =====================================
          REVIEW MODAL
      ====================================== */}

      {selectedPlayer && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-end
            justify-center
            bg-slate-950/60
            p-0
            backdrop-blur-[1px]

            sm:items-center
            sm:p-4
          "
        >
          <div
            className="
              flex
              max-h-[92dvh]
              w-full
              min-w-0
              flex-col
              overflow-hidden
              rounded-t-2xl
              bg-white
              shadow-2xl

              sm:max-w-2xl
              sm:rounded-2xl
            "
          >
            {/* MODAL HEADER */}

            <div
              className="
                flex
                shrink-0
                min-w-0
                items-start
                justify-between
                gap-4
                border-b
                border-slate-200
                p-4
                sm:p-6
              "
            >
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-green-600 sm:text-sm">
                  Registration Review
                </p>

                <h2
                  className="
                    mt-1
                    break-words
                    text-lg
                    font-bold
                    text-slate-900
                    sm:text-xl
                  "
                >
                  {
                    selectedPlayer.fullName
                  }
                </h2>
              </div>

              <button
                type="button"
                aria-label="Close registration review"
                onClick={() =>
                  setSelectedPlayer(
                    null,
                  )
                }
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  text-slate-500
                  transition
                  hover:bg-slate-100
                "
              >
                <X size={20} />
              </button>
            </div>

            {/* MODAL CONTENT */}

            <div
              className="
                min-h-0
                flex-1
                overflow-y-auto
                p-4
                sm:p-6
              "
            >
              {/* PLAYER PREVIEW */}

              <div className="mb-6 flex min-w-0 items-center gap-3">
                <PlayerAvatar
                  player={
                    selectedPlayer
                  }
                  size="large"
                />

                <div className="min-w-0">
                  <p className="truncate font-semibold text-slate-900">
                    {
                      selectedPlayer.fullName
                    }
                  </p>

                  <p className="mt-0.5 truncate text-sm font-semibold text-green-600">
                    {
                      selectedPlayer.playerId
                    }
                  </p>
                </div>
              </div>

              {/* PLAYER INFORMATION */}

              <div
                className="
                  grid
                  grid-cols-1
                  gap-5
                  sm:grid-cols-2
                "
              >
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

              {/* GUARDIAN */}

              <div className="mt-6 border-t border-slate-100 pt-5">
                <h3 className="font-semibold text-slate-800">
                  Parent / Guardian
                </h3>

                <div
                  className="
                    mt-4
                    grid
                    grid-cols-1
                    gap-5
                    sm:grid-cols-2
                  "
                >
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
                        .guardian
                        .phone
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

            {/* MODAL ACTIONS */}

            <div
              className="
                shrink-0
                border-t
                border-slate-200
                bg-white
                p-4
                sm:p-6
              "
            >
              <div
                className="
                  flex
                  flex-col-reverse
                  gap-3
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <Link
                  to={`/admin/players/${selectedPlayer.id}`}
                  className="
                    inline-flex
                    w-full
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-slate-300
                    px-4
                    py-2.5
                    text-center
                    text-sm
                    font-semibold
                    text-slate-700
                    transition
                    hover:bg-slate-50

                    sm:w-auto
                  "
                >
                  Open Full Profile
                </Link>

                <div
                  className="
                    grid
                    grid-cols-1
                    gap-2
                    sm:flex
                    sm:gap-3
                  "
                >
                  <button
                    type="button"
                    onClick={() => {
                      setConfirmation({
                        player:
                          selectedPlayer,
                        action:
                          "reject",
                      });

                      setSelectedPlayer(
                        null,
                      );
                    }}
                    className="
                      rounded-lg
                      border
                      border-red-200
                      px-4
                      py-2.5
                      text-sm
                      font-semibold
                      text-red-600
                      transition
                      hover:bg-red-50
                    "
                  >
                    Reject
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setConfirmation({
                        player:
                          selectedPlayer,
                        action:
                          "approve",
                      });

                      setSelectedPlayer(
                        null,
                      );
                    }}
                    className="
                      rounded-lg
                      bg-green-600
                      px-4
                      py-2.5
                      text-sm
                      font-semibold
                      text-white
                      transition
                      hover:bg-green-700
                    "
                  >
                    Approve Registration
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================
          CONFIRMATION MODAL
      ====================================== */}

      {confirmation && (
        <div
          className="
            fixed
            inset-0
            z-[60]
            flex
            items-end
            justify-center
            bg-slate-950/60
            p-0
            backdrop-blur-[1px]

            sm:items-center
            sm:p-4
          "
        >
          <div
            className="
              w-full
              min-w-0
              rounded-t-2xl
              bg-white
              p-5
              shadow-2xl

              sm:max-w-md
              sm:rounded-2xl
              sm:p-6
            "
          >
            <div
              className={[
                `
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                `,
                confirmation.action ===
                "approve"
                  ? `
                      bg-green-50
                      text-green-600
                    `
                  : `
                      bg-red-50
                      text-red-600
                    `,
              ].join(" ")}
            >
              {confirmation.action ===
              "approve" ? (
                <Check size={23} />
              ) : (
                <X size={23} />
              )}
            </div>

            <h2
              className="
                mt-5
                break-words
                text-lg
                font-bold
                text-slate-900
                sm:text-xl
              "
            >
              {confirmation.action ===
              "approve"
                ? "Approve Registration?"
                : "Reject Registration?"}
            </h2>

            <p className="mt-3 break-words text-sm leading-6 text-slate-600">
              {confirmation.action ===
              "approve"
                ? `${confirmation.player.fullName} will become a registered academy player.`
                : `${confirmation.player.fullName}'s registration will be marked as rejected.`}
            </p>

            <div
              className="
                mt-6
                flex
                flex-col-reverse
                gap-3
                sm:flex-row
                sm:justify-end
              "
            >
              <button
                type="button"
                onClick={() =>
                  setConfirmation(
                    null,
                  )
                }
                className="
                  w-full
                  rounded-lg
                  border
                  border-slate-300
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-slate-700
                  transition
                  hover:bg-slate-50

                  sm:w-auto
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  handleConfirm
                }
                className={[
                  `
                    w-full
                    rounded-lg
                    px-4
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    transition

                    sm:w-auto
                  `,
                  confirmation.action ===
                  "approve"
                    ? `
                        bg-green-600
                        hover:bg-green-700
                      `
                    : `
                        bg-red-600
                        hover:bg-red-700
                      `,
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

/* =========================================
   PLAYER AVATAR
========================================= */

function PlayerAvatar({
  player,
  size = "normal",
}: {
  player: Player;
  size?: "normal" | "large";
}) {
  const sizeClass =
    size === "large"
      ? "h-11 w-11"
      : "h-10 w-10";

  return (
    <div
      className={`
        flex
        shrink-0
        items-center
        justify-center
        overflow-hidden
        rounded-full
        bg-slate-100
        ${sizeClass}
      `}
    >
      {player.passportPhoto ? (
        <img
          src={player.passportPhoto}
          alt={player.fullName}
          className="h-full w-full object-cover"
        />
      ) : (
        <UserRound
          size={19}
          className="text-slate-400"
        />
      )}
    </div>
  );
}

/* =========================================
   MOBILE DETAIL
========================================= */

function MobileDetail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-medium text-slate-700">
        {value}
      </p>
    </div>
  );
}

/* =========================================
   REVIEW ITEM
========================================= */

interface ReviewItemProps {
  label: string;
  value: string;
}

function ReviewItem({
  label,
  value,
}: ReviewItemProps) {
  return (
    <div className="min-w-0">
      <p
        className="
          text-xs
          font-medium
          uppercase
          tracking-wide
          text-slate-400
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          break-words
          text-sm
          font-semibold
          text-slate-700
        "
      >
        {value || "—"}
      </p>
    </div>
  );
}

/* =========================================
   EMPTY STATE
========================================= */

function EmptyPendingState() {
  return (
    <div
      className="
        px-4
        py-10
        text-center
        sm:p-14
      "
    >
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
  );
}

export default PendingRegistrationsPage;