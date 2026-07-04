# Usability

**Score: 85/100**  
**Severity: ⚠️**

## Findings

### ❌ CRITICAL: FAQ accordion non-functional (js/main.js:146–163)
`initFaq()` at main.js:146 searches for `document.querySelectorAll(".faq-item details")` — it looks for `<details>` elements nested inside `.faq-item`. But the FAQ HTML structure (about.html:204–254) has each Q&A pair wrapped directly as `.faq-item > details`, not `.faq-item details`. This means the `forEach` loop never finds any elements; `details` is a direct child, not a descendant.

As a result, clicking FAQ items does not expand them (browsers' native `<details>`/`<summary>` toggle still works in modern browsers, so users get basic disclosure widget functionality — but any custom JS animation, ARIA state sync, or reduced-motion handling in `initFaq` is dead code).

**Fix:** Change selector to `.faq-item > details` or `.faq-item details` (both work for direct children since browsers treat `<details>` as a native disclosure widget).

### ⚠️ WARNING: Download requires 3 clicks to reach actual download link
From home page: (1) Click "Get Phlix" → download.html; (2) User must scroll to Clients section; (3) Click "View source" on a client card → GitHub. The actual Phlix server download link is not on download.html — it links to GitHub for source and docs for installation.

The spec (§5) says "the download goal must be reachable in ≤2 clicks from home". The server download requires navigating to download.html then finding the "View on GitHub" or "Installation docs" links, which may constitute a 3rd click depending on interpretation.

The server block on download.html does show composer create-project and php artisan commands — but no direct download link for the server package.

**Fix:** Add a direct download link or releases page for the server (e.g., "Download Phlix Server" pointing to a GitHub releases page), reachable within 2 clicks from the home CTA.

### ⚠️ WARNING: Marquee animation is linear, not brand easing (components.css:749)
`.marquee-track { animation: marquee-scroll 30s linear infinite; }` — `linear` easing contradicts the brand's "slow, opulent, dramatic" motion identity specified as `cubic-bezier(0.25, 0, 0.0, 1.0)` or `ease-in-out`. Marquee is decorative brand element but wrong easing undermines brand feel.

### ⚠️ WARNING: Toast animation name mismatch (main.js:216, 224)
The JS calls `toast.style.animation = "toastIn 300ms ease-in reverse both"` but the CSS keyframe is defined as `toast-in` (kebab-case) at components.css:819. JavaScript string is `"toastIn"` (camelCase). The reverse animation won't play — toast dismiss will be instant rather than animated.

**Fix:** Change JS animation name from `"toastIn"` to `"toast-in"`.

## What Passed

- ✅ Consistent navigation: 8-link primary nav on all pages, correct aria-current on all pages
- ✅ Skip link present as first focusable element on all 8 pages
- ✅ Mobile nav: slide-in drawer with backdrop, hamburger toggle (44×44px), escape-to-close, outside-click-to-close, focus trap within open menu
- ✅ All interactive elements have visible focus indicator (2px marigold-gold ring with 2px offset + warm outer glow)
- ✅ No positive tabindex anywhere — all interactive elements use default tab order
- ✅ All buttons/links have href or role — no orphan buttons
- ✅ No trapped UI states detected; mobile nav closes properly on Escape, backdrop click, and outside click
- ✅ Reduced motion respected: `matchMedia('(prefers-reduced-motion: reduce)')` gates all animations in initScrollReveal() and initFaq()
- ✅ No dead UI elements; every CTA links to a real destination
- ✅ Client cards: "View source" buttons open GitHub in new tab with `rel="noopener noreferrer"`
