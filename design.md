# Athena-Neura · Knowledge Base Explorer — Design Document

> **Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · Lucide React  
> **Mock API:** All data fetching goes through `/app/api/` route handlers, designed to be swapped for a real backend with minimal changes.

---

## 1. Project Overview

A knowledge base management dashboard for the **Athena-Neura** AI system. Internal users manage FAQ articles organized into folders (topic clusters). The data is consumed by an LLM that queries this knowledge base at runtime. The UI supports authentication, folder/article CRUD, visibility controls, and read-only views for system instructions, API schema, and logs.

---

## 2. Design Tokens

### Colors
| Token | Value | Usage |
|---|---|---|
| `bg` | `#f5f5f3` | Page background |
| `surface` | `#ffffff` | Cards, sidebar, header |
| `border` | `#e8e8e5` | All dividers and card borders |
| `accent` | `#1a1a1a` | Primary text, primary button, nav active state |
| `muted` | `#6b6b6b` | Secondary text, labels |
| `subtle` | `#9b9b9b` | Placeholder, timestamps |
| `indigo-500` | `#6366f1` | Focus rings, input focus border |
| `indigo-600` | `#4f46e5` | Links, public tag, API schema display |
| `emerald-600` | `#059669` | Verified tag, system online indicator |
| `amber-600` | `#d97706` | Draft tag |
| `red-600` | `#dc2626` | Error messages, destructive actions |

### Typography
- **Primary font:** `DM Sans` (weights: 300, 400, 500, 600, 700)
- **Monospace font:** `DM Mono` (weights: 400, 500) — used in Instructions and Metadata sections
- Base font size: `14px`
- Label style: `11–12px, font-weight: 600, uppercase, letter-spacing: 0.04em, color: muted`

### Border Radius
- Cards / modals: `12px`
- Inputs / buttons: `8px`
- Tags / badges: `6px`
- Avatars: `50%`
- Logo box: `7–8px`

### Shadows
- Folder card hover: `0 4px 12px rgba(0,0,0,0.06)`
- Visibility active button: `0 1px 3px rgba(0,0,0,0.1)`
- Input focus ring: `0 0 0 3px rgba(99,102,241,0.1)` with `border-color: indigo-500`

### Scrollbar
Custom thin scrollbar: `5px width`, track transparent, thumb `#d4d4d0`, `border-radius: 99px`.

---

## 3. Component Library

### Buttons
```
btn-primary  → bg:#1a1a1a, text:white, hover:bg:#333, active:scale(0.98)
btn-ghost    → transparent bg, border:#e8e8e5, text:muted, hover:bg:#f5f5f3 text:accent
btn-icon     → no border, no bg, padding:6px, border-radius:6px, hover:bg:#f0f0ee
```

### Inputs
All inputs share class `input-base`:
- Border: `1px solid #e8e8e5`, border-radius: `8px`, padding: `10px 14px`
- Focus: `border-color: indigo-500` + indigo focus ring
- Placeholder: `#a0a0a0`
- Applies to: `<input>`, `<textarea>`, `<select>`

### Tags / Status Badges
```
tag-verified  → bg:#ecfdf5, text:#059669, border:#a7f3d0  — "AI Verified"
tag-draft     → bg:#fffbeb, text:#d97706, border:#fde68a  — "Draft"
tag-public    → bg:#eef2ff, text:#4f46e5, border:#c7d2fe  — "Public"
tag-private   → bg:#f5f5f3, text:#6b6b6b, border:#ddd     — "Private"
```
All tags: `inline-flex, align-items:center, gap:4px, padding:2px 8px, border-radius:6px, font-size:11px, font-weight:600`

### Cards
`.card` → `bg:#fff, border:1px solid #e8e8e5, border-radius:12px`

### Toast Notification
Fixed bottom-right, `bg:#1a1a1a`, white text, `border-radius:10px`, shown for 3 seconds. Contains a `check` icon in `#6ee7b7` (emerald).

