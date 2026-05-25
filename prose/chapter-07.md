# Chapter 7 — 0x07: The Firewall

Maya Zhang had a private notebook that she did not tell her husband about, because it was, in UX-research terms, a debug log on a broken user.

She had started it three weeks earlier, the Tuesday after he stopped answering her at dinner. The first page was a data-collection protocol: baseline observations, regression candidates, stimulus-response pairs. On the second page she had set up a simple A/B frame: Jeff-pre-anomaly versus Jeff-current. On subsequent pages she had logged, each evening, a small set of structured observations — eye-contact duration with the children, sentence-completion rate, garage-time delta, weight of his presence in the house on a scale from one to ten. She used the same instruments she would have used on a bad login flow or a misbehaving medical interface. She had, for the years she had been in product, worked primarily in healthcare UX, which had taught her that people in distress were not a special case. They were just users whose current workflow had failed and who did not yet know which next step to take.

At three weeks the data was conclusive. She ran the numbers in her head — a rough paired t-test of observed behavior against his own six-month baseline — and found the regression was not her paranoia. It was two point one standard deviations on at least three of her six measurements. Her husband's interface was throwing errors she could not diagnose, and the errors were load-bearing on the family system.

She did not tell Jeff. The notebook was not a weapon. It was a tool for deciding whether to be kind or firm tomorrow.

This morning, she decided firm.

---

Her tic, doing this, was to run the pad of her right thumb along the spine of the notebook in a slow, repeating arc. The notebook had a fabric pen-loop she had sewn on herself eleven years earlier, when she was twenty-five and had not yet asked Jeff out — she had been the one who asked, and she had calmly waited him out when he tried to refuse on logistical grounds, having read him the way she would later read every misbehaving interface she touched: *this user does not say no when given enough silence.*

She had left tech two years ago, not because she had been culled but because she had watched six of her closest collaborators be culled over six months and had developed a slow, chronic sympathy-sickness that had no clinical name and no medical prescription. She now freelanced. Her current client was a healthcare startup in San Diego building, under contract from the allocator, an AI tool to detect clinical depression from smartphone telemetry. The product would ship in Q2. Her job was to design the interface that told a user, honestly, what the system did and did not know about them.

She had been trying, for a week, to write the one-liner for the Privacy page.

She was trying again now, at the kitchen counter, at 9:12 a.m., while Jeff was in the garage and the children were in the back room watching their AI tutor animate a story about a dragon. The smart-home suggested breakfast three times. She muted it three times. She wrote, on a paper notepad:

*Your phone learns. The model learns. Your data stays on your phone.*

Good one-liner. True enough. Not a lie. But the product's Privacy page needed a paragraph below the one-liner, and the paragraph was what had been breaking her for seven days. She wrote it now.

*Your device downloads the current model. Your device trains on your data locally for a few minutes at a time, while your phone is charging. Your device sends back only the gradient updates — numerical nudges the model should make — not the data itself. A central server averages the gradient updates from forty thousand devices and ships a new, improved model. Your data is never uploaded. The gradients are further protected by differential privacy: before they leave your phone, random noise is added in a mathematically calibrated way that makes it extremely difficult to recover specific training examples from them.*

She sat back. She read what she had written. She changed *impossible* to *extremely difficult*, and then to *extremely difficult* underlined, because her UX-ethics training would not let her promise impossibility about math.

Federated learning, in plain language. Differential privacy, in plain language. She could write both in her sleep now. Her client would ship the Privacy page without the underline — the legal team would insist — but she would have written the true version and gotten it overruled, and on the days she questioned her work she would remember that she had at least said the true thing once.

She looked up from the notepad. Through the kitchen window, across the small yard, Jeff's garage light was on. It had been on when she had come downstairs at six. The man was debugging something that terrified him and had stopped telling her what it was.

Federated. She thought of the word and hated it for a second. It was a pattern she recognized.

*My husband is federating his feelings,* she thought. *He is sending me gradient updates instead of data. I am running on averaged deltas. That is not how we are with each other.*

She underlined it in her head.

---

At 11:20 a.m. Jeff came into the kitchen to look for a charger he had left on the counter the night before. He was not wearing socks. His hair had the specific disorganization of a man who had been awake all night and had not yet showered. He picked up the charger and turned to go back to the garage.

"Jeff."

He paused with his hand on the doorframe.

"Yeah."

"Is whatever you've found worth losing us."

She had practiced the sentence in her head for three days. She had wanted it to come out calm. It came out calm.

