---
owner: "@security-team"
audience: ["dev", "ai", "ops"]
lastReviewed: 2025-07-15
---

# 🔐 Threat Model

This document identifies key attack vectors and mitigation strategies for **Story Generator New**.

## 1. Assets & Trust Boundaries

| Asset | Threats | Impact if Compromised |
|-------|---------|-----------------------|
| User JWT | Session hijack | Account takeover |
| Firestore data | Injection, mis‑read | Data breach |
| GCS assets | Broken ACLs | PII leakage |
| Worker KV secrets | Key exfiltration | System compromise |

## 2. Top Threats & Mitigations

| Threat | Mitigation | Controls |
|--------|------------|----------|
| **XSS** | Strict CSP, React escapes HTML by default | `Content-Security-Policy` header via Worker |
| **CSRF** | SameSite=Lax cookies; JWT in `Authorization` header | N/A |
| **Broken Auth** | Firebase verifies ID tokens server‑side | Token revocation, TTL = 1 h |
| **Rate‑limiting Bypass** | Worker Durable Objects track IP & UID quotas | 429 on abuse |
| **AI Prompt Injection** | Sanitize user inputs; maintain system prompts | Output filtering |

## 3. Security Controls

* **Dependency Scanning** — Renovate & Snyk weekly scans.
* **Static Analysis** — ESLint security plugin in CI.
* **Secrets Management** — Cloudflare environment variables; no plaintext secrets in repo.
* **Backups** — Firestore daily exports to GCS coldline.

## 4. Incident Response

1. PagerDuty alert → `#incident` Slack.
2. Declare severity & establish commander.
3. Mitigate within **30 min** for Sev‑1.
4. Post‑mortem document within 24 h.

---

_Review quarterly or after any new external integration._
