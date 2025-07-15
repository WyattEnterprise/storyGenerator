---
owner: "@ux-team"
audience: ["dev", "ai", "design"]
lastReviewed: 2025-07-15
---

# ♿ Accessibility Guidelines

We target **WCAG 2.1 AA** conformance across web and mobile.

## 1. Color & Contrast

| Level | Ratio |
|-------|-------|
| Normal text | **4.5:1** |
| Large text (≥ 24 px or 19 px bold) | **3:1** |
| UI components & graphics | **3:1** |

Use the Tailwind plugin `@tailwindcss-accessibility`.

## 2. Keyboard Navigation

* All interactive components reachable via **Tab** in logical order.
* `:focus` states must be visible (Tailwind `ring-2 ring-offset-2`).
* No key traps—Esc should close modals.

## 3. ARIA & Semantics

| Pattern | Rule |
|---------|------|
| Buttons | Use `<button>` element, not `<div>`. |
| Icons | `role="img"` + `aria-label`. |
| Modals | `role="dialog"` + `aria-modal="true"` + labelled title. |

## 4. Screen Reader Testing

* Use **NVDA** (Windows) and **VoiceOver** (macOS) on each major flow.
* Automated check with `axe-playwright` in E2E tests.

## 5. Motion & Animation

* Respect `prefers-reduced-motion`; disable heavy parallax for such users.
* Limit animation duration ≤ 200 ms unless essential.

## 6. Documentation

Each component story in Storybook must include **a11y notes**.

---

_Run `pnpm a11y:ci` before merging UI changes.  Update guidelines as WCAG evolves._
