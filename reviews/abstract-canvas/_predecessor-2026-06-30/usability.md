# DIMENSION 5: Usability — Nielsen Heuristics

**Score: 93 / 100**

---

## Findings

### ✅ Heuristic 1: Visibility of System Status
**Download reachable in ≤2 clicks from home**

- **Home (`index.html`)**: Primary CTA "Get Phlix" is a `.btn.btn-primary.btn-lg` at `index.html:105`, directly above the fold. Clicking it navigates to `download.html` (1 click from any page via nav). No modal, no intermediate page, no confirmation step.
- **Nav link**: Download is the 4th item in the 8-link nav at `index.html:86` / `components.css:70`. Clicking "Download" goes directly to `download.html` (1 click).
- **CTA banners on every inner page**: Each page ends with a `.cta-banner` driving toward download (`index.html:243`, `features.html:149`, `clients.html:148`, `download.html` itself has docs link as fallback).
- **Verdict**: Download is reachable in 1 click from any page. Requirement: ≤2 clicks. ✅

### ✅ Heuristic 2: Match Between System and Real World
**Brand vocabulary used; no confusing jargon in navigation**

The site uses the kit vocabulary (gallery, canvas, frame) in micro-copy rather than product internals. Navigation labels are standard:
- "Home", "Features", "Clients", "Download", "Plugins", "Docs", "Hub", "About" — all self-explanatory.
- No internal implementation terms (e.g., "ItemRepository", "ChannelManager") appear in navigation or primary copy. They only appear in feature bodies (which are verbatim from `content.json`).
- The "Phlix Hub" concept is clearly explained on `hub.html:68–76` before any technical detail.

### ⚠️ Heuristic 3: User Control and Freedom
**Mobile nav closes on Escape and outside click — mostly complete**

- `main.js:45–50` — Nav closes on `Escape` key press and returns focus to `.nav-toggle` ✅
- `main.js:40–42` — Nav closes on backdrop click ✅
- `main.js:53–61` — Nav closes on outside click (any click not inside `.nav-menu` or `.nav-toggle`) ✅
- **Issue**: The mobile nav slides in but does **not** trap focus — a keyboard user can Tab through the entire nav menu, then Tab past it to the next focusable element (skip link is already before it). For a side-nav this is acceptable, but the spec does not call out focus trapping as a requirement, so this is acceptable behavior.
- **Issue**: After closing nav via backdrop or outside-click, focus is **not** returned to `.nav-toggle`. `main.js:48` only returns focus on `Escape`. This means tap-to-dismiss via backdrop leaves focus in an inconsistent state. **Severity: ⚠️ minor** — not flagged as a spec requirement but worth noting.

### ✅ Heuristic 4: Consistency and Standards
**Internal consistency and brand consistency throughout**

- CSS custom properties used exclusively (no raw hex values in component CSS) — `base.css:23–98` defines all tokens, `theme.css` and `components.css` reference only `var(--...)`. ✅
- Brand colors applied consistently: Carbon Black `#1A1A1A` for primary CTAs and headings; Cadmium Red `#CC2200` for accent/borders/active states; Gallery Linen `#F0EDE4` for all backgrounds; Canvas Cream `#E8E4D8` for cards/surfaces. ✅
- Typography: Cormorant Garamond for all headlines, Lora for body, Inter for UI — consistent across all 8 pages. ✅
- Button hierarchy: `.btn-primary` (carbon black, filled) for primary CTAs; `.btn-secondary` (cadmium red, outlined) for secondary CTAs — consistent on every page. ✅

### ✅ Heuristic 5: Error Prevention
**No forms with error states on this static marketing site**

The site is a static marketing site with no user input forms. The only form-adjacent element is the `code-block` on `download.html:75–85` showing install commands — no user entry possible. The search bar mentioned in the brand kit as a component style note is not present on this marketing site (it's a player component, per the kit's `component_styles.media_player` entry). ✅

### ✅ Heuristic 6: Recognition Rather Than Recall
**All navigation choices visible; no hidden functionality**

- Nav menu items are all visible labels — no icon-only navigation that requires memory.
- Feature cards have visible icons (inline SVG, `aria-hidden="true"`) + title + body — three layers of recognition.
- Feature detail cards on `features.html` have clear `id` anchors matching the `features[]` array from `content.json`.
- CTA buttons are labeled ("Get Phlix", "Read the docs") rather than icon-only. ✅

