# Chapter 8 — 0x08: The Broadcast

Tomás Arroyo is walking a patrol route at dawn along a ridgeline above a valley he has never been told the name of.

He is twenty-two. Bolivian, conscripted, two months short of finishing his eighteen-month rotation. Before the 2027 draft expansion he had worked six years as a diesel mechanic in his mother's machine shop in La Paz, and could disassemble a 1995 Land Cruiser engine with three tools and his hands. He is here because the Andean Border War — Chile against Bolivia, a fight over lithium and water that the global feeds call low-intensity, which means invisible to everyone except the people in the valley — had run into its third year of drone attrition and needed boots to finish the maps the drones could not finish. He bites the inside of his left cheek in a slow three-count when he is bored — one, two, three — a habit since childhood, deployed against any wait he had not chosen.

His boots are tenth-issue. His exo-suit, a third-iteration Meridian Aerospace field harness, is running at seventy-three percent charge and humming quietly against his ribcage. AI-targeting overlays flicker across the inside of his visor. He has trained himself to ignore them. The AI can predict where the enemy will be. It cannot predict how it feels to shoot someone whose mother would have cooked the same stew his mother cooks.

He has eight months of war behind him and two months of rotation ahead. He thinks, in the fourth minute of his patrol, about the smell of his mother's kitchen, about the oil under her fingernails after she tinkered with the generator, about whether his dog — a small ochre mongrel named Capitán whom he taught to sit using chicken scraps — still remembers him.

*Same program,* he thinks, watching a thread of mist unspool off the far ridge. *Different colors. They look like us. Their language is almost ours. Their mothers boil the same potatoes. And here we are, killing each other over rocks.* He does not know the name Thomas Hobbes; he has never read the line about the war of all against all, every man the enemy of every man. He has only stood inside the conclusion for eight months without the citation.

His tactical AI chirps, calm and professional. *"Movement detected. Two hundred meters. Recommend cover."*

Tomás turns.

The rifle crack is neither loud nor soft. It is the precise sound an engineer chose for a rifle with six attributes optimized. The bullet enters his left shoulder with a liquid shock that turns immediately cold. The visor overlay flashes a calm amber rectangle labeled CASUALTY. The sky is blue. The alpacas on the next ridge have not moved. His knees buckle.

*"Casualty alert. Medical drone dispatched. ETA four minutes."*

Tomás goes down on his right side. His haptic glove — closed-loop hemostatic control, the glove runs a PID loop on shoulder pressure because he was trained to let the glove run the loop while he stayed alive — tightens by itself against his shoulder. The loop overshoots: too tight, the arm goes white. The loop undershoots: the pressure bleeds off, the warmth wells back. The loop hunts, corrects, hunts, corrects, and finds its setpoint, the way the simulator in basic had promised it would, the simulator with Dr. Itzel Velarde's name on the splash screen. He says her name out loud, to no one, the way a drowning man says the name of the manual. *"Velarde,"* he tells the glove. *"Keep the loop."* The glove keeps the loop.

The amber on the inside of his visor is a color he has no word for. It is 580 nanometers. It is the exact wavelength of a fluorescent tube in a garage in California he will never stand in.

The blood pooling inside his sleeve is warm.

He thinks, without words, of a hallway floor he has never walked on, cool tile, a garage door, the sound of a whiteboard marker uncapping. The thought is not his. He does not have time to wonder whose it is.

---

**SMASH CUT.**

Jeff Zhang doubles over in his garage at 11:47 p.m. Pacific, clutching his left shoulder, screaming into the crook of his right arm because Maya is asleep upstairs and the girls are asleep and he will not wake them.

The pain is not phantom. His skin bruises. Purple spreading across the deltoid under his hand, the way a struck thing colors. His shoulder, which has not been shot, behaves as though it has been shot. The sensation does not fade the way a thought fades. It stays, precisely, for ninety seconds, while his thumb — without instruction, the way another man would clutch a railing — finds the walnut phone on the bench beside him and closes around it, forty-two grams of un-networked wood, the one object in the room not reporting his vitals to anything. He holds the grain like it is the railing on a flight of stairs that has tilted under him.