### Visibility Toggle
Segmented control (Public / Private). Container: `bg:#f5f5f3, border:1px solid #e8e8e5, border-radius:8px, padding:3px`. Active button: `bg:#fff, shadow`. Inactive: transparent.

---

## 4. Layout

```
┌──────────────────────────────────────────────────┐
│ Sidebar (220px fixed) │ Header (56px fixed top)   │
│                       ├───────────────────────────┤
│  Brand logo + name    │                           │
│  Nav items            │   Scrollable Content      │
│                       │   (flex:1, overflow-y)    │
│  [New Entry button]   │                           │
│  User avatar + name   │                           │
└──────────────────────────────────────────────────┘
```

- Full viewport height, no page scroll — only the content area scrolls.
- Sidebar: `width:220px`, `border-right:1px solid #e8e8e5`, `bg:#fff`, flex column with space-between.
- Header: `height:56px`, `bg:#fff`, `border-bottom:1px solid #e8e8e5`, contains section title (left) and global search (right).

---

## 5. Pages & Routes

### `/` → Redirect to `/login` if unauthenticated, else `/dashboard`

### `/login`
- Centered auth card (`max-width:400px`, `border-radius:16px`, `padding:40px`)
- Logo at top: dark box (`36×36px`) with `cpu` icon in `#a5b4fc`
- Two panels toggled in-place: **Login** and **Request Access (Signup)**
- After signup: **Email Sent** panel with a mockup email preview card
- Login form: email + password → POST `/api/auth/login`
- Signup form: full name + work email + password → POST `/api/auth/signup`
- Error display: `bg:#fef2f2, border:#fca5a5, text:#dc2626`

### `/dashboard` (authenticated shell)
All sub-sections rendered within the main shell layout. Navigation switches the active content section without a full page change.

---

## 6. Sections (within Dashboard)

### 6.1 FAQ Library — Directory View (default)
**Route context:** active nav = "FAQ Library"

- Page heading: "Knowledge Folders" + subtitle
- Top-right actions: `Reset` (ghost) + `New Folder` (primary)
- **Folders grid:** `grid, auto-fill, minmax(240px,1fr), gap:14px`
- **Stats bar** (bottom of grid): Articles count · Folders count · Verified count · System status pulse

**Folder Card variants:**
```
dark  → bg:#1a1a1a, text:white  (shield icon)
blue  → bg:#eef2ff, border:#c7d2fe  (credit-card icon)
light → bg:#fff, border:#e8e8e5  (folder icon)
```
Each card shows: scope badge (top-left), visual icon (top-right), title, description, article count.  
Hover state: `border-color:#bbb, box-shadow: 0 4px 12px rgba(0,0,0,0.06)`.

### 6.2 FAQ Library — Folder Detail View
Triggered by clicking a folder card.

- Back button (ghost, chevron-left) + folder title + scope badge chip + description
- `Add FAQ` button (primary, top-right)
- Inline search bar (filters FAQs within folder)
- FAQ list (vertical stack, `gap:10px`)
- Empty state: dashed border card with help-circle icon + prompt to add first FAQ

**FAQ List Item:**
- Left: status tag (Verified/Draft) + visibility tag (Public/Private) + question text
- Right: edit icon button + delete icon button (turns red on hover)
- Below: answer in a `bg:#f9f9f8` inset box, `border-radius:8px`

### 6.3 Instructions
- Static read-only view
- Displays the system prompt in a `<pre>` block: `bg:#f5f5f3, font:DM Mono, font-size:12px`

### 6.4 Metadata / API Schema
- Displays the API endpoint: `GET /api/v2/faqs?format=athena-neura-optimized`
- Styled block: `bg:#eef2ff, text:#4f46e5, font:DM Mono, border-radius:8px`

### 6.5 System Logs
- Dark terminal panel: `bg:#1a1a1a, text:#6ee7b7 (emerald), font:DM Mono, font-size:12px`
- Fixed height `360px`, scrollable
- Log line format: `[YYYY-MM-DD HH:MM:SS] [LEVEL] Message.`

