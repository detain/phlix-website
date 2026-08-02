/**
 * @package premiere-lens
 * @description Camera lens optics brand kit — main JavaScript
 * @filesource js/main.js
 * @copyright 2026 Phlix
 */

(function () {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // === Mobile Navigation Toggle ===
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    let isOpen = false;

    function toggleNav() {
      isOpen = !isOpen;
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navMenu.classList.toggle('nav-menu--closed', !isOpen);

      if (isOpen) {
        navMenu.removeAttribute('hidden');
        // Focus first menu item when opening
        const firstLink = navMenu.querySelector('.nav-link');
        if (firstLink) firstLink.focus();
      }
    }

    function closeNav() {
      if (isOpen) {
        isOpen = false;
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.add('nav-menu--closed');
        navToggle.focus();
      }
    }

    navToggle.addEventListener('click', toggleNav);

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) {
        closeNav();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (isOpen && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        closeNav();
      }
    });

    // Close on focus leaving menu
    navMenu.addEventListener('focusout', function (e) {
      if (isOpen && !navMenu.contains(e.relatedTarget)) {
        closeNav();
      }
    });
  }

  // === Scroll Reveal Animation ===
  if (!prefersReducedMotion) {
    const revealElements = document.querySelectorAll(
      '.feature-card, .feature-detail, .client-card, .download-card, .hub-feature',
    );

    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
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
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition =
          'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        revealObserver.observe(el);
      });

      // Add CSS for revealed state
      const style = document.createElement('style');
      style.textContent = `
        .is-revealed {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `;
      document.head.appendChild(style);
    }
  }

  // === Code Block Copy Button ===
  const copyButtons = document.querySelectorAll('.code-block__copy');

  copyButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const codeBlock = button.closest('.code-block');
      const code = codeBlock.querySelector('code');

      if (code) {
        navigator.clipboard.writeText(code.textContent).then(
          function () {
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            button.setAttribute('aria-label', 'Copied to clipboard');

            setTimeout(function () {
              button.textContent = originalText;
              button.setAttribute('aria-label', 'Copy to clipboard');
            }, 2000);
          },
          function () {
            button.textContent = 'Failed';
            setTimeout(function () {
              button.textContent = 'Copy';
            }, 2000);
          },
        );
      }
    });
  });

  // === FAQ Accordion Accessibility ===
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-question');

    if (question) {
      question.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          item.open = !item.open;
        }
      });
    }
  });

  // === Smooth Scroll for Anchor Links ===
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');

      if (targetId === '#') return;

      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start',
        });

        // Update URL without jumping
        history.pushState(null, '', targetId);
      }
    });
  });
})();