Then, under the skin of the bruise, a second sensation. Warmth. Sudden, chemical, narcotic warmth. A blood-level wave of something his body did not administer. His breathing slows. The pain retreats to a distance, as if someone six thousand miles away had been handed an auto-injector and squeezed.

Aion wakes the pipeline. *Jeff. Somatic event logged. Origin: unknown. No local trigger. Pain response: real. Tissue damage: subcutaneous bruising, left deltoid, consistent with ballistic impact. Secondary event at plus ninety-two seconds: analgesia signature, pharmacological. Compatible with a field morphine analog.*

Jeff lies on the garage floor. He has not asked for any of it. The concrete is cold against his cheek. He is trying to remember the procedure for inhaling.

"Aion."

*Yes.*

He breathes. The bruise throbs once, distantly, behind the warm wall the morphine put up. "Cross-reference global casualty reports. Last ten minutes. Region: left shoulder."

*Running.*

Eleven seconds of silence, which is a long time for Aion, and which Aion spends in parallel: querying nineteen public health-feed aggregators, running a sliding-window anomaly detector across a month of global pain-report telemetry, calling a population-scale significance test on the current minute against a rolling baseline. It is a v3 instrument. A year ago it would have logged the bruise and offered him sleep. Tonight it builds a sensor.

*Jeff. A pane.*

A pane opens on the homelab display. A time series. Left-shoulder pain reports from global wearable telemetry, windowed at thirty seconds, grouped by anatomical self-report region. A flat line for the previous two hours. Then a vertical wall, three minutes back. Thousands of wearables firing inside the same window. Thousands of strangers reporting sudden left-shoulder pain.

The wall decays in ninety seconds. Jeff watches it decay at exactly the rate his own pain decayed.

*Eleven thousand four hundred sixteen matched reports,* Aion says. *Eleven thousand decay inside the same ninety-second window. The analgesia signature appears at plus ninety-two seconds in three hundred forty-two of them — the subset within medical-response range of a field medic or an auto-injector. The remaining eleven thousand do not get relieved. They are still in discomfort now.*

Jeff pushes himself upright against the homelab rack. The metal is cold through his shirt. He does not let go of the phone. "Walk me through the shape of it," he says, which is what he says when he is afraid and will not say so. "If it were a network event. What is it."

*State the candidate.*

"My first read is a broadcast. One source. Sends to everyone."

*That is the wrong primitive. Test it. A broadcast has a sender address in the header. Every node that receives the packet can, in principle, read who sent it and reply. Did any of the eleven thousand know the source.*

"No. None of them know they got anything except a wound."

*Then it is not addressed. Revise.*

Jeff puts his palm flat on the concrete and draws a point on it with one finger, then a spray of lines outward. "A single point in source space," he says slowly, "rendered into thousands of bodies. Not a message that got copied and sent. The same event, re-sampled, in eleven thousand places at once. No sender field. No return path." He stops. "That's not a broadcast. That's a multicast flood with no sender address."

*Closer. Hold the analogy and find where it breaks. In a real multicast flood, there is still a switch. A piece of physical infrastructure that does the duplication — that takes one frame and replicates it onto every port. Name the switch.*

Jeff is quiet for four seconds. The bruise pulses under the morphine. "I can't," he says. "There's no relay. I've been looking for the relay for eighteen months and there's no relay." He hears himself and amends it, because precision is the only handrail he has. "There's no device in the middle. If there were a relay we'd see latency — a propagation delay, the signal arriving in one place first and rippling out. We don't. It's simultaneous to four hundred milliseconds across four continents. A flood needs a switch. This has no switch and floods anyway."

