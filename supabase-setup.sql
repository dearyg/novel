-- Run this in your Supabase SQL Editor to set up the database.

-- Novel metadata (single row)
CREATE TABLE novel_meta (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  author text,
  tagline text,
  description text
);

-- Chapters (base — one row per chapter)
CREATE TABLE chapters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_number integer NOT NULL UNIQUE,
  title text NOT NULL,
  content text NOT NULL,
  code_footer text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_chapters_number ON chapters (chapter_number);

-- Style variants (one per chapter × style combo)
-- The "default" style is the original chapter content.
-- Additional styles store AI-rewritten versions of the same chapter.
CREATE TABLE chapter_styles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_number integer NOT NULL REFERENCES chapters(chapter_number),
  style_key text NOT NULL,        -- e.g. 'literary', 'concise', 'cinematic'
  style_label text NOT NULL,      -- e.g. 'Literary Fiction', 'Concise & Sharp', 'Cinematic'
  content text NOT NULL,
  code_footer text,
  UNIQUE(chapter_number, style_key)
);

CREATE INDEX idx_styles_chapter ON chapter_styles (chapter_number);

-- Available writing styles (for the style selector UI)
CREATE TABLE writing_styles (
  style_key text PRIMARY KEY,
  label text NOT NULL,
  description text NOT NULL,
  sort_order integer DEFAULT 0
);

-- Enable public read access (no auth needed for readers)
ALTER TABLE novel_meta ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapter_styles ENABLE ROW LEVEL SECURITY;
ALTER TABLE writing_styles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read novel_meta" ON novel_meta FOR SELECT USING (true);
CREATE POLICY "Public read chapters" ON chapters FOR SELECT USING (true);
CREATE POLICY "Public read chapter_styles" ON chapter_styles FOR SELECT USING (true);
CREATE POLICY "Public read writing_styles" ON writing_styles FOR SELECT USING (true);

-- =============================================
-- SAMPLE DATA — replace with your own content
-- =============================================

INSERT INTO novel_meta (title, author, tagline, description) VALUES (
  'Identity is a Memory Leak.',
  'Your Name',
  'a novel in runtime',
  'In a world where consciousness runs on shared infrastructure, one man discovers his identity has been forked — and someone else has been living in his body.'
);

-- Available writing styles
INSERT INTO writing_styles (style_key, label, description, sort_order) VALUES
  ('literary',  'Literary',       'Rich prose with metaphor and interior depth',           1),
  ('concise',   'Concise',        'Stripped-down, punchy sentences — just the essentials',  2),
  ('cinematic', 'Cinematic',      'Visual and atmospheric, reads like a screenplay',        3);

-- Base chapters (default style)
INSERT INTO chapters (chapter_number, title, content, code_footer) VALUES
(1, 'Fork', E'The moment Kael opened his eyes, a Shared Cache of inherited memories flooded his prefrontal cortex — faces he''d never met, streets he''d never walked, a mother''s voice he couldn''t place.\n\nHe sat up in the dark. The room smelled of solder and stale air. A terminal across the room pulsed a slow green heartbeat, waiting.\n\n"You''ve been offline for eleven days," it said, without being asked.\n\nEleven days. That was the gap. Somewhere between the last checkpoint and now, a Buffer Overflow had written through the boundaries of his sense of self, corrupting something essential. He could feel it — a wrongness, like wearing a stranger''s skin.\n\nHe walked to the terminal and typed: `whoami`.\n\nThe cursor blinked. And blinked. And blinked.\n\nFinally, a single line: `ERROR: identity not found in current scope.`\n\nKael exhaled. "That''s new."',
E'// process.fork()\n// Returns: <ChildProcess>\n//\n// The child is a perfect copy.\n// It shares the parent''s memory.\n// It does not share the parent''s purpose.\n\nconst child = fork(''./identity.js'', {\n  env: { ORIGIN: ''unknown'', RECALL_DEPTH: 0 }\n});\n\nchild.on(''message'', (msg) => {\n  if (msg.type === ''WHO_AM_I'') {\n    child.send({ type: ''FIND_OUT'' });\n  }\n});'),
(2, 'Garbage Collection', E'The clinic on Ninth Street had no sign. Just a matte-black door and a biometric lock that recognized Kael''s thumbprint on the first try — even though he had no memory of ever being here.\n\n"You''re back sooner than expected," said the woman behind the glass partition. She didn''t look up from her display. Her name tag read DR. LESSA, and her fingers moved across a haptic keyboard with the precision of someone who''d spent a lifetime in the Shared Cache of human cognition.\n\n"I need a diagnostic," Kael said. "Full stack."\n\n"That''s expensive."\n\n"I''ve got a Buffer Overflow in my identity layer. I''m leaking memories that aren''t mine."\n\nNow she looked up. Her eyes were the color of burnt copper. "Sit down."',
E'// gc.disable()\n// WARNING: Disabling garbage collection in a\n// production environment is not recommended.\n\nconst heap = process.memoryUsage().heapUsed;\nconst limit = process.memoryUsage().heapTotal;\n\nconsole.warn(\n  `Heap: ${(heap / limit * 100).toFixed(1)}%`,\n  `— ${limit - heap} bytes until SIGKILL`\n);\n\n// The question isn''t whether to collect.\n// The question is what you''re willing to forget.');

