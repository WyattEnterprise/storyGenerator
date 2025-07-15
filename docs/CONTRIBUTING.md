---
owner: "@core-team"
audience: ["dev", "ai"]
lastReviewed: 2025-07-15
---

# 🤝 Contributing

Thanks for helping improve the project! Follow these guidelines to ensure smooth reviews and merges.

## 1. Branching

* **Feature branches:** `feat/{storyId}-{slug}`
* **Bug fix:** `fix/{issue-number}-{slug}`
* **Docs-only:** `docs/{topic}`

## 2. Commit message format

```
[Story 4.2] Add SliderGroup atom
```

* **Type prefix** (optional): `feat:`, `fix:`, `docs:`
* **Scope**: Story ID or issue #
* **Message**: Concise imperative sentence

## 3. Pull‑request checklist

- [ ] CI passes (`lint`, `test`, `typecheck`, `size`)
- [ ] Docs updated (README, ADR, API, etc.)
- [ ] Added/updated tests
- [ ] Story acceptance criteria met
- [ ] No secrets or hard‑coded credentials
- [ ] Screenshots or Storybook link for UI changes

## 4. Code style & tooling

| Tool | Command | Auto‑fix |
|------|---------|---------|
| **ESLint** | `pnpm lint` | `pnpm lint --fix` |
| **Prettier** | `pnpm format` | `pnpm format` |
| **Stylelint** | `pnpm lint:css` | `pnpm lint:css --fix` |

The CI pipeline auto‑runs these; please run locally to avoid red builds.

## 5. Tests

* Unit tests: colocated `__tests__/file.test.ts`
* Integration/E2E: `tests/e2e`
* Snapshot tests must be committed.

Run all tests:

```bash
pnpm test
```

## 6. Signing commits

GPG‑sign your commits if possible. Unsigned commits are still accepted but will trigger a bot reminder.

## 7. Code of Conduct

We follow the [Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/). Be respectful and inclusive.

---

Happy contributing! Ping `@maintainers` on Slack for any questions.