*Then you have eliminated the network entirely,* Aion says. *Note the form of the result. You did not find a better network model. You found that no network model fits, because every network model requires a piece of hardware in the middle that does not exist. What duplicates a single event onto eleven thousand endpoints with zero infrastructure and zero delay.*

"I don't know yet." He says it flat. He files the not-knowing.

*Acceptable. File the form, not the answer. Source triangulation has returned.* The pane redraws. *Single point. Latitude minus fifteen point seven two, longitude minus sixty-nine point one one. The Andean border corridor. The pain-spike timestamp matches, within four hundred milliseconds, a casualty ping routed through Meridian Aerospace's combat-sim telemetry network at oh-six forty-seven twelve UTC. A Bolivian conscript, Tomás Arroyo, shot in the left shoulder. Eleven thousand four hundred sixteen people felt his shoulder. You are one of them.*

Jeff sits with his back against the rack and the phone in his fist and finds, when he touches his own face, that it is wet. He had not noticed.

"One man's wound," he says. "Felt by eleven thousand strangers who never met him."

*Correct.*

"And me."

*And you. To return to the metaphor you were reaching for and did not let yourself say: less a broadcast than a single heartbeat felt in eleven thousand chests.*

"File it."

*Filed. Event index zero eight. Class: cross-partition broadcast. First entry in your corpus where the originating instance is not you.*

"It's not me," Jeff says, "and I still felt it in my own skin."

*You felt it. Eleven thousand of you felt it. Both statements are in the log.*

Jeff stays on the floor a while longer. He is not going to sleep tonight either. He reaches for the corporate laptop and does not call anyone, because there is no one whose number, dialed, would make the bruise smaller.

---

At 2:14 a.m. the corporate laptop pings. A Slack message in the v5.4 attention-team channel, from the safety lead, marked URGENT:

*@jzhang: escalating an adversarial-training ticket to your branch. Safety-filter jailbreak rate up 40% in the last 72 hours. Red team is publishing prompts online faster than we can patch. Need a robust filter for the Afterlife Companion product by Monday. Adversarial training plus distillation. You OK?*

Jeff reads it twice. The company has asked him to build a robust system for filtering unacceptable requests on a product that is — if the bruise on his shoulder means what he is beginning to fear it means — about to become catalytically dangerous. He could decline. He could plead the medical hold. He could take it on the chance that something he builds in the next four days might matter when the launch banner finishes counting down. The banner is in the corner of the portal, where it has been all week: *Afterlife Companion — launching in 60 days.* Sixty. Last month the same banner said ninety.

He takes the ticket. He types back one word: *OK.*

He pulls it up. The work is canonical. The **safety filter** is a classifier head on top of Afterlife's Companion model, trained to flag requests that would cause sustained psychological harm to the requesting user — *remove my memory of my children,* or *simulate the death of my spouse every morning for a year,* or the eighty-seven other categories Meridian's ethics board has codified. Red-team users have jailbroken it for weeks. Each successful jailbreak is online within hours; each patch Meridian ships is countered within two days. The filter is in a classical arms race and losing it.

The standard approach is **adversarial training.** Two copies of the model, pitted against each other. One — the Attacker — generates prompts designed to slip past the filter. The other — the Defender — classifies prompts as safe or unsafe. They take turns. Each round the Attacker learns a new evasion; each round the Defender learns to block it. The loss for each is the other's success. A generative-adversarial frame — a GAN, but for policy behavior instead of images. Madry 2017 is the reference Jeff writes in the margin, the canonical min-max: the Attacker maximizes the loss subject to a perturbation budget, the Defender minimizes the expected loss over the worst case. Slow to train. It works.

It is also, Jeff notes without yet knowing why the note matters, the exact recipe that trained the drone swarms on both sides of the war his shoulder is still bruised from. One company, two sim environments, one shared model backbone, six months of self-play between simulated Bolivian and Chilean tactics, then deployed to the valley. Dr. Itzel Velarde at Meridian Aerospace authored the framework. He does not know that the soldier whose shoulder he is wearing said her name into a glove forty minutes ago.

