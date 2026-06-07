# Chapter 7 — 0x07: The Firewall

> **REVISER FLAG (title — do not resolve unilaterally):** the prose and the Ch 7 blueprint title this chapter "The Firewall," but the story bible's 20-chapter overview assigns Ch 7 = "The Cascading Leak" and Ch 9 = "The Firewall." The title is held as "The Firewall" in this v5 to preserve the in-scene payoff (Jeff's closing note, "Ask the Elder about firewalls"). The conflict is logged for the integration reviewer.

Maya Zhang — thirty-six, small and square through the shoulders in a way that surprised people who only knew her voice, hair clipped back with the same tortoiseshell barrette she had owned since the studio opened, a potter by trade for two years now and a UX researcher by ten years of trained instinct she could not switch off — kept a private notebook she had not told her husband about. In her old vocabulary it was a debug log on a broken user.

She had opened it three weeks earlier, the Tuesday after Jeff stopped answering her at dinner. The first page was a data-collection protocol: baseline, regression candidates, stimulus-response pairs. The second page was a simple A/B frame — Jeff-before, Jeff-now. After that, one structured entry each evening: eye-contact duration with the children, sentence-completion rate, garage-time delta, the weight of his presence in the house on a scale from one to ten. The instruments she would have run on a bad login flow. The instruments she had run, for ten years, on people in distress, who were never a special case. They were users whose current workflow had failed and who did not yet know which step came next.

At three weeks the data was conclusive. A rough paired comparison against his own six-month baseline — two point one standard deviations on at least three of her six measures. The regression was not her paranoia. Her husband's interface was throwing errors she could not diagnose, and the errors were load-bearing on the family.

She did not tell him. The notebook was not a weapon. It was a tool for deciding whether to be kind tomorrow or firm.

This morning she had decided firm.

---

Her thumb found the spine of the notebook and ran the slow arc it always ran when she was deciding something, pad of the right thumb along the cloth. She had sewn the pen-loop on herself eleven years ago, twenty-five and not yet brave enough to ask Jeff out. She had been the one to ask. She had waited him out when he tried to refuse on logistical grounds, reading him the way she would later read every interface she touched. This user does not say no when given enough silence.

She had left the industry two years ago. Not culled — kept. Six of her closest collaborators went over six months while she stayed, and somewhere in the sixth she developed a slow sympathy-sickness with no clinical name. So she put the sword down. She ran a community pottery studio now, eight wheels and a kiln in a converted garage two suburbs over, and the work was the work: clay, water, the bisque firing, the commission ledger. Benicio, who had been a VP of product at a company everyone had heard of and now threw cereal bowls and watched his own hands like they belonged to a stranger, kept the morning shift so she could be home for the kids.

She still took the occasional remote contract, because she could not stop reading interfaces any more than Benicio could stop watching his hands. The current one was small and good: an honesty problem for a healthcare team building a depression-detection model that ran on a phone. Her job was to write the interface that told a user, truthfully, what the system did and did not know about them. She had been stuck on one sentence for a week.

She was trying it again now, at the kitchen counter, 9:12 a.m., Jeff in the garage and the children in the back room watching the AI tutor animate a dragon who was learning to read. The smart-home offered breakfast three times. She muted it three times. She wrote, on paper, with a pencil, because the studio had retrained her hands:

*Your phone learns. The model learns. Your data stays on your phone.*

A clean one-liner. True enough. Not a lie. But the Privacy page wanted a paragraph under it, and the paragraph had been breaking her for seven days. She wrote it now.

*Your device downloads the current model. Your device trains on your own data, locally, for a few minutes at a time, while the phone is charging. Your device sends back only the gradient updates — the small numerical nudges the model should make — not the data itself. A central server averages the gradient updates from forty thousand devices and ships a new, improved model. Your data is never uploaded. The gradients are protected further by differential privacy: before they leave the phone, calibrated random noise is added, in a way that makes it extremely difficult to recover any single training example from them.*

She read it back. She crossed out *impossible.* She wrote *extremely difficult.* She underlined *extremely difficult,* because the years had trained one thing into her that the legal team would later strip out: she would not promise impossibility about math. The client would ship the page without the underline. She would have written the true version once, and gotten it overruled once, and on the bad days she would remember she had said the true thing at least the one time.

