# Chapter 8 — 0x08: The Broadcast

Tomás Arroyo is walking a patrol route at dawn along a ridgeline above a valley he has never been told the name of.

He is twenty-four. Bolivian, conscripted, two months short of finishing his eighteen-month rotation. Before the 2027 draft expansion he had worked six years as a diesel mechanic in his mother's machine shop in El Alto, and could disassemble a 1995 Land Cruiser engine with three tools and his hands. He is here because the Andean Border War had run into its third year of drone attrition and needed boots to finish the maps the drones could not finish. He bites the inside of his left cheek in a slow three-count when he is bored — a habit since childhood, deployed against any wait he had not chosen.

His boots are tenth-issue. His exo-suit, a third-iteration Meridian Aerospace field harness, is running at seventy-three percent charge and humming quietly against his ribcage. AI-targeting overlays flicker across the inside of his visor. He has trained himself to ignore them. The AI can predict where the enemy will be. It cannot predict how it feels to shoot someone whose mother would have cooked the same stew his mother cooks.

He has four months to go. He thinks, in the fourth minute of his patrol, about the smell of his mother's kitchen in La Paz, about the oil under her fingernails after she tinkered with the generator, about whether his dog — a small ochre mongrel named Capitán whom he taught to sit using chicken scraps — still remembers him.

*We have been fighting for eight months,* he thinks. *They look like us. Their language is almost the same. Why are we killing each other over rocks.*

His tactical AI chirps, calm and professional. *"Movement detected. Two hundred meters. Recommend cover."*

Tomás turns.

The rifle crack is neither loud nor soft. It is the precise sound an engineer chose for a rifle with six attributes optimized. The bullet enters his left shoulder with a liquid shock that turns immediately cold. The visor overlay flashes a calm amber rectangle labeled CASUALTY. The sky is blue. The alpacas on the next ridge have not moved. His knees buckle.

*"Casualty alert. Medical drone dispatched. ETA four minutes."*

Tomás goes down on his right side. His haptic glove — closed-loop hemostatic control, the glove runs a PID loop on shoulder pressure because he was trained to let the glove run the loop while he stayed alive — tightens by itself against his shoulder. The loop overshoots. The loop undershoots. The loop finds its setpoint.

The amber on the inside of his visor is the color of a California fluorescent light he has never seen.

The blood pooling inside his sleeve is warm.

He thinks, without words, of a hallway floor he has never walked on, cool tile, a garage door, the sound of a whiteboard marker uncapping. The thought is not his.

---

**SMASH CUT.**

Jeff Zhang doubles over in his garage at 11:47 p.m. Pacific, clutching his left shoulder, screaming into the crook of his right arm because Maya is asleep upstairs and he will not wake her.

The pain is not phantom. His skin bruises. Purple spreading across the deltoid. His shoulder, which has not been shot, behaves as though it has been shot. The sensation does not fade the way a thought fades. It remains, precisely, for ninety seconds.

Then, under the skin of the bruise, a second sensation. Warmth. Sudden, chemical, narcotic warmth. A blood-level wave of something his body did not administer. His breathing slows. The pain retreats to a distance.

Aion is waking the pipeline. *Jeff. I have catalogued a somatic event. Origin: unknown. No local trigger. Pain response: real. Tissue damage: subcutaneous bruising consistent with ballistic impact. Secondary event: pharmacologically-induced analgesia signature, onset at plus ninety-two seconds. Compatible with field-deployed morphine analog.*

Jeff lies on the garage floor. He has not asked. The concrete is cold. He is trying to remember how to inhale.

"Aion."

*Yes.*

"Cross-reference global casualty reports for the last ten minutes. Anatomical region: left shoulder."

*Running.*

Silence for eleven seconds, which is a long time for Aion and which Aion is using to do the following things in parallel: query nineteen public health-feed aggregators, run a sliding-window anomaly detector across a month of global pain-report telemetry, call a population-scale statistical significance test on the current minute versus a rolling baseline.

*Jeff. I need to show you something.*

The pane opens. A time series. Left-shoulder pain reports from global wearable telemetry, windowed at thirty seconds, grouped by anatomical-self-report region. A flat line for the previous two hours. Then a sharp, vertical spike three minutes ago. Thousands of wearables fired. Thousands of strangers reported sudden left-shoulder pain.

The spike decays in ninety seconds.

Aion says, *Eleven thousand four hundred and sixteen matched reports. Eleven thousand of them decay in the same ninety-second window. The pharmacological-analgesia signature appears at plus ninety-two seconds in three hundred and forty-two of them — consistent with the subset of subjects who are within medical-response range of a field medic or an auto-injector device. The rest do not get pharmacologically relieved and are still in discomfort now.*

"What is the source."

