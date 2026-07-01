# Usability (Nielsen Heuristics)

## Score: 90/100

## Findings
- ✅ Primary CTA "Get Phlix" visible in hero section — index.html:142 — hero has `min-height: 90vh` (theme.css:144) — above fold on any viewport ≥600px tall
- ✅ Download page reachable in ≤2 clicks from home: index.html → "Get Phlix" CTA → download.html ✅; also index.html → nav "Download" link → download.html ✅
- ✅ Download page itself contains the server install snippet and client download cards — download.html:64-176 — the page IS the download destination, with secondary CTA pointing to docs
- ✅ Mobile nav: hamburger toggle (`.nav-toggle`) exists on all pages — properly hidden via `display: none` at >768px, shown via media query at ≤768px — components.css:80-81
- ✅ Mobile nav: opens on click — main.js:33-40 toggles `is-open` class, updates `aria-expanded`
- ✅ Mobile nav: closes on outside click — main.js:48-56
- ✅ Mobile nav: closes on Escape key — main.js:42-46
- ✅ Mobile nav: focus trap when open — main.js:60-84 (trapFocus function)
- ✅ All footer links are functional and use `rel="noopener noreferrer"` on external links
- ✅ All 5 client cards on clients.html have at least one action button (View source + Download →) — clients.html:81-83, 99-101, 118-120, 136-138, 154
- ⚠️ docs.html: all 4 documentation links (User guide, API reference, Developer docs, Hub admin) point to the same root URL `https://detain.github.io/phlix-docs` — no specific anchor or sub-path differentiation. new_site.md §3.6 says "link out to site.social.docs" which is the root URL, so technically correct per spec. However, a user who wants "API reference" specifically cannot reach it without additional clicks within the VitePress site. Minor UX concern — not a spec violation.
- ✅ No orphan pages detected: all 8 pages are reachable from the nav, and the sitemap.xml confirms all are linked
- ✅ `aria-expanded` is kept in sync with nav state — main.js:21, 28
- ✅ `aria-controls="nav-menu"` present on nav-toggle — all pages
- ✅ External links use `rel="noopener noreferrer"` — verified on GitHub links throughout
- ✅ `tabindex="-1"` on `#main-content` allows programmatic focus — all pages

## Summary
Usability is strong. Primary CTA is above fold, download funnel is ≤2 clicks, mobile nav works correctly (toggle, close on outside click, close on Escape, focus trap). All footer links are functional and marked safe. All client cards have action buttons. The one ⚠️ is docs.html linking all four doc sections to the same root URL — acceptable per spec but worth noting as a UX gap. No dead ends, no orphan pages. Score 90/100 — passes.