---

## 7. Modals

All modals use the same pattern:
- Backdrop: `fixed inset-0, bg:rgba(0,0,0,0.3), backdrop-filter:blur(4px)`, centered flex
- Modal box: `bg:#fff, border-radius:14px, padding:24px, max-width:480px, width:100%`
- Header: title (left) + close `×` icon button (right), `border-bottom:1px solid #f0f0ee`
- Footer: Cancel (ghost) + Submit (primary), right-aligned, `border-top:1px solid #f0f0ee`

### Modal: Create Folder
Fields: Folder Title (text) · Scope Badge (text, auto-uppercased, defaults to "DOC") · Description (textarea) · Visual Style (radio: Dark / Blue / Light)

### Modal: Add / Edit FAQ Entry
Fields: Topic Folder (select) · Status (select: AI Verified / Draft) · Visibility (segmented toggle: Public / Private) · Question (text) · Answer (textarea)
- Hidden fields: `faq-action` (create/edit), `faq-id`
- Visibility hint text updates below the toggle

---

## 8. Navigation

```tsx
const navItems = [
  { label: 'FAQ Library',   icon: 'book-open',  section: 'faq'          },
  { label: 'Instructions',  icon: 'terminal',   section: 'instructions' },
  { label: 'Metadata',      icon: 'code',       section: 'metadata'     },
  { label: 'System Logs',   icon: 'activity',   section: 'logs'         },
]
```

Nav item styles:
- Default: `bg:transparent, text:muted`, hover: `bg:#ebebea, text:accent`
- Active: `bg:#1a1a1a, text:white` (icon opacity 0.7)

---

## 9. Data Models (TypeScript)

```ts
type FolderPreset = 'dark' | 'blue' | 'light'

interface KnowledgeFolder {
  id: string           // slug, e.g. "developer-apis"
  title: string
  badge: string        // e.g. "DEV-03"
  description: string
  preset: FolderPreset
  icon: string         // lucide icon name
}

type FAQVisibility = 'public' | 'private'

interface FAQArticle {
  id: string
  folderId: string
  question: string
  answer: string
  isVerified: boolean
  visibility: FAQVisibility
  createdAt?: string
  updatedAt?: string
}

interface User {
  email: string
  name: string
  verified: boolean
}
```

---

## 10. Mock API Routes (`/app/api/`)

All routes return JSON. Replace handler internals with real DB calls when the backend is ready. Structure mirrors what a REST API would return.

### Auth
```
POST /api/auth/login
  body: { email: string, password: string }
  response: { user: User, token: string } | { error: string }

POST /api/auth/signup
  body: { name: string, email: string, password: string }
  response: { success: true, email: string } | { error: string }
```

### Folders
```
GET    /api/folders           → { folders: KnowledgeFolder[] }
POST   /api/folders           body: Omit<KnowledgeFolder,'id'>  → { folder: KnowledgeFolder }
PUT    /api/folders/[id]      body: Partial<KnowledgeFolder>    → { folder: KnowledgeFolder }
DELETE /api/folders/[id]                                        → { success: true }
```

### FAQ Articles
```
GET    /api/faqs              query: ?folderId=&q=   → { faqs: FAQArticle[] }
GET    /api/faqs/[id]                                → { faq: FAQArticle }
POST   /api/faqs              body: Omit<FAQArticle,'id'>       → { faq: FAQArticle }
PUT    /api/faqs/[id]         body: Partial<FAQArticle>         → { faq: FAQArticle }
DELETE /api/faqs/[id]                                           → { success: true }
```

### LLM Consumption Endpoint
```
GET /api/v2/faqs?format=athena-neura-optimized
  → Flat array of public+verified FAQs with folder context, optimized for LLM ingestion
  response: { folders: Array<{ folder: KnowledgeFolder, faqs: FAQArticle[] }> }
```

