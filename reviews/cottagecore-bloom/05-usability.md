# Usability — Cottagecore Bloom

**Dimension:** Usability
**Score:** 88/100
**Severity:** ✅

---

## Summary

The site passes Nielsen's heuristics well: consistent navigation, visible focus states, working mobile nav with keyboard support (Escape key, focus return), logical information architecture, and a primary download funnel reachable in ≤2 clicks from home. One minor issue: the Download page provides GitHub links for clients rather than direct download artifacts (acceptable per content.json spec), and the site has no error/empty states for user actions (no forms, so minimal risk).

---

## Findings

### ✅ Correct implementations (Nielsen heuristics)

**Heuristic 1 — Visibility of system status**
- Skip link present and visible on focus — `base.css:207–226`
- `aria-expanded` on nav toggle is kept in sync — `main.js:16–18`
- Mobile nav closes on outside click — `main.js:21–26`

**Heuristic 2 — Match between system and the real world**
- Navigation labels are plain-language: Features, Clients, Download, Plugins, Docs, Hub, About — familiar to any media server user
- Client status badges (stable/beta) use familiar software release terminology

**Heuristic 3 — User control and freedom**
- Escape key closes mobile nav and returns focus to toggle — `main.js:28–34`
- Mobile nav closes on outside click — `main.js:21–26`
- "Skip to main content" skip link provides escape from header navigation for keyboard users — `index.html:57`

**Heuristic 4 — Consistency and standards**
- 8 pages follow identical shell structure; nav identical on all pages
- `aria-current="page"` correctly set on active nav item — e.g., `index.html:70`
- Button styles (`btn`, `btn-primary`, `btn-secondary`) consistent across all pages

**Heuristic 5 — Error prevention**
- No forms on the site (no input fields, no validation opportunities)
- `type="submit"` buttons absent (no forms)
- External links use `rel="noopener noreferrer"` — `index.html:98`

**Heuristic 8 — Aesthetic and minimalist design**
- Garden-cream/warm-ivory palette is cohesive; no visual clutter
- Generous whitespace; content breathes (abundant white space per brand kit)
- Only one primary CTA color (Garden Rose) visible at a time

**Download funnel ≤2 clicks** — `index.html:97`: "Get Phlix" → `download.html` (1 click) → download cards present (direct GitHub links). From home to download: Home → "Get Phlix" button = 1 click. ✓ Per new_site.md §5.

**Primary CTA above fold** — `index.html:97`: "Get Phlix" button in hero section, hero is `min-height: 90vh`, button is in first viewport. ✓

**Mobile nav works** — Hamburger toggle appears at 900px breakpoint (`components.css:117`), opens full-width menu, closes on Esc or outside click. Tested via keyboard: toggle receives focus, activates, menu opens, Escape closes. ✓

### ⚠️ Minor notes

**No direct download artifacts** — `download.html` provides GitHub repository links for clients rather than direct download files (e.g., `.exe`, `.pkg`, `.apk`). This is a known limitation of the content.json spec ("store_url: null" for all clients). Not a usability failure, but users expecting a direct install will need to navigate through GitHub releases. Content.json is authoritative here, so no fix required.

**No inline error messages** — No form inputs on the site; no validation error UI to assess. The toast notification component exists in CSS (`components.css:464–502`) but is not triggered by any JS in `main.js`. This is acceptable — the component is available for future use.

**No empty/loading states forPrimrose** — Brand kit specifies Primrose the bumble bee appears in "loading screens and empty states." No loading states are rendered on this static marketing site (there are no data fetches). This is brand-kit guidance for app contexts rather than static pages; not a defect.

---

## Verdict

Usability is strong. Navigation is consistent, keyboard navigation works, the funnel is simple, and mobile works. The download page's GitHub-link-only approach is per content.json and not a site defect.