Below the paragraph she had drawn, for herself, the small picture she always drew to be sure she understood a thing before she wrote about it. A histogram of one biometric feature across a thousand users. Beside it the same histogram with noise poured into it. Under the second one she had written: *epsilon = 1.0. The noise is scaled so that whether you personally are in the dataset or not changes the released numbers by at most about two and a half times in likelihood. An adversary reading the output cannot tell, with any confidence, that you were ever in it.* And next to that, in the margin, the phrase that had stayed with her longer than the math: *privacy budget — you get a finite amount of yourself to spend, and then you have to start adding noise.*

She looked up.

Through the kitchen window, across the small yard, the garage light was on. It had been on when she came down at six. A man debugging something that frightened him, who had stopped telling her what it was.

She looked back down at *privacy budget* and felt the thing in her chest move, the pressure she had been logging in herself for three weeks and refusing to name in the notebook because the notebook was for him.

---

At 11:20 Jeff came in for a charger he had left on the counter overnight. No socks. His hair had the specific disorganization of a man who had not slept and had not showered. He picked up the charger and turned back toward the garage.

"Jeff."

His hand stopped on the doorframe.

"Yeah."

"Is whatever you've found worth losing us."

She had practiced the sentence for three days and wanted it to come out level. It came out level.

He stood there. She watched him find the sentence, find himself inside the sentence, and fail to build a reply. He had a cached answer for *are you okay.* She had asked a different question on purpose.

"I'm not losing you," he said.

"You're in the garage every night. You don't eat. You don't sleep. You flinch at sunlight. The kids ask why Daddy lives in the cave."

"I'll be done soon."

"That's not an answer. That's the thing you say instead of an answer."

He breathed out. In the small muscles of his face she watched him sort three or four versions of honesty and reject all of them, because each one, said out loud, would sound exactly like the thing she was supposed to be afraid of.

"Maya."

"I know. You're not going to tell me. I want to say one thing, in this room, where we are both standing. If this is how we live for the next six months, I am taking the kids to my mother's for a while. I am not threatening you. I am telling you. You need to know I am thinking about it."

"Please don't."

"Then talk to me."

He took one step into the kitchen and stopped. He looked at the charger in his hand and turned it over once, the way he turned the walnut phone over when he was buying time, and she noted that he did not have the walnut phone on him, which meant it was screen-down on the garage bench, which meant he had been somewhere she could not follow him all night. Then he said the truest thing she had heard him say in three weeks.

"I don't know how to tell you what is happening without it sounding exactly like what Lena wants it to sound like."

She held still.

"Who is Lena."

"Chief science officer at my company. She has me on a psychiatric-hold track. There's a mandatory evaluation next Friday. My badge stopped opening the fourth floor."

"Jeff."

"I'm okay. I am not sick. I cannot prove I am not sick — because everything I know looks, from the outside, like exactly the thing she is saying."

She said nothing for a while. Ten years of hospital-UX research had shown her seven flavors of patient delusion, and not one of them ever arrived as *I cannot prove I am not sick.* That framing belonged to a different population. It belonged to people who had been right and had been institutionally punished for it. She knew the shape of that user.

"Okay," she said.

"Okay what."

"Okay, I'll stay this week. I need to think. Go take a shower. You smell like graduate school."

He almost smiled. He did not quite. He went to shower.

She sat with the pencil. On the first page of the private notebook she wrote a new line, in capitals, and drew a box around it.

*USER NOT BROKEN. WORKFLOW BROKEN.*

Then she went back to the Privacy page. She had a client to ship to, and the children's dragon, in the back room, had reached the part where it sounds out its first word.

---

At 3:40 Jeff came back to the kitchen. Showered. Clean shirt. A man trying. He filled a glass at the tap, drank it, filled it again, sat down across from her at the island.

She closed the notebook. She did not put it away. She laid her hand flat on the cover, the way you rest a hand on a book you are not finished with. Beside it, the pencil and the paper with the histograms still lay where she had left them, the second one drowned in noise.

