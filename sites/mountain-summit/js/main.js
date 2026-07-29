/**
 * main.js — Mountain Summit Theme
 * Vanilla, dependency-free JavaScript.
 * Mobile nav toggle, reduced motion, scroll reveals.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // ==========================================================================
  // MOBILE NAV TOGGLE
  // ==========================================================================

  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    let isOpen = false;

    function openNav() {
      isOpen = true;
      navToggle.setAttribute('aria-expanded', 'true');
      navMenu.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function closeNav() {
      isOpen = false;
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    function toggleNav() {
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    }

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) {
        closeNav();
        navToggle.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (isOpen && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        closeNav();
      }
    });

    // Toggle button
    navToggle.addEventListener('click', toggleNav);

    // Close when clicking nav links
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', closeNav);
    });
  }

  // ==========================================================================
  // SCROLL REVEAL ANIMATION
  // ==========================================================================

  if (!prefersReducedMotion.matches) {
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver(
        function (entries, observer) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          rootMargin: '0px 0px -50px 0px',
          threshold: 0.1,
        }
      );

      revealElements.forEach(function (el) {
        revealObserver.observe(el);
      });
    }
  }

  // ==========================================================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ==========================================================================

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
          block: 'start',
        });

        // Update URL without jumping
        if (history.pushState) {
          history.pushState(null, null, targetId);
        }
      }
    });
  });

  // ==========================================================================
  // LISTEN FOR REDUCED MOTION CHANGES
  // ==========================================================================

  prefersReducedMotion.addEventListener('change', function () {
    // Page reload isn't needed for our animations since they are CSS-based
    // and the CSS already handles prefers-reduced-motion
  });

})();
