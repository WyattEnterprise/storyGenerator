---
status: "Accepted"
date: 2025-07-15
owner: "@architecture-council"
deciders: ["@lead-dev", "@prod-mgr"]
supersedes: []
tags: ["folder-structure", "atomic-design"]
---

# ADR-0001: Adopt **Feature-First + Atomic Design** Folder Layout

## Context

We have a green-field codebase that will be maintained by both humans and AI coding agents.  
Key constraints:

* Fast, safe refactors as features evolve.
* Easy traceability between **user stories** and **code**.
* Minimise global namespace collisions when multiple agents generate code.

## Decision

* **Top-level `src/features/{storyId-slug}/…` directories** map 1-to-1 with backlog items.  
* Inside each feature, we follow Atomic Design sub-layers:
  * `atoms/` – unconcerned UI primitives
  * `molecules/` – small composites
  * `organisms/` – page-level sections
* Truly reusable atoms/molecules will be hoisted into `packages/ui-kit`.
* A living diagram (`docs/architecture/folder-structure.mmd`) visualises the structure and is regenerated on every merge.

## Consequences

* Deleting a feature automatically deletes its scoped components and tests.
* New contributors (human or AI) only need the story ID to find relevant code.
* Global search noise is reduced; fewer accidental imports across features.
* Moving a component from **feature scope → ui-kit** becomes an explicit refactor step.