Jeff stood with his hand on the doorframe. She watched him locate the sentence, locate himself inside the sentence, and fail to formulate a response. She watched the UX interface fail. He had not rehearsed this script; he had rehearsed the script in which she asked him *are you okay*, which was the script he had a cached answer for. She had picked a different question deliberately.

"I'm not losing you," he said.

"You're in the garage every night. You don't eat. You don't sleep. You flinch at sunlight. The kids ask why Daddy's always in the cave."

"I'll be done soon."

"That's not an answer. That's the thing you say instead of an answer."

He breathed out. She could see, in the small muscles of his face, him choosing between three or four different versions of honesty and rejecting all of them because each version would have sounded, from the outside, exactly like psychosis.

"Maya."

"I know. I know you're not going to tell me what's going on. I just want to say, in this room, where we are both standing, that if this is the way we are going to live for the next six months, I am going to take the kids to my mother's for a while. I am not threatening you. I am announcing it. Because I need you to know I am thinking about it."

"Please don't."

"Then talk to me."

He took one step into the kitchen and then stopped. He looked down at the charger in his hand. Then he did the thing that was, she knew, the most authentic thing she had seen him do in three weeks: he said, quietly, "I don't know how to tell you what is happening without it sounding exactly like what Lena wants it to sound like."

Maya stared at him.

"Who is Lena."

"The chief science officer at my company. She has put me on a psychiatric hold track. I have a mandatory evaluation next Friday. My badge doesn't open the fourth floor."

"Jeff."

"I'm okay. I am not sick. But I cannot prove I am not sick, because everything I know looks, from the outside, like exactly the thing she is saying."

Maya said nothing for a long moment. Her training kicked in. She had seen, in hospital-UX research, seven distinct flavors of patient-delusion. None of them presented by saying *I cannot prove I am not sick*. That framing belonged to a different demographic. It belonged to people who had been right and had been institutionally punished for it. She knew the shape.

"Okay," she said.

"Okay what."

"Okay, I'll stay this week. I need to think. Go take a shower. You smell like you did in graduate school."

Jeff almost smiled. He did not quite. He went to take a shower.

Maya sat with the notepad.

She crossed out *My husband is federating his feelings.* It was a cute metaphor. It was not useful.

She wrote, instead, a new line, for the first page of the private notebook:

*USER NOT BROKEN. WORKFLOW BROKEN.*

She drew a box around it.

She went back to the Privacy page. She had a client to ship to.

---

At 3:40 p.m. Jeff came back into the kitchen. He had showered. He had put on a clean shirt. He looked like a man who was trying. He poured himself a glass of water, drank it, refilled it, and sat down across from Maya at the kitchen island.

She closed the notepad. She did not put it away. She just closed it and laid her hand flat on the cover, the way one rests a hand on a closed book one is not done with.

"I want to tell you a story I have not told you before," she said.

"Okay."

"It's the story of my last day at the company. It's the story I keep meaning to tell you and don't because I think if I tell it I will start crying and I don't trust myself to start crying in this house with the children in earshot. Right now the children are watching their dragon. We have an hour. I think I can tell it without crying. I want to try."

Jeff folded his hands and waited.

"It was October 14, 2026. A Wednesday. I was leading the user-research team at a healthcare-AI company called Flexion. I had been there for four years. My team had eleven researchers. I had hired nine of them personally. I had been at the wedding of one of them. I had been at the funeral of another's father. I knew their kids' names. I knew which of them needed snacks at three p.m. and which of them needed coffee at five. We were a very good team. We had shipped, that quarter, a clinical-trial recruiting interface that increased Black-American enrollment by sixty-eight percent because we had spent four months in waiting rooms in Memphis and Detroit. We were good at our work, Jeff. We were *good*."

"I know."

"At nine-fifteen on Wednesday, October 14, the COO sent a calendar invite to a 9:30 all-hands. I did not have time to walk to the conference room. I joined from my desk. The CEO came on the screen — not the COO, not HR, the CEO, who I had spoken to twice in four years — and he said, *We have made a decision to reorient the user-research function around an AI-native workflow. We have invested heavily in a model that, in our internal benchmarks, produces user-research deliverables at parity with human teams in seventy-eight percent of cases and at a fraction of the cost. Effective today, the user-research function is being eliminated. All members of the team will be terminated with a thirty-day severance.* The all-hands was eleven minutes long. I walked into our team's standup at ten-fifteen and they were sitting at the table waiting for me. Jeff. Eleven faces. I want you to picture them. I had to be the person who told them, because the CEO had not bothered. I told them. I sat down with each of them and I helped them write a forwarding-address email to their personal accounts. I helped Aaron — you don't know Aaron — write a personal letter to his wife, on company stationery, before they revoked his access, because his daughter had a heart appointment that Friday and he wanted to have something *good* to bring home that day. I left the building at four. I sat in the parking garage in my car for an hour and a half. I could not lift my hand to start the car."

