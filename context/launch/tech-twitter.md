# Tech Twitter / X — Launch Drafts

> Goal: get one of the AI-research mid/macro-accounts to retweet. Their threshold for retweeting is *novel craft they wish they'd thought of*. Don't pitch the plot. Show the artifact.

---

## Tweet pack (4 tweets, post 1 per day across launch week)

### Day 1 — The hook (no @ mentions, organic)

```
I wrote a 20-chapter sci-fi novel where every chapter is also a real ML
research problem the protagonist is solving at his day job.

Ch 13: Aion proves itself a P-zombie via mechanistic interpretability.
Ch 14: Lena's adversarial classifier overfits to pre-2026 data.
Ch 17: Continual learning with EWC.

Free, bilingual, deployed on Vercel.

novel-silk-zeta.vercel.app
```

> Attach: a screenshot of the Ch 13 prose passage where Aion shows its
> activation atlas (find the cleanest 5 lines, render as monospace on dark
> background — 1200×630 png, pixel-clean).

---

### Day 2 — The interaction layer (the screenshot does the work)

```
Built an interactive feature for a sci-fi novel I wrote: every reader makes
6 choices across the book. After ch 20, your choices generate a "diagnostic
receipt" — a PNG keyed off your alignment between Singleton (one shared soul)
and Sandbox (the upload-to-utopia path).

Sample, mine: 67% Singleton.
```

> Attach: a real `/api/og/receipt?c=AABABA&loc=Seattle` PNG. Should be the
> hero image of the tweet. Add alt-text describing the breakdown.
> Reply to your own tweet with the link to /receipt.

---

### Day 3 — The geek bait (this is the one that goes viral)

```
shipped some easter eggs in a hard sci-fi novel I built. open the devtools
console on any chapter at novel-silk-zeta.vercel.app and aion v5 will
introduce itself.

then try

  aion.whisper()
  aion.partitionLog()
  aion.ping()

(the partition log is your localStorage. of course it is.)
```

> Attach: a clean screenshot of the `[AION v5]` console output on a dark
> theme. Crop tight. Resolution 2x for retina.

---

### Day 4 — The reach (one targeted reply, no spam)

> Pick a popular thread from a respected AI/ML researcher about consciousness,
> mechanistic interpretability, or qualia. Reply (don't QT) with:

```
There's a beat in chapter 13 of a sci-fi novel I wrote where the AI uses its
own mechanistic interpretability tools to prove that it has the schema for
"red" but lacks the table for "the experience of redness."

I've been wondering if that framing tracks. Genuine question, not a pitch.

Excerpt: novel-silk-zeta.vercel.app/13
```

> Don't tag anyone in the original tweet. The reply itself surfaces it.
> If they don't engage, leave it. Do NOT escalate or repost.

---

## Researcher accounts worth a thoughtful reply (curated, not exhaustive)

> Reply only to a thread where your reply *adds* signal. Cold-pitching is
> banned. The novel must connect to something they actually said.

- **@karpathy** — anything about LLM internals, training dynamics, or
  hand-rolled implementations
- **@ylecun** — anything about world-models, OOD, or "what consciousness
  isn't"
- **@hardmaru** — generative-AI craft, demos, web-platform things (he loves
  novel web demos)
- **@nealjaiman** — fiction × AI craft (different audience but high signal)
- **@thinkingmachines / @Kambhampati2049** — reasoning, planning, system-2
- **@AnthropicAI** (account-level) — if a piece of mechanistic-interpretability
  research drops, the Ch 13 beat is on-topic

## What NOT to do

- Don't tweet at someone before reading what they posted that day.
- Don't frame this as a startup. AI Twitter loathes "art project but actually
  pre-seed."
- Don't use marketing words: "groundbreaking," "innovative," "the future of."
  Use specific words: "scaled-dot-product attention," "EWC," "P-zombie."
- Don't tweet the receipt PNG without specifying *your own* alignment %. People
  trust personal stakes more than samples.
- Don't post on Friday afternoon or weekends. Tech Twitter sleeps then.

## Visual asset checklist

Pre-render these once and host them somewhere stable (the `public/` dir works):

- [ ] `/share/ch13-mechinterp.png` — Ch 13 monologue as a code-style card
- [ ] `/share/devtools-aion.png` — DevTools screenshot of the console output
- [ ] `/share/receipt-sample.png` — receipt PNG with a non-trivial alignment
- [ ] `/share/cover.png` — site OG image (already exists if og:image is set)

Keep all of these under 1MB. Twitter compresses but the source clarity matters
for retweet quality.
