const THEME_IMAGE_STYLES = {
  horror:    "Dark atmospheric horror. Deep shadows, unsettling angles, desaturated with sickly highlights. Dread and isolation.",
  chill:     "Soft ambient lo-fi aesthetic. Warm muted tones, golden hour light, peaceful solitude. Studio Ghibli meets Edward Hopper.",
  romantic:  "Warm intimate lighting. Soft focus, rich warm palette, tender human moments. Romantic realism.",
  suspense:  "High-contrast thriller cinematography. Harsh directional light, deep blacks, paranoid framing. Fincher-esque.",
  noir:      "Classic noir. High contrast black and white with a single accent color. Rain-slicked surfaces, venetian blind shadows.",
  cyberpunk: "Neon-drenched cyberpunk. Electric blues and magentas, rain, holographic overlays, dense urban verticality.",
};

const CHAPTER_SCENES = {
  1: "A man sitting in a sterile corporate conference room, secretly gripping a wooden phone under the table. Fluorescent lights flicker amber. Santa Ana winds visible through tinted windows.",
  2: "A billionaire standing alone on the teak deck of a massive yacht at sunrise on the Mediterranean. A crystal champagne flute catching golden light. Platinum watch on wrist.",
  3: "A split-screen reality: on one side, a plush home theater in warm light; on the other, a freezing rain-soaked street corner beneath a glowing billboard. Both bathed in amber light.",
};

export function buildImagePrompt(chapterNumber, theme) {
  const scene = CHAPTER_SCENES[chapterNumber] || "A mysterious scene from a techno-existential thriller set in 2030.";
  const themeStyle = THEME_IMAGE_STYLES[theme] || "Cinematic, moody, atmospheric.";

  return `A cinematic widescreen scene illustration for a techno-existential thriller novel set in 2030.

SCENE: ${scene}

VISUAL STYLE: ${themeStyle}

RULES:
- Widescreen 16:9 composition
- No text, titles, or lettering anywhere in the image
- Photorealistic with cinematic color grading
- Atmospheric and moody — this is a book illustration, not a movie poster`;
}

export { CHAPTER_SCENES, THEME_IMAGE_STYLES };
