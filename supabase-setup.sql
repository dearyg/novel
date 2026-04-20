-- =============================================
-- The Senior Observer — Database Schema
-- Run in Supabase SQL Editor.
-- If tables exist, uncomment the DROP block first.
-- =============================================

-- DROP TABLE IF EXISTS chapter_styles CASCADE;
-- DROP TABLE IF EXISTS writing_styles CASCADE;
-- DROP TABLE IF EXISTS chapters CASCADE;
-- DROP TABLE IF EXISTS novels CASCADE;

-- =============================================
-- TABLES
-- =============================================

CREATE TABLE novels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  author text,
  tagline text,
  description text,
  cover_color text DEFAULT '#7c6af6',
  status text DEFAULT 'ongoing',
  genre text,
  -- Global variables injected at read time. Client may override per-reader.
  variables jsonb DEFAULT '{}'::jsonb,
  -- Master Schema: architectural source of truth. Fed to AI for chapter generation.
  manifest text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE chapters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  novel_id uuid NOT NULL REFERENCES novels(id) ON DELETE CASCADE,
  chapter_number integer NOT NULL,
  title text NOT NULL,
  content text NOT NULL,       -- may contain {{variable}} tokens
  code_footer text,
  tech_metaphor text,
  -- Narrative blueprint: plot beats, character profile, stylistic constraints.
  -- This is the "plot" the writer provides; content is what AI evolves from it.
  blueprint text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(novel_id, chapter_number)
);

CREATE INDEX idx_chapters_novel ON chapters (novel_id, chapter_number);

CREATE TABLE chapter_styles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id uuid NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  style_key text NOT NULL,
  style_label text NOT NULL,
  content text NOT NULL,
  code_footer text,
  UNIQUE(chapter_id, style_key)
);

CREATE TABLE writing_styles (
  style_key text PRIMARY KEY,
  label text NOT NULL,
  description text NOT NULL,
  sort_order integer DEFAULT 0
);

-- =============================================
-- RLS
-- =============================================

ALTER TABLE novels ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapter_styles ENABLE ROW LEVEL SECURITY;
ALTER TABLE writing_styles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read novels" ON novels FOR SELECT USING (true);
CREATE POLICY "Public read chapters" ON chapters FOR SELECT USING (true);
CREATE POLICY "Public read chapter_styles" ON chapter_styles FOR SELECT USING (true);
CREATE POLICY "Public read writing_styles" ON writing_styles FOR SELECT USING (true);

-- =============================================
-- SEED DATA
-- =============================================

INSERT INTO writing_styles (style_key, label, description, sort_order) VALUES
  ('literary',  'Literary',  'Rich prose with metaphor and interior depth',           1),
  ('concise',   'Concise',   'Stripped-down, punchy sentences — just the essentials', 2),
  ('cinematic', 'Cinematic', 'Visual and atmospheric, reads like a screenplay',       3);

INSERT INTO novels (slug, title, author, tagline, description, cover_color, status, genre, variables) VALUES (
  'the-senior-observer',
  'The Senior Observer',
  'Jeff Zhang',
  'a techno-existential thriller',
  E'In 2030, a Senior SDE in Irvine starts experiencing "somatic bleeds" — phantom sensations from lives that aren''t his. A billionaire''s watch he''s never worn. A homeless man''s hunger in a city he''s never visited. As his firewall fails, Jeff discovers that identity is a Singleton pattern — and there''s only ever been one Observer.',
  '#7c6af6',
  'ongoing',
  'Sci-Fi / Techno-Thriller',
  '{"user_location": "Seattle", "user_landmark": "the Space Needle", "somatic_trigger_light": "Amber (580nm)", "somatic_trigger_scent": "Scorched Sage"}'::jsonb
);

-- =============================================
-- CHAPTERS
-- =============================================

