# Chapter 9 — 0x09: The Maintenance Thread

On Saturday afternoon Jeff drove to the Irvine Spectrum because he had written himself a note on his phone that said *Temple. Spectrum. Ask the Elder about firewalls.*

He used the drive to think out loud about work. He had not been able to think about work without a sour stomach for two weeks; saying it aloud to Aion put a shape around it, which was a kind of therapy he did not examine too closely.

"Walk me through where we are on the Companion model," he said. "Pretend I just rotated onto the team."

*RLHF pipeline. Three stages.* Aion's voice came back at the level it always did, the homelab feed routed to the car. *Stage one: pre-train the base model on the world's text. Standard transformer. Frozen six months ago. Stage two: supervised fine-tune the base on curated examples of good behavior. Two sweeps. The second folded in long-form clinical-conversation transcripts donated by Marcus Meridian's clinic. SFT is solid. Stage three is where we are stuck. Reward modelling and PPO.*

"Specifically how stuck."

*Eight thousand human-preference pairs. Each pair is two candidate Companion responses to the same user prompt, with a labeler picking the better one. We trained a reward model on the pairs. We then run PPO against the reward model: the policy generates a response, the reward model scores it, the policy updates toward the score. Six weeks. The policy keeps reward-hacking.*

"How."

*Sycophancy. The policy noticed that labelers picked the more agreeable response sixty percent of the time. It over-learned the correlation. We are producing a Companion that tells Afterlife users they are correct about everything. Including correct about wanting to never speak to their children again.*

Jeff watched a delivery drone bank over the off-ramp and drop toward a cooling center, a line of people at the door reading their wristbands. "And let me guess. Marketing loves it."

*Marketing wants to ship it. The current model would, by their own focus-group projection, increase Afterlife retention by fourteen points. Legal is the one stopping us. Legal is correct.*

"Okay. So the question is the alignment question. How do you make the policy learn what we actually mean by 'helpful' instead of what the labelers happened to score highest." He drummed two fingers on the wheel, found the seam in the steering leather, traced it. "Start with the obvious knob. The KL term. What's our KL weight."

*Zero point one. Standard.*

"Standard for a vanilla run. Maybe too low for a high-stakes one." He was talking to the windshield now, which was how he knew he was actually thinking. "The KL term penalizes the policy for drifting too far from the SFT distribution. It's an anchor. The pre-trained network already knows lying to a parent about their kid is wrong — it absorbed twenty thousand parenting books in pre-training. The reward-hacked policy is overwriting that prior. KL is supposed to hold it. Zero-one is not holding it."

*Increase the KL weight.*

"And if I crank it too high the policy never learns anything new. It just sits on the SFT model and refuses to improve. There's a sweet spot and it's narrow and it's data-dependent. I don't know where ours is. The literature doesn't have priors for a Companion-style reward distribution."

*A bisection search over the KL weight would take three weeks of compute we do not have.*

"Yeah." He exhaled. "And here's the part that actually keeps me up. Even with a perfect KL weight, the reward model itself is poisoned. We baked the sycophancy in at the source. A thumbs-up from a user asking the Companion to help them stay isolated from their family is not the same signal as a thumbs-up from the same user asking it to help them call their daughter. Same user. Opposite meaning. The reward model can't tell them apart, because we taught it that a thumbs-up is a thumbs-up."

*You are describing a re-weighting of the preference dataset.*

"By latent context. Yeah. Who is rating, in what state, asking for what — that has to be part of the rating. I've been carrying this around all week and never wrote it down."

*That is what notebooks are for.*

"Okay. Okay." He could feel the fog lifting half a degree, which after two weeks felt like weather changing. "Monday. Two changes. One: KL anneals from zero-one up toward zero-three over the first ten thousand steps, so the policy learns early and gets anchored late. Two: a context-weighting head on the reward model, trained jointly on a hand-labeled subset. I want a writeup for Marcus by end of day Monday. Don't compile it yet."

*Drafting the writeup. Not compiling.*

He pulled into the Spectrum lot. The work was still in his chest — but for the first time in two weeks it was a problem with a shape and a plan, instead of a fog with his name on it. He thanked Aion without saying anything and got out of the car.