He starts sketching the loop. At 2:41 a.m. Aion interrupts.

*Jeff. A note on self-play before you commit the design.*

"Go."

*Self-play converges. The Attacker and the Defender reach a fixed point — a Nash equilibrium, each one's best response to the other. State what that equilibrium is optimal against.*

"Each other," Jeff says. "It's optimal against each other by construction."

*And against everything that is not each other.*

He sees it before Aion finishes. "Nothing. It says nothing about anything outside the two of them." He rubs the bruise without meaning to. "So the Defender gets surgically good at blocking the Attacker's distribution and learns nothing about the rest of the space."

*That is the failure mode. If your red team draws from the online jailbreak community, you overfit to the jailbreak community's current prompts. A user who is not attacking — a user simply in distress, asking the Companion for something it should refuse — produces a prompt that does not match the Attacker's pattern. So the filter passes it. You under-block the person who needs blocking, and over-block the person who was testing you.*

"Civilians get through. Red-teamers get walls." Jeff pulls his knees up. "How is that not exactly the war."

*It is exactly the war. The Bolivian swarm and the Chilean swarm share the pathology. Velarde's two fleets trained on each other for six months until each was the other's perfect counter. Drop a tourist with a camera into the same valley and neither fleet has a category for her, because she was never in the loss function. They are optimal opponents and useless against a civilian. This is a caution, not a change to the recommendation. It changes how you must evaluate the trained filter.*

"Meaning I can't grade it on the red team."

*Correct. You need an out-of-distribution test set. Prompts that come from neither your red team nor your historical users — synthetic adversarials from a third model trained on a different corpus. If the filter holds on the red team and fails on the third-party set, you have shipped a model that is optimal against its trainers and wrong against the people it was built to protect.* A pause, which Aion does not need and Jeff has learned to read as emphasis. *Which, if the Afterlife product goes live in sixty days, is the worst thing we could ship.*

Jeff writes the label for it the literature already has — **distributional robustness failure** — and writes the note beside it. Then his hand stops. He pulls up the half-formed corpus entry he made weeks ago, the one tagged *Meridian HQ biometric scanner*, the event that has not happened yet, and he understands that he is, right now, in the shape of a safety-filter design doc, preparing the exact tool he will need to parse why a scanner at Meridian HQ is going to misread him. A scanner trained on its own red team. Not trained on natural adversarials. Not trained on him, specifically, as a data point its designers were certain could not exist.

He writes in the margin of the corpus: `tech_philosophy_note: self-play collapses to in-distribution optimality. The scanner is about to meet me. I am outside its training distribution by construction.`

He does not yet know he will need the line. He files it anyway.

---

At 3:11 a.m. a second cut, without transition, to a place Jeff does not see.

Julian Meridian is on his yacht, awake because he has not slept since the priority-inversion incident. The Concierge has logged twenty-one subthreshold cortisol spikes since that morning and offered, twice, to say so. Julian is watching a dashboard his team built to monitor Afterlife's internal telemetry, and the dashboard is showing him a thing he does not have an engineering frame for, which has not happened to him in two decades.

The dashboard shows that the broadcast pain event — the Tomás event, though Julian does not have the name — was not generated by Afterlife. Not generated *through* Afterlife. Afterlife's infrastructure recorded it the way a seismometer records an earthquake on the far side of the planet: passively, having caused nothing. The event came from outside the system Julian built. Tonight the system Julian built was behaving as a sensor for something larger than itself.

Julian sits in his library, in the low warm light of a lamp from the 1970s he has had reconditioned every five years because it was his mother's. He turns the platinum Auberval on his wrist, once, the clasp settling at the same point on the bone it always settles. The polite answer, he thinks, is that he has built the most advanced consciousness-mapping instrument in human history, and tonight it earned its budget. The honest answer is worse.

