# Session Log — 2026-06-02

Working session covering: Personalize panel cleanup, site QA pass, SEO files, content-quality tool eval, Ch 1 literary audit, AI sci-fi short film pipeline scoping.

---

## 1. Personalize panel — "Coming soon" reorganization

**File touched:** `components/ReaderSettings.js`

**Final order of the Personalize modal:**
1. Reading Length (active — actually used)
2. Identity & Location section header
3. Location (active)
4. Your Landmark (active — interpolated as `{{user_landmark}}` in prose)
5. **More Personalization · Coming soon** divider
6. Protagonist Name, Your Name, Somatic Trigger Light, Somatic Trigger Scent (disabled inputs, opacity 60%)
7. Genre, Pacing (disabled buttons, opacity 60%)
8. AI Reading Experience · Coming soon (existing)
9. Scene Illustrations · Coming soon (existing)

**Why these are gated:** verified via grep that the prose only interpolates `{{user_location}}` and `{{user_landmark}}`. `genre` / `pace` are written to localStorage but no consumer reads them (restyle keys off `ai_theme`/`ai_length`). `protagonist`/`reader_name`/`somatic_trigger_*` don't appear in any shipped prose tokens.

**Status:** deployed to production twice during session. Live at https://www.thesingleton.app.

---

## 2. Site QA pass — full results

All routes 200, all assets present.

| Check | Result |
|---|---|
| All 20 chapters (`/1`–`/20`) | ✅ 200 |
| `/`, `/about`, `/privacy`, `/receipt`, `/owner` | ✅ 200 |
| `/0`, `/21` | ✅ correctly 404 |
| `/cover-hero.jpg`, `/og-cover.jpg`, `/favicon-32.png`, `/apple-touch-icon.png` | ✅ 200 |
| All 20 chapter videos `/videos/ch01.mp4`–`ch20.mp4` | ✅ 200 (0.8–4.6 MB each) |
| CSS bundle | ✅ 200 (54 KB) |
| OG + Twitter meta tags | ✅ on every page |
| Per-chapter `<title>` | ✅ set |
| Hero img alt text | ✅ present ("The Singleton — cover") |
| `/api/comments/list` returns 401 for non-owners | ✅ intentional (owner-only) |

**Cosmetic note:** the `Observer0xFF.next()=>...` text in the header is intentional cinematic-overlay aesthetic, not a bug (some agents flag it).

---

## 3. SEO files — added & deployed

**Created:**
- `public/robots.txt` — allows everything except `/owner` and `/api/`, points to sitemap
- `public/sitemap.xml` — 24 URLs (home + about + privacy + receipt + 20 chapters), `lastmod=2026-05-09`

Both live and verified.

---

## 4. Content-quality tools — evaluation summary

### Inkos (Narcooo/inkos) — **not a fit**
Drafting-side tool optimized for high-volume web-novel generation (玄幻/仙侠/都市/科幻). The Singleton's plot is locked, voice is hand-tuned, and the equivalent infrastructure (restyle pipeline, audit terms, EN/中 delivery) is already custom-built. InkOS adds no leverage here.

### Recommended tools — ranked by actual ROI for this manuscript

1. **ElevenLabs TTS** — listen to chapters; ear catches rhythm problems eye doesn't. Free tier covers ~3 chapters/month. Highest-ROI free tool.
2. **Marlowe (Authors AI)** — fiction-specific analyzer (pacing curve, dialogue %, repetition density). ~$45 one-time per manuscript.
3. **Back-translation diff on ZH variants** — translate ZH → EN with a *different* model, diff against original. Catches translation drift. Cheap script.
4. **Reedsy — one chapter with a human literary-SF line editor** (~$200). Best single signal money can buy on prose. Lessons generalize.

### Skip
- ProWritingAid / Grammarly / Hemingway — fight literary fragments
- AutoCrit — redundant with Marlowe
- Sudowrite / NovelCrafter — drafting tools, past drafting
- A second LLM critique session (e.g., this one) — author noted correctly: "isn't this the same thing we're doing here?" → yes, scratched recommendation #3

### Honest verdict
Prose is past the bar where most tools materially help. The Ch 1 audit threw up four mechanical fixes + one strategic gap, which is *good* — most chapters by most authors generate dozens of line-level wobbles per chapter. Marginal value of further tooling is moderate. Most remaining gain comes from human readers (beta + line editor), not tools.

