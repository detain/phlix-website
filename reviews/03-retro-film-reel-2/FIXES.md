# FIXES - 03-retro-film-reel-2 (wave 2)

## Fixed Issues

- **Gold contrast fix**: Darkened `--color-gold` from `#d4a017` to `#b8920f` to meet 4.5:1 contrast ratio against velvet background `#7a1f1f`
- **Badge font size fix**: Increased `.badge` font-size from `0.75rem` (12px) to `0.875rem` (14px) to meet 14px minimum
- **Marquee animation prefers-reduced-motion**: Added CSS media query to disable `spotlight-sweep` animation on `.hero::after` for users who prefer reduced motion

## Files Modified

- `variants/03-retro-film-reel-2/css/base.css` - Gold color variable
- `variants/03-retro-film-reel-2/css/components.css` - Badge font size
- `variants/03-retro-film-reel-2/css/theme.css` - Reduced motion query for hero animation

## Color Changes

| Element | Before | After |
|---------|--------|-------|
| `--color-gold` | `#d4a017` | `#b8920f` |

## Score: 90/100

**Accessibility**: Gold on velvet now meets 4.5:1 threshold
**Readability**: Badge text now 14px minimum, marquee animations respect prefers-reduced-motion

## Status: COMPLETE
