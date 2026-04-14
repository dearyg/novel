// Technical terms for Audit Mode highlighting.
// Add entries here — they'll be auto-detected in chapter text.

const AUDIT_TERMS = [
  { term: "Shared Cache", tip: "A memory region accessible by multiple processes. Shared caches reduce latency but introduce coherence risks." },
  { term: "Buffer Overflow", tip: "When data exceeds its allocated memory boundary, overwriting adjacent memory. A classic exploit vector." },
  { term: "garbage collector", tip: "An automatic memory manager that reclaims objects no longer referenced by the program." },
  { term: "SIGKILL", tip: "Signal 9. The operating system's kill switch — immediate, unblockable, no cleanup." },
  { term: "neural mesh", tip: "A bio-digital interface layer bonded to the cerebral cortex. Allows direct read/write access to cognitive processes." },
  { term: "heap", tip: "The region of memory used for dynamic allocation. Persists until explicitly freed." },
  { term: "Full stack", tip: "In engineering: every layer from database to UI. In this clinic: every layer from motor cortex to subconscious." },
  { term: "whoami", tip: "A Unix command that prints the current user. Simple question — sometimes the hardest to answer." },
  { term: "process IDs", tip: "Unique integers assigned to each running process by the kernel." },
  { term: "checkpoint", tip: "A saved snapshot of process state, allowing recovery to a known-good configuration." },
  { term: "memory leak", tip: "When allocated memory is never freed, slowly consuming resources until the system fails." },
  { term: "fork", tip: "A system call that creates a copy of the calling process. The child inherits everything — except purpose." },
  { term: "deadlock", tip: "When two or more processes wait on each other forever. Nothing moves. Nothing resolves." },
  { term: "race condition", tip: "When system behavior depends on the timing of uncontrollable events. The outcome is never guaranteed." },
  { term: "kernel panic", tip: "An unrecoverable system error. The machine equivalent of losing consciousness." },
  { term: "null pointer", tip: "A reference that points to nothing. Dereferencing it crashes the program." },
  { term: "stack trace", tip: "A report of the active stack frames. It tells you where the program was when things went wrong." },
  { term: "segfault", tip: "Segmentation fault — accessing memory that doesn't belong to you. Instant termination." },
];

export default AUDIT_TERMS;