---

## 5. Chapter 1 literary audit — findings (June 2 2026)

Cross-checked `prose/chapter-01.md` (280 lines) against `context/chapters/chapter-01-blueprint.md` (190 lines) and `context/story-bible.md` voice fingerprints.

### 🔴 Bugs (mechanical fixes — apply first)

1. **"A Auberval" — three article errors.** Lines 139, 171, 197. Should be "An Auberval" (vowel sound). Every English reader will trip.

2. **Aion uses contractions, three times.** Voice contract says no contractions ever:
   - Line 25: *"You're processing"* → *"You are processing"*
   - Line 29: *"You're late"* → *"You are late"*
   - Line 179: *"That's not a daydream. A daydream doesn't change your tendon load. A daydream doesn't know the clasp diameter of a watch you have never owned."* — strip throughout. **This is the chapter's reveal line — the voice has to be perfect here.**

3. **Marcus continuity slip, line 149.** During the somatic bleed snap-back: *"Marcus was looking at him with a careful, unasked question in the set of his mouth."* Marcus was never placed in the sprint planning meeting (line 121 only establishes the PM). Last seen at the coffee bar walking off to the elevators (line 119). Either re-seat Marcus into the meeting earlier, or change line 149 to the PM.

### 🟠 Blueprint violations

4. **Aion identity over-explained on first introduction (line 23).** Blueprint says explicitly: *"Identity Constraint: Do NOT explicitly state what Aion is. Write Aion ambiguously…"*. Shipped prose contains:

   > *"…a kernel-level monitor running on a private slice of the company's largest model, with read access to Jeff's calendar, his keyboard, his commits, his eye-tracker, and — through his tax-deductible wrist-band — his pulse."*

   That sentence tells the reader exactly what Aion is in paragraph two. The reader-guessing layer the blueprint asks for is dead on arrival. **Highest-leverage edit in the chapter.** Suggest cutting that clause and letting Aion stay ambiguous through Ch 1; trust later chapters to disclose.

5. **Pedagogy gap: Q/K/V vocabulary never defined.** Blueprint's "Pedagogy content" section requires the Crichton bar — reader leaves understanding *Query / Key / Value* with the *"what am I looking for / what I'm advertising / what I'd contribute"* explanation. Shipped prose jumps to *softmax / heads / attention matrix / linear / sparse* without ever defining the unit of meaning. A 4-turn Marcus exchange at the coffee bar fixes it without adding length. The chapter currently teaches the *landscape* of attention research but skips the underlying *concept*. Without it, readers without ML background bounce off line 81 onward.

### 🟢 Verified intentional (not a fix)

6. **Beat 4 fusion line moved to Beat 7.** Blueprint asks for *"His attention collapsed onto a single token he did not own. The softmax of his own perception peaked somewhere else"* during the bleed. Shipped prose has the same image at line 253 (end of garage scene) instead of mid-bleed. Actually a structural improvement — reader has the vocabulary by then.

### What's working (do not regress)
- Jeff's voice fingerprint clean — primes (line 19), "filed" (47, 213), thumb-on-walnut, exhale-then-verb (line 79)
- Aion's verb-noun openings (line 211) and timestamp tic (line 175: "oh-nine forty-seven twenty-two")
- Final ladder line 99: *"in dollars and joules, in cooling water and cooling-tower steam, and in cooling-center wristbands the Allocator had not allocated. The bill was civilizational."* — keep
- Calibration sequence (lead weight on canvas strap) — taut, technically correct, unique to your voice

### Priority order if applying only three fixes
1. Article fix: "An Auberval" ×3 (5 min)
2. Aion identity ambiguity restored (cut the kernel-level-monitor clause from line 23) — biggest reader-experience lift
3. Aion contractions removed, especially line 179 (the reveal beat)

### Open decision
User has not yet authorized prose edits. When ready, apply fixes 1–4 directly to `prose/chapter-01.md`; draft fix #5 (Q/K/V pedagogy exchange) for separate review since it adds new prose.

---

## 6. AI sci-fi short film pipeline — production notes

Context: user shared 牛斗's 《机械纪元》on Douyin as the quality bar (cinematic AI-generated 60-90s shorts, "国产好莱坞" aesthetic).

