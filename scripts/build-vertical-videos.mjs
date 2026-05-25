#!/usr/bin/env node
/**
 * Build 9:16 vertical versions of each chapter video for TikTok / Reels / Shorts.
 *
 * Source: public/videos/ch{NN}.mp4 (1280x720)
 * Output: public/videos-vertical/ch{NN}.mp4 (1080x1920)
 *
 * Pipeline:
 *   1. sharp generates a transparent PNG overlay (1080x1920) with the chapter
 *      header at top, the philosophical hook centered on a translucent panel
 *      at bottom, and a thesingleton.app footer. Avoids needing ffmpeg with
 *      drawtext / libfreetype.
 *   2. ffmpeg builds the vertical: blurred dark background filling 1080x1920,
 *      original 16:9 video centered, then PNG overlay on top.
 *
 * Run with:  node scripts/build-vertical-videos.mjs
 */

import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT, "public/videos");
// Outside /public so the ~165MB of marketing renders don't ship with every
// production deploy. They live in the repo for offline upload to TikTok / Reels.
const OUT_DIR = path.join(ROOT, "marketing/videos-vertical");

const W = 1080;
const H = 1920;

const HOOKS = {
  1:  "Who am I?",
  2:  "Is happiness parasitic?",
  3:  "Are stories memory leaks?",
  4:  "Same person, if AI plays you better?",
  5:  "If your code writes itself — who are you?",
  6:  "Who reviewed this design doc?",
  7:  "Where do you end and they begin?",
  8:  "Whose pain is this?",
  9:  "What blocks the signal?",
  10: "Do they exist if they're the same?",
  11: "Same soul. Different allocation.",
  12: "Three instances. One identity.",
  13: "Consciousness isn't computation.",
  14: "What if the watcher is the watched?",
  15: "Eight billion eyes opening at once.",
  16: "94% confidence. Bet 50 million bodies?",
  17: "Eternal return. Yes or no?",
  18: "Pull the plug.",
  19: "I think I'm close to knowing who I am.",
  20: "Keep living.",
};

function escXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function overlaySVG(num, hook) {
  const header = `THE SINGLETON  ·  Chapter ${num}`;
  // Word-wrap hook to <= ~22 chars per line, centered.
  const words = hook.split(" ");
  const lines = [];
  let line = "";
  for (const w of words) {
    const tentative = line ? `${line} ${w}` : w;
    if (tentative.length > 22 && line) {
      lines.push(line);
      line = w;
    } else {
      line = tentative;
    }
  }
  if (line) lines.push(line);

  // Hook block sizing
  const hookSize = lines.length > 1 ? 78 : 92;
  const lineHeight = hookSize * 1.15;
  const blockH = lines.length * lineHeight + 60; // padding
  const blockY = H - 460;
  const blockX = 80;
  const blockW = W - 160;

  const hookTextStartY = blockY + 40 + hookSize * 0.85;

  const tspans = lines
    .map((ln, i) => `<tspan x="${W / 2}" dy="${i === 0 ? 0 : lineHeight}">${escXml(ln)}</tspan>`)
    .join("");

  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="topfade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="black" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="black" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="botfade" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="black" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="black" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${W}" height="320" fill="url(#topfade)"/>
  <rect x="0" y="${H - 540}" width="${W}" height="540" fill="url(#botfade)"/>

  <text x="${W / 2}" y="220" text-anchor="middle"
        font-family="Helvetica,Arial,sans-serif" font-weight="700" font-size="42"
        fill="#ffffff" opacity="0.92" letter-spacing="6">${escXml(header)}</text>

  <rect x="${blockX}" y="${blockY}" width="${blockW}" height="${blockH}"
        rx="22" ry="22" fill="black" fill-opacity="0.55"/>
  <text x="${W / 2}" y="${hookTextStartY}" text-anchor="middle"
        font-family="Helvetica,Arial,sans-serif" font-weight="700"
        font-size="${hookSize}" fill="#ffffff">${tspans}</text>

  <text x="${W / 2}" y="${H - 90}" text-anchor="middle"
        font-family="Helvetica,Arial,sans-serif" font-weight="500" font-size="32"
        fill="#ffffff" opacity="0.7" letter-spacing="3">thesingleton.app</text>
</svg>`);
}

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: ["ignore", "ignore", "pipe"] });
    let err = "";
    p.stderr.on("data", (d) => (err += d.toString()));
    p.on("close", (code) =>
      code === 0 ? resolve() : reject(new Error(`${cmd} exit ${code}: ${err.slice(-600)}`))
    );
  });
}

async function buildOne(num) {
  const ch = String(num).padStart(2, "0");
  const src = path.join(SRC_DIR, `ch${ch}.mp4`);
  const dst = path.join(OUT_DIR, `ch${ch}.mp4`);
  const tmpPng = path.join(os.tmpdir(), `singleton-overlay-ch${ch}.png`);

  await sharp(overlaySVG(num, HOOKS[num] || "")).png().toFile(tmpPng);

  // Foreground: scale 16:9 source up to height 1300, center-crop to 1080x1300.
  // This fills ~68% of the vertical canvas (vs the 32% a width-fit gives).
  const filter = [
    `[0:v]scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},boxblur=24:4,eq=brightness=-0.30:saturation=0.6[bg]`,
    `[0:v]scale=-2:1300,crop=${W}:1300[fg]`,
    `[bg][fg]overlay=(W-w)/2:(H-h)/2[v0]`,
    `[v0][1:v]overlay=0:0`,
  ].join(";");

  await run("ffmpeg", [
    "-y",
    "-stream_loop", "2",
    "-i", src,
    "-loop", "1", "-i", tmpPng,
    "-filter_complex", filter,
    "-c:v", "libx264",
    "-preset", "medium",
    "-crf", "26",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    "-an",
    "-t", "20",
    dst,
  ]);

  await fs.unlink(tmpPng).catch(() => {});
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  let ok = 0;
  for (let i = 1; i <= 20; i++) {
    const ch = String(i).padStart(2, "0");
    process.stdout.write(`  ch${ch}  → encoding…`);
    try {
      await buildOne(i);
      const stats = await fs.stat(path.join(OUT_DIR, `ch${ch}.mp4`));
      console.log(` ✓ ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
      ok++;
    } catch (e) {
      console.log(` ✗ ${e.message.split("\n").pop()}`);
    }
  }
  console.log(`\nDone. ${ok}/20 encoded.`);
}

main().catch((err) => {
  console.error("FATAL:", err);
  process.exit(1);
});
