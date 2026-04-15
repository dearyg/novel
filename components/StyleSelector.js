import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function StyleSelector({ chapterId, onStyleChange }) {
  const [styles, setStyles] = useState([]);
  const [active, setActive] = useState("default");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadStyles() {
      const { data } = await supabase
        .from("chapter_styles")
        .select("style_key, style_label")
        .eq("chapter_id", chapterId);
      setStyles(data || []);
    }
    if (chapterId) loadStyles();
    setActive("default");
  }, [chapterId]);

  async function handleSelect(styleKey) {
    if (styleKey === active) return;

    if (styleKey === "default") {
      setActive("default");
      onStyleChange(null);
      return;
    }

    setLoading(true);
    const { data } = await supabase
      .from("chapter_styles")
      .select("content, code_footer")
      .eq("chapter_id", chapterId)
      .eq("style_key", styleKey)
      .single();
    setLoading(false);

    if (data) {
      setActive(styleKey);
      onStyleChange(data);
    }
  }

  if (styles.length === 0) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-[10px] uppercase tracking-wider text-muted mr-1">Style:</span>
      <button
        onClick={() => handleSelect("default")}
        className={`px-3 py-1 rounded-full text-xs border transition-colors ${
          active === "default"
            ? "border-accent text-accent bg-accent/10"
            : "border-border text-secondary hover:text-primary hover:border-primary/30"
        }`}
      >
        Original
      </button>
      {styles.map((s) => (
        <button
          key={s.style_key}
          onClick={() => handleSelect(s.style_key)}
          disabled={loading}
          className={`px-3 py-1 rounded-full text-xs border transition-colors ${
            active === s.style_key
              ? "border-accent text-accent bg-accent/10"
              : "border-border text-secondary hover:text-primary hover:border-primary/30"
          } ${loading ? "opacity-50 cursor-wait" : ""}`}
        >
          {s.style_label}
        </button>
      ))}
    </div>
  );
}
