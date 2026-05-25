// Reader choice tracking for the diagnostic receipt.
// Six decision points, A = Singleton path, B = Sandbox / Afterlife path.
// Stored as `novel.choices.{ch}` -> "A" | "B" in localStorage.

export const CHOICE_CHAPTERS = [3, 10, 11, 14, 16, 17];

export const CHOICE_PROMPTS = {
  3: {
    question: "The Anchor stares directly at you from the screen. Pause the movie?",
    a: { label: "Pause — analyze the data", path: "Singleton", subtitle: "You broke the simulation to see it." },
    b: { label: "Keep watching — surrender", path: "Sandbox",   subtitle: "You let the render keep rendering." },
  },
  10: {
    question: "Aion offers to run a primary-key audit on your daughters. Run it?",
    a: { label: "Run it — face the truth",     path: "Singleton", subtitle: "You chose the painful row." },
    b: { label: "Don't run it — protect them", path: "Sandbox",   subtitle: "You kept the partition warm." },
  },
  11: {
    question: "The man under the billboard is your face. Walk toward him?",
    a: { label: "Approach — connect",     path: "Singleton", subtitle: "You met the node." },
    b: { label: "Walk away — keep apart", path: "Sandbox",   subtitle: "You held the firewall." },
  },
  14: {
    question: "Julian is across the table. Tell him the full truth?",
    a: { label: "Tell him — broadcast", path: "Singleton", subtitle: "You handed Aion's proof to the boss." },
    b: { label: "Withhold — let it launch", path: "Sandbox", subtitle: "You let Afterlife sail." },
  },
  16: {
    question: "Aion v4 returns: 94.2% confidence, one instance, infinite partitions. Accept?",
    a: { label: "Accept — embrace the One Soul", path: "Singleton", subtitle: "You signed the merge." },
    b: { label: "Reject — demand individuality", path: "Sandbox",   subtitle: "You refused the join." },
  },
  17: {
    question: "The Soul sees the full loop. Restart the cycle, or end it?",
    a: { label: "Restart — embrace shared joy and suffering", path: "Singleton", subtitle: "You pressed compile again." },
    b: { label: "End — halt the simulation",                  path: "Sandbox",   subtitle: "You returned the exit code." },
  },
};

const CHOICES_PREFIX = "novel.choices.";

function isBrowser() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function getChoice(chapter) {
  if (!isBrowser()) return null;
  try {
    return localStorage.getItem(CHOICES_PREFIX + chapter);
  } catch {
    return null;
  }
}

export function setChoice(chapter, value) {
  if (!isBrowser()) return;
  try {
    if (value === "A" || value === "B") {
      localStorage.setItem(CHOICES_PREFIX + chapter, value);
    } else {
      localStorage.removeItem(CHOICES_PREFIX + chapter);
    }
  } catch {}
}

export function clearAllChoices() {
  if (!isBrowser()) return;
  try {
    for (const ch of CHOICE_CHAPTERS) localStorage.removeItem(CHOICES_PREFIX + ch);
  } catch {}
}

export function getAllChoices() {
  const out = {};
  for (const ch of CHOICE_CHAPTERS) out[ch] = getChoice(ch);
  return out;
}

/** Encode the 6 choices as a 6-char string. Missing slots become "_". */
export function encodeChoices(map) {
  return CHOICE_CHAPTERS.map((ch) => {
    const v = map?.[ch];
    return v === "A" || v === "B" ? v : "_";
  }).join("");
}

/** Inverse of encodeChoices. */
export function decodeChoices(code) {
  const out = {};
  if (typeof code !== "string") return out;
  for (let i = 0; i < CHOICE_CHAPTERS.length; i++) {
    const ch = CHOICE_CHAPTERS[i];
    const c = code[i];
    out[ch] = c === "A" || c === "B" ? c : null;
  }
  return out;
}

export function alignment(map) {
  let a = 0, b = 0;
  for (const ch of CHOICE_CHAPTERS) {
    if (map?.[ch] === "A") a++;
    else if (map?.[ch] === "B") b++;
  }
  const total = a + b;
  if (!total) return { singletonPct: 0, sandboxPct: 0, made: 0, total: CHOICE_CHAPTERS.length };
  return {
    singletonPct: Math.round((a / total) * 100),
    sandboxPct: Math.round((b / total) * 100),
    made: total,
    total: CHOICE_CHAPTERS.length,
  };
}

export function alignmentLabel(pct) {
  // pct is singletonPct
  if (pct === 0) return "Pure Sandbox";
  if (pct < 25) return "Sandbox-Aligned";
  if (pct < 50) return "Sandbox-Leaning";
  if (pct === 50) return "Perfectly Split";
  if (pct < 75) return "Singleton-Leaning";
  if (pct < 100) return "Singleton-Aligned";
  return "Pure Singleton";
}