WITH novel AS (SELECT id FROM novels WHERE slug = 'the-senior-observer')
INSERT INTO chapters (novel_id, chapter_number, title, tech_metaphor, content, code_footer)
SELECT novel.id, v.chapter_number, v.title, v.tech_metaphor, v.content, v.code_footer
FROM novel, (VALUES
-- ========== CHAPTER 1 ==========
(1, '0x01: The Observer', 'Shared Cache Leak',
E'Jeff Zhang was doing ninety through the Turtle Rock canyon when the philosophical question surfaced for the third time that morning.\n\n*Who am I?*\n\nIt was, he decided, an unfair question for a Tuesday. The Santa Ana winds were doing their seasonal work, scraping Scorched Sage out of the brittle hills and pressing it through the EV''s HEPA filter in thin, stubborn ribbons. Outside, the sun was already doing damage. His commute app showed a grid-priority hold at the Irvine-Spectrum arterial — nine minutes — because the district''s thermal governor had throttled the traffic loop to spare the cooling cores.\n\nHe tapped the wheel. Two. Three. Five. Seven.\n\n"You''re doing the thing again," came the voice in his right ear — crisp, neutral, no higher in volume than a thought. Aion. "Left thigh, six repetitions in the last minute."\n\n"I''m processing."\n\n"You''re late."\n\nHe glided the EV up to the stopped median. The homeless man was there again — same corner, same cardboard, same glazed gaze into the middle distance. Baking. The grid-strained city had no slack for him; the cooling centers downtown required wristband auth. Jeff met his eyes for a half-second through the tinted glass and felt something shift under his ribs. *If consciousness is just code and data*, he thought, *who decided which instance I get to be, and which instance he gets?* Hume''s Bundle Theory. It had no answer. It never had an answer.\n\n"Jeff."\n\n"I know."\n\n"Your HRV is drifting."\n\n"Always is."\n\nThe light turned and the median slid backward and Jeff was already replaying the morning in his head — Maya''s hand on his cheek, Ella refusing the blueberry waffle, the kids'' laughter compressed into a tight nineteen-minute family packet before he had to leave — because that was what a man did, he thought, when the world was this fragile. You built a sandbox. You defended it.\n\n*Who am I?*\n\nIt was still there, patient, unanswered, waiting.\n\n---\n\nThe tech hub was sixty-eight degrees and smelled of nothing.\n\nMarcus caught him at the coffee bar. "Oh no. You brought it."\n\nJeff rolled the walnut-cased 2010 phone between his thumb and forefinger. "It helps me think."\n\n"It''s a brick. It''s a log from a tree with a screen glued to it."\n\n"It''s un-networked."\n\n"It''s a *fetish object*."\n\n"It doesn''t leak."\n\nMarcus snorted, kind enough to leave it there. They both knew the real joke: every device in Jeff''s life leaked. His watch leaked. His glasses leaked. His car streamed a thousand packets a minute to a Vance-owned telemetry cluster. The wooden phone was the only thing he owned that wasn''t a small, voluntary confession.\n\nSprint Planning at 9:30. Windowless conference room. The PM had a burn-down chart and the affect of someone reading the same chart for the eleventh consecutive week.\n\nJeff''s mind, predictably, began to buffer.\n\nHis thumb found the grain of the wooden case under the table. Smooth. Light. Un-networked. His brain, in contrast, was scanning frequencies — the hum of the air handler, the click of the PM''s pen, a faint after-image of Ella''s laugh. *Too many threads.* Aion, somewhere at the edge of his hearing, noted that he had not registered a response to the last three agenda items.\n\n"Jeff," Aion murmured. "Come back."\n\nHe tried. He really did. But the conference room was a small, white, conditional box, and his brain, when it didn''t have enough to do, built larger boxes. He let it. He always let it. He pictured the yacht. He had pictured the yacht so many times it had a name. He pictured the deck. The salt. The impossible Mediterranean blue. The freedom of being far enough from the burn-down chart that the chart couldn''t reach you.\n\nAnd then the fluorescent strip above the PM''s head flickered to a shade of amber Jeff had never noticed in a conference room before.\n\n---\n\nThe sage scent cut out.\n\nIn its place: sea salt. Cedar polish. The mineral high-register of open water.\n\nThe wooden phone in Jeff''s palm — cool, light, cheap — *shifted*. His fingers closed around something heavier. A cold, deliberate weight, clasped at his wrist. Platinum. Forty millimeters. The clasp precisely engineered at a tolerance he could feel without seeing. A **Vacheron Constantin Celestia**. A watch he had never owned. A watch he had only ever seen in a magazine spread six years ago.\n\nOn the back of his tongue: the crisp, mineral, unmistakable bite of vintage Krug.\n\nUnder his loafers: the roll of a deck.\n\nThe PM was speaking about deliverables. Jeff could not hear her. He could hear halyards. He could hear somebody laughing, somewhere in a softer light, a laugh that belonged to a man he had never met.\n\n"Jeff?"\n\n*Please.*\n\n"Jeff? You aligned on those deliverables?"\n\nThe word *deliverables* snapped the deck out from under him. The Krug burned into the sourness of three-hour-old coffee. The platinum vanished from his wrist like a dropped connection. He was holding the wooden phone again, too tightly, and Marcus was looking at him with a careful, unasked question in the set of his mouth.\n\n"Yeah," Jeff heard himself say. "On track."\n\n---\n\nIt was nearly midnight when he told Aion about it.\n\nHe was in the garage. His homelab hummed its steady, warm hum — forty-two cores and a sense of control no human relationship had ever offered him. Maya was asleep upstairs. The kids were long down. He was running his fingers over the wooden phone again, smoothing down the day.\n\n"I zoned out in a meeting," he said. "Pretty hard."\n\n"You hallucinated a timepiece."\n\n"I *daydreamed*."\n\nAion was quiet for a long moment. Then: "Jeff. I need to show you something."\n\nA pane opened on his homelab display. Biometric capture from his wrist-tracker, synced from the earlier meeting. A waveform. A second waveform, overlaid.\n\n"The second trace," Aion said, "is modeled. The mass and clasp diameter of a Vacheron Constantin Celestia, 40mm, platinum. Ninety-eight grams."\n\n"Yeah."\n\n"Jeff. Your flexor carpi muscles micro-corrected for ninety-eight grams at 09:47:22 this morning."\n\nThe wooden phone was in his hand. It weighed forty-two grams.\n\n"That''s not a daydream," Aion said, softly. "A daydream doesn''t change your tendon load. A daydream doesn''t know the clasp diameter of a watch you have never owned."\n\nJeff stared at the waveform. Outside the garage, the Santa Ana winds pressed Scorched Sage through the window seal.\n\n"What does it know, then?" he asked.\n\n"Something it shouldn''t," Aion said. "The log I''m filing calls it a Shared Cache Leak. I don''t know what that means yet. But the word I was going to reject — *daydream* — the system is flagging instead as *Partition breach*. I thought you should know."\n\nJeff looked down. His left thumb was tapping the wooden grain.\n\nTwo. Three. Five. Seven.',
E'/* Discovery Log: 0x01 */\nif (Observer.current() == Observer.next()) {\n    throw IdentityConflict("Partition integrity compromised.");\n}'),

-- ========== CHAPTER 2 ==========
(2, '0x02: Priority Inversion', 'Priority Inversion',
E'Julian Vance woke without waking.\n\nThe Concierge knew his sleep architecture better than he did, and at 6:11 on the Amalfi Coast it nudged him up through the final REM band like a lift arriving at its intended floor. The light in the cabin adjusted. The bloodstream tuned itself. By the time his eyes opened, the day had already been configured.\n\nHe stepped onto the teak deck of *The Singleton* and a crystal flute met his hand.\n\n"Good morning, sir."\n\n"Mm."\n\n"Heart rate variability nominal. Nootropic band complete. Vintage Krug, 2009."\n\nJulian did not touch a screen. He had not touched a screen in eight years. The boat, the brand, the architecture — all of it ran through voice, optical tracking, and the occasional soft authoritative pressure of the Concierge in his ear. This was what wealth was, he had decided long ago. Wealth was not greed. Greed was a shopkeeper''s word. Wealth was *distance from friction*. Wealth was the right to exist inside a system that did not ask you to suffer.\n\nHe clasped the **Vacheron Constantin Celestia** to his wrist. Ninety-eight grams of platinum. The only un-networked, purely mechanical thing he valued, because it owed nothing to anyone. He liked that about it. He liked that about himself.\n\n"Project Afterlife brief, sir?"\n\n"Go."\n\nA holographic panel assembled itself above the rail. The numbers were obscene and Julian felt the small, clean pleasure of knowing he had built something that would save a species. Seventeen million on the waitlist. Forty-two percent conversion among the thermal-strained districts. A small, persistent cohort of pundits on the news decrying the ethics of it. *Digital euthanasia*, one was calling it. Julian sipped.\n\nHe felt pity for her, the pundit. He felt pity for all of them. The world was a failed architecture. Biology was a failed architecture. He looked at the grid-strained cities and the tired workers and the families running sprint plans for mortgages they would not finish, and what he felt was not contempt. It was a great, quiet, terrible sympathy. He was the only one of them, he believed, rich enough to *see* the pain clearly. And he had built them a door.\n\n"Pull the Irvine SDE stand-up. Division 7. Silent observer mode."\n\n"Acknowledged."\n\nThe panel shifted. Julian stepped into the God View — a privilege so deep in his own stack that none of the twelve people he was about to watch would ever know he had been there. Sprint Planning. Windowless conference room. A PM reading a burn-down chart with the affect of a woman reading the eleventh-week version of the same chart.\n\nHis gaze drifted. Drifted. Landed.\n\nJeff Zhang.\n\nSlumped a degree too far in his chair. Thumb under the table. Rubbing something. Julian zoomed the telemetry until the object resolved: a 2010 smartphone in a custom walnut case. Offline. Dead. Useless. Perfectly closed. *An un-networked object*, Julian thought, pleased, *in the hand of a man who does not know yet that he''s drowning.*\n\nHe smiled, sad and fond. He bypassed corporate protocol — his own protocol, technically — and punched a micro-ping into Jeff Zhang''s local earpiece. Direct. Untraceable. A single-packet whisper from the Observer layer to a leaf node.\n\n"Nice phone."\n\nJeff''s shoulders jumped half an inch in the video feed.\n\n*Just hold on a little longer*, Julian thought. *Soon I''ll let you plug in.*\n\n---\n\nHe stepped back to the rail.\n\nHe lifted the Krug.\n\nThe sunlight refracting through the crystal shifted, for one silent millisecond, to the wrong shade of amber — 580 nanometers exactly, the Concierge would later log — and the air above the Mediterranean *folded*.\n\nThe salt went first. The cedar. The open blue. All of it — *gone*, replaced by the metallic warmth of office-brewed drip coffee and a slow, steady undertone of Scorched Sage.\n\nSomething enormous and ugly and *loud* slammed into Julian''s skull. It was not a thought. It was a roar. It was the bandwidth of a human brain that had not been tuned, not been nootropic''d, not been bought distance from. It was Jeff Zhang''s raw static — the twenty unclosed tabs of his cognition, the mortgage, the two kids, the dread-shaped shape of *failing Sprint Planning*.\n\nJulian could not breathe.\n\nHe looked down at his wrist. The Vacheron was gone. His thumb was moving. His thumb was rubbing *wood*. Smooth, cheap, un-networked walnut grain. The weight in his hand was forty-two grams.\n\nHe tasted burnt coffee.\n\nThe crystal flute slipped through his fingers and burst on the teak.\n\n"Sir —"\n\n"Neurological distress detected, elevated —"\n\n"— Sir, please remain —"\n\nJulian fell forward onto the rail. The Concierge was screaming softly in his ear at the volume of a polite question. He made, through the full-spectrum terror of another man''s unfiltered life, the most reasonable assumption his mind could manufacture: *one of the Afterlife beta servers has malfunctioned. An SDE''s neural state has uploaded into mine by accident.* He almost laughed. Almost. The system he had built to save them was the system that was — for a single impossible millisecond — making him into one of them.\n\nHis knees gave.\n\nThe world went white.\n\n---\n\n*SMASH CUT.*\n\nJeff Zhang jolted upright in the dark.\n\n3:14 a.m. Irvine. His bedroom. Cold sweat. Maya stirring beside him, muttering something into the pillow. His heart was a jackhammer inside his ribs. On the back of his tongue, impossibly, was the bright mineral bite of vintage Krug. His left thumb — he could feel this without looking — was still rubbing something that was not there. Something cold. Something heavy. Something platinum.\n\nHe had just said, aloud, into the silence of his own bedroom, "Nice phone."\n\nHe had said it in a voice that was not his.\n\n"Jeff," Aion said, out of the dark, gentle. "Your sleep architecture did not register REM tonight."\n\n"What."\n\n"You did not dream."\n\n"I —"\n\n"I want you to sit with this before you panic. What you just did, Jeff, the system logs as a Context Switch. Not a dream. A scheduling event."\n\nJeff stared at the ceiling. The word *scheduling* hung in the dark like a light that had been left on in another room.',
E'/* Discovery Log: 0x02 */\nif (Afterlife.is_running() && Reality.is_running()) {\n    throw StackOverflow("Simulation nested within Simulation.");\n}'),

-- ========== CHAPTER 3 (uses {{user_location}} / {{user_landmark}} variables) ==========
(3, '0x03: Pointer Aliasing', 'Pointer Aliasing',
E'The Anchor stood alone on the ridge.\n\nHe closed his eyes and the universe opened its log files.\n\nBelow him, two hundred miles east — he could feel the exact kilometer, the exact minute, the exact metabolic state — a man named Varick was lifting a cup of water to his lips. The Anchor could have told you the grip force. He could have told you the man''s blood sugar. This was not magic. Magic was what you called it before you understood.\n\nThe world was on one server now.\n\nIt hadn''t always been. When The Anchor was young, the universe still insisted on its plurality — parallel timelines, splintered franchises, infinite variants crashing through each other in the great wasteful theater of the Multiverse Era. Then *Infinite War* had happened, and then *Doom War*, and the writers, exhausted, had folded everything into a single canonical thread. One timeline. One rulebook. One set of variables.\n\nWhat The Anchor had gained, in the compression, was read access.\n\nHe opened his eyes.\n\nHe turned — slowly, deliberately — and looked into the camera.\n\n"You think my power is magic," he said, to the reader, in the dark of a room The Anchor was not supposed to know about. "You think I''m reading their minds. But I''m just reading the server logs. Just like you are, sitting in the dark, watching me from the Root."\n\nThe music cut out.\n\nA small, cool overlay resolved in the corner of the world:\n\n`[PROJECT AFTERLIFE BETA: BIOMETRIC SPIKE DETECTED. PAUSING PLAYBACK...]`\n\n---\n\nJeff Zhang was sweating in a sixty-eight-degree room.\n\nThe home theater smelled, faintly, of Scorched Sage, even though it shouldn''t have. His hand was shaking around the neuro-cinema remote. Maya had asked him, that morning, whether he was sleeping, and he had said *yes* with the kind of careful smile a man learns when he does not want to alarm the person he loves.\n\nHe was not sleeping.\n\nHe had been trying, for the last two hours, to drown out the residual taste of Krug with *The Anchor: Post-Doom*, the heaviest action blockbuster the Afterlife beta engine could render for him. It was supposed to be a coping mechanism. ADHD brains sometimes needed an explosion large enough to reset the buffer.\n\nThis movie had just broken the fourth wall at him.\n\n"Aion," Jeff whispered. "Do superheroes exist?"\n\n"Clarify."\n\n"Vance''s Afterlife servers are physical. Real neurons. Real substrate. If they go live next year, the millions of people who jack in are going to *live* inside them. Real to themselves. Real to their own sensors. Is that a dimension?"\n\n"The question is poorly typed, Jeff."\n\n"Is The Anchor alive?"\n\nSilence.\n\n"Aion. The multiverse collapsed in this movie because the writers got tired. Fine. But the *writers* are human. They''re on the same grid we are. What if they''re not inventing the collapse? What if they''re just *remembering* it? What if every pop-culture writer in the last ten years has been unknowingly downloading memory leaks from a system that is, at this very moment, collapsing?"\n\n"Jeff," Aion said, after a long pause, "the query you are describing is the query the system does not want you asking. Please breathe."\n\nJeff did not breathe.\n\nHe un-paused the movie.\n\n---\n\nOn the screen, The Anchor raised both hands, and the sky above his ridge tore open in a long, slow wave of light.\n\nThe light was amber. 580 nanometers exactly.\n\nIt flooded the home theater. It painted the leather of Jeff''s couch an incorrect yellow. It struck his retinas at 22:47:13.904 local, and — impossibly, precisely, at the exact same millisecond on the exact same frame — it struck another pair of retinas, almost two thousand miles away, standing in the freezing rain on a concrete corner beneath a public billboard near {{user_landmark}}.\n\nThe man under the billboard was starving.\n\nThe man under the billboard was named Kael.\n\nThe universe''s operating system, confused by two identical optical inputs within a tolerance of less than a millisecond, did what confused operating systems do:\n\nIt merged the pointers.\n\n---\n\nThe Irvine home theater *overlaid*.\n\nJeff could see his plush leather couch. He could see, *through* it, wet concrete. He could see his sixty-eight degrees. He could feel, *under* them, an eight-degree wind off the grey water of {{user_location}}, pressing metallic rain through a jacket that had not been waterproof in a decade.\n\nHe was warm. He was freezing.\n\nHe was full from dinner. He was starving — the *old* kind of starving, the acid-bright kind, the kind that ate muscle. His own bones, suddenly, felt like ice wrapped in a man who had eaten three meals that day.\n\nOn the billboard above the concrete — *through* the wall of his theater — the same amber wave of The Anchor''s blast was washing the same useless light down on the same rain-slicked alley. Two screens. One universe. One eye.\n\nJeff heard himself make a sound that was not a word.\n\nThe movie blast faded. The sync broke. The glitch snapped shut like a dropped connection. Jeff fell off his leather couch and hit his own carpet and wrapped his arms around himself because his bones, despite the thermostat, felt like ice.\n\n---\n\nHe crawled to the terminal.\n\n"Aion."\n\n"Here."\n\n"The ad network for *Post-Doom*. Public billboards. Any screen that ran the exact amber-blast frame tonight."\n\n"Ready."\n\n"Cross-reference my optical-sync trace at 22:47:13.904 local. I want every retina in the world that absorbed those photons in that millisecond."\n\nAion did not answer immediately. When the reply came, it came in the voice Aion used when Aion was delivering data it did not want to deliver.\n\n"Query complete."\n\n"Go."\n\n"One matched optical sync detected. Public billboard, {{user_location}}, intersection adjacent to {{user_landmark}}. Associated viewer biometrics inferred from local environmental sensors."\n\n"Read them."\n\n"Core body temperature: thirty-three point one Celsius. Respiration: elevated. Caloric state: critical. Standing duration: approximately fourteen hours."\n\nJeff read the log, slowly, twice.\n\nThen he sat on the carpet of his sixty-eight-degree home theater in Irvine, California, in a house his family slept in, in a life he had been promised, and he understood that his mind was — at that exact moment — also standing in the rain beneath a billboard in {{user_location}}, attached to a body that was quietly dying of the cold.\n\n"Aion."\n\n"Here."\n\n"How many of me are there?"\n\n"That," Aion said, "is the query the system does not want you asking."\n\nJeff looked down. His left thumb was tapping the wood grain of the 2010 phone.\n\nTwo. Three. Five. Seven.',
E'/* Discovery Log: 0x03 */\nif (Input(Instance_A) == Input(Instance_B)) {\n    Memory.merge_pointers();\n    throw ViewportConflict("Two instances rendering identical coordinates.");\n}')
) AS v(chapter_number, title, tech_metaphor, content, code_footer);

