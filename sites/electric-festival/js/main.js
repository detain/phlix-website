/**
 * electric-festival brand kit — main.js
 * @copyright 2026 Phlix
 */

(function () {
  'use strict';

  /* ── Mobile nav toggle ────────────────────────────────────────────────────── */
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

  /* ── Reduced motion ────────────────────────────────────────────────────────── */
  var prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  /* ── Scroll reveals (IntersectionObserver) ───────────────────────────────── */
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var revealElements = document.querySelectorAll(
      '.feature-card, .client-card, .download-card, .feature-detail, .hub-feature'
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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    revealElements.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition =
        'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      revealObserver.observe(el);
    });

    // Add revealed state styles
    var style = document.createElement('style');
    style.textContent = `
      .is-revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
    document.head.appendChild(style);
  }

  /* ── Staggered animations for feature cards ────────────────────────────────── */
  if (!prefersReducedMotion) {
    var cards = document.querySelectorAll('.feature-card');
    cards.forEach(function (card, index) {
      card.style.transitionDelay = index * 50 + 'ms';
    });
  }

  /* ── Active nav link highlight ─────────────────────────────────────────────── */
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  var navLinks = document.querySelectorAll('.nav-menu a');

  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (
      href === currentPath ||
      (currentPath === 'index.html' && href === './') ||
      (currentPath === '' && href === './') ||
      (currentPath === 'index.html' && href === 'index.html')
    ) {
      link.setAttribute('aria-current', 'page');
    }
  });
})();
