#!/usr/bin/env node
/**
 * Bake typography onto cover.jpg → cover-titled.jpg, then derive:
 *   - cover-hero.jpg   (1200×1789, progressive, used on homepage)
 *   - og-cover.jpg     (1200×630, share card)
 *   - apple-touch-icon.png (512×512, cropped to pod area)
 *   - favicon-32.png   (32×32, same crop)
 *
 * Run with:  node scripts/build-cover.mjs
 */

import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUB = path.join(ROOT, "public");
const SRC = path.join(PUB, "cover.jpg");

// --- typography overlay (SVG) ---
function titleSVG(width, height) {
  // Letter-spaced caps title near the top, italic subtitle, byline at the bottom.
  const title = "THE SINGLETON";
  const sub = "LIFE OF AN SDE";
  const byline = "HOMER";
  const titleSize = Math.round(width * 0.082);   // ~140 at 1696w
  const subSize = Math.round(width * 0.024);     // ~40
  const bySize = Math.round(width * 0.030);      // ~50
  const titleY = Math.round(height * 0.085);
  const subY = titleY + Math.round(titleSize * 0.95);
  const byY = Math.round(height * 0.965);

  return Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <style>
      .t { font-family: 'Georgia','Times New Roman',serif; font-weight: 700; fill: #f3ece0; letter-spacing: ${titleSize * 0.06}px; }
      .s { font-family: 'Georgia','Times New Roman',serif; font-style: italic; fill: #c9bfa9; letter-spacing: ${subSize * 0.25}px; }
      .b { font-family: 'Helvetica','Arial',sans-serif; font-weight: 400; fill: #a89e87; letter-spacing: ${bySize * 0.5}px; }
    </style>
  </defs>
  <text x="50%" y="${titleY}" text-anchor="middle" class="t" font-size="${titleSize}">${title}</text>
  <text x="50%" y="${subY}" text-anchor="middle" class="s" font-size="${subSize}">${sub}</text>
  <text x="50%" y="${byY}" text-anchor="middle" class="b" font-size="${bySize}">${byline}</text>
</svg>`);
}

async function main() {
  const rawMeta = await sharp(SRC).metadata();
  console.log(`source: ${rawMeta.width} x ${rawMeta.height}`);

  // The Gemini source has a thin light edge on all four sides — crop it.
  const TRIM = 16;
  const trimmed = await sharp(SRC)
    .extract({
      left: TRIM,
      top: TRIM,
      width: rawMeta.width - TRIM * 2,
      height: rawMeta.height - TRIM * 2,
    })
    .toBuffer();
  const meta = await sharp(trimmed).metadata();

  // 1. titled full-resolution cover
  const titled = await sharp(trimmed)
    .composite([{ input: titleSVG(meta.width, meta.height), top: 0, left: 0 }])
    .jpeg({ quality: 90, progressive: true })
    .toBuffer();
  await sharp(titled).toFile(path.join(PUB, "cover-titled.jpg"));
  console.log("wrote cover-titled.jpg");

  // 2. hero (1200 wide, progressive) — used on homepage
  await sharp(titled)
    .resize({ width: 1200, withoutEnlargement: true })
    .jpeg({ quality: 85, progressive: true, mozjpeg: true })
    .toFile(path.join(PUB, "cover-hero.jpg"));
  console.log("wrote cover-hero.jpg");

  // 3. OG card 1200×630 — cover centered on dark bg
  const ogBg = sharp({
    create: { width: 1200, height: 630, channels: 3, background: { r: 12, g: 12, b: 14 } },
  });
  const ogCover = await sharp(titled)
    .resize({ height: 590, withoutEnlargement: true })
    .toBuffer();
  const ogCoverMeta = await sharp(ogCover).metadata();
  await ogBg
    .composite([
      { input: ogCover, top: 20, left: Math.round((1200 - ogCoverMeta.width) / 2) },
    ])
    .jpeg({ quality: 85, progressive: true, mozjpeg: true })
    .toFile(path.join(PUB, "og-cover.jpg"));
  console.log("wrote og-cover.jpg 1200x630");

  // 4. icons — crop to pod area on the trimmed image (no text), 800×800.
  // Pod-rich area sits roughly around y≈700 on the trimmed cover.
  const cropX = Math.max(0, Math.round((meta.width - 800) / 2));
  const iconCrop = await sharp(trimmed)
    .extract({ left: cropX, top: 700, width: 800, height: 800 })
    .toBuffer();
  await sharp(iconCrop)
    .resize(512, 512)
    .png()
    .toFile(path.join(PUB, "apple-touch-icon.png"));
  console.log("wrote apple-touch-icon.png 512x512");
  await sharp(iconCrop)
    .resize(32, 32)
    .png()
    .toFile(path.join(PUB, "favicon-32.png"));
  console.log("wrote favicon-32.png 32x32");
}

main().catch((err) => {
  console.error("FATAL:", err);
  process.exit(1);
});
