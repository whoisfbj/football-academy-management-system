import {
  ChevronDown,
  UserRound,
} from "lucide-react";

import {
  getLinkedPlayersForCurrentParent,
} from "../../services/parentService";

type ParentPlayerSwitcherProps = {
  selectedPlayerId?: string;

  onPlayerChange: (
    playerId: string,
  ) => void;
};

function ParentPlayerSwitcher({
  selectedPlayerId,
  onPlayerChange,
}: ParentPlayerSwitcherProps) {
  const players =
    getLinkedPlayersForCurrentParent();

  if (players.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
            <UserRound size={18} />
          </div>

          <div>
            <p className="text-xs text-slate-400">
              Linked Player
            </p>

            <p className="text-sm font-semibold text-slate-700">
              No player linked
            </p>
          </div>
        </div>
      </div>
    );
  }

  const selectedPlayer =
    players.find(
      (player) =>
        player.id ===
        selectedPlayerId,
    ) ?? players[0];

  /*
   * If only one child exists,
   * display the player without
   * showing a dropdown.
   */
  if (players.length === 1) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <PlayerPhoto
            playerName={
              selectedPlayer.fullName
            }
            photo={
              selectedPlayer.passportPhoto
            }
          />

          <div className="min-w-0">
            <p className="text-xs text-slate-400">
              Viewing Player
            </p>

            <p className="truncate text-sm font-semibold text-slate-800">
              {
                selectedPlayer.fullName
              }
            </p>

            <p className="mt-0.5 truncate text-xs text-green-600">
              {
                selectedPlayer.playerId
              }{" "}
              •{" "}
              {
                selectedPlayer.ageCategory
              }
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <label
        htmlFor="parent-player-switcher"
        className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400"
      >
        Viewing Player
      </label>

      <div className="flex items-center gap-3">
        <PlayerPhoto
          playerName={
            selectedPlayer.fullName
          }
          photo={
            selectedPlayer.passportPhoto
          }
        />

        <div className="relative min-w-0 flex-1">
          <select
            id="parent-player-switcher"
            value={
              selectedPlayer.id
            }
            onChange={(event) =>
              onPlayerChange(
                event.target.value,
              )
            }
            className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 py-2 pl-3 pr-9 text-sm font-semibold text-slate-800 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/10"
          >
            {players.map(
              (player) => (
                <option
                  key={player.id}
                  value={player.id}
                >
                  {player.fullName} -{" "}
                  {player.playerId}
                </option>
              ),
            )}
          </select>

          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>
      </div>

      <p className="mt-2 truncate pl-12 text-xs text-slate-500">
        {
          selectedPlayer.ageCategory
        }{" "}
        •{" "}
        {selectedPlayer.academyTeam ??
          "No team assigned"}
      </p>
    </div>
  );
}

function PlayerPhoto({
  playerName,
  photo,
}: {
  playerName: string;
  photo?: string;
}) {
  if (photo) {
    return (
      <img
        src={photo}
        alt={playerName}
        className="h-10 w-10 shrink-0 rounded-lg object-cover"
      />
    );
  }

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
      <UserRound size={19} />
    </div>
  );
}

export default ParentPlayerSwitcher;