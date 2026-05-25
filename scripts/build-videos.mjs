#!/usr/bin/env node
/**
 * Re-encode chapter videos from download/ → public/videos/ch{NN}.mp4
 * Also generates a poster JPG per chapter from a mid-frame.
 *
 * Mapping is by filename prefix (the source files use a unicode ellipsis +
 * spaces in their names, which makes hard-coded paths fragile). For any
 * concept with two takes, prefer the "_2" (refined) take.
 *
 * Run with:  node scripts/build-videos.mjs
 */

import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT, "download");
const OUT_DIR = path.join(ROOT, "public/videos");

// chapter → filename prefix (matches the start of the source filename)
const CHAPTERS = {
  1:  "Man's_fingers_tapping_smartphone",
  2:  "God-like_viewpoint_looking_Earth",
  3:  "Human_eye_merging_worlds",
  4:  "Athlete_runs_slow_motion_digital",
  5:  "Code_forming_human_silhouette_desk",
  6:  "Cosmic_nebula_reveals_artificial",
  7:  "Husband_wife_embrace_digital_bar",
  8:  "Blood_drop_falls_into_ocean",
  9:  "Old_man_tending_flower_digital",
  10: "Two_girls_playing_one_shadow",
  11: "Man_reflection_swapping_places",
  12: "Three_spotlights_cast_shadows",
  13: "Humanoid_face_glass_fiber_optics",
  14: "Man_stared_at_by_city",
  15: "People_stop_and_look_up",
  16: "Man_writes_equation,_eye_forms",
  17: "Water_drop_explodes_into_universe",
  18: "Man_floating_in_glass_cube",
  19: "Hands_touching,_branches_from_tree",
  20: "Gateway_shatters_revealing_stars",
};

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: ["ignore", "ignore", "pipe"] });
    let err = "";
    p.stderr.on("data", (d) => (err += d.toString()));
    p.on("close", (code) =>
      code === 0 ? resolve() : reject(new Error(`${cmd} exit ${code}: ${err.slice(-400)}`))
    );
  });
}

async function pickSource(prefix, files) {
  // Prefer the "_2" take (refined) when both exist.
  const matches = files.filter((f) => f.startsWith(prefix));
  if (!matches.length) return null;
  const refined = matches.find((f) => /_2\.mp4$/.test(f));
  return refined || matches[0];
}

async function encode(src, dstMp4, dstPoster) {
  // ~720p wide, h264, CRF 28, scaled, fast preset, faststart for streaming.
  await run("ffmpeg", [
    "-y", "-i", src,
    "-vf", "scale='min(1280,iw)':-2",
    "-c:v", "libx264",
    "-preset", "medium",
    "-crf", "28",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    "-an", // strip audio (these are silent visuals; loop-friendly)
    dstMp4,
  ]);
  // Poster: a frame from ~25% in.
  await run("ffmpeg", [
    "-y", "-ss", "00:00:01", "-i", src,
    "-vframes", "1",
    "-vf", "scale='min(1280,iw)':-2",
    "-q:v", "5",
    dstPoster,
  ]);
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const files = await fs.readdir(SRC_DIR);

  let ok = 0;
  let skipped = 0;
  for (const [chRaw, prefix] of Object.entries(CHAPTERS)) {
    const ch = String(chRaw).padStart(2, "0");
    const src = await pickSource(prefix, files);
    if (!src) {
      console.log(`  - ch${ch}: no match for prefix "${prefix}", skipping.`);
      skipped++;
      continue;
    }
    const srcPath = path.join(SRC_DIR, src);
    const dstMp4 = path.join(OUT_DIR, `ch${ch}.mp4`);
    const dstPoster = path.join(OUT_DIR, `ch${ch}.jpg`);
    process.stdout.write(`  ch${ch}  ${src.slice(0, 50)}…  → encoding…`);
    try {
      await encode(srcPath, dstMp4, dstPoster);
      const stats = await fs.stat(dstMp4);
      console.log(` ✓ ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
      ok++;
    } catch (e) {
      console.log(` ✗ ${e.message}`);
    }
  }
  console.log(`\nDone. ${ok} encoded, ${skipped} skipped.`);
}

main().catch((err) => {
  console.error("FATAL:", err);
  process.exit(1);
});
