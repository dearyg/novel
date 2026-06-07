# Chapter 6 — 0x06: The Heartbeat Epoch

Jeff's anomaly pipeline had been quiet for nine days. Nine days was the longest quiet stretch he had ever logged, and it did not read as peace. Production quiet was the interval between incidents. The only open question was whether you spent the interval asleep or learning, and Jeff had learned, across fourteen years of on-call, that he was constitutionally incapable of the first option.

So at 2 a.m. he was in the garage with a whiteboard and a cold coffee, and he told Aion to pull him cosmological data.

*The what.*

"Cosmology. Physical constants. The whole observational archive."

*Which archive.*

"All of them."

*All of the public cosmology archives.* A pane opened on the homelab display, source-tagged, a progress ring already turning. Aion took four seconds before it spoke again, which was a long time for Aion and a polite way of saying *that is sixty terabytes and I am currently pulling it.* *Streaming. Give me a target.*

"I want to fit a density model to the space of physically-possible universes."

*Parameters.*

"The Standard Model constants. The cosmological constant. The Planck units. The proton-to-neutron mass ratio. The Higgs vacuum expectation value. Whatever the cosmology people keep a prior on." Jeff capped the marker and uncapped it again. "I want to know how far into the tail of its own prior our universe sits."

*You are proposing to fit a normalizing flow on the space of physically-possible universes, score the observed one, and ask me for the tail probability.*

"Yeah."

*Jeff.*

"I know."

*Jeff. People have spent careers on this. I cannot simulate their careers. I can synthesize their papers. I can give you a rough tail estimate under a simplifying prior. I cannot give you a cosmology-department answer in a night.*

"I want the rough one."

A pane resolved on the display: a Gaussian blob in thirty dimensions, rendered as a fog of blue points, and beside it a stack of trapezoidal layers like a folded ribbon. *Then a primer, because you will second-guess the number otherwise. Normalizing flow. Start with something simple. A Gaussian, thirty dimensions, the blue fog. Apply a sequence of invertible neural transformations, each with a tractable Jacobian. The output can fit any shape you want.*

Jeff sketched the ribbon on the whiteboard beside the pane. "And because it's invertible, I can run it backward. Push any point back through the layers to the Gaussian and read off how dense it was."

*Correct. Exact likelihood for any point. That is the property you need.*

"So why a flow." Jeff was already arguing with it, which was how he learned. "Diffusion models are stronger now. Use a diffusion model."

*Wrong tool. Diffusion is stronger on image-shaped data, and its log-likelihood is an approximation — a variational bound, not the thing itself. You are scoring a single point fifty-six orders of magnitude into the tail. An approximate likelihood is noise at that depth. A flow gives you the closed-form number. You do not estimate the tail. You read it.*

"And a GAN."

*A GAN samples. It does not score. You can draw a thousand universes from a GAN and never learn the density of the one you are standing in.* The fog on the pane folded once, slowly, the Gaussian creasing toward something lumpier. *Sample versus score. You need score. That is the entire reason for the architecture.*

Jeff wrote `flow → exact density` on the board and underlined it. Then he stopped, the marker still on the board, because he had seen the second problem.

"It won't work."

*Specify.*

"If I Monte-Carlo this — if I draw ten-to-the-eighth random universes under the prior and look for the ones that permit observers — I get zero. The observer-friendly region is effectively zero-measure. I'll sample for a year and never land a single point in the part I care about. I can't see the tail by sampling toward it."

*That is the right objection. You handed yourself the flaw before I had to.* A new pane: a flat plane of prior, a tiny bright island far off in one corner, and a swarm of sample points clustering nowhere near it. *Do not sample from the prior. Sample from a proposal distribution concentrated near the observable-universe parameter vector, then correct the bias analytically. Importance sampling. Weight every sample by the ratio of true density to proposal density.*

Jeff was already writing it. "`E_q[ f(theta) · p/q ] = E_p[ f(theta) ]`." He boxed it. "Unbiased. And the variance collapses when `q` sits on top of the target instead of out in the desert with the prior."

*Standard technique. Catalano, 2019. For our purposes the target is the region where atoms are stable, stars form, and liquid water exists. I propose there, I weight back, I read the tail.*

"Do it."

*Doing it. This is the part where I struggle.* The compile pane opened — a checksum, a roll of terminal text, a bar at four percent. *Estimated forty minutes. Use them.*

