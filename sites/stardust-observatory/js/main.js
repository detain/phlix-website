/**
 * Stardust Observatory — js/main.js
 * Navigation toggle, reduced motion, and scroll reveals
 * Celestially slow, purposeful, luminous
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  /* ── Reduced motion detection ───────────────────────────────────────────── */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Mobile nav toggle ──────────────────────────────────────────────────── */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));

      // Trap focus within menu when open
      if (isOpen) {
        const firstLink = navMenu.querySelector('a');
        if (firstLink) firstLink.focus();
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

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (
        navMenu.classList.contains('is-open') &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Scroll reveals ────────────────────────────────────────────────────── */
  if (!prefersReducedMotion) {
    var revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length && 'IntersectionObserver' in window) {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
      );
      revealElements.forEach(function (el) {
        revealObserver.observe(el);
      });
    }
  }

  /* ── Smooth anchor scrolling ──────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.length <= 1) return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start',
        });
      }
    });
  });

  /* ── Prevent double-tap zoom on mobile ───────────────────────────────── */
  var touchElements = document.querySelectorAll('button, a, input, select, textarea');
  touchElements.forEach(function (el) {
    el.addEventListener(
      'touchend',
      function (e) {
        e.preventDefault();
        el.click();
      },
      { passive: false },
    );
  });
})();