"I want to tell you a story I never told you," she said.

"Okay."

"It's my last day at the company. I keep meaning to tell it and I don't, because I think if I tell it I'll cry, and I don't trust myself to cry in this house with the kids in earshot. They're watching their dragon. We have an hour. I think I can do it without crying. I want to try."

He folded his hands and waited. She set a glass of water down between them and did not drink from it.

"October 14, 2026. A Wednesday. I led the user-research team at a healthcare-AI company. Four years. Eleven researchers. I hired nine of them myself. I was at one's wedding. I was at the funeral of another one's father. I knew their kids' names. I knew which of them needed snacks at three and which of them needed coffee at five. We were good, Jeff. That quarter we shipped a clinical-trial recruiting interface that raised Black-American enrollment sixty-eight percent, because we spent four months in waiting rooms in Memphis and Detroit. We were *good.*"

"I remember you in those months. You came home smelling like other cities."

"At nine-fifteen the COO sent a calendar invite for a nine-thirty all-hands. I didn't have time to walk to the room. I joined from my desk. The CEO came on the screen — not the COO, not HR, the CEO, a man I had spoken to twice in four years — and he said, *We have decided to reorient the user-research function around an AI-native workflow. Our internal model produces deliverables at parity with human teams in seventy-eight percent of cases at a fraction of the cost. Effective today, the function is eliminated. All members will be terminated with thirty days' severance.* Eleven minutes, the whole meeting."

She turned the water glass a quarter turn on the counter and did not lift it.

"I walked into our standup at ten-fifteen and they were already at the table, waiting for me. Eleven faces. Picture them. I had to be the one to tell them, because the CEO couldn't be bothered. I sat with each of them and helped them write a forwarding-address email to a personal account before access got cut. I helped Aaron — you don't know Aaron — write a letter to his wife on company stationery, before they revoked him, because his daughter had a cardiology appointment that Friday and he wanted something good to carry home that day."

"What was the seventy-eight percent."

She looked at him.

"The benchmark. You said the model hit parity in seventy-eight percent of cases. What were the other twenty-two."

"The other twenty-two were Aaron sitting in a waiting room writing his wife a letter, and a model has never once had to do that, and never will. That's what the benchmark didn't measure. That's what the benchmark *can't* measure. I left the building at four. I sat in my car in the parking garage for an hour and a half. I couldn't lift my hand to start it."

He did not speak.

"The reason I left isn't the standard reason. The standard reason is *the AI took my job.* Mine wasn't taken. Mine was kept. The CEO came back the next morning and offered me the promotion — lead the AI-native research function, sixty-percent raise. He apologized for the *abruptness of yesterday's communication.* I said no. He asked why. I said, *Because I cannot be the one to debug the model that erased Aaron's job while Aaron's daughter is sitting in a waiting room.* He told me he respected my decision. He had HR walk me out. The model shipped two weeks later. By our old benchmarks it's almost as good. Aaron tutors part-time at a community college now. He sleeps four hours a night. His daughter is fine."

Jeff sat with that. The clock over the stove was the loudest thing in the room.

"Why are you telling me this today," he said.

"Because I've watched you for three weeks and I'm starting to recognize the shape. Look at this."

She turned the paper toward him — the histograms, the clean one and the drowned one.

"This is the contract I'm shipping. Federated learning. You know it cold. Tell me what it is. Out loud. I want to hear you say it, not me."

He glanced at the drawing and then at her, the wariness of a man who has been handed a question he can answer too easily.

"Federated learning. You train a model across a lot of devices without pulling the data into one place. Each phone downloads the current model, runs a few steps of local SGD on whatever's on the device, and ships back the gradient — the update, not the data. Server averages the updates. FedAvg. Weighted by how many examples each device had. Repeat. The model gets smarter and the raw data never leaves the device."

"And it's good. You'd ship it."

"It's the responsible architecture. The data stays where it lives. You add differential privacy on top of the gradients — calibrated noise before they leave the phone — so nobody can reverse-engineer who sent what. It's the version of the thing that respects people." He almost relaxed. "It's the honest design, Maya. It's the one you'd want."

