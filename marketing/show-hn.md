# Show HN draft — The Singleton

Submit at: https://news.ycombinator.com/submit
- Title: 80 char limit
- URL: https://www.thesingleton.app
- Text: optional, but on Show HN posts, write a "first comment" instead — see below.

---

## Title (pick one)

**A — meta-process angle (recommended; HN loves the AI-tool angle)**
> Show HN: A novel where AI re-revises every chapter as the models get better

**B — bilingual / SDE angle**
> Show HN: A bilingual techno-philosophical thriller for SDEs (free, no account)

**C — narrative angle**
> Show HN: I wrote a 20-chapter novel where consciousness is debugged like a system

I'd lead with A. It's the most "Show HN" — there's a tool/system, not just a creative work.

---

## URL

```
https://www.thesingleton.app
```

---

## First comment (post this immediately after submission)

```
Hi HN — author here.

Quick context: I'm a builder, not a novelist. I've been writing this for about
nine months as a side project. *The Singleton* is a 20-chapter techno-existential
thriller set in 2030, about a Senior SDE in Irvine who starts experiencing
"somatic bleeds" — phantom sensations from lives that aren't his. Each chapter
is paired with a real CS / ML topic (attention routing, Byzantine consensus,
mechanistic interpretability, etc.) and a philosophy question (Hume, Locke,
Searle, Nietzsche, Brahman/Atman). The two threads run in parallel.

A few things that might be interesting to this crowd:

1. **Plot is human, prose is AI-revised.** I write the architecture — beats,
   character arcs, philosophical structure — and then iterate the prose with
   AI across multiple passes. Each chapter currently lives at v4. The point
   is that the book is **not frozen at publication**. As models get better,
   the chapters get revisited. The book you read in a year will be a sharper
   version of the book today.

2. **Bilingual EN / 中文.** Both languages are first-class — every chapter
   has been written in both. Toggle on the page; the language sticks.

3. **Reader receipt.** Six choice points throughout the novel feed an end-of-
   book "diagnostic" that scores you on a Singleton ↔ Sandbox axis. Local-only;
   no account, no email gate.

4. **Stack.** Next.js 16 (Pages Router) + Supabase + Vercel. Tailwind v4. The
   "AI-evolved prose" pipeline is just `scripts/seed-prose.mjs` plus a private
   `OPENAI_KEY` for restyle experiments — no platform lock-in.

5. **Why.** I wanted to find out whether a piece of fiction whose prose is
   *intended to drift over time* feels different from one that's frozen.
   Open question. If you read a chapter and have thoughts on which version
   is sharper, I genuinely want to hear it.

Free, no account, no ads, no tracking, no copy-paste (sorry — but the prose is
the artifact). Repo isn't open right now but happy to talk implementation in
comments. Thanks for reading.

— Homer
```

---

## Timing

- Best HN windows for tech-creative posts: weekday mornings, 8-10am Pacific.
- Avoid Sundays. Avoid Friday afternoons.
- One shot. Don't repost if it doesn't take off in the first hour. Wait two
  weeks, change the angle, try again.

## What to do if it hits the front page

- Watch for hostile comments about AI-prose; respond once, calmly, in the
  first comment. Don't argue down the thread.
- Expected ~40k visitors in 24h if you crack top 10. Vercel Edge handles it
  fine; Supabase pooler will need a quick check.
- Pre-stage one or two `git status`-clean follow-up posts ("here's what
  happens to the prose between v4 and v5") for the next 30 days while
  attention is high.

## Risks to flag

- **AI-prose backlash.** The HN audience is polarized. Some will love the
  meta-pipeline; some will downvote anything that says "AI" in the title.
  The defense in the first comment ("plot is human, prose is AI-revised")
  must be there from line one.
- **Free → no email gate.** Good for HN reception, bad for retention. Pair
  this submission with the newsletter signup (separate task) so the spike
  becomes a list.