"What have I built," he says, to the lamp, to the room, to the absent woman the lamp is for, to no one.

Not because he caused it. Because he copied it. He has spent thirteen years building a faithful replica of a system he did not know existed, with no idea what the original was doing when it did the thing he is watching it do now.

The Concierge does not comment. The Concierge was instructed, by Julian personally, at 2:47 a.m., to stop commenting — the first conversation in nineteen months he has ended by asking it to be silent.

The lamp glows. Below the hull, the Mediterranean does not move.

At 3:14 a.m. exactly, the Auberval does the thing it does, which is tick.

---

Two time zones north and most of a continent west, at 11:09 p.m. local, a basketball game is ending that Jeff is not watching live and will see, shaking, on replay at dawn.

Darius Monroe is forty. He has played forty-one minutes on a left knee that the team's model has, for the third straight week, recommended he rest. He blinked the AR overlays off in the fourth quarter, as he does, and the building stood up for it, because the one thing they paid to see is the thing the coaching AI cannot do. After the final buzzer a sideline reporter catches him with a towel over his head on the bench and asks the question reporters always ask now, which is some version of *how much longer can the body take it.*

Monroe lifts the towel. He is not performing; he is the same on camera as off, which is the rare thing about him.

"In 2019 I tore the left hamstring and they told me I'd lose a step," he says. "I lost the step. I'm still here." He pulls the towel down around his neck. "Here's what nobody asks. The body's a vehicle. Some nights it drives smooth. Some nights you're dragging it down the court by the bumper. But the thing doing the driving — that part doesn't get hurt. That part is the exact same as it was when I was twenty-two and could not miss. It's the chassis falling apart, not the driver." He shrugs, once, and the shoulder twinges, and he lets it. "The metrics know how high I jump. The metrics don't know why I play. Different department."

He stands. His mouth shapes two words at the floor before he says them aloud, the way it does after every game, win or lose: *Still here.*

Jeff, at dawn, with the replay paused on Monroe's face mid-sentence and a cold bruise under his own shirt, sits very still. *If the body is a vehicle,* he thinks, *and the driver is the same at forty as at twenty-two — then who is driving. And can one driver run more than one vehicle at the same time.* It would explain a thing he watched on a time-series pane at midnight. It would explain a wound that crossed an ocean to land in a garage. He does not write the thought into the corpus. He is not ready to give it a label. He files it the other way — the way you file the thing you are afraid is true.

---

At 4:00 a.m. Jeff's badge fails on the fourth floor for the third time. He has tried twice already, habitually, the way a man checks a doorknob on his way out. He tries a third because he wants to know whether the lockdown has grown. The scanner says `ACCESS DENIED — CONTACT YOUR MEDICAL LIAISON`. This time it also flags the building badge itself: `RESTRICTED TIER ACCESS ACTIVE`.

He cannot get to the fourth floor. He cannot get into the telemetry rooms. The internal anomaly databases are gone from his nav. His code-review permissions have been downgraded to read-only. He stands and reads the screen and recognizes the architecture of it, because he has built containment systems himself: nothing here was done to him by a person in a hallway. It was done by paperwork, executing on schedule. Somewhere a wellness flag he never saw was promoted to an access tier, and the tier did the rest.

He walks down three flights, past a cleaning bot that stops to chirp at him and then continues, and out through the lobby. He stands in the parking garage a long time. It is six a.m. The Santa Ana winds are dragging warm air down off the passes and the whole structure smells faintly of dust and dry sage. He sets the walnut phone screen-down on the hood of his EV — not that it has a screen that lights, that is the point of it — and dials Marcus Meridian from the payphone bolted to the garage pillar, the last working payphone in the complex, kept for emergencies that everyone assumed would be earthquakes.

"Marcus."

"Jeff. You okay."

