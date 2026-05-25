# Context — Life of an SDE

The **source of truth** for the novel. Mirrors what's stored in Supabase (`novels.manifest` and `chapters.blueprint`).

Paste these into any AI session to align new chapter generation with the universe's rules.

## Files

- **`story-bible.md`** — the COMPLETE narrative guide. All characters (deep profiles, arcs, philosophy), the 2030 world, and expanded blueprints for all 20 chapters. This is the primary reference for chapter generation.
- **`master-schema.md`** — the architectural V.2030 schema. Core metaphors, 20-chapter manifest, somatic constants, audit-mode logic, Discovery Log library. Stored in `novels.manifest`.
- **`system-manifest.json`** — the JSON manifest with global variables and chapter metadata.
- **`chapters/chapter-NN-blueprint.md`** — per-chapter narrative blueprint (all 20 chapters). Each includes: system architecture JSON, role, setting, narrative beats (6-8 detailed beats with dialogue), philosophy thread, sub-story beats, interactive choice points, reader misdirection notes, stylistic constraints, mandatory code footer. Stored in `chapters.blueprint`.

## The Pipeline

```
Human-written blueprint  ─►  AI-evolved prose  ─►  Reader-selected style
(chapters/*.md)              (chapters.content)     (chapter_styles.content)
```

The writer never writes prose directly. They write a blueprint, feed it + the master schema to the AI, and the AI produces the chapter. Each subsequent "iteration" can refine the prose further.
