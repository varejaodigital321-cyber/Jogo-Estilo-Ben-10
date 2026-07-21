import Phaser from "phaser";
import { GAME_HEIGHT, GAME_WIDTH } from "../config";
import {
  PLAYER_IDLE_ANIMATION_KEY,
  PLAYER_IDLE_FRAME_COUNT,
  PLAYER_IDLE_FRAME_RATE,
  PLAYER_IDLE_TEXTURE_KEY,
} from "../constants/animations";

const TARGET_CHARACTER_HEIGHT = 500;

type Diagnostics = {
  fps: HTMLElement | null;
  frame: HTMLElement | null;
  scale: HTMLElement | null;
  status: HTMLElement | null;
};

export class PrototypeScene extends Phaser.Scene {
  private player?: Phaser.GameObjects.Sprite;
  private diagnostics?: Diagnostics;
  private lastDiagnosticsUpdate = 0;

  constructor() {
    super("prototype");
  }

  create(): void {
    this.drawTestBackground();
    this.createIdleAnimation();

    this.player = this.add
      .sprite(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 8, PLAYER_IDLE_TEXTURE_KEY, 0)
      .setOrigin(0.5)
      .setScale(TARGET_CHARACTER_HEIGHT / 560)
      .play(PLAYER_IDLE_ANIMATION_KEY);

    this.diagnostics = {
      fps: document.querySelector("#diag-fps"),
      frame: document.querySelector("#diag-frame"),
      scale: document.querySelector("#diag-scale"),
      status: document.querySelector("#asset-status"),
    };

    if (this.diagnostics.status) {
      this.diagnostics.status.textContent = "Spritesheet carregada · idle em execução";
      this.diagnostics.status.classList.add("status--ok");
    }
    if (this.diagnostics.scale) {
      this.diagnostics.scale.textContent = `${this.player.scaleX.toFixed(3)}×`;
    }
  }

  update(time: number): void {
    if (!this.player || !this.diagnostics || time - this.lastDiagnosticsUpdate < 150) {
      return;
    }

    this.lastDiagnosticsUpdate = time;
    if (this.diagnostics.fps) {
      this.diagnostics.fps.textContent = this.game.loop.actualFps.toFixed(0);
    }
    if (this.diagnostics.frame) {
      this.diagnostics.frame.textContent = `${this.player.anims.currentFrame?.index ?? 0} / ${PLAYER_IDLE_FRAME_COUNT}`;
    }
  }

  private createIdleAnimation(): void {
    if (this.anims.exists(PLAYER_IDLE_ANIMATION_KEY)) {
      return;
    }

    this.anims.create({
      key: PLAYER_IDLE_ANIMATION_KEY,
      frames: this.anims.generateFrameNumbers(PLAYER_IDLE_TEXTURE_KEY, {
        start: 0,
        end: PLAYER_IDLE_FRAME_COUNT - 1,
      }),
      frameRate: PLAYER_IDLE_FRAME_RATE,
      repeat: -1,
    });
  }

  private drawTestBackground(): void {
    const graphics = this.add.graphics();
    graphics.fillStyle(0xf1f4f7).fillRect(0, 0, GAME_WIDTH / 2, GAME_HEIGHT);
    graphics.fillStyle(0x111820).fillRect(GAME_WIDTH / 2, 0, GAME_WIDTH / 2, GAME_HEIGHT);
    graphics.lineStyle(2, 0x7f8b98, 0.45).lineBetween(GAME_WIDTH / 2, 0, GAME_WIDTH / 2, GAME_HEIGHT);

    this.add.text(24, 22, "FUNDO CLARO", { color: "#253240", fontFamily: "system-ui", fontSize: "18px", fontStyle: "bold" });
    this.add.text(GAME_WIDTH - 24, 22, "FUNDO ESCURO", { color: "#d8e3ec", fontFamily: "system-ui", fontSize: "18px", fontStyle: "bold" }).setOrigin(1, 0);
  }
}
