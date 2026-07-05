# DIMENSION 3: Readability — Swiss Modernist Site Review

## Score: 78 / 100

---

## Severity Scale
- ✅ Pass
- ⚠️ Minor issue (does not break readability)
- ❌ Fail (actively impairs readability for the target audience)

---

## 1. Target Audience Fit

**Audience (from kit):** Design professionals and typographers, architects and systems thinkers, academics and researchers, adults 30–55 who distrust decoration.

**Copy character:** The site writes in short declarative sentences. Product copy is factual and specific. Technical feature descriptions (e.g., "Weighted-mean NTP offset over 5 samples keeps every device locked to the same frame") are precise and accurate. There are no marketing superlatives, no emotional appeals, no casual/colloquial tone beyond one exception (noted below).

The writing voice is well-suited to the target audience — it reads like a technical product, not a lifestyle brand. Adults 30–55 who distrust decoration will find the directness refreshing. Design professionals and architects will recognize the Swiss Modernist typographic sensibility in the visual layout. ✅

**Exception:** `clients.html:59` — "No browser plugins. No casting faff. Just your media, playing where you want it." — The word "faff" is informal British slang for unnecessary fuss or complexity. It breaks the formal, declarative voice maintained everywhere else on the site. It is not in the `avoid_words` list but it is out of character for a Swiss Modernist brand targeting design professionals.

**Severity: Minor** (⚠️) — It does not impair readability but does slight damage to voice consistency.

---

## 2. Line Length (60–75ch target)

The kit targets 60–75 characters per line for body copy.

### What the CSS says:

| Selector | `max-width` | Calculated line length (at default 16px/400) |
|----------|-------------|----------------------------------------------|
| `.hero-subheadline` | `max-width: 52ch` | 52ch ✅ |
| `.cta-banner p` | `max-width: 48ch` | 48ch ✅ |
| `.about-philosophy p` | `max-width: 65ch` | 65ch ✅ |
| `.faq-item dd` | `max-width: 70ch` | 70ch ✅ |
| `.pitch-item` | none | Variable |
| `.feature-card p` | none | Variable |
| Feature detail body | none | Variable |

### The Problem

The `.container` has `max-width: 1400px` and `padding-inline: var(--space-6)` = 24px. At viewport widths above ~900px, the container is wider than its `max-width: 52ch` children can fill. The `max-width` constrains the element, not the full available line length.

However, at the full 1400px container width, the text inside a 52ch element runs to 52 characters — well within 60–75ch. At 1400px container with 24px side padding = 1352px content width. The constrained elements (52ch at 16px = ~499px) sit well within this.

**The actual issue is with unconstrained elements** (`.pitch-item`, `.feature-card p`, `.feature-detail p` on wide viewports). These have no `max-width` and expand to fill the grid cell.

- `.feature-card` uses `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))` — at 1400px wide, each card could be ~430px wide. At 16px Inter, that's ~90 characters per line.
- `.pitch-item` in the pitch section similarly has no max-width on the text itself.

**The pitch items and feature cards can exceed 75ch on wide screens.** ❌

| Element | Problem |
|---------|---------|
| `.pitch-item` | No `max-width`; can reach ~90ch at full container width |
| `.feature-card p` | No `max-width`; card at ~430px wide = ~90ch |
| `.feature-detail p` | No `max-width`; ~78ch at full width |
| `.client-tagline` | No `max-width`; short enough (~40ch) ✅ |
| FAQ dd | `max-width: 70ch` ✅ |

**Severity: Minor** (⚠️) — The text remains readable; 90ch is not a disaster. But the kit's 60–75ch target is exceeded by these unconstrained elements.

---

## 3. Contrast & Visual Hierarchy

### Text Contrast

The kit requires "maximum contrast" and "WCAG AA minimum (4.5:1 body, 3:1 large/UI)."

| Element | Color | Background | Ratio | WCAG |
|---------|-------|------------|-------|------|
| Body text | `#121212` on `#F8F8F4` | 17.8:1 | AAA ✅ |
| Body text | `#121212` on `#EFEFEB` | ~15:1 | AAA ✅ |
| CTA text | `#F8F8F4` on `#E8001C` | 4.6:1 | AA (large text) ✅ |
| Secondary button text | `#F8F8F4` on `#1A1A1A` | 16:1 | AAA ✅ |

All contrast ratios pass WCAG AA minimums. ✅

### Text Opacity — Violation ⚠️

`theme.css:354`:
```css
.feature-card p {
  opacity: 0.85;
  ...
}
```
The kit's `visual_style` states "Maximum contrast between text and background — legibility is non-negotiable" and "Ink Black on Grid White = 17.8:1 — far beyond AAA." Using `opacity: 0.85` reduces the effective contrast ratio for `.feature-card p` from ~15:1 to ~12.75:1 — still passing AA but actively reducing contrast below the maximum the design system provides.

More critically, the Swiss Modernist principle is that **hierarchy comes from weight and size, not from opacity**. Using opacity to de-emphasize copy text is a deviation from the Swiss Modernist design philosophy, even if it remains technically legible.

**Severity: Minor** (⚠️) — Legible but anti-Swiss-Modernist in principle.

---

## 4. Scannability ✅

- Pitch bullets are short (under 100 characters each), one idea per line ✅
- Feature cards have a distinct icon + bold title + short body structure ✅
- FAQ uses `<dl>` with bold `<dt>` and readable `<dd>` ✅
- Clients page uses consistent card structure ✅
- Download page has clear `<h2>` section breaks ✅
- Ecosystem list uses bold repo name + description pair ✅
- Footer columns are well-organized ✅

The information architecture is clear and scannable. A user can extract the value proposition from the pitch bullets alone. ✅

---

## 5. Wall of Text ✅

No page has an unbroken wall of text. The longest continuous paragraphs are:

- `about.html` philosophy section — longest paragraph is ~50 words. Readable. ✅
- `hub.html` explanatory paragraphs — 2–3 sentences each, well-spaced with headings ✅
- `features.html` page header — 1 sentence ✅

Feature card descriptions average ~20 words. Pitch bullets average ~15 words. No walls of text. ✅

---

## 6. Body Font Size ✅

`base.css:152`:
```css
font-size: var(--text-base);  /* 16px */
```

Body text is 16px. The kit allows 16–18px. This is at the lower bound but acceptable. Mobile doesn't drop below ~16px per the responsive CSS. ✅

---

## 7. Navigation & Hierarchy

Primary navigation is clear (8 items, all labeled), footer navigation has 3 columns with descriptive headings. The breadcrumb pattern from the kit is not used on interior pages (not required — kit says breadcrumbs are optional component styles). ✅

---

## Summary

| Check | Result | File:Line |
|-------|--------|-----------|
| Audience-appropriate voice | ⚠️ | `clients.html:59` ("faff") |
| Line length 60–75ch | ⚠️ | `theme.css` — unconstrained elements exceed 75ch |
| Contrast | ✅ | All text passes WCAG AA |
| Opacity for hierarchy | ⚠️ | `theme.css:354` — `opacity: 0.85` |
| Scannability | ✅ | All pages |
| No walls of text | ✅ | All pages |
| Body font 16–18px | ✅ | `base.css:152` |
| Hierarchy via weight/size | ✅ | Mostly — opacity exception noted |
