/**
 * Phlix brand kit configuration.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

/* =============================================================================
   main.js — Wilderness Trail brand kit site
   =============================================================================
   Vanilla JS, no dependencies, defer-loaded.
   - Mobile nav toggle with aria-expanded, Esc to close, outside click
   - Reduced-motion gate for scroll reveals
   - Scroll-reveal fade-ins via IntersectionObserver
   ============================================================================= */

(function () {
  'use strict';

  /* ─── Mobile nav toggle ──────────────────────────────────────────────────── */
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navMenu.classList.toggle('is-open', !isOpen);

      if (!isOpen) {
        navMenu.querySelector('a')?.focus();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
        navToggle.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
      }
    });
  }

  /* ─── Scroll reveals (gated by reduced-motion) ──────────────────────────── */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var revealEls = document.querySelectorAll(
      '.feature-card, .client-card, .download-card, .feature-detail, .faq-item',
    );

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    revealEls.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.35s ease-out, transform 0.35s ease-out';
      observer.observe(el);
    });
  }

  /* ─── Main content anchor target (for skip-link) ──────────────────────────── */
  var mainContent = document.getElementById('main-content');
  if (mainContent) {
    mainContent.addEventListener('focus', function () {
      mainContent.style.outline = 'none';
    });
  }
})();