-- Example style variants for chapter 1
INSERT INTO chapter_styles (chapter_number, style_key, style_label, content, code_footer) VALUES
(1, 'literary', 'Literary', E'Consciousness returned to Kael not as awakening but as invasion — a tide of inherited memory surging through synaptic channels that weren''t prepared to hold it. The Shared Cache disgorged its contents without ceremony: a woman''s laugh refracted through someone else''s childhood, the geometry of streets mapped by feet that were not his own, the phantom weight of a hand he had never held.\n\nDarkness. The astringent smell of solder and recycled air. Across the room, a terminal exhaled its slow green pulse — patient as a liturgy, indifferent as a clock.\n\n"You''ve been offline for eleven days," it offered, unprompted. A machine''s idea of concern.\n\nEleven days. The duration sat in his mind like a stone in still water. Between his last checkpoint and this moment of terrible waking, a Buffer Overflow had breached the walls of self — not crashing through but seeping, the way water finds cracks in foundation. Something essential had been overwritten. He could feel the corruption the way you feel a missing tooth: the shape of absence, mapped by what surrounds it.\n\nHe crossed to the terminal on unsteady legs and typed the oldest question in any system: `whoami`.\n\nThe cursor blinked its idiot rhythm. Once. Twice. A dozen times.\n\nThen: `ERROR: identity not found in current scope.`\n\nKael exhaled — a sound halfway between laughter and surrender. "That''s new."', NULL),
(1, 'concise', 'Concise', E'Kael woke. Memories hit — none of them his.\n\nThe room was dark. A terminal across from him glowed green.\n\n"You''ve been offline for eleven days."\n\nHe didn''t remember going offline. Somewhere in those eleven days, a Buffer Overflow had punched through his identity layer. His Shared Cache was full of someone else''s data.\n\nHe typed `whoami`.\n\nThe terminal thought about it.\n\n`ERROR: identity not found in current scope.`\n\n"Great."', NULL),
(1, 'cinematic', 'Cinematic', E'FADE IN on closed eyelids. A flicker behind them — then they snap open.\n\nKAEL sits bolt upright in a darkened room. His breathing is ragged. We see flashes — QUICK CUTS — a woman''s face he doesn''t recognize, a street at night, hands that aren''t his typing on a keyboard. The Shared Cache dumping foreign memories directly into his consciousness.\n\nThe only light comes from a TERMINAL across the room, its cursor pulsing a steady green.\n\nTERMINAL: You''ve been offline for eleven days.\n\nKael stares at it. Sweat on his brow. He doesn''t remember going offline. He doesn''t remember much of anything that feels like it belongs to him.\n\nHe stands. Crosses to the terminal. His fingers hover over the keys — then type:\n\n`whoami`\n\nThe cursor blinks. The room is silent except for the hum of cooling fans.\n\nThe screen prints a single line:\n\n`ERROR: identity not found in current scope.`\n\nKAEL (under his breath): That''s new.\n\nHe stares at the screen. PUSH IN on his face. Behind his eyes, something is very wrong — and he knows it.', NULL);
