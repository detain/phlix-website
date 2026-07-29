/**
 * ============================================================================
 * MAIN.JS — Jungle Trek
 * Navigation, mascot, easter eggs, seasonal activation, motion control.
 * Dense rainforest expedition, canopy layers, exotic wildlife.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * ============================================================================
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     Configuration
     -------------------------------------------------------------------------- */
  const CONFIG = {
    mascotDismissKey: 'jungle-trek-mascot-dismissed',
    logoClickTarget: 5,
    typedWordTarget: 'trek',
    reducedMotionMedia: '(prefers-reduced-motion: reduce)',
  };

  /* --------------------------------------------------------------------------
     Seasonal Variants
     -------------------------------------------------------------------------- */
  const SEASONAL_VARIANTS = [
    {
      name: 'Monsoon Season',
      activeRange: { start: '06-01', end: '09-30' },
      overrides: {
        '--color-bg': '#0A1F0A',
        '--color-primary': '#1B5E20',
        '--color-highlight': '#FFD700',
      },
    },
    {
      name: 'Dry Season',
      activeRange: { start: '01-01', end: '03-31' },
      overrides: {
        '--color-secondary': '#F5DEB3',
      },
    },
    {
      name: 'Canopy Bloom',
      activeRange: { start: '04-01', end: '05-31' },
      overrides: {
        '--color-secondary': '#FF6B9D',
        '--color-tertiary': '#FFD700',
      },
    },
  ];

  /* --------------------------------------------------------------------------
     Mascot Tips by Section
     -------------------------------------------------------------------------- */
  const MASCOT_TIPS = [
    { where: 'home:#base-camp', say: 'Four trails converge. Enter the jungle — find your path.' },
    {
      where: 'home:#the-expedition',
      say: 'SyncPlay locks every device to the same frame. Precision timing, precision exploration.',
    },
    { where: 'home:#trek-now', say: "One command. You're the expedition leader now. Full throttle." },
    { where: 'about:.faq-list', say: 'Questions? Data never lies. Answers are in the field notes.' },
  ];

  /* --------------------------------------------------------------------------
     Utility: check if seasonal variant is active
     -------------------------------------------------------------------------- */
  function isSeasonalActive(variant) {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const current = `${month}-${day}`;
    const { start, end } = variant.activeRange;
    if (start <= end) {
      return current >= start && current <= end;
    }
    return current >= start || current <= end;
  }

  /* --------------------------------------------------------------------------
     Apply Seasonal Variant
     -------------------------------------------------------------------------- */
  function applySeasonalVariant() {
    const active = SEASONAL_VARIANTS.find(isSeasonalActive);
    if (!active) return;

    const root = document.documentElement;
    Object.entries(active.overrides).forEach(([prop, value]) => {
      root.style.setProperty(prop, value);
    });

    // Show seasonal banner if not home page excluded
    if (!document.body.classList.contains('home')) return;
  }

  /* --------------------------------------------------------------------------
     Mobile Navigation
     -------------------------------------------------------------------------- */
  function initNav() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    if (!toggle || !menu) return;

    function openMenu() {
      menu.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close navigation');
      trapFocus(menu);
    }

    function closeMenu() {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Toggle navigation');
    }

    toggle.addEventListener('click', function () {
      const isOpen = menu.classList.contains('is-open');
      isOpen ? closeMenu() : openMenu();
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        closeMenu();
        toggle.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        closeMenu();
      }
    });
  }

  /* --------------------------------------------------------------------------
     Focus Trap
     -------------------------------------------------------------------------- */
  function trapFocus(element) {
    const focusable = element.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    function handleTab(e) {
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
    }
    element.addEventListener('keydown', handleTab);
    first?.focus();
  }

  /* --------------------------------------------------------------------------
     Reduced Motion
     -------------------------------------------------------------------------- */
  function initReducedMotion() {
    const handlers = [];

    function attachHandler(mq) {
      function handler(e) {
        document.body.classList.toggle('reduce-motion', e.matches);
      }
      mq.addEventListener('change', handler);
      handlers.push({ mq, handler });
    }

    const mq = window.matchMedia(CONFIG.reducedMotionMedia);
    attachHandler(mq);
    document.body.classList.toggle('reduce-motion', mq.matches);
  }

  /* --------------------------------------------------------------------------
     Mascot Companion — Trek
     -------------------------------------------------------------------------- */
  function initMascot() {
    const mascot = document.querySelector('.mascot');
    if (!mascot) return;

    // Check if dismissed
    if (localStorage.getItem(CONFIG.mascotDismissKey) === 'true') {
      mascot.style.display = 'none';
      return;
    }

    const dismissBtn = mascot.querySelector('.mascot__dismiss');
    const tip = mascot.querySelector('.mascot__tip');

    // Show tip based on current section
    function showTipForSection() {
      if (!tip) return;
      const section = document.querySelector('#main-content > section');
      if (!section) return;

      const sectionId = section.id || '';
      const tipData = MASCOT_TIPS.find((t) => t.where.includes(sectionId));
      if (tipData) {
        tip.textContent = tipData.say;
        tip.classList.add('is-visible');
      }
    }

    // Dismiss handler
    if (dismissBtn) {
      dismissBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        mascot.style.display = 'none';
        localStorage.setItem(CONFIG.mascotDismissKey, 'true');
      });
    }

    // Hover behavior
    mascot.addEventListener('mouseenter', function () {
      if (tip) tip.classList.add('is-visible');
    });

    mascot.addEventListener('mouseleave', function () {
      if (tip) tip.classList.remove('is-visible');
    });

    // Check reduced motion
    const reduceMotion = window.matchMedia(CONFIG.reducedMotionMedia).matches;
    if (!reduceMotion) {
      showTipForSection();
    }
  }

  /* --------------------------------------------------------------------------
     Easter Egg 1: Logo Clicks
     -------------------------------------------------------------------------- */
  function initLogoClicks() {
    const logo = document.querySelector('.nav-logo');
    if (!logo) return;

    let clickCount = 0;

    logo.addEventListener('click', function (e) {
      // Don't count if modifier keys
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;

      // Check reduced motion
      const reduceMotion = window.matchMedia(CONFIG.reducedMotionMedia).matches;

      clickCount++;

      if (clickCount >= CONFIG.logoClickTarget) {
        clickCount = 0;
        triggerTrekFound(reduceMotion);
      }
    });
  }

  /* --------------------------------------------------------------------------
     Easter Egg 2: Typed Word "trek"
     -------------------------------------------------------------------------- */
  function initTypedWord() {
    let buffer = '';
    let timeout;
    const target = CONFIG.typedWordTarget;

    document.addEventListener('keydown', function (e) {
      // Don't trigger in inputs/textareas
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;

      // Don't prevent default
      const key = e.key.toLowerCase();

      if (key === 'escape') {
        // Clear buffer and restore cursor
        buffer = '';
        document.body.style.cursor = '';
        return;
      }

      if (key.length === 1) {
        buffer += key;

        // Keep buffer from growing infinitely
        if (buffer.length > target.length + 5) {
          buffer = buffer.slice(-target.length - 5);
        }

        // Check for target word
        if (buffer.includes(target)) {
          buffer = '';
          triggerTrekCursor();
        }

        // Clear buffer after inactivity
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          buffer = '';
        }, 1000);
      }
    });
  }

  /* --------------------------------------------------------------------------
     Trigger Trek Found Animation
     -------------------------------------------------------------------------- */
  function triggerTrekFound(reduceMotion) {
    let overlay = document.querySelector('.easter-flag');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'easter-flag';
      overlay.innerHTML = '<div class="easter-flag__readout">Hidden trail discovered</div>';
      document.body.appendChild(overlay);
    }

    overlay.classList.add('is-active');

    if (reduceMotion) {
      setTimeout(() => overlay.classList.remove('is-active'), 500);
    } else {
      setTimeout(() => overlay.classList.remove('is-active'), 3000);
    }

    // ESC to dismiss
    function dismiss(e) {
      if (e.key === 'Escape') {
        overlay.classList.remove('is-active');
        document.removeEventListener('keydown', dismiss);
      }
    }
    document.addEventListener('keydown', dismiss);
  }

  /* --------------------------------------------------------------------------
     Trigger Trek Cursor
     -------------------------------------------------------------------------- */
  function triggerTrekCursor() {
    // Check reduced motion
    const reduceMotion = window.matchMedia(CONFIG.reducedMotionMedia).matches;
    if (reduceMotion) return;

    document.body.style.cursor =
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='10' fill='%23228B22'/%3E%3Cpath d='M12 2 Q20 12 12 22 Q4 12 12 2' fill='%230D2B0D'/%3E%3C/svg%3E\") 12 12, auto";

    // Show notification
    let notification = document.querySelector('.vector-notification');
    if (!notification) {
      notification = document.createElement('div');
      notification.className = 'vector-notification';
      notification.style.cssText =
        'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);padding:12px 24px;background:var(--color-surface);border:2px solid var(--color-primary);border-radius:4px;font-family:var(--font-mono);font-size:0.875rem;color:var(--color-primary);z-index:100;opacity:0;transition:opacity 0.2s';
      notification.textContent = "Trek is watching. You're on course.";
      document.body.appendChild(notification);
    }

    notification.style.opacity = '1';
    setTimeout(() => {
      notification.style.opacity = '0';
    }, 2000);

    // Restore cursor after 5 seconds or on escape
    function restore() {
      document.body.style.cursor = '';
      document.removeEventListener('keydown', restore);
    }
    setTimeout(restore, 5000);
    document.addEventListener('keydown', restore);
  }

  /* --------------------------------------------------------------------------
     Scroll Reveal (IntersectionObserver)
     -------------------------------------------------------------------------- */
  function initScrollReveal() {
    const reduceMotion = window.matchMedia(CONFIG.reducedMotionMedia).matches;
    if (reduceMotion) return;

    const reveals = document.querySelectorAll(
      '.feature-card, .client-card, .download-card, .faq-item',
    );
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    reveals.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
      observer.observe(el);
    });
  }

  /* --------------------------------------------------------------------------
     Visitor Path Fork (Homepage)
     -------------------------------------------------------------------------- */
  function initVisitorPaths() {
    const fork = document.querySelector('.path-fork');
    if (!fork) return;

    const options = fork.querySelectorAll('.path-fork__option');
    options.forEach((option) => {
      option.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        window.location.href = href;
      });
    });
  }

  /* --------------------------------------------------------------------------
     Init All
     -------------------------------------------------------------------------- */
  function init() {
    initReducedMotion();
    applySeasonalVariant();
    initNav();
    initMascot();
    initLogoClicks();
    initTypedWord();
    initScrollReveal();
    initVisitorPaths();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();