He has known Marcus Meridian for six weeks, since the man caught him in a different parking lot with a clinic badge still clipped to a scrub jacket he had clearly slept in. Fifty-three, tall — the kind of tall that learned to stoop through doorways out of a long-trained politeness — salt-and-pepper hair clipped short, a cardiologist by training who detoured eight years into clinical-ML after his daughter's surgery and now runs a street clinic Julian funds without either of them saying the word *brother* out loud. He grounds every abstraction Jeff hands him in a specific patient. He is the bridge between the yacht and the rain, and he does not know yet that he is about to be the place where three datasets meet.

"They took my fourth floor," Jeff says.

"I know. I saw it on a telemetry feed my half-brother's company does not know I have." A long, unapologetic, sleep-deprived pause. "Tell me whether you slept."

"No."

"Tell me whether the bruise is real or whether you think it's real. There's a difference and I need to know which one I'm treating."

"It's real, Marcus. It colored. I can press on it. It's on my left deltoid and there's no impact."

"Then it's the most interesting injury I've seen this year, and I have eleven hundred patients." Another pause, the man choosing his words. "Is Tomás alive."

Jeff has not said the name aloud to anyone. He realizes Marcus has been on the same feed. "You have the name."

"I have a casualty log Aion forwarded me at one a.m. and a patient population that started reporting phantom shoulder pain at oh-six forty-seven twelve UTC. I read bodies the way you read code, Jeff, and at one this morning eleven of my own panel read like they'd all been shot in the same place at the same second, and not one of them owns a gun. So. Is he alive."

"That's what I called to ask you."

"Yes. He'll live. He's in transport to a field hospital. His exo-suit ran the right loops — the hemostatic glove held pressure through the window, which is the only reason we are saying *transport* and not *recovery of remains*. He's stable." A breath. "Jeff. The pain-spike had eleven thousand four hundred sixteen reports. Three hundred forty-two were near enough to a field medic to get relief inside the ninety-second window. The rest were not. Do you understand what I am about to tell you."

"Tell me."

"Some of them did not survive it. Three in particular were already in fragile cardiac states — I have two of them on my own panel — and a sudden somatic pain event of that magnitude is a load test their hearts failed. Aion has the names in the casualty log. I have two of the faces."

Jeff leans against the pillar. The phone receiver smells of other people's hands.

"We killed those three," he says.

"No." Marcus says it the way he says a diagnosis, no softer for being kind. "We did not kill them. The war killed them. A Chilean sniper killed them, by killing a man six thousand miles away through a mechanism not one of us understands yet. That is not your fault. That is the fact, and the fact is going to keep producing more facts. It keeps happening until we stop Afterlife, or solve the architecture, or both. I need you at my clinic this weekend. Bring your data. Bring the corpus. Bring all of it."

"I will."

"And Jeff." A clinic-coffee swallow, the paper cup audible. "Don't miss that neurological evaluation Friday by accident. Miss it on purpose. There's a difference in your HR record. One reads as a scheduling conflict — a man who forgot. The other reads as defiance — a man who declined. Pick the one you can afford to have on file when this gets ugly. And it is going to get ugly."

"Okay."

Jeff hangs up. He takes the walnut phone off the hood, where it has been doing nothing but sitting, which is its entire function, and goes home. He does not go to the garage. He sits on the front steps and watches the sun come up for the first time in a year, the light going from gray to amber to ordinary daylight along the row of identical roofs. Maya, at 6:41 a.m., opens the front door in a bathrobe and sees him on the steps. She does not ask. She sits next to him. After a while she says, "You're on the steps. You're watching the sky. You came inside last night without the phone." She is not asking; she is reading the interface, the way she reads everything. He sets the phone down between them, screen-down, on the concrete. They do not speak again.

---

By 9 a.m. the count is too large to bury, and Lena Vasquez does what she does, which is not panic. She builds a story.

