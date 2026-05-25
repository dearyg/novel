# Show HN — Launch Post

> Targets the **Show HN** category on Hacker News. Reach: ~10–50k UVs if it lands the front page; ~1–5k otherwise. The HN audience cares about **architecture, novelty, and craft** — not plot summaries. Lead with the build, not the story.

---

## Title (80 char max — these all fit, pick one)

**Primary (recommended):**
```
Show HN: An interactive hard sci-fi web novel about ML systems and consciousness
```

**Alternates:**
```
Show HN: A novel where Aion v5 is the protagonist, and the reader is a partition
```
```
Show HN: A 20-chapter web novel built on Next.js where every chapter is a tech-fight
```
```
Show HN: I wrote a hard sci-fi novel about distributed identity, deployed it on Vercel
```

---

## Post body (paste into the post — keep under ~3,500 chars)

```
Hi HN,

I built a 20-chapter interactive sci-fi novel called *Life of an SDE* and deployed
it as a Next.js app on Vercel. Live at: https://novel-silk-zeta.vercel.app

The premise is one I haven't been able to get out of my head: every chapter is
both a chapter of fiction AND a real ML / systems engineering problem. Jeff,
the protagonist, is a senior SDE at a frontier-AI company in 2030 working on:

- Tail-attention routing (Ch 1)
- Priority inversion in a hyperscale scheduler (Ch 2)
- Stylometric embeddings for ghost-commit forensics (Ch 5)
- Mechanistic interpretability — Aion proves itself to be a P-zombie (Ch 13)
- Adversarial overfitting on pre-2026 data (Ch 14)
- Continual learning with elastic weight consolidation (Ch 17)

…and 14 more. Each chapter pairs a real research problem with a philosophical
question about consciousness, identity, and what makes a "person" reducible.

The architectural core: every human in the universe is a sandbox container
sharing one underlying execution thread. When the partitions degrade, sensory
data leaks across instances — Jeff feels a stranger's heartbeat, tastes
champagne in a conference room, etc.

What's interesting from an engineering perspective:

- **Bilingual (EN + 中文) corpus** — 40 chapters total, ~330k chars of prose,
  upserted via a Node seeder that reads markdown and maps to a (novel_id,
  chapter_number, language) Supabase row.
- **Per-chapter Reader Personalization** — when you read, the prose dynamically
  injects {{user_location}} via Vercel Edge geolocation + a fallback dictionary
  of city → landmark mappings. Ch 11 ("walk toward the man under the billboard")
  picks the billboard near *you*.
- **Audit Mode** — toggle in the corner reveals every CS metaphor with a
  hover-to-expand plain-language gloss.
- **Reader-as-Instance interaction** — six decision points across the novel,
  each tracked in localStorage. After Ch 20 the page generates a "diagnostic
  receipt" — a shareable PNG showing your % alignment between Singleton (one
  shared soul) and Sandbox (the upload-to-a-private-utopia path) with a
  cyberpunk-terminal aesthetic.
- **DevTools Easter eggs** — open the console and Aion v5 starts logging.
  Try `aion.whisper()` or `aion.partitionLog()`.
- **No villain.** Jeff and his boss Julian are both right. The novel ends in
  unresolved moral ambiguity by design.

Stack: Next.js 16 (Pages Router), React 19, Tailwind v4, Supabase Postgres
with RLS, `next/og` ImageResponse for share cards, no auth (yet — comments
are public-write).

Story bible, master schema, and the per-chapter blueprints are all viewable at
/docs (the universe-spec is open). Comments are open per chapter at the bottom
of every page if you want to leave reading notes — I pull them periodically
into the next revision pass.

Happy to talk about the architecture, the bilingual prose pipeline, the
choice-tracking-via-localStorage trick, or just the writing. AMA.
```

---

## First-comment by author (post within ~30 seconds — Show HN convention)

> The first author comment is critical. It anchors the discussion. Pick whichever is most honest for the moment. Two angles:

**Angle A — engineering depth:**
```
Some details I figured the engineering crowd might appreciate:

- The choice-tracking is fully client-side. The shareable receipt URL encodes
  the 6 choices as a 6-character string in the query string (e.g. "AABABB").
  /api/og/receipt reads that, renders an OG image with next/og, and X picks
  it up via the standard og:image meta tag. No DB write per share.
- The bilingual title-prefix regex took an embarrassing amount of time. Chinese
  numerals (第一章, 第二十章) need different stripping than digits (第1章).
- Audit Mode highlights ~80 CS terms inline. The term dictionary is a static
  file; the highlighter is a single-pass regex that wraps matches in a Hover
  component. Bilingual terms double the work.
- I considered using markdown-to-jsx but ended up writing a ~150-line custom
  renderer to avoid the dep. Worth it.

Curious what you'd want to see exposed via the Audit toggle that isn't there.
```

**Angle B — the writing process:**
```
A few things I learned while building this:

- Writing 40 chapters (EN + 中文) with a coherent technical-vocabulary chain
  means treating the novel like a codebase. There's a story-bible.md, a
  master-schema.md, per-chapter-blueprint.md files, and a cinematic-overlay.md
  that supersedes the others when they disagree. Story canon is reviewed under
  diff like code.
- Real engineering problems force the writing to stay honest. If Ch 5 is
  about "stylometric embeddings," I had to actually understand what that
  meant before Jeff could investigate a forged commit using one. The plot
  tightens against the real research.
- The reader-as-instance metaphor turns the website itself into a prop. The
  DevTools console is in-character, the localStorage namespace is in-character,
  the OG image is a "system log." It's the kind of thing that only works on
  a web platform.

I'd love feedback from anyone who reads more than the first chapter on whether
the reveal in Ch 13 (Aion's mechanistic-interpretability monologue) lands.
```

---

## Posting checklist

- [ ] Submit between **8:00 and 10:00 AM Pacific** on a Tuesday or Wednesday (highest HN traffic, best front-page odds).
- [ ] Verify https://novel-silk-zeta.vercel.app/ loads cold in <2s on a fresh tab.
- [ ] Verify https://novel-silk-zeta.vercel.app/api/og/receipt?c=AABABA renders the PNG.
- [ ] Pre-warm the production cache by hitting /, /1, /20, /docs, /receipt.
- [ ] First author comment ready in clipboard, pasted within 30 seconds.
- [ ] Don't beg for upvotes anywhere. HN punishes that hard.
- [ ] If it lands the front page, *do not edit the post*. Edits reset position.

## After submission

- Reply to **every single comment** in the first 6 hours. HN ranks heavily on engagement.
- Keep replies short and substantive. Quote the comment, address the point.
- If someone finds a bug, fix it and reply with a deploy URL. HN loves that.
- If asked about commercial intent, be straight: this is a personal art project, not a startup.