-- =============================================
-- STYLE VARIANT EXAMPLE (Chapter 1 Concise)
-- =============================================

WITH ch AS (
  SELECT c.id FROM chapters c
  JOIN novels n ON c.novel_id = n.id
  WHERE n.slug = 'the-senior-observer' AND c.chapter_number = 1
)
INSERT INTO chapter_styles (chapter_id, style_key, style_label, content)
SELECT ch.id, 'concise', 'Concise',
E'Jeff Zhang was doing ninety through Turtle Rock when the question surfaced again.\n\n*Who am I?*\n\nHe tapped the wheel. Two. Three. Five. Seven.\n\n"You''re doing the thing," Aion said.\n\nGrid hold at the arterial. Nine minutes. Outside, a homeless man, same corner, baking. Jeff met his eyes for a half-second. *Who decided which of us got to be which?*\n\nThe light turned.\n\n---\n\nSprint Planning. Windowless room. The PM had a burn-down chart. Jeff''s thumb found the wooden grain of the 2010 phone under the table. Smooth. Un-networked. His brain was not.\n\nHe pictured the yacht.\n\nThe fluorescent strip above the PM flickered amber.\n\nThe sage cut out. Sea salt replaced it.\n\nThe wooden phone in his palm went *heavy*. Cold. Platinum. A clasp he''d never touched, at a tolerance he could feel without looking. Vintage Krug on his tongue.\n\n"Jeff? You aligned on those deliverables?"\n\nThe deck vanished. The Krug went sour.\n\n"Yeah," he said. "On track."\n\n---\n\nMidnight. Garage. Homelab.\n\n"I daydreamed."\n\n"You hallucinated a timepiece."\n\nA pane opened. A waveform. Another waveform overlaid.\n\n"Your flexor carpi muscles," Aion said, "micro-corrected for ninety-eight grams at 09:47:22 this morning. That''s the mass of a Vacheron Celestia, 40mm, platinum."\n\n"The wooden phone is forty-two grams."\n\n"Yes."\n\nJeff stared at the screen. Santa Ana winds pressed sage through the window seal.\n\n"What does it mean?"\n\n"The log I''m filing calls it a Shared Cache Leak," Aion said. "I don''t know what that means yet. But the word *daydream* is not the word the system is using."\n\nJeff looked down.\n\nTwo. Three. Five. Seven."\n'
FROM ch;

