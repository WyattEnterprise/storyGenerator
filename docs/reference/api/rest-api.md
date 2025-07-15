---
owner: "@backend-team"
audience: ["dev", "ai"]
lastReviewed: 2025-07-15
---

# 🌐 REST API Reference

This document lists all public endpoints exposed by the Cloudflare Worker **BFF**.  
All routes are prefixed with `/api/` and return JSON unless noted.

## 1. Authentication

All requests require a **Bearer JWT** issued by Firebase Auth.

```http
Authorization: Bearer <id-token>
```

Unauthorized requests return **`401 Unauthorized`**.

## 2. Endpoints

### 2.1 `POST /api/generateStory`

| Field | Type | Description |
|-------|------|-------------|
| `storyConfig` | `object` | Complete configuration object (see schema below). |

*Returns* `202 Accepted` with:

```json
{
  "id": "story_9ZfR3q",
  "status": "queued"
}
```

The Worker enqueues a task and streams progress via Firestore `stories/{id}`.

### 2.2 `GET /api/stories/:id`

Fetch a **single story document**.

*Response 200*:

```json
{
  "id": "story_9ZfR3q",
  "title": "The Lost City",
  "status": "completed",
  "pages": [ ... ]
}
```

Errors:

| Code | Reason |
|------|--------|
| 404 | Not found / permission denied |

### 2.3 `GET /api/stories?limit=&after=`  

Paginated list of stories for the current user.

| Query | Default | Notes |
|-------|---------|-------|
| `limit` | `20` | Max `50` |
| `after` | — | Cursor (story ID) |

### 2.4 `POST /api/avatar`

Uploads an image or prompt and triggers external AI avatar generation.

Body (`multipart/form-data`):

| Part | Required | Notes |
|------|----------|-------|
| `file` | if `prompt` absent | Image file (PNG/JPEG) |
| `prompt` | if `file` absent | Text prompt for avatar |
| `style` | optional | `"retro" | "anime" | "realistic"` |

Returns `201 Created`:

```json
{
  "id": "avatar_XYZ",
  "url": "https://storage.googleapis.com/.../avatar_XYZ.png"
}
```

---

## 3. Story Config Schema

```ts
interface StoryConfig {
  theme: "fantasy" | "sci-fi" | "mystery";
  length: "short" | "medium" | "long";
  language: "en" | "es" | "fr";
  includeImages: boolean;
}
```

---

## 4. Error Format

All error responses share:

```json
{
  "error": "InvalidInput",
  "message": "Length must be one of: short, medium, long"
}
```

**Error codes**

| Code | Error | HTTP Status |
|------|-------|-------------|
| `InvalidInput` | 400 |
| `Unauthorized` | 401 |
| `NotFound` | 404 |
| `RateLimited` | 429 |
| `ServerError` | 500 |

---

_Update this file whenever an endpoint or schema changes and adjust `lastReviewed`._
