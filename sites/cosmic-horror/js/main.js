/**
 * ============================================================================
 * main.js — Cosmic Horror Brand Kit
 * Nav toggle, reduced motion, scroll reveals, easter eggs, mascot, seasonal
 *
 * Experience fields: navigation_model, scroll_experience, easter_eggs,
 * mascot.behavior, seasonal_activation
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * ============================================================================
 */

(function () {
  'use strict';

  /* ─── Reduced Motion ──────────────────────────────────────────────────── */
  /**
   * Trap 2: "reduce motion" toggle must switch off `transition`, not only
   * `animation`. Turning off only `animation` leaves things still moving.
   * Attach a change listener — reading once at load never sees setting changes.
   */
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function handleMotionPreference(e) {
    const root = document.documentElement;
    if (e.matches) {
      root.classList.add('reduce-motion');
      root.style.setProperty('--transition-duration', '0.01ms');
      root.style.setProperty('--animation-duration', '0.01ms');
    } else {
      root.classList.remove('reduce-motion');
      root.style.removeProperty('--transition-duration');
      root.style.removeProperty('--animation-duration');
    }
  }

  motionQuery.addEventListener('change', handleMotionPreference);
  handleMotionPreference(motionQuery); // initialise on load

  /* ─── Nav Toggle ──────────────────────────────────────────────────────── */
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

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* ─── Scroll Reveals ──────────────────────────────────────────────────── */
  /**
   * IntersectionObserver fade-ins — feature-detect and no-op without it.
   * Runs once, disconnects after all revealed.
   */
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    document.querySelectorAll('.reveal').forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show all immediately
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ─── Easter Egg 1: Typed Word — "colour" ─────────────────────────────── */
  /**
   * Trap 19.8: typed-word egg must be disabled while focus is in an
   * input/textarea/contenteditable, must never preventDefault, and must exit on Esc.
   */
  (function () {
    const TARGET_WORD = 'colour';
    let typed = '';
    let isActive = false;
    let container = null;

    function createContainer() {
      container = document.createElement('div');
      container.className = 'typed-word-container';
      container.setAttribute('aria-hidden', 'true');
      document.body.appendChild(container);
    }

    function showWord() {
      if (!container) createContainer();
      container.classList.add('is-visible');
      container.textContent = TARGET_WORD;
      isActive = true;

      // Auto-hide after 2.5s
      setTimeout(hideWord, 2500);
    }

    function hideWord() {
      if (container) {
        container.classList.remove('is-visible');
      }
      isActive = false;
      typed = '';
    }

    function isInputFocused() {
      const tag = document.activeElement.tagName;
      return (
        tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement.contentEditable === 'true'
      );
    }

    document.addEventListener('keydown', function (e) {
      // Never preventDefault — Trap 19.8
      if (isInputFocused()) return;
      if (e.key === 'Escape') {
        hideWord();
        return;
      }
      if (e.key.length !== 1) return; // only printable characters

      typed += e.key.toLowerCase();

      // Keep only the last N chars where N = target word length
      if (typed.length > TARGET_WORD.length) {
        typed = typed.slice(-TARGET_WORD.length);
      }

      if (typed === TARGET_WORD) {
        showWord();
      }
    });
  })();

  /* ─── Easter Egg 2: Logo Clicks — 7 clicks ────────────────────────────── */
  (function () {
    const TARGET_CLICKS = 7;
    let clickCount = 0;
    let overlay = null;

    const logoLink = document.querySelector('.nav-logo');
    if (!logoLink) return;

    function createOverlay() {
      overlay = document.createElement('div');
      overlay.className = 'easter-overlay';
      overlay.setAttribute('aria-hidden', 'true');
      overlay.innerHTML =
        "<p class=\"easter-message\">Ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn.</p>";
      document.body.appendChild(overlay);
    }

    function showOverlay() {
      if (!overlay) createOverlay();
      overlay.classList.add('is-active');
      setTimeout(hideOverlay, 4000);
    }

    function hideOverlay() {
      if (overlay) {
        overlay.classList.remove('is-active');
      }
    }

    logoLink.addEventListener('click', function (e) {
      // Let the link navigate — we just count
      clickCount++;
      if (clickCount >= TARGET_CLICKS) {
        clickCount = 0;
        showOverlay();
      }
    });
  })();

  /* ─── Mascot Companion — Nyarla ───────────────────────────────────────── */
  /**
   * Placement: bottom-right on desktop, top-right on mobile.
   * Idle animation disabled under reduced-motion.
   * Dismiss persisted via localStorage.
   * Tips shown on hover, keyed by section.
   */
  (function () {
    const PAGES_WITH_MASCOT = ['index', 'features', 'download', 'about'];
    const STORAGE_KEY = 'cosmic-horror-nyarla-dismissed';

    // Check if current page should show mascot
    const bodyClasses = document.body.className || '';
    const pageId = document.querySelector('main')?.id || '';

    // Get page identifier for tips (use body class or URL)
    const path = window.location.pathname;
    const pageName = path.includes('features')
      ? 'features'
      : path.includes('download')
        ? 'download'
        : path.includes('about')
          ? 'about'
          : 'home';

    // Check if dismissed
    if (localStorage.getItem(STORAGE_KEY) === 'true') return;

    // Build mascot DOM
    const mascotHTML = `
      <div class="mascot-companion" aria-hidden="true">
        <div class="mascot-figure" id="nyarla">
          <svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Eldritch silhouette -->
            <ellipse cx="36" cy="56" rx="20" ry="8" fill="rgba(0,204,102,0.08)"/>
            <path d="M36 52 C24 52 16 40 16 28 C16 16 24 8 36 8 C48 8 56 16 56 28 C56 40 48 52 36 52Z"
                  fill="#080014" stroke="#1A0A2E" stroke-width="1"/>
            <!-- Internal glow -->
            <path d="M36 48 C27 48 21 39 21 30 C21 21 27 14 36 14 C45 14 51 21 51 30 C51 39 45 48 36 48Z"
                  fill="rgba(0,204,102,0.06)"/>
            <!-- Eye suggestion -->
            <ellipse cx="36" cy="28" rx="4" ry="3" fill="rgba(0,204,102,0.5)"/>
            <!-- Tentacle hints at periphery -->
            <path d="M18 36 Q12 32 14 24" stroke="#1A0A2E" stroke-width="2" fill="none" stroke-linecap="round"/>
            <path d="M54 36 Q60 32 58 24" stroke="#1A0A2E" stroke-width="2" fill="none" stroke-linecap="round"/>
          </svg>
          <div class="mascot-tip" id="nyarla-tip">The archive awaits your descent.</div>
          <button class="mascot-dismiss" id="nyarla-dismiss" aria-label="Dismiss Nyarla">×</button>
        </div>
      </div>
    `;

    // Inject before </body>
    document.body.insertAdjacentHTML('beforeend', mascotHTML);

    const mascotFigure = document.getElementById('nyarla');
    const tip = document.getElementById('nyarla-tip');
    const dismissBtn = document.getElementById('nyarla-dismiss');

    if (!mascotFigure) return;

    // Idle animation — only without reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReduced) {
      mascotFigure.style.animation = 'none';
      // Subtle pulse via JS for better control
      let idlePhase = 0;
      const idleInterval = setInterval(function () {
        if (prefersReduced) {
          clearInterval(idleInterval);
          return;
        }
        idlePhase += 0.02;
        const opacity = 0.85 + Math.sin(idlePhase) * 0.15;
        mascotFigure.querySelector('svg').style.opacity = opacity;
      }, 50);
    }

    // Dismiss
    dismissBtn.addEventListener('click', function () {
      localStorage.setItem(STORAGE_KEY, 'true');
      mascotFigure.closest('.mascot-companion').style.display = 'none';
    });
  })();

  /* ─── Seasonal Activation ─────────────────────────────────────────────── */
  /**
   * Date-gate that flips seasonal_variants override tokens.
   * Currently: "documented" mode — logs variant, no live behavior per kit.
   * If any seasonal variant is active, apply its token overrides.
   */
  (function () {
    const now = new Date();
    const month = now.getMonth(); // 0-indexed
    const day = now.getDate();

    // Variant 0: Oct 31 only (eldritch green intensifies)
    // Variant 1: Dec 24-26 (void purple deepens)
    // Variant 2: Jun 21 (summer solstice — secondary variant)
    // For "documented" mode, we just log awareness; no live token flip

    let activeVariant = null;

    if (month === 9 && day === 31) {
      activeVariant = 0; // Eldritch surge
    } else if (month === 11 && day >= 24 && day <= 26) {
      activeVariant = 1; // Void deepens
    } else if (month === 5 && day === 21) {
      activeVariant = 2; // Summer solstice
    }

    // Store for potential CSS usage
    if (activeVariant !== null) {
      document.documentElement.dataset.seasonalVariant = activeVariant;
    }
  })();

  /* ─── Hero Eyebrow Stagger ───────────────────────────────────────────── */
  // Ensure hero elements have staggered animation on load
  document
    .querySelectorAll('.hero-eyebrow, .hero-heading, .hero-sub, .hero-cta')
    .forEach(function (el, i) {
      el.style.animationDelay = i * 200 + 200 + 'ms';
    });

  /* ─── Code Block Copy Buttons ─────────────────────────────────────────── */
  document.querySelectorAll('.code-block').forEach(function (block) {
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'copy';
    btn.setAttribute('aria-label', 'Copy code');

    btn.addEventListener('click', function () {
      const code = block.querySelector('code');
      if (code) {
        navigator.clipboard.writeText(code.textContent || '').then(function () {
          btn.textContent = 'copied';
          setTimeout(function () {
            btn.textContent = 'copy';
          }, 1500);
        });
      }
    });

    block.appendChild(btn);
  });
})();