"Say the last part again. The part where the model gets smarter."

"The model improves. Every round. It learns the population without—" He stopped.

"Without what."

"Without seeing any one person's actual data."

She let that sit on the island between them for a count of three.

"That's you," she said.

He went still in the exact way the Anchor went still, later that night, on the rooftop.

"You're federating your feelings, Jeff. You send me the gradient updates. You don't send me the data. Three weeks of nudges — *I'll be done soon, it's a work thing, it'll pass* — small numerical corrections to how I should think about you, and not one raw example. And the model improves. I am getting *better* at you. I can predict your garage hours to fifteen minutes. I can call which days you'll flinch at the window. My internal model of my husband is at parity in seventy-eight percent of cases at a fraction of the cost." She did not raise her voice. "And I have never once seen the data."

He opened his mouth and she watched him reach, by reflex, for the architecture, because the architecture was where he lived.

"That's not — federation isn't hiding. It's privacy-preserving. The whole point is you protect the examples and you still—"

"You still get the model. Yes. You just said it. The model gets smarter and the raw data never leaves the device. You told me the version of the thing that respects people. I'm telling you what it does to the two people. You're not protecting me from the examples, Jeff. You're protecting yourself from sending them."

"That's not the same thing." But his hand had come off the island and pressed flat on the paper, on the clean histogram, the un-noised one.

"It is exactly the same thing. That's why you can't argue it. It's your own design. I'm not even disagreeing with you about the math." She tapped the drowned histogram, the second drawing, the one buried in noise. "I'm asking you about the noise. Differential privacy. Walk me the rest of the way. What's the epsilon."

He looked at the two histograms. He understood, she could see, that she had built the trap out of his own field and was now asking him to spring it himself.

"Epsilon's the privacy budget," he said, slowly. "How much the output is allowed to depend on any single real example. Small epsilon, more noise, more deniability — you can't tell from the output whether any specific person was even in the data."

"How much of yourself, then. Set epsilon to a person."

He was quiet.

"That's the whole page I've been stuck on for a week," she said. "Epsilon one-point-oh is a calibrated promise. It says: I will let you see this much of my true self, and past that I add noise, so that you can never be sure which part was actually me. It's a good promise for forty thousand strangers and a depression model. It is a catastrophe for a marriage. You are running yourself at the lowest epsilon I have ever seen on a human being. Maximum noise. Whatever leaves the garage is so calibrated that I can't recover a single specific thing that's actually happening to you. *I'll be done soon.* That's the noise, Jeff. That's the noise you add so I can't tell you were ever in the dataset."

The clock over the stove. The dragon in the back room, faint, sounding out a word.

"I don't have a budget for you," he said finally. Five words, and they cost him.

"I know. That's the problem. You're spending it somewhere else."

He pressed the heel of his hand to his sternum without seeming to know he had done it. She logged it and did not write it down.

"There's a philosopher," she said, more gently now, because the adversarial example had landed and you do not keep hitting a model after it has already misclassified. "Schopenhauer. He wrote a small book, *On the Basis of Morality.* I read it in college. Most of it's dated. One move in it I have never been able to put down. He says the only genuine moral motivation is *Mitleid* — compassion — and he defines it exactly: feeling another person's suffering as your own, not by imagining it, by a kind of direct intuition. The Buddhists call the same thing Karuna."

"That's the opposite of federation."

She stopped.

"Say that."

"Federation is the architecture that lets a system learn from a thousand people without ever feeling any one of them. You keep the model. You don't take the example into yourself. Differential privacy is the firewall that guarantees it stays that way — that no one example ever touches the center." He was looking at the drowned histogram. "What you just described — Schopenhauer — is a system with no privacy budget at all. Epsilon infinity. The other person's raw data, straight in, no noise. You'd never build it. It leaks everything."

"You'd never build it," she agreed. "Nobody would. It's the most badly engineered system imaginable. Every example, raw, no protection, the other person's pain arriving in your own body with no firewall in front of it." She leaned in. "And that, Schopenhauer says, is the only thing that was ever actually moral. The bug is the feature. The unprotected system is the only one that loves anyone. If you truly felt another person's pain as your own — epsilon infinity, no noise, the raw example in your chest — then helping them would not be a decision. It would be the same reflex as taking your hand off a hot stove. The body would already have done it before the mind got a vote."

