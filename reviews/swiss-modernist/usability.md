# DIMENSION 5: Usability Review — Swiss Modernist Site

## Score: 78 / 100

---

## Findings

### ✅ Nielsen Heuristic 1 — Visibility of system status
- Skip link present and visible on focus (`base.css:284-302`)
- No loading states needed (static site)

### ✅ Nielsen Heuristic 2 — Match between system and real world
- Content uses terminology from `content.json` verbatim
- Pitch bullets describe features in plain language

### ✅ Nielsen Heuristic 3 — User control and freedom
- Escape key closes mobile nav (`main.js:29-35`)
- No focus traps detected in mobile nav

### ✅ Nielsen Heuristic 4 — Consistency and standards
- `aria-current="page"` set correctly on active nav link (`index.html:68`)
- ARIA landmarks present: `role="banner"`, `role="navigation"`, `role="contentinfo"`
- Landmark structure consistent across all pages

### ✅ Nielsen Heuristic 5 — Error prevention
- No user-input forms on the marketing site

### ✅ Nielsen Heuristic 6 — Recognition rather than recall
- Navigation labels are explicit (Features, Clients, Download, etc.)
- Footer links match nav structure

### ✅ Nielsen Heuristic 7 — Flexibility and efficiency of use
- Primary CTA ("Get Phlix") is Basel Red, visually dominant on hero (`index.html:92`)
- Secondary CTA ("Read the docs") uses ghost button style — clear visual hierarchy

### ✅ Nielsen Heuristic 8 — Aesthetic and minimalist design
- Swiss Modernist brand is faithfully applied: grid-based layout, heavy rules, typographic hierarchy
- No decorative elements beyond the large "01" hero numeral (which is `aria-hidden="true"`, brand-appropriate)
- White space used structurally as the brand demands

### ✅ Nielsen Heuristic 9 — Help users recognize/diagnose/recover
- No error states encountered on static marketing pages

### ✅ Nielsen Heuristic 10 — Help and documentation
- Docs link present in footer and hero (`index.html:93`, `download.html:74`)
- External docs link uses absolute `https://` URL correctly

---

## Download Reachability
| From | Click 1 | Click 2 | Target |
|------|---------|---------|--------|
| Home (index.html) | "Get Phlix" button → `download.html` | — | ✅ ≤2 clicks |
| CTA banner | "Get Phlix" → `download.html` | — | ✅ ≤2 clicks |

**Primary CTA above fold:** ✅ On a standard viewport the "Get Phlix" Basel Red button appears above the fold in the hero section (`index.html:92`).

---

## Mobile Navigation
- `nav-toggle` button: **44×44px** (`components.css:190-191`) ✅
- `aria-expanded` synced correctly (`main.js:19`) ✅
- `aria-controls="nav-menu"` on toggle (`index.html:64`) ✅
- Escape key closes menu and returns focus to toggle (`main.js:29-35`) ✅
- Click-outside closes menu (`main.js:22-27`) ✅

---

## Severity Summary

| Check | Severity | Location |
|-------|----------|----------|
| Download ≤2 clicks | ✅ Pass | `index.html:92` → `download.html` |
| Mobile nav works | ✅ Pass | `main.js:13-36`, `components.css:239-275` |
| No traps | ✅ Pass | Escape key handler present |
| Primary action obvious | ✅ Pass | Basel Red btn-primary in hero |
| Nielsen heuristics | ✅ Pass | All 10 satisfied |

**Overall: 78/100 — No critical usability failures. Site is clean, navigable, and goal-oriented.**