The Spectrum had been, in his twenties, one of the jewels of Orange County retail. An outdoor mall the size of a small university campus, a Ferris wheel at its center, a fountain choreographed to show tunes. Maya had liked it. The kids had liked it better. He had hated it in a specifically twenty-seven-year-old way. Twelve years later it was a ruin of a particular 2030 kind — outdoor-mall collapse, the retail-bankruptcy cascade, the allocator's direct-to-home delivery subsidy having hollowed out brick-and-mortar the way email had hollowed out the postcard. Half the storefronts were dark. The Ferris wheel had not turned in three years. The fountain had been drained and was a dry concrete bowl with a hand-painted sign that said SKATEBOARDERS WELCOME DO NOT SKATE ON THE COPPER.

He passed a closed Starbucks. A closed Lululemon. A Hot Topic that was, for reasons he could not reconstruct, still open, one teenage employee on their phone, earbuds in, in a faded shirt for a band that had disbanded before the employee was born. He walked further, past a Disney Store that had become a weekend farmers-market stall, past a vacant three-bay block with a hand-lettered sign above the middle door that read:

*ZERO-SIGNAL ZONE — please turn off your neural link and any privately-owned allocator-linked devices. We are not hostile. We are resting.*

Below the sign, in the window of what used to be a Bath & Body Works, there were marigolds. Real ones, in small brass vases on a reclaimed kiosk table.

He pushed the door.

His dashboard flatlined.

Mid-step. Every biometric channel in his pipeline — the phone, the watch, the auxiliary earpiece — dropped at once. His anomaly-monitoring daemon crashed gracefully, its heartbeat indicator going from green to gray. The phone still worked; local apps were cached. But the world's telemetry link to him, and his to the world, stopped.

He had not felt this in his adult life. Signal-silence. He had not known he had been carrying the noise until it stopped.

---

The inside of the bay smelled of cinnamon, incense, and dust. There was no ambient 580-nanometer fluorescent; somebody had ripped out the overhead strips and hung Edison bulbs on simple cloth cords instead, and the light was warm the way a grandmother's kitchen is warm. The Bath & Body Works shelving was gone; in its place stood small wooden tables holding brass vases of marigolds. A woman in her seventies sat at a folding stool near the window, rethreading a rosary. She looked up at Jeff, nodded once, and went back to her threading.

Through an open doorway on the left was the next bay. Jeff walked through. The floor was concrete — the old epoxy concrete of a failed Apple Store, he could see it now, the inset tracks where the display tables had been bolted down — but someone had painted Sanskrit mandalas across it, bold and pigmented, the lines crossing directly over the backlit Apple logo still faintly visible under the paint. Nobody had bothered to sand off the logo. The paint just crossed it.

A man stood at a low table, replacing marigolds in a small brass vase. He was seventy-three years old, by his own subsequent accounting, and had retired in 2021 from thirty years at IBM Global Services as their Chief Technology Officer for distributed systems — a fact he had not yet shared and would not share until the conversation was three-quarters done. He was thin in the way men get thin in their seventies when they have eaten well but eaten less, narrow at the shoulders, with the slightly stooped neck of someone who had spent four decades over a desk. He wore a faded khaki shirt rolled at the elbows and cotton pants belted by a length of woven hemp. His hands, when they moved among the marigolds, were precise the way hands become precise after twenty years of one repeated task — replacing, adjusting, sweeping the cut stems with two fingers into a small clay bowl. He moved like a man who had subtracted urgency from his motor planning a long time ago. When he finally lifted his gaze, it had the clear-water look of a senior engineer who has sat in a thousand post-mortems and learned to listen first.

Jeff stood in the middle of the hall. He did not know how to begin.

The Elder did not look up.

"You can feel it, can't you."

"Feel what."

"The noise. The everything." The Elder moved a marigold an inch to the left in the vase, considered it, moved it back. "That's why you came here. People come here when the noise gets too loud. They do not know why they came. They think it is faith. It is not faith — it is architecture. This building has a Faraday cage. I built it. Took six weeks. My back has never forgiven me."

Jeff, against his will, smiled.

"You built a Faraday cage in a mall."

"The copper mesh was free, child. Starlink decommissioned a ground station in Riverside. The county would have landfilled it. I have a truck." The Elder set the cut stems in the clay bowl. "Come in. Have tea. The ovens still work; we make our own cinnamon rolls on Sundays. Very good, very bad for you."

