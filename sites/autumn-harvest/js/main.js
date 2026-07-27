/**
 * main.js — Autumn Harvest
 * Kit: autumn-harvest v1.0
 * Vanilla JS — no dependencies, defer-loaded
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  /* ─── Mobile nav toggle ─────────────────────────────────────────────── */
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.nav-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* ─── Reduced motion — attach change listener, not just read-once ─────── */
  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function handleMotion() {
    document.documentElement.classList.toggle('motion-reduced', motionQuery.matches);
  }

  motionQuery.addEventListener('change', handleMotion);
  handleMotion(); // run once at load

  /* ─── Scroll reveals ─────────────────────────────────────────────────── */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0 && !motionQuery.matches) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );
    reveals.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Show everything immediately if reduced motion or no reveals
    reveals.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ─── Mabel mascot companion ─────────────────────────────────────────── */
  var mabelEl = document.querySelector('.mabel');
  var mabelDismiss = document.querySelector('.mabel__dismiss');
  var mabelBubble = document.querySelector('.mabel__bubble');

  // Only show Mabel on designated pages
  var mabelPages = ['index.html', 'features.html', 'download.html', 'about.html'];
  var pageName = window.location.pathname.split('/').pop() || 'index.html';
  if (!mabelPages.includes(pageName)) {
    if (mabelEl) mabelEl.classList.add('mabel--hidden');
  }

  // Restore dismissed state
  if (mabelEl && localStorage.getItem('mabel-dismissed') === 'true') {
    mabelEl.classList.add('mabel--hidden');
  }

  // Dismiss button — persist across sessions via localStorage
  if (mabelDismiss && mabelEl) {
    mabelDismiss.addEventListener('click', function () {
      mabelEl.classList.add('mabel--hidden');
      localStorage.setItem('mabel-dismissed', 'true');
    });
  }

  /* ─── Easter eggs ────────────────────────────────────────────────────── */
  var logoClickCount = 0;
  var logoEl = document.querySelector('.nav-logo, .hero-logo');

  // Logo clicks: 5 clicks → Mabel does a leaf-spiral dance
  if (logoEl) {
    logoEl.addEventListener('click', function (e) {
      // Don't interfere with nav — only count on repeated fast clicks
      logoClickCount++;
      if (logoClickCount >= 5) {
        logoClickCount = 0;
        triggerMabelDance();
        e.preventDefault();
      }
      // Reset counter after 1 second of inactivity
      setTimeout(function () {
        logoClickCount = 0;
      }, 1000);
    });
  }

  // Typed-word easter egg: type "cider" anywhere on page
  var typedBuffer = '';
  var ciderTarget = 'cider';
  document.addEventListener('keydown', function (e) {
    // Don't trigger while in an input/textarea/contenteditable
    var tag = e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;

    var char = e.key.toLowerCase();
    if (char.length === 1) {
      typedBuffer += char;
      if (typedBuffer.length > ciderTarget.length) {
        typedBuffer = typedBuffer.slice(-ciderTarget.length);
      }
      if (typedBuffer === ciderTarget) {
        triggerCiderEgg();
        typedBuffer = '';
      }
    }
    if (e.key === 'Escape') {
      typedBuffer = '';
    }
  });

  // Time-of-day easter egg: 18:00–22:00 local time
  function checkTimeEgg() {
    var hour = new Date().getHours();
    if (hour >= 18 && hour < 22) {
      triggerEveningEgg();
    }
  }
  checkTimeEgg();

  /* ─── Easter egg triggers ─────────────────────────────────────────────── */
  function triggerMabelDance() {
    var figure = document.querySelector('.mabel__figure');
    if (!figure) return;
    figure.style.animation = 'mabel-dance 1s ease-in-out';
    figure.setAttribute('data-dancing', 'true');
    setTimeout(function () {
      figure.style.animation = '';
      figure.removeAttribute('data-dancing');
    }, 1000);
  }

  function triggerCiderEgg() {
    var bubble = document.querySelector('.mabel__bubble');
    if (bubble) {
      bubble.textContent = 'Ah, a fellow cider connoisseur. The season is perfect.';
    }
  }

  function triggerEveningEgg() {
    var bubble = document.querySelector('.mabel__bubble');
    if (bubble && !document.hidden) {
      bubble.textContent = "Good evening. The fire's already lit.";
    }
  }

  /* ─── Mabel dance keyframes (injected for animation) ─────────────────── */
  var styleEl = document.createElement('style');
  styleEl.textContent = [
    '@keyframes mabel-dance {',
    '  0%   { transform: rotate(0deg) scale(1); }',
    '  25%  { transform: rotate(15deg) scale(1.1); }',
    '  50%  { transform: rotate(-15deg) scale(1.1); }',
    '  75%  { transform: rotate(10deg) scale(1.05); }',
    '  100% { transform: rotate(0deg) scale(1); }',
    '}',
  ].join('\n');
  document.head.appendChild(styleEl);
})();
