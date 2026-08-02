/**
 * Phlix — deep-abyss brand kit
 * main.js — nav toggle, reduced-motion, scroll reveals
 *
 * @copyright 2026 Phlix
 */

(function () {
  'use strict';

  /* ─── Mobile Nav Toggle ─────────────────────────────────────── */
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.hidden = expanded;
      if (!expanded) {
        navMenu.removeAttribute('hidden');
        navMenu.classList.add('open');
        // Focus first link
        var firstLink = navMenu.querySelector('a');
        if (firstLink) firstLink.focus();
      } else {
        navMenu.classList.remove('open');
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.hidden = true;
        navMenu.classList.remove('open');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.hidden = true;
        navMenu.classList.remove('open');
        navToggle.focus();
      }
    });
  }

  /* ─── Scroll Reveals (IntersectionObserver) ─────────────────── */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var revealElements = document.querySelectorAll(
      '.feature-card, .feature-detail, .client-card, .download-card',
    );

    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      },
    );

    revealElements.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      revealObserver.observe(el);
    });
  }

  /* ─── FAQ <details> animated marker ────────────────────────── */
  // Handled via CSS in theme.css
})();
