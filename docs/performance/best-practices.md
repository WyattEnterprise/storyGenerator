---
owner: "@performance-team"
audience: ["dev", "ai"]
lastReviewed: 2025-07-15
---

# 🚄 Performance Best Practices

Our UX target: **Largest Contentful Paint ≤ 2.5 s** on 3G Fast using a mid‑tier device.

## 1. Bundle Size Budgets

| Target | Budget (gzip) |
|--------|---------------|
| Initial JS | **< 250 kB** |
| Route change | **< 150 kB** |
| UI‑kit package | **< 50 kB** |

CI fails if budgets exceeded (`pnpm size:ci`).

## 2. Code‑Splitting

* Use **dynamic imports** with React Suspense for heavy components (`markdown-editor`, `three‑viewer`).
* Prefetch route JS with `<Link prefetch="intent">`.

## 3. Images

* Serve **AVIF** / **WebP** via Cloudflare Images.
* Use `next/image` for automatic sizing.
* Lazy‑load offscreen images (`loading="lazy"`).

## 4. API Performance

* Cache generated stories in Worker KV for 5 min.
* Use Gzip compression (`Content-Encoding: br, gzip`).
* Keep REST payloads ≤ 100 kB.

## 5. Monitoring & Alerts

* Lighthouse CI on every PR.
* Real user monitoring via `@cf/speed-insights`.
* Slack alert when LCP p95 > 3 s for 30 min.

---

_Review budgets whenever adding a major dependency._
