/**
 * js/main.js — Soundwave Studio site JavaScript
 *
 * Vanilla JS, dependency-free, defer-loaded.
 * - Mobile nav toggle (aria-expanded, Esc close, focus trap)
 * - Reduced motion: gate waveform animations behind prefers-reduced-motion
 * - Scroll reveals with IntersectionObserver
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  /* ==========================================================================
     Reduced motion preference
     ========================================================================== */

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================================
     Mobile nav toggle
     ========================================================================== */

  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    let isOpen = false;

    function openNav() {
      isOpen = true;
      navToggle.setAttribute('aria-expanded', 'true');
      navMenu.classList.add('open');
      document.body.style.overflow = 'hidden';

      // Focus first menu item when opened
      const firstLink = navMenu.querySelector('a');
      if (firstLink) firstLink.focus();
    }

    function closeNav() {
      isOpen = false;
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    }

    function toggleNav() {
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    }

    navToggle.addEventListener('click', toggleNav);

    // Close on Escape
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

    // Focus trap within open nav
    navMenu.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;

      const focusable = Array.from(navMenu.querySelectorAll('a[href], button:not([disabled])'));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    // Update activity indicator on nav open (optional enhancement)
    const activityIndicator = document.querySelector('.nav-activity');
    if (activityIndicator) {
      if (isOpen) {
        activityIndicator.classList.add('active');
      }
    }
  }

  /* ==========================================================================
     VU Activity indicator — animate when page is active
     ========================================================================== */

  (function initActivityIndicator() {
    const indicator = document.querySelector('.nav-activity');
    if (!indicator) return;

    // Activate the VU bars animation
    indicator.classList.add('active');

    // Respect reduced motion
    if (prefersReducedMotion) {
      indicator.classList.remove('active');
    }
  })();

  /* ==========================================================================
     Waveform header animation (header motif from kit)
     ========================================================================== */

  (function initWaveformHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    // Add a subtle waveform effect on scroll (VU needle sweep on hover is CSS-only)
    // The scrolling waveform animation runs via CSS in the header
    if (prefersReducedMotion) {
      header.classList.add('reduced-motion');
    }
  })();

  /* ==========================================================================
     Scroll reveals — IntersectionObserver fade-ins
     ========================================================================== */

  (function initScrollReveals() {
    if (!('IntersectionObserver' in window)) {
      // Fallback: just show everything
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    if (prefersReducedMotion) {
      // Skip reveal animations, just show everything
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      },
    );

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  })();

  /* ==========================================================================
     Smooth scroll for anchor links
     ========================================================================== */

  (function initSmoothScroll() {
    if (prefersReducedMotion) return;

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      });
    });
  })();
})();
