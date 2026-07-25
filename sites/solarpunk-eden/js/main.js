/**
 * Phlix brand kit configuration.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

/* ==========================================================================
   main.js — Solarpunk Eden
   Kit: solarpunk-eden v1.0
   ========================================================================== */

(function () {
  'use strict';

  /* ── Mobile nav toggle ─────────────────────────────────────────────────── */
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* ── Reduced-motion guard ──────────────────────────────────────────────── */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Scroll reveals (IntersectionObserver) ─────────────────────────────── */
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var revealEls = document.querySelectorAll('.reveal');

    if (revealEls.length > 0) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -40px 0px',
        },
      );

      revealEls.forEach(function (el) {
        observer.observe(el);
      });
    }
  } else {
    /* Fallback: just show everything immediately */
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ── Smooth scroll for anchor links ─────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    });
  });
})();
