---
owner: "@backend-team"
audience: ["dev", "ai"]
lastReviewed: 2025-07-15
---

# 🗄️ Firestore Schema

Firestore runs in **Native mode** with **flexible security rules**.  
Document shapes are expressed in TypeScript‐style interfaces.

## 1. Collections

### 1.1 `users`

| Field | Type | Notes |
|-------|------|-------|
| `uid` | `string` | Firebase UID (document ID) |
| `email` | `string` |
| `displayName` | `string` |
| `createdAt` | `Timestamp` |
| `avatarUrl` | `string` | Optional |

### 1.2 `stories`

| Field | Type | Notes |
|-------|------|-------|
| `id` | `string` | Document ID |
| `ownerId` | `string` | UID reference to `users` |
| `config` | `StoryConfig` | See REST API ref |
| `status` | `"queued" | "generating" | "completed" | "error"` |
| `pages` | `StoryPage[]` | Generated content |
| `createdAt` | `Timestamp` |
| `updatedAt` | `Timestamp` |

#### Sub‑collection: `pages`

> Only created for **large stories** to avoid 1 MiB doc size limit.

| Field | Type | Notes |
|-------|------|-------|
| `index` | `number` |
| `content` | `string` |
| `imageUrl` | `string` | Optional |

### 1.3 `avatars`

| Field | Type |
|-------|------|
| `id` | `string` (doc ID) |
| `ownerId` | `string` |
| `url` | `string` |
| `style` | `"retro" | "anime" | "realistic"` |
| `createdAt` | `Timestamp` |

## 2. Indexes

| Collection | Composite Index | Order |
|------------|-----------------|-------|
| `stories` | `ownerId` + `createdAt` | `desc` |
| `avatars` | `ownerId` + `createdAt` | `desc` |

Create indexes via `firebase firestore:indexes.json`.

## 3. Security Rules (excerpt)

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    match /stories/{storyId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.ownerId;
    }

    match /avatars/{avatarId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == request.resource.data.ownerId;
    }
  }
}
```

---

_Update shapes and rules here whenever the Firestore schema evolves._
