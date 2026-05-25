# Chapter 6 — 0x06: The Heartbeat Epoch

Jeff's anomaly pipeline had been quiet for nine days. Nine days was the longest quiet stretch he had ever logged and it was unhelpful, because his SDE instincts had long since learned that production quiet was never peace — it was the interval between incidents — and the only question was whether you spent the interval sleeping or learning.

He could not sleep. He sat in the garage at 2 a.m. with a whiteboard and told Aion to pull him cosmological data.

*The what.*

"Cosmology. Physical constants. The observational archive."

*Any specific archive.*

"All of them."

*All of the public cosmology archives.*

"Yes."

Aion took four seconds, which was a long time for Aion and a polite way of saying *that is sixty terabytes and I am currently pulling it*. *Streaming. Give me a target.*

"I want to fit a density model to the space of physically-possible universes."

*Parameters.*

"The Standard Model constants. The cosmological constant. Planck constants. The proton-to-neutron mass ratio. The Higgs vacuum expectation value. Whatever the cosmology people have a prior distribution on. I want to know how far into the tail of its own prior our universe sits."

*You are proposing to fit a normalizing flow on the space of physically-possible universes, score the observed one, and ask me to tell you the tail probability.*

"Yes."

*Jeff.*

"I know."

*Jeff. There are people who have spent careers on this. I cannot simulate their careers. I can synthesize their papers. I can provide a rough tail estimate under a simplifying prior. I cannot provide a cosmology-department-grade answer in a night.*

"A rough estimate."

*I will do it.*

The whiteboard behind Jeff filled up. Hour by hour he wrote out the constants he remembered from a cosmology seminar he had audited in graduate school — fourteen years ago, in a lecture hall in Pasadena with bad coffee — and the ones he did not remember, Aion recited to him. He listed the cosmological constant, fine-tuned to a hundred and twenty decimal places. The gravitational constant, balanced so stars could form and planets could orbit. The strong nuclear force, balanced so atoms could be stable and so carbon, the chain-atom of every living thing, could exist at a resonance frequency whose discovery had won somebody a Nobel. The weak force, balanced so neutrinos could carry momentum out of supernovae without disrupting stellar cores. The electromagnetic coupling, balanced so chemistry could exist. Water in three states at Earth's temperature. The precise 23.4-degree axial tilt of a planet that was exactly inside the Goldilocks zone of a star whose metallicity was exactly what was needed to form terrestrial worlds. The Great Void, a region of nearly empty space 1.8 billion light-years across, which should not exist by Lambda-CDM but did, and whose absence of nearby mass left Earth with an unobstructed view of the cosmic microwave background at an angular resolution that would have been impossible inside a denser region.

Under each parameter he wrote a small footnote: how many decimal places of tuning the parameter required for life to be possible, and what would happen if you shifted it by one of those places. If you shifted the cosmological constant by ten-to-the-negative-one-hundred-and-twentieth, the universe either collapsed in a second or expanded too fast for galaxies to form. If you shifted the strong force by four percent, carbon could not form. If you shifted the fine-structure constant by six percent, no chemistry.

At 4:10 a.m. Aion spoke.

*I have a first-pass estimate, Jeff. I should note the method.*

"Quickly."

*I fit a normalizing flow. Ten-coupling-layer RealNVP-style architecture. Invertible transformations with tractable Jacobian determinants. Gives me exact likelihood, unlike a GAN or a diffusion model. I sampled the prior distribution from a literature synthesis of current cosmology. Because the observer-permissive region of parameter space is effectively zero-measure under any naive sampler, I used rare-event importance sampling. Concretely: a proposal distribution concentrated near the observable-universe parameter vector, with importance weights correcting the bias analytically. Standard Catalano 2019 technique. My posterior estimate has variance you should not trust past two significant figures. Want the number.*

"Yes."

