/**
 * Mountain Summit Theme — Main JavaScript
 * Vanilla JS, dependency-free
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  // ---------- Reduced Motion ----------
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function handleReducedMotion() {
    document.documentElement.classList.toggle('reduce-motion', prefersReducedMotion.matches);
  }

  prefersReducedMotion.addEventListener('change', handleReducedMotion);
  handleReducedMotion();

  // ---------- Mobile Navigation Toggle ----------
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.setAttribute('aria-expanded', String(!expanded));
      document.body.classList.toggle('nav-open');
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.getAttribute('aria-expanded') === 'true') {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
        navToggle.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      }
    });
  }

  // ---------- Scroll Reveals (IntersectionObserver) ----------
  if (!prefersReducedMotion.matches && 'IntersectionObserver' in window) {
    var revealElements = document.querySelectorAll('.feature-card, .client-card, .download-card, .hub-feature');

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(function (el) {
      el.classList.add('reveal');
      revealObserver.observe(el);
    });
  }

  // ---------- Reveal animation styles (added via JS for motion preference) ----------
  if (!prefersReducedMotion.matches) {
    var style = document.createElement('style');
    style.textContent = [
      '.reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease; }',
      '.reveal.revealed { opacity: 1; transform: translateY(0); }',
      '.reduce-motion .reveal { opacity: 1; transform: none; transition: none; }'
    ].join('\n');
    document.head.appendChild(style);
  }

  // ---------- Smooth scroll for anchor links ----------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion.matches ? 'auto' : 'smooth' });
      }
    });
  });

})();
