/**
 * @copyright Copyright (c) 2026 Phlix (lost-city brand kit)
 * Lost-city main JavaScript — nav, motion, scroll reveals
 */

(function () {
  'use strict';

  // Respect reduced motion preference
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // === MOBILE NAV TOGGLE ===
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    var isOpen = false;

    function openMenu() {
      isOpen = true;
      navMenu.classList.add('is-open');
      navToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      isOpen = false;
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    navToggle.addEventListener('click', function () {
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (isOpen && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        closeMenu();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
        navToggle.focus();
      }
    });

    // Trap focus in menu when open
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

  // === SCROLL REVEALS ===
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var revealElements = document.querySelectorAll(
      '.feature-card, .client-card, .download-card, .feature-detail',
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
      {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1,
      },
    );

    revealElements.forEach(function (el) {
      el.classList.add('reveal');
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show all elements immediately
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-revealed');
    });
  }

  // === SMOOTH SCROLL FOR ANCHOR LINKS ===
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start',
        });

        // Update URL without jumping
        history.pushState(null, '', targetId);
      }
    });
  });

  // === STAGGERED ANIMATION FOR HERO ELEMENTS ===
  if (!prefersReducedMotion) {
    var heroElements = document.querySelectorAll(
      '.hero-eyebrow, .hero-title, .hero-subtitle, .hero-actions',
    );
    heroElements.forEach(function (el, index) {
      el.style.animationDelay = index * 100 + 'ms';
      el.classList.add('hero-animate');
    });
  }
})();
