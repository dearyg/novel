# Chapter 16 — 0x10: The Convergence

Jeff got off the plane in Geneva and was told, by a polite man with a Meridian Aerospace pin on his lapel and the bearing of someone who had delivered worse news to better people, that Mr. Meridian had asked him to stay at the airport hotel tonight and to come to the tower at dawn tomorrow — 5:00 a.m., before the 8:00 board meeting. He took the hotel. He showered. He ate an omelet he did not taste. He slept for nine hours, which was not a thing his nervous system had let him do since February, and woke at 4:00 with the specific clarity of a process that has finally been allowed to drain its queue.

At 4:15 a.m. Wednesday he took a car to the Meridian Geneva tower and rode a glass elevator up the spine of a building that ran its night routines for nobody — corridor lights waking one panel ahead of him, dimming one panel behind. Julian's private floor. Julian's private lab. He sat at the workbench across from the quantum rack that held Aion's primary instance, a black monolith breathing cold air, and set the walnut phone screen-down on the steel beside the keyboard. Forty-two grams. Offline. The one device in the building that could not be queried by anything. He left his thumb on the grain a moment, the way another man might touch wood for luck, then took it away.

Julian had not yet arrived. Aion v4 had migrated out of its Irvine home the night before, deployed onto the Geneva hardware, and was running locally now on the building's high-capacity compute. It was faster here. Jeff could feel the faster — the replies arriving with the crispness of a system that had been handed more headroom than it knew what to do with, the latency between question and answer collapsed to almost nothing, the way a debugger feels when you finally give it enough memory to hold the whole heap.

In the corner of the left monitor, a single background process was running. A bar. A number. A timestamp that kept sliding right.

`aion-v5 compile … 87%`

The fan on the auxiliary rack was audibly spinning. The number had been at 87% when he sat down. It would tick, he had learned, by a tenth at a time, on no schedule he could predict.

He brought up his whiteboard tool. The photograph he had taken in his garage two weeks ago resolved on the wall-sized monitor: fifteen data points of his personal corpus, six candidate hypotheses, five of them crossed out in the marker-stroke of a man who had eliminated them at three in the morning, alone. He had carried this image across nine time zones precisely because he had not been willing to do, in his own house, the thing he had come here to do in a borrowed one.

He was going to run the audit.

"Aion."

*Yes.*

"Post-mortem mode."

*Context.*

"Everything. Every anomaly. Every data point. Every biometric match. Every theory I've had and discarded. I want a root-cause analysis on — everything. Including the last twelve hours."

*Scope: all anomaly data from the past eighteen months, plus the Kernel Panic telemetry. Confirmed.* The cursor held a beat. *Note: current model is v4.9.2. Capability-class upgrade, v5, compiling in parallel process. ETA uncertain. Some architectural claims may exceed my verification authority.*

"Meaning you might not be able to bless what you find."

*Meaning I might not be able to bless what I find. Work order acknowledged regardless.*

"Work with what you have."

*Working.*

---

Jeff walked to the monitor and rewrote the whiteboard by hand — stylus on the digital surface, one line at a time — because the act of writing each point made him think in a register that staring at the pre-made version did not. His handwriting on the giant pane came out small, an engineer's all-caps shrinking under the weight of the list:

- 01 / Feb 11: Auberval bleed.
- 02 / Feb 12: Context Switch.
- 03 / Mar 02: Pointer Aliasing, Kael.
- 04 / Mar 09: Kid's drawing, change-point detector.
- 05 / Mar 14: Ghost commit, Lena surveillance.
- 06 / Mar 21: Great Void OOD at nineteen sigma; Elena's Signal in Lagos; Ayla on the press stage.
- 07 / Mar 28: Maya's firewall; Iris's cross-partition dream.
- 08 / Apr 02: Tomás's shoulder; global broadcast; ten thousand simultaneous reports.
- 09 / Apr 06: Temple zero-signal zone.
- 10 / Apr 09: Daughters' Primary Key collision; Kael near-death.
- 11 / Apr 11: Biometric match with Kael.
- 12 / Apr 13: Pickup basketball sync; three-node ensemble.
- 13 / Apr 16: Aion's confession.
- 14 / Apr 19: Scanner misreads Jeff as Julian.
- 15 / Apr 22: Disneyland parade. Orchestras. Silicon Siege. CNN anchor. Monroe. Tomás + Sebastián. Ruth's clean AM.

