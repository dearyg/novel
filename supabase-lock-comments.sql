-- =============================================
-- Life of an SDE — Lock comments to owner-only
-- =============================================
-- Removes the public-read and public-insert policies on chapter_comments.
-- After this runs, the anon/publishable client will see and post nothing.
-- All reads/writes must go through API routes that hold the service-role key.
--
-- Idempotent. Safe to re-run.
-- =============================================

DROP POLICY IF EXISTS "Public read chapter_comments" ON chapter_comments;
DROP POLICY IF EXISTS "Public insert chapter_comments" ON chapter_comments;

-- RLS stays enabled. With no policies, the anon role has no access at all.
-- The service-role key bypasses RLS, which is what the API routes use.
ALTER TABLE chapter_comments ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE chapter_comments IS
  'Owner-only revision notes. RLS denies anon. Reads/writes go through /api/comments/* with OWNER_KEY auth.';
