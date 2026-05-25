import { useState, useEffect } from "react";
import { generateImage, getCachedImage } from "../lib/imageGen";
import { buildImagePrompt } from "../lib/imagePrompts";

export default function HeroImage({ chapterNumber, theme }) {
  const [src, setSrc] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [hasOpenaiKey, setHasOpenaiKey] = useState(false);

  useEffect(() => {
    try {
      setHasOpenaiKey(!!localStorage.getItem("novel_openai_key"));
    } catch {}
  }, []);

  useEffect(() => {
    let cancelled = false;
    if (!theme) {
      setSrc(null);
      return;
    }
    getCachedImage(chapterNumber, theme).then((cached) => {
      if (!cancelled) setSrc(cached || null);
    });
    return () => {
      cancelled = true;
    };
  }, [chapterNumber, theme]);

  async function handleReimagine() {
    let key;
    try {
      key = localStorage.getItem("novel_openai_key");
    } catch {}
    if (!key || !theme) {
      setError("Set a theme and OpenAI key in Personalize first.");
      return;
    }

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

  // Image exists — render full hero with Reimagine button
  if (src) {
    return (
      <div className="relative mb-8 rounded-xl overflow-hidden border border-border">
        <img
          src={src}
          alt={`Chapter ${chapterNumber} illustration`}
          className="w-full aspect-[16/9] object-cover"
          onError={() => setSrc(null)}
        />
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
                  Regenerating…
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

  // No image yet — show a compact CTA only when the reader has the means to generate
  if (hasOpenaiKey && theme) {
    return (
      <div className="mb-8 flex items-center justify-between gap-3 px-4 py-3 rounded-lg border border-dashed border-border bg-surface-alt/40">
        <div className="text-xs text-muted">
          No illustration yet for this chapter.
        </div>
        <button
          onClick={handleReimagine}
          disabled={generating}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/40 text-xs font-medium text-accent hover:bg-accent/20 transition-colors disabled:opacity-50"
        >
          {generating ? (
            <>
              <div className="w-3 h-3 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
              Generating…
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10" /><polyline points="17 8 21 4 17 0" transform="translate(0,4)" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
              </svg>
              Generate illustration
            </>
          )}
        </button>
        {error && (
          <span className="text-[11px] text-rose">{error}</span>
        )}
      </div>
    );
  }

  // No key and no theme — nothing to show
  return null;
}
