---
owner: "@frontend-team"
audience: ["dev", "ai"]
lastReviewed: 2025-07-15
---

# 📏 TypeScript & React Style Guide

A concise reference for writing idiomatic, readable code that passes ESLint/Prettier on the first try.

## 1. Project Settings

```jsonc
{
  "compilerOptions": {
    "target": "ES2020",
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@features/*": ["src/features/*"],
      "@ui/*": ["packages/ui-kit/*"]
    }
  }
}
```

## 2. Naming Conventions

| Element | Rule | Example |
|---------|------|---------|
| Files | kebab‑case | `story-wizard.tsx` |
| Components | PascalCase | `StoryWizard` |
| Hooks | `use` prefix | `useFetchStory` |
| Types | PascalCase | `StoryPage` |
| Enums | PascalCase, singular | `StoryStatus` |

## 3. Component Guidelines

* Prefer **function components** with React 19 automatic `use` boundaries.
* Co‑locate component file, styles, and tests.
* Use **Tailwind** classes; avoid inline styles.
* Default export the component and named export its skeleton if needed:

```tsx
export default function Button({ children }: Props) { … }
export type { Props as ButtonProps };
```

## 4. Type Safety Patterns

### 4.1 Avoid `any`

* Use **generics** or **unknown** + type guards.

### 4.2 Discriminated Unions

```ts
type Loading = { status: "loading" };
type Success<T> = { status: "success"; data: T };
type Error = { status: "error"; error: string };

type Result<T> = Loading | Success<T> | Error;
```

### 4.3 Branded Types for IDs

```ts
type Brand<T, B> = T & { __brand: B };

export type StoryId = Brand<string, "StoryId">;
```

Prevents passing a `UserId` where a `StoryId` is expected.

## 5. ESLint Rules (excerpt)

* `@typescript-eslint/explicit-function-return-type`: **warn**
* `react-hooks/exhaustive-deps`: **error**
* `import/no-default-export`: **off** (allowed for components)

## 6. Common Error Fixes

| Error | Quick Fix |
|-------|-----------|
| *Property 'xyz' does not exist on type* | Add generic param or extend interface |
| *JSX element implicitly has type 'any'* | Add `React.FC<Props>` or define props |
| *Missing return type on function* | Annotate return type (`: Promise<void>`) |

## 7. Accessibility Checklist

* Every **interactive element** must have `aria‑label` or visible text.
* Use **`<button>`** over clickable `<div>` for semantics.
* Ensure color contrast ≥ 4.5:1 (WCAG AA).

---

_Follow this guide, and ESLint + TypeScript should stay green on first commit._
