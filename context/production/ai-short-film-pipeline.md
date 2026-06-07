# AI Sci-Fi Short Film Pipeline — Production Notes

Captured 2026-06-02. Forward-looking direction for adapting The Singleton into 60–90s cinematic shorts in the style of 牛斗's 《机械纪元》 / "国产好莱坞" Douyin/Bilibili genre.

## Reference quality bar

Source: 牛斗's *机械纪元* series on Douyin. Significantly higher quality than typical AI shorts because the AI is doing *one job* (generating shots) while everything else is craft work on top.

## What makes that tier look "cinematic" (not one tool)

| Element | How it's done |
|---|---|
| Same character across shots (orange "Best Friend" mech, smiley screen) | Character lock — custom LoRA or strict img-to-video with reference images |
| Consistent world (cathedrals + floating ships + android crowds) | Curated reference plates, not raw text-to-video |
| HUD overlays + tracking boxes | **After Effects compositing, not AI** |
| Unified orange/teal grade across all shots | **DaVinci Resolve color pipeline, not AI** |
| Bilingual EN/中 burned subs | CapCut / Premiere |
| Consistent camera language (windshield-POV, low-angle hero) | Direction + storyboard, not AI |

The AI generates *the shots*. Consistency, grading, compositing, sound, edit rhythm — all craft.

## Real production pipeline (May–June 2026)

1. **Script + shot list** — Claude/GPT (you already have prose; treat as a script)
2. **Character reference sheets** — Midjourney v7 / Flux Pro / SDXL — generate 20–50 refs per character, pick consistent set
3. **Train character LoRA** (or use ref-image conditioning in Kling/Veo) — this is the consistency unlock
4. **Generate shots across multiple platforms** — pros use all of:
   - **Veo 3** — realism, native dialogue audio
   - **Kling 2.0** — character consistency, CN aesthetic
   - **Hailuo (MiniMax)** — best human faces
   - **Runway Gen-4** — best VFX shots
   - **Sora 2** — long shots, complex motion (when US-accessible)
5. **Cherry-pick ~1 of 8 generations**
6. **Upscale to 4K** — Topaz Video AI
7. **VFX comp** — After Effects (HUD overlays, screens-within-screens, tracking boxes)
8. **Color grade** — DaVinci Resolve (the unified palette)
9. **Sound design** — Foley, ambience, ElevenLabs SFX
10. **VO + music** — ElevenLabs / 海螺 / MiniMax voice + Suno v5
11. **Edit + burn subs** — CapCut or Premiere

## Honest cost & time per finished minute

| | Value |
|---|---|
| API/tool cost | $150–300/min (lots of throwaway generation) |
| Time, first short | 40–80 hours/min |
| Time, after pipeline locked | 20–30 hours/min |
| Team | typically 1–3 people |

A 60-second short at this quality = ~$200 in tools + 3–6 weeks of part-time work the first time. Subsequent shorts much faster because LoRAs, color pipeline, and overlay templates are reusable.

## Why The Singleton is well-positioned

Most novels adapt poorly because the scenes are talky. This novel has the opposite problem — too many visually loaded scenes:

| Chapter | Scene | Why it works as a short |
|---|---|---|
| Ch 1 | The Auberval bleed | Amber light, sea salt, platinum weight, deck pitch, snap-back. 60s short writes itself. |
| Ch 3 | The Sync | 580nm amber explosion + simultaneous merge with Kael in the rain. **Highest hook density per second.** |
| Ch 8 | Julian's Mediterranean | The flute, the teak, the moment the sage scent overrides. |
| Ch 15 | Silicon Siege collapse | Ghost's POV. Esports arena energy. |
| Ch 17 | Soul reversal | Visual reversal of who-is-whom. |

The blueprint already shot-lists most of these. *"The fluorescent strip above the PM's head flickered to a shade of amber"* is a shot. *"His fingers closed around something heavier"* is a close-up on the wrist.

## Algorithm-side recipe (from observed 牛斗 + peer hits)

- **First 1.5 seconds must hook.** Open mid-action, not on a wide.
- **Visual change every 3–5 seconds.** No long takes.
- **One concept per short.** Don't do "Chapter 1" — do "the bleed" or "the calibration."
- **Cliffhanger at frame ~85** (assuming 30fps × 90s = 2700, cliffhanger ~2550). For Ch 1: *"His left wrist had remembered a watch he had never worn."* Cut. Black. End.
- **Comments-friendly hook in the caption.** Example for Ch 1: *"如果你的记忆里有不属于你的东西，那是什么？"*

## Recommended first move

Pick **one** scene, build **first 15 seconds only** as a proof. I'd argue **Ch 3 — The Sync** because:

- Two-character setup forces you to lock both Jeff and Kael LoRAs (reusable across all other chapters)
- The amber-explosion + rain billboard plate are highest reusability (Ch 1 echoes, Ch 11 reveal, Ch 17 reversal all use elements of it)
- The "two strangers, same millisecond, same photons" concept is the *idea* that wins the algorithm

**Outstanding offer (declined / undecided as of session end):** Claude can write the 15-second shot list for the Ch 3 Sync cold open with specific gen prompts (Kling/Veo) + a Midjourney character-ref-sheet prompt for consistent Jeff and Kael. Pre-production only; no API costs until author runs it.
