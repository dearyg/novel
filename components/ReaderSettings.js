import { useState, useEffect } from "react";

const CONFIGURABLE_VARS = [
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

export default function ReaderSettings({ variables, settings, updateSetting, locationRequested, requestLocation, autoOpen }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (autoOpen) setOpen(true);
  }, [autoOpen]);

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
            <div className="sticky top-0 bg-surface border-b border-border px-5 py-4 flex items-center justify-between rounded-t-2xl">
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
                Personalize how the story reads for you. These settings change variables woven into the prose.
              </p>

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

              {/* Configurable variables */}
              {CONFIGURABLE_VARS.map((v) => (
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

              <div className="pt-2 border-t border-border">
                <p className="text-[10px] text-muted leading-relaxed">
                  Settings are stored locally in your browser. They personalize the prose — the underlying story remains the same.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
