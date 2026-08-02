/**
 * Phlix — Game Cartridge Brand Kit
 * Main JavaScript: nav toggle, reduced motion, scroll reveals
 * @copyright 2024 Phlix
 */

(function () {
  'use strict';

  /* ─── Mobile Nav Toggle ─── */
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.setAttribute('aria-hidden', String(expanded));
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (
        !navToggle.contains(e.target) &&
        !navMenu.contains(e.target) &&
        navMenu.getAttribute('aria-hidden') === 'false'
      ) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.setAttribute('aria-hidden', 'true');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.getAttribute('aria-hidden') === 'false') {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.setAttribute('aria-hidden', 'true');
        navToggle.focus();
      }
    });
  }

  /* ─── Reduced Motion ─── */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── Scroll Reveals ─── */
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var revealElements = document.querySelectorAll(
      '.feature-card, .feature-detail, .client-card, .download-card',
    );

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
      el.classList.add('reveal');
      revealObserver.observe(el);
    });
  } else {
    // Show all elements immediately if reduced motion or no IntersectionObserver
    document
      .querySelectorAll('.feature-card, .feature-detail, .client-card, .download-card')
      .forEach(function (el) {
        el.classList.add('is-revealed');
      });
  }

  /* ─── Smooth scroll for anchor links ─── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    });
  });
})();
