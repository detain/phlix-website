/**
 * @copyright 2026 Phlix – Warp-drive Brand Kit
 * main.js — nav toggle, reduced-motion, scroll reveals
 */

(function () {
  'use strict';

  /* ─── Mobile nav toggle ──────────────────────────────────────── */
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu   = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
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

  /* ─── Scroll reveals (IntersectionObserver) ──────────────────── */
  var prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var revealEls = document.querySelectorAll('.feature-card, .feature-detail, .client-card, .download-card, .hub-feature');
    if (revealEls.length) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );

      revealEls.forEach(function (el) {
        el.classList.add('reveal');
        observer.observe(el);
      });
    }
  }

  /* ─── Active nav link highlight on scroll (optional) ─────────── */
  var sections = document.querySelectorAll('main[id] section[id]');
  if (sections.length) {
    var navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    if (navLinks.length) {
      var sectionObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var id = entry.target.getAttribute('id');
              navLinks.forEach(function (link) {
                link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
              });
            }
          });
        },
        { threshold: 0.3 }
      );

      sections.forEach(function (section) {
        sectionObserver.observe(section);
      });
    }
  }
})();
