# Reader Personalization System — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add three-layer reader personalization: instant variable interpolation, AI text restyling via Claude API with Supabase caching, and BYOK image generation via browser-side DALL-E 3.

**Architecture:** Server-side `/api/restyle` endpoint calls Claude Sonnet to restyle chapters, caching results in a `chapter_variants` Supabase table. Image generation runs entirely in the browser using the reader's own OpenAI key, cached in IndexedDB. Settings stored in localStorage.

**Tech Stack:** Next.js 16 (Pages Router), Supabase (Postgres + RLS), Anthropic SDK (`@anthropic-ai/sdk`), OpenAI DALL-E 3 (browser fetch), IndexedDB (via `idb-keyval`).

---

### Task 1: Install Anthropic SDK

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install the Anthropic SDK**

Run:
```bash
npm install @anthropic-ai/sdk
```

- [ ] **Step 2: Add server-side env vars to `.env.local`**

Add these two lines to the existing `.env.local` file (which already has `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`):

```
ANTHROPIC_API_KEY=<your-anthropic-api-key>
SUPABASE_SERVICE_ROLE_KEY=<your-supabase-service-role-key>
```

The service role key is found in Supabase dashboard → Project Settings → API → `service_role` (secret). This key bypasses RLS and is used server-side only to insert cached variants.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install @anthropic-ai/sdk for AI text restyling"
```

---

### Task 2: Create `chapter_variants` Supabase table

**Files:**
- Modify: `supabase-setup.sql`

- [ ] **Step 1: Add the table definition to `supabase-setup.sql`**

Append after the existing `writing_styles` table section:

```sql
CREATE TABLE chapter_variants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id uuid NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  theme text NOT NULL,
  length text NOT NULL DEFAULT 'standard',
  style text NOT NULL DEFAULT 'original',
  content text NOT NULL,
  code_footer text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(chapter_id, theme, length, style)
);

ALTER TABLE chapter_variants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read chapter_variants" ON chapter_variants FOR SELECT USING (true);
```

- [ ] **Step 2: Run the SQL in Supabase**

Go to Supabase dashboard → SQL Editor → paste and run the SQL from Step 1.

- [ ] **Step 3: Commit**

```bash
git add supabase-setup.sql
git commit -m "feat: add chapter_variants table for AI restyle caching"
```

---

### Task 3: Create `/api/restyle` endpoint

**Files:**
- Create: `pages/api/restyle.js`
- Create: `lib/restylePrompt.js`

- [ ] **Step 1: Create the prompt builder at `lib/restylePrompt.js`**

```js
const THEMES = {
  horror:    "Dark, dread-building, visceral sensory detail. Lean into body horror and creeping unease.",
  chill:     "Calm, meditative, ambient pacing. Warm and contemplative, like a late-night drive.",
  romantic:  "Emotionally warm, relationship-focused, intimate. Foreground tenderness and longing.",
  suspense:  "Tight tension, cliffhanger pacing, paranoia. Short sentences, withheld information.",
  noir:      "Hardboiled narration, moral ambiguity, shadows. First-person-feeling cynicism.",
  cyberpunk: "Neon-lit, tech-heavy slang, street-level grit. Dense sensory overload.",
};

const LENGTHS = {
  short:    "Condense to ~40% of original length. Keep only essential plot beats and key dialogue.",
  standard: "Keep roughly the same length as the original.",
  extended: "Expand to ~160% of original length. Add sensory detail, internal monologue, and atmospheric description.",
};

const STYLES = {
  original:  "Use the author's original voice and prose style.",
  literary:  "Rich prose with metaphor, interior depth, and lyrical sentence structure.",
  concise:   "Stripped-down, punchy sentences — just the essentials. Hemingway-esque.",
  cinematic: "Visual and atmospheric, reads like a screenplay. Heavy on action lines and visual cues.",
};

export function buildRestylePrompt(content, codeFooter, theme, length, style) {
  return `You are restyling a chapter of a techno-existential thriller called "Life of an SDE."

ORIGINAL CHAPTER:
${content}

${codeFooter ? `ORIGINAL CODE FOOTER:\n${codeFooter}\n` : ""}
INSTRUCTIONS:
- Theme: ${theme} — ${THEMES[theme]}
- Length: ${length} — ${LENGTHS[length]}
- Voice: ${style} — ${STYLES[style]}
- Preserve all {{variable}} tokens exactly as-is (e.g. {{user_location}}, {{reader_name}}).
- Preserve the code footer format and technical metaphors.
- Preserve all plot beats and narrative structure. Do not add or remove characters or events.
- Do not include any preamble or explanation.

Return ONLY the restyled chapter text. If there is a code footer, add a line containing exactly "---CODE_FOOTER---" followed by the restyled code footer on the next line.`;
}

