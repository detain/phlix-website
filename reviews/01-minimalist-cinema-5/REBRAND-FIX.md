# Rebrand Fix: 01-minimalist-cinema-5

## Issue Summary

The CSS for variant `01-minimalist-cinema-5` was using incorrect fonts that did not match the brand kit specification for "Minimalist Cinema V5 — Card-Centric".

## Brand Kit Specification (from shared/data/brand-kits.json)

| Role | Font |
|------|------|
| Headline | Montserrat ExtraBold |
| Body | Inter Regular |
| UI | Roboto Medium |
| Code | JetBrains Mono |

## Problems Found

### theme.css

**Wrong fonts imported:**

```css
/* INCORRECT - Was using */
font-family: 'Playfair Display';      /* For headlines - WRONG */
font-family: 'Work Sans';            /* For body - WRONG */
```

**Issues:**
- `Playfair Display` is a serif font, but the brand kit explicitly forbids serif fonts (`"dont": ["Use serif fonts"]`)
- `Work Sans` is not listed in the brand kit at all
- The comment at the top of the file said: `Self-hosted fonts: Playfair Display (display), Work Sans (body)` which was inaccurate

## Fixes Applied

### theme.css (lines 7-41)

**Replaced all font-face declarations:**

| Before | After |
|--------|-------|
| Playfair Display (700) | Montserrat ExtraBold (800) |
| Work Sans (400) | Inter Regular (400) |
| Work Sans (500) | Roboto Medium (500) |
| Work Sans (600) | JetBrains Mono (400) |

**Also updated file header comment:**

```diff
- * Self-hosted fonts: Playfair Display (display), Work Sans (body)
+ * Self-hosted fonts: Montserrat ExtraBold (headlines), Inter Regular (body), Roboto Medium (ui), JetBrains Mono (code)
```

## Verification

- Build: `npm run build` — Passed (30 variants built successfully)
- Lint: `npm run lint` — No errors in 01-minimalist-cinema-5
- base.css already had correct CSS custom property declarations for font variables:
  - `--font-headline: 'Montserrat ExtraBold', montserrat, system-ui, sans-serif;`
  - `--font-body: 'Inter Regular', inter, system-ui, sans-serif;`
  - `--font-ui: 'Roboto Medium', roboto, system-ui, sans-serif;`
  - `--font-code: 'JetBrains Mono', 'SF Mono', 'Cascadia Code', monospace;`

## Notes

The font files referenced in the `@font-face` declarations (`montserrat-extra-bold.woff2`, `inter-regular.woff2`, `roboto-medium.woff2`, `jetbrains-mono.woff2`) will need to be added to `variants/01-minimalist-cinema-5/fonts/` for the fonts to actually load. Currently the theme.css had a NOTE comment indicating this was a placeholder until proper self-hosted files are available.
