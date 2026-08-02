/* ==========================================================================
   MAIN.JS — Exo-Atmospheric
   Mobile nav toggle, reduced motion, scroll reveals.
   Vanilla, dependency-free, defer-loaded.
   @copyright 2026 Joe Huss <detain@interserver.net>
   ========================================================================== */

(function () {
  'use strict';

  /* ── Reduced motion ── */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Mobile nav toggle ── */
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navMenu.classList.toggle('is-open', !isOpen);

      if (!isOpen) {
        navMenu.querySelector('a') && navMenu.querySelector('a').focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
        navToggle.focus();
      }
    });
  }

  /* ── Scroll reveals (IntersectionObserver) ── */
  var revealEls = document.querySelectorAll(
    '.feature-card, .feature-detail, .client-card, .download-card, .faq-item',
  );

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    revealEls.forEach(function (el) {
      el.classList.add('reveal');
      revealObserver.observe(el);
    });
  } else {
    // Show all immediately if reduced-motion or no IO
    Array.prototype.forEach.call(revealEls, function (el) {
      el.classList.add('is-revealed');
    });
  }

  /* ── Starfield depth on scroll ── */
  if (!prefersReducedMotion) {
    var starfield = document.querySelector('.starfield');
    if (starfield) {
      var ticking = false;
      window.addEventListener('scroll', function () {
        if (!ticking) {
          window.requestAnimationFrame(function () {
            var scrolled = window.pageYOffset;
            starfield.style.transform = 'translateY(' + scrolled * 0.15 + 'px)';
            ticking = false;
          });
          ticking = true;
        }
      });
    }
  }
})();
