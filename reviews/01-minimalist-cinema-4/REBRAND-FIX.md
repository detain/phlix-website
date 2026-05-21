# Rebrand Fix: 01-minimalist-cinema-4

## What Was Wrong

The variant's CSS was using a **Warm Editorial** aesthetic instead of the **Minimalist Cinema V4 — Asymmetric Hero** brand specification.

### Colors
| Token (Wrong) | Value | Brand Token (Correct) | Value |
|---|---|---|---|
| `--color-cream` | `#f7f3ee` | `--color-white` | `#FFFFFF` |
| `--color-warm-black` | `#2d2926` | `--color-charcoal` | `#1A1A1A` |
| `--color-terracotta` | `#c4583a` | `--color-electric_blue` | `#2D9CFF` |
| `--color-muted` | `#475569` | `--color-slate_gray` | `#2E2E2E` |
| `--color-white` | `#fdfcfb` | (unused; brand white is `#FFFFFF`) | — |

Hard-coded `rgb(196, 88, 58, ...)` (terracotta) and `rgb(45, 41, 38, ...)` (warm brown) were also present throughout components and must be replaced with brand equivalents.

### Fonts
| Role (Wrong) | Font | Brand Font |
|---|---|---|
| Headline | `Lora` | `Montserrat ExtraBold` |
| Body | `Source Sans 3` | `Inter Regular` |
| UI | `Source Sans 3` | `Roboto Medium` |
| Code | *(none)* | `JetBrains Mono` |

Also `font-weight: 700` on headlines should be `800` (ExtraBold = 800).

---

## What Was Fixed

### base.css
- Replaced `@font-face` blocks for `Lora` and `Source Sans 3` with `Montserrat Extrabold`, `Inter Regular`, `Roboto Medium`, and `JetBrains Mono`
- Replaced all design tokens to use brand color names and values
- Added `--font-code: 'JetBrains Mono'` token
- Updated `--color-surface` and `--color-bg` semantics to use brand palette
- Updated all `rgb(...)` shadow colors to use brand charcoal `rgba(26, 26, 26, ...)`
- Updated `.skip-link`, `:focus-visible` to use `--color-electric_blue`
- Updated `::-webkit-scrollbar` track/thumb to use brand colors

### theme.css
- Updated file header comment
- Replaced all `var(--color-warm-black)` → `var(--color-charcoal)` in headings, logo, nav toggle bar
- Replaced all `var(--color-terracotta)` → `var(--color-electric_blue)` in nav underline, eyebrow text, active nav links
- Replaced all `rgb(253, 252, 251, ...)` warm-white references → `rgba(255, 255, 255, ...)` for pure white
- Updated `font-weight` from `700` to `800` for `h1–h6`, `.site-header__logo`, `.site-footer__brand .logo`
- Updated `font-weight` from `600` to `500` for UI elements (`site-footer__col h3`, `.page-header__eyebrow`, `.hero__eyebrow`)
- Fixed mobile nav background from `var(--color-cream)` → `var(--color-white)` and shadow to `rgba(26, 26, 26, 0.15)`

### components.css
- Updated file header comment
- Replaced all `.btn--primary` terracotta styles → `--color-electric_blue` with `rgba(45, 156, 255, ...)` for shadows
- Replaced all `.btn--secondary` warm-black outline → `--color-charcoal` with `rgba(26, 26, 26, ...)` shadows
- Replaced `.btn--ghost` terracotta text → `--color-electric_blue`
- Replaced `.feature-card__icon` terracotta → `--color-electric_blue`
- Replaced `.client-card__status--stable` background/foreground terracotta → `rgba(45, 156, 255, 0.1)` / `--color-electric_blue`
- Replaced `.client-card__highlights` cream background → `--color-white`
- Replaced `.client-card__link` terracotta → `--color-electric_blue`
- Replaced `.bullet-list ::before` terracotta → `--color-electric_blue`
- Replaced `.faq-item__q` warm-black → `--color-charcoal`
- Replaced `.install-card__cmd` font `'Source Sans 3', monospace` → `'JetBrains Mono', monospace`; warm-black background + cream text → charcoal + white
- Replaced `.ecosystem-item__name` terracotta → `--color-electric_blue`
- Replaced `.pill` cream background → `--color-white`
- Replaced `.section-label` terracotta → `--color-electric_blue`
- Replaced `.callout` terracotta border + warm pink bg → `rgba(45, 156, 255, 0.05)` with brand blue
- Replaced `.nav-toggle__bar` warm-black → `--color-charcoal`
- Updated all `font-weight` values from `600` → `500` for UI elements (buttons, pills, highlights)
- Updated all `font-weight` values from `700` → `800` for headline elements (feature-card h3, client-card__name, ecosystem-item__name, faq-item__q)
