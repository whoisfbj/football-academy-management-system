import {
  demoParentPlayerLinks,
} from "../data/demoParentPlayerLinks";

import type {
  ParentPlayerLink,
} from "../shared/types/parent";

import type {
  Player,
} from "../shared/types/player";

import {
  getCurrentUser,
} from "./authService";

import {
  getPlayerById,
} from "./playerService";

const STORAGE_KEY =
  "academy_parent_player_links";

/* =====================================================
   INITIALIZE PARENT / PLAYER LINKS
===================================================== */

export function initializeParentPlayerLinks() {
  const existing =
    localStorage.getItem(
      STORAGE_KEY,
    );

  if (!existing) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        demoParentPlayerLinks,
      ),
    );
  }
}

/* =====================================================
   GET ALL LINKS
===================================================== */

export function getParentPlayerLinks():
  ParentPlayerLink[] {
  initializeParentPlayerLinks();

  return JSON.parse(
    localStorage.getItem(
      STORAGE_KEY,
    ) || "[]",
  ) as ParentPlayerLink[];
}

/* =====================================================
   SAVE LINKS
===================================================== */

export function saveParentPlayerLinks(
  links: ParentPlayerLink[],
) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(
      links,
    ),
  );
}

/* =====================================================
   GET LINK FOR A PARENT
===================================================== */

export function getParentPlayerLink(
  parentUserId: string,
):
  | ParentPlayerLink
  | undefined {
  return getParentPlayerLinks().find(
    (link) =>
      link.parentUserId ===
      parentUserId,
  );
}

/* =====================================================
   GET PLAYERS FOR SPECIFIC PARENT
===================================================== */

export function getLinkedPlayersForParent(
  parentUserId: string,
): Player[] {
  const parentLink =
    getParentPlayerLink(
      parentUserId,
    );

  if (!parentLink) {
    return [];
  }

  return parentLink.playerIds
    .map((playerId) =>
      getPlayerById(
        playerId,
      ),
    )
    .filter(
      (
        player,
      ): player is Player =>
        player !== undefined,
    );
}

/* =====================================================
   CURRENT PARENT'S PLAYERS
===================================================== */

export function getLinkedPlayersForCurrentParent():
  Player[] {
  const currentUser =
    getCurrentUser();

  if (
    !currentUser ||
    currentUser.role !== "parent"
  ) {
    return [];
  }

  return getLinkedPlayersForParent(
    currentUser.id,
  );
}

/* =====================================================
   SELECTED PLAYER STORAGE KEY
===================================================== */

function getSelectedPlayerStorageKey(
  parentUserId: string,
) {
  return `academy_selected_parent_player_${parentUserId}`;
}

/* =====================================================
   GET SELECTED PLAYER ID
===================================================== */

export function getSelectedLinkedPlayerId():
  | string
  | undefined {
  const currentUser =
    getCurrentUser();

  if (
    !currentUser ||
    currentUser.role !== "parent"
  ) {
    return undefined;
  }

  const players =
    getLinkedPlayersForCurrentParent();

  if (players.length === 0) {
    return undefined;
  }

  const storageKey =
    getSelectedPlayerStorageKey(
      currentUser.id,
    );

  const savedPlayerId =
    localStorage.getItem(
      storageKey,
    );

  /*
   * Make sure the stored player
   * actually belongs to this parent.
   */
  if (savedPlayerId) {
    const isValid =
      players.some(
        (player) =>
          player.id ===
          savedPlayerId,
      );

    if (isValid) {
      return savedPlayerId;
    }
  }

  /*
   * Default to the first linked
   * player.
   */
  const firstPlayerId =
    players[0].id;

  localStorage.setItem(
    storageKey,
    firstPlayerId,
  );

  return firstPlayerId;
}

/* =====================================================
   SET SELECTED PLAYER
===================================================== */

export function setSelectedLinkedPlayerId(
  playerId: string,
) {
  const currentUser =
    getCurrentUser();

  if (
    !currentUser ||
    currentUser.role !== "parent"
  ) {
    return false;
  }

  const linkedPlayers =
    getLinkedPlayersForCurrentParent();

  const belongsToParent =
    linkedPlayers.some(
      (player) =>
        player.id === playerId,
    );

  if (!belongsToParent) {
    return false;
  }

  const storageKey =
    getSelectedPlayerStorageKey(
      currentUser.id,
    );

  localStorage.setItem(
    storageKey,
    playerId,
  );

  return true;
}

/* =====================================================
   GET CURRENTLY SELECTED PLAYER
===================================================== */

export function getSelectedLinkedPlayer():
  | Player
  | undefined {
  const players =
    getLinkedPlayersForCurrentParent();

  if (players.length === 0) {
    return undefined;
  }

  const selectedPlayerId =
    getSelectedLinkedPlayerId();

  if (!selectedPlayerId) {
    return players[0];
  }

  return (
    players.find(
      (player) =>
        player.id ===
        selectedPlayerId,
    ) ?? players[0]
  );
}

/* =====================================================
   BACKWARDS-COMPATIBLE FUNCTION
===================================================== */

/*
 * All existing parent pages already
 * call getPrimaryLinkedPlayer().
 *
 * We keep that function, but it now
 * returns the parent's currently
 * selected child.
 */
export function getPrimaryLinkedPlayer():
  | Player
  | undefined {
  return getSelectedLinkedPlayer();
}

/* =====================================================
   LINK PLAYER TO PARENT
===================================================== */

export function linkPlayerToParent(
  parentUserId: string,
  playerId: string,
) {
  const links =
    getParentPlayerLinks();

  const existingIndex =
    links.findIndex(
      (link) =>
        link.parentUserId ===
        parentUserId,
    );

  if (existingIndex === -1) {
    links.push({
      parentUserId,
      playerIds: [
        playerId,
      ],
    });

    saveParentPlayerLinks(
      links,
    );

    return;
  }

  const existing =
    links[existingIndex];

  if (
    existing.playerIds.includes(
      playerId,
    )
  ) {
    return;
  }

  links[existingIndex] = {
    ...existing,

    playerIds: [
      ...existing.playerIds,
      playerId,
    ],
  };

  saveParentPlayerLinks(
    links,
  );
}

/* =====================================================
   UNLINK PLAYER FROM PARENT
===================================================== */

export function unlinkPlayerFromParent(
  parentUserId: string,
  playerId: string,
) {
  const links =
    getParentPlayerLinks();

  const updated =
    links.map((link) => {
      if (
        link.parentUserId !==
        parentUserId
      ) {
        return link;
      }

      return {
        ...link,

        playerIds:
          link.playerIds.filter(
            (id) =>
              id !== playerId,
          ),
      };
    });

  saveParentPlayerLinks(
    updated,
  );

  const currentUser =
    getCurrentUser();

  if (
    currentUser?.id ===
    parentUserId
  ) {
    const storageKey =
      getSelectedPlayerStorageKey(
        parentUserId,
      );

    const selected =
      localStorage.getItem(
        storageKey,
      );

    if (
      selected === playerId
    ) {
      localStorage.removeItem(
        storageKey,
      );
    }
  }
}