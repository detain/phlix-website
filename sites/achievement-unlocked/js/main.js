/**
 * @copyright 2025 Phlix — Achievement Unlocked Brand Kit
 * @license MPL-2.0 (phlix-server/phlix-hub) / MIT (clients/plugins/shared)
 */

(function () {
  'use strict';

  // ─── Mobile Navigation Toggle ─────────────────────────────────────────────
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
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
  }

  // ─── Reduced Motion ─────────────────────────────────────────────────────
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // ─── Scroll Reveal ───────────────────────────────────────────────────────
  function initScrollReveal() {
    if (prefersReducedMotion.matches) {
      // Show all elements immediately when reduced motion is preferred
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
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
      revealObserver.observe(el);
    });
  }

  // ─── FAQ Accordion ────────────────────────────────────────────────────────
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function (item) {
      const summary = item.querySelector('summary');
      if (summary) {
        summary.addEventListener('click', function (e) {
          // Close other open items
          faqItems.forEach(function (other) {
            if (other !== item && other.hasAttribute('open')) {
              other.removeAttribute('open');
            }
          });
        });
      }
    });
  }

  // ─── Copy Code Blocks ────────────────────────────────────────────────────
  function initCodeCopy() {
    const codeBlocks = document.querySelectorAll('.code-block');
    codeBlocks.forEach(function (block) {
      const button = document.createElement('button');
      button.className = 'btn btn-secondary code-copy-btn';
      button.textContent = 'Copy';
      button.setAttribute('aria-label', 'Copy code to clipboard');

      block.querySelector('pre').appendChild(button);

      button.addEventListener('click', function () {
        const code = block.querySelector('code').textContent;
        navigator.clipboard
          .writeText(code)
          .then(function () {
            button.textContent = 'Copied!';
            setTimeout(function () {
              button.textContent = 'Copy';
            }, 2000);
          })
          .catch(function () {
            button.textContent = 'Failed';
            setTimeout(function () {
              button.textContent = 'Copy';
            }, 2000);
          });
      });
    });
  }

  // ─── Smooth Scroll for Anchor Links ─────────────────────────────────────
  function initSmoothScroll() {
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
          // Update focus for accessibility
          target.setAttribute('tabindex', '-1');
          target.focus();
        }
      });
    });
  }

  // ─── Initialize Everything ───────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    initScrollReveal();
    initFaqAccordion();
    initSmoothScroll();
  });
})();
