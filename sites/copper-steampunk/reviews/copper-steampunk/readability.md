Score: 94/100 | Severity: ⚠️ (warning) | Summary: Heading hierarchy, scanability, and brand typography are solid; hero body text line length sits at the upper acceptable edge at wide viewports.

---

## Readability Review — Copper Steampunk Site

### Overall Score: 94/100
### Severity: ⚠️ WARNING (not a defect — see below)

---

### Findings

**✅ File: All pages**
**Description:** Heading hierarchy is correct and unbroken. Every page has exactly one `<h1>`. No heading level is skipped. The progression is:
- Home: `h1` (hero) → `h2` (pitch, features-overview, CTA banner)
- Features: `h1` (page-header) → `h2` (feature-detail titles)
- Clients: `h1` (page-header) → `h2` (client-card titles)
- Download: `h1` (page-header) → `h2` (section headings) → `h3` (card titles within sections)
- Plugins: `h1` (page-header) → `h2` (Plugin Model, Reference Plugin) → body `p`
- Docs: `h1` (page-header) → `h2` (Ecosystem) → body `p`
- Hub: `h1` (page-header) → `h2` (What the Hub Does, Two Ways to Run, Hub Mode in Clients)
- About: `h1` (page-header) → `h2` (Philosophy, License, Contributing, FAQ)

No `h4`, `h5`, or `h6` elements appear anywhere, which is correct for the content complexity.

**✅ File: All pages**
**Description:** Section eyebrows and lead copy make navigation scannable. The brand kit's typography roles are applied correctly:
- `hero-eyebrow` uses Josefin Slab small-caps for eyebrow labels (line 159–167)
- `.page-header .lead` uses Crimson Text at 1.065rem with 60ch max-width and 1.65 line-height
- Feature cards use Playfair Display h3 + Crimson Text body at 0.9375rem / 1.65 line-height
- All section headings use Cinzel Decorative (display font) or Playfair Display (headline) per the kit's `font-display` and `font-headline` roles
- Kit `typography_rules` ("Headlines are always Playfair Display or Cinzel Decorative — never sans-serif") is honored throughout

**✅ File: All pages**
**Description:** The brand kit's `ui_style` is correctly applied. Navigation labels, form elements, and badges use Josefin Slab throughout. The `ui-label` utility (theme.css:67–74) correctly sets `text-transform: uppercase` and Josefin Slab for instrument labels.

**⚠️ File: index.html:186**
**Description:** `.hero-sub` paragraph has `max-width: 60ch`. At a 1280px viewport with 1200px container and ~32px gutters, the hero content area is ~580px wide. With Crimson Text body at ~18px effective size and average char width ~9px, the line length at 60ch = ~540px, well within the container — wrapping at approximately 60 chars per line. This sits at the upper edge of the 55–70ch target but is acceptable.

**Recommendation:** The body text line length at common viewport widths (1024–1280px) stays within or very near the 55–70ch target. No change strictly required; this is noted as informational for future refinement. If the site were viewed on a very wide monitor (1920px+) without a tighter container, the hero subheadline could approach 80ch. However the hero-inner has `max-width: 800px` which prevents this.

**✅ File: theme.css:183–185**
**Description:** `p { max-width: 65ch }` is set in base.css, correctly constraining body text line length. Feature card bodies at 0.9375rem (~17px) wrap to approximately 30–40 chars per line within the 280px min card width — comfortably within range. FAQ dd bodies (0.9375rem, 1.7 line-height) similarly wrap correctly within the 800px max-width faq container.

**✅ File: theme.css:323–330**
**Description:** `.page-header .lead` sets `max-width: 60ch`, `line-height: 1.65`, and `font-size: clamp(1.0625rem, ...)`. This is correct per kit `body.line_height: 1.7` guidance and keeps lead copy scannable.

**✅ File: components.css:617–658**
**Description:** Plugin steps (`plugin-steps`) use `counter-reset: steps` with decimal-leading-zero counters styled in Oswald number font. This is a distinctive, brand-appropriate pattern that reinforces the steampunk "instrument panel" aesthetic without sacrificing readability.

**✅ File: All pages**
**Description:** The kit requires 55–70ch for body text. The site uses `max-width: 65ch` on `p` elements (base.css:184–185) and `max-width: 60ch` on `.lead` paragraphs, which correctly constrains line length at common viewport widths. All content sections wrap appropriately within their grid containers (280–300px min card columns).

---

### Summary

The site passes readability review with a 94/100 score. Heading hierarchy is correct and unbroken, typography uses the kit's Playfair Display/Cinzel Decorative/Josefin Slab/Crimson Text stack faithfully, and line lengths are within the 55–70ch target at all common viewport widths. The only note is that hero body text sits at the upper edge of the range at 1280px+ viewports, which is acceptable and not a defect.
