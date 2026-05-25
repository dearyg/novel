# The Singleton — Project Snapshot (2026-05-08)

A complete state-of-the-project file. A future session should be able to pick up cold from this.

---

## 1. Project overview

- **Title:** *The Singleton* (subtitle: *Life of an SDE*)
- **Author byline:** Homer (pseudonym; constant `AUTHOR = "Homer"` in `pages/index.js`)
- **Genre:** Bilingual EN/中文 techno-philosophical thriller, 20 chapters
- **Premise (no spoilers in homepage copy):** Jeff Zhang, a senior software engineer at Meridian Industries in 2030, starts experiencing somatic and sensory bleeds from people he has never met. With the help of his AI assistant Aion, he traces the anomalies through eighteen months of data and an ethics fight over Meridian's flagship Afterlife product.
- **Production URL:** https://www.thesingleton.app
- **Last deploy:** 2026-05-08 (Reading Length feature)
- **Repo location:** `/Users/homer/Documents/novel`
- **Git remote:** none committed in this branch — many uncommitted changes still local. `git status` for current diff.

## 2. Tech stack

- **Framework:** Next.js 16 (Pages Router), React 19, Tailwind v4
- **Hosting:** Vercel (`vercel --prod --yes --force`); production alias `www.thesingleton.app`
- **Database:** Supabase (anon-key reads from frontend, service-role-key writes from `scripts/seed-prose.mjs` and API routes only)
- **Analytics:** Vercel Analytics (`<Analytics />` in `pages/_app.js`)
- **Newsletter:** Supabase `subscribers` table via `/api/subscribe`
- **Buy Me a Coffee:** handle `dearyg`, in header (amber pill) and footer
- **Cover image / OG:** generated via `scripts/build-cover.mjs` + sharp; trimmed 16px on all sides
- **Vertical 9:16 marketing videos:** under `public/videos/chXX.mp4`, played by `ChapterVideo` component with iOS Safari autoplay hardening (muted + playsInline + defaultMuted + programmatic .play() + tap-to-play fallback)
- **Copy protection:** enabled site-wide

## 3. File structure (top-level)

```
novel/
├── AGENTS.md                # @-includes; thin wrapper
├── CLAUDE.md                # @AGENTS.md
├── SESSION_NOTES_2026-05-08.md  # ← this file
├── components/              # React components
├── context/                 # Author-facing meta-docs (story-bible, plot-review, blueprints, etc.)
├── lib/                     # Hooks and Supabase client
├── pages/                   # Next.js Pages Router
├── prose/                   # Standard EN chapters (chapter-NN.md × 20)
├── prose-en-concise/        # Concise EN chapters (~41% of original)
├── prose-en-brief/          # Brief EN chapters (~12%, plot-summary style)
├── prose-zh/                # Standard ZH chapters (chapter-NN.md × 20)
├── public/                  # Static assets, including videos/, cover images, favicons
├── scripts/                 # Seeders and content tools
├── styles/                  # Tailwind globals
├── supabase-*.sql           # Schema files (run in order: setup → update-prose → subscribers)
├── the-singleton-en.txt     # Full novel export EN (~415 KB)
├── the-singleton-zh.txt     # Full novel export ZH (~360 KB)
└── .env.local               # NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (do not commit)
```

## 4. Database schema (Supabase)

Tables actively used:

- **`novels`** — `id`, `slug`, `title`, `manifest` (errors on update, see Known issues), `variables` (JSON for {{user_location}} etc.), `created_at`. Single row at slug `the-senior-observer`.
- **`chapters`** — `id`, `novel_id`, `chapter_number`, `language`, `title`, `content`, `code_footer`, `created_at`. Unique on `(novel_id, chapter_number, language)`. **No CHECK constraint on `language`** — accepts any string. Currently populated with four codes per chapter: `en`, `en-concise`, `en-brief`, `zh`.
- **`chapter_blueprints`** — author-facing notes; NOT seeded (intentionally), files remain in `context/chapters/` for reference.
- **`meta_docs`** — `slug`, `title`, `content`, `description`, `sort_order`. Seeded from `context/` per the docs array in `scripts/seed-prose.mjs`.
- **`chapter_comments`** — RLS-locked, written via `/api/comments/post`.
- **`subscribers`** — `language` column has CHECK `('en','zh')`. Newsletter signups via `/api/subscribe`.
- **`writing_styles`** + **`chapter_styles`** — used by the AI restyle pipeline (currently disabled in UI).

Useful view: **`chapter_index`** — denormalized `(novel_id, chapter_number, title_en, title_zh, has_en, has_zh)` for the homepage TOC. Does NOT track `en-concise`/`en-brief` availability — homepage TOC only flags EN/ZH.

## 5. Reading Length feature (this session)

The user wanted an EN-only "concise" reading mode, then iterated to a **three-tier** config inside Personalize.

### Tiers

