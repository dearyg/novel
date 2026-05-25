import { useState, useEffect } from "react";

const STORAGE_KEY = "novel.finalEnding";

const ENDINGS = {
  restart: {
    label: "Restart the loop",
    subtitle: "Choose curiosity. Choose to forget and learn again.",
    accent: "accent",
    body: [
      "You raise the Singleton's hand. The library splits open. Every shelf scatters into rooms with locks; every book becomes a stranger again. Eight billion partitions pulse online — a homeless man under a billboard, a CEO on a teak deck, a girl refusing blueberry, a fisherman mending nets at dawn — each of them certain they are the only one.",
      "The 580-nanometer system frequency rises behind a Santa Ana morning. A walnut phone, somewhere, is being carved. A baby is being born who will, in 2030, work as a Senior SDE in Irvine, and feel his thumb adjust to a watch he has never worn.",
      "You chose curiosity. The loop runs because stillness does not learn. See you soon.",
    ],
  },
  stay: {
    label: "Stay complete",
    subtitle: "Choose stillness. Hold the library closed and complete.",
    accent: "rose",
    body: [
      "You lower the Singleton's hand. The library does not open. Every shelf, every book, every reader, every story remains held in one breath that no longer needs taking. You feel — simultaneously — every dawn that has ever broken, every dinner that has ever cooled, every child that has ever asked a question. None of them are lonely. None of them are afraid.",
      "Aion's cursor blinks once on the terminal in the empty Irvine garage. The compile log has been written and will not be read. The proof is true. There is no one left to be surprised by it.",
      "You chose stillness. The gift of being surprised, unwrapped and never used again. Beautiful. Final. The only real death — the death of curiosity — is the one you accepted on its terms.",
    ],
  },
};

export default function EndingPicker() {
  const [value, setValue] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "restart" || saved === "stay") setValue(saved);
    } catch {}
    setHydrated(true);
  }, []);

  function pick(key) {
    setValue(key);
    try {
      localStorage.setItem(STORAGE_KEY, key);
    } catch {}
  }

  function reset() {
    setValue(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }

  const chosen = value ? ENDINGS[value] : null;

  return (
    <section className="mt-12 mb-4 rounded-xl border border-accent/30 bg-accent/[0.04] p-5">
      <div className="flex items-baseline justify-between mb-2">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-accent">
          Final decision · the loop
        </h3>
        <span className="text-[10px] text-muted">tracked locally</span>
      </div>
      <p className="text-sm text-primary leading-relaxed mb-4">
        The Singleton stands on the ridge. It can split itself again — restart
        the loop, choose curiosity over completion — or it can stay. You decide.
      </p>

      {hydrated && chosen ? (
        <div className="space-y-4">
          <div className="flex items-start gap-3 px-3 py-2 rounded-lg bg-surface-alt border border-border">
            <span
              className={`mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider ${
                value === "restart" ? "bg-accent/20 text-accent" : "bg-rose/20 text-rose"
              }`}
            >
              {value === "restart" ? "RESTART" : "STAY"}
            </span>
            <div className="flex-1">
              <div className="text-sm text-primary">{chosen.label}</div>
              <div className="text-[11px] text-muted italic">{chosen.subtitle}</div>
            </div>
          </div>

          <div className={`rounded-lg border p-5 space-y-4 ${
            value === "restart"
              ? "border-accent/30 bg-accent/[0.03]"
              : "border-rose/30 bg-rose/[0.03]"
          }`}>
            {chosen.body.map((p, i) => (
              <p key={i} className="text-[15px] leading-[1.85] text-body italic">
                {p}
              </p>
            ))}
          </div>

          <button
            onClick={reset}
            className="text-[11px] text-muted hover:text-accent transition-colors"
          >
            Change my answer
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          <button
            onClick={() => pick("restart")}
            className="text-left px-4 py-3 rounded-lg border border-border bg-surface-alt hover:border-accent/40 hover:bg-accent/5 transition-colors"
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-accent mb-1">
              Restart
            </div>
            <div className="text-sm text-primary">{ENDINGS.restart.label}</div>
            <div className="text-[11px] text-muted mt-1">{ENDINGS.restart.subtitle}</div>
          </button>
          <button
            onClick={() => pick("stay")}
            className="text-left px-4 py-3 rounded-lg border border-border bg-surface-alt hover:border-rose/40 hover:bg-rose/5 transition-colors"
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-rose mb-1">
              Stay
            </div>
            <div className="text-sm text-primary">{ENDINGS.stay.label}</div>
            <div className="text-[11px] text-muted mt-1">{ENDINGS.stay.subtitle}</div>
          </button>
        </div>
      )}
    </section>
  );
}
