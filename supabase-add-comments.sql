-- =============================================
-- Life of an SDE — Comments table (April 2026)
-- =============================================
-- Per-chapter reader comments. Anyone can read and post (no auth yet).
-- Idempotent — safe to re-run.
--
-- Run AFTER:
--   1. supabase-setup.sql
--   2. supabase-update-prose.sql
-- =============================================

CREATE TABLE IF NOT EXISTS chapter_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  novel_id uuid NOT NULL REFERENCES novels(id) ON DELETE CASCADE,
  chapter_number integer NOT NULL,
  language text NOT NULL DEFAULT 'en',
  body text NOT NULL CHECK (length(body) > 0 AND length(body) <= 4000),
  paragraph_index integer,        -- optional: which paragraph the comment refers to (0-indexed)
  selection_text text,            -- optional: the text the reader had selected
  author text,                    -- optional: free-form name/handle
  status text NOT NULL DEFAULT 'open',  -- open | addressed | wontfix | archived
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS chapter_comments_novel_chapter_idx
  ON chapter_comments (novel_id, chapter_number, created_at DESC);

CREATE INDEX IF NOT EXISTS chapter_comments_status_idx
  ON chapter_comments (status);

ALTER TABLE chapter_comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read chapter_comments" ON chapter_comments;
CREATE POLICY "Public read chapter_comments"
  ON chapter_comments FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public insert chapter_comments" ON chapter_comments;
CREATE POLICY "Public insert chapter_comments"
  ON chapter_comments FOR INSERT WITH CHECK (
    length(body) > 0
    AND length(body) <= 4000
    AND (author IS NULL OR length(author) <= 80)
    AND status = 'open'
  );

COMMENT ON TABLE chapter_comments IS
  'Per-chapter reader comments. Public read + public insert. Status used by the author to mark addressed/wontfix during revision.';
