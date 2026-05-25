import { serverSupabase, getNovelId, keyMatches, readOwnerKey } from "../../../lib/serverSupabase";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "method_not_allowed" });
  }

  const key = readOwnerKey(req);
  if (!keyMatches(key)) {
    return res.status(401).json({ error: "unauthorized" });
  }

  const chapterParam = req.query.chapter;
  const chapter = parseInt(Array.isArray(chapterParam) ? chapterParam[0] : chapterParam, 10);
  if (!Number.isFinite(chapter) || chapter < 1 || chapter > 999) {
    return res.status(400).json({ error: "bad_chapter" });
  }

  try {
    const novelId = await getNovelId();
    const sb = serverSupabase();
    const { data, error } = await sb
      .from("chapter_comments")
      .select("id, body, language, paragraph_index, selection_text, author, status, created_at")
      .eq("novel_id", novelId)
      .eq("chapter_number", chapter)
      .neq("status", "archived")
      .order("created_at", { ascending: false });
    if (error) return res.status(500).json({ error: "db_error", detail: error.message });
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ comments: data || [] });
  } catch (e) {
    return res.status(500).json({ error: "server_error", detail: e.message });
  }
}
