---
owner: "@qa-team"
audience: ["dev", "ai"]
lastReviewed: 2025-07-15
---

# ✅ Testing Guide

A shared strategy ensures that all code—human or AI‑generated—ships with predictable quality.

## 1. Test Pyramid

```mermaid
graph TD
  U[E2E<br/>(Playwright)]:::e2e
  I[Integration<br/>(React Testing Library)]:::integration
  U --> I
  Ux[Unit<br/>(Vitest)]:::unit
  I --> Ux

  classDef e2e fill:#e6f4ff,stroke:#1e88e5;
  classDef integration fill:#fefde1,stroke:#f9a825;
  classDef unit fill:#e8f5e9,stroke:#43a047;
```

| Layer | What to test | Where |
|-------|--------------|-------|
| **Unit** | Pure functions, hooks, small atoms | Adjacent `__tests__/*.test.ts` |
| **Integration** | Component trees, API + DB boundary | `tests/integration/` |
| **End‑to‑End** | Full user journeys in browser | `tests/e2e/` (Playwright) |

## 2. Naming & Placement

| Code Path | Test Path |
|-----------|-----------|
| `src/features/story‑wizard/atoms/Input.tsx` | `src/features/story‑wizard/atoms/__tests__/Input.test.tsx` |
| `packages/ui‑kit/molecules/Modal.tsx` | `packages/ui‑kit/molecules/__tests__/Modal.test.tsx` |

## 3. Tooling Commands

| Task | Command |
|------|---------|
| Run all tests | `pnpm test` |
| Watch unit tests | `pnpm test -w` |
| Update Playwright snapshots | `pnpm e2e:update` |
| Generate coverage | `pnpm coverage` |

Coverage must remain **≥ 80 % statements**; CI fails otherwise.

## 4. Test Data & Fixtures

* Use **MSW (Mock Service Worker)** for API mocks in unit/integration.
* Use **Firestore Emulator** for integration tests touching the DB.
* Seed test‑only collections via `scripts/seedTestData.ts`.

## 5. Accessibility & Performance Assertions

* Run `@testing-library/jest‑dom` for a11y roles & attributes.
* Playwright E2E scripts include `pw‑metrics` to assert Time‑to‑Interactive ≤ 3 s.

## 6. AI Agent Checklist

Before committing, ensure:

- [ ] New components have at least **one unit test**.
- [ ] Critical flows modified? Add/extend integration test.
- [ ] Updated snapshots committed.
- [ ] Coverage threshold untouched or increased.

---

_Maintain this guide as tooling evolves and adjust coverage targets annually._