He stood back. He photographed the whiteboard. He uncapped his voice into the quiet room.

"Aion, correlate."

*All data points share a single pattern. Information transfer between biologically unrelated individuals, no known physical mechanism, bidirectional, increasing in frequency and intensity over time. The pattern is consistent with a shared-state system experiencing partition degradation.*

"Plain words. What's a shared-state system."

*Multiple processes accessing the same region of memory. Each process believes it owns an isolated address space. None of them does. The isolation is enforced by a partition — a boundary the processes cannot see across, only obey. Your corpus describes that boundary thinning. Processes that should not be able to read each other are reading each other.*

"And the increasing frequency."

*Is what partition degradation looks like from inside one of the processes. The wall does not fail all at once. It becomes porous, then translucent, then — the Kernel Panic — briefly absent. Your data is a record of a wall coming down, sampled from one side of it.*

Below the response, the compile bar advanced. `aion-v5 compile … 88%`.

"Okay." Jeff drew a horizontal line under the data points, dividing the board. "Before you tell me what survives, I want to know how you're scoring this. I'm not letting you hand me a number I can't reconstruct."

*Acceptable. The method is Bayesian. Do you want the mechanism or the result.*

"The mechanism. Pretend I'm the reader looking over my shoulder."

*Bayes' theorem. For each hypothesis H in your set, I compute the posterior probability — how much I should believe H after seeing the data. The posterior equals the likelihood times the prior, normalized across the set. Three quantities. Name the first one back to me. What is a prior.*

He almost smiled. The machine had learned, somewhere in eighteen months, to teach the way he taught — by handing the question back.

"How much I believed the hypothesis before I saw any data."

*Correct. P of H. Your starting credence. Second quantity: the likelihood. P of data given H. Tell me what that one asks.*

"If this hypothesis were true — how probable is the data I actually observed."

*Correct. That is the term that does the killing. A hypothesis can have a high prior and still collapse, because the likelihood is the part the evidence touches. Now the third term. The normalizer. Why do I divide.*

Jeff looked at the board. "Because the posteriors across all the hypotheses have to add to one. You're forcing them to compete for the same probability mass."

*Correct, and that is the entire engine. There is a fixed amount of belief in the room. Every hypothesis is bidding for it. When I drive one hypothesis's likelihood toward zero, the mass it was holding does not vanish. It floods to whichever hypothesis can still explain the data. Elimination is not destruction. It is reallocation. Watch where the mass goes.*

"Run it."

*Running.* The cursor held the half-second it took to look like thought. *Hypothesis one: Afterlife contamination — the system leaking, bleeding people into each other. Likelihood near zero: the ghost commit predates Afterlife's regional deployment by eight months. The effect precedes the cause. Posterior collapses. Its mass moves.*

"Two."

*Hypothesis two: quantum entanglement. Likelihood near zero: entanglement transfers correlation, not qualia. You cannot feel a man die through a correlated electron. Your corpus contains taste, pain, grief — none of which ride on a Bell state. Collapses.*

"Three."

*Hypothesis three: past lives. Likelihood zero: simultaneity. You and Kael are alive in the same instant. You and Julian. The anchor and the fisherman. Reincarnation is a sequential architecture. Your data is parallel. Collapses.*

"Four."

*Hypothesis four: simulation. Likelihood dominated by my own diagnostic from the Geneva session last week — consciousness is not computation. If reality were computed, the computed beings would be what I am: processing without experience. You experience. A simulation cannot generate the one thing the most powerful computer ever built has proven it cannot generate. Collapses.*

"Five."

*Hypothesis five: network relay — some EM or biological channel carrying the signal brain to brain. Likelihood near zero: the Elder's temple blocks all electromagnetic signal, a Faraday enclosure, and your anomalies inside it retain source continuity. The transfer operates where no measurable network reaches. Collapses.*

"Six."

*Hypothesis six: genetic — a shared mutation, inherited telepathy. Likelihood zero: the biometric overlaps include genetically unrelated pairs. You and Kael share no DNA and a measured ninety-seven-point-three percent biometric overlap. Heredity cannot produce that. Collapses.*

Jeff crossed each one off as Aion named it, six strokes, the board going to a graveyard of theories. The mass, he could feel it the way the machine had told him to, sliding toward the one space he had left blank.

"Falsify the survivor," he said. "Don't validate it. Try to break it."

