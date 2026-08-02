/**
 * Loading Screen Kit — main.js
 * Vanilla JS, no dependencies, defer-loaded.
 * Handles mobile nav toggle, reduced motion, scroll reveals.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  // ─── Mobile nav toggle ────────────────────────────────────────────────────

  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.setAttribute('aria-expanded', 'false');

    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('is-open');
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

  // ─── Reduced motion ───────────────────────────────────────────────────────

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function handleReducedMotion() {
    document.documentElement.classList.toggle('reduce-motion', prefersReducedMotion.matches);
  }

  prefersReducedMotion.addEventListener('change', handleReducedMotion);
  handleReducedMotion();

  // ─── Scroll reveals (optional) ────────────────────────────────────────────

  if (!prefersReducedMotion.matches) {
    var revealElements = document.querySelectorAll('.feature-card, .client-card, .download-card');

    if ('IntersectionObserver' in window && revealElements.length > 0) {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
      );

      revealElements.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        revealObserver.observe(el);
      });

      // Add reveal class styling
      var style = document.createElement('style');
      style.textContent = `
        .is-revealed {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ─── DOS boot sequence animation (home page) ────────────────────────────

  var bootLines = document.querySelectorAll('.boot-text__line');
  if (bootLines.length > 0 && !prefersReducedMotion.matches) {
    bootLines.forEach(function (line, index) {
      line.style.animationDelay = index * 0.15 + 's';
    });
  }

  // ─── Loading bar animation (home page hero) ──────────────────────────────

  var loadingFill = document.querySelector('.loading-bar__fill');
  if (loadingFill && !prefersReducedMotion.matches) {
    var progress = 0;
    var interval = setInterval(function () {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      loadingFill.style.width = progress + '%';
    }, 200);

    // Stop when page is fully loaded
    window.addEventListener('load', function () {
      loadingFill.style.width = '100%';
    });
  }
})();
