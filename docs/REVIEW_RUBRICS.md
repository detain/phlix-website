# Review Rubrics

Every reviewer in Phase R3 writes a file with this structure. Same headers, same icons, same scoring.

## Template

```markdown
# <Dimension> Review — <Variant Name>

**Variant**: 01-minimalist-cinema
**Round**: 1
**Reviewer**: <agent or model name>
**Date**: 2026-05-20

## Score

- **<Dimension>**: 87 / 100

## ✅ Passed

- <item>
- <item>

## ⚠️ Concerns (non-blocking)

- <item> — <why it matters> — <suggested next step>

## ❌ Failures (must fix this round)

- **<file:line>** — <what is wrong> — <required outcome>

## Recommendations (ranked by impact)

1. <action> (impact: high, effort: low)
2. <action> (impact: medium, effort: medium)
3. <action> (impact: low, effort: low)

## Evidence

- Command(s) run, screenshot paths, tool output excerpts.
```

## Severity legend

- ✅ — Meets standard, no action needed.
- ⚠️ — Below ideal but not a blocker. Should be addressed if effort is reasonable.
- ❌ — Blocker. Must be fixed before this round closes.

## Scoring scale (per dimension, 0–100)

| Band   | Meaning                           |
| ------ | --------------------------------- |
| 90–100 | Exemplary — no significant issues |
| 75–89  | Solid — minor concerns only       |
| 60–74  | Acceptable — some real issues     |
| 40–59  | Below bar — multiple real issues  |
| 0–39   | Failing — fundamental problems    |

A dimension may not exit the loop with score <90 **or** any ❌ remaining.

## Weights for aggregate (used by Collator)

| Dimension            | Weight |
| -------------------- | ------ |
| Accessibility        | 1.5    |
| Performance          | 1.2    |
| Responsive           | 1.2    |
| Branding Consistency | 1.2    |
| Usability            | 1.0    |
| Content Quality      | 1.0    |
| CTA / Funnel         | 1.0    |
| SEO                  | 1.0    |
| Social Metadata      | 0.8    |
| Localization         | 0.6    |

Aggregate = Σ(score × weight) / Σ(weight). Round to integer.

## Per-dimension rubric

### Accessibility (WCAG 2.2 AA)

- Color contrast (text ≥4.5:1 normal, ≥3:1 large; UI ≥3:1).
- Keyboard reachable; visible focus indicator; logical tab order; no positive tabindex.
- All images have meaningful alt or `alt=""` if decorative.
- Form inputs have labels (`<label for>` or `aria-label`).
- Single H1, logical heading hierarchy, semantic landmarks.
- `prefers-reduced-motion: reduce` disables non-essential motion.
- ARIA used only where native HTML can't express the semantic.
- Skip-link present and functional.

### Usability (Nielsen heuristics)

- Visibility of system status.
- Match between system and the real world.
- User control and freedom.
- Consistency and standards.
- Error prevention.
- Recognition rather than recall.
- Flexibility and efficiency of use.
- Aesthetic and minimalist design.
- Help users recognize, diagnose, recover from errors.
- Help and documentation.
- **Plus**: Primary goal (download) reachable in ≤2 clicks from home.

### Responsive

Probe at 320, 375, 414, 768, 1024, 1280, 1920. No horizontal scroll. Touch targets ≥44 px. Mobile menu works. Text remains readable (no 12 px body on phones). Images scale; no fixed-px widths on layout containers.

### Performance

Lighthouse perf ≥90 on mobile + desktop. LCP <2.5s, CLS <0.1, INP <200ms. Image budgets: hero ≤120 KB, total page ≤500 KB transferred. Fonts use `font-display: swap`. No render-blocking JS. CSS critical path is reasonable.

### Localization

`<html lang>` present. No locale-unsafe `toLocaleString()` lacking explicit locale. Date/number formats abstracted. Strings reachable from one place (`content.json`) so a future translator can swap them. RTL safety (no `float: left/right` where `inline-start/end` would do). Fonts subset to needed scripts.

### CTA / Funnel

Primary CTA visible above the fold on home, with ≥3:1 contrast against background. Secondary CTA distinguishable but de-emphasized. ≤2 clicks home → download. No surprise modals, no forced email gate, no auto-play media with sound.

### Content Quality

Tone matches the variant's voice from `brand-kits.json`. Every technical claim cross-checked against `phlix-server` reality (e.g., "Workerman 5.x", "Argon2ID", "TMDB / TVDB / Fanart / NFO", "JWT 1h access / 7d refresh"). No invented features. No mention of unsupported clients. Grammar + spelling clean.

### Social Metadata

Open Graph: `og:title`, `og:description`, `og:image` (1200×630), `og:url`, `og:type`, `og:site_name`. Twitter card: `twitter:card=summary_large_image`. JSON-LD `SoftwareApplication` block. Favicon set: 16, 32, 180 (apple), 192, 512, plus `manifest.webmanifest`. og:image renders correctly at preview size.

### SEO

Title ≤60 chars, meta description ≤160. One H1 per page. Heading hierarchy unbroken. Semantic HTML. Canonical URL on every page. `sitemap.xml` and `robots.txt` exist. Internal links use descriptive anchor text. JSON-LD validates.

### Branding Consistency

Diff against `phlix-server/docs/brand/brand_identity.md` for this concept:

- Colors used appear in the kit's palette (primary, secondary, accent). No off-palette hex values.
- Fonts match the kit's headline/body/UI/code roles.
- Voice phrases align with the kit's tone descriptors.
- Iconography style matches (thin-line vs thick outlines vs pixel, etc.).
- "Do" list followed; "Don't" list avoided.
