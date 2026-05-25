import { useState, useEffect } from "react";

const THEMES = [
  { key: "horror", label: "Horror", desc: "Dark, dread-building, visceral" },
  { key: "chill", label: "Chill", desc: "Calm, meditative, ambient" },
  { key: "romantic", label: "Romantic", desc: "Warm, intimate, tender" },
  { key: "suspense", label: "Suspense", desc: "Tense, paranoid, cliffhangers" },
  { key: "noir", label: "Noir", desc: "Hardboiled, cynical, shadowy" },
  { key: "cyberpunk", label: "Cyberpunk", desc: "Neon, tech-slang, gritty" },
];

const LENGTHS = [
  { key: "short", label: "Short", desc: "~40% — key beats only" },
  { key: "standard", label: "Standard", desc: "Same as original" },
  { key: "extended", label: "Extended", desc: "~160% — expanded detail" },
];

const TEXT_VARS = [
  {
    key: "protagonist",
    label: "Protagonist Name",
    description: "The name of the SDE — yours to choose",
    placeholder: "Jeff Zhang",
    comingSoon: true,
  },
  {
    key: "reader_name",
    label: "Your Name",
    description: "How the story addresses you",
    placeholder: "Enter your name",
    comingSoon: true,
  },
  {
    key: "user_landmark",
    label: "Your Landmark",
    description: "A landmark near you — woven into Kael's scenes",
    placeholder: "the Space Needle",
  },
  {
    key: "somatic_trigger_light",
    label: "Somatic Trigger Light",
    description: "The warning light color that appears before a bleed",
    placeholder: "Amber (580nm)",
    comingSoon: true,
  },
  {
    key: "somatic_trigger_scent",
    label: "Somatic Trigger Scent",
    description: "The scent that bridges realities",
    placeholder: "Scorched Sage",
    comingSoon: true,
  },
];

const GENRES = [
  { key: "Techno-Thriller", label: "Techno-Thriller" },
  { key: "Noir", label: "Noir" },
  { key: "Horror", label: "Horror" },
  { key: "Hard-Tech", label: "Hard-Tech" },
];

const PACES = [
  { key: "Slow Burn", label: "Slow Burn" },
  { key: "Fast-Paced", label: "Fast-Paced" },
];

const READING_LENGTHS = [
  { key: "standard", label: "Standard", desc: "Full prose" },
  { key: "concise", label: "Concise", desc: "~35%, key dialogue" },
  { key: "brief", label: "Brief", desc: "Plot summary" },
];

const OPENAI_KEY_STORAGE = "novel_openai_key";
const PERSONALIZE_SEEN_KEY = "novel.personalizeSeen";

