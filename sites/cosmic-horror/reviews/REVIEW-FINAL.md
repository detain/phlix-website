# cosmic-horror — FINAL Review

**Site:** `sites/cosmic-horror/`
**Date:** 2026-07-29
**Reviewer:** Final Audit

---

## Verdict: NOT APPROVED

Both P0 defects from the previous review remain unfixed. The site cannot be approved for master.

---

## Critical Defects Still Present (❌)

### ❌ D9 — pitch_bullets section missing from index.html

`content.json:20–28` defines 7 pitch bullets. `index.html` has no section rendering these 7 items — no "Why Phlix?" heading, no `.pitch` class, no `<ul>` list of the 7 facts.

The home page instead has `#why-descend` (lines 345–387) with 4 custom brand-voice items that are not from `pitch_bullets`. This is not a pass — new_site.md §3.1 item 2 is explicit that the 7 pitch bullets must appear on the home page.

**Required:** Add `<h2>Why Phlix?</h2>` + `<ul class="pitch-list">` with all 7 items from `content.json.pitch_bullets`.

---

### ❌ D10 — download.html primary CTA links to docs, not download

`download.html:300–305`:

```html
<a href="https://detain.github.io/phlix-docs"
   class="btn btn-primary btn-large"
   rel="noopener noreferrer">
  Consult the Archives
</a>
```

The `.cta-banner` at the bottom of the download page — the highest-commitment moment in the funnel — drives users away from download and into the docs. The download page's primary CTA must link to a download destination (e.g., `href="download.html#server"` pointing to the install command section), not to external docs.

**Required:** Change primary CTA destination to the install command section or a valid download target.

---

## Checks That Pass (✅)

| Check | Status |
|-------|--------|
| og: + twitter: meta tags on index.html and download.html | ✅ Complete |
| Install command on download.html matches content.json | ✅ `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh \| sudo bash` — verbatim match |
| No Google Fonts CDN | ✅ All fonts self-hosted WOFF2 via @font-face |

---

## Summary

2 critical defects remain. Both were flagged in the previous review and neither has been addressed.

- **D9** (content accuracy): pitch_bullets not rendered — ❌ FAIL
- **D10** (CTA/funnel): download page CTA goes to docs — ❌ FAIL

Fix both P0 items and re-submit for final review.
