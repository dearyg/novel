import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";
import { buildRestylePrompt, THEMES, LENGTHS, STYLES } from "../../lib/restylePrompt";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { chapterId, theme, length = "standard", style = "original" } = req.body;

  if (!chapterId || !theme) {
    return res.status(400).json({ error: "chapterId and theme are required" });
  }
  if (!THEMES[theme]) {
    return res.status(400).json({ error: `Invalid theme: ${theme}` });
  }
  if (!LENGTHS[length]) {
    return res.status(400).json({ error: `Invalid length: ${length}` });
  }
  if (!STYLES[style]) {
    return res.status(400).json({ error: `Invalid style: ${style}` });
  }

  try {
    const { data: cached } = await supabaseAdmin
      .from("chapter_variants")
      .select("content, code_footer")
      .eq("chapter_id", chapterId)
      .eq("theme", theme)
      .eq("length", length)
      .eq("style", style)
      .single();

    if (cached) {
      return res.status(200).json({ content: cached.content, code_footer: cached.code_footer, cached: true });
    }

    const { data: chapter, error: chapterError } = await supabaseAdmin
      .from("chapters")
      .select("content, code_footer")
      .eq("id", chapterId)
      .single();

    if (chapterError || !chapter) {
      return res.status(404).json({ error: "Chapter not found" });
    }

    const prompt = buildRestylePrompt(chapter.content, chapter.code_footer, theme, length, style);

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 16000,
      messages: [{ role: "user", content: prompt }],
    });

    const responseText = message.content[0].text;
    let variantContent = responseText;
    let variantCodeFooter = null;

    const separatorIndex = responseText.indexOf("---CODE_FOOTER---");
    if (separatorIndex !== -1) {
      variantContent = responseText.slice(0, separatorIndex).trim();
      variantCodeFooter = responseText.slice(separatorIndex + "---CODE_FOOTER---".length).trim();
    }

    await supabaseAdmin.from("chapter_variants").insert({
      chapter_id: chapterId,
      theme,
      length,
      style,
      content: variantContent,
      code_footer: variantCodeFooter,
    });

    return res.status(200).json({ content: variantContent, code_footer: variantCodeFooter, cached: false });
  } catch (err) {
    console.error("Restyle error:", err);
    return res.status(500).json({ error: "Failed to restyle chapter" });
  }
}
