import { open } from "node:fs/promises";

const filePath = new URL("../public/assets/player/idle/idle_sprite_sheet.png", import.meta.url);
const expected = { width: 1200, height: 560, frameWidth: 300, frameHeight: 560, frames: 4 };

async function readPngHeader() {
  const file = await open(filePath, "r");
  try {
    const buffer = Buffer.alloc(26);
    await file.read(buffer, 0, buffer.length, 0);
    const signature = buffer.subarray(0, 8).toString("hex");
    if (signature !== "89504e470d0a1a0a" || buffer.subarray(12, 16).toString("ascii") !== "IHDR") {
      throw new Error("o arquivo não possui cabeçalho PNG válido");
    }
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20), colorType: buffer[25] };
  } finally {
    await file.close();
  }
}

try {
  const png = await readPngHeader();
  const hasAlpha = png.colorType === 4 || png.colorType === 6;
  const exactGrid = png.width % expected.frameWidth === 0 && png.height === expected.frameHeight;
  const frameCount = exactGrid ? png.width / expected.frameWidth : 0;
  const errors = [];

  if (png.width !== expected.width || png.height !== expected.height) errors.push(`dimensões ${png.width} × ${png.height}`);
  if (!hasAlpha) errors.push(`tipo de cor PNG ${png.colorType} sem canal alfa`);
  if (!exactGrid || frameCount !== expected.frames) errors.push(`grade incompatível: ${frameCount || "inválida"} quadros`);

  if (errors.length) throw new Error(errors.join("; "));
  console.log(`Ativo válido: ${png.width} × ${png.height}, RGBA, ${frameCount} quadros de ${expected.frameWidth} × ${expected.frameHeight}.`);
} catch (error) {
  console.error(`Validação do spritesheet falhou: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
