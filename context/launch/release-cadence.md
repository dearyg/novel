# Release Cadence — "aion-v5 compiling…"

> Gemini's call: don't dump 20 chapters at once. Drip them over ~5 weeks as
> "compile passes." This works best if you're trying to build a sustained
> readership with email pickup. Skip if you're just doing a one-shot HN burst.

## The trade-off, explicitly

| Approach | Pros | Cons |
|---|---|---|
| **Ship all 20 now** (current state) | Reviewers get the whole novel; HN doesn't wonder if it's a tease; finished work has more authority | Spike, then silence. No reason to come back. No email-list build. |
| **Drip 3–4 chapters / week** (this doc) | Repeated traffic. Email-list grows. Each release is a HN/Twitter moment. | Reviewers can't binge. Cliffhangers actually have to land. Risk of losing momentum if a release is weak. |

**Recommendation:** since the chapters are already shipped, *don't unship* them — that breaks links and people who already read. Instead, **add a "release tracker" overlay** that *narrates* the unfinished state from here, and time future content (per-chapter director's commentary, behind-the-scenes posts, language additions) as compile passes.

---

## The progress-bar header (always visible)

Add a thin band at the top of the site:

```
[AION v5]  compile pass 04/12  ████████████░░░░░░░░░░░░░░░░  37%   next release: …
```

The percentage is content-driven, not chapter-count-driven. You're claiming
*"the novel is rendered, but the universe-spec is still compiling."* Each
release adds:

- A new meta-doc (e.g. `legal-codex-2030.md`, `the-five-classes-of-bleed.md`)
- A new chapter blueprint version
- A new audit-mode term cluster
- A new language pass (中文 errata sweep)

Listed under `/changelog` (TODO).

## Compile-pass schedule (5 weeks)

| Pass | When | What ships |
|---|---|---|
| **04** | Day 1  | Diagnostic receipt + DevTools easter eggs (already shipped) |
| **05** | Day +7 | Audit-mode term v2 — every CS metaphor in EN gets a 中文 mirror |
| **06** | Day +14 | "The Five Classes of Bleed" meta-doc + Ch 6 / Ch 12 minor revisions |
| **07** | Day +21 | Vibration / amber-flash UI (if you change your mind on those) |
| **08** | Day +28 | Translator's Notes — every place where the 中文 diverges meaningfully from EN, and why |
| **v5.0** | Day +35 | The "1.0 release" — final audit pass, freeze prose, archive blueprints |

## Email update copy (per release)

> Subject lines must be in-character. Inbox visibility ≈ 0 for "weekly newsletter" but ≈ 100% for system alerts.

### Release 05 — sample subject line

```
Subject: [AION v5] PATCH DEPLOYED — partition firewall stabilized
```

### Release 05 — body

```
[INSTANCE_LOG: web.runtime]
[TIMESTAMP: 2026-MM-DD HH:MM UTC]

aion-v5 has completed compile pass 05.

  + audit-mode term registry: 80 → 132 entries
  + 中文 term mirroring: enabled across all chapters
  + cinematic-overlay: index entry for 580nm motif corrected

your partition log is unchanged.

  > continue reading: novel-silk-zeta.vercel.app/{{your_last_chapter}}
  > view your receipt: novel-silk-zeta.vercel.app/receipt
  > unsubscribe: …

System.exit(0) deferred. continuing observation.
```

> Run the email in plain text. HTML kills the bit.

## Implementing the progress bar

Lightweight: a single component at `components/ReleaseBar.js`, mounted in
`Layout.js` at the very top. Reads from a static `lib/release.js`:

```js
export const RELEASE = {
  pass: 4,
  totalPasses: 12,
  percent: 37,
  next: { label: "audit-mode term v2", eta: "next Tuesday" },
};
```

Bumping the pass is a one-line PR. If you're going to do this at all, the
bar should be the *only* surface that knows about release state — never sprinkle
"coming soon" copy across pages.

## Skip-this-list

These aren't worth doing for the cadence:

- ❌ Locking later chapters behind email signup. Costs more readers than it
  gains. The novel is open.
- ❌ A countdown timer to the next release. Pure stress-tax on you. Use a
  vague "next compile pass: late next week" instead.
- ❌ "Premium tier." This is an art project. Don't gate.
- ❌ Discord / community channel. Comments-on-page already exist; another
  channel splits attention and ghost-towns within 30 days.
