/* ==========================================================================
   MAIN.JS — Abstract Canvas
   Mobile nav toggle, reduced-motion, scroll reveals
   ========================================================================== */

(function () {
  'use strict';

  /* ── Mobile Nav Toggle ───────────────────────────────────────────────── */

  const navToggle = document.querySelector('.nav-toggle');
  const navMenu   = document.querySelector('.nav-menu');
  const navBackdrop = document.querySelector('.nav-backdrop');

  function openNav() {
    navToggle.setAttribute('aria-expanded', 'true');
    navMenu.classList.add('is-open');
    if (navBackdrop) navBackdrop.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('is-open');
    if (navBackdrop) navBackdrop.classList.remove('is-visible');
    document.body.style.overflow = '';
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    // Close on backdrop click
    if (navBackdrop) {
      navBackdrop.addEventListener('click', function () {
        closeNav();
        navToggle.focus();
      });
    }

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        closeNav();
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
        closeNav();
        navToggle.focus();
      }
    });
  }

  /* ── Scroll Reveal (IntersectionObserver) ───────────────────────────── */

  const revealElements = document.querySelectorAll('.animate-reveal');

  if (
    revealElements.length > 0 &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
    'IntersectionObserver' in window
  ) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: just show everything
    revealElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ── Reduced Motion: pause animation class ─────────────────────────── */

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function handleReducedMotion() {
    if (prefersReducedMotion.matches) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  }

  handleReducedMotion();
  prefersReducedMotion.addEventListener('change', handleReducedMotion);

})();
