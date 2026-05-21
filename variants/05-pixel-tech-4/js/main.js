/* ============================================================
   variants/05-pixel-tech-4/js/main.js
   Warm Amber Terminal effects, mobile nav, scroll animations
   No frameworks - vanilla JS only
   ============================================================ */

(function() {
  'use strict';

  // ─── Mobile Navigation ───
  function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', function() {
      const isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen.toString());

      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu on escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });

    // Close menu when clicking a link
    menu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ─── Amber Glow Effect ───
  function initAmberGlow() {
    const glowElements = document.querySelectorAll('.terminal-cursor');

    if (!glowElements.length) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    glowElements.forEach(function(el) {
      el.style.animation = 'none';
      el.offsetHeight; // Trigger reflow
      el.style.animation = '';
    });
  }

  // ─── Scroll Reveal Animations ───
  function initScrollAnimations() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const animatedElements = document.querySelectorAll(
      '.feature-card, .client-card, .download-card, .faq-item, .hub-section'
    );

    if (!animatedElements.length) return;

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(function(el, index) {
      el.style.animationDelay = (index * 0.08) + 's';
      observer.observe(el);
    });
  }

  // ─── Hover Sound Effect Simulation (Visual Only) ───
  function initHoverEffects() {
    // Add visual feedback on button hover
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(function(btn) {
      btn.addEventListener('mouseenter', function() {
        this.classList.add('is-hovering');
      });

      btn.addEventListener('mouseleave', function() {
        this.classList.remove('is-hovering');
      });
    });
  }

  // ─── Active Navigation State ───
  function initActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(function(link) {
      const href = link.getAttribute('href');

      // Check if current page matches
      if (currentPath === href ||
          currentPath.endsWith(href) ||
          (href === '/' && (currentPath === '/' || currentPath === ''))) {
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  // ─── Keyboard Navigation Enhancement ───
  function initKeyboardNav() {
    // Add focus-visible class management
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
      }
    });

    document.addEventListener('mousedown', function() {
      document.body.classList.remove('keyboard-nav');
    });
  }

  // ─── Smooth Scroll for Anchor Links ───
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          // Update focus for accessibility
          target.setAttribute('tabindex', '-1');
          target.focus();
        }
      });
    });
  }

  // ─── Initialize All ───
  function init() {
    initMobileNav();
    initAmberGlow();
    initScrollAnimations();
    initHoverEffects();
    initActiveNav();
    initKeyboardNav();
    initSmoothScroll();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