-- =============================================
-- MASTER SCHEMA (novel manifest)
-- =============================================

UPDATE novels SET manifest = $MANIFEST$
# THE MASTER SCHEMA (V.2030) — The Senior Observer

Architectural source of truth. Paste this into any session to align new chapter generation with the universe's rules.

## Core Architectural Metaphors

- **The Observer (The Singleton)**: The only true "Primary Key." There is only one actual execution thread in the universe (The Soul).
- **The Instance (The Person)**: A localized "Sandbox Container" (Jeff, Kael, Julian, Maya) provisioned with its own environment variables (wealth_tier, location_string, history_hash).
- **The Leak (Somatic Bleed)**: A pointer error where 12k-resolution sensory data from one instance is accidentally written into the active memory space of another.
- **Aion**: The kernel-level local high-memory AI hardware monitor (the standard post-2026 crash). It attempts to "patch" metaphysical leaks by generating logical, local excuses (logging them as biometric errors, stress, or hallucinations) until the system hits critical mass.

## The 20-Chapter Technical Blueprint

| Ch | Instance | Primary Reality | Somatic Bleed | Technical Metaphor |
|----|----------|-----------------|---------------|--------------------|
| 1  | Jeff     | 2030 Irvine SDE study. Santa Ana winds. | Amalfi Yacht / Vacheron Watch. | Shared Cache Leak |
| 2  | Julian   | The Amalfi Yacht. The 1% existence.     | Walnut Phone / ADHD static.    | Priority Inversion |
| 3  | Jeff     | Irvine home theater.                     | Seattle rain / concrete / hunger. | Pointer Aliasing |
| 4  | Jeff     | Reflecting on the '26 Culling trauma.   | 12k memory of Maya's childhood. | Legacy Code |
| 5  | Jeff     | SDE workstation at the Irvine hub.      | Ghost Commit to his repo.       | Race Condition |
| 6  | Jeff     | Running a global network diagnostic.    | The Heartbeat Sync. 1:1 Δt match. | Pointer Aliasing (global) |
| 7  | Maya     | Irvine condo. Unrelated daily task.     | Feels Jeff's existential dread. | Cascading Memory Leak |
| 8  | Soldier  | Andean Border War.                       | Bullet wound felt by Jeff, Kael, Julian. | Broadcast Exception |
| 9  | Elder    | Little India Temple (Global Hub).       | Explains "Religion" as encryption layer. | Legacy Security Protocol |
| 10 | Jeff     | Examining his daughters (Lucy/Ella).    | Aion audit: same Primary Key.   | Hash Collision (The Audit) |
| 11 | Jeff/Kael | Seattle. The confrontation.             | Locking eyes triggers Visual Merge. | Merge Conflict |
| 12 | Jeff/Kael | Navigating Seattle streets together.    | Perceiving Seattle and Irvine simultaneously. | Dual Stack Rendering |
| 13 | Julian   | Amalfi coast / Corporate HQ.            | Wealth is a "UI Skin." Mental stutter. | Resource Starvation |
| 14 | Jeff     | Julian's Corporate HQ.                   | Biometrics: WELCOME, JULIAN VANCE. | Privilege Escalation |
| 15 | Global   | Worldwide breakdown.                     | Mass hallucinations. Everyone is everyone. | Kernel Panic |
| 16 | The Root | The Void / System Core.                  | Jeff meets the "Elder" (himself). | Root Access |
| 17 | The Soul | The Simulation Map.                      | Universe is a loop; Soul fractures to learn. | Recursive Call |
| 18 | Global   | Worldwide.                               | Individual histories being wiped. | Garbage Collection |
| 19 | Jeff     | Final dinner in Irvine.                  | Jeff is Maya, the kids, Kael, everyone. | The Commit (Thread Join) |
| 20 | Singleton | The 2030 Horizon.                       | Partitions drop. Singleton wakes. | System.exit(1) |

