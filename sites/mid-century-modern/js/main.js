/**
 * @copyright 2026 Joe Huss <detain@interserver.net>
 *
 * ===========================================================================
 *  MAIN.JS — Mid-Century Modern — Phlix Brand Kit Site
 *  Nav toggle, reveal animations, mascot, easter eggs, reduced motion
 * ===========================================================================
 */

(function () {
  'use strict';

  /* -------------------------------------------------------------------------
     UTILITIES
     ----------------------------------------------------------------------- */

  const qs = (sel, ctx = document) => ctx.querySelector(sel);
  const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -------------------------------------------------------------------------
     SCROLL REVEAL — chapter section entrance
     ----------------------------------------------------------------------- */
  function initReveal() {
    if (prefersReducedMotion) return;

    const targets = qsa('.reveal');
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    targets.forEach((el) => io.observe(el));
  }

  /* -------------------------------------------------------------------------
     MOBILE NAVIGATION
     ----------------------------------------------------------------------- */
  function initNav() {
    const toggle = qs('.nav-toggle');
    const menu = qs('.nav-mobile');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    // Close on nav link click
    qsa('.nav-mobile__link', menu).forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* -------------------------------------------------------------------------
     FAQ ACCORDION
     ----------------------------------------------------------------------- */
  function initFAQ() {
    const items = qsa('.faq-item');
    items.forEach((item) => {
      const btn = qs('.faq-item__question', item);
      if (!btn) return;

      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        // Close all others
        items.forEach((i) => i.classList.remove('is-open'));
        if (!isOpen) item.classList.add('is-open');
      });

      // Keyboard
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          btn.click();
        }
      });
    });
  }

  /* -------------------------------------------------------------------------
     SEASONAL VARIANT — live-js date gate
     ----------------------------------------------------------------------- */
  function initSeasonal() {
    const now = new Date();
    const monthDay = (now.getMonth() + 1) * 100 + now.getDate(); // MMDD as int

    const variants = [
      {
        name: 'Space Race Christmas',
        active: [1215, 1231],
        overrides: {
          '--color-primary': '#00AFAF',
          '--color-secondary': '#E8543C',
          '--color-tertiary': '#F5EFE8',
        },
      },
      {
        name: 'Harvest Harvest',
        active: [1001, 1031],
        overrides: {
          '--color-primary': '#D4920A',
          '--color-secondary': '#E8543C',
          '--color-surface': '#1F1A0E',
        },
      },
      {
        name: 'Valentine Teal',
        active: [210, 214],
        overrides: { '--color-primary': '#E8543C', '--color-secondary': '#F2B705' },
      },
    ];

    for (const v of variants) {
      if (monthDay >= v.active[0] && monthDay <= v.active[1]) {
        const root = document.documentElement;
        for (const [prop, val] of Object.entries(v.overrides)) {
          root.style.setProperty(prop, val);
        }
        break;
      }
    }
  }

  /* -------------------------------------------------------------------------
     MASCOT — Orbit companion
     ----------------------------------------------------------------------- */
  function initMascot() {
    const mascot = qs('.mascot');
    if (!mascot) return;

    const LS_KEY = 'phlix-orbit-dismissed';
    if (localStorage.getItem(LS_KEY) === '1') {
      mascot.classList.add('is-dismissed');
      return;
    }

    // Dismiss
    const dismissBtn = qs('.mascot__dismiss', mascot);
    if (dismissBtn) {
      dismissBtn.addEventListener('click', () => {
        mascot.classList.add('is-dismissed');
        localStorage.setItem(LS_KEY, '1');
      });
    }

    // Idle bob — disabled under reduced-motion
    if (prefersReducedMotion) return;
    const rocket = qs('.mascot__rocket', mascot);
    if (rocket) {
      rocket.style.animation = 'mascot-bob 3s ease-in-out infinite';
    }
  }

  /* -------------------------------------------------------------------------
     EASTER EGG 1 — logo-clicks:5
     ----------------------------------------------------------------------- */
  function initLogoClicksEgg() {
    let count = 0;
    const logo = qs('.nav-logo');
    if (!logo) return;

    logo.addEventListener('click', (e) => {
      // Don't fire if clicking a child link
      if (e.target !== logo) return;
      count++;
      if (count >= 5) {
        count = 0;
        triggerOrbitFlyby();
      }
    });
  }

  /* -------------------------------------------------------------------------
     EASTER EGG 2 — typed-word:orbit
     Key sequence listener — disabled when focus is in input/textarea
     ----------------------------------------------------------------------- */
  function initTypedWordEgg() {
    const input = document.createElement('input');
    input.setAttribute('aria-label', 'easter-egg-trigger');
    input.style.cssText =
      'position:fixed;opacity:0;pointer-events:none;width:1px;height:1px;z-index:9999;';
    document.body.appendChild(input);

    let typed = '';

    document.addEventListener('keydown', (e) => {
      // Disabled when focus in editable
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement?.isContentEditable)
        return;

      if (e.key === 'Escape') {
        typed = '';
        return;
      }

      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        // PreventDefault only if we are about to act — never swallow typing
        typed += e.key.toLowerCase();

        if (typed.endsWith('orbit')) {
          typed = '';
          triggerOrbitGlow();
        }

        // Trim buffer
        if (typed.length > 20) typed = typed.slice(-20);
      }
    });

    // Cleanup on unload
    window.addEventListener('unload', () => document.body.removeChild(input));
  }

  /* -------------------------------------------------------------------------
     EASTER EGG 3 — scroll-past-footer
     ----------------------------------------------------------------------- */
  function initScrollPastFooterEgg() {
    const footer = qs('.site-footer');
    if (!footer) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          // Scrolled past footer
          triggerRocketExit();
          io.disconnect();
        });
      },
      { threshold: 0 },
    );

    io.observe(footer);
  }

  /* -------------------------------------------------------------------------
     TRIGGER helpers — animate mascot/decorations for easter eggs
     ----------------------------------------------------------------------- */

  function triggerOrbitFlyby() {
    const rocket = qs('.mascot__rocket');
    if (!rocket) return;
    // Animate rocket across screen
    rocket.style.transition = 'transform 1s cubic-bezier(0.4,0,0.2,1)';
    rocket.style.transform = 'translateX(200px) translateY(-100px) scale(0.6)';
    setTimeout(() => {
      rocket.style.transition = 'transform 0.6s cubic-bezier(0.4,0,0.2,1)';
      rocket.style.transform = '';
    }, 1200);
  }

  function triggerOrbitGlow() {
    // Briefly tint orbit word in page
    const headings = qsa('h1, h2, .text-headline');
    headings.forEach((h) => {
      h.style.transition = 'color 0.3s';
      h.style.color = 'var(--color-primary)';
      setTimeout(() => {
        h.style.color = '';
      }, 1500);
    });
  }

  function triggerRocketExit() {
    // Tiny rocket silhouette off bottom of screen
    const div = document.createElement('div');
    div.style.cssText = `
      position:fixed;bottom:0;left:50%;width:24px;height:24px;
      pointer-events:none;z-index:999;
      transition: transform 0.8s cubic-bezier(0.4,0,0.2,1);
    `;
    div.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L8 10H16L12 2Z" fill="#00AFAF"/>
      <rect x="10" y="10" width="4" height="10" rx="2" fill="#F2B705"/>
      <path d="M9 20L12 22L15 20" fill="#E8543C"/>
    </svg>`;
    document.body.appendChild(div);
    requestAnimationFrame(() => {
      div.style.transform = 'translateY(-120vh)';
    });
    setTimeout(() => div.remove(), 2000);
  }

  /* -------------------------------------------------------------------------
     CTA LADDER — stepped download funnel visual
     ----------------------------------------------------------------------- */
  function initCTALadder() {
    // Ensure all 3 CTA rungs are present via DOM check
    const rungs = qsa('.cta-rung');
    if (rungs.length >= 3) return; // already wired
  }

  /* -------------------------------------------------------------------------
     SMOOTH SCROLL for anchor links
     ----------------------------------------------------------------------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        }
      });
    });
  }

  /* -------------------------------------------------------------------------
     INIT
     ----------------------------------------------------------------------- */
  function init() {
    initNav();
    initReveal();
    initFAQ();
    initSeasonal();
    initMascot();
    initLogoClicksEgg();
    initTypedWordEgg();
    initScrollPastFooterEgg();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