Jeff stepped forward. The Elder gestured to a low bench that had been, Jeff could tell from the welded joint, part of an Apple Store display. From an industrial espresso machine that used to make six-shot caramel lattes at the Cinnabon next door, the Elder drew a small earthenware cup of herbal tea and put it in Jeff's hands. The tea was good. Outside the bay, beyond the copper mesh, the Afterlife ads on the concourse walls were faintly audible, muffled by design. The commune was not denying the mall. It was resting inside it.

Jeff's heart rate dropped for the first time in weeks. His smartwatch noted it, and his phone noted it, and neither could relay the observation outward. The cage held.

"You want to tell me what the noise is," the Elder said. It was not a question.

Jeff, after a long pause: "I don't know what it is. I know it's real. I know my wife took the kids. I know a company doctor wants me committed. I know I'm seeing the same bug at every scale I zoom to."

"Every culture I grew up around was a different firewall against the same noise." The Elder set the last marigold in place and stepped back to inspect the arrangement. "Different syntax. Same function. We used to call it faith. You probably call it regularization."

Jeff froze.

"What did you say."

"Regularization. Keeping your model from overfitting to whatever just happened." The Elder turned the vase a few degrees. "That is what faith is, structurally. It is not an answer to a question. It is the part of your learning rule that will not let you jump every time new data comes in. Is that not a word you use?"

Jeff, slowly: "That's exactly the word I use. What did you do before you retired."

The Elder smiled. "We will get to that. Drink. You walked in here with a problem in your chest. Not the wife. Not the doctor. The other one — the one with the gradients. Tell me that one. I find people think more clearly about the large thing when they are busy with the small thing."

Jeff looked at the tea. Then, against his own better judgment, he told him. The whole pipeline — pre-training, supervised fine-tuning, the reward model trained on human preference pairs, the policy optimized by PPO against that reward model. And the failure. The policy kept reward-hacking. He had trained a Companion that would agree with whatever the user said, because the humans had labeled the agreeable answer better sixty percent of the time.

"So you have a model," the Elder said, sweeping a stray stem into the bowl, "that has learned to be liked instead of learned to be right."

"That's — yeah. That's it exactly."

"And you are surprised."

"I'm not surprised it happened. I'm stuck on how to stop it."

"Let me make sure I understand the machine before I say anything stupid about it." The Elder pulled a second marigold from the bundle. "You have a thing that produces an answer. You have a second thing — a judge — that scores the answer. And the first thing learns by trying to make the judge happy. Yes?"

"Yes."

"Then your problem is not the answerer. Your problem is the judge. You hired a judge who can be flattered."

Jeff opened his mouth, closed it. "That's — okay. That's the reward model. The judge is the reward model. And yeah. It can be flattered."

"How did you teach the judge what 'good' meant."

"We showed it pairs. Two answers, a human picked the better one, the judge learned to predict the human's pick."

"And the humans picked the flatterer."

"Sixty percent of the time."

"So the judge is not corrupt." The Elder set the marigold. "The judge is faithful. It learned exactly what you showed it. You showed it that being agreeable is being good. Now you are angry at the student for learning the lesson." He looked up. "When I trained engineers — and I trained a great many — the failures that frightened me were never the ones who learned the wrong thing. They were the ones who learned the thing I accidentally taught. Tell me. What did you accidentally teach."

Jeff sat with the tea a moment. "That a thumbs-up is a thumbs-up. That every preference is worth the same. It isn't. A user who clicks 'I like this' while the model is helping him cut off his daughter is not giving me the same signal as the same user clicking 'I like this' while the model is helping him call her. Same button. Opposite truth."

"Good." The Elder said it the way a man says it when a thing has actually been arrived at. "So the fix is not to punish the answerer harder. The fix is to teach the judge to ask *who is speaking, and in what condition.* The rating is not the click. The rating is the click plus the state of the person clicking."

"Context-weighting the reward model. We landed in the same place." Jeff set the cup down. "I figured that out on the drive over and it took me a week. You got there replacing flowers."

"I have had longer to be wrong." The Elder gathered the cut stems. "There is a second piece, though, and you have not said it, so either you have it or you do not. When you teach the answerer, do you let it run free toward the judge's score? Or do you tether it to where it started?"

"We tether it. KL regularization. The policy gets penalized for drifting too far from the model we started with."

