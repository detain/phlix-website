/**
 * main.js — Silver Screen Brand Kit
 * Vanilla JS, no dependencies, defer-loaded
 */

/* @copyright 2026 Phlix. MIT / MPL-2.0 license per component. */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // Mobile Nav Toggle
  // -------------------------------------------------------------------------
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Toggle navigation');
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Toggle navigation');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Toggle navigation');
        navToggle.focus();
      }
    });
  }

  // -------------------------------------------------------------------------
  // Reduced Motion
  // -------------------------------------------------------------------------
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function handleReducedMotion() {
    if (prefersReducedMotion.matches) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  }

  handleReducedMotion();
  prefersReducedMotion.addEventListener('change', handleReducedMotion);

  // -------------------------------------------------------------------------
  // Scroll Reveal (Intersection Observer)
  // -------------------------------------------------------------------------
  function initScrollReveal() {
    if (prefersReducedMotion.matches) return;
    if (!('IntersectionObserver' in window)) return;

    var revealElements = document.querySelectorAll(
      '.feature-card, .feature-detail, .client-card, .download-card, .faq-item'
    );

    if (revealElements.length === 0) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
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
      el.classList.add('reveal');
      observer.observe(el);
    });
  }

  // -------------------------------------------------------------------------
  // Code Block Copy Button
  // -------------------------------------------------------------------------
  function initCodeCopy() {
    var codeBlocks = document.querySelectorAll('.code-block');

    codeBlocks.forEach(function (block) {
      var button = document.createElement('button');
      button.className = 'copy-btn';
      button.textContent = 'Copy';
      button.setAttribute('aria-label', 'Copy code to clipboard');

      button.addEventListener('click', function () {
        var pre = block.querySelector('pre');
        if (!pre) return;

        var code = pre.textContent || '';

        navigator.clipboard.writeText(code).then(
          function () {
            button.textContent = 'Copied!';
            setTimeout(function () {
              button.textContent = 'Copy';
            }, 2000);
          },
          function () {
            button.textContent = 'Failed';
            setTimeout(function () {
              button.textContent = 'Copy';
            }, 2000);
          }
        );
      });

      block.appendChild(button);
    });
  }

  // -------------------------------------------------------------------------
  // Art Deco Line Animation (hero decoration)
  // -------------------------------------------------------------------------
  function initHeroAnimation() {
    if (prefersReducedMotion.matches) return;

    var hero = document.querySelector('.hero');
    if (!hero) return;

    var lines = hero.querySelectorAll('.hero-line');
    if (lines.length === 0) return;

    lines.forEach(function (line, index) {
      line.style.animationDelay = (index * 150) + 'ms';
      line.classList.add('animate');
    });
  }

  // -------------------------------------------------------------------------
  // Initialize
  // -------------------------------------------------------------------------
  function init() {
    initScrollReveal();
    initCodeCopy();
    initHeroAnimation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
