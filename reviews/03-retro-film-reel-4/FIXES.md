# Wave 4 Fixes — 03-retro-film-reel-4

## CRITICAL ISSUE: Wrong Brand Styling

### Problem
Wave 4 of 03-retro-film-reel is styled as "Sci-Fi Retro" instead of the correct "Hollywood Golden Age" variation.

**Current state:** Sci-Fi Retro dark theme with Oxanium/IBM Plex Sans fonts
**Required state:** Hollywood Golden Age with spotlight effects, velvet ropes, gold accents

### Changes Required

#### 1. base.css - Replace Sci-Fi colors/fonts with Hollywood Golden Age

**Current (wrong):**
```css
--color-bg: #0a1628;
--color-primary: #00d4aa;
--font-headline: 'Oxanium', sans-serif;
--font-body: 'IBM Plex Sans', sans-serif;
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

#### 2. theme.css - Replace Sci-Fi styling with Hollywood Golden Age

**Required changes:**
- Background: cream (#f5e9d4) instead of deep navy
- Header: Spotlight sweep animation
- Add velvet rope visual elements
- Gold trim accents throughout
- Red carpet touches

#### 3. Add inline @font-face for correct fonts in index.html

## Status
**FIX REQUIRED** — Same as Wave 3, this is a significant rebrand.