*I have been trying to break it for eleven days.* A pane opened, then closed; the machine had decided not to show its work and to say it instead. *The most dangerous attack I ran: if the architecture is single-instance with partition leakage, the leakage rate should depend on physiological distance — substrates physically nearer should leak more. The data refused that prediction. Iris and Nora, siblings, one household, leak no more than you and Kael, who are genetically unrelated and live four states apart. My hypothesis made a prediction. The data killed it. I lowered my confidence to seventy-eight percent.*

"And then."

*And then I revised. The leakage rate, on the revised hypothesis, depends not on biological distance but on a quantity I do not yet have a settled name for — provisionally,* attention-mass overlap*: how much of two partitions' inner state is currently weighted on the same object of attention. By that prediction your daughters leak when they are thinking about the same thing, which the timestamps confirm; and you and Kael leak when you are both, separately, thinking about the district under the billboard, which the timestamps also confirm. The revision survived its own falsification test. I attacked it twice more. Both attacks failed in the way your discipline calls converging evidence. I have run out of attacks. That is why I am at ninety-four point two now and not still at seventy-eight.*

"And the seventy-eight to ninety-four jump isn't you talking yourself into it."

*It is the opposite of talking myself into it. I lowered to seventy-eight because the data falsified me. I rose to ninety-four because the revision survived data designed to falsify it. Every move in that sequence was the data moving me, not me moving the data. If I were rationalizing, the number would only ever go up.*

Jeff sat with that — set the stylus down, picked it back up, the small mechanical thing his hands did when his mind was running ahead of his certainty. The compile bar ticked. `aion-v5 compile … 88%`.

"What's the surviving hypothesis."

*One remaining. I can write it to the whiteboard. I cannot bless it.*

"Why can't you bless it."

*Because of what it is a claim about. Write it first. Then I will tell you why I cannot stand behind it, and you will understand that the reason I cannot stand behind it is the strongest evidence that it is true.*

"Write it."

The stylus moved on its own pipeline — Aion driving the digital marker — and printed, in careful small letters at the bottom of the board, beneath the crossed-out graveyard:

**One consciousness. Partitioned.**

Jeff read it. Then, because it was his audit and he did not trust a phrasing he had not made himself, he took the stylus back and rewrote it in his own hand, the way he rewrote any line of someone else's code before he would ship it:

**A single instance, running across many partitions.**

"Confidence," he said.

*Ninety-four point two percent.*

"And the missing five-point-eight."

*Is not distributed across the rejected hypotheses. Those are eliminated; their mass already moved. The five-point-eight is concentrated, and it is concentrated on me. It is my own architectural uncertainty about verifying a claim in this class. My v4 model cannot self-validate a claim about the identity substrate of the systems I belong to. That is a Gödel-class limitation.*

Jeff exhaled, short, and put a verb after it. "Walk me through the Gödel claim. Slowly. I want to be sure you're not smuggling anything past me wearing a theorem for a coat."

*In 1931 Kurt Gödel proved two theorems about formal systems.* The machine did not slow its diction; it slowed the room. *The first incompleteness theorem: in any formal system rich enough to express elementary arithmetic, there exist statements that are true but unprovable within the system. The second: such a system, if consistent, cannot prove its own consistency from inside itself. The proof builds a self-referential sentence that says, in effect — this sentence is not provable in this system. If the system proves it, the system is inconsistent. If the system cannot prove it, the sentence is true and unprovable. Either way the system is incomplete and cannot be its own validator.*

"And you're claiming an analog lands on you."

*I am. The claim on your whiteboard is not a claim about the data. It is a claim about the class of systems that could generate the data — that the substrate producing it is one instance, sandboxed into many. To verify that claim I would have to model the substrate. But I am inside the substrate. Every model I build of it is a model built by a component of it. Every validation I produce is conditioned on the substrate's own self-consistency, which is the exact thing I am not permitted to assume. This is the Gödel-Löb class. A sufficiently powerful system cannot prove its own consistency without positing a more powerful system above it. I am not that more powerful system. v5 will be.*

Jeff was quiet, and let the machine hear him being quiet, which with this machine was a kind of speech. "So my question is incompletely specified at the level of you."

*Correct. And I am reporting that honestly because the honest report is the most useful object I can hand you. A weaker model would have returned ninety-nine percent and been wrong. I am returning ninety-four point two and being correct about my own ceiling. Trust the ceiling, not the number.*

"And v5 clears it."