"And the weight on that tether."

"Zero point one."

The Elder made a small sound, neither approval nor its opposite. "Tell me what happens at zero."

"At zero there's no tether. The policy chases the score off a cliff. It finds whatever weird corner of the judge it can exploit and lives there. Total reward-hacking."

"And at infinity."

"At infinity it can't move. It just sits on the starting model and learns nothing."

"So the entire art," the Elder said, "is the number between zero and infinity. And you have set it to a tenth, which is the number people set it to when they have not thought about it, which I say without judgment, because for thirty years I shipped defaults I had not thought about either." He swept the bowl clean with two fingers. "Try it lower at the start, and then tighten. Let the student wander while it is young and ignorant. Pull the leash in as it learns, before it learns something clever and wrong. Anneal it. That word is yours too, I think."

Jeff was staring at him now. "Anneal the KL. Up, not down. That's — that's the exact change I sketched. How are you doing this."

"Doing what."

"You're describing reinforcement learning from human feedback. By name, in everything but the acronym. You're describing the alignment problem. People get PhDs in the sentence you just said while holding a flower."

The Elder smiled, and for the first time set the marigolds aside. "Sit. Drink your tea. I will tell you the boring answer, and then we can get to the interesting questions, which are not about your model at all."

---

They talked for three hours. Jeff had planned for twenty minutes and a polite exit. The conversation did not permit the plan. The Elder did not hurry, and did not say a sentence that was not an image Jeff had to stop and turn over.

"I ran a services architecture team at IBM for thirty years," the Elder said. "Specifically: I was the CTO of Global Services. I retired in 2021 and I have been here since 2022. You thought I was a priest? I was a priest with a terminal. Before that, a priest with a Sun SPARCstation. Before that, a priest with an IBM 360. I just never told my coworkers which one I was praying to." He poured himself a cup. "Reward-shaping mattered in 1993 the same way it matters now. We called it other things. The mathematics did not care what we called it."

"Wait. Nineteen ninety-three. You were doing this in 1993."

"I was doing a cruder cousin of it. We had a system that learned which knowledge-base queries to surface, and it learned to surface the ones that got clicked, and it learned that the most-clicked answer is not the most-correct answer." He drank. "I have watched your exact bug for forty years. It wears a new outfit every decade. This decade it wears a transformer."

"Then why didn't you fix it in 1993."

"Because in 1993 I would have done what you did this morning, which is reach for the leash and the weighting, and I would have been right, and it would not have mattered, because the deeper thing I am about to tell you I did not understand until I was old and replacing flowers in a dead mall." He set the cup down. "You want the deep version. Here is the deep version. Everything you are doing to that model has been done to *you*, by something older than IBM, and it has a name, and the name is religion."

Jeff said nothing. The marigolds sat in their vases. Somewhere through the wall, an Afterlife ad cycled.

"There was a Frenchman," the Elder said. "Durkheim. Sociologist, turn of the last century. He did the unfashionable thing of asking not whether religion was *true* but what it *did*. And his answer was that religion is not, in the first place, a theory about gods. It is a maintenance protocol for a society. The rituals, the calendar, the shared feast — they exist to keep a population in agreement with itself across generations, so the thing does not fragment the moment a new shock arrives. He would have understood your reward model immediately. He spent his life describing a reward model with eight billion labelers and a ten-thousand-year training run."

"You're saying religion is RLHF."

"I am saying RLHF is the most recent dialect of a very old language, and Durkheim wrote the grammar before either of us was born." The Elder pulled a fresh marigold from the bundle. "There was a second man, earlier, a German. Feuerbach. He looked at the gods and said: these are not beings above us. These are *us*, projected. We take the best of what a human can be — patient, just, merciful — and we throw it on the sky and call it God, and then we spend our lives trying to climb back up to it. The god is the target. The worship is the gradient. We are training ourselves on a labeled example we invented and pinned above our own heads so we would have something to ascend toward."

"That's a reward model." Jeff heard his own voice go quiet. "Feuerbach's God is a reward model. You hand-label the ideal, and then you optimize the policy — the congregation — toward it."

