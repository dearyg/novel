import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
];

// Pre-baked length variants. Used by Reader Settings, not the language toggle.
// Each entry resolves to a chapters.language code in the DB.
export const LENGTH_VARIANTS = {
  standard: { langCodes: { en: "en", zh: "zh" } },
  concise: { langCodes: { en: "en-concise", zh: "zh" } },
  brief: { langCodes: { en: "en-brief", zh: "zh" } },
};

// --- Novels ---

export async function getNovels() {
  const { data, error } = await supabase
    .from("novels")
    .select("*, chapters(count)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data.map((n) => ({
    ...n,
    chapter_count: n.chapters?.[0]?.count || 0,
  }));
}

export async function getNovelBySlug(slug) {
  const { data, error } = await supabase
    .from("novels")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) return null;
  return data;
}

// --- Chapters (language-aware) ---

/** Returns one row per chapter_number using the chapter_index view, with EN/ZH availability flags. */
export async function getChapterIndex(novelId) {
  const { data, error } = await supabase
    .from("chapter_index")
    .select("*")
    .eq("novel_id", novelId)
    .order("chapter_number", { ascending: true });
  if (error) {
    // Fallback if the view isn't installed yet
    const fallback = await supabase
      .from("chapters")
      .select("chapter_number, title, language, created_at")
      .eq("novel_id", novelId)
      .order("chapter_number", { ascending: true });
    if (fallback.error) return [];
    const map = new Map();
    for (const ch of fallback.data) {
      const cur = map.get(ch.chapter_number) || {
        novel_id: novelId,
        chapter_number: ch.chapter_number,
        title_en: null,
        title_zh: null,
        has_en: false,
        has_zh: false,
        created_at: ch.created_at,
      };
      if (ch.language === "zh") {
        cur.title_zh = ch.title;
        cur.has_zh = true;
      } else {
        cur.title_en = ch.title;
        cur.has_en = true;
      }
      map.set(ch.chapter_number, cur);
    }
    return [...map.values()].sort((a, b) => a.chapter_number - b.chapter_number);
  }
  return data;
}

/** Original-style helper: list of chapters in a single language (default en), id+number+title. */
export async function getChaptersByNovel(novelId, language = "en") {
  const { data, error } = await supabase
    .from("chapters")
    .select("id, chapter_number, title, created_at, language")
    .eq("novel_id", novelId)
    .eq("language", language)
    .order("chapter_number", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getChapter(novelId, chapterNumber, language = "en") {
  const { data, error } = await supabase
    .from("chapters")
    .select("*")
    .eq("novel_id", novelId)
    .eq("chapter_number", chapterNumber)
    .eq("language", language)
    .maybeSingle();
  if (error) return null;
  if (data) return data;
  // Fallback to whichever language exists
  const { data: any } = await supabase
    .from("chapters")
    .select("*")
    .eq("novel_id", novelId)
    .eq("chapter_number", chapterNumber)
    .order("language", { ascending: true })
    .limit(1)
    .maybeSingle();
  return any || null;
}

export async function getAdjacentChapters(novelId, chapterNumber, language = "en") {
  const [prev, next] = await Promise.all([
    supabase
      .from("chapters")
      .select("chapter_number, title, language")
      .eq("novel_id", novelId)
      .eq("language", language)
      .lt("chapter_number", chapterNumber)
      .order("chapter_number", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("chapters")
      .select("chapter_number, title, language")
      .eq("novel_id", novelId)
      .eq("language", language)
      .gt("chapter_number", chapterNumber)
      .order("chapter_number", { ascending: true })
      .limit(1)
      .maybeSingle(),
  ]);
  return {
    prev: prev.data || null,
    next: next.data || null,
  };
}

// --- Blueprints ---

export async function getBlueprint(novelId, chapterNumber) {
  const { data, error } = await supabase
    .from("chapter_blueprints")
    .select("*")
    .eq("novel_id", novelId)
    .eq("chapter_number", chapterNumber)
    .maybeSingle();
  if (error) return null;
  return data;
}

export async function getAllBlueprints(novelId) {
  const { data, error } = await supabase
    .from("chapter_blueprints")
    .select("chapter_number, title")
    .eq("novel_id", novelId)
    .order("chapter_number", { ascending: true });
  if (error) return [];
  return data;
}

// --- Meta docs (story bible, plot review, pacing, etc.) ---

export async function getMetaDocs(novelId) {
  const { data, error } = await supabase
    .from("meta_docs")
    .select("slug, title, description, sort_order")
    .eq("novel_id", novelId)
    .order("sort_order", { ascending: true });
  if (error) return [];
  return data;
}

export async function getMetaDoc(novelId, slug) {
  const { data, error } = await supabase
    .from("meta_docs")
    .select("*")
    .eq("novel_id", novelId)
    .eq("slug", slug)
    .maybeSingle();
  if (error) return null;
  return data;
}

// --- Comments ---

export async function getCommentsForChapter(novelId, chapterNumber) {
  const { data, error } = await supabase
    .from("chapter_comments")
    .select("id, body, language, paragraph_index, selection_text, author, status, created_at")
    .eq("novel_id", novelId)
    .eq("chapter_number", chapterNumber)
    .neq("status", "archived")
    .order("created_at", { ascending: false });
  if (error) return [];
  return data;
}

export async function addComment({ novelId, chapterNumber, language, body, author, paragraphIndex, selectionText }) {
  const row = {
    novel_id: novelId,
    chapter_number: chapterNumber,
    language: language || "en",
    body: body.trim(),
  };
  if (author && author.trim()) row.author = author.trim().slice(0, 80);
  if (typeof paragraphIndex === "number") row.paragraph_index = paragraphIndex;
  if (selectionText) row.selection_text = selectionText.slice(0, 500);
  const { data, error } = await supabase
    .from("chapter_comments")
    .insert(row)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// --- Styles (unchanged) ---

export async function getWritingStyles() {
  const { data, error } = await supabase
    .from("writing_styles")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) return [];
  return data;
}

export async function getStylesForChapter(chapterId) {
  const { data, error } = await supabase
    .from("chapter_styles")
    .select("style_key, style_label")
    .eq("chapter_id", chapterId);
  if (error) return [];
  return data;
}

export async function getChapterStyle(chapterId, styleKey) {
  const { data, error } = await supabase
    .from("chapter_styles")
    .select("content, code_footer")
    .eq("chapter_id", chapterId)
    .eq("style_key", styleKey)
    .single();
  if (error) return null;
  return data;
}

// --- All novel slugs (for static paths) ---

export async function getAllNovelSlugs() {
  const { data, error } = await supabase.from("novels").select("slug");
  if (error) return [];
  return data.map((n) => n.slug);
}
