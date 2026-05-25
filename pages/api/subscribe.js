import { serverSupabase } from "../../lib/serverSupabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NOVEL_SLUG = "the-senior-observer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "method_not_allowed" });
  }

  const { email, language, source } = req.body || {};
  const cleaned = typeof email === "string" ? email.trim().toLowerCase() : "";
  if (!cleaned || cleaned.length > 254 || !EMAIL_RE.test(cleaned)) {
    return res.status(400).json({ error: "bad_email" });
  }
  const lang = language === "zh" ? "zh" : "en";
  const src = typeof source === "string" ? source.slice(0, 64) : null;

  try {
    const sb = serverSupabase();
    const { error } = await sb
      .from("subscribers")
      .upsert(
        { email: cleaned, language: lang, source: src, novel_slug: NOVEL_SLUG },
        { onConflict: "email", ignoreDuplicates: true }
      );
    if (error) {
      // 42P01 = relation does not exist → migration not applied yet
      if (error.code === "42P01") {
        return res.status(503).json({
          error: "subscribers_table_missing",
          detail: "Run supabase-subscribers.sql in the Supabase SQL editor.",
        });
      }
      return res.status(500).json({ error: "db_error", detail: error.message });
    }
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: "server_error", detail: e.message });
  }
}
