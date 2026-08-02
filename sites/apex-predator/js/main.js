/* ============================================================================
   APEX PREDATOR — main.js
   Mobile nav toggle, reduced motion, scroll reveals
   Vanilla, dependency-free, defer-loaded
   ============================================================================ */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────────────────────────────────
     Reduced Motion Check
     ───────────────────────────────────────────────────────────────────────── */

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─────────────────────────────────────────────────────────────────────────
     Mobile Navigation Toggle
     ───────────────────────────────────────────────────────────────────────── */

  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (navToggle && mainNav) {
    const navMenu = mainNav.querySelector('ul');

    // Toggle navigation open/closed
    function toggleNav(isOpen) {
      const expanded =
        isOpen !== undefined ? isOpen : navToggle.getAttribute('aria-expanded') !== 'true';
      navToggle.setAttribute('aria-expanded', String(expanded));
      mainNav.classList.toggle('is-open', expanded);
      document.body.style.overflow = expanded ? 'hidden' : '';

      if (expanded) {
        // Focus first nav link when opening
        const firstLink = mainNav.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    }

    navToggle.addEventListener('click', () => toggleNav());

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
        toggleNav(false);
        navToggle.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (
        mainNav.classList.contains('is-open') &&
        !mainNav.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        toggleNav(false);
      }
    });

    // Close on resize to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768 && mainNav.classList.contains('is-open')) {
        toggleNav(false);
        document.body.style.overflow = '';
      }
    });

    // Trap focus inside mobile nav when open
    mainNav.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;

      const focusable = mainNav.querySelectorAll('a[href], button:not([disabled])');
      const firstFocusable = focusable[0];
      const lastFocusable = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    });
  }

  /* ─────────────────────────────────────────────────────────────────────────
     Scroll Reveal — Intersection Observer fade-ins
     ───────────────────────────────────────────────────────────────────────── */

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length > 0) {
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
          rootMargin: '0px 0px -60px 0px',
          threshold: 0.1,
        },
      );

      revealElements.forEach(function (el) {
        revealObserver.observe(el);
      });
    }
  } else {
    // Fallback: just show everything
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ─────────────────────────────────────────────────────────────────────────
     Copy Code Blocks — Click to copy install command
     ───────────────────────────────────────────────────────────────────────── */

  document.querySelectorAll('.code-block').forEach(function (block) {
    const copyBtn = document.createElement('button');
    copyBtn.className = 'code-copy-btn';
    copyBtn.setAttribute('aria-label', 'Copy to clipboard');
    copyBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="9" y="9" width="13" height="13" rx="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
    `;

    // Style the copy button
    copyBtn.style.cssText = `
      position: absolute;
      top: 12px;
      right: 12px;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-surface-alt);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-sm);
      color: var(--color-text);
      cursor: pointer;
      opacity: 0.6;
      transition: opacity 0.2s ease, background-color 0.2s ease;
    `;

    copyBtn.addEventListener('mouseenter', function () {
      copyBtn.style.opacity = '1';
      copyBtn.style.background = 'var(--color-primary)';
    });

    copyBtn.addEventListener('mouseleave', function () {
      copyBtn.style.opacity = '0.6';
      copyBtn.style.background = 'var(--color-surface-alt)';
    });

    copyBtn.addEventListener('click', function () {
      const code = block.querySelector('code');
      if (!code) return;

      const text = code.textContent.trim();
      navigator.clipboard.writeText(text).then(
        function () {
          copyBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          `;
          copyBtn.style.background = 'var(--color-success)';
          setTimeout(function () {
            copyBtn.innerHTML = `
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="9" y="9" width="13" height="13" rx="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            `;
            copyBtn.style.background = 'var(--color-surface-alt)';
          }, 2000);
        },
        function () {
          // Clipboard failed — silently ignore
        },
      );
    });

    // Position block as relative for absolute positioning of button
    block.style.position = 'relative';
    block.appendChild(copyBtn);
  });

  /* ─────────────────────────────────────────────────────────────────────────
     Smooth Scroll for Anchor Links
     ───────────────────────────────────────────────────────────────────────── */

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
