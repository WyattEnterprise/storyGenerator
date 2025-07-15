---
owner: "@devops-team"
audience: ["dev", "ai", "ops"]
lastReviewed: 2025-07-15
---

# 🚀 Deployment & Rollback Run‑book

> TL;DR — Production lives on **Cloudflare Pages** + **Workers**; assets on **GCS**.

## 1. Staging Deploy (automated)

1. Merge PR → `main` branch triggers GitHub Actions job `deploy-staging`.
2. Job builds artifacts and pushes to Cloudflare Pages preview environment.
3. Slack bot posts URL `https://pr-<hash>.pages.dev`.

## 2. Production Deploy (manual approval)

1. Confirm staging E2E tests **pass**.
2. In GitHub Actions → `deploy-prod` workflow → **Run** → choose commit SHA.
3. Approver must be in the `Maintainers` team.
4. Job promotes Pages preview to production domain `https://app.storygen.com`.
5. Cloudflare Worker KV namespace is version‑tagged with commit SHA.

## 3. Rollback

| Scenario | Action |
|----------|--------|
| Pages deployment error | Cloudflare Dashboard → Pages → Select previous build → **Rollback** |
| Worker regression | `pnpm deploy:worker --tag <previous-sha>` |
| GCS asset issue | Restore object version via GCS bucket UI |

Rollback steps should complete in **< 5 minutes** to meet SLA.

## 4. Smoke Test Checklist

After deployment:

- [ ] Login works.
- [ ] Generate story succeeds (queue → completed).
- [ ] CDN images load (`/assets/...`).
- [ ] No 5xx errors in Cloudflare Logs for last 5 min.

Automated monitoring via Statuspage pings `/healthz` every minute.

## 5. Environment Matrix

| Env | Branch | Domain | DB | AI Provider |
|-----|--------|--------|----|-------------|
| **Local** | any | `localhost:3000` | Emulator | Stub |
| **Staging** | `main` | `staging.storygen.com` | `storygen-staging` | Sandbox |
| **Prod** | tagged | `app.storygen.com` | `storygen-prod` | Live |

---

_Update on any infra change and bump `lastReviewed`.  Use this guide during incident post‑mortems._