export default function ReaderSettings({ variables, settings, updateSetting, locationRequested, requestLocation, autoOpen }) {
  const [open, setOpen] = useState(false);
  const [openaiKey, setOpenaiKey] = useState("");
  const [keyTestStatus, setKeyTestStatus] = useState(null);

  // Auto-open only on the reader's very first chapter visit. After they've
  // seen (or dismissed) the panel once, only an explicit click reopens it.
  useEffect(() => {
    if (!autoOpen) return;
    let seen = false;
    try {
      seen = !!localStorage.getItem(PERSONALIZE_SEEN_KEY);
    } catch {}
    if (!seen) setOpen(true);
  }, [autoOpen]);

  useEffect(() => {
    if (open) {
      try {
        localStorage.setItem(PERSONALIZE_SEEN_KEY, "1");
      } catch {}
    }
  }, [open]);

  useEffect(() => {
    try {
      setOpenaiKey(localStorage.getItem(OPENAI_KEY_STORAGE) || "");
    } catch {}
  }, []);

  function handleOpenaiKeyChange(value) {
    setOpenaiKey(value);
    setKeyTestStatus(null);
    try {
      if (value) {
        localStorage.setItem(OPENAI_KEY_STORAGE, value);
      } else {
        localStorage.removeItem(OPENAI_KEY_STORAGE);
      }
    } catch {}
  }

  async function testOpenaiKey() {
    if (!openaiKey) return;
    setKeyTestStatus("testing");
    try {
      const res = await fetch("https://api.openai.com/v1/models", {
        headers: { Authorization: `Bearer ${openaiKey}` },
      });
      setKeyTestStatus(res.ok ? "valid" : "invalid");
    } catch {
      setKeyTestStatus("invalid");
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs text-secondary hover:text-primary hover:border-accent/30 transition-colors"
        title="Reader Settings"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
        Personalize
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative bg-surface border border-border rounded-2xl shadow-2xl w-full max-w-md max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-surface border-b border-border px-5 py-4 flex items-center justify-between rounded-t-2xl z-10">
              <h2 className="text-base font-semibold text-primary">Reader Settings</h2>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-surface-alt transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="p-5 space-y-6">
              <p className="text-xs text-muted leading-relaxed">
                Personalize how the story reads for you. Changes are saved locally in your browser.
              </p>

              {/* Reading Length */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-primary uppercase tracking-wider">Reading Length</label>
                <p className="text-xs text-muted">Standard is the full prose. Concise keeps the key dialogue. Brief is a plot summary. English only.</p>
                <div className="flex gap-2">
                  {READING_LENGTHS.map((l) => (
                    <button
                      key={l.key}
                      onClick={() => updateSetting("reading_length", l.key === "standard" ? undefined : l.key)}
                      className={`flex-1 px-2 py-1.5 rounded-lg border text-xs text-center transition-colors ${
                        (settings.reading_length || "standard") === l.key
                          ? "border-accent text-accent bg-accent/10"
                          : "border-border text-secondary hover:border-primary/30"
                      }`}
                    >
                      <div className="font-medium">{l.label}</div>
                      <div className="text-[9px] text-muted leading-tight">{l.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* --- Identity & Location --- */}
              <div className="space-y-1 pt-2">
                <h3 className="text-[10px] font-bold text-muted uppercase tracking-widest">Identity & Location</h3>
                <div className="h-px bg-border" />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-primary uppercase tracking-wider">Location</label>
                <p className="text-xs text-muted">Where Kael experiences the story. Detected from your device.</p>
                {variables.user_location ? (
                  <div className="flex items-center gap-3">
                    <div className="flex-1 px-3 py-2 rounded-lg bg-surface-alt border border-border text-sm text-primary">
                      <span className="flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent shrink-0">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                        </svg>
                        {variables.user_location} — near {variables.user_landmark}
                      </span>
                    </div>
                    <button
                      onClick={requestLocation}
                      className="text-[10px] text-accent hover:text-accent-hover transition-colors shrink-0"
                    >
                      Update
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={requestLocation}
                    className="w-full px-4 py-2.5 rounded-lg bg-accent/10 border border-accent/20 text-sm text-accent font-medium hover:bg-accent/20 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                    Enable Location
                  </button>
                )}
              </div>

              {/* Active text variable inputs */}
              {TEXT_VARS.filter((v) => !v.comingSoon).map((v) => (
                <div key={v.key} className="space-y-2">
                  <label className="text-xs font-semibold text-primary uppercase tracking-wider">
                    {v.label}
                  </label>
                  <p className="text-xs text-muted">{v.description}</p>
                  <input
                    type="text"
                    value={settings[v.key] || ""}
                    onChange={(e) => updateSetting(v.key, e.target.value || undefined)}
                    placeholder={v.placeholder}
                    className="w-full px-3 py-2 rounded-lg bg-surface-alt border border-border text-sm text-primary placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
                  />
                  {settings[v.key] && (
                    <button
                      onClick={() => updateSetting(v.key, undefined)}
                      className="text-[10px] text-muted hover:text-accent transition-colors"
                    >
                      Reset to default
                    </button>
                  )}
                </div>
              ))}

              {/* --- More Personalization (coming soon) --- */}
              <div className="space-y-1 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-bold text-muted uppercase tracking-widest">More Personalization</h3>
                  <span className="text-[9px] font-semibold text-accent uppercase tracking-widest px-1.5 py-0.5 rounded bg-accent/10">Coming soon</span>
                </div>
                <div className="h-px bg-border" />
              </div>

              {/* Coming-soon text variable inputs */}
              {TEXT_VARS.filter((v) => v.comingSoon).map((v) => (
                <div key={v.key} className="space-y-2 opacity-60">
                  <label className="text-xs font-semibold text-primary uppercase tracking-wider">
                    {v.label}
                  </label>
                  <p className="text-xs text-muted">{v.description}</p>
                  <input
                    type="text"
                    value={settings[v.key] || ""}
                    onChange={(e) => updateSetting(v.key, e.target.value || undefined)}
                    placeholder={v.placeholder}
                    disabled
                    className="w-full px-3 py-2 rounded-lg bg-surface-alt border border-border text-sm text-primary placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors disabled:cursor-not-allowed"
                  />
                </div>
              ))}

              {/* Genre */}
              <div className="space-y-2 opacity-60">
                <label className="text-xs font-semibold text-primary uppercase tracking-wider">Genre</label>
                <p className="text-xs text-muted">How the narrative voice shapes the world</p>
                <div className="flex gap-2 flex-wrap">
                  {GENRES.map((g) => (
                    <button
                      key={g.key}
                      disabled
                      className={`px-3 py-1.5 rounded-lg border text-xs transition-colors cursor-not-allowed ${
                        (settings.genre || "Techno-Thriller") === g.key
                          ? "border-accent text-accent bg-accent/10"
                          : "border-border text-secondary"
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pacing */}
              <div className="space-y-2 opacity-60">
                <label className="text-xs font-semibold text-primary uppercase tracking-wider">Pacing</label>
                <p className="text-xs text-muted">The rhythm of the storytelling</p>
                <div className="flex gap-2">
                  {PACES.map((p) => (
                    <button
                      key={p.key}
                      disabled
                      className={`flex-1 px-3 py-1.5 rounded-lg border text-xs text-center transition-colors cursor-not-allowed ${
                        (settings.pace || "Slow Burn") === p.key
                          ? "border-accent text-accent bg-accent/10"
                          : "border-border text-secondary"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* --- AI Reading Experience (coming soon) --- */}
              <div className="space-y-1 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-bold text-muted uppercase tracking-widest">AI Reading Experience</h3>
                  <span className="text-[9px] font-semibold text-accent uppercase tracking-widest px-1.5 py-0.5 rounded bg-accent/10">Coming soon</span>
                </div>
                <div className="h-px bg-border" />
              </div>

              <div className="rounded-lg border border-dashed border-border bg-surface-alt/40 p-4 space-y-2 opacity-70">
                <p className="text-xs text-secondary leading-relaxed">
                  Restyle each chapter into a different mood (Horror, Chill, Romantic, Suspense, Noir, Cyberpunk),
                  and adjust length (Short / Standard / Extended).
                </p>
                <p className="text-[11px] text-muted leading-relaxed">
                  Currently disabled while the restyle pipeline is being rebuilt against
                  the v2 prose. Will return after the launch with per-chapter cached results
                  so it's both faster and free.
                </p>
              </div>

              {/* --- Image Generation (coming soon) --- */}
              <div className="space-y-1 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-bold text-muted uppercase tracking-widest">Scene Illustrations</h3>
                  <span className="text-[9px] font-semibold text-accent uppercase tracking-widest px-1.5 py-0.5 rounded bg-accent/10">Coming soon</span>
                </div>
                <div className="h-px bg-border" />
              </div>

              <div className="rounded-lg border border-dashed border-border bg-surface-alt/40 p-4 space-y-2 opacity-70">
                <p className="text-xs text-secondary leading-relaxed">
                  Per-chapter cinematic illustrations (16:9, themed to your selected mood),
                  generated with image models and cached locally on your device.
                </p>
                <p className="text-[11px] text-muted leading-relaxed">
                  Held back until the prose is final and a curated set of canonical
                  illustrations can ship pre-rendered. No reader-supplied API keys
                  required when it returns.
                </p>
              </div>

              <div className="pt-2 border-t border-border">
                <p className="text-[10px] text-muted leading-relaxed">
                  AI features are paused while the v2 prose stabilizes.
                  All settings are stored locally in your browser.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
