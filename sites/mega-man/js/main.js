/*!
 * @copyright Copyright (c) 2026 Phlix Project
 * @license MPL-2.0 (phlix-server/phlix-hub) / MIT (clients/plugins)
 *
 * Mega-Man Theme — main.js
 * Mobile nav toggle, reduced-motion, scroll reveals
 */

(function () {
  'use strict';

  /* ============================================================
     MOBILE NAV TOGGLE
     ============================================================ */

  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        navToggle.focus();
      }
    });

    // Trap focus in mobile menu
    navMenu.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;

      var focusable = navMenu.querySelectorAll('a, button');
      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  /* ============================================================
     REDUCED MOTION
     ============================================================ */

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function handleReducedMotion() {
    document.documentElement.classList.toggle('reduced-motion', prefersReducedMotion.matches);
  }

  handleReducedMotion();
  prefersReducedMotion.addEventListener('change', handleReducedMotion);

  /* ============================================================
     SCROLL REVEALS — fade-in on scroll
     ============================================================ */

  if (!prefersReducedMotion.matches) {
    var reveals = document.querySelectorAll(
      '.feature-card, .feature-detail, .client-card, .download-card, .hub-feature',
    );

    if (reveals.length > 0 && 'IntersectionObserver' in window) {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          rootMargin: '0px 0px -50px 0px',
          threshold: 0.1,
        },
      );

      reveals.forEach(function (el) {
        el.classList.add('reveal');
        revealObserver.observe(el);
      });
    }
  }

  /* ============================================================
     SMOOTH SCROLL FOR ANCHOR LINKS
     ============================================================ */

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
          block: 'start',
        });

        // Update URL without jumping
        history.pushState(null, '', targetId);
      }
    });
  });
})();
