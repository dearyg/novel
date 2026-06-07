# Chapter 11 Blueprint: "0x0B: The Mirror Instance"

> **Revision plan reference (added Apr 28 2026):** see `context/revision-plan.md` for the canonical IP rename (Vance→Meridian, Vacheron→Auberval), résumé-block deconstruction rule, paper-citation removal, and discovery-log diversification. The current prose in `prose/chapter-NN.md` reflects all completed phases of that plan; future revisions should reference this file.

> **Character voice fingerprints (added 2026-05):** every speaker in this chapter must honor their voice contract in `story-bible.md` → CHARACTER VOICE FINGERPRINTS. Strip the attribution tag and a reader who knows the cast should still be able to name the speaker within two sentences. Aion is always italicized. Action beats every 3-4 turns; no more than 2 consecutive turns of pure verbal exchange.
>
> **Dialogue & character-intro standard (added Apr 2026):** every named character that appears in this chapter must receive an eight-component intro on first speak (name, age, body, history, domain expertise, tic, relationship to Jeff or Julian, relationship to the chapter's central question). The marquee scene runs 20–40 turns of substantive dialogue. See `story-bible.md` → DIALOGUE DENSITY (Sophie's World) and CHARACTER INTRODUCTION DISCIPLINE.

> Jeff flies to {{user_location}} to find the man who almost died. Finds Kael under the billboard. Class resentment erupts. Lena's team photographs them. The Visual Merge. The most uncomfortable chapter — same soul, radically different material conditions.

## System Architecture Reference

```json
{
  "system_manifest": {
    "novel_title": "Life of an SDE",
    "build_version": "2030.04.14",
    "author_uid": "Jeff_Zhang_Senior_SDE",
    "global_variables": {
      "user_location": "Seattle",
      "user_landmark": "the Space Needle",
      "somatic_trigger_light": "Amber (580nm)",
      "somatic_trigger_scent": "Scorched Sage"
    }
  },
  "chapters": [
    {
      "id": 11,
      "title": "0x0B: The Mirror Instance",
      "instance": "Jeff_Zhang",
      "location_key": "user_location_Streets",
      "somatic_bleed": "The Visual Merge — Jeff sees his own face overlaid on Kael's",
      "tech_metaphor": "Mirror Instance / Load Balancing — two instances running identical code on different hardware",
      "philosophy": "Marx — Material conditions shape consciousness. Same soul, different resource allocation.",
      "sub_story": null,
      "interactive_choice": "CHOICE #3: 'Walk toward him?' (Yes → visual merge / No → Jeff watches from car. Both converge.)",
      "reader_misdirection": "The visual merge pushes readers toward 'clones,' 'parallel universes,' or 'past lives.' The class tension makes it personal — this isn't abstract metaphysics, it's economic injustice.",
      "discovery_log": "/* Discovery Log: 0x0B */\nif (instance_A.biometrics == instance_B.biometrics\n    && instance_A.genetics != instance_B.genetics) {\n    throw MirrorException(\"Same pattern. Different substrate. Impossible.\");\n}"
    }
  ]
}
```

> **FLAG — Julian-age conflict (do not resolve here):** Prose locks Julian Meridian at **52** (global-revision-plan §0 ledger canon). His bible backstory (mother died 2005 when he was 14) implies ~**39**. The bible voice-card says "~50." Three documents disagree. Prose is locked to 52; the bible's internal conflict must be escalated to the showrunner / integration reviewer, not silently resolved in per-chapter edits.

## Role

Master Philosophical Novelist. This chapter should feel like a confrontation — not a fight but an uncomfortable reckoning. Jeff is a comfortable SDE from Irvine. Kael is a homeless man who was "culled" by the same tech industry Jeff survived. They share something at the deepest level, and Kael has every right to be furious about that.

## Tech-Fight Spine: Transfer Learning — What Survives a Deployment to a New Environment