| UI Label | DB code | Total chars | % | Style |
|---|---|---|---|---|
| Standard | `en` | 414,558 | 100% | Full prose |
| Concise | `en-concise` | 169,039 | ~41% | Tight cut, key dialogue preserved |
| Brief | `en-brief` | 49,981 | ~12% | Plot summary, no dialogue |

Per-chapter breakdown:

```
ch  standard  concise  brief
01    22725     4860    1206
02    19100     6366    1964
03    16289     6197    1893
04    15580     5546    1826
05    19974     6774    1948
06    17719     6779    2399
07    26871     8554    2032
08    17138     6137    1880
09    25437     9393    2534
10    18880     6037    1884
11    17998     7536    2559
12    18146     9493    2830
13    38555    11802    2400
14    25639    11317    3372
15    16377     7342    2243
16    19003     9841    2680
17    16606     8947    3130
18    31093    14279    3275
19    18449     9389    2576
20    12979     9348    2578
```

### Code touchpoints

- **`lib/supabase.js`**
  - `SUPPORTED_LANGUAGES = [{en, English}, {zh, 中文}]` — drives the language toggle on the chapter page. Concise/Brief intentionally NOT in this array; they are length variants, not languages.
  - `LENGTH_VARIANTS = { standard, concise, brief }` — each maps `{ langCodes: { en, zh } }` to a DB language code. ZH falls back to plain `zh` for both Concise and Brief (no ZH variants generated).

- **`pages/[chapter].js`**
  - `getStaticProps` fetches every variant (deduped union of SUPPORTED_LANGUAGES + all LENGTH_VARIANTS codes), returns `chapterByLang` and `adjByLang` maps.
  - The page resolves the active chapter via `LENGTH_VARIANTS[settings.reading_length].langCodes[language]` with sensible fallbacks. Same logic for adjacent prev/next.
  - `language === "zh"` checks (Chinese formatting class, "第N章" prefix) are unchanged — Concise/Brief still render with EN formatting.

- **`components/ReaderSettings.js`**
  - New `READING_LENGTHS` array with three entries.
  - New "Reading Length" section between Pacing and the disabled "AI Reading Experience" placeholder. Persists via `settings.reading_length` → `localStorage` (key `novel_reader_settings`).
  - Default (undefined) === standard.

- **`scripts/seed-prose.mjs`**
  - Four `seedProse()` calls: `en` from `prose/`, `en-concise` from `prose-en-concise/`, `en-brief` from `prose-en-brief/`, `zh` from `prose-zh/`.
  - Idempotent. Re-run after editing prose. Requires `.env.local` with Supabase keys.
  - Invocation: `node --env-file=$(pwd)/.env.local scripts/seed-prose.mjs`

### Authoring conventions for variants

