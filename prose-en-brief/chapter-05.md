# Chapter 5 — 0x05: The Ghost Commit

At 6:47 a.m. Jeff finds a commit on his repo dated 03:14:22 UTC — the exact minute he was asleep tasting Krug. The diff is beautiful, refactoring a hot loop he had been fighting for three weeks. The signature is valid; the stylometric encoder places the code closer to his cluster centroid than any commit he has ever written. Aion traces the push to a marine satellite uplink: vessel *The Singleton*.

He tries to access internal Anomaly Reports. Access denied. A query reveals seventeen tickets in eighteen months — fourteen filed by automated systems, all closed within six hours by Dr. Lena Vasquez, Meridian's chief science officer.

His own HR file has a new line: a wellness flag from Vasquez, mandatory neurological evaluation Friday. Aion proves the flag's timestamp was cosmetically retimed to align with the ghost commit — Vasquez has been monitoring the telemetry channel in real time.

At 12:08 his personal phone rings. Marcus Meridian — Julian's estranged half-brother, a physician running a clinic in Fresno — has been seeing patients with impossible biometric overlaps for eighteen months. A leaked Meridian memo lists Jeff as the fifteenth name; of the fourteen before him, three are dead, four committed, five relocated, two gagged. Jeff is the only one still answering a phone.

Jeff calls Marcus back from a parking-garage payphone. When he returns to his desk, his badge no longer opens the fourth floor.

That afternoon Jeff watches an esports stream of nineteen-year-old Park Ji-yeon — *Ghost* — reacting to opponent inputs at forty-seven milliseconds, below the human minimum. Between rounds she taps prime numbers on her desk. The same rhythm Jeff's own thumb has been beating for weeks.

Jeff suspects corporate espionage on his credentials — perhaps Julian himself. It is the wrong theory. He will hold it for three chapters anyway, because holding the wrong theory in the right shape lets him keep walking forward.

---

```cpp
/* Discovery Log: 0x05 */
if (commit.author == self && commit.origin != self.location) {
    throw AuthenticationParadox("Identity verified. Location impossible.");
}
```
