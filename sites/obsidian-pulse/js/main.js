/**
 * js/main.js — Obsidian Pulse
 * Mobile nav toggle + reduced-motion + scroll reveals
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  /* ── Mobile nav toggle ─────────────────────────────────────────────────── */
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navMenu.classList.toggle('is-open', !isOpen);
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
        navToggle.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
      }
    });
  }

  /* ── Reduced motion ────────────────────────────────────────────────────── */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Scroll reveals (IntersectionObserver) ────────────────────────────── */
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var revealSelector =
      '.pitch-bullets li, .feature-card, .feature-detail, .client-card, .download-card, .faq-item, .ecosystem-list li';
    var revealEls = document.querySelectorAll(revealSelector);

    if (revealEls.length > 0) {
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
        {
          threshold: 0.1,
          rootMargin: '0px 0px -40px 0px',
        },
      );

      revealEls.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        el.style.transition =
          'opacity 400ms cubic-bezier(0.25, 0.0, 0.0, 1.0), transform 400ms cubic-bezier(0.25, 0.0, 0.0, 1.0)';
        observer.observe(el);
      });
    }
  }
})();
