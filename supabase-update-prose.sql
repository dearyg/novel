-- =============================================
-- Life of an SDE — Prose Migration (April 2026)
-- =============================================
-- Adds bilingual chapter support, blueprint storage, and meta-docs (story bible,
-- plot review, pacing curve, etc.). Idempotent — safe to re-run.
--
-- Run order:
--   1. supabase-setup.sql (schema + initial novel/styles seed)
--   2. THIS FILE (schema additions)
--   3. node scripts/seed-prose.mjs (uploads markdown content from prose/, prose-zh/, context/)
-- =============================================

-- Title sync
UPDATE novels
   SET title = 'Life of an SDE'
 WHERE slug = 'the-senior-observer';

-- Manifest column on novels for the master-schema doc
ALTER TABLE novels
  ADD COLUMN IF NOT EXISTS manifest text;

-- ---------------------------------------------
-- Bilingual chapters
-- ---------------------------------------------
-- We need two prose copies (en + zh) per chapter_number. Pre-existing rows
-- become 'en' by default. New constraint replaces the old (novel_id, chapter_number)
-- unique key with one that includes language.

ALTER TABLE chapters
  ADD COLUMN IF NOT EXISTS language text NOT NULL DEFAULT 'en';

-- Drop the old constraint if it exists, replace with language-scoped one
DO $$
DECLARE
  old_con text;
BEGIN
  SELECT conname INTO old_con
    FROM pg_constraint
   WHERE conrelid = 'chapters'::regclass
     AND contype = 'u'
     AND pg_get_constraintdef(oid) LIKE '%novel_id%chapter_number%'
     AND pg_get_constraintdef(oid) NOT LIKE '%language%';
  IF old_con IS NOT NULL THEN
    EXECUTE format('ALTER TABLE chapters DROP CONSTRAINT %I', old_con);
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS chapters_novel_ch_lang_idx
  ON chapters (novel_id, chapter_number, language);

CREATE INDEX IF NOT EXISTS chapters_language_idx ON chapters (language);

-- ---------------------------------------------
-- Meta docs (story-bible, plot-review, pacing curve, main-arc, original-vision)
-- ---------------------------------------------
CREATE TABLE IF NOT EXISTS meta_docs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  novel_id uuid NOT NULL REFERENCES novels(id) ON DELETE CASCADE,
  slug text NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  description text,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (novel_id, slug)
);

CREATE INDEX IF NOT EXISTS meta_docs_novel_idx ON meta_docs (novel_id, sort_order);

ALTER TABLE meta_docs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read meta_docs" ON meta_docs;
CREATE POLICY "Public read meta_docs" ON meta_docs FOR SELECT USING (true);

-- ---------------------------------------------
-- Chapter blueprints in their own table (the chapters.blueprint column was a
-- single per-language field; we want one canonical blueprint per chapter, plus
-- the option to reference it from a dedicated /blueprint/[n] route).
-- ---------------------------------------------
CREATE TABLE IF NOT EXISTS chapter_blueprints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  novel_id uuid NOT NULL REFERENCES novels(id) ON DELETE CASCADE,
  chapter_number integer NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (novel_id, chapter_number)
);

CREATE INDEX IF NOT EXISTS chapter_blueprints_novel_idx
  ON chapter_blueprints (novel_id, chapter_number);

ALTER TABLE chapter_blueprints ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read chapter_blueprints" ON chapter_blueprints;
CREATE POLICY "Public read chapter_blueprints" ON chapter_blueprints FOR SELECT USING (true);

-- ---------------------------------------------
-- Convenience view: chapter list grouped by language for sidebars/TOC.
-- ---------------------------------------------
CREATE OR REPLACE VIEW chapter_index AS
  SELECT
    c.novel_id,
    c.chapter_number,
    MAX(CASE WHEN c.language = 'en' THEN c.title END) AS title_en,
    MAX(CASE WHEN c.language = 'zh' THEN c.title END) AS title_zh,
    bool_or(c.language = 'en') AS has_en,
    bool_or(c.language = 'zh') AS has_zh,
    MIN(c.created_at)          AS created_at
  FROM chapters c
 GROUP BY c.novel_id, c.chapter_number;

COMMENT ON TABLE meta_docs IS 'Story bible, plot review, pacing curve, main-arc, etc. — long-form reference docs read from /docs/[slug].';
COMMENT ON TABLE chapter_blueprints IS 'Per-chapter narrative blueprint (beats, pacing, tech-fight spec). Read at /blueprint/[chapter_number].';
COMMENT ON COLUMN chapters.language IS 'BCP-47ish short tag. Currently en or zh.';
