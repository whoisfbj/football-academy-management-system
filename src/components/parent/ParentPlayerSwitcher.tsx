import {
  ChevronDown,
  Users,
} from "lucide-react";

import {
  getLinkedPlayersForCurrentParent,
} from "../../services/parentService";

type ParentPlayerSwitcherProps = {
  selectedPlayerId: string;
  onPlayerChange: (
    playerId: string,
  ) => void;
};

function ParentPlayerSwitcher({
  selectedPlayerId,
  onPlayerChange,
}: ParentPlayerSwitcherProps) {
  const linkedPlayers =
    getLinkedPlayersForCurrentParent();

  if (linkedPlayers.length === 0) {
    return (
      <div
        className="
          w-full
          min-w-0
          rounded-xl
          border
          border-slate-200
          bg-white
          p-3
          sm:p-4
        "
      >
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-slate-100
              text-slate-500
            "
          >
            <Users size={19} />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-800">
              No linked players
            </p>

            <p className="mt-0.5 text-xs text-slate-500">
              No player profile is currently linked to this
              parent account.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /*
    If the account only has one player, we can still show
    the switcher information without making the interface
    unnecessarily complicated.
  */
  const selectedPlayer =
    linkedPlayers.find(
      (player) =>
        player.id ===
        selectedPlayerId,
    ) ??
    linkedPlayers[0];

  return (
    <div
      className="
        w-full
        min-w-0
        rounded-xl
        border
        border-slate-200
        bg-white
        p-3
        shadow-sm
        sm:p-4
      "
    >
      <div
        className="
          flex
          min-w-0
          flex-col
          gap-3
          sm:flex-row
          sm:items-center
        "
      >
        {/* ICON + LABEL */}

        <div className="flex min-w-0 items-center gap-3 sm:flex-1">
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-green-50
              text-green-700
            "
          >
            <Users size={19} />
          </div>

          <div className="min-w-0">
            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-wide
                text-slate-400
              "
            >
              Viewing Player
            </p>

            <p
              className="
                mt-0.5
                truncate
                text-sm
                font-bold
                text-slate-900
              "
            >
              {selectedPlayer.fullName}
            </p>
          </div>
        </div>

        {/* SELECT */}

        <div
          className="
            relative
            w-full
            min-w-0
            sm:w-auto
            sm:min-w-[220px]
            md:min-w-[260px]
          "
        >
          <select
            value={
              selectedPlayer.id
            }
            onChange={(event) =>
              onPlayerChange(
                event.target.value,
              )
            }
            aria-label="Select player"
            className="
              w-full
              min-w-0
              appearance-none
              truncate
              rounded-lg
              border
              border-slate-200
              bg-slate-50
              py-2.5
              pl-3
              pr-10
              text-sm
              font-semibold
              text-slate-800
              outline-none
              transition

              hover:border-slate-300

              focus:border-green-500
              focus:bg-white
              focus:ring-2
              focus:ring-green-500/10
            "
          >
            {linkedPlayers.map(
              (player) => (
                <option
                  key={player.id}
                  value={player.id}
                >
                  {player.fullName}
                  {player.ageCategory
                    ? ` — ${player.ageCategory}`
                    : ""}
                </option>
              ),
            )}
          </select>

          <ChevronDown
            size={17}
            className="
              pointer-events-none
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />
        </div>
      </div>

      {/* SMALL MOBILE PLAYER INFORMATION */}

      <div
        className="
          mt-3
          grid
          grid-cols-2
          gap-2
          border-t
          border-slate-100
          pt-3
          text-xs
          sm:hidden
        "
      >
        <div className="min-w-0">
          <p className="text-slate-400">
            Player ID
          </p>

          <p className="mt-0.5 truncate font-semibold text-slate-700">
            {selectedPlayer.playerId}
          </p>
        </div>

        <div className="min-w-0">
          <p className="text-slate-400">
            Age Category
          </p>

          <p className="mt-0.5 truncate font-semibold text-slate-700">
            {selectedPlayer.ageCategory ||
              "Not assigned"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ParentPlayerSwitcher;