/**
 * main.js — Cyber Tokyo
 * Nav toggle, reduced-motion, scroll reveals
 */

(function () {
  'use strict';

  /* ── Reduced motion ─────────────────────────────────────────────────────── */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Mobile nav toggle ──────────────────────────────────────────────────── */
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    /* Close on outside click */
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    /* Close on Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        navToggle.focus();
      }
    });

    /* Trap focus in open menu */
    navMenu.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var focusable = navMenu.querySelectorAll('a, button');
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  /* ── Scroll reveals ─────────────────────────────────────────────────────── */
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    document
      .querySelectorAll('.feature-card, .client-card, .download-card, .faq-item, .feature-detail')
      .forEach(function (el) {
        el.classList.add('reveal');
        revealObserver.observe(el);
      });
  }

  /* ── Glitch micro-interaction on card hover ──────────────────────────────── */
  if (!prefersReducedMotion) {
    document
      .querySelectorAll('.feature-card, .client-card, .download-card')
      .forEach(function (card) {
        card.addEventListener('mouseenter', function () {
          card.style.animation = 'none';
          card.offsetHeight; /* trigger reflow */
          card.style.animation = 'glitch-enter 200ms cubic-bezier(0.25, 0, 0, 1)';
        });
      });
  }

  /* ── Active nav link highlight (scroll spy) ──────────────────────────────── */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-menu a[href^="./"]');

  if (sections.length && navLinks.length) {
    var scrollSpy = new IntersectionObserver(
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
      { threshold: 0.3 },
    );

    sections.forEach(function (section) {
      scrollSpy.observe(section);
    });
  }
})();