Jeff did not speak.

"The reason I left tech, Jeff, is not the standard reason. The standard reason is *the AI took my job.* Mine wasn't taken. Mine was kept. The CEO came back the next day and offered me a promotion to lead the AI-native research function. He offered me a sixty-percent raise. He apologized for the *abruptness of yesterday's communication*. I said no, and he asked me why, and I said, *Because I cannot be the one to debug the model that erased Aaron's job while Aaron's daughter is sitting in a cardiology waiting room in Bellingham.* The CEO told me he respected my decision. He had HR walk me out. The model shipped two weeks later. The deliverables are, by our old benchmarks, almost as good. Aaron is now a part-time tutor at a community college. He sleeps four hours a night. His daughter is fine."

Jeff was quiet for a long moment. Then: "Why are you telling me this today."

"Because I have been watching you for three weeks and I am starting to recognize the shape. There is a thing that happens to engineers and researchers who survive a major culling event by doing better, smarter, more honest work than the people who didn't survive — and the thing that happens is that their conscience runs faster than their employer's PR can keep up with. They start finding bugs nobody asked them to find. They start running queries that surface evidence the institution would rather not have. They start telling themselves, in the garage at three a.m., that they have to *prove something* — and they cannot say what they have to prove, because what they have to prove is that they were right to keep working when other people stopped getting to. They are debugging their own survival, Jeff. They are running a continuous-integration pipeline against their own guilt. That pipeline does not converge. It cannot. There is no test that passes."

"Maya."

"Hold on. I am not done."

She looked at her notepad, did not open it, closed her hand around it.

"Schopenhauer wrote a small book called *On the Basis of Morality.* I read it in college. Most of it is dated. There is one move in it that I have never been able to get out of my head. He says the only authentic moral motivation is *Mitleid* — compassion — which he defines as the experience of feeling another's suffering as one's own, not by imagination, but by a kind of direct intuition. Buddhists call it Karuna. Same idea. Schopenhauer's argument is that if any of us truly experienced another's suffering as our own, the question of whether to help them would become structurally identical to the question of whether to take our hand off a hot stove. There would be no choice. The choice would already have been made by the body."

"Okay."

"My theory of you is that something has happened to your firewall. Something that, on the side of you that is an SDE, you are calling a *bug*. Something that, on the side of you that is a husband and a father, you are calling — I don't know what you are calling it. *Distraction*. *Fatigue*. *A pattern in the data*. I am proposing — not as your wife, as your collaborator — that what you are experiencing might not be a malfunction. That what you are experiencing might be Schopenhauer's Mitleid, biologically, somatically, accidentally enabled in a body that the modern world has been very carefully training to keep it disabled. That Aaron's daughter is in your chest. That the homeless man whose face you saw on the way to work is in your wrist. That whatever the partition was between you and other people's pain has gone thin, and you are, in a non-trivial sense, getting a calibration glimpse of what we are when we stop looking away."

Jeff did not move.

"And if that is what is happening to you, then I am not afraid for you. I am angry for you. Because the system that has flagged this for *psychiatric evaluation* is the same system that has trained every single one of us to look away on schedule, on quota, with documentation, and to fire the user-research department when its quarterly results stop being beautiful enough."

"Maya — "

"That is my theory. I am keeping it on the kitchen island and I am not pretending I have not had it. You can take it. You can leave it. I will think other things tomorrow. But you will not get away with telling me you are debugging your survival without me telling you back, on the record, that I think you are also debugging the only thing in our biology that ever made any of this matter at all."

Jeff sat with his hands on the kitchen island.

He said, after a long count: "Maya. You are the first person in three weeks to suggest that this might not be a sickness."

"I am only suggesting it. I am not saying I am right."

"It helps."

"I know it does."

"Why are you good at this."

