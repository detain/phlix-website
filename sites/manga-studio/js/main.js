/**
 * Phlix brand kit configuration.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

/* ===========================================================================
   main.js — Manga Studio
   Nav toggle, reduced-motion, scroll reveals
   =========================================================================== */
(function () {
  'use strict';

  /* ── Reduced motion detection ─────────────────────────────────────────── */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.documentElement.classList.add('reduce-motion');
  }

  /* ── Mobile nav toggle ─────────────────────────────────────────────────── */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* ── Scroll reveals (skip if reduced motion) ─────────────────────────── */
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealEls = document.querySelectorAll(
      '.feature-card,.client-card,.download-card,.ecosystem-list li,.faq-item',
    );
    if (revealEls.length) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 },
      );

      revealEls.forEach(function (el) {
        el.classList.add('scroll-hidden');
        observer.observe(el);
      });
    }
  } else {
    // Show all immediately when reduced motion or no IntersectionObserver
    document.querySelectorAll('.scroll-hidden').forEach(function (el) {
      el.classList.add('revealed');
    });
  }
})();
