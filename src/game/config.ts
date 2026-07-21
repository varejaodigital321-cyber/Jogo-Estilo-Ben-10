import Phaser from "phaser";
import { BootScene } from "./scenes/BootScene";
import { PrototypeScene } from "./scenes/PrototypeScene";

export const GAME_WIDTH = 960;
export const GAME_HEIGHT = 620;

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "game",
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  backgroundColor: "#10151d",
  transparent: false,
  scene: [BootScene, PrototypeScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  render: {
    antialias: true,
    pixelArt: false,
  },
};