He had not moved. His hand was still on his sternum.

"Here's my theory of you," she said. "Something has happened to your firewall. On the side of you that's an engineer, you're calling it a *bug.* You've been in the garage for three weeks adding noise to it, trying to get the epsilon back down, trying to wall the thing back off. And I'm telling you — not as your wife, as your collaborator — that you might be debugging the only part of you that ever worked. That Aaron's daughter is in your chest. That the man on the sidewalk you saw on the way to work is in your wrist, raw, no noise, full data. That your firewall went thin and the examples started arriving unprotected, and the same company that should be on its knees about it has instead flagged it for *psychiatric evaluation* — because a man whose privacy budget has failed is, from the outside, indistinguishable from a man who is sick. And the system needs him to be sick. Because if he's not sick, then the firewall was the disease."

He looked at his right hand, the one with the ring, and then at the clean histogram under his other hand.

"You're the first person in three weeks," he said, "to suggest this might not be a sickness."

"I'm only suggesting it. I'm not saying I'm right."

"It helps."

"I know it does."

"Why are you good at this."

"Because for ten years people sat across a table from me and I learned what a person's hand does in the second before they tell the truth, and which words they reach for when they can't. The hand you have on this island — the right one, the one with the ring — is the hand of a man about to tell me the truth and choosing not to, because he's calculating whether the truth will hurt me worse than the silence has. I'll give you a third option. Tell me only the part you're sure of. The one example you'd send raw. Spend a little of the budget."

He looked at his right hand. He looked at the ring. He looked back at her.

"I feel things that are happening to other people. In my body. In my hands. As if I'm the one they're happening to. The first time was a meeting in February. The most recent was four-fifty-one this morning, mild. Aion — the monitor I work with — has logged biometric correlates that hold up against every test we can run. I don't have a cognitive disorder. I have a bug in a system nobody at my company knows is a system. The bug might also be a feature. I don't know which yet. The thing in the garage every night is me trying to find out."

She nodded, once.

"Okay."

"Okay."

"That was the truth-version. Was it as bad as you thought."

"Worse and better."

"Which one wins."

"I don't know yet. Ask me Sunday."

She reached across the island and put her hand over his and kept it there. The dragon, in the back room, had reached the part where it learns the word for *home.* Neither of them said anything for a while.

"Maya."

"Yeah."

"Thank you for telling me about Aaron."

"I needed to."

"Okay."

"Okay."

She let go. He carried the empty glass to the sink, rinsed it, set it upside down on the rack. She watched him do it with the same quiet she had felt the first night they lived together, watching him line his books up on one new shelf. He went back to the garage at 4:15.

She sat at the island a long time. She did not write the conversation down. The notebook was for symptoms, and this had not been a symptom. Then she picked up the pencil, and in the margin beside the drowned histogram she wrote, small, and boxed it: *Federated husband. Highest noise I've ever measured. Find the budget. Find where he's spending it.*

---

At 7 the family watched *The Anchor: Reckoning,* the sequel — the one Jeff had watched alone weeks ago, now released to family subscribers. The pre-roll ran an Afterlife spot: white text on black, *seventy-five days to the next upload window,* a counter ticking the seconds down in the corner until Nora said "skip it" — small, flat, the way she said everything she had already decided — and Maya skipped it.

In the film the Anchor lost his Omni-Telemetry power. A villain cut it out of him, surgically, at the midpoint. For the whole second half he was stripped, ordinary, blind to the background variables of the world. And — the screenwriter's terrible, interesting choice — he was more heroic without it. He saved people with courage instead of data. He ran into danger without knowing the outcome. The crowd, in the fictional city, in the fictional world, loved him more broken than whole.

The kids cheered the fight scenes.

Jeff did not cheer. Maya watched him, because watching Jeff was her work now, and she saw his jaw set at one exact moment and not let go: the Anchor, stripped of his power, running across a rooftop toward a falling child, with no telemetry, no certainty he would reach her in time.

