/**
 * js/amir-download.js — Moroccan Bazaar download page: reveal Amir.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 *
 * Extracted verbatim from the inline <script> island in download.html
 * (review website__writer R-WEBSITE-06 — the shipped CSP runs script-src
 * 'self', so page islands must live in files). Display-only reveal at the
 * download page's own delay; the tip seeding lives on the landing only.
 */
(function () {
  var amir = document.querySelector('.amir-companion');
  if (amir) {
    setTimeout(function () {
      amir.style.display = 'flex';
    }, 800);
  }
})();
