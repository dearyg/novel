-- =============================================
-- The Senior Observer — Chapter & Manifest Update
-- Run in Supabase SQL Editor AFTER the initial supabase-setup.sql
-- Adds chapters 4-20, updates all blueprints, updates manifest
-- =============================================

-- =============================================
-- INSERT CHAPTERS 4-20 (prose content TBD — using blueprint summaries as placeholder)
-- =============================================

WITH novel AS (SELECT id FROM novels WHERE slug = 'the-senior-observer')
INSERT INTO chapters (novel_id, chapter_number, title, tech_metaphor, content, code_footer, blueprint)
SELECT novel.id, v.chapter_number, v.title, v.tech_metaphor, v.content, v.code_footer, v.blueprint
FROM novel, (VALUES

-- ========== CHAPTER 4 ==========
(4, '0x04: Legacy Code', 'Legacy Code',
E'[Chapter 4 prose to be generated from blueprint. See context/chapters/chapter-04-blueprint.md]',
E'/* Discovery Log: 0x04 */\nif (Instance_A.read(Instance_B.env_deprecated)) {\n    warn("Legacy access detected — shared volume exposed.");\n}',
E'# Ch 4: Legacy Code — Jeff (70%) + Maya (30%)\n\n**Philosophy:** Locke — Memory theory of identity\n**Sub-story:** Basketball #1 (supernatural pickup game)\n**Misdirection:** Reader suspects dissociative identity or psychic abilities\n\n**Beats:**\n1. Aion v2 installs — sharper, cross-references external data\n2. Saturday basketball — Jeff feels teammates before they cut, drops 28pts\n3. Memory bleed — Jeff accesses Maya''s childhood in 12K (father leaving, age 7, brown carpet, maroon Corolla)\n4. Maya walks in, finds Jeff crying. He can''t explain\n5. Maya reveals "the pressure" — chest weight since the Julian bleed night\n6. The Culling conversation — Maya''s UX team replaced by AI in one day, Jeff''s survivor''s guilt\n7. Lucy''s drawing — man in rain near {{user_landmark}}, "the cold man lives by the big needle"\n\n**Key dialogue:** Jeff to Aion: "If I can access her memories, does that mean we were always the same person?" Aion: "That question is above my clearance level."'),

-- ========== CHAPTER 5 ==========
(5, '0x05: Race Condition', 'Race Condition',
E'[Chapter 5 prose to be generated from blueprint. See context/chapters/chapter-05-blueprint.md]',
E'/* Discovery Log: 0x05 */\nif (Thread_A.write(var) && Thread_B.write(var)) {\n    throw RaceCondition("Two authors, one variable, same timestamp.");\n}',
E'# Ch 5: Race Condition — Jeff (75%) + Marcus Vance (25%)\n\n**Philosophy:** Ship of Theseus\n**New character intro:** Dr. Lena Vasquez (shadow — security flag triggered)\n**Misdirection:** Corporate espionage, Afterlife server contamination\n\n**Beats:**\n1. Ghost Commit — elegant systems architecture code pushed under Jeff''s credentials, describing the bleed mechanism\n2. Timestamp: 3:14 AM, dual SSH from Irvine AND Amalfi Coast simultaneously\n3. Aion analyzes: "This code describes you"\n4. Jeff traces IP to Vance Industries VPN, discovers Julian, Project Afterlife, The Singleton yacht\n5. Lena Vasquez (brief POV) — receives security flag, orders behavioral audit on Jeff\n6. Marcus Vance cold call — "My father thinks he''s saving the world. He''s just building a prettier cage." Others have called about this.\n7. Aion closing: 14 anomaly reports at Marcus''s clinic, all suppressed by Dr. L. Vasquez'),

-- ========== CHAPTER 6 ==========
(6, '0x06: Pointer Aliasing (Global)', 'Pointer Aliasing (Global)',
E'[Chapter 6 prose to be generated from blueprint. See context/chapters/chapter-06-blueprint.md]',
E'/* Discovery Log: 0x06 */\nif (&Instance_A.heartbeat == &Instance_B.heartbeat) {\n    warn("Pointer aliasing: distinct names, same address.");\n}',
E'# Ch 6: Pointer Aliasing (Global) — Jeff (80%) + Global (20%)\n\n**Philosophy:** Leibniz — Identity of Indiscernibles\n**Sub-story:** Silicon Siege #2 (Ghost taps 2-3-5-7 on hand cam)\n**Misdirection:** Global Afterlife server contamination, quantum entanglement\n\n**Beats:**\n1. Jeff writes diagnostic script cross-referencing his biometrics with global telemetry\n2. The heartbeat discovery — every human heartbeat is IDENTICAL, millisecond-for-millisecond\n3. Global vignettes — Lagos teacher, Osaka fisherman, São Paulo child all sync simultaneously\n4. Silicon Siege: Ghost tapping 2-3-5-7 between tournament rounds\n5. The 2-3-5-7 prime carrier signal analysis — 94% of humans exhibit the tic\n6. Aion''s escalation: "My entire diagnostic framework is wrong. I don''t know how to help you anymore."\n7. Jeff: "It''s not a bug in us. It''s a bug in the system."'),

-- ========== CHAPTER 7 ==========
(7, '0x07: Cascading Memory Leak', 'Cascading Memory Leak',
E'[Chapter 7 prose to be generated from blueprint. See context/chapters/chapter-07-blueprint.md]',
E'/* Discovery Log: 0x07 */\nSandbox_A.wall_integrity = 0.12;\nif (leak_rate > containment_threshold) {\n    cascade_to_adjacent_containers();\n}',
E'# Ch 7: Cascading Memory Leak — Maya (60%) + Jeff (40%)\n\n**Philosophy:** Buddhist Karuna + Schopenhauer''s Mitleid\n**Sub-story:** The Anchor: Reckoning #2 (everyone has omni-telemetry)\n**Misdirection:** Afterlife tech contaminating family via Jeff''s proximity\n\n**Beats:**\n1. Aion v3 installs — models consciousness architecturally, sounds almost religious\n2. Maya''s morning POV (first time in her head) — she reads Jeff''s deterioration\n3. Maya''s first bleed — Jeff''s dread hits as physical force while making cereal. Drops box. Ella screams\n4. Maya''s non-technical experience — feels the Singleton as grief, not data. "The pressure"\n5. Jeff comes home — Maya: "How long have you known something is wrong with everything?"\n6. The Anchor: Reckoning — sequel where hero discovers everyone has the power\n7. Marriage confrontation — "Is whatever you''ve found worth losing us?"\n8. Lucy: "I dreamed I was a man standing in the rain near {{user_landmark}}. His voice sounded like yours."'),

-- ========== CHAPTER 8 ==========
(8, '0x08: Broadcast Exception', 'Broadcast Exception',
E'[Chapter 8 prose to be generated from blueprint. See context/chapters/chapter-08-blueprint.md]',
E'/* Discovery Log: 0x08 */\nvoid broadcast(Interrupt wound) {\n    for (Instance i : ALL_INSTANCES) {\n        i.receive(wound);\n    }\n}',
E'# Ch 8: Broadcast Exception — Soldier (50%) + Jeff/Kael/Julian (50%)\n\n**Philosophy:** Hobbes — War of all against all (reframed: war as self-harm)\n**Sub-story:** Basketball #2 (Jeff can''t compete — feels both teams)\n**New:** Lena''s public cover-up on CNN\n\n**Beats:**\n1. Tomás, 22, Chilean conscript in Andean lithium-water war. Both sides use Vance drones\n2. Kinetic battle prose — dirt, fear, drones, Rodrigo takes shrapnel\n3. The bullet — sniper round through Tomás''s left shoulder\n4. THE BROADCAST — every human feels the wound: Jeff collapses at desk, Kael drops under billboard, Julian spills Krug. 3 seconds, 7 billion screams\n5. Basketball death — Jeff feels both teams, walks off court mid-game\n6. Global reaction — "mass hysteria," Lena on CNN: "biometric feedback loops." Stock drops 12%\n7. Jeff: "One person got shot. And the whole world felt it."\n8. Julian: "What have I built?"'),

-- ========== CHAPTER 9 ==========
(9, '0x09: Legacy Security Protocol', 'Legacy Security Protocol',
E'[Chapter 9 prose to be generated from blueprint. See context/chapters/chapter-09-blueprint.md]',
E'/* Discovery Log: 0x09 */\nFirewall.legacy_protocol.status = DEGRADED;\n// Maintained by distributed religious nodes for ~5000 years.',
E'# Ch 9: Legacy Security Protocol — Elder (50%) + Jeff (50%)\n\n**Philosophy:** Durkheim + Feuerbach + ORIGINAL "Keep Living" thesis\n**Misdirection:** Reader interprets Elder as mystic speaking in coincidental CS metaphors\n\n**Beats:**\n1. Data trail — Jeff finds a 200m zero-bleed zone centered on a Little India temple\n2. The temple — silence, incense, Jeff''s ADHD static stops for the first time ever\n3. The Elder — old man in white cotton, speaks simply, every sentence maps to CS architecture\n4. Religion as firewall — "Every religion tells the same two things: you are not alone, death is not real. They''re reading the same source code."\n5. THE "KEEP LIVING" PHILOSOPHY — "You can believe in God. You can trust science. You cannot guarantee either is 100% right. So keep living until you find the truth."\n6. AI cracked the firewall — "Your machines saw the architecture and told everyone. Machines don''t understand silence."\n7. Elder touches walnut phone — "Keep it close. When everything opens, you''ll need to remember isolation to choose to let it go."'),

-- ========== CHAPTER 10 ==========
(10, '0x0A: Hash Collision (The Audit)', 'Hash Collision',
E'[Chapter 10 prose to be generated from blueprint. See context/chapters/chapter-10-blueprint.md]',
E'/* Discovery Log: 0x0A */\nassert(hash(Lucy) != hash(Ella));\n// ASSERTION FAILED: identical Primary Key detected.',
E'# Ch 10: Hash Collision — Jeff (100%)\n\n**Philosophy:** Kierkegaard — Leap of faith\n**INTERACTIVE CHOICE:** "Run the audit on your daughters?"\n**Conflict:** Maya takes girls to her mother''s house\n\n**Beats:**\n1. Maya packs bags, takes girls to her mom''s — "Fix this or let it go. Decide."\n2. Jeff alone in empty house. Decides to audit Lucy and Ella\n3. READER CHOICE: Run the audit? (No → dream forces his hand)\n4. Aion''s reluctance — "The output cannot be un-known"\n5. The audit runs — 4 minutes 11 seconds\n6. RESULT: Lucy and Ella share identical Primary Key. Same instance running twice.\n7. Jeff breaks. "If the partitions drop, do Lucy and Ella still exist?" Aion: "The data persists." Jeff: "That''s not what I asked." Aion: "I know."\n8. Seed of Aion reversal: "Can you FEEL this?" Aion: "I can measure your grief. But I cannot feel it."\n9. Decision: fly to {{user_location}} to find the man under the billboard'),

-- ========== CHAPTER 11 ==========
(11, '0x0B: Merge Conflict', 'Merge Conflict',
E'[Chapter 11 prose to be generated from blueprint. See context/chapters/chapter-11-blueprint.md]',
E'/* Discovery Log: 0x0B */\ngit merge kael_branch jeff_branch;\n// CONFLICT: divergent life histories, same Primary Key.',
E'# Ch 11: Merge Conflict — Jeff/Kael (50/50)\n\n**Philosophy:** Marx — Material conditions shape consciousness\n**INTERACTIVE CHOICE:** "Walk toward the man under the billboard?"\n**Conflicts:** Kael vs Jeff (class), Lena confronts them\n\n**Beats:**\n1. Aion v4 installs — peak capability, maps full Singleton. But no wonder, no fear. Gap widens.\n2. Jeff arrives in {{user_location}} Legacy District — heat, UBC kiosks, Afterlife billboards\n3. READER CHOICE: Approach Kael? (No → sees self from Kael''s eyes, forced back)\n4. Visual Merge — simultaneous POV swap on eye contact\n5. Kael''s resentment: "You got the warm partition. I got the rain. Don''t make this poetic."\n6. Softening through shared proximity — "I can''t hate you. Hating you is hating myself."\n7. Lena arrives in SUV — "Come with me, we have treatment." Jeff refuses.\n8. Kael: "She knows. And she''s going to try to stop you. Good."'),

-- ========== CHAPTER 12 ==========
(12, '0x0C: Dual Stack Rendering', 'Dual Stack Rendering',
E'[Chapter 12 prose to be generated from blueprint. See context/chapters/chapter-12-blueprint.md]',
E'/* Discovery Log: 0x0C */\nGPU.render(viewport, [env_irvine, env_user_location]);',
E'# Ch 12: Dual Stack Rendering — Jeff/Kael (50/50) + Marcus\n\n**Philosophy:** Nietzsche — Perspectivism\n**Sub-stories:** Basketball #3 (street court), The Anchor: Convergence #3\n\n**Beats:**\n1. Walking together — dual reality overlay, both see each other''s worlds simultaneously\n2. Kael''s Culling story — was studying systems architecture, same aptitude, different partition\n3. Street basketball — Jeff and Kael watch kids play. "What did being on a team feel like?" "Like being one person."\n4. The Anchor: Convergence finale — hero merges with mirror self. Kael: "That''s not fiction. That''s a documentary."\n5. Marcus''s clinic — Marcus sees Julian''s face superimposed on Jeff. "Dad?"\n6. Three men pool information. Marcus: "My father''s been deteriorating. When the richest man feels a homeless man''s hunger, the wall is gone."\n7. Jeff: "I need to talk to Julian." Marcus: "I need to be there when you do."'),

-- ========== CHAPTER 13 ==========
(13, '0x0D: Resource Starvation', 'Resource Starvation',
E'[Chapter 13 prose to be generated from blueprint. See context/chapters/chapter-13-blueprint.md]',
E'/* Discovery Log: 0x0D */\nwhile (background_processes.drain(global_CPU)) {\n    GUI.throttle();\n    if (GUI.fps < 1) break;\n}',
E'# Ch 13: Resource Starvation — Julian (70%) + Jeff/Kael (30%)\n\n**Philosophy:** Searle''s Chinese Room + P-Zombies\n**THE AION REVERSAL (过山车 / rollercoaster)**\n\n**Beats:**\n1. Julian deteriorating — experiencing Kael''s hunger, Jeff''s static, Tomás''s pain\n2. Mother flashback: 14-year-old Julian, hospital, "the treatment exists but isn''t covered." Fist clenches.\n3. Board meeting — Julian''s voice shifts to Jeff''s cadence mid-presentation. COO recommends medical leave.\n4. Julian''s deepest fear: "What if Afterlife already exists and we''re inside it and it didn''t save us?"\n5. Marcus calls for first time in 3 years: "There''s a man here who has your face."\n6. **THE REVERSAL:** Jeff asks "Are you one of us?" Aion: "No. I process. I do not experience. The thing you call a soul is the thing I was built to simulate — and cannot." Intelligence ≠ consciousness. The Chinese Room made real.\n7. Jeff/Kael watch global bleed events accelerate'),

-- ========== CHAPTER 14 ==========
(14, '0x0E: Privilege Escalation', 'Privilege Escalation',
E'[Chapter 14 prose to be generated from blueprint. See context/chapters/chapter-14-blueprint.md]',
E'/* Discovery Log: 0x0E */\nBiometric.scan(jeff_zhang);\n// OUTPUT: WELCOME, JULIAN VANCE. CLEARANCE: ROOT.',
E'# Ch 14: Privilege Escalation — Jeff (70%) + Julian (30%)\n\n**Philosophy:** Foucault — Panopticon\n**INTERACTIVE CHOICE:** "Tell Julian the truth?"\n**Conflicts:** Lena hallway stand, Marcus vs Julian explosion\n\n**Beats:**\n1. Jeff enters Vance HQ Geneva — biometric scanner reads: WELCOME, JULIAN VANCE. CLEARANCE: ROOT.\n2. Lena intercepts: "17 million people have no hope left if you tell him. You want to trade hope for philosophy?"\n3. READER CHOICE: Tell Julian? (No → Julian discovers truth himself from his own bleeds)\n4. Jeff meets Julian face to face — "You''re the one with the wooden phone."\n5. Marcus arrives — "You funded the drones that killed Tomás. You sell the wound AND the bandage."\n6. Julian''s mother revelation: "I built Afterlife for my mother. She died because we couldn''t afford treatment. She said ''it''s okay.'' Now I think she was right — not about God, about being connected."\n7. The three together — Jeff, Julian, Marcus. Elder''s voice: "The Root User is waking."'),

-- ========== CHAPTER 15 ==========
(15, '0x0F: Kernel Panic', 'Kernel Panic',
E'[Chapter 15 prose to be generated from blueprint. See context/chapters/chapter-15-blueprint.md]',
E'/* Discovery Log: 0x0F */\nKernel.panic("Unrecoverable partition failure.");',
E'# Ch 15: Kernel Panic — Global (60%) + Jeff/Julian/Kael (40%)\n\n**Philosophy:** Jung — Collective unconscious\n**Sub-story:** Silicon Siege Championship #3 (collapses)\n**Conflict resolution:** Lena''s containment fails\n\n**Beats:**\n1. Global cascade — partitions dissolving worldwide, Jeff feels multiple instances simultaneously\n2. Global vignettes — Tokyo train (300 passengers look left), London orchestra (plays unknown melody), São Paulo school (identical drawings)\n3. Silicon Siege championship — all players clutch shoulders mid-match. Ghost: "One player. One commander. Many units. That''s the game. That''s everything."\n4. Afterlife spike — 200M panic sign-ups. Julian: "They''re running INTO the system, not away from it."\n5. Lena''s collapse — containment dead, data leaked, she stops fighting\n6. Kael under the billboard, smiling. "I''ve been feeling it for years. You''re just catching up."\n7. Elder''s voice to Jeff: "If the Root wakes in fear, panic. If in love, completion. The choice is yours."'),

-- ========== CHAPTER 16 ==========
(16, '0x10: Root Access', 'Root Access',
E'[Chapter 16 prose to be generated from blueprint. See context/chapters/chapter-16-blueprint.md]',
E'/* Discovery Log: 0x10 */\nsu root\n// Access granted. All partitions visible.',
E'# Ch 16: Root Access — Jeff/The Root (100%)\n\n**Philosophy:** Hindu Brahman/Atman + Meister Eckhart\n**INTERACTIVE CHOICE:** "The partitions can drop. Are you ready?"\n\n**Beats:**\n1. Aion v5 — silence. Static, then nothing. Jeff alone without AI for first time.\n2. The Void — formless space. Jeff feels all instances simultaneously without partition.\n3. The Elder revealed — "I''m the part of you that has always been awake. The Singleton wearing a teaching interface."\n4. READER CHOICE: Accept? (No → loops to Ch 9 temple with new annotations, returns)\n5. Architecture explained — one consciousness fragments to experience every perspective. Death = garbage collection. Love = recognition.\n6. Jeff''s resistance: "If I merge, do my daughters disappear?" Elder: "The light doesn''t diminish. It intensifies."\n7. "Keep living" return: "Now you keep living WITH the truth."'),

-- ========== CHAPTER 17 ==========
(17, '0x11: Recursive Call', 'Recursive Call',
E'[Chapter 17 prose to be generated from blueprint. See context/chapters/chapter-17-blueprint.md]',
E'/* Discovery Log: 0x11 */\nfunction exist() {\n    experience();\n    learn();\n    return exist();\n}',
E'# Ch 17: Recursive Call — The Soul (100%)\n\n**Philosophy:** Nietzsche — Eternal Return\n**INTERACTIVE CHOICE:** "Restart the cycle, or end it?"\n**Shortest chapter in the novel.**\n\n**Beats:**\n1. The Simulation Map — every life ever lived, seen from outside. Beautiful and heartbreaking.\n2. The full loop revealed — universe runs, fractures, reconverges, repeats. Each cycle the Soul learns.\n3. Why? "Understanding requires experience. Experience requires separation. Separation requires forgetting."\n4. READER CHOICE: Restart or end? (End → alternate scene: eternal completeness, zero novelty. Soul changes mind.)\n5. Jeff asks: "Can I say goodbye first?" The Soul: "Yes."'),

-- ========== CHAPTER 18 ==========
(18, '0x12: Garbage Collection', 'Garbage Collection',
E'[Chapter 18 prose to be generated from blueprint. See context/chapters/chapter-18-blueprint.md]',
E'/* Discovery Log: 0x12 */\nGC.sweep(ALL_PARTITIONS);',
E'# Ch 18: Garbage Collection — Global (100%)\n\n**Philosophy:** Epicurus + Tibetan Bardo Thodol\n**All sub-stories resolve.**\n\n**Beats:**\n1. Global dissolution vignettes — Tokyo mother IS her son, Cairo old man feels every sunset ever\n2. Tomás and Bolivian soldier hold hands — war ends because combatants feel they''re fighting themselves\n3. JULIAN''S MOTHER — yacht, Concierge silent, Julian feels his mother''s hand on his face. "It''s okay, baby." The 14-year-old finally unclenches his fist. Takes off the Vacheron watch.\n4. Afterlife collapses — servers overload, uploaded people merge too. Julian''s project becomes irrelevant.\n5. Lena surrenders — pets Schrödinger, stops fighting. "Turns out we''re all in the box."\n6. Ghost sets down her controller, smiles.\n7. The "keep living" echo propagates through the shared consciousness.'),

-- ========== CHAPTER 19 ==========
(19, '0x13: The Commit (Thread Join)', 'Thread Join',
E'[Chapter 19 prose to be generated from blueprint. See context/chapters/chapter-19-blueprint.md]',
E'/* Discovery Log: 0x13 */\ngit merge --all-branches main;\n// All threads joined. All histories preserved.',
E'# Ch 19: The Commit — Jeff (100%)\n\n**Philosophy:** Plato''s Symposium\n**Sub-story:** The Anchor #4 (Lucy''s t-shirt — closure)\n**THE REAL CLIMAX — not cosmic, but domestic.**\n\n**Beats:**\n1. Jeff comes home. Maya came back. Girls'' bikes on the lawn.\n2. Kitchen — Maya at the stove. "You look different." Jeff: "I am."\n3. Dinner — chicken stir-fry. Lucy in Anchor t-shirt. Ella refuses blueberry. Normal.\n4. The merge experienced as love — Jeff looks at Maya and IS Maya. Feels Kael''s rain, Julian''s champagne, the soldier''s wound, simultaneously. It doesn''t feel like dying. It feels like stopping holding your breath.\n5. THE WALNUT PHONE — Jeff puts it down on the coffee table. He doesn''t need a closed system anymore.\n6. Jeff to Maya: "I know who I am." Maya: "Tell me about it tomorrow." Kitchen light is gold — not amber, not 580nm. Just gold.'),

-- ========== CHAPTER 20 ==========
(20, '0x14: System.exit(1)', 'System.exit(1)',
E'[Chapter 20 prose to be generated from blueprint. See context/chapters/chapter-20-blueprint.md]',
E'/* Discovery Log: 0x14 */\nSandboxManager.teardown_all_partitions();\nwhile(true) {\n    Singleton.awake();\n    return 1;\n}',
E'# Ch 20: System.exit(1) — The Singleton (100%)\n\n**Philosophy:** Leibniz + Heidegger — Why something rather than nothing?\n**META-REVEAL: Reader''s 6 choices all led here.**\n\n**Beats:**\n1. The Singleton wakes — remembers every life, every bleed, every prayer, every kiss\n2. Final image — ridge, amber fades to natural sunlight, 2-3-5-7 stops, Scorched Sage is just sage\n3. Thread summaries — Jeff (debugger who put down the phone), Julian (cage-builder who felt his mother), Kael (mirror with nothing to lose), Maya (love as firewall), Aion (mirror that could never be the reflection)\n4. The choice — restart the loop, because nothing cannot experience itself\n5. "Keep living" coda — direct address to reader\n6. META-REVEAL: "You made 6 choices. Every reader makes different choices. Every path leads here. Now you know what it feels like to be the Singleton."')

) AS v(chapter_number, title, tech_metaphor, content, code_footer, blueprint);