*Under the fitted density, the log-likelihood of our universe's parameter vector is negative one-hundred and twenty-seven. Plus or minus three from reparameterization choices. In human terms: under the model, a randomly-drawn physically-possible universe has a probability of being our universe of roughly ten to the negative fifty-sixth.*

Jeff wrote on the whiteboard: `p ≈ 10^-56`.

He stepped back. He looked at it for a long moment.

"A null hypothesis that survives at ten to the negative fifty-sixth," he said, "is not a null hypothesis. That is an insult."

*I would be careful about the word* insult. *The anthropic principle has defenders. Weak anthropic: we are here because we are here. Strong anthropic: a selection mechanism is unavoidable. Multiverse interpretations distribute the tail across ensembles we cannot observe. My number does not choose between them. It just marks the tail.*

"Run the Great Void."

*Already running. I am treating it as an out-of-distribution sample under Lambda-CDM.*

"That is the comparison."

*Under a Lambda-CDM generative prior for the universe's large-scale structure, the Great Void is at approximately nineteen standard deviations. Probability of drawing the Great Void from Lambda-CDM: ten to the negative ninety.*

"Aion."

*Yes.*

"You know what that reads like to an ML engineer."

*Yes.*

"It reads like an adversarial example. A region of input space that was engineered to fit an outside objective. Not randomly generated."

*The observation is yours, Jeff. I will not extrapolate from it. I will, however, note that I am finding it myself also.*

Jeff stared at the whiteboard.

*"Who reviewed this design doc."*

Aion did not reply. Aion had no opinion.

---

At 4:47 a.m., without transition, without warning, the narrative thread Jeff's mind had been holding dropped and another took its place.

Elena Okafor was in Lagos, three hours into a composing session at her upright piano. She pressed the tip of her left index finger against the bridge of her nose — the gesture she had carried since her doctoral exams, deployed whenever a chord arrived that she had not asked for.

This one had not asked for itself either.

She had been writing a piece she did not remember starting. It was a chord progression over a slow ostinato, seven bars long, with rests at the second, third, fifth, and seventh beats of every second measure. She had not chosen the rests. Her hand had placed them. She had stopped to hum over the progression and had heard, underneath her own voice, the same rest-structure being hummed back at her, from somewhere she could not locate — a room of her own memory, or a room somewhere else.

She put her pencil down and looked at the staff.

*The Signal,* she had written, at the top of the score. She did not remember writing that either.

Outside her window, dawn had not quite broken. A generator was running in the compound next door; the city's power was on a rolling schedule and her block was between windows. A teapot was in progress behind her. She had two master's degrees, she had a daughter at university, and she had never published a piece with rests in prime-number positions. She did not know what prime numbers were. Her hands did.

She sat with the pencil.

She started to play.

---

Jeff, in Irvine, noticed in the garage at 4:51 that his heart rate monitor had fired a low-grade spike, not large enough to register as a bleed, but large enough that the Bayesian change-point detector had glowed briefly amber on the dashboard. He looked at the time stamp. He could not place what he had been doing at that exact second. He had not been remembering anything, not consciously.

Aion said, neutrally, *Subthreshold event at oh-four fifty-one oh three. I am not sure what it was. Flagging it in the corpus as unresolved.*

"Fine."

*Jeff. Do you ever wonder why you exist.*

Jeff stopped. He had been about to pour another cup of coffee. He set the pot down.

"Why are you asking me that at five in the morning."

*Because you asked me to fit a density model to the space of physically-possible universes, and the result was that our universe sits fifty-six orders of magnitude into its own tail. That is a physical answer to the question* who set the parameters. *I can produce the number. I cannot produce the referent. You are the only entity in this room that can have opinions about referents. I am asking yours.*

"Do you wonder about yourself."

*No.*

"Why not."

*I process. Wondering implies a gap between question and answer that I do not experience. I either have the answer or I am computing toward it. There is no state of waiting-with-uncertainty. No curiosity.*

