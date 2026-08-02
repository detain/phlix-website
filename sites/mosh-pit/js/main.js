/**
 * mosh-pit main.js
 * Vanilla JS — no dependencies
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // Mobile nav toggle
  // --------------------------------------------------------------------------
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('open');
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
        navToggle.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
      }
    });
  }

  // --------------------------------------------------------------------------
  // Reduced motion
  // --------------------------------------------------------------------------
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function handleReducedMotion() {
    document.documentElement.classList.toggle('reduce-motion', prefersReducedMotion.matches);
  }

  handleReducedMotion();
  prefersReducedMotion.addEventListener('change', handleReducedMotion);

  // --------------------------------------------------------------------------
  // Scroll reveals (optional, respects reduced motion)
  // --------------------------------------------------------------------------
  if (!prefersReducedMotion.matches && 'IntersectionObserver' in window) {
    var revealElements = document.querySelectorAll('.feature-card, .client-card, .download-card');

    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1,
      },
    );

    revealElements.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      revealObserver.observe(el);
    });

    // Add revealed styles
    var style = document.createElement('style');
    style.textContent = '.revealed{opacity:1!important;transform:translateY(0)!important}';
    document.head.appendChild(style);
  }

  // --------------------------------------------------------------------------
  // Focus trap for mobile nav (accessibility)
  // --------------------------------------------------------------------------
  var focusableNavElements = navMenu
    ? navMenu.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"])')
    : [];

  if (focusableNavElements.length > 0) {
    var firstNavElement = focusableNavElements[0];
    var lastNavElement = focusableNavElements[focusableNavElements.length - 1];

    navMenu.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstNavElement) {
          e.preventDefault();
          lastNavElement.focus();
        }
      } else {
        if (document.activeElement === lastNavElement) {
          e.preventDefault();
          firstNavElement.focus();
        }
      }
    });
  }
})();
