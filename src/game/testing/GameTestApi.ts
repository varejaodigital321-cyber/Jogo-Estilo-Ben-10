import {
  BATTLE_WIN_REWARD,
  DEFAULT_BATTLE_ENEMY_HP,
  GAME_SAVE_KEY,
  cloneGameState,
  createInitialGameState,
  parseSavedGame,
  type GameState,
} from "../state/GameState";

export type GameTestApi = {
  getState: () => GameState;
  startBattle: (enemyId?: string, enemyHp?: number) => GameState;
  giveItem: (itemId: string, amount?: number) => GameState;
  damagePlayer: (amount: number) => GameState;
  winBattle: () => GameState;
  saveGame: () => GameState;
  loadGame: () => GameState;
  resetGame: () => GameState;
};

export function createGameTestApi(storage: Storage | null = getBrowserStorage()): GameTestApi {
  let state = createInitialGameState();

  const getState = (): GameState => cloneGameState(state);

  const startBattle = (enemyId = "training-dummy", enemyHp = DEFAULT_BATTLE_ENEMY_HP): GameState => {
    assertNonEmptyString(enemyId, "enemyId");
    assertPositiveNumber(enemyHp, "enemyHp");
    state.battle = {
      enemyId,
      enemyMaxHp: enemyHp,
      enemyHp,
      turns: 0,
      result: "active",
    };
    state.player.hp = state.player.maxHp;
    state.progression.battlesStarted += 1;
    return getState();
  };

  const giveItem = (itemId: string, amount = 1): GameState => {
    assertNonEmptyString(itemId, "itemId");
    assertPositiveInteger(amount, "amount");
    state.player.items[itemId] = (state.player.items[itemId] ?? 0) + amount;
    return getState();
  };

  const damagePlayer = (amount: number): GameState => {
    assertPositiveNumber(amount, "amount");
    state.player.hp = Math.max(0, state.player.hp - amount);
    if (state.battle?.result === "active") {
      state.battle.turns += 1;
      if (state.player.hp === 0) {
        state.battle.result = "lost";
        state.progression.battlesLost += 1;
      }
    }
    return getState();
  };

  const winBattle = (): GameState => {
    if (!state.battle || state.battle.result !== "active") {
      throw new Error("Cannot win a battle that is not active.");
    }
    state.battle.result = "won";
    state.battle.enemyHp = 0;
    state.battle.turns += 1;
    state.progression.battlesWon += 1;
    state.player.resources += BATTLE_WIN_REWARD;
    return getState();
  };

  const saveGame = (): GameState => {
    if (storage) {
      storage.setItem(GAME_SAVE_KEY, JSON.stringify(state));
    }
    return getState();
  };

  const loadGame = (): GameState => {
    const saved = storage?.getItem(GAME_SAVE_KEY);
    const loaded = saved ? parseSavedGame(saved) : null;
    if (loaded) {
      state = loaded;
    }
    return getState();
  };

  const resetGame = (): GameState => {
    state = createInitialGameState();
    storage?.removeItem(GAME_SAVE_KEY);
    return getState();
  };

  return { getState, startBattle, giveItem, damagePlayer, winBattle, saveGame, loadGame, resetGame };
}

function getBrowserStorage(): Storage | null {
  return typeof window === "undefined" ? null : window.localStorage;
}

function assertNonEmptyString(value: string, name: string): void {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new TypeError(`${name} must be a non-empty string.`);
  }
}

function assertPositiveNumber(value: number, name: string): void {
  if (!Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${name} must be a finite number greater than zero.`);
  }
}

function assertPositiveInteger(value: number, name: string): void {
  if (!Number.isInteger(value) || value <= 0) {
    throw new RangeError(`${name} must be a positive integer.`);
  }
}
