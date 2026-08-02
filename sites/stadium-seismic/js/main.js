/**
 * Stadium Seismic — Main JavaScript
 * Vanilla, dependency-free
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // =================================================================
  // MOBILE NAVIGATION TOGGLE
  // =================================================================
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isExpanded));
      navMenu.classList.toggle('is-open', !isExpanded);

      // Prevent body scroll when menu is open on mobile
      if (!isExpanded) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
        document.body.style.overflow = '';
        navToggle.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        if (navMenu.classList.contains('is-open')) {
          navToggle.setAttribute('aria-expanded', 'false');
          navMenu.classList.remove('is-open');
          document.body.style.overflow = '';
        }
      }
    });
  }

  // =================================================================
  // SCROLL REVEALS (IntersectionObserver)
  // =================================================================
  if (!prefersReducedMotion.matches) {
    const revealElements = document.querySelectorAll(
      '.feature-card, .client-card, .download-card, .hub-section, .plugin-model',
    );

    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-fade-in');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: '0px 0px -50px 0px',
          threshold: 0.1,
        },
      );

      revealElements.forEach(function (el) {
        el.style.opacity = '0';
        revealObserver.observe(el);
      });
    }
  }

  // =================================================================
  // ACTIVE NAV LINK
  // =================================================================
  // Set aria-current on the current page's nav link
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-menu a');

  navLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === './' || href === 'index.html') {
      if (currentPath.endsWith('/') || currentPath.endsWith('index.html')) {
        link.setAttribute('aria-current', 'page');
      }
    } else if (currentPath.includes(href)) {
      link.setAttribute('aria-current', 'page');
    }
  });

  // =================================================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // =================================================================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#main-content') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
        });
      }
    });
  });
})();
