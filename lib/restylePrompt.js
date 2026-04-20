const THEMES = {
  horror:    "Dark, dread-building, visceral sensory detail. Lean into body horror and creeping unease.",
  chill:     "Calm, meditative, ambient pacing. Warm and contemplative, like a late-night drive.",
  romantic:  "Emotionally warm, relationship-focused, intimate. Foreground tenderness and longing.",
  suspense:  "Tight tension, cliffhanger pacing, paranoia. Short sentences, withheld information.",
  noir:      "Hardboiled narration, moral ambiguity, shadows. First-person-feeling cynicism.",
  cyberpunk: "Neon-lit, tech-heavy slang, street-level grit. Dense sensory overload.",
};

const LENGTHS = {
  short:    "Condense to ~40% of original length. Keep only essential plot beats and key dialogue.",
  standard: "Keep roughly the same length as the original.",
  extended: "Expand to ~160% of original length. Add sensory detail, internal monologue, and atmospheric description.",
};

const STYLES = {
  original:  "Use the author's original voice and prose style.",
  literary:  "Rich prose with metaphor, interior depth, and lyrical sentence structure.",
  concise:   "Stripped-down, punchy sentences — just the essentials. Hemingway-esque.",
  cinematic: "Visual and atmospheric, reads like a screenplay. Heavy on action lines and visual cues.",
};

export function buildRestylePrompt(content, codeFooter, theme, length, style) {
  return `You are restyling a chapter of a techno-existential thriller called "The Senior Observer."

ORIGINAL CHAPTER:
${content}

${codeFooter ? `ORIGINAL CODE FOOTER:\n${codeFooter}\n` : ""}
INSTRUCTIONS:
- Theme: ${theme} — ${THEMES[theme]}
- Length: ${length} — ${LENGTHS[length]}
- Voice: ${style} — ${STYLES[style]}
- Preserve all {{variable}} tokens exactly as-is (e.g. {{user_location}}, {{reader_name}}).
- Preserve the code footer format and technical metaphors.
- Preserve all plot beats and narrative structure. Do not add or remove characters or events.
- Do not include any preamble or explanation.

Return ONLY the restyled chapter text. If there is a code footer, add a line containing exactly "---CODE_FOOTER---" followed by the restyled code footer on the next line.`;
}

export { THEMES, LENGTHS, STYLES };
