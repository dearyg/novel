import { useState, useEffect } from "react";
import { generateImage, getCachedImage } from "../lib/imageGen";
import { buildImagePrompt } from "../lib/imagePrompts";

export default function HeroImage({ chapterNumber, theme, defaultSrc }) {
  const [src, setSrc] = useState(defaultSrc || null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [hasOpenaiKey, setHasOpenaiKey] = useState(false);

  useEffect(() => {
    try {
      setHasOpenaiKey(!!localStorage.getItem("novel_openai_key"));
    } catch {}
  }, []);

  useEffect(() => {
    if (!theme) {
      setSrc(defaultSrc || null);
      return;
    }
    getCachedImage(chapterNumber, theme).then((cached) => {
      if (cached) setSrc(cached);
      else setSrc(defaultSrc || null);
    });
  }, [chapterNumber, theme, defaultSrc]);

  async function handleReimagine() {
    let key;
    try {
      key = localStorage.getItem("novel_openai_key");
    } catch {}
    if (!key || !theme) return;

    setGenerating(true);
    setError(null);

    try {
      const prompt = buildImagePrompt(chapterNumber, theme);
      const dataUrl = await generateImage(chapterNumber, theme, key, prompt);
      setSrc(dataUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setGenerating(false);
    }
  }

  if (!src && !hasOpenaiKey) return null;

  return (
    <div className="relative mb-8 rounded-xl overflow-hidden border border-border">
      {src ? (
        <img
          src={src}
          alt={`Chapter ${chapterNumber} illustration`}
          className="w-full aspect-[16/9] object-cover"
        />
      ) : (
        <div className="w-full aspect-[16/9] bg-surface-alt flex items-center justify-center">
          <span className="text-xs text-muted">No image available</span>
        </div>
      )}

      {hasOpenaiKey && theme && (
        <div className="absolute bottom-3 right-3">
          <button
            onClick={handleReimagine}
            disabled={generating}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 text-xs text-white hover:bg-black/80 transition-colors disabled:opacity-50"
          >
            {generating ? (
              <>
                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                </svg>
                Reimagine
              </>
            )}
          </button>
        </div>
      )}

      {error && (
        <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-rose/90 text-xs text-white">
          {error}
        </div>
      )}
    </div>
  );
}