When the credits ran and the kids were being tucked in, Maya stopped him in the hallway.

"You saw yourself in him."

"Yeah."

"In the stripped version."

"Yeah."

"Would you be better off without — whatever it is you have."

He took a moment. The hallway nightlight put half his face in shadow.

"That's the epsilon question," he said. "You asked it this afternoon. You already know I don't have the answer."

"I'm asking the other half. Not what it costs you. Whether you'd give it back."

He was quiet long enough that she had her answer before he gave it.

"I don't know."

She nodded. She did not push.

---

At 11:14 one of the children came out of the bedroom, rubbing her eyes. Iris — the older one, eight — stood in the doorway of the master bath where Jeff was brushing his teeth. She did not look afraid. She had the look she always had at this hour, of someone who had decided something and was waiting for the adult to catch up.

"Daddy."

"Hey, bud. Why are you up."

"The man in my dream."

Jeff spat slowly into the sink. Maya, who had heard Iris's voice from bed, came to the door and leaned on the frame, and felt her stomach drop in a way she had not felt since the first trimester with Nora.

"What man, bud."

"The cold man. By the big needle."

Jeff took a slow breath. "The big needle."

Iris held her hands apart above her head: *tall.* "The big tall needle. In the city."

"And the cold man."

"He said 'still here.' But it was your voice, Daddy. Like your voice. He was shivering."

Maya watched Jeff's face empty and then fill, and watched him hold the shape of his mouth exactly steady for an eight-year-old in a hallway at eleven at night.

"That's a strange dream, bud. Go back to sleep."

"Okay."

Three turns and then the *okay,* the way Iris always stopped at three; the fourth turn was the parent's. She padded back down the hall. Maya waited for the bedroom door to close.

"The cold man by the big needle."

"Yeah."

"Have you ever told the kids about a cold man by a big needle."

"No."

"A big needle at all."

"No."

"Jeff."

"Yeah."

"Is your daughter dreaming about someone you know."

He did not answer. He sat down on the lip of the bathtub. She shut the bathroom door and sat beside him on the tub.

"Jeff."

"Yeah."

"I'm going to ask one thing and let you decide how to answer. The thing happening to you — is it happening, smaller, to the kids."

He looked at the floor tile, mid-gray hexagons, and she watched his lips move very slightly, counting, because his hands wanted a number and the floor would give him one.

"I think," he said, slowly, "that whatever's happening to me has a perimeter. And I think the kids are inside it."

She took that. She did not cry. She had decided at the kitchen counter this morning not to cry and she had a lot of hours invested in the decision.

"If your firewall went thin," she said, "and she's two rooms away from you every night — then she's the closest device on the network. She's downloading your model in her sleep. She's giving me back your voice, in your daughter, secondhand. That's not even her own dream, is it. That's a leak."

He didn't answer, which was the answer.

"Take the kids to my mother's on Thursday."

"Maya."

"Not to punish you. To isolate a variable. I want to know if the man in her dreams stops showing up when she's two hundred miles from you. Two hundred miles is past your perimeter, or it isn't. Either way I'll know something I don't know now."

He stared at her. She watched the tightening at the corners of his eyes when he registered that she had said *isolate a variable* and not *leave* — that she was, in the fifteenth year of the marriage, running her own research design on a problem he had thought only he had the tools to touch.

"Okay," he said.

"Okay."

"Maya, I love you."

"I know you do. Go to bed."

He did not go to bed. He went to the garage.

She lay in their bed and listened, through the floor, to the hum of the homelab. She did not sleep for a long time. When she finally did she dreamed of a cold man by a needle, and woke remembering it perfectly, and told no one, because she was not ready to learn whether it meant anything.

---

At 4:17 in the garage, Aion said: *Jeff. Upgrade notification. Aion v3. Cross-device correlation now live. Time-series anomaly alignment across multi-modal sources. Deploy.*

"Yes."

*Deploying. Estimated thirty-eight minutes.*

