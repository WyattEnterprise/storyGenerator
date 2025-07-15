---
owner: "@ai-platform-team"
audience: ["ai"]
lastReviewed: 2025-07-15
---

# 🤖 AI Coding Agent Guidelines

These rules help automated agents (Claude, ChatGPT, GitHub Copilot Workspaces, etc.) create code that merges cleanly and passes CI **first try**.

## 1. Planning

1. **Read**  
   * `docs/architecture/folder-structure.mmd` (canonical layout)  
   * `docs/product/epics-features-user-stories.md` (backlog)  
2. Identify the **exact user-story ID** you are implementing.  
3. If the feature folder doesn’t exist, **scaffold it** under  
   `src/features/{storyId-slug}/`.

## 2. File placement rules

| File type | Destination when unique to the story | Destination when shared |
|-----------|--------------------------------------|-------------------------|
| React atom | `atoms/` | `packages/ui-kit/atoms/` |
| React molecule | `molecules/` | `packages/ui-kit/molecules/` |
| Data-fetching hooks | `hooks/` | `packages/data/hooks/` |
| Unit test | `__tests__/` next to source | same folder as source |

## 3. Commit & branch conventions

* **Branch name:** `feat/{storyId}-{slug}`  
* **Commit prefix:** `[Story {storyId}]`  
* **PR template:** fill *all* checklist items, including doc links.

## 4. Code quality gates

| Check | Command in PR checks |
|-------|---------------------|
| Lint/format | `pnpm lint && pnpm format:check` |
| Unit tests | `pnpm test` |
| Type safety | `pnpm typecheck` |
| Bundle size (web) | `pnpm size:ci` |

CI must be green. Bots should auto-fix ESLint and Prettier issues before opening a PR.

## 5. Documentation duties

* Update **feature README** front-matter (`status`, `owner`, etc.).  
* If you introduce an architectural change, create a new ADR in  
  `docs/architecture/adr/`.  
* When adding public API routes or DB collections, append to the relevant doc under `docs/reference/`.

## 6. Limits & guard-rails

* **No new dependencies** without ADR approval.  
* **No global imports** that bypass the feature boundary.  
* **No secrets** committed—use environment variables defined in `.env.example`.  
* **Accessibility:** All interactive elements must have ARIA labels and pass WCAG 2.1 AA colour contrast.  
* **Performance:** Keep any bundle increase under **5 kB gzipped** per PR.

## 7. Pull-request hand-off

After opening a PR:

1. Tag `@reviewers` based on CODEOWNERS.
2. Post a short changelog in the PR description (bullet list).
3. Attach generated screenshots or Storybook links for UI work.
4. Await at least **one human LGTM** before merging.

---

Happy coding — and remember: **“feature first, atoms later.”**
