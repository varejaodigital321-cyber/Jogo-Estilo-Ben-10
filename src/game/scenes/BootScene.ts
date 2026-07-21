import Phaser from "phaser";
import {
  PLAYER_IDLE_FRAME_HEIGHT,
  PLAYER_IDLE_FRAME_WIDTH,
  PLAYER_IDLE_TEXTURE_KEY,
  PLAYER_IDLE_TEXTURE_PATH,
} from "../constants/animations";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("boot");
  }

  preload(): void {
    this.load.spritesheet(PLAYER_IDLE_TEXTURE_KEY, PLAYER_IDLE_TEXTURE_PATH, {
      frameWidth: PLAYER_IDLE_FRAME_WIDTH,
      frameHeight: PLAYER_IDLE_FRAME_HEIGHT,
    });

    this.load.once(Phaser.Loader.Events.FILE_LOAD_ERROR, (file: Phaser.Loader.File) => {
      const status = document.querySelector<HTMLElement>("#asset-status");
      if (status) {
        status.textContent = `Falha ao carregar o ativo: ${file.src}`;
        status.classList.add("status--error");
      }
    });
  }

  create(): void {
    if (!this.textures.exists(PLAYER_IDLE_TEXTURE_KEY)) {
      return;
    }

    this.scene.start("prototype");
  }
}
