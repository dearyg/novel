# The Singleton — v5 Revision: Integration Notes & Decisions

Completed 2026-06-06 on branch `novel-v5-revision`. Records what the full v5 rollout did, the cross-chapter conventions resolved, and the one decision still open for the showrunner.

## What was done

| Pass | Scope | Result |
|---|---|---|
| 1 | Continuity/anchor conformance, Ch 2–20 | 129 fixes (ages, Ruth's gender, Tomás's war, Aion italics, countdown inserts, compile %) |
| 2 | Full v5 prose rewrites, all 20 EN chapters | +58% (70.7k → 112.3k words); 7 net-new CS-spine scenes; dialogue density; de-cliché; intros; 11 adversarial regressions caught + fixed |
| 3a | Chinese translation (`prose-zh`) | 20 ch retranslated from final EN; 235.8k chars |
| 3b | Concise editions (`prose-en-concise`) | 20 ch, ~1.2–1.7k words each |
| 3c | Brief synopses (`prose-en-brief`) | 20 ch, ~265–530 words each |
| 3d | Blueprint reconciliation | 159 fixes (Vance→Meridian, ages, footers, titles, CS-spine notes) |

**Global invariants verified end-to-end:** the reserved reveal string "One instance. Infinite partitions." appears only in Ch 20; the Afterlife countdown descends 90→60→45→30→21→14→7→3→1→0; the Aion v5 compile bar rises 87→90→95→96→99→100.

## Conventions resolved (already applied in the prose)

- **`{{user_location}}` / `{{user_landmark}}`** — kept as raw template tokens everywhere (resolved at render; Ch 20 treats it as "a free variable"). Never hardcode a city. Exception applied: the Seattle-specific "UW Medical Center" (Ch 10) was genericized.
- **The Concierge** — plain quotes, never italic (it is **not** Aion). Fixed in Ch 13.
- **"The Signal"** — Elena Okafor's **original** emergent composition. The Royal Albert Hall was scheduled for a Rachmaninoff program; the orchestra departed into *The Signal* during the Panic. It is **not** a Mahler rework (the global plan's "restore Mahler" note was incorrect).
- **"Still here"** — Darius Monroe's postgame mouth-shape (bible line 752); Iris's Ch 7 echo in Jeff's voice is the cross-partition bleed and depends on Monroe owning it first.
- **Chapter titles** — the prose titles are canonical (e.g. Ch 7 = "The Firewall"). The bible's 20-chapter overview should be conformed to them.
- **Footers** — the diversified in-world artifacts (Concierge log, notebook, newspaper, etc.) are canonical per revision-plan P1.7; the blueprints' C++-block mandate was stale and has been updated.

## OPEN DECISION — Julian Meridian's age (showrunner call)

Three canonical facts conflict and cannot all be true:
1. **Prose says 52** (Ch 2 & Ch 13 state "fifty-two"; the ledger locks 52).
2. **Ch 20** — his mother's cancer is *"twenty-five years later routinely curable"* → she died ~2005.
3. **Backstory** — mother died when Julian was **14** → born ~1991 → **~39** in 2030.
4. **Ch 20 also** — the Auberval "off his wrist for the first time in **thirty years**" → he got it ~age 22 → supports **52**.

So the "30-year watch" supports 52; the "mother died 2005, he was 14" supports 39. **My recommendation: keep 52** (it is explicitly stated twice, fits a trillion-dollar-company CEO, and the 30-year watch corroborates it) and reconcile the backstory — either *(a)* he was an adult (~27) when she died in 2005, or *(b)* she died ~1992 (keeping him a 14-year-old child) and Ch 20's "twenty-five years" shifts. **(a) vs (b) is an emotional-framing choice only you should make.** Until you decide, the prose stands at 52 with the backstory unedited (a latent inconsistency, not a reader-visible error in any single chapter).

## Minor flags (intentional, no action needed)

- Several blueprints describe a beat the v5 prose now does *better/differently* (e.g. Ch 5 Jeff notices Ghost's prime-tap directly rather than secondhand). These are deliberate prose upgrades; blueprints were noted, not "corrected" backward.
- Event-index vs chapter-number offset (whether a pre-Ch-1 0x00 event exists) — left as-is, internally consistent; cosmetic.
- Ch 4's Jeff–Priya marquee runs ~14 turns vs the 20 ideal — optional future density tweak; the distillation spine is present.

## Not done (awaiting your go)

- **Supabase sync** — every change is local to `novel-v5-revision`; `main` is untouched. Per the deploy rule, the prose is **not** synced to Supabase until you explicitly say so.
- **Commit / PR** — 110 paths are modified but uncommitted on the branch.
