#!/usr/bin/env node
/**
 * Inject the CHARACTER VOICE FINGERPRINTS reference line into every chapter
 * blueprint at context/chapters/chapter-NN-blueprint.md.
 *
 * Idempotent — checks for the marker before injecting.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.resolve(__dirname, "../context/chapters");

const MARKER = "Character voice fingerprints (added 2026-05)";
const REFERENCE_BLOCK = `> **Character voice fingerprints (added 2026-05):** every speaker in this chapter must honor their voice contract in \`story-bible.md\` → CHARACTER VOICE FINGERPRINTS. Strip the attribution tag and a reader who knows the cast should still be able to name the speaker within two sentences. Aion is always italicized. Action beats every 3-4 turns; no more than 2 consecutive turns of pure verbal exchange.\n>\n`;

const ANCHOR = /^> \*\*Dialogue & character-intro standard/m;

const files = (await fs.readdir(DIR))
  .filter((f) => /^chapter-\d+-blueprint\.md$/.test(f))
  .sort();

let injected = 0;
let skipped = 0;
for (const f of files) {
  const p = path.join(DIR, f);
  const md = await fs.readFile(p, "utf8");
  if (md.includes(MARKER)) {
    skipped++;
    continue;
  }
  if (!ANCHOR.test(md)) {
    console.log(`  - ${f}: no anchor found, skipping.`);
    continue;
  }
  const next = md.replace(ANCHOR, REFERENCE_BLOCK + "$&");
  await fs.writeFile(p, next, "utf8");
  injected++;
  console.log(`  ✓ ${f}`);
}
console.log(`\nDone. ${injected} injected, ${skipped} already had marker.`);