export { THEMES, LENGTHS, STYLES };
```

- [ ] **Step 2: Create the API route at `pages/api/restyle.js`**

```js
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
```

- [ ] **Step 3: Test the endpoint manually**

Start the dev server (`npm run dev`). Use curl or the browser console:

```bash
curl -X POST http://localhost:3000/api/restyle \
  -H "Content-Type: application/json" \
  -d '{"chapterId":"<paste-a-real-chapter-uuid>","theme":"horror","length":"short","style":"original"}'
```

Expected: JSON response with `content`, `code_footer`, and `cached: false`. Second identical request should return `cached: true`.

- [ ] **Step 4: Commit**

```bash
git add lib/restylePrompt.js pages/api/restyle.js
git commit -m "feat: add /api/restyle endpoint with Claude + Supabase caching"
```

---

### Task 4: Update ReaderSettings with Theme, Length, and OpenAI Key fields

**Files:**
- Modify: `components/ReaderSettings.js`

- [ ] **Step 1: Rewrite `components/ReaderSettings.js`**

Replace the entire file contents:

```jsx
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
```

- [ ] **Step 2: Verify the settings panel renders**

Run `npm run dev`, open http://localhost:3000/1, click "Personalize". Verify: all text fields render, theme grid shows 7 options (Original + 6 themes), length shows 3 options, OpenAI key field shows with Test button.

- [ ] **Step 3: Commit**

```bash
git add components/ReaderSettings.js
git commit -m "feat: add theme, length, and OpenAI key to reader settings"
```

---

### Task 5: Wire AI restyling into the chapter page

**Files:**
- Modify: `pages/[chapter].js`

- [ ] **Step 1: Add restyle fetching logic to `pages/[chapter].js`**

Add a `useRestyle` hook and integrate it into the chapter page. Add these imports at the top:

```js
import { useEffect, useState, useCallback, useRef } from "react";
```

(Replace the existing `useEffect, useState, useCallback` import.)

Add the `useRestyle` hook after the existing imports, before `const SLUG`:

```js
function useRestyle(chapterId, settings, activeStyle) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  useEffect(() => {
    const theme = settings.ai_theme;
    if (!theme) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    const length = settings.ai_length || "standard";
    const style = activeStyle || "original";

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    fetch("/api/restyle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chapterId, theme, length, style }),
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Restyle failed");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [chapterId, settings.ai_theme, settings.ai_length, activeStyle]);

  return { data, loading, error };
}
```

- [ ] **Step 2: Update the `ChapterPage` component to use the restyle hook**

In the `ChapterPage` component, replace the block from `const [auditMode` through the `paragraphs` assignment with:

```js
  const [auditMode, setAuditMode] = useState(false);
  const [styleOverride, setStyleOverride] = useState(null);
  const [activeStyleKey, setActiveStyleKey] = useState("original");
  const { markRead } = useReadingProgress();
  const { variables, interpolate, requestLocation, locationRequested, settings, updateSetting } = useReaderVariables(novel.variables || {});

  const restyle = useRestyle(chapter?.id, settings, activeStyleKey);

  useEffect(() => {
    if (chapter) markRead(novel.slug, chapter.chapter_number);
  }, [novel.slug, chapter, markRead]);

  useEffect(() => {
    setStyleOverride(null);
    setActiveStyleKey("original");
  }, [chapter?.id]);

  const handleStyleChange = useCallback((data, styleKey) => {
    setStyleOverride(data);
    setActiveStyleKey(styleKey || "original");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!chapter) return null;

  const aiContent = restyle.data && !restyle.loading ? restyle.data : null;
  const rawContent = aiContent?.content || styleOverride?.content || chapter.content;
  const rawCodeFooter = aiContent?.code_footer ?? styleOverride?.code_footer ?? chapter.code_footer;
  const displayContent = interpolate(rawContent);
  const displayCodeFooter = interpolate(rawCodeFooter);
  const paragraphs = displayContent.split("\n\n");
```

- [ ] **Step 3: Add a loading indicator for AI restyling**

In the JSX, right before the `<div className="prose-content ...">` block, add:

```jsx
            {restyle.loading && (
              <div className="flex items-center gap-3 px-4 py-3 mb-6 rounded-lg bg-accent/5 border border-accent/20">
                <div className="w-4 h-4 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                <span className="text-xs text-accent">Restyling chapter with AI...</span>
              </div>
            )}
            {restyle.error && (
              <div className="flex items-center gap-3 px-4 py-3 mb-6 rounded-lg bg-rose/5 border border-rose/20">
                <span className="text-xs text-rose">Restyle failed. Showing original.</span>
              </div>
            )}
```

- [ ] **Step 4: Update StyleSelector to pass style key back**

Modify the `StyleSelector` `onStyleChange` callback in `components/StyleSelector.js`. Change the `handleSelect` function:

In `components/StyleSelector.js`, replace the `handleSelect` function:

```js
  async function handleSelect(styleKey) {
    if (styleKey === active) return;

    if (styleKey === "default") {
      setActive("default");
      onStyleChange(null, "original");
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
      onStyleChange(data, styleKey);
    }
  }
```

- [ ] **Step 5: Verify the full flow**

1. Open http://localhost:3000/1
2. Click "Personalize" → set Theme to "Horror" → close
3. Should see "Restyling chapter with AI..." spinner
4. After ~10-20 seconds, the chapter text should update to horror-themed prose
5. Refresh the page — should load instantly (cached)
6. Change pre-made style to "Concise" — should re-restyle with horror + concise combo

- [ ] **Step 6: Commit**

```bash
git add pages/[chapter].js components/StyleSelector.js
git commit -m "feat: wire AI text restyling into chapter reader"
```

---

### Task 6: Create image generation library (browser-side)

**Files:**
- Create: `lib/imageGen.js`
- Create: `lib/imagePrompts.js`

- [ ] **Step 1: Create image prompt templates at `lib/imagePrompts.js`**

```js
const THEME_IMAGE_STYLES = {
  horror:    "Dark atmospheric horror. Deep shadows, unsettling angles, desaturated with sickly highlights. Dread and isolation.",
  chill:     "Soft ambient lo-fi aesthetic. Warm muted tones, golden hour light, peaceful solitude. Studio Ghibli meets Edward Hopper.",
  romantic:  "Warm intimate lighting. Soft focus, rich warm palette, tender human moments. Romantic realism.",
  suspense:  "High-contrast thriller cinematography. Harsh directional light, deep blacks, paranoid framing. Fincher-esque.",
  noir:      "Classic noir. High contrast black and white with a single accent color. Rain-slicked surfaces, venetian blind shadows.",
  cyberpunk: "Neon-drenched cyberpunk. Electric blues and magentas, rain, holographic overlays, dense urban verticality.",
};

const CHAPTER_SCENES = {
  1: "A man sitting in a sterile corporate conference room, secretly gripping a wooden phone under the table. Fluorescent lights flicker amber. Santa Ana winds visible through tinted windows.",
  2: "A billionaire standing alone on the teak deck of a massive yacht at sunrise on the Mediterranean. A crystal champagne flute catching golden light. Platinum watch on wrist.",
  3: "A split-screen reality: on one side, a plush home theater in warm light; on the other, a freezing rain-soaked street corner beneath a glowing billboard. Both bathed in amber light.",
};

export function buildImagePrompt(chapterNumber, theme) {
  const scene = CHAPTER_SCENES[chapterNumber] || "A mysterious scene from a techno-existential thriller set in 2030.";
  const themeStyle = THEME_IMAGE_STYLES[theme] || "Cinematic, moody, atmospheric.";

  return `A cinematic widescreen scene illustration for a techno-existential thriller novel set in 2030.

SCENE: ${scene}

VISUAL STYLE: ${themeStyle}

RULES:
- Widescreen 16:9 composition
- No text, titles, or lettering anywhere in the image
- Photorealistic with cinematic color grading
- Atmospheric and moody — this is a book illustration, not a movie poster`;
}

export { CHAPTER_SCENES, THEME_IMAGE_STYLES };
```

- [ ] **Step 2: Create the image generation + IndexedDB cache at `lib/imageGen.js`**

```js
const DB_NAME = "novel_images";
const STORE_NAME = "generated";
const DB_VERSION = 1;

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function dbGet(db, key) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const req = tx.objectStore(STORE_NAME).get(key);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
}

function dbPut(db, key, value) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const req = tx.objectStore(STORE_NAME).put(value, key);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export function cacheKey(chapterNumber, theme) {
  return `ch${chapterNumber}_${theme}`;
}

export async function getCachedImage(chapterNumber, theme) {
  try {
    const db = await openDB();
    return await dbGet(db, cacheKey(chapterNumber, theme));
  } catch {
    return null;
  }
}

export async function generateImage(chapterNumber, theme, openaiKey, prompt) {
  const cached = await getCachedImage(chapterNumber, theme);
  if (cached) return cached;

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openaiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1792x1024",
      quality: "standard",
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || "Image generation failed");
  }

  const data = await response.json();
  const imageUrl = data.data[0]?.url;
  if (!imageUrl) throw new Error("No image returned");

  const imageBlob = await fetch(imageUrl).then((r) => r.blob());
  const reader = new FileReader();
  const dataUrl = await new Promise((resolve) => {
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(imageBlob);
  });

  try {
    const db = await openDB();
    await dbPut(db, cacheKey(chapterNumber, theme), dataUrl);
  } catch {}

  return dataUrl;
}
```

- [ ] **Step 3: Commit**

```bash
git add lib/imageGen.js lib/imagePrompts.js
git commit -m "feat: add browser-side DALL-E 3 image generation with IndexedDB cache"
```

---

### Task 7: Create HeroImage component

**Files:**
- Create: `components/HeroImage.js`

- [ ] **Step 1: Create `components/HeroImage.js`**

```jsx
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
```

- [ ] **Step 2: Add default chapter images directory**

```bash
mkdir -p public/images/chapters
```

Create placeholder files. The author will replace these with real images later. For now, the component gracefully handles missing images.

- [ ] **Step 3: Commit**

```bash
git add components/HeroImage.js
git commit -m "feat: add HeroImage component with DALL-E 3 reimagine button"
```

---

### Task 8: Integrate HeroImage into the chapter page

**Files:**
- Modify: `pages/[chapter].js`

- [ ] **Step 1: Add HeroImage import to `pages/[chapter].js`**

Add after the ReaderSettings import:

```js
import HeroImage from "../components/HeroImage";
```

- [ ] **Step 2: Add HeroImage to the chapter JSX**

In the chapter page JSX, right after the closing `</div>` of the chapter header block (the one with `className="mt-6 mb-8 border-b border-border pb-6"`), add:

```jsx
            <HeroImage
              chapterNumber={chapter.chapter_number}
              theme={settings.ai_theme}
              defaultSrc={`/images/chapters/ch${chapter.chapter_number}.webp`}
            />
```

- [ ] **Step 3: Verify the full integration**

1. Open http://localhost:3000/1
2. Without a theme set: should show default image (or nothing if no file exists)
3. Set theme to "Horror" in settings + add an OpenAI key
4. "Reimagine" button should appear on the image
5. Click it — should show spinner, then a DALL-E generated horror scene
6. Refresh — cached image loads instantly

- [ ] **Step 4: Commit**

```bash
git add pages/[chapter].js
git commit -m "feat: integrate hero image with AI reimagine into chapter page"
```

---

### Task 9: Add default hero images for chapters 1-3

**Files:**
- Create: `public/images/chapters/ch1.webp`
- Create: `public/images/chapters/ch2.webp`
- Create: `public/images/chapters/ch3.webp`

- [ ] **Step 1: Generate or source default images**

The author (Homer) needs to provide default hero images for each chapter. Options:
- Use DALL-E 3 or Midjourney to generate them manually
- Use placeholder images temporarily

For placeholders, create simple gradient images or leave the directory empty — the `HeroImage` component handles missing images gracefully by showing a "No image available" fallback.

- [ ] **Step 2: Place images in `public/images/chapters/`**

Files should be named `ch1.webp`, `ch2.webp`, `ch3.webp`. Recommended: 1792x1024px, WebP format for fast loading.

- [ ] **Step 3: Commit (once images are added)**

```bash
git add public/images/chapters/
git commit -m "feat: add default chapter hero images"
```

---

### Task 10: Delete placeholder API route and final cleanup

**Files:**
- Delete: `pages/api/hello.js`
- Modify: `.env.local` (add missing keys — manual step)

- [ ] **Step 1: Delete the placeholder API route**

```bash
rm pages/api/hello.js
```

- [ ] **Step 2: Verify `.env.local` has all required keys**

The file should contain:

```
NEXT_PUBLIC_SUPABASE_URL=https://khzwivfkyrkkzjgnnyoh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
ANTHROPIC_API_KEY=<your-anthropic-api-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```

- [ ] **Step 3: Full end-to-end test**

1. Open http://localhost:3000 — homepage loads with chapters
2. Click chapter 1 — settings panel auto-opens on first visit
3. Enter a name, enable location, pick "Horror" theme, "Short" length
4. Close settings — chapter restyles with AI (spinner, then horror-themed short text)
5. Toggle pre-made style to "Concise" — re-restyles with horror + concise combo
6. Add OpenAI key in settings — "Reimagine" button appears on hero image
7. Click Reimagine — generates horror-themed scene illustration
8. Navigate to chapter 2 — settings persist, AI restyle triggers for new chapter
9. Refresh any page — cached content loads instantly

- [ ] **Step 4: Commit**

```bash
git rm pages/api/hello.js
git add -A
git commit -m "chore: remove placeholder API route, final cleanup"
```
