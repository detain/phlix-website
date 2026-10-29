// csp.mjs — the single source of truth for this site's Content-Security-Policy.
//
// WHY A MODULE EXISTS (review website__devops M-WEBSITE-03)
// ---------------------------------------------------------
// Three surfaces want the policy, and until now each carried its own copy of
// the text with a comment *claiming* they matched:
//
//   * `tools/build.mjs` — injects the policy as `<meta http-equiv=...>` into
//     every HTML page it emits into dist/ (the only form GitHub Pages can
//     actually deliver; the host ignores `_headers` entirely);
//   * `tools/dev-server.mjs` — serves it as a real response header locally;
//   * `_headers` — applies it only if the origin is ever fronted by a
//     headers-supporting host (Cloudflare Pages/Workers).
//
// test/csp-gate.test.mjs pins all three to this file, so "kept byte-identical"
// is an enforced law instead of a hopeful comment.
//
// WHAT THE POLICY IS FORCED TO ALLOW (measured on the built tree, not guessed)
// ----------------------------------------------------------------------------
//   * `script-src 'unsafe-inline'` — the root gallery and root 404 shim run
//     inline scripts (by design: build.mjs injects the kit manifest and both
//     pages have hand-authored inline logic), and 8 kit pages carry inline
//     `<script>`/`onclick=` islands. A strict `script-src 'self'` would have
//     disabled the gallery it protects.
//   * `style-src 'unsafe-inline'` — 497 shipped pages carry inline `style=`
//     attributes, 43 carry inline `<style>` blocks (the `_headers` file's old
//     note claimed "322 … across variants"; the `variants/` tree was deleted
//     2026-06-30 and the real number is measured above).
//   * `https://fonts.googleapis.com` / `https://fonts.gstatic.com` — the root
//     gallery stylesheet comes from Google Fonts (its 3 `<link>`s — 2
//     preconnect + 1 stylesheet — plus the woff2 that sheet pulls). Every kit
//     site self-hosts woff2 under shared/assets/fonts; counting references
//     outside the CSP meta itself, `dist/index.html` is the only page that
//     reaches out (measured on the built tree, 2026-10-29).
//   * `data:` images — 19 shipped pages inline data-URI images.
//
// WHAT META CSP CANNOT EXPRESS (why the header form exists)
// ---------------------------------------------------------
// Browsers ignore `frame-ancestors` (and `report-uri`) inside a meta tag —
// those are header-only. `CSP_HEADER` adds `frame-ancestors 'self'` (not
// 'none': the gallery previews every kit by framing it same-origin, and
// 'none' would kill the site's own previews). On GitHub Pages there is no
// header mechanism at all, so anti-framing is a documented host-config item,
// not a shipped guarantee.

/** Directives that a `<meta http-equiv>` CSP can carry. */
export const CSP_META_DIRECTIVES = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data:",
  "font-src 'self' https://fonts.gstatic.com",
  "connect-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
];

/** Directives a browser will only honour from a response header. */
export const CSP_HEADER_ONLY_DIRECTIVES = ["frame-ancestors 'self'"];

/** The policy as injected into every emitted HTML page. */
export const CSP_META = CSP_META_DIRECTIVES.join('; ');

/** The policy as served by dev-server / declared in `_headers`. */
export const CSP_HEADER = [...CSP_META_DIRECTIVES, ...CSP_HEADER_ONLY_DIRECTIVES].join('; ');

/** The exact tag the build injects. */
export const CSP_META_TAG = `<meta http-equiv="Content-Security-Policy" content="${CSP_META}">`;
