import { demoPlayers } from "../data/demoPlayers";

import type { Player } from "../shared/types/player";

const PLAYERS_KEY = "academy_players";

export function initializePlayers() {
  const existingPlayers = localStorage.getItem(PLAYERS_KEY);

  if (!existingPlayers) {
    localStorage.setItem(
      PLAYERS_KEY,
      JSON.stringify(demoPlayers),
    );
  }
}

export function getPlayers(): Player[] {
  initializePlayers();

  const savedPlayers = localStorage.getItem(PLAYERS_KEY);

  if (!savedPlayers) {
    return [];
  }

  try {
    return JSON.parse(savedPlayers) as Player[];
  } catch {
    return [];
  }
}

export function savePlayers(players: Player[]) {
  localStorage.setItem(
    PLAYERS_KEY,
    JSON.stringify(players),
  );
}

export function getPlayerById(
  id: string,
): Player | undefined {
  return getPlayers().find(
    (player) =>
      player.id === id ||
      player.playerId === id,
  );
}

export function approvePlayerRegistration(
  id: string,
): Player | undefined {
  const players = getPlayers();

  const player = players.find(
    (item) => item.id === id,
  );

  if (!player) {
    return undefined;
  }

  const updatedPlayer: Player = {
    ...player,
    registrationStatus: "Registered",
    status:
      player.status === "Pending Registration"
        ? "Registered"
        : player.status,
  };

  updatePlayer(updatedPlayer);

  return updatedPlayer;
}

export function rejectPlayerRegistration(
  id: string,
): Player | undefined {
  const players = getPlayers();

  const player = players.find(
    (item) => item.id === id,
  );

  if (!player) {
    return undefined;
  }

  const updatedPlayer: Player = {
    ...player,
    registrationStatus: "Rejected",
    status: "Inactive",
  };

  updatePlayer(updatedPlayer);

  return updatedPlayer;
}



export function addPlayer(player: Player) {
  const players = getPlayers();

  savePlayers([
    ...players,
    player,
  ]);
}

export function updatePlayer(
  updatedPlayer: Player,
) {
  const players = getPlayers();

  const updatedPlayers = players.map((player) =>
    player.id === updatedPlayer.id
      ? updatedPlayer
      : player,
  );

  savePlayers(updatedPlayers);
}

export function generatePlayerId(): string {
  const players = getPlayers();

  const year = new Date()
    .getFullYear()
    .toString()
    .slice(-2);

  const currentYearPlayers = players.filter((player) =>
    player.playerId.startsWith(`PLY-${year}-`),
  );

  const sequences = currentYearPlayers
    .map((player) => {
      const parts = player.playerId.split("-");

      return Number(parts[2]);
    })
    .filter((sequence) => !Number.isNaN(sequence));

  const nextSequence =
    sequences.length > 0
      ? Math.max(...sequences) + 1
      : 1;

  return `PLY-${year}-${String(nextSequence).padStart(
    4,
    "0",
  )}`;
}