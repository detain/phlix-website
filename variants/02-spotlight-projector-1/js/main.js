/**
 * main.js - Spotlight Projector V1 JavaScript
 * Classic Cinematic theme with spotlight effects
 */

(function () {
  'use strict';

  // Mobile menu toggle
  function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');

    if (!toggle || !nav) return;

    let focusableNavLinks = [];

    function updateFocusableLinks() {
      focusableNavLinks = Array.from(nav.querySelectorAll('a'));
    }

    toggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen);

      if (isOpen) {
        updateFocusableLinks();
        const firstLink = focusableNavLinks[0];
        if (firstLink) firstLink.focus();
      }
    });

    // Full focus trap - prevent focus from escaping mobile nav
    nav.addEventListener('keydown', function (e) {
      if (!nav.classList.contains('is-open')) return;

      if (e.key === 'Tab') {
        const firstLink = focusableNavLinks[0];
        const lastLink = focusableNavLinks[focusableNavLinks.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstLink) {
            e.preventDefault();
            lastLink.focus();
          }
        } else {
          if (document.activeElement === lastLink) {
            e.preventDefault();
            firstLink.focus();
          }
        }
      }
    });

    // Close on escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  // FAQ accordion
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(function (item) {
      const question = item.querySelector('.faq-question');

      if (!question) return;

      question.addEventListener('click', function () {
        const isOpen = item.classList.toggle('is-open');
        question.setAttribute('aria-expanded', isOpen);
      });

      // Keyboard support
      question.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          question.click();
        }
      });
    });
  }

  // Spotlight header animation enhancement
  function initSpotlightEffect() {
    const header = document.querySelector('.site-header');

    if (!header) return;

    // Add subtle parallax to spotlight on scroll
    let ticking = false;

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          const scrolled = window.pageYOffset;
          header.style.setProperty('--spotlight-offset', scrolled * 0.3 + 'px');
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // Smooth scroll for anchor links
  function initSmoothScroll() {
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

          // Update focus for accessibility
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }
      });
    });
  }

  // Initialize all components
  function init() {
    initMobileMenu();
    initFaqAccordion();
    initSpotlightEffect();
    initSmoothScroll();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
