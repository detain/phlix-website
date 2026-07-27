/**
 * ============================================================================
 *  MAIN.JS — Cosmic Odyssey
 *  Mobile nav, reduced-motion, scroll reveals, Vela mascot, easter eggs,
 *  intensity toggle, seasonal activation, parallax hero.
 *  @copyright 2026 Joe Huss <detain@interserver.net>
 * ============================================================================
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     Utilities
     -------------------------------------------------------------------------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function addClass(el, cls) {
    el.classList.add(cls);
  }
  function removeClass(el, cls) {
    el.classList.remove(cls);
  }
  function hasClass(el, cls) {
    el.classList.contains(cls);
  }

  /* --------------------------------------------------------------------------
     1. Mobile nav toggle
     -------------------------------------------------------------------------- */
  function initNav() {
    const toggle = $('.nav-toggle');
    const menu = $('.nav-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      const isOpen = hasClass(menu, 'is-open');
      menu.classList.toggle('is-open', !isOpen);
      toggle.setAttribute('aria-expanded', String(!isOpen));
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        removeClass(menu, 'is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Esc
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && hasClass(menu, 'is-open')) {
        removeClass(menu, 'is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* --------------------------------------------------------------------------
     2. Scroll reveals (IntersectionObserver)
     -------------------------------------------------------------------------- */
  function initScrollReveal() {
    if (prefersReducedMotion()) return;
    if (!('IntersectionObserver' in window)) return;

    const reveals = $$('.reveal');
    if (!reveals.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            addClass(entry.target, 'is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    reveals.forEach((el) => obs.observe(el));
  }

  /* --------------------------------------------------------------------------
     3. Intensity toggle (FAQ removed — native <details> provides accordion)
     -------------------------------------------------------------------------- */
  function initIntensityToggle() {
    const toggle = $('#intensity-toggle');
    if (!toggle) return;

    // Restore saved preference
    if (localStorage.getItem('cosmic-intensity') === 'reduced') {
      toggle.checked = true;
      applyReducedIntensity();
    }

    toggle.addEventListener('change', () => {
      if (toggle.checked) {
        localStorage.setItem('cosmic-intensity', 'reduced');
        applyReducedIntensity();
      } else {
        localStorage.setItem('cosmic-intensity', 'full');
        removeReducedIntensity();
      }
    });
  }

  function applyReducedIntensity() {
    /* noop */
    document.documentElement.style.setProperty('--hero-parallax', '0');
    document.documentElement.classList.add('intensity-reduced');
    // Disable star drift and nebula pulse
    $$('.hero__stars').forEach((el) => (el.style.animation = 'none'));
    $$('.hero__bg').forEach((el) => (el.style.animation = 'none'));
  }

  function removeReducedIntensity() {
    /* noop */
    document.documentElement.style.removeProperty('--hero-parallax');
    document.documentElement.classList.remove('intensity-reduced');
    $$('.hero__stars').forEach((el) => (el.style.animation = ''));
    $$('.hero__bg').forEach((el) => (el.style.animation = ''));
  }

  /* --------------------------------------------------------------------------
     4. Seasonal activation
     -------------------------------------------------------------------------- */
  function initSeasonal() {
    // Perseid: 08-10 to 08-14
    // Winter Solstice: 12-18 to 01-06
    // Galaxy Season: 03-01 to 05-31
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    let variant = null;

    if (month === 8 && day >= 10 && day <= 14) {
      variant = 0; // Perseid
    } else if ((month === 12 && day >= 18) || (month === 1 && day <= 6)) {
      variant = 1; // Winter Solstice
    } else if (month >= 3 && month <= 5) {
      variant = 2; // Galaxy Season
    }

    if (variant !== null && variant !== undefined) {
      document.documentElement.setAttribute('data-seasonal', String(variant));
    }
  }

  /* --------------------------------------------------------------------------
      5. Parallax hero (diorama-parallax)
     -------------------------------------------------------------------------- */
  function initParallax() {
    if (prefersReducedMotion()) return;

    const hero = $('.hero');
    if (!hero) return;

    const stars = hero.querySelector('.hero__stars');
    const bg = hero.querySelector('.hero__bg');

    let ticking = false;

    function update() {
      const sy = window.scrollY;
      if (stars) stars.style.transform = `translateY(${sy * 0.3}px)`;
      if (bg) bg.style.transform = `translateY(${sy * 0.15}px)`;
      ticking = false;
    }

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true },
    );
  }

  /* --------------------------------------------------------------------------
     7. Vela mascot
     -------------------------------------------------------------------------- */
  function initMascot() {
    const mascot = $('.mascot');
    if (!mascot) return;

    const figure = mascot.querySelector('.mascot__figure');
    const tip = mascot.querySelector('.mascot__tip');
    const dismissBtn = mascot.querySelector('.mascot__dismiss');
    const reward = mascot.querySelector('.mascot__reward');

    // Check dismissed state
    if (sessionStorage.getItem('vela-dismissed') === '1') {
      mascot.style.display = 'none';
      return;
    }

    // Tips based on section
    const tips = [
      { selector: '.hero', text: 'Signal acquired. Set course for your next discovery.' },
      {
        selector: '.features-overview',
        text: 'Every orbit holds a different treasure — SyncPlay keeps everyone on the same trajectory.',
      },
      {
        selector: '#server',
        text: "Launch sequence initiated. One line and you're the mission commander.",
      },
      {
        selector: '.faq-item',
        text: 'Transmission log: answers to the questions we receive from the void.',
      },
    ];

    function showTip(text) {
      if (!tip) return;
      tip.textContent = text;
      addClass(tip, 'is-visible');
      clearTimeout();
    }

    function hideTip() {
      if (!tip) return;
      removeClass(tip, 'is-visible');
    }

    function showReward(text) {
      if (!reward) return;
      reward.textContent = text;
      addClass(reward, 'is-visible');
      setTimeout(() => removeClass(reward, 'is-visible'), 5000);
    }

    // Section-aware tip on scroll
    if (!prefersReducedMotion()) {
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const match = tips.find((t) => entry.target.matches(t.selector));
              if (match) showTip(match.text);
              else hideTip();
            }
          });
        },
        { threshold: 0.3 },
      );

      tips.forEach((t) => {
        const el = document.querySelector(t.selector);
        if (el) sectionObserver.observe(el);
      });
    }

    // Dismiss
    if (dismissBtn) {
      dismissBtn.addEventListener('click', () => {
        mascot.style.display = 'none';
        sessionStorage.setItem('vela-dismissed', '1');
      });
    }

    // Easter: click 7 times → barrel roll
    let clickCount = 0;
    if (figure) {
      figure.addEventListener('click', () => {
        clickCount++;
        if (clickCount >= 7) {
          clickCount = 0;
          figure.style.animation = 'none';
          figure.offsetHeight; // reflow
          figure.style.animation = 'barrel-roll 1s ease-out forwards';
          showReward("Course correction approved. You've got an explorer's touch.");
          setTimeout(() => {
            figure.style.animation = '';
          }, 5000);
        }
      });
    }

    // Hover-hold 3s → visor flare
    let hoverTimer;
    if (figure) {
      figure.addEventListener('mouseenter', () => {
        hoverTimer = setTimeout(() => {
          const visor = figure.querySelector('.mascot__visor');
          if (visor) addClass(visor, 'is-flaring');
          showReward("You've found the heart of the void.");
          setTimeout(() => {
            if (visor) removeClass(visor, 'is-flaring');
          }, 3000);
        }, 3000);
      });
      figure.addEventListener('mouseleave', () => clearTimeout(hoverTimer));
    }
  }

  /* --------------------------------------------------------------------------
     8. Easter eggs
     -------------------------------------------------------------------------- */

  // 8a. Logo 7-clicks → already handled in initMascot (same trigger)

  // 8b. Typed "void" → nebula pulse + visor flare
  function initTypedWordEgg() {
    const typed = [];
    const target = 'void';
    let active = false;
    let _resetTimer;

    document.addEventListener(
      'keydown',
      (e) => {
        // Disable while in input
        const tag = e.target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;
        if (e.key === 'Escape') {
          active = false;
          typed.length = 0;
          document.documentElement.style.setProperty('--nebula-color', '');
          return;
        }
        if (e.key.length !== 1) return;

        if (!active) active = true;
        typed.push(e.key.toLowerCase());

        if (typed.length > target.length) typed.shift();

        if (typed.join('') === target) {
          active = false;
          typed.length = 0;
          // Pulse nebula
          const bg = document.querySelector('.hero__bg');
          if (bg) {
            bg.style.transition = 'background 0.5s ease-out';
            bg.style.background =
              'radial-gradient(ellipse 90% 70% at 50% 40%, rgba(232, 196, 74, 0.35) 0%, transparent 60%), linear-gradient(180deg, #080b14 0%, #111827 100%)';
            setTimeout(() => {
              bg.style.transition = 'background 1.5s ease-out';
              bg.style.background = '';
            }, 2000);
          }
          // Vela visor
          const visor = document.querySelector('.mascot__visor');
          if (visor) {
            addClass(visor, 'is-flaring');
            setTimeout(() => removeClass(visor, 'is-flaring'), 3000);
          }
          showEasterReward("You've found the heart of the void.");
        }
      },
      { passive: false },
    );
  }

  // 8c. Scroll past footer → spacecraft drift
  function initScrollPastFooterEgg() {
    const spacecraft = $('.spacecraft');
    const footer = $('.site-footer');
    if (!spacecraft || !footer) return;

    let triggered = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !triggered) {
            triggered = true;
            addClass(spacecraft, 'is-moving');
            setTimeout(() => removeClass(spacecraft, 'is-moving'), 14000);
          }
        });
      },
      { threshold: 0 },
    );

    observer.observe(footer);
  }

  function showEasterReward(text) {
    const existing = $('.easter-reward');
    if (existing) existing.remove();

    const div = document.createElement('div');
    div.className = 'easter-reward';
    div.textContent = text;
    div.style.cssText = `
      position: fixed;
      bottom: 140px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--color-surface);
      border: 1px solid var(--color-primary);
      border-radius: var(--radius-md);
      padding: var(--space-3) var(--space-6);
      font-family: var(--font-ui);
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      color: var(--color-primary-safe);
      z-index: 200;
      animation: fade-in-up 0.4s var(--ease-out) forwards;
      box-shadow: 0 0 20px rgba(123, 63, 190, 0.3);
    `;
    document.body.appendChild(div);
    setTimeout(() => {
      div.style.transition = 'opacity 0.5s';
      div.style.opacity = '0';
      setTimeout(() => div.remove(), 600);
    }, 4000);
  }

  /* --------------------------------------------------------------------------
     9. Barrel roll keyframe (injected for mascot easter egg)
     -------------------------------------------------------------------------- */
  function injectKeyframes() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes barrel-roll {
        0%   { transform: rotate(0deg); }
        50%  { transform: rotate(360deg); }
        75%  { transform: rotate(380deg); }
        90%  { transform: rotate(360deg); }
        100% { transform: rotate(360deg); }
      }
      .mascot__visor.is-flaring {
        filter: drop-shadow(0 0 12px rgba(167, 139, 250, 1)) drop-shadow(0 0 24px rgba(167, 139, 250, 0.6));
      }
      .intensity-reduced .hero__stars,
      .intensity-reduced .hero__bg {
        animation: none !important;
      }
    `;
    document.head.appendChild(style);
  }

  /* --------------------------------------------------------------------------
     Init
     -------------------------------------------------------------------------- */
  function init() {
    injectKeyframes();
    initNav();
    initScrollReveal();
    initIntensityToggle();
    initSeasonal();
    initParallax();
    initMascot();
    initTypedWordEgg();
    initScrollPastFooterEgg();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
