# Session Index

Persistent notes from Claude Code working sessions. Newest first.

## 2026-07-02 — Editorial voice-arc pass + planning-gap audit & restoration

**Log:** [`2026-07-02-session-log.md`](./2026-07-02-session-log.md)

Two prose arcs (spanned 06-26 → 07-02), both propagated EN → zh → Supabase:
- **A. Editorial voice/clarity pass** (from author's inline Chinese notes): AI-dialogue voice **arc 3→2→1**, teach-the-tech glosses, bleeds-near-machines, be-direct thesis, the **Anchor good/evil-is-empty through-line** (ch03 restructured). All 20 chapters.
- **B. Planning-vs-novel gap audit** (32-agent workflow vs the original concept chat) + restoration of 9 dropped threads: **Julian's finitude-bug thesis** (ch02/06), post-AI-labor debate (ch11), religion payoff (ch09), **hybrid ending** (ch20), + Tier-2 (ch08/16/13/01).

Touched (all **uncommitted** on `main`):
- `prose/chapter-01…20.md` (20 EN) + `prose-zh/chapter-01…20.md` (20 zh) — 40 files, +554/−230
- New: [`../revisions/editorial-pass-voice-and-clarity.md`](../revisions/editorial-pass-voice-and-clarity.md), [`../revisions/planning-vs-novel-gap-report.md`](../revisions/planning-vs-novel-gap-report.md), [`../revisions/gap-fix-spec.md`](../revisions/gap-fix-spec.md)

Supabase: re-seeded (all langs). Known: `novels.manifest` column missing → non-blocking seed error.

Open items:
- Commit the work (branch off `main` first) — deferred by author
- Decide if `prose-en-concise/` + `prose-en-brief/` need the same restorations
- Optional: patch `seed-prose.mjs` for the missing manifest column; optional full "reveal-to-world" ending

---

## 2026-06-02 — Personalize + QA + Ch 1 audit + video pipeline

**Log:** [`2026-06-02-session-log.md`](./2026-06-02-session-log.md)

Touched:
- `components/ReaderSettings.js` (Personalize panel reorder + "Coming soon" gating)
- `public/robots.txt` (new)
- `public/sitemap.xml` (new, 24 URLs)

Produced (other locations):
- [`chapters/chapter-01-audit-2026-06-02.md`](../chapters/chapter-01-audit-2026-06-02.md) — Ch 1 literary audit with apply-ready patches
- [`production/ai-short-film-pipeline.md`](../production/ai-short-film-pipeline.md) — pipeline notes for adapting chapters to 60–90s cinematic shorts
- [`content-quality-tools-eval.md`](../content-quality-tools-eval.md) — which external content-quality tools are worth it

Deployed:
- Personalize v1: https://novel-sdz1orbwl-dearygs-projects.vercel.app
- Personalize reordered: https://novel-6as7xzddu-dearygs-projects.vercel.app
- SEO files (robots + sitemap): https://novel-bxwvggyjm-dearygs-projects.vercel.app

Open items:
- Apply Ch 1 audit fixes 1–4 to `prose/chapter-01.md` (pending author authorization)
- Draft Q/K/V pedagogy exchange (fix #5) for author review
- Decide on Ch 3 Sync 15-second shot list for video pipeline
- CLI upgrade: `npm i -g vercel@latest` (was 52.0.0; latest 53.2.0)

---

## 2026-05-08 — Reading length variants + EN/中 toggle

**Log:** [`../../SESSION_NOTES_2026-05-08.md`](../../SESSION_NOTES_2026-05-08.md) (in repo root)