### What makes 牛斗-tier work look this good (it is NOT one tool)

| Element | What it actually requires |
|---|---|
| Same character across shots (orange "Best Friend" mech) | Character lock — custom LoRA or strict img-to-video with ref images |
| Same world (cathedrals + floating ships + android crowds) | Curated reference plates, not raw text-to-video |
| HUD overlays + tracking boxes | **After Effects compositing, not AI** |
| Unified orange/teal grade across all shots | **DaVinci Resolve color pipeline, not AI** |
| Bilingual EN/中 burned subs | CapCut / Premiere |
| Consistent camera language | Direction + storyboard, not AI |

AI generates *the shots*. Everything that makes it look like a film — consistency, grading, compositing, sound, edit rhythm — is craft work on top.

### Real production pipeline (May 2026)

1. Script + shot list (Claude/GPT)
2. Character reference sheets — Midjourney v7 / Flux Pro / SDXL, 20–50 refs per character
3. Train character LoRA (or use ref-image conditioning in Kling/Veo)
4. Generate shots across multiple platforms (pros use all):
   - **Veo 3** — realism, native dialogue audio
   - **Kling 2.0** — character consistency, CN aesthetic
   - **Hailuo (MiniMax)** — best human faces
   - **Runway Gen-4** — best VFX shots
   - **Sora 2** — long shots, complex motion (when US-accessible)
5. Cherry-pick ~1 of 8 generations
6. Upscale to 4K — Topaz Video AI
7. VFX comp in After Effects — HUD overlays, screens-within-screens
8. Color grade in DaVinci Resolve
9. Sound design — Foley, ambience, ElevenLabs SFX
10. VO + music — ElevenLabs / 海螺 / MiniMax voice + Suno v5
11. Edit + burn subs — CapCut or Premiere

### Honest cost/time per finished minute at this quality

- **API/tool cost:** $150–300/min (lots of generation throwaway)
- **Time:** 40–80 hours/min first time; 20–30 hours/min once pipeline built
- **Team:** typically 1–3 people (牛斗 reportedly has a small team)

### Recommended starting point for The Singleton

User has a real advantage: prose is already shot-listed in the writing. Auberval bleed scene literally specifies *"the fluorescent strip above the PM's head flickered to a shade of amber"* — that's a shot.

**Highest-leverage first scene: Ch 3 — The Sync.** Two strangers, same millisecond, same photons. That's the *concept* that wins the algorithm.

**First step:** build only the **first 15 seconds** of Ch 3 as a proof. Lock the Jeff LoRA, Kael LoRA, amber-explosion shot, cathedral-rain-billboard plate. Then the rest of the short generates cheaply because the hard work is reusable across all 20 chapters.

Outstanding offer: write the 15-second shot list for the Ch 3 Sync cold open with specific gen prompts for Kling/Veo, plus a character-ref-sheet prompt for Midjourney to get consistent Jeff and Kael. Author has not yet accepted/declined.

### Local TTS output (still on disk, may want to clean up later)

Two MP3 renderings of the Ch 1 bleed passage saved at `tts-output/`:
- `ch01-bleed-samantha.m4a` (US female, 334 KB)
- `ch01-bleed-daniel.m4a` (UK male, 355 KB)

Generated via macOS `say` to demonstrate the TTS technique. Author chose not to listen — reframed task to direct content enhancement instead. **Note: bash later reported `tts-output` directory was deleted unexpectedly — may need to re-verify.**

---

## 7. Open items / next session pickups

- [ ] Apply Ch 1 audit fixes 1–4 to `prose/chapter-01.md` (pending author authorization)
- [ ] Draft Q/K/V pedagogy exchange (fix #5) for author review
- [ ] Decide whether to write Ch 3 Sync 15-second shot list for video pipeline
- [ ] CLI upgrade: `npm i -g vercel@latest` (was 52.0.0; latest is 53.2.0)
- [ ] Vercel deployment URLs from this session:
  - https://novel-sdz1orbwl-dearygs-projects.vercel.app (Personalize v1)
  - https://novel-6as7xzddu-dearygs-projects.vercel.app (Personalize reordered)
  - https://novel-bxwvggyjm-dearygs-projects.vercel.app (SEO files)
