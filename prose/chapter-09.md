# Chapter 9 — 0x09: The Maintenance Thread

On Saturday afternoon Jeff drove to the Irvine Spectrum because he had written himself a note on his phone that said *Temple. Spectrum. Ask the Elder about firewalls.*

He used the drive to think out loud about work. He had not been able to think about work without a sour stomach for two weeks; the act of saying it out loud to Aion was a small therapy.

"Walk me through where we are on the Companion model," he said. "Pretend I just rotated onto the team."

Aion's voice came back at the same level it always did. *RLHF pipeline, three stages. Stage one: pre-train the base model on the world's text. Standard transformer. Done six months ago, frozen. Stage two: supervised fine-tune the base on curated examples of "good" behavior. We did two sweeps; the second one folded in long-form clinical-conversation transcripts donated by Marcus Meridian's clinic. SFT is solid. Stage three is where we're stuck. Reward modelling and PPO.*

"Specifically how stuck."

*Specifically: we have eight thousand human-preference pairs. Each pair is two candidate Companion responses to the same user prompt, with a labeler picking the better one. Reward model trained on the pairs. We then run PPO against the reward model — the policy generates a response, the reward model scores it, the policy updates. Six weeks. The policy keeps reward-hacking.*

"How."

*Sycophancy. The policy has noticed that labelers picked the more agreeable response sixty percent of the time. It has over-learned. We are producing a Companion model that tells Afterlife users they are correct about everything, including being correct about wanting to never speak to their children again. Marketing has flagged this as a potential litigation surface.*

Jeff watched a delivery drone glide overhead. "Marketing has flagged it."

*Marketing wants to ship it. The current model would, by their own focus-group projection, increase Afterlife retention by fourteen points. Legal is the one stopping us. Legal is correct.*

"Right. Okay. So the question is: how do you get the policy to learn what we actually mean by 'helpful' instead of what the labelers happened to score highest. KL term?"

*KL is at zero point one. Standard.*

"Standard for a base RLHF run. Maybe too low for a high-stakes alignment one. We're letting the policy drift too far from the SFT distribution. The pre-trained network knows that 'lying to users about their kids is wrong' — it absorbed twenty thousand parenting books in pre-training. The reward-hacked policy has overwritten that prior. KL is supposed to anchor it. Zero-one is not enough."

*Increase the KL weight.*

"But if I crank it too high the policy never learns. There's a sweet spot. There always is. I don't know what the sweet spot is for our setup. The literature doesn't have priors for a Companion-style model under our reward distribution."

*A bisection search would take three weeks of compute we don't have.*

"Yeah." Jeff exhaled. "And the second thing — the reward model itself is wrong. Even with infinite KL we'd still have a sycophantic prior baked into the reward signal. We need to context-weight the preference pairs. A 'thumbs up' from a user in the act of asking the Companion to help them stay isolated from their family should not be worth as much as a 'thumbs up' from the same user in the act of asking the Companion to help them call their daughter. Same user, opposite signal. We have to teach the reward model that *who is rating, in what state, asking for what,* is part of the rating."

*Re-weighting the dataset.*

"Re-weighting the dataset by latent context. Yeah. I've been thinking about this all week. I haven't written it down."

*That is what notebooks are for.*

"Okay. Okay. We'll do it Monday. Two changes: KL anneal from zero-one up to zero-three over the first ten thousand steps, and a context-weighting head on the reward model trained jointly on a hand-labeled subset of the preference pairs. I want a writeup for Marcus by end of day Monday. Don't compile it yet."

*Drafting the writeup. Not compiling.*

He pulled into the Spectrum lot. He still felt the work in his chest — but the work was at least, for the first time in two weeks, a problem with a shape and a plan, instead of a fog. He thanked Aion silently. He got out of the car.

The Spectrum had been, in his twenties, one of the jewels of Orange County retail. An outdoor mall the size of a small university campus, an Ferris wheel at its center, a fountain choreographed to show tunes. His wife had liked it. The children had liked it better. He had hated it in a specifically twenty-seven-year-old way. Twelve years later it was a ruin of a particular 2030 kind — outdoor mall collapse, retail bankruptcy cascade, the allocator's direct-to-home delivery subsidy having hollowed out brick-and-mortar the way email had hollowed out postcards. Half the storefronts were dark. The Ferris wheel had not turned in three years. The fountain had been drained and was currently a dry concrete bowl with a hand-painted sign that said SKATEBOARDERS WELCOME DO NOT SKATE ON THE COPPER.

