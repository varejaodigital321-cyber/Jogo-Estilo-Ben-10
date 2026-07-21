import { Howl, Howler } from "howler";

export const AUDIO_CHANNELS = [
  "master",
  "music",
  "effects",
  "ui",
  "ambience",
  "voice",
] as const;

export type AudioChannel = (typeof AUDIO_CHANNELS)[number];

export type AudioChannelLabel =
  | "Master"
  | "Música"
  | "Efeitos"
  | "Interface"
  | "Ambiente"
  | "Voz";

export const AUDIO_CHANNEL_LABELS: Record<AudioChannel, AudioChannelLabel> = {
  master: "Master",
  music: "Música",
  effects: "Efeitos",
  ui: "Interface",
  ambience: "Ambiente",
  voice: "Voz",
};

type ActiveSound = {
  channel: Exclude<AudioChannel, "master">;
  howl: Howl;
};

const DEFAULT_CHANNEL_DB: Record<AudioChannel, number> = {
  master: -3,
  music: -6,
  effects: -3,
  ui: -6,
  ambience: -9,
  voice: -3,
};

function dbToLinear(db: number): number {
  return 10 ** (db / 20);
}

function clampDb(db: number): number {
  if (!Number.isFinite(db)) {
    throw new Error("O volume do canal deve ser um número finito em dB.");
  }

  return Math.max(-60, Math.min(0, db));
}

export class AudioMixer {
  private readonly channelDb = new Map<AudioChannel, number>(
    AUDIO_CHANNELS.map((channel) => [channel, DEFAULT_CHANNEL_DB[channel]]),
  );

  private readonly activeSounds = new Set<ActiveSound>();

  constructor() {
    this.applyMasterVolume();
  }

  getChannelVolumeDb(channel: AudioChannel): number {
    return this.channelDb.get(channel) ?? DEFAULT_CHANNEL_DB[channel];
  }

  setChannelVolumeDb(channel: AudioChannel, db: number): void {
    const clampedDb = clampDb(db);
    this.channelDb.set(channel, clampedDb);

    if (channel === "master") {
      this.applyMasterVolume();
      return;
    }

    for (const sound of this.activeSounds) {
      if (sound.channel === channel) {
        sound.howl.volume(this.getEffectiveVolume(sound.channel));
      }
    }
  }

  setChannelVolume(channel: AudioChannel, slider01: number): void {
    if (!Number.isFinite(slider01)) {
      throw new Error("O volume do canal deve estar entre 0 e 1.");
    }

    const normalized = Math.max(0, Math.min(1, slider01));
    this.setChannelVolumeDb(channel, normalized === 0 ? -60 : 20 * Math.log10(normalized));
  }

  play(
    src: string | string[],
    channel: Exclude<AudioChannel, "master">,
    options: Omit<HowlOptions, "src" | "volume"> = {},
  ): Howl {
    const howl = new Howl({
      ...options,
      src: Array.isArray(src) ? src : [src],
      volume: this.getEffectiveVolume(channel),
    });
    const activeSound: ActiveSound = { channel, howl };

    this.activeSounds.add(activeSound);
    howl.once("end", () => this.activeSounds.delete(activeSound));
    howl.once("stop", () => this.activeSounds.delete(activeSound));
    howl.play();
    return howl;
  }

  stopAll(channel?: Exclude<AudioChannel, "master">): void {
    for (const sound of this.activeSounds) {
      if (!channel || sound.channel === channel) {
        sound.howl.stop();
      }
    }
  }

  private getEffectiveVolume(channel: Exclude<AudioChannel, "master">): number {
    return dbToLinear(this.getChannelVolumeDb("master") + this.getChannelVolumeDb(channel));
  }

  private applyMasterVolume(): void {
    Howler.volume(dbToLinear(this.getChannelVolumeDb("master")));

    for (const sound of this.activeSounds) {
      sound.howl.volume(this.getEffectiveVolume(sound.channel));
    }
  }
}

export const audioMixer = new AudioMixer();

type HowlOptions = ConstructorParameters<typeof Howl>[0];
