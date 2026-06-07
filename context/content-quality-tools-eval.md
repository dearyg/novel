# Content-Quality Tools — Evaluation

Eval performed 2026-06-02. Question: which external tools (beyond an LLM critique session in Claude Code) would meaningfully enhance the prose of The Singleton at this stage?

## Honest verdict

Prose is **past the bar where most tools materially help**. The Ch 1 audit found 4 mechanical fixes + 1 strategic gap (see `chapters/chapter-01-audit-2026-06-02.md`). For a literary techno-thriller at this revision stage, most remaining gain comes from **human readers** (beta + line editor), not tools.

## Recommended (ranked by actual ROI for this manuscript)

### 1. ElevenLabs TTS — listen to chapters

**Why:** Different sense (ear vs eye). Catches rhythm problems eye glides past. Especially valuable for the somatic-bleed scenes that depend on cadence.

**Cost:** Free tier covers ~3 chapters/month. ~$5/mo for full novel.

**Workflow:** generate per-chapter MP3 → listen at 1.0× → flag every sentence where ear stumbles → fix.

**Status:** Demonstrated with macOS `say` on Ch 1 bleed passage during session. Author chose not to listen — reframed task to direct content enhancement instead.

### 2. Marlowe (Authors AI) — fiction-specific manuscript analyzer

**Why:** Quantitative breakdowns: pacing curve, dialogue %, "showing vs telling" ratio, cliché density, repeated-word maps, narrative-distance flags. Built for novelists, not generic writing.

**Cost:** ~$45 one-time per manuscript.

**Caveat:** much of what Marlowe surfaces, you can already see. Best treated as one-time baseline check.

### 3. Back-translation diff on ZH chapters

**Why:** Translate each `zh` chapter back to English with a *different* model than the one that produced it; diff against your `en`. Where the diff is large, the ZH probably flattened a metaphor, lost code-aesthetic language, or shifted register.

**Cost:** Cheap script (~$1–2 in API calls). High signal for bilingual quality.

**Better:** native ZH beta readers. This catches a lot for free in the meantime.

### 4. Reedsy — one chapter with a freelance literary-SF line editor

**Why:** A *human* literary fiction line editor doing one chapter as a sample tells you more about your prose's actual weaknesses than every tool combined. The lessons generalize to the other 19.

**Target:** someone who has line-edited short SF in *Clarkesworld* or *Beneath Ceaseless Skies*.

**Cost:** ~$200 for one chapter.

## Skip these (with reasons)

| Tool | Why skip |
|---|---|
| **ProWritingAid / Grammarly / Hemingway** | Flag the wrong things in literary prose — will fight your fragments and code-syntax cadence |
| **AutoCrit** | Redundant with Marlowe |
| **Sudowrite / NovelCrafter** | Drafting tools. You're past drafting. |
| **Disqus / heavy comment platforms** | Comments are owner-only by design — don't break that for engagement metrics |
| **InkOS (Narcooo/inkos)** | Drafting-side tool optimized for web-novel genre volume (玄幻/仙侠/都市). Your plot is locked, voice is hand-tuned, restyle pipeline is already custom-built. Adds no leverage. |
| **A second LLM critique session in this same tool** | Author noted correctly: "isn't this the same thing we're doing here?" → yes, same signal. The leverage move would be a *different model* (GPT-5 or Gemini Ultra) on the same chapter for different blind spots. |

## What this session itself can do (don't outsource)

- Bespoke continuity audit via Opus 4.7 with full canon in context — done for Ch 1. Can extend to Ch 2–20 on request. **This is the highest-leverage move available right now.**
- Voice-fingerprint compliance check per chapter against `story-bible.md` § CHARACTER VOICE FINGERPRINTS
- Pedagogy-bar check per chapter (does it clear the Crichton bar for its tech concept?)
- Blueprint-deviation report per chapter
- Mechanical fix sweep (article errors, contraction violations on Aion, etc.)

## Open recommendations not yet exercised

- [ ] Run Marlowe one-time baseline on the full manuscript (~$45)
- [ ] Beta-reader pool for non-ML-background readers (test the Crichton bar at line 81 of Ch 1)
- [ ] One Reedsy line-editor sample chapter (~$200)
- [ ] Back-translation diff script for all 20 ZH chapters (~$5 in API)
