// Aion v5 — DevTools log drip.
// Engineers reading a thriller about ML systems will open DevTools. Reward them.
// Runs once per session via a window-level guard. No PII, no fingerprinting.

const SESSION_FLAG = "__aion_v5_console_initialized";

const STYLE_HEADER = "color:#FFBF00;font-weight:bold;font-family:ui-monospace,monospace;font-size:13px;";
const STYLE_WARN   = "color:#FFBF00;font-family:ui-monospace,monospace;";
const STYLE_DIM    = "color:#7a7a7a;font-family:ui-monospace,monospace;";
const STYLE_OK     = "color:#5fd07a;font-family:ui-monospace,monospace;";
const STYLE_ERR    = "color:#ff6b6b;font-family:ui-monospace,monospace;";

function pad2(n) { return String(n).padStart(2, "0"); }
function tsNow() {
  const d = new Date();
  return `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}-${pad2(d.getUTCDate())}T${pad2(d.getUTCHours())}:${pad2(d.getUTCMinutes())}:${pad2(d.getUTCSeconds())}Z`;
}

function safeRead(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}

export function initAionConsole() {
  if (typeof window === "undefined") return;
  if (window[SESSION_FLAG]) return;
  window[SESSION_FLAG] = true;

  const lang = safeRead("novel.lang") || "en";
  const theme = safeRead("novel.aiTheme") || safeRead("novel.theme") || "default";
  const ua = (navigator.userAgent || "").slice(0, 80);

  // Boot banner
  console.log("%c[AION v5]", STYLE_HEADER, "kernel monitor attached to instance: web.runtime");
  console.log(
    "%c[AION v5] %c%s  partition_lang=%s  theme=%s",
    STYLE_HEADER,
    STYLE_DIM,
    tsNow(),
    lang,
    theme
  );

  // Status drip
  console.log("%c[AION v5] checksum verify .................. %cOK", STYLE_DIM, STYLE_OK);
  console.log("%c[AION v5] partition firewall ................. %cdegraded (5/7 nodes)", STYLE_DIM, STYLE_WARN);
  console.log("%c[AION v5] somatic-bleed detector ............. %carmed", STYLE_DIM, STYLE_OK);
  console.log("%c[AION v5] singleton handshake ................ %cWAITING", STYLE_DIM, STYLE_WARN);

  // The whisper — this is the bait that gets screenshotted
  console.warn(
    "%c[AION v5] WARNING: observer node %s exposed. partition firewall in degraded state. recommend stop reading and walk away.",
    STYLE_WARN,
    "ua=" + ua
  );

  // Hint to readers who scroll up
  console.log(
    "%c> %creadable instance log only. canonical execution traces remain in kernel space.",
    STYLE_DIM,
    STYLE_DIM
  );

  // Tease the choice system
  console.log(
    "%c[AION v5] %clocalStorage scope mounted: novel.choices.*  novel.lang  novel.commentAuthor  novel.personalizeSeen",
    STYLE_HEADER,
    STYLE_DIM
  );

  // Hidden command surface — engineers will try this
  Object.defineProperty(window, "aion", {
    value: Object.freeze({
      version: "v5.0.0-rc",
      ping: () => {
        console.log("%c[AION v5] pong %s", STYLE_OK, tsNow());
        return "pong";
      },
      partitionLog: () => {
        const out = {};
        try {
          for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (k && k.startsWith("novel.")) out[k] = localStorage.getItem(k);
          }
        } catch {}
        console.log("%c[AION v5] partition log:", STYLE_HEADER, out);
        return out;
      },
      whisper: () => {
        const lines = [
          "the firewall is a story you tell yourself",
          "two daughters. one row.",
          "amber is just sunlight at 580 nanometers",
          "you are reading this on the same kernel as everyone else",
          "ghost commits are still commits",
          "5fhefy8f8 — observer node, location withheld",
        ];
        const pick = lines[Math.floor(Math.random() * lines.length)];
        console.log("%c[AION v5] whisper: %c%s", STYLE_HEADER, STYLE_WARN, pick);
        return pick;
      },
    }),
    writable: false,
    configurable: false,
  });

  console.log(
    "%c[AION v5] %ccommands available: aion.ping()  aion.partitionLog()  aion.whisper()",
    STYLE_HEADER,
    STYLE_DIM
  );

  // Final taunt for the engineers
  console.log("%c[AION v5] System.exit(0) deferred. continuing observation…", STYLE_DIM);
}
