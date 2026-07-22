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
      this.add
        .text(48, 48, "Não foi possível carregar a arte do personagem.", {
          color: "#ffb4ab",
          fontFamily: "system-ui",
          fontSize: "24px",
          wordWrap: { width: 760 },
        })
        .setOrigin(0, 0);
      return;
    }

    this.scene.start("prototype");
  }
}
