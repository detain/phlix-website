/**
 * Phlix brand kit configuration.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

/* ============================================================================
   main.js — Reduced-motion, scroll reveals
   Renaissance Atelier brand kit — phlix-website/sites/renaissance-atelier/
   ============================================================================ */

(function () {
  'use strict';

  /* ─── Reduced motion ──────────────────────────────────────────────────────── */
  var prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  /* ─── Scroll reveals ──────────────────────────────────────────────────────── */
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var reveals = document.querySelectorAll('.reveal');
    if (reveals.length > 0) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
      );
      reveals.forEach(function (el) { observer.observe(el); });
    }
  } else {
    // Show all reveals immediately if reduced-motion or no IO support
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ─── Hero candle-bloom entry animation (reduced-motion safe) ───────────── */
  if (!prefersReducedMotion) {
    var hero = document.querySelector('.hero');
    if (hero) {
      hero.style.opacity = '0';
      requestAnimationFrame(function () {
        hero.style.transition = 'opacity 800ms cubic-bezier(0.4, 0, 0.2, 1)';
        hero.style.opacity = '1';
      });
    }

    var heroContent = document.querySelector('.hero-inner');
    if (heroContent) {
      heroContent.style.opacity = '0';
      heroContent.style.transform = 'translateY(20px)';
      requestAnimationFrame(function () {
        setTimeout(function () {
          heroContent.style.transition =
            'opacity 600ms ease-out, transform 600ms ease-out';
          heroContent.style.opacity = '1';
          heroContent.style.transform = 'translateY(0)';
        }, 200);
      });
    }
  }

})();
