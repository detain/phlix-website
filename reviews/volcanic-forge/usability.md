# Usability Review — Volcanic Forge

**Score: 92 / 100** ✅

---

## Nielsen Heuristics Evaluation

### 1. Visibility of system status
✅ **PASS** — `aria-current="page"` on the active nav link (`index.html:113`, `download.html:46`, etc.) correctly indicates the current page. Client cards on `clients.html` show status badges (`status-stable`, `status-beta`) for each client platform.

### 2. Match between system and real world
✅ **PASS** — Brand voice is intense, direct, and technical. Navigation labels ("Features", "Clients", "Download", "Docs", "Hub", "About") use familiar, standard conventions. No unexplained symbols or confusing taxonomy.

### 3. User control and freedom
✅ **PASS** — Mobile nav (the primary escape risk) has multiple exit paths:
- **Escape key** closes mobile nav (`js/main.js:31-35`)
- **Outside click** closes mobile nav (`js/main.js:22-27`)
- **Toggle button** toggles open/closed state (`js/main.js:16-19`)
- **Skip-to-content link** present on all pages (`index.html:100` and all other pages)

No dead-end states found.

### 4. Consistency and standards
✅ **PASS** — Consistent `site-header` / `site-footer` structure across all 8 pages. Consistent button hierarchy (`btn-primary`, `btn-secondary`, `btn-ghost`). Consistent `aria-label` usage on nav toggle.

### 5. Error prevention
N/A — No forms, no user data entry on the marketing site.

### 6. Recognition rather than recall
✅ **PASS** — Navigation items are labeled text (not icon-only). Feature cards have clear headings + icons. Footer has labeled column headings.

### 7. Flexibility and efficiency
✅ **PASS** — Keyboard accessible: all interactive elements are focusable. Focus styles visible (`--color-focus: 2px solid #E8611A` with 2px offset at `base.css:133-136`). `prefers-reduced-motion` respected at `base.css:174-181`.

### 8. Aesthetic and minimalist design
✅ **PASS** — Dark obsidian background, single molten orange accent per section, clear visual hierarchy. No decorative clutter. Text is readable and scannable.

### 9. Help users recognize/fix errors
N/A — No interactive error states on this static marketing site.

### 10. Help and documentation
✅ **PASS** — "Docs" nav item and a dedicated `docs.html` page with links to user guide, API reference, developer docs, and hub admin guide. Consistent footer "Developers" column with external doc links.

---

## Download reachable in ≤2 clicks from home

✅ **PASS (1 click from hero, 1 click from CTA banner)**

From `index.html`:
- **Hero CTA** → "Get Phlix" links directly to `download.html` → **1 click**
- **CTA banner** → "Download Phlix" links to `download.html` → **1 click**
- **Nav "Download"** → directly to `download.html` → **1 click**

`download.html` itself presents client download options immediately — no sub-navigation required.

---

## Mobile nav works

✅ **PASS** — Full implementation in `js/main.js:12-37`:

```javascript
// index.html:37-41 — toggle button with ARIA
<button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="nav-menu">
  <svg width="24" height="24" ...>...</svg>
</button>

// js/main.js:16-19 — click toggles is-open class + aria-expanded
// js/main.js:22-27 — outside click closes
// js/main.js:31-35 — Escape key closes and returns focus to toggle
```

**Mobile breakpoint:** `@media (width <= 768px)` at `components.css:529` shows the toggle and collapses the nav menu into a dropdown. Toggle is `display: flex` at mobile, `display: none` at desktop.

**Issue found (minor):** At `components.css:549`, the open class is `is-open`, but the CSS at `components.css:549-551` applies `display: flex` with no `transition` — the menu appears instantly with no animation. Not a usability failure, but inconsistent with the brand's "slow build → fast release" motion principle.

---

## No traps or stuck states

✅ **PASS** — Every modal-like state (mobile nav) has a documented escape path:
- `Escape` key handler at `main.js:31`
- Outside click handler at `main.js:23`
- Focus returns to toggle on close (`main.js:34`: `navToggle.focus()`)

No loading spinners, no overlay modals, no async states that could hang.

---

## Obvious primary action

✅ **PASS** — Each page surface has exactly **one molten orange primary CTA**:

| Page | Primary CTA | Location |
|---|---|---|
| `index.html` | "Get Phlix" (btn-primary) | Hero section |
| `download.html` | "Get Roku" / "Get Tizen" / "Get Windows" (btn-primary) | Client cards |
| `features.html` | "Download Phlix" (btn-primary btn-large) | CTA banner |
| `clients.html` | "Download Now" (btn-primary btn-large) | CTA banner |
| `plugins.html` | "Get the example plugin" (btn-primary) | CTA banner |
| `hub.html` | "Get started" (btn-primary btn-large) | CTA banner |

Secondary actions use `btn-secondary` (outlined) styling, visually subordinate. No page has two molten orange filled buttons simultaneously.

---

## Summary

| Check | Result |
|---|---|
| Nielsen heuristics (visibility, control, consistency, recognition, flexibility, aesthetic, help) | ✅ PASS |
| Download ≤2 clicks from home | ✅ PASS (1 click from hero) |
| Mobile nav works | ✅ PASS (Escape + outside-click + toggle) |
| No traps or stuck states | ✅ PASS |
| Obvious primary action (one per screen) | ✅ PASS |

**Minor note:** Mobile nav menu appears instantly without animation (no transition on `is-open` display change). Not a failure — just off-brand for the "forge" motion philosophy.
