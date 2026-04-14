import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- Data fetchers ---

export async function getNovelMeta() {
  const { data, error } = await supabase
    .from("novel_meta")
    .select("*")
    .single();
  if (error) throw error;
  return data;
}

export async function getChapters() {
  const { data, error } = await supabase
    .from("chapters")
    .select("id, chapter_number, title, created_at")
    .order("chapter_number", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getChapter(chapterNumber) {
  const { data, error } = await supabase
    .from("chapters")
    .select("*")
    .eq("chapter_number", chapterNumber)
    .single();
  if (error) return null;
  return data;
}

export async function getAdjacentChapters(chapterNumber) {
  const [prev, next] = await Promise.all([
    supabase
      .from("chapters")
      .select("chapter_number, title")
      .lt("chapter_number", chapterNumber)
      .order("chapter_number", { ascending: false })
      .limit(1)
      .single(),
    supabase
      .from("chapters")
      .select("chapter_number, title")
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

export async function getWritingStyles() {
  const { data, error } = await supabase
    .from("writing_styles")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) return [];
  return data;
}

export async function getChapterStyle(chapterNumber, styleKey) {
  const { data, error } = await supabase
    .from("chapter_styles")
    .select("*")
    .eq("chapter_number", chapterNumber)
    .eq("style_key", styleKey)
    .single();
  if (error) return null;
  return data;
}

export async function getAvailableStylesForChapter(chapterNumber) {
  const { data, error } = await supabase
    .from("chapter_styles")
    .select("style_key, style_label")
    .eq("chapter_number", chapterNumber);
  if (error) return [];
  return data;
}