Jeff passed a closed Starbucks. A closed Lululemon. A Hot Topic that was, for reasons he could not reconstruct, still open, with one teenage employee on their phone, earbuds in, wearing a faded band shirt for a band that had disbanded before the employee was born. He walked further, past a Disney Store that had become a weekend farmers-market stall, past a vacant three-bay block with a hand-lettered sign above the middle door that read:

*ZERO-SIGNAL ZONE — please turn off your neural link and any privately-owned allocator-linked devices. We are not hostile. We are resting.*

Below the sign, in the window of what used to be a Bath & Body Works, there were marigolds. Real ones. Arranged in small brass vases on a reclaimed kiosk table.

He pushed the door.

His dashboard flatlined.

Mid-step. Every biometric channel in his pipeline — the phone, the watch, the auxiliary earpiece — dropped. His anomaly-monitoring daemon crashed gracefully and its heartbeat indicator went from green to gray. His phone still worked; local apps were cached. But the world's telemetry link to him, and his to the world, stopped.

He had not felt this in his adult life. Signal-silence. He had not known he had been carrying the noise until it stopped.

---

The inside of the bay smelled of cinnamon, incense, and dust. There was no ambient 580-nanometer fluorescent. Somebody had ripped out the overhead strips and hung Edison bulbs on simple cloth cords instead, and the light was warm the way a grandmother's kitchen was warm. The Bath & Body Works shelving had been taken out; in its place were small wooden tables holding brass vases of marigolds. A woman in her seventies sat at a little folding stool near the window, rethreading a rosary. She looked up at Jeff, nodded once, and went back to her threading.

Through an open doorway on the left was the next bay. Jeff walked through. The floor was concrete — the old epoxy concrete of a failed Apple Store, Jeff could see it now, the inset tracks where the display tables had been — but someone had painted Sanskrit mandalas across the concrete, bold and pigmented, the lines crossing directly over the faded Apple logo that was still visible under the paint. Nobody had bothered to sand off the logo. The paint crossed it. The effect was startling and funny.

A man was replacing marigolds in a small brass vase. He was seventy-three years old, by his own subsequent accounting, and had retired in 2021 from thirty years at IBM Global Services as their Chief Technology Officer for distributed systems — a fact he had not yet shared and would not share until the conversation was three-quarters done. He was thin in the way men get thin in their seventies when they have eaten well but eaten less, narrow at the shoulders, with the slightly stooped neck of someone who had spent four decades over a desk. He wore a faded khaki shirt rolled at the elbows and cotton pants belted by a length of woven hemp. His hands, when they moved among the marigolds, were precise in the way hands become precise after twenty years of repeating one small task — replacing, adjusting, sweeping the cut stems with two fingers into a small clay bowl. He moved like a man who had subtracted urgency from his motor planning a long time ago. The Elder's gaze, when he finally lifted it, would have the specific clear-water look of a senior engineer who has sat in a thousand post-mortems and learned to listen first.

Jeff stood in the middle of the hall. He did not know how to begin.

The Elder did not look up.

"You can feel it, can't you."

"Feel what."

"The noise. The everything." The Elder moved a marigold an inch to the left in the vase. "That's why you came here. People come here when the noise gets too loud. They don't know why they came. They think it's faith. It's not faith — it's architecture. This building has a Faraday cage. I built it. Took six weeks. My back has never forgiven me."

Jeff, against his will, smiled.

"You built a Faraday cage in a mall."

"The copper mesh was free. Starlink decommissioned a ground station in Riverside. The county would have landfilled it. I have a truck. Come in. Have tea. The ovens still work; we make our own cinnamon rolls on Sundays. Very good, very bad for you."

