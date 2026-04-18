# Reader Personalization System — Design Spec

## Overview

Three-layer personalization system for The Senior Observer novel site. Each layer is independent and stacks with the others.

## Layer 1 — Instant (No API, Free)

Already built. No changes needed except wiring `{{reader_name}}` tokens into chapter text.

- **Pre-made style variants**: Literary, Concise, Cinematic. Stored in `chapter_styles` table. Instant toggle.
- **Reader name**: `{{reader_name}}` interpolation in prose via `useReaderVariables`.
- **Location**: Browser geolocation API → reverse geocode via OpenStreetMap Nominatim. Cached 7 days.
- **Landmark**: Auto-derived from city, overridable in settings.

## Layer 2 — AI Text Restyling (Site Owner's Claude API Key)

Readers choose a **theme** and **length**. The server calls Claude to restyle the chapter, caching the result in Supabase so each unique combo generates once.

### Themes

| Key | Label | Prompt Flavor |
|-----|-------|---------------|
| `horror` | Horror | Dark, dread-building, visceral sensory detail |
| `chill` | Chill | Calm, meditative, ambient pacing |
| `romantic` | Romantic | Emotionally warm, relationship-focused, intimate |
| `suspense` | Suspense | Tight tension, cliffhanger pacing, paranoia |
| `noir` | Noir | Hardboiled narration, moral ambiguity, shadows |
| `cyberpunk` | Cyberpunk | Neon-lit, tech-heavy slang, street-level grit |

### Length

| Key | Label | Instruction |
|-----|-------|-------------|
| `short` | Short | ~40% of original length. Key beats only. |
| `standard` | Standard | Roughly same length as original. |
| `extended` | Extended | ~160% of original. Expand scenes, add sensory detail. |

### Stacking With Pre-Made Styles

AI themes and pre-made styles **combine**. If a reader selects "Concise" (pre-made) + "Horror" (AI theme), the AI prompt includes both: "Restyle in a horror tone using concise, stripped-down prose."

The cache key is: `chapter_id + theme + length + pre_made_style` (pre_made_style defaults to `"original"` when none selected).

### API Route: `/api/restyle`

**Request:**
```json
{
  "chapterId": "uuid",
  "theme": "horror",
  "length": "short",
  "style": "concise"
}
```

**Flow:**
1. Check `chapter_variants` table for cached match on `(chapter_id, theme, length, style)`.
2. Cache hit → return `{ content, code_footer, cached: true }`.
3. Cache miss → fetch original chapter from `chapters` table.
4. Build Claude prompt with original content + theme + length + style instructions.
5. Call Claude API (Sonnet for speed/cost, ~$0.01-0.03 per chapter).
6. Insert result into `chapter_variants`.
7. Return `{ content, code_footer, cached: false }`.

**Claude prompt structure:**
```
You are restyling a chapter of a techno-existential thriller.

ORIGINAL CHAPTER:
{content}

INSTRUCTIONS:
- Theme: {theme} — {theme_description}
- Length: {length} — {length_description}
- Voice: {style} — {style_description}
- Preserve all {{variable}} tokens exactly as-is (e.g. {{user_location}}, {{reader_name}}).
- Preserve the code footer format and technical metaphors.
- Preserve all plot beats and narrative structure.
- Do not add or remove characters or events.

Return ONLY the restyled chapter text, then a separator "---CODE_FOOTER---", then the restyled code footer.
```

### Supabase Table: `chapter_variants`

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

The API route uses a Supabase service role key (server-side only) to insert new variants.

### Environment Variables (Server-Side)

```
ANTHROPIC_API_KEY=sk-ant-...
SUPABASE_SERVICE_ROLE_KEY=...
```

These go in `.env.local` (already gitignored). On Vercel, set as environment variables.

## Layer 3 — AI Scene Images (Reader's OpenAI Key, BYOK)

Each chapter has a **default hero image** provided by the author, stored in `/public/images/chapters/` (e.g. `ch1.webp`). Readers can generate a themed alternative using their own OpenAI API key.

### How It Works

