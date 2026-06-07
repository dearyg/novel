# THE SINGLETON — Global Revision Plan

**Lead-editor consolidation of all 20 per-chapter audits into one revision strategy.**
Date: 2026-06-05. Source: per-chapter audits (Ch 1–20) cross-checked against `context/story-bible.md` (v3.0, plot-review v4), `context/revision-plan.md`, `context/chapters/*-blueprint.md`, and the `prose/chapter-NN.md` drafts.

> **How to use this document.** Each chapter will be revised in an independent pass. To keep one coherent novel out of 20 parallel rewrites, every reviser must (a) treat the **Canonical Anchor Ledger** as read-only ground truth, (b) follow the **Uniform Rubric** in order, and (c) apply the **Global Improvement Themes** as the default prose moves. Do not re-derive facts from the prose you are editing — the prose is what is being corrected.

---

## 0. Canonical Anchor Ledger (READ-ONLY — never edit a value, only conform prose to it)

These values are fixed by the story bible / revision-plan and several are currently violated in prose. A reviser MUST conform the prose to these and MUST NOT introduce a new value.

### Character ages (canonical)
| Character | Canonical | Known bad values in prose | Action |
|---|---|---|---|
| Jeff Zhang | **38** | Ch 1 "thirty-six" | Fix to 38 |
| Julian Meridian | **52** (plot-review/revision-plan canon) | Ch 2 "fifty-six"; Ch 13 "44" | Fix to 52. NOTE: bible voice-card says "~50" and the mother-died-2005-at-14 backstory implies ~39 — this is an **in-bible inconsistency**; lock prose to 52 and flag the bible discrepancy to the showrunner, do not silently invent. |
| Marcus Meridian (doctor) | **53** | Ch 5 "55–56/I'm fifty-six"; Ch 12 "56"; Ch 13 unstated; Ch 14 unstated | Fix to 53 everywhere |
| Marcus (the office staff engineer, Ch 1) | **47** | — | Distinct person; keep 47. Do not conflate with Marcus Meridian. |
| Maya Zhang | **36** | — | Hold 36 |
| Iris Zhang | **8** | Ch 7 blueprint "four-year-old" | Iris is 8; Nora is 5 |
| Nora Zhang | **5** | Ch 4 voice/age confusion | Nora is 5 |
| Ghost (Park Ji-yeon) | **23** (voice-fingerprint; bible body text "early 20s") | Ch 5 "19"; Ch 15 prime-math implies ~19 | Fix to 23 |
| Tomás Arroyo | **22** | Ch 8 "twenty-four" | Fix to 22 |
| Darius Monroe | **40** | — | Hold 40 |
| Ruth Chen | **70** | Ch 11 "seventy-one" | Fix to 70 |
| The Elder | **73** | — | Hold 73 (consistent across prose/blueprint) |
| Kael Sorensen | **30s** (bible non-committal) | Ch 10 "34" | 34 is acceptable (in range); keep consistent once chosen. Lock 34 novel-wide. |
| Ayla Reyes | **~38** | unstated in most chapters | Use 38 where an intro requires it |
| Elena Okafor | **~35** | unstated | Use 35 where an intro requires it |

