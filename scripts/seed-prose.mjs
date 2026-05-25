#!/usr/bin/env node
/**
 * Life of an SDE — Prose Seeder
 *
 * Reads markdown from prose/, prose-zh/, and context/ and upserts everything
 * into Supabase. Idempotent — safe to re-run.
 *
 * Requires:
 *   NEXT_PUBLIC_SUPABASE_URL  (or SUPABASE_URL)
 *   SUPABASE_SERVICE_ROLE_KEY (write-capable; do NOT commit)
 *
 * Usage:
 *   node scripts/seed-prose.mjs
 *
 * Run AFTER:
 *   1. supabase-setup.sql
 *   2. supabase-update-prose.sql
 */

import { createClient } from "@supabase/supabase-js";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing env. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your shell or .env.local before running:");
  console.error("  export NEXT_PUBLIC_SUPABASE_URL='https://YOUR.supabase.co'");
  console.error("  export SUPABASE_SERVICE_ROLE_KEY='eyJ...'");
  console.error("  node scripts/seed-prose.mjs");
  process.exit(1);
}

const NOVEL_SLUG = "the-senior-observer";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// ---------- helpers ----------

async function readIfExists(filepath) {
  try {
    return await fs.readFile(filepath, "utf8");
  } catch {
    return null;
  }
}

/**
 * Pull title + body + code-footer out of a chapter prose file.
 * Convention:
 *   - First line: # Chapter N — 0xNN: <title>  (or "第N章 — 0xNN: <title>")
 *   - Somewhere near the bottom, a fenced ```cpp``` block whose content
 *     contains "Discovery Log" — that's the code footer.
 *   - Everything else is body. Any trailing meta content (Ch 20's
 *     meta-reveal) stays in the body.
 */