1. Default image displays at the top of each chapter.
2. If reader has entered an OpenAI API key in settings AND has a theme selected, a "Reimagine" button appears on the image.
3. Clicking "Reimagine" calls DALL-E 3 **directly from the browser** — the key never touches our server.
4. Generated image is cached in IndexedDB (keyed by `chapter_id + theme`).
5. On subsequent visits, cached image loads instantly.

### Browser-Side Image Generation

```js
// Runs entirely in the browser
const response = await fetch("https://api.openai.com/v1/images/generations", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${readerOpenAIKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "dall-e-3",
    prompt: buildImagePrompt(chapter, theme),
    n: 1,
    size: "1792x1024",
    quality: "standard",
  }),
});
```

### Image Prompt Structure

```
A cinematic scene illustration for a techno-existential thriller novel.

SCENE: {chapter_title} — {brief_scene_description}
MOOD: {theme}
STYLE: Widescreen, moody, atmospheric. No text or lettering.

{theme-specific instructions}
```

Scene descriptions are stored in the `chapters.tech_metaphor` field (already exists) or a new `chapters.scene_description` field.

### Reader Settings: OpenAI Key

- Password input field in the settings panel.
- Stored in `localStorage` only. Never sent to our server.
- Shown with a note: "Your key is stored locally in your browser and sent directly to OpenAI. It never touches our servers."
- A "Test Key" button that makes a lightweight API call to verify the key works.

## Updated Reader Settings Panel

Settings panel (auto-opens on first chapter visit):

| Setting | Type | Storage | Notes |
|---------|------|---------|-------|
| Your Name | Text input | localStorage | Interpolated as `{{reader_name}}` |
| Location | Auto-detect button | localStorage | Browser geolocation → reverse geocode |
| Your Landmark | Text input | localStorage | Overrides auto-derived landmark |
| Theme | Dropdown | localStorage | Original, Horror, Chill, Romantic, Suspense, Noir, Cyberpunk |
| Length | Dropdown | localStorage | Short, Standard, Extended |
| OpenAI API Key | Password input | localStorage | BYOK for image generation. Never sent to server. |

Pre-made styles (Literary, Concise, Cinematic) remain as a separate quick-toggle row on the chapter toolbar — not inside the settings panel.

## Data Flow (Complete)

```
Reader opens chapter
  ├─ Load original text from Supabase (existing)
  ├─ Show default hero image from /public/images/chapters/
  │
  ├─ If pre-made style selected (no theme):
  │    └─ Load from chapter_styles table (existing, instant)
  │
  ├─ If AI theme/length/style set:
  │    ├─ POST /api/restyle { chapterId, theme, length, style }
  │    ├─ Cache hit → return instantly
  │    └─ Cache miss → Claude generates → cache in Supabase → return
  │
  ├─ Interpolate {{reader_name}}, {{user_location}}, {{user_landmark}}
  │
  └─ If OpenAI key present + theme set:
       ├─ Check IndexedDB for cached image
       ├─ Show "Reimagine" button on hero image
       └─ On click → browser calls DALL-E 3 → cache in IndexedDB
```

## Cost Model

| Action | Who Pays | Cost Per |
|--------|----------|----------|
| Pre-made style toggle | Nobody | Free (pre-generated) |
| AI text restyle | Site owner (Anthropic key) | ~$0.01-0.03/chapter |
| AI image generation | Reader (their OpenAI key) | ~$0.04-0.08/image |

Text restyling costs are bounded: with 7 themes × 3 lengths × 4 styles × 20 chapters = 1,680 max unique combos. At $0.02 each = ~$34 total lifetime cost if every combo gets generated. In practice far fewer.

## Files to Create/Modify

**New files:**
- `pages/api/restyle.js` — Claude API endpoint with Supabase caching
- `components/HeroImage.js` — chapter hero image with "Reimagine" button
- `lib/imageGen.js` — browser-side DALL-E 3 client + IndexedDB cache
- `lib/imagePrompts.js` — prompt templates for each theme
- `public/images/chapters/` �� default chapter images (author-provided)

**Modified files:**
- `components/ReaderSettings.js` — add Theme, Length, OpenAI key fields
- `pages/[chapter].js` — integrate HeroImage, wire AI restyle into loading flow
- `lib/useReaderVariables.js` — already updated, no further changes needed
- `supabase-setup.sql` — add `chapter_variants` table + RLS policy
