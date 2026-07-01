# Localization Review — Retro Seventies

## Score: 88/100 — ⚠️ Warning

### ✅ PASS

**`<html lang="en">` set on all 8 pages**
- `index.html:2` ✅
- `features.html:2` ✅
- `clients.html:2` ✅
- `download.html:2` ✅
- `plugins.html:2` ✅
- `docs.html:2` ✅
- `hub.html:2` ✅
- `about.html:2` ✅

**Strings trace to content.json (single-source for translation)**

All user-facing marketing copy comes from `content.json` — verified across all pages:
- hero.eyebrow: "Self-hosted media server" → replaced with kit micro-copy "Far out. Right here." (allowed: kit's voice for micro-copy)
- hero.headline: "Your media. Your library. Your Phlix." ✅ (content.json verbatim)
- hero.subheadline: full paragraph ✅ (content.json verbatim)
- primary_cta / secondary_cta ✅
- pitch_bullets (7 items) ✅ (content.json verbatim)
- features (8 items) ✅ (content.json verbatim)
- clients (5 items) ✅ (content.json verbatim)
- ecosystem (5 items) ✅ (content.json verbatim)
- faq (6 items) ✅ (content.json verbatim)
- footer.tagline and footer.columns ✅
- meta.description ✅

**Locale-unsafe formatting — none found**
- No `Intl.DateTimeFormat` or locale-sensitive number formatting in static HTML ✅
- No embedded dates that would need locale formatting ✅
- Copyright year is hardcoded as `2026` — static ✅

**Font subsetting** — The self-hosted WOFF2 approach (once fixed) allows subsetting to needed scripts. Current Google Fonts CDN approach doesn't specify subsets, but this is a performance concern, not localization. ⚠️ (tracked in performance)

---

### ⚠️ Warnings — CSS uses physical properties in places

**1. `padding: var(--space-4)` shorthand used throughout**

Many component styles use `padding: var(--space-4)` (4-value shorthand `top right bottom left` = 8px all sides). While this is symmetrical and works in both LTR and RTL, it's technically physical shorthand.

The site uses a mix of physical and logical properties:
- Logical: `margin-inline: auto`, `padding-inline: var(--page-padding)`, `padding-block: var(--space-16)` ✅
- Physical: `padding: var(--space-3)`, `padding: var(--space-4)` (shorthand all-sides) ⚠️

The all-sides shorthand is direction-agnostic since all four sides are equal, but for RTL it expands as `padding: 8px 8px 8px 8px` which is symmetric and safe. **Not actually an issue.**

**2. `left: var(--space-4)` for skip link**

`base.css:219`:
```css
.skip-link {
  left: var(--space-4);
  ...
}
```

This uses a physical `left` property. For RTL, the skip link should appear at `inline-start` rather than `left`. Should be `inset-inline-start: var(--space-4)` or equivalent.

**3. `margin-left: auto` for nav elements**

`components.css:71`:
```css
.nav-menu {
  margin-left: auto;
  ...
}
```

This pushes the nav menu to the right in LTR. In RTL, `margin-left: auto` would push it to the right (which is the correct side for a nav menu). Actually this is fine for RTL — `margin-left: auto` means "push me to the right" which is the correct behavior in both LTR and RTL for a nav that's on the left side of the layout.

Wait, in RTL the nav should logically be on the right side or mirrored. Currently the nav is at the top spanning full width. `margin-left: auto` pushes content rightward in LTR — in RTL this would push content leftward. This could cause the nav menu to appear on the wrong side in RTL.

**4. `right: -5%` for hero circles**

`theme.css:167` — `right: -5%` is a physical property. In RTL, the hero circles would appear on the left side of the page rather than maintaining their decorative position.

**5. WebKit scrollbar uses physical `width`/`left`**

`base.css:183-196` — `::-webkit-scrollbar` positioning uses physical values. Minor RTL concern.

**6. `text-align: left` on hero at 768px**

`theme.css:588`:
```css
.hero-inner { ... text-align: left; }
```

This is intentional LTR override for mobile — the spec says "left-align for readability" in typography_rules ✅. This is fine as-is, but should ideally be `text-align: start` for RTL compatibility.

**7. Custom scrollbar color**

`base.css:182-197` — scrollbar uses `var(--color-surface)` and `var(--color-primary)`. No RTL concern.

---

### ✅ Logical properties usage (where implemented correctly)

- `margin-inline: auto` ✅
- `padding-inline: var(--page-padding)` ✅
- `padding-block: var(--space-16)` ✅
- `inset: 0` (in pseudo-elements) — logical ✅
- `max-inline-size` not used (width used instead) — but no layout breakage from this ✅

---

### ❌ FAIL — None

No hard localization failures. `<html lang="en">` is set, all content traces to content.json.