### Stats
```
GET /api/stats
  → { totalArticles: number, totalFolders: number, verifiedCount: number }
```

### Logs
```
GET /api/logs
  → { logs: Array<{ timestamp: string, level: 'INFO'|'OK'|'WARN'|'ERROR', message: string }> }
```

> **Mock implementation note:** Store data in a module-level in-memory array (or a local JSON file read with `fs`) inside each route handler. The data shape and response contract stay identical when swapping to a real database.

---

## 11. Auth Strategy

- On login, store a session token in an `httpOnly` cookie (or `localStorage` for mock).
- Protect all `/dashboard` routes via Next.js middleware (`middleware.ts`): redirect to `/login` if no valid session.
- Mock: seed a default admin user (`admin@motionu.com / admin123`) if none exists.
- Signup flow: simulate email verification — show the "email sent" panel with a mockup email preview. A "Verify my email →" link in the preview completes verification in the mock.

---

## 12. Animations & Transitions

```css
/* Fade-in on section/modal mount */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
}
.fade-in { animation: fadeIn 0.2s ease; }

/* System Online pulse dot */
@keyframes ping { ... } /* Tailwind animate-ping equivalent */
```

Apply `.fade-in` when: content sections switch, modals open, folder detail view mounts.

---

## 13. File Structure

```
/app
  /api
    /auth
      /login/route.ts
      /signup/route.ts
    /folders
      /route.ts           (GET, POST)
      /[id]/route.ts      (PUT, DELETE)
    /faqs
      /route.ts           (GET, POST)
      /[id]/route.ts      (GET, PUT, DELETE)
    /v2/faqs/route.ts     (LLM endpoint)
    /stats/route.ts
    /logs/route.ts
  /login/page.tsx
  /dashboard
    /layout.tsx           (sidebar + header shell)
    /page.tsx             (redirect to /dashboard/faq)
    /faq/page.tsx
    /faq/[folderId]/page.tsx
    /instructions/page.tsx
    /metadata/page.tsx
    /logs/page.tsx
  layout.tsx
  globals.css

/components
  /ui
    Button.tsx
    Input.tsx
    Modal.tsx
    Tag.tsx
    Toast.tsx
    VisibilityToggle.tsx
  /layout
    Sidebar.tsx
    Header.tsx
  /folders
    FolderCard.tsx
    FolderGrid.tsx
    CreateFolderModal.tsx
  /faqs
    FAQItem.tsx
    FAQList.tsx
    FAQModal.tsx
  /auth
    LoginForm.tsx
    SignupForm.tsx
    EmailSentPanel.tsx
  StatsBar.tsx
  LogTerminal.tsx

/lib
  /api
    folders.ts            (fetch helpers wrapping /api/folders)
    faqs.ts
    auth.ts
    stats.ts
    logs.ts
  types.ts                (all shared TS interfaces)
  mock-data.ts            (seed data for mock API)

/middleware.ts             (auth guard)
```

---

## 14. Key UX Behaviours

- **Global search** (header): filters folder cards by title/description in real-time. Triggers a return to directory view if inside a folder detail.
- **Folder search**: scoped to FAQs within the open folder.
- **Delete FAQ**: browser `confirm()` dialog before deletion (replace with a modal confirmation for production).
- **Folder ID generation**: slugified from title (`toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'')`). Duplicate IDs are rejected with a toast error.
- **Toast**: fires after every create, update, delete. Auto-dismisses after 3 seconds.
- **Stats bar**: recalculates after any CRUD operation.

---

## 15. Seed / Demo Data

Pre-populate the mock API with at least 3 folders and 2–3 FAQs each to demonstrate the UI immediately. Suggested folders:

| ID | Title | Badge | Preset |
|---|---|---|---|
| `authentication` | Authentication | AUTH-01 | dark |
| `billing` | Billing & Payments | BILL-02 | blue |
| `developer-apis` | Developer APIs | DEV-03 | light |
