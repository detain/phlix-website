/**
 * ============================================================================
 * MAIN.JS — Turntablejs
 * Navigation, DJ companion, scratch effects, RPM gauge, BPM counter.
 * Theme: Interactive vinyl scratching interface. Tone arm, platters, RPM gauges.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * ============================================================================
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     Configuration
     -------------------------------------------------------------------------- */
  const CONFIG = {
    companionDismissKey: 'turntablejs-companion-dismissed',
    logoClickTarget: 5,
    typedWordTarget: 'phlix',
    reducedMotionMedia: '(prefers-reduced-motion: reduce)',
    vinylSpinDuration: 4000,
  };

  /* --------------------------------------------------------------------------
     DJ Companion Tips by Section
     -------------------------------------------------------------------------- */
  const COMPANION_TIPS = [
    { where: 'home:#platter', say: 'Drop the beat. Get Phlix spinning.' },
    { where: 'home:#features-grid', say: 'Eight tracks. Every feature locked and loaded.' },
    { where: 'home:#drop-the-beat', say: "One command. Full control. Let's go." },
    { where: 'about:.faq-list', say: "The FAQ. Like a good DJ, we've got answers." },
  ];

  /* --------------------------------------------------------------------------
     Utility: check if reduced motion is preferred
     -------------------------------------------------------------------------- */
  function prefersReducedMotion() {
    return window.matchMedia(CONFIG.reducedMotionMedia).matches;
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

    if (!first || !last) return;

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
    first.focus();
  }

  /* --------------------------------------------------------------------------
     DJ Companion — Vinyl Character
     -------------------------------------------------------------------------- */
  function initCompanion() {
    const companion = document.querySelector('.dj-companion');
    if (!companion) return;

    // Check if dismissed
    if (localStorage.getItem(CONFIG.companionDismissKey) === 'true') {
      companion.style.display = 'none';
      return;
    }

    const dismissBtn = companion.querySelector('.dj-companion__dismiss');
    const tip = companion.querySelector('.dj-companion__tip');
    const vinyl = companion.querySelector('.dj-companion__vinyl');

    // Show tip based on current section
    function showTipForSection() {
      if (!tip) return;
      const section = document.querySelector('#main-content > section');
      if (!section) return;

      const sectionId = section.id || '';
      const tipData = COMPANION_TIPS.find((t) => t.where.includes(sectionId));
      if (tipData) {
        tip.textContent = tipData.say;
        tip.classList.add('is-visible');
      }
    }

    // Dismiss handler
    if (dismissBtn) {
      dismissBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        companion.style.display = 'none';
        localStorage.setItem(CONFIG.companionDismissKey, 'true');
      });
    }

    // Hover behavior - speed up vinyl
    companion.addEventListener('mouseenter', function () {
      if (tip) tip.classList.add('is-visible');
    });

    companion.addEventListener('mouseleave', function () {
      if (tip) tip.classList.remove('is-visible');
    });

    // Click to scratch
    if (vinyl) {
      vinyl.addEventListener('click', function () {
        if (prefersReducedMotion()) return;
        vinyl.classList.add('dj-companion__vinyl--scratching');
        setTimeout(() => {
          vinyl.classList.remove('dj-companion__vinyl--scratching');
        }, 500);
      });
    }

    // Check reduced motion
    if (!prefersReducedMotion()) {
      showTipForSection();
    }
  }

  /* --------------------------------------------------------------------------
     Easter Egg 1: Logo Clicks — Trigger Scratch Effect
     -------------------------------------------------------------------------- */
  function initLogoClicks() {
    const logo = document.querySelector('.nav-logo');
    if (!logo) return;

    let clickCount = 0;

    logo.addEventListener('click', function (e) {
      // Don't count if modifier keys
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;

      clickCount++;

      if (clickCount >= CONFIG.logoClickTarget) {
        clickCount = 0;
        triggerVinylScratch();
      }
    });
  }

  /* --------------------------------------------------------------------------
     Easter Egg 2: Typed Word "phlix"
     -------------------------------------------------------------------------- */
  function initTypedWord() {
    let buffer = '';
    let timeout;
    const target = CONFIG.typedWordTarget;

    document.addEventListener('keydown', function (e) {
      // Don't trigger in inputs/textareas
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;

      const key = e.key.toLowerCase();

      if (key === 'escape') {
        buffer = '';
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
          triggerBpmFlash();
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
     Trigger Vinyl Scratch Effect
     -------------------------------------------------------------------------- */
  function triggerVinylScratch() {
    const companion = document.querySelector('.dj-companion');
    if (!companion) return;

    const vinyl = companion.querySelector('.dj-companion__vinyl');
    if (!vinyl || prefersReducedMotion()) return;

    vinyl.classList.add('dj-companion__vinyl--scratching');

    // Create scratch sound visualization
    let scratchOverlay = document.querySelector('.scratch-overlay');
    if (!scratchOverlay) {
      scratchOverlay = document.createElement('div');
      scratchOverlay.className = 'scratch-overlay';
      scratchOverlay.style.cssText =
        'position:fixed;inset:0;z-index:200;pointer-events:none;opacity:0;transition:opacity 0.3s;background:radial-gradient(circle at center, rgba(29,185,84,0.1) 0%, transparent 70%);';
      document.body.appendChild(scratchOverlay);
    }

    scratchOverlay.style.opacity = '1';

    setTimeout(() => {
      vinyl.classList.remove('dj-companion__vinyl--scratching');
      scratchOverlay.style.opacity = '0';
    }, 1000);
  }

  /* --------------------------------------------------------------------------
     Trigger BPM Flash
     -------------------------------------------------------------------------- */
  function triggerBpmFlash() {
    if (prefersReducedMotion()) return;

    // Find or create BPM display
    let bpmDisplay = document.querySelector('.bpm-flash');
    if (!bpmDisplay) {
      bpmDisplay = document.createElement('div');
      bpmDisplay.className = 'bpm-flash';
      bpmDisplay.style.cssText =
        'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);padding:20px 40px;background:var(--color-surface);border:2px solid var(--color-primary);border-radius:8px;font-family:var(--font-number);font-size:2rem;color:var(--color-primary);z-index:100;opacity:0;transition:opacity 0.2s;pointer-events:none;';
      bpmDisplay.textContent = '♪ PHLIX ♪';
      document.body.appendChild(bpmDisplay);
    }

    bpmDisplay.style.opacity = '1';
    setTimeout(() => {
      bpmDisplay.style.opacity = '0';
    }, 1500);
  }

  /* --------------------------------------------------------------------------
     Scroll Reveal (IntersectionObserver)
     -------------------------------------------------------------------------- */
  function initScrollReveal() {
    if (prefersReducedMotion()) return;

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
     RPM Gauge Animation (if present)
     -------------------------------------------------------------------------- */
  function initRpmGauge() {
    const gauge = document.querySelector('.rpm-gauge__value');
    if (!gauge) return;

    // Animate RPM value
    let currentRpm = 0;
    const targetRpm = 120;

    function updateRpm() {
      if (currentRpm < targetRpm) {
        currentRpm += 2;
        if (currentRpm > targetRpm) currentRpm = targetRpm;
        gauge.textContent = currentRpm;
        requestAnimationFrame(updateRpm);
      }
    }

    // Start animation when in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateRpm();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(gauge);
  }

  /* --------------------------------------------------------------------------
     Init All
     -------------------------------------------------------------------------- */
  function init() {
    initNav();
    initCompanion();
    initLogoClicks();
    initTypedWord();
    initScrollReveal();
    initRpmGauge();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* ==========================================================================
   END MAIN.JS
   @copyright 2026 Joe Huss <detain@interserver.net>
   ========================================================================== */
