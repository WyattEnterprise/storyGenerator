---
owner: "@core-team"
audience: ["dev", "ai"]
lastReviewed: 2025-07-15
---

# 🚀 Getting Started

Welcome! These steps get a fresh clone running in under **5 minutes**.

## 1. Prerequisites

| Tool | Minimum Version | Install |
| ---- | --------------- | ------- |
| **Node** | 20 LTS | <https://nodejs.org> |
| **PNPM** | 9.x | `npm i -g pnpm` |
| **Git** | 2.40 | <https://git-scm.com> |
| **Docker** *(optional)* | 24.x | <https://docs.docker.com/get-docker/> |

> **Why PNPM?** — Workspace support, deterministic lockfile, disk‑efficient store.

## 2. Clone & bootstrap

```bash
git clone git@github.com:your-org/your-repo.git
cd your-repo
pnpm install
```

1. First‑party packages live in `packages/*`.
2. Copy and fill secrets:

```bash
cp .env.example .env
```

## 3. One‑command dev server

```bash
pnpm dev          # starts all services concurrently
```

| Service | Port | Notes |
| ------- | ---- | ----- |
| Web (Next.js) | 3000 | Auto‑reload on code changes |
| Cloudflare Worker | 8787 | Local devtools |
| Storybook UI‑kit | 6006 | Visual component explorer |

## 4. Run the test suite

```bash
pnpm test            # vitest + Playwright
```

* Unit tests live beside code in `__tests__/`.
* E2E specs live in `tests/e2e`.

## 5. Lint & format

```bash
pnpm lint            # eslint + stylelint
pnpm format          # prettier
```

CI blocks the merge if either command fails.

## 6. Docs preview

```bash
pnpm docs:preview    # serves /docs via VitePress
```

Open <http://localhost:5173> to view rendered Markdown, Mermaid diagrams, and ADRs.

---

Happy hacking! If anything here gets out of date, update this file and bump the **`lastReviewed`** date in the front‑matter.
