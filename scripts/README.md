# Seeding the database

Once-and-done setup to push every blueprint, prose chapter (English + Chinese), story bible, plot review, pacing curve, and other meta-doc into Supabase so the website can render them.

## 1. Run the schema migration

If you haven't already:

```sh
# In Supabase SQL Editor, run in this order:
#   1. supabase-setup.sql           (initial schema + novel/styles seed)
#   2. supabase-update-prose.sql    (adds bilingual chapters, blueprints table, meta_docs table)
```

The migration is idempotent — re-running is safe.

## 2. Set environment variables

The seeder writes through Supabase, which means it needs the **service role key** (not the public anon key — RLS would block writes otherwise).

```sh
export NEXT_PUBLIC_SUPABASE_URL='https://YOUR-PROJECT.supabase.co'
export SUPABASE_SERVICE_ROLE_KEY='eyJhbGc...'   # from Supabase dashboard → Settings → API
```

Do **not** commit the service role key. It can read/write everything in your DB.

## 3. Run the seeder

```sh
npm run seed
# or
node scripts/seed-prose.mjs
```

What it does, top to bottom:

- **EN prose** — reads `prose/chapter-NN.md`, parses out title + body + closing ```cpp``` discovery-log block, upserts into `chapters` (language=`en`).
- **ZH prose** — same for `prose-zh/chapter-NN.md` (language=`zh`).
- **Blueprints** — reads `context/chapters/chapter-NN-blueprint.md`, upserts into `chapter_blueprints`.
- **Meta docs** — reads `context/story-bible.md`, `context/master-schema.md`, `context/plot-review.md`, `context/plot-review-new.md`, `context/pacing-new.md`, `context/original-vision.md`, `context/README.md`, upserts into `meta_docs`.
- **Manifest** — pushes `context/master-schema.md` into `novels.manifest`.

Each upsert keys on its natural unique constraint, so re-running just refreshes content.

## 4. Verify on the site

```sh
npm run dev
```

- `/`                  — homepage with bilingual chapter list, doc cards
- `/<n>`               — chapter prose (EN/中文 toggle in the header)
- `/blueprint/<n>`     — that chapter's blueprint
- `/docs`              — list of all reference docs
- `/docs/<slug>`       — a specific reference doc (story-bible, plot-review, pacing-curve, etc.)

Language preference is remembered in `localStorage`. The chapter page falls back to whichever language exists if the requested one isn't seeded yet.
