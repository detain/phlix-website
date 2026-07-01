# Readability — marble-atrium

**Score: 90/100** — Strong typography hierarchy and readable line lengths; one minor voice register note.

## Findings

- `css/theme.css:160-165` ✅ Hero headline `clamp(2.5rem, 6vw, 4.5rem)` — dramatic, appropriate for design-conscious professionals and home cinema enthusiasts.
- `css/theme.css:168-175` ✅ Hero subheadline max-width 620px at 1.0625rem / 1.75 line-height — comfortable reading width (~70ch at 16px base), within the 60–75ch target.
- `css/theme.css:34-40` ✅ `p` uses Jost Light (300), 1.75 line-height — well above the kit's 1.6 minimum.
- `css/theme.css:14-22` ✅ Headlines use Cormorant Garamond Light (300) with generous 0.06em tracking — kit's "typography carries the luxury" principle honoured.
- `css/theme.css:42-52` ✅ UI labels use Jost Medium (400) with 0.08em tracking — clear hierarchy separation from body text.
- `index.html:94` ✅ Hero subheadline matches content.json verbatim — no invented copy.
- `css/theme.css:90-107` ✅ Container max-width 1280px with responsive padding (48px→24px→16px).
- `css/theme.css:186-224` ✅ Pitch bullets with 20px gold hairline `::before` marker and 1.75 line-height — readable and scannable.
- `css/theme.css:297-318` ✅ FAQ `dd` uses Jost Light at 1.75 line-height — appropriate for the audience.
- `about.html:76-88` ✅ Philosophy section reads at an appropriate level for design-conscious professionals — no jargon without explanation, no oversimplification.
- `index.html:187` ⚠️ CTA banner subtext "Curated. Considered. Yours. — Every frame, every file, every device, handled with the quiet confidence of a five-star concierge." uses a slightly more effusive register than the kit's "never effusive" and "quietly confident" tone guidelines. The phrase "every frame, every file, every device" is brand-flavored micro-copy (permitted by new_site.md §2), but the register is marginally warmer than the concierge tone suggests. Minor — not a real defect.
- `download.html:67` ✅ "Impeccable from the first frame." — matches kit `tagline_secondary` verbatim, correct usage.
- Heading hierarchy: H1 on every page, H2 for sections, H3 for cards — no skips ✅.

## Verdict

**Pass** — typography is appropriate for the audience (design-conscious professionals, home cinema enthusiasts), reading level is suitable, line lengths are within the 60–75ch target, and heading hierarchy is clean. The marginal register note on one CTA banner string is cosmetic, not a real defect.
