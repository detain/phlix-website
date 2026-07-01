# Usability Review — Manga Studio (Nielsen Heuristics)

**Reviewer:** CodeReviewer (adversarial, 12-dimension)
**Score: 92 / 100**
**Status: ✅ Acceptable**

---

## Summary

The site passes all major Nielsen heuristics. Download is reachable in 1 click from home (hero CTA → download.html). Primary CTA "Get Phlix" is visible above the fold on home. Mobile nav works correctly with hamburger → menu. No dead-end pages — all 8 sections are interlinked with clear navigation. The only minor issue is that the primary CTA label "Get Phlix" could be slightly more descriptive (some users might not immediately infer it leads to download), and the secondary CTA in the hero goes externally rather than to download.

---

## Findings

### ✅ PASS — Nielsen Heuristics

| # | Heuristic | Check | Evidence |
|---|-----------|-------|----------|
| 1 | Visibility of system status | Skip link present, footer tagline, breadcrumb-style nav | `.skip-link` in all HTML, footer shows "Open-source media, on your terms." — consistent |
| 2 | Match between system and real world | Kit vocabulary used contextually: "chapter", "panel", "arc" not misused; no jargon without explanation; DLNA, FFmpeg explained by context | "Plugin system with a real contract" (features), "DLNA for the devices you already own" (features) — clear real-world analogies |
| 3 | User control and freedom | Mobile nav closes on Escape key and outside click (main.js:33–38) | `document.addEventListener('keydown', function(e) { if (e.key === 'Escape'...) }` — provides escape from nav |
| 4 | Consistency and standards | All 8 pages share identical shell structure, same nav, same footer, same CSS classes | Consistent landmark structure: `role="banner"`, `role="navigation"`, `role="contentinfo"` on all pages |
| 5 | Error prevention | No form submission on this static site (no forms with dangerous actions) | Download page uses link buttons to GitHub repos, no user input that could cause errors |
| 6 | Recognition not recall | Navigation always visible (sticky header) | `.site-header { position: sticky; top: 0; }` — nav always accessible |
| 7 | Flexibility and efficiency of use | Download reachable in 1 click: index.html hero "Get Phlix" → download.html ✅ | Primary CTA target: `href="download.html"` in hero (index.html:78) |
| 8 | Aesthetic and minimalist design | High-contrast manga aesthetic, minimal decoration, clear visual hierarchy | No unnecessary ornamentation; every element is structural |
| 9 | Help users recognize errors | N/A — no user input forms; all interactions are link-based |
| 10 | Help and documentation | Docs.html links to all documentation categories; footer has Documentation link | docs.html:65–69 has links to user guide, API reference, developer docs, hub admin guide |

### ✅ PASS — Download Funnel Check

| Check | Evidence |
|-------|----------|
| Download reachable in ≤2 clicks from home | Click 1: "Get Phlix" in hero → download.html. That's 1 click. ✅ |
| Primary CTA visible above fold on home | `.hero-cta` is in `.hero-inner` which is in `.hero { min-height: 90vh; }` — CTA is above fold on any screen ≥ 768px ✅ |
| Download.html has download links | download.html:83–119 has primary CTA buttons for each client → GitHub repos ✅ |
| All 8 sections reachable from home | Home nav has all 8 links; all lead to correct pages ✅ |

### ✅ PASS — Mobile Navigation

| Check | Evidence |
|-------|----------|
| Hamburger toggle present at ≤900px | `.nav-toggle { display: none; }` at components.css:38, shown at `@media(width <= 900px)` components.css:96 ✅ |
| `aria-expanded` toggles correctly | `navToggle.setAttribute('aria-expanded', String(isOpen))` in main.js:21 ✅ |
| `aria-controls` correct | `aria-controls="nav-menu"` on button in all HTML files ✅ |
| Menu closes on Escape | `if (e.key === 'Escape' && navMenu.classList.contains('is-open'))` main.js:34 ✅ |
| Menu closes on outside click | `if (!navToggle.contains(e.target) && !navMenu.contains(e.target))` main.js:26 ✅ |
| Focus returns to toggle on Escape | `navToggle.focus()` main.js:37 ✅ |

### ⚠️ SHOULD FIX

**1. Secondary hero CTA "Read the docs" goes externally instead of driving to download**
- **File:** `index.html:79`
- The secondary CTA in the hero goes to `https://detain.github.io/phlix-docs` rather than to the download page
- The kit rule says: "Secondary CTA: 'Read the docs' → external docs" — this IS the correct behavior per the kit (new_site.md §5)
- **Verdict:** This is actually correct per spec. Not an issue.

**2. "Get Phlix" label — could imply "buy" rather than "download"**
- The primary CTA label "Get Phlix" (content.json hero.primary_cta.label) links to `/download`
- Some users might interpret "Get Phlix" as going to a pricing page or app store
- However, this is the exact label from `content.json` (verbatim), so it's content-compliant
- **Verdict:** Content accurate; not a usability defect

---

## Score Breakdown

| Heuristic Area | Score | Notes |
|----------------|-------|-------|
| Visibility of system status | 8/10 | Skip link present; sticky nav |
| Match between system and real world | 10/10 | Clear, direct language |
| User control and freedom | 10/10 | Escape closes nav; focus management correct |
| Consistency and standards | 10/10 | Consistent across all 8 pages |
| Error prevention | 10/10 | No dangerous form interactions |
| Recognition not recall | 10/10 | Sticky nav always visible |
| Flexibility and efficiency | 9/10 | 1-click download; could be more descriptive |
| Aesthetic and minimalist design | 10/10 | Clean, purposeful |
| Error recognition and recovery | 10/10 | N/A for static link site |
| Help and documentation | 5/5 | Docs page links to all categories |
| **Total** | **92/100** |

---

*Review generated by CodeReviewer — Manga Studio adversarial review, dimension: Usability (Nielsen Heuristics)*
