import { useEffect, useState } from "react";
import Head from "next/head";
import Layout from "../components/Layout";

const OWNER_KEY_STORAGE = "novel.ownerKey";

export default function OwnerPage() {
  const [hydrated, setHydrated] = useState(false);
  const [hasKey, setHasKey] = useState(false);
  const [keyInput, setKeyInput] = useState("");
  const [testStatus, setTestStatus] = useState(null);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(OWNER_KEY_STORAGE);
      setHasKey(!!saved);
      if (saved) setKeyInput(saved);
    } catch {}
    setHydrated(true);
  }, []);

  async function save() {
    setTesting(true);
    setTestStatus(null);
    const key = keyInput.trim();
    if (!key) {
      setTestStatus({ ok: false, msg: "Enter a key first." });
      setTesting(false);
      return;
    }
    try {
      const r = await fetch(`/api/comments/list?chapter=1`, {
        headers: { Authorization: `Bearer ${key}` },
        cache: "no-store",
      });
      if (r.status === 401) {
        setTestStatus({ ok: false, msg: "Key rejected by server." });
        setTesting(false);
        return;
      }
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        setTestStatus({ ok: false, msg: j.detail || j.error || `Server error ${r.status}` });
        setTesting(false);
        return;
      }
      try {
        localStorage.setItem(OWNER_KEY_STORAGE, key);
      } catch {}
      setHasKey(true);
      setTestStatus({ ok: true, msg: "Key accepted. Comment composers are now visible on every chapter." });
    } catch (e) {
      setTestStatus({ ok: false, msg: e.message });
    } finally {
      setTesting(false);
    }
  }

  function clearKey() {
    try {
      localStorage.removeItem(OWNER_KEY_STORAGE);
    } catch {}
    setHasKey(false);
    setKeyInput("");
    setTestStatus({ ok: true, msg: "Key cleared from this browser." });
  }

  return (
    <>
      <Head>
        <title>Owner — The Singleton</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <Layout>
        <article className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2">
            Owner mode
          </div>
          <h1 className="text-2xl font-semibold text-primary mb-3">
            Set the owner key on this browser
          </h1>
          <p className="text-sm text-secondary mb-8 leading-relaxed">
            The comments system is private. Only this browser, holding a valid
            owner key, can read or post notes on chapters. Paste the key below
            once. It is stored in this browser's localStorage. The key never
            leaves your device except as an Authorization header to the
            comments API.
          </p>

          <div className="rounded-xl border border-border bg-surface-alt/40 p-5 mb-6">
            <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-2">
              Owner key
            </label>
            <input
              type="password"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="paste the 64-char hex key…"
              className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-xs text-primary placeholder:text-muted/60 focus:outline-none focus:border-accent/50 font-mono"
            />
            <div className="mt-3 flex items-center gap-3">
              <button
                onClick={save}
                disabled={!keyInput.trim() || testing}
                className="px-4 py-2 rounded-lg bg-accent/15 border border-accent/40 text-xs font-medium text-accent hover:bg-accent/25 transition-colors disabled:opacity-50"
              >
                {testing ? "Verifying…" : "Verify and save"}
              </button>
              {hasKey && (
                <button
                  onClick={clearKey}
                  className="text-[11px] text-muted hover:text-rose transition-colors"
                >
                  Forget on this browser
                </button>
              )}
            </div>
            {hydrated && testStatus && (
              <p className={`mt-3 text-[11px] ${testStatus.ok ? "text-green" : "text-rose"}`}>
                {testStatus.msg}
              </p>
            )}
            {hydrated && hasKey && !testStatus && (
              <p className="mt-3 text-[11px] text-muted">
                Key already set on this browser. Paste a different one above to replace it.
              </p>
            )}
          </div>

          <div className="text-[11px] text-muted leading-relaxed space-y-2">
            <p>
              <span className="font-semibold text-secondary">What this enables:</span>{" "}
              the &ldquo;Owner notes&rdquo; section at the bottom of every chapter
              page becomes visible. You can save private revision notes per chapter,
              listed in real-time. Run <code className="px-1 py-0.5 rounded bg-surface-alt">npm run comments</code> locally
              any time to pull all notes into a markdown digest.
            </p>
            <p>
              <span className="font-semibold text-secondary">Visitors without the key</span>{" "}
              see no comments section at all. The chapters look complete with the
              prose and the choice prompts where applicable —
              nothing else.
            </p>
            <p>
              <span className="font-semibold text-secondary">If you lose the key:</span>{" "}
              regenerate it from your local <code>.env.local</code>, or rotate by
              setting a new <code>OWNER_KEY</code> in Vercel and redeploying. The
              previous key stops working at the next deploy.
            </p>
          </div>
        </article>
      </Layout>
    </>
  );
}