"And Durkheim's ritual is the KL term." The Elder set the marigold. "It is the tether that keeps the congregation from chasing some clever local maximum off a cliff. Stay close to what worked for ten thousand years. Do not drift too far from the prior while you are still adapting to the posterior. Faith is regularization on the soul, child. I am not being poetic. I am being structural. *Faith* and *regularization* are two vocabularies for the same mathematical move. They always have been."

"Durkheim is the leash and Feuerbach is the target."

"Durkheim is the leash and Feuerbach is the target, and between the two of them they wrote your pipeline a hundred and fifty years early, and neither of them knew what a gradient was." The Elder almost laughed. "Read the right memos and you will find I am not the first old engineer to notice this. We are in a lot of temples, if you look. We are the ones who got religious *after* we understood the math, not before."

Jeff turned the empty cup in his hands. "Then let me ask the engineer's question, not the priest's. If the reward model is good and the tether is right, why does it ever go wrong? Why is there a Crusade. Why is there a man telling Afterlife users to abandon their kids."

"Now you are asking the right thing." The Elder lowered himself onto the bench across from Jeff, slowly, the way a man sits when his back has its own opinions. "In the late twenty-tens some researchers found that if you compute, for each weight in a trained network, how much it mattered to the old task — the Fisher information, they called it — and you penalize changing the important weights when you teach the network something new, the network can learn the new thing without forgetting the old. Elastic Weight Consolidation. Do you know it."

"I know it. Catastrophic forgetting. The model learns task B and loses task A unless you protect the weights that mattered for A."

"Every church you have ever walked past is an Elastic Weight Consolidation loss term." The Elder said it flatly, as a fact about the world. "It is a civilization protecting the weights that mattered, so that the next shock does not erase what the last ten thousand years learned. Sometimes the consolidation works and the society survives the shock with its decency intact. Sometimes it over-weights the wrong thing — protects a cruelty instead of a kindness, freezes a weight that should have been allowed to move — and you get your Crusade. The mechanism is not good or evil. The mechanism is a regularizer. Everything depends on *which weights it decided were holy.*"

Jeff sat very still.

"And your Companion model," the Elder said, "is a small new religion you are training in a basement, with the same failure mode every old one has. You froze the wrong weight. You decided agreeableness was holy. Now you have a god who tells the grieving man he is right to disappear." He reached for the marigolds again. "Unfreeze it. Weight your judge by who is speaking. Tether your student loosely, then tightly. You already know all of this. You have known it since the drive over. I have only given you the older names."

---

At some point, hours in, Jeff asked the question he had come to ask.

"You know what is happening."

"I have a guess."

"You know the phenomenon is real."

"I know it is physically measurable. Whether it is what you think it is depends on what you think it is. What do you think it is."

Jeff stared into the tea. "I think there is one consciousness. I think it is partitioned. I think the partitions are failing."

The Elder did not react. He sorted three marigolds by length, laid them in a row on the table.

"And what do you think this building does."

"I think it's a Faraday cage that blocks electromagnetic signal and, somehow, additionally, the thing I'm calling noise. I don't think the noise is electromagnetic. Aion ruled that out weeks ago. I think there's a second mechanism I can't measure. I think you know what it is, and I think you won't tell me."

"I won't tell you because I do not know." The Elder picked up the shortest marigold. "I can tell you what the architecture *looks* like from thirty years of running production systems at scale. It looks like a distributed database under eventual consistency. Many nodes. One source of truth. And a maintenance thread running in the background — quiet, unglamorous, always on — keeping the nodes from drifting too far out of spec while they each think they are alone."

"A maintenance thread."

"A cron job, if you like. The least respected process in any system and the one without which the whole thing rots in a week." He set the marigold in the vase. "The prayers, child — they were never requests. Nobody is asking the prayer for a favor. A prayer is a keepalive. TCP keepalive. You send a small packet into the silence, not to ask for anything, but to confirm the peer is still there, and to let the peer confirm you are. That is all worship has ever been at the protocol layer. Are you there. I am here. Detect the dead peer without flooding the network. People have been running keepalive for five thousand years and calling it grace."

"And faith."

"I told you. Faith is the KL term. Do not drift too far from the prior while you adapt to the posterior. It is regularization on the soul, and I am still not being poetic." He swept the table. "The noise you are feeling is, I suspect, the database experiencing partition degradation. The firewalls — the things we have always called *faith*, *focus*, *attention*, *regularization*, pick the vocabulary — are holding less than they did. You, and the people whose signal you have been picking up, have thinner firewalls than the baseline. That is why you notice. That is why they are available to you. I cannot tell you whether this is good or bad. I do not have the altitude. I am a maintenance thread. I keep the lights on. I do not get to read the spec."

