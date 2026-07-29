/**
 * MAIN.JS — Space Station
 *
 * Self-contained, dependency-free enhancement layer. Everything here is
 * optional: with JS off every page keeps its copy, its CTAs and its
 * navigation via css/nojs.css.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  var root = document.documentElement;

  /* ── reduced motion preference ── */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ══ navigation toggle — mobile menu ══ */

  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('nav-menu');

  function setMenu(open) {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    menu.classList.toggle('is-open', open);
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });

    document.addEventListener('click', function (e) {
      if (
        menu.classList.contains('is-open') &&
        !menu.contains(e.target) &&
        !toggle.contains(e.target)
      ) {
        setMenu(false);
        toggle.focus();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        setMenu(false);
        toggle.focus();
      }
    });
  }

  /* ══ scroll reveal animation ══ */

  function revealsAllowed() {
    return !reduceMotion.matches;
  }

  function startReveals() {
    if (!('IntersectionObserver' in window)) return;
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    root.classList.add('js-reveals');
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
    );
    items.forEach(function (el) {
      io.observe(el);
    });
  }

  if (revealsAllowed()) {
    startReveals();
  }

  /* Listen for reduced motion changes mid-session */
  if (reduceMotion.addEventListener) {
    reduceMotion.addEventListener('change', function () {
      if (reduceMotion.matches) {
        root.classList.remove('js-reveals');
        document.querySelectorAll('.reveal').forEach(function (el) {
          el.classList.add('is-visible');
        });
      } else {
        startReveals();
      }
    });
  }

  /* ══ copy button for code blocks ══ */

  var copyBtns = document.querySelectorAll('.copy-btn');
  copyBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var codeBlock = btn.closest('.code-block');
      var code = codeBlock.querySelector('code');
      if (code) {
        navigator.clipboard.writeText(code.textContent).then(function () {
          btn.textContent = 'Copied!';
          setTimeout(function () {
            btn.textContent = 'Copy';
          }, 2000);
        });
      }
    });
  });

  /* ══ 404 — show requested path ══ */

  var pathSlot = document.querySelector('[data-requested-path]');
  if (pathSlot) {
    pathSlot.textContent = window.location.pathname;
    pathSlot.hidden = false;
  }
})();