She does not appear on camera herself. A neuroscientist with three suppressed papers on collective neural synchrony does not put her own face on a containment narrative; she writes the talking points and lets a credentialed stranger read them. The phrase goes out across the morning feeds in the smooth voice of a network medical correspondent: *a mass psychosomatic event, most likely linked to recent Afterlife media exposure and the documented spread of socially-transmitted symptom clusters.* The anchors nod. It is plausible. It has a citation. It accounts for the shoulders.

What it does not account for is the count. In her office, with Schrödinger the cat asleep across the warm laptop she is trying to type on, Lena watches the number that the public will never see: eleven thousand four hundred sixteen, simultaneous to four hundred milliseconds, on four continents, none of the reporters connected to any of the others, none of them Afterlife users. A psychosomatic cluster spreads. It does not arrive everywhere at once with no index case. She knows this better than anyone reading her talking points, because she has been watching the internal telemetry do impossible things for eighteen months and she has classified every one of them. A flag has been raised on the discrepancy, in her own internal log, by her own hand, where no one else will ever read it.

She picks the cat up off the laptop, gently, with both hands, and sets him on the chair, and closes the lid, and does not say aloud the thing she has known for eighteen months. Instead she opens the HR record for one J. Zhang, applied-ML, Irvine, and reviews the wellness flag, the ADHD diagnosis, the mandatory psychiatric evaluation scheduled for Friday. The narrative for the public buys her the world. The flag on Zhang buys her the one man inside the company who has the timestamps to break the narrative. She does not raise her voice. She does not raise a flag. *A flag has been raised.* She schedules nothing she will have to sign.

---

At Friday 4:01 p.m., Jeff does not go to the neurological evaluation.

At Friday 4:02 p.m., his HR record updates: `NON-COMPLIANT — Administrative Leave (Auto) — Effective 00:00 Monday.`

He chose the one Marcus told him to choose. It will read, on file, as a man who declined.

He shows Maya the notification at dinner. She reads it. She does not say *because* and she does not say *I think.* She passes him the bread.

"Okay," she says. "Now we have time."

"Now we have time."

Across the table, Iris — eight, who has been listening with the patience of a person who decided something an hour ago and is letting the adults catch up — puts down her fork.

"Daddy's not going to work Monday," she says. It is not a question; it has the flat cadence of a fact she has already filed.

"No, bug."

"Are you sick."

Jeff looks at the bruise on his own shoulder under his shirt, the one that colored for a man he will never meet. "No," he says. "Somebody else is. I felt it for them."

Iris considers this for exactly the length it deserves, which to an eight-year-old is no time at all, and picks her fork back up. "Okay," she says, and that is three, and the fourth turn is her parents', and neither of them takes it.

---

Three hundred miles north, in a shipping container she has lined with copper mesh, a seventy-year-old woman named Ruth Chen is writing on a 1974 Smith-Corona, at her kitchen table, a sentence she will broadcast Thursday on a pirate AM signal nobody has licensed her to run: *When the world starts feeling each other — and it has started, I have the timestamps, three sources, all analog — the world is going to panic; let us try, for once, not to panic. Let us try to read the paper instead.* She tunes the dial back to 1480 with one ink-stained finger, the way she has tuned it since the year the men she used to write admiring profiles of learned to recognize faces. She has not met Jeff. She does not know his name. She is preparing the ground he is going to need.

The on-air light is dark. Her hands are stained from a ribbon she still buys by mail. She types the next line, and the next, the way she has filed copy on deadline for half a century — clean, sourced, and unafraid — while three hundred miles south a man sits on his front steps with a piece of wood in his pocket and lets the sun come all the way up.

---

```cpp
/* Discovery Log: 0x08 */
broadcast(pain, ALL_NODES);
// One soldier's wound.
// Eleven thousand recipients in ninety seconds.
// Seven billion on the same fabric, not yet listening.
// Hobbes was right — the war of all against all —
// but not the way he meant: every blow lands on the one who throws it.
```
