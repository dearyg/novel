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
    key: "reader_name",
    label: "Your Name",
    description: "How the story addresses you",
    placeholder: "Enter your name",
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
  },
  {
    key: "somatic_trigger_scent",
    label: "Somatic Trigger Scent",
    description: "The scent that bridges realities",
    placeholder: "Scorched Sage",
  },
];

const OPENAI_KEY_STORAGE = "novel_openai_key";

export default function ReaderSettings({ variables, settings, updateSetting, locationRequested, requestLocation, autoOpen }) {
  const [open, setOpen] = useState(false);
  const [openaiKey, setOpenaiKey] = useState("");
  const [keyTestStatus, setKeyTestStatus] = useState(null);

  useEffect(() => {
    if (autoOpen) setOpen(true);
  }, [autoOpen]);

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

              {/* --- Identity & Location --- */}
              <div className="space-y-1">
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

              {/* Text variable inputs */}
              {TEXT_VARS.map((v) => (
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

              {/* --- AI Reading Experience --- */}
              <div className="space-y-1 pt-2">
                <h3 className="text-[10px] font-bold text-muted uppercase tracking-widest">AI Reading Experience</h3>
                <div className="h-px bg-border" />
              </div>

              {/* Theme */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-primary uppercase tracking-wider">Theme</label>
                <p className="text-xs text-muted">AI restyles the chapter to match this mood</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => updateSetting("ai_theme", undefined)}
                    className={`px-3 py-2 rounded-lg border text-xs text-left transition-colors ${
                      !settings.ai_theme
                        ? "border-accent text-accent bg-accent/10"
                        : "border-border text-secondary hover:border-primary/30"
                    }`}
                  >
                    <span className="font-medium block">Original</span>
                    <span className="text-[10px] text-muted">Author's voice</span>
                  </button>
                  {THEMES.map((t) => (
                    <button
                      key={t.key}
                      onClick={() => updateSetting("ai_theme", t.key)}
                      className={`px-3 py-2 rounded-lg border text-xs text-left transition-colors ${
                        settings.ai_theme === t.key
                          ? "border-accent text-accent bg-accent/10"
                          : "border-border text-secondary hover:border-primary/30"
                      }`}
                    >
                      <span className="font-medium block">{t.label}</span>
                      <span className="text-[10px] text-muted">{t.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Length */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-primary uppercase tracking-wider">Length</label>
                <p className="text-xs text-muted">How much detail the AI includes</p>
                <div className="flex gap-2">
                  {LENGTHS.map((l) => (
                    <button
                      key={l.key}
                      onClick={() => updateSetting("ai_length", l.key === "standard" ? undefined : l.key)}
                      className={`flex-1 px-3 py-2 rounded-lg border text-xs text-center transition-colors ${
                        (settings.ai_length || "standard") === l.key
                          ? "border-accent text-accent bg-accent/10"
                          : "border-border text-secondary hover:border-primary/30"
                      }`}
                    >
                      <span className="font-medium block">{l.label}</span>
                      <span className="text-[10px] text-muted">{l.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* --- Image Generation --- */}
              <div className="space-y-1 pt-2">
                <h3 className="text-[10px] font-bold text-muted uppercase tracking-widest">Image Generation</h3>
                <div className="h-px bg-border" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-primary uppercase tracking-wider">OpenAI API Key</label>
                <p className="text-xs text-muted">
                  Generate themed scene illustrations with DALL-E 3. Your key is stored locally and sent directly to OpenAI — it never touches our servers.
                </p>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={openaiKey}
                    onChange={(e) => handleOpenaiKeyChange(e.target.value)}
                    placeholder="sk-..."
                    className="flex-1 px-3 py-2 rounded-lg bg-surface-alt border border-border text-sm text-primary placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors font-mono text-xs"
                  />
                  <button
                    onClick={testOpenaiKey}
                    disabled={!openaiKey || keyTestStatus === "testing"}
                    className="px-3 py-2 rounded-lg border border-border text-xs text-secondary hover:text-primary hover:border-accent/30 transition-colors disabled:opacity-50"
                  >
                    {keyTestStatus === "testing" ? "..." : "Test"}
                  </button>
                </div>
                {keyTestStatus === "valid" && (
                  <p className="text-[10px] text-green">Key is valid.</p>
                )}
                {keyTestStatus === "invalid" && (
                  <p className="text-[10px] text-rose">Key is invalid or expired.</p>
                )}
                {openaiKey && (
                  <button
                    onClick={() => handleOpenaiKeyChange("")}
                    className="text-[10px] text-muted hover:text-accent transition-colors"
                  >
                    Remove key
                  </button>
                )}
              </div>

              <div className="pt-2 border-t border-border">
                <p className="text-[10px] text-muted leading-relaxed">
                  Text restyling is free. Image generation uses your OpenAI key (~$0.04-0.08/image).
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
