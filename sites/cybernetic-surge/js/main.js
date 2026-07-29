/* ==========================================================================
   MAIN.JS — Cybernetic Surge
   Nav toggle, reduced-motion, mascot (Syntha), circuit flush animations,
   upgrade level display, scroll experience.
   @copyright 2026 Joe Huss <detain@interserver.net>
   ========================================================================== */

'use strict';

/* --------------------------------------------------------------------------
   0. Helpers
   -------------------------------------------------------------------------- */
function qs(sel, ctx) {
  return (ctx || document).querySelector(sel);
}

function qsa(sel, ctx) {
  return Array.from((ctx || document).querySelectorAll(sel));
}

function on(el, event, handler, opts) {
  el.addEventListener(event, handler, opts);
}

/* --------------------------------------------------------------------------
   1. Navigation toggle (mobile hamburger)
   -------------------------------------------------------------------------- */
function initNav() {
  const toggle = qs('.nav-toggle');
  const menu = qs('.nav-menu');

  if (!toggle || !menu) return;

  on(toggle, 'click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('is-open', !expanded);
  });

  // Close on outside click
  on(document, 'click', (e) => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
    }
  });

  // Close on Escape
  on(document, 'keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
      toggle.focus();
    }
  });
}

/* --------------------------------------------------------------------------
   2. Reduced motion — switch off transition AND animation
   -------------------------------------------------------------------------- */
function initReducedMotion() {
  const btn = qs('.reduce-motion-btn');
  if (!btn) return;

  let reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  btn.setAttribute('aria-pressed', String(reduced));

  function applyMotion(reduce) {
    document.documentElement.classList.toggle('reduce-motion', reduce);
    btn.setAttribute('aria-pressed', String(reduce));
    document.documentElement.style.setProperty('--motion-duration', reduce ? '0s' : '1s');
  }

  applyMotion(reduced);

  on(btn, 'click', () => {
    reduced = !reduced;
    applyMotion(reduced);
    try {
      localStorage.setItem('phlix-reduce-motion', String(reduced));
    } catch (_) { /* noop */ }
  });

  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
    reduced = e.matches;
    applyMotion(reduced);
    try {
      localStorage.setItem('phlix-reduce-motion', String(reduced));
    } catch (_) { /* noop */ }
  });
}

/* --------------------------------------------------------------------------
   3. Easter Egg: logo-clicks:7 — Circuit flush surge
   -------------------------------------------------------------------------- */
function initLogoEgg() {
  const logo = qs('.nav-logo');
  if (!logo) return;

  let clickCount = 0;
  let sprayTimeout = null;

  on(logo, 'click', () => {
    clickCount++;

    if (clickCount === 7) {
      clickCount = 0;
      triggerCircuitFlush();
    }

    clearTimeout(sprayTimeout);
    sprayTimeout = setTimeout(() => {
      clickCount = 0;
    }, 2000);
  });
}

function triggerCircuitFlush() {
  let overlay = qs('.circuit-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'circuit-overlay';
    document.body.appendChild(overlay);
  }

  overlay.classList.add('is-active');

  showMascotTip("System override — full circuit surge activated.");

  setTimeout(() => {
    overlay.classList.remove('is-active');
  }, 3000);

  const escHandler = (e) => {
    if (e.key === 'Escape') {
      overlay.classList.remove('is-active');
      document.removeEventListener('keydown', escHandler);
    }
  };
  on(document, 'keydown', escHandler);
}

/* --------------------------------------------------------------------------
   4. Easter Egg: typed-word:upgrade
   -------------------------------------------------------------------------- */
function initTypedEgg() {
  let typed = '';

  on(document, 'keydown', (e) => {
    const tag = document.activeElement?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement?.isContentEditable) {
      return;
    }

    if (e.key.length === 1) {
      typed += e.key.toLowerCase();

      if (typed.length > 8) typed = typed.slice(-8);

      if (typed.includes('upgrade')) {
        typed = '';
        triggerNeuralSync();
      }
    }

    if (e.key === 'Escape') {
      dismissNeuralSync();
    }
  });
}

let neuralTimeout = null;

function triggerNeuralSync() {
  let overlay = qs('.circuit-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'circuit-overlay';
    document.body.appendChild(overlay);
  }

  overlay.classList.add('is-active');
  showMascotTip('Neural handshake established. Interface synchronized.');

  clearTimeout(neuralTimeout);
  neuralTimeout = setTimeout(dismissNeuralSync, 4000);

  const escHandler = (e) => {
    if (e.key === 'Escape') {
      dismissNeuralSync();
      document.removeEventListener('keydown', escHandler);
    }
  };
  on(document, 'keydown', escHandler);
}

function dismissNeuralSync() {
  const overlay = qs('.circuit-overlay');
  if (overlay) overlay.classList.remove('is-active');
  clearTimeout(neuralTimeout);
}

/* --------------------------------------------------------------------------
   5. Mascot: Syntha
   -------------------------------------------------------------------------- */
