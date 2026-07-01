/* ===========================================================================
   main.js — Copper Steampunk
   Mobile nav toggle, reduced-motion guard, scroll reveals
   =========================================================================== */

(function () {
  'use strict';

  /* ── Mobile nav toggle ────────────────────────────────────────────────── */
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* ── Reduced motion ───────────────────────────────────────────────────── */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function handleReducedMotion() {
    document.documentElement.classList.toggle('reduce-motion', prefersReducedMotion.matches);
  }

  handleReducedMotion();
  prefersReducedMotion.addEventListener('change', handleReducedMotion);

  /* ── Scroll reveals ───────────────────────────────────────────────────── */
  if (!prefersReducedMotion.matches) {
    var revealElements = document.querySelectorAll(
      '.feature-card, .feature-detail, .client-card, .download-card, .ecosystem-list li, .faq-item'
    );

    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );

      revealElements.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(12px)';
        el.style.transition =
          'opacity 400ms cubic-bezier(0.4, 0, 0.2, 1), transform 400ms cubic-bezier(0.4, 0, 0.2, 1)';
        revealObserver.observe(el);
      });

      document.head.insertAdjacentHTML(
        'beforeend',
        '<style>.revealed{opacity:1!important;transform:none!important;}</style>'
      );
    }
  }

  /* ── Active nav link highlighting ─────────────────────────────────────── */
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  var navLinks = document.querySelectorAll('.nav-menu a');

  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html') || (currentPath === 'index.html' && href === './')) {
      link.setAttribute('aria-current', 'page');
    }
  });
})();
