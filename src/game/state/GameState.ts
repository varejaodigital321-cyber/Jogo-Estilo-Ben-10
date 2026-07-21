export const GAME_SAVE_KEY = "original-2d-game-save-v1";
export const GAME_STATE_VERSION = 1;
export const DEFAULT_PLAYER_MAX_HP = 100;
export const DEFAULT_BATTLE_ENEMY_HP = 100;
export const BATTLE_WIN_REWARD = 10;

export type BattleResult = "active" | "won" | "lost";

export type BattleState = {
  enemyId: string;
  enemyMaxHp: number;
  enemyHp: number;
  turns: number;
  result: BattleResult;
};

export type GameState = {
  version: number;
  player: {
    hp: number;
    maxHp: number;
    resources: number;
    items: Record<string, number>;
  };
  progression: {
    battlesStarted: number;
    battlesWon: number;
    battlesLost: number;
  };
  battle: BattleState | null;
};

export function createInitialGameState(): GameState {
  return {
    version: GAME_STATE_VERSION,
    player: {
      hp: DEFAULT_PLAYER_MAX_HP,
      maxHp: DEFAULT_PLAYER_MAX_HP,
      resources: 0,
      items: {},
    },
    progression: {
      battlesStarted: 0,
      battlesWon: 0,
      battlesLost: 0,
    },
    battle: null,
  };
}

export function cloneGameState(state: GameState): GameState {
  return {
    version: state.version,
    player: {
      hp: state.player.hp,
      maxHp: state.player.maxHp,
      resources: state.player.resources,
      items: { ...state.player.items },
    },
    progression: { ...state.progression },
    battle: state.battle ? { ...state.battle } : null,
  };
}

export function parseSavedGame(raw: string): GameState | null {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isGameState(parsed)) {
      return null;
    }
    return cloneGameState(parsed);
  } catch {
    return null;
  }
}

function isGameState(value: unknown): value is GameState {
  if (!value || typeof value !== "object") return false;
  const state = value as Partial<GameState>;
  return state.version === GAME_STATE_VERSION
    && !!state.player
    && Number.isFinite(state.player.hp)
    && Number.isFinite(state.player.maxHp)
    && Number.isFinite(state.player.resources)
    && !!state.player.items
    && !!state.progression
    && Number.isFinite(state.progression.battlesStarted)
    && Number.isFinite(state.progression.battlesWon)
    && Number.isFinite(state.progression.battlesLost)
    && (state.battle === null || isBattleState(state.battle));
}

function isBattleState(value: unknown): value is BattleState {
  if (!value || typeof value !== "object") return false;
  const battle = value as Partial<BattleState>;
  return typeof battle.enemyId === "string"
    && Number.isFinite(battle.enemyMaxHp)
    && Number.isFinite(battle.enemyHp)
    && Number.isFinite(battle.turns)
    && (battle.result === "active" || battle.result === "won" || battle.result === "lost");
}
