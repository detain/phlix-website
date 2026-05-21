/* ============================================================
   MAIN.JS — Minimalist Cinema V1 — Ultra-Minimal
   No frameworks. Vanilla JS only.
   ============================================================ */

(function () {
  'use strict';

  /* --- Mobile nav toggle ------------------------------------ */
  var navToggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');
  var focusableNavSelectors = 'a[href], button:not([disabled]), [tabindex="0"]';

  if (navToggle && nav) {
    function trapFocus(element) {
      var focusableElements = element.querySelectorAll(focusableNavSelectors);
      var firstFocusable = focusableElements[0];
      var lastFocusable = focusableElements[focusableElements.length - 1];

      function handleTabKey(e) {
        if (e.key !== 'Tab') return;
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      }

      element.addEventListener('keydown', handleTabKey);
      return handleTabKey;
    }

    var removeTrapFocus = null;

    navToggle.addEventListener('click', function () {
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('is-open');
      navToggle.classList.toggle('is-open');

      if (!expanded) {
        removeTrapFocus = trapFocus(nav);
        var firstFocusable = nav.querySelector(focusableNavSelectors);
        if (firstFocusable) firstFocusable.focus();
      } else if (removeTrapFocus) {
        nav.removeEventListener('keydown', removeTrapFocus);
        removeTrapFocus = null;
        navToggle.focus();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('is-open');
        if (removeTrapFocus) {
          nav.removeEventListener('keydown', removeTrapFocus);
          removeTrapFocus = null;
        }
        navToggle.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('is-open');
        if (removeTrapFocus) {
          nav.removeEventListener('keydown', removeTrapFocus);
          removeTrapFocus = null;
        }
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