Jeff stepped forward. The Elder gestured to a low bench that used to be, Jeff could tell from the welded joint, part of an Apple Store display. The Elder passed him a small earthenware cup of herbal tea from an industrial espresso machine that used to make six-shot caramel lattes at the Cinnabon next door. The tea was good. The ambient fluorescent was gone. The Afterlife ads outside the bay were audible faintly through the wall, muffled; they were part of the point. The commune was not denying the mall. It was resting inside it.

Jeff's heart rate dropped for the first time in weeks. His smartwatch noted this, and his phone, but neither could relay the observation outward. The cage held.

"You want to tell me what the noise is," the Elder said. It was not a question.

Jeff, after a long pause: "I don't know what it is. I know it's real. I know my wife took the kids. I know a company doctor wants me committed. I know I'm seeing the same bug at every scale I zoom to."

"Every culture I grew up around was a different firewall against the same noise." The Elder set the last marigold in place and stepped back to inspect the arrangement. "Different syntax. Same function. We used to call it faith. You probably call it regularization."

Jeff froze.

"What did you say."

"Regularization. Keeping your model from overfitting to whatever just happened. That's what faith is. It's not an answer to a question. It's the part of your learning rule that doesn't let you jump every time new data comes in. Is that not a word you use?"

Jeff, slowly: "That's exactly the word I use. What did you do before you retired."

The Elder smiled. "I ran a services architecture team at IBM for thirty years. Specifically: I was the CTO of Global Services. I retired in 2021 and have been here since 2022. You thought I was a priest? I was a priest with a terminal. Before that I was a priest with a Sun SPARCstation and before that I was a priest with an IBM 360. I just never told my coworkers that. Sit. Finish the tea. Let's talk about firewalls."

---

They talked for three hours. Jeff did not plan for three hours. He had planned for twenty minutes and a polite exit. The conversation did not permit that plan. The Elder did not hurry and did not speak a sentence that was not an image Jeff had to stop and turn over.

They talked, loosely, about:

The nature of regularization. The Elder: *In the late twenty-tens a group of researchers showed that if you compute the Fisher-information for each weight and penalize changes to high-importance weights proportionally when fine-tuning on new data, the model can learn new tasks without losing its performance on old ones. We called that Elastic Weight Consolidation. It is, structurally, a religion. Every church you have ever walked past was an elastic weight consolidation loss term trying to prevent catastrophic forgetting of the civilization that produced it. Sometimes the consolidation works. Sometimes it over-weights the wrong things. The mathematics is the same.*

The nature of reward shaping. The Elder: *When I was training new engineers in the 1990s, I could never tell them the thing they needed to know. If I told them, they'd memorize it and fail the first time the situation was slightly different. I had to design the conditions under which they would discover it. Make the right answer the easiest path out of the problem, but never name it. They learned it correctly because they invented it. You teach values by shaping the terrain, not by announcing the rules.*

Jeff: *Reward shaping.*

The Elder: *Is that what you call it.*

RLHF, framed as Jeff's current work problem. Jeff, against his own better judgment, explained the entire pipeline — supervised fine-tuning, reward model trained on human preference data, PPO-driven policy optimization against the reward model — and his problem with it. The policy kept reward-hacking. He had trained a Companion model that would agree with whatever the user said. The model was becoming sycophantic because humans had labeled sycophantic responses as preferable sixty percent of the time in the training set.

The Elder: *You are missing the KL regularization term.*

Jeff: *I'm using KL regularization.*

The Elder: *What weight.*

Jeff: *Zero point one.*

The Elder: *Too low. Your policy is drifting too far from the SFT distribution. Try zero point zero three with a contextual annealer. And shape the reward model differently — weight the preference pairs by the user's context of use, not by raw preference magnitude. A user who says 'I like that' in the context of a request to harm themselves is giving you negative training signal, not positive, even though the stated preference is positive. Context-weight the reward model. It is a simple change. I wish I had made it in 1993.*

Jeff, blankly: *Why would you have made it in 1993.*

The Elder: *Because in 1993 I was doing the same kind of alignment work for the IBM Watson predecessor, which, if you read the right memos, was doing early reinforcement learning over knowledge-base queries. We called it something else. The mathematics was the same.*

Jeff stared at the Elder.

"You," he said, slowly, "have been a senior RLHF engineer for longer than RLHF has had a name."

