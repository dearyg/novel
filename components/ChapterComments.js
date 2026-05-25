import { useState, useEffect } from "react";

const OWNER_KEY_STORAGE = "novel.ownerKey";

function timeAgo(iso) {
  const d = new Date(iso);
  const sec = Math.floor((Date.now() - d.getTime()) / 1000);
  if (sec < 60) return `${sec}s ago`;
  if (sec < 3600) return `${Math.floor(sec / 60)}m ago`;
  if (sec < 86400) return `${Math.floor(sec / 3600)}h ago`;
  if (sec < 86400 * 7) return `${Math.floor(sec / 86400)}d ago`;
  return d.toLocaleDateString();
}

function readOwnerKey() {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem(OWNER_KEY_STORAGE) || "";
  } catch {
    return "";
  }
}

export default function ChapterComments({ chapterNumber, language }) {
  const [hydrated, setHydrated] = useState(false);
  const [ownerKey, setOwnerKey] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setOwnerKey(readOwnerKey());
    try {
      const saved = localStorage.getItem("novel.commentAuthor");
      if (saved) setAuthor(saved);
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || !ownerKey) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(`/api/comments/list?chapter=${chapterNumber}`, {
      headers: { Authorization: `Bearer ${ownerKey}` },
      cache: "no-store",
    })
      .then((r) => r.json().then((j) => ({ ok: r.ok, status: r.status, j })))
      .then(({ ok, status, j }) => {
        if (cancelled) return;
        if (!ok) {
          if (status === 401) {
            setError("Owner key rejected. Re-enter on /owner.");
            setOwnerKey("");
            try { localStorage.removeItem(OWNER_KEY_STORAGE); } catch {}
          } else {
            setError(j?.detail || j?.error || "Failed to load comments");
          }
          setComments([]);
        } else {
          setComments(j.comments || []);
        }
      })
      .catch((e) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [hydrated, ownerKey, chapterNumber]);

  // Hide entirely from non-owners.
  if (!hydrated || !ownerKey) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!body.trim() || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const r = await fetch("/api/comments/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ownerKey}`,
        },
        body: JSON.stringify({
          chapter_number: chapterNumber,
          language,
          body,
          author,
        }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j?.detail || j?.error || "Failed to post");
      setComments((prev) => [j.comment, ...prev]);
      setBody("");
      try {
        if (author.trim()) localStorage.setItem("novel.commentAuthor", author.trim());
      } catch {}
    } catch (err) {
      setError(err.message || "Failed to post");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mt-16 pt-8 border-t border-border" id="comments">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-xs font-bold text-muted uppercase tracking-widest">
          Owner notes {comments.length > 0 ? `(${comments.length})` : ""}
        </h2>
        <span className="text-[10px] text-muted">
          ch {chapterNumber} · {language} · private
        </span>
      </div>

      <form onSubmit={handleSubmit} className="mb-8 space-y-3">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={3}
          maxLength={4000}
          placeholder="Revision note for yourself — typo, pacing nit, missing beat, or just a reaction…"
          className="w-full px-3 py-2 rounded-lg bg-surface-alt border border-border text-sm text-primary placeholder:text-muted/60 focus:outline-none focus:border-accent/50 transition-colors resize-y"
        />
        <div className="flex flex-wrap gap-2 items-center justify-between">
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            maxLength={80}
            placeholder="Tag (optional)"
            className="px-3 py-1.5 rounded-lg bg-surface-alt border border-border text-xs text-primary placeholder:text-muted/60 focus:outline-none focus:border-accent/50 transition-colors"
          />
          <div className="flex items-center gap-3">
            {error && <span className="text-[11px] text-rose">{error}</span>}
            <span className="text-[10px] text-muted">{body.length}/4000</span>
            <button
              type="submit"
              disabled={!body.trim() || submitting}
              className="px-4 py-1.5 rounded-lg bg-accent/10 border border-accent/40 text-xs font-medium text-accent hover:bg-accent/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {submitting ? "Saving…" : "Save note"}
            </button>
          </div>
        </div>
      </form>

      {loading ? (
        <p className="text-xs text-muted">Loading notes…</p>
      ) : comments.length === 0 ? (
        <p className="text-xs text-muted italic">No notes on this chapter yet.</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((c) => (
            <li
              key={c.id}
              className="rounded-lg border border-border bg-surface-alt/40 px-4 py-3"
            >
              <div className="flex items-baseline justify-between gap-3 mb-1">
                <span className="text-xs font-medium text-primary">
                  {c.author || "—"}
                </span>
                <span className="text-[10px] text-muted">
                  {timeAgo(c.created_at)} · {c.language}
                  {c.status && c.status !== "open" ? ` · ${c.status}` : ""}
                </span>
              </div>
              <p className="text-sm text-body whitespace-pre-wrap leading-relaxed">
                {c.body}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
