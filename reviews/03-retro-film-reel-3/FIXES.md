# Wave 3 Fixes — 03-retro-film-reel-3

## CRITICAL ISSUE: Wrong Brand Styling

### Problem
Wave 3 of 03-retro-film-reel is styled as "Film Noir" instead of the correct "Sunday Matinee" variation.

**Current state:** Film Noir dark theme with Oswald/Lora fonts
**Required state:** Sunday Matinee warm cream theme with Bebas Neue/Open Sans/Nunito fonts

### Changes Required

#### 1. base.css - Replace Film Noir colors/fonts with Sunday Matinee

**Current (wrong):**
```css
--color-noir-black: #0d0d0d;
--color-noir-white: #fafafa;
--color-noir-amber: #d4763b;
--font-headline: 'Oswald', sans-serif;
--font-body: 'Lora', serif;
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

#### 2. theme.css - Replace Film Noir styling with warm/cozy styling

**Required changes:**
- Header background: cream (#f5e9d4) with warm gradient
- Header motif: "Popcorn pop" animation
- Border radius: rounded (family-friendly)
- Body background: cream, not noir black

#### 3. index.html - Add inline @font-face for correct fonts

```html
<style>
  @font-face {
    font-family: 'Bebas Neue';
    src: url('css/fonts/bebas-neue.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Open Sans';
    src: url('css/fonts/open-sans.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Nunito';
    font-weight: 700;
    src: url('css/fonts/nunito-bold.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Cousine';
    src: url('css/fonts/cousine.woff2') format('woff2');
  }
</style>
```

## Status
**FIX REQUIRED** — This is a significant rebrand, not a minor fix. The variant uses Film Noir code structure that would need substantial rewrite.

## Verification
- Build: PASSED
- Lint: PASSED
- **BUT:** Brand styling is completely wrong