function initMascot() {
  const mascot = qs('#mascot-syntha');
  if (!mascot) return;

  // Check dismissal
  try {
    if (localStorage.getItem('phlix-syntha-dismissed') === 'true') {
      mascot.classList.add('is-dismissed');
      return;
    }
  } catch (_) {}

  const tip = qs('.mascot-tip');

  // Show tip after 1.5s (not on reduced motion)
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setTimeout(() => {
      showMascotTip("I'm Syntha. Your upgrade begins the moment you arrive.");
    }, 1500);
  }

  // Dismiss button
  const dismissBtn = qs('.mascot-dismiss');
  if (dismissBtn) {
    on(dismissBtn, 'click', (e) => {
      e.stopPropagation();
      mascot.classList.add('is-dismissed');
      try {
        localStorage.setItem('phlix-syntha-dismissed', 'true');
      } catch (_) { /* noop */ }
    });
  }

  // Click on mascot
  let clickTimer;
  on(mascot, 'mousedown', () => {
    clickTimer = setTimeout(() => {
      showMascotTip("You're paying attention to detail.");
    }, 2000);
  });
  on(mascot, 'mouseup', () => clearTimeout(clickTimer));
  on(mascot, 'mouseleave', () => clearTimeout(clickTimer));

  // Click counter for easter interaction
  let mascotClicks = 0;
  on(mascot, 'click', () => {
    mascotClicks++;
    if (mascotClicks >= 3) {
      mascotClicks = 0;
      showMascotTip(
        "Syntha initiates a full circuit-flush — teal electricity races through all traces, then projects a holographic upgrade certificate.",
      );
    }
  });
}

function showMascotTip(text) {
  const tip = qs('.mascot-tip');
  if (!tip) return;

  const textEl = tip.querySelector('.tip-text') || tip;
  if (textEl.classList.contains('tip-text')) {
    textEl.textContent = text;
  } else {
    tip.innerHTML = `<span class="tip-text">${text}</span><span class="mascot-dismiss" role="button" tabindex="0">Dismiss</span>`;
    on(tip.querySelector('.mascot-dismiss'), 'click', (e) => {
      e.stopPropagation();
      tip.classList.remove('is-visible');
      const mascot = qs('#mascot-syntha');
      if (mascot) {
        mascot.classList.add('is-dismissed');
        try {
          localStorage.setItem('phlix-syntha-dismissed', 'true');
        } catch (_) { /* noop */ }
      }
    });
  }

  tip.classList.add('is-visible');

  clearTimeout(showMascotTip._timeout);
  showMascotTip._timeout = setTimeout(() => {
    tip.classList.remove('is-visible');
  }, 4000);
}

/* --------------------------------------------------------------------------
   6. Scroll parallax (disabled under reduced motion)
   -------------------------------------------------------------------------- */
function initScrollParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.innerWidth < 768) return;

  const hero = qs('.hero');
  const cards = qsa('.hud-panel, .feature-card');

  if (!hero) return;

  let ticking = false;

  on(
    window,
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          if (scrollY < window.innerHeight) {
            hero.style.transform = `translateY(${scrollY * 0.15}px)`;
          }

          cards.forEach((card) => {
            const rect = card.getBoundingClientRect();
            const inView = rect.top < window.innerHeight && rect.bottom > 0;
            if (inView) {
              const offset = (rect.top / window.innerHeight - 0.5) * 12;
              card.style.transform = `translateY(${offset}px)`;
            }
          });

          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true },
  );
}

/* --------------------------------------------------------------------------
   7. Scroll reveals (IntersectionObserver)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
  );

  qsa('.feature-card, .hud-panel, .client-card, .faq-item, .section').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition =
      'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });

  const style = document.createElement('style');
  style.textContent = `
    .is-revealed { opacity: 1 !important; transform: none !important; }
    @media (prefers-reduced-motion: reduce) {
      .is-revealed { transition: none !important; }
    }
  `;
  document.head.appendChild(style);
}

/* --------------------------------------------------------------------------
   8. Syntha section tips (context-aware)
   -------------------------------------------------------------------------- */
function initSynthaTips() {
  if (!qs('#mascot-syntha')) return;

  const tips = [
    {
      selector: '#hero-reveal',
      text: "I'm Syntha. Your upgrade begins the moment you arrive.",
    },
    {
      selector: '.feature-cards',
      text: 'Each module is an implant. Add only what your system needs.',
    },
    {
      selector: '#syncplay',
      text: 'Neural sync — every device shares one consciousness.',
    },
    {
      selector: '#download',
      text: "The installation protocol: one line. The upgrade: permanent.",
    },
    { selector: '.faq-list', text: 'Your questions calibrate my responses. Ask precisely.' },
  ];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
          const tip = tips.find((t) => entry.target.matches(t.selector));
          if (tip) showMascotTip(tip.text);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  tips.forEach((tip) => {
    const el = qs(tip.selector);
    if (el) observer.observe(el);
  });
}

/* --------------------------------------------------------------------------
   9. Motion CSS variable injection
   -------------------------------------------------------------------------- */
function initMotionCSS() {
  const style = document.createElement('style');
  style.id = 'motion-css';
  style.textContent = `
    .reduce-motion *,
    .reduce-motion *::before,
    .reduce-motion *::after {
      transition-duration: 0s !important;
      animation-duration: 0s !important;
      animation-iteration-count: 1 !important;
    }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        transition-duration: 0s !important;
        animation-duration: 0s !important;
        animation-iteration-count: 1 !important;
      }
    }
  `;
  document.head.appendChild(style);
}

/* --------------------------------------------------------------------------
   Init
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initMotionCSS();
  initNav();
  initReducedMotion();
  initLogoEgg();
  initTypedEgg();
  initMascot();
  initScrollParallax();
  initScrollReveal();
  initSynthaTips();
});

/* @copyright 2026 Joe Huss <detain@interserver.net> */
