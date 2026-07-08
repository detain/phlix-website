/**
 * Phlix brand kit configuration.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

/* ==========================================================================
   MAIN.JS — Neon Noir brand kit
   Nav toggle, reduced-motion, scroll reveals
   Vanilla, dependency-free, defer-loaded
   ========================================================================== */

(function() {
  'use strict';

  /* ==========================================================================
     Mobile Navigation Toggle
     ========================================================================== */

  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navOverlay = document.querySelector('.nav-overlay');

  function openNav() {
    navMenu.classList.add('is-open');
    navOverlay.classList.add('is-visible');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    navMenu.classList.remove('is-open');
    navOverlay.classList.remove('is-visible');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    navToggle.focus();
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      const isOpen = navMenu.classList.contains('is-open');
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    if (navOverlay) {
      navOverlay.addEventListener('click', closeNav);
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        closeNav();
      }
    });

    const navLinks = navMenu.querySelectorAll('.nav-menu__link');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        if (navMenu.classList.contains('is-open')) {
          closeNav();
        }
      });
    });
  }

  /* ==========================================================================
     Reduced Motion
     ========================================================================== */

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

  /* ==========================================================================
     Scroll Reveal — IntersectionObserver fade-ins
     ========================================================================== */

  function initScrollReveal() {
    if (prefersReducedMotion.matches) {
      const revealElements = document.querySelectorAll('.reveal');
      revealElements.forEach(function(el) {
        el.classList.add('is-visible');
      });
      return;
    }

    if (!('IntersectionObserver' in window)) {
      const revealElements = document.querySelectorAll('.reveal');
      revealElements.forEach(function(el) {
        el.classList.add('is-visible');
      });
      return;
    }

    const revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(function(el) {
      revealObserver.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollReveal);
  } else {
    initScrollReveal();
  }

  /* ==========================================================================
     Smooth Scroll for Anchor Links
     ========================================================================== */

  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#main-content') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
          block: 'start'
        });
      }
    });
  });

  /* ==========================================================================
     Focus Trap for Mobile Nav
     ========================================================================== */

  function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function(e) {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    });
  }

  if (navMenu && navMenu.classList.contains('is-open')) {
    trapFocus(navMenu);
  }

})();
