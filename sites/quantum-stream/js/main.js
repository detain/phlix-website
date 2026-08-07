/* ==========================================================================
   MAIN.JS — Quantum Stream
   Nav toggle, reduced-motion, mascot (Qubit), wave collapse animations,
   quantum state effects, scroll experience.
   Palette: #0D1B2A #1B263B #415A77 #778DA9 #E0E1DD
   Concept: Quantum superposition, probability clouds, wave function collapse.
   Archetype: Sage (analytical, quantum, precise)
   Experience archetype: immersive
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
      localStorage.setItem('phlix-quantum-reduce-motion', String(reduced));
    } catch (_) {
      /* noop */
    }
  });

  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
    reduced = e.matches;
    applyMotion(reduced);
    try {
      localStorage.setItem('phlix-quantum-reduce-motion', String(reduced));
    } catch (_) {
      /* noop */
    }
  });
}

/* --------------------------------------------------------------------------
   3. Easter Egg: logo-clicks:7 — Wave collapse effect
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
      triggerWaveCollapse();
    }

    clearTimeout(sprayTimeout);
    sprayTimeout = setTimeout(() => {
      clickCount = 0;
    }, 2000);
  });
}

function triggerWaveCollapse() {
  let overlay = qs('.quantum-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'quantum-overlay';
    document.body.appendChild(overlay);
  }

  overlay.classList.add('is-active');

  showMascotTip('Wave function collapsing — all states converging to one.');

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
   4. Easter Egg: typed-word:quantum
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

      if (typed.includes('quantum')) {
        typed = '';
        triggerSuperpositionFade();
      }
    }

    if (e.key === 'Escape') {
      dismissSuperpositionFade();
    }
  });
}

let superpositionTimeout = null;

function triggerSuperpositionFade() {
  let overlay = qs('.quantum-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'quantum-overlay';
    document.body.appendChild(overlay);
  }

  overlay.classList.add('is-active');
  showMascotTip('Superposition achieved — observing all states simultaneously.');

  clearTimeout(superpositionTimeout);
  superpositionTimeout = setTimeout(dismissSuperpositionFade, 4000);

  const escHandler = (e) => {
    if (e.key === 'Escape') {
      dismissSuperpositionFade();
      document.removeEventListener('keydown', escHandler);
    }
  };
  on(document, 'keydown', escHandler);
}

function dismissSuperpositionFade() {
  const overlay = qs('.quantum-overlay');
  if (overlay) overlay.classList.remove('is-active');
  clearTimeout(superpositionTimeout);
}

/* --------------------------------------------------------------------------
   5. Mascot: Qubit
   -------------------------------------------------------------------------- */
function initMascot() {
  const mascot = qs('#mascot-qubit');
  if (!mascot) return;

  // Check dismissal
  try {
    if (localStorage.getItem('phlix-qubit-dismissed') === 'true') {
      mascot.classList.add('is-dismissed');
      return;
    }
  } catch (_ignored) {
    // Ignored by design: an unreadable localStorage is treated exactly like
    // "never dismissed" — we fall through and show the mascot, as on a first
    // visit. There is no other outcome to choose and nothing to report.
  }

  const tip = qs('.mascot-tip');

  // Show tip after 1.5s (not on reduced motion)
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setTimeout(() => {
      showMascotTip('All states exist simultaneously. Observe to collapse the wave function.');
    }, 1500);
  }

  // Dismiss button
  const dismissBtn = qs('.mascot-dismiss');
  if (dismissBtn) {
    on(dismissBtn, 'click', (e) => {
      e.stopPropagation();
      mascot.classList.add('is-dismissed');
      try {
        localStorage.setItem('phlix-qubit-dismissed', 'true');
      } catch (_) {
        /* noop */
      }
    });
  }

  // Click on mascot — long press tip
  let clickTimer;
  on(mascot, 'mousedown', () => {
    clickTimer = setTimeout(() => {
      showMascotTip("You're observing the observer.");
    }, 2000);
  });
  on(mascot, 'mouseup', () => clearTimeout(clickTimer));
  on(mascot, 'mouseleave', () => clearTimeout(clickTimer));

  // Click counter for easter interaction
  let mascotClicks = 0;
  on(mascot, 'click', () => {
    mascotClicks++;
    if (mascotClicks >= 7) {
      mascotClicks = 0;
      showMascotTip(
        "Qubit's electrons align into synchronous orbit, then scatter in interference pattern.",
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
      const mascot = qs('#mascot-qubit');
      if (mascot) {
        mascot.classList.add('is-dismissed');
        try {
          localStorage.setItem('phlix-qubit-dismissed', 'true');
        } catch (_) {
          /* noop */
        }
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
  const cards = qsa('.atom-panel, .feature-card');

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
            hero.style.transform = `translateY(${scrollY * 0.08}px)`;
          }

          cards.forEach((card) => {
            const rect = card.getBoundingClientRect();
            const inView = rect.top < window.innerHeight && rect.bottom > 0;
            if (inView) {
              const offset = (rect.top / window.innerHeight - 0.5) * 8;
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

  qsa('.feature-card, .atom-panel, .client-card, .faq-item, .section').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition =
      'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
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
   8. Qubit section tips (context-aware)
   -------------------------------------------------------------------------- */
function initQubitTips() {
  if (!qs('#mascot-qubit')) return;

  const tips = [
    {
      selector: '#hero-reveal',
      text: 'All states exist simultaneously. Observe to collapse the wave function.',
    },
    {
      selector: '.features-overview',
      text: 'Every electron finds its orbital. SyncPlay synchronizes all observers.',
    },
    {
      selector: '#download',
      text: "Initialize your quantum state. One command and you're decohering.",
    },
    { selector: '.faq-list', text: 'Transmission log: answers to the questions observers ask.' },
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
   10. Observer effect — blur on hover for cards
   -------------------------------------------------------------------------- */
function initObserverEffect() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  qsa('.observe-effect').forEach((el) => {
    on(el, 'mouseenter', () => {
      el.style.filter = 'blur(3px)';
      el.style.opacity = '0.85';
    });
    on(el, 'mouseleave', () => {
      el.style.filter = '';
      el.style.opacity = '';
    });
  });
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
  initQubitTips();
  initObserverEffect();
});

/* @copyright 2026 Joe Huss <detain@interserver.net> */
