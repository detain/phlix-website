/*!
 * @copyright (c) 2026 Phlix. All rights reserved.
 * Wild-west brand kit — main JavaScript
 */

(function () {
  'use strict';

  // === NAV TOGGLE ===
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen.toString());
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

  // === REDUCED MOTION ===
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    document.documentElement.classList.add('reduced-motion');
  }

  // === SCROLL REVEAL ===
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var revealElements = document.querySelectorAll(
      '.feature-card, .feature-detail, .client-card, .download-card',
    );

    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      },
    );

    revealElements.forEach(function (el) {
      el.classList.add('reveal');
      revealObserver.observe(el);
    });
  } else {
    // Show all elements immediately if no IntersectionObserver or prefers reduced motion
    var revealElementsFallback = document.querySelectorAll('.reveal');
    revealElementsFallback.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }
})();