*Running the triangulation. Source is a single point. Lat minus fifteen point seven two, long minus sixty-nine point one one. The Andean border corridor. Timestamp on the pain-spike matches, within four hundred milliseconds, a casualty ping recently routed through Meridian Aerospace's internal combat-sim telemetry network. A Bolivian conscript named Tomás Arroyo was shot in the left shoulder at oh-six forty-seven twelve UTC. Eleven thousand people on Earth felt it.*

Jeff lies on the concrete. He is crying. He does not notice immediately.

"That's not a broadcast," he says. "That's one point in source space, rendered into thousands of bodies."

*Correct. Like a multicast flood with no sender address. Or — to use the biological metaphor you were about to reach for — like a single heartbeat felt by eleven thousand hearts.*

"File it."

*Filed. Event index zero nine. Class: Cross-Partition Broadcast. I should note: this is the first anomaly on your corpus where the originating instance is not you.*

"It's not me and I still felt it."

*You felt it. Eleven thousand of you felt it. Yes.*

Jeff sits up slowly, against the homelab rack. He is not going to sleep tonight either. He reaches for his phone and calls no one.

---

At 2:14 a.m. Jeff's corporate laptop pings. A new Slack message in the v5.4 attention team channel, from the safety-team lead, marked URGENT:

*@jzhang: escalating an adversarial-training ticket to your branch. Safety filter jailbreak rate up 40% in the last 72 hours. Our red team is publishing prompts online faster than we can patch. Need a robust filter for the Afterlife Companion product by Monday. Adversarial training plus distillation. You OK?*

Jeff stares at the ping. He is conscious, abstractly, that the company has asked him to build a robust system for filtering unacceptable prompts on a product that is about to be catalytically dangerous if his metaphysical hypothesis is correct. He could decline. He could say his medical hold prevents him from taking new tickets. He could take it and work on the filter in the hope that something he builds in the next four days might matter.

He takes it. He types back one word: *OK.*

He pulls up the ticket. The work is canonical. The **safety filter** is a classifier head on top of Afterlife's Companion model. It is trained to flag requests that would cause sustained psychological harm to the requesting user — requests like *remove my memory of my children*, or *simulate the death of my spouse every morning for a year*, or the eighty-seven other categories Meridian's ethics board has codified. Red-team users have been jailbreaking the filter for weeks. Each successful jailbreak is posted online within hours. Each patch Meridian ships gets countered within two days. The filter is in a classical ML arms race and losing.

The standard approach: **adversarial training.** Two copies of the model are pitted against each other. One, the Attacker, generates prompts designed to slip past the safety filter. The other, the Defender, classifies prompts as safe or unsafe. They take turns. Every round the Attacker learns new evasions. Every round the Defender learns to block them. The loss for each is the other's success. It is a generative-adversarial framework — like a GAN, but for policy behavior instead of images. It is the same recipe that trained the drone swarms on both sides of the war Tomás is currently bleeding for, although Jeff does not know that yet. Dr. Itzel Velarde at Meridian Aerospace wrote the framework. One engineer, two sim environments, one shared model backbone, six months of self-play between simulated Bolivian and Peruvian tactics, then deployed.

Jeff starts sketching the adversarial training loop. At 2:41 a.m. Aion interrupts him.

*Jeff. A note on self-play.*

"Go."

*Self-play converges to a Nash equilibrium between the Attacker and the Defender. That equilibrium is optimal against* each other. *It is not optimal against the broader distribution. A classic failure mode: after self-play, the Defender is extremely good at blocking prompts from the Attacker's distribution and extremely poor at blocking prompts from outside that distribution. If your red team is drawing from the online jailbreak community, you may be overfitting to that community's current prompts. A user who is not trying to jailbreak — a user who is simply in distress and asking for something the Companion should refuse — may produce a prompt the filter passes because the prompt does not match the Attacker's patterns.*

"So we under-block civilians and over-block red-team."

*Correct. The Bolivian and Peruvian drone swarms share this pathology. Optimal against each other. Fail to distinguish a civilian in the same valley from combatants. I mention this as a note of caution. It does not change the recommendation to do adversarial training. It changes how you should evaluate the trained model.*

"Meaning."

*You need an out-of-distribution test set. Prompts that are neither from your red team nor from your historical user data. Synthetic adversarials generated by a third model, trained on a different dataset. If you ship a filter that holds up on the red team and fails on the synthetic third-party evaluation, you are shipping a model that is optimal against its trainers and wrong against its users. Which, if this Afterlife product goes live, is the worst thing we could do.*

Jeff writes down the observation. It has a small technical label in the ML literature: **distributional robustness failure**. He writes the label next to the note. He reaches for the corpus entry for the Meridian HQ biometric scanner — Event index zero-six-candidate, which has not yet happened — and realizes he is about to prepare, in the form of a safety-filter design doc, the exact conceptual tools that will allow him to parse, two weeks from now, why a biometric scanner at Meridian HQ will misidentify him as Julian Meridian. A scanner trained on its own red team. Not trained on natural adversarials. Not trained on him, specifically, as a data point it did not know existed.

