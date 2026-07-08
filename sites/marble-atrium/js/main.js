/**
 * main.js — Marble Atrium site
 * Vanilla, dependency-free, defer-loaded.
 * Responsibilities:
 *   - Mobile nav toggle (aria-expanded, Esc close, outside click)
 *   - Reduced motion gate (prefers-reduced-motion)
 *   - Optional scroll reveal (IntersectionObserver)
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  /* ---------------------------------------------------------------------
     Mobile Nav Toggle
     --------------------------------------------------------------------- */
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('open', !expanded);
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
        navToggle.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
      }
    });
  }

  /* ---------------------------------------------------------------------
     Reduced Motion Gate
     --------------------------------------------------------------------- */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------------
     Scroll Reveal — fade-in on scroll (disabled if reduced motion)
     --------------------------------------------------------------------- */
  if (!prefersReducedMotion) {
    var fadeEls = document.querySelectorAll('.fade-in');
    if (fadeEls.length && 'IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
      );

      fadeEls.forEach(function (el) {
        observer.observe(el);
      });
    }
  } else {
    // Show all immediately when reduced motion is preferred
    document.querySelectorAll('.fade-in').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ---------------------------------------------------------------------
     Marble-vein reveal on hero (only if motion allowed)
     --------------------------------------------------------------------- */
  if (!prefersReducedMotion) {
    var veinEl = document.querySelector('.reveal-vein');
    if (veinEl) {
      // Small delay so the page is painted first
      setTimeout(function () {
        veinEl.style.opacity = '1';
      }, 50);
    }
  }
})();
