/**
 * main.js — Bamboo Sanctuary
 * Vanilla JS: nav toggle, focus-trap, scroll reveals, easter eggs, seasonal activation
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  /* ── Reduced motion preference ──────────────────────────────────────── */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Mobile nav toggle ──────────────────────────────────────────────── */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    function openNav() {
      navMenu.classList.add('is-open');
      navToggle.setAttribute('aria-expanded', 'true');
      navToggle.setAttribute('aria-label', 'Close navigation');
      trapFocus(navMenu);
    }

    function closeNav() {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Toggle navigation');
      navToggle.focus();
    }

    navToggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.contains('is-open');
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        closeNav();
      }
    });

    document.addEventListener('click', function (e) {
      if (
        navMenu.classList.contains('is-open') &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        closeNav();
      }
    });
  }

  /* ── Focus trap for open mobile nav ─────────────────────────────────── */
  function trapFocus(el) {
    const focusable = el.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    el.addEventListener('keydown', function trap(e) {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    first.focus();
  }

  /* ── Scroll reveals — slow bamboo-sway timing ───────────────────────── */
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealEls = document.querySelectorAll(
      '.feature-card, .client-card, .download-card, .faq-item, .feature-detail',
    );

    if (revealEls.length) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
      );

      revealEls.forEach(function (el) {
        el.classList.add('reveal');
        observer.observe(el);
      });
    }
  }

  /* ── Seasonal activation (kit.seasonal_activation) ──────────────────── */
  (function seasonalActivation() {
    const now = new Date();
    const month = now.getMonth() + 1; // 1-12
    const date = now.getDate(); // 1-31

    let season = null;

    // First Snow: Dec 1 – Feb 28 (months 12, 1, 2)
    if (month === 12 || (month >= 1 && month <= 2)) {
      season = 'first-snow';
    }
    // Plum Blossom: Mar 1 – Apr 15 (month 3, or month 4 with date ≤ 15)
    else if (month === 3 || (month === 4 && date <= 15)) {
      season = 'plum-blossom';
    }
    // Deep Summer: Jul 1 – Aug 31 (months 7, 8)
    else if (month >= 7 && month <= 8) {
      season = 'deep-summer';
    }
    // Autumn Moon: Sep 15 – Nov 30 (month 9 with date ≥ 15, or months 10, 11)
    else if ((month === 9 && date >= 15) || month === 10 || month === 11) {
      season = 'autumn-moon';
    }

    if (season) {
      document.documentElement.dataset.season = season;
    }
  })();

  /* ── Easter egg: logo-clicks:5 → celadon leaf ────────────────────────── */
  (function logoClickEasterEgg() {
    const logo = document.querySelector('.nav-logo');
    if (!logo) return;

    let clickCount = 0;
    let resetTimer = null;

    logo.addEventListener('click', function (e) {
      // Disabled in inputs / textareas / contenteditable
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;

      clickCount++;

      if (resetTimer) clearTimeout(resetTimer);
      resetTimer = setTimeout(function () {
        clickCount = 0;
      }, 2000);

      if (clickCount >= 5) {
        clickCount = 0;
        if (resetTimer) clearTimeout(resetTimer);

        var leaf = document.createElement('div');
        leaf.className = 'easter-leaf';
        leaf.setAttribute('aria-hidden', 'true');
        leaf.innerHTML =
          '<svg viewBox="0 0 28 40" xmlns="http://www.w3.org/2000/svg">' +
          '<path d="M14 38 Q14 20 6 10 Q2 4 8 2 Q14 0 14 10 Q14 0 20 2 Q26 4 22 10 Q14 20 14 38Z" fill="#8FAF9F" opacity="0.9"/>' +
          '<path d="M14 38 L14 14" stroke="#7A9E89" stroke-width="1.5" fill="none"/>' +
          '</svg>';
        document.body.appendChild(leaf);

        setTimeout(function () {
          if (leaf.parentNode) leaf.parentNode.removeChild(leaf);
        }, 6200);
      }
    });
  })();

  /* ── Easter egg: typed-word:breathe → breathe-mode ──────────────────── */
  (function typedWordBreathe() {
    var typed = '';
    var timer = null;
    var isActive = false;

    function enterBreatheMode() {
      if (isActive) return;
      isActive = true;
      document.documentElement.classList.add('breathe-mode');
      setTimeout(function () {
        document.documentElement.classList.remove('breathe-mode');
        isActive = false;
      }, 5000);
    }

    document.addEventListener('keydown', function (e) {
      // Esc exits breathe-mode early
      if (e.key === 'Escape' && isActive) {
        document.documentElement.classList.remove('breathe-mode');
        isActive = false;
        typed = '';
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        return;
      }

      // Don't intercept keys in inputs / textareas
      var tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;

      // Only letter keys a-z
      if (e.key.length === 1 && /[a-z]/.test(e.key)) {
        typed += e.key;
        if (typed.length > 7) typed = typed.slice(-7);

        if (typed.indexOf('breathe') !== -1) {
          typed = '';
          enterBreatheMode();
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }
          return;
        }

        if (timer) clearTimeout(timer);
        timer = setTimeout(function () {
          typed = '';
        }, 2000);
      }
    });
  })();

  document.documentElement.classList.add('js-enabled');
})();