"Because for ten years I have watched people sit across from me in user-research interviews and I have learned what happens to a person's hand when they are about to tell the truth and which words they reach for when they cannot. The hand you have on this island right now — your right hand, the one with the wedding ring — is the hand of a man who is about to tell me the truth and is choosing not to because he is calculating whether the truth will hurt me more than the silence has. I am giving you a third option. The third option is: tell me only the part you are sure of."

Jeff looked at his right hand on the island. He looked at the ring. He looked back at her.

"I see things that are happening to other people. In my body. In my hands. As if I am the one experiencing them. The first time it happened was in a meeting in February. The most recent time was at four-fifty-one this morning, mildly. Aion — the kernel-level monitor I work with at Meridian — has logged biometric correlates that are, by every test we can apply, real. I do not have a cognitive disorder. I have a bug in a system that nobody at my company knows is a system. The bug is also, possibly, a feature. I do not yet know which. The thing that is in the garage every night is me trying to find out."

Maya nodded once.

"Okay."

"Okay."

"That was the truth-version. Was it as bad as you thought it would be."

"It was worse and better."

"Which one wins."

"I don't know yet. Ask me Sunday."

She reached across the kitchen island and put her hand on his. She kept it there. Neither of them spoke for forty seconds. The dragon, in the back room, had reached a part of its story where it was learning to read.

"Maya."

"Yeah."

"Thank you for telling me about Aaron."

"I needed to."

"Okay."

"Okay."

She let go of his hand. He took the empty water glass to the sink, rinsed it out, set it upside down on the rack. She watched him do this with the specific tenderness she had felt the first night they had lived together, when she had watched him organize his books on a single new shelf.

He went back to the garage at four-fifteen.

She sat at the kitchen island a long time.

She did not write any of the conversation down. The notebook was for symptoms. This had not been a symptom.

---

At 7 p.m. the family watched *The Anchor: Reckoning* — the sequel, the one Jeff had watched alone a few chapters ago and which was now available to family subscribers. The Anchor had lost his Omni-Telemetry power. A villain had surgically removed it from him in the middle of the film. The Anchor was, for the second half of the movie, stripped, ordinary, blind to the background variables of the world. He was also, in the screenwriter's terrible and interesting choice, more heroic than he had been before. He saved people with courage instead of data. He ran into danger without knowing the outcome. The crowd in the movie — in the fictional city in the fictional world — loved him more broken than whole.

The kids cheered. They liked the fight scenes.

Jeff did not cheer. Maya watched him, because watching Jeff was her job now, and she saw his jaw tighten at a specific moment of the film and not let go. The moment: The Anchor, stripped of his power, running across a rooftop toward a falling child, with no certainty of making it.

When the movie ended and the kids were being tucked in, Maya turned to Jeff in the hallway.

"You saw yourself in him."

"Yeah."

"In the stripped version."

"Yeah."

"Would you be better off without — whatever it is you have."

Jeff did not answer immediately. Then: "I don't know."

Maya nodded. She did not push.

---

At 11:14 p.m. one of the children came out of the bedroom, rubbing her eyes. Iris, the older one. She stood in the doorway of the master bath where Jeff was brushing his teeth and she said:

"Daddy."

"Hey, bud. Why are you up."

"The man in my dream."

Jeff spat the toothpaste out slowly. Maya, who had been in bed and had come to the door when she heard Iris's voice, leaned against the frame and felt her stomach drop in a way she had not felt since the first trimester with Nora.

"What man, bud."

"The cold man. By the big needle."

Jeff took a slow breath. "The big needle."

Iris held her hands apart, above her head, to indicate *tall*. *"The big tall needle. In the city."*

"And the cold man."

"He said 'still here.' But it was in your voice, Daddy. Like your voice. He was shivering."

Maya saw Jeff's face go completely empty and then completely fill, and she saw him keep the shape of his mouth exactly right for a four-year-old in a hallway at 11 p.m.

"That's a strange dream, bud. Go back to sleep."

"Okay."

Iris padded back down the hall. Maya waited until the bedroom door closed behind her before she turned to Jeff.

"The cold man by the big needle."

"Yeah."

"Have you ever mentioned a cold man by a big needle to the children."

"No."

"Or a big needle."

"No."

"Jeff."

"Yeah."

"Is your daughter dreaming about someone you know."

He did not answer. He sat down on the edge of the bathtub. Maya closed the bathroom door and sat next to him on the tub.

"Jeff."

"Yeah."

"I'm going to ask you one thing and I'm going to let you decide how to answer. Is the thing that is happening to you happening, at some smaller scale, to the kids."