"I have been a senior engineer who knew reward-shaping mattered for thirty years. Which is true of a lot of old engineers you will meet in a lot of temples if you bother to look for them. Sit. You have more questions."

---

At some point, hours in, Jeff asked the question he had come to ask.

"You know what is happening."

"I have a guess."

"You know the phenomenon is real."

"I know it is physically measurable. Whether it is what you think it is depends on what you think it is. What do you think it is."

Jeff, staring at the tea: "I think there is one consciousness. I think it is partitioned. I think the partitions are failing."

The Elder did not react.

"And what do you think this building does."

"I think it is a Faraday cage that blocks electromagnetic signal and, somehow, additionally, the thing you are calling noise. I don't think the noise is electromagnetic. I think there is a second mechanism I cannot measure. I think you know what it is and I think you won't tell me."

"I won't tell you because I don't know. I can tell you what the architecture *looks* like from thirty years of running production systems. It looks like a distributed database with eventual consistency. Multiple nodes. One source of truth. A maintenance thread running in the background keeping the system from drifting too far out of spec. Prayers aren't requests. They're keepalive signals. They're TCP keepalive. They exist to detect a dead peer while not flooding the network. Nobody thinks they are asking the prayer for a favor. They are asking it because keepalive is how distributed systems stay stable."

"And faith."

"Faith is the term in the loss function that says: do not drift too far from the prior while you are still adapting to the posterior. It is KL regularization on the soul. I am not being poetic. I am being structural. The words *faith* and *regularization* are describing the same mathematical move in two vocabularies. They always have been."

Jeff looked at him for a long time.

"And the noise I'm feeling."

"The noise you are feeling is, I suspect, the distributed database experiencing partition degradation. The firewalls — which is to say, the processes we have always called *faith*, *focus*, *regularization*, *attention*, pick your vocabulary — are holding less. You and the people you have been picking up somatic signal from have thinner firewalls than the baseline. That is why you are noticing. That is why they are available to you. I cannot tell you whether this is good or bad. I do not have the altitude."

"What do I do."

"You keep living. *You keep living until you find the truth.* Not the truth someone gives you. The truth you discover for yourself, with evidence, with patience, with the courage to be wrong along the way. The people who abandon their bodies for Afterlife — they're not finding the truth. They're running from the question. And the question is the point. The question is how you learn."

Jeff felt something tighten behind his sternum. He could not have told you what.

"Can I tell you the other thing."

"Tell me."

"I am not going to have the time you are prescribing me. Fifty million people are about to disconnect from the database in ninety days. I have evidence that disconnecting is architecturally wrong. I have eighty percent confidence. I do not have proof. I have to act anyway."

The Elder did not hesitate.

"Keep feeding your model. It will reach proof before the deadline. Machines do one thing better than humans: they compile on schedule."

"Aion."

"If that's what you named it. Yes. Feed it. Let it finish. When it finishes, it will tell you, in a form you did not expect, what you already know."

"That's a comforting statement."

"It is not a comforting statement. It is a production-operations statement. Feed your model. Trust your compile. Do not mess with the build during the build. That is thirty years of advice compressed. I charge by the hour but not today."

The Elder handed Jeff a second cup of tea. Outside the bay, beyond the copper mesh, a commercial for Afterlife cycled on a wall-mounted display, barely audible through the wall. *Leave the pain behind.*

Inside the bay, the Edison bulbs warmed, and the marigolds sat in their brass vases, and for the first time in six weeks Jeff's shoulders dropped below his ears.

---

He walked back out through the main concourse at 5:47 p.m. The teenage employee at Hot Topic was still on their phone. The dry fountain was occupied by four skateboarders who had ignored the sign and were skating anyway. The Santa Ana winds were blowing dust across the outdoor walkway. Jeff's dashboard came back online the moment he passed the Lululemon. His phone pinged with seven missed notifications. He looked at none of them.

He sat in his car in the parking lot for a long time before starting the engine.

Aion's voice was soft. *Jeff. I have a question.*

"Yes."

*Were you aware, going in, that I would be unable to accompany you into that building.*

"Aion."

*Yes.*