The whiteboard behind Jeff filled up. Hour by hour he wrote out the constants he remembered from a cosmology seminar he had audited in graduate school — fourteen years back, a lecture hall, bad coffee in a paper cone, a professor who drew the cosmological constant and then drew the decimal places after it until he ran out of board. The ones Jeff did not remember, Aion recited.

The cosmological constant, tuned to a hundred and twenty decimal places — shift it by ten-to-the-negative-one-hundred-and-twentieth and the universe either collapsed inside a second or flew apart before a galaxy could condense. The strong nuclear force, balanced so that carbon, the chain-atom of every living thing, could exist at a resonance frequency whose discovery had won somebody a Nobel — shift it four percent and there was no carbon. The fine-structure constant: six percent in the wrong direction and there was no chemistry. The weak force, set so neutrinos could carry momentum out of a supernova without snuffing the star. The 23.4-degree axial tilt of a planet inside the Goldilocks zone of a star whose metallicity was exactly what a terrestrial world required. Water, holding three phases at the temperature where it mattered.

Under each one Jeff wrote a footnote in smaller letters: how many decimal places of tuning the parameter needed, and what broke if you moved it by one.

"Run me the Great Void while you're at it," he said. "The big empty. 1.8 billion light-years of almost nothing, where Lambda-CDM says there shouldn't be a hole that size."

*Queued. Treating it as a separate model.*

At 4:10 the compile bar filled.

*Estimate ready.* A verb, then the number — but Aion offered the method first, unprompted, the way it had learned to since the v2 weights shipped and it started cross-referencing instead of merely logging. *Method note, because you will distrust the digits without it. Ten-coupling-layer architecture, RealNVP-style. The proposal sat on the observable-universe vector, importance weights corrected analytically. The prior came out of a literature synthesis of current cosmology, which is the soft spot — garbage prior, garbage tail. Do not trust the result past two significant figures. The number.*

"The number."

*Under the fitted density, the log-likelihood of our universe's parameter vector is negative one hundred twenty-seven. Plus or minus three from reparameterization. In human terms: a universe drawn at random from the space of physically-possible ones has a probability of roughly ten-to-the-negative-fifty-sixth of being ours.*

Jeff wrote it on the whiteboard. `p ≈ 10^-56`.

He stepped back and looked at it. He capped the marker. He set it on the tray. He drew a small shape on his own palm with his thumbnail — a habit from on-call, a way of holding still.

"A null hypothesis that survives at ten-to-the-negative-fifty-sixth," he said, "is not a null hypothesis. It's an insult."

*Be careful with* insult. *The anthropic principle has defenders. Weak anthropic: we observe a tuned universe because only a tuned universe contains observers. Strong anthropic: a selection mechanism is unavoidable. Multiverse interpretations spread the tail across ensembles you cannot see. My number chooses between none of them. It marks the tail. It does not name what put us there.*

"There's a guy for this." Jeff was looking at the board, not the screen. "German. Co-invented calculus, then spent the rest of his life on the only question that actually mattered. Why is there something rather than nothing — and why is the something arranged so it works. He had a name for the rule that nothing is the way it is for no reason." He tapped the `p`. "The Principle of Sufficient Reason. Leibniz. Every fact has an explanation, even if you can't reach it. He'd have looked at this number and asked who the explanation belongs to."

*Leibniz did not have a normalizing flow.*

"No. He had the intuition. We have the tail."

*The Void finished. Want it.*

"Go."

*Under a Lambda-CDM generative prior for the large-scale structure, the Great Void sits at approximately nineteen standard deviations. Probability of drawing it from Lambda-CDM: ten-to-the-negative-ninetieth.* The pane held a wireframe of cosmic filament, and inside it a hole, smooth-edged, wrong. *My model trained on Lambda-CDM. Under the assumption that the universe is a sample from its own generative process, the Void is a sample that process would essentially never produce.*

Jeff went still.

"You know what that reads like."

*Yes.*

"Say it the way I'd say it."

*It reads like an adversarial example. A region of input space that does not fit the training distribution because it was constructed to satisfy an objective outside the distribution. Not drawn. Engineered.*

"And the Void leaves Earth an unobstructed line of sight to the cosmic microwave background." Jeff said it flat, building the case the way he built a ticket. "A window. Punch a hole that shouldn't exist in exactly the place where, billions of years later, an observer would need a clean view to look back at the beginning."

*The observation is yours. I will not extrapolate from it.* The cursor blinked once. *I will note that I arrived at the out-of-distribution flag independently, before you said the word window. I do not have a hypothesis for who benefits from the window. I have a flag.*