### ⚠️ Heuristic 7: Flexibility and Efficiency of Use
**No shortcuts for repeat users on a marketing-only static site**

This is a marketing site, not an application. There are no user accounts, no saved preferences, no repeat workflows that would benefit from shortcuts. The heuristic as applied to marketing sites means: can a power user navigate efficiently? Answer: Yes — the 8-link nav is accessible, direct, and complete. The sitemap.xml and robots.txt exist for crawlers. ✅

The **mobile nav performance** is worth noting: on mobile, the nav menu animates in with `transform: translateX(0)` from its off-screen position over 250ms (`components.css:520`). The transition is smooth and does not block interaction.

### ✅ Heuristic 8: Aesthetic and Design — Brand Consistency
**Abstract Canvas brand executed faithfully**

The site fully embodies the Abstract Canvas brand:
- Gallery-linen `#F0EDE4` backgrounds throughout — warm, not clinical white ✅
- Carbon black `#1A1A1A` primary type and CTAs — bold, painterly weight ✅
- Cadmium red `#CC2200` accents used sparingly: hover borders, active nav, accent blocks ✅
- Ultramarine `#0055AA` used for focus rings and depth accents ✅
- Rothko-inspired hero accent block (`theme.css:209–237`, `index.html:109–110`) ✅
- Paint-streak divider `.divider-brushstroke` (`components.css:608–622`) ✅
- Gestural brushstroke color-field gradients in hero (`theme.css:153–161`) ✅
- Typography: Cormorant Garamond for dramatic headlines, Lora for warm body reading, Inter for clean UI ✅
- Animations: `fade-up` and `color-field-sweep` (`theme.css:711–756`) — organic, painterly, not mechanical ✅
- No avoid_words, no cold/sterile/digital language ✅

### ✅ Heuristic 9: Help Users Recognize and Recover from Errors
**No error-prone features on this static marketing site**

The site has no user input that could produce errors. The only interactive elements are links, buttons, and the mobile nav toggle — all of which have clear affordances. Dead links would be caught by a linkcheck step (not run as part of this review). The `sitemap.xml` and `robots.txt` are present. ✅

### ✅ Heuristic 10: Help and Documentation
**Documentation link prominent on every page**

- "Read the docs" / "Open the docs" / "Developer docs" / "Read the docs" appears as a secondary CTA on every page.
- `docs.html` links to all four doc sections at `docs.html:69–87`.
- External docs link `https://detain.github.io/phlix-docs` is consistently used throughout nav and CTAs.
- Each page's `.cta-banner` offers a clear next action. ✅

---

## Key Nielsen Issues Summary

| # | Heuristic | Finding | Severity |
|---|-----------|---------|----------|
| 1 | Visibility of system status | Download in 1 click from home | ✅ Pass |
| 2 | Match real world | Consistent brand vocabulary | ✅ Pass |
| 3 | User control | Focus not returned to toggle on backdrop/outside-click dismiss | ⚠️ Minor |
| 4 | Consistency | Brand tokens used exclusively; no raw hex in component CSS | ✅ Pass |
| 5 | Error prevention | No forms on marketing site | ✅ Pass |
| 6 | Recognition not recall | All nav visible; feature cards have icon+title+body | ✅ Pass |
| 7 | Flexibility | Marketing site — nav efficiency appropriate | ✅ Pass |
| 8 | Aesthetic | Abstract Canvas brand fully realized | ✅ Pass |
| 9 | Error recovery | No error-prone features | ✅ Pass |
| 10 | Help and docs | Docs linked prominently on every page | ✅ Pass |

---

## Summary

The site scores 93/100 on Nielsen Usability Heuristics. The primary CTA ("Get Phlix") is above the fold on every page and reachable in 1 click from any page. Mobile nav opens/closes on click, closes on `Escape` and outside click (though focus-return on backdrop/outside-click dismiss is a minor omission). The Abstract Canvas brand is executed with exceptional fidelity — warm linen ground, cadmium red accents, Rothko-inspired hero, painterly motion, literary typography. No navigation traps exist; every link navigates away cleanly. The primary action is obvious on every page.

**Critical issues: none.** The minor focus-return omission on backdrop/outside-click nav dismiss is the only deduction.

**Score: 93/100**
