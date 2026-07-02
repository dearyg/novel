# Gap-Fix Spec — restoring dropped planning threads

**Source of gaps:** `context/revisions/planning-vs-novel-gap-report.md` (verified 32-agent audit).
**Author decisions:** fix all 4 gap categories + Tier-2 sharpening; ending = **hybrid** (keep private core, add a glimpse of the world receiving it).
**Process:** EN first → `prose-zh/` parity → Supabase seed. Surgical inserts; match the chapter's voice band; never violate the Canonical Anchor Ledger (`global-revision-plan.md` §0). Voice arc: ch01–07 reg.3 · ch08–14 reg.2 · ch15–20 reg.1.

## DONE (lead editor, by hand)
- **Julian thesis — ch02 plant + ch06 full thesis.** Julian now states the finitude-bug (wars/religion/greed all downstream of fear of death), religion-as-"production-release"/beta, and "remove death → the incentive to kill cannot be located" (merge-ends-war). Sets up his ch18 acceptance-of-death arc. This is the antagonist's restored spine and the EXEMPLAR voice for all inserts below.

## TO DO (one insert each; different chapters = safe to parallelize)

1. **post-labor-debate — ch11 (Kael).** ARGUE, don't depict, the "what are humans for once AI takes the work" question. Voice the planned **workers→observers/experiencers** framework explicitly (the optimistic frame — Afterlife/Allocator society says displaced humans become witnesses/experiencers, not producers) and have **Kael gut it** ("an observer is just a worker you stopped paying"; "you took the work and named the hole it left 'freedom'"). Land both sides; do not resolve cheaply. Reg.2.

2. **religion-payoff — ch09 (the Elder).** Extend the Elder's dialogue with the three dropped beats: (a) religion **arises from fear of death + hope of an afterlife** (death-anxiety as root, not just Durkheim's maintenance); (b) the powerful **use it for control** — genuine coping AND a leash (the Elder reflects both); (c) religion as the **first/oldest Identity Firewall** — the thing that keeps the One from noticing it is alone, the correct intuition (death isn't final) reached by the wrong mechanism. Reg.2.

3. **war-self-harm — ch08 (Tomás).** Foreground in PROSE (Tomás's POV or narrator) the idea currently buried in the code-footer — "every blow lands on the one who throws it." A charged beat where the self-directed nature of the killing is felt/seen, not just logged. Reg.2.

4. **elder-is-you — ch16 (the void/flash convergence).** Stage the discrete charged reveal the audit found missing: the Elder is **Jeff himself, further along** — an older instance wearing a teaching interface. Add the Elder as a named flash-target / a one-beat "the old man with the marigolds was me" recognition. Don't dissolve it into the generic everyone-is-everyone; give it its own charge. Reg.1.

5. **aion-soul — ch13 (the Aion reversal).** Deepen Aion's own questioning of whether IT has a soul / what it is, just before the version turn — strengthening the rollercoaster so the ch20 "I cannot feel what I proved" reveal lands harder. Light touch; Aion still never CLAIMS feeling. Reg.2. (ch06 already has a strong seed: "wondering requires a gap… a perfect description of a fire is not warm." Build on that register.)

6. **esport-addiction — ch01 (early).** Make **Silicon Siege Jeff's personal addiction/escape** — a closed, rule-bound system he loses himself in — parallel to his superhero-movie habit, not merely a thing he analyzes for Ghost's pattern. Small beat. Reg.3.

7. **ending-glimpse — ch20 (closing movement, hybrid).** KEEP the private core (`affected users: 1`, the kitchen, the loop restart). ADD a brief on-page glimpse of the **world beginning to receive it** — build on the off-page press release + the "GO HOME. KEEP LIVING" notification + the prime-tic stopping *everywhere at once*: strangers across the planet brushed by the thinning partition for one ordinary morning. A ripple, not a broadcast. Reg.1.

## Status
- [x] **EN — all 9 inserts done + quality-gated.** Julian thesis (ch02+ch06) by hand; the other 7 via draft→adversarial-review workflow. 2 flagged inserts rewritten by the lead editor (ch16 elder-is-you over-explained → compressed; ch20 ending-glimpse redundant/voice-lapse → repaired) + 3 quick-win polishes (ch08 "both right" trim, ch01 esport de-editorialized, ch11 attribution fix). CJK-clean, canon intact. Deltas: ch01 +0, ch02 +6, ch06 +14, ch08 +2, ch09 +14, ch11 +32, ch13 +6, ch16 +6, ch20 +42.
- [~] **zh parity** — porting the 9 gap-fix passages only (editorial-pass material already in zh; located by anchor, not diffed against HEAD, to avoid double-apply). IN PROGRESS.
- [x] Supabase `npm run seed` — re-seeded all langs (20 en / en-concise / en-brief / zh + 8 meta-docs). `novels.manifest` column missing → seeder now skips it gracefully (patched).