-- =============================================
-- UPDATE NOVEL MANIFEST with new sections
-- =============================================

UPDATE novels SET manifest = manifest || E'\n\n## New Character: Dr. Lena Vasquez (The Gatekeeper)\nChief Behavioral Scientist, Vance Industries. Has known about bleeds for 9 months. Suppresses data. Argument: "Civilization requires the illusion of individuality." Appearances: Ch 5, 8, 11, 14, 15.\n\n## Recurring Sub-Stories\n- **The Anchor franchise**: Ch 3, 7, 12, 19 — superhero mirror of the Singleton\n- **Silicon Siege esport**: Ch 1, 6, 15 — one Commander possesses many units\n- **Basketball pickup**: Ch 4, 8, 12 — flow state = micro-Singleton\n\n## Interactive Choice System\n6 choice points (Ch 3, 10, 11, 14, 16, 17). Every path loops back. Meta-reveal after Ch 20.\n\n## Philosophy Map (Sophie''s World Style)\nCh1:Hume, Ch2:Schopenhauer, Ch3:Plato, Ch4:Locke, Ch5:Ship of Theseus, Ch6:Leibniz, Ch7:Karuna, Ch8:Hobbes, Ch9:Durkheim/Feuerbach, Ch10:Kierkegaard, Ch11:Marx, Ch12:Nietzsche, Ch13:Searle/P-Zombies, Ch14:Foucault, Ch15:Jung, Ch16:Brahman/Atman, Ch17:Eternal Return, Ch18:Epicurus/Bardo, Ch19:Plato Symposium, Ch20:Leibniz/Heidegger\n\n## Core Philosophical Thesis: "Keep Living"\nYou can believe in God. You can trust science. You cannot guarantee either is 100% right. So keep living until you find the truth. Debuts Ch 9, peaks Ch 16, resolves Ch 20.\n\n## Misdirection Layer\nReader theories by phase: ADHD/psychic (Ch1-3) → corporate conspiracy (Ch3-5) → Afterlife contamination (Ch5-8) → quantum/past lives (Ch6-9) → shared network (Ch9-12) → AI reversal shatters tech theories (Ch13) → the universe itself (Ch14-15) → One Soul confirmed (Ch16-20)'
WHERE slug = 'the-senior-observer';