function parseChapterProse(md) {
  const lines = md.split("\n");
  const titleLine = lines[0] || "";
  const titleRaw = (titleLine.match(/^#\s+(.+?)\s*$/)?.[1] || titleLine.replace(/^#+\s*/, "")).trim();
  // Strip "Chapter N —" or "第N章 —" prefix (digits OR Chinese numerals).
  const title = titleRaw
    .replace(/^Chapter\s+\d+\s*[—\-:]\s*/i, "")
    .replace(/^第\s*[\d一二三四五六七八九十零百千]+\s*章\s*[—\-:：]\s*/i, "")
    .trim();

  // Walk the file looking for fenced blocks. Capture every fence pair, then
  // pick the one that mentions "Discovery Log" (or the last fenced block as
  // fallback) as the code footer.
  const fences = []; // { open, close, body }
  let i = 1; // skip title line
  while (i < lines.length) {
    if (/^```/.test(lines[i].trim())) {
      const open = i;
      i++;
      const inner = [];
      while (i < lines.length && !/^```/.test(lines[i].trim())) {
        inner.push(lines[i]);
        i++;
      }
      const close = i; // line of closing fence (or lines.length if unterminated)
      fences.push({ open, close, body: inner.join("\n") });
      i = close + 1;
    } else {
      i++;
    }
  }

  let footer = null;
  let cutOpen = -1;
  let cutClose = -1;
  if (fences.length) {
    const target =
      fences.find((f) => /Discovery Log/i.test(f.body)) ||
      fences[fences.length - 1];
    footer = target.body;
    cutOpen = target.open;
    cutClose = target.close;
  }

  // Build body = lines[1..end], minus the fence we extracted, minus a single
  // adjacent `---` separator line on either side if present.
  const bodyLines = [];
  for (let k = 1; k < lines.length; k++) {
    if (cutOpen >= 0 && k >= cutOpen && k <= cutClose) continue;
    bodyLines.push(lines[k]);
  }
  // Squeeze 3+ consecutive blank lines into 2
  let body = bodyLines.join("\n").replace(/\n{3,}/g, "\n\n").trim();

  return { title, body, footer };
}

function parseBlueprintTitle(md) {
  const m = md.match(/^#\s+(.+?)\s*$/m);
  return m ? m[1] : "Blueprint";
}

function parseMetaDocTitle(md, fallback) {
  const m = md.match(/^#\s+(.+?)\s*$/m);
  return m ? m[1].replace(/^#+\s*/, "") : fallback;
}

async function getNovelId() {
  const { data, error } = await supabase
    .from("novels")
    .select("id, title")
    .eq("slug", NOVEL_SLUG)
    .single();
  if (error || !data) {
    throw new Error(`Novel '${NOVEL_SLUG}' not found. Run supabase-setup.sql first.`);
  }
  return data.id;
}

// ---------- seeders ----------

async function seedProse(novelId, lang, dirRel) {
  console.log(`\n=== Seeding ${lang.toUpperCase()} prose from ${dirRel}/ ===`);
  const dir = path.join(ROOT, dirRel);
  let files;
  try {
    files = (await fs.readdir(dir)).filter((f) => /^chapter-\d+\.md$/.test(f)).sort();
  } catch {
    console.log(`  ${dirRel}/ not found, skipping.`);
    return 0;
  }
  let count = 0;
  for (const f of files) {
    const num = parseInt(f.match(/^chapter-(\d+)\.md$/)[1], 10);
    const md = await fs.readFile(path.join(dir, f), "utf8");
    const { title, body, footer } = parseChapterProse(md);
    const row = {
      novel_id: novelId,
      chapter_number: num,
      language: lang,
      title,
      content: body,
      code_footer: footer,
    };
    const { error } = await supabase
      .from("chapters")
      .upsert(row, { onConflict: "novel_id,chapter_number,language" });
    if (error) {
      console.error(`  ✗ ${lang} ch ${num}: ${error.message}`);
    } else {
      console.log(`  ✓ ${lang} ch ${num}: "${title}" (${body.length} chars)`);
      count++;
    }
  }
  return count;
}

async function seedBlueprints(novelId) {
  console.log(`\n=== Seeding chapter blueprints from context/chapters/ ===`);
  const dir = path.join(ROOT, "context/chapters");
  let files;
  try {
    files = (await fs.readdir(dir))
      .filter((f) => /^chapter-\d+-blueprint\.md$/.test(f))
      .sort();
  } catch {
    console.log(`  context/chapters/ not found, skipping.`);
    return 0;
  }
  let count = 0;
  for (const f of files) {
    const num = parseInt(f.match(/^chapter-(\d+)-blueprint\.md$/)[1], 10);
    const md = await fs.readFile(path.join(dir, f), "utf8");
    const title = parseBlueprintTitle(md);
    const row = {
      novel_id: novelId,
      chapter_number: num,
      title,
      content: md,
    };
    const { error } = await supabase
      .from("chapter_blueprints")
      .upsert(row, { onConflict: "novel_id,chapter_number" });
    if (error) {
      console.error(`  ✗ blueprint ch ${num}: ${error.message}`);
    } else {
      console.log(`  ✓ blueprint ch ${num}: "${title}" (${md.length} chars)`);
      count++;
    }
  }
  return count;
}

async function seedMetaDocs(novelId) {
  console.log(`\n=== Seeding meta-docs from context/ ===`);
  const docs = [
    { slug: "story-bible",       file: "context/story-bible.md",       order: 10, description: "Characters, world, tech-fight style, cast specialties." },
    { slug: "master-schema",     file: "context/master-schema.md",     order: 20, description: "Architectural source of truth: metaphors, somatic flags, audit-mode logic." },
    { slug: "plot-review",       file: "context/plot-review.md",       order: 30, description: "Master plot overview for all 20 chapters (now includes Main Storyline + Narrative Rhymes)." },
    { slug: "cinematic-overlay", file: "context/cinematic-overlay.md", order: 35, description: "v5 cinematic overlay: neutral philosophy, audio-visual motifs, Smart-City chase, frontend gimmicks." },
    { slug: "revision-plan",     file: "context/revision-plan.md",     order: 38, description: "Pre-publication revision plan: IP rename (Vance→Meridian, Vacheron→Auberval), résumé deconstruction, paper-citation cleanup, discovery-log diversification." },
    { slug: "pacing-curve",      file: "context/pacing.md",            order: 40, description: "Six-level POV-dissolution curve across the novel." },
    { slug: "original-vision",   file: "context/original-vision.md",   order: 50, description: "Homer's raw notes + Aion evolution timeline." },
    { slug: "readme",            file: "context/README.md",            order: 60, description: "File map for the context directory." },
  ];
  let count = 0;
  for (const d of docs) {
    const md = await readIfExists(path.join(ROOT, d.file));
    if (!md) {
      console.log(`  - ${d.slug}: source file missing, skipping.`);
      continue;
    }
    const title = parseMetaDocTitle(md, d.slug);
    const row = {
      novel_id: novelId,
      slug: d.slug,
      title,
      content: md,
      description: d.description,
      sort_order: d.order,
    };
    const { error } = await supabase
      .from("meta_docs")
      .upsert(row, { onConflict: "novel_id,slug" });
    if (error) {
      console.error(`  ✗ ${d.slug}: ${error.message}`);
    } else {
      console.log(`  ✓ ${d.slug}: "${title}" (${md.length} chars)`);
      count++;
    }
  }
  return count;
}

async function seedManifest(novelId) {
  console.log(`\n=== Updating novel.manifest from master-schema.md ===`);
  const md = await readIfExists(path.join(ROOT, "context/master-schema.md"));
  if (!md) {
    console.log(`  - master-schema.md missing, skipping.`);
    return;
  }
  const { error } = await supabase
    .from("novels")
    .update({ manifest: md })
    .eq("id", novelId);
  if (error) {
    console.error(`  ✗ manifest update: ${error.message}`);
  } else {
    console.log(`  ✓ manifest updated (${md.length} chars)`);
  }
}

// ---------- main ----------

async function main() {
  const novelId = await getNovelId();
  console.log(`Novel id: ${novelId}`);

  const en = await seedProse(novelId, "en", "prose");
  const enConcise = await seedProse(novelId, "en-concise", "prose-en-concise");
  const enBrief = await seedProse(novelId, "en-brief", "prose-en-brief");
  const zh = await seedProse(novelId, "zh", "prose-zh");
  // Blueprints intentionally not seeded — they are internal author notes only.
  // The seedBlueprints function and context/chapters/*.md files remain in the
  // repo for local reference. Re-enable here if you ever want them on the site.
  const md = await seedMetaDocs(novelId);
  await seedManifest(novelId);

  console.log(`\n=== Summary ===`);
  console.log(`  en chapters:         ${en}`);
  console.log(`  en-concise chapters: ${enConcise}`);
  console.log(`  en-brief chapters:   ${enBrief}`);
  console.log(`  zh chapters:         ${zh}`);
  console.log(`  meta docs:           ${md}`);
  console.log(`Done.`);
}

main().catch((err) => {
  console.error("FATAL:", err);
  process.exit(1);
});
