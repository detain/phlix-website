/**
 * main.js
 * Mobile nav toggle with focus trap, smooth scroll, Purple Velvet animations
 * Variant: 03-retro-film-reel-5 (Purple Velvet)
 */

(function() {
  'use strict';

  // ─── Mobile Navigation Toggle ────────────────────────────────────────────

  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';

      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navMenu.classList.toggle('is-open', !isOpen);

      if (!isOpen) {
        // Focus first menu item when opening
        const firstLink = navMenu.querySelector('a');
        if (firstLink) {
          firstLink.focus();
        }
        // Prevent body scroll when menu is open
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
        document.body.style.overflow = '';
        navToggle.focus();
      }
    });

    // Focus trap within nav when open
    navMenu.addEventListener('keydown', function(e) {
      if (e.key !== 'Tab') return;

      const focusableElements = navMenu.querySelectorAll('a[href], button');
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    });

    // Close when clicking outside
    document.addEventListener('click', function(e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  }

  // ─── Smooth Scroll ───────────────────────────────────────────────────────

  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Update focus for accessibility
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus({ preventScroll: true });
      }
    });
  });

  // ─── Staggered entrance animations ───────────────────────────────────────

  function initEntranceAnimations() {
    const cards = document.querySelectorAll('.feature-card, .client-card, .download-card');

    if (typeof IntersectionObserver === 'undefined') {
      // Fallback for older browsers - just show all
      cards.forEach(function(card) {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      });
      return;
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      cards.forEach(function(card) {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      });
      return;
    }

    // Set initial state
    cards.forEach(function(card) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Create observer
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe each card with staggered delay
    cards.forEach(function(card, index) {
      card.style.transitionDelay = (index * 0.1) + 's';
      observer.observe(card);
    });
  }

  // ─── Header scroll effect ─────────────────────────────────────────────────

  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 40px rgba(155, 77, 202, 0.15)';
      } else {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 40px rgba(155, 77, 202, 0.08)';
      }
    }, { passive: true });
  }

  // ─── Initialize ────────────────────────────────────────────────────────────

  document.addEventListener('DOMContentLoaded', function() {
    initEntranceAnimations();
    initHeaderScroll();
  });

  // ─── Expose public API (if needed) ─────────────────────────────────────────

  window.phlixVariant05Retro = {
    initEntranceAnimations: initEntranceAnimations,
    initHeaderScroll: initHeaderScroll
  };

})();
