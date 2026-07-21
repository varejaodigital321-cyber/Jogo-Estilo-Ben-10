import type { GameTestApi } from "../game/testing/GameTestApi";

declare global {
  interface Window {
    GAME_TEST_API: GameTestApi;
  }
}

export {};
