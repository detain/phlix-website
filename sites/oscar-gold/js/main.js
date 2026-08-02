/**
 * @copyright Copyright (c) 2026 Phlix
 * @file main.js — Navigation, reduced motion, scroll reveals
 */

(function () {
  'use strict';

  // ─── Mobile Navigation Toggle ───────────────────────────────────────────────

  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  // ─── Reduced Motion Check ──────────────────────────────────────────────────

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ─── Scroll Reveal (IntersectionObserver) ──────────────────────────────────

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll('.fade-in-up');

    if (revealElements.length > 0) {
      const revealObserver = new IntersectionObserver(
        function (entries, observer) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
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
  } else if (!prefersReducedMotion) {
    // Fallback: show all elements immediately without animation
    document.querySelectorAll('.fade-in-up').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ─── Code Block Copy Button ────────────────────────────────────────────────

  document.querySelectorAll('.code-block__copy').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const codeBlock = btn.closest('.code-block');
      const code = codeBlock.querySelector('code').textContent;

      navigator.clipboard.writeText(code).then(
        function () {
          const originalText = btn.textContent;
          btn.textContent = 'Copied!';
          btn.style.background = 'var(--color-primary)';
          btn.style.color = 'var(--color-text-inverse)';

          setTimeout(function () {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.color = '';
          }, 2000);
        },
        function () {
          btn.textContent = 'Failed';
          setTimeout(function () {
            btn.textContent = 'Copy';
          }, 2000);
        },
      );
    });
  });

  // ─── FAQ Accordion (native behavior with animation) ───────────────────────

  // Using native <details>/<summary> — no JS needed for basic functionality
  // But we can add smooth animation via CSS

  if (!prefersReducedMotion) {
    document.querySelectorAll('.faq-item').forEach(function (faq) {
      faq.addEventListener('toggle', function () {
        if (faq.hasAttribute('open')) {
          const answer = faq.querySelector('.faq-item__answer');
          if (answer) {
            answer.style.animation = 'fadeInUp 300ms ease forwards';
          }
        }
      });
    });
  }

  // ─── Scroll-based Header Shadow ─────────────────────────────────────────────

  const siteHeader = document.querySelector('.site-header');

  if (siteHeader) {
    let lastScroll = 0;

    window.addEventListener(
      'scroll',
      function () {
        const currentScroll = window.scrollY;

        if (currentScroll > 10) {
          siteHeader.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
          siteHeader.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
      },
      { passive: true },
    );
  }
})();