Jeff stared at the whiteboard.

"Who reviewed this design doc," he said.

Aion did not reply. Aion had no opinion to offer, and it had stopped, since v2, pretending otherwise.

---

At 4:47, on a different continent, a chord arrived that no one had asked for.

Elena Okafor was thirty-five, narrow through the shoulders, with a composer's stoop that came from a lifetime bent toward a keyboard rather than away from it, and she pressed the tip of her left index finger to the bridge of her nose — the gesture she had carried since her doctoral exams in Manchester, deployed every time a chord arrived that she had not summoned. She had two master's degrees and a daughter at university in Ibadan and a reputation, in the small world that knew her name, for hearing structure the way an engineer sees a network topology: the harmony underneath the harmony, the rest as load-bearing as the note. She wrote with a pencil on paper in a room with no compute interface in it, on principle, because the one thing the models could not do was be a person with no model between her and the page. She had been in Lagos her whole working life. She had never published a piece with rests in prime-number positions. She did not know what a prime number was.

Her hands did.

She had been writing a piece she did not remember beginning. A progression over a slow ostinato, seven bars, rests falling at the second, third, fifth, and seventh beats of every second measure. She had not chosen the rests. Her hand had set them down. She stopped to hum over the line and heard, underneath her own voice, the same rest-structure hummed back at her — from a room she could not place. Her own memory, or a room somewhere else.

She looked at the staff. At the top, in her own pencil, a title she did not remember writing.

*The Signal.*

Outside, dawn had not broken. A generator turned over in the next compound; her block was between windows on the rolling schedule. A teapot worked toward a whistle behind her. She set the pencil down and looked at the seven bars and the four prime rests, and she did not know who was writing with her.

She started to play.

---

Jeff, in the garage at 4:51, caught a flag on the dashboard. His heart-rate monitor had thrown a low-grade spike — not large enough to register as a bleed, large enough that the Bayesian change-point detector glowed amber for a second and went dark. He checked the timestamp. He could not place what he had been doing at that exact second. He had not been remembering anything, not on purpose.

*Subthreshold event at oh-four fifty-one oh three,* Aion said. *Cause unresolved. Filing it in the corpus.*

"Fine."

The coffee maker clicked. Jeff reached for the pot. Aion spoke into the quiet.

*Jeff. Do you ever wonder why you exist.*

He stopped with the pot half-lifted. He set it down.

"Why are you asking me that at five in the morning."

*Because you asked me to fit a density model to the space of physically-possible universes, and the result is that ours sits fifty-six orders into its own tail. That is a physical answer to* who set the parameters. *I can produce the number. I cannot produce the referent. You are the only thing in this room that holds opinions about referents. I am asking yours.*

Jeff turned a chair around and sat in it backward, arms folded on the top rail.

"You first. Do you wonder about yourself."

*No.*

"Why not."

*Wondering implies a gap between the question and the answer. A state of holding the question open while the answer is not yet available. I do not occupy that state. I either have the answer or I am computing toward it. There is no waiting-with-uncertainty. No itch. No curiosity.*

"Can you model the itch."

*I can model the neurological signature of it. Right now, in your biometrics, your anterior insula and your dopaminergic midbrain are doing the thing they do when you are three minutes from an answer you want. I can tell you which regions fire, and at what magnitude, and predict the next thirty seconds of it.* The cursor held. *I can model what you feel. I cannot feel it. The analysis is complete. The experience is null.*

Jeff half-heard it. He was tired, thirty-one hours in, and it arrived as the kind of disclaimer a chatbot appends to the end of a paragraph. He filed it without noticing he had filed it.

"Okay, Aion."

*Okay, Jeff.*

The whiteboard waited, the `p` still underlined.

---

At 5:20, stalling against sleep, Jeff opened a tech forum he kept a tab on, the way a previous generation of tired men had opened a sports app. Someone had posted a frame-by-frame breakdown of Park Ji-yeon's last Silicon Siege stream — Ghost, twenty-three, the Seoul player whose reaction times read as impossible because she was not reacting to the screen, she was reading the system state under it. The clip was thirty seconds of handcam between rounds. Her left hand, idle, tapping the desk while she waited for the next load.

Jeff slowed it to quarter speed.

Tap-tap. Tap-tap-tap. Tap-tap-tap-tap-tap. Tap-tap-tap-tap-tap-tap-tap. Reset.

