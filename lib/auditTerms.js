// Technical terms for Audit Mode — mapped to The Senior Observer's universe.
// Each tooltip blends real CS definitions with in-world metadata.

const AUDIT_TERMS = [
  {
    term: "Shared Cache Leak",
    tip: "[POINTER_ERROR] High-priority sensory data from one instance accidentally read by a low-priority runtime. The core bug of Partition Integrity.",
  },
  {
    term: "Buffer Overflow",
    tip: "[PARTITION_BREACH] Premium-sector memory spills past allocated bounds into a legacy sector. Often manifests as a wealth-tier sensory bleed.",
  },
  {
    term: "Priority Inversion",
    tip: "[SCHEDULER_CONFLICT] A low-priority instance holds a resource lock over a high-priority one. In-world: Kael's hunger overriding Julian's satiety.",
  },
  {
    term: "Pointer Aliasing",
    tip: "[MEMORY_COLLISION] Two distinct variables (Jeff, Kael) resolve to the same underlying memory address. Triggered by synchronized sensory input.",
  },
  {
    term: "Race Condition",
    tip: "[PARALLEL_WRITE] Two threads modify the same variable simultaneously. Causes non-deterministic identity bleed.",
  },
  {
    term: "Merge Conflict",
    tip: "[BRANCH_FATAL] Two divergent histories (Irvine_SDE / Seattle_Legacy) colliding at the same spatial coordinate. Requires manual resolution.",
  },
  {
    term: "Kernel Panic",
    tip: "[SYSTEM_HALT] Central OS fails to recover from fatal partition errors. Manifests as mass hallucination events.",
  },
  {
    term: "Garbage Collection",
    tip: "[MEMORY_RECLAMATION] Freeing memory by destroying unreferenced objects. In-world: individual histories wiped to save global compute.",
  },
  {
    term: "Hash Collision",
    tip: "[AUDIT_FAIL] Two distinct inputs generate the same output identifier. Aion biometric scans of the daughters match the exact same Primary Key.",
  },
  {
    term: "Privilege Escalation",
    tip: "[ROOT_DETECTED] A user-level instance discovers its biometric signature matches the admin profile. Jeff walks into Julian's HQ; the scanner says: WELCOME, JULIAN VANCE.",
  },
  {
    term: "Context Switch",
    tip: "[THREAD_SWAP] OS saves state of one thread and loads another. Jeff didn't dream as Julian — he was scheduled as Julian.",
  },
  {
    term: "Singleton",
    tip: "[DESIGN_PATTERN] A class restricted to exactly one instance. In this universe: there is only one Observer. All characters are sandboxed copies sharing the same execution thread.",
  },
  {
    term: "Aion",
    tip: "[KERNEL_MONITOR] Post-2026 hardware-level AI daemon. Monitors biometric integrity and silently patches metaphysical leaks by logging them as stress, ADHD static, or hallucination.",
  },
  {
    term: "Project Afterlife",
    tip: "[META_SIMULATION] Julian Vance's public initiative — a neural matrix offering infinite digital utopias. Dramatic irony: the characters are already inside a system of this exact architecture.",
  },
  {
    term: "Somatic Bleed",
    tip: "[SENSORY_INJECT] The manifestation event: foreign sensory data (weight, taste, temperature) from another instance physically overwrites the active runtime's perception.",
  },
  {
    term: "Vacheron Constantin Celestia",
    tip: "[OBJECT_TAG] UID: Julian_Vance. Platinum, 40mm, ~98g. Access from any other UID = Pointer Error. Biometric proof of the bleed.",
  },
  {
    term: "The Singleton",
    tip: "[YACHT_INSTANCE] Julian's 300-foot mega-yacht on the Amalfi Coast. The name is not subtle. Julian named his most valuable asset after the architectural pattern he unknowingly embodies.",
  },
  {
    term: "Santa Ana",
    tip: "[ENV_VAR] Irvine ambient weather constant. Carries the scent of Scorched Sage — one of the four Somatic Constants flagging an imminent bleed.",
  },
  {
    term: "Scorched Sage",
    tip: "[SOMATIC_CONSTANT #3] Olfactory bridge across instances. Carried by Santa Ana winds to Jeff; wafting from Seattle's wet alleys to Kael; infused as bespoke fragrance for Julian.",
  },
  {
    term: "Amber",
    tip: "[SOMATIC_CONSTANT #1] 580nm wavelength. The system's warning LED. Ambient light shifts amber milliseconds before a bleed event — Aion's visible tell.",
  },
  {
    term: "Prime-Number Tic",
    tip: "[SOMATIC_CONSTANT #2] Shared nervous habit across all instances — tapping 2, 3, 5, 7 on the left thigh under cognitive load. Hardcoded at the Observer layer.",
  },
  {
    term: "Omni-Telemetry",
    tip: "[HERO_POWER] The Anchor's ability in the 2030 film Post-Doom. Reads reality's 'server logs' to know any character's location and ability. The writers don't know they're describing root access.",
  },
  {
    term: "Partition",
    tip: "[INSTANCE_BOUNDARY] The sandbox container around each person (Jeff, Kael, Julian, Maya). Provisioned with wealth_tier, location_string, history_hash environment variables.",
  },
  {
    term: "Observer",
    tip: "[PRIMARY_KEY] The only real execution thread. All 'people' are views into this singleton. Jeff is the first instance to notice.",
  },
];

export default AUDIT_TERMS;
