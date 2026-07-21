import Phaser from "phaser";
import { gameConfig } from "./game/config";
import { createGameTestApi } from "./game/testing/GameTestApi";
import "./game/audio/AudioMixer";
import "./styles/main.css";

window.GAME_TEST_API = createGameTestApi();
const game = new Phaser.Game(gameConfig);

window.addEventListener("beforeunload", () => game.destroy(true));