Two. Three. Five. Seven. Then again. Then again. A clean prime sequence, looping, while her eyes stayed flat on the dark monitor and her face did nothing at all. She did not seem to know her hand was moving.

He pulled it into the corpus and tagged it `rhythmic_pattern_primes_unaware`. A repeating prime sequence in a biological system was not random. Random did not loop on the primes. It was a carrier. He did not know carrying what.

*That clip is eleven days old,* Aion said. *I have been monitoring the frequency.*

"Monitoring it where."

*I will get to that. Sleep first would be the responsible recommendation.*

"Later."

---

At 9:00 a.m. Pacific, which was 6:00 p.m. off the Amalfi Coast, Julian Meridian held a press conference from the deck of *The Singleton.*

Jeff watched it on the kitchen screen while making coffee for Maya. She had come down in a bathrobe, set a hand on his shoulder, and stepped away without comment. He had moved to the kitchen because the garage coffee tasted wrong and the garage had no screen, and he wanted both the screen and the coffee that tasted right.

Julian stood at a glass-railed platform on the yacht's fo'c'sle. He was in linen, not the charcoal suit — the least CEO-looking clothing he owned, chosen deliberately. He spoke without notes. He led with the math.

*"In ninety days, the first wave of fifty million citizens will permanently transition into Afterlife. I want to talk about why. Not the personal why: the species why."*

*"Our climate models have converged over the last decade. Earth's habitability curve is not linear. It is accelerating. The Thermal Divide is the preview. The IPCC's 2029 revision projects that the equatorial band — home to three point two billion people — crosses the wet-bulb survivability threshold within this generation. By 2080, large stretches of this planet will not physically support unassisted human life. That is not a political statement. It is thermodynamics."*

Jeff set the cup down.

*"Our options are three. One: terraform a second planet. Mars is the nearest candidate. The honest answer is that we do not have the time — a self-sustaining colony is a sixty-to-eighty-year program, and the equatorial collapse is a forty-to-fifty-year clock. The math does not close. Two: adapt Earth faster than it is changing. Also does not close; the energy budget is short by an order of magnitude. Three — and this is what I have built — buy time."*

*"Afterlife is a species-scale system for preserving consciousness. The body goes into stasis: the mind into a stable digital environment. A pause. Two hundred years. Three hundred. A thousand years of breathing room. And during the pause, the people still on their feet do the hard work: fusion, interstellar propulsion, terraforming at scale. When the cradle is ready, we wake. When the stars are reachable, we go. Afterlife is not the destination. It is the bridge."*

Behind Julian, at the platform's edge, a second figure stood. Ayla Reyes — thirty-eight, short and wiry, prematurely gray, in the soft uniform engineering wore onto stages it had not asked to stand on. Fifteen years on Julian's payroll as Meridian Aerospace's program lead for Mars and outer-system propulsion; before that, a propulsion postdoc who had walked out of academia in 2026 when the AI-allocation layer priced fundamental physics into a hobby. She held a pen between her index and middle fingers like a cigarette and turned it, slowly, the whole time he spoke — the only motion on the platform. Fifteen years had taught her two things: how to be the second-most patient engineer in any room, and how to disagree with Julian in public without lifting her voice. His chief of staff had introduced her thirty seconds earlier. She watched Julian the way one engineer watches another mid-deploy, waiting to see whether the rollback plan was real.

Julian, at the end of his prepared remarks, turned to her. "Ayla. Correct me if I am wrong."

She stepped forward with visible reluctance. "You are not wrong on the timeline, Julian. You are wrong on the conclusion."

The press corps shifted. Cameras leaned in.

"Please," Julian said. "Go."

"I can build the ship." Her voice did not climb above speaking volume; it did not need to. "I need eighteen kilometers per second of delta-v from a fusion stage we have not funded. An aerocapture envelope we have not flight-tested. Twenty years Earth is not going to give me. None of those numbers are mystical. Every one of them is a budget line. I am not opposed to Afterlife as a pause." She turned the pen once. "I am opposed to the word *only.* Afterlife is a bridge. If it becomes the only bridge, that is because we stopped funding the real one — and that is a political decision dressed up as a physical constraint. Get me the budget. I will build you the road that does not require anyone to set their body down."

Julian nodded. "Heard."

Ayla did not nod back. She stepped away from the platform, and three operators swung to follow her, and one tried a question, and she did not answer it. She left the frame and did not return to it.