He writes a small note in the margin of the corpus: `tech_philosophy_note: self-play collapses to in-distribution optimality. The scanner is about to meet me. I will be outside its training distribution.`

He does not yet know this will be useful. He files it anyway.

---

At 3:11 a.m. a second cut happens, without transition, to a place Jeff does not see.

Julian Meridian is on his yacht, awake because he has not slept since the priority-inversion incident three chapters ago. The Concierge has logged twenty-one subthreshold cortisol spikes since that morning. Julian is watching a real-time dashboard his team has put together to monitor Afterlife's internal telemetry, and the dashboard is showing him something that, for the first time in two decades, he does not have an engineering framework for.

The dashboard is showing that the broadcast pain event — the Tomás event — was not generated by Afterlife. It was not generated *through* Afterlife. Afterlife's infrastructure recorded it, the way a seismometer records an earthquake, entirely passively. The event came from outside the system Julian built. The system Julian built was — tonight — behaving as a sensor for something bigger.

Julian sits in his library, in the low warm light of a lamp from the 1970s that he has had reconditioned every five years because it was his mother's, and he whispers, to the lamp, to himself, to the room, to nobody: *"What have I built."*

Not because he caused it. Because he copied it. He has been building, for thirteen years, a replica of a system he did not know existed, with no understanding of what the original was doing when it did what he was now watching it do.

The Concierge does not comment. The Concierge has been instructed, by Julian personally, at 2:47 a.m., to stop commenting. It is the first conversation Julian has had with the Concierge in nineteen months that ended with him asking it to be silent.

The lamp glows. Below, the Mediterranean does not move.

At 3:14 a.m. exactly, Julian's Auberval does the thing it does, which is tick.

---

At 4:00 a.m. Jeff's badge fails on the fourth floor for the third time. He has tried twice already, habitually, the way a man checks a doorknob before he walks away. He tries a third time because he is curious whether the lockdown has spread. The scanner says `ACCESS DENIED — CONTACT YOUR MEDICAL LIAISON`. This time it also flags his building badge: `RESTRICTED TIER ACCESS ACTIVE`.

He cannot get into the fourth floor anymore. He cannot get into the telemetry rooms. He cannot access internal anomaly databases. His code-review permissions are downgraded to read-only. The institutional walls are closing.

He walks down three flights, past a cleaning bot that stops to chirp at him and then continues, and out through the lobby. He stands in the parking garage for a long time. It is six a.m. by now. The Santa Ana winds are picking up.

He calls Marcus Meridian on the payphone.

"Marcus."

"Jeff. You okay."

"They just took my fourth floor."

"I know. I saw it on a telemetry feed my half-brother's company does not know I have."

"Is Tomás alive."

A pause. "Yes. He will live. He is in transport to a field hospital. His exo-suit ran the right loops. He's stable."

"Okay."

"Jeff."

"Yeah."

"The pain-spike event had eleven thousand reports. Three hundred and forty-two of them were near enough to a field medic to get pharmacological relief in the ninety-second window. The other ten thousand six hundred and fifty-eight were not. Do you understand what I'm about to tell you."

"Tell me."

"Some of them did not survive. Three in particular were already in fragile cardiac states. Aion has the names in the casualty log."

Jeff leans against the payphone.

"We killed those three."

"No, Jeff. We did not kill them. The war killed them. A Peruvian sniper killed them by killing someone six thousand miles away through a mechanism none of us yet understand. That is not your fault. That is the fact. And there will be more. This is going to keep happening until we stop Afterlife or we solve the architecture or both. I need you to come to my clinic this weekend. I need you to bring your data. I need you to bring everything you have."

"I will."

"And Jeff."

"Yeah."

"Don't miss that neurological evaluation Friday accidentally. Miss it *deliberately*. There's a difference in your HR record. One looks like a scheduling conflict. The other looks like defiance. Pick the one you can afford."

"Okay."

Jeff hangs up. He goes home. He does not go to the garage. He sits on the front steps and watches the sun come up for the first time in a year. Maya, at 6:41 a.m., opens the front door in a bathrobe and sees him on the steps and does not ask. She sits next to him. They do not speak.

Three hundred miles away, a man in a shipping container named Ruth Chen is writing on a typewriter, at her kitchen table, a sentence that will not air until Thursday: *When the world starts feeling each other, the world will panic. Let's try not to panic. Let's try to read the paper.*

She does not know Jeff yet. She is preparing.

---

At Friday 4:01 p.m., Jeff does not go to the neurological evaluation. At Friday 4:02 p.m., his HR record updates: `NON-COMPLIANT — Administrative Leave (Auto) — Effective 00:00 Monday.`

He shows Maya the notification at dinner. She reads it. She passes him the bread.

"Okay," she says. "Now we have time."

"Now we have time."

---

```cpp
/* Discovery Log: 0x08 */
broadcast(pain, ALL_NODES);
// One soldier's wound.
// Seven billion recipients.
// Hobbes was right — but not the way he meant.
```
