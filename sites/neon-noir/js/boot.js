/**
 * boot.js — the one script that must run before first paint.
 *
 * Marks the document as JS-capable so the CSS can switch the navigation from
 * its always-rendered fallback (a plain visible list at every width, which is
 * what `navigation_model.fallback` promises) to the small-screen disclosure
 * pattern. Everything on this site works with this attribute absent.
 *
 * Why a separate file rather than an inline <script>: the repo's `_headers`
 * ships `script-src 'self'` with no `'unsafe-inline'`, so an inline script is
 * blocked outright. Why not `defer` on main.js: a deferred write would land
 * after first paint and flash the mobile nav open on every page load.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

document.documentElement.setAttribute('data-js', 'on');
