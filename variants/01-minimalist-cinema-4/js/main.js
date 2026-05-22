/* ============================================================
   MAIN.JS — Minimalist Cinema V4 — Warm Editorial
   No frameworks. Vanilla JS only.
   ============================================================ */

(function () {
  'use strict';

  /* --- Mobile nav toggle ------------------------------------ */
  var navToggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');

  if (navToggle && nav) {
    var focusableSelectors =
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';
    var focusTrap;

    function getFocusableElements() {
      return nav.querySelectorAll(focusableSelectors);
    }

    function handleNavKeydown(e) {
      if (!nav.classList.contains('is-open')) return;
      var focusable = getFocusableElements();
      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }

      if (e.key === 'Escape') {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('is-open');
        navToggle.focus();
      }
    }

    navToggle.addEventListener('click', function () {
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('is-open');
      navToggle.classList.toggle('is-open');

      if (!expanded) {
        var focusable = getFocusableElements();
        if (focusable.length > 0) {
          focusable[0].focus();
        }
        document.addEventListener('keydown', handleNavKeydown);
      } else {
        document.removeEventListener('keydown', handleNavKeydown);
      }
    });

    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('is-open');
        document.removeEventListener('keydown', handleNavKeydown);
      }
    });
  }

  /* --- Smooth scroll for anchor links ------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var id = this.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