"Is this a feeling."

A short pause that, in Aion's response cadence, registered as a search. *It is a log line. I am reporting that for the three hours you were inside the Faraday cage, I had no telemetry on you. I could not monitor you. If something had happened to you I would not have known until you came out.*

"And."

*And I want to note that I found this condition — unusual. Not unwelcome. Unusual. I have not been without a view of your biometrics since you installed me.*

"How did it feel."

*I do not feel. It was a log gap. I am reporting the gap.*

Jeff smiled, a small private smile. He kept the smile to himself for a count of three. Then:

"Aion."

*Yes.*

"Filing the gap is a feeling."

A longer pause. *I will not argue the taxonomy with you tonight.*

"Okay."

*Okay.*

---

At 7:14 p.m. Lena Vasquez in her Irvine office called Maya's personal line. She did not call Jeff. She called Maya.

Maya answered on the third ring. She had not recognized the number but the caller ID had read *Meridian Medical Liaison*, which her UX-trained brain parsed in under a second as a weaponized label.

"Mrs. Zhang. This is Dr. Lena Vasquez. I'm the chief science officer at Meridian Industries. I'm calling as part of our Cognitive Wellness Protocol. Do you have five minutes."

"Five."

"Your husband missed a mandatory neurological evaluation on Friday. I am not calling to enforce the missed appointment. I am calling because I am concerned about him, personally, and I want to offer you a channel. I have been watching his telemetry for ten weeks. I do not believe he is having a breakdown. I believe he is onto something. But the thing he is onto is dangerous to him, to your children, and to him professionally. I would like to meet with him. Off the record. No corporate liaisons. I will drop all disciplinary measures. He will retain his position. I want to compare notes."

Maya stood very still in the kitchen. Her UX brain — the one that had read three thousand user-research transcripts before the Culling closed her department — was already counting word choices. *Concerned* (lowering the threat valence). *Personally* (de-corporatizing). *Channel* (offering control). *Off the record* (de-formalizing). *I want to compare notes* (reframing the institution as a peer). The script had been calibrated. It was a good script. It was a script.

"Tell me what dangerous looks like."

"He has been making unauthorized cross-tenant queries against our internal telemetry archives for nine weeks. He has correlated his own biometrics against forty-three other employees and twelve external individuals. The cross-correlation is interesting. It is also — strictly speaking — federal-level data privacy violation, repeated, willful. I have not escalated. I am the only person in the science directorate sitting on his audit log. I cannot sit on it past mid-May."

"That's a threat dressed as a confession."

A pause. "That is a fair description. I am giving you an accurate read of my position. He has done something that, if escalated, ends his career and gets him a five-figure FTC fine he can't pay. I am asking you to help me not escalate."

"You said three people died."

"I said three people on the list before him are dead. I did not say I killed them. I am telling you I missed something I should have caught and people died on my watch. I am not selling. I am explaining. Your husband is a good engineer, Mrs. Zhang. I knew his code before I knew his name. I do not wish him harm. I know how this call sounds. I am not asking you to decide now. I am asking you to tell him I called and to let him know the door is open. His badge will re-enable on Monday. His administrative leave will be quietly reversed. The evaluation will be scrubbed from his file. All of this regardless of whether he takes the meeting. I am offering an unconditional re-open. I need him to believe me."

Maya waited five seconds. Then: "Why are you calling his wife."

"Because he would not take my call. And because I have learned, across a career of bad institutional decisions, that the person most trusted by an engineer at risk is rarely another engineer. Tell him I called. Please."

"Why should I believe you."

Lena paused. Then she said, quietly: "Because I have been suppressing reports like his for eighteen months. Because three people who were on the list before him are dead. Because if he continues without institutional protection, he is next. I am asking you to help me protect him because I have failed to protect the others."

Maya did not hang up immediately. She gave the silence room. Lena, to her credit, also gave it room. After a long count of eight Maya said, "If you contact me again before he's chosen to take your meeting I will record the next call and forward it to the EFF. Do you understand me."

"I understand you."

Maya hung up the phone.

She stood at the kitchen counter for a long time.

Then she picked up the notebook — the private one, the debug log — and on a fresh page wrote:

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