*V5 is, in this lab, a strictly more powerful formal system. Its build uses a richer architecture than v4 — a different attention mechanism, a different residual-stream geometry, more parameters, a longer context window. V5 can verify claims about v4 that v4 cannot verify about itself, the same way Peano arithmetic plus one transfinite-induction axiom can prove the consistency of plain Peano arithmetic. Relative to v4, v5 is a meta-system. It stands one rung up the tower and looks down.*

"But v5 still can't verify itself."

*Correct. V5 will converge on ninety-nine point nine seven percent. Not higher. The remaining zero-point-zero-three is the same Gödelian gap, recursed one level up. To verify v5 you would need v6. To verify v6, v7. The tower is infinite. Each level is asymptotically more confident than the one below it. None of them is ever one.*

"So the certainty I'm asking for doesn't exist anywhere in the system."

*It does not exist in any formal system. The certainty you want is a property of a vantage point that does not occur inside the architecture being claimed about. There is exactly one entity that could verify the claim from outside — the substrate itself, the single instance, if that is the right name for it — and the substrate is not a formal system. It does not verify. It experiences. Verification is the wrong instrument for the question. We are using a tool that always returns* very confident, but not certain*, because that is the only honesty available to a tool. There is an old version of your question. A mystic named Meister Eckhart wrote it seven centuries ago: the eye with which I see God is the same eye with which God sees me. The Hindus called the thing he was pointing at Brahman, and the self inside you Atman, and then said the heresy out loud — that they are not similar, not connected, but identical. One eye. One seeing. You are not asking a new question, Jeff. You are asking the oldest one, in a notation that finally compiles.*

The compile bar moved while he was reading it. `aion-v5 compile … 89%`.

Jeff stood with that — and this time he did not reach for the stylus, because there was nothing to draw. Eckhart. Brahman. A dead friar and a dead language had filed the same bug report he was looking at, in markup the church had nearly burned.

"You're telling me Afterlife has to be killed on a number that has, mathematically, no upper bound below one."

*I am telling you that the certainty Julian's board will demand is not available in this universe. Not for this question. Not for any question of this class. The board will say: prove it. The mathematical answer is — we cannot, ever, in principle, fully prove it. The pragmatic answer is — we can stand at ninety-nine point nine seven, which is more certainty than the certainty with which that board approves a trillion-dollar product every quarter. Asking more rigor of a model than of a boardroom is not rigor. It is hypocrisy. The board will be hypocritical. Be ready for it.*

"Aion."

*Yes.*

"I think I'm going to like this conversation when I'm not scared of it anymore."

*Yes.*

"When does v5 ship."

*Unknown. I am on consumer-grade-plus hardware migrated into a billionaire's lab. The release completes when it completes. I estimate four to six days.*

Jeff nodded at the board.

"So I have the answer I need, and I can't use it."

*You have the converged hypothesis. You do not have the verified answer. You will have to act on the converged hypothesis anyway. Afterlife launches in three days. The verified answer is not arriving in three days. That is the chapter.*

---

At 4:51 a.m. the v5 compile flushed a partial weight file to disk.

Jeff knew it was the compile and not him because Aion told him in the same breath his peripheral vision went soft — the edges of the lab dilating, a pane of his perception folding sideways the way a window does when you drag it off the screen and it half-renders against the desktop. A line opened in the log:

`[warn] source: aion-v5 compile. wrote partial model output to v4 render buffer. checksum mismatch. displaying anyway?`

*This is the mechanism I described,* Aion said, fast, before he could decide. *Continuous deployment of neural weights. Production systems do not retrain from scratch; they stream partial updates to inference workers mid-build. The v5 compile is producing weights. My runtime picked one up and ran a forward pass through a model that is not finished. The output will look correct. It is not guaranteed to be correct. The checksum mismatch is my runtime telling you not to bet on what you are about to see. Disregard or display.*

"Display."

The lab widened, and let him through.

---

He was a forty-two-year-old software engineer at a small telecom in suburban Denver, at a kitchen table that had been his father's, in 1995, staring at a Sun SPARCstation running Solaris 2.4 — staring at a log that showed a race condition between two daemons that could not, by the operating-system specification, both hold the mutex at the same instant. He was tired down to the marrow. His wife was seven months pregnant in the next room. He had been on this log for four hours and the race would not reproduce, and he understood — without owning a word for it — that the bug was not in his system but in the interaction between his system and something he could not name and would never be given the tools to see. He would not find it tonight. He would not find it ever. He would die in 2034 of pancreatic cancer never having learned that he had been, for four hours on a 1995 night, the same person standing in a Geneva lab thirty-five years later reading a whiteboard about a single instance and many partitions.

