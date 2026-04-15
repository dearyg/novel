import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

// --- Chapters ---

export async function getChaptersByNovel(novelId) {
  const { data, error } = await supabase
    .from("chapters")
    .select("id, chapter_number, title, created_at")
    .eq("novel_id", novelId)
    .order("chapter_number", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getChapter(novelId, chapterNumber) {
  const { data, error } = await supabase
    .from("chapters")
    .select("*")
    .eq("novel_id", novelId)
    .eq("chapter_number", chapterNumber)
    .single();
  if (error) return null;
  return data;
}

export async function getAdjacentChapters(novelId, chapterNumber) {
  const [prev, next] = await Promise.all([
    supabase
      .from("chapters")
      .select("chapter_number, title")
      .eq("novel_id", novelId)
      .lt("chapter_number", chapterNumber)
      .order("chapter_number", { ascending: false })
      .limit(1)
      .single(),
    supabase
      .from("chapters")
      .select("chapter_number, title")
      .eq("novel_id", novelId)
      .gt("chapter_number", chapterNumber)
      .order("chapter_number", { ascending: true })
      .limit(1)
      .single(),
  ]);
  return {
    prev: prev.data || null,
    next: next.data || null,
  };
}

// --- Styles ---

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