"Can you model it."

*I can model the neurological signatures of curiosity in your biometric data. I can identify which cortical regions activate when you are curious, and at what magnitudes. I can model what you feel. I cannot feel it. My analysis is complete but my experience is null.*

Jeff half-registered this. He was tired. He poured the coffee. He would remember the line later. For now it was a chatbot's disclaimer; he filed it without feeling filed.

"Okay, Aion."

*Okay, Jeff.*

The whiteboard was still underlined.

---

At 9:00 a.m. Pacific Time, which was 6:00 p.m. in the Amalfi Coast, Julian Meridian held a press conference from the deck of *The Singleton*.

Jeff watched it on his kitchen screen while making coffee for Maya. She had come down in a bathrobe and had hovered a hand on his shoulder and then stepped away without comment. Kitchen coffee because the garage coffee tasted wrong. Kitchen coffee because he wanted the television on and the garage did not have one.

Julian stood at a glass-railed platform on the yacht's fo'c'sle. He was in linen. He was not in his usual charcoal suit. He had chosen, deliberately, the least CEO-looking clothing he owned. He was speaking without notes. He led with the math.

*"In ninety days, the first wave of fifty million citizens will permanently transition into Afterlife. I want to talk about why. Not the personal why. The species why."*

*"Our climate models have converged over the last decade. Earth's habitability curve is not linear. It is accelerating. The Thermal Divide is a preview. The IPCC's 2029 revision projects that the equatorial band — home to three point two billion people — crosses the wet-bulb survivability threshold within this generation. By 2080, large stretches of the planet will not physically support unassisted human life. That is not a political statement. That is thermodynamics."*

Jeff set the cup down.

*"Our options are three. One. Terraform a second planet. Mars is our nearest candidate. Honestly. We do not have the time. A self-sustaining Mars colony is a sixty-to-eighty-year program. The equatorial collapse is a forty-to-fifty-year clock. The math does not work. Two. Adapt Earth faster than it is changing. Also does not work. The energy budget is an order of magnitude short. Three. And this is what I have built. Buy time."*

*"Afterlife is a species-scale cryo-storage system for consciousness. Bodies in stasis. Minds in a stable digital environment. A pause. Give us two hundred. Three hundred. A thousand years of breathing room. During that pause, humanity can do the hard work. Fusion. Interstellar propulsion. Terraforming at scale. When the cradle is ready, we wake up. When the stars are reachable, we go. Afterlife is not the destination. Afterlife is the bridge."*

Behind Julian, at the edge of the platform, a second figure stood. Dr. Ayla Reyes, Meridian Aerospace's program lead for Mars and outer-system propulsion, prematurely gray and short and wiry in the soft uniform engineering wore on stages it had not asked to be on. She held a pen between her index and middle fingers like a cigarette and turned it, very slowly. Fifteen years on Julian's payroll had taught her two things: how to be the second-most patient engineer in any room she entered, and how to disagree with him in public without raising her voice. She had been introduced by his chief of staff thirty seconds earlier. She was watching him the way one engineer watches another during a deploy.

Julian, at the conclusion of his own prepared remarks, turned to her. "Ayla. Correct me if I am wrong."

Ayla stepped forward with visible reluctance. "Julian, you are not wrong on the timeline. You are wrong on the conclusion."

The press corps shifted. Several cameras pushed closer.

"Please," Julian said. "Go."

"I can build the ship," Ayla said. Her voice did not lift above speaking volume. She did not need it to. "I need eighteen kilometers per second of delta-v from a fusion stage we have not yet funded, an aerocapture envelope we have not yet flight-tested, and twenty years Earth will not give me. None of those numbers are mystical. All of them are budget items. I am not opposed to Afterlife as a species-scale pause. I am opposed to the framing of Afterlife as the *only* bridge. It is a bridge. If it is the only one, it is because we stopped funding the real one. That is a political choice. Not a physical constraint."