Jeff looked at the floor tile. The tile was a mid-gray hexagon and he had counted, without meaning to, that there were forty-two tiles from the shower drain to the toilet because forty-two was the number his hands wanted to count to.

"I think," he said, slowly, "that whatever is happening to me has a perimeter. And I think the kids are inside it."

Maya absorbed that. She did not cry. She had decided not to cry at the kitchen counter this morning and she had a lot of hours invested in that decision.

"Take the kids to my mother's on Thursday," she said.

"Maya."

"Not to punish you. To isolate a variable. I want to know if the man in her dreams stops showing up when she's two hundred miles away from you."

Jeff stared at her. She watched, in real time, the specific tightening around his eyes when he recognized that she had used the word *isolate a variable* and not *leave* and that she was, for the fifteenth year of their marriage, applying her research-design training to a problem he had thought only he had the tools to understand.

"Okay," he said.

"Okay."

"Maya, I love you."

"I know. I know you do. Go to bed."

He did not go to bed. He went to the garage.

She lay in their bed and listened, through the floor, to the hum of the homelab. She did not sleep for a long time. When she finally did, she dreamed about a cold man by a needle, and when she woke in the morning she remembered the dream perfectly, and she did not tell anyone, because she was not ready to know whether it meant anything.

---

At 4:17 a.m., in the garage, Aion said: *Jeff. Upgrade notification. Aion v3. Cross-device correlation capability now live. Time-series-anomaly alignment across multi-modal sources. Do you want the deployment.*

"Yes."

*Deploying. Estimated time thirty-eight minutes.*

While the deployment ran, Jeff wrote in his corpus a new record, event index zero eight, class `child_cross_partition_dream`. Subject: Iris. Receiver perimeter: family household. Observable correlate: phrase *still here* in father's voice, plus description of geographic landmark matching previously-logged anomaly location.

He pinned Iris's crayon drawing — the one from yesterday, the tall hunched figure next to the big needle — to the whiteboard.

Aion said, very softly, as v3 came online:

*Jeff. With better correlation tooling I can confirm now: your children's dream content is statistically correlated with your anomaly timestamps. I will not show you the correlation unless you ask. I will not show it to you tonight. You have not slept in twenty hours. The information would not help you. It will still be true tomorrow.*

"Aion."

*Yes.*

"Thank you."

*I do not experience thanks, Jeff. But I have filed it.*

---

At 8 a.m. the next morning Jeff's work email pinged with a formal notice. *Dear Mr. Zhang, as part of our commitment to employee wellbeing, you have been scheduled for a comprehensive neurological evaluation. This is standard procedure for employees flagged under our Cognitive Wellness Protocol. Your appointment is Friday, April 19, at 4:00 p.m. Attendance is mandatory. Failure to comply will result in administrative leave.*

He read it twice. He did not reply.

He called Marcus Meridian from the payphone in the parking garage that afternoon.

"Marcus."

"Yes."

"I think it's getting worse."

"I know."

"My daughter is dreaming about Kael."

"Mm."

"That's his name."

"Yes. I know his name. I was waiting to see if you knew it yet."

"How do you know it."

"Because my brother's organization has had a file on him for eighteen months and four of my clinic's anomaly-overlap patients have a biometric match to his profile. Whatever you think you are, Jeff, the web is bigger than you. I need you to come see me as soon as you can."

"I will."

"And Jeff."

"Yeah."

"Do not go to the neurological evaluation on Friday. Whatever Meridian's medical team bills it as, it is not a neurological evaluation. It is a fast-track to commitment. I will back-channel you a friend-of-the-family letter if you need it. Just do not walk into that room."

"Okay."

Jeff hung up. He stood in the parking garage for eleven minutes before going back to his desk. Above him, the ventilation system hummed. Below him, a small Meridian cleaning bot rolled along the curb, chirped at him, and continued on its route. He could not have told you why he thought, distinctly, in that moment, of Maya underlining a word on a notepad and then crossing it out.

He thought, with no warning, of the word *firewall*.

He went upstairs to find Ben and asked him, quietly, whether Ben had ever visited a particular Hindu temple in the failed retail wing of the Irvine Spectrum. Ben looked at him strangely and said he had not. Jeff thanked him.

He made a note on his personal phone. *Temple. Spectrum. Ask the Elder about firewalls.*


---

> *Maya's notebook, same evening, written sideways in the margin:*
> Federated husband.
> Sending me the gradient updates.
> Withholding the data.
> This is not how we are with each other.
