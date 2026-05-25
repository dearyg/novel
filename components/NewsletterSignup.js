import { useState } from "react";

export default function NewsletterSignup({ source = "homepage" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | ok | err
  const [message, setMessage] = useState("");

  async function submit(e) {
    e.preventDefault();
    if (status === "loading") return;
    const trimmed = email.trim();
    if (!trimmed) {
      setStatus("err");
      setMessage("Enter an email address.");
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      const lang =
        typeof window !== "undefined"
          ? window.localStorage.getItem("novel.lang") || "en"
          : "en";
      const r = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, language: lang, source }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) {
        setStatus("err");
        setMessage(
          j.error === "bad_email"
            ? "That email looks invalid."
            : j.error === "subscribers_table_missing"
              ? "Newsletter not yet wired (run supabase-subscribers.sql)."
              : "Something went wrong. Try again later."
        );
        return;
      }
      setStatus("ok");
      setMessage("You're on the list. New chapters land in your inbox.");
      setEmail("");
    } catch {
      setStatus("err");
      setMessage("Network error. Try again.");
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 md:p-7">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-9 h-9 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </div>
        <div>
          <h3 className="text-base font-semibold text-primary text-glitch">
            Get revisions by email
          </h3>
          <p className="text-sm text-secondary mt-1 leading-relaxed">
            The novel is finished — twenty chapters — but it keeps evolving.
            Each AI-revised version of a chapter, sent quietly to your inbox.
            No spam, unsubscribe anytime.
          </p>
        </div>
      </div>
      <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@somewhere.com"
          required
          disabled={status === "loading" || status === "ok"}
          className="flex-1 px-4 py-2.5 rounded-lg bg-surface-alt border border-border text-sm text-primary placeholder:text-muted/60 focus:outline-none focus:border-accent/50 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "ok"}
          className="px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent-hover transition-colors disabled:opacity-50"
        >
          {status === "loading" ? "Subscribing…" : status === "ok" ? "Subscribed" : "Subscribe"}
        </button>
      </form>
      {message && (
        <p className={`mt-3 text-[12px] ${status === "ok" ? "text-green" : "text-rose"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
