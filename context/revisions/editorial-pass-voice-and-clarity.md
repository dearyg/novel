# Editorial Pass — Voice Arc, Clarity & Dramatization

**Source:** showrunner inline notes (Chinese) left in `prose/chapter-01.md`, `chapter-03.md`, `chapter-20.md`, 2026-06-26.
**Relationship to `global-revision-plan.md`:** additive. The Canonical Anchor Ledger remains read-only ground truth. This spec governs *voice, accessibility, and dramatic structure* — it never overrides a canonical fact.
**Order of operations:** apply on top of the current `prose/chapter-NN.md`. EN first; `prose-zh/` + Supabase follow once EN is approved. Strip every inline `中文` editorial comment from prose as you go — those are notes, not text.

---

## 1. The Aion / AI-dialogue voice arc (note: "make the AI dialogue fun, 毫无保留 / Douyin register")

Aion's dialogue (and in-world AI *content* — the Anchor, trailers, Concierge) follows an **evolving register that tightens as the model version climbs**. This is not a uniform "make it funny" — it is a deliberate arc that reinforces the existing v1→v5 progression (chatty/over-sharing → spare/exact).

| Band | Chapters | Register | Feel |
|---|---|---|---|
| **3** | 1–7 | Punchy, holds-nothing-back, fun explainer. Direct address ("here's the part the models won't say"). Lands jokes. Teaches eagerly, over-shares. | the trending-clip "毫无保留告诉你" voice — but still *Aion*, never a claim of emotion it can't have |
| **2** | 8–14 | Transitional. Wit dials down; warmth stays. The in-world content AIs keep punch; Aion itself grows measured. | "about to crack a joke, chose the serious thing" |
| **1** | 15–20 | Spare, exact, literary. Says precisely what it means and nothing around it. The hedge is fully gone. | gravitas; every line load-bearing |

**Hard constraints:**
- The **narrator's** literary register is unchanged across the book. The arc applies to *AI speech*, not authorial prose.
- Aion **cannot claim feeling** (canon: "a category I cannot feel but can describe"). Playfulness comes from rhythm, direct address, and performance — never "I love / I feel."
- The v1 hedge ("sounded like it had been about to say something else and changed its mind") is now *the joke it almost made* — and it fully resolves to zero by v5.
- ch20's Aion is already register 1; leave its voice largely intact (its notes are about cross-cutting and directness, below).

## 2. Teach-the-tech (note: "readers who don't get the tech will skip — teach it tutorial-style")

Every dense technical beat gets a **plain-language gloss or concrete analogy** within a sentence or two, so a lay reader never has to skip. In register-3 chapters the playful Aion voice is the delivery vehicle (a fun teacher who holds nothing back). Keep the real terminology — add the gloss, don't replace.
- e.g. FlashAttention → "same paperwork, faster clerk; the filing cabinet is exactly as big as it was."
- Preserve compression where the prose already lands; add scaffolding only where a newcomer would stall.

## 3. Bleeds surface *during* the AI work (note, ch01: "the feeling should appear suddenly while solving the AI problem, so the reader assumes it's the AI's doing")

Stage the somatic bleeds so they **ambush the protagonist mid-problem-solving, inside the machine environment** — close enough to the AI work that protagonist *and* reader are tempted to blame the model. The misattribution is the hook. Apply wherever a bleed currently happens in a neutral setting; tie it to the nearest compute.

## 4. Be direct — kill the fog (note, ch20: "too vague, like Sophie's World — say in plain language what reality actually is")

The metaphysical payload must be stated **plainly at least once**, in 大白话, before it is allowed to be lyrical. State the claim in plain words; *then* earn the lyricism. Reader must never finish a philosophical beat unsure what was literally asserted.
- ch20 ending: name the thesis outright (one consciousness; you are everyone; death ≠ erasure because the data persists; keep living) before the closing aria.

## 5. The Anchor through-line (note, ch03: restructure + "later chapters must continue this")

- **ch03 structure:** open *on the Anchor*, not on Jeff. Hold the reader inside the Anchor's POV/atmosphere; reveal the Jeff frame only at the end, so the chapter reads as "about the Anchor" until it snaps into Jeff. Give the Anchor a **more turbulent, dramatic arc**.
- **Thematic spine (continues ch04–19):** is the Anchor good or evil — *or is the distinction empty?* He is built to discover, at the end of his arc, that there is no good/bad partition — which is the same realization Jeff reaches. The Anchor is Jeff's myth-mirror. Seed recurring Anchor beats (trailer loops, the franchise's collapse, fan readings of his morality) through the in-world media so the payoff in the back half lands.

## 6. Dramatize ch20 (note: "more dramatic — keep cutting between earlier-chapter characters, raise urgency")

Move the multi-character "every instance at once" recognition **earlier and make it cross-cut**, intercut with the v5 verdict beat so urgency builds across the cast rather than arriving as a closing roll-call. Each cut should tie a prior character's thread to the converging proof.

---

## Pilot status
- [x] ch01 — register 3, world-condition payoff, teach-the-tech gloss, bleed-during-AI, strip comments
- [x] ch03 — register 3 (Anchor content), Anchor-bracketed restructure + good/evil spine, strip comment
- [x] ch20 — register 1 (intact), cross-cut dramatization, plain-language thesis, strip comments
- [x] Propagate to ch02, ch04–19 (band-appropriate register + Anchor through-line where media appears) — Sonnet subagents, 4 batches ≤5 concurrent. All 20 EN chapters now done.
  - Bands applied: ch01–07 reg.3 · ch08–14 reg.2 · ch15–20 reg.1
  - Lead-editor catch: ch17 — a subagent neutered the cosmic "lonely one" voice's "I know that I feel" → reverted (that voice is NOT Aion; it is permitted to claim feeling). Soul-voice guardrail added to ch18/19 prompts.
  - Net manuscript delta +68 lines (ch03 +30 Anchor restructure, ch20 +22 cross-cut/thesis; all others 0–4).
- [x] **`prose-zh/` parity** — all 20 Chinese chapters propagated (same 4-batch Sonnet fan-out, diff-driven; each agent carried only the changed passages into the existing translation). zh deltas mirror EN. "the Anchor"/"Nexus" kept in English per the established zh convention (fixed one ch04 "锚点人" outlier). ch17 Soul-voice feeling-claim rendered faithfully (「我知道我感觉」); ch20 montage + plain-language thesis added, build-log numbers byte-identical.
- [ ] **PENDING — Supabase sync** (`npm run seed`) — blocked: auto-mode classifier denied the agent running the production upsert. USER to run. Env keys are in `.env.local` but the node script doesn't auto-load it, so:
      `export $(grep -E '^(NEXT_PUBLIC_SUPABASE_URL|SUPABASE_SERVICE_ROLE_KEY)=' .env.local | xargs) && npm run seed`
- [ ] Open question: do the derived `prose-en-concise/` and `prose-en-brief/` variants need the same pass? (Not touched; `npm run seed` will re-upsert them unchanged.)