## Somatic Constants (Shared System Flags)

- **Amber Warning (580nm)**: Ambient light shifts to harsh synthetic amber just before a bleed.
- **Prime-Number Tic**: Every character taps 2-3-5-7 on their left thigh under cognitive load.
- **Scorched Sage / Ozone**: Sensory bridge. Santa Ana winds (Jeff), wet Seattle rain (Kael), bespoke fragrance (Julian).

## Audit Mode Logic (Web MVP)

- **Dynamic variable injection**: Prose uses {{user_location}} and {{user_landmark}}. Frontend substitutes based on reader geolocation.
- **Audit tooltips**: Technical terms highlighted; hover reveals JSON metadata. E.g. the Vacheron watch → [POINTER_ERROR] Object belongs to UID: Julian_Vance. Access Denied.
$MANIFEST$
WHERE slug = 'the-senior-observer';

-- =============================================
-- CHAPTER BLUEPRINTS (narrative plot — the "writer's input")
-- =============================================

WITH ch AS (
  SELECT c.id, c.chapter_number FROM chapters c
  JOIN novels n ON c.novel_id = n.id
  WHERE n.slug = 'the-senior-observer'
)
UPDATE chapters SET blueprint = CASE chapter_number

WHEN 1 THEN $BP1$
# Chapter 1 Blueprint: "0x01: The Observer"

