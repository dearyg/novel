# Chapter 10 — 0x0A: The Primary Key

Maya takes the children to her mother's. The empty house pre-warms the oven for Thursday pizza-leftover night because the smart-home's model has not been updated. Jeff goes to the garage and runs the full audit.

Aion's first finding: Jeff's daughters Iris and Nora share an identical 256-bit Primary Key in Meridian's identity platform — byte for byte, across fourteen hash seeds. The platform thinks of them as a single entity running on two distinct bodies.

Jeff remembers the Sunday Nora fell on the patio. In the kitchen at the same half-second, Iris had reached down and grabbed her own left knee — the *exact* knee Nora had landed on, before the angle could disclose which knee. The girls had been telling him for years.

The audit also returns a thirteen-sigma biometric overlap with Julian Meridian, seven matches in Marcus's clinic patients, a match with the wounded Andean conscript Tomás Arroyo, and Lena's seventeen suppressed names. Aion plots the structure. Fifteen nodes. One hundred and five edges. Every pair connected. *That is not a cluster. That is one thing with fifteen viewpoints.*

While reading the graph, Jeff is hit by the feeling of dying — exposure cold, blue skin, heart slowing. He is on wet concrete in {{user_location}} *and* on his kitchen floor. Ninety seconds. Then sirens; warmth flooding back.

A query against {{user_location}} EMS returns one hypothermia revival in the matching window: an unhoused man, age thirty-four, logged as Kael Sorensen.

Aion calls the class Cross-Instance Near-Death and notes that dying, from inside, resembled a function call completing — a thread wrapping up to return a value.

Jeff calls Maya. She tells him Iris had asked at seven that evening if Daddy was cold. She tells him to find out what he needs to find out and come home. He sleeps ninety minutes on the couch and at 5 a.m. drives to the airport.

---

```cpp
/* Discovery Log: 0x0A */
if (daughter_A.primary_key == daughter_B.primary_key) {
    throw IntegrityViolation("Unique constraint failed. Two instances, one key.");
}
// They're different people. The data says they're the same.
// Both statements are true.
```