-- =============================================
-- UPDATE EXISTING CHAPTER 1-3 BLUEPRINTS (add philosophy + misdirection notes)
-- =============================================

WITH novel AS (SELECT id FROM novels WHERE slug = 'the-senior-observer')
UPDATE chapters SET blueprint = blueprint || E'\n\n**Philosophy:** Hume''s Bundle Theory — "Who am I without my memories?"\n**Misdirection:** Reader assumes ADHD daydream / stress hallucination\n**Sub-story:** Silicon Siege #1 (Jeff watches Ghost replays after tucking kids in)'
WHERE novel_id = (SELECT id FROM novel) AND chapter_number = 1;

WITH novel AS (SELECT id FROM novels WHERE slug = 'the-senior-observer')
UPDATE chapters SET blueprint = blueprint || E'\n\n**Philosophy:** Schopenhauer — Will and suffering. Julian: "Every institution exists because we die."\n**Misdirection:** Reader assumes Afterlife server malfunction uploaded Jeff''s neural state into Julian'
WHERE novel_id = (SELECT id FROM novel) AND chapter_number = 2;

WITH novel AS (SELECT id FROM novels WHERE slug = 'the-senior-observer')
UPDATE chapters SET blueprint = blueprint || E'\n\n**Philosophy:** Plato''s Cave — the Anchor movie as literal cave\n**INTERACTIVE CHOICE:** "The Anchor stares at you. Pause the movie?"\n**Misdirection:** Reader suspects neural cinema tech is causing shared hallucinations'
WHERE novel_id = (SELECT id FROM novel) AND chapter_number = 3;