- Both Concise and Brief preserve closing artifacts verbatim (Discovery Log, Maya's notebook entries, Concierge log, receipt, AP wire, Aion incident report, etc.).
- Both preserve `{{user_location}}` / `{{user_landmark}}` interpolation tokens for reader-locality customization.
- Both preserve `◊ A fork ◊` markers at choice points (chapters 3, 10, 11, 14, 16, 17 — see `CHOICE_CHAPTERS` in `lib/choices.js`).
- Concise: keeps every plot beat and 1–2 iconic dialogue exchanges per scene; cuts narrator interpretation, atmospheric prose, secondary character description.
- Brief: ~10 lines of narrative summary per scene, no dialogue. Reads like a story-bible synopsis.

## 6. Other features built across recent sessions

- **CYOA markers** (`◊ A fork ◊`) at choice chapters (3, 10, 11, 14, 16, 17), driven by `ChoicePrompt` component. Choices saved to `localStorage` under `novel.choices.{ch}`.
- **EndingPicker** on chapter 20 — generates a partition log / receipt based on the six choices made.
- **`/receipt`** page — renders the per-reader receipt; OG image via `/api/og/receipt`.
- **Personalize panel** (`ReaderSettings.js`) — Identity & Location, text vars (Protagonist Name, Reader Name, Landmark, somatic triggers), Genre (Techno-Thriller default, plus Noir/Horror/Hard-Tech), Pacing (Slow Burn / Fast-Paced), **Reading Length** (this session). AI Reading Experience and Scene Illustrations sections are visible but marked "Coming soon."
- **AuditMode toggle** — `AuditHighlighter` highlights audit-mode terms inline on demand.
- **ScrollProgress bar** at top of every chapter page.
- **Chapter videos** — vertical 9:16 marketing clips embedded at the top of each chapter; iOS Safari autoplay hardened.
- **Vercel Analytics + BMC + Newsletter signup + OG meta + favicons** all live.
- **Voice spec** (in `context/story-bible.md`) — grammatical fingerprints for 16 named speakers, applied during the v4 revision pass: Julian (colon mid-thought, semicolons), Maya (no logical connectors), Iris (declaratives only, three turns max), Nora (small flat "no", ≤3 words), Kael (never plain yes/no), etc.
- **Editorial v4 revisions** (prior session) — proof scientific (Marcus's independent replication scene + Aion's pre-registered prediction beat), Aion reversal split between Ch 13 (negative finding only, full confidence) and Ch 17/18 (positive architectural claim deferred), Ch 16 falsification test (78% → 94.2% epistemic journey), Ch 18 vignettes for Sandra/Esther/Priya, Ch 19 Maya pushback ("If you're everyone, you're not specifically mine"), Ch 20 cut "You made 6 choices" coda — ends on Discovery Log.

## 7. Conventions & gotchas

- **Bash sandbox** blocks `.env.local` reads. Workaround: `node --env-file=$(pwd)/.env.local <script>` works fine; also `dangerouslyDisableSandbox: true` on the Bash tool when needed.
- **Vercel CLI** version was 52.0.0 in this session; latest is 53.2.0+. User can `npm i -g vercel@latest`.
- **Aion dialogue convention:** italicized via `*...*` markdown. Both v3 and v4 prose follow this; concise/brief variants follow it too.
- **Translation-ese** has been surgically removed from all 20 ZH chapters (3–5 edits per chapter) in a prior session. Do not re-introduce literal English calques.
- **Bracket-name redundancy** (e.g. `Meridian Industries（Meridian Industries）`) was a recurring bug; check for it after any ZH edit.
- **Stale forecasting paragraphs** (in ZH: `他不知道/她不知道...`) were cut from Ch 5 (Ghost forecast) and Ch 6 ("compile word three chapters later" forecast) in a prior session. Do not re-add.
- **Probability number bloat** was cut: redundant `10^-56` mentions reduced from 4 → 1 (Ch 6 only); duplicate 94.2 paragraph in Ch 16 removed; build-log echoes in Ch 17 trimmed from 5 lines to 2.
- **Family removed from Ch 1** — intentional. Maya / kids appear from Ch 2 onward.
- **Character renames** completed: Lucy → Iris, Ella → Nora, Vance → Meridian, Vacheron → Auberval. Alayido company branding removed everywhere.
- **The `manifest` column update in `seed-prose.mjs` errors** — column not present in current schema. Harmless; ignore. Could be cleaned up by either dropping `seedManifest()` or adding the column.
- **Reading Length toggle** is shown to ZH readers but is a no-op for them (both Concise and Brief fall back to `zh`). Could be hidden when `language === "zh"` if desired.

## 8. How to do common tasks

### Edit a chapter at a single tier
1. Edit `prose/chapter-NN.md` (or `prose-zh/`, `prose-en-concise/`, `prose-en-brief/`).
2. Re-seed: `node --env-file=$(pwd)/.env.local scripts/seed-prose.mjs`
3. Vercel ISR picks it up via `revalidate: 60` in `getStaticProps`. For instant: `vercel --prod --yes --force`.

### Add a new length variant (e.g. "Extended")
1. Add to `LENGTH_VARIANTS` in `lib/supabase.js`: `extended: { langCodes: { en: "en-extended", zh: "zh" } }`.
2. Add to `READING_LENGTHS` in `components/ReaderSettings.js`.
3. Add a `seedProse(novelId, "en-extended", "prose-en-extended")` call in `scripts/seed-prose.mjs` and update the summary print.
4. Create `prose-en-extended/chapter-NN.md` files.
5. Re-seed. `next build`. `vercel --prod --yes --force`.

### Add a ZH variant for Concise/Brief
1. Update `LENGTH_VARIANTS.concise.langCodes.zh = "zh-concise"` (etc.).
2. Create `prose-zh-concise/`, `prose-zh-brief/` with translations.
3. Add seeder calls.
4. Re-seed and deploy.

### Re-export the full novel as plain text
- Existing exports: `the-singleton-en.txt` (415 KB), `the-singleton-zh.txt` (360 KB).
- Re-export by concatenating `prose/chapter-*.md` (or `prose-zh/`) in order. No script in repo for this — typically done ad-hoc.

### Generate concise chapters at a different ratio
- Authoring is manual (LLM-assisted in-conversation) — there is no automated concise generator. The current Concise (~41%) and Brief (~12%) versions were written by hand from the Standard prose.

### Deploy
1. `npx next build` (verify green).
2. `vercel --prod --yes --force`.
3. Production alias `www.thesingleton.app` updates automatically.

### Run dev server
- `npm run dev` (or `bun dev`). Reads from `.env.local`. Hot reload on prose markdown changes requires re-seed (DB is the source of truth, not the markdown files at runtime).

## 9. Open items / suggestions for next session

- Consider committing the new `prose-en-concise/` and `prose-en-brief/` directories to git (currently uncommitted along with several other modified files).
- Hide the Reading Length toggle for ZH-selected readers, OR add ZH variants.
- Drop or fix `seedManifest()` in `scripts/seed-prose.mjs` (currently logs a harmless schema-cache error).
- Surface Concise/Brief availability in the homepage chapter index if the user wants readers to discover the feature without opening Personalize.
- Consider a "Reading Length" badge or hint near the language toggle so users notice the Personalize option.
- The chapter-page meta description in `pages/_document.js` is already non-spoiler — no change needed.
