#!/usr/bin/env node
/**
 * Life of an SDE — Pull Comments
 *
 * Dumps every reader comment from chapter_comments, grouped by chapter,
 * so you can hand it back to Claude for the next revision pass.
 *
 * Usage:
 *   node scripts/pull-comments.mjs                # all open comments
 *   node scripts/pull-comments.mjs --all          # include addressed/wontfix
 *   node scripts/pull-comments.mjs --chapter=7    # one chapter only
 *   node scripts/pull-comments.mjs --json         # machine-readable
 *
 * Requires:
 *   NEXT_PUBLIC_SUPABASE_URL  (or SUPABASE_URL)
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing env. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const NOVEL_SLUG = "the-senior-observer";
const args = process.argv.slice(2);
const includeAll = args.includes("--all");
const asJson = args.includes("--json");
const chapterArg = args.find((a) => a.startsWith("--chapter="));
const onlyChapter = chapterArg ? parseInt(chapterArg.split("=")[1], 10) : null;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  const { data: novel, error: nErr } = await supabase
    .from("novels")
    .select("id, title, slug")
    .eq("slug", NOVEL_SLUG)
    .single();
  if (nErr || !novel) {
    console.error(`Novel '${NOVEL_SLUG}' not found.`);
    process.exit(1);
  }

  let q = supabase
    .from("chapter_comments")
    .select("id, chapter_number, language, body, paragraph_index, selection_text, author, status, created_at")
    .eq("novel_id", novel.id)
    .order("chapter_number", { ascending: true })
    .order("created_at", { ascending: true });

  if (!includeAll) q = q.eq("status", "open");
  if (onlyChapter) q = q.eq("chapter_number", onlyChapter);

  const { data, error } = await q;
  if (error) {
    console.error("Query failed:", error.message);
    process.exit(1);
  }

  if (asJson) {
    console.log(JSON.stringify({ novel: { title: novel.title, slug: novel.slug }, comments: data }, null, 2));
    return;
  }

  if (!data.length) {
    console.log(`No comments${includeAll ? "" : " (open)"}${onlyChapter ? ` for chapter ${onlyChapter}` : ""}.`);
    return;
  }

  console.log(`# ${novel.title} — comments (${data.length})\n`);

  const byChapter = new Map();
  for (const c of data) {
    if (!byChapter.has(c.chapter_number)) byChapter.set(c.chapter_number, []);
    byChapter.get(c.chapter_number).push(c);
  }

  for (const [num, rows] of [...byChapter.entries()].sort((a, b) => a[0] - b[0])) {
    console.log(`## Chapter ${num} (${rows.length})\n`);
    for (const c of rows) {
      const when = new Date(c.created_at).toISOString().slice(0, 16).replace("T", " ");
      const head = `- [${c.status}] ${c.author || "anon"} · ${c.language} · ${when} UTC`;
      const para = c.paragraph_index != null ? ` · ¶${c.paragraph_index}` : "";
      console.log(head + para);
      if (c.selection_text) {
        console.log(`  > "${c.selection_text.replace(/\n/g, " ")}"`);
      }
      const indented = c.body.split("\n").map((l) => `    ${l}`).join("\n");
      console.log(indented);
      console.log();
    }
  }
}

main().catch((err) => {
  console.error("FATAL:", err);
  process.exit(1);
});
