/**
 * Phlix — Speedrun Timer Brand Kit
 * main.js — Navigation, reduced motion, scroll reveals
 */

(function () {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  // ============================================
  // Mobile Navigation Toggle
  // ============================================
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('open');

      if (!expanded) {
        navMenu.querySelector('a')?.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
        navToggle.focus();
      }
    });
  }

  // ============================================
  // Scroll Reveal (IntersectionObserver)
  // ============================================
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll(
      '.feature-card, .client-card, .download-card, .hub-block, .philosophy-block'
    );

    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
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
  }

  // ============================================
  // Active Nav Link
  // ============================================
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-menu a');

  navLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === './' || href === 'index.html') {
      if (currentPath.endsWith('index.html') || currentPath.endsWith('/')) {
        link.setAttribute('aria-current', 'page');
      }
    } else if (currentPath.includes(href)) {
      link.setAttribute('aria-current', 'page');
    }
  });
})();
