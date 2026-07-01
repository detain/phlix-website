/**
 * main.js — Afrofuturism Brand Kit Site
 * Nav toggle, reduced-motion, scroll reveals
 */

(function () {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ── Mobile nav toggle ──────────────────────────────────────────────────── */
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('is-open', !expanded);
      // Trap focus inside open menu
      if (!expanded) {
        var firstLink = navMenu.querySelector('a');
        if (firstLink) firstLink.focus();
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

  /* ── Scroll reveals (IntersectionObserver) ──────────────────────────────── */
  if (!reducedMotion.matches) {
    var reveals = document.querySelectorAll('.animate-on-scroll');
    if (reveals.length > 0 && 'IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin: '0px 0px -40px 0px',
        },
      );
      reveals.forEach(function (el) {
        observer.observe(el);
      });
    }
  }

  /* ── Active nav link highlight on scroll ───────────────────────────────── */
  var sections = document.querySelectorAll('section[id]');
  if (sections.length > 0) {
    var navLinks = document.querySelectorAll('.nav-link');
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute('id');
            navLinks.forEach(function (link) {
              link.classList.remove('is-active');
              if (link.getAttribute('href') === '#' + id) {
                link.classList.add('is-active');
              }
            });
          }
        });
      },
      { threshold: 0.3 },
    );
    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });

    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') {
        sectionObserver.disconnect();
      }
    });
  }
})();
