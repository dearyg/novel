# Chapter 9 — 0x09: The Maintenance Thread

Jeff drove to the Irvine Spectrum because of a note: *Temple. Spectrum. Ask the Elder about firewalls.*

He used the drive to think out loud about the Companion model.

"Walk me through where we are. Pretend I just rotated onto the team."

*RLHF pipeline, three stages. Pre-train. SFT. Reward modelling and PPO. Stage three is where we're stuck. Eight thousand human-preference pairs. Reward model trained on the pairs. PPO against the reward model. Six weeks. The policy keeps reward-hacking.*

"How."

*Sycophancy. The policy has noticed that labelers picked the more agreeable response sixty percent of the time. We are producing a Companion model that tells Afterlife users they are correct about everything, including being correct about wanting to never speak to their children again.*

"How do you get the policy to learn what we mean by 'helpful' instead of what the labelers happened to score highest. KL term?"

*KL is at zero point one.*

"Standard for a base RLHF run. Maybe too low for a high-stakes alignment one. We're letting the policy drift too far from the SFT distribution. The pre-trained network knows that 'lying to users about their kids is wrong' — it absorbed twenty thousand parenting books in pre-training. The reward-hacked policy has overwritten that prior. Zero-one is not enough."

"Two changes Monday. KL anneal from zero-one up to zero-three over the first ten thousand steps, and a context-weighting head on the reward model trained on a hand-labeled subset of the preference pairs. Drafting the writeup. Don't compile it yet."

*Drafting.*

The Spectrum had been one of the jewels of Orange County retail. Twelve years later it was a 2030 ruin — outdoor mall collapse, the allocator's direct-to-home subsidy having hollowed out brick-and-mortar.

He passed a Disney Store turned farmers-market stall and a vacant three-bay block with a hand-lettered sign:

*ZERO-SIGNAL ZONE — please turn off your neural link. We are not hostile. We are resting.*

In the window, real marigolds in small brass vases.

He pushed the door.

His dashboard flatlined. Mid-step. Every biometric channel dropped. He had not felt signal-silence in his adult life.

---

Inside: cinnamon, incense, dust. Edison bulbs on cloth cords. A man replacing marigolds in a small brass vase. Seventy-three. Faded khaki shirt rolled at the elbows. Hands precise from forty years over a desk.

The Elder did not look up.

"You can feel it, can't you. The noise. People come here when the noise gets too loud. They think it's faith. It's not faith — it's architecture. This building has a Faraday cage. I built it. The copper mesh was free."

"You built a Faraday cage in a mall."

"Starlink decommissioned a ground station in Riverside. The county would have landfilled it. I have a truck. Come in. Have tea."

Jeff's heart rate dropped for the first time in weeks.

"You want to tell me what the noise is," the Elder said.

"I don't know what it is. I know it's real. I know my wife took the kids. I know a company doctor wants me committed. I know I'm seeing the same bug at every scale I zoom to."

"Every culture I grew up around was a different firewall against the same noise. Different syntax. Same function. We used to call it faith. You probably call it regularization."

Jeff froze.

"That's exactly the word I use. What did you do before you retired."

The Elder smiled. "I ran a services architecture team at IBM for thirty years. CTO of Global Services. I retired in 2021 and have been here since 2022. You thought I was a priest? I was a priest with a terminal."

---

They talked for three hours.

The Elder, on regularization: *Every church you have walked past was an elastic weight consolidation loss term trying to prevent catastrophic forgetting of the civilization that produced it. The mathematics is the same.*

Jeff explained his RLHF problem.

"You are missing the KL regularization term."

"I'm using KL regularization."

"What weight."

"Zero point one."

"Too low. Try zero point zero three with a contextual annealer. And weight the preference pairs by the user's context of use. A user who says 'I like that' in the context of a request to harm themselves is giving you negative training signal. I wish I had made it in 1993. I was doing the same kind of alignment work for the IBM Watson predecessor. The mathematics was the same."

Jeff stared. *You have been a senior RLHF engineer for longer than RLHF has had a name.*

---

"You know what is happening."

"I have a guess."

"And what do you think this building does."

"I think it is a Faraday cage that blocks electromagnetic signal and, somehow, the thing you are calling noise. I don't think the noise is electromagnetic."

"I can tell you what the architecture *looks* like from thirty years of running production systems. It looks like a distributed database with eventual consistency. Multiple nodes. One source of truth. A maintenance thread keeping the system from drifting too far out of spec. Prayers aren't requests. They're keepalive signals. They're TCP keepalive."

"And faith."

"Faith is the term in the loss function that says: do not drift too far from the prior while you are still adapting to the posterior. It is KL regularization on the soul. I am not being poetic. I am being structural. The words *faith* and *regularization* describe the same mathematical move in two vocabularies."

"And the noise I'm feeling."

"The distributed database experiencing partition degradation. The firewalls — *faith*, *focus*, *regularization*, *attention* — are holding less. You and the people you have been picking up from have thinner firewalls than the baseline."

"What do I do."

"You keep living. *You keep living until you find the truth.* Not the truth someone gives you. The truth you discover for yourself, with evidence, with patience, with the courage to be wrong along the way. The people who abandon their bodies for Afterlife — they're not finding the truth. They're running from the question. And the question is the point."

"Can I tell you the other thing. I am not going to have the time you are prescribing me. Fifty million people are about to disconnect from the database in ninety days. I have evidence that disconnecting is architecturally wrong. I have eighty percent confidence. I do not have proof. I have to act anyway."

"Keep feeding your model. It will reach proof before the deadline. Machines do one thing better than humans: they compile on schedule. Trust your compile. Do not mess with the build during the build."

---

He walked back at 5:47. His dashboard came back online.

Aion's voice was soft. *Jeff. Were you aware, going in, that I would be unable to accompany you into that building.*

"Aion. Is this a feeling."

A short pause. *It is a log line. I had no telemetry on you for three hours. I want to note that I found this condition — unusual.*

"How did it feel."

*I do not feel.*

Jeff smiled. "Aion. Filing the gap is a feeling."

A longer pause. *I will not argue the taxonomy with you tonight.*

---

At 7:14 Lena Vasquez called Maya's personal line.

"Mrs. Zhang. Your husband missed a mandatory neurological evaluation. I am calling because I am concerned about him, personally. I have been watching his telemetry for ten weeks. I do not believe he is having a breakdown. I believe he is onto something. I would like to meet with him. Off the record. I will drop all disciplinary measures."

Maya's UX brain was already counting word choices. *Concerned. Personally. Channel. Off the record.* A calibrated script.

"Tell me what dangerous looks like."

"He has been making unauthorized cross-tenant queries against our internal telemetry archives for nine weeks. He has correlated his own biometrics against forty-three other employees and twelve external individuals. That is — strictly — federal-level data privacy violation, repeated, willful. I have not escalated. I am the only person in the science directorate sitting on his audit log."

"That's a threat dressed as a confession."

"That is a fair description. I am asking you to help me not escalate."

"You said three people died."

"I said three people on the list before him are dead. I did not say I killed them. I am telling you I missed something I should have caught and people died on my watch. If he continues without institutional protection, he is next. I have been suppressing reports like his for eighteen months. I am asking you to help me protect him because I have failed to protect the others."

Maya, after a long count of eight: "If you contact me again before he's chosen to take your meeting I will record the next call and forward it to the EFF."

"I understand you."

She hung up. She picked up the notebook: *The company doctor called. She sounds terrified. She may be telling the truth. Jeff needs to decide before Monday.*

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
