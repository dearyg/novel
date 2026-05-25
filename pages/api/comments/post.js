import { serverSupabase, getNovelId, keyMatches, readOwnerKey } from "../../../lib/serverSupabase";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "method_not_allowed" });
  }

  const key = readOwnerKey(req);
  if (!keyMatches(key)) {
    return res.status(401).json({ error: "unauthorized" });
  }

  const { chapter_number, language, body, author, paragraph_index, selection_text } = req.body || {};

  const ch = parseInt(chapter_number, 10);
  if (!Number.isFinite(ch) || ch < 1 || ch > 999) {
    return res.status(400).json({ error: "bad_chapter" });
  }
  if (typeof body !== "string" || !body.trim() || body.length > 4000) {
    return res.status(400).json({ error: "bad_body" });
  }

  const row = {
    novel_id: await getNovelId(),
    chapter_number: ch,
    language: typeof language === "string" && language ? language.slice(0, 8) : "en",
    body: body.trim(),
  };
  if (typeof author === "string" && author.trim()) row.author = author.trim().slice(0, 80);
  if (Number.isFinite(paragraph_index)) row.paragraph_index = paragraph_index;
  if (typeof selection_text === "string" && selection_text) row.selection_text = selection_text.slice(0, 500);

  try {
    const sb = serverSupabase();
    const { data, error } = await sb
      .from("chapter_comments")
      .insert(row)
      .select()
      .single();
    if (error) return res.status(500).json({ error: "db_error", detail: error.message });
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ comment: data });
  } catch (e) {
    return res.status(500).json({ error: "server_error", detail: e.message });
  }
}
