/**
 * Synthwave Sunset — main.js
 * Vanilla JS, no dependencies, defer-loaded.
 * Handles: mobile nav toggle, reduced motion, scroll reveals.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  /* ─── Mobile Navigation ───────────────────────────────────────────── */

  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navMenu.classList.toggle('is-open', !isOpen);

      if (!isOpen) {
        var firstLink = navMenu.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
        navToggle.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
      }
    });
  }

  /* ─── Reduced Motion ─────────────────────────────────────────────── */

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function handleReducedMotion() {
    document.documentElement.classList.toggle('reduce-motion', prefersReducedMotion.matches);
  }

  handleReducedMotion();
  prefersReducedMotion.addEventListener('change', handleReducedMotion);

  /* ─── Scroll Reveals ─────────────────────────────────────────────── */

  if (!prefersReducedMotion.matches) {
    var revealElements = document.querySelectorAll(
      '.feature-card, .client-card, .download-card, .feature-detail'
    );

    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );

      revealElements.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        revealObserver.observe(el);
      });

      var style = document.createElement('style');
      style.textContent = [
        '.is-revealed { opacity: 1 !important; transform: translateY(0) !important; }',
        '.reduce-motion .is-revealed { transition: none !important; }'
      ].join('\n');
      document.head.appendChild(style);
    }
  }

  /* ─── Active Nav Link Highlighting ──────────────────────────────── */

  var currentPath = window.location.pathname;
  var navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === './' || href === 'index.html') {
      if (currentPath.endsWith('/') || currentPath.endsWith('index.html')) {
        link.setAttribute('aria-current', 'page');
      }
    } else if (currentPath.includes(href)) {
      link.setAttribute('aria-current', 'page');
    }
  });

})();
