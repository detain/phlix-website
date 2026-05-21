# Wave 5 Fixes — 03-retro-film-reel-5

## CRITICAL ISSUE: Wrong Brand Styling

### Problem
Wave 5 of 03-retro-film-reel is styled as "Purple Velvet" instead of the correct "Drive-in Theater" variation.

**Current state:** Purple Velvet dark theme with Cinzel/Quicksand fonts
**Required state:** Drive-in Theater outdoor movie aesthetic with neon signs, starlit sky, retro tech

### Changes Required

#### 1. base.css - Replace Purple Velvet colors/fonts with Drive-in Theater

**Current (wrong):**
```css
--color-bg: #1a0a2e;
--color-accent: #9b4dca;
--font-headline: 'Cinzel', serif;
--font-body: 'Quicksand', sans-serif;
```

**Should be:**
```css
--color-retro-red: #c0392b;
--color-cream: #f5e9d4;
--color-teal: #1abc9c;
--color-black-outline: #111111;
--color-mustard: #d4a017;
--color-soft-brown: #8c5e3c;
--color-mint: #a3e4d7;
--font-headline: 'Bebas Neue', sans-serif;
--font-body: 'Open Sans', sans-serif;
--font-ui: 'Nunito', sans-serif;
--font-code: 'Cousine', monospace;
```

#### 2. theme.css - Replace Purple Velvet styling with Drive-in Theater

**Required changes:**
- Background: Dark night sky with starlit effect
- Add neon sign elements
- Retro speaker cone motifs
- Asphalt texture accents
- "Neon sign flicker" animation on header

#### 3. Add inline @font-face for correct fonts in index.html

## Status
**FIX REQUIRED** — Same as Waves 3 and 4, significant rebrand needed.

## Pattern Issue
Waves 3, 4, and 5 all have wrong brand templates. Recommend reviewing the build process for these variants.