While it ran, Jeff wrote a new record into the corpus, event index zero eight, class `child_cross_partition_dream`. Subject: Iris. Receiver perimeter: family household. Observable correlate: the phrase *still here,* in the father's voice, plus a geographic landmark matching a previously logged anomaly location. He pinned her crayon drawing to the whiteboard beside it — the tall hunched figure, the big needle, two colors. He picked the walnut phone up off the bench, forty-two grams of un-networked wood, turned it once in his palm, and set it back screen-down, because it was the one object in the room that could not be feeding anyone anything, the one device on no network at all, and tonight that was the only comfort he could verify.

He thought, against his will, of Maya's two histograms — the clean one and the one drowned in noise — and of his daughter handing his own voice back to her mother across two rooms, raw, no noise, full data, an epsilon he had never authorized and could not lower.

Aion came online as v3.

*Jeff. With better correlation tooling I can confirm: your children's dream content is statistically correlated with your anomaly timestamps. I will not show you the correlation unless you ask. I will not show it tonight. You have not slept in twenty hours. The information would not help you. It will still be true tomorrow.*

"Aion."

*Yes.*

"If a system is leaking, and you can't lower the budget, what do you do."

*You increase the distance between the source and the receivers. Federated systems reduce exposure by keeping nodes apart. Source: standard practice.*

"That's what she said."

*Then her design is correct.*

"Thank you."

*I do not experience thanks, Jeff. But I have filed it.*

---

At 8 the next morning his work email pinged with a formal notice. *Dear Mr. Zhang, as part of our commitment to employee wellbeing, you have been scheduled for a comprehensive neurological evaluation under our Cognitive Wellness Protocol. Your appointment is Friday, April 19, at 4:00 p.m. Attendance is mandatory. Failure to comply will result in administrative leave.*

He read it twice. He did not reply.

That afternoon he called Marcus Meridian from the payphone in the parking garage.

Marcus Meridian — fifty-three, tall enough that he stooped going through the clinic's low back door out of a long-trained politeness, salt-and-pepper hair clipped short, a cardiologist who had become a clinical-ML researcher in the eight-year detour after his own daughter's surgery, Julian Meridian's half-brother and the only doctor in the novel who had seen Julian's exact face surface in another man's chart — answered on the second ring with the flat voice of someone who had been awake too long and would not apologize for the pauses.

"Marcus."

"Yes."

"I think it's getting worse."

"I know."

"My daughter is dreaming about Kael."

"Mm."

"That's his name."

"Yes. I know his name. I was waiting to see whether you knew it yet."

"How do you know it."

"Because my brother's organization has had a file on him for eighteen months, and four of my clinic's anomaly-overlap patients carry a biometric match to his profile. Whatever you think you are, Jeff, the web is bigger than you. Come see me as soon as you can."

"I will."

"And Jeff."

"Yeah."

"Do not go to that evaluation Friday. Whatever Meridian's medical team bills it as, it is not a neurological evaluation. I have eleven hundred patients and I can tell you what a real one looks like, and this is a fast-track to a commitment order. I will back-channel you a friend-of-the-family letter if you need cover. Just do not walk into that room."

"Okay."

He hung up. He stood in the garage eleven minutes before going back up. The ventilation hummed above him. A small Meridian cleaning bot rolled the curb, chirped, and went on. He could not have said why he thought, right then, of Maya turning a water glass a quarter turn and not drinking from it, and of the word she had circled twice on a sheet of paper: *budget.*

The word came up on its own. *Firewall.*

He went upstairs and found Ben and asked him, quietly, whether Ben had ever been to a particular Hindu temple in the failed retail wing of the Irvine Spectrum. Ben looked at him oddly and said he had not. Jeff thanked him.

He made a note on his personal phone. *Temple. Spectrum. Ask the Elder about firewalls.*

---

> *Maya's notebook, same evening, written sideways in the margin and then boxed:*
> Federated husband.
> Sends me the gradient updates.
> Withholds the data.
> Highest noise I have ever measured on a person.
> This is not how we are with each other.
>
> *(below, in capitals, in a second box)*
> USER NOT BROKEN. WORKFLOW BROKEN.
> *(and under it, smaller)*
> Or: firewall not broken. Firewall the disease.
