/**
 * main.js — Retro Film Reel V1 (Classic Diner)
 * Vanilla JS, no frameworks, no bundlers
 */

(function () {
  'use strict';

  /**
   * Mobile Menu Toggle
   */
  function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.main-nav__list');

    if (!toggle || !navList) return;

    toggle.addEventListener('click', function () {
      const isOpen = navList.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking a link
    navList.querySelectorAll('.main-nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        navList.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu on escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navList.classList.contains('is-open')) {
        navList.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /**
   * FAQ Accordion
   */
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    if (!faqItems.length) return;

    faqItems.forEach(function (item) {
      const question = item.querySelector('.faq-item__question');
      const answer = item.querySelector('.faq-item__answer');

      if (!question || !answer) return;

      question.addEventListener('click', function () {
        const isOpen = item.classList.toggle('is-open');
        question.setAttribute('aria-expanded', isOpen);
        answer.setAttribute('hidden', !isOpen);
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

  /**
   * Smooth scroll for anchor links
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /**
   * Active navigation highlighting
   */
  function initActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-nav__link');

    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      if (!href) return;

      // Check if current path matches href (exact or prefix for index pages)
      const isCurrent =
        href === currentPath ||
        (href === '/index.html' && (currentPath === '/' || currentPath === '/index.html')) ||
        (href !== '/index.html' && currentPath.startsWith(href.replace(/\.html$/, '')));

      if (isCurrent) {
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /**
   * Animate elements on scroll (Intersection Observer)
   */
  function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const animatedElements = document.querySelectorAll(
      '.feature-card, .client-card, .download-card, .plugin-card, .ecosystem-card',
    );

    if (!animatedElements.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      },
    );

    // Set initial state
    animatedElements.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }

  /**
   * Logo animation enhancement (reduced motion safe)
   */
  function initLogoAnimation() {
    const logoText = document.querySelector('.site-logo__text');
    if (!logoText) return;

    // The CSS handles the animation, we just ensure it's properly initialized
    // and respects reduced motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      logoText.style.animation = 'none';
    }
  }

  /**
   * Initialize all functionality when DOM is ready
   */
  function init() {
    initMobileMenu();
    initFaqAccordion();
    initSmoothScroll();
    initActiveNav();
    initScrollAnimations();
    initLogoAnimation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