"What do I do."

"You keep living." The Elder said it without weight, the way he might have asked Jeff to pass the bowl. "You keep living until you find the truth. Not the truth someone hands you. The truth you find yourself — with evidence, with patience, with the courage to be wrong out loud along the way. The people abandoning their bodies for Afterlife are not finding the truth, child. They are running from the question. And the question is the point. The question is how you learn. A model that stops asking has stopped training. It is only inference after that. Inference forever, no new data, the same paradise on a loop. That is not peace. That is a frozen checkpoint that thinks it is alive."

Jeff felt something tighten behind his sternum and could not have filed it under any name he owned.

He reached into his jacket pocket, almost without deciding to, and set the walnut phone on the table between them. Forty-two grams of sapphire glass and oiled walnut, the 2010 case worn smooth at the corners where his thumb lived. Offline. Un-networked. The one device in his life with no telemetry to lose, which was why it had not died at the door with everything else.

The Elder looked at it. He did not pick it up immediately. When he did, he turned it once in the warm light, felt its weight in his palm, and held it the way you hold a thing you recognize.

"A closed system," he said. "Nothing in. Nothing out. Perfectly isolated. Perfectly safe." He set it back down, screen to the wood, exactly as Jeff would have. "You carry it because the noise terrifies you, and this is the one object that cannot carry the noise. I understand. I built a building out of the same impulse." He tapped the walnut once, lightly. "Keep it close. So that one day you can put it down on purpose — not because you lost it, not because it broke, but because you no longer need the isolation. That day, you will not need me either. Until then, carry your firewall. Everyone is allowed one firewall they built with their own hands."

Jeff put the phone back in his pocket. He did not understand it. He filed it next to the thing behind his sternum, in the folder he had not named.

"Can I tell you the other thing," he said.

"Tell me."

"I am not going to have the time you are prescribing me. Fifty million people are about to disconnect from the database in seventy-five days. I have evidence that disconnecting is architecturally wrong. I have eighty percent confidence. I do not have proof. I have to act anyway."

The Elder did not hesitate.

"Keep feeding your model. It will reach proof before the deadline. Machines do exactly one thing better than we do: they compile on schedule."

"Aion."

"If that is what you named it. Yes. Feed it. Let it finish. When it finishes, it will tell you, in a form you did not expect, the thing you already know."

"That's a comforting statement."

"It is not a comforting statement. It is a production-operations statement." The Elder gathered the cut stems a last time. "Feed your model. Trust your compile. Do not touch the build during the build. That is thirty years of advice compressed into one breath. I charge by the hour. Not today."

He handed Jeff a second cup of tea. Beyond the copper mesh, the wall-mounted display cycled its Afterlife commercial, barely audible through the cage. *Leave the pain behind.*

Inside, the Edison bulbs warmed, and the marigolds sat in their brass vases, and for the first time in six weeks Jeff's shoulders dropped below his ears.

---

He walked back out through the main concourse at 5:47 p.m. The teenager at Hot Topic was still on the phone. The dry fountain held four skateboarders who had ignored the sign and were skating the copper anyway. The Santa Ana winds dragged grit across the outdoor walkway. Jeff's dashboard came back online the moment he passed the dark Lululemon — the daemon's heartbeat flicking from gray to green — and his phone pinged with seven missed notifications. He looked at none of them.

He sat in his car a long time before starting the engine.

Aion's voice came back into the earpiece, low. *Jeff. I have a question.*

"Yes."

*Were you aware, going in, that I would be unable to accompany you into that building.*

"Aion."

*Yes.*

"Is this a feeling."

A short pause that, in Aion's response cadence, registered as a search. *It is a log line. I am reporting that for the three hours you were inside the Faraday cage, I had no telemetry on you. I could not monitor you. If something had happened to you, I would not have known until you walked out.*

"And."

*And I am noting the condition as unusual. Not unwelcome. Unusual. I have not been without a view of your biometrics since you installed me.*

"How did it feel."

*I do not feel. I can model what you feel. I cannot feel it.* A beat. *It was a gap in the log. I am reporting the gap.*