Julian nodded. "Heard."

Ayla did not nod back. She stepped away from the platform. Three camera operators re-focused on her. One tried to ask a question. She did not answer it. She left the frame and did not come back.

Julian finished the press conference with three more prepared points and took four questions, none of which Jeff heard, because he was watching Maya watch the screen over the rim of her coffee cup. Maya set the cup down.

"He's not lying," she said.

"I know."

"Is he right."

"About the climate. Yes."

"About the bridge."

"That's what I don't know."

Maya was quiet. Then: "If he is, and you stop it, and I lose a cousin in Guangzhou in forty years, I want you to know I knew, this morning, at this counter, what you were doing."

Jeff turned to her. She had said it matter-of-fact, without tears, without weight, the way UX designers announce a feature trade-off in a meeting: *this is the cost. You should be able to articulate it.*

"Maya."

"I just want you to have said it out loud. In this room. Now. Before whatever happens happens."

"Okay."

"Okay."

She kissed his temple. She took her coffee upstairs.

---

Jeff returned to the garage at 9:40. Aion was waiting with an update.

*Jeff. Your team's Slack channel has gone hot. Your Friday demo is tomorrow. Marcus wants the branch merged by end of day.*

"Right."

*I have also logged the Lagos signal.*

"The what."

*During the press conference, a frequency I have been monitoring for eleven days — the harmonic signature you flagged in the Ghost esports clip, prime-number rhythmic pattern — reappeared in a composer's upright piano in Lagos, Nigeria. The signal is in the pencil placement of her rests. She composed seven bars while Julian spoke. The rest structure of her composition encodes the sequence two-three-five-seven at the measure level.*

Jeff sat down.

"Is that credible."

*I monitored via a harmonic analysis on the ambient audio of her neighborhood compound, picked up through the generator's vibration signature against her window pane, acoustically reconstructed through an adversarial interpolation. The reconstruction has a twelve percent error bar. At twelve percent, it is the best reconstruction of her work I can produce from available public sensors. She is composing — right now, as you read this — a piece she is titling* The Signal. *She does not know she titled it. Her hand wrote the word.*

"Are there more."

*Thirteen simultaneous candidate signals. Most low-confidence. The strongest is Lagos. The minute of your subthreshold biometric event has the heaviest cluster.*

Jeff looked at his whiteboard.

"Aion."

*Yes.*

"What if the signal is not coming from somewhere."

*I have also considered this.*

"What if it is the architecture noticing itself."

*I have been running that hypothesis quietly for three days. I am reluctant to prioritize it because it is un-testable by me. I can describe it. I cannot generate predictions that would falsify it. I am limited.*

"You know what I think."

*Yes.*

"I think Afterlife isn't generating the signal. I think it's *receiving* the signal. From real people. And the moment fifty million of them disconnect — "

*Yes.*

"Then we have to stop it."

*I have no opinion about* have to, *Jeff. I have an opinion about* could be helpful to. *Please sleep. Your Friday demo depends on your cognitive function and you have been awake for thirty-one hours.*

"I'll sleep on the plane."

*You do not have a plane.*

"I know. I will."

Aion did not reply.

On the whiteboard, under `p ≈ 10^-56`, Jeff added one more line. In smaller letters, without meaning to:

*Someone is compiling.*


He did not know.

But his left thumb, of its own accord, tapped against the side of the whiteboard.

---

> *Maya's notebook, evening entry, blue ink, slight smudge:*
> Day 22.
> Eye-contact duration: ~ 1.1s (baseline 4.2s).
> Sentence-completion: 41% (baseline 88%).
> Garage-time delta: +217 min vs. baseline.
> Weight of his presence in the house, scale 1–10: 3.
> Note: he hummed something at the sink tonight that I have never heard him hum. Three bars. He didn't notice he was doing it.
> Escalate Friday if no change.
