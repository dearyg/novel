import { useState, useEffect } from "react";
import Link from "next/link";
import { CHOICE_PROMPTS, getChoice, setChoice } from "../lib/choices";

export default function ChoicePrompt({ chapterNumber }) {
  const prompt = CHOICE_PROMPTS[chapterNumber];
  const [value, setValue] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setValue(getChoice(chapterNumber));
    setHydrated(true);
  }, [chapterNumber]);

  if (!prompt) return null;

  function pick(v) {
    setChoice(chapterNumber, v);
    setValue(v);
  }

  function reset() {
    setChoice(chapterNumber, null);
    setValue(null);
  }

  return (
    <section className="mt-12 mb-4 rounded-xl border border-accent/30 bg-accent/[0.04] p-5">
      <div className="flex items-baseline justify-between mb-2">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-accent">
          Decision · ch {chapterNumber}
        </h3>
        <span className="text-[10px] text-muted">tracked locally</span>
      </div>
      <p className="text-sm text-primary leading-relaxed mb-4">{prompt.question}</p>

      {hydrated && value ? (
        <div className="space-y-3">
          <div className="flex items-start gap-3 px-3 py-2 rounded-lg bg-surface-alt border border-border">
            <span
              className={`mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider ${
                value === "A" ? "bg-accent/20 text-accent" : "bg-rose/20 text-rose"
              }`}
            >
              {prompt[value.toLowerCase()].path}
            </span>
            <div className="flex-1">
              <div className="text-sm text-primary">{prompt[value.toLowerCase()].label}</div>
              <div className="text-[11px] text-muted italic">{prompt[value.toLowerCase()].subtitle}</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={reset}
              className="text-[11px] text-muted hover:text-accent transition-colors"
            >
              Change my answer
            </button>
            <Link
              href="/receipt"
              className="text-[11px] text-accent hover:underline"
            >
              View receipt →
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          <button
            onClick={() => pick("A")}
            className="text-left px-4 py-3 rounded-lg border border-border bg-surface-alt hover:border-accent/40 hover:bg-accent/5 transition-colors"
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-accent mb-1">
              {prompt.a.path}
            </div>
            <div className="text-sm text-primary">{prompt.a.label}</div>
          </button>
          <button
            onClick={() => pick("B")}
            className="text-left px-4 py-3 rounded-lg border border-border bg-surface-alt hover:border-rose/40 hover:bg-rose/5 transition-colors"
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-rose mb-1">
              {prompt.b.path}
            </div>
            <div className="text-sm text-primary">{prompt.b.label}</div>
          </button>
        </div>
      )}
    </section>
  );
}
