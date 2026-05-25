#!/usr/bin/env node
/**
 * Split life-of-an-sde-v2.txt back into per-chapter prose files,
 * overwriting prose/chapter-NN.md.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SOURCE = path.join(ROOT, "life-of-an-sde-v2.txt");
const PROSE = path.join(ROOT, "prose");

const text = await fs.readFile(SOURCE, "utf8");

// Split on the === separator lines that surround each chapter.
// Each chapter block starts with `# Chapter N — 0xNN: Title`.
const CHAPTER_RE = /^# Chapter (\d+) — 0x[0-9A-Fa-f]+: .+/m;
const blocks = text.split(/\n=+\n/g);

let written = 0;
for (const block of blocks) {
  const trimmed = block.replace(/^\s+|\s+$/g, "");
  const match = trimmed.match(CHAPTER_RE);
  if (!match) continue;
  const num = parseInt(match[1], 10);
  if (!Number.isFinite(num) || num < 1 || num > 99) continue;

  const filename = `chapter-${String(num).padStart(2, "0")}.md`;
  const target = path.join(PROSE, filename);
  await fs.writeFile(target, trimmed + "\n", "utf8");
  console.log(`  ✓ wrote ${filename} (${trimmed.length} chars)`);
  written++;
}

console.log(`\nWrote ${written} chapter files.`);