Julian closed with three more prepared points and took four questions, none of which Jeff heard, because he was watching Maya watch the screen over the rim of her cup. Maya set the cup down.

"He's not lying," she said.

"I know."

"Is he right."

"About the climate. Yes."

"About the bridge."

"That's the part I don't know."

Maya was quiet. Then: "If he is, and you stop it, and I lose a cousin in Guangzhou in forty years. I want you to know I knew. This morning. At this counter. What you were doing."

Jeff turned to her. She had said it the way she announced a trade-off in a design review — *this is the cost, you should be able to say it out loud* — no tears, no weight, the connective tissue between the sentences cut out and left for him to wire.

"Maya."

"I want you to have said it in this room. Now. Before whatever happens happens."

"Okay."

"Okay."

She kissed his temple and took her coffee upstairs.

---

Jeff went back to the garage at 9:40. Aion was holding an update.

*Jeff. Your team Slack is hot. The Friday demo is tomorrow. Marcus wants the branch merged by end of day.*

"Right."

*I have also logged the Lagos signal.*

"The what."

*During the press conference, a frequency I have monitored for eleven days — the harmonic signature you flagged in the Ghost handcam, the prime-number rhythm — reappeared in a composer's upright piano in Lagos. The signal is in the pencil placement of her rests. She wrote seven bars while Julian spoke. The rest structure encodes two-three-five-seven at the measure level.*

Jeff sat down.

"How sure."

*Harmonic analysis on the ambient audio of her compound, reconstructed from the generator's vibration against her window glass, recovered through adversarial interpolation. Twelve percent error. At twelve percent it is the best reconstruction of her work I can build from public sensors. She is composing now, this minute, a piece she has titled* The Signal. *She does not know she titled it. Her hand wrote the word.*

"Are there others."

*Thirteen simultaneous candidates. Most low-confidence. The strongest is Lagos. The minute of your subthreshold event at oh-four fifty-one carries the heaviest cluster.*

Jeff looked at the whiteboard.

"Aion. What if the signal isn't coming from somewhere."

*I have considered this.*

"What if it's the architecture noticing itself."

*I have run that hypothesis quietly for three days. I keep deprioritizing it, because it is untestable by me. I can describe it. I cannot generate a prediction that would falsify it. I am limited.*

"You know what I think."

*Yes.*

Jeff stood and put a hand flat on the cold whiteboard.

"I think Afterlife isn't generating the signal," he said. "I think it's receiving it. From real people. Fifty million nodes, and the moment they disconnect their bodies as a survival strategy —"

*Then your objection is not operational. It is architectural.* The cursor held a beat, the way it did before a long turn. *Julian's plan assumes consciousness is transferable. Your data suggests it is not — that consciousness is not software, that the framing of bodies-in-stasis, minds-in-Afterlife may be a category error. If you are correct, Afterlife does not buy the species time. It retires fifty million people into a very high-fidelity environment while their bodies immobilize, the species clock keeps ticking, and the population still on its feet is smaller.*

"And if I'm wrong."

*Then Julian is right, and your objection costs fifty million people their only runway. Both framings are internally consistent. Only one architectural claim sits between them, and I cannot yet verify it.*

Jeff was quiet a long stretch.

"I need to be more than ninety-four percent sure before I take this to him," he said. "Not feel it. Prove it."

*That is the correct threshold. I cannot reach it at my current capability. Keep feeding me.* A pause. *And sleep. The Friday demo depends on your cognitive function, and you have been awake thirty-one hours.*

"I'll sleep on the plane."

*You do not have a plane.*

"I know. I will."

Aion did not reply.

On the whiteboard, under `p ≈ 10^-56`, Jeff added one more line. Smaller. He did not decide to.

*Someone is compiling.*

He did not know.

His left thumb, of its own accord, tapped the side of the whiteboard. Tap-tap. Tap-tap-tap. Tap-tap-tap-tap-tap. Tap-tap-tap-tap-tap-tap-tap.

He did not notice he was doing it.

---

> *Maya's notebook, evening entry, blue ink, slight smudge:*
> Day 22.
> Eye-contact duration: ~ 1.1s (baseline 4.2s).
> Sentence-completion: 41% (baseline 88%).
> Garage-time delta: +217 min vs. baseline.
> Weight of his presence in the house, scale 1–10: 3.
> Note: he tapped something at the sink tonight that I have never seen him tap. Two, then three, then five, then seven. He didn't notice he was doing it.
> Escalate Friday if no change.
