const THEME_IMAGE_STYLES = {
  horror:    "Dark atmospheric horror. Deep shadows, unsettling angles, desaturated with sickly highlights. Dread and isolation.",
  chill:     "Soft ambient lo-fi aesthetic. Warm muted tones, golden hour light, peaceful solitude. Studio Ghibli meets Edward Hopper.",
  romantic:  "Warm intimate lighting. Soft focus, rich warm palette, tender human moments. Romantic realism.",
  suspense:  "High-contrast thriller cinematography. Harsh directional light, deep blacks, paranoid framing. Fincher-esque.",
  noir:      "Classic noir. High contrast black and white with a single accent color. Rain-slicked surfaces, venetian blind shadows.",
  cyberpunk: "Neon-drenched cyberpunk. Electric blues and magentas, rain, holographic overlays, dense urban verticality.",
};

const CHAPTER_SCENES = {
  1:  "A senior software engineer in his mid-thirties sitting in a sterile glass-walled SoCal conference room, secretly gripping a polished wooden phone under the table. Fluorescent lights flicker amber. Santa Ana winds bend palm trees outside tinted windows. The Pacific is a thin gray line on the horizon.",
  2:  "A billionaire alone on the teak deck of a massive yacht at sunrise on the Mediterranean. A crystal champagne flute catches golden light against his platinum watch. Behind him, a satellite uplink dish hums faintly.",
  3:  "A split-frame composition: on the left, a plush home theater with warm amber lighting and a single occupant; on the right, the same figure standing on a rain-soaked Mid-Wilshire street corner beneath a glowing pharmaceutical billboard. Their reflections almost overlap in the seam.",
  4:  "Twin sunrises stacked like rendered layers — one over the Pacific off Newport Beach, one over Lake Michigan in Chicago — both bathing the same man's silhouette as he stands at a kitchen window holding a child. The horizons don't quite line up.",
  5:  "A late-night developer hunched over a laptop in a darkened study. The terminal shows `git log --author=jeff.zhang` with a commit he doesn't remember writing, dated three years ago. Blue monitor light only — every other surface in shadow.",
  6:  "Close-up of a wrist with the second hand of a clinical pulse oximeter ticking. The same wrist appears twice in mirrored framing — one in hospital fluorescent light, one in candlelit warmth — joined by a single luminous ECG waveform threading between them.",
  7:  "A SCIF-style secure room: matte-black walls, badge-locked door slightly ajar. On a wall of monitors, one window shows a red telemetry dot drifting outside the firewall perimeter. A man in a security analyst's headset watches it without moving.",
  8:  "An emergency broadcast text overrides every screen in a packed Anaheim food court — phones, menu boards, the giant LED above the bar. Dozens of faces look up in unison. The text on every screen is identical and impossible to read at this distance.",
  9:  "Failed retail bays at Irvine Spectrum after hours, glass storefronts dark except for one — converted into a candlelit commune. Salvaged display mannequins arranged like icons. A small group sits cross-legged on the polished floor while a faded Apple logo glows in the next bay over.",
  10: "A glassy biometric security gate at a Bel Air estate. The screen reads in pale blue serif: `WELCOME, JULIAN VANCE`. A bewildered SDE in a hoodie stands in front of it. Jacaranda petals scatter on the driveway behind him.",
  11: "Two identical Spanish-revival apartments rendered in mirrored composition, separated by a thin vertical seam. Same furniture, same light, same woman at the same kitchen counter — but one apartment is in Pasadena, one in Shanghai's French Concession. The seam shimmers slightly.",
  12: "Three figures arranged in a tight triangle of monitor light — Jeff, Marcus, Lena — each lit by a different colored screen (amber, green, magenta). Their code reflects across all three faces, interlocking, none of them aware the other two are debugging the same trace.",
  13: "A black server rack in a cold aisle of a data center. A single line of glowing text on its faceplate reads `AION` — but one character has just flipped, mirror-reversed. Behind the rack, a faint reflection of a man's face overlays the chassis.",
  14: "A ring of curved monitors in a darkened room, each showing a different camera angle of the same person at the same kitchen table. At the center of the ring, one terminal cursor blinks `OBSERVING…`. The viewer's chair is empty.",
  15: "Disneyland Anaheim and Shanghai Disneyland castles rendered as mirrored silhouettes against a single sky. Crowds in both parks stand frozen mid-motion. A spilled churro cone in the foreground. The fireworks have stopped halfway up.",
  16: "A long corridor that perspective-warps into a vanishing point. Multiple translucent figures of the same man, slightly out of phase, walk toward the camera and converge into a single silhouette at the threshold of a doorway flooded with white light.",
  17: "A teak yacht deck at dawn, déjà vu of an earlier scene — but now the man at the railing is the SDE, not the billionaire. The crystal flute is empty. The Mediterranean horizon shimmers with a faint regular pixel grid that shouldn't be there.",
  18: "A figure standing in fog on a Newport Beach pier at first light, dissolving from the feet upward into pale phosphor pixels that drift into the marine layer. The pier planks behind him are still solid; only he is fragmenting.",
  19: "A child's bedroom at night, low warm lamp on a nightstand. A father sits on the edge of the bed mid-sentence, his daughter half-asleep clutching a stuffed otter. On the wall, a faint shadow of the man stretches taller than it should — and waves.",
  20: "A pristine empty data center aisle, every server light extinguished except one — a single red LED at the far end of the row. The polished concrete floor reflects the LED into a long thin line stretching toward the camera. No people, no sound.",
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