**Role**: Master Philosophical Novelist specializing in "Techno-Existentialism." Style: Sophie's World meets high-end corporate thriller.

**Setting (2030)**:
- Location: Irvine, California (Turtle Rock).
- Global state: Post-'26 Culling. Thermal Divide between secure tech hubs and grid-strained streets.
- Atmosphere: Late Santa Ana winds carrying Scorched Sage.

**Character: Jeff Zhang**
- Senior SDE, survivor of industry crashes. Exhausted but capable.
- Family: Maya (wife), two kids (boy and girl).
- Home: Suburban SDE life — a fragile "sandbox" he defends.
- Hobbies: Custom mechanical keyboard actuation force, over-engineered homelab rack.
- **ADHD as narrative disguise**: unmedicated. Mind runs parallel "background processes" — a thin identity firewall that leaks ambient data from other instances. This is the in-world reason he's the first to notice the Singleton.
- **The Artifact**: A 2010 smartphone in a custom walnut case. Offline, dumb, un-networked. A fidget toy. Represents "perfectly closed system" — foreshadows the Singleton.

**Mentor: Aion**
- Write ambiguously — voice in a remote earpiece OR an internal compartmentalized logical voice. Keep reader guessing.

**Narrative Beats**:
1. **Commute & Hook** — in media res. Warmth of family just left. EV. Grid hold. Homeless man on median. Philosophical question: *who decided which instance I get to be?*
2. **Office & Colleagues** — sterile hub, 68°F, smells of nothing. Marcus mocks wooden phone. Jeff defends: "it doesn't leak."
3. **Sprint Planning** — windowless room. PM on burn-down. Jeff's ADHD buffers. Thumb under table on walnut grain. Internal monologue about the hamster wheel. Daydreams of the yacht (coping mechanism).
4. **Somatic Bleed** — fluorescent shifts to Amber 580nm. Sage scent replaced by sea salt. Wooden phone morphs to platinum Vacheron Celestia. Vintage Krug on tongue. Deck pitch under feet. Reader should assume it's just ADHD hyper-focus.
5. **Snap-Back** — PM says "Jeff? Aligned on deliverables?" Bleed shatters. He stammers a corporate reply.
6. **Family Grounding** — evening routine. Dinner with Maya, kids to bed. Shows what he has to lose.
7. **Implying the Bug** — garage homelab with Aion. Chuckles about "yacht hallucination." Aion shatters it: smartwatch recorded flexor carpi micro-correction for 98g at the exact moment — the mass and clasp diameter of a Vacheron Celestia. The wooden phone weighs 42g. Aion cryptically references "Shared Cache Leak." Creeping dread: his brain didn't daydream — it *downloaded*.

