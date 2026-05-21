# Branding Consistency Review — 01-minimalist-cinema-5 (Wave 5)

## Score: 35/100 — FAIL

## What's Working
- No invented colors outside the palette in a few places — the black/white/gold monochrome system is internally consistent (even if not aligned with brand kit)
- Font-display: swap used for all self-hosted fonts
- Consistent typography scale using clamp() throughout

## Critical Issues (blockers)
1. **Wrong colors — Brand kit specifies electric_blue #2D9CFF, not #FFD700 gold**: The variant uses `#FFD700` (gold) as `--color-accent` throughout CSS (base.css line 10, theme.css line 257, components.css line 29, etc.). The brand kit defines `--color-accent: #00F0FF` (neon_aqua) and does NOT include gold at all. Every gold color in this variant is non-compliant with the brand kit.
2. **Wrong color — Brand kit specifies #1A1A1A charcoal, not #000000 pure black**: The variant uses `#000000` as `--color-primary` (base.css line 8). The brand kit specifies `charcoal: #1A1A1A` as the dark primary. Pure black is not in the palette.
3. **Wrong color — Brand kit specifies #2E2E2E slate_gray, not #111111/#1A1A1A surface colors**: Surface colors `#111111` and `#1A1A1A` (base.css lines 16–17) don't match the brand kit which uses `#2E2E2E` as slate_gray. The variant invents `#111111` which is not in any brand kit definition.
4. **Wrong fonts — Brand kit specifies Montserrat ExtraBold for headlines**: The variant uses `'Playfair Display', Georgia, serif` for `--font-headline` (base.css line 25). Playfair Display is a completely different typeface from Montserrat.
5. **Wrong fonts — Brand kit specifies Inter Regular for body**: The variant uses `'Work Sans'` for `--font-body` and `--font-ui` (base.css lines 26–27). Work Sans is not Inter.
6. **Wrong fonts — Brand kit specifies Roboto Medium for UI**: The variant uses Work Sans for `--font-ui` (base.css line 27), not Roboto Medium.
7. **Wrong fonts — Brand kit specifies JetBrains Mono for code**: The variant uses `'Courier New', monospace` for `--font-code` (base.css line 28), not JetBrains Mono.

## Minor Issues (non-blockers)
1. The variant uses `#FFFFFF` as `--color-secondary` which IS in the brand kit ✓
2. The `--color-muted: #666666` is not in the brand kit — brand kit uses slate_gray #2E2E2E for secondary muted purposes
3. Hardcoded colors like `#AAAAAA` in p selector (theme.css line 82) and `#888888` in components.css lines 108, 341 are not CSS custom properties and not in the brand kit
4. The Google Fonts fallback import in theme.css line 8 imports fonts (Playfair Display, Work Sans) that are not in the brand kit

## Recommendations
1. **Replace all CSS custom properties** to match brand kit tokens exactly
2. **Replace all fonts** to match brand kit: Montserrat ExtraBold for headlines, Inter Regular for body, Roboto Medium for UI, JetBrains Mono for code
3. **Remove Google Fonts fallback import** for Playfair Display and Work Sans
4. **Convert all hardcoded hex colors** to CSS custom properties using brand-approved values
5. **Update variant comment** in theme.css to say "Card-Centric" per brand kit variation name
