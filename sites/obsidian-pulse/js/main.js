/**
 * main.js — Obsidian Pulse
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  /* ── Mobile nav toggle ─────────────────────────────────────────────── */
  var toggle = document.querySelector('.nav__toggle');
  var links = document.querySelector('.nav__links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('nav__links--open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  /* ── Copy-to-clipboard for install command ──────────────────────────── */
  var copyBtn = document.querySelector('.install-box__copy');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var cmd = copyBtn.closest('.install-box__command');
      var code = cmd ? cmd.querySelector('code') : null;
      if (!code) return;

      navigator.clipboard.writeText(code.textContent.trim()).then(function () {
        copyBtn.classList.add('install-box__copy--copied');
        var label = copyBtn.querySelector('.sr-only');
        if (label) label.textContent = 'Copied!';
        setTimeout(function () {
          copyBtn.classList.remove('install-box__copy--copied');
          if (label) label.textContent = 'Copy';
        }, 2000);
      });
    });
  }

  /* ── Easter egg: logo-clicks:5 ──────────────────────────────────────── */
  (function () {
    var LOGO_CLICKS = 5;
    var GLOW_DURATION = 2000;

    var logoEl = document.querySelector('.nav__logo');
    if (!logoEl) return;

    var clickCount = 0;
    var glowTimer = null;
    var tripleAnimation = null;

    function triggerGlow() {
      // Remove any existing glow
      clearTimeout(glowTimer);
      if (tripleAnimation) clearTimeout(tripleAnimation);

      logoEl.classList.add('nav__logo--glowing');

      // Triple-pass pulse scan effect
      var hero = document.querySelector('.hero');
      if (hero) {
        hero.classList.add('hero--easter-scan');
        tripleAnimation = setTimeout(
          function () {
            hero.classList.remove('hero--easter-scan');
          },
          5 * 3 * 1000 + 500,
        ); // 5s × 3 passes + buffer
      }

      glowTimer = setTimeout(function () {
        logoEl.classList.remove('nav__logo--glowing');
      }, GLOW_DURATION);
    }

    logoEl.addEventListener('click', function () {
      // Don't trigger if focus is in an input
      if (
        document.activeElement &&
        (document.activeElement.tagName === 'INPUT' ||
          document.activeElement.tagName === 'TEXTAREA' ||
          document.activeElement.hasAttribute('contenteditable'))
      ) {
        return;
      }

      clickCount++;
      if (clickCount >= LOGO_CLICKS) {
        clickCount = 0;
        triggerGlow();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (glowTimer) {
          clearTimeout(glowTimer);
          glowTimer = null;
        }
        if (tripleAnimation) {
          clearTimeout(tripleAnimation);
          tripleAnimation = null;
        }
        logoEl.classList.remove('nav__logo--glowing');
        var hero = document.querySelector('.hero');
        if (hero) hero.classList.remove('hero--easter-scan');
      }
    });
  })();

  /* ── Seasonal activation (live-js mode) ────────────────────────────── */
  (function () {
    var now = new Date();
    var mmdd =
      (now.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      now.getDate().toString().padStart(2, '0');

    var root = document.documentElement;

    // Winter Signal: 12-01 to 01-15
    if (mmdd >= '12-01' || mmdd <= '01-15') {
      root.style.setProperty('--color-primary', '#60CFFF');
      root.style.setProperty('--color-bg', '#07090D');
    }
    // Midnight Edition: 07-01 to 07-31
    else if (mmdd >= '07-01' && mmdd <= '07-31') {
      root.style.setProperty('--color-surface', '#0D0F14');
      root.style.setProperty('--color-primary', '#00A3FF');
    }
  })();
})();
