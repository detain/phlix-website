/**
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * MPL-2.0
 */

(function () {
  'use strict';

  /* ── Reduced motion guard ─────────────────────────────────── */
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ═══════════════════════════════════════════════════════════
     1. SEASONAL ACTIVATION — date-gate for three seasonal variants
  ═══════════════════════════════════════════════════════════ */
  (function seasonalActivation() {
    if (reducedMotion) return;
    const now = new Date();
    const mmdd =
      (now.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      now.getDate().toString().padStart(2, '0');

    const variants = [
      { key: 'summer', start: '06-18', end: '06-24' },
      { key: 'harvest', start: '10-01', end: '10-31' },
      { key: 'winter', start: '12-21', end: '01-01' },
    ];

    for (const v of variants) {
      const inRange =
        v.start <= v.end ? mmdd >= v.start && mmdd <= v.end : mmdd >= v.start || mmdd <= v.end;
      if (inRange) {
        document.documentElement.dataset.season = v.key;
        break;
      }
    }
  })();

  /* ═══════════════════════════════════════════════════════════
     2. MOBILE NAV TOGGLE
  ═══════════════════════════════════════════════════════════ */
  (function initNav() {
    const toggle = document.querySelector('.nav-toggle');
    const drawer = document.querySelector('.nav-drawer');
    if (!toggle || !drawer) return;

    function open() {
      toggle.setAttribute('aria-expanded', 'true');
      drawer.classList.add('is-open');
      drawer.querySelector('a')?.focus();
    }
    function close() {
      toggle.setAttribute('aria-expanded', 'false');
      drawer.classList.remove('is-open');
    }

    toggle.addEventListener('click', function () {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      isOpen ? close() : open();
    });

    /* Close on outside click */
    document.addEventListener('click', function (e) {
      if (!drawer.contains(e.target) && !toggle.contains(e.target)) {
        close();
      }
    });

    /* Close on Esc */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        close();
        toggle.focus();
      }
    });
  })();

  /* ═══════════════════════════════════════════════════════════
     3. SCROLL REVEAL — IntersectionObserver fade-ins
  ═══════════════════════════════════════════════════════════ */
  (function initScrollReveal() {
    if (reducedMotion) return;
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    document
      .querySelectorAll('.feature-card, .client-card, .download-card, .faq-item, .feature-detail')
      .forEach(function (el) {
        el.classList.add('reveal-ready');
        observer.observe(el);
      });
  })();

  /* Add reveal CSS */
  (function addRevealStyles() {
    const style = document.createElement('style');
    style.textContent = `
.reveal-ready { opacity: 0; transform: translateY(16px); transition: opacity 0.45s ease, transform 0.45s ease; }
.is-revealed  { opacity: 1; transform: translateY(0); }
@media (prefers-reduced-motion: reduce) {
  .reveal-ready { opacity: 1; transform: none; transition: none; }
}
    `;
    document.head.appendChild(style);
  })();

  /* ═══════════════════════════════════════════════════════════
     4. EASTER EGG — logo-clicks:5
  ═══════════════════════════════════════════════════════════ */
  (function initLogoClicks() {
    const logo = document.querySelector('.nav-logo');
    if (!logo) return;
    let count = 0;

    logo.addEventListener('click', function (e) {
      /* Only count plain clicks, not nav keyboard nav */
      if (e.clientX === 0 && e.clientY === 0) return;
      count++;
      if (count === 5) {
        count = 0;
        document.body.classList.add('easter-flash');
        const mascot = document.querySelector('.mascot-companion');
        if (mascot) mascot.classList.add('mascot-spin-burst');
        setTimeout(function () {
          document.body.classList.remove('easter-flash');
          if (mascot) mascot.classList.remove('mascot-spin-burst');
        }, 2000);
      }
    });
  })();

  /* ═══════════════════════════════════════════════════════════
     5. EASTER EGG — typed-word:groovy
     Disabled while focus in input/textarea/contenteditable.
     Never calls preventDefault. Exits on Esc.
  ═══════════════════════════════════════════════════════════ */
  (function initTypedWord() {
    const TARGET = 'groovy';
    let buffer = '';
    let active = false;

    document.addEventListener('keydown', function (e) {
      /* Skip if focus is in an editable element */
      const tag = document.activeElement?.tagName ?? '';
      if (
        ['INPUT', 'TEXTAREA'].includes(tag) ||
        document.activeElement?.getAttribute('contenteditable') === 'true'
      ) {
        return;
      }

      if (e.key === 'Escape') {
        if (active) {
          buffer = '';
          active = false;
          document.body.classList.remove('easter-groovy-cursor', 'easter-groovy-text');
        }
        return;
      }

      /* Only record actual characters, not modifiers */
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        buffer += e.key.toLowerCase();
        if (buffer.length > TARGET.length) {
          buffer = buffer.slice(-TARGET.length);
        }
        if (buffer === TARGET && !active) {
          active = true;
          document.body.classList.add('easter-groovy-cursor', 'easter-groovy-text');
          buffer = '';
        }
      }
    });
  })();

  /* ═══════════════════════════════════════════════════════════
     6. EASTER EGG — scroll-past-footer
  ═══════════════════════════════════════════════════════════ */
  (function initScrollPastFooter() {
    const footer = document.querySelector('.site-footer');
    if (!footer) return;
    let triggered = false;

    if (reducedMotion) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !triggered) {
            triggered = true;
            triggerScrollEgg();
          }
        });
      },
      { threshold: 0 },
    );

    observer.observe(footer);
  })();

  function triggerScrollEgg() {
    const mascot = document.querySelector('.mascot-companion');
    if (!mascot) return;
    mascot.style.transition = 'transform 3s ease-out';
    mascot.style.transform = 'translateY(-300px) rotate(720deg)';
    setTimeout(function () {
      mascot.style.transform = '';
      mascot.style.transition = '';
    }, 3500);
  }

  /* ═══════════════════════════════════════════════════════════
     7. MASCOT — Paisley companion with tips + dismiss
  ═══════════════════════════════════════════════════════════ */
  (function initMascot() {
    const STORAGE_KEY = 'phlix_paisley_dismissed';
    const mascot = document.querySelector('.mascot-companion');
    const tipEl = document.querySelector('.mascot-tip');
    if (!mascot) return;

    /* Respect prior dismissal */
    if (localStorage.getItem(STORAGE_KEY) === '1') {
      mascot.classList.add('mascot-dismissed');
      return;
    }

    if (reducedMotion) {
      /* Static pose — remove idle animation */
      mascot.style.animation = 'none';
    }

    /* Dismiss button */
    const dismissBtn = tipEl?.querySelector('.mascot-dismiss-btn');
    if (dismissBtn) {
      dismissBtn.addEventListener('click', function () {
        mascot.classList.add('mascot-dismissed');
        localStorage.setItem(STORAGE_KEY, '1');
        if (tipEl) tipEl.style.display = 'none';
      });
    }

    /* Show tip after 3s */
    setTimeout(function () {
      if (localStorage.getItem(STORAGE_KEY) !== '1' && tipEl) {
        tipEl.style.display = 'block';
      }
    }, 3000);
  })();

  /* ═══════════════════════════════════════════════════════════
     8. INTENSITY TOGGLE — Cosmic Calm
  ═══════════════════════════════════════════════════════════ */
  (function initIntensityToggle() {
    const toggle = document.querySelector('.intensity-toggle input');
    if (!toggle) return;

    toggle.addEventListener('change', function () {
      if (toggle.checked) {
        document.documentElement.classList.add('cosmic-calm');
      } else {
        document.documentElement.classList.remove('cosmic-calm');
      }
    });
  })();

  /* Cosmic calm mode — reduce animation intensity */
  (function addCosmicCalmStyles() {
    const style = document.createElement('style');
    style.textContent = `
.cosmic-calm .mandala-1,
.cosmic-calm .mandala-2,
.cosmic-calm .mandala-3 { animation-duration: 0s !important; opacity: 0.15 !important; }
.cosmic-calm .feature-card:hover,
.cosmic-calm .client-card:hover,
.cosmic-calm .download-card:hover { transform: none !important; box-shadow: var(--shadow-md) !important; }
    `;
    document.head.appendChild(style);
  })();

  /* ═══════════════════════════════════════════════════════════
     9. COPY BUTTON on code blocks
  ═══════════════════════════════════════════════════════════ */
  (function initCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const pre = btn.closest('.code-block')?.querySelector('pre');
        if (!pre) return;
        navigator.clipboard.writeText(pre.textContent || '').then(function () {
          btn.textContent = 'Copied!';
          setTimeout(function () {
            btn.textContent = 'Copy';
          }, 1800);
        });
      });
    });
  })();

  /* ═══════════════════════════════════════════════════════════
     10. SMOOTH SCROLL for anchor links
  ═══════════════════════════════════════════════════════════ */
  (function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const target = document.querySelector(anchor.getAttribute('href') || '');
        if (target) {
          target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
        }
      });
    });
  })();
})();
