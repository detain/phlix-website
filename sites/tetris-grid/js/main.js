/**
 * main.js — tetris-grid brand kit
 * Mobile nav toggle, reduced motion, scroll reveals
 * @copyright Phlix
 */

(function () {
  'use strict';

  /* ========================================
     1. Mobile Navigation Toggle
     ======================================== */

  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    // Toggle menu on button click
    navToggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen.toString());

      // Update icon
      const icon = navToggle.querySelector('svg use');
      if (icon) {
        icon.setAttribute('href', '#icon-' + (isOpen ? 'close' : 'menu'));
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });

    // Trap focus within open menu
    navMenu.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;

      const focusable = navMenu.querySelectorAll('a, button');
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

  /* ========================================
     2. Reduced Motion
     ======================================== */

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function handleReducedMotion() {
    if (prefersReducedMotion.matches) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  }

  handleReducedMotion();
  prefersReducedMotion.addEventListener('change', handleReducedMotion);

  /* ========================================
     3. Scroll Reveal
     ======================================== */

  function initScrollReveal() {
    if (prefersReducedMotion.matches) return;
    if (!('IntersectionObserver' in window)) return;

    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
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
        threshold: 0.1
      }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollReveal);
  } else {
    initScrollReveal();
  }

  /* ========================================
     4. Active Nav Link
     ======================================== */

  function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      if (!href) return;

      // Handle both relative paths and full URLs
      const linkPath = href.replace(/^\.\//, '/').replace(/\/$/, '');
      const isCurrentPage =
        currentPath === linkPath ||
        currentPath === linkPath + '.html' ||
        (linkPath === '/index' && (currentPath === '/' || currentPath.endsWith('/index.html')));

      if (isCurrentPage) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  setActiveNavLink();

  /* ========================================
     5. Tetromino Block Animation (Brand flavor)
     ======================================== */

  function initTetrisAnimation() {
    if (prefersReducedMotion.matches) return;

    const blocks = document.querySelectorAll('.tetromino-float');
    if (!blocks.length) return;

    blocks.forEach(function (block, i) {
      // Offset animation start for staggered effect
      block.style.animationDelay = (i * 0.2) + 's';
    });
  }

  initTetrisAnimation();

})();
