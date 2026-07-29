/**
 * @copyright (c) 2026 Phlix
 * @author Phlix Team
 * @license MPL-2.0
 */

(function () {
  'use strict';

  // ===== MOBILE NAVIGATION =====
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navMenu.classList.toggle('is-open', !isOpen);
      document.body.style.overflow = !isOpen ? 'hidden' : '';

      // Trap focus in mobile menu
      if (!isOpen) {
        const firstLink = navMenu.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
        document.body.style.overflow = '';
        navToggle.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });

    // Close on focus trap (Tab)
    navMenu.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;

      const focusable = navMenu.querySelectorAll('a[href], button');
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

  // ===== REDUCED MOTION =====
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function handleReducedMotion() {
    document.documentElement.classList.toggle('reduced-motion', prefersReducedMotion.matches);
  }

  handleReducedMotion();
  prefersReducedMotion.addEventListener('change', handleReducedMotion);

  // ===== SCROLL REVEALS =====
  if (!prefersReducedMotion.matches) {
    const revealElements = document.querySelectorAll(
      '.feature-card, .client-card, .download-card, .feature-detail, .faq-list details'
    );

    if ('IntersectionObserver' in window && revealElements.length > 0) {
      const revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-fade-in-up');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );

      revealElements.forEach(function (el, index) {
        el.style.opacity = '0';
        el.style.animationDelay = (index % 4) * 100 + 'ms';
        revealObserver.observe(el);
      });
    }
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.length <= 1) return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
          block: 'start'
        });

        // Update URL without jumping
        history.pushState(null, '', targetId);
      }
    });
  });

  // ===== FAQ ACCORDION =====
  const faqDetails = document.querySelectorAll('.faq-list details');
  faqDetails.forEach(function (details) {
    details.addEventListener('toggle', function () {
      if (details.open && !prefersReducedMotion.matches) {
        const answer = details.querySelector('.answer');
        if (answer) {
          answer.style.animation = 'fade-in-up 300ms ease-out';
        }
      }
    });
  });

  // ===== COPY CODE BUTTONS =====
  const codeBlocks = document.querySelectorAll('.code-block');
  if (codeBlocks.length > 0) {
    codeBlocks.forEach(function (block) {
      const button = document.createElement('button');
      button.className = 'btn btn--sm btn--ghost code-copy-btn';
      button.textContent = 'Copy';
      button.setAttribute('aria-label', 'Copy code to clipboard');

      button.addEventListener('click', function () {
        const code = block.querySelector('code');
        if (code) {
          navigator.clipboard.writeText(code.textContent || '').then(function () {
            button.textContent = 'Copied!';
            setTimeout(function () {
              button.textContent = 'Copy';
            }, 2000);
          }).catch(function () {
            button.textContent = 'Failed';
            setTimeout(function () {
              button.textContent = 'Copy';
            }, 2000);
          });
        }
      });

      block.style.position = 'relative';
      block.appendChild(button);
    });
  }

  // ===== ACTIVE NAV LINK =====
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-menu a');

  navLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPath ||
        (currentPath === '' && href === 'index.html') ||
        (currentPath === 'index.html' && href === 'index.html')) {
      link.setAttribute('aria-current', 'page');
    }
  });

  // ===== POLYFILL: dialog element ===== //
  if (!('showModal' in document.createElement('dialog'))) {
    // Fallback handled via CSS — no JS needed
  }

})();
