/* ==========================================================================
   MAIN.JS — Cybernetic Surge
   Nav toggle, reduced motion, scroll reveals
   ========================================================================== */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     Mobile Nav Toggle
     -------------------------------------------------------------------------- */
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navMenu.classList.toggle('is-open', !isOpen);

      // Trap focus in mobile menu when open
      if (!isOpen) {
        var firstLink = navMenu.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    });

    // Close on Escape key
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

    // Close on nav link click (accessibility)
    var navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
      });
    });
  }

  /* --------------------------------------------------------------------------
     Reduced Motion Detection
     -------------------------------------------------------------------------- */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function handleReducedMotion() {
    document.documentElement.classList.toggle('reduce-motion', prefersReducedMotion.matches);
  }

  handleReducedMotion();
  prefersReducedMotion.addEventListener('change', handleReducedMotion);

  /* --------------------------------------------------------------------------
     Scroll Reveal (Intersection Observer)
     -------------------------------------------------------------------------- */
  var revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0 && !prefersReducedMotion.matches) {
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
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1,
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    revealElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* --------------------------------------------------------------------------
     Syntha Mascot (when present)
     -------------------------------------------------------------------------- */
  var synthaElement = document.querySelector('.syntha-presence');

  if (synthaElement && !prefersReducedMotion.matches) {
    // Circuit flush animation for Syntha
    synthaElement.style.animation = 'circuit-flush 3s ease-in-out infinite';
  }

  /* --------------------------------------------------------------------------
     Smooth Scroll for Anchor Links
     -------------------------------------------------------------------------- */
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

        // Update focus for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });

  /* --------------------------------------------------------------------------
     Circuit Trace Hover Effect
     -------------------------------------------------------------------------- */
  var interactiveElements = document.querySelectorAll('.feature-card, .client-card, .download-card');

  interactiveElements.forEach(function (el) {
    el.addEventListener('mouseenter', function () {
      if (!prefersReducedMotion.matches) {
        this.style.setProperty('--circuit-flush', '1');
      }
    });
  });

  /* --------------------------------------------------------------------------
     Inline SVG Icons (ensure proper sizing)
     -------------------------------------------------------------------------- */
  document.querySelectorAll('.feature-card-icon svg, .feature-detail-icon svg').forEach(function (svg) {
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.display = 'block';
  });

})();