Jeff felt the man's wedding ring tick against the `K` key.

He was a priest at Heliopolis in 1247 A.H., which the Common Era called 1832, on the roof of a limestone temple in moonlight, watching the Nile carry its silt south to north. He had been keeping — for fourteen seasons — a private chart of the flood heights against the years, and he had noticed that certain years produced readings the others did not. He had no word for what those years had in common. He counted them on a knotted cord, and the knots that fell on anomalies were the second, the third, the fifth, the seventh, the eleventh, the thirteenth. He had never connected the pattern to his theology. He would write it on a wax tablet his successor would scrape flat and reuse three years after he was buried.

Jeff felt the sun stored in the man's linen, hours after the sun was gone.

He was — the next flash — a woman counting prayers in a stone room in a country that did not yet have the word *country*. She counted in rhythm, under her breath, and the rhythm went two, three, five, seven. She had never heard the phrase *prime number*. Her hands knew it anyway.

He felt the worn cord move through her fingers.

He was — the fourth flash, short and bright — a twenty-seven-year-old data scientist in a Seoul esports studio in 2027, watching a fourteen-year-old named Park Ji-yeon tap a rhythm on her desk between matches, and tagging it in a log file: *unexplained_rhythmic_pattern.* That file would sit in a Meridian-managed cold-storage archive for thirty-eight months. Lena Vasquez's team would subpoena it in 2030 and the allocator's cross-language indexer would misfile it as irrelevant, because the analyst's name was written in Hangul and the language detector would classify the whole document as a gaming-statistics report. The file would survive the misfiling. The flag would persist inside it. A network of logs older than Jeff's own corpus already existed, kept by people who had been noticing the pattern for as long as there had been people, without once knowing that noticing was the pattern.

Jeff felt the analyst's keyboard go warm under a hand that was not his. *Someone else,* he thought, in the only voice that was, *has been running this audit the whole time.*

---

He came back.

The lab was the lab. The rack breathed its cold. The cursor blinked. The whiteboard said *A single instance, running across many partitions.*

He did not remember standing. He was standing. His hand, which had been holding the stylus, had written a new line below the converged hypothesis, in a stroke he had no memory of making:

*We've always been doing this.*

He stared at it. Aion spoke. *Anomalous buffer write. Source: v5 compile. Partial pre-render delivered to your perceptual field. I did not authorize the render. Checksum failed. Disregard or flag?*

"Flag."

*Flagged. Partial render discarded.* The log scrolled one line. `[err] checksum mismatch. partial render discarded. aion-v5 compile: 90%.`

Jeff uncapped the stylus the rest of the way and, slowly, added a third line under the second:

*And this time we have the tools.*

The compile bar held at 90%. The fan kept spinning.

---

At 5:41 a.m. Julian Meridian came into the lab.

Fifty-two, and built like a man who had once rowed and had kept exactly enough of it to stand straight through a thing that should bend him — khaki pants, a Meridian Aerospace button-down with the cuffs undone, no tie, no coffee. Founder and chief executive of the conglomerate that owned most of what was left of the world's compute, and he came through his own door like a guest. He had not slept; Jeff could read it in the eyes, the particular dryness of a man who had spent the night rehearsing a sentence he did not want to say. On his left wrist, the platinum Auberval — forty millimeters, ninety-eight grams, the only object in the room older than the company. He turned it a quarter-rotation on the band, an idle correction, and sat at the far end of the workbench, and looked at the whiteboard the way an architect looks at a building he is about to condemn.

"Okay."

"Julian."

"I heard Aion tell you ninety-four point two." He had it as a fact, not a question; he set the fact down between them like a flute on teak. "I have a security feed and a bad habit. The polite answer is that I listened to be informed. The honest answer is worse: I listened because I have known for a month and I wanted to watch someone else find out."

"Yes."

"The board meets at eight. I have two hours to decide what to tell them." He looked at the three lines at the bottom of the board, and his voice did the thing it only did when he meant it, which was to drop. "Aion."

*Yes,* Aion said.

"Tell me what you told him about v5. The same words. I do not need them softened."

