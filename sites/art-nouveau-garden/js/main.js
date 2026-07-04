/**
 * js/main.js — nav toggle, reduced-motion, scroll reveals
 * Art Nouveau Garden brand kit
 */
(function () {
  'use strict';

  /* ── Mobile nav toggle ──────────────────────────────────────────────────── */
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    var focusableSelectors = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';
    var focusableEls = function () {
      return [].slice.call(navMenu.querySelectorAll(focusableSelectors)).filter(function (el) {
        return el.offsetParent !== null;
      });
    };

    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      if (isOpen) {
        var items = focusableEls();
        if (items.length > 0) items[0].focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    navMenu.addEventListener('keydown', function (e) {
      if (e.key === 'Tab') {
        var items = focusableEls();
        if (items.length === 0) return;
        if (e.shiftKey) {
          if (document.activeElement === items[0]) {
            e.preventDefault();
            navToggle.focus();
            navMenu.classList.remove('is-open');
            navToggle.setAttribute('aria-expanded', 'false');
          }
        } else {
          if (document.activeElement === items[items.length - 1]) {
            e.preventDefault();
            navToggle.focus();
            navMenu.classList.remove('is-open');
            navToggle.setAttribute('aria-expanded', 'false');
          }
        }
      }
      if (e.key === 'Escape') {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* ── Reduced motion ─────────────────────────────────────────────────────── */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Scroll reveals (IntersectionObserver) ─────────────────────────────── */
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var revealEls = document.querySelectorAll('.feature-card, .client-card, .feature-detail');
    if (revealEls.length > 0) {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );
      revealEls.forEach(function (el) {
        revealObserver.observe(el);
      });
    }
  } else {
    // Show all immediately if reduced motion or no IO support
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ── Focus ring bloom on interactive elements ───────────────────────────── */
  if (!prefersReducedMotion) {
    document.querySelectorAll('.btn, a, button, input, select, textarea').forEach(function (el) {
      el.addEventListener('focus', function () {
        el.classList.add('focus-ring-bloom');
      }, { passive: true });
      el.addEventListener('blur', function () {
        el.classList.remove('focus-ring-bloom');
      }, { passive: true });
    });
  }

})();
