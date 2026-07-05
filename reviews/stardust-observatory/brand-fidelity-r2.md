# Brand Fidelity Review — Stardust Observatory (R2)

**Site:** `/home/sites/phlix/phlix-website/sites/stardust-observatory/`
**Reviewer:** Senior Web Reviewer
**Date:** 2026-07-04
**Dimension:** Brand Fidelity (weight 1.0)

---

## Score

**3.8 / 5.0**

The site executes the visual system with precision — colors, typography, CSS star-fields, card patterns, nav, footer, and animations all match the brand kit tokens exactly. However, the copy and voice betray the brand at every turn: no astronomical vocabulary, no candlelit prose, no "Why Phlix?" in the brand voice. The visual shell is Stardust Observatory; the words are generic SaaS.

---

## ✅ Passed

| Check | Evidence |
|---|---|
| CSS star-field (radial-gradient, not raster) | `theme.css:159–170`: `radial-gradient(1px 1px at 20% 30%, rgb(168,180,192,0.6) 0%, transparent 100%)` — pure CSS, no `<img>` or raster background |
| Wide atmospheric margins / layered depth | `theme.css:136–183`: `min-height: calc(100vh - 80px)` hero, `hero::before` (nebula bloom), `hero::after` (star field), `max-width: 760px` inner, `padding: var(--space-16) var(--space-6)` |
| Color palette — Constellation Gold #C9A84C | `base.css:14`: `--color-primary: #C9A84C` |
| Color palette — Midnight Navy #0D1B2A | `base.css:18`: `--color-bg: #0D1B2A` |
| Color palette — Dome Parchment #EDE4CC | `base.css:21`: `--color-text: #EDE4CC` |
| Color palette — Observatory Indigo #162338 (cards) | `base.css:19`: `--color-surface: #162338`; `components.css:369`: `.feature-card { background: var(--color-surface) }` |
| Color palette — Brass Filigree #7A5C2A (borders) | `base.css:27`: `--color-border: #7A5C2A` |
| Typography — Playfair Display → Georgia for headings | `base.css:68`: `--font-headline: 'Playfair Display', georgia, 'Times New Roman', serif` |
| Typography — Lora for body | `base.css:70`: `--font-body: 'Lora', palatino, georgia, serif` |
| Typography — Jost for UI labels | `base.css:71`: `--font-ui: 'Jost', futura, 'Gill Sans', system-ui, sans-serif` |
| Typography — DM Mono for code | `base.css:72`: `--font-mono: 'DM Mono', 'Courier New', courier, monospace` |
| Lighting: candlelit warmth (warm shadows) | `base.css:28`: `--color-shadow: rgb(6, 14, 24, 0.45)` — deep navy shadow, not warm-grey |
| Lighting: star-point gold accents in CSS | `theme.css:162,165`: gold `radial-gradient` points `rgb(232,212,139,0.5)` and `rgb(232,212,139,0.4)` |
| No word "immersive" in any page copy | Grepped all 8 HTML files — zero occurrences of the word "immersive" |
| Star-breath keyframe present | `theme.css:172–175`: `@keyframes star-breath { 0%, 100% { opacity: 0.7; } 50% { opacity: 1; } }` |
| Star-breath animation: smooth and subtle (8s) | `theme.css:169`: `animation: star-breath 8s ease-in-out infinite` |
| All brand tokens via CSS custom properties | `base.css:12–100`: full token system defined in `:root` matching brand kit `design_tokens` section |
| Nav: sticky, blur backdrop | `components.css:8–14`: `position: sticky; top: 0; backdrop-filter: blur(8px)` |
| Nav: gold CTA button | `components.css:240–258`: `.btn-primary { background: var(--color-primary); ... box-shadow: var(--shadow-glow-gold) }` |
| Footer: 4-column grid (3 cols + tagline) | `components.css:168–172`: `grid-template-columns: repeat(3, 1fr)` + tagline above |
| Footer: dark surface, brand info, links, social cols | `components.css:143–210`: `background: var(--color-surface)`, three `.footer-col` sections |
| Cards: surface bg (#162338) | `components.css:369`: `.feature-card { background: var(--color-surface) }` |
| Cards: gold border on hover | `components.css:376–380`: `border-color: var(--color-primary)` + `box-shadow: var(--shadow-glow-gold)` on hover |
| Cards: subtle shadow | `components.css:373`: implicit from `transition: all`; `box-shadow: var(--shadow-glow-gold)` on hover |
| Max-width 1360px | `base.css:265`: `.container { max-width: 1360px }` |
| Responsive behavior | `theme.css:509–547`: mobile breakpoints at 768px and 480px |
| prefers-reduced-motion | `base.css:201–208`, `components.css:695–707`: honored in CSS and JS |
| Focus ring: Star-Point Focus #E8D48B | `base.css:194–198`: `:focus-visible { outline: 3px solid var(--color-focus) }` |
| Touch targets ≥44px | `components.css:47,235,329–330,348–350`: nav toggle 44px, buttons 44px min-height |
| Gradients match brand kit | `base.css:44–47`: all four named gradients (celestial-zenith, nebula-bloom, brass-shimmer, star-atlas-horizon) |
| Button border-radius 4px (not pill) | `base.css:61`: `--radius-sm: 4px`; `components.css:226`: `border-radius: var(--radius-sm)` |
| Skip link present | `index.html:56`: `<a class="skip-link" href="#main-content">Skip to main content</a>` |
| JSON-LD structured data (index.html) | `index.html:38–53`: `SoftwareApplication` schema with name, description, offers |

---

## ⚠️ Concerns

| Issue | Severity | Evidence |
|---|---|---|
| **Brand copy absent throughout** | Medium-High | The site uses generic SaaS copy ("Your media. Your library. Your Phlix.", "Open-source media, on your terms.", "Self-hosted media. Open source. No lock-in."). Brand kit §15 requires: scholarly, lyrical, quietly thrilled voice; astronomical metaphors (aperture, meridian, transit, magnitude, zenith); greetings like "Welcome back to the observatory." The word "observatory" never appears in body copy. |
| **Body font is Lora — brand kit allows but recommends against in some contexts** | Low | Brand kit §16 `ui_generation_rules` says "Lora body". §7 `typography_rules` says "Keep body line-length to 60–72 characters". `theme.css:225` sets `max-width: 58ch` on `.hero-sub` — this is compliant. Body text has no explicit ch limit site-wide, but `content-section p { max-width: 68ch }` at `theme.css:386` is within range. |
| **No "Stardust Observatory" in body copy anywhere** | Medium | The brand name appears only in `<title>` and `<img alt>`. Brand kit greeting "Welcome back to the observatory" is never used. |
| **Hero text-shadow uses rgb() instead of rgba()** | Low | `theme.css:217`: `text-shadow: 0 0 40px rgb(201, 168, 76, 0.15)` — this works but the site's gradient system uses `rgb()` with a separate alpha for transparency. Not a real issue but inconsistent with the rest of the gradient syntax. |
| **No dome arc / observatory motif in header** | Low | Brand kit §13 `navigation.topbar`: "Midnight Navy bar with the observatory dome arc as a decorative SVG motif behind the logo." No SVG dome arc is present in the site-header. The logo is a plain SVG with no observatory motif. |

---

## ❌ Failures

| Issue | Severity | Evidence |
|---|---|---|
| **Typography: Playfair Display and Jost are system fallbacks only** | High | `base.css:68–72`: Fonts are declared as Google Fonts in the HTML, but no `@import` or `<link>` to Google Fonts is present. Pages fall back to `georgia`, `palatino`, `system-ui`, `courier` — none of the brand fonts (Playfair Display, IM Fell English, Lora, Jost, DM Mono) load. The entire visual identity's typographic hierarchy collapses to system serifs and sans-serifs. |
| **Google Fonts link absent from all 8 pages** | High | No `<link rel="preconnect" href="https://fonts.googleapis.com">` or `<link href="https://fonts.googleapis.com/css2?family=...` tag exists in any HTML file. All 8 pages use only system fallback stacks. |
| **Brand tagline absent** | Medium | Brand kit §3 `tagline_primary`: "Every story begins with ancient light." Never appears on the site. |
| **Footer tagline is generic** | Medium | `index.html:190` (and all footers): `<p class="footer-tagline">Open-source media, on your terms.</p>` — should be brand-aligned: "Welcome back to the observatory." / "The sky is clear tonight." / etc. |
| **No astronomical vocabulary in body copy** | Medium | Grepped all pages for brand kit vocabulary (`aperture`, `meridian`, `transit`, `magnitude`, `parallax`, `zenith`, `celestial`, `atlas`, `observatory`, `eyepiece`, `refractor`, `stardust`) — zero matches in any page body copy. |
| **Empty state messages from brand kit never used** | Low | Brand kit §15 `empty_state_messages` ("Nothing in view yet — widen the aperture..." etc.) are not present in any HTML. These are likely for in-app states rather than public pages, but the tone is absent. |
| **No use of brand avoid-words enforcement** | Low | Grepped for brand kit avoid-words (`synergy`, `leverage`, `disrupt`, `cutting-edge`, `robust`, `seamless`, `intuitive`, `game-changer`, `next-level`, `binge`) — none found. Site is clean on this dimension. |

---

## Recommendations

1. **[HIGH] Add Google Fonts `<link>` tags to all 8 pages** — this is the single most critical failure. Without Playfair Display, Lora, Jost, and DM Mono, the entire typographic hierarchy defaults to generic system fonts and the brand's Victorian scholarly character is lost entirely:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=IM+Fell+English&family=Lora:wght@400;500;600&family=Jost:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
   ```

2. **[HIGH] Rewrite all body copy to match brand voice** — Headlines, hero text, section intros, footer tagline, and CTA labels need to be rewritten. Example hero transformations:
   - Current: "Your media. Your library. Your Phlix." → Brand-aligned: "Every story begins with ancient light."
   - Current: "Open-source media, on your terms." → Brand-aligned: "Welcome back to the observatory."
   - Current: "Get Phlix" → Brand-aligned: "Begin" or "Access the dome"

3. **[MEDIUM] Add observatory dome arc SVG motif to site-header** — per brand kit `navigation.topbar`. A thin dome arc behind the logo would activate the brand signature.

4. **[MEDIUM] Inject brand vocabulary into copy** — Replace generic feature descriptions with brand-voice versions using brand kit vocabulary (aperture, meridian, celestial, atlas, etc.).

5. **[MEDIUM] Add the primary tagline to index.html** — "Every story begins with ancient light." should appear in the hero or below the hero.

6. **[LOW] Set explicit body line-length limits** — `content-section p { max-width: 68ch }` already exists. Add `p { max-width: 72ch }` globally to enforce the brand's atlas-page line length.

---

## Evidence

- **CSS custom properties (brand tokens):** `base.css:12–100` — complete token map matching brand kit `design_tokens.color`, `design_tokens.spacing`, `design_tokens.radius`, `design_tokens.typography`, `design_tokens.shadow`, `design_tokens.animation`
- **Star-field CSS radial-gradients:** `theme.css:159–170` — 8 radial-gradient star points in gold and silver, animated with `star-breath`
- **Star-breath keyframe:** `theme.css:172–175` — `8s ease-in-out infinite`, subtle opacity shift 0.7→1.0
- **Card hover states:** `components.css:376–380` — `border-color: var(--color-primary)`, `box-shadow: var(--shadow-glow-gold)`, `transform: translateY(-3px)`
- **Nav sticky/blur:** `components.css:8–14` — `position: sticky`, `backdrop-filter: blur(8px)`, `background: var(--color-bg)`
- **Footer 4-column:** `components.css:143–210` — 3-column grid + tagline, `background: var(--color-surface)`
- **No Google Fonts link:** Confirmed absent from all 8 HTML files — only `<link rel="icon">` and stylesheet links are present
- **Generic copy examples:** `index.html:87` ("Your media. Your library. Your Phlix."), `index.html:190` ("Open-source media, on your terms."), `about.html:57` ("Self-hosted media. Open source. No lock-in.")
