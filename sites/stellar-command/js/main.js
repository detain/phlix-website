/**
 * stellar-command main.js
 * Starship bridge console — mobile nav, reduced motion, scroll reveals
 */

(function () {
  'use strict';

  // Reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // === MOBILE NAV TOGGLE ===
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!isExpanded));
      navMenu.classList.toggle('is-open', !isExpanded);

      // Prevent body scroll when menu is open
      document.body.style.overflow = isExpanded ? '' : 'hidden';
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
        document.body.style.overflow = '';
        navToggle.focus();
      }
    });

    // Trap focus in menu when open
    navMenu.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;

      const focusable = navMenu.querySelectorAll('a, button, [tabindex="0"]');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  // === SCROLL REVEALS ===
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll(
      '.feature-card, .client-card, .download-card, .feature-detail, .card',
    );

    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('beam-up');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1,
      },
    );

    revealElements.forEach(function (el) {
      el.style.opacity = '0';
      revealObserver.observe(el);
    });
  }

  // === SMOOTH SCROLL FOR ANCHOR LINKS ===
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start',
        });

        // Update focus for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });

  // === HEADER SCROLL EFFECT ===
  const header = document.querySelector('.site-header');
  if (header) {
    let ticking = false;

    window.addEventListener(
      'scroll',
      function () {
        if (!ticking) {
          window.requestAnimationFrame(function () {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
              header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
            } else {
              header.style.boxShadow = '';
            }

            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true },
    );
  }

  // === CONSOLE POWER-UP EFFECT FOR CARDS ===
  if (!prefersReducedMotion) {
    const cards = document.querySelectorAll('.card, .feature-card, .client-card, .download-card');
    cards.forEach(function (card) {
      card.classList.add('console-power');
    });
  }

  // === ACTIVE NAV LINK ===
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');

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

  // === BEACON PULSE FOR STATUS BADGES ===
  if (!prefersReducedMotion) {
    const statusBadges = document.querySelectorAll('.status-badge, .badge--stable');
    statusBadges.forEach(function (badge) {
      badge.classList.add('beacon-pulse');
    });
  }
})();