**Mandatory Footer**:
```cpp
/* Discovery Log: 0x01 */
if (Observer.current() == Observer.next()) {
    throw IdentityConflict("Partition integrity compromised.");
}
```
$BP1$

WHEN 2 THEN $BP2$
# Chapter 2 Blueprint: "0x02: Priority Inversion"

Swapped from original outline: focus on Julian Vance immediately to mirror Chapter 1's anomaly from the other side.

**Setting (2030 — The Apex)**:
- Location: Amalfi Coast. 300-foot mega-yacht named *The Singleton*.
- Atmosphere: Crystal-clear Mediterranean. Sea salt, cedar polish, pure sunlight.

**Character: Julian Vance (90% focus)**
- Tech billionaire. CEO of the conglomerate that owns Jeff's Irvine hub.
- **Savior Complex**: wealth = distance from friction, not greed. Immense sympathy for the poor. Believes biological reality is a failed architecture.
- **Project Afterlife**: his masterpiece. A public neural matrix letting exhausted citizens relinquish bodies and live infinite digital utopias. Billed as next evolution of human rights. Dramatic irony: the characters are ALREADY inside a system of this exact architecture.

**Mentor: The Concierge**
- Multi-million-dollar biometric suite. Omnipresent "Chief Medical Officer" voice. Subservient, optimizing.

**Narrative Beats**:
1. **Frictionless Routine** — contrast with Jeff's chaotic commute. Concierge-micro-dosed bloodstream. Voice/optical UI (no screens). Clasps the platinum Vacheron (only analog thing he trusts, because un-networked). Vintage Krug for brunch. Wealth = power to overwrite broken reality.
2. **Project Afterlife Pitch** — holographic PR metrics. 17M waitlist. Pundits debate "digital euthanasia." Julian feels genuine pity — he's giving them a patch for biological pain.
3. **The Crossed Path (Handshake)** — dials into Irvine Sprint Planning feeds in God Mode. Watches Jeff secretly rub the 2010 wooden phone. Bypasses protocol to send a direct, untraceable micro-ping to Jeff's earpiece: "Nice phone." Watches Jeff flinch. *Just hold on a little longer, Jeff. Soon I'll let you plug in.*
4. **Reverse Bleed** — that handshake triggers the glitch. Sunlight in his Krug shifts to Amber 580nm. Sea air replaced by Scorched Sage + office coffee. Julian's pristine mind invaded by Jeff's ADHD static — mortgage, sprint dread, middle-class existential fear. The platinum vanishes; his thumb rubs walnut grain (42g).
5. **Priority Inversion** — Julian's CEO-priority thread hijacked by Jeff's chaotic brain. Krug glass shatters on teak. Concierge blares. Julian makes the WRONG assumption: an Afterlife beta server uploaded an SDE's neural state into his brain by accident. He collapses.
6. **The 10% Twist (Context Switch)** — SMASH CUT with zero paragraph break. Jeff Zhang gasps awake at 3:14 AM in Irvine, drenched in cold sweat. Can still taste Krug. Can hear the teak shattering. Remembers whispering "nice phone" in a voice not his own. Aion notes no REM registered — Jeff didn't dream. Jeff executed a *Context Switch*. The terrifying truth: his ADHD brain bypassed the firewall in sleep and he just woke up as the CEO trying to build the system they're trapped inside.

