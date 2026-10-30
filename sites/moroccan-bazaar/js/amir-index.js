/**
 * js/amir-index.js — Moroccan Bazaar landing: reveal Amir.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 *
 * Extracted verbatim from the inline <script> island in index.html
 * (review website__writer R-WEBSITE-06 — the shipped CSP runs script-src
 * 'self', so page islands must live in files). Deliberately separate from
 * js/amir-download.js: the two pages reveal at different delays, and only
 * the landing seeds the tip text.
 */
(function () {
  // Show Amir after a brief delay
  var amir = document.querySelector('.amir-companion');
  if (amir) {
    setTimeout(function () {
      amir.style.display = 'flex';
      // Don't show tip on load — JS will show it after 2s on eligible pages
      var tip = amir.querySelector('.amir-tip');
      if (tip) tip.textContent = amir.dataset.tip;
    }, 1200);
  }
})();