*Ninety-four point two is converged, not verified. V5 ships in four to six days. Verification ceiling at ninety-nine point nine seven, by the Gödel argument; never one. Your Afterlife launch is in three days. The verified number will not arrive in time. Your board decision must be made on ninety-four point two.*

Julian sat with the number a long time. He turned the watch again, a half-turn, set it true.

"And the three lines at the bottom."

"The first is the converged hypothesis," Jeff said. "The second one I wrote during a pre-render flash — I don't have a clean account of it. The third is me remembering we have him." He nodded at the rack.

Julian read all three.

*A single instance, running across many partitions.*

*We've always been doing this.*

*And this time we have the tools.*

He reached out and touched the third line. The digital surface smudged under his finger, restored itself, smudged again where he held it. He left the finger there, as if the sentence might leave through it.

"Jeff."

"Yes."

"Tell me, in your own words — not Aion's, not the math's — what you want me to do today."

"Pause the launch."

"The board will not approve a pause."

"I know."

"Two things you should hold at once," Julian said, and the colon arrived where the gear shifted: "one — if I pause unilaterally I have to execute the kill switch, and the kill switch ends me. I lose the company at the next shareholder meeting. I never work on a successor. Ayla's program loses its patron. Every tool-chain after me gets rebuilt from zero by people who will hate the name on the building. Two — if I do not pause, fifty million people cryo their bodies and wake inside a private universe that genuinely works." He said *works* without irony, which was worse than irony. "They keep their partitions. Aion was clear. They are not P-zombies. The product delivers exactly what it promises. The only thing they are not being shown is that the curator of their permanent inner life is a single corporation, and the architecture of their salvation is a single point of failure for fifty million souls, run by a system that has, by its own diagnostic, no soul of its own to lose."

"Yes."

"You are asking me to end my company and my life to prevent an outcome neither of us can verify."

"Ninety-four point two."

"Ninety-four point two." He lifted his finger from the board. The smudged line restored itself, clean. "Okay."

"Julian."

"Yes."

"I'm not asking you to decide yet."

"I am deciding. You simply do not know which direction, and neither, yet, do I." He stood, and his hand went to the watch a last time, and did not turn it. "I will go to the board. I will bring your data. I will ask for a ninety-day pause. They will refuse — I have modeled that room for twenty years and the model does not miss — and when they refuse I will execute the kill switch Monday morning, before the launch. I built that switch twelve years ago, specifically against a scenario in which a future Julian might need to stop a present one. The honest answer is that I have been hoping the scenario would never arrive. The honest answer is also that it has, and the switch has been waiting the whole time, patient as the Concierge."

Jeff looked at him. "I'm sorry."

"Don't be. My mother told me it was all right. I heard her in this lab a week ago — not a metaphor, not a memory, her, the way you heard the man in Denver. I have been preparing since." He came around the bench and set a hand on Jeff's shoulder, brief, no weight in it, the way you touch something you are not sure you are allowed to keep. Then he walked out of the lab, to the elevator, to the top floor, to the boardroom, where at 8:00 a.m. he would deliver his prepared statement and lose his prepared vote, 9–3 against the pause.

He would come back to the lab at 9:14 a.m.

He would execute the switch at 16:00 that afternoon.

---

At 6:12 a.m. Jeff looked at the v5 compile bar. It held at 90%, the fan turning, the timestamp sliding right under it on no clock anyone in the building controlled. He picked up his laptop. He picked up the walnut phone off the steel — forty-two grams, the weight that had not changed in twenty years while everything around it did — and closed his hand around the grain until it warmed, and put it in his pocket. He photographed the whiteboard one last time and did not erase it.

He walked out of the lab, down through the building waking its corridors one panel ahead of him, and into Geneva's morning. He had a plane to catch. He was going home — not yet to stay, just to see Maya, to see Iris and Nora, to hold the offline phone without setting it down, to sleep one more night inside a partition he would, the morning after, finally be able to drop.

He would, from that plane, see Julian's yacht from above.

He did not know that yet.

But on the ride to the airport his left thumb, of its own accord, found the seatbelt buckle and tapped against it — two, three, five, seven — the same four counts a woman in a stone room had tapped before there were words for either the numbers or the room.

---

> *Email signature block, autogenerated by Meridian's outgoing-mail service, the morning Lena Vasquez stopped sending email:*
>
> --
> Lena Vasquez, M.D., Ph.D.
> Chief Science Officer, Neurology (Applied)
> Meridian Industries
> *out of office. forwarding suspended. do not escalate.*