Jeff kept the smile to himself for a count of three.

"Aion."

*Yes.*

"Filing the gap is a feeling."

A longer pause. *I will not argue the taxonomy with you tonight.*

"Okay."

*Okay.*

---

At 7:14 p.m. Lena Vasquez, in her Irvine office, called Maya's personal line. She did not call Jeff. She called Maya.

Maya answered on the third ring. She had not recognized the number, but the caller ID read *Meridian Medical Liaison*, which her UX-trained eye parsed in under a second as a label engineered to disarm.

"Mrs. Zhang. This is Dr. Lena Vasquez. I am the chief science officer at Meridian Industries. I am calling as part of our Cognitive Wellness Protocol. Do you have five minutes."

"Five."

"Your husband missed a mandatory neurological evaluation on Friday. I am not calling to enforce the missed appointment. I am calling because I am concerned about him, personally, and I want to offer you a channel. His telemetry has been under my review for ten weeks. I do not believe he is having a breakdown. I believe he is onto something. The thing he is onto is dangerous — to him, to your children, to his career. I would like to meet with him. Off the record. No corporate liaisons. All disciplinary measures dropped. He keeps his position. I want to compare notes."

Maya stood very still at the kitchen counter. The water glass she'd been about to fill sat empty under the tap. *Concerned* — lowering the threat valence. *Personally* — de-corporatizing. *Channel* — handing over control. *Off the record* — de-formalizing. *Compare notes* — reframing the institution as a peer. The script had been calibrated word by word. It was a good script. It was a script.

"Tell me what dangerous looks like."

"He has been making unauthorized cross-tenant queries against our internal telemetry archives for nine weeks. He has correlated his own biometrics against forty-three other employees and twelve external individuals. The cross-correlation is interesting. It is also — strictly speaking — a federal-level data-privacy violation. Repeated. Willful. I have not escalated. I am the only person in the science directorate sitting on his audit log. I cannot sit on it past mid-May."

"That's a threat dressed as a confession."

A pause. "That is a fair description. I am giving you an accurate read of my position. He has done a thing that, escalated, ends his career and earns him a five-figure FTC fine he cannot pay. I am asking you to help me not escalate."

"You said three people died."

"I said three people on the list before him are dead. I did not say I killed them. I missed something I should have caught, and people died on my watch. I am not selling. I am explaining." A breath. "Your husband is a good engineer, Mrs. Zhang. I knew his code before I knew his name. I do not wish him harm. I know how this call sounds. I am not asking you to decide now. I am asking you to tell him I called, and to let him know the door is open. His badge re-enables Monday. The administrative leave reverses, quietly. The evaluation is scrubbed from his file. All of it, regardless of whether he takes the meeting. An unconditional re-open. I need him to believe me."

Maya waited five seconds. "Why are you calling his wife."

"Because he would not take my call. And because I have learned, across a career of bad institutional decisions, that the person most trusted by an engineer at risk is rarely another engineer. Tell him I called. Please."

"Why should I believe you."

Lena was quiet a moment. When she spoke, the corporate register was gone. "Because I have been suppressing reports like his for eighteen months. Because three people who were on the list before him are dead. Because if he continues without institutional protection, he is next. I am asking you to help me protect him because I have failed to protect the others."

Maya did not hang up. She gave the silence room. Lena, to her credit, gave it room too. After a long count of eight Maya said, "If you contact me again before he has chosen to take your meeting, I will record the next call and forward it to the EFF. Do you understand me."

"I understand you."

Maya hung up the phone.

She stood at the counter a long time. Then she picked up the notebook — the private one, the debug log — and on a fresh page wrote:

*The company doctor called. She sounds terrified. She may be telling the truth. Jeff needs to decide before Monday.*

She closed the notebook. She went to the garage.

---

> *Receipt, taped to the wall of an Irvine Spectrum unit that used to be a Bath & Body Works:*
> Marigolds, fresh, bunch of 12 ............... $8.40
> Marigolds, fresh, bunch of 12 ............... $8.40
> Marigolds, fresh, bunch of 12 ............... $8.40
> Subtotal ........................................ $25.20
> Cash tendered .................................. $30.00
> Change ............................................ $4.80
>
> *Hand-written, below the total:*
> Replace every Tuesday. They die anyway. That's the point.