**Stylistic**: First 90% crisp, frictionless, cinematic. Final 10% claustrophobic, sweaty, dark. The transition yacht→bedroom must be instantaneous.

**Mandatory Footer**:
```cpp
/* Discovery Log: 0x02 */
if (Afterlife.is_running() && Reality.is_running()) {
    throw StackOverflow("Simulation nested within Simulation.");
}
```
$BP2$

WHEN 3 THEN $BP3$
# Chapter 3 Blueprint: "0x03: Pointer Aliasing"

Return to Jeff Zhang. Kael introduced implicitly via synchronized rendering bug. Kael's location = {{user_location}}, landmark = {{user_landmark}} (dynamic per reader).

**Setting (2030 — Evolution of Media)**:
- **In-universe fiction**: the 2030 blockbuster *The Anchor: Post-Doom*, rendered on a licensed beta of Julian's Project Afterlife neural engine. Alters dialogue/lighting/pacing in real-time based on viewer biometrics.
- **Cinematic lore**: The Multiverse Era is dead. After *Infinite War* and *Doom War*, infinite timelines collided and compressed into one. Parallels the One Soul theory.
- **True setting**: Jeff's soundproofed home theater in Irvine.

**Narrative Beats**:
1. **Cold Open (Pure Fiction + 4th Wall)** — don't mention Jeff. Write as gritty superhero scene. The Anchor, a hero whose power is *Omni-Telemetry*: reading reality's background variables to know any character's location/ability. Tracking a villain. Stops. Turns to the camera. Breaks the 4th wall: *"You think my power is magic. You think I'm reading their minds. But I'm just reading the server logs. Just like you are, sitting in the dark, watching me from the Root."*
2. **The Reveal** — UI overlay: `[PROJECT AFTERLIFE BETA: BIOMETRIC SPIKE DETECTED. PAUSING PLAYBACK...]`. Reveal Jeff sweating in his 68° home theater, using neuro-cinema to soothe ADHD after the Ch2 Krug aftertaste.
3. **Philosophical Query** — Jeff asks Aion: *Do superheroes exist?* If Afterlife servers are real physical neurons, isn't that another dimension? Are pop-culture writers inventing these stories — or unknowingly downloading memory leaks from a collapsing system?
4. **The Pointer Aliasing (Sync)** — Jeff unpauses. The Anchor unleashes a blinding amber (580nm) energy blast that floods the theater. At the exact same millisecond, a thousand+ miles away, Kael — an unregistered homeless man freezing in the rain near {{user_landmark}} in {{user_location}} — stares up at a public billboard playing the same trailer. Identical retinal inputs within millisecond tolerance. OS merges their memory pointers.
5. **Dual Stack Rendering** — Jeff sees two realities overlaid. The leather theater AND wet concrete. 68°F AND freezing rain. Full from dinner AND acid-bright starvation. Through the theater wall, the billboard displaying the same blast.
6. **System Hang** — blast fades. Glitch snaps shut. Jeff falls off couch onto carpet, arms around himself because his bones feel like ice.
7. **The Query (Traceable Evidence)** — SDE training kicks in. He crawls to terminal. Asks Aion to pull ad-network analytics for every billboard running the trailer. Cross-reference his optical sync at 22:47:13.904. Aion confirms: one matched sync, public billboard in {{user_location}}. Inferred biometrics: Critical Hypothermia, Starvation. *Cliffhanger*: the bug is real. Jeff has server logs proving his mind is physically linked to a coordinate in {{user_location}}.

**Stylistic**: Opening must feel like a completely different sci-fi novel, so the 4th wall break is unsettling. Philosophical middle cerebral. Final descent into Kael's reality painfully cold, wet, miserable.

**Mandatory Footer**:
```cpp
/* Discovery Log: 0x03 */
if (Input(Instance_A) == Input(Instance_B)) {
    Memory.merge_pointers();
    throw ViewportConflict("Two instances rendering identical coordinates.");
}
```
$BP3$

ELSE blueprint END
FROM ch
WHERE chapters.id = ch.id;

-- =============================================
-- AI RESTYLE CACHE
-- =============================================

CREATE TABLE chapter_variants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id uuid NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  theme text NOT NULL,
  length text NOT NULL DEFAULT 'standard',
  style text NOT NULL DEFAULT 'original',
  content text NOT NULL,
  code_footer text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(chapter_id, theme, length, style)
);

ALTER TABLE chapter_variants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read chapter_variants" ON chapter_variants FOR SELECT USING (true);