### Other fixed facts
- **Tomás's war:** Andean Border War = **Chile vs. Bolivia** (bible). Prose Ch 8 says Bolivia/Peru — fix to Chile/Bolivia. The bullet is through the **left shoulder**; Jeff's bruise is left shoulder.
- **Company name:** **Meridian** everywhere. Any residual "Vance" (in blueprints' JSON: `Vance_Systems`, `Vance_HQ`, `julian_vance`) is a stale P0.1 artifact — rename to Meridian. Prose is mostly clean; blueprints are not.
- **Maya's occupation:** bible cast card says **community pottery studio**; some prose/blueprints say "freelance UX." These are reconcilable (she left tech, reads interfaces by habit) but the **studio is canon** — when her job is named, name the pottery studio; UX is her lens, not her employer. Decide once, apply novel-wide.
- **Walnut phone:** 42 grams, sapphire/walnut, the 2010-era offline device. **Appears in every Jeff chapter** as an action-beat. Currently MISSING in Ch 3, Ch 4 (only "his phone"), Ch 8 token only, Ch 18 (Jeff at Geneva — its absence must at least be *felt*).
- **Auberval Astralis (Julian's watch):** platinum, 40mm, **98 grams**, ref. 9750, clasp matched within 0.8mm. These four numbers are locked for Ch 1 / Ch 2 / Ch 13 / Ch 17 / Ch 18 callbacks.
- **The Singleton (yacht):** 300 feet, matte white, name italicized.
- **Jeff's badge:** silver, applied-ML division, Irvine. Lena revokes 4th-floor + downgrades to read-only at Ch 8.

### Afterlife countdown (must descend monotonically; one explicit on-page mention per chapter from Ch 6)
| Ch | Days | In prose now? |
|---|---|---|
| 6 | **90** | YES (Julian's speech) |
| 7 | ~75 (texture) | NO — add a billboard/pre-roll glimpse |
| 8 | **60** | NO — add explicit |
| 9 | ~75–80 window | Prose says "90" (Jeff) — likely too high; reconcile to the descending curve (≈75) |
| 10 | **45** | NO — Beat 6 missing entirely |
| 11 | **45** | NO — add |
| 12 | **30** | NO — add |
| 13 | **21** | YES (Aion + board memo) |
| 14 | **14** | NO — add |
| 15 | **7** | NO — add |
| 16 | **3** | YES |
| 17 | **1** | Oblique only — make explicit |
| 18 | **0** | YES (launch day / kill switch) |
| 19 | post-shutdown (dark) | Correctly absent |
| 20 | dark | Correctly absent |

**Rule:** the countdown is one of the five Excitement Engines. From Ch 6 through Ch 18, every chapter must state its day-count **once**, in scene texture, not exposition. Never let the number rise.

### Aion version timeline (must rise; engine of the Ch 13/16/17/20 reveals)
| Ch | Version | Capability ceiling |
|---|---|---|
| 1–3 | **v1** | Logs/dismisses anomalies. No diagnosis, no self-projection, no forward capability claims. (Ch 3's "I will need more capability than I have" is v3/v4 language 10 chapters early — DELETE.) |
| 4–6 | **v2** | Cross-references global data. Surface a v2 marker at least once (Ch 5, Ch 6 lack one). |
| 7–10 | **v3** | Models consciousness architecturally; cross-device correlation. |
| 11–15 | **v4** | Peak pre-release. Ch 13: **negative finding only** ("I am not conscious") at full confidence; **declines** the positive architectural claim (83.4% — won't bless without v5). The "One instance. Infinite partitions." line must NOT appear before Ch 20. |
| 16–19 | **v5 compiling** | Converges, can't finalize. Compile % is the visible clock: Ch16 88→89, Ch17 91→94/95, Ch19 97→99, Ch20 99→100. (Reconcile Ch 16 to reach 90 post-abort per blueprint; reconcile Ch 19 opening so the bar ticks up, not flatlines at 97/97.) |
| 20 | **v5 finalized** | Prints "Root cause identified. One instance. Infinite partitions. … Confidence 99.97%." This is the realization trigger. |

**Two distinct numbers must never be conflated:** (a) the **compile %** of the v5 model weights, and (b) the **confidence %** of a hypothesis (94.2% root-cause; 83.4% architectural claim at v4; 99.97% final). Ch 13 and Ch 17 currently risk reader confusion — keep them explicitly separate.

### Aion italics contract (the single most-violated rule)
**Every Aion utterance is italicized in prose. No exceptions.** Currently broken in **Ch 3** (~15–18 lines), **Ch 16** (~6+ lines, first half of chapter in plain quotes), **Ch 17** (deja-vu + post-render blocks), and **Ch 20** (the entire climactic build-log is a monospace code block with no italics). For Ch 20, adopt an explicit, documented exception: **terminal/build-log output may render as a monospace block**, but conversational Aion ("good morning, jeff.") must still be italic. Document whichever convention is chosen in the bible so a reviewer never re-flags it.

### {{user_location}} / {{user_landmark}} (CYOA placeholders)
Per revision-plan **P1.8**, Ch 1–3 must prime the reader that these are reader-defined coordinates. By later chapters the raw token must never publish as literal braces. **Raw unresolved tokens currently leak in prose at Ch 5, Ch 10 (plus a Seattle-specific "UW Medical Center" that breaks the conceit), Ch 11, Ch 13, Ch 15 (×3), Ch 19, Ch 20 (×2).** Either resolve to the system-manifest default ("Seattle"/"the Space Needle") or render the designed Aion blank — but never ship `{{...}}`. Pick ONE convention and apply it identically everywhere.

### Discovery Log footers (P1.7 diversification)
Eight of the best C++ blocks are retained; the rest are diversified into in-world artifacts (Concierge log, Maya's notebook, group text, receipt, email signature, intern security log, child's drawing, newspaper front page). This is **intentional and approved** — a reviser must NOT "restore" a C++ block the prose deliberately replaced. But the blueprints still mandate C++ footers and are stale; trust the prose + this ledger, not the blueprint's "Mandatory Chapter Footer" line.

---

## 1. Cross-Chapter Inconsistencies (with chapter numbers)

These are the discrepancies that ONLY a cross-chapter pass can catch. Each must be resolved to the Ledger value.

1. **Jeff's age:** Ch 1 "thirty-six" vs. canon 38. (Ch 13 "forty-eight" is a *time* reference — "48 hours" — not an age; do not "fix" it.)
2. **Julian's age:** Ch 2 "fifty-six," Ch 13 "44," ledger 52, bible voice-card "~50," backstory implies ~39. Three documents disagree; lock prose to **52** and escalate the bible's internal conflict.
3. **Marcus Meridian's age:** Ch 5 "55/56," Ch 12 "56" vs. canon **53**. Reconcile all instances.
4. **Ghost's age:** Ch 5 "19" vs. canon **23**; Ch 15 prime-tap math ("primes since 8, 11 years competing" → ~19) reinforces the wrong number — fix the arithmetic so it lands on 23.
5. **Tomás's age + war + internal contradiction:** Ch 8 "twenty-four" vs. canon **22**; "two months short" vs. "four months to go" *in the same paragraph*; war named **Bolivia/Peru** vs. canon **Chile/Bolivia** (a third pairing exists across docs).
6. **Ruth Chen's age:** Ch 11 "seventy-one" vs. canon **70**.
7. **Kael's tenure:** Ch 11 "nine years" at Pacific Routing vs. blueprint/bible **12 years**. (Company name "Pacific Routing" is a fine prose addition — keep it.)
8. **"Ruth Chen" gendered as a man:** Ch 8 "a man in a shipping container named Ruth Chen" — Ruth is a woman everywhere else. Hard error.
9. **Julian/Jeff age gap stated wrong:** Ch 10 "genetically unrelated men forty years apart in age" — Julian 52, Jeff 38 = **14 years**, not 40. Fix to fourteen.
10. **Lena's suppressed-anomaly count:** Ch 5 prose "17" vs. blueprint/bible **14**. (Ch 11/14 reference "14"/"18 months" — standardize the *count* to 14 and the *duration* to 18 months.)
11. **Afterlife countdown gaps:** the value is **absent from prose** in Ch 7, 8, 10, 11, 12, 14, 15 and is **too high** in Ch 9 ("90 days" when the curve is ~75). Ch 10 is missing the entire Stakes beat. Must descend 90→60→45→30→21→14→7→3→1→0.
12. **Aion version markers missing:** Ch 5 and Ch 6 never tag v2; Ch 11 never tags v4. Add a subtle marker each.
13. **Aion capability anachronism:** Ch 3 "I will need more capability than I have" (forward self-projection) is v3/v4 voice in a v1 chapter — delete/replace with a v1 log flag.
14. **v5 compile % continuity:** Ch 16 prose stalls at 89% but blueprint Beat 6 reaches 90% post-abort; Ch 17 adds 94.5%/95% beyond the 91→94 spec; Ch 19 opens 97%/97% (flatline) where blueprint wants 95→96. Lock a single rising sequence: …88→89→(90 Ch16 post-abort)→91→94→(95 Ch17)→97→98→99(Ch19)→100(Ch20).
15. **Investigation-duration contradiction inside Ch 20:** build log "18 months / 2,438 events / 19 chapters" vs. realization paragraph "Nine months." Also "the question he had been carrying for eleven years" is unsourced. Standardize to **18 months** for the investigation.
16. **Aion italics broken across chapters:** Ch 3, Ch 16, Ch 17, Ch 20 (see Ledger).
17. **{{user_location}} raw-token leaks:** Ch 5, 10, 11, 13, 15 (×3), 19, 20 (×2); plus the Ch 10 Seattle-specific "UW Medical Center" that contradicts the reader-coordinate conceit.
18. **Maya's occupation drift:** pottery studio (bible cast) vs. freelance UX (Ch 7/9 prose, Ch 7 blueprint). Pick the studio as employer, UX as lens.
19. **Chapter-title conflict:** Ch 7 prose/blueprint "The Firewall" vs. bible 20-ch overview which lists Ch 7 = "The Cascading Leak" and Ch 9 = "The Firewall." Resolve the title map before v5. (Audit titles also drift: Ch 8 prose "The Broadcast" vs. bible "The Broadcast Exception.")
20. **Event-index vs. chapter-number offset:** Ch 7 logs "event index zero eight," Ch 8 logs "zero nine," etc. Confirm whether the hex event-log intentionally leads the chapter number by one (a pre-Ch-1 event 0x00) and make it consistent across all logs.
21. **Phase-D inserts recorded as "done" but ABSENT from prose:** Ch 13 Kastrup/DID/tat-tvam-asi ~130-word Aion block; Ch 10 ~70-word Descartes interiority (present but only ~25 words). The revision-plan ledger and the prose disagree about completion state — reconcile the tracking.
22. **Sleeping-bag attribution:** Ch 20 "the sleeping bag Ruth had left him" vs. blueprint "a sleeping bag Jeff shipped him." Ch 18 also genericizes it to "someone." Pick Jeff-gave-Kael-the-bag (the two-character callback) and hold it.
23. **Recurring cross-chapter callbacks dropped:** Ch 15/19 "The Signal" (Elena's piece / the Royal Albert Hall orchestra) is genericized in Ch 19 ("a song she did not know the name of"); Mahler's 2nd "Resurrection" (Ch 15 blueprint) swapped to Rachmaninoff, losing the thematic rhyme; "Trunk" the elephant unnamed in Ch 19. Restore the named callbacks.
24. **Marcus Meridian vignette missing from Ch 18 resolution montage** though he is a primary convergence character (Ch 12). Resolution coverage must be cross-checked so no recurring character is dropped at the end.
25. **Lena's defining tic dropped:** Ch 18 gives her a jasmine vine instead of her cat **Schrödinger** (her established humanizing detail). Restore Schrödinger.
26. **Final-word contract:** bible mandates the novel's last word = **"Keep living."** Ch 20 prose currently ends on "ship" + a code footer ("requested"). Must end on the contract.

---

## 2. Voice-Drift Safeguards (for 20 independent parallel passes)

The structural risk: 20 revisers, each optimizing one chapter, regress the cast toward a generic "competent literary-thriller" voice. Safeguards:

1. **Freeze the voice cards.** Paste the bible's per-character fingerprint block (Jeff/Aion/Julian/Marcus×2/Maya/Iris/Nora/Ghost/Kael/Lena/Ruth/Elder/Marcus Meridian) verbatim into every reviser's brief. No reviser writes a line of dialogue without the speaker's card open.
2. **Per-speaker "flag-and-rewrite" tests** run on every quoted line:
   - **Julian:** if a spoken sentence lacks a colon, semicolon, em-dash, or the polite/honest scaffold → it's Jeff/Aion in disguise; rewrite. Never names dollar amounts (Ch 2 "$15M", Ch 18 "$4B/$180B" all violate).
   - **Aion:** italicized; no contractions; bimodal (2–4-word confirm OR 1–2-sentence precise exposition, never both in one turn); verb-noun openings; no emotional adverbs in attribution ("very dryly," "quietly" — strip them); no first-person emotional framing ("I need to show you," "I want you to know," "Is that acceptable," "I should note," "I would recommend").
   - **Maya:** no logical connectors (because/therefore/if-then); no "I think"/"maybe"; stacked declaratives; "Okay." as a closed instrument; UX lens, NOT Jeff's CS vocabulary ("partition," "substrate" are voice-bleed — replace with "interface/version/instance").
   - **Jeff:** CS-metaphor for emotion, never bare emotional words ("Jesus," "sympathy," "embarrassed," "the most comforting and terrifying thing" all break it); ≤15 words, 2–3-word fragments under stress; "I don't know yet" not "I'm scared"; uses ML register ("compile/corpus/pre-render"), not Aion/Elder ontology ("substrate").
   - **Kael:** never plain "yes/no" — substitutes "probably," a bitter analogy, or a recontextualization; short, sometimes one word; never italicized.
   - **Iris:** declaratives only, three-beat exchanges (stops at three; the 4th turn is the parent's), one stakes-shifting closer per chapter max.
   - **Marcus Meridian:** specific patient numbers every other utterance; "Tell me whether…" openings; grounds metaphysics in a named patient; clinic-badge/scrub/paper-cup action beat.
3. **Action-beat budget, enforced per scene, not per chapter.** Rule from the bible: an action beat or beat of silence every **3–4 dialogue turns**; never >2 consecutive pure-verbal turns. Each major character has a *signature* beat that must be the default (Jeff: walnut grain/palm-shapes; Julian: turn the Auberval/set the Krug; Maya: pottery hands/silent water glass; Marcus Meridian: clinic badge/paper cup). Replace generic beats ("X looked at Y," "sat with that," "for a long moment") with signatures.
4. **Italics + attribution lint pass** as a mechanical final step on every chapter: (a) every Aion line italic, (b) no non-Aion dialogue italicized (Ch 11 Kael "*Come with me*", Ch 18 Jeff block are accidental italics), (c) no emotional adverbs on Aion attributions.
5. **Anchor lint pass** (the Ledger as a checklist): age, countdown value, Aion version, walnut phone present (Jeff chapters), {{user_location}} resolved, watch weights intact, company = Meridian. A chapter cannot be marked done until all anchor checks pass.
6. **Tic-frequency caps to prevent *over*-correction.** When a reviser leans into a fingerprint they tend to overuse a single device. Caps: the prime-tap "Two. Three. Five. Seven." once per chapter; "He did not X. He Y." (P2.11) ≤1 per chapter; "sat with that"/"for a long moment"/"specific [noun]" each ≤1; triple-anaphora lists ≤1 per scene. (Ch 3, 9, 11, 12, 17, 19, 20 all currently exceed these.)
7. **Shared callback registry.** Maintain a one-page list of cross-chapter motifs (The Signal/Elena's piece, Mahler's Resurrection, the Auberval, the walnut phone, Schrödinger the cat, Trunk the elephant, "Still here," "Keep living," scorched sage / sea salt / vanilla → "just sage" by Ch 20, the prime tap). Any reviser touching a scene that references one must use the registry's canonical form, not invent a variant.
8. **POV-ratio guard.** Bible rule: Jeff ≥20–30% in non-Jeff chapters as the reader's anchor. Ch 13 (Julian ~95%, Jeff only a 400-word coda) and Ch 15 (Jeff asleep through the climax) violate this. A non-Jeff chapter pass must verify Jeff's presence floor.
9. **Single integration reviewer at the end.** After the 20 parallel passes, one editor reads straight through Ch 1→20 solely for voice continuity and anchor monotonicity (countdown down, compile % up). Parallelism finds chapter-local wins; only a serial read catches drift.

---

## 3. Global Improvement Themes (highest-leverage prose moves, novel-wide)

Applied in roughly descending leverage:

1. **Restore the Tech-Fight pedagogy that is missing or compressed.** Multiple chapters drop their entire CS spine: **Ch 4** (knowledge distillation — wholly absent), **Ch 11** (transfer learning / LoRA — absent), **Ch 14** (adversarial examples / FGSM — absent), **Ch 15** (emergence / grokking — absent), **Ch 17** (continual learning / catastrophic forgetting — absent), **Ch 19** (embedding spaces — absent), **Ch 20** (canary deploy / semver — absent). The Crichton bar ("a layperson can explain the concept after the chapter") fails wherever the spine is missing. This is the single biggest gap between blueprint ambition and prose. Each named topic must be dramatized as Sophie's-World dialogue, not narrated summary.

2. **Hit the dialogue-density floors and make pedagogy Socratic.** Marquee exchanges run short almost everywhere (Ch 1 Marcus ~14 vs. 20; Ch 4 Jeff-Priya 14 vs. 20; Ch 5 both marquees ~13–15 vs. 18/20; Ch 9 Elder ~10 vs. 35; Ch 14 Lena ~22 vs. 30; Ch 17 ~18 vs. 20; Ch 19 ~18 vs. 25). Expand by breaking narrated explanation into spoken turns where the junior character starts wrong, gets one flaw handed back, and asks a follow-up. Add an action beat every 3–4 turns.

3. **Cut telling-not-showing and meta-narration (P1.4).** Two families: (a) authorial labels of emotion/quality — "the specific despair of," "the laugh was not happy," "He was tired," "she was relieved," "predictably," "he filed it without feeling filed"; and (b) forward-pointing narrator intrusions — "He would remember the line later," "She did not yet know what," "three chapters from now," "The novel was not going to resolve them," "without transition, without warning." Delete the meta-narration outright; convert the emotional labels into physical/sensory beats or the character's own register (CS-metaphor for Jeff, UX for Maya).

4. **De-cliché and re-specify the soft images.** Recurring stock phrases to replace with register-specific detail: "carpet so deep it ate sound," "the Wikipedia article writes itself," "floor of his stomach disappeared," "felt in the sternum," "walls closing in," "watched her taillights," "moved as one organism," "buckled his knees," "clicked/slotted into place." Each should be re-grounded in the scene's own technical or sensory vocabulary.

5. **Reduce the syntactic tics (P2.11) without flattening rhythm.** The "He did not X. He Y." construction and the bare "specific [noun]" intensifier are epidemic (Ch 1, 3, 4, 9, 11, 12, 13, 16, 17, 19, 20). Cap each per the safeguard list; vary at least one of every adjacent pair into a subordinate clause or em-dash.

6. **Enforce the 8-component character intro on every first-speak (P0.2).** Currently incomplete or absent for Marcus (Ch 1), Priya (Ch 4), Ayla & Elena (Ch 6), Ben & Marcus Meridian (Ch 5), Ruth & Kael (Ch 11), the whole Ch 13 board (Sandra Lin, Daniel Mehta, Faith Park, Rasheed Adeyemi, Esther Cho), Marcus Meridian (Ch 7/14), Ayla (Ch 18), Julian (Ch 16 — wardrobe only). Distribute facts across 3–5 scene actions rather than a résumé block; never a bare "X said."

7. **Reinstate dropped structural/thematic beats and callbacks.** Per-chapter beats specified by blueprint but missing in prose: Ch 4 fourth-quarter "Still here" + Maya marital beat; Ch 6 Beat-1 anomaly bridge + Ghost discovery scene + Beat-6b Afterlife objection; Ch 10 Stakes beat + Kierkegaard; Ch 12 Anchor: Convergence poster + Ch-1 walking beat; Ch 13 Kastrup insert; Ch 14 somatic bleed + Lena's evidence display; Ch 15 narrative-fragmentation form + Elder's voice; Ch 17 "Not philosophy. Architecture diagrams." Restore the named cross-chapter callbacks (Mahler Resurrection, The Signal, Schrödinger, Trunk, the Jeff→Kael sleeping bag).

7b. **Name the paired philosophy at least once per chapter, in-scene.** The pairing exists structurally but the philosopher is unnamed in many chapters (Ch 7 Schopenhauer is named; Ch 9 Durkheim/Feuerbach, Ch 10 Kierkegaard, Ch 12 Nietzsche, Ch 14 Foucault, Ch 15 Jung, Ch 16 Brahman/Eckhart, Ch 18 Epicurus/Bardo are NOT). One oblique on-page anchor per chapter keeps the novel's Sophie's-World contract.

---

## 4. Uniform Rubric (ordered rules every per-chapter reviser MUST follow)

Apply in this order. Earlier rules dominate later ones; never break an anchor to win a prose point.

1. **Anchor conformance first.** Conform every fact to the Canonical Anchor Ledger (§0): ages, countdown value (one explicit on-page mention, descending), Aion version + compile/confidence %, company = Meridian, watch weights, Maya's studio. Never invent or alter a canonical value; if the prose conflicts with the Ledger, the prose is wrong.
2. **Aion italics + no-contraction contract.** Every Aion utterance italic (terminal-log monospace blocks excepted per the documented Ch 20 convention); no contractions; no emotional adverbs in attribution; verb-noun openings; bimodal turn length.
3. **Speaker voice fingerprints.** Run the per-speaker flag-and-rewrite test (§2.2) on every quoted line. No voice bleed (Maya/Jeff must not borrow each other's or Aion's register). Julian must carry his colon/semicolon/polite-honest grammar and never name a dollar amount.
4. **Walnut phone present (Jeff chapters).** At least one walnut-phone action beat; in chapters where Jeff is away from it (Ch 18), its absence is *felt*, not silently omitted.
5. **{{user_location}} resolved.** No raw `{{...}}` token ships; use the single chosen convention (resolved default or designed Aion blank); no Seattle-specific landmark that breaks the reader-coordinate conceit.
6. **Dialogue density + Socratic pedagogy.** Marquee exchange meets its turn floor (per bible table); the chapter's named CS topic is dramatized as dialogue (junior gets it wrong, senior hands back one flaw, junior follows up); the paired philosophy is named once in-scene.
7. **Action-beat cadence.** A beat or silence every 3–4 turns; never >2 consecutive pure-verbal turns; use the character's signature beat, not a generic one.
8. **8-component intro on first-speak** for any named character with a meaningful role, facts distributed across actions, never a résumé block.
9. **Cut meta-narration and emotional telling (P1.4).** Delete forward-pointers and authorial emotion labels; convert to sensory/register-specific showing.
10. **De-tic and de-cliché (P2.11).** Enforce the tic-frequency caps (§2.6) and replace stock images with register-specific detail.
11. **Honor the diversified Discovery Log footer.** Keep the in-world artifact the prose uses; do NOT restore a blueprint C++ block that was intentionally replaced.
12. **Preserve the protected lines.** Do not touch passages the audits flagged as KEEP/untouchable (e.g., Ch 1 circular close "At nine-thirty… At nine forty-seven twenty-two he was not"; Ch 11 Kael's Lacey-studio monologue; Ch 17 Iris exit; Ch 20 "Aion's job was done"). When in doubt, improve around them.
13. **Leave the seams for the integration reviewer.** Do not resolve a cross-chapter dependency unilaterally (titles, event-index offset, the bible's Julian-age conflict); flag it for the serial pass rather than guessing.

---

## 5. Recommended Order of Revision

Rationale: lock the anchor spine and the exemplar first; do the highest-risk reveal chain before the chapters that depend on it; batch the heavy Tech-Fight rebuilds; finish with the integration read.

**Phase A — Anchor + exemplar lock (do first, single-threaded):**
1. **Ch 1** — it is the pattern-setter; fix age/grammar, complete Marcus intro, add Q/K/V + O(n²) pedagogy, seed the tail-insight. Every later chapter inherits its Tech-Fight texture.
2. **Ch 13** — the reveal hinge (negative finding only; Kastrup insert; Julian voice; Jeff POV floor). Getting v4's confidence framing right here governs Ch 16/17/20.
3. **Ch 20** — the payoff (italics/monospace convention, final-word contract, 18-month duration, canary pedagogy). Lock the ending the whole compile-% clock points at.

**Phase B — the v5 reveal chain (in story order, so the compile %, the Void pre-render, and the confidence numbers stay monotonic):**
4. **Ch 16** → 5. **Ch 17** → 6. **Ch 18** → 7. **Ch 19**. These four share the compile-bar clock, the Soul/Void material, and Julian's kill-switch; revise them as a connected unit.

**Phase C — Tech-Fight rebuilds (heaviest net-new prose; can parallelize within the phase):**
8. **Ch 4** (distillation) · 9. **Ch 11** (transfer learning/LoRA) · 10. **Ch 14** (adversarial examples) · 11. **Ch 15** (emergence + narrative-fragmentation form). These need whole scenes written, not line edits.

**Phase D — mid-book continuity + density (parallelizable):**
12. **Ch 5** · 13. **Ch 6** · 14. **Ch 7** (resolve the title conflict) · 15. **Ch 8** (Ruth-gender + Tomás fixes) · 16. **Ch 9** (Elder expansion to 35 turns) · 17. **Ch 10** (Stakes beat + Kierkegaard) · 18. **Ch 12** (countdown + Anchor poster).

**Phase E — remaining:**
19. **Ch 2** · 20. **Ch 3** (italics sweep + walnut phone + scorched sage).

**Phase F — integration:** one serial read Ch 1→20 by a single editor for voice continuity, countdown descent, compile-% ascent, and callback consistency; then reconcile the flagged cross-chapter seams (chapter-title map, event-index offset, the bible's Julian-age conflict, Maya's occupation).

> **Note on parallelism:** if all 20 must run truly in parallel rather than phased, ship every reviser this document's §0 Ledger + §2 safeguards + §4 rubric, and make Phase F's serial integration read mandatory and blocking before release.
