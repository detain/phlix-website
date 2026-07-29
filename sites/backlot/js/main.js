/* ==========================================================================
   MAIN.JS — Backlot
   Mobile navigation, reduced motion, scroll reveals.
   @copyright 2026 Joe Huss <detain@interserver.net>
   ========================================================================== */

(function () {
  'use strict';

  /* -----------------------------------------------------------------------
     Mobile Navigation Toggle
     ----------------------------------------------------------------------- */
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
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
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* -----------------------------------------------------------------------
     Reduced Motion
     ----------------------------------------------------------------------- */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function handleReducedMotion() {
    document.documentElement.classList.toggle('reduce-motion', prefersReducedMotion.matches);
  }

  prefersReducedMotion.addEventListener('change', handleReducedMotion);
  handleReducedMotion();

  /* -----------------------------------------------------------------------
     Scroll Reveals (IntersectionObserver)
     ----------------------------------------------------------------------- */
  if (!prefersReducedMotion.matches) {
    var revealElements = document.querySelectorAll('.feature-card, .client-card, .download-card, .feature-detail');

    if ('IntersectionObserver' in window && revealElements.length > 0) {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      revealElements.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        revealObserver.observe(el);
      });

      // Add the reveal CSS
      var revealCSS = document.createElement('style');
      revealCSS.textContent = [
        '.is-revealed { opacity: 1 !important; transform: translateY(0) !important; }',
        '.reduce-motion .is-revealed { transition: none !important; }'
      ].join('\n');
      document.head.appendChild(revealCSS);
    }
  }

})();
