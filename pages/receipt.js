import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import {
  CHOICE_CHAPTERS,
  CHOICE_PROMPTS,
  getAllChoices,
  encodeChoices,
  decodeChoices,
  alignment,
  alignmentLabel,
  clearAllChoices,
} from "../lib/choices";

const SITE_BASE = "https://novel-silk-zeta.vercel.app";

export default function ReceiptPage() {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const [choices, setChoices] = useState({});
  const [loc, setLoc] = useState("Earth");
  const [readonly, setReadonly] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    const qCode = typeof router.query.c === "string" ? router.query.c : null;
    const qLoc = typeof router.query.loc === "string" ? router.query.loc : null;

    if (qCode && qCode.length === CHOICE_CHAPTERS.length) {
      // Shared link — show that reader's receipt, not yours
      setChoices(decodeChoices(qCode));
      setReadonly(true);
    } else {
      setChoices(getAllChoices());
      setReadonly(false);
    }

    if (qLoc) {
      setLoc(qLoc);
    } else {
      try {
        const cached = JSON.parse(localStorage.getItem("novel_reader_location") || "null");
        if (cached?.vars?.user_location) setLoc(cached.vars.user_location);
      } catch {}
    }

    setHydrated(true);
  }, [router.isReady, router.query.c, router.query.loc]);

  const code = encodeChoices(choices);
  const align = alignment(choices);
  const label = alignmentLabel(align.singletonPct);
  const ogUrl = hydrated ? `/api/og/receipt?c=${encodeURIComponent(code)}&loc=${encodeURIComponent(loc)}` : null;
  const shareUrl = `${SITE_BASE}/receipt?c=${encodeURIComponent(code)}&loc=${encodeURIComponent(loc)}`;
  const tweetText = `I survived the aion-v5 compilation.\n${align.singletonPct}% Singleton / ${align.sandboxPct}% Sandbox.\n\nWhat's your partition log?`;
  const tweetIntent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(shareUrl)}`;

  function copyShareLink() {
    if (!hydrated) return;
    try {
      navigator.clipboard.writeText(shareUrl);
    } catch {}
  }

  return (
    <>
      <Head>
        <title>Partition Log — The Singleton</title>
        <meta property="og:title" content={`Partition Log — ${align.singletonPct}% Singleton / ${align.sandboxPct}% Sandbox`} />
        <meta property="og:description" content="I survived the aion-v5 compilation. What is your partition log?" />
        <meta property="og:image" content={ogUrl ? `${SITE_BASE}${ogUrl}` : `${SITE_BASE}/api/og/receipt?c=______`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Partition Log — ${align.singletonPct}% Singleton / ${align.sandboxPct}% Sandbox`} />
        <meta name="twitter:image" content={ogUrl ? `${SITE_BASE}${ogUrl}` : `${SITE_BASE}/api/og/receipt?c=______`} />
      </Head>
      <Layout>
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2">
            The Singleton — Diagnostic
          </div>
          <h1 className="text-3xl font-semibold text-primary mb-2">User Partition Log</h1>
          <p className="text-sm text-secondary mb-2">
            Your six choices, replayed by Aion v5. Generated locally in your browser.
            Shareable as an image.
          </p>
          <p className="text-xs text-muted mb-8 italic leading-relaxed">
            Both paths end you-as-this-partition eventually.
            Afterlife extends the runtime indefinitely on borrowed infrastructure.
            Embodied life keeps you in the substrate, but burns out on a clock you can't opt out of.
            Pick the ending you can live with. Under uncertainty, humans pick the path that feels more certain.
            There is no correct answer.
          </p>

          {hydrated && readonly && (
            <div className="mb-8 px-4 py-3 rounded-lg border border-accent/30 bg-accent/5 text-sm text-secondary">
              Viewing a shared partition log. <Link href="/receipt" className="text-accent hover:underline">See your own →</Link>
            </div>
          )}
          {hydrated && !readonly && align.made === 0 && (
            <div className="mb-8 px-4 py-3 rounded-lg border border-border bg-surface-alt text-sm text-muted">
              You haven't made any choices yet. Decision points appear at the end of chapters{" "}
              {CHOICE_CHAPTERS.join(", ")}. <Link href="/" className="text-accent hover:underline">Start reading</Link>.
            </div>
          )}

          {/* Live preview of the OG card */}
          <div className="rounded-xl border border-accent/30 bg-black overflow-hidden mb-6">
            {hydrated ? (
              <img
                src={ogUrl}
                alt="Your diagnostic receipt"
                className="w-full block"
              />
            ) : (
              <div className="aspect-[1200/630] bg-black" />
            )}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <div className="rounded-lg border border-border bg-surface-alt p-4">
              <div className="text-[10px] uppercase tracking-widest text-muted mb-1">Alignment</div>
              <div className="text-lg font-semibold text-primary">{label}</div>
            </div>
            <div className="rounded-lg border border-border bg-surface-alt p-4">
              <div className="text-[10px] uppercase tracking-widest text-muted mb-1">Choices Made</div>
              <div className="text-lg font-semibold text-primary">
                {align.made} <span className="text-muted text-sm">/ {align.total}</span>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-surface-alt p-4">
              <div className="text-[10px] uppercase tracking-widest text-muted mb-1">Code</div>
              <div className="text-lg font-mono text-primary tracking-widest">{code}</div>
            </div>
          </div>

          {/* Per-choice list */}
          <div className="rounded-xl border border-border overflow-hidden mb-8">
            {CHOICE_CHAPTERS.map((ch) => {
              const v = choices[ch];
              const prompt = CHOICE_PROMPTS[ch];
              const picked = v ? prompt[v.toLowerCase()] : null;
              return (
                <div key={ch} className="flex items-start gap-3 px-4 py-3 border-b border-border last:border-b-0">
                  <div className="text-xs text-muted font-mono w-12 shrink-0 pt-0.5">ch {ch}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-primary mb-1">{prompt.question}</div>
                    {picked ? (
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider ${
                            v === "A" ? "bg-accent/20 text-accent" : "bg-rose/20 text-rose"
                          }`}
                        >
                          {picked.path}
                        </span>
                        <span className="text-xs text-secondary italic">{picked.subtitle}</span>
                      </div>
                    ) : readonly ? (
                      <span className="text-[11px] text-muted italic">no choice recorded</span>
                    ) : (
                      <Link href={`/${ch}`} className="text-[11px] text-accent hover:underline">
                        Make this choice in chapter {ch} →
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Share row */}
          <div className="flex flex-wrap gap-3 items-center">
            <a
              href={tweetIntent}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-bg font-medium text-sm hover:opacity-90 transition-opacity"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Share to X
            </a>
            <button
              onClick={copyShareLink}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-secondary hover:text-primary hover:border-accent/40 transition-colors"
            >
              Copy share link
            </button>
            <a
              href={ogUrl || "#"}
              download={`partition-log-${code}.png`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-secondary hover:text-primary hover:border-accent/40 transition-colors"
            >
              Download PNG
            </a>
            {!readonly && align.made > 0 && (
              <button
                onClick={() => {
                  if (confirm("Reset all 6 choices? This can't be undone.")) {
                    clearAllChoices();
                    setChoices({});
                  }
                }}
                className="ml-auto text-[11px] text-muted hover:text-rose transition-colors"
              >
                Reset choices
              </button>
            )}
          </div>

          <div className="mt-12 text-[11px] text-muted leading-relaxed">
            Choices live in your browser only. The diagnostic-receipt URL encodes them in
            the link itself — no account, no server-side record. If you clear localStorage
            or open in a different browser, your log resets.
          </div>
        </article>
      </Layout>
    </>
  );
}
