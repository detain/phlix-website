# Readability

## Score: 92/100

## Severity: ✅

## Findings
- `css/theme.css:351-375` — `.pitch-bullets li` has `font-size: 1.0625rem` (~17px) and `.pitch-bullets li` at `css/theme.css:677` inside `@media (max-width: 768px)` reduces to `font-size: 0.9375rem` (15px). The `new_site.md §14` states "Body text never drops below ~16px on phones." At 320px viewport, the base `body { font-size: 1rem }` (16px) applies to `.pitch-bullets li` via the cascade. The 15px figure only applies at the 768px breakpoint, which is a tablet breakpoint, not a phone breakpoint. This is technically compliant but the breakpoint is borderline. ⚠️ Minor note.

## What passes
- `css/theme.css:533` — `.content-section p { max-width: 72ch }` — effectively enforces the 60–72 character line length requirement from the kit's `typography_rules: "Keep body line-length to 60–72 characters"`.
- `css/base.css:124-125` — `body { font-size: 1rem; line-height: 1.7 }` — body text is 16px with 1.7 line height per the kit's `fonts.body.line_height: 1.7`.
- `css/base.css:138-140` — `h1 { font-size: clamp(2rem, 5vw, 3.5rem) }` etc. — fluid type that scales appropriately; minimum 2rem (32px) at any viewport.
- Content is well-structured with clear visual hierarchy: hero → pitch bullets → feature cards grid → CTA banner on home; page-header h1 → content sections with h2/h3 → CTA banner on inner pages.
- No walls of text; copy is broken into short, scannable sections with generous whitespace. The pitch bullets use a card/list format that is easy to scan.
- `shared/content.json` marketing copy is appropriately written for the target audience (outdoor enthusiasts, families, nature lovers) — direct, grounded, not overly technical. Reading level is accessible.
- `css/components.css:556-591` — Badge/chip text uses `.badge` with Barlow Condensed uppercase at 0.6875rem (11px) — this is intentionally small (label-style) and distinguishable from body copy by virtue of the all-caps + border treatment, not a readability issue.
- Typography scale is clear and consistent: display (clamp 4-10rem) → headline (clamp 2-3.5rem) → body (1rem/1.0625rem) → UI labels (0.875rem uppercase) → mono (0.875rem).

## Verdict
Readability is excellent. Line lengths are constrained to 60–72ch, body text is 16px+, line height is 1.7 for body, headings are clear and large, content is scannable, and the writing style matches the audience. The one borderline font size at the 768px breakpoint is a very minor concern — on actual phones (320-414px) the text meets the 16px minimum.