> **v5 STATUS (reconciled):** Transfer learning / LoRA is now **fully dramatized in the v5 prose** as Sophie's-World dialogue between Jeff and Kael (crouched in the rain). The global-revision-plan §3.1 listed this spine as "absent" — that was a pre-v5 tracking note. The concept is present, Socratic, and complete. The balanced-pretraining insight (Kael's OR analogy from Pacific Routing), the LoRA cost economics (Aion's GPU-hour log), and the out-of-scope vs. out-of-distribution distinction are all in prose. No net-new CS scene needed.

**Philosophy question (Kael's chapter)**: Marx — material conditions shape consciousness. If the same soul gets two different resource allocations, is it the same soul? What transfers between them?

**Specialists deployed**: **Jeff** (ML — applied transfer learning) meets **Kael** (logistics / operations research — the displaced specialist). Their superpowers combine in an unexpected way: Kael's OR instincts catch something in Jeff's model that Jeff missed. This is the first chapter where another human's *technical* specialty meaningfully contributes to the novel's engineering spine. Kael is the cast's displaced savant.

**Engineering problem**: Jeff's team has been asked to **transfer-learn** the Afterlife Companion model from Meridian's corporate training environment to a smaller on-device variant that runs in lower-power ambient environments — specifically, on the wearables issued to indigent-status users by the allocator. The accuracy on in-distribution users is 94%. On the indigent population, it drops to 71%. The model is demonstrably worse at serving the people the allocator most wants it to serve. Jeff has flown to {{user_location}} partly to find Kael, and partly because he's been assigned to interview users in the indigent pool to diagnose the transfer gap. He is a tech guy showing up in their neighborhood with a tablet. Kael sees through the cover story immediately.

### Pedagogy content the novelist expands into scene

**What transfer learning is (Jeff explaining to Kael after Kael has calmed down, cardboard, rain):**

> *"Take a model trained on a big dataset. Copy its weights to a new task. Fine-tune on a small target dataset. Usually works because most of the representation learned for the first task is useful for the second. LoRA — low-rank adaptation — is the cheap version: you freeze most of the weights and train a small low-rank perturbation that rides on top of the frozen model. Ten megabytes of trainable parameters instead of forty gigabytes. State of the art for most fine-tuning in 2030."*

**Why the transfer gap exists (Kael, quietly, taking over the explanation because this is what he used to do for a living)**:

> *"Your training distribution is wrong. The Companion was trained on pre-Culling white-collar affective patterns. Anger presented as frustration. Depression presented as rumination. It was not trained on displaced-logistics-engineer anger. You think my anger is a classification problem. It's not. It's a *scope* problem. I'm not a weird instance of your training distribution. I'm an instance of a distribution your training did not sample."*
>
> Jeff, quiet: *"That's exactly what the model's telling me. Low log-likelihood on your population. Not 'weird' — out of scope."*
>
> Kael: *"Then why are you trying to fine-tune. Fine-tuning assumes the target is in the same space as the source. You need a whole new pretraining corpus. You need to train the base model on the conversations of people like me, at the scale you train the base model on conversations of people like you. You're not solving transfer learning. You're solving the fact that your training data doesn't include half the population."*

**Kael's OR insight (the chapter's genuine technical contribution from him)**:

> *"When I was at the logistics company, we had the same problem. Our routing models were trained on dense-urban traffic. Rural routes performed terribly. We tried fine-tuning. Didn't work. What actually worked was sampling rural routes *in proportion to their deployment frequency at scale* during pretraining. Importance-weight them up. Treat the rural distribution as a first-class citizen of the training set from day one. Transfer learning is a patch. What you want is balanced pretraining. Your team should push that up two levels."*
>
> Jeff files this the way he files breakthrough ideas. He will cite Kael (anonymously, to protect him) in the paper he eventually writes.

**LoRA and the economics of fine-tuning (throw-away explainer)**:

> Aion, in Jeff's ear: *"LoRA rank 8, 10 million trainable parameters, 40 GPU-hours for a single-population fine-tune. Full fine-tune: 6,000 GPU-hours. Full retrain on balanced pretraining data: 1.2 million GPU-hours. Cost proportionality is the reason every product ships LoRA even when retraining is the better answer."*
>
> Jeff: *"The economics force us to the wrong fix."*
>
> Kael, overhearing because Aion's output is loud: *"Welcome to logistics."*

**Thematic tie-up**: Marx said material conditions shape consciousness. Transfer learning says the same thing in ML terms: the training distribution is the material condition, and the model that emerges from it carries the shape of that distribution into every deployment. A model trained on Irvine cannot genuinely serve {{user_location}}. Fine-tuning is the well-intentioned patch that doesn't fix the underlying gap. Kael, the culled logistics engineer, teaches Jeff the one technical move that would actually work — balanced pretraining — and cannot ship it himself because the allocator has no queue for his expertise. Marx in PyTorch: *if the model doesn't match the class, retrain the model on the class's own data, not a patch of it over the old weights.*

**Pedagogy delivered**: transfer learning, fine-tuning, LoRA (low-rank adaptation), the distinction between fine-tuning and balanced pretraining, out-of-scope vs out-of-distribution, the economics of GPU-hours that force the wrong fix. The reader leaves understanding why a beloved AI product can systematically fail a subset of its users, and what the real solution looks like.

## Setting & Context (2030 Homelessness)

- **Location**: {{user_location}}. The streets near {{user_landmark}}.
- **2030 Homelessness**: Post-Culling, entire neighborhoods have become encampments of "deprecated" workers. The tech industry that created AI optimization also created a permanent underclass of people whose skills are no longer valued. They're not addicts or failures — they're engineers, teachers, mechanics who were algorithmically classified as redundant. In 2030, homelessness is an economic category, not a moral failing.
- **The Billboard**: The same billboard from Ch 3. It played The Anchor trailer that synced Jeff and Kael. Now it plays Afterlife ads: "Leave the pain behind." Kael stares at it daily with bitter amusement — the company that took his job is now offering to take his body.

## Character Profile: Kael

- **Age**: 34 (canonical per global-revision-plan §0 ledger; "30s" was the bible's non-committal range — locked to 34 novel-wide). Gaunt, weathered. Intelligent eyes that are always calculating — not the desperation of addiction but the precision of someone who used to solve complex problems.
- **Background**: Senior logistics engineer at a supply-chain company. 12 years. Laid off when AI optimization made his role redundant. Couldn't find work — every job he applied for had been automated. Eviction. Shelter system overwhelmed. The street.
- **Personality**: Bitter, sharp, darkly funny. Not broken — angry. He sees the irony in everything: the tech that took his job now offers digital paradise. The SDE class that created AI now comes to his neighborhood to "find themselves."
- **The truth about Kael**: He doesn't have anomalies. He doesn't feel bleeds. He's just a man with nothing between him and reality. No comfortable partition, no suburban buffer, no garage homelab to retreat to. His suffering made him the thinnest partition in the novel — closest to the raw truth without any of the tools to process it.

## Narrative Beats

### Beat 1: Arrival in {{user_location}}
Jeff flies to {{user_location}}. He traces the emergency call from Ch 10 to a shelter district near {{user_landmark}}. The neighborhood is a post-Culling encampment — rows of temporary shelters, food distribution lines, free medical clinics staffed by volunteers. It's clean, organized, and deeply depressing. These aren't failed people. They're deprecated systems.

Jeff walks through the district in his Irvine clothes — clean jacket, good shoes, visible smartwatch. He feels every eye on him. He's the tech class that created the AI that took their jobs. He's the prototype. They're the end users.

### Beat 2: Finding Kael
Jeff finds Kael under the billboard. The Afterlife ad cycles above: a perfect digital beach, smiling faces, the tagline "Leave the pain behind." Kael is sitting against the billboard's base, wrapped in a sleeping bag, eating a protein bar from a food distribution pack.

Jeff stands there. He knows this man. He felt this man dying. He saw this man's world overlaid on his home theater. His kid drew this man.

But Kael doesn't know Jeff. He sees a tech guy staring at him.

### Beat 3: INTERACTIVE CHOICE #3
**"Walk toward him?"**

**Yes** → Jeff approaches. The visual merge begins. **No** → Jeff watches from the car. He sees Kael through the windshield, and the merge happens anyway — Jeff sees his own face reflected in the car window, overlaying Kael's face outside. Both paths converge.

### Beat 4: The Visual Merge
Jeff approaches. Kael looks up. Their eyes meet.

Jeff sees it: his own face overlaid on Kael's. Same bone structure. Same jawline. Same distance between the eyes. Different damage — Kael's skin is weathered, sun-burned, scarred from exposure. Jeff's is moisturized, office-pallored, protected. But underneath the damage, the same face. Like two prints from the same negative, developed in different chemicals.

This is Jeff's experience, not Kael's. Kael just sees a rich guy frozen in place.

Jeff runs a facial recognition analysis on his phone — comparing a selfie to a photo he takes of Kael (as surreptitiously as he can). Aion processes: "Biometric overlap: 97.3%. Bone structure: identical. Dental metrics: identical. Retinal pattern: identical. Genetic correlation: none. These results are biologically impossible."

### Beat 5: Kael's Resentment
Kael breaks the silence: "You lost?"

Jeff: "I'm... looking for someone who was hospitalized last week. Hypothermia."

Kael's face hardens. "That was me. And I don't need a wellness check from Meridian Systems or whoever sent you."

"Nobody sent me."

"Then what do you want?"

Jeff doesn't know how to say: *I felt you dying.* He tries: "I think... we have something in common."

Kael laughs — hard, bitter. "Yeah? You live under a billboard? You eat protein bars from a charity box? You get culled by the same company whose CEO is now selling digital heaven?"

Jeff is silent. Kael stands up. He's the same height as Jeff. Same build, underneath the emaciation.

"You know what I think, tech guy? I think people like you build these systems — AI, Afterlife, all of it — and then when the systems eat people like me, you come here and look at us like we're data. Like understanding us makes it okay that you did this."

Jeff: "I didn't—"

"You ALL did. Your entire class. You built the machine and then you act surprised when it chews people up. And now you want to tell me we have something in 'common'?" Kael steps closer. "You got the warm partition. I got the rain. Same soul, different allocation — if you even believe that bullshit."

Silence.

Then Kael — because he's still the logistics engineer he used to be, and he can't help doing the math even on his own life — surprises Jeff. He exhales. Sits back down on the cardboard. Runs a hand over his face.

"Here's the part that kills me, man. You know what the AI allocation layer gives me every month? A studio unit in Lacey if I apply. Basic medical. Food credits. I'm not starving. I wouldn't be dying under this billboard except I keep saying no to the studio. You wanna know why?"

Jeff doesn't answer. Waits.

"Because the studio is the same studio every other displaced engineer gets. The food credits are the same food credits. The medical is the same medical. The allocator is *fair*. It is painfully, mathematically, algorithmically fair. I go inside, I get a life identical to every other person the system threw out. And I can feel it — I can already feel it before I even go in — it's going to be the same *nothing* as out here, just with a heater. At least on the street, I'm the one making the decisions. I'm still choosing something, even if the something is stupid."

Kael looks up at the billboard — the Afterlife ad, the one that reads *Leave the pain behind.*

"And the irony. The *fucking* irony. The AI killed the economy where someone like me could claw my way up and *matter*. Now the same AI tells me I'm fine — I have enough — and anyway you can't be rich anymore, nobody can, the game is over. And THAT asshole" — he jabs his chin at Julian's face on the billboard — "is selling the one thing left. He's selling *be special*. He's selling *be rich in a room where no one is poor because there are no other rooms*. And you know what? It's working. People are lining up. Not because they're dying. Because they're bored. They're bored, tech guy. Your machine made them safe and bored and now they'd rather upload than keep being small."

He laughs — not kindly. "Same soul, different allocation, my ass. Maybe the allocation is the only thing that ever mattered. Maybe *being allocated less than someone else* was the whole point of being human and your AI took it away and now we don't know what to do with ourselves."

Jeff doesn't have a response. The half-right answer (*that's exactly why Afterlife is a trap*) is also the half-wrong answer (*the allocation AI did eliminate real suffering, and Kael isn't wrong about the hollow*). Both things are true. The novel does not resolve them here, either. Jeff just stands in the rain and watches a man he is, by some architectural measure, also himself — refuse a studio unit because refusal is the only thing he still owns.

**Philosophy thread (Marx + modern afterword)**: Marx said material conditions shape consciousness. The Balanced Economy tried to flatten the material conditions and discovered that *some* of what humans called "meaning" was parasitic on uneven allocation. Afterlife is the market response: if we can't let you be rich out here without hurting anyone, we'll let you be rich in there with no one to hurt. The novel stays honest about how seductive that offer is.

### Beat 6: Lena's Team
They don't notice: two figures in a car across the street. Lena's surveillance team. They photograph Jeff with Kael. The photos show what the situation looks like from the outside: a flagged employee, under psychiatric review, traveling across the country to seek out a homeless man and stand frozen in the street staring at him.

Lena receives the photos within the hour. She now has "evidence" for her case: "Subject exhibits delusional identification with random individuals. Behavioral pattern consistent with ADHD-induced psychotic fixation. Recommending involuntary psychiatric hold under state mental health statute."

She files the paperwork.

### Beat 7: The Departure
Kael sits back down. The conversation is over — for now. Jeff leaves his card (a simple thing — name, phone number, nothing corporate). "Call me. Please."

Kael doesn't respond. Jeff walks away, shaking. He pulls up Aion on his phone: "Same biometrics. Different genetics. Different life. Different everything. But the same... person? The same instance?"

Aion: "The data is consistent with a mirror instance — two processes running identical base code on different hardware, diverged by environmental variables."

Jeff: "So material conditions — not genetics, not choice — determine which instance gets which life?"

Aion: "That is one interpretation. Marx would agree."

Jeff stops walking. Marx. Material conditions shaping consciousness. The same code, running on different hardware, producing radically different outcomes based on nothing but resource allocation. Jeff got Irvine and a garage homelab. Kael got {{user_location}} and a billboard.

The most uncomfortable question in the novel: if they're the same instance, why does Jeff have everything and Kael nothing?

**Jeff's theory**: "We're alive at the same time. Not past lives. Not reincarnation. Parallel instances of something. Same base code, different environments. Marx was right — but about something much bigger than economics."

## Stylistic Constraints

- **Tone**: Uncomfortable. The class confrontation should make the reader squirm. This isn't abstract philosophy — it's a man with a homelab being told by a man with nothing that their "shared identity" is an insult.
- **Kael's voice**: Sharp, intelligent, angry. He's not a victim — he's a man who was destroyed by a system and has no patience for the people who built it.
- **The Visual Merge**: Jeff's experience only. Kael doesn't see it. The asymmetry matters — Jeff gets the mystical revelation; Kael gets the rain.
- **Lena's surveillance**: Should feel like the walls closing in. The reader sees Jeff's situation from both inside (profound discovery) and outside (psychotic episode). Both readings are plausible.

## Chapter Footer (v5 — diversified per P1.7)

> **NOTE (reconciled to v5 prose):** The C++ `/* Discovery Log: 0x0B */` block above is STALE. Per revision-plan P1.7, footers were intentionally diversified into in-world artifacts; the C++ block was NOT restored. Do NOT revert to the code block.

The actual v5 prose footer is Ruth Chen's **typewritten KCRC 1480 AM radio segment** — a third-person artifact typed on her Smith-Corona, single carbon copy, taped inside the shipping container. It reads her Thursday Roundup (segment 3) noting two listeners who independently wrote in about dreaming of a cold stranger in a distant city, and closes with her editorial stance: *"I am not going to interpret this on the air. I am going to read the letters, and you can decide. That is the whole job, and it is the only one I have left. — R."*

This footer is canonical and intentional: it anchors Ruth as the off-allocator witness/archivist, closes the chapter in her voice rather than a system log, and is the in-world artifact that replaces the Discovery Log for this chapter.


---

## Cinematic v2 additions (merged from chapter-11-new.md)

# Ch 11 — additions (paste into chapter-11-blueprint.md)

> **What changes.** Insert **Block A** as a new Character Profile section after the existing "Character Profile: Kael." Insert **Block B** as a new Beat 7 right before the existing Beat 6 "Lena's Team" (renumber the Lena and Departure beats to 8 and 9). Ruth Chen becomes a recurring character in Ch 15 and Ch 20 (see those patches).

---

## BLOCK A — NEW Character Profile: Ruth Chen

- **Age**: 70. Ex-NYT technology correspondent, 1984–2018. Retired before the Culling but watched it happen with the specific horror of someone who had written the early coverage.
- **Appearance**: Silver hair she cuts herself, tortoiseshell glasses she has had since 2007, layered flannel.
- **Lives in**: A **converted 40-foot shipping container** set on a vacant lot three blocks from Kael's billboard. She owns it outright. She had it trucked in eight years ago and has refused to move since. The lot's deed is in her name; she bought it with a retirement settlement that she converted to cash the day she got it.
- **Her rule**: Ruth has lived entirely in a **2015-era analog life** since 2022. No smartphone. No allocator account. No Afterlife subscription. No neural-link anything. No AI copilot. No predictive AI. No smart home. She has a landline telephone — copper-wire POTS service that the telco is legally required to maintain and has been steadily trying to sunset for years. She cooks on a propane camp stove. She grinds her coffee with a hand-crank grinder she has owned since the nineties. She listens to the news on a shortwave radio. She reads paper newspapers she subscribes to via postal mail, which arrive three days late.
- **Superpower (cast-of-specialists framing)**: Ruth is the deliberate **out-of-distribution control sample**. The team's data is contaminated by the substrate they're investigating — everyone in the corpus is running allocator-connected hardware, everyone's biometrics flow through Meridian's telemetry pipe, everyone's decisions are legibly shaped by AI exposure. Ruth is the one person Jeff can point to whose behavioral signature is *architecturally clean*. When Aion asks "what would a human untouched by any 2030 AI product look like as a data point?" the answer is Ruth. She is the team's silent baseline.
- **Why she's here**: She covered tech for 34 years. She watched everyone she respected get funded, scale, go public, and ship products that broke things she loved. In 2022 she decided to conduct a personal experiment: could a modern adult live a 2015 life, intentionally, on purpose, for the rest of her life? She is now eight years into the experiment and plans to die in it. She does not think she is better than anyone. She thinks she is the control group.
- **Pirate radio**: She broadcasts a three-hour show every Tuesday, Thursday, and Saturday, 7–10 PM local, on **1480 AM (KCRC)** — a real, FCC-assignable frequency. Her signal reaches about 30 miles with a good atmospheric window. In prose she refers to it only by its frequency ("Fourteen-eighty AM"); the planning-stage title *"The Back Page"* does not appear in v5 prose — the show is identified in the chapter footer as **"KCRC 1480 AM — Thursday Roundup."** The content is: whatever she is thinking about that week, paper newspaper clippings she reads aloud, a small segment at the end where she reads letters (paper mail) from listeners. She has maybe 400 regular listeners. One of them is Kael, who runs a battery-powered handheld AM radio she gave him. He records each show on a cassette recorder — yes, cassettes, he found a working deck in a pawn shop — and listens back during the day.
- **The allocator does not know she exists**: She has a birth certificate, a Social Security number, and an address. That is it. She has not generated a biometric-platform identity in eight years. She pays her taxes by mail. The allocator's recommendation engine has no model of her. When Jeff eventually feeds her to Aion for analysis, Aion reports: *"I have insufficient training data to render a prediction on this subject's likely behavior. She is a distribution I have never sampled. Recommend treating her as a manual-annotation case."*

---

## BLOCK B — NEW Beat 7: Ruth

(Place between existing Beat 5 "Kael's Resentment" and Beat 6 "Lena's Team" — then renumber Lena's beat to 8, Departure to 9.)

### Beat 7: The Container

Jeff, shaken from the confrontation with Kael and aware he is being surveilled, follows Kael back toward the billboard to say something — he doesn't know what. Kael stops at a vacant lot three blocks shy of the billboard and raps his knuckles twice against a shipping container painted matte green.

A voice from inside: *"Who."*

*"It's me, Ruth."*

*"Alone?"*

*"No. The tech guy."*

A pause. *"Oh, that tech guy. Fine. He can come in. Shoes off."*

The door opens. Ruth Chen, 70, tortoiseshell glasses, a flannel over a flannel. The inside of the container is warm, smells like coffee and old newsprint. A copper-wire landline phone on a small table. A shortwave radio on another. A paper map of {{user_location}} pinned to the wall with thumbtacks. A cassette deck. A typewriter. An AM broadcast transmitter with its red on-air light currently dark.

Kael introduces them in one sentence: *"Ruth, Jeff. Tech guy. Jeff, Ruth. My landlady, sort of. Journalist. Before."*

Ruth pours Jeff coffee from a thermos. *"You're allocator-surveilled right now. I assume that's obvious. They can't hear us in here because my container is lined with the same copper mesh the Elder uses. But the moment you walk out that door they'll pick you back up. Whatever you want to say, say it here."*

Jeff stares. *"How do you know about the Elder?"*

*"I used to cover him. He was CTO of IBM's Global Services division in 2011. He retired to teach meditation and has been running a Faraday cage out of a shopping mall for the last eight years. I wrote about him twice. He's my source."*

Kael, without looking up: *"Ruth is everyone's source. She just doesn't know we still need her."*

Ruth: *"I know you need me. That's why the radio show still runs."*

Jeff, quietly: *"Will you tell me what the hell is happening."*

Ruth: *"I'll tell you what I won't tell you. I won't tell you that you're having a breakdown. I have watched seven friends get diagnosed with dissociation by company doctors since 2023 and I can tell the difference. You are not sick. You are right. Which is worse for your career than being sick would be. Finish the coffee. Walk back to your hotel. Get on the show next Thursday. Seven PM. The listeners I have left are the smart ones."*

Jeff does not know what to say. Ruth lets him sit in silence for a long minute. Kael drinks his own coffee. The shipping container ticks as it cools.

When Jeff stands to leave, Ruth hands him a small business card. It has her name, a landline phone number, and one line: *"Analog only."*
