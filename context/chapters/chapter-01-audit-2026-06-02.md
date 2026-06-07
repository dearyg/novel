# Chapter 1 Audit — 2026-06-02

Bespoke literary critique of `prose/chapter-01.md` (280 lines) against `chapter-01-blueprint.md` and `story-bible.md` voice fingerprints. Performed via Opus 4.7 with full canon in context.

## Apply-first patches (mechanical, low risk)

### Fix 1 — "An Auberval" article correction (×3)

**Why:** "Auberval" begins with a vowel sound; "A Auberval" is ungrammatical and trips every English reader.

| Line | Current | Fix |
|---|---|---|
| 139 | `A Auberval Astralis.` | `An Auberval Astralis.` |
| 171 | `Mass and clasp diameter of a Auberval Astralis` | `Mass and clasp diameter of an Auberval Astralis` |
| 197 | `matches a Auberval forty-millimeter case back` | `matches an Auberval forty-millimeter case back` |

### Fix 2 — Strip Aion's contractions (voice contract violation)

**Why:** `story-bible.md` § Aion: *"No contractions."* Three violations:

| Line | Current | Fix |
|---|---|---|
| 25 | `*You're processing,*` | `*You are processing,*` |
| 29 | `*You're late.*` | `*You are late.*` |
| 179 | `*That's not a daydream. A daydream doesn't change your tendon load. A daydream doesn't know the clasp diameter of a watch you have never owned.*` | `*That is not a daydream. A daydream does not change your tendon load. A daydream does not know the clasp diameter of a watch you have never owned.*` |

**Line 179 is the chapter's reveal beat — the voice must be perfect here.**

### Fix 3 — Marcus continuity slip (line 149)

**Why:** Marcus was never placed in the Sprint Planning meeting. Line 121 establishes only the PM. Last seen line 119 walking off to the elevators. Then line 149 has him observing Jeff during the bleed snap-back.

**Two options:**
- (a) Drop Marcus, replace with the PM: *"…and the PM was looking at him with a careful, unasked question in the set of his mouth."*
- (b) Re-seat Marcus into the meeting earlier (add a sentence to the line 121 block: *"Marcus was three seats down, the printout still in his hand."*)

Option (b) preserves the relationship beat; option (a) is the minimal change.

## Apply-second patch (strategic — biggest reader-experience lift)

### Fix 4 — Restore Aion identity ambiguity (line 23)

**Why:** Blueprint § "The Mentor: Aion" mandates: *"Identity Constraint: Do NOT explicitly state what Aion is. Write Aion ambiguously — make it sound like a highly analytical colleague on a remote voice-comm headset, or perhaps an internal, compartmentalized logical voice in Jeff's own ADHD brain. Keep the reader guessing."*

Current line 23 contains:

> *"The official org chart called Aion an 'embedded engineering assistant.' That was a polite way of saying: a kernel-level monitor running on a private slice of the company's largest model, with read access to Jeff's calendar, his keyboard, his commits, his eye-tracker, and — through his tax-deductible wrist-band — his pulse."*

This sentence tells the reader exactly what Aion is in paragraph two. The reader-guessing layer is dead on arrival.

**Suggested patch:** Cut the second sentence entirely. Keep "embedded engineering assistant" and let Aion's behavior across the chapter define what it is. The earlier *"He had once asked Aion whether it preferred a different name. Aion had said, I prefer the one you chose"* line already does the heavy lifting on ambiguity.

## Apply-third patch (additive — needs author review before drafting)

### Fix 5 — Q/K/V pedagogy exchange missing

**Why:** Blueprint § "Pedagogy content" requires the Crichton bar — reader leaves Ch 1 understanding *Query / Key / Value*. Shipped prose teaches the *landscape* (linear / sparse / flash / state-space / MoE) but skips the *concept*. Without Q/K/V, readers without ML background bounce off line 81 onward.

**Suggested intervention:** 4-turn Marcus-to-Jeff exchange at the coffee bar (before line 81), delivered as Marcus being cynical and Jeff being patient. Verbatim source for the dialogue is in `chapter-01-blueprint.md` § Pedagogy content → "What a transformer is" block.

**Status:** not drafted. Awaiting author authorization to compose new prose into the manuscript.

## Verified intentional — do not "fix"

- **Beat 4 fusion line moved to line 253.** Blueprint asks for *"His attention collapsed onto a single token he did not own"* during the bleed. Shipped prose places the equivalent image at the end of the garage scene. **This is a structural improvement** — reader has the vocabulary by then.
- **Jeff borrows Marcus's *"Christ."* on line 75.** Mild voice bleed under stress; defensible.
- **"point eight millimeters of specific"** (line 235) — Jeff thinking in Aion's register. Intentional echo.
- **Santa Anas + sage motif repeats ×3.** Rhythmic close. Intentional.

## What's strong (do not regress)

- Jeff voice fingerprint: primes (line 19), "filed" (47, 213), thumb-on-walnut, exhale-then-verb (line 79)
- Aion voice fingerprint: verb-noun openings (line 211), timestamp tic (line 175: "oh-nine forty-seven twenty-two"), single-word clarification offset (line 185: *"The event, or the measurement?"*)
- Line 99 close: *"in dollars and joules, in cooling water and cooling-tower steam, and in cooling-center wristbands the Allocator had not allocated. The bill was civilizational."* — literary
- Auberval calibration sequence (lines 169–197) — taut, technically correct, unique to this voice
- "small, voluntary confession" (line 71) — pure phrase
- Allocator-widget paragraph (line 121) — structural irony lands

## Priority order

If applying only three patches: Fix 1 → Fix 4 → Fix 2.
