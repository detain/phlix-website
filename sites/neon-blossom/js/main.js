/**
 * main.js — Neon Blossom brand kit
 * Vanilla, dependency-free. defer-loaded.
 */

(function () {
  'use strict';

  /* ─── Mobile nav toggle ───────────────────────────── */
  var toggle = document.querySelector('.nav-toggle');
  var menu   = document.querySelector('.nav-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* ─── Scroll reveals ───────────────────────────────── */
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reducedMotion && 'IntersectionObserver' in window) {
    var reveals = document.querySelectorAll('.reveal');

    if (reveals.length > 0) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      });

      reveals.forEach(function (el) {
        observer.observe(el);
      });
    }
  }

  /* ─── Active nav link highlight on scroll ──────────── */
  var sections = document.querySelectorAll('section[id]');
  if (sections.length > 0) {
    var navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    window.addEventListener('scroll', function () {
      var scrollPos = window.scrollY + 80;

      sections.forEach(function (section) {
        var top = section.offsetTop;
        var height = section.offsetHeight;
        var id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(function (link) {
            link.classList.remove('is-active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('is-active');
            }
          });
        }
      });
    });
  }
})();
